import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { TEMAS, MENSAJES_WA, PARTNERS } from "@/data/evento";

/**
 * Las contradicciones: cosas que la página afirma en un lado y desmiente en
 * otro, o que promete como novedad después de haberlas entregado.
 *
 * Son distintas de una promesa que no se puede cumplir —eso ya lo cubre
 * promesas.test.js—. Estas se caen leyendo la página de arriba a abajo, y el
 * que las pesca no piensa "se equivocaron", piensa "no leyeron lo que
 * escribieron".
 */

const SRC = join(process.cwd(), "src");
const SECCIONES = join(SRC, "components/sections");

function leer(nombre) {
  return readFileSync(join(SECCIONES, nombre), "utf-8");
}

/**
 * Los comentarios se sacan ARCHIVO POR ARCHIVO, antes de juntar.
 *
 * Limpiarlos después de juntar todo parece igual y no lo es: un `/*` sin
 * cerrar en un archivo se come el texto de los que vienen atrás, y el conteo
 * da de menos sin avisar. Me pasó escribiendo este test: contaba 2 donde hay 4.
 */
function sinComentarios(txt) {
  return txt
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/^\s*\/\/[^\n]*/gm, " ");
}

/** Todo el texto que la página publica, junto. */
function todo() {
  const partes = [];
  const recorrer = (dir) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) recorrer(p);
      else if (/\.(vue|js)$/.test(e.name)) partes.push(sinComentarios(readFileSync(p, "utf-8")));
    }
  };
  recorrer(SRC);
  return partes.join("\n");
}

describe("el panel de cierre", () => {
  // La mesa redonda se elimino en la grilla del 30/08 y la reemplazo un panel
  // de sponsors. Lo que se cuida es lo mismo: que el renglon no prometa una
  // cantidad de voces que despues la grilla desmienta.
  const panel = TEMAS.find((t) => t.tipo === "panel");

  it("existe y cierra el dia", () => {
    expect(panel).toBeTruthy();
    expect(panel.hora).toBe("17:20");
  });

  it("no dice una cantidad de voces que la grilla pueda desmentir", () => {
    expect(panel.quien).not.toMatch(/\b(tres|cuatro|cinco|seis|\d+)\b/i);
    expect(panel.punta).not.toMatch(/\b(tres|cuatro|cinco|seis)\s+(sponsors|empresas|proveedores)\b/i);
  });
});

describe("la reserva", () => {
  it('no afirma "sin formulario" en la misma frase en que pide seis campos', () => {
    // La regla del proyecto —WhatsApp sin formulario— se queda, y el
    // mecanismo no cambió. Lo que no se sostiene es afirmarlo pegado al
    // pedido de seis renglones: seis campos son un formulario, solo que en
    // WhatsApp, y el diferenciador se desarma veinte píxeles más abajo.
    const registro = leer("RegistroSection.vue");
    const parrafos = registro.split(/<\/p>/);
    const conCuenta = parrafos.filter((p) => p.includes("RENGLONES_RESERVA"));
    expect(conCuenta.length).toBeGreaterThan(0);
    for (const p of conCuenta) expect(p).not.toMatch(/sin formulario/i);
  });
});

describe("la grilla", () => {
  it("donde se promete como entregable, se aclara que es la final", () => {
    // La grilla del día está publicada once secciones más arriba, con hora y
    // título en los siete bloques. Prometerla como premio por reservar sin
    // decir "final" es prometer algo que el lector ya tiene.
    expect(MENSAJES_WA.registro).toMatch(/grilla final/i);

    const registro = leer("RegistroSection.vue");
    const promesas = registro.match(/La grilla[^"']*/g) || [];
    for (const p of promesas) expect(p).toMatch(/final/i);
  });

});

describe("el diagnóstico", () => {
  it("nunca está en pasado: el lector todavía no lo pidió", () => {
    // "Tu diagnóstico, si lo pediste" se leía al 74% de la página, cuando el
    // lector no pidió nada ni tiene desde dónde. La FAQ lo explica al 84%.
    expect(todo()).not.toMatch(/si lo pediste/i);
  });
});

describe("el cupo", () => {
  it("no repite más de cuatro veces que es la capacidad del salón", () => {
    // Es la mejor idea de la página: convierte una restricción en una razón.
    // Dicha seis veces deja de sonar a razón y suena a insistencia. Se queda
    // donde gana: el hero, #acceso, el pie del plano y la FAQ.
    const t = todo();
    const patron = /capacidad (real )?(del salón|de la sala)|es el del salón|lo que entra en el salón|limitado es el salón/gi;
    expect((t.match(patron) || []).length).toBeLessThanOrEqual(4);
  });
});

describe("la barra de partners", () => {
  it("solo lleva nombres de empresa", () => {
    // "La mesa de degustación" no es un nombre: en una barra cuyo contrato es
    // "acá van nombres" se lee como una empresa que no existe. Su tarjeta en
    // #partners se queda, que es donde se explica qué es.
    const enBarra = PARTNERS.filter((p) => p.enBarra !== false);
    expect(enBarra.length).toBeLessThan(PARTNERS.length);
    expect(enBarra.map((p) => p.nombre)).not.toContain("La mesa de degustación");
  });

  it("no promete partners que todavía no están cerrados", () => {
    // "+ se suman más" se llevaba el único color de la franja y se escaneaba
    // como un quinto partner. La sección de partners ya dice, con todas las
    // letras, que solo se publica lo cerrado por escrito.
    expect(leer("BarraPartners.vue")).not.toMatch(/se suman más/i);
  });
});

describe("frases largas repetidas entre secciones", () => {
  it("ninguna secuencia de ocho palabras aparece en dos secciones", () => {
    // "decisiones grandes tomadas con información que nadie mira" estaba en
    // #detras y otra vez en la bio de Alan, que es la sección de al lado.
    const porSeccion = new Map();
    for (const f of readdirSync(SECCIONES)) {
      if (!f.endsWith(".vue")) continue;
      const crudo = readFileSync(join(SECCIONES, f), "utf-8");
      // Solo el <template>, y de ahí solo el texto. Mirando el archivo entero
      // esto reporta 49 repeticiones que son todas imports y cuerpos de
      // <script>: mide el código, no lo que la página dice.
      const bloque = crudo.match(/<template>([\s\S]*)<\/template>/);
      if (!bloque) continue;
      const limpio = bloque[1]
        .replace(/<!--[\s\S]*?-->/g, " ")
        // Los textos de lector de pantalla se repiten a propósito: son
        // funcionales, no editoriales.
        .replace(/<span[^>]*sr-only[^>]*>[\s\S]*?<\/span>/g, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/\{\{[^}]*\}\}/g, " ")
        .replace(/\s+/g, " ");
      // Ventanas de ocho palabras, no oraciones enteras: la repetición real
      // que había —"decisiones grandes tomadas con información que nadie
      // mira"— estaba metida adentro de dos oraciones distintas, así que
      // comparando oraciones completas no se veía.
      const palabras = limpio
        .toLowerCase()
        .replace(/[^\wáéíóúñü\s]/g, " ")
        .split(/\s+/)
        .filter(Boolean);
      for (let i = 0; i + 8 <= palabras.length; i++) {
        const clave = palabras.slice(i, i + 8).join(" ");
        if (!porSeccion.has(clave)) porSeccion.set(clave, new Set());
        porSeccion.get(clave).add(f);
      }
    }
    const repetidas = [...porSeccion.entries()]
      .filter(([, secs]) => secs.size > 1)
      .map(([frase, secs]) => `${[...secs].join(" + ")}: ${frase.slice(0, 70)}…`);
    expect(repetidas).toEqual([]);
  });
});

describe("un solo acento", () => {
  // Convivian dos acentos —el magenta #FF0054 del referente y el violeta de
  // Deenex— y ninguno de los dos queria decir "esta es LA accion". Quedo el
  // violeta de marca. Este test evita que el magenta vuelva a entrar.
  it("no queda magenta en el codigo", () => {
    const conMagenta = readdirSync(SECCIONES)
      .filter((n) => n.endsWith(".vue"))
      .filter((n) => /#(FF0054|E00049|FF5C87|D80047)/i.test(sinComentarios(leer(n))));
    expect(conMagenta).toEqual([]);

    const css = readFileSync(join(SRC, "styles/main.css"), "utf-8");
    expect(css).not.toMatch(/#(FF0054|E00049|FF5C87|D80047)/i);
    // Tambien en rgb(): seis overrides del tema claro escribian el magenta
    // como rgba(224, 0, 73, …) y el chequeo por hex no los veia.
    expect(css).not.toMatch(/rgba?\(\s*(255,\s*0,\s*84|224,\s*0,\s*73)/);
  });
});
describe("preguntas que la página abría y no contestaba", () => {
  it("no nombra el estacionamiento, porque no tiene la respuesta", () => {
    // El rótulo de la sección dice "Cómo llegar" y el texto invitaba a la
    // pregunta —"salí con tiempo para llegar Y ESTACIONAR"— con el ítem que
    // la contesta apagado por un flag de pendiente. De los dos caminos, éste
    // es el que no necesita un dato que no tenemos. Si Deenex confirma la
    // playa, vuelve la palabra y vuelve el ítem.
    expect(todo()).not.toMatch(/y estacionar/i);
  });

  it("el FAQ dice si se come, que es la cuenta que hace el que evalúa el domingo", () => {
    // Nueve horas, evento gastronómico, y diez preguntas sin una sola sobre
    // comida. La respuesta se arma entera con datos que ya están publicados
    // en la jornada. Las horas son las de la grilla del 30/08: el coffee de
    // las 15:30 dejó de existir cuando las pausas pasaron a ser ocho de 10\'.
    const faq = todo();
    expect(faq).toMatch(/¿Se come algo durante el día\?/);
    for (const dato of ["9:30", "12:45", "13:45"]) {
      expect(faq).toContain(dato);
    }
  });
});

describe("los beneficios de los partners", () => {
  it("no se prometen en abstracto más de una vez al que asiste", () => {
    // Se prometían tres veces sin decir nunca cuáles: el que evalúa entregar
    // el domingo no puede valorar una palabra que todavía no significa nada.
    // Queda la mención concreta —van por escrito, en un solo material— y las
    // otras dos dejan de repetir la promesa vacía. El ejemplo que haría
    // valer las tres lo tiene que dar Alan.
    const alAsistente = [
    // Eran dos archivos: el segundo era DespuesSection, que Alan saco el
    // 27/08. La promesa vacia que este guarda cuidaba nacia casi siempre ahi.
      readFileSync(join(SECCIONES, "RegistroSection.vue"), "utf-8"),
    ].map(sinComentarios).join("\n");
    expect((alAsistente.match(/beneficios?/gi) || []).length).toBeLessThanOrEqual(1);
  });
});

describe("el día como argumento", () => {
  it("no usa el domingo como precio del evento", () => {
    // Alan: "no me parece que tengamos que hacer tanto énfasis en eso". La
    // distinción: decir QUÉ DÍA es, es un dato que el lector necesita; usar
    // el día como lo que el evento cuesta es hablar de lo que pierde en vez
    // de lo que gana. Estaba en cuatro lugares, y uno era la respuesta a
    // "cuánto sale" en la primera sección de contenido.
    const t = todo();
    expect(t).not.toMatch(/cuesta un domingo/i);
    expect(t).not.toMatch(/te cuesta el domingo/i);
    expect(t).not.toMatch(/respuesta:\s*"Un domingo"/i);
    expect(t).not.toMatch(/Es domingo y trabajo/i);
  });

  it("sigue diciendo qué día es, que es lo que el lector necesita", () => {
    const t = todo();
    expect(t).toMatch(/Domingo 20 de septiembre/i);
  });
});
