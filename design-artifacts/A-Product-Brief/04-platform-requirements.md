# Plataforma & Tecnología: Madness Expeditions

> Requisitos Técnicos y Decisiones de Plataforma

**Creado:** 2026-04-07
**Autor:** Irivadeneira
**Relacionado:** [Product Brief](./01-product-brief.md) | [Contenido & Lenguaje](./02-content-language.md) | [Dirección Visual](./03-visual-direction.md)

---

## Stack Tecnológico

| Capa | Tecnología | Decisión | Rationale |
|---|---|---|---|
| **Framework** | Next.js 14+ (App Router) | ✅ Decidido | SSG/ISR para SEO óptimo en páginas de destinos; conocimiento previo del desarrollador; ecosistema React |
| **Styling** | Tailwind CSS | ✅ Decidido | Desarrollo mobile-first rápido, utilidades consistentes, sin overhead de CSS custom innecesario |
| **CMS (Headless)** | Sanity | ✅ Decidido | Pablo puede actualizar contenido (viajes, fechas, fotos) desde panel web sin tocar código; plan gratuito suficiente para fase 1 |
| **Hosting** | Vercel | ✅ Decidido | Integración nativa con Next.js, deployment automático desde git, CDN global, tier gratuito suficiente para tráfico inicial |
| **Optimización de imágenes** | next/image | ✅ Incluido | Conversión automática a WebP, lazy loading, responsive — crítico para web con archivo fotográfico pesado |
| **Internacionalización** | Next.js i18n nativo | Fase 2 | App Router soporta i18n sin librerías externas; inglés se agrega sin cambiar arquitectura |

### Rendering Strategy
- **Páginas estáticas (SSG):** Home, páginas de destinos, Nosotros, Galería, Contacto — generadas en build time, máxima velocidad y SEO
- **ISR (Incremental Static Regeneration):** Próximas salidas — revalidación periódica para reflejar cambios de Sanity sin rebuild completo
- **Caché:** Las páginas tienen fallback estático ante fallas del servicio de Sanity

---

## Package Stack

| Paquete | Propósito |
|---|---|
| `next` | Framework principal |
| `tailwindcss` | Styling utility-first |
| `@sanity/client` | Conexión con Sanity CMS |
| `next-sanity` | Integración oficial Sanity + Next.js |
| `next/image` | Optimización de imágenes (incluido en Next.js) |
| `react-icons` | Iconografía (montañismo, WhatsApp, redes sociales) |
| `@vercel/analytics` | Analytics lightweight alternativo o complemento de GA4 |

---

## Integraciones

### Críticas — Lanzamiento Día 1

#### Google Analytics 4
- **Propósito:** Medir tráfico web — criterio de éxito principal del proyecto
- **Implementación:** Script en `layout.tsx` via `next/script`
- **Owner:** Irivadeneira (cuenta de Pablo como propietario)
- **Qué medir:** Sesiones, páginas más visitadas, fuente de tráfico, tasa de rebote por página

#### WhatsApp Business — Botón Flotante
- **Propósito:** CTA principal de toda la web — el canal de ventas
- **Número:** +54 9 11 3269-3505 (Pablo Fortunato)
- **Implementación:** Componente flotante en esquina inferior derecha, visible en todas las páginas
- **Link:** `https://wa.me/5491132693505?text=Hola%20Pablo%2C%20quiero%20consultar%20sobre%20un%20viaje`
- **Pre-mensaje sugerido:** "Hola Pablo, quiero consultar sobre un viaje"

#### Google Business Profile
- **Propósito:** Aparecer en Google Maps + acumular reseñas — factor confianza #1
- **Acción:** Registrar **antes del lanzamiento** o simultáneamente
- **Owner:** Pablo Fortunato
- **Categoría:** Operadora de turismo de aventura / Guía de montaña
- **Importante:** Vincular el dominio madnessexpeditions.com una vez registrado

### Alta Prioridad — Primeras Semanas

#### Google Reviews Widget
- **Propósito:** Mostrar reseñas reales en la home — prueba social
- **Implementación:** Consumir API de Google Places o embed directo
- **Prerequisito:** Google Business Profile activo con al menos 5 reseñas

#### Email Marketing — Brevo (ex Sendinblue)
- **Propósito:** Reemplazar el envío manual de Word + emails de Pablo por comunicaciones profesionales
- **Razón sobre Mailchimp:** Plan gratuito más generoso (300 emails/día, contactos ilimitados)
- **Flujo:** Formulario web → contacto en lista Brevo → Pablo envía campañas visuales desde Brevo
- **Beneficio inmediato:** Los correos que Pablo ya manda con info de viajes se convierten en emails con diseño, fotos y links a la web
- **Owner:** Pablo (gestión de campañas) + Irivadeneira (setup técnico inicial)

### Media Prioridad — Fase 1 Post-Lanzamiento

#### Instagram Feed Embed
- **Propósito:** Mostrar actividad reciente de @madnessexpeditions en la web
- **Implementación:** Instagram Basic Display API o servicio como `react-instagram-embed`
- **Consideración:** La API de Instagram tiene restricciones — evaluar solución al momento de implementar

#### ANSILTA & PAX ASSISTANCE — Badges
- **Propósito:** Credibilidad — indicar que los seguros están gestionados por empresas reconocidas
- **Implementación:** Logos/badges en footer y página de Nosotros
- **Acción:** Solicitar logos oficiales a las aseguradoras

---

## Estrategia de Contacto

### Canales Habilitados

| Canal | Propósito | CTA en web |
|---|---|---|
| **WhatsApp** | Consulta rápida, respuesta inmediata | Botón flotante + CTA en páginas de viaje |
| **Email** | Información detallada, seguimiento formal | Formulario de contacto + mailto link |

### Formulario de Contacto
- **Campos:** Nombre · Email · Mensaje (+ campo "¿Qué viaje te interesa?" opcional)
- **Destino del envío:** Email a themadnessexpeditions@gmail.com
- **Integración extra:** Contacto también ingresa a lista de Brevo automáticamente
- **Sin captcha agresivo** — experiencia fluida, spam filtrado a nivel servidor
- **Email de confirmación automática** al visitante (via Brevo) confirmando que Pablo recibió la consulta

### Flujo Completo de Contacto
```
Visitante interesado
    ↓
[WhatsApp] → Consulta rápida → Pablo responde → Cierre / más info por email
[Formulario] → Email a Pablo + contacto en lista Brevo → Pablo responde con detalle
    ↓
Reserva confirmada → Transferencia bancaria
```

### Emails Corporativos (Recomendación)
| Situación actual | Recomendación |
|---|---|
| pabloflater@hotmail.com | Mantener para uso personal |
| themadnessexpeditions@gmail.com | Usar como email oficial por ahora |
| — | A futuro: info@madnessexpeditions.com (una vez registrado el dominio) |

---

## Restricciones UX Técnicas

| Restricción | Impacto en diseño |
|---|---|
| Mobile-first obligatorio | Diseñar primero para viewport 375px (iPhone SE) |
| Imágenes pesadas (fotos de expedición) | next/image obligatorio en todas las imágenes — no img tags directas |
| Presupuesto ajustado fase 1 | Sin librerías de animación complejas (Framer Motion es opcional, solo si es necesario) |
| Vercel free tier | Sin Edge Functions complejas en fase 1, deployment simple |
| Sanity free tier | 10GB assets — organizar fotos eficientemente, comprimir antes de subir |
| WhatsApp botón flotante | Siempre visible — no esconder detrás de menús ni popups |

---

## Requisitos Multilingüe

| Idioma | Estado | Cobertura | Implementación |
|---|---|---|---|
| **Español** | Fase 1 — activo | 100% | Idioma base del proyecto |
| **Inglés** | Fase 2 — planificado | Páginas clave | Next.js App Router i18n nativo — sin cambios de arquitectura |

**Slugs en español:** Las URLs se definen en español para fase 1 (`/expediciones/kilimanjaro`). Para inglés se agregarán rutas `/en/` paralelas.

---

## SEO Técnico

| Requisito | Implementación |
|---|---|
| **Meta tags dinámicos** | `generateMetadata()` en cada página de Next.js |
| **Sitemap.xml** | `next-sitemap` o generado en `app/sitemap.ts` |
| **robots.txt** | Configurado en `app/robots.ts` |
| **Open Graph** | Tags para compartir en redes sociales (imagen + título + descripción) |
| **Schema.org** | `TouristAttraction`, `LocalBusiness`, `Event` para salidas — mejora rankings |
| **Core Web Vitals** | next/image + fuentes optimizadas + ISR = LCP/CLS óptimos |
| **Google Search Console** | Vincular al dominio en el día del lanzamiento |

---

## Dominio y Registro

| Acción | Prioridad | Estado |
|---|---|---|
| Registrar **madnessexpeditions.com** | 🔴 URGENTE | Disponible — registrar antes de iniciar desarrollo |
| Configurar DNS en Vercel | Al tener dominio | — |
| Email corporativo info@madnessexpeditions.com | Fase 2 | Depende del dominio registrado |
| Google Business Profile | 🔴 Crítico | Registrar simultáneamente con el dominio |

---

## Mantenimiento y Ownership

| Tipo de mantenimiento | Responsable | Frecuencia |
|---|---|---|
| Actualización de próximas salidas | Pablo (vía Sanity) | Inicio de cada temporada |
| Subida de fotos de expediciones | Pablo (vía Sanity) | Post cada viaje |
| Envío de email campaigns | Pablo (vía Brevo) | Según calendario de viajes |
| Updates de Next.js / dependencias | Irivadeneira | Trimestral o ante vulnerabilidades |
| Deployment de cambios de diseño | Irivadeneira | Según necesidad |
| Monitoreo de Google Analytics | Irivadeneira + Pablo | Mensual |
| Reseñas de Google (solicitar a clientes) | Pablo | Post cada viaje |

---

## Notas de Desarrollo

### Setup inicial recomendado
```bash
npx create-next-app@latest madness-expeditions --typescript --tailwind --app
```

### Variables de entorno necesarias
```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
CONTACT_FORM_EMAIL=themadnessexpeditions@gmail.com
BREVO_API_KEY=
```

### Estructura de carpetas sugerida
```
app/
  (site)/
    page.tsx                    → Home
    expediciones/
      nacionales/page.tsx
      [provincia]/page.tsx      → Mendoza, San Juan, etc.
      internacionales/page.tsx
      [destino]/page.tsx        → Kilimanjaro, Everest, etc.
    cursos/page.tsx
    nosotros/page.tsx
    galeria/page.tsx
    contacto/page.tsx
  layout.tsx
components/
  ui/                           → Botones, cards, badges
  layout/                       → Header, Footer, WhatsAppButton
  sections/                     → ProximasSalidas, Reviews, Hero
sanity/
  schemas/                      → viaje.ts, destino.ts, guia.ts
```

---

**Estado:** Plataforma & Tecnología Completo ✅
**Próxima Fase:** Cierre Fase 1 → Fase 2: Trigger Mapping
**Última Actualización:** 2026-04-07
