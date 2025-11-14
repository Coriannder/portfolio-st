# portfolio-st

Portfolio personal — Sebastián Taboada

Este repositorio contiene mi portfolio personal, construido con React y Vite. Presenta una selección de proyectos, una breve biografía, enlaces de contacto y la posibilidad de ver/descargar el CV.

Resumen

- **Autor:** Sebastián (Sebas) Taboada
- **Tecnologías:** React, Vite, Framer Motion, SCSS
- **Objetivo:** Mostrar proyectos, habilidades y facilitar el contacto profesional.

Instalación y ejecución

1. Instalar dependencias

```pwsh
npm install
```

2. Ejecutar en modo desarrollo

```pwsh
npm run dev
```

3. Generar build de producción

```pwsh
npm run build
```

4. Previsualizar la build

```pwsh
npm run preview
```

Estructura general del proyecto

- `src/` — código fuente de la aplicación
	- `components/` — componentes React (Header, About, Projects, etc.)
	- `assets/` — imágenes y recursos estáticos usados por la app
	- `json/` — pequeños ficheros JSON que sirven como datos para proyectos o textos
- `public/` — archivos estáticos expuestos (p. ej. `public/files/sebasdev-cv-2025.pdf`)

Notas importantes

- El botón "Ver CV" abre `public/files/sebasdev-cv-2025.pdf` en una nueva pestaña.
- La navegación entre secciones combina rutas y desplazamiento programático (scroll) para que los enlaces y las páginas de proyecto funcionen correctamente.

Contacto

- Email: contacto@sebasdev.com
- GitHub: https://github.com/Coriannder


