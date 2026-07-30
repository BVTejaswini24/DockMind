import { motion } from 'framer-motion'
import { MessageSquareText, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const chats = [
  { title: 'Q4 Financial Analysis', preview: 'What were the key revenue drivers in Q4?', time: '2 hours ago' },
  { title: 'Research Paper Summary', preview: 'Summarize the methodology used in this paper...', time: 'Yesterday' },
  { title: 'Meeting Notes Review', preview: 'Extract action items from the meeting notes...', time: '2 days ago' },
]

export default function RecentChats() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-white">Recent Chats</h2>
        <Link to="/chat" className="text-xs text-white/60 hover:text-white transition-colors">View all</Link>
      </div>

      <div className="space-y-2">
        {chats.map((chat, i) => (
          <motion.div
            key={chat.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center flex-shrink-0 mt-0.5">
              <MessageSquareText className="w-3.5 h-3.5 text-[#3054ff]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-medium text-white/80 truncate group-hover:text-white transition-colors">{chat.title}</h3>
                <span className="text-[11px] text-white/40 flex-shrink-0">{chat.time}</span>
              </div>
              <p className="text-xs text-white/50 mt-0.5 truncate">{chat.preview}</p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/60 transition-colors flex-shrink-0 mt-1" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
