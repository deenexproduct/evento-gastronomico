import { test, expect } from "@playwright/test";

/**
 * LA JORNADA: que la respuesta se VEA al tocar, y que los siete sigan siendo
 * cuadrados.
 *
 * Por qué existe este archivo. Hasta ahora no había una sola prueba de layout
 * en el proyecto: ni del orden de secciones, ni de la alternancia de fondos,
 * ni de que la grilla de siete entre en una pantalla. El pedido del cliente
 * —"que los siete entren en una pantalla"— lo sostenían únicamente los
 * comentarios del código, y se rompía en silencio.
 *
 * Los tres modos de falla que esto atrapa, y los tres ya pasaron de verdad:
 *
 * 1. LA RESPUESTA FUERA DE PANTALLA. Con el panel colgado debajo de la
 *    grilla, tocar un cuadrado actualizaba un panel que estaba 137px por
 *    debajo del pliegue en 1440x900 y 736px en el teléfono. Lo único que se
 *    veía cambiar era el color de un borde.
 *
 * 2. LOS CUADRADOS DEFORMADOS. `aspect-ratio: 1/1` es un MÍNIMO, no un
 *    límite: si el texto no entra, el cuadrado se estira y nada falla. Con la
 *    quinta columna arrancando en lg (1024px), cada cuadrado quedaba en 160px
 *    de ancho y los títulos lo empujaban a 160x204. Se descubrió midiendo,
 *    no mirando.
 *
 * 3. EL TEXTO RECORTADO. .cuadro es overflow-hidden. A 195px de lado, el
 *    renglón del orador de los bloques 5 y 7 se cortaba 47 y 19px — el nombre
 *    salía partido a la mitad de una palabra. Tampoco falla nada: se recorta.
 *
 * NOTA DE MANTENIMIENTO: 1280 es el corte donde el panel se va al costado y
 * está atado a .panel-jornada en main.css. Si se mueve allá, se mueve acá.
 */

const anclar = async (page) => {
  for (let i = 0; i < 8; i++) {
    const d = await page.evaluate(() => {
      const s = document.getElementById("jornada");
      const t = s.getBoundingClientRect().top;
      window.scrollTo({ top: Math.round(t + window.scrollY - 88), behavior: "instant" });
      return Math.round(t - 88);
    });
    await page.waitForTimeout(150);
    if (Math.abs(d) <= 1) break;
  }
};

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(2400); // el respaldo de reveal
});

test("los siete bloques son cuadrados de verdad, en todo ancho", async ({ page }) => {
  for (const [w, h] of [
    [1440, 900],
    [1280, 800],
    [1024, 800],
    [768, 1024],
    [393, 664],
    [375, 667],
  ]) {
    await page.setViewportSize({ width: w, height: h });
    await anclar(page);
    const malos = await page.evaluate(() =>
      [...document.querySelectorAll("#jornada .cuadro")]
        .map((c, i) => {
          const r = c.getBoundingClientRect();
          return { i: i + 1, w: Math.round(r.width), h: Math.round(r.height) };
        })
        .filter((c) => Math.abs(c.w - c.h) > 2)
    );
    expect(malos, `cuadrados deformados a ${w}x${h}`).toEqual([]);
  }
});

test("ningún cuadrado recorta su propio texto", async ({ page }) => {
  for (const [w, h] of [
    [1440, 900],
    [1280, 800],
    [1024, 800],
    [393, 664],
  ]) {
    await page.setViewportSize({ width: w, height: h });
    await anclar(page);
    const recortados = await page.evaluate(() =>
      [...document.querySelectorAll("#jornada .cuadro")]
        .map((c, i) => ({ i: i + 1, px: c.scrollHeight - c.clientHeight }))
        .filter((c) => c.px > 1)
    );
    expect(recortados, `texto recortado a ${w}x${h}`).toEqual([]);
  }
});

test("de 1280 para arriba entran los siete Y la respuesta en una pantalla", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await anclar(page);
  const r = await page.evaluate(() => {
    const cu = [...document.querySelectorAll("#jornada .cuadro")];
    const p = document.querySelector('#jornada [aria-live="polite"]').getBoundingClientRect();
    return {
      vh: window.innerHeight,
      ultimo: Math.round(cu[cu.length - 1].getBoundingClientRect().bottom),
      panelTop: Math.round(p.top),
      panelBottom: Math.round(p.bottom),
    };
  });
  expect(r.ultimo, "el séptimo cuadrado se corta").toBeLessThanOrEqual(r.vh);
  expect(r.panelBottom, "el panel se corta").toBeLessThanOrEqual(r.vh);
  expect(r.panelTop).toBeGreaterThanOrEqual(0);
});

test("al tocar un bloque, la respuesta se ve sin buscarla", async ({ page }) => {
  // El caso que importa: teléfono, que es como llega el 100% del público.
  await page.setViewportSize({ width: 393, height: 664 });
  await anclar(page);

  for (const i of [0, 2, 4, 6]) {
    // Dejar el cuadrado objetivo a la vista, como quedaría al bajar con el dedo.
    for (let k = 0; k < 6; k++) {
      const d = await page.evaluate((n) => {
        const c = document.querySelectorAll("#jornada .cuadro")[n].getBoundingClientRect();
        const objetivo = (window.innerHeight - c.height) / 2;
        window.scrollTo({ top: Math.round(window.scrollY + c.top - objetivo), behavior: "instant" });
        return Math.round(c.top - objetivo);
      }, i);
      await page.waitForTimeout(140);
      if (Math.abs(d) <= 1) break;
    }
    await page.locator("#jornada .cuadro").nth(i).click();
    await page.waitForTimeout(700);

    const r = await page.evaluate(() => {
      const p = document.querySelector('#jornada [aria-live="polite"]').getBoundingClientRect();
      const a = document.querySelector("#jornada .cuadro-activo").getBoundingClientRect();
      return {
        brecha: Math.round(p.top - a.bottom),
        visible: Math.max(0, Math.min(p.bottom, window.innerHeight) - Math.max(p.top, 0)),
        alto: Math.round(p.height),
      };
    });
    // La distancia dejó de ser la garantía: en teléfono el panel va después
    // de los siete a propósito, para que la grilla entre en una pantalla. Lo
    // que hay que proteger es lo que esa distancia buscaba asegurar — que la
    // respuesta se vea al tocar, de lo que se encarga acercar().
    expect(
      r.visible / r.alto,
      `bloque ${i + 1}: la respuesta no se ve al tocar`
    ).toBeGreaterThan(0.5);
  }
});

test("el panel muestra el bloque que se tocó, no otro", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await anclar(page);
  await page.locator("#jornada .cuadro").nth(4).click();
  await page.waitForTimeout(300);
  const panel = page.locator('#jornada [aria-live="polite"]');
  await expect(panel).toContainText("14:45");
  await expect(page.locator("#jornada .cuadro").nth(4)).toHaveAttribute("aria-pressed", "true");
  // Uno solo abierto a la vez.
  expect(await page.locator("#jornada .cuadro-activo").count()).toBe(1);
});
