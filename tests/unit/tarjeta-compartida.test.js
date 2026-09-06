import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { EVENTO, CUPO } from "@/data/evento";

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

  it("publica el horario del evento, que arranca con la acreditación", () => {
    // La tarjeta lo escribe con la h final: "9 a 18 h".
    expect(dibujo).toContain(`${EVENTO.horario} h`);
  });

  /*
    Este caso empezó prohibiendo "9 a 18 h" —era el horario viejo, de cuando la
    apertura decía 9 en punto y la grilla del 30/08 la corrigió a 9:30—. Después
    la apertura se movió otra vez, a 9:00, y "9 a 18 h" pasó a ser el dato
    correcto: el test estaba prohibiendo justo lo que había que publicar.

    Por eso ahora no lista horarios prohibidos sino que exige que el .py NO
    tenga ninguna hora de apertura distinta de la que declara evento.js. Así el
    caso sigue sirviendo la próxima vez que se mueva, sin volver a editarlo.
  */
  it("no arrastra ninguna hora de apertura que evento.js ya no declara", () => {
    const horasEnLaTarjeta = dibujo.match(/\b\d{1,2}(?::\d{2})?\s+a\s+18\s*h/g) || [];
    expect(horasEnLaTarjeta).toHaveLength(1);
    expect(horasEnLaTarjeta[0]).toContain(EVENTO.horario);
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
   * en cinco lugares y hoy dice "once". Lo que este test impide es que la
   * tarjeta se quede sola en un número distinto, que es lo que pasó con
   * "SIETE BLOQUES" durante dos versiones de la grilla.
   */
  it("no se queda con un conteo de bloques que la página ya no usa", () => {
    expect(dibujo).not.toContain("SIETE BLOQUES");
  });
});
