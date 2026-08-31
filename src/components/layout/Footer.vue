<template>
  <!--
    El pie cierra con la empresa, no con el evento.

    Antes era una segunda portada: el nombre GastroTech a 5rem, la fecha, el
    cupo y otro botón de reserva. Repetía entera la primera pantalla justo
    después de la sección que ya pide la reserva, y el botón era la quinta
    instancia del mismo CTA. Lo que falta al final del scroll no es volver a
    invitar: es saber quién armó esto.

    El CTA no se pierde: la barra flotante acompaña todo el scroll y el panel
    de registro está inmediatamente arriba.
  -->
  <footer class="piso-flotante border-t border-linea bg-noche-3 py-14 sm:py-16">
    <div class="contenedor">
      <!--
        Las preguntas cierran la pagina. Vivian dentro de /que-es, cerradas y
        a cuatro pantallas de scroll de una vista que hay que abrir a proposito:
        la pieza que mejor resuelve dudas era la que menos se leia. Aca las ve
        cualquiera que llegue al final, entre por donde entre.
      -->
      <FAQSection en-pie />

      <div class="mt-14 border-t border-linea pt-12">
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

      <p class="mt-10 pt-6 text-[12px] tracking-[0.08em] text-gris-2">
        © {{ anio }} Deenex.tech · {{ EVENTO.ciudad }}
      </p>
    </div>
  </footer>
</template>

<script setup>
import { EVENTO } from "@/data/evento";
import FAQSection from "@/components/sections/FAQSection.vue";

const anio = new Date().getFullYear();
</script>

<style scoped>
/*
  El wordmark de la empresa, no el del evento: por eso NO usa .display, que es
  Panchang y está reservada al nombre de GastroTech y al reloj. Acá pesa el
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
