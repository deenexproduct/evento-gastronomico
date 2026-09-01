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
  // SÁBADO 19, no domingo 20. Lo cambió la reunión con Gastón Santana del
  // 31/08: el fin de semana se parte en dos —sábado gastronomía, domingo
  // emprendedores— y GastroTech es el sábado. Todo el material anterior decía
  // domingo, así que si algo quedó con la fecha vieja, está mal.
  fechaISO: "2026-09-19T10:00:00-03:00",
  fechaLarga: "Sábado 19 de septiembre de 2026",
  fechaCorta: "Sábado 19.09.2026",
  // Sin anio: entra en una linea en el rotulo del hero a 375px de ancho.
  fechaBreve: "Sábado 19.09",
  fechaNumerica: "19.09.26",
  // Sin el dia de la semana: el pie lo usaba escrito a mano, que es justo la
  // forma que salio de la comunicacion.
  fechaSinDia: "19 de septiembre",
  // Acreditacion 9:30, charlas 10:00 a 18:05. Lo fijo la grilla del 30/08:
  // el material anterior decia "puertas y stands desde las 8:30", que era una
  // hora antes y no coincidia con ningun bloque.
  horario: "10 a 18",
  puertas: "9:30",
  ciudad: "Córdoba",
  venue: "Hotel Quinto Centenario",
  direccion: "Duarte Quirós 1300",
  // Contexto, nunca asistencia propia: las 20.000 son del evento madre.
  eventoMadre: "Córdoba Corazón de Moda",
  eventoMadreCirculacion: "20.000",
};

/**
 * El domingo, que es la otra mitad del fin de semana.
 *
 * Se publica lo que está decidido y nada más: que existe, para quién es y que
 * la acreditación es la misma. Conductora, programa y oradores no están
 * definidos —Alan, textual, el 31/08: «el del domingo no la pensé»—, así que
 * la página no los promete. Cuando se cierren, entran acá.
 */
export const DOMINGO = {
  fechaISO: "2026-09-20T10:00:00-03:00",
  fechaLarga: "Domingo 20 de septiembre",
  titulo: "El domingo es de emprendedores",
  bajada:
    "El mismo fin de semana, en el mismo edificio, con una jornada propia para los que están armando su proyecto. Se reserva por el mismo WhatsApp y el programa se anuncia con la grilla final.",
};

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
    titulo: "Qué es GastroTech",
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
    resumen: "Deenex, y por qué abrimos este espacio.",
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
      "Stands abiertos y mesa de degustación. Acá termina la mañana y arranca la jornada de la tarde: es la hora larga del día para cruzarse con el resto de la sala sin apuro.",
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
    dur: 45,
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
  pausa: { label: "Degustación", icono: "degustacion" },
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
 * componente CALCULA. Los que no figuran caen al default "Degustación".
 *
 * La duración nunca se declara acá: se resta entre el fin de un bloque y el
 * arranque del siguiente. Si mañana se mueve un horario, la pausa se
 * recalcula sola y la sección no puede mentir.
 */
export const PAUSAS = {};
/**
 * Las dos puntas del día. Estas sí publican hora: 9:30 y 18:05 ya están al
 * aire en la sección del lugar y en EVENTO.horario.
 */
export const BORDES = {
  apertura: {
    id: "apertura",
    tipo: "apertura",
    hora: "9:30",
    titulo: "Acreditación · stands · degustación",
    detalle: "Te recibimos uno por uno, con los stands y la mesa de degustación ya abiertos.",
  },
  cierre: {
    id: "cierre",
    tipo: "cierre",
    hora: "18:05",
    titulo: "Networking de cierre",
    detalle: "La sala queda abierta hasta que se corta el evento.",
  },
};


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
    a: "De tendencias e innovación aplicadas a una cadena: el estado real del mercado con números, tus propios indicadores comparados en vivo con los del resto de la sala, la evolución de los sistemas POS, qué inteligencia artificial ya devuelve plata en varios locales y cuál todavía no, cómo se conduce una cadena cuando el mercado se endurece, y cómo se sostiene una marca en varios puntos a la vez. Once bloques a lo largo del día.",
  },
  {
    q: "¿Me van a querer vender algo?",
    a: "Sí, y conviene decirlo derecho. El evento lo organiza Deenex, que le vende software a cadenas como la tuya, y hay sponsors con stand que también venden. A las 12 el CEO de Bistrosoft muestra su sistema en vivo, dentro del programa. Lo que no hay es una agenda de reuniones armada ni nadie que te aborde: la conversación de negocios la arrancás vos. Si te vas sin haber hablado de plata con nadie, para nosotros el día salió bien igual.",
  },
  {
    q: "Tengo el local abierto ese día. ¿Cómo hago?",
    a: "Es la que más nos preguntan, y con un sábado pesa más todavía, así que va derecho: no hace falta que estés las ocho horas y nadie controla la butaca. Venís a la mañana, te llevás el estado del mercado y cómo comparar tus locales entre sí, y estás de vuelta en el local para el servicio. O llegás a media tarde y agarrás los últimos bloques y el panel de cierre, donde los proveedores discuten entre ellos delante de la sala. La grilla final les llega a los inscriptos antes del evento, así elegís a qué venir. Lo que no te conviene es mandar a alguien en tu lugar: lo que se habla acá —qué cerrar, qué cambiar, con quién meterte— lo terminás firmando vos, y la sala está armada para que los dueños se crucen entre ellos. Traé a tu socio o a tu gerente general si querés, pero vení.",
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
    a: "Sí, y está en la entrada. Café de bienvenida desde las 9:30 con los stands ya abiertos, degustación entre bloque y bloque —alfajores, aceitunas, humus y café, que pone la mesa de degustación—, la hora de networking de 12:45 a 13:45 con la ronda grande, y vino, cerveza y café en el cierre. No hay almuerzo servido: se come circulando, entre bloque y bloque.",
  },
  {
    q: "¿Se transmite en vivo?",
    a: "No. Lo que pasa en la sala pasa estando ahí: los sistemas se prueban en los stands, el panel se responde de frente y el networking no tiene versión remota. Lo que sí queda por escrito es el material del día, que les llega a los que asistieron.",
  },
  {
    q: "¿Y el domingo qué pasa?",
    a: "El fin de semana tiene dos jornadas y GastroTech es la del sábado, que es la de gastronomía. El domingo, en el mismo edificio, hay una jornada para emprendedores: si querés ir a las dos, se reserva por el mismo WhatsApp. El programa del domingo se anuncia con la grilla final.",
  },
  {
    q: "¿Dónde es exactamente?",
    a: `En un salón propio del ${EVENTO.venue}, ${EVENTO.direccion}, Córdoba. Puertas ${EVENTO.puertas}, charlas de ${EVENTO.horario}. Se entra por lista: adentro estamos los 200 y nadie más. Ese mismo día el centro de convenciones aloja ${EVENTO.eventoMadre}, y tu acreditación de GastroTech también te habilita ese evento: son unas ${EVENTO.eventoMadreCirculacion} personas circulando por el edificio durante el día. La sala de GastroTech es aparte.`,
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


export const WHATSAPP_ORGANIZADOR = "5491154596266";

// ─────────────────────────────────────────────────────────────────────────────
// Mensajes de WhatsApp.
//
// Todos van al mismo número. Cada uno arranca identificando de qué se trata,
// para que del otro lado se sepa qué es sin tener que preguntarlo.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * El mensaje de reserva. Es todo lo que queda del formulario.
 *
 * Los renglones en blanco son los campos que antes se tipeaban en la página.
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
export function mensajeReserva({ locales = "", temas = [], personas = 1, agotado = false } = {}) {
  const lineas = agotado
    ? [
        "GASTROTECH · LISTA DE ESPERA",
        "",
        `Hola Alan! Sé que la sala está llena. Quiero quedar en la lista por si se libera un lugar el ${EVENTO.fechaLarga.toLowerCase().replace(" de 2026", "")}.`,
        "",
      ]
    : [
        "GASTROTECH · QUIERO IR",
        "",
        `Hola Alan! Quiero mi lugar para el ${EVENTO.fechaLarga.toLowerCase().replace(" de 2026", "")} en ${EVENTO.ciudad}.`,
        "",
      ];

  // Cuántos van. Con cupo duro de 200 es el dato operativo que hoy no se
  // pregunta en ningún lado: sin esto, 200 mensajes son 200 personas y en la
  // puerta aparecen 260. Solo se escribe si no es 1, que es el default: un
  // renglón "Vamos 1" no informa nada y ocupa la primera pantalla del chat.
  if (personas > 1) lineas.push(`Vamos ${personas} (yo + ${personas - 1} de mi equipo)`);

  lineas.push(
    "Nombre:",
    "Marca:",
    "Cuántos locales tengo:",
    "Mi rol:",
    // El paréntesis no es adorno: un renglón que dice solo "Mail:" se saltea.
    // Con la razón adentro se completa, y el mail es el dato más frágil que
    // queda ahora que no hay formulario.
    "Mi mail (ahí me mandan la grilla final):"
  );

  // El tema es el renglón que convierte una plantilla en una conversación. No
  // entra en la lista de espera: preguntarle el tema a alguien que no entra es
  // una falta de respeto.
  // El renglón del tema llega en blanco en el 100% de los mensajes: nadie
  // tipea un tema libre desde el teléfono. Si la persona marcó algo arriba,
  // sale escrito. El prefijo NO cambia —los tests lo verifican por toContain—
  // y con la lista vacía el string es idéntico al de siempre.
  if (!agotado) {
    lineas.push(
      "",
      temas.length
        ? `Me interesaría que se hable de: ${temas.join(" · ")}`
        : "Me interesaría que se hable de:"
    );
  }

  return lineas.join("\n");
}

/** El enlace de reserva, listo para abrir. */
/**
 * Cuantos renglones en blanco trae el mensaje de reserva.
 *
 * La pagina lo dice en voz alta antes de que la persona toque el boton, y
 * decia "cuatro" cuando eran seis: el que abria WhatsApp encontraba mas
 * trabajo del prometido justo en el paso donde se decide. Contarlo del
 * mensaje real es lo unico que evita que los dos vuelvan a separarse.
 */
export const RENGLONES_RESERVA = mensajeReserva()
  .split("\n")
  .filter((linea) => linea.trim().endsWith(":")).length;

export function linkWaReserva(opciones) {
  return `https://wa.me/${WHATSAPP_ORGANIZADOR}?text=${encodeURIComponent(mensajeReserva(opciones))}`;
}

export const MENSAJES_WA = {
  registro: mensajeReserva(),
  partner:
    `QUIERO SER SPONSOR DE GASTROTECH\n\nHola Alan! Me interesa participar como sponsor del evento del ${EVENTO.fechaSinDia}.\n\nMarca:\nA qué nos dedicamos:\nQué nos interesaría aportar:`,
  prensa:
    `PRENSA · ACREDITACIÓN GASTROTECH\n\nHola Alan! Quiero acreditarme para cubrir el evento del ${EVENTO.fechaSinDia}.\n\nMedio:\nMi nombre:\nQué necesitaría:`,
  consulta:
    `CONSULTA GASTROTECH\n\nHola! Tengo una consulta sobre el evento del ${EVENTO.fechaSinDia}:\n\n`,
};

/** Arma el enlace listo para abrir. */
export function linkWa(clave) {
  return `https://wa.me/${WHATSAPP_ORGANIZADOR}?text=${encodeURIComponent(MENSAJES_WA[clave] || "")}`;
}
