# Configuración de Supabase para Desarrollo

Para permitir que cualquier usuario se registre y loguee sin verificación de email:

## 1. Desactivar Confirmación de Email

### Opción A: Via Dashboard (Recomendado)
1. Ve a **Authentication** → **Providers**
2. Click en **Email**
3. **DESACTIVA** la opción **"Confirm email"**
4. Click en **Save**

### Opción B: Via Settings
1. Ve a **Authentication** → **Settings**
2. Busca **"Email"** en la sección de configuración
3. **DESACTIVA** **"Enable email confirmations"**
4. Click en **Save**

---

## 2. Confirmar Usuarios Existentes (SQL)

Ejecuta este SQL para confirmar todos los usuarios que ya existen:

```sql
UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email_confirmed_at IS NULL;
```

---

## 3. Desactivar Verificación de Email en Signup

En **Authentication** → **Settings**:
- Busca **"Email Auth"**
- **DESACTIVA** todas las opciones de verificación:
  - ❌ Confirm email
  - ❌ Secure email change
  - ❌ Double confirm email change

---

## 4. Permitir Registros Automáticos

En **Authentication** → **Settings**:
- **ACTIVA** **"Enable anonymous sign-ins"** (opcional)
- **DESACTIVA** **"Enable manual linking"** (opcional)

---

## Resultado Esperado:

✅ Usuarios pueden registrarse con cualquier email
✅ No necesitan confirmar email
✅ Pueden loguearse inmediatamente después del registro
✅ No se envían emails de confirmación

---

## ⚠️ IMPORTANTE:

Esta configuración es **SOLO PARA DESARROLLO**.

En producción deberías:
- ✅ Activar confirmación de email
- ✅ Configurar un servicio de email (SendGrid, Resend, etc.)
- ✅ Personalizar templates de email
- ✅ Activar rate limiting
- ✅ Configurar CAPTCHA
