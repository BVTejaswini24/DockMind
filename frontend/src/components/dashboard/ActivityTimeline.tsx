import { motion } from 'framer-motion'
import { Upload, MessageSquareText, Trash2, FileText } from 'lucide-react'

const activities = [
  { icon: Upload, label: 'Uploaded Q4_Financial_Report.pdf', time: '2 hours ago' },
  { icon: MessageSquareText, label: 'Started chat "Q4 Financial Analysis"', time: '1 hour ago' },
  { icon: FileText, label: 'Indexed Research_Paper_2024.pdf', time: 'Yesterday' },
  { icon: Trash2, label: 'Deleted draft_report_v3.docx', time: '2 days ago' },
]

export default function ActivityTimeline() {
  return (
    <section>
      <h2 className="text-sm font-semibold text-white mb-4">Recent Activity</h2>
      <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl backdrop-blur-xl p-4 space-y-0">
        {activities.map((activity, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="flex items-start gap-3 py-3 border-b border-white/[0.06] last:border-0"
          >
            <div className="w-7 h-7 rounded-lg bg-[#3054ff]/10 flex items-center justify-center flex-shrink-0">
              <activity.icon className="w-3.5 h-3.5 text-[#3054ff]" />
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <p className="text-sm text-white/80">{activity.label}</p>
              <p className="text-[11px] text-white/40 mt-0.5">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
