<template>
  <!--
    El logo de Deenex, dibujado en línea.

    EL DIBUJO VIVE EN UN SOLO ARCHIVO: assets/images/partners/deenex.svg. De ahí
    lo toman los tres lugares donde aparece —este "By Deenex" del hero, la
    tarjeta de Alan en los referentes y la barra PARTICIPAN—. Hubo una copia de
    los trazos pegada acá adentro; se fue cuando el logo tuvo que aparecer
    también como archivo, porque dos copias del mismo dibujo son dos lugares
    donde corregirlo.

    POR QUÉ ESTE LUGAR NO USA UN <img> COMO LOS OTROS DOS. El archivo pinta en
    currentColor. Adentro de un <img> ese color no se hereda —la imagen es un
    documento aparte—, y ahí no importa: la barra y las tarjetas lo pasan por
    brightness(0), que lo vuelve negro igual. Acá sí importa: "By Deenex" tiene
    que ser del mismo gris que la palabra "By" que lo acompaña, y eso sólo pasa
    si el SVG está en la página y hereda el color del texto. Por eso se importa
    crudo (?raw) y se inserta.

    El v-html es seguro: el contenido es un archivo del repo resuelto en el
    build, no algo que escriba un visitante.

    El alto lo pone el que lo usa; el ancho sale solo de la proporción del
    dibujo (5 a 1). role="img" y aria-label para que un lector de pantalla diga
    "Deenex" donde se ve la marca.
  -->
  <span class="logo-deenex" role="img" aria-label="Deenex" v-html="dibujo"></span>
</template>

<script setup>
import dibujo from "@/assets/images/partners/deenex.svg?raw";
</script>

<style scoped>
.logo-deenex {
  display: inline-flex;
}
.logo-deenex :deep(svg) {
  height: 100%;
  width: auto;
}
</style>
