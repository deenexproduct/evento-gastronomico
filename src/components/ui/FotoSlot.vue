<template>
  <!-- Foto cargada -->
  <img
    v-if="src"
    :src="src"
    :alt="alt"
    class="h-full w-full object-cover"
    :class="posicion"
    loading="lazy"
  />

  <!-- Pendiente: marca el hueco sin romper el diseño -->
  <div
    v-else
    class="foto-pendiente flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center"
  >
    <svg
      class="h-7 w-7 text-acento-texto/45"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.4"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <circle cx="8.5" cy="10" r="1.5" />
      <path d="M21 16l-5-5-4 4-2-2-7 6" />
    </svg>
    <span class="rotulo text-gris">{{ etiqueta }}</span>
  </div>
</template>

<script setup>
defineProps({
  /** URL de la foto. Sin esto se muestra el placeholder. */
  src: { type: String, default: "" },
  alt: { type: String, default: "" },
  /** Qué foto va acá. Se muestra en el placeholder. */
  etiqueta: { type: String, default: "Foto pendiente" },
  /** object-position, para retratos que necesitan encuadre alto. */
  posicion: { type: String, default: "object-center" },
});
</script>
