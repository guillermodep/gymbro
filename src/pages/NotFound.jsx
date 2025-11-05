import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Search } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-9xl font-montserrat font-bold text-primary mb-4">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">
          Página no encontrada
        </h2>
        <p className="text-xl text-zinc-400 mb-8 max-w-md mx-auto">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary">
            <Home className="w-5 h-5 inline mr-2" />
            Volver al inicio
          </Link>
          <Link to="/usuario/explorar" className="btn-secondary">
            <Search className="w-5 h-5 inline mr-2" />
            Explorar gimnasios
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound
