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

test("el mapa de Google no se descarga hasta que alguien lo pide", async ({ page }) => {
  // El iframe costaba 443 KB —places.js, main.js, init_embed, util, common,
  // controls, map y onion— contra los ~494 que pesa todo el resto de la
  // página junta. Y en teléfono era una trampa de scroll: 334x418px con 21px
  // de página a cada lado para deslizar sin caer adentro.
  const deGoogle = [];
  page.on("request", (r) => {
    if (/maps\.google|maps\.googleapis|maps\.gstatic/.test(r.url())) deGoogle.push(r.url());
  });

  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  await revelarTodo(page);
  // Se baja hasta el fondo: si el mapa se cargara solo, acá ya habría pedido.
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(2500);

  expect(deGoogle).toEqual([]);
  await expect(page.locator("#lugar iframe")).toHaveCount(0);

  // Y sigue estando a un toque para el que lo quiere arrastrar.
  await page.getByRole("button", { name: /ver el mapa/i }).click();
  await expect(page.locator("#lugar iframe")).toHaveCount(1);
});

test("solo dos logos del muro siguen trayendo su propia caja", async ({ page }) => {
  // Cuatro de los doce archivos venían con un rectángulo opaco adentro y se
  // veían como manchas. Dos eran de fondo blanco (konex, sportclub) y
  // multiply sobre fondo claro los resuelve: el blanco no pinta nada y queda
  // solo la marca. Los otros dos —hatsu y ayres— traen la caja en gris
  // oscuro (35,35,35) y multiply la deja igual: para ésos hace falta el
  // archivo recortado. Este test fija dónde estamos y falla si aparece un
  // tercero.
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await revelarTodo(page);
  await page.evaluate(() => {
    document.querySelectorAll(".barra-fija, header").forEach((e) => (e.style.visibility = "hidden"));
  });

  const fondo = await page.evaluate(
    () => getComputedStyle(document.querySelector("#detras")).backgroundColor
  );
  const f = fondo.match(/\d+/g).map(Number);
  const conCaja = [];

  for (const img of await page.$$("#detras img")) {
    const alt = await img.getAttribute("alt");
    await img.scrollIntoViewIfNeeded();
    const buf = await img.screenshot();
    // Se muestrea a un 4% de cada esquina y se promedia, no el píxel (1,1):
    // el proyecto móvil renderiza con densidad 2,6x y ese píxel cae sobre el
    // antialias del borde, así que "ayres" pasaba desapercibido. El dato que
    // se busca es del archivo, no del viewport, y no puede depender del DPR.
    const esquina = await page.evaluate(async (b64) => {
      const im = new Image();
      im.src = "data:image/png;base64," + b64;
      await im.decode();
      const c = document.createElement("canvas");
      c.width = im.width;
      c.height = im.height;
      const x = c.getContext("2d");
      x.drawImage(im, 0, 0);
      const dx = Math.max(1, Math.round(im.width * 0.04));
      const dy = Math.max(1, Math.round(im.height * 0.04));
      const puntos = [[dx, dy], [im.width - dx, dy], [dx, im.height - dy], [im.width - dx, im.height - dy]];
      const suma = [0, 0, 0];
      for (const [px, py] of puntos) {
        const d = x.getImageData(px, py, 1, 1).data;
        suma[0] += d[0]; suma[1] += d[1]; suma[2] += d[2];
      }
      return suma.map((v) => Math.round(v / puntos.length));
    }, buf.toString("base64"));
    const dif = Math.max(...esquina.map((v, i) => Math.abs(v - f[i])));
    if (dif > 25) conCaja.push(alt);
  }

  expect(conCaja.sort()).toEqual(["ayres", "hatsu"]);
});

test("cada pestaña del nav lleva a una sección que existe y ninguna se corta", async ({ page }) => {
  // Eran tres y dejaban afuera las dos secciones que el lector busca primero
  // cuando llega de un anuncio: qué es esto y quién lo respalda.
  for (const ancho of [1024, 1280, 1600]) {
    await page.setViewportSize({ width: ancho, height: 800 });
    await page.goto("/");
    const r = await page.evaluate(() => {
      const enlaces = [...document.querySelectorAll("header nav a")];
      return {
        n: enlaces.length,
        rotos: enlaces.filter((a) => !document.querySelector(a.getAttribute("href"))).map((a) => a.innerText),
        cortados: enlaces.filter((a) => a.scrollWidth > a.clientWidth + 1).map((a) => a.innerText),
      };
    });
    expect(r.n, `pestañas a ${ancho}`).toBeGreaterThanOrEqual(5);
    expect(r.rotos, `anclas rotas a ${ancho}`).toEqual([]);
    expect(r.cortados, `pestañas cortadas a ${ancho}`).toEqual([]);
  }
});

test("ningún logo de sponsor queda invisible sobre el fondo claro", async ({ page }) => {
  // Los tres archivos vinieron en versión BLANCA, para fondo oscuro: avanzia
  // es 27% blanco opaco y 0% de tinta. Con el grayscale que usa el muro de
  // marcas quedaban blancos sobre blanco. Se resuelve con brightness(0), que
  // pinta de negro todo píxel opaco sin tocar la transparencia. Este test
  // falla si entra un logo nuevo que el filtro no alcanza.
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await revelarTodo(page);
  await page.evaluate(() => {
    document.querySelectorAll(".barra-fija, header").forEach((e) => (e.style.visibility = "hidden"));
  });

  const invisibles = [];
  for (const img of await page.$$("#respaldan img, #partners article img")) {
    const src = (await img.getAttribute("src")).split("/").pop().split("?")[0];
    await img.scrollIntoViewIfNeeded();
    const buf = await img.screenshot();
    // Cuánta tinta oscura hay de verdad en lo que se ve renderizado.
    const tinta = await page.evaluate(async (b64) => {
      const im = new Image();
      im.src = "data:image/png;base64," + b64;
      await im.decode();
      const c = document.createElement("canvas");
      c.width = im.width;
      c.height = im.height;
      const x = c.getContext("2d");
      x.drawImage(im, 0, 0);
      const d = x.getImageData(0, 0, c.width, c.height).data;
      let oscuros = 0;
      for (let i = 0; i < d.length; i += 4) {
        if (d[i + 3] < 10) continue;
        if (d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114 < 160) oscuros++;
      }
      return Math.round((oscuros / (c.width * c.height)) * 100);
    }, buf.toString("base64"));
    if (tinta < 3) invisibles.push(src + ": " + tinta + "% de tinta");
  }
  expect(invisibles).toEqual([]);
});
