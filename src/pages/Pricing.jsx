import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Pricing = () => {
  const plans = [
    {
      name: 'Pase Diario',
      price: '8',
      period: 'por día',
      description: 'Perfecto para probar diferentes gimnasios',
      features: [
        'Acceso a cualquier gimnasio',
        'Sin compromiso',
        'Cancelación gratis 24h antes',
        'Reserva en minutos'
      ],
      cta: 'Explorar gimnasios',
      link: '/usuario/explorar',
      popular: false
    },
    {
      name: 'Pase Mensual',
      price: '160',
      period: 'por mes',
      description: 'Ideal para entrenar regularmente',
      features: [
        'Todo del pase diario',
        'Ahorra 20% vs pase diario',
        'Prioridad en reservas',
        'Acceso a clases exclusivas',
        'Soporte prioritario'
      ],
      cta: 'Comenzar ahora',
      link: '/usuario/registro',
      popular: true
    },
    {
      name: 'Para Gimnasios',
      price: '5%',
      period: 'por reserva',
      description: 'Crece tu negocio con nosotros',
      features: [
        'Gratis los primeros 3 meses',
        'Dashboard completo',
        'Sin costo de setup',
        'Soporte dedicado',
        'Reportes en tiempo real'
      ],
      cta: 'Registrar gimnasio',
      link: '/gimnasio/registro',
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-dark">
      <Header variant="public" />

      <div className="pt-32 pb-20">
        <div className="container-custom">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-montserrat font-bold mb-6">
              Planes y <span className="text-gradient">Precios</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Elige el plan que mejor se adapte a tus necesidades.
              Sin contratos, sin sorpresas.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`card relative ${
                  plan.popular ? 'border-primary border-2' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-dark px-4 py-1 rounded-full text-sm font-bold">
                      Más Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-montserrat font-bold mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-zinc-400 text-sm mb-4">
                    {plan.description}
                  </p>
                  <div className="mb-2">
                    <span className="text-5xl font-montserrat font-bold text-primary">
                      ${plan.price}
                    </span>
                  </div>
                  <p className="text-zinc-400 text-sm">{plan.period}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={plan.link}
                  className={`block text-center ${
                    plan.popular ? 'btn-primary' : 'btn-secondary'
                  } w-full`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-montserrat font-bold text-center mb-12">
              Preguntas Frecuentes
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: '¿Puedo cancelar mi pase mensual?',
                  a: 'Sí, puedes cancelar en cualquier momento sin penalización. El pase seguirá activo hasta el final del período pagado.'
                },
                {
                  q: '¿Los precios varían por gimnasio?',
                  a: 'Sí, cada gimnasio establece sus propios precios. Los precios mostrados son promedios aproximados.'
                },
                {
                  q: '¿Hay cargos adicionales?',
                  a: 'No, los precios incluyen todo. Sin cargos ocultos ni comisiones adicionales para usuarios.'
                },
                {
                  q: '¿Puedo usar mi pase en cualquier gimnasio?',
                  a: 'Sí, tu pase es válido en todos los gimnasios asociados a la plataforma GymBro.'
                }
              ].map((faq, index) => (
                <div key={index} className="card">
                  <h3 className="text-lg font-montserrat font-bold mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-zinc-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Pricing
