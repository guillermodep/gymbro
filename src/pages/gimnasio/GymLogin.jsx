import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Dumbbell } from 'lucide-react'

const GymLogin = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('¡Inicio de sesión exitoso!')
    navigate('/gimnasio/dashboard')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
          <Dumbbell className="w-10 h-10 text-primary" />
          <span className="text-3xl font-montserrat font-bold text-primary">
            GymBro
          </span>
        </Link>

        <div className="card">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-montserrat font-bold mb-2">
              Portal de Gimnasios
            </h1>
            <p className="text-zinc-400">
              Accede a tu dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-light mb-2">
                Email
              </label>
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
              <label className="block text-sm font-semibold text-light mb-2">
                Contraseña
              </label>
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
                />
              </div>
            </div>

            <button type="submit" className="btn-primary w-full">
              Iniciar Sesión
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-zinc-900 text-zinc-400">o</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-zinc-400">
              ¿Aún no estás registrado?{' '}
              <Link to="/gimnasio/registro" className="text-primary font-semibold hover:underline">
                Registra tu gimnasio
              </Link>
            </p>
          </div>

          <div className="text-center mt-6 pt-6 border-t border-zinc-800">
            <p className="text-zinc-400 text-sm">
              ¿Eres usuario?{' '}
              <Link to="/usuario/login" className="text-primary hover:underline">
                Ingresa aquí
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default GymLogin
