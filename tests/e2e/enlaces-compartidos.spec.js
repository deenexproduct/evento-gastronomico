import { test, expect } from "@playwright/test";

/**
 * El link que se comparte.
 *
 * Con el router en modo hash, "saborestech.ar/#registro" le llega al router
 * como la ruta "/registro". Sin una ruta comodín que la absorba no matchea
 * nada y la landing renderiza VACÍA: cero secciones, pantalla negra. Es
 * exactamente el link que se pega en un WhatsApp, en un mail o en una pauta,
 * así que el modo de falla es "toda la campaña apunta a una página en blanco".
 *
 * Ya pasó una vez. Esta suite existe para que no vuelva a pasar en silencio.
 */

/** Las anclas que la comunicación usa de verdad. */
const ANCLAS = ["registro", "lugar", "faq", "contenido"];

for (const ancla of ANCLAS) {
  test(`el enlace #${ancla} abre la página, no una pantalla vacía`, async ({ page }) => {
    await page.goto(`/#${ancla}`);
    await page.waitForLoadState("networkidle");

    // Lo que se rompía: el router no matcheaba y no se montaba nada.
    await expect(page.locator("section")).not.toHaveCount(0);
    await expect(page.locator(`#${ancla}`)).toBeAttached();
    await expect(page.locator("h1")).toBeVisible();
  });
}

/**
 * Anclas que existieron y ya no. Siguen vivas en lo que se compartio por
 * WhatsApp antes del 27/08, asi que no pueden dejar la pagina en blanco:
 * tienen que abrirla arriba de todo.
 */
for (const vieja of ["avisame", "despues"]) {
  test(`el enlace viejo #${vieja} abre la pagina igual`, async ({ page }) => {
    await page.goto(`/#${vieja}`);
    await page.waitForLoadState("networkidle");
    await expect(page.locator("section")).not.toHaveCount(0);
    await expect(page.locator("h1")).toBeVisible();
  });
}

test("una ruta inventada tampoco deja la página en blanco", async ({ page }) => {
  await page.goto("/#/seccion-que-no-existe");
  await page.waitForLoadState("networkidle");

  await expect(page.locator("section")).not.toHaveCount(0);
  await expect(page.locator("h1")).toBeVisible();
});

test("el nav fijo no tapa el título de la sección al saltar", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const alturaNav = await page
    .locator(".fixed.inset-x-0.top-0")
    .first()
    .evaluate((el) => el.getBoundingClientRect().height);

  // Sin scroll-margin-top, el ancla queda en y=0 y el nav se le sienta encima.
  const margen = await page
    .locator("#registro")
    .evaluate((el) => parseFloat(getComputedStyle(el).scrollMarginTop));

  expect(margen).toBeGreaterThanOrEqual(alturaNav);
});
