<template>
  <!--
    La objeción de frente. Ninguna landing del rubro tiene esta sección
    porque ninguna la necesita: Hotelga y FITHEP van de 13 a 20, HIP y
    Alimentaria de lunes a miércoles. Es nuestra mayor barrera y también
    lo único que le da punto de vista a la página.
  -->
  <section id="domingo" class="border-b border-linea bg-tinta py-16 text-papel sm:py-24">
    <div class="contenedor">
      <div class="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
        <div>
          <p class="rotulo text-violeta-claro">La pregunta que todos hacen</p>
          <h2 class="titulo mt-5 max-w-[17ch] text-[clamp(1.9rem,5vw,3.2rem)]">
            {{ DOMINGO.titulo }}
          </h2>
        </div>

        <div class="lg:pt-16">
          <p
            v-for="(p, i) in DOMINGO.cuerpo"
            :key="i"
            class="lectura text-[17px] leading-[1.6] text-papel/75"
            :class="i > 0 ? 'mt-5' : ''"
          >
            {{ p }}
          </p>

          <p class="lectura mt-7 border-l-2 border-violeta-claro pl-5 text-[17px] font-semibold">
            {{ DOMINGO.salida }}
          </p>

          <!-- Captura secundaria para el que igual no puede venir -->
          <div class="mt-9 border border-white/15 p-6">
            <p class="text-[16px] leading-[1.5] text-papel/70">
              ¿No llegás de ninguna manera? Dejanos tu mail y te mandamos el material del día.
            </p>
            <a
              :href="whatsappMaterial"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-4 inline-flex min-h-[48px] items-center text-[16px] font-bold text-violeta-claro underline underline-offset-4"
            >
              Avisame por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { DOMINGO, WHATSAPP_ORGANIZADOR } from "@/data/evento";

const whatsappMaterial =
  `https://wa.me/${WHATSAPP_ORGANIZADOR}?text=` +
  encodeURIComponent(
    "Hola! No puedo ir el 20 de septiembre pero me interesa el material del día. Mi marca es ____."
  );
</script>
