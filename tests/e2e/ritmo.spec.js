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

test("todo botón con el acento pleno es una salida real, no decoración", async ({ page }) => {
  /*
    ESTE CASO NO PROBABA NADA. Buscaba los tres magentas de la paleta anterior
    —rgb(224,0,73) y compañía—, y la página se unificó en el violeta #695EDE
    hace commits: ningún elemento tenía ya esos fondos, así que la lista de
    desviados salía vacía siempre y el test pasaba en verde por vacío. No se
    notó porque los e2e no corren en CI.

    Y la regla que protegía también cambió. Decía "todo botón magenta lleva a
    reservar", que era cierto cuando el acento se usaba sólo ahí. Hoy el violeta
    pleno lo llevan además "Quiero ser sponsor" y "Pedir acreditación", que son
    salidas legítimas a WhatsApp aunque no sean la reserva.

    Lo que sigue valiendo, y es lo que se verifica ahora: que el color de acción
    no se gaste en algo que no lleva a ningún lado. O abre WhatsApp, o navega a
    la vista de reserva.
  */
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  await revelarTodo(page);

  const desviados = await page.evaluate(() => {
    // El acento pleno, tomado de la variable de la hoja de estilos y no
    // escrito acá: si la paleta se vuelve a mover, este test se mueve con ella.
    const hex = getComputedStyle(document.documentElement).getPropertyValue("--acento").trim();
    const aRgb = (h) => {
      const n = parseInt(h.replace("#", ""), 16);
      return `rgb(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255})`;
    };
    const ACENTO = aRgb(hex);
    const out = [];
    for (const el of document.querySelectorAll("a[href], button")) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      // El enlace de salto vive arriba del borde de la página hasta que
      // recibe foco: es accesibilidad, no una llamada a la acción.
      if (r.top + scrollY < 0) continue;
      // El selector de "cuántos van" pinta de acento el número elegido. Es un
      // control de la reserva, no una salida: no tiene adónde llevar.
      if (el.closest("[data-selector-personas], #registro [role='group']")) continue;
      if (getComputedStyle(el).backgroundColor !== ACENTO) continue;

      const href = el.getAttribute("href") || "";
      const esSalida =
        /wa\.me/.test(href) ||
        href === "#reservar" ||
        href.includes("/deadline") ||
        /reservar|quiero mi lugar|anotarme/i.test(el.innerText);
      if (!esSalida) out.push(el.innerText.trim().slice(0, 40) + " → " + href.slice(0, 45));
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

  // La guarda de fondo, que sigue valiendo igual: cero pedidos a Google.
  expect(deGoogle).toEqual([]);

  /*
    LA SEGUNDA MITAD DE ESTE CASO CAMBIÓ DE FORMA, no de intención.

    Esperaba un botón "ver el mapa" que insertaba el iframe en #lugar. Hoy no
    hay iframe en ninguna parte: la sección se llama #donde y el mapa es un
    ENLACE EXTERNO —"Abrir en Maps"— que se abre en otra pestaña. Es la versión
    más barata todavía de la misma decisión: cero KB en vez de 443.

    Así que se verifica lo que hay: que no quede ningún iframe embebido y que
    el acceso al mapa siga estando a un toque.
  */
  await expect(page.locator("#donde iframe")).toHaveCount(0);

  const aMaps = page.locator('#donde a[href*="google.com/maps"]');
  await expect(aMaps).toHaveCount(1);
  await expect(aMaps).toHaveAttribute("target", "_blank");
  // Y lleva a la dirección real, no a una búsqueda vacía.
  await expect(aMaps).toHaveAttribute("href", /Quinto\+?%?20?Centenario|Duarte/i);
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
  // #detras es PruebaSection y vive en /organiza: la home dejó de montarla el
  // 31/08, así que este caso venía midiendo una sección que no estaba.
  await page.goto("/#/organiza");
  await revelarTodo(page);
  await page.evaluate(() => {
    document.querySelectorAll(".barra-fija, header").forEach((e) => (e.style.visibility = "hidden"));
  });

  /*
    EL FONDO EFECTIVO, no el de la sección.

    Esto tomaba getComputedStyle("#detras").backgroundColor a secas, y en
    /organiza esa sección es TRANSPARENTE: devuelve "rgba(0, 0, 0, 0)". Al
    parsear los números daba [0,0,0] y comparaba los logos contra NEGRO, así
    que los ocho de fondo claro salían marcados "con caja" — un falso positivo
    de manual, que además habría mandado a recortar ocho archivos que están bien.

    Se sube por los ancestros hasta el primero con fondo opaco, que es contra
    lo que el logo se ve de verdad.
  */
  const fondo = await page.evaluate(() => {
    let el = document.querySelector("#detras");
    while (el) {
      const c = getComputedStyle(el).backgroundColor;
      const p = c.match(/[\d.]+/g)?.map(Number) || [];
      const alfa = p.length === 4 ? p[3] : 1;
      if (alfa > 0.9) return c;
      el = el.parentElement;
    }
    return "rgb(255, 255, 255)";
  });
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
    /*
      Los hrefs del nav son RUTAS del router en modo hash —"#/que-es"—, no
      anclas a un id. El test se los pasaba a querySelector, que devuelve null
      para todos y encima revienta con "#/" porque no es selector CSS válido:
      las cinco pestañas salían como "rotas". Es el mismo error que tenía
      accesibilidad.spec.js.

      Una ruta se valida contra el router; un ancla, contra el DOM. Acá son
      todas rutas, así que se resuelven con router.resolve y se comprueba que
      no caigan en la comodín.
    */
    const r = await page.evaluate(() => {
      const enlaces = [...document.querySelectorAll("header nav a")];
      const router = document.querySelector("#app").__vue_app__?.config?.globalProperties?.$router;
      const roto = (a) => {
        const href = a.getAttribute("href") || "";
        if (href.startsWith("#/")) {
          if (!router) return true;
          const m = router.resolve(href.slice(1));
          return !m.matched.length || m.matched.some((x) => x.name === "resto");
        }
        return !document.getElementById(href.replace(/^#/, ""));
      };
      return {
        n: enlaces.length,
        rotos: enlaces.filter(roto).map((a) => a.innerText),
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
  // #partners vive en /participan, y ahí está también la cinta de #respaldan:
  // en la home este caso sólo veía la cinta y ninguna tarjeta.
  await page.goto("/#/participan");
  await revelarTodo(page);
  await page.evaluate(() => {
    document.querySelectorAll(".barra-fija, header").forEach((e) => (e.style.visibility = "hidden"));
  });

  /*
    LA MARQUESINA SE FRENA ANTES DE MEDIR, y sin eso este caso no puede pasar
    nunca: la cinta de #respaldan se desplaza en loop infinito con CSS, y
    scrollIntoViewIfNeeded espera a que el elemento esté "stable". Un elemento
    en animación permanente no se estabiliza jamás, así que el test moría por
    timeout de 30s en el primer logo — no porque hubiera un logo invisible.

    Parar la animación no falsea la medición: lo que se mide es cuánta tinta
    tiene el logo renderizado, y eso no depende de dónde esté la cinta.
  */
  await page.evaluate(() => {
    for (const e of document.querySelectorAll("#respaldan *")) {
      e.style.animation = "none";
      e.style.transition = "none";
    }
  });

  const invisibles = [];
  const imgs = await page.$$("#respaldan img, #partners article img");
  // Si no hay ninguna imagen, este caso no está midiendo nada: es la falla que
  // ya tuvieron dos tests de bloque-a, pasando en verde por vacío.
  expect(imgs.length, "no se encontró ningún logo para medir").toBeGreaterThan(0);
  for (const img of imgs) {
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

test("el aire entre secciones se achica en teléfono y no en escritorio", async ({ page }) => {
  /*
    El ritmo vertical era 96px fijos a cualquier ancho, y medido resultó el
    defecto responsive más caro de la página: los huecos entre bloques salían
    idénticos a 375 y a 1280 —218, 222, 226px— porque nada dependía del
    viewport. En un teléfono esos 192px entre bloque y bloque son casi un
    tercio de pantalla en blanco, repetida treinta y cuatro veces en la home.

    Ahora es clamp(3.5rem, 9vw, 6rem). Este caso fija las dos mitades de esa
    decisión, porque cada una se puede romper sin la otra: que en teléfono
    comprima de verdad, y que de 1067px para arriba el escritorio siga
    valiendo exactamente 96px, que es lo que costó calibrar.
  */
  const medir = async (ancho) => {
    await page.setViewportSize({ width: ancho, height: 900 });
    await page.goto("/#/que-es");
    await page.waitForLoadState("networkidle");
    return page.evaluate(() => {
      const s = document.querySelector(".py-seccion, [class*='py-seccion']");
      if (!s) return null;
      return Math.round(parseFloat(getComputedStyle(s).paddingTop));
    });
  };

  const telefono = await medir(375);
  const escritorio = await medir(1280);

  // Si el selector dejó de encontrar la sección esto mediría null contra null
  // y pasaría en verde sin comprobar nada, que es exactamente cómo dos casos
  // de bloque-a estuvieron años sin ejecutar una aserción.
  expect(telefono, "no se encontró ninguna sección con py-seccion").not.toBeNull();

  expect(escritorio, "el escritorio dejó de valer los 96px calibrados").toBe(96);
  expect(telefono, "en teléfono el aire de sección volvió a no comprimirse").toBeLessThanOrEqual(64);
});

test("ninguna respuesta termina con una palabra sola colgada", async ({ page }) => {
  /*
    A 375px la home tenía diez párrafos cuya última línea era una sola palabra:
    "aparte.", "devolvió.", "lugares.", "ve.". En un ancho de teléfono, donde
    cada párrafo son cuatro o cinco líneas, esa viuda es un quinto del bloque
    en blanco y se lee como un final cortado. Lo resuelve text-wrap: pretty en
    main.css.

    OJO CON MEDIRLO: el primer detector que escribí para esto acumulaba la
    última línea carácter por carácter con un Range y no descartaba los rects
    degenerados. Un espacio al final de renglón devuelve height 0, así que se
    perdía, y "200 lugares." se leía como "200lugares." —una palabra sola— y
    daba viuda donde no había ninguna. Reportó las mismas diez DESPUÉS de que
    el arreglo ya estaba puesto y funcionando. De ahí el filtro por height.
  */
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await revelarTodo(page);
  await page.evaluate(() => document.querySelectorAll("details").forEach((d) => (d.open = true)));
  await page.waitForTimeout(400);

  const r = await page.evaluate(() => {
    const w = (p) => {
      const it = document.createTreeWalker(p, NodeFilter.SHOW_TEXT);
      const rg = document.createRange();
      let top = -1, linea = "", n;
      while ((n = it.nextNode())) {
        const s = n.textContent;
        for (let i = 0; i < s.length; i++) {
          rg.setStart(n, i);
          rg.setEnd(n, i + 1);
          const rc = rg.getBoundingClientRect();
          if (rc.height === 0) continue;
          if (rc.top > top + 2) { top = rc.top; linea = ""; }
          if (Math.abs(rc.top - top) < 2) linea += s[i];
        }
      }
      return linea.trim();
    };
    const ps = [...document.querySelectorAll("main p")].filter(
      (p) => (p.innerText || "").trim().length > 80
    );
    const viudas = [];
    for (const p of ps) {
      const u = w(p);
      // Una palabra sola y corta. Una última línea larga no es una viuda
      // aunque no tenga espacios: es una palabra que no entró y ya está.
      if (u.length > 0 && u.length <= 14 && !u.includes(" ")) {
        viudas.push(`«${u}» en «${p.innerText.trim().replace(/\s+/g, " ").slice(0, 45)}»`);
      }
    }
    return { medidos: ps.length, viudas };
  });

  expect(r.medidos, "no se encontró ningún párrafo largo para medir").toBeGreaterThan(15);
  expect(r.viudas).toEqual([]);
});

test("todas las secciones se comprimen con la misma curva, no cada una con la suya", async ({ page }) => {
  /*
    El caso de arriba mide UNA sección y no alcanza.

    Cuando el ritmo pasó a clamp, dos secciones tenían el padding escrito a
    mano —FAQSection con py-20 sm:py-28, ElLunesSection con py-16 sm:py-24— y
    quedaron fuera de la curva. El resultado fue peor que no haber tocado nada:
    el corte del FAQ era el MÁS APRETADO de la home, 176px contra 192, y pasó a
    ser el MÁS SUELTO, 136 contra 112 a 375px y 170 contra 116 a 640. Justo el
    último bloque de la página.

    LA PRIMERA VERSIÓN DE ESTE TEST NO SERVÍA. Pedía que cada sección respirara
    menos en teléfono que en escritorio, y `py-20 sm:py-28` cumple eso: 80 contra
    112, se comprime igual, sólo que por breakpoint y con otra pendiente. El
    test pasaba en verde con el defecto puesto. Verificado rompiéndolo a
    propósito, que es la única forma de enterarse.

    Lo que hay que comparar es la RAZÓN teléfono/escritorio de cada una contra
    la de las demás. Las siete del ritmo dan 0.583 clavado; el FAQ, que tiene su
    propio techo a propósito, da 0.571; con el valor fijo daba 0.714. La curva
    se ve en la razón, no en el valor.
  */
  const leer = async (ancho) => {
    await page.setViewportSize({ width: ancho, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    return page.evaluate(() =>
      [...document.querySelectorAll("main section")].map((s) => ({
        id: s.id || "(sin id)",
        pt: parseFloat(getComputedStyle(s).paddingTop),
      }))
    );
  };

  const telefono = await leer(375);
  const escritorio = await leer(1280);

  expect(telefono.length, "no se encontró ninguna sección en la home").toBeGreaterThan(5);
  expect(escritorio.length, "la home cambió de cantidad de secciones entre anchos").toBe(telefono.length);

  /*
    Dos quedan afuera, y por motivos distintos:

    · #hero, porque su aire de arriba no sigue al ritmo de la página sino al
      alto del nav, que en teléfono es MAYOR. Lo cubre "el nav fijo no tapa el
      título de la sección en ningún ancho", en enlaces-compartidos.spec.js.
    · #respaldan, porque es la franja fina de logos y lleva su propio py-10
      sm:py-12 a propósito: no es un corte de sección, es un separador.
  */
  const APARTE = ["hero", "respaldan"];
  const razones = telefono
    .map((t, i) => ({ id: t.id, tel: t.pt, esc: escritorio[i].pt }))
    .filter((s) => !APARTE.includes(s.id) && s.esc > 24)
    .map((s) => ({ ...s, r: s.tel / s.esc }));

  // Sin esto, un cambio de markup que dejara la lista vacía haría pasar el
  // caso sin comparar nada.
  expect(razones.length, "quedaron muy pocas secciones para comparar").toBeGreaterThanOrEqual(5);

  const orden = [...razones.map((x) => x.r)].sort((a, b) => a - b);
  const mediana = orden[Math.floor(orden.length / 2)];

  const desviadas = razones
    .filter((s) => Math.abs(s.r - mediana) > 0.06)
    .map(
      (s) =>
        `#${s.id}: ${Math.round(s.tel)}/${Math.round(s.esc)} = ${s.r.toFixed(3)} ` +
        `contra ${mediana.toFixed(3)} del resto`
    );

  expect(desviadas).toEqual([]);
});

