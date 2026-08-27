import { test, expect } from "@playwright/test";

/**
 * Lo que se veía roto en la auditoría del 26/08.
 *
 * Ninguno de estos es cuestión de gusto: son cosas que un dueño ve mal hechas
 * en la primera pasada. Los tres primeros los medí en 1024, 1152, 1280, 1440,
 * 1600 y 1920 y aparecían en los seis, así que estos tests fijan el ancho a
 * mano en vez de confiar en el device del proyecto.
 */

const ANCHOS = [1024, 1280, 1600];

/** El IntersectionObserver esconde lo que todavía no se vio. */
async function revelar(page) {
  await page.evaluate(() => {
    document.querySelectorAll(".v-reveal").forEach((e) => e.classList.add("v-reveal-visible"));
  });
  await page.waitForTimeout(200);
}

for (const ancho of ANCHOS) {
  test(`a ${ancho}: el titular del FAQ no parte una palabra al medio`, async ({ page }) => {
    // Rompía en cinco líneas y dejaba la "n." de PREGUNTAN sola en la última.
    // La columna de 3/12 pedía ~230px para una palabra que necesita ~238.
    await page.setViewportSize({ width: ancho, height: 900 });
    await page.goto("/");
    await revelar(page);

    const h2 = page.locator("#faq h2");
    const lineas = await h2.evaluate((el) => {
      const lh = parseFloat(getComputedStyle(el).lineHeight);
      return Math.round(el.getBoundingClientRect().height / lh);
    });
    expect(lineas).toBeLessThanOrEqual(4);

    // Y ninguna línea puede ser un pedazo de palabra: se mide la última.
    const ultima = await h2.evaluate((el) => {
      const nodo = [...el.childNodes].find((n) => n.nodeType === 3);
      if (!nodo) return "";
      const r = document.createRange();
      const s = nodo.textContent;
      let top = -1, out = "";
      for (let i = 0; i < s.length; i++) {
        r.setStart(nodo, i); r.setEnd(nodo, i + 1);
        const rc = r.getBoundingClientRect();
        if (rc.top > top) { top = rc.top; out = ""; }
        if (Math.abs(rc.top - top) < 2) out += s[i];
      }
      return out.trim();
    });
    expect(ultima.length).toBeGreaterThan(2);
  });

  test(`a ${ancho}: ninguna cabecera de sponsor se encima a su chip`, async ({ page }) => {
    // h-14 era un alto FIJO de 56px para el casillero de la marca. Con logo
    // no molestaba; con el nombre en texto sí: "Asociación de Marcas y
    // Franquicias" cae a tres líneas (~84px) y se derramaba 10px sobre el
    // chip. Se arregló con min-h-14.
    //
    // El test mira la CAJA de la cabecera y no el texto. Cuando entraron los
    // logos reales, la versión anterior —que buscaba el nombre escrito— dejó
    // de encontrar nada y pasó a fallar sola. La garantía es la misma y hay
    // que sostenerla en los dos casos, porque el texto vuelve solo con que un
    // sponsor no traiga archivo.
    await page.setViewportSize({ width: ancho, height: 900 });
    await page.goto("/");
    await revelar(page);

    const encimados = await page.evaluate(() => {
      const out = [];
      for (const art of document.querySelectorAll("#partners article")) {
        const cabecera = art.firstElementChild;
        const chip = art.querySelector(".chip");
        if (!cabecera || !chip) continue;
        // Lo que se mide es el CONTENIDO de la cabecera —el logo o el nombre
        // escrito—, no su caja. La caja tiene alto fijo y no crece: lo que se
        // derrama es el texto de adentro, así que midiendo la caja el test
        // pasa con el bug puesto. Lo comprobé reintroduciéndolo.
        const dentro = cabecera.querySelector("img, span") || cabecera;
        const a = dentro.getBoundingClientRect();
        const b = chip.getBoundingClientRect();
        const solape = Math.round(Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
        if (solape > 0) out.push((art.innerText || "").trim().slice(0, 30) + ": " + solape + "px");
      }
      return out;
    });
    expect(encimados).toEqual([]);
  });

  test(`a ${ancho}: el texto de "Qué te llevás" no llega pegado al borde`, async ({ page }) => {
    // El truco de gap-px dibuja los filetes con el fondo del ul, así que los
    // renglones no tenían relleno propio: el "01" arrancaba en el borde y el
    // texto cortaba contra el otro.
    await page.setViewportSize({ width: ancho, height: 900 });
    await page.goto("/");
    await revelar(page);

    const pad = await page.locator("#el-lunes li").first().evaluate((el) => {
      const cs = getComputedStyle(el);
      return { izq: parseFloat(cs.paddingLeft), der: parseFloat(cs.paddingRight) };
    });
    expect(pad.izq).toBeGreaterThanOrEqual(16);
    expect(pad.der).toBeGreaterThanOrEqual(16);
  });
}

test("la grilla de partners no deja una tarjeta sola con la fila vacía", async ({ page }) => {
  // Cuatro tarjetas en tres columnas dejaban la cuarta sola con dos tercios
  // de fila en blanco, y se leía como si faltara un partner.
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await revelar(page);

  const filas = await page.evaluate(() => {
    const arts = [...document.querySelectorAll("#partners article")];
    const tops = new Set(arts.map((a) => Math.round(a.getBoundingClientRect().top)));
    const porFila = [...tops].map(
      (t) => arts.filter((a) => Math.round(a.getBoundingClientRect().top) === t).length
    );
    return { total: arts.length, porFila };
  });
  // Ninguna fila puede quedar con menos de la mitad de las tarjetas de la
  // fila más llena.
  const max = Math.max(...filas.porFila);
  for (const n of filas.porFila) expect(n).toBeGreaterThanOrEqual(max / 2);
});

test("solo el tramo activo de #acceso lleva su cifra en negro", async ({ page }) => {
  // El "0" de la lista de espera pesaba lo mismo que el "115" que sí importa:
  // el elemento tipográfico más grande de esa tarjeta era un cero.
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await revelar(page);

  const cifras = await page.evaluate(() => {
    return [...document.querySelectorAll("#acceso article")].map((a) => ({
      txt: a.querySelector("p span").innerText.trim(),
      color: getComputedStyle(a.querySelector("p span")).color,
      activo: !!a.querySelector('a[href="#reservar"]'),
    }));
  });

  const activo = cifras.find((c) => c.activo);
  expect(activo).toBeTruthy();

  // El color de la cifra del tramo activo no puede repetirse en ningún otro:
  // si se repite, hay dos números compitiendo por la misma atención y uno de
  // ellos es un cero.
  const iguales = cifras.filter((c) => c.color === activo.color);
  expect(iguales).toHaveLength(1);
});
