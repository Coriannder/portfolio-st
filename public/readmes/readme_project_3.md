# 🎬 Charada Rental - Alquiler de Utilería Audiovisual

Charada Rental es una web para búsqueda y alquiler de utilería audiovisual: catálogo por categorías, visualizador tipo carrusel y formulario de contacto conectado a un backend.

### Puntos clave
- Implementé animaciones y transiciones accesibles con Framer Motion y coordinación entre rutas.
- Integré un formulario con backend para envío de correos (Nodemailer) y validación básica.
- Optimización de imágenes con Cloudinary: uso de transformaciones on‑the‑fly, compresión y entrega por CDN para mejorar performance en mobile/desktop.
- Diseño responsivo y optimización de assets para tiempos de carga más bajos.
- Capacidad para depurar y coordinar comportamiento complejo de UI (staggered animations, navegación con estado).
### ✨ Características Principales

- 🏠 **Página de inicio** con presentación del negocio y información corporativa
- 📦 **Catálogo de productos** organizado por categorías (Alfombras, Banquetas, Escritorios, Mesas, Muebles, Sillones, Sillas)
- 🖼️ **Visualizador de imágenes** tipo carrusel para ver productos en detalle
- 📧 **Formulario de contacto** integrado con backend para consultas y presupuestos
- 🎨 **Diseño responsivo** con Tailwind CSS
- ⚡ **Animaciones fluidas** con Framer Motion
- ☁️ **Gestión de imágenes** con Cloudinary
- 🔄 **Navegación SPA** con React Router
## Tecnologías principales
- **Frontend:** React, Vite, Tailwind CSS, Framer Motion, React Router
- **Backend (contacto):** Node.js, TypeScript, Express, Nodemailer
- **Imágenes / Optimización:** Cloudinary (transformaciones, compresión y CDN)

## Cómo probar (mínimo)
1. Instalar dependencias:
```bash
npm install
```
2. Iniciar en desarrollo:
```bash
npm run dev
```
3. (Opcional) Backend de contacto en `charada-back/`:
```bash
cd charada-back
npm install
npm run dev
```

## Variables de entorno (mínimas)
- `VITE_URL_SERVER` — URL base del endpoint de contacto (ej. `http://localhost:8080/contact`)
- `USER_MAILADMIN`, `PASS_MAILADMIN` — credenciales SMTP para envío de correos (backend)

## Endpoint clave
- `POST /contact` — recibe `{ name, email, phone, message }` y reenvía el mensaje por e‑mail mediante Nodemailer.

## Despliegue
- El backend está desplegado en Render. Para ver la instancia y el panel de despliegue accedé a: https://dashboard.render.com/login
- La URL pública del servicio debe configurarse en `VITE_URL_SERVER` en el frontend (ej. `https://tu-backend.onrender.com/contact`).

## Autor / Contacto
- Sebastián Taboada — @Coriannder

---

Si querés la versión completa (para desarrolladores) la dejo en otro archivo o en una rama separada.
