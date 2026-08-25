import { chromium, devices } from "@playwright/test";
import fs from "node:fs";

const URL_OBJETIVO = process.argv[2] || "https://deenexproduct.github.io/evento-gastronomico/";
const PERFIL = process.argv[3] || "slow4g";     // slow4g | fast4g | sinlimite
const CPU = Number(process.argv[4] || 4);        // factor de throttling de CPU
const SALIDA = process.argv[5] || "perf.json";

const REDES = {
  slow4g:   { offline: false, downloadThroughput: (1.6 * 1024 * 1024) / 8 * 0.9, uploadThroughput: (750 * 1024) / 8 * 0.9, latency: 150 },
  fast4g:   { offline: false, downloadThroughput: (9 * 1024 * 1024) / 8 * 0.9,   uploadThroughput: (1.5 * 1024 * 1024) / 8 * 0.9, latency: 40 },
  sinlimite:{ offline: false, downloadThroughput: -1, uploadThroughput: -1, latency: 0 },
};

const OBSERVADOR = `
(() => {
  window.__m = { lcp: null, lcpEl: null, cls: 0, clsFuentes: [], long: [], fcp: null, shifts: 0 };
  try {
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) {
        window.__m.lcp = e.startTime;
        window.__m.lcpSize = e.size;
        window.__m.lcpUrl = e.url || null;
        const el = e.element;
        if (el) {
          window.__m.lcpEl = {
            tag: el.tagName,
            cls: (el.className && el.className.toString ? el.className.toString() : '').slice(0, 160),
            id: el.id || null,
            texto: (el.innerText || '').trim().slice(0, 120),
            rect: el.getBoundingClientRect().toJSON(),
            seccion: (el.closest('section,header,footer,nav') || {}).id || null
          };
        }
      }
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (e) {}
  try {
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) {
        if (!e.hadRecentInput) {
          window.__m.cls += e.value;
          window.__m.shifts++;
          window.__m.clsFuentes.push({
            t: Math.round(e.startTime),
            v: +e.value.toFixed(4),
            nodos: (e.sources || []).map(s => s.node ? (s.node.tagName || '') + '.' + ((s.node.className || '').toString().slice(0,60)) : '?')
          });
        }
      }
    }).observe({ type: 'layout-shift', buffered: true });
  } catch (e) {}
  try {
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) window.__m.long.push({ i: Math.round(e.startTime), d: Math.round(e.duration) });
    }).observe({ type: 'longtask', buffered: true });
  } catch (e) {}
  try {
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) if (e.name === 'first-contentful-paint') window.__m.fcp = e.startTime;
    }).observe({ type: 'paint', buffered: true });
  } catch (e) {}
})();
`;

const navegador = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const ctx = await navegador.newContext({ ...devices["Pixel 7"], serviceWorkers: "block" });
const page = await ctx.newPage();
const cdp = await ctx.newCDPSession(page);

await cdp.send("Network.enable");
await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
await cdp.send("Network.emulateNetworkConditions", REDES[PERFIL]);
await cdp.send("Emulation.setCPUThrottlingRate", { rate: CPU });

await page.addInitScript(OBSERVADOR);

const t0 = Date.now();
await page.goto(URL_OBJETIVO, { waitUntil: "load", timeout: 180000 });
const tLoad = Date.now() - t0;

// Ventana de observación para tareas largas
await page.waitForTimeout(9000);

const datos = await page.evaluate(() => {
  const nav = performance.getEntriesByType("navigation")[0] || {};
  const rec = performance.getEntriesByType("resource").map(r => ({
    url: r.name,
    tipo: r.initiatorType,
    transfer: r.transferSize,
    codificado: r.encodedBodySize,
    decodificado: r.decodedBodySize,
    inicio: Math.round(r.startTime),
    fin: Math.round(r.responseEnd),
    dur: Math.round(r.duration),
    render_blocking: r.renderBlockingStatus || null,
  }));
  return {
    m: window.__m,
    nav: {
      ttfb: nav.responseStart,
      respuestaFin: nav.responseEnd,
      domInteractive: nav.domInteractive,
      dcl: nav.domContentLoadedEventEnd,
      load: nav.loadEventEnd,
      transferDoc: nav.transferSize,
      codificadoDoc: nav.encodedBodySize,
      decodificadoDoc: nav.decodedBodySize,
    },
    rec,
    altura: document.documentElement.scrollHeight,
    ancho: window.innerWidth,
    alto: window.innerHeight,
    dpr: window.devicePixelRatio,
  };
});

// TBT y momento en que el hilo principal queda libre 5 s seguidos
const fcp = datos.m.fcp ?? 0;
const largas = datos.m.long.filter(t => t.i + t.d > fcp);
const tbt = largas.reduce((a, t) => a + Math.max(0, Math.min(t.d, t.i + t.d - fcp) - 50), 0);
let quieto = fcp;
const finObs = datos.nav.load + 9000;
for (const t of [...largas].sort((a, b) => a.i - b.i)) {
  if (t.i + t.d > quieto) quieto = t.i + t.d;
}
// primer hueco de 5 s libre después de fcp
let interactivo = fcp;
const orden = [...largas].sort((a, b) => a.i - b.i);
for (const t of orden) {
  if (t.i >= interactivo + 5000) break;
  interactivo = Math.max(interactivo, t.i + t.d);
}
interactivo = Math.max(interactivo, datos.nav.dcl || 0);

const total = datos.rec.reduce((a, r) => a + (r.transfer || 0), 0) + (datos.nav.transferDoc || 0);
const salida = {
  url: URL_OBJETIVO, perfil: PERFIL, cpu: CPU,
  viewport: { ancho: datos.ancho, alto: datos.alto, dpr: datos.dpr },
  paginaAltura: datos.altura,
  ms: {
    ttfb: Math.round(datos.nav.ttfb),
    fcp: Math.round(datos.m.fcp ?? -1),
    lcp: Math.round(datos.m.lcp ?? -1),
    domInteractive: Math.round(datos.nav.domInteractive),
    dcl: Math.round(datos.nav.dcl),
    load: Math.round(datos.nav.load),
    tbt: Math.round(tbt),
    interactivoAprox: Math.round(interactivo),
    relojPared_load: tLoad,
  },
  cls: +(datos.m.cls || 0).toFixed(4),
  clsEventos: datos.m.shifts,
  clsFuentes: datos.m.clsFuentes,
  lcpElemento: datos.m.lcpEl,
  lcpUrl: datos.m.lcpUrl || null,
  bytes: {
    totalTransferido: total,
    documento: datos.nav.transferDoc,
    porRecurso: datos.rec.sort((a, b) => (b.transfer || 0) - (a.transfer || 0)),
  },
  tareasLargas: largas,
};

fs.writeFileSync(SALIDA, JSON.stringify(salida, null, 2));
console.log(JSON.stringify({
  perfil: PERFIL, cpu: CPU,
  ttfb: salida.ms.ttfb, fcp: salida.ms.fcp, lcp: salida.ms.lcp, dcl: salida.ms.dcl,
  load: salida.ms.load, tbt: salida.ms.tbt, interactivo: salida.ms.interactivoAprox,
  cls: salida.cls, shifts: salida.clsEventos,
  lcpEl: salida.lcpElemento && (salida.lcpElemento.tag + " · " + salida.lcpElemento.texto.slice(0, 60)),
  totalKB: +(total / 1024).toFixed(1),
  recursos: datos.rec.length,
  altura: datos.altura, alto: datos.alto,
}, null, 2));

await navegador.close();
