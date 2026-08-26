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

describe("la mesa redonda", () => {
  it("no dice una cantidad de voces que la grilla pueda desmentir", () => {
    // Decía "Cuatro voces del día" —que es la cantidad de TARJETAS de
    // oradores— mientras el renglón de abajo decía "todos los oradores y
    // partners". En escenario hay cinco personas: Alan, el CEO de Bistrosoft,
    // los DOS de Avanzia y el especialista en contenido. Cualquier número
    // escrito a mano ahí se vuelve a romper cuando cambie la grilla.
    const mesa = TEMAS.find((b) => b.tipo === "mesa");
    expect(mesa).toBeTruthy();
    const numeros = /\b(un|una|dos|tres|cuatro|cinco|seis|siete|ocho)\b/i;
    expect(mesa.titulo).not.toMatch(numeros);
    expect(mesa.quien).not.toMatch(numeros);
  });

  it("no cuenta en un renglón lo que en el otro llama «todos»", () => {
    // Ésta era la contradicción exacta: arriba "Cuatro voces del día", abajo
    // "todos los oradores y partners", a tres centímetros. O se cuenta, o se
    // dice "todos"; las dos cosas juntas se desmienten solas.
    const mesa = TEMAS.find((b) => b.tipo === "mesa");
    const cuenta = /\b(dos|tres|cuatro|cinco|seis|siete|ocho)\b/i;
    const todos = /\btodos|todas\b/i;
    const contradice =
      (cuenta.test(mesa.titulo) && todos.test(mesa.quien)) ||
      (todos.test(mesa.titulo) && cuenta.test(mesa.quien));
    expect(contradice).toBe(false);
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

  it('el material de después no se llama igual que la grilla del día', () => {
    const despues = leer("DespuesSection.vue");
    expect(despues).not.toMatch(/titulo:\s*"La grilla/);
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
