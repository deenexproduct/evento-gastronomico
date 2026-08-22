<template>
  <footer class="py-14">
    <div class="contenedor">
      <div class="grid gap-10 lg:grid-cols-12">
        <div class="lg:col-span-4">
          <p class="text-[1rem] font-semibold tracking-[-0.02em]">El evento de Deenex</p>
          <p class="mt-3 max-w-[40ch] text-[0.9rem] leading-[1.65] text-gris">
            Un día de gastronomía y tecnología para dueños de marcas gastronómicas y restaurantes.
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
                    >WhatsApp</a
                  >
                </li>
                <li>
                  <a
                    href="https://deenex.tech/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex min-h-[44px] items-center text-[0.9rem] text-gris transition-colors hover:text-acento-texto"
                    >deenex.tech</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div class="lg:col-span-3">
          <a href="#registro" class="btn w-full" @click.prevent="ir('registro')">Reservar mi lugar</a>
        </div>
      </div>

      <div
        class="mt-12 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row"
      >
        <span class="rotulo text-gris">© {{ anio }} Deenex Technologies · Córdoba</span>
        <span class="rotulo text-gris">{{ EVENTO.fechaCorta }}</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { EVENTO, WHATSAPP_ORGANIZADOR } from "@/data/evento";

const anio = new Date().getFullYear();

const enlaces = [
  { id: "temas", label: "Programa" },
  { id: "speakers", label: "Oradores" },
  { id: "jornada", label: "La jornada" },
  { id: "para-quien", label: "Para quién es" },
  { id: "lugar", label: "El lugar" },
  { id: "faq", label: "Preguntas" },
];

const whatsapp =
  `https://wa.me/${WHATSAPP_ORGANIZADOR}?text=` +
  encodeURIComponent("Hola! Tengo una consulta sobre el evento de Deenex del 20 de septiembre.");

function ir(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
</script>
