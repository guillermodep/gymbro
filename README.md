# GymBro 🏋️

Plataforma tipo "Uber de gimnasios" que conecta usuarios con gimnasios pequeños para reservar clases y pases.

## 🚀 Stack Tecnológico

- **Frontend**: React 18 + Vite
- **Estilos**: TailwindCSS
- **Animaciones**: Framer Motion
- **Íconos**: Lucide React
- **Mapas**: Google Maps API
- **Rutas**: React Router DOM
- **Hosting**: Netlify

## 🎨 Diseño

- **Paleta de colores**:
  - Fondo oscuro: `#000000`
  - Color principal: `#FFD600` (amarillo)
  - Texto: `#F5F5F5`
- **Tipografías**:
  - Títulos: Montserrat
  - Texto: Open Sans

## 📦 Instalación

```bash
npm install
```

## 🏃 Desarrollo

```bash
npm run dev
```

El sitio estará disponible en `http://localhost:3000`

## 🏗️ Build

```bash
npm run build
```

## 🌐 Deploy en Netlify

1. Conecta tu repositorio con Netlify
2. Netlify detectará automáticamente la configuración desde `netlify.toml`
3. El build se ejecutará automáticamente

## 📱 Estructura

- `/usuario` - App B2C para usuarios finales
- `/gimnasio` - App B2B para dueños de gimnasios

## 🔑 Variables de Entorno

Crea un archivo `.env` con:

```
VITE_GOOGLE_MAPS_API_KEY=tu_api_key_aqui
```

## 📄 Licencia

MIT
