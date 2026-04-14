# Madness Expeditions — Workspace de Diseño Digital

> Repositorio de trabajo para la construcción de la presencia digital de **Madness Expeditions** — operadora premium de expediciones de montaña con base en Mendoza, Argentina.

---

## ¿Qué es este repositorio?

Este repo es el **workspace de diseño end-to-end** del sitio web y la estrategia digital de Madness Expeditions. Contiene todos los artefactos del proceso de diseño: desde el brief estratégico inicial hasta los escenarios UX y especificaciones técnicas.

El proceso de diseño sigue el framework **WDS (Web Design System)** de BMad, que recorre las fases de discovery, estrategia, diseño UX y desarrollo.

---

## Estado del Proyecto

| Fase | Nombre | Estado |
|------|--------|--------|
| 1A | Product Brief | ✅ Completado |
| 1B | Contenido & Lenguaje | ✅ Completado |
| 1C | Dirección Visual | ✅ Completado |
| 1D | Plataforma & Tecnología | ✅ Completado |
| 2 | Trigger Mapping | ✅ Completado |
| 3 | UX Scenarios | 🔄 En progreso |
| 4 | UX Design (wireframes) | ⏳ Pendiente |
| 5 | Desarrollo | ⏳ Pendiente |

---

## Estructura del Repositorio

```
madness-marketing/
├── design-artifacts/          # Artefactos de diseño finales (fuente de verdad)
│   └── A-Product-Brief/
│       ├── 01-product-brief.md         — Estrategia, visión y posicionamiento
│       ├── 02-content-language.md      — Guía de contenido y voz de marca
│       ├── 03-visual-direction.md      — Dirección visual e identidad
│       └── 04-platform-requirements.md — Stack técnico e integraciones
│
├── _bmad-output/              # Artefactos de trabajo del proceso WDS
│   ├── B-Trigger-Map/         — Mapa de triggers, objetivos y personas
│   ├── C-UX-Scenarios/        — Escenarios UX por persona
│   │   ├── 01-valentina-primera-cumbre/
│   │   ├── 02-martin-validacion-tecnica/
│   │   └── 03-diego-grandes-expediciones/
│   ├── dialog/                — Artefactos intermedios de conversación de diseño
│   ├── planning-artifacts/    — Investigación de mercado y planificación
│   └── _progress/             — Log de diseño con estado del proyecto
│
├── _bmad/                     # Framework BMad (skills, configuración, agentes)
├── docs/                      — Documentación adicional
└── resources/                 — Recursos (email templates, imágenes, assets)
```

---

## Contexto del Negocio

**Madness Expeditions** es una empresa de expediciones de montaña fundada y liderada por Pablo Fortunato — montañista forjado en el Aconcagua, con un equipo de guías de élite con formación en las mejores escuelas del país.

**El problema que resuelve este proyecto:** La empresa opera 100% por boca en boca. No tiene web, no tiene presencia en Google ni en redes sociales. Este proyecto construye esa presencia digital con la web como eje central.

**Stack tecnológico decidido:**

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 14+ (App Router) |
| Styling | Tailwind CSS |
| CMS | Sanity (headless) |
| Hosting | Vercel |

---

## Cómo navegar los artefactos

### 1. Entender la estrategia
Empezá por el [Product Brief](design-artifacts/A-Product-Brief/01-product-brief.md) — es la fundación de todo el proyecto: visión, posicionamiento, usuarios objetivo y criterios de éxito.

### 2. Entender al usuario
Revisá las [personas del Trigger Map](_bmad-output/B-Trigger-Map/personas/) y el [mapa de insights clave](_bmad-output/B-Trigger-Map/05-key-insights.md).

**Persona de diseño primaria:** Valentina — la curiosa sin experiencia que quiere hacer su primera montaña pero no sabe por dónde empezar.

### 3. Entender el diseño UX
Explorá los [escenarios UX](_bmad-output/C-UX-Scenarios/00-ux-scenarios.md) — cada escenario traza el recorrido de una persona por el sitio web.

### 4. Ver el progreso
El [design log](_bmad-output/_progress/00-design-log.md) documenta el estado actualizado de cada fase y los próximos pasos.

---

## Configuración del Entorno

Este workspace usa el framework **BMad** con el módulo **WDS**. Para continuar el proceso de diseño en una nueva sesión:

1. Abrí el repo en VS Code
2. Tené GitHub Copilot activo en modo agente
3. Invocá el agente WDS apropiado según la fase en curso (ver design log)

No se requiere instalación de dependencias para trabajar con los artefactos de diseño — son archivos Markdown.

---

## Contacto del Proyecto

| Rol | Persona |
|-----|---------|
| Propietario / Product Owner | Pablo Fortunato |
| Diseño & Desarrollo | Irivadeneira |
