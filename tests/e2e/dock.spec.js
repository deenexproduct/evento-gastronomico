import { test, expect } from "@playwright/test";

/**
 * El dock de teléfono: las cinco pestañas y la reserva, abajo.
 *
 * Es la pieza que más cerca está del embudo —el único CTA de la página vive
 * ahí en teléfono— y la que más formas tiene de romperse en silencio, así que
 * lo que se fija acá no es cómo se ve sino las cuatro propiedades de las que
 * depende que funcione.
 */

const TELEFONOS = [320, 360, 375, 390, 414, 560, 639];

test("en teléfono las cinco pestañas están abajo y no arriba", async ({ page }) => {
  for (const w of TELEFONOS) {
    await page.setViewportSize({ width: w, height: 800 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const r = await page.evaluate(() => {
      const visible = (e) => e.getBoundingClientRect().height > 0;
      return {
        enDock: [...document.querySelectorAll(".dock-movil nav a")].filter(visible).length,
        enHeader: [...document.querySelectorAll("header nav a")].filter(visible).length,
      };
    });

    expect(r.enDock, `a ${w}px faltan pestañas en el dock`).toBe(5);
    expect(r.enHeader, `a ${w}px quedaron pestañas en la cabecera`).toBe(0);
  }
});

test("de 640 para arriba las pestañas vuelven a la cabecera y el dock no existe", async ({ page }) => {
  // El escritorio no se toca: era la condición del cambio.
  for (const w of [640, 768, 1024, 1440]) {
    await page.setViewportSize({ width: w, height: 800 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const r = await page.evaluate(() => {
      const dock = document.querySelector(".dock-movil");
      return {
        dockVisible: dock ? getComputedStyle(dock).display !== "none" : false,
        enHeader: [...document.querySelectorAll("header nav a")].filter(
          (e) => e.getBoundingClientRect().height > 0
        ).length,
      };
    });

    expect(r.dockVisible, `a ${w}px el dock de teléfono sigue a la vista`).toBe(false);
    expect(r.enHeader, `a ${w}px la cabecera perdió pestañas`).toBe(5);
  }
});

test("nunca hay dos botones de reserva a la vez, ni ninguno", async ({ page }) => {
  /*
    La regla dura del cambio, y la que más caro sale romper en las dos
    direcciones. Dos píldoras violetas iguales hacen que el violeta deje de
    querer decir "esta es LA acción"; cero deja al lector sin salida.

    Ya se rompió una vez acá: la píldora del dock miraba sólo el botón de
    #reservar, con el argumento de que plegarse en el hero dejaría la primera
    pantalla sin nada. Es falso —el hero tiene su propio "Quiero mi lugar"— y a
    320px se veían las dos, a media pantalla una de otra.

    El scroll va en "instant" a propósito: el sitio tiene scroll-behavior
    smooth, y con el suave el caso leía el estado a mitad del viaje. Así se
    perdió un rato buscando un defecto que estaba en el instrumento.
  */
  await page.setViewportSize({ width: 375, height: 720 });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(600);

  const contar = () =>
    page.evaluate(() => {
      const alto = window.innerHeight;
      return [...document.querySelectorAll('a[href*="wa.me"]')].filter((a) => {
        if (!/reservar|quiero mi lugar|anotarme|lista de espera/i.test(a.innerText)) return false;
        const b = a.getBoundingClientRect();
        if (b.height === 0) return false;
        const dentro = Math.max(0, Math.min(b.bottom, alto) - Math.max(b.top, 0));
        return dentro / b.height >= 0.9;
      }).length;
    });

  const alturas = await page.evaluate(() => document.documentElement.scrollHeight);
  const paradas = [0];
  for (let y = 600; y < alturas; y += 600) paradas.push(y);

  const malos = [];
  for (const y of paradas) {
    await page.evaluate((v) => window.scrollTo({ top: v, behavior: "instant" }), y);
    // 400ms y no 160: la píldora sale con una transición de 300ms y durante
    // ese viaje sigue en el DOM. Contándola antes, el caso reportaba dos
    // botones donde había uno saliendo.
    await page.waitForTimeout(400);
    const n = await contar();
    if (n !== 1) malos.push(`y=${y}: ${n} botones`);
  }

  // Si la página se quedara sin scroll esto pasaría sin recorrer nada.
  expect(paradas.length, "no se recorrió la página").toBeGreaterThan(8);
  expect(malos).toEqual([]);
});

test("el dock no se come el final de la página", async ({ page }) => {
  /*
    El dock es fijo y tapa lo último de cada vista. Sin el colchón que publica
    --alto-dock-real, el pie de la home y el último bloque de cada vista quedan
    debajo de la barra y no hay scroll que los alcance: es contenido perdido,
    no contenido apretado.
  */
  await page.setViewportSize({ width: 375, height: 720 });

  for (const url of ["/", "/#/que-es", "/#/participan"]) {
    await page.goto(url);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(600);
    // Dos veces: al llegar al fondo la píldora se despliega —ahí no hay otro
    // botón— y el colchón se reacomoda, así que el primer salto queda corto.
    for (let i = 0; i < 2; i++) {
      await page.evaluate(() =>
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" })
      );
      await page.waitForTimeout(400);
    }

    const r = await page.evaluate(() => {
      const dock = document.querySelector(".dock-movil");
      const dockTop = dock.getBoundingClientRect().top;
      // El último elemento con texto propio de la página.
      const conTexto = [...document.querySelectorAll("body *")].filter(
        (e) =>
          [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) &&
          !dock.contains(e) &&
          e.getBoundingClientRect().height > 0
      );
      const ultimo = conTexto[conTexto.length - 1];
      return {
        cuantos: conTexto.length,
        dockTop: Math.round(dockTop),
        ultimoBottom: Math.round(ultimo.getBoundingClientRect().bottom),
        texto: ultimo.innerText.trim().replace(/\s+/g, " ").slice(0, 40),
        colchon: getComputedStyle(document.body).paddingBottom,
      };
    });

    expect(r.cuantos, `en ${url} no se encontró contenido para medir`).toBeGreaterThan(10);
    expect(
      r.ultimoBottom,
      `en ${url} el dock tapa «${r.texto}»: termina en ${r.ultimoBottom} y el dock arranca en ${r.dockTop} (colchón ${r.colchon})`
    ).toBeLessThanOrEqual(r.dockTop);
  }
});

test("la cabecera se retrae al bajar sólo en teléfono", async ({ page }) => {
  /*
    Es la mitad del cambio que recupera pantalla de verdad: con las pestañas
    mudadas al dock, en teléfono la cabecera lleva sólo el wordmark y
    esconderla mientras se lee no le saca nada al lector.

    De 640 para arriba tiene que quedarse quieta, porque ahí adentro viven las
    cinco pestañas y la píldora de reserva.
  */
  for (const w of [375, 1280]) {
    await page.setViewportSize({ width: w, height: 800 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);

    const topDe = () =>
      page.evaluate(() => Math.round(document.querySelector("header").getBoundingClientRect().top));

    expect(await topDe(), `a ${w}px la cabecera no arranca a la vista`).toBe(0);

    await page.evaluate(() => window.scrollTo({ top: 1500, behavior: "instant" }));
    await page.waitForTimeout(500);
    const bajando = await topDe();

    await page.evaluate(() => window.scrollTo({ top: 900, behavior: "instant" }));
    await page.waitForTimeout(500);
    const subiendo = await topDe();

    if (w < 640) {
      expect(bajando, "en teléfono la cabecera no se retrajo al bajar").toBeLessThan(0);
      expect(subiendo, "en teléfono la cabecera no volvió al subir").toBe(0);
    } else {
      expect(bajando, "en escritorio la cabecera se movió al bajar").toBe(0);
      expect(subiendo, "en escritorio la cabecera se movió al subir").toBe(0);
    }
  }
});
