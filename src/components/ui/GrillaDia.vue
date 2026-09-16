<template>
  <!--
    La grilla del día, fila por fila.

    LAS TRANSICIONES NO SE PUBLICAN, y es una decisión de Alan del 15/09 después
    de verlas puestas. De las 29 filas de la planilla, diez son "promo y
    presentación" entre bloque y bloque: producción pura, la misma frase diez
    veces, y nada que el que evalúa venir el sábado pueda usar para decidir.

    SIGUEN EN GRILLA, en el dato, y no se borran de ahí por dos razones. Una es
    que la planilla es el run-of-show y ese archivo es la fuente: recortarlo
    para que coincida con lo que se muestra haría que la próxima pregunta
    —"¿cuánto dura el corte entre Bistrosoft y I+DIoT?"— no tenga respuesta en
    ningún lado. La otra es que sin ellas el día deja de encadenar: un bloque
    que termina 10:25 y el siguiente que arranca 10:35 abren un hueco de diez
    minutos que ningún dato explica, y hay un test que vive de que la grilla
    encadene hora con hora.

    Así que se filtran acá, en la vista, que es donde está la decisión.

    La jerarquía tiene dos alturas y sale de `peso`, en TIPOS_GRILLA:

      contenido → lo que se viene a ver. Caja propia, título grande.
      marco     → apertura, networking, cierre. Fila ancha, sin caja.

    Y SE AGRUPA DE A PARES, que es la estructura real del día y lo único que la
    planilla no deja ver: cada empresa ocupa dos filas seguidas —su charla y
    después su entrevista en vivo con Alan—. Seis empresas, doce filas. Al
    agrupar, el lector cuenta seis cosas en vez de doce, y entiende de una
    que a cada una la va a escuchar dos veces y de dos maneras distintas.

    La columna de horas es un grid de ancho fijo y no un float: así las horas de
    todas las filas caen en la misma vertical, que es lo que hace que esto se
    lea como una grilla y no como una lista con horas adelante. En teléfono esa
    columna pasa arriba, porque 5.5rem de reloj más el título no entran en 320px
    sin partir cada título en cuatro renglones.
  -->
  <ol class="grilla-dia list-none">
    <template v-for="(item, i) in items" :key="item.clave">
      <!--
        Las filas de marco: apertura del salón, bienvenida, los dos networkings
        y el cierre. Son las que estructuran el día. Sin caja —no son contenido
        de escenario— pero con su ícono y su hora, porque son las que el que
        organiza su sábado necesita ubicar primero: a qué hora entro y hasta qué
        hora me quedo.
      -->
      <li v-if="item.clase === 'marco'" class="fila v-reveal" :style="{ '--orden': i }">
        <p class="col-hora">
          <span class="hora hora-desde">{{ item.desde }}</span>
          <span v-if="item.dur > 0" class="hora-hasta text-gris-2">a {{ item.hasta }}</span>
        </p>
        <div class="fila-marco">
          <!--
            La cara de quien abre o cierra, si la página la conoce; el
            pictograma si la fila no nombra a nadie —la apertura del salón y
            los dos networkings no tienen orador, son momentos de la sala—.
          -->
          <span v-if="item.caras.length" class="pila" aria-hidden="true">
            <template v-for="c in item.caras" :key="c.nombre">
              <img
                v-if="c.src"
                :src="c.src"
                :alt="`Foto de ${c.nombre}`"
                class="cara"
                loading="lazy"
                decoding="async"
                width="32"
                height="32"
              />
              <span v-else class="cara cara-iniciales" :title="c.nombre">{{ c.iniciales }}</span>
            </template>
          </span>
          <span v-else class="disco" aria-hidden="true">
            <Pictograma :nombre="item.icono" :tam="18" />
          </span>
          <div class="min-w-0">
            <p class="titulo-fila">{{ item.fila.titulo }}</p>
            <p v-if="item.pie" class="pie-fila">{{ item.pie }}</p>
          </div>
          <span v-if="item.dur > 0" class="minutos text-gris-2">{{ item.dur }}′</span>
        </div>
      </li>

      <!--
        El bloque de contenido: una empresa con sus dos filas, o una fila que
        no es de ninguna —un panel, el invitado sin nombre— y va sola.

        El nombre de la empresa es el encabezado y no una línea más adentro,
        porque es el dato por el que este público escanea una grilla: primero
        mira qué marcas hay, después qué dicen.
      -->
      <li v-else class="fila v-reveal" :style="{ '--orden': i }">
        <p class="col-hora">
          <span class="hora hora-desde">{{ item.desde }}</span>
          <span class="hora-hasta text-gris-2">a {{ item.hasta }}</span>
        </p>
        <!--
          EL COLOR DE LAS LÍNEAS VA POR CLASE, no por var(--linea).

          Esa variable vale #2E2E33 siempre: no se redefine en el bloque claro,
          que es el tema por defecto de esta página. Un borde casi negro sobre
          blanco. La que sí está resuelta es la CLASE —main.css la pisa con
          rgba(0,0,0,.1) bajo html.claro— así que el borde se pide por
          border-linea y el ancho lo pone Tailwind.

          Es la misma fuga que ya mordió en la grilla de oradores y en el velo
          del dock: los tokens de la paleta son literales y el tema sólo pisa
          algunas clases.
        -->
        <div class="caja border border-linea">
          <!--
            LA CABECERA NO LLEVA FOTO, y antes sí.

            El retrato del orador estaba acá, arriba del bloque. Se movió
            adentro de las filas cuando la grilla pasó a mostrar quién está en
            el escenario en cada momento: con la cara en las dos filas más la
            de la cabecera, la misma persona aparecía tres veces en una caja de
            seis centímetros.

            Queda el dato, que no se repite: la empresa arriba y la persona
            debajo.
          -->
          <div class="cabecera-caja">
            <div class="min-w-0">
              <p class="encabezado-caja">{{ item.titulo }}</p>
              <p v-if="item.orador" class="pie-fila">{{ item.orador }}</p>
            </div>
          </div>

          <div v-for="fila in item.filas" :key="fila.desde" class="sub-fila border-linea">
            <!--
              LAS CARAS DE ESA FILA, que es lo que la fila es: quién está en el
              escenario en esos quince minutos. En la charla va uno; en la
              entrevista, el mismo más Alan, que la conduce. Dos caras contra
              una se leen de un vistazo, antes que el rótulo.

              Acá había un pictograma —micrófono para la charla, dos globos
              para la entrevista— y esa distinción no se pierde: la sigue
              haciendo el rótulo en versales que está al lado, y ahora también
              la cantidad de caras. Lo que se gana es que el bloque deje de
              decir sólo QUÉ pasa y diga con QUIÉN.

              El pictograma queda para las filas que no nombran a nadie.

              La pila va aria-hidden: cada nombre ya está escrito al lado —en
              la cabecera del bloque o en el pie de la fila— así que sin esto
              un lector de pantalla diría "Foto de Gastón Ponteville, foto de
              Alan Tapia" antes de cada renglón, repitiendo lo que va a leer
              dos líneas después.
            -->
            <span v-if="fila.caras.length" class="pila" aria-hidden="true">
              <template v-for="c in fila.caras" :key="c.nombre">
                <img
                  v-if="c.src"
                  :src="c.src"
                  :alt="`Foto de ${c.nombre}`"
                  class="cara cara-chica"
                  loading="lazy"
                  decoding="async"
                  width="28"
                  height="28"
                />
                <span v-else class="cara cara-chica cara-iniciales" :title="c.nombre">
                  {{ c.iniciales }}
                </span>
              </template>
            </span>
            <span v-else class="disco disco-chico" aria-hidden="true">
              <Pictograma :nombre="TIPOS_GRILLA[fila.tipo].icono" :tam="16" />
            </span>
            <div class="min-w-0">
              <p class="rotulo-tipo">
                {{ TIPOS_GRILLA[fila.tipo].label }} · {{ fila.desde }} · {{ duracionDe(fila) }}′
              </p>
              <!--
                UN TÍTULO QUE NO ESTÁ CERRADO se dice así en vez de inventar
                uno. Con la planilla del 16/09 no queda ninguno, pero hubo tres,
                y el caso sigue resuelto. Va en gris y en redonda: un "tema a
                confirmar" con la misma tipografía que un título real le haría
                creer al que escanea que el tema se llama así.

                Lo que NO falta es quién lo da. Esa es la diferencia con la
                grilla que esta página sacó en su momento: ahí faltaban las
                personas, que es lo que se lee como evento a medio vender. Un
                tema abierto con la persona puesta se lee como lo que es, un
                programa que se está cerrando esta semana.
              -->
              <template v-if="!fila.tituloEnLaCabecera">
                <p v-if="fila.titulo" class="titulo-fila">{{ fila.titulo }}</p>
                <p v-else class="titulo-abierto text-gris-2">Tema a confirmar</p>
              </template>
              <!--
                Acá iba también el nombre del orador y salió al subirlo a la
                cabecera: lo decía dos veces por caja, una debajo de la otra.
                Queda sólo quién conduce, que sí cambia entre la charla —donde
                no hay nadie— y la entrevista.
              -->
              <p v-if="fila.conduccion" class="pie-fila">con {{ fila.conduccion }}</p>
            </div>
          </div>
        </div>
      </li>
    </template>
  </ol>
</template>

<script setup>
import { computed } from "vue";
import { GRILLA, TIPOS_GRILLA, SPEAKERS, duracionDe } from "@/data/evento";
import Pictograma from "@/components/ui/Pictograma.vue";

/*
  LAS CARAS SALEN DE SPEAKERS, buscadas por nombre. No hay un campo `foto` en
  GRILLA a propósito: la misma persona aparece en las dos listas y guardar el
  archivo dos veces garantiza que un día una tenga la foto nueva y la otra la
  vieja. Cargar un retrato en SPEAKERS lo hace aparecer acá solo.

  EL PRECIO ES QUE EL NOMBRE TIENE QUE COINCIDIR EXACTO, y un nombre que no
  coincide no rompe nada: simplemente no muestra la foto, que es la peor clase
  de error porque no se nota. Por eso hay un test que compara las dos listas y
  falla si dos nombres se parecen sin ser iguales.
*/
const archivos = import.meta.glob("@/assets/images/speakers/*", {
  eager: true,
  import: "default",
});

const personas = computed(() => {
  const mapa = new Map();
  for (const s of SPEAKERS) {
    const clave = Object.keys(archivos).find((k) => s.foto && k.endsWith(`/${s.foto}`));
    mapa.set(s.nombre, {
      nombre: s.nombre,
      src: clave ? archivos[clave] : "",
      iniciales: inicialesDe(s.nombre),
    });
  }
  return mapa;
});

/*
  QUIÉN ESTÁ EN EL ESCENARIO EN ESTA FILA.

  En un panel sale de `panelistas`, que es la lista con nombre y apellido. En
  el resto, de dos campos: `orador`, que es uno solo, y `conduccion`, que es
  prosa y puede nombrar a más de uno. Por eso la conducción no se parte por
  separadores: se pregunta cuál de las personas que la página conoce aparece nombrada ahí. Un
  separador nuevo, una aclaración entre paréntesis o un "y" que pase a ser una
  coma no rompen nada. Hoy todas dicen "Alan Tapia", pero el día que vuelvan a
  ser dos esto ya funciona.

  SÓLO ENTRAN LAS QUE ESTÁN EN SPEAKERS, y es deliberado: son las que la página
  presenta con nombre y empresa en su propia sección. Alguien nombrado en la
  grilla y ausente de esa lista sería un círculo con iniciales que no remiten a
  nada; su fila se queda con el pictograma hasta que tenga tarjeta.
*/
function carasDe(fila) {
  const gente = personas.value;

  // Un panel dice quiénes lo integran con nombre y apellido, en su dato.
  if (fila.panelistas) {
    return fila.panelistas.filter((n) => gente.has(n)).map((n) => gente.get(n));
  }

  const nombres = [];
  if (gente.has(fila.orador)) nombres.push(fila.orador);
  for (const nombre of gente.keys()) {
    if (nombre !== fila.orador && String(fila.conduccion || "").includes(nombre)) {
      nombres.push(nombre);
    }
  }
  return nombres.map((n) => gente.get(n));
}

/*
  SIN TOPE Y SIN CONTADOR, por pedido de Alan del 15/09.

  Hubo un tope de cuatro con un «+3» al final, que es lo que hace cualquier
  lista de asistentes. En un panel no sirve: esa fila existe para mostrar
  quiénes se sientan juntos, y un contador que esconde a uno de cinco dice
  menos justo donde hay que mostrarlos. Los paneles son las únicas filas con
  más de dos caras, así que el tope no protegía ninguna otra.
*/

/*
  LOS PANELES SE PRESENTAN POR EMPRESA debajo del título, que es como los
  escribe la planilla y como este público escanea la grilla: primero qué
  marcas hay. Las personas ya están en las caras. La empresa sale de SPEAKERS
  y no se escribe en la fila: son los mismos nombres que buscan las caras.
*/
function empresasDe(nombres) {
  const empresas = [
    ...new Set(nombres.map((n) => SPEAKERS.find((s) => s.nombre === n)?.empresa).filter(Boolean)),
  ];
  if (empresas.length < 2) return empresas.join("");
  return `${empresas.slice(0, -1).join(", ")} y ${empresas[empresas.length - 1]}`;
}

/*
  Las iniciales son el respaldo mientras la foto no llegó, igual que en la
  sección de oradores: primera palabra y última, así "María del Carmen Pérez"
  da MP. El hueco ocupa el mismo lugar con foto y sin ella, así que una fila
  con retrato y otra sin no descalibran la caja.
*/
function inicialesDe(nombre) {
  const p = String(nombre || "").trim().split(/\s+/).filter(Boolean);
  if (!p.length) return "";
  return (p[0][0] + (p.length > 1 ? p[p.length - 1][0] : "")).toUpperCase();
}

/*
  De 29 filas planas a la estructura que el día tiene de verdad.

  El recorrido junta las filas CONSECUTIVAS de una misma empresa. Es
  deliberado que mire sólo a la vecina y no agrupe por empresa en todo el
  array: si mañana una empresa vuelve al escenario a la tarde, esas filas son
  otro momento del día y tienen que quedar en su lugar de la línea de tiempo,
  no saltar arriba a juntarse con las de la mañana.

  `clave` sale de la hora de inicio, que es única en una grilla sin
  solapamientos —hay un test que lo verifica—. El índice no sirve como clave
  acá: una fila que se agrega al medio correría todas las de abajo.
*/
const items = computed(() => {
  const salida = [];
  let i = 0;

  while (i < GRILLA.length) {
    const fila = GRILLA[i];
    const tipo = TIPOS_GRILLA[fila.tipo];

    // Las de producción no llegan a la pantalla. Se filtran por `peso` y no por
    // `tipo === "transicion"`: si mañana entra otra fila de servicio, queda
    // fuera sola, sin tener que acordarse de agregarla a una lista acá.
    if (tipo.peso === "servicio") {
      i += 1;
      continue;
    }

    if (tipo.peso === "contenido") {
      const grupo = [fila];
      // Sólo se juntan las que comparten empresa. El panel no tiene, así que
      // queda solo, que es lo correcto: no es el bloque de nadie.
      while (
        fila.empresa &&
        i + grupo.length < GRILLA.length &&
        GRILLA[i + grupo.length].empresa === fila.empresa
      ) {
        grupo.push(GRILLA[i + grupo.length]);
      }
      salida.push({
        clase: "bloque",
        clave: fila.desde,
        // Lo que no es de una empresa se titula con su propio título.
        titulo: fila.empresa || fila.titulo,
        // Debajo, quién: el orador, las empresas del panel, o por qué todavía
        // no hay nombre.
        orador: fila.orador || (fila.panelistas && empresasDe(fila.panelistas)) || fila.anuncio || "",
        desde: grupo[0].desde,
        hasta: grupo[grupo.length - 1].hasta,
        /*
          `tituloEnLaCabecera` evita que el título salga dos veces.

          La cabecera del bloque muestra la empresa; cuando no hay empresa
          —un panel— muestra el título de la fila, y entonces la fila de abajo
          lo repetía: el título del panel dos veces, uno encima del otro,
          separados por cuatro milímetros.
        */
        filas: grupo.map((f) => ({
          ...f,
          caras: carasDe(f),
          tituloEnLaCabecera: !f.empresa,
        })),
      });
      i += grupo.length;
      continue;
    }

    salida.push({
      clase: "marco",
      clave: fila.desde,
      fila,
      icono: tipo.icono,
      caras: carasDe(fila),
      desde: fila.desde,
      hasta: fila.hasta,
      dur: duracionDe(fila),
      /*
        Quién está y quién conduce. La apertura del salón no tiene a nadie.

        Y LA CONDUCCIÓN NO SE REPITE cuando es la misma persona que ya figura
        como orador: la bienvenida la abre Alan y la conduce Alan, así que sin
        esta condición el pie decía "Alan Tapia · con Alan Tapia". Apareció al
        sacar a la otra conductora de esa fila, que es la clase de residuo que
        deja cualquier borrado de datos.
      */
      pie: [
        fila.orador,
        fila.conduccion && fila.conduccion !== fila.orador ? `con ${fila.conduccion}` : "",
      ]
        .filter(Boolean)
        .join(" · "),
    });
    i += 1;
  }

  return salida;
});
</script>

<style scoped>
/*
  ── La columna de horas ───────────────────────────────────────────────

  Ancho fijo y no auto: con auto, "09:30 a 09:45" y "09:30" dan dos anchos
  distintos y los títulos de cada fila arrancan en verticales distintas. Ahí
  deja de leerse como grilla. 5.5rem entra "09:30" en .hora sin partirse.
*/
.fila {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem 1.25rem;
  padding-block: 0.9rem;
}
@media (min-width: 640px) {
  .fila {
    grid-template-columns: 5.5rem 1fr;
  }
}

.col-hora {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  padding-top: 0.15rem;
}
@media (min-width: 640px) {
  .col-hora {
    flex-direction: column;
    gap: 0.15rem;
  }
}
.hora-desde {
  font-size: 1.05rem;
  color: var(--acento-texto, #4f42c4);
}
/*
  EL COLOR NO SE DECLARA ACÁ, lo pone la clase text-gris-2 del template.

  Acá decía `color: var(--gris-2, #8d8a99)` y esa variable NO EXISTE: gris-2
  vive como token de Tailwind y como override de clase bajo html.claro, nunca
  como custom property. O sea que siempre ganaba el respaldo, #8d8a99, que
  sobre el blanco da 2.89:1 contra el mínimo de 4.5 de AA. Lo encontró el caso
  de contraste de accesibilidad.spec.js, no la vista: a ojo se ve como un gris
  claro cualquiera.
*/
.hora-hasta {
  font-size: 0.8rem;
  font-variant-numeric: tabular-nums;
}

/*
  ── La caja de contenido ──────────────────────────────────────────────

  Es lo único con caja en toda la grilla, y por eso funciona: si el marco y las
  transiciones también la tuvieran, la caja dejaría de significar "esto es lo
  que venís a ver".
*/
.caja {
  border-radius: 0.85rem;
  padding: 1.15rem 1.25rem;
}
.cabecera-caja {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.encabezado-caja {
  font-weight: 800;
  font-size: 1.15rem;
  letter-spacing: -0.02em;
  line-height: 1.15;
}

/*
  ── La pila de caras ──────────────────────────────────────────────────

  Las caras se superponen un tercio en vez de ir en fila separada, y no es
  decoración: montadas se leen como UN grupo —los que están juntos en el
  escenario— y ocupan poco más que una sola, así que la columna izquierda de la
  grilla mantiene su ancho tanto con una cara como con cuatro. Separadas serían
  cuatro cosas distintas y empujarían el título.
*/
.pila {
  flex-shrink: 0;
  display: inline-flex;
}
.cara {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  object-fit: cover;
  background: color-mix(in srgb, var(--acento, #695ede) 15%, transparent);
  /* El anillo del color del fondo es lo que separa una cara de la de atrás.
     Va como sombra y no como borde para no comerse píxeles del retrato, y
     usa --noche, que es la única variable de este repo que vale el fondo de
     la página en los dos temas: #1A1A1A en oscuro y #FFFFFF en claro. */
  box-shadow: 0 0 0 2px var(--noche, #fff);
}
/* Cada cara monta sobre la anterior. La última queda arriba, que es cómo se
   apila cualquier lista de asistentes y no necesita z-index. */
.cara + .cara {
  margin-left: -0.65rem;
}
.cara-chica {
  width: 1.75rem;
  height: 1.75rem;
}
.cara-chica + .cara-chica {
  margin-left: -0.55rem;
}
.cara-iniciales {
  font-weight: 800;
  font-size: 0.7rem;
  letter-spacing: -0.02em;
  color: var(--acento-texto, #4f42c4);
}

.sub-fila {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.9rem;
}
/* El filete entre la charla y su entrevista: son dos momentos, no un párrafo
   de dos oraciones. Sólo el ancho y el estilo: el color lo trae border-linea,
   por lo mismo que está explicado arriba de .caja en el template. */
.sub-fila + .sub-fila {
  border-top-width: 1px;
  border-top-style: solid;
  padding-top: 0.9rem;
}

.fila-marco {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.disco {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--acento, #695ede) 30%, transparent);
  background: color-mix(in srgb, var(--acento, #695ede) 6%, transparent);
  color: var(--acento-texto, #4f42c4);
}
.disco-chico {
  width: 1.75rem;
  height: 1.75rem;
}

.rotulo-tipo {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--acento-texto, #4f42c4);
}
/* pre-line: un título puede traer su salto de línea desde la planilla —el de
   Bistrosoft va en dos renglones— y se respeta. Los espacios se siguen
   juntando como en cualquier texto. */
.titulo-fila {
  margin-top: 0.2rem;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.3;
  white-space: pre-line;
}
.titulo-abierto {
  margin-top: 0.2rem;
  font-size: 1rem;
  line-height: 1.3;
}
.pie-fila {
  margin-top: 0.25rem;
  font-size: 14px;
  line-height: 1.45;
  color: var(--gris, #6b6779);
}
.minutos {
  margin-left: auto;
  flex-shrink: 0;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
}

/*
  La entrada escalonada se cuelga del .v-reveal que ya maneja HomeView, igual
  que JornadaSection. El tope de 12 es porque la grilla tiene más filas que
  cualquier otra lista de la página: sin tope, la última entraría un segundo y
  medio después de la primera.
*/
.v-reveal {
  transition-delay: calc(min(var(--orden, 0), 12) * 45ms);
}
@media (prefers-reduced-motion: reduce) {
  .v-reveal {
    transition-delay: 0ms;
  }
}
</style>
