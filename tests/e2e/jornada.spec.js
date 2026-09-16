import { test, expect } from "@playwright/test";
import { GRILLA, TIPOS_GRILLA } from "../../src/data/evento.js";

/**
 * LA JORNADA: que la grilla esté entera, y que se entienda.
 *
 * ESTE ARCHIVO SE REESCRIBIÓ POR SEGUNDA VEZ, y conviene decir por qué, porque
 * la versión anterior probaba lo contrario de lo que hay que probar ahora.
 *
 * Aquella sección no mostraba el cronograma: mostraba una lista de qué había
 * ese día, sin horas. Uno de sus casos —"no vuelve a publicar el cronograma
 * hora por hora"— fallaba si aparecía cualquier hora entre las 10 y las 17 en
 * la sección. Era correcto entonces y es exactamente al revés ahora.
 *
 * Lo que la sección hace HOY: publica el run-of-show entero, 29 filas, con la
 * jerarquía que lo hace legible. Y esa jerarquía no es decoración — es la
 * mitad del pedido ("que realmente sea una grilla que se entienda"), así que
 * se mide, no se confía.
 *
 * TODO LO QUE SE ESPERA SALE DE GRILLA. No hay un 29, ni un 09:30, ni un
 * nombre de empresa escrito en este archivo: es el error que esta suite ya
 * cometió cuatro veces —el horario, la paleta, un teléfono, el conteo de
 * pestañas— y siempre falló por un dato viejo, no por un defecto.
 */

const FILAS_DE_CONTENIDO = GRILLA.filter((f) => TIPOS_GRILLA[f.tipo].peso === "contenido");
const DE_SERVICIO = GRILLA.filter((f) => TIPOS_GRILLA[f.tipo].peso === "servicio");
const EMPRESAS = [...new Set(FILAS_DE_CONTENIDO.map((f) => f.empresa).filter(Boolean))];

/** Baja hasta la sección y revela la cascada de entrada. */
async function abrirJornada(page) {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => {
    document.querySelectorAll(".v-reveal").forEach((e) => e.classList.add("v-reveal-visible"));
  });
  await page.locator("#jornada").scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
}

test("está la grilla entera menos las de producción", async ({ page }) => {
  await abrirJornada(page);

  /*
    Se cuentan las filas de GRILLA que llegaron a la pantalla, no los <li>: el
    componente agrupa de a pares, así que catorce filas de contenido viven
    dentro de ocho cajas. Contar contenedores mediría el agrupamiento; contar
    filas mide que no se haya perdido ninguna.

    LO QUE SE ESPERA NO ES 29 sino 29 menos las de servicio, y sale de la
    fuente: si mañana se agrega una charla, el número sube solo; si se agrega
    una transición, no. Escribir "20" acá lo rompería al primer cambio de
    programa, que es el error que esta suite ya cometió cuatro veces.
  */
  const enPantalla = await page.locator("#jornada").evaluate((s) => ({
    subFilas: s.querySelectorAll(".sub-fila").length,
    marco: s.querySelectorAll(".fila-marco").length,
  }));

  const marco = GRILLA.filter((f) => TIPOS_GRILLA[f.tipo].peso === "marco").length;

  expect(enPantalla.subFilas, "faltan filas de contenido").toBe(FILAS_DE_CONTENIDO.length);
  expect(enPantalla.marco, "faltan filas de marco").toBe(marco);
  expect(
    enPantalla.subFilas + enPantalla.marco,
    "la suma de lo que se ve no da las filas publicables de la planilla"
  ).toBe(GRILLA.length - DE_SERVICIO.length);
});

test("cada empresa de la grilla aparece con su nombre", async ({ page }) => {
  await abrirJornada(page);
  const texto = await page.locator("#jornada").innerText();

  // Si la lista quedara vacía esto pasaría sin mirar nada.
  expect(EMPRESAS.length).toBeGreaterThan(3);
  const faltan = EMPRESAS.filter((e) => !texto.includes(e));
  expect(faltan, "hay empresas de la grilla que no llegaron a la pantalla").toEqual([]);
});

test("cada bloque de contenido muestra quién lo da", async ({ page }) => {
  await abrirJornada(page);
  const texto = await page.locator("#jornada").innerText();

  const oradores = [...new Set(FILAS_DE_CONTENIDO.map((f) => f.orador).filter(Boolean))];
  expect(oradores.length).toBeGreaterThan(3);
  const faltan = oradores.filter((o) => !texto.includes(o));
  expect(
    faltan,
    "hay oradores de la grilla que no se leen: es la condición por la que la grilla se sacó la vez anterior"
  ).toEqual([]);
});

test("las horas que se leen son las de la planilla", async ({ page }) => {
  await abrirJornada(page);
  const texto = await page.locator("#jornada").innerText();

  // Cada fila de contenido publica su hora de inicio en su rótulo.
  const faltan = FILAS_DE_CONTENIDO.filter((f) => !texto.includes(f.desde)).map((f) => f.desde);
  expect(faltan, "hay horas de la grilla que no aparecen").toEqual([]);

  /*
    Y AL REVÉS, que es lo que de verdad atrapa un dato viejo: ninguna hora
    visible puede ser una que la grilla no tenga. Así, si mañana alguien
    escribe un horario a mano en el template, este caso lo encuentra aunque
    todas las horas reales sigan estando.
  */
  const legitimas = new Set(GRILLA.flatMap((f) => [f.desde, f.hasta]));
  const intrusas = [...new Set(texto.match(/\b\d{1,2}:\d{2}\b/g) || [])].filter(
    (h) => !legitimas.has(h)
  );
  expect(intrusas, "hay horas en la sección que la grilla no tiene").toEqual([]);
});

test("las filas de producción no se publican", async ({ page }) => {
  await abrirJornada(page);

  /*
    "Promo y presentación" es producción: la misma frase nueve veces entre las
    charlas, nada que el que evalúa venir el sábado pueda usar para decidir.
    Alan las sacó el 15/09 después de verlas puestas.

    SIGUEN EN GRILLA —el dato es el run-of-show completo— así que lo que se fija
    acá es que el filtro esté en la vista y siga funcionando: si alguien lo
    saca, vuelven nueve renglones a la pantalla sin que nada falle.

    Se comprueba por el texto y no por el selector de la fila. Un selector que
    ya no existe matchea cero y el caso pasa por vacío, que es exactamente cómo
    esta suite se quedó con cinco casos que no probaban nada durante dos
    rediseños.
  */
  const texto = await page.locator("#jornada").innerText();

  // Si la grilla dejara de tener filas de servicio, este caso no prueba nada.
  expect(DE_SERVICIO.length, "la grilla ya no tiene filas de producción").toBeGreaterThan(0);

  const etiqueta = TIPOS_GRILLA.transicion.label;
  expect(texto, `se publicó «${etiqueta}», que es producción`).not.toContain(etiqueta);

  // Y la conductora de esas filas tampoco aparece por esa puerta: si figura,
  // tiene que ser por la apertura o el cierre, que sí se publican.
  const soloEnTransiciones = [...new Set(DE_SERVICIO.map((f) => f.conduccion))].filter(
    (quien) => quien && !GRILLA.some((f) => TIPOS_GRILLA[f.tipo].peso !== "servicio" && f.conduccion?.includes(quien))
  );
  const coladas = soloEnTransiciones.filter((quien) => texto.includes(quien));
  expect(coladas, "quedó nombre de producción en la pantalla").toEqual([]);
});

test("la única cifra del día sale de la grilla", async ({ page }) => {
  await abrirJornada(page);

  /*
    Eran tres —el horario, las empresas en escenario y los minutos de
    contenido— y Alan sacó las dos últimas el 15/09. Contaban lo que la grilla
    muestra entera unos centímetros más abajo: un número que resume una lista
    visible no informa, compite con ella.
  */
  const fichas = page.locator("#jornada .ficha");
  await expect(fichas).toHaveCount(1);

  const texto = (await fichas.allInnerTexts()).join(" | ");
  expect(texto).toContain(GRILLA[0].desde);
  expect(texto).toContain(GRILLA[GRILLA.length - 1].hasta);
});

test("la cascada de entrada no deja ninguna fila escondida", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.locator("#jornada").scrollIntoViewIfNeeded();
  // Sin forzar la clase: se espera a que el observador real termine.
  await page.waitForTimeout(2500);

  const opacidades = await page
    .locator("#jornada .grilla-dia > li")
    .evaluateAll((els) => els.map((e) => Number(getComputedStyle(e).opacity)));

  expect(opacidades.length, "no se encontró ninguna fila para medir").toBeGreaterThan(10);
  const apagadas = opacidades.filter((o) => o < 0.99).length;
  expect(apagadas, "quedaron filas a medio aparecer").toBe(0);
});

test("la grilla no desborda a lo ancho en ningún teléfono", async ({ page }) => {
  for (const ancho of [320, 360, 375, 414]) {
    await page.setViewportSize({ width: ancho, height: 800 });
    await abrirJornada(page);
    const r = await page.evaluate(() => ({
      seccion: document.querySelector("#jornada").scrollWidth,
      pantalla: document.documentElement.clientWidth,
      pagina: document.documentElement.scrollWidth,
    }));
    expect(r.seccion, `a ${ancho}px la sección desborda`).toBeLessThanOrEqual(r.pantalla);
    expect(r.pagina, `a ${ancho}px la página desborda`).toBeLessThanOrEqual(r.pantalla);
  }
});
