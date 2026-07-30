import { motion } from 'motion/react'
import { Search, Files, BookOpen, ShieldCheck, Zap, Lock } from 'lucide-react'

const features = [
  {
    icon: Search,
    title: 'Semantic Search',
    desc: 'Retrieve the most relevant information using vector similarity instead of keyword matching.',
    visual: 'search-pulse',
  },
  {
    icon: Files,
    title: 'Multi-Document Chat',
    desc: 'Ask questions across multiple uploaded documents simultaneously.',
    visual: 'stacked-docs',
  },
  {
    icon: BookOpen,
    title: 'Inline Citations',
    desc: 'Every response links back to its original source pages.',
    visual: 'citation-badges',
  },
  {
    icon: ShieldCheck,
    title: 'Confidence Score',
    desc: 'Know how reliable every answer is with confidence scoring.',
    visual: 'circular-percentage',
  },
  {
    icon: Zap,
    title: 'Lightning Fast Retrieval',
    desc: 'Optimized retrieval pipeline delivers responses in seconds.',
    visual: 'animated-timeline',
  },
  {
    icon: Lock,
    title: 'Secure Workspace',
    desc: 'Your uploaded documents remain private and protected.',
    visual: 'shield',
  },
]

function SearchPulse() {
  return (
    <div className="relative flex items-center justify-center w-full h-16">
      <div className="absolute w-12 h-12 rounded-full border border-[#3054ff]/10 animate-ping" style={{ animationDuration: '2s' }} />
      <div className="absolute w-9 h-9 rounded-full border border-[#3054ff]/15 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
      <div className="w-6 h-6 rounded-full bg-[#3054ff]/15 border border-[#3054ff]/25 flex items-center justify-center">
        <Search className="w-3 h-3 text-[#3054ff]" />
      </div>
    </div>
  )
}

function StackedDocs() {
  return (
    <div className="relative flex items-center justify-center w-full h-16">
      <div className="absolute w-28 h-10 rounded-lg border border-white/[0.08] bg-white/[0.02] -rotate-6 translate-x-2" />
      <div className="absolute w-28 h-10 rounded-lg border border-white/[0.08] bg-white/[0.02] rotate-3 -translate-x-1" />
      <div className="absolute w-28 h-10 rounded-lg border border-[#3054ff]/15 bg-[#3054ff]/[0.04] flex items-center justify-center">
        <Files className="w-4 h-4 text-[#3054ff]" />
      </div>
    </div>
  )
}

function CitationBadges() {
  return (
    <div className="flex items-center justify-center gap-2 w-full h-16">
      {[
        { n: 1, active: true },
        { n: 2, active: true },
        { n: 3, active: false },
      ].map((c) => (
        <span
          key={c.n}
          className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-[11px] font-semibold transition-all duration-300 ${
            c.active
              ? 'bg-[#3054ff]/15 border border-[#3054ff]/25 text-[#3054ff]'
              : 'bg-white/[0.02] border border-white/[0.06] text-white/20'
          }`}
        >
          {c.n}
        </span>
      ))}
      <span className="text-[10px] text-white/25 ml-1">+3 more</span>
    </div>
  )
}

function CircularPercentage() {
  const radius = 22
  const circumference = 2 * Math.PI * radius
  const progress = 94
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="flex items-center justify-center w-full h-16">
      <div className="relative flex items-center justify-center">
        <svg width="56" height="56" className="-rotate-90">
          <circle cx="28" cy="28" r={radius} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="3.5" />
          <circle
            cx="28"
            cy="28"
            r={radius}
            fill="none"
            stroke="#3054ff"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              filter: 'drop-shadow(0 0 6px rgba(48,84,255,0.3))',
              transition: 'stroke-dashoffset 1.5s ease',
            }}
          />
        </svg>
        <span className="absolute text-[11px] font-semibold text-white/80">{progress}%</span>
      </div>
    </div>
  )
}

function AnimatedTimeline() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-16 px-4">
      <div className="relative w-full max-w-[140px]">
        <div className="h-1 rounded-full bg-white/[0.04] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#3054ff] to-blue-400"
            style={{
              width: '70%',
              animation: 'timeline-progress 2s ease-in-out infinite',
            }}
          />
        </div>
        <div className="flex justify-between mt-2">
          {[0, 25, 50, 75, 100].map((v) => (
            <div
              key={v}
              className={`w-1 h-1 rounded-full ${v <= 70 ? 'bg-[#3054ff]/40' : 'bg-white/[0.04]'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function ShieldVisual() {
  return (
    <div className="flex items-center justify-center w-full h-16">
      <div className="relative">
        <div className="absolute inset-0 bg-[#3054ff]/[0.06] rounded-full blur-lg scale-150" />
        <div className="relative w-12 h-12 rounded-full bg-[#3054ff]/10 border border-[#3054ff]/15 flex items-center justify-center">
          <Lock className="w-5 h-5 text-[#3054ff]" />
        </div>
      </div>
    </div>
  )
}

const visualComponents: Record<string, React.ReactNode> = {
  'search-pulse': <SearchPulse />,
  'stacked-docs': <StackedDocs />,
  'citation-badges': <CitationBadges />,
  'circular-percentage': <CircularPercentage />,
  'animated-timeline': <AnimatedTimeline />,
  shield: <ShieldVisual />,
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
}

export default function EnterpriseFeatures() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#060b18] via-[#030712] to-black py-28 sm:py-36">
      <div className="absolute top-[20%] right-[15%] w-[400px] h-[400px] bg-[#3054ff]/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-[350px] h-[350px] bg-indigo-600/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.08]">
            Enterprise-Ready AI Features
          </h2>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            Everything you need for intelligent document understanding in one secure workspace.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {/* Semantic Search — taller, spans 2 rows */}
          <motion.div
            variants={cardVariants}
            className="group relative row-span-2 rounded-[24px] p-7 sm:p-8 flex flex-col transition-all duration-500"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.02), 0 8px 32px -12px rgba(0,0,0,0.5)',
            }}
            whileHover={{
              y: -4,
              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
            }}
          >
            <div
              className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 0%, rgba(48,84,255,0.08) 0%, transparent 70%)',
                boxShadow: '0 0 40px -8px rgba(48,84,255,0.12), inset 0 0 0 1px rgba(48,84,255,0.08)',
              }}
            />
            <div className="relative z-10 flex flex-col flex-1">
              <div className="mb-5">
                <div className="w-12 h-12 rounded-[16px] bg-[#3054ff]/8 border border-[#3054ff]/15 flex items-center justify-center transition-all duration-500 group-hover:-translate-y-0.5 group-hover:shadow-[0_0_20px_-4px_rgba(48,84,255,0.2)]">
                  <Search className="w-5 h-5 text-[#3054ff] transition-transform duration-500 group-hover:scale-110" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2.5 tracking-tight">Semantic Search</h3>
              <p className="text-sm text-white/45 leading-relaxed mb-auto">{features[0].desc}</p>
              <div className="mt-6">{visualComponents['search-pulse']}</div>
            </div>
          </motion.div>

          {/* Multi-Document Chat */}
          <motion.div
            variants={cardVariants}
            className="group relative rounded-[24px] p-7 sm:p-8 flex flex-col transition-all duration-500"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.02), 0 8px 32px -12px rgba(0,0,0,0.5)',
            }}
            whileHover={{
              y: -4,
              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
            }}
          >
            <div
              className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 0%, rgba(48,84,255,0.08) 0%, transparent 70%)',
                boxShadow: '0 0 40px -8px rgba(48,84,255,0.12), inset 0 0 0 1px rgba(48,84,255,0.08)',
              }}
            />
            <div className="relative z-10 flex flex-col flex-1">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-[16px] bg-[#3054ff]/8 border border-[#3054ff]/15 flex items-center justify-center transition-all duration-500 group-hover:-translate-y-0.5 group-hover:shadow-[0_0_20px_-4px_rgba(48,84,255,0.2)]">
                  <Files className="w-5 h-5 text-[#3054ff] transition-transform duration-500 group-hover:scale-110" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2.5 tracking-tight">Multi-Document Chat</h3>
              <p className="text-sm text-white/45 leading-relaxed mb-auto">{features[1].desc}</p>
              <div className="mt-5">{visualComponents['stacked-docs']}</div>
            </div>
          </motion.div>

          {/* Inline Citations */}
          <motion.div
            variants={cardVariants}
            className="group relative rounded-[24px] p-7 sm:p-8 flex flex-col transition-all duration-500"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.02), 0 8px 32px -12px rgba(0,0,0,0.5)',
            }}
            whileHover={{
              y: -4,
              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
            }}
          >
            <div
              className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 0%, rgba(48,84,255,0.08) 0%, transparent 70%)',
                boxShadow: '0 0 40px -8px rgba(48,84,255,0.12), inset 0 0 0 1px rgba(48,84,255,0.08)',
              }}
            />
            <div className="relative z-10 flex flex-col flex-1">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-[16px] bg-[#3054ff]/8 border border-[#3054ff]/15 flex items-center justify-center transition-all duration-500 group-hover:-translate-y-0.5 group-hover:shadow-[0_0_20px_-4px_rgba(48,84,255,0.2)]">
                  <BookOpen className="w-5 h-5 text-[#3054ff] transition-transform duration-500 group-hover:scale-110" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2.5 tracking-tight">Inline Citations</h3>
              <p className="text-sm text-white/45 leading-relaxed mb-auto">{features[2].desc}</p>
              <div className="mt-5">{visualComponents['citation-badges']}</div>
            </div>
          </motion.div>

          {/* Confidence Score */}
          <motion.div
            variants={cardVariants}
            className="group relative rounded-[24px] p-7 sm:p-8 flex flex-col transition-all duration-500"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.02), 0 8px 32px -12px rgba(0,0,0,0.5)',
            }}
            whileHover={{
              y: -4,
              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
            }}
          >
            <div
              className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 0%, rgba(48,84,255,0.08) 0%, transparent 70%)',
                boxShadow: '0 0 40px -8px rgba(48,84,255,0.12), inset 0 0 0 1px rgba(48,84,255,0.08)',
              }}
            />
            <div className="relative z-10 flex flex-col flex-1">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-[16px] bg-[#3054ff]/8 border border-[#3054ff]/15 flex items-center justify-center transition-all duration-500 group-hover:-translate-y-0.5 group-hover:shadow-[0_0_20px_-4px_rgba(48,84,255,0.2)]">
                  <ShieldCheck className="w-5 h-5 text-[#3054ff] transition-transform duration-500 group-hover:scale-110" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2.5 tracking-tight">Confidence Score</h3>
              <p className="text-sm text-white/45 leading-relaxed mb-auto">{features[3].desc}</p>
              <div className="mt-5">{visualComponents['circular-percentage']}</div>
            </div>
          </motion.div>

          {/* Lightning Fast Retrieval */}
          <motion.div
            variants={cardVariants}
            className="group relative row-span-2 rounded-[24px] p-7 sm:p-8 flex flex-col transition-all duration-500"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.02), 0 8px 32px -12px rgba(0,0,0,0.5)',
            }}
            whileHover={{
              y: -4,
              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
            }}
          >
            <div
              className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 0%, rgba(48,84,255,0.08) 0%, transparent 70%)',
                boxShadow: '0 0 40px -8px rgba(48,84,255,0.12), inset 0 0 0 1px rgba(48,84,255,0.08)',
              }}
            />
            <div className="relative z-10 flex flex-col flex-1">
              <div className="mb-5">
                <div className="w-12 h-12 rounded-[16px] bg-[#3054ff]/8 border border-[#3054ff]/15 flex items-center justify-center transition-all duration-500 group-hover:-translate-y-0.5 group-hover:shadow-[0_0_20px_-4px_rgba(48,84,255,0.2)]">
                  <Zap className="w-5 h-5 text-[#3054ff] transition-transform duration-500 group-hover:scale-110" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2.5 tracking-tight">Lightning Fast Retrieval</h3>
              <p className="text-sm text-white/45 leading-relaxed mb-auto">{features[4].desc}</p>
              <div className="mt-6">{visualComponents['animated-timeline']}</div>
            </div>
          </motion.div>

          {/* Secure Workspace */}
          <motion.div
            variants={cardVariants}
            className="group relative rounded-[24px] p-7 sm:p-8 flex flex-col transition-all duration-500"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.02), 0 8px 32px -12px rgba(0,0,0,0.5)',
            }}
            whileHover={{
              y: -4,
              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
            }}
          >
            <div
              className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 0%, rgba(48,84,255,0.08) 0%, transparent 70%)',
                boxShadow: '0 0 40px -8px rgba(48,84,255,0.12), inset 0 0 0 1px rgba(48,84,255,0.08)',
              }}
            />
            <div className="relative z-10 flex flex-col flex-1">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-[16px] bg-[#3054ff]/8 border border-[#3054ff]/15 flex items-center justify-center transition-all duration-500 group-hover:-translate-y-0.5 group-hover:shadow-[0_0_20px_-4px_rgba(48,84,255,0.2)]">
                  <Lock className="w-5 h-5 text-[#3054ff] transition-transform duration-500 group-hover:scale-110" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2.5 tracking-tight">Secure Workspace</h3>
              <p className="text-sm text-white/45 leading-relaxed mb-auto">{features[5].desc}</p>
              <div className="mt-5">{visualComponents['shield']}</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes timeline-progress {
          0% { width: 30%; opacity: 0.6; }
          50% { width: 70%; opacity: 1; }
          100% { width: 30%; opacity: 0.6; }
        }
      `}</style>
    </section>
  )
}
