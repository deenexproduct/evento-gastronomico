<template>
  <!--
    El pie es una tarjeta que flota sobre un zócalo pintado, con aire arriba y
    abajo. Dos reglas que no se pueden romper:

    1. El zócalo carga la reserva de altura de la barra flotante
       (.piso-flotante), así que HomeView ya no lleva su padding propio. Si
       ese padding vuelve, aparece una franja del color del cuerpo debajo del
       zócalo y la píldora queda flotando sobre ella en vez de sobre el pie.

    2. Cero reglas de color nuevas. El zócalo va con bg-noche-3 y la tarjeta
       con bg-noche, dos clases que el tema claro ya pisa: da #EFEDEA sobre
       #FFFFFF en claro, y #0A0A0A sobre #1A1A1A en oscuro. La tarjeta es la
       más clara de las dos en los dos temas, así que "flota" se sostiene sin
       escribir una línea de CSS.
       Y nunca prefijar una clase de COLOR con sm:/lg: — `sm:bg-noche/95` es
       otro token y el tema claro no lo alcanza. Los prefijos van solo sobre
       geometría.
  -->
  <footer class="piso-flotante bg-noche-3 pt-12 sm:pt-16">
    <div class="contenedor">
      <div
        class="tarjeta-pie rounded-[28px] border border-white/10 bg-noche px-6 py-8 sm:rounded-[44px] sm:px-12 sm:py-12"
      >
        <!-- El nombre y la fecha como objetos gráficos, no como pie de página.
             Lo que hace que esto no parezca un footer más es la escala. -->
        <div class="flex flex-wrap items-end justify-between gap-x-8 gap-y-2">
          <p class="display text-[clamp(2rem,7.5vw,5rem)]">{{ EVENTO.nombre }}</p>
          <p class="hora text-[clamp(1.4rem,4.2vw,2.6rem)] text-acento-texto">
            {{ EVENTO.fechaNumerica }}
          </p>
        </div>

        <!-- La grilla entra recién en lg: a 640px cada tercio mide ~180px y
             "Reservar mi lugar" en Archivo 900 no entra en una línea. -->
        <div class="mt-9 grid gap-8 lg:mt-11 lg:grid-cols-12 lg:gap-10">
          <p class="text-[0.9rem] leading-[1.6] text-gris lg:col-span-3">
            {{ EVENTO.venue }} · {{ EVENTO.ciudad }}<br />
            {{ EVENTO.fechaSinDia }} · {{ EVENTO.horario }}
          </p>

          <!-- Los enlaces en una fila, sin encabezados de columna: esto es el
               pie de una página de un solo scroll, no un mapa del sitio. Los
               dos rótulos existían para justificar una grilla y en teléfono
               costaban 71px de alto.

               Son siete y por eso esta columna se lleva cinco doceavos: con
               cuatro, "Preguntas" y "deenex.tech" caían a una cuarta fila. -->
          <nav class="flex flex-wrap items-center gap-x-6 lg:col-span-5" aria-label="Pie">
            <a
              v-for="l in enlaces"
              :key="l.id"
              :href="`#${l.id}`"
              class="inline-flex min-h-[44px] items-center text-[0.9rem] text-gris transition-colors hover:text-acento-texto"
              @click.prevent="ir(l.id)"
              >{{ l.label }}</a
            >
            <a
              :href="whatsappConsulta"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex min-h-[44px] items-center text-[0.9rem] text-gris transition-colors hover:text-acento-texto"
              >WhatsApp<span class="sr-only"> (abre en una pestaña nueva)</span></a
            >
            <a
              href="https://deenex.tech/"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex min-h-[44px] items-center text-[0.9rem] text-gris transition-colors hover:text-acento-texto"
              >deenex.tech<span class="sr-only"> (abre en una pestaña nueva)</span></a
            >
          </nav>

          <!-- order-first: en teléfono el botón sube y queda justo debajo del
               nombre, antes de los enlaces. El pulgar lo encuentra sin pasar
               por nada. `order` funciona en grid, no solo en flex. -->
          <div class="order-first lg:order-none lg:col-span-4">
            <p class="rotulo text-gris">Entrada sin costo · {{ total }} lugares</p>
            <a
              :href="whatsappRegistro"
              target="_blank"
              rel="noopener noreferrer"
              class="btn mt-4 w-full lg:max-w-[300px]"
            >
              {{ agotado ? "Anotarme en la lista" : "Reservar mi lugar" }}
              <span class="sr-only"> (abre WhatsApp en una pestaña nueva)</span>
            </a>
            <p class="mt-3 text-[0.8rem] leading-snug text-gris">
              Se abre WhatsApp con el mensaje escrito.
            </p>
          </div>
        </div>
      </div>

      <!-- La firma legal va fuera de la tarjeta, apoyada sobre el zócalo:
           saca una cosa más de adentro y despega más la tarjeta. La fecha ya
           no se repite acá, está arriba en tamaño de figura. -->
      <p class="rotulo mt-6 text-center text-gris">
        © {{ anio }} Deenex Technologies · {{ EVENTO.ciudad }}
      </p>
    </div>
  </footer>
</template>

<script setup>
import { EVENTO, NAV_ENLACES as enlaces, linkWa } from "@/data/evento";
import { useCupo } from "@/composables/useCupo";

const { total, agotado } = useCupo();
const anio = new Date().getFullYear();

const whatsappRegistro = linkWa("registro");
const whatsappConsulta = linkWa("consulta");

function ir(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
</script>
