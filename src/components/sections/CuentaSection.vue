<template>
  <!--
    Réplica del bloque de cuenta regresiva del referente, que muestra "03
    MESES" en grande. Acá faltan días, así que la unidad es el día — y en la
    última semana el número solo se vuelve más urgente sin tocar nada.
  -->
  <section class="bg-noche py-seccion">
    <div class="contenedor text-center">
      <p class="rotulo text-acento-texto">Domingo 20 de septiembre · Córdoba</p>

      <h2 class="titulo mx-auto mt-6 max-w-[20ch] text-[clamp(1.6rem,4.6vw,2.8rem)]">
        Falta cada vez menos para GastroTech
      </h2>

      <div class="mt-12 flex items-end justify-center gap-4 sm:gap-6">
        <div>
          <p
            class="late font-black leading-[0.8] tabular-nums tracking-[-0.05em] text-acento text-[clamp(5rem,22vw,12rem)]"
          >
            {{ String(dias).padStart(2, "0") }}
          </p>
          <p class="mt-4 text-[13px] font-black uppercase tracking-[0.2em] text-gris">
            {{ dias === 1 ? "día" : "días" }}
          </p>
        </div>
      </div>

      <a href="#registro" class="btn mt-12" @click.prevent="ir('registro')">Quiero mi lugar</a>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { EVENTO } from "@/data/evento";

const dias = computed(() =>
  Math.max(0, Math.ceil((new Date(EVENTO.fechaISO).getTime() - Date.now()) / 86400000))
);

function ir(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
</script>

<style scoped>
/* El número late, como en el referente. */
.late { animation: latir 2.6s ease-in-out infinite; }
@keyframes latir {
  0%, 100% { opacity: 1; }
  50% { opacity: .72; }
}
@media (prefers-reduced-motion: reduce) {
  .late { animation: none; }
}
</style>
