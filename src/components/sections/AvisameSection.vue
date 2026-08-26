<template>
  <!--
    Para el que llegó hasta acá y todavía no reservó. Antes pedía el mail y lo
    mandaba a un endpoint que no existe: prometía un aviso que nadie podía
    cumplir. Ahora abre el mismo chat que todo lo demás, con un asunto propio,
    así el que escribe queda en una conversación real en vez de en una lista
    que no existe.

    No es la misma acción que reservar y por eso no lleva el botón lleno: el
    que toca acá está diciendo "todavía no", y ofrecerle el botón de reservar
    sería no haberlo escuchado.
  -->
  <section id="avisame" class="border-y border-white/10 bg-noche-3 py-14">
    <div class="contenedor">
      <div class="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
        <div>
          <h2 class="titulo max-w-[18ch] text-[clamp(1.5rem,3.6vw,2.3rem)]">
            ¿Todavía no te decidís?
          </h2>
          <p class="mt-4 max-w-[54ch] text-[16px] leading-[1.55] text-gris">
            Te escribimos cuando anunciemos los oradores que faltan. Ojo con una cosa: esto no
            guarda tu lugar. El cupo se toma por orden de llegada, y si para cuando te decidas ya
            entraron {{ total }}, quedás en la lista de espera.
          </p>
        </div>

        <a
          :href="whatsappAvisos"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-linea shrink-0"
        >
          Avisame quién más habla
          <span class="sr-only"> (abre WhatsApp en una pestaña nueva)</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { linkWa } from "@/data/evento";
import { useCupo } from "@/composables/useCupo";

const { total } = useCupo();
const whatsappAvisos = linkWa("avisos");
</script>
