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
  fechaISO: "2026-09-19T09:30:00-03:00",
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
  // `horario` es EL EVENTO ENTERO: 9:30 con la acreditacion y los stands ya
  // abiertos, hasta las 18:10 cuando termina el networking de cierre. Es lo que
  // leen el .ics y el JSON-LD, o sea lo que queda agendado en el telefono de la
  // gente. Si dijera "9:30 a 17:10", al que se lo agenda le suena la alarma de
  // fin una hora antes de que el evento termine.
  //
  // `horarioJornada` es el programa: de 9:30 a 17:10, acreditacion y
  // escenario. Es lo que contesta "cuanto dura el dia de trabajo".
  //
  // `horarioNetworking` es lo que sigue: de 17:10 a 18:10, sin escenario.
  //
  // `horarioCharlas` es el escenario: el primer bloque es 10:00. Escribir
  // "charlas de 9:30" mandaria a la sala a gente que todavia tiene que
  // acreditarse.
  //
  // LAS PUNTAS SALEN DE GRILLA: la primera fila abre el salón y la última
  // cierra el networking. Acá se repiten porque este objeto se lee antes que
  // la grilla, y contradicciones.test.js vigila que digan lo mismo.
  //
  // Estas horas ya se movieron: la apertura fue 8:30, 9:30, 9:00 y de nuevo
  // 9:30; el cierre fue 18:00, 21:00 y ahora 18:10, con la planilla del 16/09.
  // Cada vez quedaron restos en los lugares que las escriben a mano —el
  // respaldo sin JS y el JSON-LD de index.html, la tarjeta de og-image.py—, asi
  // que si se vuelven a mover hay que barrer los tres formatos: "9:30",
  // "9:30 a 18:10" y el ISO de fechaISO.
  horario: "9:30 a 18:10",
  horarioJornada: "9:30 a 17:10",
  horarioNetworking: "17:10 a 18:10",
  horarioCharlas: "10 a 17:10",
  puertas: "9:30",
  ciudad: "Córdoba",
  venue: "Hotel Quinto Centenario",
  direccion: "Duarte Quirós 1300",
  // Los dos contactos de prensa, para escribirlos en un solo lugar. El número
  // es el mismo WHATSAPP_ORGANIZADOR de más abajo, acá en el formato en que se
  // lee; la casilla es la que firma la campaña de prensa y recibe las respuestas.
  whatsappVisible: "+54 9 351 801-0147",
  mailPrensa: "saborestech@deenex.tech",
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
];

// ─────────────────────────────────────────────────────────────────────────────
// Cupo
//
// `ocupados` es el fallback estático. Si existe VITE_CUPO_ENDPOINT, la landing
// lo consulta al montar y pisa este valor con el real. Ver useCupo().
// ─────────────────────────────────────────────────────────────────────────────

export const CUPO = {
  total: 200,
  ocupados: 173, // ← actualizar a mano hasta que el endpoint esté conectado
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

// ─────────────────────────────────────────────────────────────────────────────
// LA GRILLA DEL DÍA — el run-of-show, tal cual lo opera producción.
//
// Es la planilla del 16/09 pasada a dato, fila por fila: las mismas 29 filas y
// los mismos horarios. Es también la fuente de las horas de toda la página:
// la jornada y el FAQ las leen de acá, y EVENTO y BORDES repiten las dos
// puntas del día bajo la vigilancia de contradicciones.test.js.
//
// LO QUE NO SE COPIÓ DE LA PLANILLA, por decisión de Alan y no por descuido:
// la conductora, que no se nombra en la página (15/09); el título de la
// apertura, que la planilla sigue llamando «Bienvenida y apertura de la
// jornada» (15/09); el apellido del orador de PUNI (ver SPEAKERS), y el nombre
// de la entrevista de las 15:20 (ver la fila).
//
// POR QUÉ VUELVE LA GRILLA. Se había sacado de la home por una razón escrita
// en JornadaSection: "una agenda hora por hora obliga a publicar quién da cada
// bloque, y hoy cuatro de diez dicen orador por confirmar". Esa condición ya no
// existe —cada bloque de contenido tiene nombre y empresa—, así que el motivo
// del retiro se cayó.
//
// EL DÍA TIENE UN PATRÓN y es lo único que la planilla no deja ver: cada
// empresa ocupa DOS filas seguidas —su charla y después su entrevista en vivo
// con Alan—. Seis empresas, doce filas. Por eso el componente agrupa de a
// pares y no renglón por renglón.
//
// `tipo` manda sobre el peso visual. `transicion` es producción pura —promo y
// presentación entre bloque y bloque—: está en el dato porque la planilla la
// tiene, y la vista no la publica.
//
// LOS PANELES LLEVAN `panelistas` Y NO `orador`: son varias personas, y la
// grilla busca la cara de cada una en SPEAKERS por nombre exacto. Un nombre
// escrito distinto no rompe nada —la cara simplemente no aparece—, así que un
// test exige que cada panelista esté en SPEAKERS tal cual.
//
// LA DURACIÓN NO SE ESCRIBE: se calcula de `desde` y `hasta`. La planilla la
// trae en su propia columna y las 29 coinciden —lo comprueba un test—, pero un
// minuto a mano al lado de dos horas a mano es un tercer lugar donde el mismo
// hecho puede desincronizarse.
// ─────────────────────────────────────────────────────────────────────────────

export const GRILLA = [
  { desde: "09:30", hasta: "10:00", tipo: "salon", titulo: "Acreditación y stands abiertos" },

  {
    desde: "10:00", hasta: "10:15", tipo: "apertura",
    // El título lo puso Alan el 15/09. La fila SIGUE siendo la apertura: es lo
    // que abre el escenario, a la hora en que termina la acreditación. Lo que
    // cambió es que deje de anunciarse como un trámite —«bienvenida y
    // apertura», que es como la sigue llamando la planilla— y diga de qué va a
    // hablar.
    titulo: "Cómo dirigir tu negocio con datos y IA",
    orador: "Alan Tapia",
    conduccion: "Alan Tapia",
  },

  { desde: "10:15", hasta: "10:25", tipo: "transicion" },

  {
    desde: "10:25", hasta: "10:40", tipo: "charla",
    // El salto de línea es el de la planilla, que lo trae en dos renglones:
    // el título y, abajo, lo que promete. La vista lo respeta con
    // white-space: pre-line.
    titulo:
      "La trampa del software fácil en la era de la IA:\nLo que un gastronómico debería saber antes de digitalizar su negocio",
    orador: "Gastón Ponteville", empresa: "Bistrosoft",
  },
  {
    desde: "10:40", hasta: "10:55", tipo: "podcast",
    titulo: "Entrevista en vivo: caso Bistrosoft",
    orador: "Gastón Ponteville", empresa: "Bistrosoft",
    conduccion: "Alan Tapia",
  },

  { desde: "10:55", hasta: "11:05", tipo: "transicion" },

  {
    desde: "11:05", hasta: "11:20", tipo: "charla",
    titulo: "De un horno de barro a 90 locales: qué sistemas hubo que construir en el medio",
    orador: "Franco Suárez", empresa: "El Hornito Santiagueño",
  },
  {
    desde: "11:20", hasta: "11:35", tipo: "podcast",
    titulo: "Entrevista en vivo: caso El Hornito Santiagueño",
    orador: "Franco Suárez", empresa: "El Hornito Santiagueño",
    conduccion: "Alan Tapia",
  },

  { desde: "11:35", hasta: "11:45", tipo: "transicion" },

  { desde: "11:45", hasta: "12:45", tipo: "networking", titulo: "Networking del mediodía" },

  { desde: "12:45", hasta: "12:55", tipo: "transicion" },

  {
    desde: "12:55", hasta: "13:10", tipo: "charla",
    titulo: "De la cocina a la puerta: dónde se gana o se pierde un cliente",
    orador: "Matías Yoma", empresa: "PUNI",
  },
  {
    desde: "13:10", hasta: "13:25", tipo: "podcast",
    titulo: "Entrevista en vivo: caso PUNI",
    orador: "Matías Yoma", empresa: "PUNI",
    conduccion: "Alan Tapia",
  },

  { desde: "13:25", hasta: "13:35", tipo: "transicion" },

  {
    desde: "13:35", hasta: "13:50", tipo: "charla",
    titulo: "Cómo escalar tu negocio en las aplicaciones de delivery",
    orador: "Gabriel Chayle", empresa: "Pimentón",
  },
  {
    desde: "13:50", hasta: "14:05", tipo: "podcast",
    titulo: "Entrevista en vivo: caso Pimentón",
    orador: "Gabriel Chayle", empresa: "Pimentón",
    conduccion: "Alan Tapia",
  },

  { desde: "14:05", hasta: "14:15", tipo: "transicion" },

  {
    desde: "14:15", hasta: "14:30", tipo: "panel",
    titulo: "Gastronomía de punta a punta: la cadena completa en un solo panel",
    // La planilla lo escribe por empresa —Bistrosoft, El Hornito, PUNI,
    // Pimentón y Deenex—: son los cuatro oradores que hablaron antes, más Alan.
    panelistas: ["Gastón Ponteville", "Franco Suárez", "Matías Yoma", "Gabriel Chayle", "Alan Tapia"],
  },

  { desde: "14:30", hasta: "14:40", tipo: "transicion" },

  {
    desde: "14:40", hasta: "14:55", tipo: "charla",
    titulo: "Dark kitchens: el futuro de la industria gastronómica, tendencias e innovación constante",
    orador: "Martín Zuker", empresa: "I+DIoT Lab",
  },
  {
    desde: "14:55", hasta: "15:10", tipo: "podcast",
    titulo: "Entrevista en vivo: caso I+DIoT Lab",
    orador: "Martín Zuker", empresa: "I+DIoT Lab",
    conduccion: "Alan Tapia",
  },

  { desde: "15:10", hasta: "15:20", tipo: "transicion" },

  {
    desde: "15:20", hasta: "15:50", tipo: "podcast",
    // SIN NOMBRE, A PROPÓSITO. La planilla le pone empresa y orador, pero la
    // autorización por escrito para publicarlos todavía no está, y la regla
    // del brief es que al aire sólo se nombra lo cerrado. Alan eligió el 16/09
    // que figure así hasta que firme.
    //
    // `anuncio` ocupa el lugar de `orador`: dice por qué no hay nombre en vez
    // de dejar el hueco. Cuando firme, se borra y entran `orador`, `empresa` y
    // el título del caso, como en las demás entrevistas.
    titulo: "Invitado especial",
    anuncio: "El nombre se anuncia antes del evento",
    conduccion: "Alan Tapia",
  },

  { desde: "15:50", hasta: "16:00", tipo: "transicion" },

  {
    desde: "16:00", hasta: "16:30", tipo: "charla",
    titulo: "IA sin humo: cómo usarla para tener resultados",
    orador: "Marcos Bruno", empresa: "Merovingian Data",
  },
  {
    desde: "16:30", hasta: "16:45", tipo: "podcast",
    titulo: "Entrevista en vivo: caso Merovingian Data",
    orador: "Marcos Bruno", empresa: "Merovingian Data",
    conduccion: "Alan Tapia",
  },

  { desde: "16:45", hasta: "16:55", tipo: "transicion" },

  {
    desde: "16:55", hasta: "17:10", tipo: "panel",
    titulo: "Referentes hablan de innovación, IA y datos en la industria gastronómica",
    panelistas: ["Martín Zuker", "Marcos Bruno", "Alan Tapia"],
  },

  { desde: "17:10", hasta: "18:10", tipo: "cierre", titulo: "Networking de cierre" },
];

/**
 * Cómo se muestra cada tipo de fila.
 *
 * `peso` es lo que decide la jerarquía, y vive acá y no repartido en el
 * componente: "contenido" son las filas que el visitante viene a ver, "marco"
 * las que estructuran el día —apertura, networking, cierre— y "servicio" la
 * producción de entre medio. Cambiar el peso de un tipo lo cambia en todos
 * lados a la vez.
 */
export const TIPOS_GRILLA = {
  salon: { label: "Apertura del salón", icono: "entrada", peso: "marco" },
  apertura: { label: "Apertura", icono: "entrada", peso: "marco" },
  charla: { label: "Charla", icono: "charla", peso: "contenido" },
  podcast: { label: "Entrevista en vivo", icono: "entrevista", peso: "contenido" },
  networking: { label: "Networking", icono: "gente", peso: "marco" },
  panel: { label: "Panel", icono: "mesa", peso: "contenido" },
  cierre: { label: "Cierre", icono: "gente", peso: "marco" },
  // Sin ícono a propósito: la transición se dibuja como un filete entre dos
  // bloques, no como una fila más. Un pictograma la subiría al mismo peso que
  // la charla que separa, que es exactamente lo que hay que evitar diez veces.
  transicion: { label: "Promo y presentación", icono: "", peso: "servicio" },
};

/** Minutos desde medianoche, para poder restar horas escritas "HH:MM". */
export function enMinutos(hhmm) {
  const [h, m] = String(hhmm).split(":").map(Number);
  return h * 60 + m;
}

/** La duración de una fila, siempre calculada: nunca hay un minuto a mano. */
export function duracionDe(fila) {
  return enMinutos(fila.hasta) - enMinutos(fila.desde);
}


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
 * Solo los huecos que tienen nombre propio, indexados por la hora que el
 * componente CALCULA. Los que no figuran caen al default "Pausa".
 *
 * La duración nunca se declara acá: se resta entre el fin de un bloque y el
 * arranque del siguiente. Si mañana se mueve un horario, la pausa se
 * recalcula sola y la sección no puede mentir.
 */
export const PAUSAS = {};
/**
 * Las dos puntas del día. Estas sí publican hora: 9:30, 17:10 y 18:10 están
 * al aire en la sección del lugar y en EVENTO.horario. Son las de GRILLA —la
 * primera fila y la última— y un test verifica que sigan siéndolo.
 *
 * OJO CON `cierre`: su `hora` es cuando ARRANCA el networking, no cuando
 * termina el evento. Son las 17:10, que es también cuando termina el
 * escenario. El evento sigue una hora más y termina a las 18:10, que es lo que
 * dice `hasta` y lo que tiene que leer el .ics.
 *
 * Confundir esas dos es el error que hay que evitar: si el .ics tomara `hora`,
 * la alarma de fin sonaría una hora antes de que la sala se vacíe.
 */
export const BORDES = {
  apertura: {
    id: "apertura",
    tipo: "apertura",
    hora: "9:30",
    titulo: "Acreditación y stands abiertos",
    detalle: "Te recibimos uno por uno, con los stands ya abiertos.",
  },
  cierre: {
    id: "cierre",
    tipo: "cierre",
    hora: "17:10",
    hasta: "18:10",
    titulo: "Networking de cierre",
    detalle: "Termina el escenario y la sala sigue una hora más para el networking.",
  },
};


/**
 * Lo que pasa fuera del escenario, y por eso no tiene hora.
 *
 * ESTA LISTA ERA DE OCHO, PASÓ A CUATRO Y AHORA ES DE TRES. Existía para
 * reemplazar al cronograma: mientras la home no publicaba grilla, enumerar
 * "Charlas", "Paneles" y "Networking del mediodía" era la única forma de decir qué había
 * ese día. Con GRILLA publicada, esos tres se leen dos veces en la misma
 * pantalla —una acá en abstracto y otra abajo con hora, nombre y empresa—, y
 * de las dos sobra la que no da datos. Salió también "Referentes
 * tecnológicos", que es lo que cuenta la sección de oradores.
 *
 * Los que quedan son los que la grilla NO puede mostrar, porque no ocupan una
 * fila del escenario: pasan en paralelo o entre medio. Sacarlos junto con los
 * otros habría borrado de la página los stands y la degustación, que son parte
 * de lo que se compra al reservar el sábado.
 *
 * Y SALIÓ EL INVITADO ESPECIAL el 16/09, por la misma regla: dejó de ser algo
 * sin hora. Con la planilla nueva tiene su fila en la grilla —la entrevista de
 * las 15:20—, y dicho acá también se leía dos veces en la misma pantalla, una
 * con hora y otra sin.
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
// La edición anterior: ExpoFranquicia.
//
// Prueba social de la única clase que no se puede discutir: fotos y videos de
// que esto ya pasó. Va después del podcast, que es donde el lector ya entendió
// qué es el evento y lo que le falta es creer que va a suceder.
//
// CÓMO SE CARGA. Los archivos van en:
//
//   src/assets/images/expo/    las fotos
//   src/assets/video/          los videos, y su poster como imagen
//
// y cada pieza se declara acá:
//
//   { tipo: "foto",  archivo: "algo.jpg", texto: "Qué se ve" }
//   { tipo: "video", archivo: "algo.mp4", poster: "algo.jpg", texto: "Qué se ve" }
//
// EL POSTER DE CADA VIDEO NO ES OPCIONAL, aunque el código lo tolere: sin él,
// el navegador muestra un rectángulo negro hasta que alguien toca play, y una
// galería de rectángulos negros se lee peor que no tener galería. Los videos
// van con preload="none": el .mp4 no se descarga hasta que lo piden, así que
// lo único que pesa en la primera carga son los posters.
//
// ARRANCA VACÍA y la sección no se monta hasta que haya algo, que es la misma
// regla que traía la sección de reels: no se muestran huecos de video.
export const EXPO = {
  // El nombre con el que sale al aire. Va con almohadilla porque es como se
  // publica en redes: el que ya lo vio pasar por ahí lo reconoce acá.
  etiqueta: "#DeenexExperience",
  edicion: "1ª edición",
  /*
    Las piezas, en el orden en que se recorren. Arranca el video porque es lo
    único que muestra la conversación entera; las fotos que siguen son el
    lugar, la producción y los invitados, en ese orden.

    NUEVE DE DIECINUEVE. Las que quedaron afuera son el mismo plano repetido
    —dos personas sentadas en los sillones, de frente— ocho veces con distinto
    invitado: en una tira que se desliza, ocho fotos iguales se leen como una
    sola y hacen que las que sí muestran algo distinto pasen de largo.

    Todas se recortaron a 3:4 y no a 4:3: dieciséis de las diecinueve fotos y
    el video son verticales, o sea material de teléfono. Un recorte apaisado
    sobre una foto vertical se come la mitad de la escena.
  */
  piezas: [
    {
      tipo: "video",
      archivo: "deenex-experience.mp4",
      poster: "deenex-experience-poster.webp",
      texto: "La entrevista a Gabriel Chayle, de Pimentón.",
    },
    { archivo: "set.webp", texto: "El set, entre charla y charla." },
    { archivo: "camara.webp", texto: "Se graba con cámara y sonido propios." },
    { archivo: "entrevista-1.webp" },
    { archivo: "saludo-1.webp" },
    { archivo: "invitados-1.webp" },
    { archivo: "entrevista-2.webp" },
    { archivo: "saludo-2.webp" },
    { archivo: "invitados-2.webp" },
    { archivo: "stand.webp", texto: "El stand, en la expo de franquicias." },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Quiénes hablan.
//
// SE CARGAN ACÁ Y NADA MÁS: la sección de la home los lee de esta lista y se
// acomoda sola. Cada uno son dos datos y ninguno es opcional:
//
//   { nombre: "Nombre y Apellido", empresa: "Dónde trabaja" }
//
// Y dos archivos opcionales, los dos por lo mismo: van a llegar de a uno y la
// tarjeta tiene que verse terminada sin ellos.
//
//   foto: "nombre-archivo.jpg"   en src/assets/images/speakers/
//   logo: "empresa.svg"          en src/assets/images/partners/
//
// Sin foto van las iniciales del nombre; sin logo queda el nombre de la
// empresa solo, que es lo que ya hace la barra de partners.
//
// Dos datos y nada más. Estuvo escrito un tercero opcional para el cargo y se
// sacó: con unos que lo tienen y otros que no, las tarjetas de una misma fila
// quedan desalineadas. Si hace falta el cargo, entra para todos o para ninguno.
//
// LA LISTA ARRANCA VACÍA A PROPÓSITO Y LA SECCIÓN NO SE MUESTRA HASTA QUE
// TENGA GENTE. Es la misma razón por la que JornadaSection dejó de publicar el
// cronograma hora por hora: con cuatro de diez bloques diciendo "orador por
// confirmar", el lector que escanea no lee cuatro nombres, lee seis huecos y
// concluye que el evento está a medio vender. Un speaker solo en una sección
// que se llama "quiénes hablan" dice exactamente eso.
//
// El umbral está en MINIMO_SPEAKERS, abajo. Cuando haya esa cantidad, la
// sección aparece sola en la home sin tocar ningún componente.
export const SPEAKERS = [
  { nombre: "Gastón Ponteville", empresa: "Bistrosoft", foto: "gaston-ponteville.jpg", logo: "bistrosoft.svg" },
  { nombre: "Alan Tapia", empresa: "Deenex", foto: "alan-tapia.jpg", logo: "deenex.svg" },
  {
    nombre: "Martín Zuker",
    rol: "Cofundador y CEO",
    empresa: "I+DIoT Lab",
    foto: "martin-zuker.jpg",
    logo: "idiotlab.png",
  },
  {
    nombre: "Gabriel Chayle",
    rol: "Head of Strategic Accounts LATAM",
    empresa: "Pimentón",
    // 256 y no 600 como las otras dos: el original que llegó es de 400x400
    // con la persona de cuerpo entero en el escenario, así que la cara real
    // son 100 píxeles. Llevarlo a 600 no agrega detalle, lo inventa. A los
    // 44px de la grilla y los 64 de esta tarjeta, 256 sobra.
    foto: "gabriel-chayle.jpg",
    // El archivo llegó con fondo BLANCO sólido, y así no servía: el muro pinta
    // los logos con brightness(0), que vuelve negro todo píxel opaco —un fondo
    // opaco entero da un rectángulo negro, no una marca—. Se le quitó el fondo
    // por distancia de color contra el blanco y se recortó al contenido.
    logo: "pimenton.png",
  },
  {
    nombre: "Marcos Bruno",
    // El titular que mandó trae NUEVE credenciales separadas por barras. Acá
    // entran tres, y no es pereza: la tarjeta la lee un dueño de cadena que
    // está decidiendo si regala un sábado, y de esas nueve hay cuatro que son
    // siglas que ese lector no decodifica —TOYP, YLAI, Sigma Squared, Sistema
    // B—. Nueve credenciales en fila dejan de leerse como currículum y pasan a
    // leerse como ruido: se pierde también la que sí pega sola.
    //
    // Quedan la que transfiere sin explicación (MIT Innovator Under 35), la que
    // da el sustento técnico de una charla sobre IA y datos, y la que no se
    // olvida. Las otras seis siguen siendo verdad y no están acá.
    rol: "Cofundador",
    descripcion:
      "MIT Innovator Under 35, ingeniero mecatrónico y tripulante en misiones espaciales análogas.",
    empresa: "Merovingian Data",
    // 256 desde un original de 399x501: la cara real son 178 píxeles. Es el
    // retrato con el cohete; la otra que llegó —la del escenario de TEDx—
    // mide 150x150 con él de cuerpo entero, o sea 19 píxeles de cara, y en
    // el círculo quedaba menos legible que las iniciales.
    foto: "marcos-bruno.jpg",
    // El archivo llegó con el turquesa de marca como fondo SÓLIDO, y así no
    // servía: el muro pinta los logos con brightness(0), que vuelve negro
    // todo píxel opaco. Un fondo opaco entero da un rectángulo negro, no una
    // marca. Es la misma trampa que main.css ya tiene anotada para konex y
    // sportclub. Se le quitó el fondo por distancia de color contra el
    // turquesa y se recortó al contenido: 233x52 de marca real.
    logo: "merovingian.png",
    // FUERA DE LA BARRA «PARTICIPAN», pedido de Alan del 16/09. Sigue en la
    // grilla y con su tarjeta: esto saca la marca de la cinta de logos y
    // nada más.
    enBarra: false,
  },
  {
    // EL APELLIDO VINO DE ALAN, NO DE LA PLANILLA. La planilla de producción
    // escribe el apellido distinto en las dos filas de PUNI —verificado
    // ampliando el original, no fue una mala transcripción— y él lo pasó dos
    // veces como «Matías Yoma, fundador de PUNI» al mandar la foto. Se unificó
    // en Yoma, acá y en GRILLA, por ser el dato más reciente y más específico.
    // La planilla del 16/09 sigue con el otro apellido y se mantuvo Yoma: Alan
    // la mandó pidiendo que valgan sus correcciones por encima de ella.
    // Si la planilla tenía razón se cambia en TRES lugares a la vez —acá, las
    // dos filas de GRILLA y los panelistas del panel de las 14:15—: el retrato
    // se busca por nombre EXACTO, así que con uno solo cambiado la cara
    // desaparece de la grilla sin que nada falle.
    nombre: "Matías Yoma",
    rol: "Fundador",
    empresa: "PUNI",
    // 192 y no 600: el original que llegó mide 200x200. Es un retrato ya
    // encuadrado, así que sólo se le recortaron los bordes.
    foto: "matias-yoma.jpg",
    logo: "puni.png",
  },
  {
    // Firma «Franco Marcelo Suárez». Acá va la forma corta, que es la que usa
    // la planilla y por lo tanto la que tiene GRILLA: el retrato se busca por
    // nombre EXACTO, así que con el segundo nombre puesto sólo acá la foto
    // dejaría de aparecer en la grilla sin que nada falle.
    nombre: "Franco Suárez",
    rol: "CEO",
    // FALTA EL SUSTANTIVO. El dato que llegó dice «la marca de empanadas con
    // más de 90, segunda generación»: el 90 viene sin decir 90 de qué, y por
    // el contexto serían locales, pero eso es una cifra sobre un negocio real
    // publicada en una página, no algo para deducir. Va lo que sí está dicho;
    // el número entra cuando Alan confirme qué cuenta.
    descripcion: "Segunda generación de la marca de empanadas.",
    empresa: "El Hornito Santiagueño",
    foto: "franco-suarez.jpg",
    logo: "el-hornito.png",
  },
];

/**
 * Cuántos hacen falta para que valga la pena mostrarlos.
 *
 * Tres es el mínimo que se lee como "hay varios" en vez de como "hay uno y
 * capaz otro". Con menos, la sección directamente no se monta: el que llega de
 * un anuncio no se entera de que falta gente, y el día que estén, están.
 */
export const MINIMO_SPEAKERS = 3;

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
 * `enTarjetas: false` es la inversa: va en la barra y no arma tarjeta. Es para
 * la marca confirmada de la que todavía no hay rubro, quién ni aporte.
 *
 * `logoApilado: true` es para el logo con el ícono arriba del nombre: la barra
 * le da más alto, porque a la altura de los horizontales el nombre queda chico.
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
  {
    nombre: "Coca-Cola",
    logo: "coca-cola.webp",
    // SÓLO EN LA BARRA. Alan la sumó el 16/09 a las marcas que participan, y
    // de su participación no hay todavía rubro, quién viene ni qué aporta —los
    // cuatro datos que arma cada tarjeta de #participan—. Una tarjeta con
    // esos cuatro renglones vacíos se lee como un sponsor a medio cerrar, que
    // es peor que no tenerla. Cuando lleguen, se borra esta línea y la tarjeta
    // aparece sola.
    enTarjetas: false,
  },
  {
    nombre: "La Fábrica",
    // El archivo llegó como un círculo magenta con las letras en blanco, y así
    // en la barra era un disco negro: brightness(0) vuelve negro todo píxel
    // opaco, letras incluidas. Se invirtió el papel de cada color —el blanco
    // pasó a ser la tinta y el magenta, transparente— y se recortó a lo que
    // queda: el sello, el nombre y «compartí algo rico».
    logo: "la-fabrica.png",
    // Casi cuadrado, con el sello arriba del nombre: la barra le da más alto
    // para que «LA FÁBRICA» no quede a la mitad de tamaño que las demás marcas.
    logoApilado: true,
    // SÓLO EN LA BARRA, como Coca-Cola y por lo mismo: Alan la sumó el 16/09
    // sin rubro, quién viene ni qué aporta.
    enTarjetas: false,
  },
];


// ─────────────────────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────────────────────

/*
 * Las preguntas frecuentes.
 *
 * EL REGISTRO SUBIÓ UN ESCALÓN el 15/09, a pedido de Alan. Lo que se fue es la
 * jerga —"fierros", "plata", "va derecho", "te va a rendir"— y los apartes de
 * conversación —"es la que más nos preguntan", "preferimos ser honestos"—, que
 * en una respuesta escrita suenan a relleno antes del dato. Lo que se conservó
 * es el voseo: este sitio le habla a un dueño de cadena argentino, y pasarlo a
 * usted no sería más profesional, sería más ajeno.
 *
 * SE FUE TAMBIÉN "¿Me van a querer vender algo?", que era la segunda. Con ella
 * se va la última lectura que esta lista hacía de TEMAS, el programa viejo.
 *
 * LAS HORAS SALEN DE GRILLA y no escritas acá. Antes la respuesta de la comida
 * decía "la hora de networking de 12:45 a 13:45" y la grilla publicaba 11:20:
 * dos horarios distintos para el mismo corte, en la misma página, a dos
 * pantallas de distancia. Es exactamente el defecto que este archivo ya tuvo
 * tres veces con el horario del evento.
 */
const bloquesDeContenido = GRILLA.filter((f) => TIPOS_GRILLA[f.tipo].peso === "contenido").length;
const networkingDelMediodia = GRILLA.find((f) => f.tipo === "networking");
const abreElSalon = GRILLA[0].desde;
const cierraLaJornada = GRILLA[GRILLA.length - 1].hasta;

export const FAQ = [
  {
    q: "¿Qué temas se tratan?",
    a: `Innovación aplicada a la operación de una cadena: el estado del mercado con números, la comparación en vivo de tus indicadores con los del resto de la sala, la evolución de los sistemas de punto de venta, qué aplicaciones de inteligencia artificial ya muestran retorno y cuáles todavía no, cómo se conduce una cadena en un mercado exigente y cómo se sostiene una marca en varios locales a la vez. Son ${bloquesDeContenido} bloques a lo largo del día, más dos rondas de networking.`,
  },
  {
    q: "Tengo el local abierto ese día. ¿Puedo asistir sólo a una parte?",
    a: "Sí. No hace falta quedarse la jornada completa y no se controla la asistencia. Podés venir a la mañana, llevarte el estado del mercado y el método para comparar tus locales entre sí, y estar de vuelta para el servicio; o llegar a media tarde y tomar los últimos bloques y el panel de cierre, donde los proveedores debaten frente a la sala. El programa final se envía a los inscriptos antes del evento, así elegís a qué bloques venir. Una recomendación: conviene que vengas vos y no alguien en tu lugar. Lo que se conversa —qué cerrar, qué cambiar, con quién avanzar— termina siendo tu decisión, y la sala está armada para que los dueños se crucen entre ellos. Podés venir acompañado por tu socio o tu gerente general.",
  },
  {
    q: "¿Cuánto cuesta la entrada?",
    a: "El ingreso es sin costo. Requiere reserva previa y el cupo es de 200 personas. Sin reserva no se ingresa.",
  },
  {
    q: "¿Por qué el cupo es de sólo 200 lugares?",
    a: "Es la capacidad del salón y también el punto a partir del cual deja de funcionar como una sala de trabajo. Preferimos 200 dueños de cadenas que puedan conversar entre ellos antes que un auditorio lleno donde nadie se cruza con nadie.",
  },
  {
    q: "¿Hace falta formación técnica para aprovechar la jornada?",
    a: "No. Los temas se abordan desde el margen, el tiempo y las decisiones de negocio, no desde la especificación técnica. Si dirigís una cadena, tenés lo necesario para aprovechar el día.",
  },
  {
    q: "Tengo un solo local. ¿Me resulta igual de útil?",
    a: "La jornada está diseñada para cadenas: buena parte del contenido —costos comparados entre locales, sistemas que unifican sucursales, cómo se sostiene una marca en varios puntos— parte de que ya tenés más de uno. Si estás por abrir el segundo, te va a resultar útil. Si no está en tus planes, es probable que encuentres propuestas que se ajusten mejor a tu situación.",
  },
  {
    q: "¿En qué consiste el diagnóstico?",
    a: "Es un beneficio para quienes asisten. Si lo solicitás el día del evento, coordinamos una reunión técnica sobre tu marca: en qué situación se encuentra a nivel tecnológico y cuál sería el próximo paso. Es opcional y sin costo, y no constituye el objeto del evento.",
  },
  {
    q: "¿Puedo asistir con alguien de mi equipo?",
    a: "Sí, y es recomendable. Cada persona reserva con su propio mensaje de WhatsApp, porque el cupo se cuenta por persona; en el ingreso alcanza con el nombre de cada uno. Asistir con tu socio o tu gerente general hace que el contenido rinda más al volver al local.",
  },
  {
    q: "¿Hay servicio de comida durante la jornada?",
    a: `Sí, incluido en la entrada. Café de bienvenida con los stands ya abiertos, algo para picar entre bloque y bloque —alfajores, aceitunas, humus y café—, la ronda de networking de ${networkingDelMediodia.desde} a ${networkingDelMediodia.hasta} y vino, cerveza y café en el cierre. No hay almuerzo servido: se come circulando, entre bloque y bloque.`,
  },
  {
    q: "¿Se transmite en vivo?",
    a: "No. La propuesta depende de estar presente: los sistemas se prueban en los stands, el panel se responde frente a la sala y el networking no tiene equivalente remoto. El material del día se envía por escrito a quienes asistieron.",
  },
  {
    q: "¿Dónde se realiza exactamente?",
    a: `En el ${EVENTO.venue}, ${EVENTO.direccion}, Córdoba, en una sala reservada sólo para la jornada. El salón abre a las ${abreElSalon} y la jornada se extiende hasta las ${cierraLaJornada}. Ese mismo día el centro de convenciones aloja ${EVENTO.eventoMadre}, y tu acreditación de SaboresTech también te habilita ese evento: son unas ${EVENTO.eventoMadreCirculacion} personas circulando por el edificio durante el día. La sala de SaboresTech es independiente y se entra por lista: adentro estamos los 200 y nadie más.`,
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
/**
 * El tope de acompañantes que el mensaje sabe expresar.
 *
 * HOY NADIE LE PASA `personas` A mensajeReserva(): el selector de "¿cuántos
 * van?" salió de RegistroSection para que reservar sea un solo toque, así que
 * todos los mensajes salen en singular.
 *
 * El parámetro se conserva —con sus tests— porque el dato que resolvía sigue
 * siendo real: el cupo se cuenta POR PERSONA, y doscientos mensajes que dicen
 * "quiero sumarme" pueden ser doscientas sesenta personas en la puerta. Hoy eso
 * se pregunta en la conversación. Si vuelve a la página, la función ya sabe
 * escribirlo y respeta el tope: en 4 o más dice "vamos 4 o más", que es lo que
 * decía el botón.
 */
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

/*
  CUÁL USA QUÉ BOTÓN, hoy:

    partner   → SumarseSection, "Quiero ser sponsor"
    prensa    → SumarseSection, "Pedir acreditación"
    rubro     → BrandsSection, el tablero de rubros libres
    registro  → NADIE lo lee por acá. El botón de reserva usa linkWaReserva(),
                que llama a mensajeReserva() directo para poder pasarle cuántos
                van y si el cupo está agotado. Esta clave queda como el texto de
                referencia del mensaje base, y la usan los tests.
    consulta  → NADIE. Y no es un olvido: era el enlace "Escribinos por
                WhatsApp" del pie, que salió cuando el pie pasó a cerrar sólo
                con el nombre del evento y su bajada.

  Ese último es el único hueco real del embudo. Era la salida sin compromiso
  —para el que tiene una duda y todavía no quiere reservar— y hoy no hay
  ninguna: los otros cinco botones piden algo concreto. El texto se conserva
  porque el hueco es una decisión de producto pendiente, no un descarte: si
  vuelve una salida de consulta, el mensaje ya está escrito y saluda igual que
  los demás.
*/
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
