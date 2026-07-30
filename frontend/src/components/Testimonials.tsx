import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Research Director, BioTech Corp',
    content:
      'DocMind transformed how our team reviews research papers. What used to take days now takes minutes. The citation accuracy is remarkable.',
    rating: 5,
  },
  {
    name: 'Marcus Rivera',
    role: 'Legal Tech Lead, Axiom Law',
    content:
      'We analyze thousands of legal documents monthly. DocMind cut our review time by 80% while maintaining the precision our clients demand.',
    rating: 5,
  },
  {
    name: 'Emily Nakamura',
    role: 'Product Manager, FinFlow',
    content:
      'The multi-document chat feature is a game-changer. I can upload product specs, user research, and technical docs — one conversation to rule them all.',
    rating: 5,
  },
]

export default function Testimonials() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="py-20 sm:py-32 bg-dark-900/50">
      <div ref={ref} className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            Loved by <span className="gradient-text">teams</span>
          </h2>
          <p className="section-subtitle mt-4">
            See what our customers have to say about DocMind AI.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass-card p-8 flex flex-col"
            >
              <Quote className="w-8 h-8 text-accent/30 mb-6" />
              <p className="text-dark-300 leading-relaxed flex-1 mb-8">
                {t.content}
              </p>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <svg
                    key={j}
                    className="w-4 h-4 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div>
                <div className="font-semibold text-white">{t.name}</div>
                <div className="text-sm text-dark-400">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
