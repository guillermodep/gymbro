import { useState, useEffect } from 'react'
import { X, Calendar, Clock, CreditCard, AlertCircle, CheckCircle, Mail, QrCode } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { bookingHelpers, membershipHelpers } from '../lib/supabase'
import Loader from './Loader'

const BookingModal = ({ isOpen, onClose, gym }) => {
  const { user } = useAuth()
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedPass, setSelectedPass] = useState('daily')
  const [hasGymBroPass, setHasGymBroPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [showQRAnimation, setShowQRAnimation] = useState(false)
  const [availability, setAvailability] = useState(null)
  const [timeSlots, setTimeSlots] = useState([
    { value: '06:00', label: '06:00 AM' },
    { value: '08:00', label: '08:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '12:00', label: '12:00 PM' },
    { value: '14:00', label: '02:00 PM' },
    { value: '16:00', label: '04:00 PM' },
    { value: '18:00', label: '06:00 PM' },
    { value: '20:00', label: '08:00 PM' }
  ])
  const [slotsAvailability, setSlotsAvailability] = useState({})

  // Check if user has GymBro Pass
  useEffect(() => {
    const checkMembership = async () => {
      if (user) {
        const { data } = await membershipHelpers.getUserMembership(user.id)
        setHasGymBroPass(!!data)
      }
    }
    if (isOpen) {
      checkMembership()
    }
  }, [user, isOpen])

  // Load availability for all time slots when date changes
  useEffect(() => {
    const loadAllAvailability = async () => {
      if (selectedDate && gym) {
        const availabilityData = {}
        for (const slot of timeSlots) {
          const result = await bookingHelpers.checkAvailability(
            gym.id,
            selectedDate,
            slot.value
          )
          availabilityData[slot.value] = result
        }
        setSlotsAvailability(availabilityData)
      }
    }
    loadAllAvailability()
  }, [selectedDate, gym])

  // Check availability when time changes
  useEffect(() => {
    if (selectedDate && selectedTime && slotsAvailability[selectedTime]) {
      setAvailability(slotsAvailability[selectedTime])
    }
  }, [selectedTime, slotsAvailability, selectedDate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (!user) {
      setError('Debes iniciar sesión para hacer una reserva')
      setLoading(false)
      return
    }

    if (!selectedDate || !selectedTime) {
      setError('Por favor selecciona fecha y hora')
      setLoading(false)
      return
    }

    try {
      const bookingData = {
        user_id: user.id,
        gym_id: gym.id,
        booking_date: selectedDate,
        booking_time: selectedTime,
        pass_type: hasGymBroPass ? 'gymbro_pass' : 'daily_premium',
        price: hasGymBroPass ? 0 : gym.price
      }

      const { data, error: bookingError } = await bookingHelpers.createBooking(bookingData)

      if (bookingError) throw bookingError

      // Show success and QR animation
      setSuccess(true)
      setShowQRAnimation(true)
      
      setTimeout(() => {
        setShowQRAnimation(false)
        setTimeout(() => {
          onClose()
          setSuccess(false)
          setSelectedDate('')
          setSelectedTime('')
        }, 500)
      }, 3000)
    } catch (err) {
      console.error('Booking error:', err)
      setError(err.message || 'Error al crear la reserva. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (!gym) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-zinc-900 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-zinc-800">
              {/* Header */}
              <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-montserrat font-bold text-light">
                  Reservar en {gym.name}
                </h2>
                <button
                  onClick={onClose}
                  className="text-zinc-400 hover:text-light transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* QR Animation */}
                <AnimatePresence>
                  {showQRAnimation && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="bg-gradient-to-br from-green-500/20 to-primary/20 border-2 border-green-500 rounded-xl p-6 text-center"
                    >
                      <div className="flex flex-col items-center space-y-4">
                        {/* QR Icon Animation */}
                        <motion.div
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ 
                            duration: 0.6,
                            repeat: Infinity,
                            repeatDelay: 0.5
                          }}
                          className="relative"
                        >
                          <div className="bg-white p-4 rounded-xl">
                            <QrCode className="w-16 h-16 text-dark" />
                          </div>
                          {/* Pulse effect */}
                          <motion.div
                            animate={{ 
                              scale: [1, 1.5, 1.5],
                              opacity: [0.5, 0, 0]
                            }}
                            transition={{ 
                              duration: 1.5,
                              repeat: Infinity
                            }}
                            className="absolute inset-0 bg-green-500 rounded-xl"
                          />
                        </motion.div>

                        {/* Email Animation */}
                        <motion.div
                          initial={{ x: -50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="flex items-center space-x-3"
                        >
                          <motion.div
                            animate={{ x: [0, 10, 0] }}
                            transition={{ 
                              duration: 1,
                              repeat: Infinity,
                              repeatDelay: 0.5
                            }}
                          >
                            <Mail className="w-6 h-6 text-primary" />
                          </motion.div>
                          <div className="text-left">
                            <div className="font-bold text-green-500 flex items-center">
                              <CheckCircle className="w-5 h-5 mr-2" />
                              ¡Reserva Confirmada!
                            </div>
                            <div className="text-sm text-zinc-300">
                              Enviando QR a {user?.email}
                            </div>
                          </div>
                        </motion.div>

                        {/* Loading dots */}
                        <div className="flex space-x-2">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ 
                                y: [0, -10, 0],
                                opacity: [0.3, 1, 0.3]
                              }}
                              transition={{ 
                                duration: 0.6,
                                repeat: Infinity,
                                delay: i * 0.2
                              }}
                              className="w-2 h-2 bg-primary rounded-full"
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      <div className="text-sm text-red-500">{error}</div>
                    </div>
                  </div>
                )}

                {/* GymBro Pass Banner */}
                {hasGymBroPass && (
                  <div className="bg-gradient-to-r from-primary/20 to-primary/5 border-2 border-primary rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-primary mb-1">
                          ✨ Tienes GymBro Pass
                        </div>
                        <div className="text-xs text-zinc-300">
                          Esta reserva está incluida en tu plan
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-primary">GRATIS</div>
                    </div>
                  </div>
                )}

                {/* Pass Type */}
                {!hasGymBroPass && (
                  <div>
                    <label className="block text-sm font-semibold text-light mb-3">
                      Tipo de Pase
                    </label>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="p-4 rounded-lg border-2 border-primary bg-primary/10">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">${gym.price}</div>
                          <div className="text-sm text-zinc-400">Pase Diario</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* GymBro Pass Promo */}
                    <div className="mt-3 bg-zinc-800 rounded-lg p-3 border border-primary/30">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-light mb-1">
                            ¿Quieres acceso ilimitado?
                          </div>
                          <div className="text-xs text-zinc-400">
                            Con GymBro Pass por $30/mes entrenas en todos los gimnasios
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            onClose()
                            window.location.href = '/precios'
                          }}
                          className="ml-3 text-xs bg-primary text-dark px-3 py-2 rounded-lg font-bold hover:bg-yellow-500 transition-colors whitespace-nowrap"
                        >
                          Ver Planes
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Date */}
                <div>
                  <label className="block text-sm font-semibold text-light mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Fecha
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="input-field"
                    required
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-semibold text-light mb-2">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Horario
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="input-field"
                    required
                    disabled={!selectedDate}
                  >
                    <option value="">
                      {selectedDate ? 'Selecciona un horario' : 'Primero selecciona una fecha'}
                    </option>
                    {timeSlots.map((slot) => {
                      const avail = slotsAvailability[slot.value]
                      const availText = avail 
                        ? avail.available 
                          ? ` (${avail.availableSpots}/${avail.capacity} disponibles)`
                          : ' (Lleno)'
                        : ''
                      
                      return (
                        <option 
                          key={slot.value} 
                          value={slot.value}
                          disabled={avail && !avail.available}
                        >
                          {slot.label}{availText}
                        </option>
                      )
                    })}
                  </select>
                </div>

                {/* Availability Indicator */}
                {availability && selectedDate && selectedTime && (
                  <div className={`rounded-lg p-3 border ${
                    availability.available 
                      ? 'bg-green-500/10 border-green-500' 
                      : 'bg-red-500/10 border-red-500'
                  }`}>
                    <div className="text-sm">
                      {availability.available ? (
                        <span className="text-green-500 font-semibold">
                          ✓ Disponible ({availability.availableSpots} de {availability.capacity} espacios)
                        </span>
                      ) : (
                        <span className="text-red-500 font-semibold">
                          ✗ No hay disponibilidad para esta fecha y hora
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Payment Info */}
                {!hasGymBroPass && (
                  <div className="bg-zinc-800 rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-zinc-300 mb-2">
                      <CreditCard className="w-4 h-4" />
                      <span className="text-sm font-semibold">Resumen de Pago</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400">Total:</span>
                      <span className="text-2xl font-bold text-primary">
                        ${gym.price}
                      </span>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 btn-secondary"
                    disabled={loading}
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading || (availability && !availability.available) || !user}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <Loader />
                        <span className="ml-2">Procesando...</span>
                      </span>
                    ) : (
                      'Confirmar Reserva'
                    )}
                  </button>
                </div>

                {/* Login prompt */}
                {!user && (
                  <div className="text-center text-sm text-zinc-400">
                    <a href="/usuario/login" className="text-primary hover:underline">
                      Inicia sesión
                    </a> para hacer una reserva
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default BookingModal
