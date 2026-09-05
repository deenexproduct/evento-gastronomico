import { describe, it, expect } from "vitest";
import { EVENTO, DOMINGO } from "@/data/evento";

/**
 * El .ics se genera dentro de un composable que usa onUnmounted, así que la
 * lógica de fechas se verifica sobre los mismos datos y reglas, sin montar
 * un componente. Lo que importa acá es que la conversión horaria sea correcta:
 * un evento agendado a las 6 de la mañana es peor que no agendarlo.
 */
describe("agendado del evento", () => {
  it("la fecha del evento es el sábado 19 de septiembre de 2026, cuando abren las puertas", () => {
    // Era domingo 20 hasta el 31/08: la reunión con Gastón Santana partió el
    // fin de semana en dos y el evento quedó el sábado.
    const d = new Date(EVENTO.fechaISO);
    expect(d.getUTCFullYear()).toBe(2026);
    expect(d.getUTCMonth()).toBe(8); // septiembre
    expect(d.getUTCDate()).toBe(19);
    // fechaISO es el ARRANQUE del evento —la acreditación—, no el del primer
    // bloque: es lo que se agenda el que se baja el .ics, y llegar cuando ya
    // pasó la acreditación es exactamente lo que no queremos.
    const [hh, mm] = EVENTO.puertas.split(":").map(Number);
    expect(d.getUTCHours()).toBe(hh + 3); // Córdoba es UTC-3
    expect(d.getUTCMinutes()).toBe(mm);
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
    // Por fecha de calendario y no por milisegundos: los dos eventos no
    // arrancan a la misma hora, así que la resta cruda no da 1 exacto.
    expect(domingo.getUTCDate() - sabado.getUTCDate()).toBe(1);
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
