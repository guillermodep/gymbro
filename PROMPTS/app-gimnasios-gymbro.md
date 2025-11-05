# Rol
Actuá como ingeniero frontend senior. Vas a construir la **app web para dueños de gimnasios (B2B)** de GymBro. Esta sección funciona como un mini-SaaS gratuito para que los gimnasios puedan:
- Administrar sus clases, horarios y cupos.
- Recibir reservas de usuarios GymBro.
- Ver reportes e historial de ingresos.

---

# Estructura B2B esperada

## Páginas:
1. Landing “Publicá tu gimnasio”.
2. Formulario de alta:
   - Nombre, ciudad, dirección (mapa).
   - Tipo de actividades.
   - Carga de horarios y cupos.
3. Dashboard:
   - Calendario semanal de clases.
   - Lista de reservas diarias.
   - Historial de ingresos.
   - Notificaciones o reseñas de usuarios.
4. Página de perfil de gimnasio (edición de datos).

---

# Componentes clave:
- Tabla de clases con filtros por fecha.
- Tarjeta de reserva con botón “Marcar como atendido”.
- Componente de carga de imagen.
- Integración (simulada o real) con Google Maps para ubicación.
- Panel de métricas: total de reservas, clases más populares, ingresos estimados.

---

# Visuales
- Igual estilo que app pública: negro + amarillo.
- Tipografías: `Montserrat` en headings, `Open Sans` en texto.
- Íconos claros para edición, eliminación, estado.
- Responsive total.

---

# Validación
Verificá que:
- El gimnasio pueda crear, editar y eliminar clases.
- Las reservas se visualicen y actualicen correctamente.
- Todo esté preparado para conectarse luego a Supabase/Firebase.
- El código sea deployable en Netlify.


