import { describe, it, expect } from "vitest";
import { mensajeReserva, linkWaReserva, WHATSAPP_ORGANIZADOR } from "@/data/evento";

/**
 * El mensaje de WhatsApp es todo lo que queda del formulario de registro.
 * Si sale mal escrito, no hay validación ni pantalla de error que lo atrape:
 * la persona lo manda igual y el dato se pierde en el chat.
 */
describe("el mensaje de reserva", () => {
  it("pide los datos que antes pedía el formulario", () => {
    const m = mensajeReserva();
    expect(m).toContain("Nombre:");
    expect(m).toContain("Marca:");
    expect(m).toContain("Cuántos locales tengo:");
    expect(m).toContain("Mi rol:");
    expect(m).toContain("Mi mail");
  });

  it("le da una razón al mail, que es el dato más frágil que queda", () => {
    // Un renglón que dice solo "Mail:" se saltea. Con la razón adentro se
    // completa, y sin formulario no hay otra forma de conseguirlo.
    expect(mensajeReserva()).toMatch(/Mi mail \([^)]+\):/);
  });

  it("arranca con un asunto en mayúsculas para poder filtrar el chat", () => {
    // Con doscientas conversaciones, saber de qué va cada una sin abrirla
    // deja de ser un detalle.
    expect(mensajeReserva().split("\n")[0]).toBe("GASTROTECH · QUIERO IR");
    expect(mensajeReserva({ agotado: true }).split("\n")[0]).toBe("GASTROTECH · LISTA DE ESPERA");
  });

  it("cuando el selector viene cargado, no deja el renglón duplicado", () => {
    // Si quedaran los dos —el dato resuelto y el renglón en blanco— el mensaje
    // se lee mal escrito y la persona borra uno al azar.
    const m = mensajeReserva({ locales: "6 a 15 locales" });
    expect(m).toContain("Locales: 6 a 15 locales");
    expect(m).not.toContain("Cuántos locales tengo:");
  });

  it("no le pregunta el tema a quien no entra", () => {
    expect(mensajeReserva()).toContain("Me interesaría que se hable de:");
    expect(mensajeReserva({ agotado: true })).not.toContain("Me interesaría");
  });

  it("escribe cuántos van, y solo cuando son más de uno", () => {
    // Con cupo duro de 200, doscientos mensajes no son doscientas personas.
    expect(mensajeReserva({ personas: 3 })).toContain("Vamos 3 (yo + 2 de mi equipo)");
    // "Vamos 1" no informa nada y se come la primera pantalla del chat.
    expect(mensajeReserva({ personas: 1 })).not.toContain("Vamos");
    expect(mensajeReserva()).not.toContain("Vamos");
    // En la lista de espera SÍ va: son tres lugares que hay que liberar.
    expect(mensajeReserva({ personas: 2, agotado: true })).toContain("Vamos 2");
  });

  it("lo resuelto va antes de lo que hay que completar", () => {
    // En el celular WhatsApp muestra las primeras líneas y el resto hay que
    // scrollearlo. Si "Vamos 3" cae debajo de los renglones en blanco, la
    // persona lo borra creyendo que es parte de lo que tiene que llenar.
    const l = mensajeReserva({ locales: "6 a 15 locales", personas: 3 }).split("\n");
    expect(l.findIndex((x) => x.startsWith("Vamos"))).toBeLessThan(l.indexOf("Nombre:"));
    expect(l.findIndex((x) => x.startsWith("Locales:"))).toBeLessThan(l.indexOf("Nombre:"));
  });

  it("arma un enlace al número del organizador y sobrevive a la codificación", () => {
    const url = linkWaReserva({ locales: "2 a 5 locales" });
    expect(url.startsWith(`https://wa.me/${WHATSAPP_ORGANIZADOR}?text=`)).toBe(true);
    // Las tildes y el · tienen que volver intactos: si se rompen, el mensaje
    // llega con caracteres raros y parece spam.
    const texto = decodeURIComponent(url.split("text=")[1]);
    expect(texto).toContain("GASTROTECH · QUIERO IR");
    expect(texto).toContain("Locales: 2 a 5 locales");
    expect(texto).toContain("Mi mail");
  });
});
