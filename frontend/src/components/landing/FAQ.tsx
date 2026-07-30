import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'What file formats are supported?',
    a: 'We support PDF (.pdf), Word documents (.docx), and plain text files (.txt). Each file can be up to 50MB. We automatically extract text, tables, and metadata for indexing.',
  },
  {
    q: 'How does semantic search work?',
    a: 'Documents are converted into vector embeddings that capture meaning, not just keywords. When you ask a question, we find the most semantically similar chunks across your entire library using cosine similarity search.',
  },
  {
    q: 'Are my uploaded documents secure?',
    a: 'Yes. All documents are encrypted at rest (AES-256) and in transit (TLS 1.3). We never use your data for model training, and you can delete any document at any time.',
  },
  {
    q: 'Can I upload multiple documents?',
    a: 'Absolutely. You can upload multiple files in a single session, and the AI will search across all of them simultaneously to answer your questions with cross-document citations.',
  },
  {
    q: 'How accurate are the AI answers?',
    a: 'Accuracy depends on your document quality and query specificity. Every answer includes a confidence score (0–100%) plus numbered citations linking back to source pages so you can verify before trusting.',
  },
  {
    q: 'Which AI model powers DocMind?',
    a: 'We use a combination of state-of-the-art embedding models for retrieval and large language models for answer generation. Our pipeline is regularly benchmarked and updated to the latest models.',
  },
  {
    q: 'Can I export AI responses?',
    a: 'Yes. You can copy individual answers, export entire chat conversations as JSON or Markdown, and share citation-backed insights with your team.',
  },
  {
    q: 'Is there an API available?',
    a: 'Yes. The Pro and Enterprise plans include full API access for programmatic document uploads, search queries, and answer retrieval. Check our documentation for endpoint details.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#060b18] via-[#030712] to-black py-28 sm:py-36">
      <div className="absolute top-[5%] left-[15%] w-[400px] h-[400px] bg-[#3054ff]/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] bg-indigo-600/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-[900px] mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.08]">
            Questions, Answered
          </h2>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-white/50 max-w-xl mx-auto leading-relaxed">
            Everything you need to know before getting started with DocMind AI.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          {faqs.map((faq, i) => {
            const isOpen = open === i

            return (
              <div
                key={i}
                className="group rounded-[20px] transition-all duration-500"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: isOpen
                    ? '0 0 0 1px rgba(48,84,255,0.08), 0 0 40px -16px rgba(48,84,255,0.1), 0 8px 32px -12px rgba(0,0,0,0.5)'
                    : '0 0 0 1px rgba(255,255,255,0.02), 0 8px 32px -12px rgba(0,0,0,0.5)',
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between px-7 py-6 sm:py-7 text-left gap-4"
                  >
                    <span className="text-sm sm:text-base font-medium text-white/80 group-hover:text-white/90 transition-colors leading-snug tracking-tight">
                      {faq.q}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="shrink-0"
                    >
                      <ChevronDown
                        className="w-4 h-4 text-white/30 transition-colors duration-300 group-hover:text-white/50"
                      />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-7 pb-6 sm:pb-7 pt-0">
                          <div className="h-px bg-white/[0.04] mb-4 sm:mb-5" />
                          <p className="text-sm text-white/50 leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
