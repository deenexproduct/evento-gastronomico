import { test, expect } from "@playwright/test";

/**
 * Que siempre haya una salida, y que la página nunca quede sin salida.
 *
 * Los tres casos de acá fijan bugs que estuvieron EN PRODUCCIÓN y que los 259
 * tests que había no veían. Los tres comparten la forma: no rompen nada
 * visible, no tiran un error en la consola, y le sacan al visitante lo único
 * que la página existe para darle.
 */

/** El texto de cualquier botón que prometa reservar. */
const ES_RESERVA = /reservar|quiero mi lugar|anotarme|lista de espera/i;

test("ningún botón de reserva se queda sin destino", async ({ page }) => {
  /*
    LA BARRA FLOTANTE DE ESCRITORIO TENÍA EL CTA MUERTO. El template hacía
    :href="enlaceReserva" y esa constante no existía en el componente: se
    importaba linkWaReserva y nunca se llamaba. En Vue, un :href undefined no
    escribe el atributo, así que el <a> dejaba de ser un enlace. En producción:
    href null, y al tocarlo no pasaba nada.

    POR QUÉ NINGÚN TEST LO VIO, que es la parte que importa: todos los casos que
    miran botones de reserva los buscan con 'a[href*="wa.me"]'. Un elemento sin
    href no matchea ese selector, así que no fallaba: DESAPARECÍA del conjunto
    medido. Un test que sólo mira lo que encuentra no puede ver lo que se le
    escapa del selector.

    Por eso este caso busca por TEXTO —lo que el visitante lee— y después
    comprueba el destino. Es la única forma de que un botón roto cuente.
  */
  const anchos = [375, 1280];
  for (const w of anchos) {
    await page.setViewportSize({ width: w, height: 800 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => {
      document.querySelectorAll(".v-reveal").forEach((e) => e.classList.add("v-reveal-visible"));
    });
    // Pasado el hero, que es donde aparece la barra flotante.
    await page.evaluate(() => window.scrollTo({ top: 2500, behavior: "instant" }));
    await page.waitForTimeout(700);

    const r = await page.evaluate((re) => {
      const rx = new RegExp(re, "i");
      const botones = [...document.querySelectorAll("a, button")].filter((e) => {
        if (!rx.test(e.innerText || "")) return false;
        const b = e.getBoundingClientRect();
        return b.width > 0 && b.height > 0;
      });
      return {
        total: botones.length,
        mudos: botones
          .filter((e) => e.tagName === "A" && !e.getAttribute("href"))
          .map((e) => e.innerText.trim().replace(/\s+/g, " ").slice(0, 30)),
      };
    }, ES_RESERVA.source);

    expect(r.total, `a ${w}px no se encontró ningún botón de reserva para medir`).toBeGreaterThan(0);
    expect(r.mudos, `a ${w}px hay botones de reserva sin href`).toEqual([]);
  }
});

test("siempre queda una forma de reservar, en cualquier pantalla", async ({ page }) => {
  /*
    EN UN TELÉFONO ACOSTADO NO QUEDABA NINGUNA. La barra flotante se esconde
    por CSS abajo de 500px de alto, pero el estado compartido seguía diciendo
    "estoy visible", así que el nav escondía su píldora por deferencia a una
    barra que nadie veía. En 844x390 —un iPhone 14 en horizontal— y en la
    pantalla partida de Android, la home entera quedaba sin un solo botón de
    reservar. Verificado en producción antes de arreglarlo.

    Las medidas de abajo no son inventadas: son teléfonos reales acostados y
    la ventana baja de un escritorio.
  */
  const PANTALLAS = [
    [1280, 800, "escritorio"],
    [844, 390, "iPhone acostado"],
    [740, 360, "Android acostado"],
    [640, 480, "ventana baja"],
    [390, 844, "iPhone parado"],
    [375, 500, "teléfono chico, ventana baja"],
    [320, 568, "iPhone SE"],
  ];

  const sinSalida = [];
  for (const [w, h, nombre] of PANTALLAS) {
    await page.setViewportSize({ width: w, height: h });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => window.scrollTo({ top: 2000, behavior: "instant" }));
    await page.waitForTimeout(700);

    const n = await page.evaluate((re) => {
      const rx = new RegExp(re, "i");
      const seVe = (e) => {
        const c = getComputedStyle(e);
        if (c.display === "none" || c.visibility === "hidden" || c.opacity === "0") return false;
        const b = e.getBoundingClientRect();
        return b.width > 0 && b.height > 0 && b.top < innerHeight && b.bottom > 0;
      };
      return [...document.querySelectorAll("a, button")].filter(
        (e) => rx.test(e.innerText || "") && seVe(e)
      ).length;
    }, ES_RESERVA.source);

    if (n === 0) sinSalida.push(`${nombre} (${w}x${h})`);
  }

  expect(sinSalida, "hay pantallas donde no se puede reservar").toEqual([]);
});

test("salir del visor de bloques con Atrás no deja la página trabada", async ({ page }) => {
  /*
    EL VISOR CONGELA EL BODY y sólo lo soltaba al cerrarse por su propio botón.

    congelar() pone position:fixed sobre document.body para que el fondo no se
    mueva, y descongelar() colgaba únicamente del evento 'close' del <dialog>.
    Sacar un dialog abierto del DOM NO dispara ese evento, así que si el
    componente se desmontaba con el visor abierto el estilo sobrevivía al
    componente que lo puso. El router va en modo hash: el botón Atrás del
    navegador cambia de ruta y desmonta HomeView.

    Medido antes del arreglo: body en "position: fixed; top: -5500px",
    scrollHeight igual a innerHeight —nada que scrollear—, y elementFromPoint
    del centro devolviendo HTML. Pantalla en blanco, sin recuperación: no se
    arreglaba solo, ni navegando a otra pestaña. Sólo recargando.
  */
  await page.setViewportSize({ width: 1280, height: 800 });

  // Se entra por una vista interna y se vuelve al resumen, para que Atrás
  // lleve a una ruta del sitio y no fuera de él.
  await page.goto("/#/que-es");
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(500);
  await page.evaluate(() => {
    const v = [...document.querySelectorAll("a")].find((a) => /volver al resumen/i.test(a.innerText));
    if (v) v.click();
    else location.hash = "#/";
  });
  await page.waitForTimeout(700);

  await page.evaluate(() => {
    document.querySelectorAll(".v-reveal").forEach((e) => e.classList.add("v-reveal-visible"));
    window.scrollTo({ top: 5500, behavior: "instant" });
  });
  await page.waitForTimeout(400);

  const abrio = await page.evaluate(() => {
    const b = [...document.querySelectorAll("#bloques a, #bloques button")].find((x) =>
      /ver/i.test(x.innerText)
    );
    if (!b) return false;
    b.click();
    return true;
  });
  // Si el visor dejara de existir, el caso no puede pasar por vacuidad.
  expect(abrio, "no se encontró ningún botón que abra el visor de bloques").toBe(true);
  await page.waitForTimeout(700);
  await expect(page.locator("dialog[open]"), "el visor no se abrió").toHaveCount(1);

  await page.goBack();
  await page.waitForTimeout(900);

  const r = await page.evaluate(() => ({
    body: document.body.getAttribute("style") || "",
    scrollHeight: document.scrollingElement.scrollHeight,
    innerHeight: window.innerHeight,
    centro: document.elementFromPoint(innerWidth / 2, innerHeight / 2)?.tagName,
  }));
  await page.evaluate(() => window.scrollBy(0, 400));
  await page.waitForTimeout(300);
  const scrollY = await page.evaluate(() => Math.round(window.scrollY));

  expect(r.body, `el body quedó congelado: «${r.body}»`).not.toContain("fixed");
  expect(
    r.scrollHeight,
    `la página quedó sin nada que scrollear (${r.scrollHeight} vs ${r.innerHeight} de viewport)`
  ).toBeGreaterThan(r.innerHeight + 2);
  expect(r.centro, "el centro de la pantalla quedó vacío: se ve el fondo del documento").not.toBe("HTML");
  expect(scrollY, "la página no scrollea").toBeGreaterThan(0);
});
