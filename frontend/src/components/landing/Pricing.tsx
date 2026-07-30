import { motion } from 'motion/react'
import { Check, ArrowRight, ChevronRight, BookOpen, ExternalLink, MessageSquare } from 'lucide-react'
import { Link } from 'react-router-dom'

const checkItems = [
  'Semantic Search',
  'Inline Citations',
  'Confidence Scores',
  'Multi-document Retrieval',
]

const citations = [
  { doc: 'Annual_Report.pdf', pages: ['Page 18', 'Page 23', 'Page 41'] },
]

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      <div className="w-5 h-5 rounded-full bg-[#3054ff]/15 border border-[#3054ff]/20 flex items-center justify-center shrink-0">
        <div className="w-2 h-2 rounded-full bg-[#3054ff]" />
      </div>
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-[5px] h-[5px] rounded-full bg-white/40"
            style={{
              animation: 'demo-typing-dot 1.4s ease-in-out infinite',
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

function ConfidenceBar() {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] text-white/40 font-medium shrink-0">Confidence</span>
      <div className="flex-1 h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '98%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="h-full rounded-full bg-gradient-to-r from-[#3054ff] to-blue-400"
          style={{ boxShadow: '0 0 8px rgba(48,84,255,0.3)' }}
        />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 1.2 }}
        className="text-[11px] font-semibold text-white/70 shrink-0 tabular-nums"
      >
        98%
      </motion.span>
    </div>
  )
}

function Particle({ index }: { index: number }) {
  const size = [2, 3, 1.5, 2.5, 1.8][index % 5]
  const x = [10, 25, 70, 85, 50, 15, 60, 90][index % 8]
  const y = [15, 30, 10, 60, 40, 80, 20, 70][index % 8]
  const duration = 4 + (index % 3) * 2

  return (
    <div
      className="absolute rounded-full bg-white/10"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        animation: `demo-float ${duration}s ease-in-out infinite`,
        animationDelay: `${index * 0.5}s`,
      }}
    />
  )
}

export default function Pricing() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-black via-[#030712] to-[#060b18] py-28 sm:py-36">
      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <Particle key={i} index={i} />
        ))}
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="absolute top-[5%] right-[20%] w-[500px] h-[500px] bg-[#3054ff]/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[15%] left-[10%] w-[400px] h-[400px] bg-indigo-600/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.08]">
            See DocMind AI in Action
          </h2>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            Experience how AI understands documents using semantic search and grounded answers.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* ——— Left Column ——— */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[45%] shrink-0"
          >
            <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-[1.15] mb-5">
              Ask anything about your documents.
            </h3>
            <p className="text-base text-white/50 leading-relaxed mb-8 max-w-lg">
              Upload reports, contracts, research papers or manuals and receive grounded AI answers with page citations in seconds.
            </p>

            <ul className="space-y-3.5 mb-10">
              {checkItems.map((item) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + checkItems.indexOf(item) * 0.08 }}
                  className="flex items-center gap-3 text-sm text-white/60"
                >
                  <span className="w-5 h-5 rounded-full bg-[#3054ff]/12 border border-[#3054ff]/20 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 text-[#3054ff]" />
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/chat"
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white text-[#0a0400] font-medium text-sm transition-all duration-300 hover:shadow-[0_0_24px_rgba(255,255,255,0.2)] hover:scale-[1.02]"
              >
                <span>Try Interactive Demo</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/docs"
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/[0.08] text-white/60 text-sm transition-all duration-300 hover:border-white/[0.15] hover:text-white/80 hover:bg-white/[0.02]"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>View Documentation</span>
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* ——— Right Column: Chat Window ——— */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[55%]"
          >
            <div
              className="rounded-[24px] overflow-hidden transition-all duration-500 group hover:shadow-[0_0_60px_-16px_rgba(48,84,255,0.15)]"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(24px)',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.02), 0 20px 60px -20px rgba(0,0,0,0.6), 0 8px 24px -8px rgba(0,0,0,0.4)',
              }}
            >
              {/* Chat Header */}
              <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.06]">
                <div className="w-6 h-6 rounded-lg bg-[#3054ff]/12 border border-[#3054ff]/20 flex items-center justify-center">
                  <MessageSquare className="w-3 h-3 text-[#3054ff]" />
                </div>
                <span className="text-[13px] font-medium text-white/60">DocMind AI — Chat</span>
                <div className="ml-auto flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-400/50" />
                  <span className="text-[10px] text-white/25">Online</span>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="p-5 space-y-5">
                {/* User message */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex justify-end"
                >
                  <div className="max-w-[80%] px-4 py-2.5 rounded-2xl bg-[#3054ff]/12 border border-[#3054ff]/8">
                    <p className="text-sm text-white/85 leading-relaxed">
                      What were the major risks discussed in the annual report?
                    </p>
                  </div>
                </motion.div>

                {/* Typing indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <TypingIndicator />
                </motion.div>

                {/* AI Answer */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#3054ff]/15 border border-[#3054ff]/20 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#3054ff]" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <p className="text-sm text-white/70 leading-relaxed">
                        The report highlights three primary risks:
                      </p>
                      <ul className="space-y-1.5">
                        {[
                          'Supply chain volatility',
                          'Increased operational costs',
                          'Foreign exchange exposure',
                        ].map((risk, i) => (
                          <motion.li
                            key={risk}
                            initial={{ opacity: 0, x: -8 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 1.2 + i * 0.1 }}
                            className="flex items-center gap-2 text-sm text-white/65"
                          >
                            <span className="w-1 h-1 rounded-full bg-[#3054ff]/50" />
                            {risk}
                            <span className="inline-flex items-center justify-center w-[15px] h-[15px] text-[9px] rounded bg-[#3054ff]/20 text-[#3054ff] font-semibold align-middle mx-0.5 cursor-pointer hover:bg-[#3054ff]/30 transition-colors">
                              {i + 1}
                            </span>
                          </motion.li>
                        ))}
                      </ul>

                      {/* Citations */}
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 1.6 }}
                        className="pt-1"
                      >
                        <div className="flex items-center gap-1.5 mb-2.5 text-[11px] text-white/30">
                          <ExternalLink className="w-3 h-3" />
                          <span>3 sources</span>
                        </div>
                        {citations.map((cite) => (
                          <div
                            key={cite.doc}
                            className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.03] transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="w-[18px] h-[18px] rounded text-[9px] bg-[#3054ff]/15 text-[#3054ff] font-semibold flex items-center justify-center shrink-0">
                                1
                              </span>
                              <span className="text-[11px] text-white/60 font-medium">{cite.doc}</span>
                              <ChevronRight className="w-3 h-3 text-white/20 ml-auto" />
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-white/30">
                              {cite.pages.map((p) => (
                                <span
                                  key={p}
                                  className="px-1.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.04] hover:border-[#3054ff]/20 hover:text-white/50 transition-colors"
                                >
                                  {p}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </motion.div>

                      {/* Confidence Bar */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 1.8 }}
                      >
                        <ConfidenceBar />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Chat Input */}
              <div className="px-5 pb-5 pt-2">
                <div
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <span className="text-sm text-white/15 flex-1">Ask another question...</span>
                  <div className="w-7 h-7 rounded-full bg-[#3054ff] flex items-center justify-center cursor-pointer transition-colors hover:bg-[#3054ff]/80">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes demo-typing-dot {
          0%, 60%, 100% { opacity: 0.15; transform: scale(0.8); }
          30% { opacity: 0.6; transform: scale(1); }
        }
        @keyframes demo-float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 0.6; }
        }
      `}</style>
    </section>
  )
}
