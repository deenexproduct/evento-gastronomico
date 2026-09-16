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
      <h2 class="titulo mt-4 max-w-[20ch] text-[clamp(1.4rem,4.4vw,2.85rem)]">
        Todos los referentes gastronómicos
      </h2>
      <p class="lectura mt-5 text-[17px] text-gris">
        Los que están innovando en el mercado de cadenas gastronómicas.
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
          v-for="(s, i) in speakers"
          :key="`${s.nombre}-${s.empresa}`"
          class="celda-speaker v-reveal p-7"
          :style="{ '--orden': i }"
        >
          <!--
            La foto es opcional y el hueco nunca lo es.

            Las fotos van llegando de a una, igual que los nombres, así que la
            tarjeta tiene que verse terminada sin ella. Cuando no hay, van las
            iniciales sobre el violeta de superficie: ocupa exactamente el mismo
            lugar, así que una fila con tres fotos y una sin no se descalibra.

            aspect-square y object-cover: los retratos llegan en cualquier
            recorte y acá entran todos al mismo, sin deformarse.
          -->
          <div class="mb-5 h-16 w-16 overflow-hidden rounded-full bg-acento/15">
            <img
              v-if="s.src"
              :src="s.src"
              :alt="`Foto de ${s.nombre}`"
              class="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              width="64"
              height="64"
            />
            <span
              v-else
              class="grid h-full w-full place-items-center text-[1.05rem] font-extrabold tracking-[-0.02em] text-acento-texto"
              aria-hidden="true"
            >
              {{ s.iniciales }}
            </span>
          </div>

          <p class="text-[1.15rem] font-extrabold leading-tight tracking-[-0.02em]">
            {{ s.nombre }}
          </p>
          <!--
            EL CARGO, cuando lo hay, y es opcional por lo mismo que la foto y el
            logo: llegan de a uno. Sin cargo la tarjeta se cierra en el nombre y
            la empresa, que es como estuvo hasta ahora.

            Va entre el nombre y la empresa porque así se lee de lo particular a
            lo general —quién, qué hace, dónde— que es el orden en que se
            presenta una persona. Y en gris, no en negrita: el que escanea esta
            grilla busca nombres y marcas; el cargo lo lee después, cuando ya se
            detuvo en alguien.
          -->
          <p v-if="s.rol" class="mt-1.5 text-[14px] leading-[1.45] text-gris">
            {{ s.rol }}
          </p>
          <!--
            La empresa, con su logo adelante cuando lo hay.

            El logo es opcional por lo mismo que la foto: van a llegar de a uno.
            Sin archivo queda el nombre solo, que es la misma decisión que toma
            la barra de partners —"un nombre bien puesto se lee mejor que un
            recuadro vacío esperando una imagen"—. Hoy de los tres referentes
            sólo Bistrosoft tiene el suyo en el repo.

            24px de alto y no 16: el de Bistrosoft es 785x285, asi que a 16px
            queda en 44px de ancho con el nombre de la marca escrito adentro, o
            sea una mancha. El alto fijo de la fila, con o sin logo, es lo que
            mantiene alineadas las tarjetas de una misma fila.
          -->
          <!--
            EL LOGO O EL NOMBRE, NUNCA LOS DOS.

            Iban juntos y decían lo mismo dos veces: el logo de Bistrosoft con
            la palabra "Bistrosoft" al lado. La marca ya está dibujada; volver a
            escribirla no agrega un dato, gasta el renglón y ensucia la columna,
            que es donde el que escanea busca de qué empresa es cada uno.

            Es la misma regla que la barra de arriba tiene escrita desde
            siempre, sólo que al revés de como se lee: sin archivo se muestra el
            nombre en tipografía. Con archivo, no hace falta.

            Y POR ESO EL LOGO DEJA DE SER DECORATIVO: cuando era el nombre el
            que cargaba el dato, la imagen iba con alt vacío y aria-hidden para
            no decirlo dos veces. Ahora es lo único que nombra a la empresa, así
            que el alt lleva el nombre y el aria-hidden se va — si no, la
            tarjeta quedaba sin empresa para un lector de pantalla.
          -->
          <p class="mt-2 flex min-h-[24px] items-center gap-2 text-[15px] leading-[1.5] text-gris">
            <img
              v-if="s.logoSrc"
              :src="s.logoSrc"
              :alt="s.empresa"
              class="logo-sponsor h-6 w-auto max-w-[76px] shrink-0 object-contain"
              loading="lazy"
            />
            <template v-else>{{ s.empresa }}</template>
          </p>

          <!--
            La descripción, cuando la hay, y al pie de la tarjeta.

            Va última y separada por un filete a propósito: lo que el que
            escanea esta grilla busca es nombre y marca, y eso tiene que seguir
            siendo lo primero que encuentra. La credencial la lee después,
            cuando ya se detuvo en alguien. Puesta arriba empujaría el nombre
            hacia abajo en la única tarjeta que la tiene y rompería la lectura
            en columna de las demás.

            Es opcional como la foto, el logo y el cargo: la lista se completa
            de a uno y la tarjeta tiene que verse terminada en cada paso.
          -->
          <p
            v-if="s.descripcion"
            class="mt-4 border-t border-linea pt-3 text-[13px] leading-[1.5] text-gris-2"
          >
            {{ s.descripcion }}
          </p>
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
import { computed } from "vue";
import { SPEAKERS } from "@/data/evento";

/*
  Las fotos se resuelven con import.meta.glob, igual que los logos de partners:
  así entran al build con su hash y no hay que acordarse de copiarlas a public.
  El dato sólo guarda el nombre del archivo.

  `eager` porque son seis imágenes chicas y el v-for las necesita todas a la
  vez; la carga diferida real la hace el loading="lazy" de cada <img>.
*/
const archivos = import.meta.glob("@/assets/images/speakers/*", {
  eager: true,
  import: "default",
});

// Los logos salen de la misma carpeta que los de partners: son las mismas
// empresas y no tiene sentido guardar el archivo dos veces.
const logos = import.meta.glob("@/assets/images/partners/*", {
  eager: true,
  import: "default",
});

/*
  Las iniciales son el respaldo cuando todavía no hay foto, y salen del nombre
  para que no haya un tercer dato que cargar a mano y se pueda desincronizar.

  Se toman la primera palabra y la última: "María del Carmen Pérez" da MP y no
  MD. Con un solo nombre, una sola letra.
*/
function inicialesDe(nombre) {
  const p = String(nombre).trim().split(/\s+/).filter(Boolean);
  if (!p.length) return "";
  return (p[0][0] + (p.length > 1 ? p[p.length - 1][0] : "")).toUpperCase();
}

const speakers = computed(() =>
  SPEAKERS.map((s) => {
    const buscar = (mapa, archivo) =>
      archivo ? mapa[Object.keys(mapa).find((k) => k.endsWith(`/${archivo}`))] || "" : "";
    return {
      ...s,
      src: buscar(archivos, s.foto),
      logoSrc: buscar(logos, s.logo),
      iniciales: inicialesDe(s.nombre),
    };
  })
);
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
