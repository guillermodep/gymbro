-- Crear Usuario Administrador
-- Este usuario puede loguearse inmediatamente sin verificación

-- PASO 1: Primero crea el usuario en el dashboard de Supabase
-- Ve a: Authentication → Users → Add User
-- Email: admin@gymbro.com
-- Password: Admin123!
-- Auto Confirm User: YES (importante!)

-- PASO 2: Luego ejecuta este SQL para agregar el usuario a la tabla public.users
-- Reemplaza 'USER_ID_AQUI' con el ID del usuario que acabas de crear

INSERT INTO public.users (id, name, email, role)
VALUES (
  'USER_ID_AQUI', -- Reemplaza con el UUID del usuario creado
  'Administrador',
  'admin@gymbro.com',
  'user'
);

-- ALTERNATIVA: Si ya creaste el usuario y quieres solo agregarlo a public.users
-- Ejecuta esto después de crear el usuario en el dashboard:

INSERT INTO public.users (id, name, email, role)
SELECT 
  id,
  'Administrador',
  email,
  'user'
FROM auth.users
WHERE email = 'admin@gymbro.com'
ON CONFLICT (id) DO NOTHING;

-- Verificar que se creó correctamente:
SELECT * FROM public.users WHERE email = 'admin@gymbro.com';
