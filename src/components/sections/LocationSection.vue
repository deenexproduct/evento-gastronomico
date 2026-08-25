<template>
  <!--
    Los datos van en el orden real de la ansiedad logística: dónde es, cómo
    llego, dónde dejo el auto, a qué hora aparezco. "Dónde estaciono" está
    documentado como causa de ausencia en eventos gratuitos.
  -->
  <section id="lugar" class="py-seccion">
    <div class="contenedor">
      <div class="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <p class="rotulo text-acento-texto">Cómo llegar</p>
          <h2 class="titulo mt-4 text-[clamp(1.9rem,5.6vw,3.2rem)]">
            {{ EVENTO.venue }}, Córdoba
          </h2>
          <p class="mt-5 max-w-[44ch] text-[17px] text-gris">
            Salón propio de 200 m² dentro del centro de convenciones. El cupo del evento es,
            literalmente, la capacidad de la sala.
          </p>

          <dl class="mt-10 grid gap-3">
            <div v-for="d in DATOS" :key="d.label" class="tarjeta flex items-start gap-4 p-5">
              <span
                class="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-acento/10 text-acento-texto"
              >
                <Pictograma :nombre="d.icono" :tam="19" />
              </span>
              <div class="min-w-0">
                <dt class="text-[13px] font-black uppercase tracking-[0.1em] text-gris">
                  {{ d.label }}
                </dt>
                <dd class="mt-1 text-[17px] font-bold leading-snug">{{ d.valor }}</dd>
                <p v-if="d.nota" class="mt-1 text-[14px] leading-snug text-gris">{{ d.nota }}</p>
              </div>
            </div>
          </dl>

          <!-- Logística práctica -->
          <div class="mt-10 border-t border-white/10 pt-8">
            <p class="text-[13px] font-black uppercase tracking-[0.12em] text-gris-2">
              Antes de venir
            </p>
            <div class="mt-5 grid gap-5">
              <div v-for="l in LOGISTICA" :key="l.titulo" class="flex items-start gap-4">
                <span class="mt-0.5 shrink-0 text-acento-texto">
                  <Pictograma :nombre="l.icono" :tam="18" />
                </span>
                <div class="min-w-0">
                  <p class="text-[15px] font-black uppercase tracking-[0.02em]">{{ l.titulo }}</p>
                  <p class="mt-1 text-[15px] leading-[1.5]" :class="l.pendiente ? 'text-gris-2' : 'text-gris'">
                    {{ l.texto }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <a
            :href="comoLlegar"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-linea mt-8"
          >
            Abrir en Google Maps
            <Pictograma nombre="flecha" :tam="17" />
          <span class="sr-only"> (abre en una pestaña nueva)</span></a>
        </div>

        <!-- Mapa -->
        <div class="relative min-h-[420px] overflow-hidden rounded-2xl border border-white/10 lg:min-h-full">
          <!--
            El filtro va por clase y no inline: inline no lo alcanza ningún
            selector, así que el mapa se quedaba invertido —o sea negro— sobre
            fondo claro, siendo la superficie más grande del cuerpo de la
            página. Ver .mapa en main.css.
          -->
          <iframe
            :src="mapaSrc"
            class="mapa absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Ubicación del evento en Córdoba"
          ></iframe>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { EVENTO } from "@/data/evento";
import Pictograma from "@/components/ui/Pictograma.vue";

const DATOS = [
  {
    icono: "lugar",
    label: "Dirección",
    valor: `${EVENTO.direccion}, Córdoba capital`,
  },
  {
    icono: "calendario",
    label: "Cuándo",
    valor: "Domingo 20 de septiembre de 2026",
  },
  {
    icono: "reloj",
    label: "Horario",
    valor: "De 9 a 18 h",
    nota: "Acreditación desde las 8:30. Entrás y salís cuando quieras.",
  },
  {
    icono: "entrada",
    label: "Entrada",
    valor: "Sin costo, con registro previo",
    nota: "El código de acceso llega por mail y se escanea en la puerta.",
  },
];

/**
 * Logística práctica. Responde en el orden en que aparece la duda cuando
 * alguien ya decidió ir. Todo lo que está como "A confirmar" no se publica
 * hasta que producción lo verifique.
 */
const LOGISTICA = [
  {
    icono: "reloj",
    titulo: "A qué hora conviene llegar",
    texto:
      "La acreditación abre 8:30 y la primera charla arranca 10. Si venís temprano recorrés los stands sin gente encima.",
  },
  {
    icono: "auto",
    titulo: "Dónde dejar el auto",
    texto: "A confirmar con producción: capacidad de estacionamiento y playas cercanas al hotel.",
    pendiente: true,
  },
  {
    icono: "gente",
    titulo: "Accesibilidad",
    texto: "A confirmar con el hotel: acceso sin escaleras, ascensor y baños adaptados.",
    pendiente: true,
  },
];

const comoLlegar =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(`${EVENTO.venue}, ${EVENTO.direccion}, Córdoba, Argentina`);

const mapaSrc =
  "https://www.google.com/maps?q=" +
  encodeURIComponent(`${EVENTO.venue}, ${EVENTO.direccion}, Córdoba, Argentina`) +
  "&z=15&output=embed";
</script>
