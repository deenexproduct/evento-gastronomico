<template>
  <!--
    El hero venía apilando cinco bloques de texto y la tarjeta de cupo en una
    sola columna, y eso empujaba el botón 109px por debajo del fold en
    1280x800: el que entraba no veía un CTA hasta hacer scroll.

    Ahora la columna izquierda solo carga fecha, nombre, promesa y botones, y
    todo lo que es dato —cuánto falta y cuánto queda— se va a un panel a la
    derecha. En celular el panel cae debajo de los botones, que es el orden que
    corresponde ahí.
  -->
  <section id="hero" class="relative overflow-hidden pt-[104px]">
    <!-- Halo del acento, contenido y barato: sin JS ni imágenes -->
    <div
      class="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.16] blur-[130px]"
      style="background: radial-gradient(circle, #FF0054 0%, transparent 70%)"
      aria-hidden="true"
    ></div>

    <div class="contenedor relative py-12 sm:py-16">
      <div class="grid items-start gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-14">
        <!-- Columna del mensaje -->
        <div>
          <p class="rotulo text-acento-texto">Edición 01 · Organiza Deenex</p>

          <h1 class="display mt-5 text-[clamp(2.6rem,8.5vw,6.5rem)]">
            {{ EVENTO.nombre }}
          </h1>

          <!--
            Antes había dos bajadas seguidas: una rosa con la categoría y otra
            gris con la promesa. La categoría pasó a la línea de datos de abajo
            y queda una sola frase, que es la que tiene que leerse.
          -->
          <p class="mt-5 max-w-[34ch] text-[clamp(1.25rem,3vw,1.9rem)] font-black uppercase leading-[1.08] tracking-[-0.02em]">
            Un domingo para dueños de cadenas gastronómicas.
            <span class="text-acento-texto">El lunes mirás tus locales con otros números.</span>
          </p>

          <p class="mt-5 max-w-[46ch] text-[17px] leading-[1.5] font-medium text-gris sm:text-[19px]">
            Comparar el food cost real entre tus locales, ver los sistemas funcionando con lo que
            cuestan, y escuchar los números que otras cadenas de Córdoba no dicen en público. Lo
            cuenta gente que ya lo resolvió con varios locales abiertos.
          </p>

          <div class="mt-8 flex flex-wrap items-center gap-3">
            <a href="#registro" class="btn" @click.prevent="ir('registro')">{{
              agotado ? "Entrar a la lista" : "Quiero mi lugar"
            }}</a>
            <a href="#jornada" class="btn-linea" @click.prevent="ir('jornada')">Ver el programa</a>
          </div>

          <p class="mt-5 text-[14px] leading-[1.5] text-gris">
            Entrada sin costo con reserva previa · Se reserva por WhatsApp, sin formularios
          </p>
        </div>

        <!-- Panel de datos: cuándo es, cuánto falta y cuánto queda -->
        <aside class="tarjeta p-5 sm:p-6 lg:mt-2">
          <p class="rotulo text-white">Domingo 20 de septiembre</p>
          <p class="mt-2 text-[15px] leading-[1.45] text-gris">
            Charlas de {{ EVENTO.horario }}, puertas desde las {{ EVENTO.puertas }} · {{ EVENTO.venue }}, Córdoba
          </p>

          <!-- Cuenta regresiva: acá es donde el número presiona -->
          <div class="mt-6 flex items-end gap-4 border-t border-white/10 pt-6">
            <p
              v-if="estado === 'faltan'"
              class="font-black leading-[0.78] tabular-nums tracking-[-0.05em] text-acento-texto text-[clamp(3.4rem,9vw,5rem)]"
            >
              {{ dias }}
            </p>
            <p
              v-else
              class="font-black uppercase leading-[0.85] tracking-[-0.03em] text-acento-texto text-[clamp(2rem,6vw,3rem)]"
            >
              {{ estado === "hoy" ? "Es hoy" : "Ya pasó" }}
            </p>
            <p
              v-if="estado === 'faltan'"
              class="pb-1 text-[13px] font-black uppercase tracking-[0.2em] text-gris"
            >
              {{ dias === 1 ? "día" : "días" }}<br />para el evento
            </p>
          </div>

          <!-- Escasez con razón física, no con fases de precio -->
          <div class="mt-6 border-t border-white/10 pt-6">
            <p class="flex items-center gap-2 text-[13px] font-black uppercase tracking-[0.12em]">
              <span class="relative flex h-2 w-2">
                <span
                  class="absolute inline-flex h-full w-full animate-ping rounded-full bg-acento opacity-70"
                ></span>
                <span class="relative inline-flex h-2 w-2 rounded-full bg-acento"></span>
              </span>
              <span class="text-acento-texto">{{
                agotado ? "Lista de espera" : "Reservas abiertas"
              }}</span>
            </p>

            <!--
              El conteo solo sale cuando es real. Hasta que haya suficientes
              anotados, la página dice cuántos lugares hay —que es cierto
              siempre— y no cuántos quedan, que sería inventado.
            -->
            <template v-if="mostrarCupo">
              <div class="mt-4 flex items-baseline justify-between gap-4">
                <p class="rotulo text-white">{{ porcentaje }}% del salón tomado</p>
                <p
                  class="text-[14px] font-bold tabular-nums text-gris"
                  style="min-width: 7ch; text-align: right"
                >
                  {{ ocupados }} / {{ total }}
                </p>
              </div>

              <div class="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  class="h-full rounded-full bg-acento transition-[width] duration-[1200ms] ease-out"
                  :style="{ width: ancho + '%' }"
                ></div>
              </div>
            </template>

            <p v-else class="mt-4 rotulo text-white">{{ total }} lugares · entrada sin costo</p>

            <p class="mt-3 text-[14px] leading-[1.45] text-gris">
              <template v-if="agotado">
                La sala se llenó: entraron los {{ total }}. Podés dejar tus datos por si se libera un
                lugar.
              </template>
              <template v-else>
                El cupo es el del salón, no una fase de venta. Cuando entren {{ total }}, se cierra.
              </template>
            </p>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { EVENTO } from "@/data/evento";
import { useCupo } from "@/composables/useCupo";
import { useCuentaRegresiva } from "@/composables/useCuentaRegresiva";

const { total, ocupados, porcentaje, agotado, mostrarCupo } = useCupo();
const { dias, estado } = useCuentaRegresiva();

const ancho = ref(0);
onMounted(() => setTimeout(() => (ancho.value = Math.max(porcentaje.value, 3)), 400));
watch(porcentaje, (v) => {
  if (ancho.value > 0) ancho.value = Math.max(v, 3);
});

function ir(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
</script>
