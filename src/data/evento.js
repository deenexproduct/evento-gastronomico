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
  ocupados: 0, // ← actualizar a mano hasta que el endpoint esté conectado
};

// ─────────────────────────────────────────────────────────────────────────────
// Qué se lleva el que viene (los 4 del brief, en orden de peso)
// ─────────────────────────────────────────────────────────────────────────────

export const BENEFICIOS = [
  {
    n: "01",
    kicker: "LO PRINCIPAL",
    titulo: "Tu reunión de diagnóstico.",
    texto:
      "Una reunión técnica sobre tu propio negocio: en qué punto está a nivel tecnológico y hacia dónde tiene que ir. Le corresponde a todos los que entran, sin excepción.",
    destacado: true,
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
    kicker: "INNOVACIÓN",
    titulo: "Lo que ya está funcionando.",
    texto:
      "Qué se está usando de verdad en el rubro y qué viene. Datos, IA, POS y contenido aplicados al negocio gastronómico. No teoría: lo que ya funciona en otros locales.",
  },
  {
    n: "04",
    kicker: "MATERIAL",
    titulo: "La grilla en la mano.",
    texto:
      "Te vas con todo el evento por escrito: los beneficios disponibles, quién los da y cómo encararlos.",
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
      "Al escanear se te abre la agenda completa del día y tu reunión de diagnóstico, que agendás desde ahí mismo.",
  },
];

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
    q: "¿Cuánto cuesta?",
    a: "Nada. La entrada es gratuita, pero el registro previo es obligatorio y el cupo es real: 200 personas. Sin registro no hay ingreso.",
  },
  {
    q: "¿Se transmite en vivo?",
    a: "No. No hay streaming ni grabación abierta de las charlas. Lo que pasa en el salón —los beneficios, las demos, la mesa redonda, tu reunión de diagnóstico— pasa estando ahí.",
  },
  {
    q: "¿Qué es la reunión de diagnóstico?",
    a: "Una reunión técnica sobre tu negocio: en qué punto está a nivel tecnológico y hacia dónde tiene que ir. Le corresponde a todo el que entra. Se desbloquea y se agenda al escanear tu QR en la puerta.",
  },
  {
    q: "¿Para quién es?",
    a: "Para dueños de marcas gastronómicas y dueños de restaurantes de Córdoba capital y provincia. También franquiciantes, cadenas y grupos multimarca. Es un evento de negocios para decisores, no para empleados ni para público general.",
  },
  {
    q: "¿Hay almuerzo?",
    a: "No hay almuerzo servido. Hay cuatro rondas de degustación entre charlas, una pausa larga al mediodía con degustación y stands, un coffee break a media tarde, y networking de cierre con vino, cerveza y café.",
  },
  {
    q: "¿Dónde es exactamente?",
    a: `En un salón de 200 m² del ${EVENTO.venue}, en Córdoba. El salón es nuestro y el cupo es el del salón. Está dentro de ${EVENTO.eventoMadre}, un evento multisala por el que circulan unas ${EVENTO.eventoMadreCirculacion} personas.`,
  },
  {
    q: "¿Puedo llevar a alguien de mi equipo?",
    a: "Sí, pero cada persona necesita su propio registro y su propio QR. El cupo se cuenta por persona.",
  },
  {
    q: "¿Qué pasa si me anoto y no voy?",
    a: "Ocupás un lugar que no se libera. Si sabés que no vas a poder ir, avisanos y lo liberamos para alguien de la lista de espera.",
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
