import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { MENSAJES_WA } from "@/data/evento";

/**
 * Frases que la página decía dos veces, y las dos que Alan pidió sacar.
 *
 * Una frase repetida palabra por palabra no es un error de dato: es la marca
 * de que dos bloques se escribieron por separado y nadie los leyó seguidos.
 * Duele más cuando las dos apariciones entran en la misma pantalla, que es
 * exactamente lo que pasaba en #acceso.
 *
 * Los dos últimos tests no son de estilo: son pedidos explícitos del 26/08 a
 * las 02:47 que se habían aplicado a medias.
 */

const SRC = join(process.cwd(), "src");

describe("frases que no pueden estar dos veces", () => {
  it('"No hay sillas de más" aparece una sola vez en las tarjetas de #acceso', () => {
    // Estaba en el tramo abierto y otra vez en la lista de espera, a ~380px:
    // las dos entraban juntas en la misma pantalla, y justo en el bloque que
    // tiene que sonar más firme por estar pegado al pedido.
    const acceso = readFileSync(
      join(SRC, "components/sections/AccesoSection.vue"),
      "utf-8"
    );
    const n = acceso.split("No hay sillas de más: entra lo que entra").length - 1;
    expect(n).toBe(1);
  });

  it("la tarjeta de lista de espera dice cómo se entra, que es el dato que le faltaba", () => {
    const acceso = readFileSync(
      join(SRC, "components/sections/AccesoSection.vue"),
      "utf-8"
    );
    expect(acceso).toContain("Te anotás por el mismo WhatsApp");
  });
});

describe("los dos pedidos del 26/08", () => {
  it('la sección de reserva no habla de "si no podés venir"', () => {
    // Alan: "Saca la parte si al final no podés venir". Estaba dos veces, las
    // dos alrededor del botón: le plantaban al lector la idea de faltar justo
    // cuando estaba por confirmar.
    const registro = readFileSync(
      join(SRC, "components/sections/RegistroSection.vue"),
      "utf-8"
    );
    expect(registro).not.toMatch(/no pod[eé]s venir/i);
  });

  it('la sección de "todavía no" no le inventa la objeción al lector', () => {
    // Alan: "que sea distinta". Preguntaba "¿Querés esperar a ver quién más
    // habla?", que le pone en la boca una duda que ninguna otra sección
    // sugiere, y encima la equivocada.
    const avisame = readFileSync(
      join(SRC, "components/sections/AvisameSection.vue"),
      "utf-8"
    );
    expect(avisame).not.toMatch(/¿Querés esperar a ver quién más habla\?/);
    expect(avisame).toContain("¿Todavía no te decidís?");
  });

  it("el botón de avisos dice qué avisa, no cuándo cierra", () => {
    // "Avisame cuando cierren" no aclara qué cierra, y en una página que
    // habla todo el tiempo de cupo duro se lee como "avisame cuando ya no
    // haya lugar" — o sea, lo contrario de lo que hace.
    const avisame = readFileSync(
      join(SRC, "components/sections/AvisameSection.vue"),
      "utf-8"
    );
    expect(avisame).not.toContain("Avisame cuando cierren");
    expect(avisame).toContain("Avisame quién más habla");
  });

  it("el mensaje de avisos no pide el mail: el chat ya es el contacto", () => {
    // Era el único renglón a completar de toda la página en el momento de
    // menor compromiso.
    expect(MENSAJES_WA.avisos).not.toMatch(/mi mail/i);
    expect(MENSAJES_WA.avisos.split("\n").filter((l) => l.trim().endsWith(":"))).toHaveLength(0);
  });
});
