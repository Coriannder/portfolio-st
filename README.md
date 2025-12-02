# portfolio-st

Portfolio personal — Sebastián Taboada

Este repositorio contiene mi portfolio personal, construido con React y Vite. Presenta una selección de proyectos, una breve biografía, enlaces de contacto y la posibilidad de ver/descargar el CV.

## Resumen

- **Autor:** Sebastián (Sebas) Taboada
- **Stack principal:** React 18, Vite, Framer Motion, SCSS
- **Routing:** React Router DOM (SPA con scroll programático)
- **Objetivo:** Mostrar proyectos, habilidades y facilitar el contacto profesional.

## Features destacados

- **Carrusel de proyectos** con autoplay, navegación por swipe (touch), dots animados y transiciones fluidas.
- **Hooks custom** para el carrusel: `useAutoplay`, `useSwipe`, `useCarouselState`, `useIndicator`.
- **Detalle de proyecto** con documentación Markdown renderizada y tabla de contenidos (TOC) generada automáticamente.
- **Cursor animado** para usuarios con mouse (desactivado en dispositivos táctiles).
- **Navegación híbrida:** rutas + scroll programático para una experiencia fluida entre secciones.
- **Accesibilidad:** respeta `prefers-reduced-motion`, controles de teclado y focus visible.

## Instalación y ejecución

1. Instalar dependencias

```bash
npm install
```

2. Ejecutar en modo desarrollo

```bash
npm run dev
```

3. Generar build de producción

```bash
npm run build
```

4. Previsualizar la build

```bash
npm run preview
```

5. Ejecutar linter

```bash
npm run lint
```

## Estructura del proyecto

```
src/
├── components/          # Componentes React (Header, About, Projects, Contact, etc.)
│   └── Projects/
│       ├── Carousel/    # Carrusel con Card, Dots, CarouselButton
│       └── ProjectDetail/  # Vista detalle con Markdown
├── hooks/
│   └── carousel/        # Hooks custom: useAutoplay, useSwipe, useCarouselState, useIndicator
├── Context/             # CursorContext (cursor animado)
├── assets/              # Imágenes y recursos estáticos
├── json/                # Datos de proyectos y textos (about.json, newProject.json)
└── color.scss           # Variables de color y tokens de diseño

public/
├── files/               # CV en PDF
└── readmes/             # Documentación Markdown de cada proyecto
```

## Tecnologías y dependencias

| Categoría | Tecnología |
|-----------|------------|
| UI Framework | React 18 |
| Build Tool | Vite |
| Animaciones | Framer Motion |
| Estilos | SCSS/Sass |
| Routing | React Router DOM |
| Markdown | react-markdown |
| Scroll | react-scroll |
| Linting | ESLint |

## Notas importantes

- El botón "Ver CV" abre `public/files/sebasdev-cv-2025.pdf` en una nueva pestaña.
- La navegación entre secciones combina rutas y desplazamiento programático (scroll) para que los enlaces y las páginas de proyecto funcionen correctamente.
- Al volver desde el detalle de un proyecto, el carrusel muestra automáticamente ese proyecto como tarjeta central.

## Optimizaciones y Mejoras (v2.0)

Esta versión incluye una auditoría completa enfocada en la experiencia de usuario móvil y performance:

- **UX Móvil Nativa:** Reemplazo de eventos de mouse (`hover`) por `pointer events` y estados `:active` para una interacción táctil real y sin "hovers fantasma".
- **Performance:** Implementación de `React.lazy` y `Suspense` para carga diferida de componentes pesados, y limpieza de dependencias no utilizadas.
- **SEO:** Inclusión de meta etiquetas esenciales (Open Graph, Twitter Cards, descripción) para mejorar la visibilidad y el compartid.
- **Gestión de Assets:** Estrategia de "Zona Segura" para imágenes responsivas, asegurando que el contenido principal se vea bien tanto en tarjetas panorámicas de escritorio como en vistas móviles 16:9.

## Contacto

- **Email:** contacto@sebasdev.com
- **GitHub:** [github.com/Coriannder](https://github.com/Coriannder)


