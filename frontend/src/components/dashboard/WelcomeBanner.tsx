import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export default function WelcomeBanner() {
  const { user } = useAuth()

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white/[0.04] border border-white/[0.08] rounded-2xl backdrop-blur-xl p-6 sm:p-8"
    >
      <div className="space-y-2">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
          Welcome back,{' '}
          <span className="text-[#3054ff]">{user?.name || 'there'}</span>
        </h1>
        <p className="text-sm text-white/60 max-w-lg">
          Your documents are ready. Ask questions, explore insights, and get answers in seconds.
        </p>
      </div>
    </motion.div>
  )
}
