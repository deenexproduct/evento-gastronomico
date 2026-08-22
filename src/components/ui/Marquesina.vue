<template>
  <div
    class="overflow-hidden border-y-[3px] border-ink"
    :class="oscuro ? 'bg-ink text-lima' : 'bg-lima text-ink'"
  >
    <div class="marquesina" :class="{ 'marquesina-rapida': rapida }" aria-hidden="true">
      <!-- Duplicado exacto: el keyframe corre -50%, así el loop no salta. -->
      <div v-for="copia in 2" :key="copia" class="flex shrink-0 items-center gap-8 py-3 pr-8">
        <template v-for="(item, i) in items" :key="`${copia}-${i}`">
          <span class="titular whitespace-nowrap text-[1.15rem] sm:text-[1.4rem]">{{ item }}</span>
          <span class="text-[1.1rem] opacity-50">✦</span>
        </template>
      </div>
    </div>
    <span class="sr-only">{{ items.join(". ") }}</span>
  </div>
</template>

<script setup>
defineProps({
  items: { type: Array, required: true },
  oscuro: { type: Boolean, default: false },
  rapida: { type: Boolean, default: false },
});
</script>
