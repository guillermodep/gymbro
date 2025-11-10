import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, FileText, CheckCircle2 } from 'lucide-react'

const TermsModal = ({ isOpen, onClose, onAccept, type = 'user' }) => {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false)
  const [termsContent, setTermsContent] = useState('')

  useEffect(() => {
    if (isOpen) {
      // Load the appropriate terms contract from public folder
      const contractPath = type === 'user' 
        ? '/contracts/user_contract.md'
        : '/contracts/gym_contract.md'
      
      fetch(contractPath)
        .then(res => {
          if (!res.ok) throw new Error('Failed to load contract')
          return res.text()
        })
        .then(text => {
          // Format the markdown for better display
          setTermsContent(text)
        })
        .catch(err => {
          console.error('Error loading terms:', err)
          setTermsContent('Error al cargar los términos y condiciones. Por favor, intenta de nuevo.')
        })
      
      setHasScrolledToBottom(false)
    }
  }, [isOpen, type])

  const handleScroll = (e) => {
    const element = e.target
    const isAtBottom = Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 10
    if (isAtBottom && !hasScrolledToBottom) {
      setHasScrolledToBottom(true)
    }
  }

  const handleAccept = () => {
    if (hasScrolledToBottom) {
      onAccept()
      onClose()
    }
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
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-800 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-zinc-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-montserrat font-bold text-light">
                  Términos y Condiciones
                </h2>
                <p className="text-sm text-zinc-400">
                  {type === 'user' 
                    ? 'Para Usuarios de GymBro'
                    : 'Para Gimnasios y Centros Afiliados'
                  }
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-zinc-400" />
            </button>
          </div>

          {/* Content */}
          <div
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto p-6 space-y-4"
          >
            <div className="prose prose-invert prose-zinc max-w-none">
              <div className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-300">
                {termsContent || (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Scroll indicator */}
            {!hasScrolledToBottom && termsContent && (
              <div className="sticky bottom-0 left-0 right-0 bg-gradient-to-t from-zinc-900 via-zinc-900/95 to-transparent pt-8 pb-4 text-center">
                <motion.p
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-sm text-zinc-400"
                >
                  ↓ Desplázate hasta el final para continuar ↓
                </motion.p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {hasScrolledToBottom ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-green-500 font-medium">
                      Has leído los términos completos
                    </span>
                  </>
                ) : (
                  <>
                    <div className="w-5 h-5 rounded-full border-2 border-zinc-600" />
                    <span className="text-sm text-zinc-400">
                      Lee hasta el final para aceptar
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-light font-semibold transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAccept}
                  disabled={!hasScrolledToBottom}
                  className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
                    hasScrolledToBottom
                      ? 'bg-primary hover:bg-primary-dark text-dark cursor-pointer'
                      : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  }`}
                >
                  Aceptar y Continuar
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default TermsModal
