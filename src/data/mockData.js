export const mockGyms = [
  {
    id: 1,
    name: 'PowerFit Studio',
    location: 'La Carolina, Quito',
    rating: 4.8,
    price: 8,
    capacity: 25,
    schedule: '6:00 - 22:00',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
    featured: true,
    activities: ['CrossFit', 'Funcional', 'Yoga'],
    description: 'Gimnasio boutique especializado en entrenamiento funcional y CrossFit. Equipamiento de última generación y entrenadores certificados.',
    amenities: ['Duchas', 'Lockers', 'WiFi', 'Estacionamiento'],
    coordinates: { lat: -0.1807, lng: -78.4678 }
  },
  {
    id: 2,
    name: 'Urban Fitness',
    location: 'Cumbayá, Quito',
    rating: 4.6,
    price: 6,
    capacity: 30,
    schedule: '5:00 - 23:00',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800',
    featured: false,
    activities: ['Spinning', 'Zumba', 'Pilates'],
    description: 'Espacio moderno con clases grupales dinámicas. Ambiente motivador y comunidad activa.',
    amenities: ['Duchas', 'Lockers', 'WiFi', 'Cafetería'],
    coordinates: { lat: -0.2034, lng: -78.4384 }
  },
  {
    id: 3,
    name: 'Iron Temple',
    location: 'González Suárez, Quito',
    rating: 4.9,
    price: 8,
    capacity: 20,
    schedule: '6:00 - 21:00',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800',
    featured: true,
    activities: ['Musculación', 'Powerlifting', 'Funcional'],
    description: 'Gimnasio especializado en fuerza y musculación. Equipamiento profesional y ambiente serio de entrenamiento.',
    amenities: ['Duchas', 'Lockers', 'Nutricionista'],
    coordinates: { lat: -0.1950, lng: -78.4850 }
  },
  {
    id: 4,
    name: 'Flex Zone',
    location: 'La Floresta, Quito',
    rating: 4.5,
    price: 4,
    capacity: 35,
    schedule: '6:00 - 22:00',
    image: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=800',
    featured: false,
    activities: ['Cardio', 'Funcional', 'Stretching'],
    description: 'Gimnasio versátil con amplia variedad de clases y horarios flexibles.',
    amenities: ['Duchas', 'Lockers', 'WiFi'],
    coordinates: { lat: -0.1850, lng: -78.4900 }
  },
  {
    id: 5,
    name: 'Warrior Gym',
    location: 'Iñaquito, Quito',
    rating: 4.7,
    price: 7,
    capacity: 28,
    schedule: '5:30 - 22:30',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
    featured: false,
    activities: ['Boxing', 'MMA', 'Funcional'],
    description: 'Especializado en artes marciales y deportes de combate. Entrenadores con experiencia competitiva.',
    amenities: ['Duchas', 'Lockers', 'Ring', 'Sauna'],
    coordinates: { lat: -0.1750, lng: -78.4800 }
  },
  {
    id: 6,
    name: 'Zen Fitness',
    location: 'La Pradera, Quito',
    rating: 4.8,
    price: 5,
    capacity: 22,
    schedule: '6:00 - 21:00',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800',
    featured: true,
    activities: ['Yoga', 'Pilates', 'Meditación'],
    description: 'Espacio tranquilo enfocado en bienestar integral. Clases de yoga y pilates con instructores certificados.',
    amenities: ['Duchas', 'Lockers', 'WiFi', 'Terraza'],
    coordinates: { lat: -0.1900, lng: -78.4950 }
  }
]

export const mockClasses = [
  {
    id: 1,
    gymId: 1,
    name: 'CrossFit Matutino',
    instructor: 'Carlos Mendoza',
    time: '06:00',
    duration: 60,
    capacity: 15,
    enrolled: 12,
    date: '2024-11-06'
  },
  {
    id: 2,
    gymId: 1,
    name: 'Yoga Flow',
    instructor: 'María González',
    time: '18:00',
    duration: 60,
    capacity: 20,
    enrolled: 18,
    date: '2024-11-06'
  },
  {
    id: 3,
    gymId: 2,
    name: 'Spinning Extremo',
    instructor: 'Juan Pérez',
    time: '07:00',
    duration: 45,
    capacity: 25,
    enrolled: 20,
    date: '2024-11-06'
  }
]

export const mockReviews = [
  {
    id: 1,
    gymId: 1,
    userName: 'Andrea López',
    rating: 5,
    comment: 'Excelente gimnasio, los entrenadores son muy profesionales y el ambiente es motivador.',
    date: '2024-10-15'
  },
  {
    id: 2,
    gymId: 1,
    userName: 'Roberto Silva',
    rating: 4,
    comment: 'Muy buen equipamiento y limpieza. Solo mejoraría los horarios de las clases.',
    date: '2024-10-10'
  },
  {
    id: 3,
    gymId: 2,
    userName: 'Carolina Ruiz',
    rating: 5,
    comment: 'Me encanta! Las clases de spinning son increíbles y la ubicación es perfecta.',
    date: '2024-10-20'
  }
]
