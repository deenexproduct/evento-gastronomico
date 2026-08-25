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
function aFormatoUTC(fecha) {
  return fecha.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

export function useCalendario() {
  const inicio = new Date(EVENTO.fechaISO);
  // La jornada termina a las 18. El horario vive en EVENTO.horario como texto,
  // así que la hora de cierre se deriva de ahí y no se repite hardcodeada.
  const horaFin = Number((EVENTO.horario.split("a")[1] || "18").trim().split(":")[0]) || 18;
  const fin = new Date(inicio);
  fin.setHours(horaFin, 0, 0, 0);

  const titulo = `${EVENTO.nombre} · Jornada de gastronomía y tecnología`;
  const lugar = `${EVENTO.venue}, ${EVENTO.direccion}, Córdoba, Argentina`;
  const detalle =
    "Un día de charlas, demos en vivo y networking para dueños de cadenas gastronómicas. " +
    "Llevá el código de acceso que te llegó por mail: se escanea en la puerta.";

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
      "BEGIN:VEVENT",
      `UID:gastrotech-2026-09-20@deenex.tech`,
      `DTSTAMP:${aFormatoUTC(new Date(EVENTO.fechaISO))}`,
      `DTSTART:${aFormatoUTC(inicio)}`,
      `DTEND:${aFormatoUTC(fin)}`,
      `SUMMARY:${titulo}`,
      `DESCRIPTION:${detalle}`,
      `LOCATION:${lugar}`,
      // Dos avisos: uno la semana previa y otro la mañana del evento.
      "BEGIN:VALARM",
      "TRIGGER:-P7D",
      "ACTION:DISPLAY",
      `DESCRIPTION:Falta una semana para ${EVENTO.nombre}`,
      "END:VALARM",
      "BEGIN:VALARM",
      "TRIGGER:-PT2H",
      "ACTION:DISPLAY",
      `DESCRIPTION:${EVENTO.nombre} es hoy. Llevá tu código de acceso.`,
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n")
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
