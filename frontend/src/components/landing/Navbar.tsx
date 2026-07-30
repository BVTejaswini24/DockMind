import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Sun, Menu, X } from 'lucide-react'

const links = [
  { label: 'AI Chat', href: '#features' },
  { label: 'Documents', href: '#testimonials' },
  { label: 'Knowledge Base', href: '#faq' },
  { label: 'Pricing', href: '#pricing' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Sun className="w-6 h-6 text-white" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors font-['Instrument_Sans']"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-4">
          <span className="text-sm text-white/80 font-['Instrument_Sans']">Documentation</span>
          <Link
            to="/signup"
            className="bg-white text-black rounded-full px-5 py-2.5 font-semibold text-sm font-['Instrument_Sans'] hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/95" onClick={() => setMobileOpen(false)} />
          <nav className="relative z-10 flex flex-col items-center justify-center h-full gap-8 px-8">
            {links.map(l => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="text-lg font-['Instrument_Sans'] text-white/80 hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-8 flex flex-col items-center gap-4">
              <Link
                to="/signup"
                onClick={() => setMobileOpen(false)}
                className="bg-white text-black rounded-full px-6 py-3 font-semibold font-['Instrument_Sans']"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
