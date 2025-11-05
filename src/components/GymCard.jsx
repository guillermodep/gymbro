import { Link } from 'react-router-dom'
import { MapPin, Star, Clock, Users } from 'lucide-react'
import { motion } from 'framer-motion'

const GymCard = ({ gym }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="card overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-48 -m-6 mb-4 overflow-hidden">
        <img
          src={gym.image || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800'}
          alt={gym.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        {gym.featured && (
          <div className="absolute top-4 right-4 bg-primary text-dark px-3 py-1 rounded-full text-xs font-bold">
            Destacado
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-montserrat font-bold text-light">
            {gym.name}
          </h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm font-semibold text-light">{gym.rating}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-zinc-400 text-sm">
          <MapPin className="w-4 h-4" />
          <span>{gym.location}</span>
        </div>

        <div className="flex items-center space-x-4 text-zinc-400 text-sm">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{gym.schedule}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{gym.capacity} personas</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {gym.activities?.slice(0, 3).map((activity, index) => (
            <span
              key={index}
              className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full text-xs"
            >
              {activity}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
          <div>
            <span className="text-2xl font-montserrat font-bold text-primary">
              ${gym.price}
            </span>
            <span className="text-zinc-400 text-sm ml-1">/día</span>
          </div>
          <Link to={`/usuario/gimnasio/${gym.id}`} className="btn-primary text-sm px-4 py-2">
            Ver más
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default GymCard
