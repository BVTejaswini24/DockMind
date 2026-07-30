import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'

const logos = [
  'TechFlow', 'DataSphere', 'NovaAI', 'QuantumLab',
  'Synapse', 'CortexAI', 'PulseTech', 'Vertex'
]

export default function TrustedBy() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="py-16 sm:py-20 border-y border-white/5">
      <div ref={ref} className="section-container">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center text-sm text-dark-400 uppercase tracking-widest mb-10"
        >
          Trusted by innovative teams
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16">
          {logos.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="text-dark-500 hover:text-dark-300 transition-colors text-lg sm:text-xl font-semibold tracking-tight"
            >
              {name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
