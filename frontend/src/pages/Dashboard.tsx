import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui'
import { MessageSquare, Upload, Clock, Pin } from 'lucide-react'
import { useApp } from '../contexts/AppContext'

function formatTimeAgo(ts: number): string {
  const diff = Date.now() - ts
  if (diff < 60000) return 'Just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
  return `${Math.floor(diff / 86400000)}d ago`
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function DashboardPage() {
  const { state } = useApp()
  const navigate = useNavigate()

  const totalDocuments = state.documents.length
  const totalConversations = state.conversations.length
  const totalQuestions = state.conversations.reduce(
    (sum, conv) => sum + conv.messages.filter(m => m.role === 'user').length,
    0
  )
  const totalPinned = state.conversations.filter(
    c => (c as any).pinned === true
  ).length
  const lastUploadDate = state.documents.length > 0
    ? Math.max(...state.documents.map(d => d.uploadedAt))
    : null

  const stats = [
    { label: 'Total Documents', value: String(totalDocuments) },
    { label: 'Total Chats', value: String(totalConversations) },
    { label: 'Questions Asked', value: String(totalQuestions) },
    { label: 'Pinned Chats', value: String(totalPinned) },
    { label: 'Last Upload', value: lastUploadDate !== null ? formatDate(lastUploadDate) : 'No uploads' },
  ]

  const recentActivity = [
    ...state.documents
      .map(d => ({ action: `Uploaded ${d.name}`, time: d.uploadedAt, type: 'upload' as const })),
    ...state.conversations
      .filter(c => c.messages.length > 0)
      .map(c => ({ action: `Chat: ${c.title}`, time: c.updatedAt, type: 'chat' as const })),
  ]
    .sort((a, b) => b.time - a.time)
    .slice(0, 5)

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-1"
      >
        <h1 className="text-base text-white tracking-[-0.32px]">Dashboard</h1>
        <p className="text-sm text-white/60">Overview of your document Q&A activity</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="flex items-center gap-4"
      >
        <Button variant="primary" icon={<MessageSquare className="w-4 h-4" />} onClick={() => navigate("/conversations")}>New Chat</Button>
        <Button variant="secondary" icon={<Upload className="w-4 h-4" />} onClick={() => navigate("/chat")}>Upload Document</Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white/[0.04] border border-white/[0.08] rounded-2xl backdrop-blur-xl p-6">
            <p className="text-xs text-white/60 uppercase tracking-[-0.24px]">{stat.label}</p>
            <p className="text-base text-white mt-3 tracking-[-0.16px]">{stat.value}</p>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
      >
        <h2 className="text-sm text-white mb-4 tracking-[-0.16px]">Recent Activity</h2>
        {recentActivity.length === 0 ? (
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl backdrop-blur-xl px-6 py-8 text-center">
            <p className="text-sm text-white/40">No activity yet. Upload a document or start a chat to get started.</p>
          </div>
        ) : (
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl backdrop-blur-xl divide-y divide-white/[0.08]">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-4">
                <span className="text-sm text-white/60">{item.action}</span>
                <span className="text-sm text-white/60 shrink-0 ml-6">{formatTimeAgo(item.time)}</span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
