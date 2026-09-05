<template>
  <!--
    El pie cierra con la empresa, no con el evento.

    Antes era una segunda portada: el nombre del evento a 5rem, la fecha, el
    cupo y otro botón de reserva. Repetía entera la primera pantalla justo
    después de la sección que ya pide la reserva, y el botón era la quinta
    instancia del mismo CTA. Lo que falta al final del scroll no es volver a
    invitar: es saber quién armó esto.

    El CTA no se pierde: la barra flotante acompaña todo el scroll y el panel
    de registro está inmediatamente arriba.
  -->
  <footer class="piso-flotante border-t border-linea bg-noche-3 py-14 sm:py-16">
    <div class="contenedor">
      <div>
        <!-- La marca -->
        <div>
          <!--
            El wordmark es tipográfico hasta que exista el archivo: el logo de
            Deenex —la D con nodos conectados— no está en este repo ni en el de
            materiales. Cuando aparezca el SVG, entra acá y sale el <p>.
          -->
          <p class="marca-deenex">Deenex</p>

          <p class="mt-5 max-w-[34ch] text-[1.05rem] font-semibold leading-[1.35]">
            Tecnología e infraestructura para gastronómicos
          </p>
          <p class="mt-2.5 max-w-[38ch] text-[0.95rem] leading-[1.5] text-gris">
            Incrementá la recurrencia y cuidá tu cartera de clientes
          </p>
        </div>

      </div>

      <!--
        El contacto, que se había perdido al reordenar el pie. Es la única
        salida a WhatsApp que no pide nada: para el que tiene una duda y no
        quiere reservar todavía.
      -->
      <nav class="mt-8 flex flex-wrap items-center gap-x-6" aria-label="Contacto">
        <a
          :href="whatsappConsulta"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex min-h-[44px] items-center text-[0.9rem] text-gris transition-colors hover:text-acento-texto"
          >Escribinos por WhatsApp<span class="sr-only"> (abre en una pestaña nueva)</span></a
        >
        <a
          href="https://deenex.tech/"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex min-h-[44px] items-center text-[0.9rem] text-gris transition-colors hover:text-acento-texto"
          >deenex.tech<span class="sr-only"> (abre en una pestaña nueva)</span></a
        >
      </nav>

      <p class="mt-8 pt-6 text-[12px] tracking-[0.08em] text-gris-2">
        © {{ anio }} Deenex.tech · {{ EVENTO.ciudad }}
      </p>
    </div>
  </footer>
</template>

<script setup>
import { EVENTO, linkWa } from "@/data/evento";

const anio = new Date().getFullYear();
const whatsappConsulta = linkWa("consulta");
</script>

<style scoped>
/*
  El wordmark de la empresa, no el del evento: por eso NO usa .display, que es
  Panchang y está reservada al nombre del evento y al reloj. Acá pesa el
  cuerpo, no la display — el pie cierra, no abre.
*/
.marca-deenex {
  font-size: clamp(1.5rem, 4vw, 1.9rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1;
  color: var(--acento-texto, #4f42c4);
}
</style>
