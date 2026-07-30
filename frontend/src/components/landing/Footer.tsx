import { motion } from 'motion/react'
import { ArrowRight, Github, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'

function Particle({ index }: { index: number }) {
  const size = [2, 3, 1.5, 2.5, 1.8, 2.2, 1.2, 3.2][index % 8]
  const x = [15, 30, 70, 85, 45, 10, 60, 90, 25, 75, 50, 80][index % 12]
  const y = [20, 35, 10, 60, 45, 80, 25, 70, 50, 15, 75, 40][index % 12]
  const duration = 5 + (index % 4) * 2

  return (
    <div
      className="absolute rounded-full bg-white/[0.06]"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        animation: `cta-float ${duration}s ease-in-out infinite`,
        animationDelay: `${index * 0.6}s`,
      }}
    />
  )
}

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-gradient-to-b from-black via-[#030712] to-[#060b18]">
      {/* CTA Section */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-4 sm:px-8 py-24">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large blue orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3054ff]/[0.04] rounded-full blur-[140px]" />

          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.012]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          {/* Noise texture */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
            }}
          />

          {/* Particles */}
          {Array.from({ length: 12 }).map((_, i) => (
            <Particle key={i} index={i} />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1000px] mx-auto text-center">
          {/* Small label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block text-[11px] font-mono font-medium tracking-[0.12em] text-white/25 uppercase mb-8">
              AI Powered Document Intelligence
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl lg:text-[88px] font-semibold tracking-tight leading-[1.04] bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent max-w-4xl mx-auto"
          >
            Your Documents
            <br />
            Finally Have
            <br />
            Intelligence.
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 sm:mt-8 text-base sm:text-lg text-white/45 leading-relaxed max-w-[650px] mx-auto"
          >
            Upload documents. Ask natural questions. Receive grounded AI answers with source citations in seconds.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/signup"
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#3054ff] text-white font-medium text-sm transition-all duration-300 hover:shadow-[0_0_32px_-4px_rgba(48,84,255,0.4)] hover:scale-[1.03] hover:-translate-y-0.5"
            >
              <span>Start Building</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-white/[0.08] text-white/50 text-sm transition-all duration-300 hover:border-white/[0.15] hover:text-white/70 hover:bg-white/[0.02] hover:-translate-y-0.5"
            >
              <Github className="w-4 h-4" />
              <span>View GitHub</span>
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-8"
          >
            {[
              'No credit card',
              'Free forever plan',
              'Open-source friendly',
            ].map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 text-[12px] text-white/30"
              >
                <span className="w-4 h-4 rounded-full bg-[#3054ff]/8 border border-[#3054ff]/15 flex items-center justify-center">
                  <svg className="w-2 h-2 text-[#3054ff]" fill="none" viewBox="0 0 12 12">
                    <path d="M2.5 6l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/[0.04] py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-3.5 h-3.5 text-[#3054ff]/50" />
            <span className="text-[12px] text-white/20 font-medium tracking-tight">DocMind AI</span>
          </div>
          <p className="text-[11px] text-white/[0.08]">
            Document Q&A powered by AI.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes cta-float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-24px) scale(1.3); opacity: 0.6; }
        }
      `}</style>
    </footer>
  )
}
