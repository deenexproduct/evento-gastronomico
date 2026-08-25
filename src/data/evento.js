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
  bajada: "Donde la gastronomía y la tecnología se juntan.",
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
    n: "01",
    tema: "El nuevo mercado gastronómico",
    quien: "Alan Tapia · Deenex",
    punta:
      "Qué cambió en los últimos dos años para las marcas del rubro, y por qué la que no se movió ya está corriendo de atrás. La foto del mercado con números, no con impresiones.",
  },
  {
    n: "02",
    tema: "Datos e inteligencia artificial en tu marca",
    quien: "Alan Tapia · Deenex",
    punta:
      "Tu marca ya está generando los datos, tenga un local o veinte. La pregunta es si alguien los está leyendo, y qué decisiones de margen se toman distinto cuando sí.",
  },
  {
    n: "03",
    tema: "La evolución de los sistemas POS",
    quien: "CEO de Bistrosoft",
    punta:
      "El sistema con el que cobrás puede ser el que te diga qué comprar y cuándo, y en qué sucursal. Con demos en vivo montadas en el salón, no en slides.",
  },
  {
    n: "04",
    tema: "La nueva forma de hacer contenido",
    quien: "UGC y contenidos",
    punta:
      "Cómo se produce y se distribuye hoy el contenido de una marca gastronómica, sin un equipo de diez personas atrás.",
  },
  {
    n: "05",
    tema: "Cómo se conduce una marca cuando el mercado se mueve",
    quien: "Avanzia",
    punta:
      "Qué se hace distinto cuando hay que decidir con el piso moviéndose. Lo cuentan dos que ya estuvieron ahí: el ex-CEO de Dexter y el ex-presidente de la CAME.",
  },
  {
    n: "06",
    tema: "Cómo se arma un ecosistema",
    quien: "Alan Tapia · Deenex",
    punta:
      "Marcas, tecnología y proveedores trabajando juntos. Por qué una marca sola no llega, y cómo se construye la red que sí llega.",
  },
];

/** Los bloques que da Alan salen del programa: una sola fuente, sin desfasajes. */
export const CHARLAS_DE_ALAN = TEMAS.filter((t) => t.quien.startsWith("Alan Tapia")).map(
  (t) => t.tema
);

// ─────────────────────────────────────────────────────────────────────────────
// Con qué volvés al local — el inventario de valor, al cierre de la página.
//
// Todo lo de acá tiene que ser tangible y verificable: es la contracara
// concreta de la apertura aspiracional. Nada de promesas de resultado.
// ─────────────────────────────────────────────────────────────────────────────

export const VOLVES_CON = [
  {
    n: "01",
    titulo: "Seis temas, cada uno con algo para hacer",
    texto:
      "A cada orador le pedimos lo mismo: que cierre con algo aplicable y no con una conclusión inspiradora. Qué mirar, por dónde empezar y qué esperar cuando lo hagas.",
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
    titulo: "Una sala llena de dueños",
    texto:
      "Hasta doscientos dueños de marcas gastronómicas en el mismo salón, y varios ya resolvieron algo que vos estás peleando ahora. Las degustaciones entre bloques y el networking de cierre están para eso.",
  },
  {
    n: "06",
    titulo: "Una hora de preguntas abiertas",
    texto:
      "En la mesa redonda están todos los que hablaron, sentados juntos y una hora entera. Es la única parte del día en que se les puede preguntar de frente.",
  },
  {
    n: "07",
    titulo: "Tu diagnóstico, si lo pedís",
    texto:
      "Una reunión técnica sobre tu marca: dónde está parada a nivel tecnológico y cuál sería el próximo paso. Opcional y sin costo.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Agendar y difundir
//
// Dos problemas distintos: que el que se anotó efectivamente venga (agenda),
// y que cada visitante traiga a un colega (invitación). El brief es explícito
// en que la invitación rinde cuando la manda un par, nunca la marca.
// ─────────────────────────────────────────────────────────────────────────────

export const CALENDARIO = {
  ics: "gastrotech.ics",
  google:
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=" + encodeURIComponent("GastroTech · Córdoba") +
    "&dates=20260920T120000Z/20260920T210000Z" +
    "&details=" +
    encodeURIComponent(
      "Donde la gastronomía y la tecnología se juntan. Seis bloques de charla, demos en vivo y networking.\n\nEntrada gratuita con registro previo. Llevá tu QR.\nhttps://deenexproduct.github.io/evento-gastronomico/"
    ) +
    "&location=" +
    encodeURIComponent("Hotel Quinto Centenario, Duarte Quirós 1300, Córdoba, Argentina"),
};

/** Mensaje listo para reenviar. Escrito para WhatsApp, no copiado de Instagram. */
export const INVITACION =
  "Che, les paso algo que puede servir.\n\n" +
  "El domingo 20 de septiembre hay un evento de gastronomía y tecnología para dueños de marcas gastronómicas, en Córdoba, " +
  "en el Hotel Quinto Centenario, de 9 a 18. Se llama GastroTech. Seis charlas sobre datos, " +
  "sistemas de gestión, contenido y cómo está el mercado. Hay degustaciones entre medio y demos en vivo.\n\n" +
  "Es gratis pero hay que anotarse, y son 200 lugares nada más.\n\n" +
  "Acá se reserva: https://deenexproduct.github.io/evento-gastronomico/";

// ─────────────────────────────────────────────────────────────────────────────
// Recorridos — la objeción del domingo, resuelta en concreto.
//
// "Es domingo y trabajo" es la que más gente frena. En el FAQ está respondida
// con texto; acá se muestra qué se lleva cada uno según cuándo pueda venir.
// Se habla de franjas, no de horarios de orador: la grilla no está cerrada.
// ─────────────────────────────────────────────────────────────────────────────

export const RECORRIDOS = [
  {
    franja: "Solo a la mañana",
    horario: "9 a 13 h",
    titulo: "Y volvés para el servicio",
    lleva: [
      "Acreditación, café y recorrida por los stands",
      "El estado real del mercado gastronómico",
      "Datos e inteligencia artificial en tu marca",
      "Los sistemas POS, con las demos funcionando",
    ],
    nota: "Salís con lo más técnico del día y llegás a abrir al mediodía.",
  },
  {
    franja: "El día entero",
    horario: "9 a 18 h",
    titulo: "Lo que recomendamos",
    lleva: [
      "Los seis bloques completos",
      "Las cuatro rondas de degustación y la pausa larga",
      "Los stands y el networking sin agenda",
      "La mesa redonda de cierre con todos los oradores",
    ],
    nota: "Es el día completo, con el cierre que resume todo lo anterior.",
    destacado: true,
  },
  {
    franja: "Solo a la tarde",
    horario: "14 a 18 h",
    titulo: "Si la mañana la tenés ocupada",
    lleva: [
      "La nueva forma de hacer contenido",
      "Cómo se conduce una marca cuando el mercado se mueve",
      "Cómo se arma un ecosistema entre marcas y proveedores",
      "La mesa redonda y el networking de cierre",
    ],
    nota: "Agarrás el cierre, que es la parte más conversada del día.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Por qué lo hacemos — el interés propio, dicho de frente.
//
// Un dueño desconfía de que una empresa de tecnología lo invite gratis un
// domingo. Explicar el interés desarma la sospecha mejor que negarlo.
// ─────────────────────────────────────────────────────────────────────────────

export const TRANSPARENCIA = {
  titulo: "Por qué armamos esto.",
  parrafos: [
    "Te lo digo derecho: a Deenex le conviene. No por lo que se venda ese día, porque ese día no se vende nada. Conviene porque cuando el rubro entiende mejor su propia tecnología, nos va mejor a todos los que trabajamos en esto.",
    "Y porque prefiero que me conozcas por un día que te sirvió antes que por un mail frío. Si algún día necesitás lo que hacemos, quiero que ya sepas cómo pensamos.",
    "Ese es todo el interés. No hay letra chica y tus datos no se comparten con nadie. Si después del evento querés que te escribamos, nos lo decís ahí; si no, no.",
  ],
  firma: "Alan Tapia · Founder & CEO de Deenex",
};

// ─────────────────────────────────────────────────────────────────────────────
// La entrada como llave — los 3 pasos del QR
// ─────────────────────────────────────────────────────────────────────────────

export const PASOS_ENTRADA = [
  {
    n: 1,
    titulo: "Te registrás",
    texto:
      "Un minuto de formulario y el lugar queda a tu nombre. El QR te llega al email en el momento.",
  },
  {
    n: 2,
    titulo: "Escaneás tu QR en la puerta",
    texto:
      "El 20/9 llegás con el código en el celular. Se escanea en la entrada y quedás acreditado en segundos.",
  },
  {
    n: 3,
    titulo: "Se te abre lo de adentro",
    texto:
      "Con el escaneo se te habilita la agenda completa del día y la grilla con los beneficios de todos los partners.",
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
      "Vengo con lo que veo en las marcas que ya se movieron. Con números, no con impresiones.",
    bio: "Da tres de los seis bloques del día: abre con el estado del mercado, sigue con datos e inteligencia artificial, y cierra con el ecosistema.",
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
    bio: "Partner oficial de GastroTech. Llega con equipo propio y monta demos en vivo en el salón: se ve funcionando, no en slides.",
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
      "Mesa redonda con todos los oradores juntos",
      "Preguntas abiertas de la sala",
      "Networking abierto hasta que se corta",
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Para quién es
// ─────────────────────────────────────────────────────────────────────────────

export const PUBLICO = {
  si: [
    {
      titulo: "Dueños de cadenas",
      texto:
        "El que necesita que los datos, el stock y la venta hablen el mismo idioma en todas sus sucursales.",
    },
    {
      titulo: "Dueños de una sola marca",
      texto:
        "Tenés un local pero lo pensás como marca: identidad, canal propio y decisiones con números. Acá no pesa el tamaño.",
    },
    {
      titulo: "Franquiciantes y socios de grupos",
      texto:
        "El que maneja varias marcas a la vez y necesita que cada una escale sin volver a empezar de cero.",
    },
  ],
  no: [
    "Empleados que no deciden sobre la marca",
    "Proveedores que vienen a vender en la sala",
    "Público general y consumidores",
    "Curiosos del rubro sin un negocio propio",
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Partners — SOLO CERRADOS
// ─────────────────────────────────────────────────────────────────────────────

export const PARTNERS = [
  {
    nombre: "Bistrosoft",
    tipo: "Partner oficial",
    aporte: "Charla del CEO sobre la evolución del POS, equipo propio y demos en vivo en el salón.",
  },
  {
    nombre: "Avanzia",
    tipo: "Partner de programa",
    aporte: "Dos oradores en escenario: el ex-CEO de Dexter y el ex-presidente de la CAME.",
  },
  {
    nombre: "La mesa de degustación",
    tipo: "Proveedores confirmados",
    aporte:
      "Cuatro rondas entre charla y charla, más una larga al mediodía: alfajores, aceitunas, humus y café. A media tarde, coffee break.",
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
  "sportclub.webp",
];

// ─────────────────────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────────────────────

export const FAQ = [
  {
    q: "¿De qué se habla exactamente?",
    a: "GastroTech es un evento de gastronomía y tecnología aplicadas al negocio: el estado real del mercado, datos e inteligencia artificial en el local, la evolución de los sistemas POS con demos en vivo, cómo se hace hoy el contenido de una marca gastronómica, y cómo se arma un ecosistema entre marcas, tecnología y proveedores. Seis bloques a lo largo del día.",
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
    a: "Nada. Entrar a GastroTech es gratis, pero el registro previo es obligatorio y el cupo es real: 200 personas. Sin registro no hay ingreso.",
  },
  {
    q: "¿Por qué solo 200 lugares?",
    a: "Porque es lo que entra en el salón y porque a partir de ahí deja de ser una sala de trabajo. Preferimos 200 dueños que puedan hablar entre ellos antes que un auditorio lleno donde nadie se cruza con nadie.",
  },
  {
    q: "¿Tengo que saber de tecnología para aprovecharlo?",
    a: "No. Se habla de margen, tiempo y decisiones, no de fierros. Si manejás un local o una cadena, tenés todo lo que hace falta para sacarle provecho al día.",
  },
  {
    q: "Tengo un solo local. ¿Es para mí?",
    a: "Sí, y es el mejor momento para venir. GastroTech es para dueños de marcas gastronómicas, y una marca puede tener un local o veinte: lo que define no es el tamaño sino que la decisión pase por vos. Casi todo lo que se cuenta se aplica desde el primer local, y ordenarlo temprano es mucho más barato que hacerlo con diez sucursales abiertas.",
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
    a: `GastroTech es en un salón propio de 200 m² del ${EVENTO.venue}, en Córdoba, de ${EVENTO.horario}. Está dentro de ${EVENTO.eventoMadre}, un evento multisala por el que circulan unas ${EVENTO.eventoMadreCirculacion} personas a lo largo del día.`,
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
  "1 local",
  "2 a 5 locales",
  "6 a 15 locales",
  "Más de 15 locales",
  "Todavía no abrí",
];

/** WhatsApp de Alan — fallback cuando no hay endpoint conectado. */
export const WHATSAPP_ORGANIZADOR = "5491154596266";
