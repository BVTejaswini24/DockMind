import { motion } from 'framer-motion'
import { TrendingUp, type LucideIcon } from 'lucide-react'

interface StatsCardProps {
  icon: LucideIcon
  label: string
  value: string
  trend: string
  index: number
}

export default function StatsCard({ icon: Icon, label, value, trend, index }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white/[0.04] border border-white/[0.08] rounded-2xl backdrop-blur-xl p-5"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
          <Icon className="w-4 h-4 text-[#3054ff]" />
        </div>
        <span className="flex items-center gap-1 text-[11px] text-white/60 font-medium">
          <TrendingUp className="w-3 h-3" />
          {trend}
        </span>
      </div>
      <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">{value}</div>
      <div className="text-xs text-white/60 mt-0.5">{label}</div>
    </motion.div>
  )
}
