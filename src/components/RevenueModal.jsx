import { motion, AnimatePresence } from 'framer-motion'
import { X, DollarSign, TrendingUp, Calendar, Download } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const RevenueModal = ({ isOpen, onClose }) => {
  // Mock data para ingresos diarios del mes
  const dailyRevenue = [
    { day: '1', date: 'Nov 1', amount: 85, bookings: 8 },
    { day: '2', date: 'Nov 2', amount: 92, bookings: 9 },
    { day: '3', date: 'Nov 3', amount: 78, bookings: 7 },
    { day: '4', date: 'Nov 4', amount: 105, bookings: 11 },
    { day: '5', date: 'Nov 5', amount: 120, bookings: 12 },
    { day: '6', date: 'Nov 6', amount: 95, bookings: 10 },
    { day: '7', date: 'Nov 7', amount: 88, bookings: 9 },
    { day: '8', date: 'Nov 8', amount: 110, bookings: 11 },
    { day: '9', date: 'Nov 9', amount: 98, bookings: 10 },
    { day: '10', date: 'Nov 10', amount: 115, bookings: 12 },
    { day: '11', date: 'Nov 11', amount: 102, bookings: 10 },
    { day: '12', date: 'Nov 12', amount: 125, bookings: 13 },
    { day: '13', date: 'Nov 13', amount: 108, bookings: 11 },
    { day: '14', date: 'Nov 14', amount: 95, bookings: 9 },
    { day: '15', date: 'Nov 15', amount: 118, bookings: 12 },
    { day: '16', date: 'Nov 16', amount: 105, bookings: 11 },
    { day: '17', date: 'Nov 17', amount: 92, bookings: 9 },
    { day: '18', date: 'Nov 18', amount: 88, bookings: 8 },
    { day: '19', date: 'Nov 19', amount: 112, bookings: 11 },
    { day: '20', date: 'Nov 20', amount: 98, bookings: 10 },
    { day: '21', date: 'Nov 21', amount: 105, bookings: 10 },
    { day: '22', date: 'Nov 22', amount: 115, bookings: 12 },
    { day: '23', date: 'Nov 23', amount: 102, bookings: 10 },
    { day: '24', date: 'Nov 24', amount: 95, bookings: 9 },
    { day: '25', date: 'Nov 25', amount: 108, bookings: 11 },
    { day: '26', date: 'Nov 26', amount: 118, bookings: 12 },
    { day: '27', date: 'Nov 27', amount: 125, bookings: 13 },
    { day: '28', date: 'Nov 28', amount: 110, bookings: 11 },
    { day: '29', date: 'Nov 29', amount: 98, bookings: 10 },
    { day: '30', date: 'Nov 30', amount: 105, bookings: 11 }
  ]

  const totalRevenue = dailyRevenue.reduce((sum, day) => sum + day.amount, 0)
  const totalBookings = dailyRevenue.reduce((sum, day) => sum + day.bookings, 0)
  const averageDaily = (totalRevenue / dailyRevenue.length).toFixed(2)
  const bestDay = dailyRevenue.reduce((max, day) => day.amount > max.amount ? day : max, dailyRevenue[0])

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-900 border border-primary/30 rounded-lg p-3 shadow-xl">
          <p className="text-sm text-zinc-400 mb-1">{payload[0].payload.date}</p>
          <p className="text-lg font-bold text-primary">${payload[0].value}</p>
          <p className="text-xs text-zinc-500">{payload[0].payload.bookings} reservas</p>
        </div>
      )
    }
    return null
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-5xl border border-zinc-800 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-6 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-montserrat font-bold">Ingresos del Mes</h2>
                  <p className="text-sm text-zinc-400">Noviembre 2024</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-zinc-800 rounded-xl p-4 border border-zinc-700">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-zinc-400">Total del Mes</span>
                </div>
                <div className="text-3xl font-montserrat font-bold text-green-500">
                  ${totalRevenue}
                </div>
              </div>

              <div className="bg-zinc-800 rounded-xl p-4 border border-zinc-700">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-sm text-zinc-400">Promedio Diario</span>
                </div>
                <div className="text-3xl font-montserrat font-bold text-primary">
                  ${averageDaily}
                </div>
              </div>

              <div className="bg-zinc-800 rounded-xl p-4 border border-zinc-700">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-zinc-400">Mejor Día</span>
                </div>
                <div className="text-3xl font-montserrat font-bold text-blue-500">
                  ${bestDay.amount}
                </div>
                <div className="text-xs text-zinc-500">{bestDay.date}</div>
              </div>

              <div className="bg-zinc-800 rounded-xl p-4 border border-zinc-700">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-4 h-4 text-purple-500" />
                  <span className="text-sm text-zinc-400">Total Reservas</span>
                </div>
                <div className="text-3xl font-montserrat font-bold text-purple-500">
                  {totalBookings}
                </div>
              </div>
            </div>

            {/* Area Chart */}
            <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700 mb-6">
              <h3 className="text-lg font-montserrat font-bold mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span>Tendencia de Ingresos Diarios</span>
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={dailyRevenue}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FFD600" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#FFD600" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis 
                    dataKey="day" 
                    stroke="#71717a"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="#71717a"
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#FFD600" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorAmount)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700 mb-6">
              <h3 className="text-lg font-montserrat font-bold mb-4 flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-green-500" />
                <span>Ingresos por Día</span>
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis 
                    dataKey="day" 
                    stroke="#71717a"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="#71717a"
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="amount" 
                    fill="#FFD600"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Daily Breakdown Table */}
            <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
              <h3 className="text-lg font-montserrat font-bold mb-4">Desglose Diario</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-700">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-400">Fecha</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-zinc-400">Ingresos</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-zinc-400">Reservas</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-zinc-400">Promedio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dailyRevenue.map((day, index) => (
                      <tr 
                        key={index} 
                        className="border-b border-zinc-700/50 hover:bg-zinc-700/30 transition-colors"
                      >
                        <td className="py-3 px-4 text-sm text-light">{day.date}</td>
                        <td className="py-3 px-4 text-sm text-right font-semibold text-green-500">
                          ${day.amount}
                        </td>
                        <td className="py-3 px-4 text-sm text-right text-zinc-400">
                          {day.bookings}
                        </td>
                        <td className="py-3 px-4 text-sm text-right text-primary">
                          ${(day.amount / day.bookings).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={onClose}
                className="bg-zinc-800 hover:bg-zinc-700 text-light px-6 py-3 rounded-lg font-bold transition-colors"
              >
                Cerrar
              </button>
              <button className="btn-primary flex items-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Exportar Reporte</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default RevenueModal
