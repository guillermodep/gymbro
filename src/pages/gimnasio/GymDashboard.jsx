import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Users, DollarSign, TrendingUp, Clock, CheckCircle, X } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const GymDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  // Mock data
  const stats = [
    { icon: Users, label: 'Reservas Hoy', value: '24', change: '+12%', color: 'text-primary' },
    { icon: DollarSign, label: 'Ingresos del Mes', value: '$2,450', change: '+18%', color: 'text-green-500' },
    { icon: Calendar, label: 'Ocupación', value: '78%', change: '+5%', color: 'text-blue-500' },
    { icon: TrendingUp, label: 'Calificación', value: '4.8', change: '+0.2', color: 'text-yellow-500' }
  ]

  const todayBookings = [
    { id: 1, user: 'María González', class: 'CrossFit', time: '06:00', status: 'completed' },
    { id: 2, user: 'Juan Pérez', class: 'Yoga', time: '08:00', status: 'completed' },
    { id: 3, user: 'Ana Silva', class: 'Funcional', time: '10:00', status: 'pending' },
    { id: 4, user: 'Carlos Ruiz', class: 'CrossFit', time: '18:00', status: 'pending' },
    { id: 5, user: 'Laura Martínez', class: 'Yoga', time: '19:00', status: 'pending' }
  ]

  const upcomingClasses = [
    { id: 1, name: 'CrossFit Matutino', time: '06:00', capacity: 15, enrolled: 12 },
    { id: 2, name: 'Yoga Flow', time: '08:00', capacity: 20, enrolled: 18 },
    { id: 3, name: 'Funcional', time: '10:00', capacity: 15, enrolled: 8 },
    { id: 4, name: 'CrossFit Vespertino', time: '18:00', capacity: 15, enrolled: 14 }
  ]

  return (
    <div className="min-h-screen bg-dark">
      <Header variant="gym" />

      <div className="pt-24 pb-12">
        <div className="container-custom">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">
              Dashboard
            </h1>
            <p className="text-xl text-zinc-400">
              Bienvenido de vuelta, PowerFit Studio
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-zinc-800`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <span className="text-sm text-green-500 font-semibold">
                    {stat.change}
                  </span>
                </div>
                <div className="text-3xl font-montserrat font-bold mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-zinc-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Today's Bookings */}
            <div className="lg:col-span-2">
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-montserrat font-bold">
                    Reservas de Hoy
                  </h2>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="input-field text-sm py-2"
                  />
                </div>

                <div className="space-y-3">
                  {todayBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-zinc-800 rounded-lg p-4 flex items-center justify-between hover:bg-zinc-750 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-light">{booking.user}</h3>
                          <p className="text-sm text-zinc-400">
                            {booking.class} • {booking.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {booking.status === 'completed' ? (
                          <span className="flex items-center space-x-1 text-green-500 text-sm">
                            <CheckCircle className="w-4 h-4" />
                            <span>Completado</span>
                          </span>
                        ) : (
                          <button className="btn-primary text-sm px-4 py-2">
                            Marcar asistencia
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Classes */}
            <div className="lg:col-span-1">
              <div className="card">
                <h2 className="text-2xl font-montserrat font-bold mb-6">
                  Clases de Hoy
                </h2>
                <div className="space-y-4">
                  {upcomingClasses.map((classItem) => (
                    <div
                      key={classItem.id}
                      className="bg-zinc-800 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-light">{classItem.name}</h3>
                        <div className="flex items-center space-x-1 text-zinc-400 text-sm">
                          <Clock className="w-4 h-4" />
                          <span>{classItem.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-zinc-400">
                          {classItem.enrolled}/{classItem.capacity} inscritos
                        </span>
                        <div className="w-20 bg-zinc-700 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${(classItem.enrolled / classItem.capacity) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="card hover:border-primary/50 transition-all text-left">
              <Calendar className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-montserrat font-bold mb-2">Crear Clase</h3>
              <p className="text-sm text-zinc-400">Añade una nueva clase al calendario</p>
            </button>
            <button className="card hover:border-primary/50 transition-all text-left">
              <Users className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-montserrat font-bold mb-2">Ver Miembros</h3>
              <p className="text-sm text-zinc-400">Gestiona tus usuarios registrados</p>
            </button>
            <button className="card hover:border-primary/50 transition-all text-left">
              <DollarSign className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-montserrat font-bold mb-2">Reportes</h3>
              <p className="text-sm text-zinc-400">Visualiza estadísticas e ingresos</p>
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default GymDashboard
