-- Seed Gyms Data
-- Insert all 16 gyms from mockData.js into Supabase

-- GIMNASIOS PREMIUM (Destacados)
INSERT INTO public.gyms (name, location, city, address, coordinates, price, capacity, schedule, image, featured, rating, activities, amenities, description) VALUES
('McKenzies Fitness Studio', 'Reina Victoria 2649, Quito 170135', 'Quito', 'Reina Victoria 2649', '{"lat": -0.1807, "lng": -78.4678}', 12.00, 30, '5:00 - 23:00', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800', true, 4.9, ARRAY['Musculación', 'CrossFit', 'Funcional', 'Spinning', 'Yoga', 'Pilates'], ARRAY['Duchas', 'Lockers', 'WiFi', 'Estacionamiento', 'Nutricionista', 'Sauna', 'Jacuzzi', 'Spa', 'Cafetería', 'Entrenador Personal'], 'Gimnasio premium con instalaciones de lujo en el corazón de Quito. Equipamiento de última generación, entrenadores certificados y ambiente exclusivo. Reconocido como uno de los mejores gimnasios de la ciudad.'),

('PowerFit Studio', 'La Carolina, Quito', 'Quito', 'La Carolina', '{"lat": -0.1820, "lng": -78.4690}', 8.00, 25, '6:00 - 22:00', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800', true, 4.8, ARRAY['CrossFit', 'Funcional', 'Yoga'], ARRAY['Duchas', 'Lockers', 'WiFi', 'Estacionamiento', 'Nutricionista', 'Sauna'], 'Gimnasio boutique especializado en entrenamiento funcional y CrossFit. Equipamiento de última generación y entrenadores certificados.'),

('Iron Temple', 'González Suárez, Quito', 'Quito', 'González Suárez', '{"lat": -0.1950, "lng": -78.4850}', 9.00, 20, '6:00 - 21:00', 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800', true, 4.9, ARRAY['Musculación', 'Powerlifting', 'Funcional'], ARRAY['Duchas', 'Lockers', 'Nutricionista', 'Entrenador Personal', 'Sauna', 'Jacuzzi'], 'Gimnasio especializado en fuerza y musculación. Equipamiento profesional y ambiente serio de entrenamiento.'),

('Elite Performance', 'La Carolina, Quito', 'Quito', 'La Carolina', '{"lat": -0.1820, "lng": -78.4690}', 11.00, 18, '5:00 - 23:00', 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800', true, 4.9, ARRAY['CrossFit', 'HIIT', 'Funcional', 'Yoga'], ARRAY['Duchas', 'Lockers', 'WiFi', 'Cafetería', 'Spa', 'Nutricionista', 'Fisioterapeuta', 'Estacionamiento'], 'Centro de alto rendimiento con tecnología de punta. Entrenadores olímpicos y programas personalizados.'),

('Platinum Gym', 'Cumbayá, Quito', 'Quito', 'Cumbayá', '{"lat": -0.2040, "lng": -78.4390}', 12.00, 22, '5:00 - 23:00', 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=800', true, 4.8, ARRAY['Musculación', 'Spinning', 'Pilates', 'Boxing'], ARRAY['Duchas', 'Lockers', 'WiFi', 'Cafetería', 'Sauna', 'Jacuzzi', 'Piscina', 'Estacionamiento'], 'Gimnasio premium con instalaciones de lujo. Equipamiento importado y clases exclusivas.'),

('Titan Fitness Club', 'Iñaquito, Quito', 'Quito', 'Iñaquito', '{"lat": -0.1760, "lng": -78.4810}', 8.00, 30, '6:00 - 22:00', 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800', true, 4.7, ARRAY['Musculación', 'CrossFit', 'Funcional', 'Spinning'], ARRAY['Duchas', 'Lockers', 'WiFi', 'Cafetería', 'Estacionamiento', 'Nutricionista'], 'Gimnasio completo con amplia zona de pesas y cardio. Ambiente motivador para todos los niveles.'),

('Oxygen Wellness', 'La Pradera, Quito', 'Quito', 'La Pradera', '{"lat": -0.1910, "lng": -78.4960}', 10.00, 25, '6:00 - 21:00', 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800', true, 4.8, ARRAY['Yoga', 'Pilates', 'Meditación', 'Stretching'], ARRAY['Duchas', 'Lockers', 'WiFi', 'Terraza', 'Spa', 'Cafetería Saludable', 'Estacionamiento'], 'Centro de bienestar integral. Clases especializadas de yoga y pilates con instructores certificados internacionalmente.');

-- GIMNASIOS INTERMEDIOS
INSERT INTO public.gyms (name, location, city, address, coordinates, price, capacity, schedule, image, featured, rating, activities, amenities, description) VALUES
('Urban Fitness', 'Cumbayá, Quito', 'Quito', 'Cumbayá', '{"lat": -0.2034, "lng": -78.4384}', 6.00, 30, '5:00 - 23:00', 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800', false, 4.6, ARRAY['Spinning', 'Zumba', 'Pilates'], ARRAY['Duchas', 'Lockers', 'WiFi', 'Cafetería'], 'Espacio moderno con clases grupales dinámicas. Ambiente motivador y comunidad activa.'),

('Warrior Gym', 'Iñaquito, Quito', 'Quito', 'Iñaquito', '{"lat": -0.1750, "lng": -78.4800}', 7.00, 28, '5:30 - 22:30', 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800', false, 4.7, ARRAY['Boxing', 'MMA', 'Funcional'], ARRAY['Duchas', 'Lockers', 'Ring', 'Sauna'], 'Especializado en artes marciales y deportes de combate. Entrenadores con experiencia competitiva.'),

('Body Shape', 'La Floresta, Quito', 'Quito', 'La Floresta', '{"lat": -0.1860, "lng": -78.4910}', 6.00, 35, '6:00 - 22:00', 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=800', false, 4.5, ARRAY['Cardio', 'Funcional', 'Zumba', 'Spinning'], ARRAY['Duchas', 'Lockers', 'WiFi'], 'Gimnasio familiar con variedad de clases grupales. Excelente relación calidad-precio.'),

('Energy Gym', 'El Batán, Quito', 'Quito', 'El Batán', '{"lat": -0.1650, "lng": -78.4750}', 5.00, 40, '6:00 - 22:00', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800', false, 4.4, ARRAY['Musculación', 'Cardio', 'Funcional'], ARRAY['Duchas', 'Lockers', 'WiFi'], 'Gimnasio amplio con buena variedad de máquinas. Ideal para entrenamientos individuales.');

-- GIMNASIOS BÁSICOS
INSERT INTO public.gyms (name, location, city, address, coordinates, price, capacity, schedule, image, featured, rating, activities, amenities, description) VALUES
('Flex Zone', 'La Floresta, Quito', 'Quito', 'La Floresta', '{"lat": -0.1850, "lng": -78.4900}', 4.00, 35, '6:00 - 22:00', 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=800', false, 4.5, ARRAY['Cardio', 'Funcional', 'Stretching'], ARRAY['Duchas', 'Lockers'], 'Gimnasio versátil con amplia variedad de clases y horarios flexibles.'),

('Fit Center', 'San Rafael, Quito', 'Quito', 'San Rafael', '{"lat": -0.1700, "lng": -78.4600}', 4.00, 40, '6:00 - 21:00', 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800', false, 4.3, ARRAY['Cardio', 'Musculación'], ARRAY['Duchas', 'Lockers'], 'Gimnasio básico con equipamiento esencial. Perfecto para entrenamientos sencillos.'),

('Active Life', 'La Gasca, Quito', 'Quito', 'La Gasca', '{"lat": -0.1780, "lng": -78.4880}', 4.00, 30, '6:30 - 21:30', 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800', false, 4.4, ARRAY['Cardio', 'Funcional', 'Aeróbicos'], ARRAY['Duchas', 'Lockers'], 'Gimnasio de barrio con ambiente familiar. Clases grupales incluidas.'),

('Gym Express', 'La Mariscal, Quito', 'Quito', 'La Mariscal', '{"lat": -0.1900, "lng": -78.4850}', 4.00, 25, '7:00 - 21:00', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800', false, 4.2, ARRAY['Cardio', 'Musculación'], ARRAY['Duchas', 'Lockers'], 'Gimnasio compacto ideal para entrenamientos rápidos. Ubicación céntrica.'),

('Fitness Point', 'El Inca, Quito', 'Quito', 'El Inca', '{"lat": -0.1720, "lng": -78.4720}', 4.00, 35, '6:00 - 22:00', 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=800', false, 4.3, ARRAY['Cardio', 'Funcional', 'Spinning'], ARRAY['Duchas', 'Lockers'], 'Gimnasio accesible con buen mantenimiento. Clases de spinning populares.');
