import { motion } from 'framer-motion'
import { Upload, MessageSquareText, FolderOpen, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

const actions = [
  { icon: Upload, label: 'Upload Document', desc: 'Add new files to your workspace', href: '/documents' },
  { icon: MessageSquareText, label: 'Start New Chat', desc: 'Ask questions about your documents', href: '/chat' },
  { icon: FolderOpen, label: 'Browse Documents', desc: 'View and manage your files', href: '/documents' },
  { icon: Clock, label: 'Recent Conversations', desc: 'Pick up where you left off', href: '/chat' },
]

export default function QuickActions() {
  return (
    <section>
      <h2 className="text-sm font-semibold text-white mb-4">Quick Actions</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {actions.map((action, i) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              to={action.href}
              className="group block bg-white/[0.04] border border-white/[0.08] rounded-2xl backdrop-blur-xl p-4 hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-3 group-hover:border-white/[0.12] transition-colors">
                <action.icon className="w-4 h-4 text-[#3054ff]" />
              </div>
              <h3 className="text-sm font-medium text-white group-hover:text-white transition-colors">{action.label}</h3>
              <p className="text-xs text-white/50 mt-1">{action.desc}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
