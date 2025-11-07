import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Dumbbell, User, LogOut } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

const Header = ({ variant = 'public' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [userName, setUserName] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  const isActive = (path) => location.pathname === path

  const publicLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/usuario/explorar', label: 'Explorar' },
    { path: '/precios', label: 'Precios' },
    { path: '/contacto', label: 'Contacto' },
  ]

  const userLinks = [
    { path: '/usuario/explorar', label: 'Explorar' },
    { path: '/usuario/perfil', label: 'Mi Perfil' },
  ]

  const gymLinks = [
    { path: '/gimnasio/dashboard', label: 'Dashboard' },
    { path: '/gimnasio/perfil', label: 'Mi Gimnasio' },
  ]

  const links = variant === 'user' ? userLinks : variant === 'gym' ? gymLinks : publicLinks

  // Fetch user name from public.users
  useEffect(() => {
    const fetchUserName = async () => {
      if (user) {
        // First try to get name from metadata
        const metaName = user.user_metadata?.name
        if (metaName) {
          setUserName(metaName)
          return
        }

        // If not in metadata, fetch from public.users
        const { data, error } = await supabase
          .from('users')
          .select('name')
          .eq('id', user.id)
          .single()

        if (!error && data) {
          setUserName(data.name)
        }
      } else {
        setUserName(null)
      }
    }

    fetchUserName()
  }, [user])

  const handleLogout = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-sm border-b border-zinc-800">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Dumbbell className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-2xl font-montserrat font-bold text-primary">
              GymBro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-montserrat font-semibold transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-primary'
                    : 'text-light hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {variant === 'public' ? (
              <div className="flex items-center space-x-4">
                <Link to="/usuario/login" className="btn-secondary text-sm px-4 py-2">
                  Iniciar Sesión
                </Link>
                <Link to="/gimnasio" className="btn-primary text-sm px-4 py-2">
                  Soy Gimnasio
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                {userName && (
                  <div className="flex items-center space-x-2 text-light">
                    <User className="w-5 h-5 text-primary" />
                    <span className="font-semibold">{userName}</span>
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-light hover:text-primary transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-semibold">Salir</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-light hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-4">
                {links.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block font-montserrat font-semibold transition-colors duration-200 ${
                      isActive(link.path)
                        ? 'text-primary'
                        : 'text-light hover:text-primary'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                
                {variant === 'public' && (
                  <div className="flex flex-col space-y-2 pt-4">
                    <Link
                      to="/usuario/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="btn-secondary text-center"
                    >
                      Iniciar Sesión
                    </Link>
                    <Link
                      to="/gimnasio"
                      onClick={() => setIsMenuOpen(false)}
                      className="btn-primary text-center"
                    >
                      Soy Gimnasio
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

export default Header
