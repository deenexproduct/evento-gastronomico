import { test, expect } from "@playwright/test";

/**
 * Cubre los tres bugs que se escaparon durante el desarrollo y que solo
 * aparecieron mirando la página a mano:
 *   1. cinco enlaces del menú apuntando a anclas inexistentes,
 *   2. la página entera quedando en opacity 0,
 *   3. controles por debajo del mínimo táctil.
 */

/** Calcula el contraste real, resolviendo transparencias contra el fondo. */
const MEDIR_CONTRASTE = () => {
  const lum = ([r, g, b]) => {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  };
  const partes = (s) => (s.match(/[\d.]+/g) || []).map(Number);
  const mezclar = (fg, alfa, bg) => fg.map((c, i) => c * alfa + bg[i] * (1 - alfa));

  function fondoReal(el) {
    let n = el;
    while (n && n !== document.documentElement) {
      const c = partes(getComputedStyle(n).backgroundColor);
      if (c.length >= 3 && (c[3] === undefined || c[3] > 0.85)) return c.slice(0, 3);
      n = n.parentElement;
    }
    return [26, 26, 26];
  }

  const fallas = [];
  document.querySelectorAll("p,span,li,a,h1,h2,h3,button,label,dt,dd").forEach((el) => {
    if (!el.innerText || !el.innerText.trim() || el.children.length) return;
    const cs = getComputedStyle(el);
    const color = partes(cs.color);
    if (color.length < 3) return;
    const bg = fondoReal(el);
    const fg = color[3] !== undefined && color[3] < 1
      ? mezclar(color.slice(0, 3), color[3], bg)
      : color.slice(0, 3);
    const L1 = lum(fg);
    const L2 = lum(bg);
    const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    const px = parseFloat(cs.fontSize);
    const grande = px >= 24 || (px >= 18.66 && +cs.fontWeight >= 700);
    const minimo = grande ? 3 : 4.5;
    if (ratio < minimo) {
      fallas.push({ texto: el.innerText.trim().slice(0, 40), ratio: +ratio.toFixed(2), minimo });
    }
  });
  return fallas;
};

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
});

test("todo el texto pasa contraste AA", async ({ page }) => {
  const fallas = await page.evaluate(MEDIR_CONTRASTE);
  expect(fallas, `Elementos bajo el mínimo: ${JSON.stringify(fallas, null, 1)}`).toEqual([]);
});

test("ningún enlace interno apunta a un ancla inexistente", async ({ page }) => {
  const rotas = await page.evaluate(() => {
    const anclas = [...document.querySelectorAll('a[href^="#"]')]
      .map((a) => a.getAttribute("href"))
      .filter((h) => h && h.length > 1);
    return [...new Set(anclas)].filter((h) => {
      try {
        return !document.querySelector(h);
      } catch {
        return true;
      }
    });
  });
  expect(rotas, `Anclas sin destino: ${rotas.join(", ")}`).toEqual([]);
});

test("el respaldo revela el contenido aunque el observer no dispare", async ({ page }) => {
  // Fuera de pantalla el reveal arranca en opacity 0 a propósito. Lo que no
  // puede pasar es que quede invisible para siempre: hay un respaldo a los
  // dos segundos justamente para eso.
  await page.waitForTimeout(2600);
  const invisibles = await page.evaluate(() =>
    [...document.querySelectorAll(".v-reveal")]
      .filter((el) => getComputedStyle(el).opacity === "0")
      .map((el) => el.id || el.className.toString().slice(0, 40))
  );
  expect(invisibles, `Quedaron invisibles: ${invisibles.join(" · ")}`).toEqual([]);
});

test("los controles llegan al mínimo táctil", async ({ page }) => {
  const chicos = await page.evaluate(() =>
    [...document.querySelectorAll("a,button")]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && r.height < 44 && !el.className.includes("saltar");
      })
      .map((el) => `${el.innerText.trim().slice(0, 30)} (${Math.round(el.getBoundingClientRect().height)}px)`)
  );
  expect(chicos, `Controles bajo 44px: ${chicos.join(" · ")}`).toEqual([]);
});

test("la estructura de encabezados es correcta", async ({ page }) => {
  const { h1, saltos } = await page.evaluate(() => {
    const hs = [...document.querySelectorAll("h1,h2,h3,h4")];
    const niveles = hs.map((h) => +h.tagName[1]);
    const saltos = [];
    for (let i = 1; i < niveles.length; i++) {
      if (niveles[i] - niveles[i - 1] > 1) saltos.push(hs[i].innerText.slice(0, 30));
    }
    return { h1: document.querySelectorAll("h1").length, saltos };
  });
  expect(h1).toBe(1);
  expect(saltos).toEqual([]);
});

test("no hay imágenes sin alt ni campos sin etiqueta", async ({ page }) => {
  const problemas = await page.evaluate(() => ({
    imgSinAlt: [...document.querySelectorAll("img")].filter((i) => !i.alt || !i.alt.trim()).length,
    camposSinLabel: [...document.querySelectorAll("input,select")].filter(
      (e) =>
        e.type !== "checkbox" &&
        !document.querySelector(`label[for="${e.id}"]`) &&
        !e.getAttribute("aria-label")
    ).length,
    iframeSinTitle: [...document.querySelectorAll("iframe")].filter((f) => !f.title).length,
  }));
  expect(problemas).toEqual({ imgSinAlt: 0, camposSinLabel: 0, iframeSinTitle: 0 });
});

test("la página no scrollea de costado", async ({ page }) => {
  const desborde = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 1
  );
  expect(desborde).toBe(false);
});

test("las respuestas cerradas del FAQ no se le leen al lector de pantalla", async ({ page }) => {
  // El panel cerrado mide cero de alto, pero eso no lo saca del árbol de
  // accesibilidad: sin inert se leen las diez respuestas seguidas mientras
  // cada botón dice aria-expanded="false".
  const estado = await page.evaluate(() =>
    [...document.querySelectorAll('[id^="faq-panel-"]')].map((p) => ({
      abierto:
        document.querySelector(`[aria-controls="${p.id}"]`).getAttribute("aria-expanded") === "true",
      inerte: p.hasAttribute("inert"),
    }))
  );

  expect(estado.length).toBeGreaterThan(1);
  // Como mucho uno abierto: es un acordeón, no una lista de desplegables
  // independientes. Cero también vale y es lo que pasa al cargar: el panel
  // que venía abierto de fábrica era el que menos falta hacía y ocupaba
  // media pantalla de teléfono empujando las otras nueve preguntas.
  expect(estado.filter((e) => e.abierto).length).toBeLessThanOrEqual(1);
  // Ésta es la garantía que importa y no cambió: lo cerrado no se lee.
  estado.forEach((e) => expect(e.inerte).toBe(!e.abierto));
});
