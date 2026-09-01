import { computed, onUnmounted } from "vue";
import { EVENTO } from "@/data/evento";

/**
 * Agendar el evento.
 *
 * Es la palanca más directa contra el no-show, que en eventos gratuitos va del
 * 40 al 60%: el que lo tiene en el calendario aparece mucho más que el que
 * solo se anotó.
 *
 * Google se resuelve con una URL. Apple, Outlook y el resto necesitan un
 * archivo .ics, que se genera en el navegador — sin backend ni dependencias.
 */

/** 20260920T120000Z: el formato UTC que pide RFC 5545. */
function aFormatoUTC(fecha) {
  return fecha.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/**
 * RFC 5545 §3.3.11. En un valor TEXT hay que escapar barra invertida, punto y
 * coma, coma y salto de línea. Sin esto, la coma de "Hotel Quinto Centenario,
 * Duarte Quirós 1300" se lee como separador y el lugar llega cortado.
 */
function escapar(texto) {
  return String(texto)
    .replace(/\\/g, "\\\\")
    .replace(/[;,]/g, "\\$&")
    .replace(/\r?\n/g, "\\n");
}

/**
 * RFC 5545 §3.1. Ninguna línea puede pasar los 75 octetos; la continuación
 * arranca con un espacio. Se cuenta en bytes y se corta entre caracteres, para
 * no partir una tilde al medio.
 */
function plegar(linea) {
  const codificador = new TextEncoder();
  if (codificador.encode(linea).length <= 75) return linea;

  const partes = [];
  let actual = "";
  let bytes = 0;
  for (const caracter of linea) {
    const peso = codificador.encode(caracter).length;
    // La primera línea tiene 75 octetos; las siguientes 74, porque el espacio
    // de continuación ocupa uno.
    const tope = partes.length === 0 ? 75 : 74;
    if (bytes + peso > tope) {
      partes.push(actual);
      actual = "";
      bytes = 0;
    }
    actual += caracter;
    bytes += peso;
  }
  partes.push(actual);
  return partes.join("\r\n ");
}

/**
 * Duración leída del horario declarado ("10 a 18" → 9 h). Se calcula como
 * diferencia de minutos y se suma al instante de inicio: hacerlo con setHours
 * escribiría hora local del navegador, y una máquina configurada fuera de
 * Argentina generaría un evento de otra duración —o con el fin antes del
 * inicio.
 */
function duracionEnMinutos(horario) {
  const marcas = String(horario).match(/\d{1,2}(?::\d{2})?/g) || [];
  const minutos = marcas.map((m) => {
    const [hh, mm] = m.split(":");
    return Number(hh) * 60 + Number(mm || 0);
  });
  const total = minutos.length >= 2 ? minutos[1] - minutos[0] : 0;
  return total > 0 ? total : 9 * 60;
}

export function useCalendario() {
  const inicio = new Date(EVENTO.fechaISO);
  const fin = new Date(inicio.getTime() + duracionEnMinutos(EVENTO.horario) * 60000);

  const titulo = `${EVENTO.nombre} · Jornada de gastronomía y tecnología`;
  const lugar = `${EVENTO.venue}, ${EVENTO.direccion}, Córdoba, Argentina`;
  const detalle =
    "Un día de charlas y networking para dueños de cadenas gastronómicas. " +
    "Tu lugar está confirmado por WhatsApp: en la puerta alcanza con tu nombre.";

  const google = computed(() => {
    const p = new URLSearchParams({
      action: "TEMPLATE",
      text: titulo,
      dates: `${aFormatoUTC(inicio)}/${aFormatoUTC(fin)}`,
      details: detalle,
      location: lugar,
    });
    return `https://calendar.google.com/calendar/render?${p}`;
  });

  const ics = computed(() =>
    [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Deenex//GastroTech//ES",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:gastrotech-${EVENTO.fechaISO.slice(0, 10)}@deenex.tech`,
      // Momento en que se generó el archivo, no la fecha del evento.
      `DTSTAMP:${aFormatoUTC(new Date())}`,
      `DTSTART:${aFormatoUTC(inicio)}`,
      `DTEND:${aFormatoUTC(fin)}`,
      `SUMMARY:${escapar(titulo)}`,
      `DESCRIPTION:${escapar(detalle)}`,
      `LOCATION:${escapar(lugar)}`,
      // Dos avisos: uno la semana previa y otro la mañana del evento.
      "BEGIN:VALARM",
      "TRIGGER:-P7D",
      "ACTION:DISPLAY",
      `DESCRIPTION:${escapar(`Falta una semana para ${EVENTO.nombre}`)}`,
      "END:VALARM",
      "BEGIN:VALARM",
      "TRIGGER:-PT2H",
      "ACTION:DISPLAY",
      `DESCRIPTION:${escapar(`${EVENTO.nombre} es hoy. Te esperamos desde las 9:30.`)}`,
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ]
      .map(plegar)
      .join("\r\n")
  );

  let url = "";
  const urlIcs = computed(() => {
    if (url) URL.revokeObjectURL(url);
    url = URL.createObjectURL(new Blob([ics.value], { type: "text/calendar;charset=utf-8" }));
    return url;
  });

  onUnmounted(() => {
    if (url) URL.revokeObjectURL(url);
  });

  return { google, urlIcs, nombreArchivo: "gastrotech-20-09.ics" };
}
