# 📋 Pendientes - GymBro

Este documento organiza las funcionalidades pendientes para completar el MVP y las fases posteriores del proyecto GymBro.

---

## ✅ **COMPLETADO**

### Funcionalidades Implementadas:
- ✅ Diseño completo UI/UX (dark theme + amarillo)
- ✅ Estructura de precios: Pase Básico ($4), Pase Premium ($8), GymBro Pass ($30)
- ✅ Mapa interactivo con Leaflet + OpenStreetMap (100% gratuito)
- ✅ 16 gimnasios con datos variados (incluyendo McKenzies Fitness Studio)
- ✅ Dashboard B2B con métricas
- ✅ QR Scanner para verificar acceso de clientes
- ✅ Analytics de ingresos con Recharts (gráficos de área y barras)
- ✅ Modal de reserva con promoción de GymBro Pass
- ✅ Perfil de usuario con sección "Mi Membresía"
- ✅ Todas las páginas B2C y B2B
- ✅ Responsive y mobile-first
- ✅ Animaciones con Framer Motion
- ✅ Listo para deploy en Netlify

---

## 🚀 **FASE 1 - MVP FUNCIONAL (Crítico)**

### 1. Backend con Supabase ⭐⭐⭐
**Prioridad: ALTA**

- [ ] Configurar proyecto en Supabase
- [ ] Crear esquema de base de datos:
  - Tabla `users` (usuarios B2C)
  - Tabla `gyms` (gimnasios B2B)
  - Tabla `bookings` (reservas)
  - Tabla `memberships` (GymBro Pass)
  - Tabla `reviews` (calificaciones)
- [ ] Configurar autenticación:
  - Email/Password
  - OAuth (Google, Facebook)
  - Separar roles B2C/B2B
- [ ] Migrar mock data a Supabase
- [ ] Implementar queries y mutations
- [ ] Manejo de estados de carga y errores

**Estimación:** 2-3 días

---

### 2. Sistema de Pagos (Stripe) ⭐⭐⭐
**Prioridad: ALTA**

- [ ] Crear cuenta Stripe (modo test)
- [ ] Instalar `@stripe/stripe-js` y `@stripe/react-stripe-js`
- [ ] Configurar Stripe Checkout:
  - Pase Básico ($4/día)
  - Pase Premium ($8/día)
  - GymBro Pass ($30/mes - suscripción recurrente)
- [ ] Implementar webhooks para confirmación de pago
- [ ] Guardar transacciones en Supabase
- [ ] Página de confirmación de pago
- [ ] Manejo de errores de pago
- [ ] (Opcional) Preparar placeholder para Kushki

**Estimación:** 2-3 días

---

### 3. Geolocalización del Usuario ⭐⭐
**Prioridad: MEDIA-ALTA**

- [ ] Implementar `navigator.geolocation.getCurrentPosition()`
- [ ] Pedir permiso de ubicación al usuario
- [ ] Calcular distancia entre usuario y gimnasios
- [ ] Agregar filtro "Cerca de mí" (radio: 1km, 5km, 10km)
- [ ] Ordenar gimnasios por distancia
- [ ] Centrar mapa en ubicación del usuario
- [ ] Mostrar marcador de ubicación actual en el mapa
- [ ] Manejo de errores (permiso denegado, ubicación no disponible)

**Estimación:** 1 día

---

### 4. Sistema de Notificaciones ⭐⭐
**Prioridad: MEDIA**

- [ ] Instalar librería de toasts (react-hot-toast o sonner)
- [ ] Implementar notificaciones:
  - ✅ Reserva confirmada
  - ✅ Pago exitoso
  - ❌ Error en reserva
  - ❌ Error en pago
  - ℹ️ Información general
- [ ] Configurar emails con Supabase:
  - Confirmación de reserva
  - Confirmación de pago
  - Recordatorio de clase (24h antes)
  - Bienvenida al registrarse
- [ ] Notificaciones push (opcional, PWA)

**Estimación:** 1-2 días

---

## 📈 **FASE 2 - FUNCIONALIDADES CORE**

### 5. Gestión de Clases Funcional (B2B) ⭐⭐
**Prioridad: MEDIA**

- [ ] Formulario crear clase:
  - Nombre, descripción
  - Horario (día, hora inicio, hora fin)
  - Capacidad máxima
  - Actividad/tipo
- [ ] Editar clase existente
- [ ] Eliminar clase (con confirmación)
- [ ] Calendario semanal interactivo
- [ ] Gestión de cupos en tiempo real
- [ ] Validaciones (no sobreponer horarios, etc.)
- [ ] Guardar en Supabase

**Estimación:** 2 días

---

### 6. Sistema de Calificaciones Completo ⭐
**Prioridad: MEDIA**

- [ ] Formulario de calificación post-visita:
  - Rating (1-5 estrellas)
  - Comentario opcional
  - Aspectos específicos (limpieza, equipamiento, atención)
- [ ] Guardar reviews en Supabase
- [ ] Calcular y actualizar promedio de rating
- [ ] Mostrar reviews en página de gimnasio
- [ ] Validar que solo usuarios con reservas completadas puedan calificar
- [ ] Prevenir calificaciones duplicadas

**Estimación:** 1-2 días

---

### 7. Búsqueda Avanzada ⭐
**Prioridad: BAJA-MEDIA**

- [ ] Filtro por horario:
  - Mañana (6:00-12:00)
  - Tarde (12:00-18:00)
  - Noche (18:00-23:00)
- [ ] Filtro por rango de precio ($4-$12)
- [ ] Ordenar resultados:
  - Por distancia
  - Por rating
  - Por precio (menor a mayor)
  - Por popularidad
- [ ] Guardar preferencias de búsqueda

**Estimación:** 1 día

---

### 8. Reportes Avanzados para Gimnasios (B2B) ⭐
**Prioridad: MEDIA**

- [ ] Expandir modal de ingresos:
  - Comparación mes actual vs. anterior
  - Proyección de ingresos
  - Ingresos por tipo de pase
- [ ] Reporte de ocupación:
  - Horarios más populares
  - Días con más afluencia
  - Tendencias semanales/mensuales
- [ ] Reporte de clases:
  - Clases más populares
  - Clases con baja asistencia
  - Sugerencias de optimización
- [ ] Exportar reportes:
  - PDF
  - CSV/Excel
  - Enviar por email

**Estimación:** 2 días

---

## 🎨 **FASE 3 - PULIDO Y OPTIMIZACIÓN**

### 9. Contenido y Páginas Adicionales ⭐
**Prioridad: BAJA**

- [ ] Blog:
  - Sistema de posts
  - Categorías (fitness, nutrición, tips)
  - 5-10 posts iniciales
- [ ] FAQ detallado
- [ ] Página "Sobre Nosotros"
- [ ] Testimonios de usuarios

**Estimación:** 2-3 días

---

### 10. Términos Legales ⭐⭐
**Prioridad: MEDIA** (importante antes de lanzar)

- [ ] Términos y Condiciones
- [ ] Política de Privacidad
- [ ] Política de Cookies
- [ ] Aviso Legal
- [ ] Modal de aceptación de cookies
- [ ] Checkbox de aceptación en registro

**Estimación:** 1 día (con ayuda de templates legales)

---

### 11. SEO y Analytics ⭐⭐
**Prioridad: MEDIA**

- [ ] Meta tags en todas las páginas:
  - Title
  - Description
  - Keywords
  - Open Graph (Facebook)
  - Twitter Cards
- [ ] Sitemap.xml
- [ ] Robots.txt
- [ ] Google Analytics 4
- [ ] Google Search Console
- [ ] Schema.org markup (LocalBusiness)
- [ ] Optimización de imágenes (lazy loading, WebP)

**Estimación:** 1-2 días

---

### 12. Tests Automatizados ⭐
**Prioridad: BAJA-MEDIA**

- [ ] Configurar Vitest para unit tests
- [ ] Tests de componentes:
  - GymCard
  - BookingModal
  - QRScannerModal
  - RevenueModal
- [ ] Tests de utilidades
- [ ] Configurar Playwright para E2E tests:
  - Flujo de reserva completo
  - Flujo de pago
  - Login/Registro
- [ ] CI/CD con GitHub Actions

**Estimación:** 3-4 días

---

## 🔮 **FASE 4 - FEATURES AVANZADOS (Futuro)**

### Funcionalidades Opcionales:

- [ ] **PWA (Progressive Web App)**
  - Service Workers
  - Instalable en móvil
  - Funcionalidad offline básica
  - Notificaciones push

- [ ] **Chat en vivo**
  - Soporte al cliente
  - Chat entre usuario y gimnasio

- [ ] **Sistema de Referidos**
  - Código de referido
  - Descuentos por referir amigos

- [ ] **Programa de Fidelidad**
  - Puntos por visitas
  - Recompensas y descuentos

- [ ] **Integración con Wearables**
  - Sincronización con Apple Health
  - Sincronización con Google Fit

- [ ] **Clases Virtuales**
  - Streaming en vivo
  - Clases grabadas on-demand

---

## 📊 **MÉTRICAS DE ÉXITO**

### KPIs a medir una vez lanzado:

- **Usuarios:**
  - Registros B2C
  - Registros B2B (gimnasios)
  - Tasa de conversión (visitante → registro)

- **Engagement:**
  - Reservas por usuario
  - Tasa de retención mensual
  - Suscripciones a GymBro Pass

- **Ingresos:**
  - MRR (Monthly Recurring Revenue)
  - Valor promedio por transacción
  - Gimnasios más rentables

- **Técnicas:**
  - Tiempo de carga de página
  - Tasa de error
  - Uptime

---

## 🎯 **ROADMAP SUGERIDO**

### Semana 1-2: MVP Funcional
- Backend con Supabase
- Sistema de pagos con Stripe
- Geolocalización

### Semana 3: Core Features
- Gestión de clases
- Sistema de calificaciones
- Notificaciones

### Semana 4: Pulido
- Términos legales
- SEO básico
- Testing manual exhaustivo

### Semana 5+: Launch y Optimización
- Deploy a producción
- Monitoreo y analytics
- Iteración basada en feedback

---

## 📝 **NOTAS**

- **Prioridad ⭐⭐⭐**: Crítico para MVP
- **Prioridad ⭐⭐**: Importante pero no bloqueante
- **Prioridad ⭐**: Nice to have

**Última actualización:** 7 de Noviembre, 2025

---

## 🤝 **CONTRIBUCIONES**

Para trabajar en cualquier item:
1. Crear branch: `feature/nombre-funcionalidad`
2. Implementar y testear
3. Crear PR con descripción detallada
4. Marcar item como completado en este documento
5. Merge a `main`

---

**¿Preguntas o sugerencias?** Actualiza este documento según avance el proyecto.
