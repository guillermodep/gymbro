import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Star, Clock, Users, Calendar, ChevronLeft, Wifi, Car, Coffee, Droplets } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import BookingModal from '../../components/BookingModal'
import Loader from '../../components/Loader'
import { gymHelpers } from '../../lib/supabase'
import { mockReviews } from '../../data/mockData'

const GymDetail = () => {
  const { id } = useParams()
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [gym, setGym] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch gym data from Supabase
  useEffect(() => {
    const fetchGym = async () => {
      try {
        const { data, error } = await gymHelpers.getGymById(parseInt(id))
        if (error) throw error
        setGym(data)
      } catch (err) {
        console.error('Error fetching gym:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchGym()
  }, [id])

  const gymReviews = mockReviews.filter(r => r.gymId === parseInt(id))

  if (loading) {
    return (
      <div className="min-h-screen bg-dark">
        <Header variant="user" />
        <div className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      </div>
    )
  }

  if (!gym) {
    return (
      <div className="min-h-screen bg-dark">
        <Header variant="user" />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-montserrat font-bold mb-4">Gimnasio no encontrado</h2>
            <Link to="/usuario/explorar" className="btn-primary">
              Volver a explorar
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const images = [gym.image, gym.image, gym.image] // Mock multiple images

  const amenityIcons = {
    'WiFi': Wifi,
    'Estacionamiento': Car,
    'Cafetería': Coffee,
    'Duchas': Droplets,
    'Lockers': Users
  }

  return (
    <div className="min-h-screen bg-dark">
      <Header variant="user" />

      <div className="pt-24 pb-12">
        <div className="container-custom">
          {/* Back Button */}
          <Link
            to="/usuario/explorar"
            className="inline-flex items-center space-x-2 text-zinc-400 hover:text-primary transition-colors mb-6"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Volver a explorar</span>
          </Link>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative h-96 rounded-xl overflow-hidden"
            >
              <img
                src={images[selectedImage]}
                alt={gym.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="grid grid-cols-2 gap-4">
              {images.slice(1).map((img, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(index + 1)}
                  className="relative h-44 rounded-xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <img
                    src={img}
                    alt={`${gym.name} ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-4xl font-montserrat font-bold mb-2">
                      {gym.name}
                    </h1>
                    <div className="flex items-center space-x-2 text-zinc-400">
                      <MapPin className="w-5 h-5" />
                      <span>{gym.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-lg">
                    <Star className="w-6 h-6 text-primary fill-primary" />
                    <span className="text-2xl font-bold text-primary">{gym.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-zinc-400">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>{gym.schedule}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Capacidad: {gym.capacity} personas</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="card">
                <h2 className="text-2xl font-montserrat font-bold mb-4">Sobre este gimnasio</h2>
                <p className="text-zinc-300 leading-relaxed">{gym.description}</p>
              </div>

              {/* Activities */}
              <div className="card">
                <h2 className="text-2xl font-montserrat font-bold mb-4">Actividades</h2>
                <div className="flex flex-wrap gap-3">
                  {gym.activities.map((activity, index) => (
                    <span
                      key={index}
                      className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-semibold"
                    >
                      {activity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="card">
                <h2 className="text-2xl font-montserrat font-bold mb-4">Servicios</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {gym.amenities.map((amenity, index) => {
                    const Icon = amenityIcons[amenity] || Users
                    return (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-zinc-300">{amenity}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Reviews */}
              <div className="card">
                <h2 className="text-2xl font-montserrat font-bold mb-6">Reseñas</h2>
                <div className="space-y-6">
                  {gymReviews.length > 0 ? (
                    gymReviews.map((review) => (
                      <div key={review.id} className="border-b border-zinc-800 pb-6 last:border-0">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-semibold text-light">{review.userName}</p>
                            <p className="text-sm text-zinc-500">{review.date}</p>
                          </div>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'text-primary fill-primary'
                                    : 'text-zinc-600'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-zinc-300">{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-zinc-400 text-center py-8">
                      Aún no hay reseñas para este gimnasio
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar - Booking Card */}
            <div className="lg:col-span-1">
              <div className="card sticky top-24">
                <div className="mb-6">
                  <div className="flex items-baseline space-x-2 mb-2">
                    <span className="text-4xl font-montserrat font-bold text-primary">
                      ${gym.price}
                    </span>
                    <span className="text-zinc-400">/día</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-zinc-400">
                      Pase mensual: ${gym.price * 20}
                    </p>
                    <p className="text-sm font-semibold text-primary">
                      ó adquiere GymBro Pass por $30/mes
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="btn-primary w-full mb-4"
                >
                  <Calendar className="w-5 h-5 inline mr-2" />
                  Reservar ahora
                </button>

                <div className="space-y-3 pt-6 border-t border-zinc-800">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">Cancelación gratis</span>
                    <span className="text-primary font-semibold">24h antes</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">Confirmación</span>
                    <span className="text-primary font-semibold">Inmediata</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        gym={gym}
      />
    </div>
  )
}

export default GymDetail
