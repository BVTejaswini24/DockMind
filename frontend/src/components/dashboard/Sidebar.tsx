import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, FolderOpen, MessageSquareText, Star,
  Settings, User, Brain, ChevronLeft, ChevronRight,
} from 'lucide-react'
import { cn } from '../../utils/cn'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Chat', href: '/chat', icon: FolderOpen },
  { label: 'Conversations', href: '/conversations', icon: MessageSquareText },
  { label: 'Favorites', href: '/dashboard', icon: Star },
  { label: 'Settings', href: '/settings', icon: Settings },
  { label: 'Profile', href: '/profile', icon: User },
]

export default function Sidebar() {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed left-0 top-0 h-full z-40 flex flex-col',
        'bg-[#0d0c10]/90 backdrop-blur-2xl border-r border-white/[0.04]',
        'transition-all duration-500 ease-out',
        collapsed ? 'w-16' : 'w-56'
      )}
    >
      <div className={cn(
        'flex items-center h-16 border-b border-white/[0.04]',
        collapsed ? 'justify-center' : 'px-4 gap-2.5'
      )}>
        <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
          <Brain className="w-3.5 h-3.5 text-blush-light" />
        </div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-sm font-semibold tracking-tight text-ink"
          >
            Doc<span className="text-blush-light">Mind</span>
          </motion.span>
        )}
      </div>

      <nav className="flex-1 py-4 space-y-0.5 px-2 overflow-y-auto scrollbar-thin">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 group relative',
                collapsed && 'justify-center px-2'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute inset-0 rounded-xl bg-blush/8 border border-blush/15"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon className={cn(
                'relative z-10 w-[17px] h-[17px] transition-colors duration-200',
                isActive ? 'text-blush-light' : 'text-beige-muted/40 group-hover:text-beige-muted/60'
              )} />
              {!collapsed && (
                <span className={cn(
                  'relative z-10 text-sm transition-colors duration-200',
                  isActive ? 'text-blush-light' : 'text-beige-muted/50 group-hover:text-beige-muted/70'
                )}>
                  {item.label}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-white/[0.04] p-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full py-2 rounded-xl text-beige-muted/30 hover:text-beige-muted/60 hover:bg-white/[0.03] transition-all duration-200"
        >
          {collapsed
            ? <ChevronRight className="w-3.5 h-3.5" />
            : <ChevronLeft className="w-3.5 h-3.5" />
          }
        </button>
      </div>
    </motion.aside>
  )
}
