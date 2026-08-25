import { chromium, devices } from "@playwright/test";
import fs from "node:fs";

const URL_OBJETIVO = process.argv[2];
const PERFIL = process.argv[3] || "slow4g";
const CPU = Number(process.argv[4] || 4);
const SALIDA = process.argv[5] || ".medicion/red.json";
const DISPOSITIVO = process.argv[6] || "Pixel 7";
const SCROLL = process.argv[7] === "scroll";

const REDES = {
  slow4g:   { offline: false, downloadThroughput: (1.6 * 1024 * 1024) / 8 * 0.9, uploadThroughput: (750 * 1024) / 8 * 0.9, latency: 150 },
  fast4g:   { offline: false, downloadThroughput: (9 * 1024 * 1024) / 8 * 0.9,   uploadThroughput: (1.5 * 1024 * 1024) / 8 * 0.9, latency: 40 },
  sinlimite:{ offline: false, downloadThroughput: -1, uploadThroughput: -1, latency: 0 },
};

const OBSERVADOR = `
(() => {
  window.__m = { lcp: null, lcpEl: null, cls: 0, clsFuentes: [], long: [], fcp: null, shifts: 0, primerPintado: null };
  const reg = (tipo, cb) => { try { new PerformanceObserver(cb).observe({ type: tipo, buffered: true }); } catch(e){} };
  reg('largest-contentful-paint', (l) => { for (const e of l.getEntries()) {
    window.__m.lcp = e.startTime; window.__m.lcpSize = e.size; window.__m.lcpUrl = e.url || null;
    const el = e.element;
    if (el) window.__m.lcpEl = { tag: el.tagName, cls: String(el.className||'').slice(0,160), id: el.id||null,
      texto: (el.innerText||'').trim().slice(0,140), rect: el.getBoundingClientRect().toJSON(),
      seccion: (el.closest('section,header,footer,nav')||{}).id || null };
  }});
  reg('layout-shift', (l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) {
    window.__m.cls += e.value; window.__m.shifts++;
    window.__m.clsFuentes.push({ t: Math.round(e.startTime), v: +e.value.toFixed(4),
      nodos: (e.sources||[]).map(s => s.node ? (s.node.tagName||'')+'.'+String(s.node.className||'').slice(0,50) : '?') });
  }});
  reg('longtask', (l) => { for (const e of l.getEntries()) window.__m.long.push({ i: Math.round(e.startTime), d: Math.round(e.duration) }); });
  reg('paint', (l) => { for (const e of l.getEntries()) {
    if (e.name === 'first-contentful-paint') window.__m.fcp = e.startTime;
    if (e.name === 'first-paint') window.__m.primerPintado = e.startTime;
  }});
})();
`;

const navegador = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const ctx = await navegador.newContext({ ...devices[DISPOSITIVO], serviceWorkers: "block" });
const page = await ctx.newPage();
const cdp = await ctx.newCDPSession(page);

const peticiones = new Map();
cdp.on("Network.requestWillBeSent", (e) => {
  peticiones.set(e.requestId, { url: e.request.url, tipo: e.type, inicio: e.timestamp, t0: e.wallTime });
});
cdp.on("Network.responseReceived", (e) => {
  const p = peticiones.get(e.requestId); if (!p) return;
  p.status = e.response.status; p.mime = e.response.mimeType;
  p.desdeCache = e.response.fromDiskCache || e.response.fromPrefetchCache;
  p.headers = e.response.headers;
  p.tipoRec = e.type;
});
cdp.on("Network.loadingFinished", (e) => {
  const p = peticiones.get(e.requestId); if (!p) return;
  p.transferido = e.encodedDataLength; p.fin = e.timestamp;
});
cdp.on("Network.loadingFailed", (e) => {
  const p = peticiones.get(e.requestId); if (!p) return; p.fallo = e.errorText;
});

await cdp.send("Network.enable");
await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
await cdp.send("Network.emulateNetworkConditions", REDES[PERFIL]);
await cdp.send("Emulation.setCPUThrottlingRate", { rate: CPU });
await page.addInitScript(OBSERVADOR);

await page.goto(URL_OBJETIVO, { waitUntil: "load", timeout: 300000 });
await page.waitForTimeout(9000);

const antesScroll = await page.evaluate(() => ({ ...window.__m, altura: document.documentElement.scrollHeight, alto: window.innerHeight, ancho: window.innerWidth }));
const bytesAntes = [...peticiones.values()].reduce((a, p) => a + (p.transferido || 0), 0);
const nAntes = peticiones.size;

let bytesDespues = bytesAntes, nDespues = nAntes;
if (SCROLL) {
  await page.evaluate(async () => {
    const h = document.documentElement.scrollHeight;
    for (let y = 0; y < h; y += Math.round(window.innerHeight * 0.8)) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 220));
    }
    window.scrollTo(0, h);
  });
  await page.waitForTimeout(9000);
  bytesDespues = [...peticiones.values()].reduce((a, p) => a + (p.transferido || 0), 0);
  nDespues = peticiones.size;
}

const nav = await page.evaluate(() => {
  const n = performance.getEntriesByType("navigation")[0] || {};
  return { ttfb: n.responseStart, dcl: n.domContentLoadedEventEnd, load: n.loadEventEnd, domInteractive: n.domInteractive };
});
const m = await page.evaluate(() => window.__m);

const fcp = antesScroll.fcp ?? 0;
const largas = antesScroll.long.filter(t => t.i + t.d > fcp);
const tbt = largas.reduce((a, t) => a + Math.max(0, Math.min(t.d, t.i + t.d - fcp) - 50), 0);
let interactivo = Math.max(fcp, nav.dcl || 0);
for (const t of [...largas].sort((a, b) => a.i - b.i)) {
  if (t.i >= interactivo + 5000) break;
  interactivo = Math.max(interactivo, t.i + t.d);
}

const listado = [...peticiones.values()].map(p => ({
  url: p.url, tipo: p.tipoRec || p.tipo, mime: p.mime, status: p.status,
  transferido: p.transferido || 0, fallo: p.fallo || null,
  enc: p.headers && (p.headers["content-encoding"] || p.headers["Content-Encoding"]) || null,
})).sort((a, b) => b.transferido - a.transferido);

const salida = {
  url: URL_OBJETIVO, perfil: PERFIL, cpu: CPU, dispositivo: DISPOSITIVO,
  viewport: { ancho: antesScroll.ancho, alto: antesScroll.alto },
  alturaPagina: antesScroll.altura,
  ms: { ttfb: Math.round(nav.ttfb), primerPintado: Math.round(antesScroll.primerPintado ?? -1), fcp: Math.round(fcp),
        lcp: Math.round(antesScroll.lcp ?? -1), domInteractive: Math.round(nav.domInteractive),
        dcl: Math.round(nav.dcl), load: Math.round(nav.load), tbt: Math.round(tbt), interactivo: Math.round(interactivo) },
  cls: { antesScroll: +(antesScroll.cls || 0).toFixed(4), total: +(m.cls || 0).toFixed(4), eventos: m.shifts, fuentes: m.clsFuentes },
  lcpElemento: antesScroll.lcpEl, lcpUrl: antesScroll.lcpUrl || null,
  bytes: { sinScroll: bytesAntes, conScroll: bytesDespues },
  peticiones: { sinScroll: nAntes, conScroll: nDespues },
  recursos: listado,
  tareasLargas: largas,
};
fs.writeFileSync(SALIDA, JSON.stringify(salida, null, 2));
console.log(JSON.stringify({ ...salida.ms, cls: salida.cls.total, kbSinScroll: +(bytesAntes/1024).toFixed(1), kbConScroll: +(bytesDespues/1024).toFixed(1), peticiones: salida.peticiones, altura: salida.alturaPagina, alto: salida.viewport.alto, lcpEl: antesScroll.lcpEl && antesScroll.lcpEl.tag + ' ' + antesScroll.lcpEl.texto.slice(0,50) }, null, 2));
await navegador.close();
