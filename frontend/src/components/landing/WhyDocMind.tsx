import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { Search, Clock, BookOpen, Zap } from 'lucide-react'

const comparisons = [
  {
    traditional: { icon: Search, text: 'Manual keyword search' },
    docmind: { icon: Zap, text: 'Semantic AI search' },
  },
  {
    traditional: { icon: Clock, text: 'Hours of reading' },
    docmind: { icon: Zap, text: 'Instant answers in seconds' },
  },
  {
    traditional: { icon: BookOpen, text: 'Single document at a time' },
    docmind: { icon: Zap, text: 'Multi-document intelligence' },
  },
]

export default function WhyDocMind() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="py-24 sm:py-32 relative">
      <div ref={ref} className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            Why <span className="gradient-text">DocMind AI</span>?
          </h2>
          <p className="section-subtitle mt-4">
            Stop wasting hours — let AI do the reading.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-3">
            {comparisons.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="grid grid-cols-2 gap-3"
              >
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center gap-3">
                    <row.traditional.icon className="w-4 h-4 text-beige-muted/20" />
                    <span className="text-sm text-beige-muted/40">{row.traditional.text}</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-blush/[0.03] border border-blush/10">
                  <div className="flex items-center gap-3">
                    <row.docmind.icon className="w-4 h-4 text-blush-light/60" />
                    <span className="text-sm text-blush-light font-medium">{row.docmind.text}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
