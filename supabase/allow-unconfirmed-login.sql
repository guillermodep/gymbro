-- Allow users to login without email confirmation
-- This is for DEVELOPMENT ONLY
-- Run this in Supabase SQL Editor

-- This setting allows users to sign in even if their email is not confirmed
-- Note: This is a project-level setting that needs to be done via Dashboard
-- Go to: Authentication → Settings → Email Auth
-- Disable "Confirm email" option

-- Alternatively, you can manually confirm existing users:
-- UPDATE auth.users 
-- SET email_confirmed_at = NOW()
-- WHERE email = 'pepe@pepe.com';

-- Or confirm ALL users (use with caution):
UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email_confirmed_at IS NULL;
