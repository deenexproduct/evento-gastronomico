<template>
  <section id="speakers" class="bg-hueso text-ink">
    <div class="px-5 py-16 sm:px-8 sm:py-20">
      <p class="kicker opacity-50">Quiénes hablan</p>
      <h2 class="titular mt-6 max-w-[13ch] text-[clamp(2.4rem,8vw,6rem)]">
        Las voces<br /><span class="text-fuego">confirmadas.</span>
      </h2>
      <p class="mt-8 max-w-[54ch] text-[1.02rem] leading-[1.6] text-ink/65">
        Alan Tapia es el hilo conductor: abre, presenta a cada speaker, modera la mesa redonda y
        cierra. La grilla sigue creciendo — acá solo aparece lo que ya está cerrado.
      </p>
    </div>

    <!-- Alan, a lo ancho -->
    <article class="grid border-y-[3px] border-ink lg:grid-cols-[minmax(0,420px)_1fr]">
      <div class="relative min-h-[380px] border-b-[3px] border-ink lg:border-b-0 lg:border-r-[3px]">
        <FotoSlot
          :src="fotoAlan"
          alt="Alan Tapia, founder y CEO de Deenex"
          etiqueta="Foto de Alan Tapia"
          posicion="object-top"
          oscuro
        />
        <span class="absolute left-0 top-0 bg-lima px-4 py-2 text-[0.68rem] font-black uppercase tracking-[0.16em] text-ink">
          3 charlas · todo el día en escena
        </span>
      </div>

      <div class="bg-ink p-8 text-white sm:p-12">
        <h3 class="titular text-[clamp(2.4rem,6vw,4.4rem)]">{{ alan.nombre }}</h3>
        <p class="kicker mt-3 text-lima">{{ alan.rol }}</p>

        <p class="mt-8 max-w-[46ch] border-l-[3px] border-lima pl-6 text-[1.05rem] font-medium italic leading-[1.5]">
          “{{ alan.frase }}”
        </p>

        <p class="mt-7 max-w-[56ch] text-[0.96rem] leading-[1.6] text-white/60">{{ alan.bio }}</p>

        <div class="mt-9">
          <p class="kicker text-white/40">Sus tres bloques</p>
          <ol class="mt-4 grid gap-[3px] bg-white/20">
            <li
              v-for="(charla, i) in alan.charlas"
              :key="i"
              class="flex gap-4 bg-ink py-4 text-[0.95rem] leading-snug"
            >
              <span class="titular w-8 shrink-0 text-lima">{{ i + 1 }}</span>
              <span class="pt-0.5">{{ charla }}</span>
            </li>
          </ol>
        </div>
      </div>
    </article>

    <!-- El resto -->
    <div class="grid gap-[3px] bg-ink sm:grid-cols-3">
      <article v-for="(s, i) in otros" :key="s.id" class="flex flex-col bg-hueso">
        <div class="relative h-[240px] border-b-[3px] border-ink">
          <FotoSlot :src="fotos[s.id]" :alt="s.nombre" :etiqueta="`Foto · ${s.nombre}`" oscuro />
          <span
            class="absolute left-0 top-0 px-3 py-1.5 text-[0.62rem] font-black uppercase tracking-[0.16em]"
            :class="i === 1 ? 'bg-fuego text-white' : 'bg-lima text-ink'"
          >
            Confirmado
          </span>
        </div>

        <div class="flex flex-1 flex-col p-7">
          <h3 class="titular text-[clamp(1.4rem,2.8vw,1.9rem)]">{{ s.nombre }}</h3>
          <p class="kicker mt-2.5 opacity-50">{{ s.rol }}</p>
          <p class="mt-5 flex-1 text-[0.92rem] leading-[1.6] text-ink/65">{{ s.bio }}</p>

          <div class="mt-6 flex flex-wrap gap-2 border-t-[3px] border-ink pt-5">
            <span
              v-for="(st, j) in s.stats"
              :key="j"
              class="bg-ink px-2.5 py-1.5 text-[0.7rem] font-bold text-white"
            >
              <span class="text-lima">{{ st.valor }}</span> {{ st.label }}
            </span>
          </div>
        </div>
      </article>
    </div>

    <div class="border-t-[3px] border-ink bg-hueso px-5 py-8 text-center sm:px-8">
      <p class="kicker text-fuego">
        ● Se están sumando más voces. Los anuncios salen a medida que se cierran.
      </p>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { SPEAKERS } from "@/data/evento";
import FotoSlot from "@/components/ui/FotoSlot.vue";

const archivos = import.meta.glob("@/assets/images/speakers/*", { eager: true, import: "default" });

function resolver(nombre) {
  if (!nombre) return "";
  const clave = Object.keys(archivos).find((k) => k.endsWith(`/${nombre}`));
  return clave ? archivos[clave] : "";
}

const alan = computed(() => SPEAKERS.find((s) => s.id === "alan"));
const otros = computed(() => SPEAKERS.filter((s) => s.id !== "alan"));
const fotoAlan = computed(() => resolver(alan.value?.foto));
const fotos = computed(() =>
  Object.fromEntries(otros.value.map((s) => [s.id, resolver(s.foto)]))
);
</script>
