<template>
  <!--
    El pie cierra con el evento y con nada más: el nombre y su bajada,
    centrados, en una banda baja.

    Cerraba con "Deenex" y sus dos bajadas comerciales —"Tecnología e
    infraestructura para gastronómicos", "Incrementá la recurrencia y cuidá tu
    cartera de clientes"—, que son la promesa que Deenex le hace a un cliente,
    no la del día que se está invitando. El que llega hasta acá scrolleó la
    página entera: lo último que lee tiene que ser de qué se trata el sábado.
    Quién lo organiza sigue dicho en el "by Deenex" de la cabecera, que está en
    todas las pantallas.

    LO QUE SE FUE ACÁ, Y HAY QUE SABERLO: el enlace "Escribinos por WhatsApp"
    era la única salida a WhatsApp que no pedía nada, para el que tiene una
    duda y todavía no quiere reservar. Y como la barra flotante sólo se monta
    en la home (BarraFija vive bajo v-if="esHome" en App.vue), en /que-es y
    /beneficios ese enlace era el ÚLTIMO acceso a WhatsApp que quedaba en
    pantalla. Al sacarlo, esas dos vistas se quedan sin ninguno. Si eso se
    quiere recuperar sin devolver el enlace al pie, el lugar es la píldora del
    nav (Navbar.vue), que hoy apunta a /deadline y no a wa.me.

    Sigue sin ser una segunda portada, que es el error que este pie ya cometió
    una vez: no hay fecha, ni cupo, ni un quinto botón de reserva.
  -->
  <footer class="piso-flotante border-t border-linea bg-noche-3 py-6 sm:py-7">
    <div class="contenedor text-center">
      <!--
        En Panchang, la del titular, pero dada vuelta en lo que esa clase trae
        de portada: peso 400 contra el 800 del hero y caja mixta contra
        versales. Ver el bloque de .marca-evento abajo.
      -->
      <p class="marca-evento display">{{ EVENTO.nombre }}</p>

      <!--
        26ch y no 38: a 38 la bajada entraba en un solo renglón largo y el pie
        se leía como una banda que cruza la pantalla de lado a lado. A 26 corta
        en dos y el cierre queda como un bloque angosto y centrado, del ancho
        del nombre que tiene encima.

        text-balance reparte las dos líneas parejas en vez de dejar una llena y
        una corta. Sin soporte, el max-w solo ya deja el bloque angosto: el
        balanceo es la mejora, no la condición.
      -->
      <p class="mx-auto mt-2 max-w-[26ch] text-balance text-[0.9rem] leading-[1.45] text-gris">
        {{ EVENTO.bajada }}
      </p>
    </div>
  </footer>
</template>

<script setup>
import { EVENTO } from "@/data/evento";
</script>

<style scoped>
/*
  El wordmark del evento. Usa .display por la familia —Panchang, la misma del
  hero— pero le da vuelta las dos cosas que esa clase trae y que acá sobran:
  el peso 800 y las versales.

  Las dos son de portada, y en el pie pesan de más. Medido a cuerpo 24 con la
  fuente ya cargada: en 800 y versales mide 277,1 px, y en 400 y caja mixta
  222,6 — el de portada es un 24,5% más ancho. El bloque quedaba tan macizo
  como el titular del hero, quince pantallas después de que el hero ya hizo
  ese trabajo.

  Panchang viene de Fontshare con los pesos 400 a 800 (index.html), así que el
  400 no agrega una descarga: ya está en la hoja que la página pide igual.

  Cierra en vez de abrir por tres vías a la vez, no por el cuerpo solo: peso
  400 contra el 800 del hero, caja mixta contra versales, y 1,4rem de techo
  contra los 6rem del titular.
*/
.marca-evento {
  font-size: clamp(1.15rem, 2.8vw, 1.4rem);
  font-weight: 400;
  text-transform: none;
  letter-spacing: -0.005em;
  line-height: 1;
  color: var(--acento-texto, #4f42c4);
}
</style>
