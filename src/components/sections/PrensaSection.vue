<!--
  Lo que un periodista necesita y ninguna otra sección le da.

  El programa y los oradores ya están publicados —esta vista reusa esas mismas
  secciones, no una copia—, pero faltaba lo que sólo le sirve a quien viene a
  cubrir: a qué hora conviene grabar, con quién se puede hablar, cómo se
  acredita y un texto listo para publicar.

  La gacetilla se arma con EVENTO y CUPO. Escrita a mano acá sería el cuarto
  lugar donde repetir la fecha, el horario y el cupo, y el primero en quedar
  viejo: pasó con el horario en tres lugares que no coincidían.
-->
<template>
  <section id="prensa" class="border-b border-linea py-seccion">
    <div class="contenedor">
      <p class="rotulo text-acento-texto">Para la cobertura</p>
      <h2 class="titulo mt-4 max-w-[24ch] text-[clamp(1.4rem,4.4vw,2.85rem)]">
        A qué hora grabar y con quién hablar
      </h2>

      <div class="mt-10 grid gap-4 sm:grid-cols-2">
        <div v-for="v in VENTANAS" :key="v.hora" class="tarjeta flex flex-col gap-1 p-6">
          <p class="text-[11px] font-semibold uppercase tracking-[0.12em] text-gris-2">{{ v.hora }}</p>
          <p class="mt-1 text-[1.05rem] font-semibold leading-snug">{{ v.que }}</p>
          <p class="text-[14px] leading-[1.5] text-gris">{{ v.detalle }}</p>
        </div>
      </div>

      <div class="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <h3 class="text-[1.15rem] font-extrabold uppercase leading-tight">Cómo se acredita</h3>
          <ul class="mt-5 grid gap-3">
            <li v-for="p in ACREDITACION" :key="p" class="item-prensa">
              <span class="punto" aria-hidden="true"></span>
              <span>{{ p }}</span>
            </li>
          </ul>

          <div class="mt-7 flex flex-wrap gap-3">
            <a :href="whatsappPrensa" target="_blank" rel="noopener noreferrer" class="btn">
              Pedir acreditación
              <span class="sr-only"> (abre en una pestaña nueva)</span>
            </a>
            <a :href="`mailto:${EVENTO.mailPrensa}`" class="btn-linea">Escribir por mail</a>
          </div>
        </div>

        <div>
          <h3 class="text-[1.15rem] font-extrabold uppercase leading-tight">Los datos, en una línea</h3>
          <dl class="mt-5 grid gap-px bg-linea">
            <div v-for="d in DATOS" :key="d.r" class="grid gap-1 bg-noche p-5 sm:grid-cols-[150px_1fr] sm:gap-4">
              <dt class="text-[11px] font-semibold uppercase tracking-[0.12em] text-gris-2">{{ d.r }}</dt>
              <dd class="text-[15px] leading-[1.5]">{{ d.v }}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div class="mt-14">
        <h3 class="text-[1.15rem] font-extrabold uppercase leading-tight">Gacetilla</h3>
        <p class="mt-3 max-w-[64ch] text-[15px] leading-[1.55] text-gris">
          Lista para copiar y pegar. Si hace falta más corta, más larga o con una cita puntual, se
          pide por el mismo canal.
        </p>

        <article class="tarjeta mt-6 overflow-hidden">
          <header class="flex flex-wrap items-center justify-between gap-3 border-b border-linea px-6 py-4">
            <span class="text-[13px] font-semibold uppercase tracking-[0.1em] text-acento-texto">
              Texto para publicar
            </span>
            <button type="button" class="btn-linea px-4 py-2 text-[13px]" @click="copiar">
              {{ etiquetaCopiar }}
            </button>
          </header>
          <div ref="cajaGacetilla" class="grid gap-4 px-6 py-6 text-[15px] leading-[1.6]">
            <p v-for="(parrafo, i) in GACETILLA" :key="i">{{ parrafo }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { CUPO, EVENTO, SPEAKERS, linkWa } from "@/data/evento";

const VENTANAS = [
  {
    hora: EVENTO.puertas,
    que: "Acreditación y stands",
    detalle: "El salón abre con los stands andando: es el momento de los planos generales y del color.",
  },
  {
    hora: "11:45 a 12:45",
    que: "Networking del mediodía",
    detalle: "La hora más cómoda para entrevistar: los oradores ya hablaron y la sala circula.",
  },
  {
    hora: "14:15 y 16:55",
    que: "Los dos paneles",
    detalle: "Primero las marcas gastronómicas, después los proveedores de tecnología.",
  },
  {
    hora: "Todo el día",
    que: "El set del podcast",
    detalle: "Queda montado sobre el escenario: después de cada charla se graba un episodio frente a la sala.",
  },
];

const ACREDITACION = [
  "Se pide por WhatsApp o por mail, y en la puerta alcanza con el nombre.",
  `Alan Tapia queda disponible para entrevistas antes y durante la jornada; los ${SPEAKERS.length} oradores se coordinan con anticipación.`,
  "La gacetilla y las fotos del día se envían por el mismo canal, el lunes siguiente.",
  "La sala es independiente del resto del edificio y se entra por lista.",
];

const DATOS = [
  { r: "Cuándo", v: `${EVENTO.fechaLarga}. Acreditación ${EVENTO.puertas}, charlas de ${EVENTO.horarioCharlas}, networking hasta las 18:10.` },
  { r: "Dónde", v: `${EVENTO.venue}, ${EVENTO.direccion}, ${EVENTO.ciudad}.` },
  { r: "Quiénes", v: `${CUPO.total} dueños y gerentes de cadenas gastronómicas, con cupo cerrado.` },
  { r: "Organiza", v: `${EVENTO.organiza}, empresa cordobesa de tecnología para cadenas gastronómicas.` },
  { r: "Sponsor", v: "Asociación Argentina de Marcas y Franquicias (AAMF)." },
];

const GACETILLA = [
  "Siete marcas gastronómicas cuentan en Córdoba qué les dio la inteligencia artificial y qué no",
  `El ${EVENTO.fechaLarga.toLowerCase()}, el ${EVENTO.venue} reúne a ${CUPO.total} dueños y gerentes de cadenas ` +
    `gastronómicas en ${EVENTO.nombre}, una jornada organizada por la empresa cordobesa ${EVENTO.organiza}, con la ` +
    "Asociación Argentina de Marcas y Franquicias (AAMF) como sponsor.",
  "Durante todo el día, en un solo escenario, marcas que operan en Córdoba y en el país cuentan cómo cambiaron su " +
    "operación con sistemas, datos e inteligencia artificial: El Hornito Santiagueño, que pasó de un horno de barro a " +
    "90 locales; PUNI; Pimentón; Bistrosoft; I+DIoT Lab, que monta automatización en cadenas grandes; y Merovingian " +
    "Data, cuyo cofundador Marcos Bruno fue elegido MIT Innovator Under 35.",
  `El formato se distingue de una conferencia: después de cada charla, Alan Tapia, fundador de ${EVENTO.organiza}, ` +
    "entrevista al orador sobre el escenario y el episodio se graba en vivo frente a la sala. Hay además dos paneles, " +
    "uno con las marcas y otro con los proveedores de tecnología, y dos rondas de networking.",
  `La acreditación abre a las ${EVENTO.puertas}, las charlas van de ${EVENTO.horarioCharlas} y el networking de cierre ` +
    `se extiende hasta las 18:10. La entrada es sin costo y requiere reserva previa; hay ${CUPO.total} lugares.`,
  `Datos: ${EVENTO.nombre} · ${EVENTO.fechaLarga} · ${EVENTO.venue}, ${EVENTO.direccion}, ${EVENTO.ciudad} · ` +
    "Programa completo en saborestech.deenex.tech",
  `Contacto de prensa: Romina · Comunicación · ${EVENTO.nombre} by ${EVENTO.organiza} · WhatsApp ${EVENTO.whatsappVisible} · ${EVENTO.mailPrensa}`,
];

const whatsappPrensa = linkWa("prensa");
const cajaGacetilla = ref(null);
const etiquetaCopiar = ref("Copiar el texto");

/**
 * Copia con la API del portapapeles, que en un iframe sin permiso o sin HTTPS
 * tira error. Si falla, el texto igual está a la vista: lo único que se pierde
 * es el atajo, así que el botón lo dice en vez de quedarse mudo.
 */
async function copiar() {
  try {
    await navigator.clipboard.writeText(GACETILLA.join("\n\n"));
    etiquetaCopiar.value = "Copiado";
  } catch {
    etiquetaCopiar.value = "Seleccionalo y copialo";
  }
  setTimeout(() => {
    etiquetaCopiar.value = "Copiar el texto";
  }, 2500);
}
</script>

<style scoped>
.item-prensa {
  display: grid;
  grid-template-columns: 22px 1fr;
  gap: 0.75rem;
  align-items: start;
  font-size: 15px;
  line-height: 1.45;
}
.punto {
  width: 7px;
  height: 7px;
  margin: 0.5rem 0 0 0.45rem;
  border-radius: 999px;
  background: var(--acento-texto, #4f42c4);
}
</style>
