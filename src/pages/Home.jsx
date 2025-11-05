import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, MapPin, Calendar, Star, Dumbbell, Users, TrendingUp } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { mockGyms } from '../data/mockData'

const Home = () => {
  const featuredGyms = mockGyms.filter(gym => gym.featured).slice(0, 3)

  return (
    <div className="min-h-screen bg-dark">
      <Header variant="public" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-montserrat font-extrabold mb-6">
              Tu <span className="text-gradient">gimnasio ideal</span>
              <br />está a un click
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 mb-12 font-opensans">
              Encuentra, reserva y entrena en los mejores gimnasios cerca de ti.
              Sin contratos, sin compromisos.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/usuario/explorar" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
                <Search className="w-5 h-5 inline mr-2" />
                Explorar Gimnasios
              </Link>
              <Link to="/gimnasio" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
                <Dumbbell className="w-5 h-5 inline mr-2" />
                Soy Gimnasio
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
          >
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-montserrat font-bold text-primary mb-2">
                150+
              </div>
              <div className="text-zinc-400">Gimnasios Asociados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-montserrat font-bold text-primary mb-2">
                5,000+
              </div>
              <div className="text-zinc-400">Usuarios Activos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-montserrat font-bold text-primary mb-2">
                4.8★
              </div>
              <div className="text-zinc-400">Calificación Promedio</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-zinc-950">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">
              ¿Cómo funciona?
            </h2>
            <p className="text-xl text-zinc-400">
              Entrenar nunca fue tan fácil
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: 'Busca',
                description: 'Encuentra gimnasios cerca de ti con filtros por ubicación, tipo de clase y horario.'
              },
              {
                icon: Calendar,
                title: 'Reserva',
                description: 'Selecciona el horario que mejor te convenga y reserva tu clase en segundos.'
              },
              {
                icon: Dumbbell,
                title: 'Entrena',
                description: 'Llega al gimnasio, muestra tu reserva y disfruta de tu entrenamiento.'
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="card text-center"
              >
                <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-montserrat font-bold mb-4">{step.title}</h3>
                <p className="text-zinc-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Gyms */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-between items-center mb-12"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">
                Gimnasios Destacados
              </h2>
              <p className="text-xl text-zinc-400">
                Los más populares de la semana
              </p>
            </div>
            <Link to="/usuario/explorar" className="btn-secondary hidden md:block">
              Ver todos
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredGyms.map((gym, index) => (
              <motion.div
                key={gym.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card overflow-hidden group cursor-pointer"
              >
                <Link to={`/usuario/gimnasio/${gym.id}`}>
                  <div className="relative h-48 -m-6 mb-4 overflow-hidden">
                    <img
                      src={gym.image}
                      alt={gym.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-primary text-dark px-3 py-1 rounded-full text-xs font-bold">
                      Destacado
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-montserrat font-bold text-light">
                        {gym.name}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-primary fill-primary" />
                        <span className="text-sm font-semibold text-light">{gym.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-zinc-400 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{gym.location}</span>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                      <div>
                        <span className="text-2xl font-montserrat font-bold text-primary">
                          ${gym.price}
                        </span>
                        <span className="text-zinc-400 text-sm ml-1">/día</span>
                      </div>
                      <span className="btn-primary text-sm px-4 py-2">
                        Ver más
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12 md:hidden">
            <Link to="/usuario/explorar" className="btn-secondary">
              Ver todos los gimnasios
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-zinc-950">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">
              ¿Por qué GymBro?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: MapPin,
                title: 'Cerca de ti',
                description: 'Encuentra gimnasios en tu zona'
              },
              {
                icon: Calendar,
                title: 'Flexibilidad',
                description: 'Sin contratos ni compromisos'
              },
              {
                icon: Users,
                title: 'Comunidad',
                description: 'Conecta con otros deportistas'
              },
              {
                icon: TrendingUp,
                title: 'Progreso',
                description: 'Trackea tu evolución'
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-montserrat font-bold mb-2">{benefit.title}</h3>
                <p className="text-zinc-400 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GymBro Pass Promo */}
      <section className="py-20 bg-zinc-950">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="card bg-gradient-to-r from-primary/20 to-primary/5 border-primary text-center py-16"
          >
            <Star className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-montserrat font-bold mb-6">
              GymBro Pass
            </h2>
            <p className="text-2xl text-zinc-300 mb-4 max-w-2xl mx-auto">
              Acceso ilimitado a <span className="text-primary font-bold">TODOS</span> los gimnasios
            </p>
            <div className="text-5xl font-montserrat font-bold text-primary mb-8">
              $30<span className="text-2xl text-zinc-400">/mes</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <div className="flex items-center space-x-2 text-zinc-300">
                <Star className="w-5 h-5 text-primary" />
                <span>150+ gimnasios</span>
              </div>
              <div className="flex items-center space-x-2 text-zinc-300">
                <Star className="w-5 h-5 text-primary" />
                <span>Reservas ilimitadas</span>
              </div>
              <div className="flex items-center space-x-2 text-zinc-300">
                <Star className="w-5 h-5 text-primary" />
                <span>Sin costo adicional</span>
              </div>
            </div>
            <Link to="/precios" className="btn-primary text-lg px-8 py-4 inline-block">
              Ver planes
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="card bg-gradient-to-r from-primary/20 to-primary/5 border-primary/30 text-center py-16"
          >
            <h2 className="text-4xl md:text-5xl font-montserrat font-bold mb-6">
              ¿Listo para empezar?
            </h2>
            <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
              Únete a miles de personas que ya están entrenando con GymBro
            </p>
            <Link to="/usuario/registro" className="btn-primary text-lg px-8 py-4 inline-block">
              Crear cuenta gratis
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
