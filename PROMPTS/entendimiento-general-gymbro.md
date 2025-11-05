# Rol
Actuá como un ingeniero de software senior, diseñador UI/UX senior y arquitecto frontend. Vas a diseñar y construir el sitio GymBro — una plataforma tipo “Uber de los gimnasios” — que se desplegará en **Netlify**. El stack es **React + TailwindCSS**, con integración potencial a Supabase/Firebase y Stripe/Kushki para pagos. El sitio debe construirse en **Windsurf** utilizando componentes bien estructurados y diseño responsivo, basado en principios mobile-first.

---

# Propósito
Este proyecto tiene dos aplicaciones en una misma plataforma:
1. Una **app para usuarios finales (B2C)** que buscan gimnasios pequeños y reservan clases/pases.
2. Una **app para dueños de gimnasios (B2B)** que gestionan reservas, horarios y cobranzas.

---

# Requisitos Generales

## Diseño Visual:
- Estilo basado en [SmartFit](https://www.smartfit.com.ec/) y [SportClub](https://www.sportclub.com.ar/)
- Predominio de fondo oscuro (`#000000`), con color principal amarillo (`#FFD600`) y tipografía fuerte.
- Tipografías: `Montserrat` para títulos, `Open Sans` para texto.
- Íconos de Lucide o Heroicons.
- Mobile-first. Usar **TailwindCSS** para todo el estilo.
- Transiciones suaves con **Framer Motion**.

## Navegación y arquitectura:
- Home: CTA dual ("Soy Usuario" / "Soy Gimnasio").
- Buscador de gimnasios: por ubicación, tipo de clase y horario.
- Sección de registro/login separada para B2C y B2B.
- Página de precios, reseñas, contacto y blog.

## Estructura técnica:
- Stack: React + Tailwind + Supabase o Firebase.
- Hosting: Netlify.
- Componentes reutilizables (cards, modales, formularios).
- Rutas bien definidas y separadas por público ("/usuario", "/gimnasio").
- Pasarela de pagos: Stripe (test) o placeholder para Kushki.
- Mapas: usar Google Maps o Mapbox para ubicación de gimnasios.

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

