import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Dumbbell } from 'lucide-react'

const UserLogin = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica de autenticación
    alert('¡Inicio de sesión exitoso!')
    navigate('/usuario/perfil')
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
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
          <Dumbbell className="w-10 h-10 text-primary" />
          <span className="text-3xl font-montserrat font-bold text-primary">
            GymBro
          </span>
        </Link>

        {/* Card */}
        <div className="card">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-montserrat font-bold mb-2">
              Bienvenido de vuelta
            </h1>
            <p className="text-zinc-400">
              Ingresa a tu cuenta para continuar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
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
                  placeholder="tu@email.com"
                  className="input-field pl-12"
                  required
                />
              </div>
            </div>

            {/* Password */}
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

            {/* Forgot Password */}
            <div className="text-right">
              <Link to="/usuario/recuperar" className="text-sm text-primary hover:underline">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn-primary w-full">
              Iniciar Sesión
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-zinc-900 text-zinc-400">o</span>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-zinc-400">
              ¿No tienes cuenta?{' '}
              <Link to="/usuario/registro" className="text-primary font-semibold hover:underline">
                Regístrate gratis
              </Link>
            </p>
          </div>

          {/* Gym Link */}
          <div className="text-center mt-6 pt-6 border-t border-zinc-800">
            <p className="text-zinc-400 text-sm">
              ¿Eres dueño de un gimnasio?{' '}
              <Link to="/gimnasio/login" className="text-primary hover:underline">
                Ingresa aquí
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default UserLogin
