<template>
  <section id="speakers" class="border-b border-linea py-20 sm:py-28">
    <div class="contenedor">
      <div class="grid gap-8 lg:grid-cols-12">
        <div class="lg:col-span-3">
          <p class="rotulo text-violeta-texto">Oradores</p>
        </div>
        <div class="lg:col-span-9">
          <h2 class="titular max-w-[16ch] text-[clamp(1.9rem,4vw,3.2rem)]">
            Las voces confirmadas.
          </h2>
          <p class="mt-6 max-w-[58ch] text-[1.02rem] leading-[1.65] text-gris">
            Alan Tapia es el hilo conductor: abre, presenta a cada orador, modera la mesa redonda y
            cierra. La grilla sigue creciendo — acá solo aparece lo que ya está cerrado.
          </p>
        </div>
      </div>

      <!-- Alan -->
      <article class="mt-14 grid gap-10 border-t border-linea pt-10 lg:grid-cols-12">
        <div class="lg:col-span-4">
          <div class="aspect-[4/5] w-full overflow-hidden bg-papel-2">
            <FotoSlot
              :src="fotoAlan"
              alt="Alan Tapia, founder y CEO de Deenex"
              etiqueta="Foto de Alan Tapia"
              posicion="object-top"
            />
          </div>
        </div>

        <div class="lg:col-span-8">
          <p class="rotulo text-violeta-texto">Tres bloques · todo el día en escena</p>
          <h3 class="titular mt-4 text-[clamp(1.8rem,3.4vw,2.8rem)]">{{ alan.nombre }}</h3>
          <p class="rotulo mt-2 text-gris">{{ alan.rol }}</p>

          <p class="mt-7 max-w-[46ch] border-l-2 border-violeta pl-5 text-[1.05rem] leading-[1.55]">
            “{{ alan.frase }}”
          </p>

          <p class="mt-6 max-w-[58ch] text-[0.97rem] leading-[1.65] text-gris">{{ alan.bio }}</p>

          <ol class="mt-8 border-t border-linea">
            <li
              v-for="(charla, i) in alan.charlas"
              :key="i"
              class="flex gap-5 border-b border-linea py-3.5 text-[0.95rem]"
            >
              <span class="rotulo shrink-0 pt-1 text-violeta-texto">0{{ i + 1 }}</span>
              <span class="leading-snug">{{ charla }}</span>
            </li>
          </ol>
        </div>
      </article>

      <!-- El resto -->
      <div class="mt-12 grid gap-x-8 gap-y-12 border-t border-linea pt-12 sm:grid-cols-3">
        <article v-for="s in otros" :key="s.id">
          <div class="aspect-[4/3] w-full overflow-hidden bg-papel-2">
            <FotoSlot :src="fotos[s.id]" :alt="s.nombre" :etiqueta="`Foto · ${s.nombre}`" />
          </div>

          <p class="rotulo mt-5 text-violeta-texto">Confirmado</p>
          <h3 class="titular mt-2.5 text-[1.25rem]">{{ s.nombre }}</h3>
          <p class="rotulo mt-2 text-gris">{{ s.rol }}</p>
          <p class="mt-4 text-[0.93rem] leading-[1.62] text-gris">{{ s.bio }}</p>
        </article>
      </div>

      <p class="mt-12 border-t border-linea pt-6 text-[0.9rem] text-gris">
        Se están sumando más voces al escenario. Los anuncios salen a medida que se cierran.
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
const fotos = computed(() => Object.fromEntries(otros.value.map((s) => [s.id, resolver(s.foto)])));
</script>
