# Rol
Actuá como un ingeniero frontend senior. Vas a desarrollar la **app web para usuarios finales de GymBro**, bajo el stack React + TailwindCSS, con estilo visual inspirado en Smart Fit.

Esta app permitirá a cualquier persona:
- Buscar gimnasios por zona, tipo de actividad y horario.
- Comprar pases diarios o mensuales.
- Reservar clases y dejar calificaciones.

---

# Estructura B2C esperada

## Páginas:
1. Home pública con CTA: “Explorar gimnasios”.
2. Página de exploración:
   - Filtro por ciudad, tipo de clase, horarios.
   - Vista tipo **grid** y **mapa con geolocalización** (Google Maps).
   - **Componente de mapa interactivo**:
     - Usa la ubicación del navegador para mostrar gimnasios cercanos.
     - Cada gimnasio aparece como marcador.
     - Al hacer clic: muestra tarjeta resumida con botón “Ver más” o “Reservar”.
     - Filtros aplican sobre el mapa y sobre el listado.
3. Página de gimnasio individual:
   - Fotos, descripción, clases disponibles, botón “Reservar”.
4. Registro/Login de usuario.
5. Mi cuenta:
   - Historial de reservas.
   - Pases activos.
   - Clases próximas.
6. Sistema de calificación post-visita.
---

# Componentes requeridos:
- Header con navegación fija.
- Botones CTA amarillos con fondo oscuro.
- Cards reutilizables de gimnasio.
- Modal de reserva con selector de fecha/hora.
- Loader, toaster de confirmación y estados (éxito/error).

- **Mapa con Google Maps Embed o API JS**:
   - Marcadores dinámicos.
   - Integración con el filtro de búsqueda.
   - Soporte para mobile (pinch/zoom).
   - Debe pedir permiso de ubicación al usuario.
---

# Especificaciones visuales:
- Colores: fondo `#000`, CTA `#FFD600`, texto blanco o `#F5F5F5`.
- Tipografía: `Montserrat` y `Open Sans`.
- Uso de íconos claros y animaciones con Framer Motion.
- Diseño mobile-first.

---

# Validación
Validá que:
- Todas las vistas funcionen bien en mobile y desktop.
- El sistema de reserva simulado sea navegable.
- La UI sea moderna y coherente con Smart Fit / SportClub.
- El código pueda desplegarse directamente en Netlify.


