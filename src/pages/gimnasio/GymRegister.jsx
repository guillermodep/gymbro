import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Dumbbell, Building, MapPin, Phone, Image, AlertCircle } from 'lucide-react'
import TermsModal from '../../components/TermsModal'

const GymRegister = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Account
    email: '',
    password: '',
    confirmPassword: '',
    // Step 2: Gym Info
    gymName: '',
    address: '',
    city: '',
    phone: '',
    // Step 3: Details
    activities: [],
    capacity: '',
    schedule: ''
  })
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [error, setError] = useState(null)

  const activities = ['CrossFit', 'Yoga', 'Spinning', 'Funcional', 'Pilates', 'Boxing', 'Zumba', 'MMA']

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const toggleActivity = (activity) => {
    setFormData({
      ...formData,
      activities: formData.activities.includes(activity)
        ? formData.activities.filter(a => a !== activity)
        : [...formData.activities, activity]
    })
  }

  const handleNext = (e) => {
    e.preventDefault()
    setError(null)
    
    // Validaciones del Step 1
    if (step === 1) {
      if (!termsAccepted) {
        setError('Debes aceptar los términos y condiciones para continuar')
        return
      }
      
      if (formData.password !== formData.confirmPassword) {
        setError('Las contraseñas no coinciden')
        return
      }
      
      if (formData.password.length < 8) {
        setError('La contraseña debe tener al menos 8 caracteres')
        return
      }
    }
    
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Submit form
      alert('¡Registro exitoso! Bienvenido a GymBro')
      navigate('/gimnasio/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
          <Dumbbell className="w-10 h-10 text-primary" />
          <span className="text-3xl font-montserrat font-bold text-primary">
            GymBro
          </span>
        </Link>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= s ? 'bg-primary text-dark' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {s}
              </div>
              {s < 3 && (
                <div className={`flex-1 h-1 mx-2 ${
                  step > s ? 'bg-primary' : 'bg-zinc-800'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="card">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-montserrat font-bold mb-2">
              {step === 1 && 'Crea tu cuenta'}
              {step === 2 && 'Información del gimnasio'}
              {step === 3 && 'Detalles y servicios'}
            </h1>
            <p className="text-zinc-400">
              Paso {step} de 3
            </p>
          </div>

          <form onSubmit={handleNext} className="space-y-6">
            {/* Step 1: Account */}
            {step === 1 && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-light mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="gimnasio@email.com"
                      className="input-field pl-12"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-light mb-2">Contraseña</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="input-field pl-12"
                      required
                      minLength={8}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-light mb-2">Confirmar contraseña</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="input-field pl-12"
                      required
                    />
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-500">{error}</p>
                  </div>
                )}

                {/* Terms */}
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={termsAccepted}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setShowTermsModal(true)
                        } else {
                          setTermsAccepted(false)
                        }
                      }}
                      className="mt-1 w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-primary focus:ring-primary focus:ring-offset-0"
                    />
                    <label htmlFor="terms" className="text-sm text-zinc-400 flex-1">
                      He leído y acepto los{' '}
                      <button
                        type="button"
                        onClick={() => setShowTermsModal(true)}
                        className="text-primary hover:underline font-semibold"
                      >
                        Términos y Condiciones
                      </button>
                      {' '}para Gimnasios Afiliados
                    </label>
                  </div>
                  
                  {termsAccepted && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 flex items-center space-x-2"
                    >
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-sm text-green-500 font-medium">
                        Términos aceptados correctamente
                      </p>
                    </motion.div>
                  )}
                </div>
              </>
            )}

            {/* Step 2: Gym Info */}
            {step === 2 && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-light mb-2">Nombre del gimnasio</label>
                  <div className="relative">
                    <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
                    <input
                      type="text"
                      name="gymName"
                      value={formData.gymName}
                      onChange={handleChange}
                      placeholder="Mi Gimnasio"
                      className="input-field pl-12"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-light mb-2">Dirección</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Av. Principal 123"
                      className="input-field pl-12"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-light mb-2">Ciudad</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="input-field"
                    required
                  >
                    <option value="">Selecciona una ciudad</option>
                    <option value="Quito">Quito</option>
                    <option value="Guayaquil">Guayaquil</option>
                    <option value="Cuenca">Cuenca</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-light mb-2">Teléfono</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+593 99 999 9999"
                      className="input-field pl-12"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {/* Step 3: Details */}
            {step === 3 && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-light mb-3">
                    Actividades que ofreces
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {activities.map((activity) => (
                      <button
                        key={activity}
                        type="button"
                        onClick={() => toggleActivity(activity)}
                        className={`p-3 rounded-lg border-2 transition-all text-sm ${
                          formData.activities.includes(activity)
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'
                        }`}
                      >
                        {activity}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-light mb-2">Capacidad máxima</label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    placeholder="30"
                    className="input-field"
                    required
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-light mb-2">Horario</label>
                  <input
                    type="text"
                    name="schedule"
                    value={formData.schedule}
                    onChange={handleChange}
                    placeholder="6:00 - 22:00"
                    className="input-field"
                    required
                  />
                </div>
              </>
            )}

            {/* Navigation Buttons */}
            <div className="flex space-x-3 pt-4">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex-1 btn-secondary"
                >
                  Atrás
                </button>
              )}
              <button type="submit" className="flex-1 btn-primary">
                {step === 3 ? 'Finalizar' : 'Siguiente'}
              </button>
            </div>
          </form>

          {/* Login Link */}
          {step === 1 && (
            <div className="text-center mt-6 pt-6 border-t border-zinc-800">
              <p className="text-zinc-400">
                ¿Ya tienes cuenta?{' '}
                <Link to="/gimnasio/login" className="text-primary font-semibold hover:underline">
                  Inicia sesión
                </Link>
              </p>
            </div>
          )}
        </div>

        {/* Terms Modal */}
        <TermsModal
          isOpen={showTermsModal}
          onClose={() => setShowTermsModal(false)}
          onAccept={() => setTermsAccepted(true)}
          type="gym"
        />
      </motion.div>
    </div>
  )
}

export default GymRegister
