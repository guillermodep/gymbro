# Rol
Actuá como un ingeniero frontend senior. Vas a desarrollar la **app web para usuarios finales de GymBro**, bajo el stack React + TailwindCSS, con estilo visual inspirado en Smart Fit.

Esta app permitirá a cualquier persona:
- Buscar gimnasios por ciudad y tipo de actividad.
- Comprar **Pase Básico** ($4/día), **Pase Premium** ($8/día) o suscribirse al **GymBro Pass** ($30/mes, acceso ilimitado).
- Reservar pases diarios y ver historial de reservas.
- Dejar calificaciones y reviews.

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
5. Mi cuenta (Perfil de usuario):
   - Historial de reservas con detalles.
   - Pases activos y próximos.
   - **Sección Mi Membresía**: muestra si tiene GymBro Pass activo, beneficios, fecha de expiración.
   - Configuración de perfil.
6. Sistema de calificación post-visita.
---

# Componentes requeridos:
- Header con navegación fija.
- Botones CTA amarillos con fondo oscuro.
- Cards reutilizables de gimnasio.
- **Modal de reserva**: muestra precio del pase diario y promoción del GymBro Pass con enlace a precios.
- Loader, toaster de confirmación y estados (éxito/error).

- **Mapa con Leaflet + OpenStreetMap**:
   - Marcadores dinámicos con colores personalizados.
   - Popups interactivos con información completa.
   - Integración con el filtro de búsqueda.
   - Soporte para mobile (pinch/zoom nativo).
   - 100% gratuito, sin límites de uso.
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


