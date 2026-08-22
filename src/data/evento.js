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
  fechaISO: "2026-09-20T09:00:00-03:00",
  fechaLarga: "Domingo 20 de septiembre de 2026",
  fechaCorta: "Domingo 20.09.2026",
  fechaNumerica: "20.09.26",
  horario: "9:00 a 18:00",
  ciudad: "Córdoba",
  venue: "Hotel Quinto Centenario",
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
      "Qué cambió en los últimos dos años y por qué el que no se movió ya está corriendo de atrás. La foto del mercado con números, no con impresiones.",
  },
  {
    n: "02",
    tema: "Datos e inteligencia artificial en tu negocio",
    quien: "Alan Tapia · Deenex",
    punta:
      "Tu local ya está generando los datos. La pregunta es si alguien los está leyendo, y qué decisiones de margen se toman distinto cuando sí.",
  },
  {
    n: "03",
    tema: "La evolución de los sistemas POS",
    quien: "CEO de Bistrosoft",
    punta:
      "El sistema con el que cobrás puede ser el que te diga qué comprar y cuándo. Con demos en vivo montadas en el salón, no en slides.",
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
    tema: "Conducción y mercado",
    quien: "Avanzia",
    punta:
      "Dos oradores que ya condujeron una compañía grande y una cámara del sector, hablando del momento que atraviesa el rubro.",
  },
  {
    n: "06",
    tema: "Cómo se arma un ecosistema",
    quien: "Alan Tapia · Deenex",
    punta:
      "Marcas, tecnología y proveedores trabajando juntos. Por qué solos no llegamos, y cómo se construye la red que sí llega.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Qué se lleva el que viene
// ─────────────────────────────────────────────────────────────────────────────

export const BENEFICIOS = [
  {
    n: "01",
    kicker: "CONTENIDO",
    titulo: "Lo que ya está funcionando.",
    texto:
      "Seis bloques sobre datos, inteligencia artificial, POS, contenido y ecosistema. Lo que ya funciona en otros locales, contado por los que lo hacen. No teoría.",
  },
  {
    n: "02",
    kicker: "BENEFICIOS",
    titulo: "Condiciones que solo existen en la sala.",
    texto:
      "Cada partner llega con un beneficio exclusivo para los que están ese día. No se consiguen en otro momento ni por otro canal.",
  },
  {
    n: "03",
    kicker: "CONTACTOS",
    titulo: "Doscientos colegas en un día.",
    texto:
      "Degustaciones entre bloques, stands y networking de cierre. Una sala curada de dueños del rubro, no un auditorio de desconocidos.",
  },
  {
    n: "04",
    kicker: "A PEDIDO",
    titulo: "Un diagnóstico de tu negocio, si lo pedís.",
    texto:
      "Los que asisten pueden solicitar una reunión técnica sobre su marca: dónde está parada a nivel tecnológico y cuál es el próximo paso. Se solicita el día del evento.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// El diagnóstico — beneficio para quien lo solicite, no el gancho del evento.
//
// Ojo: el formato, la duración y el plazo todavía no están definidos (pendiente
// del brief). Acá se describe QUÉ se mira, no cuánto dura ni cuándo es.
// ─────────────────────────────────────────────────────────────────────────────

export const DIAGNOSTICO = {
  bajada:
    "Si querés, podés pedir una reunión técnica sobre tu marca después del evento. Se solicita ese día y se coordina con el equipo de Deenex.",
  puntos: [
    "Qué tecnología usás hoy, qué te falta y qué tenés de más",
    "Qué información ya estás generando y no estás leyendo",
    "Cuánto de tu venta depende de terceros",
    "Un próximo paso concreto y priorizado",
  ],
};

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
    bio: "Founder de Deenex, plataforma omnicanal para cadenas de foodservice y gastronomía. Abre la jornada, presenta a cada speaker, modera la mesa redonda y cierra el día.",
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
    bio: "Un bloque dedicado a cómo se produce y se distribuye contenido hoy en el rubro. Qué funciona, qué se dejó de usar y cómo se sostiene sin un equipo enorme detrás.",
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

/** Estructura del día para cuando la agenda todavía no se publica. */
export const AGENDA_BLOQUES = [
  {
    franja: "Mañana",
    titulo: "El mercado y los datos",
    items: [
      "Puertas, acreditación con QR y recorrida por los stands",
      "Apertura: el nuevo mercado gastronómico",
      "Datos, tecnología e IA aplicados al negocio",
      "La evolución de los sistemas POS, con demos en vivo",
    ],
  },
  {
    franja: "Mediodía",
    titulo: "Degustación y stands",
    items: [
      "Ronda grande de degustación entre bloques",
      "Recorrida por los stands de los partners",
      "Networking abierto en el salón",
    ],
  },
  {
    franja: "Tarde",
    titulo: "Contenido, conducción y ecosistema",
    items: [
      "La nueva forma de hacer contenido en marcas gastronómicas",
      "Avanzia: ex-CEO de Dexter y ex-presidente de la CAME",
      "Cómo se arma un ecosistema entre marcas, tecnología y proveedores",
    ],
  },
  {
    franja: "Cierre",
    titulo: "La mesa redonda",
    items: [
      "Todos los partners y speakers en el centro del salón",
      "Networking final con vino, cerveza y café",
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Para quién es
// ─────────────────────────────────────────────────────────────────────────────

export const PUBLICO = {
  si: [
    {
      titulo: "Dueños de marcas gastronómicas",
      texto: "La cadena con varios locales que necesita ordenar tecnología y datos.",
    },
    {
      titulo: "Dueños de restaurantes",
      texto: "El local único que quiere crecer sin romper el margen. Mismo peso que la cadena.",
    },
    {
      titulo: "Franquiciantes y grupos multimarca",
      texto: "Los que manejan varias marcas y necesitan que todo hable el mismo idioma.",
    },
  ],
  no: [
    "Empleados sin decisión sobre el negocio",
    "Proveedores buscando vender en la sala",
    "Público general o consumidores",
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
    tipo: "Partner de contenido",
    aporte: "Dos oradores en escenario: el ex-CEO de Dexter y el ex-presidente de la CAME.",
  },
  {
    nombre: "Rondas de degustación",
    tipo: "Confirmado",
    aporte: "Alfajores, aceitunas, humus y café entre charla y charla. Cuatro rondas más una larga.",
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
    a: "De gastronomía y tecnología aplicadas al negocio: el estado real del mercado, datos e inteligencia artificial en el local, la evolución de los sistemas POS con demos en vivo, cómo se hace hoy el contenido de una marca gastronómica, y cómo se arma un ecosistema entre marcas, tecnología y proveedores. Seis bloques a lo largo del día.",
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
    a: "Porque es lo que entra en el salón y porque a partir de ahí deja de ser una sala de trabajo. Preferimos 200 dueños que puedan hablar entre ellos antes que un auditorio lleno donde nadie se cruza con nadie.",
  },
  {
    q: "¿Tengo que saber de tecnología para aprovecharlo?",
    a: "No. Se habla de margen, tiempo y decisiones, no de fierros. Si manejás un local o una cadena, tenés todo lo que hace falta para sacarle provecho al día.",
  },
  {
    q: "¿Y si mi negocio es chico?",
    a: "Entrás igual y te llevás lo mismo. El restaurante de un solo local pesa igual que la cadena de veinte, y buena parte de lo que se cuenta se aplica desde el primer local.",
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
  "1 local",
  "2 a 5 locales",
  "6 a 15 locales",
  "Más de 15 locales",
  "Todavía no abrí",
];

/** WhatsApp de Alan — fallback cuando no hay endpoint conectado. */
export const WHATSAPP_ORGANIZADOR = "5491154596266";
