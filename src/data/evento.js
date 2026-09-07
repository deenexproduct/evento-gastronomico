/**
 * Fuente única de verdad de la landing.
 *
 * Regla del brief: al aire solo se nombra lo CERRADO. Nada que esté en gestión
 * entra acá hasta que esté confirmado por escrito.
 */

// ─────────────────────────────────────────────────────────────────────────────
// El evento
// ─────────────────────────────────────────────────────────────────────────────

export const EVENTO = {
  nombre: "SaboresTech",
  organiza: "Deenex",
  // SÁBADO 19, no domingo 20. Lo cambió la reunión con Gastón Santana del
  // 31/08: el fin de semana se parte en dos —sábado gastronomía, domingo
  // emprendedores— y SaboresTech es el sábado. Todo el material anterior decía
  // domingo, así que si algo quedó con la fecha vieja, está mal.
  // La hora de acá es la de la ACREDITACIÓN, no la del primer bloque: es lo
  // que leen el .ics, el JSON-LD y la cuenta regresiva. Si dijera 10:00 —la
  // hora del escenario—, el que se lo agenda llegaría con la acreditación
  // terminada, que es un error que este archivo ya tuvo.
  fechaISO: "2026-09-19T09:00:00-03:00",
  fechaLarga: "Sábado 19 de septiembre de 2026",
  fechaCorta: "Sábado 19.09.2026",
  // Sin anio: entra en una linea en el rotulo del hero a 375px de ancho.
  fechaBreve: "Sábado 19.09",
  fechaNumerica: "19.09.26",
  // Sin el dia de la semana: el pie lo usaba escrito a mano, que es justo la
  // forma que salio de la comunicacion.
  fechaSinDia: "19 de septiembre",
  // CUATRO ventanas, y cada una contesta una pregunta distinta. Mezclarlas es
  // lo que ya rompio esta pagina tres veces.
  //
  // `horario` es EL EVENTO ENTERO: 9:00 con la acreditacion y los stands ya
  // abiertos, hasta las 21:00 cuando se corta el networking. Es lo que leen el
  // .ics y el JSON-LD, o sea lo que queda agendado en el telefono de la gente.
  // Si dijera "9 a 18", al que se lo agenda le suena la alarma de fin tres
  // horas antes de que el evento termine.
  //
  // `horarioJornada` es el programa: de 9 a 18, acreditacion y charlas. Es lo
  // que contesta "cuanto dura el dia de trabajo".
  //
  // `horarioNetworking` es lo que sigue: de 18 a 21, sin escenario.
  //
  // `horarioCharlas` es el escenario: el primer bloque es 10:00. Escribir
  // "charlas de 9" mandaria a la sala a gente que todavia tiene que
  // acreditarse.
  //
  // Estas horas ya se movieron: la apertura fue 8:30, despues 9:30 y ahora
  // 9:00; el cierre fue 18:00 y ahora 21:00. Cada vez quedaron restos en los
  // lugares que las escriben a mano —el respaldo sin JS de index.html, el
  // endDate del JSON-LD, la tarjeta de og-image.py y los textos del FAQ—, asi
  // que si se vuelven a mover hay que barrer los tres formatos: "9:00",
  // "9 a 21" y el ISO de fechaISO.
  horario: "9 a 21",
  horarioJornada: "9 a 18",
  horarioNetworking: "18 a 21",
  horarioCharlas: "10 a 18",
  puertas: "9:00",
  ciudad: "Córdoba",
  venue: "Hotel Quinto Centenario",
  direccion: "Duarte Quirós 1300",
  // La bajada de la marca del evento, en una línea. Es la misma que compone la
  // tarjeta de WhatsApp (herramientas/og-image.py, en dos renglones) y la que
  // cierra el pie. El .py no puede importar este archivo —es Python—, así que
  // si esto cambia hay que cambiarlo también allá.
  bajada: "Gastronomía y tecnología para dueños de cadenas",
  // Contexto, nunca asistencia propia: las 20.000 son del evento madre.
  eventoMadre: "Córdoba Corazón de Moda",
  eventoMadreCirculacion: "20.000",
};

/*
 * ACÁ VIVÍA `DOMINGO`, la jornada de emprendedores del día siguiente.
 *
 * Sale de la landing entera por decisión de contenido: esta página convoca a
 * SaboresTech, que es el sábado 19, y el domingo es otro evento con otro
 * público. Nunca terminó de estar definido —conductora, programa y oradores
 * quedaron abiertos desde el 31/08— así que lo único que aportaba era una
 * segunda fecha compitiendo con la que hay que retener.
 *
 * Y competía en el peor lugar: su rótulo violeta en versales decía "Domingo 20
 * de septiembre" dos bloques antes del pedido de reserva, que es exactamente
 * la confusión de fecha que ya costó una corrección en todo el repo.
 *
 * Si el domingo vuelve, vuelve como su propia landing o como una sección
 * después del CTA, nunca antes.
 */

/**
 * Los cinco bloques de la cabecera. Cada uno es una vista con su detalle.
 *
 * Una sola lista para el nav de arriba y para el pie: antes estaban duplicadas
 * y ya habían derivado —cinco arriba y tres abajo—, así que el pie escondía
 * justo lo que alguien que llega de un anuncio busca primero.
 *
 * `corto` es la etiqueta de la barra cuando no entra la larga. Sólo la
 * definen los dos bloques cuyo nombre completo no entra en una fila de 678px
 * junto al logo y al botón; los demás usan `label` en los dos lados.
 *
 * `resumen` es la línea que se muestra en la tarjeta del bloque cuando se lo
 * ofrece desde la home. Corta a propósito: si no entra en un renglón, el
 * bloque está tratando de contar demasiado y le sobra contenido a la home.
 */
export const BLOQUES = [
  {
    ruta: "/que-es",
    label: "Qué es",
    titulo: "Qué es SaboresTech",
    resumen: "Para quién es, qué pasa ese día y qué no es.",
  },
  {
    ruta: "/beneficios",
    label: "Qué te llevás",
    corto: "Te llevás",
    titulo: "Con qué te volvés",
    resumen: "Las seis cosas que te llevás el lunes.",
  },
  {
    // La ruta no cambia: hay links compartidos apuntando acá. Lo que cambia es
    // la etiqueta — "Deadline" era jerga, en inglés, en una página escrita en
    // castellano para el dueño de una empresa. Lo que el lector quiere saber
    // es si todavía hay lugar.
    ruta: "/deadline",
    label: "Si hay lugar",
    corto: "Lugares",
    titulo: "Hasta cuándo hay lugar",
    resumen: "Doscientos lugares y una fecha que no se mueve.",
  },
  {
    ruta: "/participan",
    label: "Quiénes vienen",
    corto: "Quiénes",
    titulo: "Quiénes son parte",
    resumen: "Un lugar por rubro, y qué trae cada uno.",
  },
  {
    ruta: "/organiza",
    label: "Quién organiza",
    corto: "Organiza",
    titulo: "Quién organiza",
    // "Deenex, y por qué abrimos este espacio" repetía en la home la postura
    // que se sacó del hero: la empresa como sujeto. Acá el dato SÍ corresponde
    // —es la tarjeta que lleva a la vista de quién organiza— pero como
    // respuesta a una pregunta del lector, no como autoría reclamada.
    resumen: "Quién está detrás y con qué credencial.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Cupo
//
// `ocupados` es el fallback estático. Si existe VITE_CUPO_ENDPOINT, la landing
// lo consulta al montar y pisa este valor con el real. Ver useCupo().
// ─────────────────────────────────────────────────────────────────────────────

export const CUPO = {
  total: 200,
  ocupados: 85, // ← actualizar a mano hasta que el endpoint esté conectado
};

// ─────────────────────────────────────────────────────────────────────────────
// Los temas del día — esto es lo que se viene a escuchar y lo que vende.
//
// Cada tema abre una idea sin resolverla: el que la lee tiene que querer
// escuchar el resto en la sala.
// ─────────────────────────────────────────────────────────────────────────────

export const TEMAS = [
  {
    id: "pagos",
    tramo: "manana",
    dur: 30,
    hora: "10:00",
    tipo: "charla",
    titulo: "Cómo se entra a una promoción bancaria, y por qué eligen a unos y a otros no",
    quien: "Rubro pagos",
    estado: "abierto",
    empresa: "",
    punta:
      "Cómo funciona por dentro una promoción bancaria: quién la arma, qué mira el banco para elegir un comercio y qué se negocia. Cuánto tráfico mueve un día de descuento y qué tiene que tener resuelto la cadena para poder entrar.",
    temas: ["Quién arma la promoción", "Qué mira el banco", "Qué se negocia y qué no", "Qué hay que tener resuelto"],
    abre: true,
  },
  {
    id: "patrones",
    tramo: "manana",
    dur: 45,
    hora: "10:40",
    tipo: "charla",
    titulo: "Los 7 patrones que se repiten en más de 500 locales gastronómicos",
    quien: "Alan Tapia",
    estado: "confirmado",
    empresa: "Deenex Technologies",
    punta:
      "Siete patrones que aparecen una y otra vez en la operación de cientos de locales, vistos desde los datos de la plataforma. Cada uno con el número al lado y con qué hicieron distinto los que los corrigieron.",
    temas: ["Los siete patrones, uno por uno", "El número detrás de cada uno", "Qué hicieron los que los corrigieron"],
  },
  {
    id: "crecer",
    tramo: "manana",
    dur: 30,
    hora: "11:35",
    tipo: "charla",
    titulo: "La mayoría de las cadenas no quiebra por vender poco: quiebra creciendo",
    quien: "Avanzia",
    estado: "participa",
    empresa: "Consultoría de gestión",
    punta:
      "Qué se rompe cuando una cadena crece más rápido de lo que su operación aguanta, y qué hay que tener montado antes de abrir el próximo local. Mirada de industria, no de producto.",
    temas: ["Qué se rompe primero al crecer", "Qué montar antes del próximo local", "Casos de cadenas que se rompieron así"],
  },
  {
    id: "desperdicio",
    tramo: "manana",
    dur: 30,
    hora: "12:15",
    tipo: "charla",
    titulo: "El desperdicio se lleva el margen de un local entero por año",
    quien: "Rubro equipamiento de cocina",
    estado: "abierto",
    empresa: "",
    punta:
      "Medición de desperdicio en tiempo real: qué se puede sensar hoy en una cocina, qué dato produce y qué decisión cambia con ese dato.",
    temas: ["Qué se puede medir hoy en una cocina", "Qué dato produce cada medición", "Qué decisión cambia con ese dato"],
  },
  {
    id: "networking",
    tramo: "bisagra",
    dur: 60,
    hora: "12:45",
    tipo: "networking",
    titulo: "Networking",
    quien: "",
    estado: "",
    empresa: "",
    punta:
      "Stands abiertos y la sala suelta. Acá termina la mañana y arranca la jornada de la tarde: es la hora larga del día para cruzarse con el resto sin apuro.",
    temas: [],
  },
  {
    id: "pos",
    tramo: "tarde",
    dur: 30,
    hora: "13:45",
    tipo: "charla",
    titulo: "La nueva generación de sistemas POS: lo que hace, y el tuyo todavía no",
    quien: "Bistrosoft",
    estado: "participa",
    empresa: "Punto de venta",
    punta:
      "Cómo cambió la categoría: de una caja que cobra a un sistema que ordena la operación entera. Qué hace hoy un POS que hace cinco años no existía, y qué información produce que el dueño nunca abre.",
    temas: ["Qué hace hoy un POS que antes no", "Qué información produce y nadie abre", "Cómo se ordena la operación con eso"],
  },
  {
    id: "benchmark",
    tramo: "tarde",
    dur: 45,
    hora: "14:25",
    tipo: "interactivo",
    titulo: "Los números de las 200 cadenas de esta sala, en vivo",
    quien: "Alan Tapia, con la sala",
    estado: "confirmado",
    empresa: "Deenex Technologies",
    punta:
      "Los números de la sala, proyectados y comparados en vivo. Cada uno ve dónde está parado respecto de las cadenas que tiene al lado: food cost, ticket promedio y mezcla de canales.",
    temas: ["Tu food cost contra la mediana de la sala", "Tu ticket promedio", "Tu mezcla de canales"],
  },
  {
    id: "control",
    tramo: "tarde",
    dur: 30,
    hora: "15:20",
    tipo: "charla",
    titulo: "El local que nadie controla deja de ser tu marca en tres meses",
    quien: "Asociación de Marcas y Franquicias",
    estado: "participa",
    empresa: "Institucional",
    punta:
      "Cómo se sostiene el estándar de una red a distancia: qué mide hoy una central, con qué frecuencia, y qué pasa en el local que hace un trimestre que nadie visita.",
    temas: ["Qué mide una central y cada cuánto", "Qué pasa en el local sin visitas", "Cómo se sostiene el estándar a distancia"],
  },
  {
    id: "ia",
    tramo: "tarde",
    dur: 30,
    hora: "16:00",
    tipo: "charla",
    titulo: "La IA ya está adentro de las cadenas más grandes del país",
    quien: "I+DIoT Lab",
    estado: "participa",
    empresa: "Datos e inteligencia artificial",
    punta:
      "Casos reales de inteligencia artificial implementada en cadenas grandes, contados por los que la montaron: qué se automatizó, qué costó y qué devolvió. Incluidos los que no funcionaron, que es lo que nadie cuenta.",
    temas: ["Qué se automatizó y qué costó", "Qué devolvió, con el número", "Los que no funcionaron"],
  },
  {
    id: "ugc",
    tramo: "tarde",
    dur: 30,
    hora: "16:40",
    tipo: "charla",
    titulo: "Cómo crear contenido sin crear contenido",
    quien: "Rubro marketing y contenido",
    estado: "abierto",
    empresa: "",
    punta:
      "El contenido lo produce el cliente. Cómo se arma un sistema para que la gente que entra a tus locales genere el material, cómo se lo incentiva, cómo se filtra y cómo se publica sin un equipo de producción atrás.",
    temas: ["Cómo se incentiva al cliente a grabar", "Cómo se filtra lo que sirve", "Cómo se publica sin equipo propio"],
  },
  {
    id: "panel",
    tramo: "cierre",
    dur: 40,
    hora: "17:20",
    tipo: "panel",
    titulo: "Cada proveedor jura que su parte funciona. El conjunto no.",
    quien: "Panel · varios rubros, con moderación",
    estado: "abierto",
    empresa: "",
    punta:
      "Integración: por qué una cadena con cinco sistemas que andan bien por separado sigue sin poder cerrar el mes de un tirón. Cada uno defiende su parte y el problema queda a la vista.",
    temas: ["Dónde se corta la información entre sistemas", "Quién se hace cargo de la integración", "Qué se puede exigir a un proveedor"],
    cierra: true,
  },
];

/** Los cuatro tipos de bloque, con su pictograma y su tinte. */
export const TIPOS_BLOQUE = {
  charla: { label: "Charla", icono: "charla" },
  interactivo: { label: "Con la sala", icono: "gente" },
  networking: { label: "Networking", icono: "gente" },
  panel: { label: "Panel", icono: "mesa" },
  pausa: { label: "Pausa", icono: "degustacion" },
  apertura: { label: "Acreditación", icono: "entrada" },
  cierre: { label: "Networking", icono: "gente" },
};

/**
 * Cómo se rotula a quién da cada bloque. Al aire sólo se nombra lo cerrado:
 * hoy el único confirmado es Alan. Los que están participando del armado ya
 * tienen su logo publicado en la barra de arriba, así que se los nombra; los
 * rubros que todavía se están vendiendo van por rubro y sin marca.
 */
export const ESTADOS_BLOQUE = {
  confirmado: { label: "Confirmado", tono: "firme" },
  participa: { label: "Participa del armado", tono: "medio" },
  abierto: { label: "Orador por confirmar", tono: "tenue" },
};


/**
 * Solo los huecos que tienen nombre propio, indexados por la hora que el
 * componente CALCULA. Los que no figuran caen al default "Pausa".
 *
 * La duración nunca se declara acá: se resta entre el fin de un bloque y el
 * arranque del siguiente. Si mañana se mueve un horario, la pausa se
 * recalcula sola y la sección no puede mentir.
 */
export const PAUSAS = {};
/**
 * Las dos puntas del día. Estas sí publican hora: 9:00, 18:00 y 21:00 ya están
 * al aire en la sección del lugar y en EVENTO.horario.
 *
 * OJO CON `cierre`: su `hora` es cuando ARRANCA el networking, no cuando
 * termina el evento. Son las 18:00, que es también cuando termina la grilla —de
 * ahí que un test verifique que el último bloque cae exactamente ahí—. El
 * evento sigue tres horas más y termina a las 21:00, que es lo que dice
 * `hasta` y lo que tiene que leer el .ics.
 *
 * Confundir esas dos es el error que hay que evitar: si el .ics tomara `hora`,
 * la alarma de fin sonaría tres horas antes de que la sala se vacíe.
 */
export const BORDES = {
  apertura: {
    id: "apertura",
    tipo: "apertura",
    hora: "9:00",
    titulo: "Acreditación y stands abiertos",
    detalle: "Te recibimos uno por uno, con los stands ya abiertos.",
  },
  cierre: {
    id: "cierre",
    tipo: "cierre",
    hora: "18:00",
    hasta: "21:00",
    titulo: "Networking de cierre",
    detalle: "Termina la grilla y la sala queda suelta hasta las 21.",
  },
};


/**
 * Qué va a haber ese día, sin hora.
 *
 * Reemplaza al cronograma hora por hora en la home. La grilla completa sigue
 * viva en TEMAS —la usan el .ics, las cifras del día y la sección del lugar—,
 * pero dejó de ser lo que se muestra: once renglones con hora exacta obligan a
 * publicar quién da cada uno, y hoy cuatro de diez dicen "orador por
 * confirmar". Enumerar lo que hay dice lo mismo sin pedir prestado un dato que
 * todavía no está cerrado.
 *
 * Cada línea sale de algo que ya está en este archivo o en el padrón de
 * sponsors: ninguna promete nada nuevo.
 *
 * Sobre la degustación y el coffee break: el commit af88276 los sacó del
 * cronograma porque las ocho pausas decían "Degustación y preparación" una
 * debajo de otra y la palabra aparecía más veces que cualquier título del día.
 * Eso NO los eliminó del evento —siguen en el aporte de "La mesa de
 * degustación", en PARTNERS—. Nombrarlos una vez acá es lo contrario de aquel
 * problema: una mención, no ocho.
 */
export const QUE_HAY = [
  {
    icono: "chip",
    titulo: "Referentes tecnológicos",
    detalle: "Los que ya lo implementaron en sus locales, contando qué costó y qué devolvió.",
  },
  {
    icono: "charla",
    titulo: "Charlas",
    // "Track único" NO va acá: lo dice la bajada de la sección, dos renglones
    // más arriba, y repetirlo en la misma pantalla gasta uno de los ocho
    // renglones que tiene esta lista para decir algo nuevo.
    detalle: "De 30 y 45 minutos, cada una sobre un problema concreto de la operación.",
  },
  {
    icono: "mesa",
    titulo: "Paneles",
    detalle: "Varios rubros discutiendo el mismo problema, con moderación.",
  },
  {
    icono: "estrella",
    titulo: "Invitado especial",
    // Sin nombre a propósito: la regla del brief es que al aire sólo se nombra
    // lo cerrado. Cuando esté firmado, entra el nombre acá.
    detalle: "El nombre se anuncia antes del evento.",
  },
  {
    icono: "demo",
    titulo: "Stands",
    detalle: "Sistemas andando, no en una slide: te parás adelante y preguntás por tu caso.",
  },
  {
    icono: "degustacion",
    titulo: "Degustación",
    detalle: "Alfajores, aceitunas, humus y café entre bloque y bloque.",
  },
  {
    icono: "gente",
    // "del mediodía" no es adorno: la ficha de arriba de esta misma sección
    // publica "18 a 21 · Networking", que es el de cierre. Sin el apellido, la
    // pantalla decía dos veces "Networking" con dos horarios distintos.
    titulo: "Networking del mediodía",
    detalle: "Una hora larga entre bloque y bloque, con los stands abiertos y la sala suelta.",
  },
  {
    icono: "cafe",
    titulo: "Coffee break",
    detalle: "A la tarde, en el corte entre bloque y bloque.",
  },
];

/**
 * Las cuatro confusiones que aparecen solas. Viven acá y no en un componente
 * porque las usa el recorrido de la home y las repite el deck: un solo lugar.
 */
export const NO_ES = [
  "Una feria de comida",
  "Un curso ni una capacitación",
  "Una ronda de reuniones agendadas",
  "Un evento para público general",
];

/** Con qué volvés al local. Verbo + resultado tangible, sin adjetivos. */
export const EL_LUNES = [
  "Qué tecnología está usando hoy el resto del rubro, contada por los que la implementan",
  "Los proveedores del rubro comparados en un día, en vez de en tres meses de reuniones",
  "Sistemas andando, no en una slide: te parás adelante, preguntás por tu caso y ves si te sirve",
  "Cómo comparar el food cost real entre tus locales, no el que dice la ficha técnica",
  "Qué datos ya generan tus locales y cómo se leen juntos",
  "Los beneficios de cada sponsor por escrito, en un solo material, para usarlos cuando vuelvas",
];

// ─────────────────────────────────────────────────────────────────────────────
// Fotos
//
// Todo lo que está en "" es un hueco marcado en la landing (ver FotoSlot.vue).
// Para enchufar una foto: dejarla en src/assets/images/ y poner acá el nombre
// del archivo tal cual, con extensión.
// ─────────────────────────────────────────────────────────────────────────────

export const FOTOS = {
  /** El salón del hotel. El brief lo marca como argumento, no como detalle. */
  salon: "",
  /** Sala llena en un evento anterior, para prueba social. */
  sala: "",
};

// ─────────────────────────────────────────────────────────────────────────────
// Partners — SOLO CERRADOS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Los sponsors que están participando del armado.
 *
 * REGLA DEL BRIEF: acá solo entra lo que ya está trabajando en el evento.
 *
 * NINGUNO FIRMÓ TODAVÍA, así que la página no dice que lo hicieron. Lo que se
 * muestra de cada uno es el rubro que ocupa y qué pone en el día — las dos
 * cosas son verificables y no comprometen a nadie. Un rótulo de estatus
 * ("sponsor oficial", "confirmado") afirma una firma que no existe, y además
 * inventa una jerarquía que la política comercial prohíbe: no hay niveles,
 * todos aportan lo mismo y reciben lo mismo.
 *
 * Para sumar uno hacen falta cinco campos y un archivo, y nada más:
 *   nombre   el nombre de la marca, tal cual lo escribe ella
 *   rubro    la ranura que ocupa — hay una sola por rubro, y es lo que hace
 *            concreta la exclusividad. NO es un nivel ni una categoría de
 *            sponsoreo: los diez valen igual
 *   empresa  a qué se dedica, una línea, para el que no la conoce
 *   quien    la persona concreta que viene — es lo que lo hace creíble
 *   aporte   qué pone en el día: charla, demo, stand, convocatoria
 *   logo     el archivo en src/assets/images/partners/. Vacío muestra el
 *            nombre en tipografía, que es mejor que un hueco. El muro los
 *            pinta con brightness(0), así que no hace falta pedir la
 *            versión monocroma: entra el archivo de color que tengan.
 *
 * `enBarra: false` lo deja fuera de la barra de arriba y le conserva la
 * tarjeta — se usa para los que no son el nombre de una empresa.
 *
 * La grilla de tarjetas está medida hasta seis: con cuatro y con cinco no
 * deja una sola colgada en una fila vacía (ver bloque-a.spec.js).
 */
export const PARTNERS = [
  {
    nombre: "Bistrosoft",
    logo: "bistrosoft.svg",
    rubro: "Punto de venta",
    empresa:
      "Sistema de gestión y punto de venta para gastronomía. Trabaja con locales de todo el país.",
    quien: "Viene el CEO",
    aporte: "Da la charla sobre la evolución del POS y monta su stand con equipo propio.",
  },
  {
    nombre: "Avanzia",
    logo: "avanzia.png",
    rubro: "Consultoría de gestión",
    empresa: "Consultora de gestión y desarrollo de negocios para empresas del rubro.",
    quien: "Traen dos oradores",
    aporte: "El ex-CEO de Dexter y el ex-presidente de la CAME, sobre conducción y mercado.",
  },
  {
    nombre: "Asociación de Marcas y Franquicias",
    logo: "aamf.webp",
    rubro: "Institucional",
    empresa:
      "Nuclea a las marcas y cadenas del país que crecen por franquicia y por locales propios.",
    quien: "Acompaña la convocatoria",
    aporte: "Acerca a la sala cadenas de otras provincias y respalda la jornada institucionalmente.",
  },
  {
    nombre: "I+DIoT Lab",
    logo: "idiotlab.png",
    rubro: "Datos e inteligencia artificial",
    empresa:
      "Integra hardware, software e IA para digitalizar tiendas físicas: kioscos, tablets de asistencia, sistemas de fila y smart boxes.",
    quien: "Lo cuenta desde adentro",
    aporte: "Casos de IA ya implementada en cadenas grandes: qué se automatizó, qué costó y qué devolvió.",
  },
  {
    nombre: "La mesa de degustación",
    // No es el nombre de una empresa: en la barra de arriba, que son puros
    // nombres, se leía como una que no existe. Su tarjeta en #partners queda.
    enBarra: false,
    logo: "",
    rubro: "Degustación",
    empresa: "Los proveedores que ponen lo que se come y se toma durante toda la jornada.",
    quien: "Cuatro rondas más una larga",
    aporte: "Alfajores, aceitunas, humus y café entre bloque y bloque, y coffee break a la tarde.",
  },
];

/** Marcas del ecosistema Deenex. Prueba social, sin restricción de confidencialidad. */
export const MARCAS_LOGOS = [
  "hatsu.webp",
  "palta.webp",
  "konex.webp",
  "quem.webp",
  "la-fabrica.webp",
  "coquitos.webp",
  "glorias.webp",
  "monti.webp",
  "emplatame.webp",
  "ayres.webp",
  "Maxirest.webp",
  "sportclub.png",
];

// ─────────────────────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────────────────────

export const FAQ = [
  {
    q: "¿De qué se habla exactamente?",
    a: "De tendencias e innovación aplicadas a una cadena: el estado real del mercado con números, tus propios indicadores comparados en vivo con los del resto de la sala, la evolución de los sistemas POS, qué inteligencia artificial ya devuelve plata en varios locales y cuál todavía no, cómo se conduce una cadena cuando el mercado se endurece, y cómo se sostiene una marca en varios puntos a la vez. Diez bloques a lo largo del día, más una hora de networking.",
  },
  {
    q: "¿Me van a querer vender algo?",
    a: `Sí, y conviene decirlo derecho. El evento lo organiza Deenex, que le vende software a cadenas como la tuya, y hay sponsors con stand que también venden. A las ${TEMAS.find((t) => t.id === "pos").hora} el CEO de Bistrosoft muestra su sistema en vivo, dentro del programa. Lo que no hay es una agenda de reuniones armada ni nadie que te aborde: la conversación de negocios la arrancás vos. Si te vas sin haber hablado de plata con nadie, para nosotros el día salió bien igual.`,
  },
  {
    q: "Tengo el local abierto ese día. ¿Cómo hago?",
    a: "Es la que más nos preguntan, y con un sábado pesa más todavía, así que va derecho: no hace falta que estés las doce horas y nadie controla la butaca. Venís a la mañana, te llevás el estado del mercado y cómo comparar tus locales entre sí, y estás de vuelta en el local para el servicio. O llegás a media tarde y agarrás los últimos bloques y el panel de cierre, donde los proveedores discuten entre ellos delante de la sala. La grilla final les llega a los inscriptos antes del evento, así elegís a qué venir. Lo que no te conviene es mandar a alguien en tu lugar: lo que se habla acá —qué cerrar, qué cambiar, con quién meterte— lo terminás firmando vos, y la sala está armada para que los dueños se crucen entre ellos. Traé a tu socio o a tu gerente general si querés, pero vení.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Nada. Sí hay que reservar antes, y el cupo es real: 200 personas. Sin reserva no hay ingreso.",
  },
  {
    q: "¿Por qué solo 200 lugares?",
    a: "Porque es lo que entra en el salón y porque a partir de ahí deja de ser una sala de trabajo. Preferimos 200 dueños de cadenas que puedan hablar entre ellos antes que un auditorio lleno donde nadie se cruza con nadie.",
  },
  {
    q: "¿Tengo que saber de tecnología para aprovecharlo?",
    a: "No. Se habla de margen, tiempo y decisiones, no de fierros. Si manejás una cadena, ya tenés todo lo que hace falta para sacarle provecho al día.",
  },
  {
    q: "Tengo un solo local. ¿Igual me sirve?",
    a: "La jornada está armada para cadenas: casi todo lo que se cuenta —costos comparados entre locales, sistemas que unifican varias sucursales, cómo se sostiene una marca en varios puntos— asume que ya tenés más de uno. Si estás por abrir el segundo, te va a servir. Si no está en tus planes, preferimos ser honestos: hay eventos que te van a rendir más.",
  },
  {
    q: "¿Qué es el diagnóstico del que hablan?",
    a: "Un beneficio para los que asisten: si lo solicitás el día del evento, coordinamos una reunión técnica sobre tu marca —dónde está parada a nivel tecnológico y cuál sería el próximo paso—. Es opcional y sin costo. No es el motivo del evento: es algo más que podés llevarte.",
  },
  {
    q: "¿Puedo llevar a alguien de mi equipo?",
    a: "Sí, y conviene. Cada persona reserva con su propio mensaje de WhatsApp porque el cupo se cuenta por persona; en la puerta alcanza con el nombre de cada uno. Venir con tu socio o tu gerente general hace que lo que escuchan rinda más cuando vuelven al local.",
  },
  {
    q: "¿Se come algo durante el día?",
    a: "Sí, y está en la entrada. Café de bienvenida desde las 9:00 con los stands ya abiertos, algo para picar entre bloque y bloque —alfajores, aceitunas, humus y café—, la hora de networking de 12:45 a 13:45 con la ronda grande, y vino, cerveza y café en el cierre. No hay almuerzo servido: se come circulando, entre bloque y bloque.",
  },
  {
    q: "¿Se transmite en vivo?",
    a: "No. Lo que pasa en la sala pasa estando ahí: los sistemas se prueban en los stands, el panel se responde de frente y el networking no tiene versión remota. Lo que sí queda por escrito es el material del día, que les llega a los que asistieron.",
  },
  {
    q: "¿Dónde es exactamente?",
    a: `En un salón propio del ${EVENTO.venue}, ${EVENTO.direccion}, Córdoba. Puertas ${EVENTO.puertas}, charlas de ${EVENTO.horarioCharlas}. Se entra por lista: adentro estamos los 200 y nadie más. Ese mismo día el centro de convenciones aloja ${EVENTO.eventoMadre}, y tu acreditación de SaboresTech también te habilita ese evento: son unas ${EVENTO.eventoMadreCirculacion} personas circulando por el edificio durante el día. La sala de SaboresTech es aparte.`,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Registro


// ─────────────────────────────────────────────────────────────────────────────
// Marcas ya anotadas.
//
// Para un dueño de cadena, enterarse de que va un par respetado es el
// argumento más fuerte de la página. Solo entran las que dieron el opt-in en
// el formulario. Con la lista vacía la sección no se renderiza: mostrar dos
// nombres en un espacio pensado para veinte se lee como fracaso.
// ─────────────────────────────────────────────────────────────────────────────

export const MARCAS_ANOTADAS = [
  // { nombre: "Nombre de la cadena", locales: "8 locales" },
];

/**
 * El contador de anotados se enciende recién a partir de este número. Por
 * debajo, decir "van 12 de 200" destruye más de lo que construye.
 */
export const MINIMO_PARA_MOSTRAR_CUPO = 60;

/** WhatsApp de Alan — fallback cuando no hay endpoint conectado. */

// ─────────────────────────────────────────────────────────────────────────────
// Reels verticales embebidos.
//
// Se llenan con las piezas que ya se graban para redes: el material existe
// igual, así que no hay costo de producción extra. Dejar el .mp4 en
// src/assets/video/ y poner acá el nombre del archivo.
// Con la lista vacía, la sección directamente no se renderiza.
// ─────────────────────────────────────────────────────────────────────────────

export const REELS = [
  // { archivo: "01-por-que-ahora.mp4", poster: "01.jpg", titulo: "Por qué armé este evento" },
  // { archivo: "05-tus-datos.mp4", poster: "05.jpg", titulo: "Tu sistema de cobro sabe más que vos" },
  // { archivo: "17-el-salon.mp4", poster: "17.jpg", titulo: "Este es el salón" },
];


// El número por el que entra toda la convocatoria. Formato wa.me: sin +, sin
// espacios y con el 9 de celular. Es el único lugar donde vive: los cinco
// mensajes y los seis botones lo toman de acá.
//
// +54 9 3518 010147, que es 351 —Córdoba— y no 11: la convocatoria pasa a un
// número local. Antes era el 11 3330-2145, y antes de ése el personal de Alan.
// Ojo al cambiarlo: index.html lo tiene escrito a mano en el respaldo sin
// JavaScript, porque ese bloque no puede importar nada. Lo vigila
// tests/unit/respaldo-sin-js.test.js.
export const WHATSAPP_ORGANIZADOR = "5493518010147";

// ─────────────────────────────────────────────────────────────────────────────
// Mensajes de WhatsApp.
//
// Todos van al mismo número. Cada uno arranca identificando de qué se trata,
// para que del otro lado se sepa qué es sin tener que preguntarlo.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * El mensaje de reserva. Es todo lo que queda del formulario.
 *
 * El orden importa: en el celular la caja de texto de WhatsApp muestra las
 * primeras líneas y el resto hay que scrollearlo, así que primero va lo que ya
 * viene resuelto y después lo que hay que completar.
 *
 * Se sacaron tres campos del formulario a propósito:
 * · whatsapp — el chat ES el número; pedirlo ahí adentro es absurdo.
 * · acepta   — mandar el mensaje a mano ya es la confirmación.
 * · publicar — se pregunta en la conversación, que deja el sí por escrito con
 *              nombre y fecha: mejor consentimiento que un checkbox.
 */
/**
 * El mensaje de reserva, sobre la base única.
 *
 * Antes traía un rótulo en mayúsculas y cinco renglones para completar a mano
 * —nombre, marca, locales, rol, mail—. En el teclado de un teléfono eso son
 * cinco campos que la mayoría borra antes de mandar, y el dato se perdía
 * igual. Ahora el mensaje se manda de una y los datos se piden en la
 * conversación, que es donde contestar cuesta un toque.
 */
/**
 * Con quién se habla del otro lado. Está en una constante porque aparece en
 * los seis mensajes: si cambia la persona que atiende, cambia acá y nada más.
 */
const SALUDO = "Hola Romina!";

/*
  El de reserva NO usa SALUDO y es el único de los seis: abre con "Buenas!" y
  no nombra a nadie del otro lado.

  Los otros cinco siguen saludando a Romina, que es quien atiende. Si el número
  nuevo lo atiende otra persona, lo que hay que cambiar es SALUDO —una línea, y
  los cinco se mueven juntos—; este no la nombra, así que no se entera.
*/
/** El tope del selector de "cuántos van". Lo comparten el botón y el mensaje. */
export const TOPE_PERSONAS = 4;

export function mensajeReserva({ agotado = false, personas = 1 } = {}) {
  if (agotado) {
    return `Buenas! Quiero anotarme en la lista de espera del evento del ${EVENTO.fechaSinDia}.`;
  }

  /*
    Cuántos van es el único dato que la conversación no recupera sin costo: el
    cupo se cuenta por persona, así que 200 mensajes que dicen "quiero mi
    lugar" pueden ser 260 personas en la puerta. Va en la misma línea y sólo
    cuando son más de uno — un "vamos 1" no informa nada y alarga el mensaje.
  */
  /*
    La fecha va en el mensaje aunque el pedido era sólo "quiero sumarme al
    evento": del otro lado entran también los mensajes del domingo, que es otra
    jornada, y sin la fecha hay que preguntar a cuál de las dos.
  */
  const base = `Buenas! Quiero sumarme al evento del ${EVENTO.fechaSinDia}`;
  if (personas <= 1) return `${base}.`;
  /*
    El selector topa en "4 o más" (RegistroSection), así que el 4 no significa
    cuatro: significa cuatro o más. El mensaje decía "vamos 4" y del otro lado
    se anotaban cuatro lugares para un grupo que podía ser de siete. Escribirlo
    igual que el botón deja la cifra abierta y hace que la repregunta ocurra en
    el chat, que es donde cuesta un toque.
  */
  const cuantos = personas >= TOPE_PERSONAS ? `${TOPE_PERSONAS} o más` : personas;
  return `${base}, vamos ${cuantos}.`;
}

/** El enlace de reserva, listo para abrir. */
export function linkWaReserva(opciones) {
  return `https://wa.me/${WHATSAPP_ORGANIZADOR}?text=${encodeURIComponent(mensajeReserva(opciones))}`;
}

export const MENSAJES_WA = {
  registro: mensajeReserva(),
  partner: `${SALUDO} Me interesa participar como sponsor del evento del ${EVENTO.fechaSinDia}.`,
  // El del tablero pregunta por el rubro, que es lo que ahí se está mirando.
  rubro: `${SALUDO} Quiero consultar por un rubro libre del evento del ${EVENTO.fechaSinDia}.`,
  prensa: `${SALUDO} Quiero acreditarme como prensa para el evento del ${EVENTO.fechaSinDia}.`,
  consulta: `${SALUDO} Tengo una consulta sobre el evento del ${EVENTO.fechaSinDia}.`,
};

/** Arma el enlace listo para abrir. */
export function linkWa(clave) {
  return `https://wa.me/${WHATSAPP_ORGANIZADOR}?text=${encodeURIComponent(MENSAJES_WA[clave] || "")}`;
}
