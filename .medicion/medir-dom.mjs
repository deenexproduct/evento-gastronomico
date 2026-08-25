import { chromium, devices } from "@playwright/test";
import fs from "node:fs";

const URL_OBJETIVO = process.argv[2];
const MODO = process.argv[3] || "movil"; // movil | escritorio
const SALIDA = process.argv[4] || ".medicion/dom.json";

const navegador = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const ctx = MODO === "movil"
  ? await navegador.newContext({ ...devices["Pixel 7"] })
  : await navegador.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto(URL_OBJETIVO, { waitUntil: "networkidle", timeout: 180000 });

// Revelar todo (el IntersectionObserver oculta secciones no vistas)
await page.evaluate(async () => {
  const h = document.documentElement.scrollHeight;
  for (let y = 0; y < h; y += Math.round(window.innerHeight * 0.7)) {
    window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120));
  }
  document.querySelectorAll('.v-reveal').forEach(e => e.classList.add('v-reveal-visible'));
  window.scrollTo(0, 0);
  await new Promise(r => setTimeout(r, 800));
});
await page.waitForTimeout(1500);

const datos = await page.evaluate(() => {
  const R = {};
  const vw = window.innerWidth, vh = window.innerHeight;
  R.viewport = { vw, vh };
  R.alturaPagina = document.documentElement.scrollHeight;
  R.pantallas = +(document.documentElement.scrollHeight / vh).toFixed(2);

  const palabras = (t) => (t || "").trim().split(/\s+/).filter(x => x.length).length;
  const esVisible = (el) => {
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };

  // ── Secciones ────────────────────────────────────────────────────────
  const raiz = document.querySelector("main") || document.body;
  const secciones = [...raiz.children].filter(esVisible);
  const nav = document.querySelector("nav, header");
  const pie = document.querySelector("footer");

  const analizar = (el, nombre) => {
    const r = el.getBoundingClientRect();
    const top = Math.round(r.top + window.scrollY);
    const alto = Math.round(r.height);
    const texto = (el.innerText || "").replace(/\s+/g, " ").trim();
    const imgs = [...el.querySelectorAll("img")].filter(esVisible);
    const svgs = [...el.querySelectorAll("svg")].filter(esVisible);
    const videos = [...el.querySelectorAll("video, iframe, canvas")].filter(esVisible);
    const area = (n) => { const b = n.getBoundingClientRect(); return Math.round(b.width * b.height); };
    const areaFig = [...imgs, ...svgs, ...videos].reduce((a, n) => a + area(n), 0);
    const areaSec = Math.round(r.width * r.height);

    // Piezas puramente CSS: elementos con gradiente, borde visible, o
    // pseudo-elemento con contenido/superficie.
    let cssPiezas = 0; const cssDetalle = {};
    const marca = (k) => { cssPiezas++; cssDetalle[k] = (cssDetalle[k] || 0) + 1; };
    for (const n of el.querySelectorAll("*")) {
      if (!esVisible(n)) continue;
      const cs = getComputedStyle(n);
      if (cs.backgroundImage && cs.backgroundImage.includes("gradient")) marca("gradiente");
      const b = n.getBoundingClientRect();
      if (b.height <= 3 && b.width > 24 && (cs.backgroundColor !== "rgba(0, 0, 0, 0)" || cs.borderTopWidth !== "0px")) marca("regla/linea");
      for (const p of ["::before", "::after"]) {
        const ps = getComputedStyle(n, p);
        if (!ps) continue;
        const c = ps.content;
        const tieneFondo = ps.backgroundColor !== "rgba(0, 0, 0, 0)" || (ps.backgroundImage && ps.backgroundImage !== "none");
        if (c && c !== "none" && c !== "normal" && (c !== '""' || tieneFondo)) marca("pseudo");
      }
    }
    // Contornos de tarjeta (elementos con borde en los 4 lados y radio)
    let tarjetas = 0;
    for (const n of el.querySelectorAll("*")) {
      if (!esVisible(n)) continue;
      const cs = getComputedStyle(n);
      const bw = parseFloat(cs.borderTopWidth) || 0;
      const br = parseFloat(cs.borderTopLeftRadius) || 0;
      const bb = cs.backgroundColor;
      const b = n.getBoundingClientRect();
      if (b.height > 40 && b.width > 60 && ((bw > 0 && br > 0) || (br > 4 && bb !== "rgba(0, 0, 0, 0)"))) tarjetas++;
    }

    return {
      nombre, id: el.id || null, clases: String(el.className || "").slice(0, 90),
      top, alto, pantallas: +(alto / vh).toFixed(2),
      pantallaEnQueEmpieza: +(top / vh).toFixed(2),
      palabras: palabras(texto), caracteres: texto.length,
      imgs: imgs.length, svgs: svgs.length, videosIframes: videos.length,
      areaSeccionPx2: areaSec, areaFigurasPx2: areaFig,
      figuraPorcentaje: areaSec ? +(100 * areaFig / areaSec).toFixed(2) : 0,
      soloTexto: (imgs.length + svgs.length + videos.length) === 0,
      cssPiezas, cssDetalle, tarjetas,
      fondo: getComputedStyle(el).backgroundColor,
      encabezado: (el.querySelector("h1,h2,h3") || {}).innerText || null,
      textoInicio: texto.slice(0, 90),
    };
  };

  R.secciones = secciones.map((s, i) => analizar(s, "S" + (i + 1)));
  if (nav) R.nav = analizar(nav, "nav");
  if (pie) R.pie = analizar(pie, "footer");

  // ── Totales de texto ────────────────────────────────────────────────
  const textoTotal = (document.body.innerText || "").replace(/\s+/g, " ").trim();
  R.texto = {
    palabrasTotales: palabras(textoTotal),
    caracteresTotales: textoTotal.length,
    palabrasMain: palabras((raiz.innerText || "")),
    palabrasNav: nav ? palabras(nav.innerText) : 0,
    palabrasPie: pie ? palabras(pie.innerText) : 0,
    encabezados: [...document.querySelectorAll("h1,h2,h3")].filter(esVisible).map(h => ({ n: h.tagName, t: h.innerText.replace(/\s+/g, " ").trim().slice(0, 90), palabras: palabras(h.innerText) })),
  };

  // ── Inventario de imágenes ──────────────────────────────────────────
  R.imagenes = [...document.querySelectorAll("img")].map(i => {
    const r = i.getBoundingClientRect();
    return {
      src: (i.currentSrc || i.src || "").split("/").pop().slice(0, 70),
      urlCompleta: (i.currentSrc || i.src || "").slice(0, 140),
      natural: i.naturalWidth + "x" + i.naturalHeight,
      pintado: Math.round(r.width) + "x" + Math.round(r.height),
      loading: i.loading, decoding: i.decoding, alt: (i.alt || "").slice(0, 70),
      visible: r.width > 0 && r.height > 0,
      seccion: (i.closest("section,header,footer,nav") || {}).id || null,
      y: Math.round(r.top + window.scrollY),
    };
  });

  // ── Inventario de SVG en línea (pictogramas) ────────────────────────
  const svgs = [...document.querySelectorAll("svg")];
  R.svgs = { total: svgs.length, visibles: svgs.filter(esVisible).length };
  const firmas = {};
  for (const s of svgs) {
    const cls = String(s.getAttribute("class") || "");
    const paths = s.querySelectorAll("path,circle,rect,line,polyline,polygon").length;
    const clave = (s.getAttribute("data-lucide") || cls.match(/lucide-[a-z0-9-]+/)?.[0] || `svg-${paths}formas-${Math.round(s.getBoundingClientRect().width)}px`);
    firmas[clave] = (firmas[clave] || 0) + 1;
  }
  R.svgFirmas = firmas;
  R.svgDetalle = svgs.filter(esVisible).map(s => {
    const r = s.getBoundingClientRect();
    return {
      w: Math.round(r.width), h: Math.round(r.height),
      formas: s.querySelectorAll("path,circle,rect,line,polyline,polygon").length,
      clase: String(s.getAttribute("class") || "").slice(0, 60),
      seccion: (s.closest("section,header,footer,nav") || {}).id || null,
      y: Math.round(r.top + window.scrollY),
      d: (s.querySelector("path") || {}).getAttribute ? String((s.querySelector("path")).getAttribute("d") || "").slice(0, 40) : null,
    };
  });

  // ── Enlaces / CTA ───────────────────────────────────────────────────
  const cta = [...document.querySelectorAll("a,button")].filter(esVisible).map(a => {
    const r = a.getBoundingClientRect();
    return { t: (a.innerText || "").replace(/\s+/g, " ").trim().slice(0, 60), href: (a.getAttribute("href") || "").slice(0, 90),
      y: Math.round(r.top + window.scrollY), alto: Math.round(r.height), ancho: Math.round(r.width) };
  });
  R.cta = cta.filter(c => /reserv|anotar|whatsapp|lugar|sumar|escrib|avis/i.test(c.t) || /wa\.me|whatsapp|#registro/i.test(c.href));
  R.totalEnlaces = cta.length;

  // ── Movimiento ──────────────────────────────────────────────────────
  const anims = document.getAnimations ? document.getAnimations() : [];
  R.animacionesActivas = anims.map(a => ({
    tipo: a.constructor.name,
    nombre: a.animationName || (a.transitionProperty || null),
    estado: a.playState,
    objetivo: a.effect && a.effect.target ? (a.effect.target.tagName + "." + String(a.effect.target.className || "").slice(0, 40)) : null,
    duracion: a.effect && a.effect.getTiming ? a.effect.getTiming().duration : null,
  }));

  // Declaraciones de movimiento en las hojas de estilo
  const decl = { keyframes: [], transiciones: 0, animaciones: 0, hover: 0 };
  for (const hoja of document.styleSheets) {
    let reglas; try { reglas = hoja.cssRules; } catch (e) { continue; }
    const recorrer = (rs) => {
      for (const r of rs) {
        if (r.type === 7 || r.constructor.name === "CSSKeyframesRule") decl.keyframes.push(r.name);
        else if (r.style) {
          if (r.style.transition || r.style.transitionProperty) decl.transiciones++;
          if (r.style.animation || r.style.animationName) decl.animaciones++;
          if (r.selectorText && r.selectorText.includes(":hover")) decl.hover++;
        }
        if (r.cssRules) recorrer(r.cssRules);
      }
    };
    recorrer(reglas);
  }
  R.movimientoDeclarado = decl;
  R.reveals = document.querySelectorAll(".v-reveal").length;
  R.cintas = document.querySelectorAll(".cinta").length;

  return R;
});

fs.writeFileSync(SALIDA, JSON.stringify(datos, null, 2));
console.log("alturaPagina", datos.alturaPagina, "vh", datos.viewport.vh, "pantallas", datos.pantallas, "palabras", datos.texto.palabrasTotales, "imgs", datos.imagenes.length, "svgs", datos.svgs.total);
await navegador.close();
