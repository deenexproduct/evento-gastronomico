<template>
  <!--
    Quiénes hablan. Va después de "qué es" porque ése es el orden en que se
    pregunta: primero qué es esto, y recién cuando interesa, quién lo da.

    NO SE MONTA HASTA QUE HAYA MINIMO_SPEAKERS. La condición está en el v-if de
    HomeView y no acá adentro, para que una sección vacía ni siquiera entre al
    árbol. Es la misma decisión que tomó JornadaSection cuando sacó el
    cronograma hora por hora: con cuatro de diez bloques diciendo "orador por
    confirmar", el que escanea no lee cuatro nombres, lee seis huecos. Un
    speaker solo en una sección titulada "quiénes hablan" dice que hay uno.

    LA GRILLA SE ACOMODA SOLA a cuántos haya, y eso importa porque esta lista
    va a crecer de a uno. auto-fit con un mínimo de 15rem mete las columnas que
    entren y reparte el sobrante, así que con tres van tres en fila, con cuatro
    entran cuatro en escritorio y dos en teléfono, y ninguno queda colgado solo
    en una fila vacía. No hay un número de columnas escrito en ningún lado.
  -->
  <section id="speakers" class="border-b border-linea py-seccion">
    <div class="contenedor">
      <p class="rotulo text-acento-texto">Quiénes hablan</p>
      <h2 class="titulo mt-4 max-w-[18ch] text-[clamp(1.4rem,4.4vw,2.85rem)]">
        Los que ya lo hicieron en sus locales
      </h2>
      <p class="lectura mt-5 text-[17px] text-gris">
        No son consultores contando casos ajenos: cada uno cuenta lo que aplicó
        adentro de su propia operación, qué le costó y qué le devolvió.
      </p>

      <!--
        LOS SEPARADORES LOS DIBUJA CADA TARJETA, no el hueco de la grilla.

        Estaba hecho con gap-px sobre un fondo de línea, que es la técnica que
        usa el muro de resúmenes y ahí funciona porque su grilla siempre está
        llena. Acá no: esta lista crece de a uno, y con 3, 5, 7 o 9 oradores
        queda una celda vacía en la última fila. Con el fondo de línea abajo,
        esa celda que no existe se ve —un rectángulo gris al lado del último
        nombre—, y son la mitad de los números por los que la lista va a pasar
        mientras se completa.

        Con un outline hacia adentro cada tarjeta dibuja su propio contorno y
        los de las vecinas se superponen exactamente en 1px, así que las
        medianeras no se duplican. Donde no hay tarjeta no se dibuja nada.
      -->
      <ul class="mt-12 grid list-none grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]">
        <!--
          El índice sólo alimenta el escalonado de la aparición. La clave es el
          nombre + la empresa: dos personas pueden llamarse igual en empresas
          distintas, y una misma empresa puede mandar dos oradores.
        -->
        <li
          v-for="(s, i) in SPEAKERS"
          :key="`${s.nombre}-${s.empresa}`"
          class="celda-speaker v-reveal p-7"
          :style="{ '--orden': i }"
        >
          <p class="text-[1.15rem] font-extrabold leading-tight tracking-[-0.02em]">
            {{ s.nombre }}
          </p>
          <!--
            Dos datos y nada más: nombre y empresa. Estuvo escrito un tercero
            opcional para el cargo y se sacó antes de subirlo, porque con unos
            que lo tienen y otros que no, las tarjetas de una misma fila
            quedaban desalineadas: la empresa de uno a la altura del cargo del
            de al lado. Si más adelante hace falta el cargo, entra para todos o
            para ninguno.
          -->
          <p class="mt-2 text-[15px] leading-[1.5] text-gris">{{ s.empresa }}</p>
        </li>
      </ul>

      <!--
        Mientras la lista crece, se dice que crece. Es honesto y además trabaja:
        el que ve tres nombres y lee que faltan entiende que el programa se está
        armando, no que se está vaciando.

        Desaparece solo cuando el cupo de oradores se dé por cerrado, que es
        cuando esta línea salga de acá.
      -->
      <p class="mt-8 text-[14px] leading-[1.5] text-gris-2">
        La lista se completa hasta la semana del evento. Los que faltan se
        anuncian acá y por WhatsApp a los que ya reservaron.
      </p>
    </div>
  </section>
</template>

<script setup>
import { SPEAKERS } from "@/data/evento";
</script>

<style scoped>
/*
  El contorno de cada tarjeta, hacia adentro para que dos vecinas compartan la
  misma línea de 1px en vez de dibujar dos.

  EL COLOR VA POR TEMA A MANO, y no con var(--linea), porque esa variable no se
  redefine en el bloque claro: vale #2E2E33 siempre, o sea una línea casi negra
  sobre el fondo blanco, que es el default. main.css resuelve lo mismo para
  .border-linea con una regla aparte —"sobre blanco es casi negro"— y acá se
  usa su mismo valor. Es la misma fuga que ya mordió con el velo del dock:
  los tokens de la paleta son literales y el tema sólo pisa algunas clases.

  El valor del tema claro NO va acá sino en el bloque html.claro de main.css,
  que es donde el repo junta estos overrides. Probado con :global() en este
  scoped y no gana: Vue le saca el atributo de scope al ancestro pero se lo
  deja a la clase, y la regla queda perdiendo contra la de arriba.
*/
.celda-speaker {
  outline: 1px solid #2a2a2a;
  outline-offset: -1px;
}

/*
  El escalonado de la aparición, igual que en JornadaSection: cada tarjeta entra
  55ms después de la anterior para que la grilla se lea como una lista que se
  arma y no como un bloque que aparece de golpe.

  El tope de 8 es para que una lista larga no tarde dos segundos en terminar de
  mostrarse: del noveno en adelante entran todos juntos con el octavo.
*/
.v-reveal {
  transition-delay: calc(min(var(--orden, 0), 8) * 55ms);
}
@media (prefers-reduced-motion: reduce) {
  .v-reveal {
    transition-delay: 0ms;
  }
}
</style>
