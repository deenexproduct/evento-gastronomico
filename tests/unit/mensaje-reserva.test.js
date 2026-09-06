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

  /*
    El de reserva es el único de los seis que NO nombra a quien atiende: abre
    con "Buenas!". Los otros cinco siguen saludando a Romina.

    La asimetría es deliberada y conviene entenderla antes de "arreglarla": el
    de reserva es el que manda alguien que todavía no habló con nadie, así que
    saludar por nombre a una persona que no conoce suena a plantilla. Los otros
    cinco los manda alguien que ya está en conversación —sponsor, prensa, rubro,
    consulta—.
  */
  it("abre sin nombrar a nadie y nombra la fecha real", () => {
    const m = mensajeReserva();
    expect(m).toMatch(/^Buenas!/);
    expect(m).not.toContain("Romina");
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
      // La base común son estas dos: una sola línea y la fecha adentro. El
      // saludo dejó de serlo cuando el de reserva pasó a "Buenas!".
      expect(m).toContain(EVENTO.fechaSinDia);
      expect(m.split("\n")).toHaveLength(1);
    }
    // Ninguno repetido: cada botón tiene que llegar distinto a la bandeja.
    expect(new Set(todos).size).toBe(todos.length);
  });

  /*
    Los cinco que NO son de reserva sí comparten el saludo, y tienen que
    seguir compartiéndolo: la constante SALUDO existe para que cambiar quién
    atiende sea una línea. Este test es el que se rompe si alguien escribe uno
    a mano.
  */
  it("los cinco de conversación saludan todos a la misma persona", () => {
    const deConversacion = Object.entries(MENSAJES_WA)
      .filter(([clave]) => clave !== "registro")
      .map(([, m]) => m);
    expect(deConversacion).toHaveLength(4);
    for (const m of deConversacion) expect(m).toContain("Hola Romina!");
  });

  /*
    El número vive en una sola constante y el enlace tiene que salir de ahí.
    Escribirlo a mano en un componente es como quedaron circulando dos números
    distintos la última vez que cambió.
  */
  it("el enlace de reserva sale del número que declara evento.js", () => {
    expect(linkWaReserva()).toContain(`wa.me/${WHATSAPP_ORGANIZADOR}`);
    expect(WHATSAPP_ORGANIZADOR).toMatch(/^549\d{10}$/);
  });
});
