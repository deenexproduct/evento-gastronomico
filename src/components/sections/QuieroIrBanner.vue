<template>
  <section class="border-y-[3px] border-ink" :class="critico ? 'bg-fuego text-white' : 'bg-lima text-ink'">
    <div class="flex flex-col gap-8 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p class="kicker opacity-70">
          {{ agotado ? "Cupo completo" : `Quedan ${restantes} de ${total} lugares` }}
        </p>
        <h2 class="titular mt-4 max-w-[18ch] text-[clamp(1.9rem,5.4vw,3.6rem)]">
          Faltan {{ dias }} días y el salón tiene un límite.
        </h2>
        <p class="mt-4 max-w-[52ch] text-[1rem] leading-[1.55] opacity-75">
          Registrarte lleva un minuto y te asegura la entrada, los beneficios de los partners y tu
          reunión de diagnóstico.
        </p>
      </div>

      <a
        href="#registro"
        class="shrink-0 self-start"
        :class="critico ? 'btn-cartel' : 'btn-cartel-inv'"
        @click.prevent="ir('registro')"
      >
        Reservar mi lugar
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M2 8h11M9 3.5L13.5 8 9 12.5"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </a>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { EVENTO } from "@/data/evento";
import { useCupo } from "@/composables/useCupo";

const { total, restantes, agotado, critico } = useCupo();

const dias = computed(() =>
  Math.max(0, Math.ceil((new Date(EVENTO.fechaISO).getTime() - Date.now()) / 86400000))
);

function ir(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
</script>
