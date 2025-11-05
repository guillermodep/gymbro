import { useState } from 'react'
import { motion } from 'framer-motion'
import { Building, MapPin, Phone, Clock, Image, Save } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const GymProfile = () => {
  const [formData, setFormData] = useState({
    name: 'PowerFit Studio',
    address: 'Av. República del Salvador, La Carolina',
    city: 'Quito',
    phone: '+593 99 123 4567',
    schedule: '6:00 - 22:00',
    capacity: '25',
    description: 'Gimnasio boutique especializado en entrenamiento funcional y CrossFit.',
    activities: ['CrossFit', 'Funcional', 'Yoga'],
    price: '8'
  })

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

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('¡Cambios guardados exitosamente!')
  }

  return (
    <div className="min-h-screen bg-dark">
      <Header variant="gym" />

      <div className="pt-24 pb-12">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">
              Mi Gimnasio
            </h1>
            <p className="text-xl text-zinc-400">
              Edita la información de tu gimnasio
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <div className="card">
              <h2 className="text-2xl font-montserrat font-bold mb-6">
                Información Básica
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-light mb-2">
                    <Building className="w-4 h-4 inline mr-2" />
                    Nombre del gimnasio
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-light mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-light mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Dirección
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-light mb-2">
                    Ciudad
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="input-field"
                    required
                  >
                    <option value="Quito">Quito</option>
                    <option value="Guayaquil">Guayaquil</option>
                    <option value="Cuenca">Cuenca</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-light mb-2">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Horario
                  </label>
                  <input
                    type="text"
                    name="schedule"
                    value={formData.schedule}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="6:00 - 22:00"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-light mb-2">
                    Capacidad máxima
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    className="input-field"
                    required
                    min="1"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-light mb-2">
                  Descripción
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="input-field"
                  required
                />
              </div>
            </div>

            {/* Activities */}
            <div className="card">
              <h2 className="text-2xl font-montserrat font-bold mb-6">
                Actividades
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {activities.map((activity) => (
                  <button
                    key={activity}
                    type="button"
                    onClick={() => toggleActivity(activity)}
                    className={`p-3 rounded-lg border-2 transition-all ${
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

            {/* Pricing */}
            <div className="card">
              <h2 className="text-2xl font-montserrat font-bold mb-6">
                Precios
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-light mb-2">
                    Precio pase diario ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="input-field"
                    required
                    min="1"
                    step="0.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-light mb-2">
                    Precio pase mensual ($)
                  </label>
                  <input
                    type="number"
                    value={formData.price * 20}
                    className="input-field bg-zinc-800"
                    disabled
                  />
                  <p className="text-xs text-zinc-500 mt-1">
                    Calculado automáticamente (precio diario × 20)
                  </p>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="card">
              <h2 className="text-2xl font-montserrat font-bold mb-6">
                <Image className="w-6 h-6 inline mr-2" />
                Fotos del gimnasio
              </h2>
              <div className="border-2 border-dashed border-zinc-700 rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
                <Image className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                <p className="text-zinc-400 mb-2">
                  Arrastra imágenes aquí o haz click para seleccionar
                </p>
                <p className="text-sm text-zinc-500">
                  PNG, JPG hasta 5MB
                </p>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end space-x-4">
              <button type="button" className="btn-secondary">
                Cancelar
              </button>
              <button type="submit" className="btn-primary">
                <Save className="w-5 h-5 inline mr-2" />
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default GymProfile
