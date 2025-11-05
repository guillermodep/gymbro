import { Link } from 'react-router-dom'
import { Dumbbell, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Dumbbell className="w-8 h-8 text-primary" />
              <span className="text-2xl font-montserrat font-bold text-primary">
                GymBro
              </span>
            </div>
            <p className="text-zinc-400 text-sm">
              Tu plataforma para encontrar y reservar gimnasios cerca de ti. 
              Entrena donde quieras, cuando quieras.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-zinc-400 hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-zinc-400 hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-zinc-400 hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Para Usuarios */}
          <div>
            <h4 className="font-montserrat font-bold text-light mb-4">Para Usuarios</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/usuario/explorar" className="text-zinc-400 hover:text-primary transition-colors text-sm">
                  Explorar Gimnasios
                </Link>
              </li>
              <li>
                <Link to="/usuario/registro" className="text-zinc-400 hover:text-primary transition-colors text-sm">
                  Crear Cuenta
                </Link>
              </li>
              <li>
                <Link to="/precios" className="text-zinc-400 hover:text-primary transition-colors text-sm">
                  Precios
                </Link>
              </li>
              <li>
                <Link to="/usuario/perfil" className="text-zinc-400 hover:text-primary transition-colors text-sm">
                  Mi Perfil
                </Link>
              </li>
            </ul>
          </div>

          {/* Para Gimnasios */}
          <div>
            <h4 className="font-montserrat font-bold text-light mb-4">Para Gimnasios</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/gimnasio" className="text-zinc-400 hover:text-primary transition-colors text-sm">
                  Publicá tu Gimnasio
                </Link>
              </li>
              <li>
                <Link to="/gimnasio/registro" className="text-zinc-400 hover:text-primary transition-colors text-sm">
                  Registrar Gimnasio
                </Link>
              </li>
              <li>
                <Link to="/gimnasio/dashboard" className="text-zinc-400 hover:text-primary transition-colors text-sm">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-montserrat font-bold text-light mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-zinc-400 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@gymbro.com</span>
              </li>
              <li className="flex items-center space-x-2 text-zinc-400 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span>+593 99 999 9999</span>
              </li>
              <li className="flex items-center space-x-2 text-zinc-400 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Quito, Ecuador</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} GymBro. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terminos" className="text-zinc-500 hover:text-primary transition-colors text-sm">
              Términos y Condiciones
            </Link>
            <Link to="/privacidad" className="text-zinc-500 hover:text-primary transition-colors text-sm">
              Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
