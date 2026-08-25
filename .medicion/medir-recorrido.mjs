import { chromium, devices } from "@playwright/test";
import fs from "node:fs";

const URL_OBJETIVO = process.argv[2];
const ANCHO = Number(process.argv[3] || 393);
const ALTO = Number(process.argv[4] || 664);
const SALIDA = process.argv[5] || ".medicion/recorrido.json";

const navegador = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const ctx = await navegador.newContext({
  viewport: { width: ANCHO, height: ALTO }, deviceScaleFactor: 3,
  isMobile: true, hasTouch: true,
  userAgent: devices["Pixel 7"].userAgent,
});
const page = await ctx.newPage();
await page.goto(URL_OBJETIVO, { waitUntil: "networkidle", timeout: 180000 });
await page.evaluate(async () => {
  const h = document.documentElement.scrollHeight;
  for (let y = 0; y < h; y += Math.round(window.innerHeight * 0.7)) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 100)); }
  document.querySelectorAll('.v-reveal').forEach(e => e.classList.add('v-reveal-visible'));
  window.scrollTo(0, 0); await new Promise(r => setTimeout(r, 600));
});

const R = await page.evaluate(() => {
  const vh = window.innerHeight, vw = window.innerWidth;
  const H = document.documentElement.scrollHeight;
  const pal = (t) => (t || "").trim().split(/\s+/).filter(Boolean).length;
  const raiz = document.querySelector("main");
  const secs = [...raiz.children].filter(e => e.getBoundingClientRect().height > 0);

  // Palabras acumuladas hasta el inicio de cada sección
  let acum = 0; const tabla = [];
  for (const s of secs) {
    const r = s.getBoundingClientRect(); const top = Math.round(r.top + window.scrollY);
    tabla.push({ id: s.id || null, top, alto: Math.round(r.height), palabrasAntes: acum, palabras: pal(s.innerText) });
    acum += pal(s.innerText);
  }

  // Texto de la primera pantalla y de las tres primeras
  const enRango = (a, b) => {
    let t = "";
    for (const n of document.querySelectorAll("main h1,main h2,main h3,main p,main li,main span,main a,main strong")) {
      const r = n.getBoundingClientRect(); const y = r.top + window.scrollY;
      if (y >= a && y < b && n.children.length === 0) t += " " + n.innerText;
    }
    return t.replace(/\s+/g, " ").trim();
  };

  // Censo de piezas dibujadas con CSS
  const censo = { gradientes: 0, lineasRegla: 0, tarjetasBorde: 0, pastillas: 0, superficiesAcento: 0, pseudoConContenido: 0, sombras: 0, radios: 0, puntos: 0 };
  const vis = (el) => { const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden') return false; const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
  for (const n of document.querySelectorAll("body *")) {
    if (!vis(n)) continue;
    const cs = getComputedStyle(n); const r = n.getBoundingClientRect();
    if (cs.backgroundImage.includes("gradient")) censo.gradientes++;
    if (cs.boxShadow && cs.boxShadow !== "none") censo.sombras++;
    const bw = parseFloat(cs.borderTopWidth) || 0, bwB = parseFloat(cs.borderBottomWidth) || 0;
    const br = parseFloat(cs.borderTopLeftRadius) || 0;
    if ((r.height <= 2 || bwB > 0 && r.height < 4) && r.width > 40) censo.lineasRegla++;
    if (bw > 0 && br > 0 && r.height > 40) censo.tarjetasBorde++;
    if (br >= 9999 || (br > 12 && r.height <= 40 && r.height > 12)) censo.pastillas++;
    if (/^rgb\(224, 0, 73\)|^rgb\(199, 0, 63\)/.test(cs.backgroundColor)) censo.superficiesAcento++;
    if (br > 4 && r.height > 8) censo.radios++;
    if (r.width <= 12 && r.height <= 12 && br > 3) censo.puntos++;
    for (const p of ["::before", "::after"]) {
      const ps = getComputedStyle(n, p); if (!ps) continue;
      if (ps.content && ps.content !== "none" && ps.content !== "normal") censo.pseudoConContenido++;
    }
  }

  // hover: cuántos elementos dependen de :hover (muerto en táctil)
  let hoverSel = 0, hoverElems = 0;
  for (const hoja of document.styleSheets) { let rs; try { rs = hoja.cssRules; } catch (e) { continue; }
    const rec = (l) => { for (const r of l) { if (r.selectorText && r.selectorText.includes(":hover")) {
      hoverSel++; try { hoverElems += document.querySelectorAll(r.selectorText.replace(/:hover/g, "")).length; } catch (e) {} }
      if (r.cssRules) rec(r.cssRules); } };
    rec(rs); }

  // El elemento con animación ping
  const ping = [...document.querySelectorAll("*")].filter(e => getComputedStyle(e).animationName === "ping").map(e => ({
    cls: String(e.className).slice(0, 80), y: Math.round(e.getBoundingClientRect().top + window.scrollY),
    tam: Math.round(e.getBoundingClientRect().width) + "x" + Math.round(e.getBoundingClientRect().height),
    seccion: (e.closest("section") || {}).id || null }));

  return {
    vw, vh, H, pantallas: +(H / vh).toFixed(2), tabla,
    textoPantalla1: enRango(0, vh), textoPantalla2: enRango(vh, vh * 2), textoPantalla3: enRango(vh * 2, vh * 3),
    palabrasPantalla1: pal(enRango(0, vh)),
    censo, hoverSel, hoverElems, ping,
    ctas: [...document.querySelectorAll("a[href*='wa.me'], a[href='#registro'], button")].map(a => {
      const r = a.getBoundingClientRect();
      return { t: (a.innerText || "").replace(/\s+/g, " ").trim().slice(0, 45), href: (a.getAttribute("href") || "").slice(0, 40),
        y: Math.round(r.top + window.scrollY), pantalla: +((r.top + window.scrollY) / vh).toFixed(2) };
    }),
  };
});

// ── Tiempo real de scroll con toques simulados ─────────────────────────
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(400);
const objetivo = await page.evaluate(() => {
  const r = document.getElementById("registro").getBoundingClientRect();
  return Math.round(r.top + window.scrollY);
});
const PASO = Math.round(R.vh * 1.2);   // un flick cómodo ≈ 1,2 pantallas
const CADENCIA = 600;                  // ms entre flicks al escanear rápido
const flicks = Math.ceil(objetivo / PASO);
const segundos = +(flicks * CADENCIA / 1000).toFixed(1);

// medición empírica: swipes reales hasta ver #registro
const t0 = Date.now();
let y = 0, n = 0;
while (y < objetivo && n < 200) {
  await page.mouse.wheel(0, PASO);
  await page.waitForTimeout(60);
  y = await page.evaluate(() => window.scrollY);
  n++;
}
const msMedidos = Date.now() - t0;

const salida = { ...R, recorrido: { yRegistro: objetivo, pasoPx: PASO, flicksNecesarios: flicks, cadenciaMs: CADENCIA, segundosEstimados: segundos, swipesMedidos: n, msMedidosSinPausas: msMedidos } };
fs.writeFileSync(SALIDA, JSON.stringify(salida, null, 2));
console.log(JSON.stringify({ vw: R.vw, vh: R.vh, H: R.H, pantallas: R.pantallas, palabrasPantalla1: R.palabrasPantalla1, censo: R.censo, hoverSel: R.hoverSel, hoverElems: R.hoverElems, ping: R.ping, recorrido: salida.recorrido }, null, 2));
await navegador.close();
