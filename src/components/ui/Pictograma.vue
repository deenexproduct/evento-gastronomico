<template>
  <svg
    :width="tam"
    :height="tam"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="grosor"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <template v-if="nombre === 'charla'">
      <!-- Micrófono de mano: una charla es alguien hablando -->
      <rect x="9" y="2.5" width="6" height="11" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0" />
      <path d="M12 17.5V21M8.5 21h7" />
    </template>

    <template v-else-if="nombre === 'demo'">
      <!-- Pantalla con cursor: algo funcionando, no slides -->
      <rect x="2.5" y="4" width="19" height="12.5" rx="1.5" />
      <path d="M8 20.5h8M12 16.5v4" />
      <path d="M9.5 8.5l3 2.5-3 2.5" />
    </template>

    <template v-else-if="nombre === 'degustacion'">
      <!-- Copa: la ronda entre bloques -->
      <path d="M6 3h12l-1 5.5a5 5 0 0 1-10 0L6 3Z" />
      <path d="M12 14v6M8 20.5h8" />
    </template>

    <template v-else-if="nombre === 'mesa'">
      <!-- Mesa redonda vista de arriba, con sus lugares -->
      <circle cx="12" cy="12" r="5" />
      <path d="M12 3.2v1.6M12 19.2v1.6M3.2 12h1.6M19.2 12h1.6" />
      <path d="M5.9 5.9l1.1 1.1M17 17l1.1 1.1M18.1 5.9L17 7M7 17l-1.1 1.1" />
    </template>

    <template v-else-if="nombre === 'lugar'">
      <!-- Pin de mapa -->
      <path d="M12 21.5s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z" />
      <circle cx="12" cy="10.5" r="2.5" />
    </template>

    <template v-else-if="nombre === 'auto'">
      <!-- Auto: dónde estaciono, que es causa real de no ir -->
      <path d="M3 12.5l1.8-5A2 2 0 0 1 6.7 6h10.6a2 2 0 0 1 1.9 1.5l1.8 5" />
      <path d="M2.5 12.5h19V17a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-1h-12v1a1 1 0 0 1-1 1H3.5a1 1 0 0 1-1-1v-4.5Z" />
      <path d="M6 15h.01M18 15h.01" />
    </template>

    <template v-else-if="nombre === 'reloj'">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6.8V12l3.4 2" />
    </template>

    <template v-else-if="nombre === 'calendario'">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </template>

    <template v-else-if="nombre === 'entrada'">
      <!-- Ticket con muesca: el acceso -->
      <path d="M3 8.5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1.8a2.2 2.2 0 0 0 0 4.4v1.8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1.8a2.2 2.2 0 0 0 0-4.4V8.5Z" />
      <path d="M14 7.5v2M14 11.5v2M14 15.5v2" />
    </template>

    <template v-else-if="nombre === 'gente'">
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.8 19.5a6.2 6.2 0 0 1 12.4 0" />
      <path d="M16.5 5.4a3.2 3.2 0 0 1 0 5.2M17.6 14.2a6.2 6.2 0 0 1 3.6 5.3" />
    </template>

    <template v-else-if="nombre === 'check'">
      <path d="M4 12.5l5 5L20 6.5" />
    </template>

    <template v-else-if="nombre === 'cruz'">
      <path d="M6 6l12 12M18 6L6 18" />
    </template>

    <template v-else-if="nombre === 'flecha'">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </template>
  </svg>
</template>

<script setup>
/**
 * Pictogramas propios, de trazo grueso y dibujados para este proyecto.
 * No es un icon set genérico a propósito: la estética de librería es
 * justamente lo que hace que una página se lea como plantilla.
 *
 * Regla de uso: solo donde el ícono agrega información que el texto no da.
 * Ícono + título + texto diciendo lo mismo es redundancia, no refuerzo.
 */
defineProps({
  nombre: { type: String, required: true },
  tam: { type: [Number, String], default: 20 },
  grosor: { type: [Number, String], default: 1.8 },
});
</script>
