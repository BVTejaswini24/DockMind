import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function ProductShowcase() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.05 })

  return (
    <section className="py-20 sm:py-32 overflow-hidden">
      <div ref={ref} className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            See it in <span className="gradient-text">action</span>
          </h2>
          <p className="section-subtitle mt-4">
            A clean, intuitive interface designed for productivity.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative mx-auto max-w-5xl"
        >
          {/* Laptop mockup */}
          <div className="relative">
            {/* Screen */}
            <div className="relative rounded-t-2xl overflow-hidden bg-dark-800 border border-white/5 shadow-2xl">
              <div className="absolute top-0 left-0 right-0 h-6 bg-dark-700 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="pt-6 bg-dark-900 p-6 sm:p-10">
                <div className="grid grid-cols-12 gap-4 min-h-[300px] sm:min-h-[400px]">
                  {/* Sidebar */}
                  <div className="col-span-3 space-y-3">
                    <div className="h-8 w-full rounded-lg bg-dark-700/50" />
                    <div className="h-8 w-3/4 rounded-lg bg-dark-700/50" />
                    <div className="h-8 w-5/6 rounded-lg bg-dark-700/50" />
                    <div className="h-8 w-2/3 rounded-lg bg-dark-700/30" />
                    <div className="mt-6 space-y-2">
                      <div className="h-2 w-full rounded bg-accent/30" />
                      <div className="h-2 w-5/6 rounded bg-dark-700/30" />
                      <div className="h-2 w-4/6 rounded bg-dark-700/30" />
                    </div>
                  </div>
                  {/* Main area */}
                  <div className="col-span-9 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                        <div className="w-4 h-0.5 bg-accent-300 rounded" />
                      </div>
                      <div>
                        <div className="h-3 w-40 rounded bg-accent/30" />
                        <div className="h-2 w-24 rounded bg-dark-700/30 mt-1" />
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-dark-800/50 border border-white/5">
                      <div className="space-y-2">
                        <div className="h-3 w-full rounded bg-dark-600/50" />
                        <div className="h-3 w-5/6 rounded bg-dark-600/50" />
                        <div className="h-3 w-4/6 rounded bg-dark-600/50" />
                      </div>
                    </div>
                    <div className="p-4 rounded-xl glass border border-accent/10">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-accent flex-shrink-0 flex items-center justify-center">
                          <div className="w-3 h-3 text-white font-bold text-xs">AI</div>
                        </div>
                        <div className="space-y-2 flex-1">
                          <div className="h-3 w-full rounded bg-accent/20" />
                          <div className="h-3 w-5/6 rounded bg-accent/20" />
                          <div className="h-3 w-3/4 rounded bg-accent/20" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Base */}
            <div className="h-3 bg-dark-700 rounded-b-2xl mx-auto w-[102%] -ml-[1%]" />
            {/* Glow */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-20 bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 blur-3xl" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
