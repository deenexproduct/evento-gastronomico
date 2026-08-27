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
      <div class="grid items-start gap-10">
        <!-- Columna del mensaje -->
        <div>
          <!--
            Donde y cuando, antes que nada. Con el panel de la derecha
            afuera, estas dos lineas son lo unico que lo dicen en la primera
            pantalla.

            Van en DOS lineas a proposito, no por accidente. Los tres datos
            —hotel, ciudad y fecha— no entran en una sola en un telefono de
            375px: el ancho util es 335px y la version mas corta que los
            tiene a los tres pide 338. Medi seis combinaciones antes de
            partirlo. A 12px las dos lineas piden 303 y 284, con margen.

            Sale "Edicion 01" de aca: ya no entra y ademas abre la seccion
            de acceso, que es donde significa algo. Y sale "Organiza Deenex":
            quien organiza tiene su propia seccion mas abajo.
          -->
          <p class="rotulo text-acento-texto text-[12px] leading-[1.7] sm:text-[13px]">
            {{ EVENTO.venue }} · {{ EVENTO.ciudad }}<br />
            {{ EVENTO.fechaLarga }}
          </p>

          <h1 class="display mt-5 text-[clamp(2.6rem,8.5vw,6.5rem)]">
            {{ EVENTO.nombre }}
          </h1>

          <!--
            Antes había dos bajadas seguidas: una rosa con la categoría y otra
            gris con la promesa. La categoría pasó a la línea de datos de abajo
            y queda una sola frase, que es la que tiene que leerse.
          -->
          <!--
            El acento cae en "centrada en gastronomía": eso es lo que separa
            esto de un evento de tecnología cualquiera, y es lo que el lector
            todavía no sabe cuando llega.
          -->
          <p class="mt-5 max-w-[30ch] text-[clamp(1.35rem,3.2vw,2.1rem)] font-black uppercase leading-[1.08] tracking-[-0.02em]">
            El primer evento de tecnología
            <span class="text-acento-texto">centrada en gastronomía.</span>
          </p>

          <p class="mt-5 max-w-[46ch] text-[17px] leading-[1.5] font-medium text-gris sm:text-[19px]">
            El espacio donde vas a encontrar innovación, tecnología y conceptos para aplicar
            adentro de tu cadena gastronómica.
          </p>

          <div class="mt-8 flex flex-wrap items-center gap-3">
            <a href="#reservar" class="btn" @click.prevent="ir('reservar')">{{
              agotado ? "Entrar a la lista" : "Quiero mi lugar"
            }}</a>
            <a href="#jornada" class="btn-linea" @click.prevent="ir('jornada')">Ver el programa</a>
          </div>

          <!--
            La cuenta regresiva, pegada al botón.

            Estaba adentro del panel de la derecha, a 80px, y era el elemento
            más grande de esa columna: presionaba sin que nadie hubiera
            decidido nada todavía. Acá presiona en el único momento en que
            sirve, que es cuando el lector ya tiene el botón a la vista, y a
            un tamaño que no le compite al titular.
          -->
          <p class="mt-6 flex items-baseline gap-2.5">
            <span
              v-if="estado === 'faltan'"
              class="font-black tabular-nums leading-none tracking-[-0.04em] text-acento-texto text-[clamp(1.9rem,4.2vw,2.6rem)]"
              >{{ dias }}</span
            >
            <span
              v-else
              class="font-black uppercase leading-none tracking-[-0.03em] text-acento-texto text-[clamp(1.4rem,3.4vw,1.9rem)]"
              >{{ estado === "hoy" ? "Es hoy" : "Ya pasó" }}</span
            >
            <span
              v-if="estado === 'faltan'"
              class="text-[13px] font-black uppercase tracking-[0.16em] text-gris"
              >{{ dias === 1 ? "día" : "días" }} para el evento</span
            >
          </p>

          <p class="mt-5 text-[14px] leading-[1.5] text-gris">
            Entrada sin costo con reserva previa · Se reserva por WhatsApp, sin formularios
          </p>
        </div>

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
