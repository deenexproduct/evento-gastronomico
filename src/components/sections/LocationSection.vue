<template>
  <!--
    Los datos van en el orden real de la ansiedad logística: dónde es, cómo
    llego, dónde dejo el auto, a qué hora aparezco. "Dónde estaciono" está
    documentado como causa de ausencia en eventos gratuitos.
  -->
  <section id="lugar" class="border-b border-linea py-seccion">
    <div class="contenedor">
      <div class="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <p class="rotulo text-gris">Cómo llegar</p>
          <h2 class="titulo mt-4 text-[clamp(1.4rem,4.4vw,2.85rem)]">
            {{ EVENTO.venue }}, Córdoba
          </h2>
          <p class="mt-5 max-w-[44ch] text-[17px] text-gris">
            Salón propio dentro del centro de convenciones, con entrada por lista.
          </p>

          <dl class="mt-10 grid gap-3">
            <div v-for="d in DATOS" :key="d.label" class="tarjeta flex items-start gap-4 p-5">
              <span
                class="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-acento/10 text-acento-texto"
              >
                <Pictograma :nombre="d.icono" :tam="19" />
              </span>
              <div class="min-w-0">
                <dt class="text-[13px] font-semibold uppercase tracking-[0.1em] text-gris">
                  {{ d.label }}
                </dt>
                <dd class="mt-1 text-[17px] font-bold leading-snug">{{ d.valor }}</dd>
                <p v-if="d.nota" class="mt-1 text-[14px] leading-snug text-gris">{{ d.nota }}</p>
              </div>
            </div>
          </dl>

          <!-- Logística práctica -->
          <div class="mt-10 border-t border-white/10 pt-8">
            <p class="text-[13px] font-semibold uppercase tracking-[0.12em] text-gris-2">
              Antes de venir
            </p>
            <div class="mt-5 grid gap-5">
              <div v-for="l in LOGISTICA_VISIBLE" :key="l.titulo" class="flex items-start gap-4">
                <span class="mt-0.5 shrink-0 text-acento-texto">
                  <Pictograma :nombre="l.icono" :tam="18" />
                </span>
                <div class="min-w-0">
                  <p class="text-[15px] font-semibold uppercase tracking-[0.02em]">{{ l.titulo }}</p>
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

        <!--
          Mapa a pedido.

          El iframe de Google costaba 443 KB —places.js, main.js, init_embed,
          util, common, controls, map y onion— sobre los 494 que pesa todo el
          resto de la página junta: casi la mitad de la descarga, por un mapa
          de una dirección que está escrita en texto a diez centímetros. Y en
          teléfono medía 334x418px con 21px de página a cada lado para
          deslizar sin caer adentro, o sea menos de la mitad del mínimo
          táctil, justo en el camino del que baja hacia el FAQ.

          No se saca el mapa: se carga cuando alguien lo pide. El que quiere
          arrastrarlo lo tiene a un toque, y el que no, no paga nada. Con el
          mapa apagado tampoco hay trampa de scroll, porque no hay iframe que
          se coma el dedo.
        -->
        <div class="relative min-h-[420px] overflow-hidden rounded-2xl border border-white/10 lg:min-h-full">
          <iframe
            v-if="mapaPedido"
            :src="mapaSrc"
            class="mapa absolute inset-0 h-full w-full border-0"
            referrerpolicy="no-referrer-when-downgrade"
            title="Ubicación del evento en Córdoba"
          ></iframe>

          <div v-else class="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
            <Pictograma nombre="lugar" :tam="30" />
            <button type="button" class="btn-linea" @click="mapaPedido = true">
              Ver el mapa acá
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { EVENTO } from "@/data/evento";
import Pictograma from "@/components/ui/Pictograma.vue";

/** El mapa pesado solo se trae si alguien lo pide. Ver el comentario arriba. */
const mapaPedido = ref(false);

/**
 * Solo la direccion.
 *
 * Las otras tres fichas —cuando, horario, entrada— repetian datos que la
 * pagina ya da ocho, seis y ocho veces respectivamente antes de llegar aca,
 * con el mismo componente visual. Sus notas tampoco eran unicas: "entras y
 * salis cuando quieras" esta en la FAQ y "lista de la puerta" aparece cuatro
 * veces. La direccion aparece dos, y esta es la seccion que se llama "como
 * llegar": es el unico dato que nace aca.
 */
const DATOS = [
  {
    icono: "lugar",
    label: "Dirección",
    valor: `${EVENTO.direccion}, Córdoba capital`,
  },
];

/**
 * Logística práctica. Responde en el orden en que aparece la duda cuando
 * alguien ya decidió ir. Todo lo que está como "A confirmar" no se publica
 * hasta que producción lo verifique.
 */
const LOGISTICA = [
  {
    icono: "gente",
    titulo: "Tu acreditación también entra a Córdoba Corazón de Moda",
    texto:
      "GastroTech pasa en un salón propio, con entrada por lista. La misma acreditación te habilita Córdoba Corazón de Moda, el evento que ocupa el resto del centro de convenciones ese día y por el que circulan unas 20.000 personas.",
  },
  {
    icono: "reloj",
    titulo: "A qué hora conviene llegar",
    texto:
      "La acreditación abre 9:30 y la primera charla arranca 10. Si venís temprano recorrés los stands sin gente encima.",
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

/**
 * El flag `pendiente` marcaba una nota interna de producción, pero solo le
 * cambiaba el color: las dos notas se publicaban textuales, con el "A
 * confirmar con el hotel" a la vista de cualquiera. Ahora filtra de verdad.
 *
 * Las dos que hoy quedan fuera —estacionamiento y accesibilidad— vuelven
 * solas cuando alguien escriba la respuesta real y les saque el flag. La
 * accesibilidad, en particular, conviene publicarla: hoy es la única mención
 * del sitio y para más de una persona decide si viene o no.
 */
const LOGISTICA_VISIBLE = LOGISTICA.filter((l) => !l.pendiente);

const comoLlegar =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(`${EVENTO.venue}, ${EVENTO.direccion}, Córdoba, Argentina`);

const mapaSrc =
  "https://www.google.com/maps?q=" +
  encodeURIComponent(`${EVENTO.venue}, ${EVENTO.direccion}, Córdoba, Argentina`) +
  "&z=15&output=embed";
</script>
