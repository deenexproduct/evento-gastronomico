<template>
  <!--
    El logo de Deenex, del mismo dibujo que usa el sitio oficial
    (website-deenex-oficial/components/ui/DeenexLogo.tsx).

    Allá está pintado en blanco fijo, porque ese sitio es oscuro. Acá cada
    relleno y cada trazo van en currentColor: el logo toma el color del texto
    que lo rodea, así que se lee en el tema claro —que es el de esta página—
    y en el oscuro sin una versión por tema ni un filtro encima.

    El alto lo pone el que lo usa; el ancho sale solo del viewBox (5 a 1).
    Lleva role="img" y aria-label para que un lector de pantalla diga
    "Deenex" donde se ve la marca, y no nada.
  -->
  <svg
    viewBox="0 0 692 138"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Deenex"
    focusable="false"
  >
    <path
      d="M307.497 99.8052H228.728V40.7717H307.497V54.5347H246.299V64.3159H305.852V75.6551H246.299V86.0422H307.497V99.8052ZM394.732 99.8052H315.963V40.7717H394.732V54.5347H333.535V64.3159H393.088V75.6551H333.535V86.0422H394.732V99.8052ZM420.771 99.8052H403.199V40.7717H423.281L474.005 80.6756V40.7717H491.576V99.8052H471.927L420.771 59.2089V99.8052ZM579.685 99.8052H500.916V40.7717H579.685V54.5347H518.488V64.3159H578.041V75.6551H518.488V86.0422H579.685V99.8052ZM586.161 40.7717H612.562L637.231 61.0266L662.074 40.7717H687.435L651.081 70.2019L687.782 99.8052H661.121L636.885 79.81L612.215 99.8052H586.075L622.862 70.4616L586.161 40.7717Z"
      fill="currentColor"
    />
    <rect x="0.0537109" y="36.6848" width="22.1955" height="22.1955" fill="currentColor" />
    <rect x="35.4834" y="53.4961" width="27.679" height="27.679" fill="currentColor" />
    <rect x="6.40088" y="82.4802" width="17.9423" height="17.9423" fill="currentColor" />
    <rect x="8.01123" y="8.17822" width="13.2467" height="13.2467" fill="currentColor" />
    <rect x="11.3057" y="111.694" width="8.5971" height="8.5971" fill="currentColor" />
    <path d="M18.7188 95.3599L35.4831 105.676" stroke="currentColor" stroke-width="6.87768" />
    <path d="M20.2231 86.333L37.8472 76.6613" stroke="currentColor" stroke-width="6.87768" />
    <path d="M18.0742 40.5535L37.2028 30.4519" stroke="currentColor" stroke-width="6.87768" />
    <path
      d="M202.054 68.6051C202.054 16.7663 170.775 0.554199 123.656 0.554199H31.2217V35.3802H119.846C148.117 35.3802 159.947 41.9852 159.947 68.6051C159.947 95.6253 148.117 102.23 119.846 102.23H31.2217V137.056H123.656C170.374 137.056 202.054 122.045 202.054 68.6051Z"
      fill="currentColor"
    />
  </svg>
</template>
