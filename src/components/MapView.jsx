import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Star, MapPin, Clock, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix para los iconos de Leaflet en Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Iconos personalizados para gimnasios premium y básicos
const createCustomIcon = (isPremium) => {
  const color = isPremium ? '#FFD600' : '#71717a'
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid #000;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          transform: rotate(45deg);
          color: #000;
          font-size: 16px;
          font-weight: bold;
        ">📍</div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  })
}

const MapView = ({ gyms }) => {
  // Centro del mapa en Quito
  const center = [-0.1807, -78.4678]

  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden border border-zinc-800">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {gyms.map((gym) => (
          <Marker
            key={gym.id}
            position={[gym.coordinates.lat, gym.coordinates.lng]}
            icon={createCustomIcon(gym.featured)}
          >
            <Popup className="custom-popup" maxWidth={300}>
              <div className="p-2">
                {/* Imagen */}
                <img
                  src={gym.image}
                  alt={gym.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                
                {/* Nombre y Rating */}
                <div className="mb-2">
                  <h3 className="font-montserrat font-bold text-lg text-dark mb-1">
                    {gym.name}
                  </h3>
                  <div className="flex items-center space-x-1 text-sm">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">{gym.rating}</span>
                    {gym.featured && (
                      <span className="ml-2 bg-yellow-400 text-dark text-xs px-2 py-0.5 rounded-full font-bold">
                        Premium
                      </span>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-1 mb-3 text-sm text-zinc-700">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{gym.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{gym.schedule}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>Capacidad: {gym.capacity} personas</span>
                  </div>
                </div>

                {/* Actividades */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {gym.activities.slice(0, 3).map((activity, index) => (
                    <span
                      key={index}
                      className="text-xs bg-zinc-200 text-zinc-700 px-2 py-1 rounded-full"
                    >
                      {activity}
                    </span>
                  ))}
                </div>

                {/* Precio y CTA */}
                <div className="flex items-center justify-between pt-3 border-t border-zinc-200">
                  <div>
                    <div className="text-2xl font-bold text-yellow-600">
                      ${gym.price}
                    </div>
                    <div className="text-xs text-zinc-600">por día</div>
                  </div>
                  <Link
                    to={`/usuario/gimnasio/${gym.id}`}
                    className="bg-yellow-400 hover:bg-yellow-500 text-dark px-4 py-2 rounded-lg font-bold text-sm transition-colors"
                  >
                    Ver Detalles
                  </Link>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default MapView
