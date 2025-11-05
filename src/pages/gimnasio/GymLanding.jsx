import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Calendar, DollarSign, BarChart, Clock, CheckCircle } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const GymLanding = () => {
  const features = [
    {
      icon: Users,
      title: 'Más Clientes',
      description: 'Accede a miles de usuarios activos buscando gimnasios'
    },
    {
      icon: Calendar,
      title: 'Gestión Simple',
      description: 'Administra reservas, horarios y cupos desde un solo lugar'
    },
    {
      icon: DollarSign,
      title: 'Sin Comisiones',
      description: 'Primeros 3 meses gratis, luego solo 5% por reserva'
    },
    {
      icon: BarChart,
      title: 'Reportes en Tiempo Real',
      description: 'Visualiza métricas de ocupación e ingresos al instante'
    }
  ]

  const benefits = [
    'Registro gratuito y rápido',
    'Dashboard intuitivo y fácil de usar',
    'Notificaciones automáticas de reservas',
    'Sistema de calificaciones y reseñas',
    'Soporte técnico dedicado',
    'Integración con Google Maps'
  ]

  return (
    <div className="min-h-screen bg-dark">
      <Header variant="public" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-montserrat font-extrabold mb-6">
              Lleva tu gimnasio al
              <br />
              <span className="text-gradient">siguiente nivel</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 mb-12 font-opensans">
              Únete a la plataforma líder de reservas de gimnasios.
              Aumenta tu ocupación y simplifica tu gestión.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/gimnasio/registro" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
                Registrar mi Gimnasio
              </Link>
              <Link to="/gimnasio/login" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
                Ya tengo cuenta
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
                +40%
              </div>
              <div className="text-zinc-400">Aumento en ocupación promedio</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-montserrat font-bold text-primary mb-2">
                150+
              </div>
              <div className="text-zinc-400">Gimnasios ya registrados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-montserrat font-bold text-primary mb-2">
                5,000+
              </div>
              <div className="text-zinc-400">Reservas mensuales</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-zinc-950">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">
              ¿Por qué elegir GymBro?
            </h2>
            <p className="text-xl text-zinc-400">
              Todo lo que necesitas para gestionar tu gimnasio
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card text-center"
              >
                <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-montserrat font-bold mb-3">{feature.title}</h3>
                <p className="text-zinc-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">
              Comienza en 3 pasos
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Regístrate',
                description: 'Completa el formulario con los datos de tu gimnasio en menos de 5 minutos'
              },
              {
                step: '2',
                title: 'Configura',
                description: 'Añade tus horarios, clases y precios. Sube fotos de tus instalaciones'
              },
              {
                step: '3',
                title: 'Recibe Reservas',
                description: 'Empieza a recibir reservas automáticamente y gestiónalas desde tu dashboard'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="card relative"
              >
                <div className="absolute -top-6 left-6 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-2xl font-montserrat font-bold text-dark">
                    {item.step}
                  </span>
                </div>
                <div className="pt-4">
                  <h3 className="text-2xl font-montserrat font-bold mb-3">{item.title}</h3>
                  <p className="text-zinc-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-zinc-950">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-montserrat font-bold mb-6">
                Todo incluido en tu membresía
              </h2>
              <p className="text-xl text-zinc-400 mb-8">
                Sin costos ocultos. Sin sorpresas. Solo herramientas poderosas para hacer crecer tu negocio.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="text-zinc-300">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30"
            >
              <div className="text-center py-8">
                <h3 className="text-3xl font-montserrat font-bold mb-4">
                  Precio Simple
                </h3>
                <div className="mb-6">
                  <div className="text-6xl font-montserrat font-bold text-primary mb-2">
                    5%
                  </div>
                  <p className="text-zinc-400">por reserva completada</p>
                </div>
                <div className="bg-dark/50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-zinc-300 mb-2">
                    <span className="text-primary font-bold">Gratis</span> los primeros 3 meses
                  </p>
                  <p className="text-xs text-zinc-500">
                    Sin costo de setup. Sin mensualidad fija.
                  </p>
                </div>
                <Link to="/gimnasio/registro" className="btn-primary w-full">
                  Comenzar Gratis
                </Link>
              </div>
            </motion.div>
          </div>
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
            <TrendingUp className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-montserrat font-bold mb-6">
              ¿Listo para crecer?
            </h2>
            <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
              Únete a los gimnasios que ya están aumentando sus ingresos con GymBro
            </p>
            <Link to="/gimnasio/registro" className="btn-primary text-lg px-8 py-4 inline-block">
              Registrar mi Gimnasio
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default GymLanding
