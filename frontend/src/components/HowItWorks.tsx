import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { Upload, MessageSquare, Sparkles } from 'lucide-react'

const steps = [
  {
    icon: Upload,
    title: 'Upload Your Documents',
    description: 'Drag and drop PDFs, DOCX, TXT, or CSV files. We support all major formats.',
    number: '01',
  },
  {
    icon: MessageSquare,
    title: 'Ask Questions',
    description: 'Type any question in natural language. Your personal AI reads and understands everything.',
    number: '02',
  },
  {
    icon: Sparkles,
    title: 'Get AI Answers',
    description: 'Receive accurate answers with source citations in seconds. Verify and explore further.',
    number: '03',
  },
]

export default function HowItWorks() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="about" className="py-20 sm:py-32 bg-dark-900/50">
      <div ref={ref} className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            How it <span className="gradient-text">works</span>
          </h2>
          <p className="section-subtitle mt-4">
            Three simple steps to unlock your document intelligence.
          </p>
        </motion.div>

        <div className="relative grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-24 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-accent/0 via-accent/40 to-accent/0" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="relative flex flex-col items-center text-center group"
            >
              <div className="relative mb-8">
                <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <step.icon className="w-9 h-9 text-accent-300" />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-sm font-bold text-accent-300">
                  {step.number}
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-dark-400 leading-relaxed max-w-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
