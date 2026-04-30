---
project_name: "madness-marketing"
user_name: "Irivadeneira"
date: "2026-04-30"
sections_completed:
  [
    "technology_stack",
    "design_tokens",
    "component_patterns",
    "routing",
    "styling_rules",
    "data_layer",
    "conventions",
    "deploy_status",
    "roadmap",
  ]
---

# Project Context para Agentes AI

> Reglas y patrones críticos que los agentes AI deben seguir al implementar código en este proyecto. Enfocado en detalles no obvios que los modelos suelen ignorar.

---

## Stack Tecnológico (versiones exactas)

| Capa        | Tecnología                      | Versión  |
| ----------- | ------------------------------- | -------- |
| Framework   | Next.js (App Router, Turbopack) | 16.2.4   |
| Runtime     | React                           | 19.2.4   |
| Lenguaje    | TypeScript                      | ^5       |
| Styling     | Tailwind CSS                    | ^4       |
| Animaciones | framer-motion                   | ^12.38.0 |
| Gestos      | react-swipeable                 | ^7.0.2   |
| CMS         | Sanity (next-sanity)            | ^5.22.0  |
| Fuente      | Inter (Google Fonts)            | —        |
| Node        | —                               | v20.20.0 |

---

## Design Tokens (colores de marca)

Los colores de marca están definidos como custom tokens de Tailwind v4 en `web/src/app/globals.css`:

```css
@theme inline {
  --color-mx-dark: #0d1b2a; /* Fondo principal */
  --color-mx-blue: #1a3a5c; /* Azul secundario */
  --color-mx-red: #e63030; /* Rojo acento */
  --color-mx-gray: #1c1c1e; /* Gris oscuro (cards) */
}
```

**Uso en clases Tailwind:** `bg-mx-dark`, `text-mx-red`, `border-mx-blue`, etc.

**Colores especiales (inline styles, no en tokens):**

- WhatsApp CTA: `style={{ background: "#25D366", color: "#fff" }}`
- Textos con opacidad: `style={{ color: "rgba(255,255,255,0.6)" }}`
- Transparencias de fondo: `style={{ background: "rgba(13,27,42,0.97)" }}`

**Regla:** Usar clases Tailwind para tokens de marca. Usar `style={{}}` inline solo cuando se necesitan valores con opacidad/alpha o valores únicos puntuales.

---

## Tailwind CSS v4 — Reglas Críticas

1. **Sin `tailwind.config.ts`** — la configuración es 100% CSS en `globals.css` con `@theme inline`.
2. **Clases deprecadas** — usar `shrink-0` en lugar de `flex-shrink-0`. Usar fracciones/valores semánticos en lugar de valores arbitrarios cuando existan equivalentes (ej: `after:h-0.5` en lugar de `after:h-[2px]`).
3. **Breakpoints:** `lg` = 1024px (breakpoint principal mobile → desktop). **Excepción: Navbar** usa `xl` = 1280px para el hamburger en landscape mobile.
4. **Dark mode:** El sitio es siempre dark — no usar `dark:` variants, el fondo base del body es `#0D1B2A`.

---

## Sanity CMS

El proyecto usa **Sanity** como CMS headless para gestionar los datos de viajes.

### Configuración

- `web/sanity.config.ts` — config principal: `projectId: "6zqw6gnm"`, `dataset: "production"`, `basePath: "/studio"`
- `web/src/sanity/lib/client.ts` — Sanity client usando env vars `NEXT_PUBLIC_SANITY_PROJECT_ID` y `NEXT_PUBLIC_SANITY_DATASET`
- `web/src/sanity/lib/queries.ts` — Queries GROQ: `ALL_TRIPS_QUERY`, `TRIP_BY_SLUG_QUERY`
- `web/src/sanity/schemas/trip.ts` — Schema del tipo `trip`
- Studio embebido en Next.js en la ruta `/studio` (`web/src/app/studio/[[...tool]]/`)

### Reglas críticas de Sanity

- Las imágenes en Sanity son **referencias** (`image` type) — usar `@sanity/image-url` para construir la URL final.
- `useCdn: true` en producción, `perspective: "published"` — los drafts no son visibles desde el frontend.
- Las queries usan `defineQuery` de `next-sanity` — siempre importar desde ahí, no escribir GROQ crudo.
- Los datos de viajes **ya no son estáticos** — `getAllTrips()` y `getTripBySlug()` hacen fetch a Sanity (async).
- `normalizeTrip()` en `trips-data.ts` normaliza el campo `spots` (puede llegar como string `"completo"` o número desde Sanity).

---

## Estructura de Rutas (App Router)

```
web/src/app/
├── layout.tsx              — RootLayout con Inter font, lang="es", body min-h-full flex flex-col
├── page.tsx                — Home (/)
├── globals.css             — @import tailwindcss + @theme inline + tokens
├── contacto/
│   └── page.tsx            — Contacto (/contacto) — Server Component
├── como-trabajamos/
│   └── page.tsx            — Cómo trabajamos (/como-trabajamos) — Server Component
├── equipo/
│   └── page.tsx            — El equipo (/equipo) — Server Component
├── studio/
│   └── [[...tool]]/        — Sanity Studio embebido (/studio)
└── viajes/
    ├── page.tsx            — Catálogo de viajes (/viajes) — async Server Component
    └── [slug]/
        └── page.tsx        — Ficha de viaje (/viajes/[slug]) — generateStaticParams
```

**Páginas pendientes de implementar:**

- `/proximas-salidas`
- `/grandes-expediciones`

---

## Componentes — Inventario Completo

Los componentes están organizados en subcarpetas dentro de `web/src/components/`:

### `layout/` — Globales (usados en todas las páginas)

| Componente                   | Descripción                                                               |
| ---------------------------- | ------------------------------------------------------------------------- |
| `Navbar.tsx`                 | Navegación. Hamburger en mobile/tablet (breakpoint xl).                   |
| `Footer.tsx`                 | Footer con links y datos de contacto.                                     |
| `FloatingWhatsAppButton.tsx` | Botón flotante WhatsApp — NO incluir en FichaViaje (tiene su propio CTA). |

### `sections/` — Secciones de Home (`/`)

| Componente                | Descripción                                     |
| ------------------------- | ----------------------------------------------- |
| `HeroSection.tsx`         | Hero con imagen de fondo y CTA principal.       |
| `TrustBlock.tsx`          | Bloque de confianza con íconos y métricas.      |
| `FeaturedTrips.tsx`       | Sección de viajes destacados usando `TripCard`. |
| `PabloSection.tsx`        | Sección sobre Pablo Fortunato (guía/fundador).  |
| `TestimonialsSection.tsx` | Carrusel de testimonios.                        |
| `FinalCTA.tsx`            | CTA final de la página.                         |

### `ui/` — Componentes UI reutilizables

| Componente               | Descripción                                           |
| ------------------------ | ----------------------------------------------------- |
| `TripCard.tsx`           | Card vertical de viaje (usada en Home/FeaturedTrips). |
| `TripCardHorizontal.tsx` | Card horizontal de viaje (usada en Catálogo).         |
| `TestimonialCard.tsx`    | Card individual de testimonio.                        |

### `views/` — Vistas completas de página (Client o Server)

| Componente           | Descripción                                                                                                                                                                  |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CatalogoViajes.tsx` | Lista de viajes con filtros por nivel/zona. `"use client"`. Recibe `trips` como prop (fetched en el server).                                                                 |
| `FichaViaje.tsx`     | Layout completo mobile + desktop. No incluye `FloatingWhatsAppButton`.                                                                                                       |
| `EquipoPage.tsx`     | Server Component. Hero, perfil Pablo (2col en lg), grid de guías (3col en lg), CTA. Datos ficticios en `GUIDES[]` — pendiente datos reales. Pablo usa `/photos/pablo2.jpeg`. |
| `ComoTrabajamos.tsx` | Página Cómo Trabajamos implementada.                                                                                                                                         |
| `ContactoPage.tsx`   | Página de Contacto. Muestra WhatsApp + formulario. **El formulario hoy no envía nada** — solo frontend, sin backend conectado.                                               |

### `gallery/` — Galería de fotos

| Componente               | Descripción                                                           |
| ------------------------ | --------------------------------------------------------------------- |
| `GalleryModal.tsx`       | Modal fullscreen con framer-motion backdrop (blur-2xl). Keyboard nav. |
| `GallerySharedModal.tsx` | Visor core: AnimatePresence, swipe (react-swipeable), thumbnails.     |

---

## Capa de Datos — `web/src/lib/`

### `trips-data.ts`

- Fuente única de verdad para los viajes — **ahora backed por Sanity CMS**, no es data estática.
- `getAllTrips(): Promise<Trip[]>` — ejecuta `ALL_TRIPS_QUERY` contra Sanity.
- `getTripBySlug(slug): Promise<Trip | undefined>` — ejecuta `TRIP_BY_SLUG_QUERY` contra Sanity.
- `normalizeTrip()` — normaliza el campo `spots` que puede llegar como string o number desde Sanity.
- Interfaces exportadas: `Trip`, `TripDate`, `ItineraryDay`, `TripTestimonial`
- El campo `imageSrc` es la imagen hero; el campo `images: string[]` son las fotos de la galería.

### `gallery-utils.ts`

- Tipos compartidos: `GalleryImage`, `SharedModalProps`
- Helpers: `animationVariants` (framer-motion), `range(start, end)`, `tripImagesToGallery(images)`

### `config.ts` — Configuración global del sitio

```ts
export const siteConfig = {
  name: "The Madness Expeditions",
  whatsappPhone: "541132693505",     // código país + número sin espacios
  instagramHandle: "madnessexpeditions",
  whatsappMessages: {
    default, navbar, beginners, finalCta  // claves tipadas
  },
}
export function waLink(message: keyof typeof siteConfig.whatsappMessages): string
export const instagramUrl: string
```

**Regla:** Todos los links de WhatsApp deben usar `waLink()` de `@/lib/config`. No hardcodear URLs ni números de teléfono en componentes.

---

## Patrones de Componentes

### Páginas (Server Components por defecto)

```tsx
// web/src/app/ruta/page.tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsAppButton from "@/components/layout/FloatingWhatsAppButton";
import MiComponente from "@/components/views/MiComponente";

export const metadata = { title: "...", description: "..." };

export default function MiPage() {
  return (
    <>
      <Navbar />
      <main>
        <MiComponente />
      </main>
      <Footer />
      <FloatingWhatsAppButton />
    </>
  );
}
```

### Páginas con data de Sanity (async Server Component)

```tsx
import { getAllTrips } from "@/lib/trips-data";

export default async function MiPage() {
  const trips = await getAllTrips(); // fetch en servidor
  return (
    <>
      <Navbar />
      <main>
        <CatalogoViajes trips={trips} />
      </main>
      <Footer />
      <FloatingWhatsAppButton />
    </>
  );
}
```

### Componentes con estado (Client Components)

- Agregar `"use client"` como primera línea.
- Preferir `useState` + props drilling sobre context para estado local de página.
- El data fetching siempre ocurre en el Server Component padre — los client components reciben props.

### Importaciones

- Alias `@/*` apunta a `web/src/`
- Layout: `import X from "@/components/layout/X"`
- Sections: `import X from "@/components/sections/X"`
- Views: `import X from "@/components/views/X"`
- UI: `import X from "@/components/ui/X"`
- Gallery: `import X from "@/components/gallery/X"`
- Lib: `import { fn } from "@/lib/archivo"`

---

## Sistema de Imágenes

- Usar `next/image` (`import Image from "next/image"`) para todas las imágenes de contenido.
- Fotos de viajes en `/public/photos/` — path: `/photos/nombre.jpg`
- `remotePatterns` en `next.config.ts` solo permite `picsum.photos` (desarrollo).
- Para imágenes en componentes grandes usar `fill` con `object-cover` en contenedor relativo.

---

## Convenciones de Código

- **Componentes:** PascalCase (`FichaViaje.tsx`)
- **Lib/utils:** kebab-case (`trips-data.ts`, `gallery-utils.ts`)
- **Páginas:** `page.tsx` (fijo por App Router)
- **Sub-componentes locales:** definir dentro del mismo archivo si son exclusivos de ese componente (no crear archivo separado).
- **`yet-another-react-lightbox`** está instalado en el proyecto como dependencia, pero la galería usa implementación propia con `GalleryModal` + `GallerySharedModal` + framer-motion. No mezclar las dos implementaciones.

---

## Convenciones de Git

- **Branches:** `feature/nombre-feature`
- **Commits:** `tipo: descripción en minúsculas` (ej: `feat:`, `fix:`, `docs:`, `refactor:`)
- **Merge:** `--no-ff` con mensaje `merge: feature/x → master`
- **Branch por defecto:** `master`

---

## Estado de Deploy

| Entorno    | Estado       | URL                                   |
| ---------- | ------------ | ------------------------------------- |
| Producción | ✅ Deployado | Vercel (URL definitiva pendiente)     |
| Dominio    | ⏳ Pendiente | `madnessexpeditions.com` — configurar |

**Variables de entorno requeridas en Vercel:**

- `NEXT_PUBLIC_SANITY_PROJECT_ID` = `6zqw6gnm`
- `NEXT_PUBLIC_SANITY_DATASET` = `production`

---

## Roadmap — Próximas Tareas

Estado actual: **En pausa — esperando feedback de Pablo** antes de continuar desarrollo.

### 🔧 Funcionalidad

| Tarea                                        | Estado       | Notas                                                                                                                                                  |
| -------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Formulario de contacto — backend real        | ⏳ Pendiente | Conectar a Resend u otro servicio de email. Hoy solo es UI, no envía nada.                                                                             |
| WhatsApp CTAs — mensajes por viaje           | ⏳ Pendiente | Verificar que los mensajes pre-cargados por slug estén bien configurados. Actualmente los mensajes están en `siteConfig.whatsappMessages` (genéricos). |
| Floating WhatsApp button — mobile vs desktop | ⏳ Pendiente | Revisar comportamiento y posicionamiento diferencial.                                                                                                  |

### 📈 SEO & Metadata

| Tarea                              | Estado       | Notas                                                                  |
| ---------------------------------- | ------------ | ---------------------------------------------------------------------- |
| Meta tags completos por página     | ⏳ Pendiente | `title` y `description` ya están en algunas páginas — completar todas. |
| Open Graph para redes sociales     | ⏳ Pendiente | Imágenes OG por página.                                                |
| Sitemap + robots.txt               | ⏳ Pendiente | `next-sitemap` o generación manual en App Router.                      |
| Structured data Schema.org (tours) | ⏳ Pendiente | JSON-LD para páginas de viajes.                                        |

### ⚡ Performance

| Tarea                      | Estado       | Notas                                                     |
| -------------------------- | ------------ | --------------------------------------------------------- |
| Optimización de imágenes   | ⏳ Pendiente | Auditar uso de `next/image`, formatos WebP, lazy loading. |
| Core Web Vitals (LCP, CLS) | ⏳ Pendiente | Medir y optimizar en páginas clave.                       |

### 🧪 Testing

| Tarea                                  | Estado       | Notas                                                                                                          |
| -------------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------- |
| Acceptance testing contra UX Scenarios | ⏳ Pendiente | Correr tests sobre las páginas ya buildeadas contra los criterios definidos en `_bmad-output/C-UX-Scenarios/`. |

### 📄 Páginas Pendientes

| Página                             | Estado       | Notas                                                                                                      |
| ---------------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------- |
| `/proximas-salidas`                | ⏳ Pendiente | Prototipo disponible en `_bmad-output/C-UX-Scenarios/02-martin-validacion-tecnica/02.1-proximas-salidas/`. |
| `/grandes-expediciones`            | ⏳ Pendiente | Prototipo disponible en `_bmad-output/C-UX-Scenarios/03-diego-grandes-expediciones/`.                      |
| Datos reales de guías en `/equipo` | ⏳ Pendiente | `GUIDES[]` en `EquipoPage.tsx` tiene datos ficticios.                                                      |

### 🚀 Deploy & Infraestructura

| Tarea                                       | Estado       | Notas                                       |
| ------------------------------------------- | ------------ | ------------------------------------------- |
| Configurar dominio `madnessexpeditions.com` | ⏳ Pendiente | Apuntar DNS a Vercel.                       |
| Variables de entorno Vercel                 | ⏳ Pendiente | Verificar que estén seteadas en producción. |

---

## Prototipado de Referencia

Todos los prototipos HTML aprobados están en:

```
_bmad-output/C-UX-Scenarios/
├── 01-valentina-primera-cumbre/
│   ├── 01.1-home/prototypes/
│   ├── 01.2-catalogo-de-viajes/prototypes/catalogo-prototype.html
│   └── 01.3-ficha-de-viaje/prototypes/
├── 02-martin-validacion-tecnica/
│   ├── 02.1-proximas-salidas/prototypes/proximas-salidas-prototype.html
│   ├── 02.2-sobre-nosotros/prototypes/sobre-nosotros-prototype.html
│   └── 02.3-como-trabajamos/prototypes/como-trabajamos-prototype.html
└── 03-diego-grandes-expediciones/
    └── 03.1-grandes-expediciones/prototypes/grandes-expediciones-prototype.html
```

**Flujo al implementar una nueva página:**

1. Leer el prototipo HTML de referencia.
2. Leer la guía de contenido: `design-artifacts/A-Product-Brief/02-content-language.md`
3. Leer la dirección visual: `design-artifacts/A-Product-Brief/03-visual-direction.md`
4. Implementar siguiendo el patrón de páginas (server component wrapper + client component si hay estado).
