<!--
  El podcast, con sección propia.

  SE GRABA ARRIBA DEL ESCENARIO, EN VIVO, FRENTE A TODA LA SALA. Hasta el 16/09
  esta sección decía lo contrario —«una sala privada, dentro del evento»,
  «por invitación»— y estaba ubicada como lo único del día que no le pasaba a
  todo el mundo. Alan confirmó que la sala privada al final no se hace: el
  podcast es cada una de las entrevistas en vivo de la grilla, las que siguen a
  la charla de cada empresa.

  Es mejor argumento que el anterior, y conviene decirlo así: antes el lector
  se enteraba de algo a lo que probablemente no iba a entrar; ahora se entera
  de que va a estar sentado en la grabación.

  Se presenta como lo que es para el que lee: un podcast con referentes del
  rubro. Decía «el podcast de Deenex» y «Deenex abre su podcast», que es la
  misma postura que se sacó del hero —la empresa como sujeto de lo que pasa—.
  Quién lo produce no se esconde: sigue dicho abajo, donde se cuenta por dónde
  sale después.

  CUÁNTOS EPISODIOS SE GRABAN sale de GRILLA, contando las filas de entrevista.
  No va escrito: si mañana se suma o se cae una empresa, el número se mueve
  solo.
-->
<template>
  <section id="podcast" class="py-seccion">
    <div class="contenedor">
      <div class="marco">
        <span class="halo" aria-hidden="true"></span>

        <div class="relative">
          <p class="rotulo text-acento-texto">Podcast</p>

          <h2 class="titulo mt-4 max-w-[19ch] text-[clamp(1.4rem,4.4vw,2.85rem)]">
            Un podcast grabado en vivo, arriba del escenario
          </h2>

          <p class="mt-6 max-w-[58ch] text-[1.05rem] leading-[1.6] text-gris">
            Después de cada charla, el orador se sienta con Alan Tapia y se graba un
            episodio frente a toda la sala: <span class="texto-deenex font-bold">referentes del
            rubro</span> conversando sobre el impacto de la tecnología en la gastronomía y sobre
            lo que va apareciendo alrededor.
          </p>

          <ul class="mt-8 grid gap-3 sm:grid-cols-3">
            <li v-for="p in puntos" :key="p" class="punto-podcast">{{ p }}</li>
          </ul>

          <!--
            LA EDICIÓN ANTERIOR, ADENTRO DE ESTE MISMO MARCO.

            Estuvo un rato como sección propia debajo y estaba mal leído: acá
            el material no es del evento en general sino DE ESTE PODCAST, y
            separarlo lo convertía en dos cosas distintas que se explican dos
            veces. Adentro del marco es lo que es: la sección promete una
            grabación en vivo, y abajo muestra cómo salió la vez anterior.

            SIN FILETE ARRIBA. Lo separaba una línea violeta, y antes de ella
            una nota que mandaba a buscar las entrevistas en el programa; Alan
            sacó las dos el 16/09. Ahora lo separa el aire: mt-12 es más que
            los 32px entre el párrafo y los puntos, así que la etiqueta no se
            lee como un punto más.
          -->
          <div v-if="hayExpo" class="mt-12">
            <!--
              LA ETIQUETA VA EN VIOLETA Y CON ALMOHADILLA, que es como sale en
              redes: el que ya la vio pasar por ahí la reconoce sin leer nada
              más. El número de edición al lado, en negrita, porque es el dato
              que convierte esto en una serie y no en un recuerdo suelto — la
              segunda es la que se está por grabar arriba, en esta misma
              sección.
            -->
            <!--
              SIN .rotulo, y ésta es la razón: esa clase pone uppercase, y en
              uppercase "#DeenexExperience" queda "#DEENEXEXPERIENCE", una
              palabra de dieciséis letras sin junturas. Lo que hace legible un
              hashtag es justamente la mayúscula interna, que marca dónde
              empieza cada palabra. Así que lleva el peso y el color del rótulo
              pero conserva su caja.
            -->
            <p
              class="text-[13px] font-bold tracking-[0.04em] text-acento-texto sm:text-[14px]"
            >
              {{ EXPO.etiqueta }}
            </p>
            <p class="mt-3 flex max-w-[56ch] flex-wrap items-baseline gap-x-3 gap-y-1">
              <span class="text-[1.15rem] font-extrabold tracking-[-0.02em]">
                {{ EXPO.edicion }}
              </span>
              <span class="text-[15px] leading-[1.55] text-gris">
                Así se grabó la anterior: el set, la cámara y los que pasaron por
                los sillones.
              </span>
            </p>

            <!--
              Se sale del padding del marco con márgenes negativos para que el
              carrusel llegue al borde: encerrado adentro no se lee como algo
              que se desliza. El padding se devuelve por dentro para que la
              primera pieza arranque alineada con el texto.

              LOS NÚMEROS SON LOS DEL MARCO, no unos parecidos: 1.75rem en
              teléfono y 3rem de 640 para arriba, que es lo que dice .marco
              abajo en este mismo archivo. Con 2rem —que fue el primer intento—
              el carrusel se salía 4px de más y la primera pieza arrancaba en
              17px mientras el texto arrancaba en 49: cortada contra el borde
              en vez de alineada con el rótulo. El overflow:hidden del marco la
              recortaba y se leía como un error de carga.

              Y EL scroll-pl NO SOBRA. Con snap-mandatory y sin él, el navegador
              alinea al borde del contenedor y no al del padding, así que la
              galería aparecía YA CORRIDA 28px al cargar la página —medido:
              scrollLeft 28 en reposo, la primera pieza en 21 con el rótulo en
              49—. Se leía como si alguien la hubiera deslizado antes de llegar.
            -->
            <div
              class="-mx-7 mt-6 flex snap-x snap-mandatory scroll-pl-7 gap-3 overflow-x-auto px-7 pb-3 sm:-mx-12 sm:scroll-pl-12 sm:px-12"
              style="scrollbar-width: thin"
            >
              <figure
                v-for="pieza in piezas"
                :key="pieza.archivo"
                class="w-[68vw] max-w-[260px] shrink-0 snap-start sm:w-[260px]"
              >
                <!--
                  TODAS AL MISMO RECORTE, y ahora es 3:4 y no 4:3. Dieciséis de
                  las diecinueve fotos que llegaron y el video son verticales
                  —material de teléfono—, así que el recorte apaisado que había
                  acá se comía la mitad de cada escena. Lo que no cambia es que
                  el ratio sea UNO SOLO: con cada pieza en el suyo, la fila se
                  descalibra.
                -->
                <div class="relative aspect-[3/4] overflow-hidden rounded-xl bg-acento/10">
                  <!--
                    preload="none" y poster: el .mp4 no se baja hasta que
                    alguien toca play, así que en la primera carga sólo pesan
                    las imágenes. Sin poster el navegador pinta un rectángulo
                    negro, y una fila de rectángulos negros se lee peor que no
                    tener nada.

                    EL VIDEO VA CONTAIN Y LAS FOTOS COVER, que es la única
                    excepción de la fila y tiene motivo: el video es 9:16 y
                    lleva los nombres de quién habla sobreimpresos abajo, más
                    los subtítulos. Recortado a 3:4 se pierden los dos, o sea
                    justo lo que hace entendible un clip que la mayoría va a
                    mirar sin sonido. Con contain entra entero y quedan dos
                    franjas al costado, que es un precio más barato.
                  -->
                  <video
                    v-if="pieza.tipo === 'video'"
                    :src="pieza.src"
                    :poster="pieza.posterSrc || undefined"
                    class="h-full w-full bg-noche object-contain"
                    playsinline
                    preload="none"
                    controls
                  ></video>
                  <img
                    v-else
                    :src="pieza.src"
                    :alt="pieza.texto || `Foto de la edición ${EXPO.edicion}`"
                    class="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <span
                    v-if="pieza.tipo === 'video'"
                    class="chapa-video pointer-events-none absolute right-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] backdrop-blur-sm"
                  >
                    Video
                  </span>
                </div>
                <!--
                  SIN EPÍGRAFE. Cada pieza tenía su nota debajo —«El set, entre
                  charla y charla»— y las sacó Alan: en una tira que se desliza,
                  el texto de abajo obliga a leer para ver, que es lo contrario
                  de lo que hace una galería. Las fotos se explican solas.

                  EL DATO SIGUE EN EXPO y no se borró: es el alt de cada imagen.
                  Lo que dejó de estar es el renglón a la vista.
                -->
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { EXPO, GRILLA } from "@/data/evento";

/*
  Las piezas de la edición anterior: fotos en assets/images/expo y videos en
  assets/video, resueltas con import.meta.glob para que entren al build con su
  hash. El dato sólo guarda el nombre del archivo.

  Se descarta lo que no tenga archivo de verdad: un nombre mal escrito —una
  extensión cambiada, una tilde— no puede dejar un hueco en la fila. Es
  preferible una pieza menos que un recuadro vacío.
*/
const imagenes = import.meta.glob("@/assets/images/expo/*", { eager: true, import: "default" });
const videos = import.meta.glob("@/assets/video/*", { eager: true, import: "default" });

function resolver(mapa, nombre) {
  if (!nombre) return "";
  const clave = Object.keys(mapa).find((k) => k.endsWith(`/${nombre}`));
  return clave ? mapa[clave] : "";
}

const piezas = computed(() =>
  (EXPO.piezas || [])
    .map((p) => ({
      ...p,
      src: resolver(p.tipo === "video" ? videos : imagenes, p.archivo),
      posterSrc: resolver(imagenes, p.poster),
    }))
    .filter((p) => p.src)
);
const hayExpo = computed(() => piezas.value.length > 0);

/*
  Los tres puntos no repiten lo que ya dice el párrafo de arriba: cómo es el
  formato está ahí, así que acá va lo que falta.

  El primero reemplazó a «Sala privada, por invitación» el 16/09, cuando la
  sala dejó de existir. Es el dato que más cambió y el que más vende: el
  que reserva está adentro de la grabación.

  El tercero es el único lugar de la sección donde se nombra a Deenex, y
  corresponde: es un dato verificable —por dónde sale el episodio después— y
  no la autoría del espacio.
*/
const episodios = GRILLA.filter((f) => f.tipo === "podcast").length;

const puntos = [
  "En vivo, frente a toda la sala",
  `${episodios} episodios, uno por empresa`,
  "Después sale por los canales de Deenex",
];
</script>

<style scoped>
/*
  LA CHAPA DE «VIDEO» TIENE COLOR PROPIO, y no sale de la paleta a propósito.

  Tenía bg-noche/80 y text-white, y fallaba dos veces. Una: `html.claro
  .text-white` le pisaba el texto a #1A1A1A sobre una pastilla #1A1A1A, o sea
  negro sobre negro —contraste 1—. Dos, y es la que importó: arreglado eso, el
  caso de contraste siguió fallando porque su medidor sube por los ancestros
  hasta encontrar un fondo con alfa > .85, y 0.8 no califica: medía el texto
  contra el blanco de la tarjeta, no contra la pastilla. Dio 1.09.

  Y el medidor tiene razón en desconfiar. Esta chapa NO se apoya en el fondo de
  la página sino sobre un cuadro de video cualquiera, así que su legibilidad no
  puede depender de qué hay detrás. Con .92 la pastilla manda sola.
*/
.chapa-video {
  background: rgba(20, 20, 24, 0.92);
  color: #fff;
}

/*
  Una sola caja ancha en vez de la grilla del resto de la página: el cambio de
  ritmo es lo que hace que la sección se lea como un aparte y no como el
  siguiente ítem de una lista.
*/
.marco {
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid color-mix(in srgb, var(--acento, #695ede) 24%, transparent);
  background: color-mix(in srgb, var(--acento, #695ede) 5%, transparent);
  padding: 2.25rem 1.75rem;
}
@media (min-width: 640px) {
  .marco { padding: 3.25rem 3rem; }
}

/* El mismo humo violeta del titular, quieto: liga las dos piezas sin repetir
   la animación, que acá distraería del texto. */
.halo {
  position: absolute;
  z-index: 0;
  top: -40%;
  right: -15%;
  width: 34rem;
  height: 34rem;
  pointer-events: none;
  border-radius: 999px;
  background: radial-gradient(
    circle,
    color-mix(in srgb, var(--acento, #695ede) 30%, transparent),
    transparent 68%
  );
  filter: blur(46px);
}

.punto-podcast {
  padding: 0.85rem 1.1rem;
  border-radius: 12px;
  border: 1px solid var(--linea, #e7e4f0);
  background: var(--papel, #fff);
  font-size: 0.95rem;
  line-height: 1.4;
  font-weight: 500;
}
</style>
