import { describe, it, expect } from "vitest";
import { EVENTO, DOMINGO } from "@/data/evento";

/**
 * El .ics se genera dentro de un composable que usa onUnmounted, así que la
 * lógica de fechas se verifica sobre los mismos datos y reglas, sin montar
 * un componente. Lo que importa acá es que la conversión horaria sea correcta:
 * un evento agendado a las 6 de la mañana es peor que no agendarlo.
 */
describe("agendado del evento", () => {
  it("la fecha del evento es el sábado 19 de septiembre de 2026 a las 10", () => {
    // Era domingo 20 hasta el 31/08: la reunión con Gastón Santana partió el
    // fin de semana en dos y GastroTech quedó el sábado.
    const d = new Date(EVENTO.fechaISO);
    expect(d.getUTCFullYear()).toBe(2026);
    expect(d.getUTCMonth()).toBe(8); // septiembre
    expect(d.getUTCDate()).toBe(19);
    // 10:00 en Córdoba (UTC-3) son las 13:00 UTC.
    expect(d.getUTCHours()).toBe(13);
  });

  it("el día que dice la fecha es el día que cae", () => {
    // Toda la comunicación nombra el día: si la fecha cambia y cae otro, la
    // página entera queda mintiendo. Pasó una vez y por eso existe este test.
    expect(new Date(EVENTO.fechaISO).getUTCDay()).toBe(6); // sábado
    expect(EVENTO.fechaLarga.toLowerCase()).toContain("sábado");
  });

  it("el domingo es el día siguiente, y es otro evento", () => {
    const sabado = new Date(EVENTO.fechaISO);
    const domingo = new Date(DOMINGO.fechaISO);
    expect(domingo.getUTCDay()).toBe(0);
    expect((domingo - sabado) / 86400000).toBe(1);
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
