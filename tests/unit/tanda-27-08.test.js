import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { EVENTO, NAV_ENLACES, MENSAJES_WA } from "@/data/evento";

/**
 * Los trece puntos que pidio Alan el 27/08. Un guarda por pedido: si algo de
 * esto vuelve, falla aca y no en la pantalla de alguien.
 */

const SRC = join(process.cwd(), "src");
const SECCIONES = join(SRC, "components/sections");
const leer = (p) => readFileSync(join(SRC, p), "utf-8");
const cuantas = (texto, aguja) => texto.split(aguja).length - 1;

describe("2 y 3 · que es", () => {
  const queEs = leer("components/sections/QueEsSection.vue");

  it("no vuelve el bloque de las salas paralelas", () => {
    // "Siete bloques a lo largo del dia, sin salas paralelas: lo que pasa,
    // pasa adelante tuyo." El dato del track unico ya vive en #jornada.
    expect(queEs).not.toContain("sin salas paralelas");
    expect(queEs).not.toContain("pasa adelante tuyo");
  });

  it("encabeza con tendencias e innovacion, no con tecnologia sola", () => {
    // Alan: "todo es tecnologia, y el objetivo es que se llevan tendencias,
    // innovacion, y todo apuntado a mercado gastronomico para cadenas".
    expect(queEs).toContain("tendencias");
    expect(queEs).toContain("mercado gastronomico".replace("gastronomico", "gastronómico"));
    expect(queEs).not.toContain("Un día de tecnología para tu cadena");
  });
});

describe("4 · la casilla de precio habla en registro profesional", () => {
  const queEs = leer("components/sections/QueEsSection.vue");

  it("no dice que no se cobra en la puerta", () => {
    expect(queEs).not.toContain("no se cobra en la puerta");
    expect(queEs).not.toContain("No hay ticket");
    expect(queEs).not.toContain("y no hay más");
  });

  it("dice entrada sin costo con reserva previa", () => {
    expect(queEs).toContain("Entrada sin costo, con reserva previa");
  });
});

describe("7 · quien organiza habla del organizador", () => {
  const detras = leer("components/sections/PruebaSection.vue");

  it("no vuelve a contar el evento en sus cifras", () => {
    // Dos de las tres cifras eran del evento —7 bloques, 200 lugares— en la
    // seccion que tiene que contestar quien lo hace.
    expect(detras).not.toContain("bloques en la jornada");
    expect(detras).not.toContain("lugares, no más");
  });

  it("las cifras que quedan son de Deenex", () => {
    expect(detras).toContain("marcas en la plataforma");
    expect(detras).toContain("años con dueños de cadenas");
  });
});

describe("8 y 9 · las dos tarjetas de riesgo no vuelven", () => {
  const registro = leer("components/sections/RegistroSection.vue");

  it("no dice 'No cuesta nada'", () => {
    expect(registro).not.toContain("No cuesta nada");
  });

  it("no dice 'Sí hay proveedores, no hay ronda'", () => {
    expect(registro).not.toContain("no hay ronda");
  });

  it("no queda el bucle sin datos", () => {
    expect(registro).not.toContain("RIESGO");
  });
});

describe("10 · el otro evento del edificio es un beneficio, no una advertencia", () => {
  const lugar = leer("components/sections/LocationSection.vue");

  it("dice que la acreditacion tambien entra", () => {
    expect(lugar).toContain("Córdoba Corazón de Moda");
    expect(lugar).toContain("acreditación");
  });

  it("no vuelve a leerse como una molestia logistica", () => {
    expect(lugar).not.toContain("conviene salir con tiempo de más");
    expect(lugar).not.toContain("Ese día hay otro evento en el edificio");
  });
});

describe("11 y 12 · las dos secciones borradas no vuelven", () => {
  const home = leer("views/HomeView.vue");

  it("los componentes no existen", () => {
    expect(existsSync(join(SECCIONES, "DespuesSection.vue"))).toBe(false);
    expect(existsSync(join(SECCIONES, "AvisameSection.vue"))).toBe(false);
  });

  it("HomeView no los monta ni los importa", () => {
    expect(home).not.toContain("DespuesSection");
    expect(home).not.toContain("AvisameSection");
  });

  it("no queda el mensaje de WhatsApp que solo usaba #avisame", () => {
    expect(MENSAJES_WA.avisos).toBeUndefined();
  });

  it("la regla del brief que vivia ahi sigue publicada", () => {
    // "No hay streaming: estar en la sala es el valor, y se comunica
    // explicitamente." Era la ultima linea de #despues y ahora es una
    // entrada del FAQ. Si se borra, la pagina deja de decirlo.
    const datos = readFileSync(join(SRC, "data/evento.js"), "utf-8");
    expect(datos).toContain("¿Se transmite en vivo?");
  });
});

describe("13 · el pie", () => {
  const pie = leer("components/layout/Footer.vue");
  const nav = leer("components/layout/Navbar.vue");

  it("no escribe el dia de la semana a mano", () => {
    // Decia "Domingo, 10 a 18": el dia suelto como rotulo, que es justo la
    // forma que salio de la comunicacion el 27/08.
    expect(pie).not.toContain("Domingo,");
  });

  it("el pie y el nav leen la misma lista", () => {
    expect(pie).toContain("NAV_ENLACES");
    expect(nav).toContain("NAV_ENLACES");
    expect(cuantas(pie, "{ id:")).toBe(0);
    expect(cuantas(nav, "{ id:")).toBe(0);
  });

  it("la lista cubre las cinco secciones y todas existen", () => {
    expect(NAV_ENLACES).toHaveLength(5);
    const home = leer("views/HomeView.vue");
    const componentes = {
      "que-es": "QueEsSection",
      jornada: "JornadaSection",
      partners: "BrandsSection",
      lugar: "LocationSection",
      faq: "FAQSection",
    };
    for (const l of NAV_ENLACES) {
      expect(home).toContain(componentes[l.id]);
    }
  });

  it("la fecha sin dia existe en los datos", () => {
    expect(EVENTO.fechaSinDia).toBe("20 de septiembre");
  });
});
