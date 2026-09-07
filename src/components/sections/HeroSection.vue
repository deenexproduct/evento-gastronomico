<template>
  <!--
    El hero venía apilando cinco bloques de texto y la tarjeta de cupo en una
    sola columna, y eso empujaba el botón 109px por debajo del fold en
    1280x800: el que entraba no veía un CTA hasta hacer scroll.

    Ahora la columna izquierda solo carga fecha, nombre, promesa y botones, y
    todo lo que es dato —cuánto falta y cuánto queda— se va a un panel a la
    derecha. En celular el panel cae debajo de los botones, que es el orden que
    corresponde ahí.
  -->
  <!--
    El aire de arriba sigue al nav, no a un numero.

    Eran 104px fijos, calibrados contra un nav de 73. Pero el nav mide 73, 117
    o 161 segun cuantas lineas ocupen las cinco pestañas, y eso depende del
    ancho Y de la fuente que haya cargado: a 320px mide 161 y el titulo del
    hero quedaba 9px POR DEBAJO de la barra —tapado, en la primera pantalla,
    que es lo unico que ve el que llega y rebota—. Con la fuente de respaldo
    del runner de CI eso mismo pasa a 360px, que es un telefono comun.

    --alto-nav la publica Navbar.vue midiendose.

    El max() es para no tocar lo que ya estaba bien. Los 104px daban 35px de
    aire libre bajo la barra en telefono (nav 117) y 95 en escritorio (nav 73),
    porque el div de adentro pone 48px mas. El calc replica esos 35px de aire
    cuando el nav crece, y el max deja ganar al 104 cuando no hace falta: a
    375px y de 640 para arriba el hero queda exactamente donde estaba, y a
    320 —o a 360 con la fuente de respaldo— sube a 148 y deja de tapar.
  -->
  <section
    id="hero"
    class="relative overflow-hidden pt-[max(104px,calc(var(--alto-nav,117px)-13px))]"
  >
    <!-- Halo del violeta de marca, contenido y barato: sin JS ni imágenes -->
    <div
      class="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.16] blur-[130px]"
      style="background: radial-gradient(circle, #695EDE 0%, transparent 70%)"
      aria-hidden="true"
    ></div>

    <div class="contenedor relative py-12 sm:py-16">
      <div class="grid items-start gap-10">
        <!--
          Columna del mensaje.

          min-w-0 no es decorativo: por defecto un ítem de grid tiene
          min-width:auto, o sea que no se encoge por debajo del contenido más
          ancho que lleva adentro. Ese contenido es el h1, que va en una sola
          palabra y no puede partirse.

          La escala del titular está calculada para que entre a root 16px, pero
          el clamp tiene el piso en rem: si el lector agranda la letra del
          navegador, el piso crece mientras el contenedor sigue midiendo en vw.
          Con min-width:auto la columna se estira detrás del texto, la sección
          tiene overflow-hidden y el resultado es que se corta el titular Y la
          columna entera —fecha, promesa y botones— sin que aparezca barra de
          scroll. Con min-w-0 la columna se encoge y el nombre se parte en dos
          renglones, que es feo pero se lee.
        -->
        <div class="min-w-0">
          <!--
            Donde y cuando, antes que nada. Con el panel de la derecha
            afuera, estas dos lineas son lo unico que lo dicen en la primera
            pantalla.

            Mismo tratamiento tipografico que el subtitulo de abajo —caja
            baja, peso medio, sin tracking de rotulo—: lo unico que los separa
            es el cuerpo. Venia en versales con tracking abierto, que en el
            mismo bloque que el nombre del evento sumaba un tercer estilo de
            letra sin que hiciera falta.

            Van en DOS lineas a proposito, no por accidente. Los tres datos
            —hotel, ciudad y fecha— no entran en una sola en un telefono de
            375px: el ancho util es 335px y la version mas corta que los
            tiene a los tres pide 338. Medi seis combinaciones antes de
            partirlo. A 12px las dos lineas piden 303 y 284, con margen.

            Sale "Edicion 01" de aca: ya no entra y ademas abre la seccion
            de acceso, que es donde significa algo. Y sale "Organiza Deenex":
            quien organiza tiene su propia seccion mas abajo.
          -->
          <p class="text-[12px] font-medium leading-[1.65] text-gris-2 sm:text-[13px]">
            {{ EVENTO.venue }} · {{ EVENTO.ciudad }}<br />
            {{ EVENTO.fechaLarga }}
          </p>

          <!--
            El nombre es lo único de nivel 1 en esta pantalla, así que ocupa
            todo el ancho disponible, que es el máximo peso visual que puede
            tener sin romper nada.

            El tamaño está MEDIDO, no elegido: "SaboresTech" en Panchang 800
            con este tracking mide 11,38 px de ancho por cada px de cuerpo.
            Medido en el navegador con Range.getBoundingClientRect() y la
            fuente ya cargada, no a ojo.

            Ese 11,38 es del nombre SIN espacio. La versión con espacio,
            "Sabores Tech", medía 11,53: el espacio pesa. La escala de abajo se
            calculó para 11,53, así que con 11,38 entra con MÁS aire y no hubo
            que tocarla.

            El ancho ÚTIL del contenedor no es 1200: es 1200 menos 64 de
            padding, o sea 1136, y ahí topa. El comentario anterior decía 1200
            y por eso el techo quedaba 27px pasado sin que se viera.

            Contra ese útil —viewport menos 40px de padding en teléfono, 64 de
            ahí para arriba, tope 1136— el máximo que entra va de 7,59vw a
            320px hasta 8,13vw a 1024. 7,2vw deja margen en toda la escala.

            El techo es 6rem: 96px × 11,38 = 1092 contra 1136 útiles. Con
            6,3rem el texto medía 1163 y se cortaba de 1440 para arriba. El
            piso es 1,4rem, que sólo gobierna por debajo de 311px; con 1,6 el
            texto medía 295 contra 280 útiles en un teléfono de 320.

            Ojo si se cambia el NOMBRE, la tipografía o el tracking: ese número
            se mueve y el titular se corta sin avisar, porque la sección tiene
            overflow-hidden y no aparece barra de scroll. Ya pasó dos veces al
            renombrar.

            Este bloque llegó a tener DOS párrafos de advertencia con dos
            ratios distintos —11,53 y 10,46, de dos nombres distintos— uno
            debajo del otro. Un comentario que se contradice a sí mismo hace
            recalibrar escalas que estaban bien: queda UNA sola medición, y es
            la del nombre que hay en evento.js.

            El interlineado baja a 0.88: en una sola palabra no hay renglón
            siguiente que proteger.
          -->
          <h1
            class="display mt-4 text-[clamp(1.4rem,7.2vw,6rem)] leading-[0.88] tracking-[-0.035em]"
          >
            <!--
              El nombre y nada más. Acá había un cruce animado: la palabra se
              disolvía en humo violeta y aparecía "by Deenex", alternando cada
              6,5 s. Se sacó por decisión de marca —el titular más grande de la
              página pasaba la mitad del tiempo diciendo el nombre del
              organizador y no el del evento, en una edición 01 que tiene que
              instalar el suyo—.

              No estaba mal resuelto: tenía las capas apiladas para que el
              ancho no saltara, el nombre real en un sr-only para buscador y
              lector de pantalla, y corte con prefers-reduced-motion. Se fue
              entero con su andamiaje, así que si alguien lo extraña, esto no
              se "restaura": se vuelve a decidir.

              Quien organiza se sigue diciendo en el "by Deenex" de la barra de
              arriba, que está en todas las pantallas, y en su propia sección.
            -->
            {{ EVENTO.nombre }}
          </h1>

          <!--
            La única promesa de la página, y el sujeto es el LECTOR.

            Decía "Deenex crea un espacio para hablar de tecnología
            vanguardista en el rubro gastronómico y vos podés ser parte". Tres
            problemas en una frase: el sujeto era el organizador, así que el
            lector entraba como invitado a algo ajeno; "tecnología
            vanguardista" es una categoría y no un beneficio; y "vos podés ser
            parte" no afirma nada. La decisión es que esto es un espacio y
            punto, sin la empresa por detrás en la comunicación.

            Quién organiza se sigue diciendo donde corresponde —el "by Deenex"
            de la cabecera, que está en todas las pantallas, y la vista
            /organiza entera—, pero no acá, que es donde el lector decide si
            esto es para él.

            Y ahora la frase califica al público. Antes la palabra "cadena" no
            aparecía en toda la primera pantalla: había que scrollear hasta la
            tarjeta de QueEsSection para saber para quién era el evento. El
            og:title de index.html sí lo decía, así que la previsualización de
            WhatsApp calificaba mejor al lector que la propia página.

            Este bloque tenía TRES comentarios encima, y dos se contradecían:
            uno pedía que el acento no cayera en la autoría y el siguiente que
            el respaldo de la empresa fuera lo primero que se lee. Quedan
            resumidos en este.

            Nivel 2, y se lee como nivel 2: cuerpo simple, caja baja, peso
            medio. Estaba en la display, en versales y a peso 800 — competía de
            igual a igual con el nombre del evento, que es lo único que tiene
            que destacarse acá. Lo que sostiene la jerarquía es el salto de
            cuerpo y de tipografía, no el grito.
          -->
          <p class="mt-6 max-w-[34ch] text-[clamp(1.1rem,2.4vw,1.5rem)] font-medium leading-[1.35]">
            Un día entre dueños de cadenas gastronómicas:
            <span class="texto-deenex font-bold">qué están aplicando los que crecen</span>, contado
            por los que ya lo implementaron en sus locales.
          </p>

          <div class="mt-8 flex flex-wrap items-center gap-3">
            <!--
              Abre WhatsApp directo. Antes hacía scroll hasta el panel de
              reserva —ocho pantallas— y ahí había OTRO botón que recién
              entonces abría el chat: tres toques para una acción que el
              lector cree que es una.
            -->
            <a :href="enlaceReserva" target="_blank" rel="noopener noreferrer" class="btn">{{
              agotado ? "Entrar a la lista" : "Quiero mi lugar"
            }}</a>
            <a href="#jornada" class="btn-linea" @click.prevent="ir('jornada')">Ver qué pasa ese día</a>
          </div>

          <!--
            La cuenta regresiva, pegada al botón.

            Estaba en días. Ahora corre en tiempo real hasta la apertura de
            puertas: el segundo que se mueve es lo que convierte una fecha
            lejana en algo que está pasando ahora.

            Los cuatro números en tabular-nums y con ancho mínimo fijo, si no
            la fila se corre de costado cada vez que un dígito cambia de 1 a 8.
            `aria-live="off"`: un lector de pantalla que anuncie cada segundo
            es inusable, y el dato ya está escrito en la fecha de arriba.
          -->
          <div v-if="!restante.vencido" class="mt-7" aria-live="off">
            <div class="flex items-end gap-5 sm:gap-6">
              <div v-for="u in unidades" :key="u.clave" class="flex flex-col">
                <span
                  class="font-display text-[clamp(1.25rem,2.8vw,1.7rem)] font-extrabold leading-none tabular-nums tracking-[-0.02em] texto-deenex"
                  style="min-width: 2ch; display: inline-block"
                  >{{ String(u.valor).padStart(2, "0") }}</span
                >
                <span class="mt-1 text-[10px] font-medium uppercase tracking-[0.12em] text-gris-2">
                  {{ u.label }}
                </span>
              </div>
            </div>
          </div>
          <p
            v-else
            class="mt-7 font-display text-[clamp(1.4rem,3.4vw,1.9rem)] font-extrabold uppercase leading-none texto-deenex"
          >
            Es hoy
          </p>

          <p class="mt-5 text-[14px] leading-[1.5] text-gris">
            Entrada sin costo con reserva previa · Se reserva por WhatsApp, sin formularios
          </p>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { EVENTO, linkWaReserva } from "@/data/evento";
import { useCupo } from "@/composables/useCupo";
import { useRelojEvento } from "@/composables/useCuentaRegresiva";

const { total, ocupados, porcentaje, agotado, mostrarCupo } = useCupo();
const { restante } = useRelojEvento();
const enlaceReserva = computed(() => linkWaReserva({ agotado: agotado.value }));

// El orden importa y es de mayor a menor: es como se lee un reloj.
const unidades = computed(() => [
  { clave: "d", valor: restante.value.dias, label: "días" },
  { clave: "h", valor: restante.value.horas, label: "horas" },
  { clave: "m", valor: restante.value.minutos, label: "min" },
  { clave: "s", valor: restante.value.segundos, label: "seg" },
]);

const ancho = ref(0);
// El timer se guarda y se limpia: son 400 ms, pero si el componente se
// desmonta antes —navegar a una vista interna apenas carga la home— el
// callback despierta sobre un ref de un componente que ya no existe.
let tAncho = null;
onMounted(() => {
  tAncho = setTimeout(() => (ancho.value = Math.max(porcentaje.value, 3)), 400);
});
onUnmounted(() => clearTimeout(tAncho));
watch(porcentaje, (v) => {
  if (ancho.value > 0) ancho.value = Math.max(v, 3);
});

function ir(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/*
  Acá vivía el cruce del titular: el nombre se disolvía en humo violeta y
  aparecía "by Deenex", con tres temporizadores encadenados (QUIETO 4600,
  ANTICIPO 380, CRUCE 1500), su función alternar() y su limpieza.

  Se sacó entero por decisión de marca, no por un defecto. Ver el comentario
  del h1, arriba.
*/
</script>

<style scoped>
/* ── El titular ────────────────────────────────────────────────────── */

/*
  Acá vivían .mutante, .capa, .capa-abs, .capa-fuera, .capa-by, .humo y
  .humo-activo, más un @media de prefers-reduced-motion que sólo apagaba esas
  transiciones. Salieron con el cruce del titular: sin capas que apilar no hay
  grid que sostener, sin transición no hay movimiento que reducir.

  El titular NO lleva white-space: nowrap. La tentación es ponerlo —lo traía
  .capa mientras existía— pero acá haría daño: anularía el overflow-wrap de
  .display, y si el lector agranda la letra del navegador el clamp crece por
  el piso en rem mientras el contenedor sigue en vw. Con nowrap eso se corta
  en silencio dentro del overflow-hidden de la sección; sin nowrap el nombre
  se parte en dos renglones, que es feo pero se lee. Entre invisible y feo,
  feo.
*/
</style>
