import { motion } from 'motion/react'
import { UploadCloud, Brain, Search, MessageSquare, ArrowDown } from 'lucide-react'

const steps = [
  {
    icon: UploadCloud,
    title: 'Upload Documents',
    description: 'Upload PDF, DOCX or TXT files. Files are automatically indexed.',
  },
  {
    icon: Brain,
    title: 'AI Processing',
    description: 'Documents are chunked, embedded, and stored in a vector database.',
  },
  {
    icon: Search,
    title: 'Semantic Retrieval',
    description: 'Relevant document chunks are retrieved using vector similarity search.',
  },
  {
    icon: MessageSquare,
    title: 'Grounded Answers',
    description: 'The LLM answers using retrieved context with citations and confidence scores.',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
}

const lineVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
}

function StepArrow() {
  return (
    <div className="hidden lg:flex items-center justify-center shrink-0 w-10">
      <motion.div
        variants={lineVariants}
        className="relative w-full flex items-center justify-center"
        style={{ transformOrigin: 'left center' }}
      >
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-[#3054ff]/0 via-[#3054ff]/20 to-[#3054ff]/0" />
        <ArrowDown className="w-4 h-4 text-[#3054ff]/40 -rotate-90" />
      </motion.div>
    </div>
  )
}

export default function HowItWorks() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-black via-[#030712] to-[#060b18] py-28 sm:py-36">
      <div className="absolute top-[15%] left-[10%] w-[450px] h-[450px] bg-[#3054ff]/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[350px] h-[350px] bg-indigo-600/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.08]">
            Understand Documents in Seconds
          </h2>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            Upload files, retrieve the most relevant context, and receive grounded AI answers with source citations.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col lg:flex-row items-start lg:items-center justify-center gap-6 lg:gap-0"
        >
          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-col lg:flex-row items-center lg:items-stretch w-full lg:w-auto gap-6 lg:gap-0">
              <motion.div
                variants={cardVariants}
                className="group relative w-full lg:w-[260px] xl:w-[280px] rounded-[20px] p-6 sm:p-7 text-center transition-all duration-500"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 0 0 1px rgba(255,255,255,0.02), 0 8px 32px -12px rgba(0,0,0,0.5)',
                }}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(ellipse at 50% 0%, rgba(48,84,255,0.08) 0%, transparent 70%)',
                    boxShadow: '0 0 40px -8px rgba(48,84,255,0.15)',
                  }}
                />

                <div className="relative z-10">
                  {/* Step number */}
                  <div className="mb-5 inline-flex">
                    <div
                      className="w-14 h-14 rounded-[16px] flex items-center justify-center transition-all duration-500 group-hover:-translate-y-1"
                      style={{
                        background: 'rgba(48,84,255,0.08)',
                        border: '1px solid rgba(48,84,255,0.15)',
                      }}
                    >
                      <step.icon className="w-6 h-6 text-[#3054ff] transition-transform duration-500 group-hover:scale-110" />
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2.5 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/45 leading-relaxed max-w-[220px] mx-auto">
                    {step.description}
                  </p>
                </div>

                {/* Step index badge */}
                <div
                  className="absolute -top-2 -right-2 w-7 h-7 rounded-[10px] flex items-center justify-center text-[10px] font-semibold transition-colors duration-300"
                  style={{
                    background: 'rgba(48,84,255,0.12)',
                    border: '1px solid rgba(48,84,255,0.2)',
                    color: 'rgba(48,84,255,0.9)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
              </motion.div>

              {/* Arrow connector — shown between cards on desktop */}
              {i < steps.length - 1 && <StepArrow />}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
