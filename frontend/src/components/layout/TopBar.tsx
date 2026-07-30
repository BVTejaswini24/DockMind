import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings, LogOut, User, ChevronDown } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { cn } from '../../utils/cn'

interface TopBarProps {
  onMenuClick?: () => void
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="h-14 shrink-0 border-b border-white/[0.06] bg-black flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-white/40 hover:text-white/80 rounded-[10px] hover:bg-white/[0.03] transition-colors duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 5h12M3 9h12M3 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
        <div className="text-xs text-white/40" />
      </div>

      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-[10px] hover:bg-white/[0.03] transition-colors duration-300 group"
        >
          <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-xs text-white/70">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <span className="text-sm text-white/55 hidden sm:block">{user?.name}</span>
          <ChevronDown className={cn('w-3.5 h-3.5 text-white/40 transition-transform duration-300', menuOpen && 'rotate-180')} />
        </button>

        <AnimatePresence>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                className="absolute right-0 top-full mt-1.5 w-48 bg-black border border-white/[0.08] rounded-xl z-50 overflow-hidden"
              >
                <div className="p-1.5 space-y-0.5">
                  <button
                    onClick={() => { setMenuOpen(false); navigate('/profile') }}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-[10px] text-sm text-white/55 hover:text-white hover:bg-white/[0.03] transition-colors duration-300"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </button>
                  <button
                    onClick={() => { setMenuOpen(false); navigate('/settings') }}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-[10px] text-sm text-white/55 hover:text-white hover:bg-white/[0.03] transition-colors duration-300"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                  <div className="my-1 h-px bg-white/[0.06]" />
                  <button
                    onClick={() => { setMenuOpen(false); logout(); navigate('/') }}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-[10px] text-sm text-red-400/80 hover:bg-white/[0.03] transition-colors duration-300"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
