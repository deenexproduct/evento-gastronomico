import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

/**
 * El guardado parcial existe para no perder el contacto del que abandona en el
 * paso 2. Se dispara en cada "Continuar", así que ir y volver entre pasos
 * mandaba el mismo contacto una y otra vez: el CRM se llena de duplicados de
 * la misma persona y las métricas de captación quedan infladas.
 *
 * El endpoint se inyecta por variable de entorno, así que hay que stubearla
 * antes de importar el composable.
 */
async function cargarRegistro() {
  vi.stubEnv("VITE_REGISTRO_ENDPOINT", "https://ejemplo.test/registro");
  vi.resetModules();
  const { useRegistro } = await import("@/composables/useRegistro");
  return useRegistro();
}

/** Cuenta los POST con estado "parcial". */
function contarParciales(fetchMock) {
  return fetchMock.mock.calls.filter((c) => JSON.parse(c[1].body).estado === "parcial").length;
}

describe("guardado parcial del paso 1", () => {
  let fetchMock;

  beforeEach(() => {
    fetchMock = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({}) }));
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("guarda el contacto al pasar al paso 2", async () => {
    const r = await cargarRegistro();
    r.form.nombre = "Alan Tapia";
    r.form.email = "alan@deenex.tech";
    r.siguiente();
    await vi.waitFor(() => expect(contarParciales(fetchMock)).toBe(1));
  });

  it("ir y volver no manda el mismo contacto dos veces", async () => {
    const r = await cargarRegistro();
    r.form.nombre = "Alan Tapia";
    r.form.email = "alan@deenex.tech";

    r.siguiente();
    await vi.waitFor(() => expect(contarParciales(fetchMock)).toBe(1));

    r.volver();
    r.siguiente();
    r.volver();
    r.siguiente();
    await new Promise((s) => setTimeout(s, 20));

    expect(contarParciales(fetchMock)).toBe(1);
  });

  it("si corrige el mail, el contacto corregido sí se manda", async () => {
    const r = await cargarRegistro();
    r.form.nombre = "Alan Tapia";
    r.form.email = "alan@deenex.tech";
    r.siguiente();
    await vi.waitFor(() => expect(contarParciales(fetchMock)).toBe(1));

    r.volver();
    r.form.email = "alan@otrodominio.com";
    r.siguiente();
    await vi.waitFor(() => expect(contarParciales(fetchMock)).toBe(2));
  });

  it("si el guardado falla, se reintenta en el próximo intento", async () => {
    fetchMock.mockRejectedValueOnce(new Error("red caída"));
    const r = await cargarRegistro();
    r.form.nombre = "Alan Tapia";
    r.form.email = "alan@deenex.tech";

    r.siguiente();
    await new Promise((s) => setTimeout(s, 20));

    r.volver();
    r.siguiente();
    // El primero se cayó: la huella no puede quedar marcada como guardada.
    await vi.waitFor(() => expect(contarParciales(fetchMock)).toBe(2));
  });
});
