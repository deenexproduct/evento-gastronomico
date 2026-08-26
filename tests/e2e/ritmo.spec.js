import { test, expect } from "@playwright/test";

/**
 * El ritmo de la página: costuras, turnos entre las dos píldoras y para qué
 * sirve el magenta.
 *
 * Los tres son del conjunto, no de una sección: no se ven leyendo un
 * componente, solo midiendo la página entera.
 */

/** El IntersectionObserver esconde lo que todavía no se vio. */
async function revelarTodo(page) {
  await page.evaluate(async () => {
    const h = document.documentElement.scrollHeight;
    for (let y = 0; y < h; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    document.querySelectorAll(".v-reveal").forEach((e) => e.classList.add("v-reveal-visible"));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 300));
  });
  await page.waitForTimeout(600);
}

test("ningún límite entre secciones es invisible", async ({ page }) => {
  // Los tres fondos de sección viven en 16 niveles de gris y la mayoría de
  // los límites son 246 contra 239: siete niveles. #detras y #alan tenían
  // EXACTAMENTE el mismo fondo, pegadas, sin nada en el medio.
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  await revelarTodo(page);

  const limites = await page.evaluate(() => {
    const main = document.querySelector("main");
    const secs = [...main.children].filter((e) => e.getBoundingClientRect().height > 0);
    const lum = (c) => {
      const m = c.match(/\d+/g);
      return m ? +m[0] * 0.299 + +m[1] * 0.587 + +m[2] * 0.114 : 255;
    };
    const out = [];
    for (let i = 0; i < secs.length - 1; i++) {
      const a = secs[i], b = secs[i + 1];
      const ca = getComputedStyle(a), cb = getComputedStyle(b);
      out.push({
        limite: `${a.id || "?"} / ${b.id || "?"}`,
        // O hay filete, o hay contraste de fondo suficiente. Cualquiera de
        // los dos alcanza; ninguno de los dos, no.
        visible:
          parseFloat(ca.borderBottomWidth) > 0 ||
          parseFloat(cb.borderTopWidth) > 0 ||
          Math.abs(lum(ca.backgroundColor) - lum(cb.backgroundColor)) >= 12,
      });
    }
    return out;
  });

  expect(limites.filter((l) => !l.visible).map((l) => l.limite)).toEqual([]);
});

const PANTALLAS = [
  ["escritorio", { width: 1280, height: 800 }],
  ["teléfono", { width: 375, height: 667 }],
];

for (const [nombre, vp] of PANTALLAS) {
  test(`en ${nombre} las dos píldoras se turnan y nunca dejan al lector sin reservar`, async ({ page }) => {
    // El nav y la barra flotante llevan la misma píldora magenta. Con las dos
    // a la vez el magenta deja de querer decir "esta es LA acción"; sin
    // ninguna, el lector se queda sin forma de reservar. Las dos cosas se
    // miden juntas porque arreglar una rompe la otra: escondiendo la píldora
    // con un umbral propio del nav, en escritorio quedaba una pantalla entera
    // cerca del final sin nada que reserve.
    // En teléfono la página mide ~22.000px: el barrido no entra en el
    // timeout por defecto.
    test.setTimeout(180_000);
    await page.setViewportSize(vp);
    await page.goto("/");
    await revelarTodo(page);

    const alto = await page.evaluate(() => document.documentElement.scrollHeight);
    const dobles = [];
    const huecos = [];

    for (let y = 0; y < alto - vp.height; y += Math.round(vp.height * 0.75)) {
      await page.evaluate((v) => window.scrollTo(0, v), y);
      // El asentamiento importa: con 140ms aparecen falsos positivos del
      // IntersectionObserver que no existen para un lector.
      await page.waitForTimeout(450);
      const r = await page.evaluate(() => {
        const vis = (e) => {
          if (!e) return false;
          const b = e.getBoundingClientRect();
          return b.width > 0 && b.height > 0 && b.bottom > 0 && b.top < innerHeight;
        };
        const pastilla = [...document.querySelectorAll("header a")].find(
          (a) => a.innerText.trim() === "Reservar"
        );
        const barra = document.querySelector(".barra-fija");
        const enPantalla = [...document.querySelectorAll("a")].some(
          (a) => vis(a) && /reservar|quiero mi lugar/i.test(a.innerText)
        );
        return { p: vis(pastilla), b: vis(barra), enPantalla };
      });
      if (r.p && r.b) dobles.push(y);
      if (!r.p && !r.b && !r.enPantalla) huecos.push(y);
    }

    expect(dobles).toEqual([]);
    expect(huecos).toEqual([]);
  });
}

test("todo botón magenta pleno lleva a reservar", async ({ page }) => {
  // El magenta sólido es el único código de acción de la página. Había seis
  // botones con ese código: cinco decían reservar y el sexto iba a hablar de
  // partnership. Un código que significa dos cosas no significa ninguna.
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  await revelarTodo(page);

  const desviados = await page.evaluate(() => {
    const ACENTOS = ["rgb(224, 0, 73)", "rgb(199, 0, 63)", "rgb(216, 0, 71)"];
    const out = [];
    for (const el of document.querySelectorAll("a[href], button")) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      // El enlace de salto vive arriba del borde de la página hasta que
      // recibe foco: es accesibilidad, no una llamada a la acción.
      if (r.top + scrollY < 0) continue;
      if (!ACENTOS.includes(getComputedStyle(el).backgroundColor)) continue;
      const href = el.getAttribute("href") || "";
      const reserva =
        href === "#reservar" ||
        /GASTROTECH%20%C2%B7%20QUIERO|GASTROTECH · QUIERO/i.test(decodeURI(href)) ||
        /reservar|quiero mi lugar|anotarme/i.test(el.innerText);
      if (!reserva) out.push(el.innerText.trim().slice(0, 40) + " → " + href.slice(0, 45));
    }
    return out;
  });

  expect(desviados).toEqual([]);
});
