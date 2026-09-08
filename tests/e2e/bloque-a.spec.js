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

/*
  El IntersectionObserver esconde lo que todavía no se vio, así que se revela a
  mano. Y se apagan las transiciones ANTES de revelar, que es la parte que
  faltaba.

  Aplicar `.v-reveal-visible` no muestra el contenido: dispara una transición de
  opacidad y desplazamiento. Dormir un rato fijo después alcanza en una máquina
  ociosa y no alcanza cuando la suite corre en paralelo y el navegador está
  saturado: ahí se mide a mitad del viaje y las posiciones están corridas unos
  píxeles. Eso hacía fallar de a ratos —y sólo bajo carga— tres casos de layout
  de esta suite, siempre distintos, que es la firma de un problema de timing y
  no de un defecto.

  Un test de layout quiere la posición final, no el viaje. Apagadas las
  transiciones y las animaciones, el estado es el mismo en la primera línea que
  en la centésima.
*/
async function revelar(page) {
  await page.addStyleTag({
    content: `*, *::before, *::after {
      transition: none !important;
      animation: none !important;
    }`,
  });
  await page.evaluate(() => {
    document.querySelectorAll(".v-reveal").forEach((e) => e.classList.add("v-reveal-visible"));
  });
  await page.waitForTimeout(120);
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

    /*
      Y ninguna línea puede ser un pedazo de palabra: se mide la última.

      EL MEDIDOR ANTERIOR SE ROMPÍA SOLO. Comparaba `rc.top > top` sin
      tolerancia y no descartaba los rects de altura cero, así que cualquier
      jitter subpíxel dentro de una misma línea —o el rect degenerado que
      devuelve un espacio al final del renglón— reseteaba el acumulador y
      dejaba la última línea en uno o dos caracteres. Reportaba una palabra
      partida donde no había ninguna, y sólo en los entornos donde el layout
      cae en coordenadas fraccionarias: pasaba en esta máquina y fallaba en el
      runner. Es el mismo defecto que tenía el detector de viudas de
      ritmo.spec.js, encontrado por el mismo camino.

      Ahora agrupa por línea con la misma tolerancia que usa para comparar,
      recorre todos los nodos de texto y no sólo el primero, y descarta lo que
      no tiene caja. Y el mensaje dice qué leyó: si esto vuelve a fallar hay que
      poder distinguir "se partió de verdad" de "lo midió mal".
    */
    const ultima = await h2.evaluate((el) => {
      const it = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const r = document.createRange();
      let top = -1, out = "", n;
      while ((n = it.nextNode())) {
        const s = n.textContent;
        for (let i = 0; i < s.length; i++) {
          r.setStart(n, i); r.setEnd(n, i + 1);
          const rc = r.getBoundingClientRect();
          if (rc.height === 0) continue;
          if (rc.top > top + 2) { top = rc.top; out = ""; }
          if (Math.abs(rc.top - top) < 2) out += s[i];
        }
      }
      return out.trim();
    });
    expect(
      ultima.length,
      `la última línea del titular del FAQ a ${ancho}px es «${ultima}»`
    ).toBeGreaterThan(2);
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
    await page.goto("/#/participan");
    await revelar(page);

    const medido = await page.evaluate(() => {
      const out = [];
      const arts = [...document.querySelectorAll("#partners article")];
      // Cuántas tarjetas se llegaron a medir de verdad. Sin esto el caso pasa
      // en verde cuando no encuentra ninguna, que es lo que venía haciendo:
      // iba a "/" y #partners no está en la home desde el 31/08.
      let medidas = 0;
      for (const art of arts) {
        const cabecera = art.firstElementChild;
        const chip = art.querySelector(".chip");
        if (!cabecera || !chip) continue;
        medidas++;
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
      return { encimados: out, medidas };
    });

    expect(medido.medidas, "no se midió ninguna tarjeta de partner").toBeGreaterThan(0);
    expect(medido.encimados).toEqual([]);
  });

  test(`a ${ancho}: el texto de "Qué te llevás" no llega pegado al borde`, async ({ page }) => {
    // El truco de gap-px dibuja los filetes con el fondo del ul, así que los
    // renglones no tenían relleno propio: el "01" arrancaba en el borde y el
    // texto cortaba contra el otro.
    await page.setViewportSize({ width: ancho, height: 900 });
    await page.goto("/#/beneficios");
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
  await page.goto("/#/participan");
  await revelar(page);

  const filas = await page.evaluate(() => {
    const arts = [...document.querySelectorAll("#partners article")];
    const tops = new Set(arts.map((a) => Math.round(a.getBoundingClientRect().top)));
    const porFila = [...tops].map(
      (t) => arts.filter((a) => Math.round(a.getBoundingClientRect().top) === t).length
    );
    return { total: arts.length, porFila };
  });

  /*
    ESTA GUARDA ES EL CASO, no un preámbulo.

    Este test pasó en verde durante una semana SIN EJECUTAR UNA SOLA ASERCIÓN:
    iba a "/" y ahí #partners no existe desde que la home pasó a ser resumen y
    BrandsSection se mudó a /participan. `arts` quedaba vacío, `porFila`
    también, y el for de abajo no iteraba nunca. Un test que no encuentra nada
    es indistinguible de uno que encuentra todo bien — y este además tapaba que
    estaba mirando la página equivocada.

    Con el goto arreglado la guarda es barata; lo que no es barato es no
    tenerla.
  */
  expect(filas.total, "no se encontró ninguna tarjeta de partner").toBeGreaterThan(0);
  expect(filas.porFila.length).toBeGreaterThan(0);

  // Ninguna fila puede quedar con menos de la mitad de las tarjetas de la
  // fila más llena.
  const max = Math.max(...filas.porFila);
  for (const n of filas.porFila) expect(n).toBeGreaterThanOrEqual(max / 2);
});

test("solo el tramo activo de #acceso lleva su cifra en negro", async ({ page }) => {
  // El "0" de la lista de espera pesaba lo mismo que el "115" que sí importa:
  // el elemento tipográfico más grande de esa tarjeta era un cero.
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/#/deadline");
  await revelar(page);

  const cifras = await page.evaluate(() => {
    return [...document.querySelectorAll("#acceso article")].map((a) => ({
      txt: a.querySelector("p span").innerText.trim(),
      color: getComputedStyle(a.querySelector("p span")).color,
      // El tramo activo es el ÚNICO que tiene un enlace de acción. Se detectaba
      // por a[href="#reservar"], y ese href ya no existe: el CTA del tramo
      // abierto pasó a ser el enlace directo a WhatsApp, porque dentro del
      // diálogo de la home el scroll a #reservar no podía funcionar —el visor
      // congela el fondo con position:fixed—. Detectarlo por "tiene un enlace"
      // en vez de por una URL concreta lo deja atado a la estructura y no al
      // destino, que ya cambió dos veces.
      activo: !!a.querySelector("a[href]"),
    }));
  });

  expect(cifras.length, "no se encontró ningún tramo en #acceso").toBeGreaterThan(0);
  const activo = cifras.find((c) => c.activo);
  expect(activo, "ningún tramo tiene enlace de acción").toBeTruthy();

  // El color de la cifra del tramo activo no puede repetirse en ningún otro:
  // si se repite, hay dos números compitiendo por la misma atención y uno de
  // ellos es un cero.
  const iguales = cifras.filter((c) => c.color === activo.color);
  expect(iguales).toHaveLength(1);
});

test("los botones de dos tarjetas hermanas quedan a la misma altura", async ({ page }) => {
  /*
    Las tarjetas de #sumarse son hermanas de un grid: miden lo mismo de alto,
    pero sus textos no. Con el botón colgando del último párrafo, el de
    "Quiero ser sponsor" quedaba 66px más abajo que el de "Pedir acreditación"
    a 1024px, y 21 a 1280. Nada se rompe y se lee como que una de las dos está
    a medio terminar.

    Se mide la fila del grid, no la tarjeta: apiladas en teléfono el problema
    no existe, y comparar dos tarjetas que están una arriba de la otra no
    querría decir nada.
  */
  for (const ancho of [1024, 1280, 1440]) {
    await page.setViewportSize({ width: ancho, height: 900 });
    await page.goto("/");
    await revelar(page);

    const r = await page.evaluate(() => {
      const cont = document.querySelector("#sumarse");
      if (!cont) return null;
      const arts = [...cont.querySelectorAll("article")].filter(
        (a) => a.getBoundingClientRect().height > 0
      );
      const filas = {};
      for (const a of arts) {
        const k = Math.round(a.getBoundingClientRect().top);
        (filas[k] ||= []).push(a);
      }
      const desalineadas = [];
      let comparadas = 0;
      for (const grupo of Object.values(filas)) {
        if (grupo.length < 2) continue;
        const btns = grupo.map((g) => g.querySelector("a[class*='btn']"));
        if (btns.some((b) => !b)) continue;
        comparadas++;
        const tops = btns.map((b) => Math.round(b.getBoundingClientRect().top));
        const dif = Math.max(...tops) - Math.min(...tops);
        if (dif > 2) desalineadas.push(`${dif}px (${tops.join(" vs ")})`);
      }
      return { comparadas, desalineadas };
    });

    // Sin esto, un cambio de markup que dejara de encontrar las tarjetas haría
    // pasar el caso sin comparar nada.
    expect(r, `no se encontró #sumarse a ${ancho}px`).not.toBeNull();
    expect(r.comparadas, `a ${ancho}px no se comparó ninguna fila de tarjetas`).toBeGreaterThan(0);
    expect(r.desalineadas, `a ${ancho}px los botones no arrancan a la misma altura`).toEqual([]);
  }
});
