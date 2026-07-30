import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
  title: string
  subtitle: string
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black p-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="relative z-10 w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-[10px] bg-white/[0.04] flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-[#3054ff]" />
            </div>
            <span className="text-sm tracking-[-0.24px] text-white/80">
              Doc<span className="text-[#3054ff]">Mind</span>
            </span>
          </Link>
        </div>

        <div className="bg-[#0B0B0B] border border-white/[0.08] rounded-xl p-8">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h1 className="text-xl tracking-[-0.32px] text-white/80 text-center">
              {title}
            </h1>
            <p className="text-white/55 text-center text-sm mt-1.5 mb-7">
              {subtitle}
            </p>
          </motion.div>

          {children}
        </div>
      </motion.div>
    </div>
  )
}
