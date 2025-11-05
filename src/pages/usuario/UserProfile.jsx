import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Calendar, CreditCard, History, Star, MapPin, Clock } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { mockGyms } from '../../data/mockData'

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('bookings')

  // Mock user data
  const user = {
    name: 'Juan Pérez',
    email: 'juan@email.com',
    memberSince: '2024-01-15',
    totalBookings: 24
  }

  // Mock bookings
  const upcomingBookings = [
    {
      id: 1,
      gym: mockGyms[0],
      date: '2024-11-08',
      time: '18:00',
      type: 'Clase de CrossFit'
    },
    {
      id: 2,
      gym: mockGyms[2],
      date: '2024-11-10',
      time: '07:00',
      type: 'Pase Diario'
    }
  ]

  const pastBookings = [
    {
      id: 3,
      gym: mockGyms[1],
      date: '2024-11-01',
      time: '19:00',
      type: 'Clase de Spinning',
      rated: true
    },
    {
      id: 4,
      gym: mockGyms[0],
      date: '2024-10-28',
      time: '18:00',
      type: 'Pase Diario',
      rated: false
    }
  ]

  const tabs = [
    { id: 'bookings', label: 'Mis Reservas', icon: Calendar },
    { id: 'history', label: 'Historial', icon: History },
    { id: 'profile', label: 'Mi Perfil', icon: User },
  ]

  return (
    <div className="min-h-screen bg-dark">
      <Header variant="user" />

      <div className="pt-24 pb-12">
        <div className="container-custom">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">
              Mi Cuenta
            </h1>
            <p className="text-xl text-zinc-400">
              Gestiona tus reservas y perfil
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="card">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-montserrat font-bold mb-1">
                    {user.name}
                  </h3>
                  <p className="text-sm text-zinc-400">{user.email}</p>
                </div>

                <div className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                        activeTab === tab.id
                          ? 'bg-primary text-dark'
                          : 'text-zinc-400 hover:bg-zinc-800'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span className="font-semibold">{tab.label}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-zinc-800">
                  <div className="text-center">
                    <p className="text-sm text-zinc-400 mb-1">Miembro desde</p>
                    <p className="font-semibold text-light">{user.memberSince}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Bookings Tab */}
              {activeTab === 'bookings' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="card">
                    <h2 className="text-2xl font-montserrat font-bold mb-6">
                      Próximas Reservas
                    </h2>
                    {upcomingBookings.length > 0 ? (
                      <div className="space-y-4">
                        {upcomingBookings.map((booking) => (
                          <div
                            key={booking.id}
                            className="bg-zinc-800 rounded-lg p-6 hover:bg-zinc-750 transition-colors"
                          >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="flex items-start space-x-4">
                                <img
                                  src={booking.gym.image}
                                  alt={booking.gym.name}
                                  className="w-20 h-20 rounded-lg object-cover"
                                />
                                <div>
                                  <h3 className="text-lg font-montserrat font-bold mb-1">
                                    {booking.gym.name}
                                  </h3>
                                  <p className="text-sm text-zinc-400 mb-2">
                                    {booking.type}
                                  </p>
                                  <div className="flex flex-wrap gap-3 text-sm text-zinc-400">
                                    <div className="flex items-center space-x-1">
                                      <Calendar className="w-4 h-4" />
                                      <span>{booking.date}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Clock className="w-4 h-4" />
                                      <span>{booking.time}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <MapPin className="w-4 h-4" />
                                      <span>{booking.gym.location}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <button className="btn-secondary text-sm px-4 py-2 whitespace-nowrap">
                                Cancelar
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Calendar className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                        <p className="text-zinc-400">No tienes reservas próximas</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* History Tab */}
              {activeTab === 'history' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="card">
                    <h2 className="text-2xl font-montserrat font-bold mb-6">
                      Historial de Reservas
                    </h2>
                    <div className="space-y-4">
                      {pastBookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="bg-zinc-800 rounded-lg p-6"
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-start space-x-4">
                              <img
                                src={booking.gym.image}
                                alt={booking.gym.name}
                                className="w-20 h-20 rounded-lg object-cover"
                              />
                              <div>
                                <h3 className="text-lg font-montserrat font-bold mb-1">
                                  {booking.gym.name}
                                </h3>
                                <p className="text-sm text-zinc-400 mb-2">
                                  {booking.type}
                                </p>
                                <div className="flex flex-wrap gap-3 text-sm text-zinc-400">
                                  <div className="flex items-center space-x-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>{booking.date}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{booking.time}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {!booking.rated && (
                              <button className="btn-primary text-sm px-4 py-2 whitespace-nowrap">
                                <Star className="w-4 h-4 inline mr-1" />
                                Calificar
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="card">
                    <h2 className="text-2xl font-montserrat font-bold mb-6">
                      Información Personal
                    </h2>
                    <form className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-light mb-2">
                          Nombre completo
                        </label>
                        <input
                          type="text"
                          defaultValue={user.name}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-light mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue={user.email}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-light mb-2">
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          placeholder="+593 99 999 9999"
                          className="input-field"
                        />
                      </div>
                      <button type="submit" className="btn-primary">
                        Guardar cambios
                      </button>
                    </form>
                  </div>

                  <div className="card">
                    <h2 className="text-2xl font-montserrat font-bold mb-6">
                      Cambiar Contraseña
                    </h2>
                    <form className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-light mb-2">
                          Contraseña actual
                        </label>
                        <input
                          type="password"
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-light mb-2">
                          Nueva contraseña
                        </label>
                        <input
                          type="password"
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-light mb-2">
                          Confirmar nueva contraseña
                        </label>
                        <input
                          type="password"
                          className="input-field"
                        />
                      </div>
                      <button type="submit" className="btn-primary">
                        Actualizar contraseña
                      </button>
                    </form>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default UserProfile
