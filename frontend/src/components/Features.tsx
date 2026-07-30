import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import {
  FileText, Search, MessageSquare, Zap, ShieldCheck, Lock,
} from 'lucide-react'

const features = [
  {
    icon: FileText,
    title: 'Chat with PDFs',
    description: 'Upload any PDF and start asking questions. DocMind extracts and understands every page.',
  },
  {
    icon: Search,
    title: 'AI Search',
    description: 'Semantic search across all your documents. Find exactly what you need in milliseconds.',
  },
  {
    icon: MessageSquare,
    title: 'Multi-Document Chat',
    description: 'Chat across multiple documents simultaneously. Your AI understands the full context.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Get answers in under 2 seconds. Powered by optimized RAG pipelines and vector search.',
  },
  {
    icon: ShieldCheck,
    title: 'Source Citations',
    description: 'Every answer includes citations. Verify the source with a single click.',
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    description: 'Your data stays private. SOC 2 compliant with end-to-end encryption.',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Features() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="features" className="py-20 sm:py-32">
      <div ref={ref} className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            Everything you need to{' '}
            <span className="gradient-text">understand documents</span>
          </h2>
          <p className="section-subtitle mt-4">
            Powerful features that transform how you interact with your documents.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isVisible ? 'show' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={item} className="group">
              <div className="glass-card p-8 h-full hover:bg-dark-800/60 transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-purple-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                  <feature.icon className="w-6 h-6 text-accent-300" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-accent-200 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-dark-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
