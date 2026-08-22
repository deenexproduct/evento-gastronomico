<template>
  <!--
    El brief es explícito: una invitación rinde cuando la manda un colega, no
    la marca. Acá el mensaje ya está escrito para que el que entró solo tenga
    que apretar y elegir a quién. También resuelve el no-show con el calendario.
  -->
  <section id="pasala" class="border-b border-linea py-20 sm:py-24">
    <div class="contenedor">
      <div class="grid gap-8 lg:grid-cols-12">
        <div class="lg:col-span-3">
          <p class="rotulo text-violeta-texto">Antes de irte</p>
        </div>
        <div class="lg:col-span-9">
          <h2 class="titular max-w-[20ch] text-[clamp(1.7rem,3.4vw,2.6rem)]">
            Dos cosas que llevan diez segundos.
          </h2>
        </div>
      </div>

      <div class="mt-12 grid gap-10 border-t border-linea pt-10 lg:grid-cols-2 lg:gap-16">
        <!-- Agendar -->
        <div>
          <p class="rotulo text-gris">01 · Agendalo</p>
          <h3 class="titular mt-4 text-[1.3rem]">Que no se te pase.</h3>
          <p class="mt-4 max-w-[42ch] text-[0.95rem] leading-[1.65] text-gris">
            Faltan {{ dias }} días. Guardalo en el calendario ahora y te avisa solo el día
            anterior, con la dirección y el recordatorio del QR.
          </p>

          <div class="mt-6 flex flex-wrap gap-3">
            <a
              :href="CALENDARIO.google"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-linea text-[0.85rem]"
            >
              Google Calendar
            </a>
            <a :href="urlIcs" download="gastrotech.ics" class="btn-linea text-[0.85rem]">
              Apple o Outlook
            </a>
          </div>
        </div>

        <!-- Invitar -->
        <div class="border-t border-linea pt-10 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
          <p class="rotulo text-gris">02 · Pasásela a un colega</p>
          <h3 class="titular mt-4 text-[1.3rem]">Al que le sirve de verdad.</h3>
          <p class="mt-4 max-w-[42ch] text-[0.95rem] leading-[1.65] text-gris">
            Si conocés a alguien del rubro que está peleando lo mismo que vos, mandáselo. El
            mensaje ya está escrito: solo elegís a quién.
          </p>

          <blockquote
            class="mt-6 max-w-[46ch] border-l-2 border-violeta bg-papel-2 px-5 py-4 text-[0.9rem] leading-[1.6] text-gris"
          >
            <p v-for="(linea, i) in lineas" :key="i" :class="i > 0 ? 'mt-2.5' : ''">{{ linea }}</p>
          </blockquote>

          <a
            :href="urlWhatsapp"
            target="_blank"
            rel="noopener noreferrer"
            class="btn mt-6 text-[0.9rem]"
          >
            Pasarlo por WhatsApp
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M2 8h11M9 3.5L13.5 8 9 12.5"
                stroke="currentColor"
                stroke-width="1.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { EVENTO, CALENDARIO, INVITACION } from "@/data/evento";

const dias = computed(() =>
  Math.max(0, Math.ceil((new Date(EVENTO.fechaISO).getTime() - Date.now()) / 86400000))
);

// El .ics vive en public/, así que respeta el base path del build.
const urlIcs = import.meta.env.BASE_URL + CALENDARIO.ics;

const urlWhatsapp = computed(() => `https://wa.me/?text=${encodeURIComponent(INVITACION)}`);

/** El mensaje real, mostrado tal cual se va a enviar. */
const lineas = INVITACION.split("\n").filter((l) => l.trim());
</script>
