import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MessageSquare, Clock, Hash, Plus, Trash2, Pencil, Search, Pin, Download } from 'lucide-react'
import { useApp } from '../contexts/AppContext'
import type { Conversation } from '../types'
import { Modal } from '../components/ui/Modal'
import { Button } from '../components/ui/Button'

type PinnedConversation = Conversation & { pinned?: boolean }

function generateId() {
  return Math.random().toString(36).substring(2, 11)
}

function formatTime(ts: number): string {
  const diff = Date.now() - ts
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
  return `${Math.floor(diff / 86400000)}d ago`
}

function startOfDay(date: Date): number {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}

interface ConversationGroup {
  label: string
  items: PinnedConversation[]
}

function groupConversations(convs: PinnedConversation[]): ConversationGroup[] {
  const now = Date.now()
  const todayStart = startOfDay(new Date(now))
  const yesterdayStart = todayStart - 86400000
  const weekStart = todayStart - 6 * 86400000

  const groups: Record<string, PinnedConversation[]> = {
    Today: [],
    Yesterday: [],
    'Last 7 Days': [],
    Older: [],
  }

  for (const conv of convs) {
    const ts = conv.updatedAt
    if (ts >= todayStart) groups['Today'].push(conv)
    else if (ts >= yesterdayStart) groups['Yesterday'].push(conv)
    else if (ts >= weekStart) groups['Last 7 Days'].push(conv)
    else groups['Older'].push(conv)
  }

  return [
    { label: 'Today', items: groups['Today'] },
    { label: 'Yesterday', items: groups['Yesterday'] },
    { label: 'Last 7 Days', items: groups['Last 7 Days'] },
    { label: 'Older', items: groups['Older'] },
  ].filter(g => g.items.length > 0)
}

function formatDateLong(ts: number): string {
  return new Date(ts).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })
}

function buildTranscript(conv: PinnedConversation): string {
  const lines: string[] = []
  lines.push(`# ${conv.title}`)
  lines.push(`Date: ${formatDateLong(conv.updatedAt)}`)
  lines.push('')
  for (const msg of conv.messages) {
    const role = msg.role === 'user' ? '## User' : '## Assistant'
    lines.push(role)
    lines.push('')
    lines.push(msg.content)
    if (msg.citations && msg.citations.length > 0) {
      lines.push('')
      lines.push(`Sources: ${msg.citations.map(c => c.documentName).join(', ')}`)
    }
    lines.push('')
  }
  return lines.join('\n')
}

function downloadFile(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function exportMarkdown(conv: PinnedConversation) {
  downloadFile(buildTranscript(conv), `${conv.title}.md`, 'text/markdown')
}

function exportTxt(conv: PinnedConversation) {
  const plain = buildTranscript(conv)
    .replace(/^# /gm, '')
    .replace(/^## /gm, '')
  downloadFile(plain, `${conv.title}.txt`, 'text/plain')
}

function exportPdf(conv: PinnedConversation) {
  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<title>${conv.title}</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 700px; margin: 40px auto; padding: 0 20px; color: #222; line-height: 1.6; }
  h1 { font-size: 22px; border-bottom: 1px solid #ddd; padding-bottom: 8px; }
  .date { color: #666; font-size: 13px; margin-bottom: 24px; }
  .msg { margin-bottom: 20px; }
  .role { font-weight: 600; font-size: 14px; margin-bottom: 4px; }
  .user { color: #3054ff; }
  .assistant { color: #222; }
  .content { font-size: 14px; white-space: pre-wrap; }
  .sources { font-size: 12px; color: #888; margin-top: 4px; }
</style></head><body>
<h1>${conv.title}</h1>
<div class="date">${formatDateLong(conv.updatedAt)}</div>
${conv.messages.map(m => `
<div class="msg">
  <div class="role ${m.role}">${m.role === 'user' ? 'User' : 'Assistant'}</div>
  <div class="content">${m.content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
  ${m.citations && m.citations.length > 0 ? `<div class="sources">Sources: ${m.citations.map(c => c.documentName).join(', ')}</div>` : ''}
</div>`).join('')}
</body></html>`
  const w = window.open('', '_blank')
  if (w) {
    w.document.write(html)
    w.document.close()
    w.print()
  }
}

export default function ConversationsPage() {
  const { state, setState } = useApp()
  const navigate = useNavigate()
  const conversations = state.conversations as PinnedConversation[]

  const handleNewConversation = () => {
    const newId = generateId()
    setState(prev => ({
      ...prev,
      currentConversationId: newId,
      conversations: [
        ...prev.conversations,
        {
          id: newId,
          title: 'New Chat',
          createdAt: Date.now(),
          updatedAt: Date.now(),
          messages: [],
          pinned: false,
        },
      ],
    }))
    navigate('/chat')
  }

  const handleOpenConversation = (id: string) => {
    setState(prev => ({
      ...prev,
      currentConversationId: id,
    }))
    navigate('/chat')
  }

  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [conversationToDelete, setConversationToDelete] = useState<string | null>(null)

  const [renameModalOpen, setRenameModalOpen] = useState(false)
  const [conversationToRename, setConversationToRename] = useState<string | null>(null)
  const [renameValue, setRenameValue] = useState('')

  const [searchQuery, setSearchQuery] = useState('')

  const [exportDropdownId, setExportDropdownId] = useState<string | null>(null)

  useEffect(() => {
    if (!exportDropdownId) return
    const handler = () => setExportDropdownId(null)
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [exportDropdownId])

  const filteredConversations = conversations
    .filter(conv => conv.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      const pinA = a.pinned ? 1 : 0
      const pinB = b.pinned ? 1 : 0
      if (pinA !== pinB) return pinB - pinA
      return b.updatedAt - a.updatedAt
    })

  const handleTogglePin = (id: string) => {
    setState(prev => ({
      ...prev,
      conversations: (prev.conversations as PinnedConversation[]).map(c =>
        c.id === id ? { ...c, pinned: !c.pinned } : c
      ),
    }))
  }

  const handleDeleteClick = (id: string) => {
    setConversationToDelete(id)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (!conversationToDelete) return

    setState(prev => {
      const remaining = prev.conversations.filter(c => c.id !== conversationToDelete)
      let newCurrentId = prev.currentConversationId

      if (prev.currentConversationId === conversationToDelete) {
        if (remaining.length > 0) {
          const mostRecent = remaining.reduce((latest, c) =>
            c.updatedAt > latest.updatedAt ? c : latest
          )
          newCurrentId = mostRecent.id
        } else {
          newCurrentId = null
        }
      }

      return {
        ...prev,
        conversations: remaining,
        currentConversationId: newCurrentId,
      }
    })

    setDeleteModalOpen(false)
    setConversationToDelete(null)
  }

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false)
    setConversationToDelete(null)
  }

  const handleRenameClick = (id: string, currentTitle: string) => {
    setConversationToRename(id)
    setRenameValue(currentTitle)
    setRenameModalOpen(true)
  }

  const handleRenameConfirm = () => {
    if (!conversationToRename) return

    const trimmed = renameValue.trim()

    if (!trimmed || trimmed.length > 100) return

    const conversation = conversations.find(c => c.id === conversationToRename)
    if (conversation && conversation.title === trimmed) {
      setRenameModalOpen(false)
      setConversationToRename(null)
      setRenameValue('')
      return
    }

    setState(prev => ({
      ...prev,
      conversations: prev.conversations.map(c =>
        c.id === conversationToRename ? { ...c, title: trimmed, isCustomTitle: true } : c
      ),
    }))

    setRenameModalOpen(false)
    setConversationToRename(null)
    setRenameValue('')
  }

  const handleRenameCancel = () => {
    setRenameModalOpen(false)
    setConversationToRename(null)
    setRenameValue('')
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-1"
      >
        <h1 className="text-body text-bone tracking-[-0.32px]">Conversations</h1>
        <p className="text-body-sm text-pale-stone">Your saved chat history</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
      >
        <button
          onClick={handleNewConversation}
          className="flex items-center gap-2 px-4 py-2.5 rounded-buttons bg-accent text-white text-body-sm hover:bg-accent/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Conversation
        </button>
      </motion.div>

      {conversations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.07 }}
          className="relative"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-pale-stone pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-11 pr-4 py-2.5 text-sm bg-transparent border border-white/[0.08] rounded-[10px] text-white/80 placeholder:text-white/30 focus:outline-none focus:border-[#3054ff]/30 transition-all duration-300"
          />
        </motion.div>
      )}

      {conversations.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-center py-16"
        >
          <div className="w-14 h-14 rounded-buttons bg-surface-muted border border-ash-stroke flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-6 h-6 text-pale-stone" />
          </div>
          <h3 className="text-body-sm text-bone">No conversations yet</h3>
          <p className="text-body-sm text-pale-stone mt-1">Start a new conversation or upload documents to begin.</p>
        </motion.div>
      ) : filteredConversations.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-center py-16"
        >
          <div className="w-14 h-14 rounded-buttons bg-surface-muted border border-ash-stroke flex items-center justify-center mx-auto mb-4">
            <Search className="w-6 h-6 text-pale-stone" />
          </div>
          <h3 className="text-body-sm text-bone">No conversations found</h3>
          <p className="text-body-sm text-pale-stone mt-1">Try a different search.</p>
        </motion.div>
      ) : (
        <div className="space-y-8">
          {groupConversations(filteredConversations).map((group) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h2 className="text-caption uppercase tracking-wider text-pale-stone mb-4">{group.label}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.items.map((conv) => (
                  <div
                    key={conv.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleOpenConversation(conv.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') handleOpenConversation(conv.id)
                    }}
                    className="card-elevated p-6 group hover:border-accent/30 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-buttons bg-accent/5 border border-accent/10 flex items-center justify-center shrink-0">
                        <MessageSquare className="w-4 h-4 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-body-sm text-bone truncate tracking-[-0.16px]">{conv.title}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="flex items-center gap-1 text-caption text-pale-stone">
                            <Clock className="w-3 h-3" />
                            {formatTime(conv.updatedAt)}
                          </span>
                          <span className="flex items-center gap-1 text-caption text-pale-stone">
                            <Hash className="w-3 h-3" />
                            {conv.messages.length}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleTogglePin(conv.id)
                        }}
                        className={`p-2 rounded-lg transition-colors relative z-10 ${
                          conv.pinned
                            ? 'text-accent hover:text-accent hover:bg-accent/10'
                            : 'text-pale-stone hover:text-accent hover:bg-accent/10 opacity-0 group-hover:opacity-100'
                        }`}
                      >
                        <Pin className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleRenameClick(conv.id, conv.title)
                        }}
                        className="p-2 rounded-lg text-pale-stone hover:text-accent hover:bg-accent/10 transition-colors opacity-0 group-hover:opacity-100 relative z-10"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleDeleteClick(conv.id)
                        }}
                        className="p-2 rounded-lg text-pale-stone hover:text-red-400 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100 relative z-10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="relative z-20">
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setExportDropdownId(prev => prev === conv.id ? null : conv.id)
                          }}
                          className="p-2 rounded-lg text-pale-stone hover:text-accent hover:bg-accent/10 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        {exportDropdownId === conv.id && (
                          <div className="absolute right-0 top-full mt-1 w-44 bg-[#1a1816] border border-white/[0.08] rounded-xl shadow-xl py-1 z-50">
                            <button
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                exportPdf(conv)
                                setExportDropdownId(null)
                              }}
                              className="w-full text-left px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/[0.05] transition-colors"
                            >
                              Export as PDF
                            </button>
                            <button
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                exportMarkdown(conv)
                                setExportDropdownId(null)
                              }}
                              className="w-full text-left px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/[0.05] transition-colors"
                            >
                              Export as Markdown
                            </button>
                            <button
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                exportTxt(conv)
                                setExportDropdownId(null)
                              }}
                              className="w-full text-left px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/[0.05] transition-colors"
                            >
                              Export as TXT
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <Modal open={deleteModalOpen} onClose={handleDeleteCancel}>
        <div className="p-6">
          <h2 className="text-body text-bone tracking-[-0.32px] mb-2">Delete this conversation?</h2>
          <p className="text-body-sm text-pale-stone mb-6">
            This action cannot be undone. The conversation and all its messages will be permanently deleted.
          </p>
          <div className="flex items-center gap-3 justify-end">
            <Button variant="secondary" onClick={handleDeleteCancel}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>

      <Modal open={renameModalOpen} onClose={handleRenameCancel}>
        <div className="p-6">
          <h2 className="text-body text-bone tracking-[-0.32px] mb-4">Rename Conversation</h2>
          <input
            type="text"
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleRenameConfirm()
            }}
            maxLength={100}
            autoFocus
            className="w-full px-4 py-2.5 text-sm bg-transparent border border-white/[0.08] rounded-[10px] text-white/80 placeholder:text-white/30 focus:outline-none focus:border-[#3054ff]/30 transition-all duration-300"
            placeholder="Enter conversation title"
          />
          {renameValue.trim().length === 0 && renameValue.length > 0 && (
            <p className="text-xs text-red-400/80 mt-1.5">Title cannot be empty</p>
          )}
          <div className="flex items-center gap-3 justify-end mt-6">
            <Button variant="secondary" onClick={handleRenameCancel}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleRenameConfirm}
              disabled={!renameValue.trim() || renameValue.trim().length > 100}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
