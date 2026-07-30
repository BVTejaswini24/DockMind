import { motion } from 'motion/react'
import { FileText, Upload, ArrowRight, Search, CheckCircle, BookOpen, ChevronRight, ExternalLink } from 'lucide-react'

const documents = [
  { name: 'Q4_Financial_Report.pdf', icon: FileText },
  { name: 'Technical_Whitepaper.pdf', icon: FileText },
  { name: 'Research_Overview.docx', icon: FileText },
  { name: 'Meeting_Notes.txt', icon: FileText },
  { name: 'Product_Roadmap.pdf', icon: FileText },
]

const sources = [
  {
    id: 1,
    doc: 'Q4_Financial_Report.pdf',
    page: 12,
    confidence: 95,
    excerpt: 'Total revenue increased 23% year-over-year to $12.4B...',
  },
  {
    id: 2,
    doc: 'Technical_Whitepaper.pdf',
    page: 7,
    confidence: 92,
    excerpt: 'RAG pipelines retrieve semantically relevant chunks...',
  },
  {
    id: 3,
    doc: 'Research_Overview.docx',
    page: 24,
    confidence: 88,
    excerpt: 'The embedding model achieves 97.3% retrieval accuracy...',
  },
]

function BlinkingCursor() {
  return (
    <span
      className="inline-block w-[2px] h-[18px] bg-[#3054ff] align-middle ml-0.5"
      style={{
        animation: 'cursor-blink 1s step-end infinite',
        boxShadow: '0 0 6px rgba(48,84,255,0.4)',
      }}
    />
  )
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-[3px] ml-1">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="w-[5px] h-[5px] rounded-full bg-white/40"
          style={{
            animation: `typing-dot 1.4s ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </span>
  )
}

export default function Features() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#060b18] via-[#030712] to-black py-28 sm:py-36">
      <div className="absolute top-[-10%] left-[5%] w-[500px] h-[500px] bg-[#3054ff]/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[5%] right-[10%] w-[400px] h-[400px] bg-indigo-600/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.08]">
            Built for Intelligent Document Search
          </h2>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            Everything happens inside one AI workspace—upload, search, ask questions, and verify answers with inline citations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 48, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div
            className="rounded-3xl border border-white/[0.08] overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(24px)',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.04), 0 40px 80px -20px rgba(0,0,0,0.6), 0 8px 24px -8px rgba(0,0,0,0.4)',
            }}
          >
            <div className="flex flex-col lg:flex-row min-h-[520px]">
              {/* ——— Left: Documents Panel ——— */}
              <div className="w-full lg:w-[220px] xl:w-[240px] border-b lg:border-b-0 lg:border-r border-white/[0.06] flex flex-col shrink-0">
                <div className="px-4 py-3.5 border-b border-white/[0.04]">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-[#3054ff]/15 border border-[#3054ff]/20 flex items-center justify-center">
                      <BookOpen className="w-2.5 h-2.5 text-[#3054ff]" />
                    </div>
                    <span className="text-[11px] font-semibold text-white/50 uppercase tracking-[0.08em]">Library</span>
                  </div>
                </div>
                <div className="flex-1 p-2 space-y-0.5 overflow-y-auto">
                  {documents.map((doc) => (
                    <div
                      key={doc.name}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[12px] text-white/50 hover:text-white/80 hover:bg-white/[0.03] transition-all cursor-pointer group"
                    >
                      <doc.icon className="w-3.5 h-3.5 shrink-0 text-white/20 group-hover:text-[#3054ff]/60 transition-colors" />
                      <span className="truncate tracking-tight">{doc.name}</span>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t border-white/[0.04]">
                  <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[12px] text-white/40 hover:text-white/70 hover:bg-[#3054ff]/[0.06] transition-all cursor-pointer group">
                    <div className="w-5 h-5 rounded-lg bg-[#3054ff]/10 border border-[#3054ff]/15 flex items-center justify-center">
                      <Upload className="w-3 h-3 text-[#3054ff]" />
                    </div>
                    <span className="font-medium tracking-tight">Upload document</span>
                  </div>
                </div>
              </div>

              {/* ——— Center: AI Chat ——— */}
              <div className="flex-1 flex flex-col min-h-[400px] lg:min-h-0">
                <div className="flex-1 p-4 sm:p-5 space-y-5 overflow-y-auto">
                  {/* User message */}
                  <div className="flex justify-end">
                    <div className="max-w-[75%] px-4 py-2.5 rounded-2xl bg-[#3054ff]/12 border border-[#3054ff]/8">
                      <p className="text-sm text-white/85 leading-relaxed">
                        How does the AI extract answers from documents?
                      </p>
                    </div>
                  </div>

                  {/* AI typing indicator */}
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#3054ff]/15 border border-[#3054ff]/20 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#3054ff]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 mb-2">
                        <span className="text-[11px] font-medium text-white/35">AI</span>
                        <span className="text-[10px] text-white/20">analyzing 3 documents</span>
                      </div>
                      <div className="space-y-2.5">
                        <p className="text-sm text-white/70 leading-relaxed">
                          The AI uses <span className="text-white font-medium">Retrieval-Augmented Generation</span> to search across your document library. When you ask a question, relevant text chunks are retrieved{' '}
                          <span className="inline-flex items-center justify-center w-[15px] h-[15px] text-[9px] rounded bg-[#3054ff]/20 text-[#3054ff] font-semibold align-middle mx-0.5">1</span>
                          , ranked by semantic similarity, and used to generate a grounded answer with inline citations{' '}
                          <span className="inline-flex items-center justify-center w-[15px] h-[15px] text-[9px] rounded bg-[#3054ff]/20 text-[#3054ff] font-semibold align-middle mx-0.5">2</span>.
                        </p>
                        <p className="text-sm text-white/70 leading-relaxed">
                          <span className="text-white/90 font-medium">Key capabilities:</span> semantic search across all documents, automatic source attribution, and confidence scoring for every claim{' '}
                          <span className="inline-flex items-center justify-center w-[15px] h-[15px] text-[9px] rounded bg-[#3054ff]/20 text-[#3054ff] font-semibold align-middle mx-0.5">3</span>.
                        </p>
                      </div>
                      <div className="flex items-center gap-1 mt-3 text-[11px] text-white/25">
                        <CheckCircle className="w-3 h-3 text-green-400/50" />
                        <span>Grounded in 3 sources</span>
                        <span className="mx-1.5">·</span>
                        <span>Response time 1.2s</span>
                      </div>
                      <div className="mt-3">
                        <span className="text-sm text-white/50">▎</span>
                        <BlinkingCursor />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chat input */}
                <div className="px-4 pb-4 pt-2">
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.02] border border-white/[0.06] transition-all focus-within:border-[#3054ff]/30 focus-within:bg-white/[0.03]">
                    <span className="text-sm text-white/15 flex-1 font-['Instrument_Sans']">Ask a follow-up question...</span>
                    <div className="w-7 h-7 rounded-full bg-[#3054ff] hover:bg-[#3054ff]/80 flex items-center justify-center transition-colors cursor-pointer">
                      <ArrowRight className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* ——— Right: Sources Panel ——— */}
              <div className="w-full lg:w-[240px] xl:w-[260px] border-t lg:border-t-0 lg:border-l border-white/[0.06] flex flex-col shrink-0">
                <div className="px-4 py-3.5 border-b border-white/[0.04]">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-[#3054ff]/15 border border-[#3054ff]/20 flex items-center justify-center">
                      <Search className="w-2.5 h-2.5 text-[#3054ff]" />
                    </div>
                    <span className="text-[11px] font-semibold text-white/50 uppercase tracking-[0.08em]">Sources</span>
                  </div>
                </div>
                <div className="flex-1 p-3 space-y-2.5 overflow-y-auto">
                  {sources.map((src) => (
                    <div
                      key={src.id}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.03] transition-colors"
                    >
                      <div className="flex items-start gap-2 mb-1.5">
                        <span className="w-[18px] h-[18px] rounded text-[9px] bg-[#3054ff]/15 text-[#3054ff] font-semibold flex items-center justify-center shrink-0 mt-0.5">
                          {src.id}
                        </span>
                        <div className="min-w-0">
                          <p className="text-[11px] text-white/60 font-medium truncate">{src.doc}</p>
                          <div className="flex items-center gap-2.5 mt-1">
                            <span className="text-[10px] text-white/30 flex items-center gap-1">
                              <BookOpen className="w-2.5 h-2.5" />
                              Page {src.page}
                            </span>
                            <span className="text-[10px] text-green-400/60 flex items-center gap-1">
                              <span className="w-1 h-1 rounded-full bg-green-400/60" />
                              {src.confidence}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-[10px] text-white/35 leading-relaxed line-clamp-2 mt-1">{src.excerpt}</p>
                    </div>
                  ))}
                </div>

                {/* Metadata footer */}
                <div className="p-3 border-t border-white/[0.04] space-y-2">
                  <div className="flex items-center gap-2 text-[10px] text-white/30">
                    <ExternalLink className="w-3 h-3" />
                    <span>3 documents indexed</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-white/30">
                    <Search className="w-3 h-3" />
                    <span>247 chunks processed</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#3054ff]/30 to-[#3054ff]/60"
                      style={{ width: '91%' }}
                    />
                  </div>
                  <div className="flex justify-between text-[9px] text-white/20">
                    <span>Avg. confidence</span>
                    <span className="text-green-400/50 font-medium">91%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Glow */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[80%] h-28 bg-gradient-to-r from-transparent via-[#3054ff]/[0.06] to-transparent blur-3xl pointer-events-none" />
        </motion.div>
      </div>

      <style>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes typing-dot {
          0%, 60%, 100% { opacity: 0.15; transform: scale(0.8); }
          30% { opacity: 0.6; transform: scale(1); }
        }
      `}</style>
    </section>
  )
}
