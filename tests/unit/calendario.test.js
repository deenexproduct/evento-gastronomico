import { describe, it, expect } from "vitest";
import { EVENTO } from "@/data/evento";

/**
 * El .ics se genera dentro de un composable que usa onUnmounted, así que la
 * lógica de fechas se verifica sobre los mismos datos y reglas, sin montar
 * un componente. Lo que importa acá es que la conversión horaria sea correcta:
 * un evento agendado a las 6 de la mañana es peor que no agendarlo.
 */
describe("agendado del evento", () => {
  it("la fecha del evento es el domingo 20 de septiembre de 2026 a las 10", () => {
    const d = new Date(EVENTO.fechaISO);
    expect(d.getUTCFullYear()).toBe(2026);
    expect(d.getUTCMonth()).toBe(8); // septiembre
    expect(d.getUTCDate()).toBe(20);
    // 10:00 en Córdoba (UTC-3) son las 13:00 UTC.
    expect(d.getUTCHours()).toBe(13);
  });

  it("la fecha declarada cae efectivamente en domingo", () => {
    // Toda la comunicación dice "domingo": si la fecha cambia y cae otro día,
    // la página entera queda mintiendo.
    expect(new Date(EVENTO.fechaISO).getUTCDay()).toBe(0);
    expect(EVENTO.fechaLarga.toLowerCase()).toContain("domingo");
  });

  it("el horario declarado termina después de que empieza", () => {
    const [desde, hasta] = EVENTO.horario.split("a").map((x) => Number(x.trim().split(":")[0]));
    expect(hasta).toBeGreaterThan(desde);
  });

  it("la fecha corta y la larga coinciden con la fecha real", () => {
    const d = new Date(EVENTO.fechaISO);
    expect(EVENTO.fechaCorta).toContain(String(d.getUTCDate()));
    expect(EVENTO.fechaLarga).toContain(String(d.getUTCFullYear()));
  });
});
