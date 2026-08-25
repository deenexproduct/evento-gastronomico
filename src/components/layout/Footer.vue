<template>
  <footer class="py-10">
    <div class="contenedor">
      <div class="grid gap-10 lg:grid-cols-12">
        <div class="lg:col-span-4">
          <p class="text-[1rem] font-semibold tracking-[-0.02em]">GastroTech</p>
          <p class="mt-3 max-w-[40ch] text-[0.9rem] leading-[1.65] text-gris">
            Un día de gastronomía y tecnología para dueños de cadenas gastronómicas.
            {{ EVENTO.fechaLarga }}, {{ EVENTO.venue }}, Córdoba.
          </p>
        </div>

        <nav class="lg:col-span-5" aria-label="Pie">
          <div class="grid grid-cols-2 gap-8">
            <div>
              <p class="rotulo text-gris">El evento</p>
              <ul class="mt-4 space-y-2.5">
                <li v-for="l in enlaces" :key="l.id">
                  <a
                    :href="`#${l.id}`"
                    class="inline-flex min-h-[44px] items-center text-[0.9rem] text-gris transition-colors hover:text-acento-texto"
                    @click.prevent="ir(l.id)"
                    >{{ l.label }}</a
                  >
                </li>
              </ul>
            </div>
            <div>
              <p class="rotulo text-gris">Contacto</p>
              <ul class="mt-4 space-y-2.5">
                <li>
                  <a
                    :href="whatsapp"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex min-h-[44px] items-center text-[0.9rem] text-gris transition-colors hover:text-acento-texto"
                    >WhatsApp<span class="sr-only"> (abre en una pestaña nueva)</span></a
                  >
                </li>
                <li>
                  <a
                    href="https://deenex.tech/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex min-h-[44px] items-center text-[0.9rem] text-gris transition-colors hover:text-acento-texto"
                    >deenex.tech<span class="sr-only"> (abre en una pestaña nueva)</span></a
                  >
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div class="lg:col-span-3">
          <a href="#registro" class="btn w-full" @click.prevent="ir('registro')">{{ agotado ? "Anotarme en la lista" : "Reservar mi lugar" }}</a>
        </div>
      </div>

      <div
        class="mt-8 flex flex-col justify-between gap-3 border-t border-white/10 pt-5 sm:flex-row"
      >
        <span class="rotulo text-gris">© {{ anio }} Deenex Technologies · Córdoba</span>
        <span class="rotulo text-gris">{{ EVENTO.fechaCorta }}</span>
      </div>

      <!--
        Bloque de descripción larga, como el "Sobre Food Delivery Day" del
        referente. Sirve para búsqueda orgánica y para que un asistente de IA
        pueda responder qué es este evento. Todo el contenido es verificable.
      -->
      <div class="mt-10 border-t border-white/10 pt-8">
        <h2 class="text-[13px] font-black uppercase tracking-[0.14em] text-gris">
          Sobre GastroTech
        </h2>
        <p class="mt-3 max-w-[80ch] text-[14px] leading-[1.65] text-gris-2">
          GastroTech es la jornada de gastronomía y tecnología de Deenex para dueños de cadenas
          gastronómicas. Domingo 20 de septiembre de 2026, de 9 a 18, en el Hotel Quinto Centenario
          de Córdoba. Siete bloques sobre costos entre locales, datos e inteligencia artificial,
          sistemas de punto de venta con demos en vivo y contenido de marca. Entrada libre con
          registro previo, cupo de 200 personas.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useCupo } from "@/composables/useCupo";

const { agotado } = useCupo();
import { EVENTO, linkWa } from "@/data/evento";

const anio = new Date().getFullYear();

const enlaces = [
  { id: "jornada", label: "Programa" },
  { id: "lugar", label: "El lugar" },
  { id: "faq", label: "Preguntas" },
];

const whatsapp = linkWa("consulta");

function ir(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
</script>
