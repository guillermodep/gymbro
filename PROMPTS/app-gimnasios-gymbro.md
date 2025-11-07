# Rol
Actuá como ingeniero frontend senior. Vas a construir la **app web para dueños de gimnasios (B2B)** de GymBro. Esta sección funciona como un mini-SaaS gratuito para que los gimnasios puedan:
- Administrar sus clases, horarios y cupos.
- Recibir y gestionar reservas de usuarios GymBro.
- **Ver reportes detallados de ingresos** con gráficos interactivos (Recharts).
- **Verificar acceso de clientes** mediante escaneo QR simulado.

---

# Estructura B2B esperada

## Páginas:
1. Landing “Publicá tu gimnasio”.
2. Formulario de alta:
   - Nombre, ciudad, dirección (mapa).
   - Tipo de actividades.
   - Carga de horarios y cupos.
3. Dashboard:
   - **Botón QR prominente** en amarillo para escanear códigos de clientes.
   - Tarjetas de métricas: Reservas Hoy, **Ingresos del Mes (clickeable)**, Ocupación, Calificación.
   - Lista de reservas diarias con estado (completado/pendiente).
   - Clases de hoy con capacidad y progreso visual.
   - **Modal de Ingresos**: gráficos de área y barras con Recharts, desglose diario, total mensual.
   - **Modal QR Scanner**: simula escaneo, muestra datos del cliente, membresía, mensaje de bienvenida.
4. Página de perfil de gimnasio (edición de datos).

---

# Componentes clave:
- **QRScannerModal**: Modal con animación de escaneo, muestra foto del cliente, datos de membresía (GymBro Pass/Pase Diario), última visita, total visitas, mensaje de bienvenida personalizado.
- **RevenueModal**: Modal con gráficos de Recharts (área y barras), estadísticas (total, promedio, mejor día), tabla de desglose diario con 30 días de datos, botón exportar.
- Tarjetas de métricas clickeables (especialmente Ingresos del Mes).
- Tabla de clases con filtros por fecha.
- Tarjeta de reserva con botón "Marcar como atendido".
- Componente de carga de imagen.
- Panel de métricas con datos en tiempo real.

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


