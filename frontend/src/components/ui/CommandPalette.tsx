import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowRight, LayoutDashboard, FolderOpen, MessageSquareText, Settings, User, FileText, Star, History, Command } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '../../utils/cn'

interface CommandItem {
  id: string
  label: string
  description?: string
  icon: React.ElementType
  href: string
}

const commands: CommandItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { id: 'documents', label: 'Documents', icon: FolderOpen, href: '/documents' },
  { id: 'chat', label: 'AI Chat', icon: MessageSquareText, href: '/chat' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
  { id: 'profile', label: 'Profile', icon: User, href: '/profile' },
  { id: 'upload', label: 'Upload Document', description: 'Add a new document', icon: FileText, href: '/documents' },
  { id: 'favorites', label: 'Favorites', icon: Star, href: '/dashboard' },
  { id: 'history', label: 'Chat History', icon: History, href: '/chat' },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const toggle = useCallback(() => {
    setOpen(prev => !prev)
    setQuery('')
    setSelectedIndex(0)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        toggle()
      }
      if (e.key === 'Escape' && open) setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, toggle])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open])

  const filtered = query.trim()
    ? commands.filter(c =>
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        c.description?.toLowerCase().includes(query.toLowerCase())
      )
    : commands

  const handleSelect = (item: CommandItem) => {
    setOpen(false)
    navigate(item.href)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(i => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      handleSelect(filtered[selectedIndex])
    }
  }

  return (
    <>
      <button
        onClick={toggle}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-beige-muted/40 bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] hover:text-beige-muted/60 transition-all duration-200"
      >
        <Search className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/[0.04] text-[10px] font-medium text-beige-muted/40">
          <Command className="w-2.5 h-2.5" />K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[15vh]"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="w-full max-w-lg bg-[#0d0c10]/95 backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 px-4 border-b border-white/[0.04]">
                <Search className="w-4 h-4 text-beige-muted/40 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search pages, actions..."
                  value={query}
                  onChange={e => { setQuery(e.target.value); setSelectedIndex(0) }}
                  onKeyDown={handleKeyDown}
                  className="flex-1 py-3.5 bg-transparent text-sm text-beige-light placeholder:text-beige-muted/30 focus:outline-none"
                />
                <kbd className="text-[10px] text-beige-muted/40 bg-white/[0.04] px-1.5 py-0.5 rounded font-medium">ESC</kbd>
              </div>

              <div className="max-h-72 overflow-y-auto py-2 scrollbar-thin">
                {filtered.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-beige-muted/40">
                    No results for "{query}"
                  </div>
                ) : (
                  filtered.map((item, i) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      className={cn(
                        'w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150',
                        i === selectedIndex
                          ? 'bg-blush/8 text-blush-light'
                          : 'text-beige-muted/60 hover:bg-white/[0.03] hover:text-beige-light'
                      )}
                      onMouseEnter={() => setSelectedIndex(i)}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <div className="flex-1 text-left">
                        <span>{item.label}</span>
                        {item.description && (
                          <span className="text-beige-muted/40 ml-2 text-xs">{item.description}</span>
                        )}
                      </div>
                      {i === selectedIndex && (
                        <ArrowRight className="w-3.5 h-3.5 text-blush-light" />
                      )}
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
