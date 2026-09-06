import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { EVENTO, CUPO, WHATSAPP_ORGANIZADOR, mensajeReserva } from "@/data/evento";

/**
 * El bloque de respaldo de index.html: lo único que queda en pie cuando el
 * JavaScript no llega —wifi de local, navegador embebido de una app, túnel—.
 *
 * Sus datos van escritos a mano A PROPÓSITO: cualquier cosa que dependa de un
 * import viaja dentro del mismo archivo que puede no llegar. Esa decisión es
 * correcta y no se toca; el costo es que ningún import lo mantiene al día.
 *
 * Y se desactualizó, tres veces a la vez: convocaba al domingo 20 cuando el
 * evento ya era el sábado 19, saludaba a Alan cuando ya atiende Romina, y
 * anunciaba puertas 8:30 cuando la grilla del 30/08 fijó 9:30. Los tests que
 * había miraban sólo el <head> —los meta y el JSON-LD—, así que el cuerpo pasó
 * por cuatro correcciones de fecha sin que nada se pusiera en rojo.
 *
 * Este archivo es la red que faltaba: compara el respaldo contra evento.js.
 */
const html = readFileSync(resolve(process.cwd(), "index.html"), "utf8");

/**
 * El respaldo es lo que vive dentro de <div id="app">, que Vue pisa al montar.
 *
 * Sin los comentarios HTML: ahí adentro se explica JUSTAMENTE cuáles fueron
 * los datos viejos —"convocaba al domingo 20", "puertas 8:30"— y esa prosa no
 * la ve ningún lector. Si el test mirara el bloque crudo, documentar el error
 * lo haría fallar, y la salida sería borrar la explicación.
 */
const respaldo = html
  .match(/<div id="app">([\s\S]*?)<\/body>/)[1]
  .replace(/<!--[\s\S]*?-->/g, "");

/** El href del único botón del respaldo. */
const hrefWa = respaldo.match(/href="(https:\/\/wa\.me\/[^"]+)"/)[1];

describe("respaldo sin JavaScript", () => {
  it("anuncia la misma fecha que el resto del sitio", () => {
    expect(respaldo).toContain(EVENTO.fechaLarga);
  });

  it("no arrastra la fecha vieja: el evento es el sábado, no el domingo", () => {
    // DOMINGO es una jornada real y distinta (evento.js), pero no se convoca
    // desde acá: este bloque es de SaboresTech, que es el sábado.
    expect(respaldo.toLowerCase()).not.toMatch(/domingo/);
    expect(respaldo).not.toMatch(/20 de septiembre/);
  });

  it("abre a la hora que abre el evento", () => {
    expect(respaldo).toContain(EVENTO.puertas);
    // 8:30 fue el dato viejo durante cuatro correcciones seguidas.
    expect(respaldo).not.toMatch(/8:30/);
  });

  it("dice el lugar y el cupo que dice el resto del sitio", () => {
    expect(respaldo).toContain(EVENTO.venue);
    expect(respaldo).toContain(EVENTO.direccion);
    expect(respaldo).toContain(String(CUPO.total));
  });

  it("manda al número por el que entra toda la convocatoria", () => {
    expect(hrefWa).toContain(WHATSAPP_ORGANIZADOR);
  });

  /**
   * El corazón del archivo: el mensaje precargado del respaldo tiene que ser
   * EL MISMO que produce mensajeReserva(). Es la única forma de que la persona
   * que reserva sin JavaScript le llegue al organizador igual que las demás.
   */
  it("precarga exactamente el mensaje de reserva de la app", () => {
    const texto = decodeURIComponent(hrefWa.split("?text=")[1]);
    expect(texto).toBe(mensajeReserva());
  });

  it("no revive el formulario de cinco campos que se eliminó por fricción", () => {
    const texto = decodeURIComponent(hrefWa.split("?text=")[1]);
    expect(texto).not.toMatch(/Nombre:|Marca:|Mi rol:|Mi mail/);
  });
});
