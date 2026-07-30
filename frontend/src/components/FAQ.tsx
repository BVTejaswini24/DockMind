import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { ChevronDown } from 'lucide-react'
import { cn } from '../utils/cn'

const faqs = [
  {
    q: 'What document formats does DocMind AI support?',
    a: 'DocMind AI supports PDF, TXT, DOCX, and CSV files. You can upload multiple documents at once and chat with all of them simultaneously.',
  },
  {
    q: 'How accurate are the AI answers?',
    a: 'DocMind AI achieves over 99% accuracy on document-based questions. Every answer includes source citations so you can verify the information instantly.',
  },
  {
    q: 'Is my data secure and private?',
    a: 'Absolutely. Your documents are encrypted at rest and in transit. We never use your data for training. DocMind AI is SOC 2 compliant.',
  },
  {
    q: 'Can I use my own API key?',
    a: 'Yes. You can use your own OpenAI, Google AI, or HuggingFace API key. This gives you full control over usage and costs.',
  },
  {
    q: 'How does the multi-document chat work?',
    a: 'Upload multiple documents and DocMind AI indexes them all. You can ask questions that span across documents — the AI understands the full context.',
  },
  {
    q: 'Is there a free tier available?',
    a: 'Yes! You can get started for free with our basic tier. Upgrade to Pro for unlimited documents, advanced retrievers, and priority support.',
  },
]

export default function FAQ() {
  const { ref, isVisible } = useScrollReveal()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="pricing" className="py-20 sm:py-32">
      <div ref={ref} className="section-container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            Frequently asked <span className="gradient-text">questions</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={cn(
                'rounded-2xl border transition-all duration-300 cursor-pointer',
                openIndex === i
                  ? 'border-accent/20 bg-accent/5'
                  : 'border-white/5 bg-dark-800/30 hover:bg-dark-800/50'
              )}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="flex items-center justify-between p-5 sm:p-6">
                <span className="font-medium text-sm sm:text-base pr-4">{faq.q}</span>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-dark-400 flex-shrink-0 transition-transform duration-300',
                    openIndex === i && 'rotate-180 text-accent'
                  )}
                />
              </div>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-dark-400 leading-relaxed text-sm sm:text-base">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
