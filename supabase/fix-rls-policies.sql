-- Fix RLS policies to allow user registration
-- Run this in Supabase SQL Editor

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;

-- Create new policies that allow registration

-- Allow users to view their own profile
CREATE POLICY "Users can view their own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update their own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- IMPORTANT: Allow service role to insert users (for the trigger)
CREATE POLICY "Service role can insert users"
  ON public.users FOR INSERT
  WITH CHECK (true);

-- Alternative: If you want users to be able to insert their own record
-- CREATE POLICY "Users can insert their own profile"
--   ON public.users FOR INSERT
--   WITH CHECK (auth.uid() = id);
