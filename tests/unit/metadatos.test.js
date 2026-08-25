import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { EVENTO, CUPO } from "@/data/evento";

/**
 * index.html tiene los datos del evento escritos a mano por triplicado: en las
 * etiquetas Open Graph, en las de Twitter y en el JSON-LD que lee Google. Nada
 * de eso sale de src/data/evento.js, así que si la fecha o el lugar cambian,
 * el buscador y las previsualizaciones de los links siguen mostrando lo viejo
 * sin que nada falle a la vista.
 */
const html = readFileSync(resolve(process.cwd(), "index.html"), "utf8");
const jsonLd = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
const meta = (prop) => {
  const re = new RegExp(`<meta[^>]*(?:property|name)="${prop}"[^>]*content="([^"]*)"`, "s");
  const m = html.match(re) || html.match(new RegExp(`content="([^"]*)"[^>]*(?:property|name)="${prop}"`, "s"));
  return m ? m[1] : null;
};

describe("metadatos del sitio", () => {
  it("el JSON-LD arranca cuando arranca el evento", () => {
    expect(jsonLd.startDate).toBe(EVENTO.fechaISO);
  });

  it("el JSON-LD termina a la hora que dice el horario", () => {
    const cierre = Number(EVENTO.horario.split("a")[1].trim().split(":")[0]);
    expect(new Date(jsonLd.endDate).getUTCHours()).toBe(cierre + 3); // -03 a UTC
    expect(new Date(jsonLd.endDate) > new Date(jsonLd.startDate)).toBe(true);
  });

  it("el lugar y el cupo coinciden con los datos", () => {
    expect(jsonLd.location.name).toBe(EVENTO.venue);
    expect(jsonLd.maximumAttendeeCapacity).toBe(CUPO.total);
  });

  it("el nombre del evento aparece en el título, el JSON-LD y el Open Graph", () => {
    expect(html).toMatch(new RegExp(`<title>[^<]*${EVENTO.nombre}`));
    expect(jsonLd.name).toContain(EVENTO.nombre);
    expect(meta("og:title")).toContain(EVENTO.nombre);
  });

  it("la imagen que se comparte es PNG y absoluta", () => {
    const img = meta("og:image");
    // Los crawlers de redes no renderizan SVG, y una ruta relativa no resuelve.
    expect(img).toMatch(/^https:\/\//);
    expect(img).toMatch(/\.png$/);
    expect(meta("og:image:width")).toBe("1200");
    expect(meta("og:image:height")).toBe("630");
  });

  it("el color de la barra del navegador es el fondo real de la página", () => {
    // Quedó en el violeta del diseño anterior una vez: pinta el cromo del
    // navegador de un color que ya no existe en ningún lado de la página.
    expect(meta("theme-color").toUpperCase()).toBe("#1A1A1A");
  });

  it("no promete nada que el evento no vaya a cumplir", () => {
    const textos = [
      meta("description"),
      meta("og:description"),
      meta("twitter:description"),
      jsonLd.description,
    ].join(" ");
    // Reglas del brief.
    expect(textos).not.toMatch(/stream|grabaci|delivery/i);
    // "Gratis" no puede abrir ninguna de las descripciones.
    [meta("og:description"), meta("twitter:description")].forEach((t) =>
      expect(t.slice(0, 40)).not.toMatch(/gratis|gratuit/i)
    );
  });

  it("la fuente se pide desde el head, no desde el CSS", () => {
    // Un @import dentro de la hoja encadena dos conexiones más antes de que
    // se pueda dibujar el primer texto.
    expect(html).toContain('rel="preconnect"');
    expect(html).toMatch(/rel="stylesheet"[^>]*fonts\.googleapis/);
    const css = readFileSync(resolve(process.cwd(), "src/styles/main.css"), "utf8");
    expect(css).not.toMatch(/@import\s+url\(['"]?https:\/\/fonts/);
  });
});
