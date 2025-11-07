# Desactivar Confirmación de Email en Supabase

Para permitir que los usuarios se registren y logueen sin verificar su email:

## Pasos:

1. Ve a tu proyecto en Supabase Dashboard
2. Click en **Authentication** en el menú lateral
3. Click en **Providers**
4. Busca **Email** en la lista de providers
5. Click en **Email** para configurarlo
6. **DESACTIVA** la opción: **"Confirm email"**
7. Click en **Save**

## Resultado:

- ✅ Los usuarios pueden registrarse sin confirmar email
- ✅ Pueden loguearse inmediatamente después del registro
- ✅ No se envían emails de confirmación

## Nota:

Esto es temporal para desarrollo. En producción deberías:
- Activar confirmación de email
- Configurar un servicio de email (SendGrid, Resend, etc.)
- Personalizar los templates de email
