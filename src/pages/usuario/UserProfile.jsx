import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Calendar, CreditCard, History, Star, MapPin, Clock } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Loader from '../../components/Loader'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'
import { mockGyms } from '../../data/mockData'

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('bookings')
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user: authUser } = useAuth()

  // Fetch user data from Supabase
  useEffect(() => {
    const fetchUserData = async () => {
      if (!authUser) {
        setLoading(false)
        return
      }

      try {
        // Fetch user from public.users
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', authUser.id)
          .single()

        if (error) throw error

        setUserData({
          name: data.name || authUser.user_metadata?.name || 'Usuario',
          email: data.email || authUser.email,
          memberSince: data.created_at?.split('T')[0] || '2024-01-15',
          totalBookings: 0, // TODO: Count from bookings table
          hasGymBroPass: false, // TODO: Check from memberships table
          gymBroPassExpiry: null
        })
      } catch (err) {
        console.error('Error fetching user data:', err)
        // Fallback to auth user data
        setUserData({
          name: authUser.user_metadata?.name || 'Usuario',
          email: authUser.email,
          memberSince: authUser.created_at?.split('T')[0] || '2024-01-15',
          totalBookings: 0,
          hasGymBroPass: false,
          gymBroPassExpiry: null
        })
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [authUser])

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
    { id: 'membership', label: 'Mi Membresía', icon: CreditCard },
    { id: 'history', label: 'Historial', icon: History },
    { id: 'profile', label: 'Mi Perfil', icon: User },
  ]

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

  if (!userData) {
    return (
      <div className="min-h-screen bg-dark">
        <Header variant="user" />
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-zinc-400">No se pudo cargar la información del usuario</p>
        </div>
      </div>
    )
  }

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
                    {userData.name}
                  </h3>
                  <p className="text-sm text-zinc-400">{userData.email}</p>
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
                    <p className="font-semibold text-light">{userData.memberSince}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Membership Tab */}
              {activeTab === 'membership' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {userData.hasGymBroPass ? (
                    <>
                      {/* Active GymBro Pass */}
                      <div className="card bg-gradient-to-r from-primary/20 to-primary/5 border-primary">
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <Star className="w-6 h-6 text-primary fill-primary" />
                              <h2 className="text-2xl font-montserrat font-bold">
                                GymBro Pass Activo
                              </h2>
                            </div>
                            <p className="text-zinc-300">
                              Acceso ilimitado a todos los gimnasios
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-montserrat font-bold text-primary">
                              $30
                            </div>
                            <div className="text-sm text-zinc-400">por mes</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          <div className="bg-dark/50 rounded-lg p-4">
                            <div className="text-sm text-zinc-400 mb-1">Próximo pago</div>
                            <div className="text-lg font-bold text-light">{userData.gymBroPassExpiry}</div>
                          </div>
                          <div className="bg-dark/50 rounded-lg p-4">
                            <div className="text-sm text-zinc-400 mb-1">Reservas este mes</div>
                            <div className="text-lg font-bold text-light">{userData.totalBookings}</div>
                          </div>
                          <div className="bg-dark/50 rounded-lg p-4">
                            <div className="text-sm text-zinc-400 mb-1">Ahorro estimado</div>
                            <div className="text-lg font-bold text-green-500">$162</div>
                          </div>
                        </div>

                        <div className="flex space-x-3">
                          <button className="btn-secondary flex-1">
                            Cancelar membresía
                          </button>
                          <button className="btn-primary flex-1">
                            Actualizar pago
                          </button>
                        </div>
                      </div>

                      {/* Benefits */}
                      <div className="card">
                        <h3 className="text-xl font-montserrat font-bold mb-4">
                          Beneficios de tu GymBro Pass
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            'Acceso ilimitado a todos los gimnasios',
                            'Reservas ilimitadas sin costo adicional',
                            'Prioridad en reservas',
                            'Acceso a clases exclusivas',
                            'Sin cargos por cancelación',
                            'Soporte prioritario 24/7'
                          ].map((benefit, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <Star className="w-5 h-5 text-primary flex-shrink-0" />
                              <span className="text-zinc-300">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* No GymBro Pass - Promotion */}
                      <div className="card bg-gradient-to-r from-primary/20 to-primary/5 border-primary/30">
                        <div className="text-center py-8">
                          <Star className="w-16 h-16 text-primary mx-auto mb-4" />
                          <h2 className="text-3xl font-montserrat font-bold mb-4">
                            Obtén el GymBro Pass
                          </h2>
                          <p className="text-xl text-zinc-300 mb-6 max-w-2xl mx-auto">
                            Acceso ilimitado a todos los gimnasios por solo $30/mes
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-3xl mx-auto">
                            <div className="bg-dark/50 rounded-lg p-4">
                              <div className="text-3xl font-bold text-primary mb-2">150+</div>
                              <div className="text-sm text-zinc-400">Gimnasios disponibles</div>
                            </div>
                            <div className="bg-dark/50 rounded-lg p-4">
                              <div className="text-3xl font-bold text-primary mb-2">∞</div>
                              <div className="text-sm text-zinc-400">Reservas ilimitadas</div>
                            </div>
                            <div className="bg-dark/50 rounded-lg p-4">
                              <div className="text-3xl font-bold text-primary mb-2">$0</div>
                              <div className="text-sm text-zinc-400">Costo por reserva</div>
                            </div>
                          </div>

                          <a href="/precios" className="btn-primary text-lg px-8 py-4 inline-block">
                            Ver planes y suscribirme
                          </a>
                        </div>
                      </div>

                      {/* Current Usage */}
                      <div className="card">
                        <h3 className="text-xl font-montserrat font-bold mb-4">
                          Tu uso actual
                        </h3>
                        <div className="bg-zinc-800 rounded-lg p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <div className="text-sm text-zinc-400 mb-1">Gasto este mes</div>
                              <div className="text-3xl font-bold text-light">$192</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-zinc-400 mb-1">Reservas</div>
                              <div className="text-3xl font-bold text-light">{userData.totalBookings}</div>
                            </div>
                          </div>
                          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm font-bold text-primary mb-1">
                                  💡 Podrías ahorrar
                                </div>
                                <div className="text-xs text-zinc-300">
                                  Con GymBro Pass ahorrarías $162 este mes
                                </div>
                              </div>
                              <div className="text-2xl font-bold text-primary">$162</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              )}

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
                          defaultValue={userData.name}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-light mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue={userData.email}
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
