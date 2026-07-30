import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CTA() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="py-24 sm:py-32 relative">
      <div ref={ref} className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.02] via-white/[0.01] to-white/[0.02] border border-white/[0.06] p-8 sm:p-12 lg:p-16"
        >
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blush/[0.04] blur-[100px]" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-lavender/[0.04] blur-[100px]" />
          <div className="absolute inset-0 bg-noise" />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blush/8 border border-blush/15 text-xs text-blush-light/80 mb-8"
            >
              <span>Start your free trial</span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance text-ink">
              Ready to understand your{' '}
              <span className="gradient-text">documents instantly</span>?
            </h2>

            <p className="mt-6 text-base sm:text-lg text-beige-muted/60 max-w-xl mx-auto leading-relaxed">
              Join thousands of teams using DocMind AI to transform how they interact with their documents. No credit card required.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/chat"
                className="group relative px-7 py-3.5 text-sm font-medium text-blush-light bg-blush/10 border border-blush/20 rounded-xl hover:bg-blush/15 hover:border-blush/30 transition-all duration-500"
              >
                <span className="flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
              <a href="#features" className="px-7 py-3.5 text-sm font-medium text-beige-muted/60 bg-white/[0.03] border border-white/[0.06] rounded-xl hover:bg-white/[0.05] hover:text-beige-light transition-all duration-300">
                Learn More
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
