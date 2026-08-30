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
  fechaISO: "2026-09-20T10:00:00-03:00",
  fechaLarga: "Domingo 20 de septiembre de 2026",
  fechaCorta: "Domingo 20.09.2026",
  // Sin anio: entra en una linea en el rotulo del hero a 375px de ancho.
  fechaBreve: "Domingo 20.09",
  fechaNumerica: "20.09.26",
  // Sin el dia de la semana: el pie lo usaba escrito a mano ("Domingo, 10 a
  // 18"), que es justo la forma que salio de la comunicacion.
  fechaSinDia: "20 de septiembre",
  // Puertas 8:30, charlas 10 a 18. La hora 9 que figuraba antes no era ni
  // la de apertura ni la del primer bloque: no existia en ningun lado.
  horario: "10 a 18",
  puertas: "8:30",
  ciudad: "Córdoba",
  venue: "Hotel Quinto Centenario",
  direccion: "Duarte Quirós 1300",
  // Contexto, nunca asistencia propia: las 20.000 son del evento madre.
  eventoMadre: "Córdoba Corazón de Moda",
  eventoMadreCirculacion: "20.000",
};

/**
 * Las pestañas de navegación, para el nav de arriba y para el pie.
 *
 * Estaban duplicadas y ya habían derivado: cinco arriba y tres abajo, así que
 * el pie escondía justo las dos secciones que alguien que llega de un anuncio
 * busca primero. Con una sola lista no pueden volver a separarse.
 *
 * El ancla de sponsors sigue siendo #partners: el id no se renombró porque no
 * es comunicación y cambiarlo rompe cualquier link ya compartido.
 */
export const NAV_ENLACES = [
  { id: "que-es", label: "Qué es" },
  { id: "jornada", label: "Programa" },
  { id: "partners", label: "Sponsors" },
  { id: "lugar", label: "Lugar" },
  { id: "faq", label: "Preguntas" },
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
    id: "mercado",
    tramo: "manana",
    dur: 45,
    hora: "10:00",
    tipo: "charla",
    titulo: "Quiénes abrieron, quiénes cerraron y qué los separó",
    quien: "Alan Tapia · Deenex",
    punta:
      "2026 es el año en que el rubro se ordenó: se proyectan cuatro mil locales nuevos y doscientas marcas entrando al país, y al mismo tiempo cerraron franquiciados que apenas pasaban el break even. Qué hicieron distinto los que quedaron del lado bueno de esa línea.",
  },
  {
    id: "benchmark",
    tramo: "manana",
    dur: 45,
    hora: "11:00",
    tipo: "interactivo",
    titulo: "Dónde estás parado: los números de la sala",
    quien: "Alan Tapia · Deenex, con la sala",
    punta:
      "Al reservar se completa una encuesta anónima de cuatro campos, y los resultados se muestran acá. Cada uno se va sabiendo dónde está su food cost, su ticket promedio y su mezcla de canales contra la mediana de las cadenas que están sentadas al lado.",
  },
  {
    id: "pos",
    tramo: "manana",
    dur: 45,
    hora: "12:00",
    tipo: "demo",
    titulo: "Hasta dónde llega hoy el sistema con el que cobrás",
    quien: "CEO de Bistrosoft",
    punta:
      "Qué cambia cuando todas tus sucursales reportan al mismo lugar y dejás de armar el número a mano. Con demos montadas en el salón.",
  },
  {
    id: "ia",
    tramo: "tarde",
    dur: 30,
    hora: "13:45",
    tipo: "charla",
    titulo: "El 73% invirtió en inteligencia artificial este año. El 29% vio el retorno.",
    quien: "Especialista en datos e IA aplicada",
    punta:
      "Media hora para separar lo que ya devuelve plata en una cadena de varios locales —previsión de demanda, armado de cuadrantes, control de desperdicio— de lo que todavía es una apuesta. Con la cuenta al lado, sin vender nada.",
  },
  {
    id: "conduccion",
    tramo: "tarde",
    dur: 45,
    hora: "14:45",
    tipo: "charla",
    titulo: "Cómo se conduce una cadena cuando el mercado se endurece",
    quien: "Avanzia · ex-CEO de Dexter y ex-presidente de la CAME",
    punta:
      "Dos que ya condujeron compañías con cientos de empleados, contando cómo se decide cuando hay gente y plata en juego. El tamaño no cambia la decisión: cambia lo que sale equivocarse. Aplica igual con tres locales que con treinta.",
  },
  {
    id: "contenido",
    tramo: "tarde",
    dur: 45,
    hora: "16:00",
    tipo: "charla",
    titulo: "Cómo se sostiene una marca en varios locales a la vez",
    quien: "Especialista en contenido y redes",
    punta:
      "Qué se graba, con qué frecuencia y cómo se mantiene una sola voz cuando la marca está en cinco puntos. Sin un equipo de diez personas.",
  },
  {
    id: "mesa",
    tramo: "cierre",
    dur: 60,
    hora: "17:00",
    tipo: "mesa",
    titulo: "Lo que nadie dice en público",
    quien: "Mesa redonda · todos los que hablaron",
    punta:
      "Una hora sentados en el centro del salón, con preguntas abiertas de la sala. Sin guion.",
  },
];

/** Los cuatro tipos de bloque, con su pictograma y su tinte. */
export const TIPOS_BLOQUE = {
  charla: { label: "Charla", icono: "charla", clase: "border-white/15 text-white" },
  demo: { label: "Demo en vivo", icono: "demo", clase: "border-acento/50 text-acento-texto" },
  interactivo: { label: "Con la sala", icono: "gente", clase: "border-acento/50 text-acento-texto" },
  mesa: { label: "Mesa redonda", icono: "mesa", clase: "border-acento bg-acento-boton text-white" },
  pausa: { label: "Degustación", icono: "degustacion", clase: "border-white/10 text-gris" },
  apertura: { label: "Puertas", icono: "entrada", clase: "border-white/10 text-gris" },
  cierre: { label: "Networking", icono: "gente", clase: "border-white/10 text-gris" },
};


/**
 * Solo los huecos que tienen nombre propio, indexados por la hora que el
 * componente CALCULA. Los que no figuran caen al default "Degustación".
 *
 * La duración nunca se declara acá: se resta entre el fin de un bloque y el
 * arranque del siguiente. Si mañana se mueve un horario, la pausa se
 * recalcula sola y la sección no puede mentir.
 */
export const PAUSAS = {
  "12:45": {
    titulo: "Pausa larga",
    detalle: "Ronda grande de degustación, stands y networking sin apuro.",
  },
  "14:15": {
    titulo: "Degustación y stands",
    detalle: "Media hora entre el bloque corto y el de conducción, con los stands abiertos.",
  },
  "15:30": {
    titulo: "Coffee break",
    detalle: "Café y algo dulce antes del último tramo.",
  },
};

/**
 * Las dos puntas del día. Estas sí publican hora: 8:30 y 18:00 ya están al
 * aire en la sección del lugar y en EVENTO.horario.
 */
export const BORDES = {
  apertura: {
    id: "apertura",
    tipo: "apertura",
    hora: "8:30",
    titulo: "Puertas y acreditación",
    detalle: "Acreditación con el código, café de bienvenida y los stands ya abiertos.",
  },
  cierre: {
    id: "cierre",
    tipo: "cierre",
    hora: "18:00",
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
 * Sponsors confirmados.
 *
 * REGLA DEL BRIEF: acá solo entra lo cerrado POR ESCRITO. Nada en gestión.
 *
 * Para sumar uno hacen falta cinco campos y un archivo, y nada más:
 *   nombre   el nombre de la marca, tal cual lo escribe ella
 *   tipo     "Sponsor oficial" | "Sponsor de contenido" | "Institución que
 *            acompaña" | "Proveedores confirmados"
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
    tipo: "Sponsor oficial",
    empresa:
      "Sistema de gestión y punto de venta para gastronomía. Trabaja con locales de todo el país.",
    quien: "Viene el CEO",
    aporte: "Da la charla sobre la evolución del POS y monta demos en vivo con equipo propio.",
  },
  {
    nombre: "Avanzia",
    logo: "avanzia.png",
    tipo: "Sponsor de contenido",
    empresa: "Consultora de gestión y desarrollo de negocios para empresas del rubro.",
    quien: "Traen dos oradores",
    aporte: "El ex-CEO de Dexter y el ex-presidente de la CAME, sobre conducción y mercado.",
  },
  {
    nombre: "Asociación de Marcas y Franquicias",
    logo: "aamf.webp",
    tipo: "Institución que acompaña",
    empresa:
      "Nuclea a las marcas y cadenas del país que crecen por franquicia y por locales propios.",
    quien: "Acompaña la convocatoria",
    aporte: "Acerca a la sala cadenas de otras provincias y respalda la jornada institucionalmente.",
  },
  {
    nombre: "I+D IoT Lab",
    logo: "id-iot-lab.png",
    tipo: "Sponsor de contenido",
    empresa:
      "Laboratorio de investigación y desarrollo en IoT e inteligencia artificial aplicada.",
    quien: "Da el bloque de IA",
    aporte:
      "La charla sobre inteligencia artificial ya aplicada en cadenas, con casos y números.",
  },
  {
    nombre: "La mesa de degustación",
    // No es el nombre de una empresa: en la barra de arriba, que son puros
    // nombres, se leía como una que no existe. Su tarjeta en #partners queda.
    enBarra: false,
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
    a: "De tendencias e innovación aplicadas a una cadena: el estado real del mercado con números, tus propios indicadores comparados en vivo con los del resto de la sala, la evolución de los sistemas POS con demos en vivo, qué inteligencia artificial ya devuelve plata en varios locales y cuál todavía no, cómo se conduce una cadena cuando el mercado se endurece, y cómo se sostiene una marca en varios puntos a la vez. Siete bloques a lo largo del día.",
  },
  {
    q: "¿Me van a querer vender algo?",
    a: "Sí, y conviene decirlo derecho. El evento lo organiza Deenex, que le vende software a cadenas como la tuya, y hay sponsors con stand que también venden. A las 12 el CEO de Bistrosoft muestra su sistema en vivo, dentro del programa. Lo que no hay es una agenda de reuniones armada ni nadie que te aborde: la conversación de negocios la arrancás vos. Si te vas sin haber hablado de plata con nadie, para nosotros el día salió bien igual.",
  },
  {
    q: "Tengo el local abierto ese día. ¿Cómo hago?",
    a: "Es la que más nos preguntan, así que va derecho: no hace falta que estés las ocho horas y nadie controla la butaca. Venís a la mañana, te llevás el estado del mercado y cómo comparar tus locales entre sí, y estás de vuelta en el local para el servicio. O llegás a media tarde y agarrás los últimos bloques y la mesa redonda de cierre, que es donde se dice lo que no se dice en público. La grilla final les llega a los inscriptos antes del evento, así elegís a qué venir. Lo que no te conviene es mandar a alguien en tu lugar: lo que se habla acá —qué cerrar, qué cambiar, con quién meterte— lo terminás firmando vos, y la sala está armada para que los dueños se crucen entre ellos. Traé a tu socio o a tu gerente general si querés, pero vení.",
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
    a: "Sí, y está en la entrada. Café de bienvenida desde las 8:30 con los stands ya abiertos, degustación entre bloque y bloque —alfajores, aceitunas, humus y café, que los ponen los proveedores confirmados—, una pausa larga de 12:45 a 13:45 con la ronda grande, coffee break a las 15:30, y vino, cerveza y café en el cierre.",
  },
  {
    q: "¿Se transmite en vivo?",
    a: "No. Lo que pasa en la sala pasa estando ahí: las demos se prueban en el salón, la mesa redonda se responde de frente y el networking no tiene versión remota. Lo que sí queda por escrito es el material del día, que les llega a los que asistieron.",
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
        "Hola Alan! Sé que la sala está llena. Quiero quedar en la lista por si se libera un lugar el domingo 20 de septiembre.",
        "",
      ]
    : [
        "GASTROTECH · QUIERO IR",
        "",
        "Hola Alan! Quiero mi lugar para el domingo 20 de septiembre en Córdoba.",
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
    "QUIERO SER SPONSOR DE GASTROTECH\n\nHola Alan! Me interesa participar como sponsor del evento del 20 de septiembre.\n\nMarca:\nA qué nos dedicamos:\nQué nos interesaría aportar:",
  prensa:
    "PRENSA · ACREDITACIÓN GASTROTECH\n\nHola Alan! Quiero acreditarme para cubrir el evento del 20 de septiembre.\n\nMedio:\nMi nombre:\nQué necesitaría:",
  consulta:
    "CONSULTA GASTROTECH\n\nHola! Tengo una consulta sobre el evento del 20 de septiembre:\n\n",
};

/** Arma el enlace listo para abrir. */
export function linkWa(clave) {
  return `https://wa.me/${WHATSAPP_ORGANIZADOR}?text=${encodeURIComponent(MENSAJES_WA[clave] || "")}`;
}
