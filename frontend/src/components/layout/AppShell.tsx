import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { MobileDrawer } from './MobileDrawer'
import { cn } from '../../utils/cn'

export function AppShell() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black flex">
      {/* Desktop sidebar */}
      <div className={cn(
        'hidden lg:block fixed inset-y-0 left-0 z-30 transition-all duration-300',
        sidebarCollapsed ? 'w-16' : 'w-60'
      )}>
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Mobile drawer */}
      <MobileDrawer open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Main area */}
      <div className={cn(
        'flex-1 flex flex-col min-h-screen transition-all duration-300 relative z-10',
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
      )}>
        <TopBar onMenuClick={() => setMobileMenuOpen(true)} />
        <main className="flex-1 min-h-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
