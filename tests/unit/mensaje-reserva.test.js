import { describe, it, expect } from "vitest";
import {
  EVENTO,
  MENSAJES_WA,
  mensajeReserva,
  linkWaReserva,
  WHATSAPP_ORGANIZADOR,
} from "@/data/evento";

/**
 * El mensaje de WhatsApp es todo lo que queda del formulario de registro.
 * Si sale mal escrito, no hay validación ni pantalla de error que lo atrape:
 * la persona lo manda igual y el dato se pierde en el chat.
 */
describe("el mensaje de reserva", () => {
  /*
    El mensaje pasó a una sola línea sobre una base común: "Hola Romina!
    <acción> del evento del <fecha>". Antes traía un asunto en mayúsculas y
    cinco campos para completar a mano —nombre, marca, locales, rol, mail—.
    En el teclado de un teléfono esos cinco campos se borran antes de mandar
    y el dato se perdía igual; ahora se piden en la conversación.
  */
  it("es una sola línea, sin campos para completar", () => {
    const m = mensajeReserva();
    expect(m.split("\n")).toHaveLength(1);
    expect(m).not.toMatch(/:\s*$/);
  });

  it("saluda a quien atiende y nombra la fecha real", () => {
    const m = mensajeReserva();
    expect(m).toContain("Hola Romina!");
    expect(m).toContain(EVENTO.fechaSinDia);
  });

  it("la lista de espera dice que es lista de espera", () => {
    // Si el que no entra manda el mismo texto que el que reserva, del otro
    // lado se le contesta que tiene lugar.
    expect(mensajeReserva({ agotado: true })).toMatch(/lista de espera/i);
    expect(mensajeReserva({ agotado: true })).not.toBe(mensajeReserva());
  });

  it("los seis mensajes comparten la base y se diferencian en la acción", () => {
    const todos = [...Object.values(MENSAJES_WA), mensajeReserva({ agotado: true })];
    for (const m of todos) {
      expect(m).toContain("Hola Romina!");
      expect(m).toContain(EVENTO.fechaSinDia);
      expect(m.split("\n")).toHaveLength(1);
    }
    // Ninguno repetido: cada botón tiene que llegar distinto a la bandeja.
    expect(new Set(todos).size).toBe(todos.length);
  });
});
