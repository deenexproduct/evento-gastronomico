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

/**
 * Las anclas que la comunicación usa de verdad, y el id donde vive HOY el
 * contenido de cada una.
 *
 * Los dos nombres no siempre coinciden, y ese es justamente el punto. El spec
 * asumía que sí —buscaba un elemento con el id igual al ancla— y por eso "#lugar"
 * fallaba: la sección se llama "donde" desde que DondeSection reemplazó a
 * LocationSection. Que el ancla y el id se llamaran igual era una coincidencia
 * de las otras tres, no una regla.
 *
 * Lo que hay que proteger es que el enlace lleve AL CONTENIDO, no que dos
 * nombres coincidan.
 */
const ANCLAS = {
  registro: "registro",
  lugar: "donde",
  faq: "faq",
  contenido: "contenido",
};

for (const [ancla, id] of Object.entries(ANCLAS)) {
  test(`el enlace #${ancla} abre la página, no una pantalla vacía`, async ({ page }) => {
    await page.goto(`/#${ancla}`);
    await page.waitForLoadState("networkidle");

    // Lo que se rompía: el router no matcheaba y no se montaba nada.
    await expect(page.locator("section")).not.toHaveCount(0);
    await expect(page.locator(`#${id}`)).toBeAttached();
    await expect(page.locator("h1")).toBeVisible();
  });

  /*
    Y que ADEMÁS lleve hasta la sección.

    Que el destino exista no alcanzaba: el scrollBehavior devolvía { top: 0 }
    siempre, así que alguien que abría un "#acceso" reenviado llegaba a la vista
    correcta y tenía que buscar la sección a mano. Con "#lugar" era peor: caía
    en la home, con la dirección a 3.500px de donde lo dejaban.

    Se le da tiempo al scroll: la home entra con .v-reveal y las fuentes
    recomponen el texto al llegar, así que la posición del destino se mueve
    durante los primeros cientos de milisegundos.
  */
  test(`el enlace #${ancla} deja la sección a la vista, no arriba de todo`, async ({ page }) => {
    await page.goto(`/#${ancla}`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1500);

    const lejos = await page.evaluate((sel) => {
      const el = document.getElementById(sel);
      if (!el) return null;
      // Cuán lejos quedó del borde superior del viewport. El nav fijo ocupa
      // 88px, que es el scroll-margin-top que declara main.css.
      return Math.abs(el.getBoundingClientRect().top);
    }, id);

    expect(lejos).not.toBeNull();
    expect(lejos, `#${ancla} dejó a #${id} a ${lejos}px del borde`).toBeLessThan(300);
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

test("el nav fijo no tapa el título de la sección en ningún ancho", async ({ page }) => {
  /*
    Barre el rango en vez de mirar un ancho.

    Esto medía el viewport que trajera el proyecto de Playwright —1280 en
    desktop, 412 en mobile— y con eso daba verde, pero el nav cambia de alto
    DOS veces: a 640px las cinco pestañas caen a dos líneas (73 → 117) y abajo
    de 360 caen a tres (117 → 161). El segundo escalón no lo veía nadie: este
    caso miraba 412, el de las pestañas cortadas barre de 1024 para arriba y
    el de la barra fija arranca en 360. A 320px —un iPhone SE de primera
    generación, un Fold cerrado— el margen era 132 contra un nav de 161 y cada
    salto de ancla dejaba el título 29px tapado.

    Se compara contra el alto real medido en cada ancho, no contra una
    constante: si mañana entra una sexta pestaña y el nav crece, esto lo dice
    en el ancho exacto donde crece.
  */
  for (const ancho of [320, 359, 360, 480, 639, 640, 768, 1024, 1440]) {
    await page.setViewportSize({ width: ancho, height: 800 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const r = await page.evaluate(() => {
      const nav = document.querySelector(".fixed.inset-x-0.top-0");
      const sec = document.querySelector("#registro");
      return {
        nav: nav ? nav.getBoundingClientRect().height : null,
        margen: sec ? parseFloat(getComputedStyle(sec).scrollMarginTop) : null,
      };
    });

    // Sin esto, un selector que dejara de encontrar el nav compararía null
    // contra null y el caso pasaría en verde sin medir nada.
    expect(r.nav, `no se encontró el nav a ${ancho}px`).not.toBeNull();
    expect(r.margen, `no se encontró #registro a ${ancho}px`).not.toBeNull();

    expect(
      r.margen,
      `a ${ancho}px el nav mide ${r.nav}px y el margen de ancla es ${r.margen}px: ` +
        `el título queda ${Math.round(r.nav - r.margen)}px tapado`
    ).toBeGreaterThanOrEqual(r.nav);
  }
});
