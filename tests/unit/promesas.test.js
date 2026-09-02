import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { EVENTO, TEMAS, EL_LUNES, mensajeReserva } from "@/data/evento";

/**
 * Las promesas que la propia página puede desmentir.
 *
 * Son distintas de un dato equivocado: un dato equivocado hay que saberlo de
 * afuera para pescarlo, y estas se caen solas leyendo la misma página. El que
 * las pesca no piensa "se equivocaron", piensa "me están vendiendo", y eso ya
 * no se recupera con el resto del texto.
 *
 * Había seis. Cada una de estas pruebas es una de ellas, escrita para fallar
 * si vuelve. No cubren toda la redacción —eso no se puede—, cubren la forma
 * exacta en que cada una entró.
 */

// process.cwd() es la raiz del proyecto cuando corre vitest.
const SRC = join(process.cwd(), "src");

/** Todo el texto que la página publica, junto: fuentes + HTML de entrada. */
function textoPublicado() {
  const partes = [];
  const recorrer = (dir) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) recorrer(p);
      else if (/\.(vue|js)$/.test(e.name)) partes.push(readFileSync(p, "utf-8"));
    }
  };
  recorrer(SRC);
  partes.push(readFileSync(join(SRC, "..", "index.html"), "utf-8"));
  return partes.join("\n");
}

describe("promesas que la página podría desmentir sola", () => {
  it("no promete que hablen dueños de otras cadenas: ninguno de los que hablan lo es", () => {
    // Los siete bloques los dan proveedores y consultores del rubro. Prometer
    // pares contando sus números es la promesa más cara de la página porque
    // el lector la chequea en la misma pantalla, mirando quién habla.
    const quienes = TEMAS.map((t) => t.quien).join(" | ");
    expect(quienes).not.toMatch(/dueñ[oa]/i);

    for (const linea of EL_LUNES) {
      expect(linea).not.toMatch(/otras cadenas/i);
    }
  });

  it("no publica un metraje del salón que contradiga el cupo", () => {
    // 200 m² con 200 personas es un metro cuadrado por cabeza, con stands y
    // mesa redonda prometidos aparte. Mientras el metraje real no esté
    // confirmado, la página dice "salón propio" y no arriesga el número.
    expect(textoPublicado()).not.toMatch(/\d+\s*m²/);
  });

  it("no habla de una edición 02 antes de que exista la 01", () => {
    expect(textoPublicado()).not.toMatch(/edición\s*0?2/i);
  });

  it("no le promete al partner una sala llena que todavía no está llena", () => {
    // Hoy hay 85 de 200. "Un beneficio para las 200 personas que estén ese
    // día" es un número que el partner puede contar en la puerta.
    const t = textoPublicado();
    expect(t).not.toMatch(/200 (personas|dueños) (que|de la sala)/i);
  });

  it("no ofrece recibir la grilla primero: ya está publicada más arriba", () => {
    expect(textoPublicado()).not.toMatch(/grilla primero/i);
  });

  it("no promete renglones que el mensaje ya no trae", () => {
    // El mensaje pasó a una sola línea: pedía cinco campos a mano y en el
    // teclado de un teléfono eso se borra antes de mandar. Si vuelve la
    // promesa sin los campos, la página miente sobre lo que va a pasar.
    const registro = readFileSync(
      join(process.cwd(), "src/components/sections/RegistroSection.vue"),
      "utf-8"
    );
    expect(registro).not.toMatch(/renglones y lo mandás/);
    expect(mensajeReserva().split("\n")).toHaveLength(1);
  });

  it("el cupo sigue siendo el que dice ser", () => {
    // Guarda de las dos de arriba: si el cupo cambia, el metraje y las
    // promesas al partner hay que volver a mirarlos con este número.
    expect(EVENTO.cupo ?? 200).toBe(200);
  });
});
