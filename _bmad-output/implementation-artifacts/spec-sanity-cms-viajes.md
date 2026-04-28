---
title: "Integración Sanity CMS para datos de viajes"
type: "feature"
created: "2026-04-27"
status: "in-review"
baseline_commit: "3c1b8665bde845e24c4934ae3c11b2773ed75a87"
context:
  - "_bmad-output/project-context.md"
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Los datos de viajes están hardcodeados en tres archivos distintos (`trips-data.ts`, `CatalogoViajes.tsx`, `FeaturedTrips.tsx`), lo que hace imposible actualizar viajes, fechas o cupos sin modificar código y hacer deploy.

**Approach:** Integrar Sanity como CMS headless embebido en el mismo proyecto Next.js. El schema de Sanity modela el tipo `Trip` existente. Las queries GROQ reemplazan los arrays hardcodeados. `CatalogoViajes` pasa a recibir trips como props desde el server component padre. Se migran los 3 viajes actuales a Sanity Studio.

## Boundaries & Constraints

**Always:**

- Project ID Sanity: `6zqw6gnm`, dataset: `production`
- Mantener todos los tipos TypeScript existentes (`Trip`, `TripDate`, `ItineraryDay`, `TripTestimonial`) en `trips-data.ts`; solo eliminar los arrays hardcodeados
- Sanity Studio embebido en `/studio` — protegido solo en producción con `isDraftModeEnabled` check (para este proyecto sin auth compleja, solo evitar indexación)
- `CatalogoViajes` sigue siendo `"use client"` (usa `useState` para filtros); recibe `trips: Trip[]` como prop
- `FeaturedTrips` pasa a Server Component async — fetch directo a Sanity
- Revalidación ISR: `revalidate = 3600` (1 hora) en las queries de servidor
- Variables de entorno con prefijo `NEXT_PUBLIC_` para project ID y dataset (son públicas por diseño de Sanity)
- Agregar `cardNote?: string` al schema Sanity y al tipo `Trip` — nota editorial por viaje que se muestra en la card (ej. "4 cumbres · Vacaciones invierno")

**Ask First:**

- Si se necesita un Sanity API Token para queries autenticadas (solo necesario para draft content — para contenido publicado, las queries anónimas alcanzan)

**Never:**

- Sanity Image CDN por ahora — las imágenes siguen en `public/photos/`; el campo en Sanity es un `string` (path relativo)
- Webhooks de revalidación on-demand (scope de una futura iteración)
- Autenticación del Studio más allá de no-indexación

</frozen-after-approval>

## Code Map

- `web/src/lib/trips-data.ts` — tipos `Trip` + exports async `getAllTrips()` / `getTripBySlug(slug)` via Sanity
- `web/src/sanity/schemas/trip.ts` — document schema de Sanity que modela `Trip`
- `web/src/sanity/schemas/index.ts` — barrel export de schemas
- `web/src/sanity/lib/client.ts` — `createClient` de `next-sanity`
- `web/src/sanity/lib/queries.ts` — queries GROQ tipadas
- `web/sanity.config.ts` — config del Studio (project ID, dataset, schemas)
- `web/sanity.cli.ts` — config CLI de Sanity
- `web/src/app/studio/[[...tool]]/page.tsx` — ruta del Studio embebido
- `web/src/app/viajes/page.tsx` — Server Component: fetch trips → pasa a `CatalogoViajes`
- `web/src/app/viajes/[slug]/page.tsx` — usa `getTripBySlug` async + `getAllTrips` para `generateStaticParams`
- `web/src/components/views/CatalogoViajes.tsx` — recibe `trips: Trip[]` como prop; elimina `ALL_TRIPS` hardcodeado
- `web/src/components/sections/FeaturedTrips.tsx` — Server Component async; fetch 3 viajes desde Sanity; elimina `FEATURED_TRIPS` hardcodeado
- `web/.env.local` — `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`

## Tasks & Acceptance

**Execution:**

- [x] `web/` — instalar dependencias: `npm install next-sanity @sanity/image-url` y `npm install --save-dev sanity`
- [x] `web/.env.local` — agregar `NEXT_PUBLIC_SANITY_PROJECT_ID=6zqw6gnm` y `NEXT_PUBLIC_SANITY_DATASET=production`
- [x] `web/sanity.cli.ts` — crear config CLI mínima con project ID y dataset
- [x] `web/src/sanity/schemas/trip.ts` — definir document type `trip` con todos los campos del tipo `Trip` (incluye arrays de objetos para `dates`, `itinerary`, `testimonials`) y `cardNote` opcional
- [x] `web/src/sanity/schemas/index.ts` — exportar array de schemas
- [x] `web/src/sanity/lib/client.ts` — crear cliente Sanity con `next-sanity`; configurar `revalidate = 3600`
- [x] `web/src/sanity/lib/queries.ts` — GROQ: `ALL_TRIPS_QUERY` (todos los campos) y `TRIP_BY_SLUG_QUERY`
- [x] `web/sanity.config.ts` — config Studio con project ID, dataset, plugins `structureTool()`, schemas
- [x] `web/src/app/studio/[[...tool]]/page.tsx` — ruta embebida del Studio con `NextStudio`
- [x] `web/src/lib/trips-data.ts` — mantener tipos; reemplazar `TRIPS` y `getTripBySlug` por `getAllTrips()` y `getTripBySlug(slug)` async usando el cliente Sanity; agregar `cardNote?: string` al tipo `Trip`
- [x] `web/src/app/viajes/page.tsx` — convertir a async Server Component; llamar `getAllTrips()`; pasar resultado como prop a `CatalogoViajes`
- [x] `web/src/app/viajes/[slug]/page.tsx` — `generateStaticParams` usa `getAllTrips()`; `generateMetadata` y page usan `getTripBySlug(slug)` async
- [x] `web/src/components/views/CatalogoViajes.tsx` — agregar prop `trips: Trip[]`; eliminar `ALL_TRIPS`; derivar `zone` de `trip.region`, `duration` de `${trip.days} días`, `note` de `trip.cardNote ?? primerFechaDisponible`
- [x] `web/src/components/sections/FeaturedTrips.tsx` — convertir a async Server Component; llamar `getAllTrips()`; tomar primeros 3; eliminar `FEATURED_TRIPS`; derivar props de card igual que CatalogoViajes

**Acceptance Criteria:**

- Given la app corriendo localmente, when se navega a `/studio`, then se muestra el Sanity Studio embebido sin errores
- Given el Studio abierto, when se crea un documento de tipo `trip`, then todos los campos del schema están disponibles y guardan correctamente
- Given los 3 viajes migrados en Sanity, when se navega a `/viajes`, then se listan los 3 viajes con los datos de Sanity (no del archivo TS)
- Given los 3 viajes migrados, when se navega a `/viajes/cordon-del-plata-iniciacion`, then se muestra la ficha con datos de Sanity
- Given que se elimina o modifica un campo en Sanity Studio, when se espera la revalidación (o se fuerza un rebuild), then el cambio se refleja en el sitio
- Given `CatalogoViajes`, when se filtra por nivel, then solo muestra los viajes del nivel seleccionado (comportamiento idéntico al actual)

## Design Notes

**Derivación de campos de card en CatalogoViajes/FeaturedTrips:**

```ts
// zone → region del trip
zone: trip.region,
// duration → de days
duration: `${trip.days} días`,
// note → cardNote del CMS o primera fecha disponible o "Próximamente"
note: trip.cardNote
    ?? trip.dates.find(d => d.spots !== "completo")?.date
    ?? "Próximamente",
```

**GROQ query base:**

```groq
*[_type == "trip"] | order(_createdAt asc) {
  slug, name, location, region, altitude, altitudeValue,
  days, maxPersons, level, difficulty, imageSrc, images,
  description, includes, notIncludes, itinerary, dates, testimonials,
  cardNote
}
```

## Verification

**Commands:**

- `cd web && npm run build` — expected: compilación sin errores TypeScript
- `cd web && npm run dev` — expected: `/viajes` y `/viajes/[slug]` cargan datos; `/studio` muestra el Studio
