import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

/**
 * Coherencia cuando la sala se llena.
 *
 * El cupo agotado es un estado que nadie ve durante el desarrollo: aparece una
 * sola vez, el día que se llena, y ahí ya no hay tiempo de arreglarlo. Pasó
 * que cinco piezas avisaran "cupo completo" mientras otras cuatro seguían
 * ofreciendo un lugar, con botón incluido.
 *
 * Se verifica de forma estática: todo componente que dibuje un llamado a
 * reservar tiene que estar mirando `agotado`. Un componente que no lo importa
 * no puede reaccionar, por más que el texto de hoy esté bien.
 */
const RAIZ = resolve(process.cwd(), "src/components");

function archivosVue(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? archivosVue(join(dir, e.name)) : e.name.endsWith(".vue") ? [join(dir, e.name)] : []
  );
}

/** Textos que le ofrecen un lugar a alguien. */
const OFRECE_LUGAR = /reservar mi lugar|quiero mi lugar|reservá tu lugar|asegurá mi lugar|quiero estar en la sala/i;

describe("estado de sala llena", () => {
  const componentes = archivosVue(RAIZ).map((ruta) => ({
    ruta: ruta.slice(ruta.indexOf("src")),
    fuente: readFileSync(ruta, "utf8"),
  }));

  it("hay componentes que ofrecen lugar (si no, el test no prueba nada)", () => {
    expect(componentes.filter((c) => OFRECE_LUGAR.test(c.fuente)).length).toBeGreaterThan(2);
  });

  // Buscar la palabra suelta no alcanza: aparece en comentarios y en variables
  // locales. Tiene que salir de useCupo, que es la única fuente del estado.
  const CONSUME_CUPO = /const\s*\{[^}]*\bagotado\b[^}]*\}\s*=\s*useCupo\(\)/;

  it("todo componente que ofrece un lugar mira el cupo", () => {
    const ciegos = componentes
      .filter((c) => OFRECE_LUGAR.test(c.fuente))
      .filter((c) => !CONSUME_CUPO.test(c.fuente))
      .map((c) => c.ruta);
    expect(ciegos).toEqual([]);
  });

  it("ningún componente afirma 'registro abierto' sin condicionarlo", () => {
    const duros = componentes
      .filter((c) => /registro abierto/i.test(c.fuente))
      .filter((c) => !CONSUME_CUPO.test(c.fuente))
      .map((c) => c.ruta);
    expect(duros).toEqual([]);
  });
});
