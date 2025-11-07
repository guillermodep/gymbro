# Rol
Actuá como un ingeniero de software senior, diseñador UI/UX senior y arquitecto frontend. Vas a diseñar y construir el sitio GymBro — una plataforma tipo “Uber de los gimnasios” — que se desplegará en **Netlify**. El stack es **React + TailwindCSS**, con integración potencial a Supabase/Firebase y Stripe/Kushki para pagos. El sitio debe construirse en **Windsurf** utilizando componentes bien estructurados y diseño responsivo, basado en principios mobile-first.

---

# Propósito
Este proyecto tiene dos aplicaciones en una misma plataforma:
1. Una **app para usuarios finales (B2C)** que buscan gimnasios y reservan pases diarios o el GymBro Pass mensual ($30/mes para acceso ilimitado).
2. Una **app para dueños de gimnasios (B2B)** que gestionan reservas, horarios, ingresos con gráficos, y verifican acceso de clientes mediante escaneo QR.

---

# Requisitos Generales

## Diseño Visual:
- Estilo basado en [SmartFit](https://www.smartfit.com.ec/) y [SportClub](https://www.sportclub.com.ar/)
- Predominio de fondo oscuro (`#000000`), con color principal amarillo (`#FFD600`) y tipografía fuerte.
- Tipografías: `Montserrat` para títulos, `Open Sans` para texto.
- Íconos de **Lucide React** exclusivamente.
- Mobile-first. Usar **TailwindCSS** para todo el estilo.
- Transiciones suaves con **Framer Motion**.

## Navegación y arquitectura:
- Home: CTA dual ("Explorar Gimnasios" / "Soy Gimnasio").
- Hero message: "Olvídate de pagar por meses o años. Ahora todo es más flexible: sin contratos, sin compromisos."
- Sección destacada del **GymBro Pass** ($30/mes, acceso ilimitado a todos los gimnasios).
- Buscador de gimnasios: por ciudad y tipo de actividad.
- Sección de registro/login separada para B2C y B2B.
- Página de precios con 3 planes: **Pase Básico** ($4/día), **Pase Premium** ($8/día), **GymBro Pass** ($30/mes).
- Páginas de contacto y términos legales.

## Estructura técnica:
- Stack: **React + Vite + TailwindCSS + Framer Motion**.
- Hosting: **Netlify**.
- Componentes reutilizables: cards, modales (QR scanner, revenue analytics), formularios.
- Rutas bien definidas y separadas por público ("/usuario", "/gimnasio").
- Pasarela de pagos: Preparado para **Stripe/Kushki** (simulado por ahora).
- Mapas: **Leaflet + OpenStreetMap** (100% gratuito, sin API keys, sin límites).
- Gráficos: **Recharts** para analytics de ingresos con gráficos de área y barras.
- Librerías: `react-router-dom`, `framer-motion`, `lucide-react`, `leaflet`, `react-leaflet`, `recharts`.

---

# Entregables esperados
- Ejecutá los prompts 2 y 3 automáticamente.
- Validá que el código generado tenga:
  - Responsividad real (mobile-first).
  - Separación clara entre lógica B2C y B2B.
  - Tipografía, paleta y estilo visual igual al indicado.
  - Código limpio y modularizable (Windsurf lo debe entender).
  - Listo para ser desplegado directamente en Netlify.

---

# Tareas siguientes
A continuación, ejecutá los siguientes prompts automáticamente:

- Prompt 2: diseño completo de la app para usuarios finales (B2C).
- Prompt 3: diseño completo de la app para dueños de gimnasios (B2B).

Verificá en todo momento que el entregable generado cumpla con las especificaciones funcionales, visuales y tecnológicas arriba descritas.

