import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { EVENTO, BLOQUES, MENSAJES_WA, TEMAS, TIPOS_BLOQUE, PAUSAS } from "@/data/evento";

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

  it("el pie no repite el menu de la cabecera", () => {
    // Antes los dos leian BLOQUES para no derivar. Desde el 30/08 el pie no
    // lleva menu: la cabecera es fija y acompania todo el scroll, asi que
    // repetir las cinco entradas abajo solo alargaba el pie.
    expect(nav).toContain("BLOQUES");
    expect(pie).not.toContain("BLOQUES");
    expect(cuantas(pie, "{ ruta:")).toBe(0);
  });

  it("los cinco bloques tienen ruta en el router y una vista que la sirve", () => {
    // El test viejo pedia que las cinco secciones estuvieran en la home.
    // Desde que cada bloque es su propia vista, la propiedad equivalente —y
    // mas fuerte— es que ninguna ruta de la cabecera quede sin destino: un
    // bloque sin vista es un 404 servido como si fuera la home.
    expect(BLOQUES).toHaveLength(5);
    const router = leer("router/index.js");
    const vistas = {
      "/que-es": "QueEsView",
      "/beneficios": "BeneficiosView",
      "/deadline": "DeadlineView",
      "/participan": "ParticipanView",
      "/organiza": "OrganizaView",
    };
    for (const b of BLOQUES) {
      expect(router).toContain(`path: "${b.ruta}"`);
      expect(router).toContain(vistas[b.ruta]);
      expect(() => leer(`views/${vistas[b.ruta]}.vue`)).not.toThrow();
    }
  });

  it("la home resume el detalle y no lo reabsorbe entero", () => {
    const home = leer("views/HomeView.vue");
    // La home ofrece los cinco bloques como tarjetas; no monta sus secciones
    // en línea. Las dos excepciones son deliberadas: las preguntas cierran el
    // recorrido principal, y el bloque del lugar es lo que se busca cuando ya
    // se decidió ir. El resto sigue detrás de su tarjeta.
    for (const s of ["QueEsSection", "ElLunesSection", "PruebaSection", "BrandsSection"]) {
      expect(home).not.toContain(s);
    }
    expect(home).toContain("BloquesResumen");
  });

  it("la fecha sin dia existe en los datos", () => {
    expect(EVENTO.fechaSinDia).toBe("20 de septiembre");
  });
});

describe("6 · la agenda", () => {
  it("son once bloques y en orden de reloj", () => {
    // Eran siete hasta la grilla del 30/08, que la reescribio entera: diez
    // bloques con orador mas el networking del mediodia, que ahora es un
    // bloque propio y no una pausa.
    expect(TEMAS).toHaveLength(11);
    const minutos = TEMAS.map((t) => {
      const [h, m] = t.hora.split(":").map(Number);
      return h * 60 + m;
    });
    expect(minutos).toEqual([...minutos].sort((a, b) => a - b));
  });

  it("Alan baja de tres bloques a dos", () => {
    const suyos = TEMAS.filter((t) => t.quien.includes("Alan Tapia"));
    expect(suyos).toHaveLength(2);
  });

  it("el bloque de ecosistema salio", () => {
    expect(TEMAS.find((t) => t.id === "ecosistema")).toBeUndefined();
  });

  it("entra el bloque de IA, corto a proposito", () => {
    // La grilla del 30/08 lo movio de 13:45 a 16:00 y lo llevo a 30 minutos.
    const ia = TEMAS.find((t) => t.id === "ia");
    expect(ia).toBeDefined();
    expect(ia.dur).toBe(30);
    expect(ia.hora).toBe("16:00");
  });

  it("el bloque de la sala cambia de formato y no de tema", () => {
    const b = TEMAS.find((t) => t.id === "benchmark");
    expect(b.tipo).toBe("interactivo");
    expect(TIPOS_BLOQUE.interactivo).toBeDefined();
  });


  it("todo bloque declara un tipo que existe", () => {
    for (const t of TEMAS) expect(TIPOS_BLOQUE[t.tipo]).toBeDefined();
  });

  it("ningun bloque se pisa con el siguiente", () => {
    const min = (h) => {
      const [a, b] = h.split(":").map(Number);
      return a * 60 + b;
    };
    for (let i = 0; i < TEMAS.length - 1; i++) {
      expect(min(TEMAS[i].hora) + TEMAS[i].dur).toBeLessThanOrEqual(min(TEMAS[i + 1].hora));
    }
  });

  it("cada hueco de media hora o mas tiene nombre propio", () => {
    // Los que no figuran en PAUSAS caen al rotulo generico "Degustacion".
    // Media hora sin nombre se lee como un agujero en la agenda.
    const min = (h) => {
      const [a, b] = h.split(":").map(Number);
      return a * 60 + b;
    };
    for (let i = 0; i < TEMAS.length - 1; i++) {
      const finBloque = min(TEMAS[i].hora) + TEMAS[i].dur;
      const hueco = min(TEMAS[i + 1].hora) - finBloque;
      if (hueco >= 30) {
        const hh = String(Math.floor(finBloque / 60)).padStart(2, "0");
        const mm = String(finBloque % 60).padStart(2, "0");
        expect(PAUSAS[`${hh}:${mm}`]).toBeDefined();
      }
    }
  });
});

describe("evento.js no vuelve a tener cuatro agendas", () => {
  it("no quedan exports que no importa nadie", () => {
    // Habia ocho, y TRES de ellos eran agendas viejas que contradecian a
    // TEMAS: una decia "Puertas 09:00" y "acreditacion con QR", dos cosas
    // que la pagina dejo de decir. Editar la equivocada no fallaba: no
    // pasaba nada, que es peor.
    const datos = readFileSync(join(SRC, "data/evento.js"), "utf-8");
    for (const muerto of ["TRAMOS", "BENTO", "VOLVES_CON", "SPEAKERS",
                          "AGENDA_PUBLICA", "AGENDA", "AGENDA_BLOQUES", "PUBLICO"]) {
      expect(datos).not.toContain(`export const ${muerto} `);
    }
  });
});

describe("10 · el evento madre se cuenta igual en toda la pagina", () => {
  const datos = readFileSync(join(SRC, "data/evento.js"), "utf-8");
  const seccion = readFileSync(join(SECCIONES, "LocationSection.vue"), "utf-8");
  const todo = datos + seccion;

  it("si se vende como acceso incluido, no se describe tambien como molestia", () => {
    // Quedo contado de las dos formas a la vez: #lugar decia que la
    // acreditacion tambien entra, y el FAQ que el edificio va a estar movido
    // y conviene salir con tiempo. Es el mismo hecho con dos animos opuestos,
    // y el lector lee los dos.
    const comoAcceso = /también (entra|te habilita)/.test(todo);
    expect(comoAcceso).toBe(true);
    expect(todo).not.toContain("conviene salir con tiempo");
    expect(todo).not.toContain("va a estar movido");
  });

  it("se lo nombra en los dos lugares con el mismo nombre", () => {
    expect((todo.match(/Córdoba Corazón de Moda/g) || []).length).toBeGreaterThanOrEqual(2);
  });
});
