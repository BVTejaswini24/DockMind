import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, ChevronDown, LogOut, Settings, User } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import CommandPalette from '../ui/CommandPalette'
import { motion, AnimatePresence } from 'framer-motion'

const notifications = [
  { id: 1, text: 'Q4_Report.pdf processed successfully', time: '10 min ago' },
  { id: 2, text: 'New chat: Annual report analysis', time: '1h ago' },
  { id: 3, text: 'Research_Paper.pdf uploaded', time: '3h ago' },
]

export default function TopNavbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [bellOpen, setBellOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)

  const bellRef = useRef<HTMLDivElement>(null)
  const userRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) setBellOpen(false)
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U'

  return (
    <header className="sticky top-0 z-30 h-14 bg-[#0a0a0f]/70 backdrop-blur-2xl border-b border-white/[0.04]">
      <div className="flex items-center justify-between h-full px-4 sm:px-6 gap-4">
        <div className="flex-1 max-w-sm">
          <CommandPalette />
        </div>

        <div className="flex items-center gap-1.5">
          {/* Notification Bell */}
          <div ref={bellRef} className="relative">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => { setBellOpen(v => !v); setUserOpen(false) }}
              className="relative w-8 h-8 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-center text-beige-muted/40 hover:text-beige-muted/60 hover:bg-white/[0.04] transition-all duration-200"
            >
              <Bell className="w-3.5 h-3.5" />
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-blush/20 text-[8px] font-semibold text-blush-light flex items-center justify-center">
                {notifications.length}
              </span>
            </motion.button>

            <AnimatePresence>
              {bellOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-72 bg-[#141318] border border-white/[0.08] rounded-xl shadow-2xl overflow-hidden z-50"
                >
                  <div className="px-4 py-3 border-b border-white/[0.06]">
                    <p className="text-xs font-medium text-bone">Notifications</p>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className="px-4 py-3 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                        <p className="text-xs text-bone">{n.text}</p>
                        <p className="text-[10px] text-pale-stone mt-1">{n.time}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu */}
          <div ref={userRef} className="relative">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => { setUserOpen(v => !v); setBellOpen(false) }}
              className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-200"
            >
              <div className="w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[9px] font-semibold text-blush-light">
                {initials}
              </div>
              <span className="text-xs text-beige-muted/60 hidden sm:block">{user?.name || 'User'}</span>
              <ChevronDown className="w-3 h-3 text-beige-muted/30" />
            </motion.button>

            <AnimatePresence>
              {userOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-[#141318] border border-white/[0.08] rounded-xl shadow-2xl overflow-hidden z-50"
                >
                  <button
                    onClick={() => { navigate('/profile'); setUserOpen(false) }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-bone hover:bg-white/[0.04] transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-pale-stone" />
                    Profile
                  </button>
                  <button
                    onClick={() => { navigate('/settings'); setUserOpen(false) }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-bone hover:bg-white/[0.04] transition-colors"
                  >
                    <Settings className="w-3.5 h-3.5 text-pale-stone" />
                    Settings
                  </button>
                  <div className="border-t border-white/[0.06]" />
                  <button
                    onClick={() => { logout(); setUserOpen(false) }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-status-error hover:bg-white/[0.04] transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}
