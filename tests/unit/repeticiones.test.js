import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

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
  // Los otros tres de este bloque guardaban #avisame, que Alan saco el
  // 27/08. El guarda de que no vuelva esta en tanda-27-08.test.js.
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
});

describe("los números escritos a mano no sobreviven a un cambio de contenido", () => {
  /*
    El titular del bloque de resúmenes decía "Cinco respuestas" mientras las
    tarjetas de abajo se numeraban 1/4 y 2/4: el número estaba escrito en la
    prosa y quedó viejo al eliminar la vista del organizador. Se leía el error
    y el dato correcto en la misma pantalla.

    Es el mismo defecto que esta página ya tuvo con el horario en tres lugares
    que no coincidían, con la paleta vieja en un test y con un teléfono dos
    números atrás. Este caso lo fija donde puede fijarse: que la cantidad que
    anuncia el titular sea la que hay.
  */
  it("el titular del bloque de resúmenes cuenta los bloques que existen", () => {
    const fuente = readFileSync(
      join(process.cwd(), "src/components/sections/BloquesResumen.vue"),
      "utf-8"
    );

    // Si el titular vuelve a llevar el número escrito, esto lo encuentra.
    const enLetras = /\b(una|dos|tres|cuatro|cinco|seis|siete|ocho)\s+respuestas/i;
    const escritoAMano = fuente
      .split("\n")
      .filter((l) => !/^\s*(\/\/|\*|<!--|Decía)/.test(l.trim()))
      .filter((l) => enLetras.test(l) && !l.includes("{{"));

    expect(
      escritoAMano,
      "el titular volvió a llevar la cantidad escrita en vez de derivarla de BLOQUES"
    ).toEqual([]);

    // Y que efectivamente la derive.
    expect(fuente).toContain("BLOQUES.length");
  });
});

describe("la página no vuelve a prometer una grilla que no publica", () => {
  /*
    El 03/09 la jornada dejó de mostrar el cronograma hora por hora y pasó a
    decir QUÉ hay ese día. La palabra sobrevivió igual en tres textos visibles
    —"la grilla termina 18:00", "se anuncian con la grilla final" y "La grilla
    final, antes que el resto"— porque el refactor cambió una sección y esos
    tres vivían en otras.

    Nombrar una grilla que el lector no puede ver lo manda a buscar algo que no
    está, y en el caso de RegistroSection se la promete como parte de lo que se
    lleva por reservar.

    Los comentarios sí pueden usar la palabra: explican la decisión. Lo que se
    vigila son las cadenas de texto que llegan a la pantalla.
  */
  /*
    SE RECORRE src/ ENTERO, no una lista escrita a mano.

    La primera versión listaba cinco archivos y pasaba en verde con la palabra
    puesta en un sexto: la mitad del texto del sitio vive en data/evento.js
    —las respuestas del FAQ, los bordes del día— y ese no estaba en la lista.
    Lo encontró una verificación contra producción, no el test que existía para
    encontrarlo. Una lista a mano de dónde mirar es el mismo error que un
    número escrito a mano: envejece sola y no avisa.
  */
  const archivosDeSrc = (dir = SRC, acum = []) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const ruta = join(dir, e.name);
      if (e.isDirectory()) archivosDeSrc(ruta, acum);
      else if (/\.(vue|js)$/.test(e.name)) acum.push(ruta);
    }
    return acum;
  };

  it("no queda la palabra en ningún texto que se muestre", () => {
    const culpables = [];
    const ARCHIVOS = archivosDeSrc();

    for (const a of ARCHIVOS) {
      const fuente = readFileSync(a, "utf-8");

      // Se recorre el archivo sin sus comentarios: los de bloque —/* */ y
      // <!-- -->— y los de línea. Lo que queda es marcado y código, o sea lo
      // que puede llegar a la pantalla.
      const sinComentarios = fuente
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/^\s*\/\/.*$/gm, "");

      for (const linea of sinComentarios.split("\n")) {
        if (/grilla/i.test(linea) && !/grid|grilla de 12/i.test(linea)) {
          culpables.push(`${a.replace(SRC, "src")}: ${linea.trim().slice(0, 70)}`);
        }
      }
    }

    // Si el recorrido dejara de encontrar archivos, esto pasaría sin mirar nada.
    expect(ARCHIVOS.length, "no se encontró ningún archivo en src/").toBeGreaterThan(20);
    expect(culpables).toEqual([]);
  });
});
