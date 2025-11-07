import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Filter, Grid, Map as MapIcon } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import GymCard from '../../components/GymCard'
import MapView from '../../components/MapView'
import Loader from '../../components/Loader'
import { gymHelpers } from '../../lib/supabase'

const ExploreGyms = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCity, setSelectedCity] = useState('all')
  const [selectedActivity, setSelectedActivity] = useState('all')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'map'
  const [showFilters, setShowFilters] = useState(false)
  const [gyms, setGyms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const cities = ['Quito', 'Guayaquil', 'Cuenca']
  const activities = ['CrossFit', 'Yoga', 'Spinning', 'Funcional', 'Pilates', 'Boxing']

  // Fetch gyms from Supabase
  useEffect(() => {
    fetchGyms()
  }, [])

  const fetchGyms = async () => {
    try {
      setLoading(true)
      const { data, error } = await gymHelpers.getAllGyms()
      
      if (error) throw error
      
      setGyms(data || [])
    } catch (err) {
      console.error('Error fetching gyms:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const filteredGyms = gyms.filter(gym => {
    const matchesSearch = gym.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gym.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCity = selectedCity === 'all' || gym.city === selectedCity
    const matchesActivity = selectedActivity === 'all' || 
                           gym.activities?.includes(selectedActivity)
    
    return matchesSearch && matchesCity && matchesActivity
  })

  return (
    <div className="min-h-screen bg-dark">
      <Header variant="user" />

      <div className="pt-24 pb-12">
        <div className="container-custom">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">
              Explorar Gimnasios
            </h1>
            <p className="text-xl text-zinc-400">
              Encuentra el gimnasio perfecto para ti
            </p>
          </motion.div>

          {/* Search and Filters */}
          <div className="space-y-4 mb-8">
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por nombre o ubicación..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-12"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn-secondary md:w-auto flex items-center justify-center space-x-2"
              >
                <Filter className="w-5 h-5" />
                <span>Filtros</span>
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-3 rounded-lg transition-all ${
                    viewMode === 'grid'
                      ? 'bg-primary text-dark'
                      : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`px-4 py-3 rounded-lg transition-all ${
                    viewMode === 'map'
                      ? 'bg-primary text-dark'
                      : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                  }`}
                >
                  <MapIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="card"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* City Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-light mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Ciudad
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="input-field"
                    >
                      <option value="all">Todas las ciudades</option>
                      {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  {/* Activity Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-light mb-2">
                      Tipo de Actividad
                    </label>
                    <select
                      value={selectedActivity}
                      onChange={(e) => setSelectedActivity(e.target.value)}
                      className="input-field"
                    >
                      <option value="all">Todas las actividades</option>
                      {activities.map(activity => (
                        <option key={activity} value={activity}>{activity}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-20">
              <Loader />
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-20">
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 max-w-md mx-auto">
                <h3 className="text-xl font-montserrat font-bold text-red-500 mb-2">
                  Error al cargar gimnasios
                </h3>
                <p className="text-zinc-400 mb-4">{error}</p>
                <button 
                  onClick={fetchGyms}
                  className="btn-primary"
                >
                  Reintentar
                </button>
              </div>
            </div>
          )}

          {/* Results Count */}
          {!loading && !error && (
            <div className="mb-6">
              <p className="text-zinc-400">
                {filteredGyms.length} {filteredGyms.length === 1 ? 'gimnasio encontrado' : 'gimnasios encontrados'}
              </p>
            </div>
          )}

          {/* Gyms Grid or Map */}
          {!loading && !error && (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredGyms.map((gym) => (
                    <GymCard key={gym.id} gym={gym} />
                  ))}
                </div>
              ) : (
                <MapView gyms={filteredGyms} />
              )}

              {/* No Results */}
              {filteredGyms.length === 0 && (
                <div className="text-center py-20">
                  <Search className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-montserrat font-bold mb-2">
                    No se encontraron gimnasios
                  </h3>
                  <p className="text-zinc-400">
                    Intenta ajustar tus filtros de búsqueda
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ExploreGyms
