import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, FileText, Settings,
  PanelLeftClose, PanelLeft,
  BookOpen, MessageSquareText,
} from 'lucide-react'
import { cn } from '../../utils/cn'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/chat', icon: FileText, label: 'Chat' },
  { to: '/conversations', icon: MessageSquareText, label: 'Conversations' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  onMobileClose?: () => void
}

export function Sidebar({ collapsed, onToggle, onMobileClose }: SidebarProps) {
  return (
    <aside className={cn(
      'h-full flex flex-col bg-black border-r border-white/[0.08] transition-all duration-300',
      collapsed ? 'w-16' : 'w-60',
    )}>
      <div className="flex items-center justify-between px-4 h-14 border-b border-white/[0.06] shrink-0">
        {!collapsed && (
          <NavLink to="/dashboard" onClick={onMobileClose} className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
              <BookOpen className="w-3.5 h-3.5 text-white/80" />
            </div>
            <span className="text-sm text-white/80 tracking-tight">DocMind</span>
          </NavLink>
        )}
        <button
          onClick={onToggle}
          className={cn(
            'text-white/40 hover:text-white/80 transition-colors rounded-lg p-1.5 hover:bg-white/[0.03]',
            collapsed && 'mx-auto'
          )}
        >
          {collapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-6 space-y-1">
        {collapsed ? (
          <div className="space-y-2">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onMobileClose}
                className={({ isActive }) => cn(
                  'flex items-center justify-center w-full py-2.5 rounded-[10px] transition-colors duration-300',
                  isActive
                    ? 'bg-[#3054ff] text-white'
                    : 'text-white/55 hover:text-white hover:bg-white/[0.03]'
                )}
              >
                <item.icon className="w-4 h-4" />
              </NavLink>
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onMobileClose}
                className={({ isActive }) => cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm transition-colors duration-300',
                  isActive
                    ? 'bg-[#3054ff] text-white'
                    : 'text-white/55 hover:text-white hover:bg-white/[0.03]'
                )}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {item.label}
              </NavLink>
            ))}
          </div>
        )}
      </nav>
    </aside>
  )
}
