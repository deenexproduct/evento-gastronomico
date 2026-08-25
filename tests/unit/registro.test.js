import { describe, it, expect, beforeEach } from "vitest";
import { useRegistro } from "@/composables/useRegistro";

/** Completa el paso 1 con datos válidos. */
function cargarPaso1(r, { nombre = "Alan Tapia", email = "alan@deenex.tech" } = {}) {
  r.form.nombre = nombre;
  r.form.email = email;
}

describe("registro en dos pasos", () => {
  let r;
  beforeEach(() => {
    r = useRegistro();
    r.reiniciar();
  });

  it("arranca en el paso 1", () => {
    expect(r.paso.value).toBe(1);
  });

  it("el paso 1 solo pide nombre y mail", () => {
    // La caída de conversión más fuerte está al pasar de 3 a 4 campos.
    cargarPaso1(r);
    expect(r.siguiente()).toBe(true);
    expect(r.paso.value).toBe(2);
  });

  it("no avanza con el paso 1 vacío", () => {
    expect(r.siguiente()).toBe(false);
    expect(r.paso.value).toBe(1);
    expect(r.errores.nombre).toBeTruthy();
    expect(r.errores.email).toBeTruthy();
  });

  it("rechaza un mail mal formado", () => {
    cargarPaso1(r, { email: "noesunmail" });
    expect(r.siguiente()).toBe(false);
    expect(r.errores.email).toBeTruthy();
  });

  it("rechaza un nombre demasiado corto", () => {
    cargarPaso1(r, { nombre: "Al" });
    expect(r.siguiente()).toBe(false);
    expect(r.errores.nombre).toBeTruthy();
  });

  it("volver no borra lo cargado", () => {
    cargarPaso1(r);
    r.siguiente();
    r.volver();
    expect(r.paso.value).toBe(1);
    expect(r.form.nombre).toBe("Alan Tapia");
    expect(r.form.email).toBe("alan@deenex.tech");
  });

  it("no envía el paso 2 incompleto", async () => {
    cargarPaso1(r);
    r.siguiente();
    expect(await r.enviar()).toBe(false);
    expect(r.errores.marca).toBeTruthy();
    expect(r.errores.rol).toBeTruthy();
    expect(r.errores.locales).toBeTruthy();
    expect(r.errores.whatsapp).toBeTruthy();
  });

  it("exige la confirmación de asistencia", async () => {
    cargarPaso1(r);
    r.siguiente();
    Object.assign(r.form, {
      marca: "Cadena de prueba",
      rol: "Dueño / Dueña",
      locales: "2 a 5 locales",
      whatsapp: "3510000000",
      acepta: false,
    });
    expect(await r.enviar()).toBe(false);
    expect(r.errores.acepta).toBeTruthy();
  });

  it("reiniciar deja el formulario limpio y en el paso 1", () => {
    cargarPaso1(r);
    r.siguiente();
    r.reiniciar();
    expect(r.paso.value).toBe(1);
    expect(r.form.nombre).toBe("");
    expect(r.form.email).toBe("");
    expect(Object.keys(r.errores)).toHaveLength(0);
  });
});
