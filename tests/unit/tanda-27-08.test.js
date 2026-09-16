import { describe, it, expect } from "vitest";
import { existsSync, readFileSync, readdirSync } from "node:fs";
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

  it("habla de la industria gastronómica y de tecnología que ya funciona, no de tecnología como rubro", () => {
    /*
      ESTE CASO CAMBIÓ DE CONTENIDO EL 16/09, y la decisión que guardaba antes
      quedó superada por otra.

      El 27/08 Alan pidió que la sección no encabezara con tecnología: "todo es
      tecnología, y el objetivo es que se llevan tendencias, innovación, y todo
      apuntado a mercado gastronómico para cadenas". El caso exigía las
      palabras "tendencias" y "mercado gastronómico".

      El 16/09 el enfoque se dio vuelta desde arriba: la bajada del hero pasó a
      "El único evento de tecnología de la industria gastronómica" —texto de
      Alan— y esta sección, a "qué tecnología ya está funcionando, contada
      por los que la están usando" —texto de Joaquín Lombardi—. Exigir
      "tendencias" acá habría sido pelearse con las dos.

      Lo que sobrevive del pedido original es su fondo, y eso es lo que se
      vigila: que la sección hable DE LA INDUSTRIA GASTRONÓMICA y de tecnología
      que ya está en uso, no de "tecnología" como categoría suelta, que es lo
      que aquella frase de Alan rechazaba.
    */
    expect(queEs).toContain("industria gastronómica");
    expect(queEs).toContain("ya está funcionando");
    // La formulación que se rechazó el 27/08 sigue sin volver.
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

/*
  El caso 7 —"quien organiza habla del organizador"— se fue con la sección que
  vigilaba. PruebaSection y la vista /organiza se eliminaron: el evento dejó de
  presentar a la empresa que lo arma, así que ya no hay cifras del organizador
  que puedan volver a contar el evento.
*/

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
  const lugar = leer("components/sections/DondeSection.vue");

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

  it("cada bloque tiene ruta en el router y una vista que la sirve", () => {
    // El test viejo pedia que las secciones estuvieran en la home. Desde que
    // cada bloque es su propia vista, la propiedad equivalente —y mas fuerte—
    // es que ninguna ruta de la cabecera quede sin destino: un bloque sin
    // vista es un 404 servido como si fuera la home.
    //
    // No se fija el número de bloques acá: eran cinco hasta que se eliminó
    // /organiza, y volver a escribir "cuatro" es fijar otra vez un dato que
    // vive en evento.js. Lo que importa es que TODOS tengan destino, sean los
    // que sean; el mapa de vistas de abajo es lo que falla si entra un bloque
    // nuevo sin vista.
    expect(BLOQUES.length).toBeGreaterThan(2);
    const router = leer("router/index.js");
    const vistas = {
      "/que-es": "QueEsView",
      "/beneficios": "BeneficiosView",
      "/deadline": "DeadlineView",
      "/participan": "ParticipanView",
    };
    for (const b of BLOQUES) {
      expect(router).toContain(`path: "${b.ruta}"`);
      expect(router).toContain(vistas[b.ruta]);
      expect(() => leer(`views/${vistas[b.ruta]}.vue`)).not.toThrow();
    }
  });

  it("la home resume el detalle y no lo reabsorbe entero", () => {
    const home = leer("views/HomeView.vue");
    // La home ofrece los bloques como tarjetas y no monta sus secciones
    // en línea, salvo las que el recorrido principal necesita: qué es —el que
    // llega de un anuncio tiene que poder entenderlo sin abrir nada—, el lugar
    // y las preguntas. Lo que sigue detrás de su tarjeta es el detalle, no la
    // propuesta.
    for (const s of ["ElLunesSection", "BrandsSection"]) {
      expect(home).not.toContain(s);
    }
    expect(home).toContain("BloquesResumen");
  });

  it("la fecha sin dia existe en los datos y coincide con la fecha real", () => {
    // Se escribía a mano y quedó desfasada cuando el evento pasó al sábado 19.
    // Ahora se verifica contra fechaISO, que es el dato del que sale todo lo
    // demás: si se mueve la fecha, este test avisa antes que la página.
    const d = new Date(EVENTO.fechaISO);
    expect(EVENTO.fechaSinDia).toBe(`${d.getUTCDate()} de septiembre`);
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
    /*
      Habia ocho, y TRES de ellos eran agendas viejas que contradecian a
      TEMAS: una decia "Puertas 09:00" y "acreditacion con QR", dos cosas que
      la pagina dejo de decir. Editar la equivocada no fallaba: no pasaba nada,
      que es peor.

      ESTO ERA UNA LISTA NEGRA DE NOMBRES y envejecio mal. Entre los ocho
      estaba SPEAKERS, y el dia que hizo falta una lista de oradores DE VERDAD
      —importada, usada y con su seccion— el caso fallo por el nombre, no por
      el defecto. Un nombre no es el problema: el problema es un export que no
      lee nadie.

      Ahora se comprueba la propiedad directamente: todo lo que evento.js
      exporta tiene que aparecer en un import de src/. Asi no hay lista que
      mantener, y cubre tambien los exports que nazcan manana.
    */
    const datos = readFileSync(join(SRC, "data/evento.js"), "utf-8");
    const exportados = [...datos.matchAll(/export (?:const|function) ([A-Za-z_$][\w$]*)/g)].map(
      (m) => m[1]
    );
    expect(exportados.length, "no se encontro ningun export en evento.js").toBeGreaterThan(10);

    // Se mira src/ y tests/, y se excluye el propio evento.js: hay funciones
    // que se usan ahi adentro —linkWaReserva llama a mensajeReserva— y
    // constantes que solo consumen los tests para validar. Ninguna de las dos
    // cosas es un export muerto.
    const leerTodo = (raiz, saltar) => {
      const acum = [];
      const rec = (dir) => {
        for (const e of readdirSync(dir, { withFileTypes: true })) {
          const ruta = join(dir, e.name);
          if (e.isDirectory()) rec(ruta);
          else if (/[.](vue|js)$/.test(e.name) && !(saltar && ruta.endsWith(saltar))) {
            acum.push(readFileSync(ruta, "utf-8"));
          }
        }
      };
      rec(raiz);
      return acum.join(" ");
    };
    const todo = leerTodo(SRC, join("data", "evento.js")) + " " + leerTodo("tests");

    /*
      SIN REGEX, a proposito. La primera version buscaba cada nombre con un
      new RegExp y una frontera de palabra escrita dentro de un template
      literal, y no matcheaba ninguno: ahi esa secuencia es el caracter
      BACKSPACE y no la frontera de la expresion regular. Los veintiseis
      exports salieron huerfanos de una, que es como se ve siempre este error:
      el caso pasa o falla en bloque, porque la expresion no matchea nunca. Es
      la tercera vez que muerde en este repo.

      Partir por lo que no es caracter de identificador da lo mismo y no tiene
      escapes que puedan salir mal.
    */
    const palabras = new Set(todo.split(/[^A-Za-z0-9_$]+/));
    const huerfanos = exportados.filter((n) => !palabras.has(n));
    expect(huerfanos, "evento.js exporta cosas que no importa nadie").toEqual([]);
  });
});

describe("10 · el evento madre se cuenta igual en toda la pagina", () => {
  const datos = readFileSync(join(SRC, "data/evento.js"), "utf-8");
  const seccion = readFileSync(join(SECCIONES, "DondeSection.vue"), "utf-8");
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
