import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, QrCode, CheckCircle, User, Calendar, CreditCard, Clock } from 'lucide-react'

const QRScannerModal = ({ isOpen, onClose }) => {
  const [scanning, setScanning] = useState(false)
  const [scanned, setScanned] = useState(false)
  const [clientData, setClientData] = useState(null)

  // Mock client data
  const mockClients = [
    {
      id: 1,
      name: 'María González',
      photo: 'https://i.pravatar.cc/150?img=1',
      membershipType: 'GymBro Pass',
      membershipStatus: 'Activo',
      validUntil: '2024-12-31',
      lastVisit: '2024-11-03',
      totalVisits: 45
    },
    {
      id: 2,
      name: 'Juan Pérez',
      photo: 'https://i.pravatar.cc/150?img=3',
      membershipType: 'Pase Diario',
      membershipStatus: 'Activo',
      validUntil: '2024-11-05',
      lastVisit: '2024-11-05',
      totalVisits: 1
    },
    {
      id: 3,
      name: 'Ana Silva',
      photo: 'https://i.pravatar.cc/150?img=5',
      membershipType: 'GymBro Pass',
      membershipStatus: 'Activo',
      validUntil: '2024-12-31',
      lastVisit: '2024-11-04',
      totalVisits: 32
    }
  ]

  const handleScan = () => {
    setScanning(true)
    
    // Simulate scanning delay
    setTimeout(() => {
      const randomClient = mockClients[Math.floor(Math.random() * mockClients.length)]
      setClientData(randomClient)
      setScanning(false)
      setScanned(true)
    }, 2000)
  }

  const handleClose = () => {
    setScanning(false)
    setScanned(false)
    setClientData(null)
    onClose()
  }

  const handleConfirmEntry = () => {
    // Simulate entry confirmation
    setTimeout(() => {
      handleClose()
    }, 1000)
  }

  useEffect(() => {
    if (isOpen) {
      setScanning(false)
      setScanned(false)
      setClientData(null)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-md border border-zinc-800"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-zinc-800">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <QrCode className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-montserrat font-bold">Escanear QR</h2>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {!scanning && !scanned && (
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-48 h-48 mx-auto bg-zinc-800 rounded-2xl flex items-center justify-center border-4 border-dashed border-zinc-700">
                    <QrCode className="w-24 h-24 text-zinc-600" />
                  </div>
                </div>
                <p className="text-zinc-400 mb-6">
                  Presiona el botón para activar el escáner y verificar el pase del cliente
                </p>
                <button
                  onClick={handleScan}
                  className="btn-primary w-full text-lg py-4"
                >
                  <QrCode className="w-5 h-5 inline mr-2" />
                  Activar Escáner
                </button>
              </div>
            )}

            {scanning && (
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-48 h-48 mx-auto bg-zinc-800 rounded-2xl flex items-center justify-center border-4 border-primary relative overflow-hidden">
                    <QrCode className="w-24 h-24 text-primary" />
                    {/* Scanning animation */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/30 to-transparent"
                      animate={{
                        y: ['-100%', '100%']
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'linear'
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-2 text-primary">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <p className="font-semibold">Escaneando código QR...</p>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                </div>
              </div>
            )}

            {scanned && clientData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Success Icon */}
                <div className="text-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                    className="w-20 h-20 mx-auto bg-green-500/10 rounded-full flex items-center justify-center mb-4"
                  >
                    <CheckCircle className="w-12 h-12 text-green-500" />
                  </motion.div>
                  <h3 className="text-2xl font-montserrat font-bold text-green-500 mb-2">
                    ¡Pase Válido!
                  </h3>
                  <p className="text-zinc-400">Cliente verificado correctamente</p>
                </div>

                {/* Client Info */}
                <div className="bg-zinc-800 rounded-xl p-6 mb-6">
                  {/* Photo and Name */}
                  <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-zinc-700">
                    <img
                      src={clientData.photo}
                      alt={clientData.name}
                      className="w-16 h-16 rounded-full border-2 border-primary"
                    />
                    <div>
                      <h4 className="text-xl font-montserrat font-bold text-light">
                        {clientData.name}
                      </h4>
                      <p className="text-sm text-zinc-400">ID: #{clientData.id.toString().padStart(6, '0')}</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-zinc-400">
                        <CreditCard className="w-4 h-4" />
                        <span className="text-sm">Membresía</span>
                      </div>
                      <span className="font-semibold text-primary">{clientData.membershipType}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-zinc-400">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">Estado</span>
                      </div>
                      <span className="font-semibold text-green-500">{clientData.membershipStatus}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-zinc-400">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">Válido hasta</span>
                      </div>
                      <span className="font-semibold text-light">{clientData.validUntil}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-zinc-400">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">Última visita</span>
                      </div>
                      <span className="font-semibold text-light">{clientData.lastVisit}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-zinc-400">
                        <User className="w-4 h-4" />
                        <span className="text-sm">Total visitas</span>
                      </div>
                      <span className="font-semibold text-light">{clientData.totalVisits}</span>
                    </div>
                  </div>
                </div>

                {/* Welcome Message */}
                <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 mb-6">
                  <p className="text-center text-primary font-semibold">
                    🎉 ¡Bienvenido/a {clientData.name.split(' ')[0]}! Que tengas un excelente entrenamiento.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <button
                    onClick={handleClose}
                    className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-light px-6 py-3 rounded-lg font-bold transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleConfirmEntry}
                    className="flex-1 btn-primary"
                  >
                    Confirmar Ingreso
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default QRScannerModal
