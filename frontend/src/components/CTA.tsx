import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function CTA() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="py-20 sm:py-32">
      <div ref={ref} className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-dark-800 via-dark-900 to-dark-800 border border-white/5 p-8 sm:p-12 lg:p-16"
        >
          {/* Background glow */}
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-accent/10 blur-[100px]" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-500/10 blur-[100px]" />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-sm text-accent-300 mb-8"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start your free trial</span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
              Ready to understand your{' '}
              <span className="gradient-text">documents instantly</span>?
            </h2>

            <p className="mt-6 text-lg text-dark-300 max-w-xl mx-auto">
              Join thousands of teams using DocMind AI to transform how they interact with their documents. No credit card required.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href="#"
                className="group relative px-8 py-4 text-base font-semibold text-white rounded-2xl bg-gradient-to-r from-accent to-purple-600 hover:from-accent-600 hover:to-purple-700 transition-all duration-500 shadow-2xl shadow-accent/25 hover:shadow-accent/40 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </a>

              <a
                href="#features"
                className="px-8 py-4 text-base font-medium text-dark-200 rounded-2xl glass border border-white/5 hover:border-white/10 hover:text-white transition-all duration-300"
              >
                Learn More
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
