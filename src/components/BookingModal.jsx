import { useState } from 'react'
import { X, Calendar, Clock, CreditCard } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const BookingModal = ({ isOpen, onClose, gym }) => {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedPass, setSelectedPass] = useState('daily')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica de reserva
    alert('¡Reserva confirmada! Te enviaremos un email con los detalles.')
    onClose()
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
                {/* Pass Type */}
                <div>
                  <label className="block text-sm font-semibold text-light mb-3">
                    Tipo de Pase
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedPass('daily')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedPass === 'daily'
                          ? 'border-primary bg-primary/10'
                          : 'border-zinc-700 hover:border-zinc-600'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">${gym.price}</div>
                        <div className="text-sm text-zinc-400">Pase Diario</div>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPass('monthly')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedPass === 'monthly'
                          ? 'border-primary bg-primary/10'
                          : 'border-zinc-700 hover:border-zinc-600'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">${gym.price * 20}</div>
                        <div className="text-sm text-zinc-400">Pase Mensual</div>
                      </div>
                    </button>
                  </div>
                </div>

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
                  >
                    <option value="">Selecciona un horario</option>
                    <option value="06:00">06:00 AM</option>
                    <option value="08:00">08:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="18:00">06:00 PM</option>
                    <option value="20:00">08:00 PM</option>
                  </select>
                </div>

                {/* Payment Info */}
                <div className="bg-zinc-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-zinc-300 mb-2">
                    <CreditCard className="w-4 h-4" />
                    <span className="text-sm font-semibold">Resumen de Pago</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Total:</span>
                    <span className="text-2xl font-bold text-primary">
                      ${selectedPass === 'daily' ? gym.price : gym.price * 20}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 btn-secondary"
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="flex-1 btn-primary">
                    Confirmar Reserva
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default BookingModal
