-- Seed some sample bookings to show different availability
-- This will make some time slots full and others available

-- Get a user ID (use the first user in the system)
DO $$
DECLARE
  sample_user_id UUID;
  mckenzies_id INTEGER;
  powerfit_id INTEGER;
  irontemple_id INTEGER;
BEGIN
  -- Get first user ID
  SELECT id INTO sample_user_id FROM auth.users LIMIT 1;
  
  -- Get gym IDs by name
  SELECT id INTO mckenzies_id FROM public.gyms WHERE name = 'McKenzies Fitness Studio';
  SELECT id INTO powerfit_id FROM public.gyms WHERE name = 'PowerFit Studio';
  SELECT id INTO irontemple_id FROM public.gyms WHERE name = 'Iron Temple';
  
  -- McKenzies Fitness Studio (capacity = 30)
  -- Fill up some time slots partially and completely
  
  -- 06:00 - 10 bookings (20/30 available)
  INSERT INTO public.bookings (user_id, gym_id, booking_date, booking_time, pass_type, price, status)
  SELECT sample_user_id, mckenzies_id, CURRENT_DATE + 1, '06:00', 'daily_premium', 12.00, 'confirmed'
  FROM generate_series(1, 10);
  
  -- 08:00 - 25 bookings (5/30 available)
  INSERT INTO public.bookings (user_id, gym_id, booking_date, booking_time, pass_type, price, status)
  SELECT sample_user_id, mckenzies_id, CURRENT_DATE + 1, '08:00', 'daily_premium', 12.00, 'confirmed'
  FROM generate_series(1, 25);
  
  -- 10:00 - 30 bookings (0/30 FULL)
  INSERT INTO public.bookings (user_id, gym_id, booking_date, booking_time, pass_type, price, status)
  SELECT sample_user_id, mckenzies_id, CURRENT_DATE + 1, '10:00', 'daily_premium', 12.00, 'confirmed'
  FROM generate_series(1, 30);
  
  -- 18:00 - 15 bookings (15/30 available)
  INSERT INTO public.bookings (user_id, gym_id, booking_date, booking_time, pass_type, price, status)
  SELECT sample_user_id, mckenzies_id, CURRENT_DATE + 1, '18:00', 'daily_premium', 12.00, 'confirmed'
  FROM generate_series(1, 15);
  
  -- PowerFit Studio (capacity = 25)
  -- 06:00 - 5 bookings (20/25 available)
  INSERT INTO public.bookings (user_id, gym_id, booking_date, booking_time, pass_type, price, status)
  SELECT sample_user_id, powerfit_id, CURRENT_DATE + 1, '06:00', 'daily_basic', 8.00, 'confirmed'
  FROM generate_series(1, 5);
  
  -- 12:00 - 25 bookings (0/25 FULL)
  INSERT INTO public.bookings (user_id, gym_id, booking_date, booking_time, pass_type, price, status)
  SELECT sample_user_id, powerfit_id, CURRENT_DATE + 1, '12:00', 'daily_basic', 8.00, 'confirmed'
  FROM generate_series(1, 25);
  
  -- 16:00 - 20 bookings (5/25 available)
  INSERT INTO public.bookings (user_id, gym_id, booking_date, booking_time, pass_type, price, status)
  SELECT sample_user_id, powerfit_id, CURRENT_DATE + 1, '16:00', 'daily_basic', 8.00, 'confirmed'
  FROM generate_series(1, 20);
  
  -- Iron Temple (capacity = 20)
  -- 08:00 - 20 bookings (0/20 FULL)
  INSERT INTO public.bookings (user_id, gym_id, booking_date, booking_time, pass_type, price, status)
  SELECT sample_user_id, irontemple_id, CURRENT_DATE + 1, '08:00', 'daily_premium', 9.00, 'confirmed'
  FROM generate_series(1, 20);
  
  -- 14:00 - 10 bookings (10/20 available)
  INSERT INTO public.bookings (user_id, gym_id, booking_date, booking_time, pass_type, price, status)
  SELECT sample_user_id, irontemple_id, CURRENT_DATE + 1, '14:00', 'daily_premium', 9.00, 'confirmed'
  FROM generate_series(1, 10);
  
  -- 20:00 - 3 bookings (17/20 available)
  INSERT INTO public.bookings (user_id, gym_id, booking_date, booking_time, pass_type, price, status)
  SELECT sample_user_id, irontemple_id, CURRENT_DATE + 1, '20:00', 'daily_premium', 9.00, 'confirmed'
  FROM generate_series(1, 3);

END $$;

-- Verify bookings were created
SELECT 
  g.name as gym_name,
  b.booking_date,
  b.booking_time,
  COUNT(*) as bookings_count,
  g.capacity,
  (g.capacity - COUNT(*)) as available_spots
FROM public.bookings b
JOIN public.gyms g ON b.gym_id = g.id
WHERE b.status = 'confirmed'
GROUP BY g.id, g.name, g.capacity, b.booking_date, b.booking_time
ORDER BY g.name, b.booking_time;
