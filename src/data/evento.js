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
      "La foto del rubro con números, no con impresiones. Por qué la brecha que se abrió no es de tamaño ni de plata.",
  },
  {
    hora: "11:00",
    tipo: "charla",
    titulo: "Qué te están diciendo tus datos y no estás escuchando",
    quien: "Alan Tapia · Deenex",
    punta:
      "Tu local ya genera la información. Qué decisiones de margen se toman distinto cuando alguien la lee.",
  },
  {
    hora: "12:00",
    tipo: "demo",
    titulo: "Hasta dónde llega hoy el sistema con el que cobrás",
    quien: "CEO de Bistrosoft",
    punta:
      "El punto de venta como fuente de decisiones y no solo de facturas. Con demos montadas en el salón.",
  },
  {
    hora: "13:45",
    tipo: "charla",
    titulo: "Cómo se hace hoy el contenido que mueve una marca gastronómica",
    quien: "UGC y contenidos",
    punta:
      "Qué se graba, con qué frecuencia y por qué mostrar el plato dejó de rendir. Sin equipo de diez personas.",
  },
  {
    hora: "14:45",
    tipo: "charla",
    titulo: "Cómo se conduce un negocio del rubro cuando el mercado se endurece",
    quien: "Avanzia · ex-CEO de Dexter y ex-presidente de la CAME",
    punta:
      "Dos que ya tomaron esas decisiones con gente y plata en juego, contando cómo las tomaron.",
  },
  {
    hora: "16:00",
    tipo: "charla",
    titulo: "Por qué solos no llegamos: marcas, tecnología y proveedores",
    quien: "Alan Tapia · Deenex",
    punta:
      "Cómo se construye la red que sí llega, y qué hace falta de cada lado para que funcione.",
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
    detalle: "Seis charlas más la mesa redonda de cierre. Track único: no elegís, no te perdés nada." },
  { dato: "9 a 18", label: "de jornada", peso: "chico" },
  { dato: "5", label: "degustaciones", peso: "chico" },
  { dato: "200", label: "dueños en la sala", peso: "medio",
    detalle: "Sala curada de decisores del rubro. Sin público general." },
  { dato: "Demos", label: "montadas en vivo", peso: "chico" },
  { dato: "$0", label: "la entrada", peso: "chico" },
];

/** Con qué volvés al local. Verbo + resultado tangible, sin adjetivos. */
export const EL_LUNES = [
  "Cómo mirar tu food cost real y no el que dice tu ficha técnica",
  "Qué datos ya estás generando y dónde se leen",
  "Herramientas probadas en vivo, con lo que hacen y lo que cuestan",
  "Los proveedores del rubro comparados en un día en vez de en tres meses",
  "Los números reales de otros dueños de Córdoba, dichos en voz alta",
  "La grilla del evento con todos los beneficios de partners por escrito",
];

/**
 * La objeción del domingo. Ninguna landing del rubro la tiene porque ninguna
 * la necesita: Hotelga y FITHEP van de 13 a 20, HIP y Alimentaria de lunes a
 * miércoles. Es nuestra mayor barrera y también nuestro punto de vista.
 */
export const DOMINGO = {
  titulo: "Sí, es domingo. Y sabemos lo que factura tu domingo.",
  cuerpo: [
    "Por eso la jornada dura nueve horas y no dos: es el único día en que no te llama ningún proveedor, ni el banco, ni la gestoría. Delegás el servicio una vez y ganás el día entero.",
    "Entrás y salís cuando quieras. Nadie controla la butaca: venís a la mañana y llegás al local para el servicio, o llegás a la tarde y agarrás los últimos bloques más la mesa redonda.",
  ],
  salida: "Y si de verdad no podés, mandá a tu socio o a tu encargado. El lugar es de la marca, no de la persona.",
};

// ──────────────────────────────────────────────────────────────────────────
export const BENEFICIOS = [
  {
    n: "01",
    kicker: "CONTENIDO",
    titulo: "Cosas que podés aplicar el lunes.",
    texto:
      "Cada bloque cierra con algo concreto para hacer, no con una conclusión inspiradora. Lo que ya funciona en otros locales, contado por los que lo hacen.",
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
    bio: "Founder de Deenex, la plataforma omnicanal con la que trabajan más de 350 marcas de foodservice y gastronomía. Da tres de los seis bloques del día.",
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
