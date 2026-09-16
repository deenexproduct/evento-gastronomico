import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { GRILLA, TIPOS_GRILLA, SPEAKERS, enMinutos, duracionDe } from "@/data/evento";

/**
 * La grilla del día: 29 filas escritas a mano desde el run-of-show.
 *
 * Veintinueve filas con dos horas cada una son cincuenta y ocho números
 * cargados a mano cuatro días antes del evento. Lo que se vigila acá no es el
 * contenido —ése lo decide producción y cambia— sino las propiedades que hacen
 * que la grilla no pueda mentir: que encadene, que las duraciones no estén
 * escritas dos veces, y que siga cumpliendo la condición por la que volvió.
 */

const SRC = join(process.cwd(), "src");
const datos = readFileSync(join(SRC, "data/evento.js"), "utf-8");

describe("la grilla del día no se contradice sola", () => {
  it("cada fila arranca donde termina la anterior", () => {
    /*
      Un hueco entre dos filas es media hora del sábado que la página no
      explica, y un solapamiento son dos cosas prometidas a la misma hora en
      una sala de un solo track. Las dos se escriben igual de fácil moviendo
      un bloque y olvidando el vecino, y ninguna de las dos se ve leyendo la
      grilla de arriba abajo: hay que restar para encontrarlas.
    */
    const rotas = [];
    for (let i = 1; i < GRILLA.length; i++) {
      const finAnterior = enMinutos(GRILLA[i - 1].hasta);
      const arranque = enMinutos(GRILLA[i].desde);
      if (arranque !== finAnterior) {
        const signo = arranque > finAnterior ? "hueco" : "solapamiento";
        rotas.push(
          `${signo} de ${Math.abs(arranque - finAnterior)}′ entre ${GRILLA[i - 1].hasta} y ${GRILLA[i].desde}`
        );
      }
    }
    expect(rotas).toEqual([]);
  });

  it("ninguna fila dura menos de cero minutos", () => {
    // Una fila de cero minutos puede existir —la apertura del salón lo fue
    // hasta la planilla del 16/09: un instante, no un bloque—, pero una fila
    // negativa significa horas invertidas.
    const negativas = GRILLA.filter((f) => duracionDe(f) < 0).map(
      (f) => `${f.desde} a ${f.hasta}`
    );
    expect(negativas).toEqual([]);
  });

  it("la duración no está escrita en ningún lado, se calcula", () => {
    /*
      La planilla trae su propia columna DURACIÓN y las 29 coincidían cuando se
      pasó a dato. Precisamente por eso no se copió: un minuto escrito al lado
      de dos horas escritas es un tercer lugar donde el mismo hecho puede
      desincronizarse, y el que mueva una hora no va a acordarse de corregir
      también el minuto.

      Es el mismo error que este repo ya cometió con el conteo de bloques y con
      el horario en tres lugares que no coincidían.
    */
    const bloque = datos.match(/export const GRILLA = \[([\s\S]*?)\n\];/);
    expect(bloque, "no se encontró GRILLA en evento.js").not.toBeNull();

    const conDuracion = bloque[1]
      .split("\n")
      .filter((l) => !/^\s*\/\//.test(l))
      .filter((l) => /\bdur\s*:/.test(l));
    expect(conDuracion, "alguna fila volvió a llevar la duración escrita a mano").toEqual([]);
  });

  it("todos los tipos que usa la grilla están definidos", () => {
    // Un tipo sin definir revienta el componente al leer .peso de undefined:
    // pantalla en blanco, no una fila fea.
    const huerfanos = [...new Set(GRILLA.map((f) => f.tipo))].filter((t) => !TIPOS_GRILLA[t]);
    expect(huerfanos).toEqual([]);
  });

  it("todo tipo definido tiene peso, y el peso es uno de los tres", () => {
    const PESOS = ["contenido", "marco", "servicio"];
    const malos = Object.entries(TIPOS_GRILLA)
      .filter(([, v]) => !PESOS.includes(v.peso))
      .map(([k, v]) => `${k}: «${v.peso}»`);
    expect(malos).toEqual([]);
  });
});

describe("la condición por la que la grilla volvió sigue siendo cierta", () => {
  /*
    ESTO ES UN CANDADO, no una verificación de formato, y es el caso más
    importante del archivo.

    La grilla estuvo afuera de la home durante meses por una razón escrita: con
    cuatro de diez bloques diciendo "orador por confirmar", el que escanea no
    lee diez títulos, lee cuatro huecos y concluye que el evento está a medio
    vender. Volvió porque esa condición se dio vuelta: hoy cada bloque de
    contenido tiene nombre.

    Si mañana se agregan bloques sin orador, la grilla vuelve a ser lo que era
    y hay que sacarla otra vez. Este caso es lo que avisa, en vez de que se
    entere el visitante.
  */
  const deContenido = GRILLA.filter((f) => TIPOS_GRILLA[f.tipo]?.peso === "contenido");

  it("hay bloques de contenido para medir", () => {
    // Sin esto, los dos casos de abajo pasarían por vacío si alguien vaciara
    // la grilla o renombrara el peso.
    expect(deContenido.length).toBeGreaterThan(5);
  });

  it("ningún bloque de contenido se publica sin decir quién lo da", () => {
    // Quién lo da es el orador, o los panelistas en un panel. La única otra
    // salida es `anuncio`, que dice por qué todavía no hay nombre; el caso de
    // abajo impide que se vuelva costumbre.
    const sinNombre = deContenido
      .filter((f) => !String(f.orador || "").trim() && !(f.panelistas || []).length && !f.anuncio)
      .map((f) => `${f.desde} ${f.titulo || "(sin título)"}`);
    expect(
      sinNombre,
      "hay bloques sin orador: es la condición por la que la grilla se sacó de la home la vez anterior"
    ).toEqual([]);
  });

  it("el bloque que se anuncia sin nombre es uno solo", () => {
    /*
      Existe desde el 16/09: una entrevista cuya empresa todavía no autorizó
      por escrito que se la nombre, y Alan eligió publicarla así antes que
      sacarla. Uno solo se lee como una sorpresa; dos o tres, como los huecos
      por los que esta grilla estuvo fuera de la home.

      Y el que se anuncia no lleva orador: las dos cosas juntas son un nombre
      publicado al lado de la frase que dice que todavía no se publica.
    */
    const anunciados = deContenido.filter((f) => f.anuncio);
    expect(anunciados.length, "hay más de un bloque anunciado sin nombre").toBeLessThanOrEqual(1);
    expect(anunciados.filter((f) => f.orador || f.empresa).map((f) => f.desde)).toEqual([]);
  });

  it("los títulos abiertos son minoría", () => {
    /*
      Un título sin cerrar se lee distinto que una persona sin cerrar —uno es
      un programa armándose, el otro un evento a medio vender—, así que se
      permiten. Lo que no se permite es que sean la mayoría: ahí la grilla deja
      de informar y pasa a mostrar todo lo que falta.
    */
    const abiertos = deContenido.filter((f) => !String(f.titulo || "").trim());
    expect(
      abiertos.length,
      `${abiertos.length} de ${deContenido.length} bloques de contenido no tienen título`
    ).toBeLessThan(deContenido.length / 2);
  });
});

describe("la grilla y el resto de la página cuentan el mismo día", () => {
  it("el nombre de cada empresa se escribe igual en toda la página", () => {
    /*
      "I+D IoT Lab" y "I+DIoT Lab" son la misma empresa escrita de dos formas, y
      entraron por dos puertas distintas: el padrón de sponsors y la planilla de
      producción. Cuando las dos llegan a la pantalla, el lector no ve una
      convención tipográfica, ve dos empresas.

      Se compara contra PARTNERS y SPEAKERS, que son las otras dos listas donde
      el mismo nombre se escribe a mano.
    */
    const empresasGrilla = [...new Set(GRILLA.map((f) => f.empresa).filter(Boolean))];

    const normal = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
    const otras = [
      ...(datos.match(/nombre: "([^"]+)"/g) || []),
      ...(datos.match(/empresa: "([^"]+)"/g) || []),
    ].map((l) => l.match(/"([^"]+)"/)[1]);

    const conflictos = [];
    for (const e of empresasGrilla) {
      const parecidas = [...new Set(otras.filter((o) => normal(o) === normal(e) && o !== e))];
      if (parecidas.length) conflictos.push(`«${e}» también se escribe «${parecidas.join("», «")}»`);
    }
    expect(conflictos).toEqual([]);
  });

  it("los nombres de la grilla y de SPEAKERS coinciden exacto o no se parecen en nada", () => {
    /*
      LA GRILLA BUSCA LA FOTO POR NOMBRE. No guarda el archivo: toma el `orador`
      de la fila y lo busca en SPEAKERS, así una cara se carga una sola vez.

      El modo de falla de eso es silencioso, que es lo peor que puede ser: si en
      una lista dice "Martín Zuker" y en la otra "Martin Zuker", no se rompe
      nada —simplemente la grilla muestra las iniciales para siempre y nadie se
      entera de que había una foto cargada—.

      Así que se comparan normalizados, sin acentos ni mayúsculas: dos nombres
      que se parecen sin ser iguales es un error; dos que no se parecen son
      personas distintas y está bien.
    */
    const normal = (s) =>
      String(s)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9]/g, "");

    const enGrilla = [...new Set(GRILLA.map((f) => f.orador).filter(Boolean))];
    expect(enGrilla.length, "la grilla no tiene oradores para comparar").toBeGreaterThan(3);

    const casi = [];
    for (const o of enGrilla) {
      for (const s of SPEAKERS) {
        if (s.nombre !== o && normal(s.nombre) === normal(o)) {
          casi.push(`la grilla dice «${o}» y SPEAKERS dice «${s.nombre}»`);
        }
      }
    }
    expect(casi, "hay nombres que se parecen sin ser iguales: la foto no va a aparecer").toEqual([]);
  });

  it("cada panelista está en SPEAKERS, escrito igual", () => {
    /*
      Más estricto que el caso de arriba, y a propósito. Un orador puede no
      tener tarjeta todavía; un panelista no es texto libre sino una referencia:
      su nombre es lo que busca la cara y lo que da la empresa que se lee bajo
      el título del panel. Uno que no esté en SPEAKERS desaparece del panel sin
      que nada falle.
    */
    const panelistas = [...new Set(GRILLA.flatMap((f) => f.panelistas || []))];
    expect(panelistas.length, "la grilla no tiene panelistas para comparar").toBeGreaterThan(0);

    const nombres = new Set(SPEAKERS.map((s) => s.nombre));
    expect(panelistas.filter((n) => !nombres.has(n))).toEqual([]);
  });

  it("toda foto cargada en SPEAKERS existe como archivo", () => {
    // Un `foto` que apunta a un archivo que no está tampoco rompe nada: el glob
    // no encuentra la clave y queda el hueco con las iniciales, igual que si no
    // se hubiera cargado. Otra falla muda.
    const archivos = readdirSync(join(SRC, "assets/images/speakers"));
    const rotas = SPEAKERS.filter((s) => s.foto && !archivos.includes(s.foto)).map(
      (s) => `${s.nombre} → ${s.foto}`
    );
    expect(rotas, "hay oradores apuntando a un archivo de foto que no existe").toEqual([]);
  });

  it("la jornada no publica una hora que la grilla no tenga", () => {
    /*
      La sección deriva sus tres cifras de GRILLA. Este caso fija que siga
      derivándolas: una hora escrita a mano en el template sobrevive al cambio
      de la grilla, que es exactamente cómo esta página terminó tres veces con
      el mismo horario dicho distinto en tres lugares.
    */
    const seccion = readFileSync(join(SRC, "components/sections/JornadaSection.vue"), "utf-8");
    const plantilla = seccion.split("<script")[0].replace(/<!--[\s\S]*?-->/g, "");

    const horasEscritas = (plantilla.match(/\b\d{1,2}:\d{2}\b/g) || []).filter(
      (h) => !plantilla.includes(`{{ ${h}`)
    );
    expect(horasEscritas, "hay horas escritas a mano en el template de la jornada").toEqual([]);
  });
});
