import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Brain, Github, LogIn } from 'lucide-react'
import { cn } from '../utils/cn'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-dark-950/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 sm:h-20">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center shadow-lg shadow-accent/20 group-hover:shadow-accent/40 transition-shadow">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            Doc<span className="gradient-text">Mind</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-dark-300 hover:text-white transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark-300 hover:text-white transition-colors duration-300"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="text-sm text-dark-300 hover:text-white transition-colors duration-300 flex items-center gap-1.5"
          >
            <LogIn className="w-4 h-4" />
            Login
          </a>
          <a
            href="#"
            className="relative px-5 py-2.5 text-sm font-medium text-white rounded-xl bg-gradient-to-r from-accent to-purple-600 hover:from-accent-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-accent/40"
          >
            Get Started
          </a>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-dark-300 hover:text-white transition-colors"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-900/95 backdrop-blur-xl border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-dark-300 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <hr className="border-dark-700/50" />
              <a
                href="#"
                className="flex items-center gap-2 text-dark-300 hover:text-white transition-colors"
              >
                <LogIn className="w-4 h-4" /> Login
              </a>
              <a
                href="#"
                className="block text-center px-5 py-3 rounded-xl bg-gradient-to-r from-accent to-purple-600 font-medium"
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
