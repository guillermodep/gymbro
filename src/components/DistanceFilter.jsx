import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Loader, AlertCircle, X } from 'lucide-react'

const DistanceFilter = ({ onLocationFound, onLocationCleared, loading, error, hasLocation }) => {
  const [selectedRadius, setSelectedRadius] = useState(null)

  const radiusOptions = [
    { label: '1 km', value: 1 },
    { label: '5 km', value: 5 },
    { label: '10 km', value: 10 },
    { label: 'Sin límite', value: null }
  ]

  const handleRequestLocation = () => {
    onLocationFound()
  }

  const handleClearLocation = () => {
    setSelectedRadius(null)
    onLocationCleared()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-light">Cerca de mí</h3>
        </div>
        {hasLocation && (
          <button
            onClick={handleClearLocation}
            className="p-1 hover:bg-zinc-800 rounded transition-colors"
            title="Limpiar ubicación"
          >
            <X className="w-4 h-4 text-zinc-400" />
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded p-3 flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}

      {/* Location Button */}
      {!hasLocation ? (
        <button
          onClick={handleRequestLocation}
          disabled={loading}
          className={`w-full py-2.5 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
            loading
              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
              : 'bg-primary hover:bg-primary-dark text-dark'
          }`}
        >
          {loading ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              <span>Obteniendo ubicación...</span>
            </>
          ) : (
            <>
              <MapPin className="w-4 h-4" />
              <span>Usar mi ubicación</span>
            </>
          )}
        </button>
      ) : (
        <>
          {/* Radius Options */}
          <div className="space-y-2">
            <p className="text-sm text-zinc-400">Filtrar por distancia:</p>
            <div className="grid grid-cols-2 gap-2">
              {radiusOptions.map((option) => (
                <button
                  key={option.value ?? 'all'}
                  onClick={() => setSelectedRadius(option.value)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                    selectedRadius === option.value
                      ? 'bg-primary text-dark'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Location Status */}
          <div className="bg-green-500/10 border border-green-500/30 rounded p-3 flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <p className="text-sm text-green-500">Ubicación detectada</p>
          </div>
        </>
      )}
    </motion.div>
  )
}

export default DistanceFilter
