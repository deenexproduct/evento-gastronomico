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
// La reunión de diagnóstico — LA promesa de toda la convocatoria.
//
// Ojo: el formato, la duración y el plazo todavía no están definidos (pendiente
// del brief). Acá se describe QUÉ se analiza, no cuánto dura ni cuándo es.
// ─────────────────────────────────────────────────────────────────────────────

export const DIAGNOSTICO = {
  titular: "Te vas con un diagnóstico de tu negocio.",
  bajada:
    "No es una charla de pasillo ni una demo. Es una reunión técnica sobre tu marca: dónde estás parado hoy a nivel tecnológico, qué te está costando plata sin que lo veas, y cuál es el próximo paso concreto.",
  puntos: [
    {
      titulo: "Dónde estás parado",
      texto:
        "Qué tecnología estás usando hoy, qué te falta y qué tenés de más. La foto real, sin diplomacia.",
    },
    {
      titulo: "Qué te dicen tus datos",
      texto:
        "Qué información ya estás generando y no estás leyendo. Ahí suele estar el margen que falta.",
    },
    {
      titulo: "Tu canal propio",
      texto: "Cuánto de tu venta depende de terceros y qué haría falta para tener canal propio.",
    },
    {
      titulo: "El próximo paso",
      texto:
        "Uno concreto, priorizado y con orden de magnitud. No una lista de treinta cosas para hacer.",
    },
  ],
  cierre:
    "Le corresponde a todo el que entra, sin excepción y sin costo. No se vende, no se consigue por otro canal y no hay lista especial: se desbloquea con tu QR el día del evento.",
};

// ─────────────────────────────────────────────────────────────────────────────
// Qué más se lleva el que viene (el diagnóstico tiene sección propia)
// ─────────────────────────────────────────────────────────────────────────────

export const BENEFICIOS = [
  {
    n: "01",
    kicker: "BENEFICIOS",
    titulo: "Condiciones que solo existen en la sala.",
    texto:
      "Cada partner llega con un beneficio exclusivo para los que están ese día. No se consiguen en otro momento ni por otro canal.",
  },
  {
    n: "02",
    kicker: "INNOVACIÓN",
    titulo: "Lo que ya está funcionando.",
    texto:
      "Qué se está usando de verdad en el rubro y qué viene. Datos, IA, POS y contenido aplicados al negocio gastronómico. No teoría: lo que ya funciona en otros locales.",
  },
  {
    n: "03",
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
    q: "¿Qué es exactamente la reunión de diagnóstico?",
    a: "Una reunión técnica sobre tu marca: dónde estás parado a nivel tecnológico, qué te está costando plata sin que lo veas y cuál es el próximo paso concreto. Le corresponde a todo el que entra, sin excepción y sin costo. Se desbloquea al escanear tu QR el día del evento.",
  },
  {
    q: "¿Me van a querer vender algo?",
    a: "No. En todo el día no hay pitch de producto ni ronda comercial: hay charlas de gente que labura del rubro, demos que podés mirar si querés y un diagnóstico sobre tu negocio. Si después de eso querés seguir hablando, se habla. Si no, te vas con el diagnóstico igual.",
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
    a: "No. Hablamos de margen, tiempo y decisiones, no de fierros. Si manejás un local o una cadena, tenés todo lo que hace falta para sacarle provecho al día.",
  },
  {
    q: "¿Y si mi negocio es chico?",
    a: `Entrás igual y te llevás lo mismo. El restaurante de un solo local pesa igual que la cadena de veinte: el diagnóstico se hace sobre tu negocio, sea del tamaño que sea.`,
  },
  {
    q: "¿Qué me llevo si vengo?",
    a: "Tu reunión de diagnóstico, los beneficios exclusivos de todos los partners, la jornada completa de charlas y demos, y la grilla con todo por escrito para poder encararlo el lunes.",
  },
  {
    q: "¿Puedo llevar a alguien de mi equipo?",
    a: "Sí, y conviene. Cada persona necesita su propio registro y su propio QR porque el cupo se cuenta por persona, pero el diagnóstico se hace sobre la marca: venir con tu socio o tu gerente hace que la conversación rinda más.",
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
