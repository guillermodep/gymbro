import { useState, useEffect, useCallback } from 'react'

/**
 * Hook para obtener la ubicación del usuario
 * @returns {Object} { userLocation, loading, error, requestLocation, clearLocation }
 */
export const useGeolocation = () => {
  const [userLocation, setUserLocation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocalización no soportada en este navegador')
      return
    }

    setLoading(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setUserLocation({
          lat: latitude,
          lng: longitude,
          accuracy: position.coords.accuracy
        })
        setLoading(false)
      },
      (err) => {
        let errorMessage = 'Error al obtener ubicación'
        
        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = 'Permiso de ubicación denegado. Habilítalo en la configuración del navegador.'
            break
          case err.POSITION_UNAVAILABLE:
            errorMessage = 'Información de ubicación no disponible'
            break
          case err.TIMEOUT:
            errorMessage = 'Tiempo de espera agotado al obtener ubicación'
            break
          default:
            errorMessage = err.message
        }
        
        setError(errorMessage)
        setLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    )
  }, [])

  const clearLocation = useCallback(() => {
    setUserLocation(null)
    setError(null)
  }, [])

  return {
    userLocation,
    loading,
    error,
    requestLocation,
    clearLocation
  }
}

/**
 * Calcula la distancia entre dos puntos en km usando la fórmula de Haversine
 * @param {number} lat1 - Latitud del punto 1
 * @param {number} lng1 - Longitud del punto 1
 * @param {number} lat2 - Latitud del punto 2
 * @param {number} lng2 - Longitud del punto 2
 * @returns {number} Distancia en km
 */
export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371 // Radio de la Tierra en km
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLng = (lng2 - lng1) * (Math.PI / 180)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

/**
 * Filtra gimnasios por distancia
 * @param {Array} gyms - Array de gimnasios
 * @param {Object} userLocation - Ubicación del usuario {lat, lng}
 * @param {number} radiusKm - Radio en km
 * @returns {Array} Gimnasios dentro del radio
 */
export const filterGymsByDistance = (gyms, userLocation, radiusKm) => {
  if (!userLocation || !gyms) return []

  return gyms
    .map(gym => {
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        gym.coordinates.lat,
        gym.coordinates.lng
      )
      return { ...gym, distance }
    })
    .filter(gym => gym.distance <= radiusKm)
    .sort((a, b) => a.distance - b.distance)
}

/**
 * Ordena gimnasios por distancia
 * @param {Array} gyms - Array de gimnasios
 * @param {Object} userLocation - Ubicación del usuario {lat, lng}
 * @returns {Array} Gimnasios ordenados por distancia
 */
export const sortGymsByDistance = (gyms, userLocation) => {
  if (!userLocation || !gyms) return gyms

  return [...gyms]
    .map(gym => ({
      ...gym,
      distance: calculateDistance(
        userLocation.lat,
        userLocation.lng,
        gym.coordinates.lat,
        gym.coordinates.lng
      )
    }))
    .sort((a, b) => a.distance - b.distance)
}
