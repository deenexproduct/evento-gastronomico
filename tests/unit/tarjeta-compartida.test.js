import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { EVENTO, CUPO, BORDES } from "@/data/evento";

/**
 * La tarjeta que levantan WhatsApp, LinkedIn e Instagram al compartir el link.
 *
 * Es la primera superficie de la marca: toda la convocatoria entra por
 * WhatsApp, y en el chat la imagen se lee antes que el título y a veces en vez
 * del título. Se genera con herramientas/og-image.py.
 *
 * El problema estructural: el generador es Python y NO PUEDE importar
 * src/data/evento.js, así que la fecha, el horario y el lugar están escritos a
 * mano en el .py. Cuando el evento se mudó del domingo 20 al sábado 19, el
 * index.html se corrigió y el .py no: la tarjeta quedó anunciando el 20.09.2026
 * al lado de un og:image:alt que decía "19 de septiembre" — se contradecía
 * dentro de la misma tarjeta, y siguió repartiéndose así por cada reenvío.
 *
 * Este archivo es la única red posible: lee el .py como texto y lo compara
 * contra evento.js. No valida el PNG —para eso hay que mirarlo—, valida que
 * los datos que el script va a dibujar sean los correctos.
 *
 * OJO: si cambia un dato, hay que REGENERAR el PNG además de arreglar el .py:
 *   python herramientas/og-image.py public
 * Y como WhatsApp cachea la previsualización por URL, los links que ya
 * circulan van a seguir mostrando la tarjeta vieja.
 */
const py = readFileSync(resolve(process.cwd(), "herramientas/og-image.py"), "utf8");

/** Sólo el cuerpo de generar(): arriba hay comentarios que citan datos viejos a propósito. */
const dibujo = py.slice(py.indexOf("def generar("));

describe("tarjeta compartida (og-image.py)", () => {
  it("anuncia la fecha del evento, no una anterior", () => {
    // fechaNumerica es "19.09.26"; la tarjeta la escribe con el año entero.
    const [dia, mes] = EVENTO.fechaNumerica.split(".");
    expect(dibujo).toContain(`${dia}.${mes}.2026`);
  });

  it("no arrastra la fecha vieja del domingo 20", () => {
    expect(dibujo).not.toContain("20.09.2026");
  });

  /*
    Este caso se rompió TRES veces por escribir horas adentro del test, y cada
    rotura enseñó lo mismo:

      1. Prohibía "9 a 18 h" como horario viejo. Cuando la apertura volvió a las
         9:00, pasó a prohibir el dato correcto.
      2. Buscaba "... a 18 h" con el 18 fijo. Se cayó cuando el cierre pasó a
         las 21.
      3. Exigía el rango `${EVENTO.horario} h`. Se cayó cuando la tarjeta dejó
         de publicar un rango y pasó a decir las tres horas por separado, que es
         más claro para el que la lee en el chat.

    La lección es que el FORMATO de la tarjeta no es asunto de este test: lo que
    tiene que garantizar es que cada hora impresa salga de evento.js. Por eso
    ahora verifica los tres datos por separado y contra la fuente, sin asumir
    cómo están redactados.
  */
  it("publica la hora de acreditación que declara evento.js", () => {
    expect(dibujo).toContain(EVENTO.puertas);
  });

  it("publica la ventana de charlas que declara evento.js", () => {
    expect(dibujo).toContain(EVENTO.horarioCharlas);
  });

  it("publica la hora en que se corta la sala", () => {
    // En punto va sin los minutos —"21:00" en los datos era "21" en la
    // tarjeta—; con minutos, entera. Buscar sólo la hora dejaba pasar un
    // "18" cualquiera cuando el corte es 18:10.
    const corte = BORDES.cierre.hasta.replace(/:00$/, "");
    expect(dibujo).toContain(corte);
  });

  it("no arrastra ninguna hora que evento.js ya no declara", () => {
    // 8:30 y 9:00 fueron aperturas anteriores; "cierre 18:00" y "hasta las 21",
    // cierres anteriores. Ninguna puede seguir impresa en la tarjeta.
    //
    // 9:30 estuvo en esta lista y el 16/09 volvió a ser la apertura: una lista
    // de horas viejas se vence sola, así que cuando falle por una hora que
    // volvió, se saca de acá y no se toca la tarjeta.
    expect(dibujo).not.toContain("8:30");
    expect(dibujo).not.toContain("9:00");
    expect(dibujo).not.toMatch(/cierre\s+18/i);
    expect(dibujo).not.toMatch(/hasta las 21/i);
  });

  it("dice el mismo lugar y la misma ciudad que el resto del sitio", () => {
    expect(dibujo).toContain(EVENTO.venue);
    expect(dibujo).toContain(EVENTO.ciudad.toUpperCase());
  });

  it("dice el cupo real", () => {
    expect(dibujo).toContain(`"${CUPO.total}"`);
  });

  it("lleva el nombre del evento, en versales", () => {
    expect(dibujo).toContain(EVENTO.nombre.toUpperCase());
  });

  /**
   * El conteo de bloques no sale de TEMAS.length: la página lo escribe a mano
   * en siete lugares y hoy dice DIEZ, que es la cantidad de temas con orador
   * —TEMAS tiene once entradas y una es el networking del mediodía—.
   *
   * Este caso impide que la tarjeta se quede sola en un número distinto, que
   * es lo que pasó con "SIETE BLOQUES" durante dos versiones de la grilla y
   * después con "ONCE" cuando el resto ya decía diez.
   */
  it("dice el mismo conteo de bloques que la página", () => {
    expect(dibujo).toContain("DIEZ BLOQUES");
    expect(dibujo).not.toContain("SIETE BLOQUES");
    expect(dibujo).not.toContain("ONCE BLOQUES");
  });
});
