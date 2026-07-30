import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Home } from 'lucide-react'
import { Button } from '../components/ui'

export default function NotFoundPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-obsidian-canvas p-8">
      <div className="absolute inset-0 bg-noise pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="relative z-10 text-center max-w-md"
      >
        <div className="w-14 h-14 rounded-buttons bg-carbon-lift flex items-center justify-center mx-auto mb-6">
          <BookOpen className="w-6 h-6 text-accent/60" />
        </div>
        <h1 className="text-7xl tracking-[-0.64px] text-bone">404</h1>
        <p className="text-body text-pale-stone mt-4 mb-1">This page doesn't exist.</p>
        <p className="text-body-sm text-graphite-mid mb-10">The page you're looking for was moved, removed, or never existed.</p>
        <Link to="/"><Button variant="primary" icon={<Home className="w-3.5 h-3.5" />}>Go Home</Button></Link>
      </motion.div>
    </div>
  )
}
