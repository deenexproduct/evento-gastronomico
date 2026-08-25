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
  nombre: "GastroTech",
  organiza: "Deenex",
  fechaISO: "2026-09-20T09:00:00-03:00",
  fechaLarga: "Domingo 20 de septiembre de 2026",
  fechaCorta: "Domingo 20.09.2026",
  fechaNumerica: "20.09.26",
  horario: "9:00 a 18:00",
  ciudad: "Córdoba",
  venue: "Hotel Quinto Centenario",
  direccion: "Duarte Quirós 1300",
  salon: "Salón de 200 m²",
  // Contexto, nunca asistencia propia: las 20.000 son del evento madre.
  eventoMadre: "Córdoba Corazón de Moda",
  eventoMadreCirculacion: "20.000",
};

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
    hora: "10:00",
    tipo: "charla",
    titulo: "Qué cambió en el mercado y qué hace distinto el que creció este año",
    quien: "Alan Tapia · Deenex",
    punta:
      "La foto del rubro con números, no con impresiones. Qué hicieron distinto las cadenas que crecieron este año, y por qué la brecha que se abrió no es de tamaño ni de plata.",
  },
  {
    hora: "11:00",
    tipo: "charla",
    titulo: "Qué ves cuando comparás tus locales entre sí",
    quien: "Alan Tapia · Deenex",
    punta:
      "Tus locales ya generan la información. Qué aparece cuando se los mira juntos: quién rinde, quién arrastra y por qué el mismo plato deja distinto en cada sucursal.",
  },
  {
    hora: "12:00",
    tipo: "demo",
    titulo: "Hasta dónde llega hoy el sistema con el que cobrás",
    quien: "CEO de Bistrosoft",
    punta:
      "Qué cambia cuando todas tus sucursales reportan al mismo lugar y dejás de armar el número a mano. Con demos montadas en el salón.",
  },
  {
    hora: "13:45",
    tipo: "charla",
    titulo: "Cómo se sostiene una marca en varios locales a la vez",
    quien: "UGC y contenidos",
    punta:
      "Qué se graba, con qué frecuencia y cómo se mantiene una sola voz cuando la marca está en cinco puntos. Sin un equipo de diez personas.",
  },
  {
    hora: "14:45",
    tipo: "charla",
    titulo: "Cómo se conduce una estructura grande cuando el mercado se endurece",
    quien: "Avanzia · ex-CEO de Dexter y ex-presidente de la CAME",
    punta:
      "Dos que ya condujeron compañías con cientos de empleados, contando cómo se decide cuando hay gente y plata en juego.",
  },
  {
    hora: "16:00",
    tipo: "charla",
    titulo: "Por qué solos no llegamos: marcas, tecnología y proveedores",
    quien: "Alan Tapia · Deenex",
    punta:
      "Cómo se construye la red que sí llega: qué le pedís a un proveedor cuando comprás para varios locales y qué te tiene que dar la tecnología para acompañar la escala.",
  },
  {
    hora: "17:00",
    tipo: "mesa",
    titulo: "Cuatro voces del día dicen lo que nadie dice en público",
    quien: "Mesa redonda · todos los oradores y partners",
    punta:
      "Una hora sentados en el centro del salón, con preguntas abiertas de la sala. Sin guion.",
  },
];

/** Los cuatro tipos de bloque, con su pictograma y su tinte. */
export const TIPOS_BLOQUE = {
  charla: { label: "Charla", icono: "charla", clase: "border-white/15 text-white" },
  demo: { label: "Demo en vivo", icono: "demo", clase: "border-acento/50 text-acento-texto" },
  mesa: { label: "Mesa redonda", icono: "mesa", clase: "border-acento bg-acento-boton text-white" },
  pausa: { label: "Degustación", icono: "degustacion", clase: "border-white/10 text-gris" },
};

/**
 * El día en un vistazo. Reemplaza la franja de "cuántos vienen" que usa todo
 * el rubro: con 200 asistentes no competimos contra los 24.000 de FITHEP.
 * El eje es densidad de valor por hora.
 */
export const BENTO = [
  { dato: "7", label: "bloques en el día", peso: "grande",
    detalle: "Cinco charlas, una demo en vivo y la mesa redonda de cierre. Track único: no elegís, no te perdés nada." },
  { dato: "9 a 18", label: "de jornada", peso: "chico" },
  { dato: "5", label: "degustaciones", peso: "chico" },
  { dato: "200", label: "dueños en la sala", peso: "medio",
    detalle: "Dueños de cadenas del rubro, no público general." },
  { dato: "Demos", label: "montadas en vivo", peso: "chico" },
  { dato: "$0", label: "la entrada", peso: "chico" },
];

/** Con qué volvés al local. Verbo + resultado tangible, sin adjetivos. */
export const EL_LUNES = [
  "Cómo comparar el food cost real entre tus locales, no el que dice la ficha técnica",
  "Qué datos ya generan tus locales y cómo se leen juntos",
  "Herramientas probadas en vivo, con lo que hacen y lo que cuestan",
  "Los proveedores del rubro comparados en un día en vez de en tres meses",
  "Los números reales de otras cadenas de Córdoba, dichos en voz alta",
  "La grilla del evento con todos los beneficios de partners por escrito",
];

export const VOLVES_CON = [
  {
    n: "01",
    titulo: "Seis temas, cada uno con algo para hacer",
    texto:
      "Ningún bloque cierra con una conclusión inspiradora. Cierra con algo concreto: qué mirar, por dónde empezar y qué esperar cuando lo hagas.",
  },
  {
    n: "02",
    titulo: "Los sistemas, vistos funcionando",
    texto:
      "Demos en vivo montadas en el salón, no capturas de pantalla. Te parás adelante, preguntás y ves si sirve para tu operación antes de contratar nada.",
  },
  {
    n: "03",
    titulo: "La grilla, por escrito",
    texto:
      "El evento entero en un material: los beneficios disponibles, quién los da y cómo encararlos. Es lo que abrís el lunes cuando volvés al local.",
  },
  {
    n: "04",
    titulo: "Los beneficios de cada partner",
    texto:
      "Condiciones que solo existen para los que estuvieron en la sala ese día. No se consiguen después ni por otro canal.",
  },
  {
    n: "05",
    titulo: "Doscientos colegas del rubro",
    texto:
      "Dueños que ya resolvieron algo que vos estás peleando ahora. Las degustaciones entre bloques y el networking de cierre están para eso.",
  },
  {
    n: "06",
    titulo: "Tus preguntas respondidas",
    texto:
      "En la mesa redonda están todos los que hablaron, sentados juntos y una hora entera. Es la única parte del día donde preguntás lo que quieras a quien quieras.",
  },
  {
    n: "07",
    titulo: "Tu diagnóstico, si lo pedís",
    texto:
      "Una reunión técnica sobre tu marca: dónde está parada a nivel tecnológico y cuál sería el próximo paso. Opcional y sin costo.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// La entrada como llave — los 3 pasos del QR
// ─────────────────────────────────────────────────────────────────────────────

export const PASOS_ENTRADA = [
  {
    n: 1,
    titulo: "Te registrás",
    texto:
      "Completás el formulario y el lugar queda a tu nombre. Es gratis, pero el cupo es real: 200 personas y no entra nadie más.",
  },
  {
    n: 2,
    titulo: "Escaneás tu QR en la puerta",
    texto:
      "El 20/9 llegás con tu código. Se escanea en la entrada y quedás acreditado. Sin QR no hay ingreso.",
  },
  {
    n: 3,
    titulo: "Se te desbloquea lo de adentro",
    texto:
      "Al escanear se te abre la agenda completa del día y la grilla con los beneficios de todos los partners.",
  },
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
// Speakers — SOLO CERRADOS
// ─────────────────────────────────────────────────────────────────────────────

export const SPEAKERS = [
  {
    id: "alan",
    nombre: "Alan Tapia",
    rol: "FOUNDER & CEO · DEENEX",
    foto: "alan-tapia.jpg",
    frase:
      "Hay un mercado gastronómico nuevo formándose. Vengo a mostrar cómo se entra, con datos y sin humo.",
    bio: "Founder de Deenex, la plataforma omnicanal con la que trabajan más de 350 marcas de foodservice y gastronomía. Da tres de los siete bloques del día.",
    charlas: [
      "El nuevo mercado gastronómico y por qué este es el momento",
      "Datos, tecnología e inteligencia artificial aplicados al negocio",
      "Cómo se arma un ecosistema: marcas, tecnología y proveedores",
    ],
    stats: [
      { valor: "+350", label: "clientes" },
      { valor: "3", label: "charlas" },
      { valor: "Todo el día", label: "en escena" },
    ],
  },
  {
    id: "bistrosoft",
    foto: "", // ← Foto del CEO de Bistrosoft
    nombre: "CEO de Bistrosoft",
    rol: "PARTNER OFICIAL · SISTEMAS POS",
    frase: "La evolución de los sistemas POS.",
    bio: "Partner oficial del evento. Llega con equipo propio y monta demos en vivo en el salón: se ve funcionando, no en slides.",
    charlas: ["La evolución de los sistemas POS"],
    stats: [
      { valor: "Demos", label: "en vivo" },
      { valor: "Partner", label: "oficial" },
    ],
  },
  {
    id: "avanzia",
    foto: "", // ← Fotos de los oradores de Avanzia
    nombre: "Avanzia",
    rol: "DOS ORADORES EN ESCENARIO",
    frase: "La visión de quienes ya condujeron compañías y cámaras del sector.",
    bio: "Avanzia sube dos voces al escenario: el ex-CEO de Dexter y el ex-presidente de la CAME. Experiencia de conducción real, aplicada al momento del mercado.",
    charlas: ["Ex-CEO de Dexter", "Ex-presidente de la CAME"],
    stats: [
      { valor: "2", label: "oradores" },
      { valor: "CAME", label: "+ Dexter" },
    ],
  },
  {
    id: "ugc",
    foto: "", // ← Foto del orador de UGC
    nombre: "UGC y contenidos",
    rol: "LA NUEVA FORMA DE HACER CONTENIDO",
    frase: "Cómo se hace hoy el contenido que mueve una marca gastronómica.",
    bio: "Orador confirmado para el bloque de contenido. Trabaja con marcas del rubro produciendo el material que después circula en redes.",
    charlas: ["La nueva forma de hacer contenido en las marcas gastronómicas"],
    stats: [{ valor: "45'", label: "de bloque" }],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Agenda
//
// El brief la marca como BORRADOR: "sirve para escribir, no para publicar hasta
// que se cierre". Con AGENDA_PUBLICA en false mostramos la estructura del día
// sin horarios. Cuando Alan cierre el orden final, pasar a true.
// ─────────────────────────────────────────────────────────────────────────────

export const AGENDA_PUBLICA = false;

export const AGENDA = [
  {
    hora: "09:00",
    dur: "60'",
    tipo: "apertura",
    titulo: "Puertas abiertas",
    detalle: "Acreditación con QR, café de bienvenida y recorrida por los stands.",
  },
  {
    hora: "10:00",
    dur: "45'",
    tipo: "charla",
    quien: "Alan Tapia",
    titulo: "Apertura: el nuevo mercado gastronómico",
    detalle: "Dónde está parado el rubro y por qué este es el momento de moverse.",
  },
  { hora: "10:45", dur: "15'", tipo: "pausa", titulo: "Degustación" },
  {
    hora: "11:00",
    dur: "45'",
    tipo: "charla",
    quien: "Alan Tapia",
    titulo: "Datos, tecnología e IA aplicados al negocio",
    detalle: "Qué te están diciendo tus datos y no estás escuchando.",
  },
  { hora: "11:45", dur: "15'", tipo: "pausa", titulo: "Degustación" },
  {
    hora: "12:00",
    dur: "45'",
    tipo: "charla",
    quien: "CEO de Bistrosoft",
    titulo: "La evolución de los sistemas POS",
    detalle: "Con demos en vivo montadas en el salón.",
  },
  {
    hora: "12:45",
    dur: "60'",
    tipo: "pausa",
    titulo: "Pausa larga",
    detalle: "Ronda grande de degustación, stands y networking.",
  },
  {
    hora: "13:45",
    dur: "45'",
    tipo: "charla",
    quien: "UGC y contenidos",
    titulo: "La nueva forma de hacer contenido",
    detalle: "Cómo se produce hoy el contenido de una marca gastronómica.",
  },
  { hora: "14:30", dur: "15'", tipo: "pausa", titulo: "Degustación" },
  {
    hora: "14:45",
    dur: "45'",
    tipo: "charla",
    quien: "Avanzia",
    titulo: "Ex-CEO de Dexter y ex-presidente de la CAME",
    detalle: "Dos oradores, una mirada de conducción sobre el momento del mercado.",
  },
  {
    hora: "15:30",
    dur: "30'",
    tipo: "pausa",
    titulo: "Coffee break",
    detalle: "Café y alfajores.",
  },
  {
    hora: "16:00",
    dur: "45'",
    tipo: "charla",
    quien: "Alan Tapia",
    titulo: "Cómo se arma un ecosistema",
    detalle: "Marcas, tecnología y proveedores trabajando juntos.",
  },
  { hora: "16:45", dur: "15'", tipo: "pausa", titulo: "Degustación" },
  {
    hora: "17:00",
    dur: "60'",
    tipo: "destacado",
    titulo: "Mesa redonda en el centro del salón",
    detalle: "Todos los partners y speakers del día, sentados a conversar.",
  },
  {
    hora: "18:00",
    dur: "—",
    tipo: "cierre",
    titulo: "Networking de cierre",
    detalle: "Vino, cerveza y café. Corte del evento.",
  },
];

/**
 * Cómo se vive el día, mientras la grilla con horarios no se publica.
 * Habla del ritmo y de la experiencia — el contenido de las charlas está en TEMAS.
 */
export const AGENDA_BLOQUES = [
  {
    franja: "Desde las 9",
    titulo: "Llegada",
    items: [
      "Acreditación con QR en la puerta",
      "Café de bienvenida",
      "Los stands abren antes de la primera charla",
    ],
  },
  {
    franja: "Desde las 10",
    titulo: "Bloques de charla",
    items: [
      "45 minutos cada uno, con degustación entre medio",
      "Demos en vivo montadas en el salón",
      "Se puede entrar y salir: nadie controla la butaca",
    ],
  },
  {
    franja: "Al mediodía",
    titulo: "Pausa larga",
    items: [
      "Ronda grande de degustación",
      "Stands abiertos y recorrida sin apuro",
      "Networking sin agenda, que es donde suele pasar lo bueno",
    ],
  },
  {
    franja: "Hasta las 18",
    titulo: "Cierre",
    items: [
      "Mesa redonda con todos los speakers juntos",
      "Preguntas abiertas de la sala",
      "Vino, cerveza y café hasta que se corta",
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Para quién es
// ─────────────────────────────────────────────────────────────────────────────

export const PUBLICO = {
  si: [
    {
      titulo: "Dueños de cadenas gastronómicas",
      texto: "Varios locales de una misma marca, con la operación ya en escala.",
    },
    {
      titulo: "Franquiciantes y grupos multimarca",
      texto: "Los que manejan varias marcas y necesitan que todo hable el mismo idioma.",
    },
    {
      titulo: "Socios y gerentes generales",
      texto: "El que decide sobre tecnología, compras y personal de toda la cadena.",
    },
  ],
  no: [
    "Locales únicos sin planes de abrir otro",
    "Empleados sin decisión sobre el negocio",
    "Proveedores buscando vender en la sala",
    "Público general o consumidores",
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Partners — SOLO CERRADOS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Partners confirmados.
 *
 * `logo`: nombre del archivo dentro de src/assets/images/partners/. Con el
 * campo vacío se muestra el nombre en tipografía, que es mejor que un hueco.
 * `quien`: la persona concreta que viene, que es lo que hace creíble al partner.
 * `empresa`: a qué se dedica, para el que no la conoce.
 */
export const PARTNERS = [
  {
    nombre: "Bistrosoft",
    logo: "",
    tipo: "Partner oficial",
    empresa:
      "Sistema de gestión y punto de venta para gastronomía. Trabaja con locales de todo el país.",
    quien: "Viene el CEO",
    aporte: "Da la charla sobre la evolución del POS y monta demos en vivo con equipo propio.",
  },
  {
    nombre: "Avanzia",
    logo: "",
    tipo: "Partner de contenido",
    empresa: "Consultora de gestión y desarrollo de negocios para empresas del rubro.",
    quien: "Traen dos oradores",
    aporte: "El ex-CEO de Dexter y el ex-presidente de la CAME, sobre conducción y mercado.",
  },
  {
    nombre: "La mesa de degustación",
    logo: "",
    tipo: "Proveedores confirmados",
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
    a: "De gastronomía y tecnología aplicadas al negocio: el estado real del mercado, datos e inteligencia artificial aplicados a varios locales, la evolución de los sistemas POS con demos en vivo, cómo se hace hoy el contenido de una marca gastronómica, y cómo se arma un ecosistema entre marcas, tecnología y proveedores. Siete bloques a lo largo del día.",
  },
  {
    q: "¿Me van a querer vender algo?",
    a: "No hay pitch de producto ni ronda comercial armada. Hay charlas de gente que labura del rubro y demos que mirás si te interesan. Si después querés seguir hablando con alguno de los partners, se habla; si no, te vas con lo que escuchaste y nada más.",
  },
  {
    q: "Es domingo y trabajo. ¿Cómo hago?",
    a: "Es la pregunta más repetida y por algo el evento dura todo el día: entrás cuando podés y te quedás lo que te sirva. Podés venir a la mañana y estar de vuelta en el local para el servicio, o llegar a la tarde y agarrar los últimos bloques más la mesa redonda. La grilla queda disponible para que elijas a qué venir. Y si no podés vos, mandá a tu socio o a tu gerente.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Nada. La entrada es gratuita, pero el registro previo es obligatorio y el cupo es real: 200 personas. Sin registro no hay ingreso.",
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
    a: "Sí, y conviene. Cada persona necesita su propio registro y su propio QR porque el cupo se cuenta por persona. Venir con tu socio o tu gerente hace que lo que escuchan rinda más cuando vuelven al local.",
  },
  {
    q: "¿Dónde es exactamente?",
    a: `En un salón propio de 200 m² del ${EVENTO.venue}, en Córdoba, de ${EVENTO.horario}. Está dentro de ${EVENTO.eventoMadre}, un evento multisala por el que circulan unas ${EVENTO.eventoMadreCirculacion} personas a lo largo del día.`,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Registro
// ─────────────────────────────────────────────────────────────────────────────

export const ROLES = [
  "Dueño / Dueña",
  "Socio / Socia",
  "Gerente general",
  "Gerente de operaciones",
  "Marketing",
  "Otro",
];

export const CANTIDAD_LOCALES = [
  "2 a 5 locales",
  "6 a 15 locales",
  "16 a 30 locales",
  "Más de 30 locales",
  "Uno, pero estoy por abrir el segundo",
];


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

export const WHATSAPP_ORGANIZADOR = "5491154596266";
