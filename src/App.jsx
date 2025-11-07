import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AuthProvider } from './contexts/AuthContext'

// Public Pages
import Home from './pages/Home'
import NotFound from './pages/NotFound'

// B2C Pages (Usuario)
import ExploreGyms from './pages/usuario/ExploreGyms'
import GymDetail from './pages/usuario/GymDetail'
import UserLogin from './pages/usuario/UserLogin'
import UserRegister from './pages/usuario/UserRegister'
import UserProfile from './pages/usuario/UserProfile'

// B2B Pages (Gimnasio)
import GymLanding from './pages/gimnasio/GymLanding'
import GymRegister from './pages/gimnasio/GymRegister'
import GymLogin from './pages/gimnasio/GymLogin'
import GymDashboard from './pages/gimnasio/GymDashboard'
import GymProfile from './pages/gimnasio/GymProfile'

// Additional Pages
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'

function App() {
  return (
    <AuthProvider>
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/precios" element={<Pricing />} />
          <Route path="/contacto" element={<Contact />} />

          {/* B2C Routes - Usuario */}
          <Route path="/usuario/explorar" element={<ExploreGyms />} />
          <Route path="/usuario/gimnasio/:id" element={<GymDetail />} />
          <Route path="/usuario/login" element={<UserLogin />} />
          <Route path="/usuario/registro" element={<UserRegister />} />
          <Route path="/usuario/perfil" element={<UserProfile />} />

          {/* B2B Routes - Gimnasio */}
          <Route path="/gimnasio" element={<GymLanding />} />
          <Route path="/gimnasio/registro" element={<GymRegister />} />
          <Route path="/gimnasio/login" element={<GymLogin />} />
          <Route path="/gimnasio/dashboard" element={<GymDashboard />} />
          <Route path="/gimnasio/perfil" element={<GymProfile />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Router>
    </AuthProvider>
  )
}

export default App
