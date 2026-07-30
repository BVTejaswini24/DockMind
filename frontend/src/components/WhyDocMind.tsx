import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { X, Check, Search, Clock, BookOpen, Zap } from 'lucide-react'

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
    <section className="py-20 sm:py-32">
      <div ref={ref} className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
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

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="grid grid-cols-2 gap-4 mb-6 px-4">
            <div className="flex items-center gap-3 py-3 px-4 rounded-xl bg-red-500/5 border border-red-500/10">
              <X className="w-5 h-5 text-red-400" />
              <span className="text-sm font-medium text-red-300">Traditional Approach</span>
            </div>
            <div className="flex items-center gap-3 py-3 px-4 rounded-xl bg-green-500/5 border border-green-500/10">
              <Check className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium text-green-300">DocMind AI</span>
            </div>
          </div>

          {/* Rows */}
          <div className="space-y-3">
            {comparisons.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="p-4 sm:p-5 rounded-xl bg-dark-800/30 border border-white/5">
                  <div className="flex items-center gap-3">
                    <row.traditional.icon className="w-5 h-5 text-dark-500" />
                    <span className="text-dark-400 text-sm sm:text-base">{row.traditional.text}</span>
                  </div>
                </div>
                <div className="p-4 sm:p-5 rounded-xl bg-accent/5 border border-accent/10">
                  <div className="flex items-center gap-3">
                    <row.docmind.icon className="w-5 h-5 text-accent-300" />
                    <span className="text-white text-sm sm:text-base font-medium">{row.docmind.text}</span>
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
