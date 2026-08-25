import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { EVENTO } from "@/data/evento";

/**
 * El .ics ya salió roto una vez de cuatro maneras distintas, y ninguna se ve
 * mirando la página: el archivo se descarga igual y falla recién dentro del
 * calendario del que se anotó. Por eso se verifica el texto generado.
 *
 * El composable arma el archivo dentro de un Blob y lo entrega como object
 * URL, así que se interceptan esas dos piezas para leer el contenido.
 */
async function generarIcs() {
  let capturado = "";

  class BlobFalso {
    constructor(partes) {
      this.partes = partes;
    }
  }
  vi.stubGlobal("Blob", BlobFalso);

  // Se parchean solo los dos métodos estáticos: reemplazar URL entero rompe
  // el constructor, que este mismo test necesita más abajo.
  if (!URL.createObjectURL) URL.createObjectURL = () => "";
  if (!URL.revokeObjectURL) URL.revokeObjectURL = () => {};
  vi.spyOn(URL, "createObjectURL").mockImplementation((blob) => {
    capturado = blob.partes.join("");
    return "blob:falso";
  });
  vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => {});

  const { useCalendario } = await import("@/composables/useCalendario");
  const { urlIcs, google } = useCalendario();
  urlIcs.value; // leerlo dispara la generación
  return { ics: capturado, google: google.value };
}

/** Deshace el plegado como lo hace un cliente de calendario. */
function desplegar(ics) {
  return ics.replace(/\r\n /g, "");
}

describe("archivo .ics", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("el evento dura lo que dice el horario, sin importar el huso del navegador", async () => {
    const { ics } = await generarIcs();
    const aFecha = (s) =>
      new Date(
        `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}T${s.slice(9, 11)}:${s.slice(
          11,
          13
        )}:${s.slice(13, 15)}Z`
      );
    const inicio = aFecha(ics.match(/DTSTART:(\S+)/)[1]);
    const fin = aFecha(ics.match(/DTEND:(\S+)/)[1]);
    // 9:00 a 18:00 son nueve horas. Calculado con setHours, una máquina fuera
    // de -03 daba otra duración —o el fin antes del inicio.
    expect((fin - inicio) / 3600000).toBe(9);
    expect(fin > inicio).toBe(true);
  });

  it("escapa las comas, que si no cortan el lugar en el calendario", async () => {
    const { ics } = await generarIcs();
    // "Hotel Quinto Centenario, Duarte Quirós 1300, Córdoba" tiene comas que
    // sin escapar se leen como separador de valores y el lugar llega partido.
    expect(desplegar(ics)).toMatch(/LOCATION:.*\\,/);
    // Ninguna coma del archivo puede quedar sin su barra delante.
    expect(/[^\\],/.test(ics)).toBe(false);
  });

  it("ninguna línea supera los 75 octetos que pide la RFC 5545", async () => {
    const { ics } = await generarIcs();
    const largas = ics.split("\r\n").filter((l) => new TextEncoder().encode(l).length > 75);
    expect(largas).toEqual([]);
  });

  it("al desplegarlo, cada línea vuelve a ser una propiedad", async () => {
    const { ics } = await generarIcs();
    expect(ics).toContain("\r\n "); // hubo plegado
    desplegar(ics)
      .split("\r\n")
      .forEach((l) => expect(l).toMatch(/^[A-Z-]+[:;]/));
  });

  it("tiene la estructura mínima que un calendario acepta", async () => {
    const { ics } = await generarIcs();
    [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      "UID:",
      "DTSTAMP:",
      "END:VEVENT",
      "END:VCALENDAR",
    ].forEach((marca) => expect(ics).toContain(marca));
    // Los dos avisos: la semana previa y la mañana del evento.
    expect((ics.match(/BEGIN:VALARM/g) || []).length).toBe(2);
  });

  it("el enlace de Google lleva el mismo rango que el archivo", async () => {
    const { ics, google } = await generarIcs();
    const rango = new URL(google).searchParams.get("dates");
    expect(rango).toBe(`${ics.match(/DTSTART:(\S+)/)[1]}/${ics.match(/DTEND:(\S+)/)[1]}`);
    expect(google).toContain(encodeURIComponent(EVENTO.nombre));
  });
});
