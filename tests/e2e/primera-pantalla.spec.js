import { test, expect } from "@playwright/test";

/**
 * Lo que se ve en un teléfono antes de decidir si vale la pena scrollear.
 *
 * El alto que importa no es el del teléfono promedio sino el del más chico
 * que sigue en la calle: 375×667. En 390×844 estas tres cosas ya entraban
 * solas y por eso pasaron inadvertidas —el pliegue caía justo del otro lado
 * del problema—, así que los tres tests fijan el viewport a mano en vez de
 * confiar en el device del proyecto.
 */

const CHICO = { width: 375, height: 667 };

test("la primera pantalla del teléfono dice dónde es y qué día", async ({ page }) => {
  // Sin esto, la fecha aparecía recién en y=688: 21px por debajo del pliegue.
  // El que abre el link y no ve una fecha no scrollea, cierra.
  await page.setViewportSize(CHICO);
  await page.goto("/");

  const rotulo = page.locator("#hero p").first();
  await expect(rotulo).toBeVisible();

  const caja = await rotulo.boundingBox();
  expect(caja.y + caja.height).toBeLessThan(CHICO.height);

  // Los tres datos, en el formato que sea: el hotel, la ciudad y el día.
  const texto = await rotulo.innerText();
  expect(texto).toMatch(/quinto centenario/i);
  expect(texto).toMatch(/córdoba/i);
  expect(texto).toMatch(/domingo/i);
  expect(texto).toMatch(/20 de septiembre|20\.09/i);

  // Dos líneas como mucho, y ninguna cortada.
  //
  // Antes esto exigía UNA. Los tres datos no entran en una línea en un
  // teléfono de 375: el ancho útil es 335px y la versión más corta que los
  // tiene a los tres pide 338. Se parte a propósito, no por accidente, y lo
  // que hay que sostener es que el corte sea el elegido y no un desborde.
  const interlineado = await rotulo.evaluate((el) => parseFloat(getComputedStyle(el).lineHeight));
  expect(Math.round(caja.height / interlineado)).toBeLessThanOrEqual(2);

  const cortado = await rotulo.evaluate((el) => el.scrollWidth > el.clientWidth + 1);
  expect(cortado).toBe(false);
});

test("la barra fija no muestra texto cortado en ningún ancho", async ({ page }) => {
  // Acompaña dieciséis pantallas: un texto cortado ahí se ve más veces que
  // cualquier otra cosa de la página. Decía "DOMINGO 20.09.2026 · HOT…".
  for (const width of [360, 375, 390, 414, 600, 640, 700, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, 3000));

    const barra = page.locator(".barra-flotante");
    await expect(barra).toBeVisible();

    const cortados = await barra.evaluate((b) => {
      const fuera = [];
      for (const el of b.querySelectorAll("*")) {
        if (el.children.length || !el.textContent.trim()) continue;
        if (el.scrollWidth > el.clientWidth + 1) {
          fuera.push(`${el.innerText.trim()} (caja ${el.clientWidth}px, texto ${el.scrollWidth}px)`);
        }
      }
      return fuera;
    });
    expect(cortados, `a ${width}px de ancho`).toEqual([]);
  }
});

test("en teléfono el tramo que se puede reservar va antes que los otros", async ({ page }) => {
  // Apilados en el orden del llenado, la primera pantalla de #acceso
  // terminaba en la palabra COMPLETO y el "115 disponibles" caía fuera.
  await page.setViewportSize(CHICO);
  await page.goto("/#acceso");

  const tarjetas = page.locator("#acceso article");
  await expect(tarjetas.first()).toBeVisible();

  const posiciones = await tarjetas.evaluateAll((els) =>
    els.map((el) => ({
      y: el.getBoundingClientRect().top + window.scrollY,
      actual: el.className.includes("border-acento"),
    }))
  );

  const actual = posiciones.find((p) => p.actual);
  expect(actual, "no hay tramo abierto marcado con border-acento").toBeTruthy();
  for (const otro of posiciones.filter((p) => !p.actual)) {
    expect(actual.y).toBeLessThan(otro.y);
  }
});

test("en escritorio los tres tramos vuelven al orden del llenado", async ({ page }) => {
  // El reordenado de arriba es solo para una columna: en tres, el orden se
  // lee de izquierda a derecha y ahí la secuencia sí cuenta la historia.
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/#acceso");

  const cajas = await page.locator("#acceso article").evaluateAll((els) =>
    els.map((el) => {
      const b = el.getBoundingClientRect();
      return { x: b.left, y: Math.round(b.top), texto: el.innerText.replace(/\s+/g, " ") };
    })
  );

  expect(cajas.length).toBe(3);
  expect(new Set(cajas.map((c) => c.y)).size, "los tres van en la misma fila").toBe(1);
  expect(cajas[0].x).toBeLessThan(cajas[1].x);
  expect(cajas[1].x).toBeLessThan(cajas[2].x);
  expect(cajas[0].texto).toMatch(/ya tomados/i);
});
