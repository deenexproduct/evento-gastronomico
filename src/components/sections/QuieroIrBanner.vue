<template>
  <section class="border-b border-linea bg-white/5 py-12">
    <div class="contenedor">
      <div class="flex flex-wrap items-center justify-between gap-8">
        <div>
          <p class="rotulo text-acento-texto">
            {{ agotado ? "Cupo completo" : `Quedan ${restantes} de ${total} lugares` }}
          </p>
          <h2 class="titular mt-3 max-w-[24ch] text-[clamp(1.4rem,2.8vw,2.1rem)]">
            Faltan {{ dias }} días y el salón tiene un límite.
          </h2>
          <p class="mt-3 max-w-[54ch] text-[0.95rem] leading-[1.6] text-gris">
            Registrarte lleva un minuto y te asegura la entrada y los beneficios de todos los
            partners.
          </p>
        </div>

        <a href="#registro" class="btn shrink-0" @click.prevent="ir('registro')">Reservar mi lugar</a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { EVENTO } from "@/data/evento";
import { useCupo } from "@/composables/useCupo";

const { total, restantes, agotado } = useCupo();

const dias = computed(() =>
  Math.max(0, Math.ceil((new Date(EVENTO.fechaISO).getTime() - Date.now()) / 86400000))
);

function ir(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
</script>
