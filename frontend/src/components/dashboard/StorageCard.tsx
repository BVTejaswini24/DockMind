import { motion } from 'framer-motion'
import { HardDrive } from 'lucide-react'

export default function StorageCard() {
  const used = 2.4
  const total = 10
  const percent = (used / total) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white/[0.04] border border-white/[0.08] rounded-2xl backdrop-blur-xl p-5"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
          <HardDrive className="w-4 h-4 text-[#3054ff]" />
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Storage</div>
          <div className="text-xs text-white/40">{used} GB of {total} GB used</div>
        </div>
      </div>

      <div className="w-full h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
          className="h-full rounded-full bg-[#3054ff]"
        />
      </div>

      <div className="mt-4 space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-white/40">Documents</span>
          <span className="text-white/60">1.8 GB</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-white/40">Vector stores</span>
          <span className="text-white/60">0.6 GB</span>
        </div>
      </div>
    </motion.div>
  )
}
