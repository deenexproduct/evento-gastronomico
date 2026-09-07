import { test, expect } from "@playwright/test";
import { QUE_HAY, EVENTO, BORDES } from "../../src/data/evento.js";

/**
 * LA JORNADA: que se vea qué hay ese día, y que se vea entero.
 *
 * ESTE ARCHIVO SE REESCRIBIÓ. El anterior probaba una interfaz de dos
 * rediseños atrás: siete cuadrados en grilla con `aspect-ratio: 1/1` y un panel
 * lateral que se movía a los 1280px. Buscaba `#jornada .cuadro` y
 * `.panel-jornada` — y ninguno de los dos existía dentro de esta sección ni
 * siquiera antes del rediseño de hoy: lo verifiqué contra el commit 3f1fbab.
 *
 * O sea que sus cinco casos no probaban nada desde hacía dos versiones, y no se
 * notó porque los e2e no corren en CI. Un spec que apunta a selectores muertos
 * es peor que no tenerlo: da la sensación de que la sección está cubierta.
 *
 * Lo que la sección hace HOY: no muestra el cronograma. Muestra las dos franjas
 * del día y la lista de qué va a haber, con los ocho ítems entrando en cascada.
 * Eso es lo que se prueba acá.
 */

/** Baja hasta la sección y espera a que termine la cascada de entrada. */
async function abrirJornada(page) {
  await page.goto("/");
  await page.locator("#jornada").scrollIntoViewIfNeeded();
  // 385ms del último delay + 550 de la transición, con aire.
  await page.waitForTimeout(1200);
}

test("muestra los ocho ítems de qué hay ese día, con su ícono", async ({ page }) => {
  await abrirJornada(page);
  const items = page.locator("#jornada .item-jornada");
  await expect(items).toHaveCount(QUE_HAY.length);

  // Cada ítem trae su pictograma: es lo que distingue una charla de un panel
  // de un corte de un vistazo, y es la única razón por la que lleva ícono.
  await expect(page.locator("#jornada .item-jornada svg")).toHaveCount(QUE_HAY.length);

  // Y los títulos son los de la fuente, en orden.
  for (const [i, item] of QUE_HAY.entries()) {
    await expect(items.nth(i)).toContainText(item.titulo);
  }
});

test("los ocho terminan visibles: la cascada no deja ninguno escondido", async ({ page }) => {
  await abrirJornada(page);
  // El modo de falla que esto atrapa: una animación de entrada que no se
  // completa deja media sección en blanco y nada falla. Ya pasó en este repo
  // con otro efecto, así que se mide la opacidad real de los ocho.
  const opacidades = await page.locator("#jornada .item-jornada").evaluateAll((els) =>
    els.map((e) => getComputedStyle(e).opacity)
  );
  expect(opacidades).toHaveLength(QUE_HAY.length);
  for (const o of opacidades) expect(Number(o)).toBeGreaterThan(0.99);
});

test("publica las dos franjas del día, y son las que declara evento.js", async ({ page }) => {
  await abrirJornada(page);
  const fichas = page.locator("#jornada .ficha");
  await expect(fichas).toHaveCount(2);
  await expect(fichas.nth(0)).toContainText(EVENTO.horarioJornada);
  await expect(fichas.nth(0)).toContainText("Jornada");
  await expect(fichas.nth(1)).toContainText(EVENTO.horarioNetworking);
  await expect(fichas.nth(1)).toContainText("Networking");
});

test("no vuelve a publicar el cronograma hora por hora", async ({ page }) => {
  await abrirJornada(page);
  const texto = await page.locator("#jornada").innerText();
  // La sección dejó de mostrar la grilla a propósito: cuatro de diez bloques
  // no tienen orador y una agenda hora por hora obliga a publicarlo. Si vuelven
  // los horarios de los bloques, es que se revirtió esa decisión sin querer.
  const horasDeBloque = texto.match(/\b1[0-7]:\d{2}\b/g) || [];
  expect(horasDeBloque).toEqual([]);
});

test("la sección no desborda a lo ancho en teléfono", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await abrirJornada(page);
  const desborda = await page.evaluate(() => {
    const s = document.querySelector("#jornada");
    return s.scrollWidth > document.documentElement.clientWidth;
  });
  expect(desborda).toBe(false);
});

test("la acreditación y el corte de sala que anuncia son los de la fuente", async ({ page }) => {
  await abrirJornada(page);
  const texto = await page.locator("#jornada").innerText();
  expect(texto).toContain(EVENTO.puertas);
  expect(texto).toContain(BORDES.cierre.hasta.replace(":00", ""));
});
