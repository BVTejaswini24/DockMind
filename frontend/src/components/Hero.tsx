import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, FileText, Search, MessageSquareText } from 'lucide-react'

const floatingDocs = [
  { Icon: FileText, x: '10%', y: '20%', delay: 0, duration: 6 },
  { Icon: Search, x: '75%', y: '15%', delay: 1, duration: 7 },
  { Icon: MessageSquareText, x: '85%', y: '60%', delay: 2, duration: 8 },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Aurora background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-40%] left-[-20%] w-[80%] h-[80%] rounded-full bg-gradient-to-r from-accent/20 via-purple-500/10 to-transparent blur-[120px] animate-aurora" />
        <div className="absolute bottom-[-30%] right-[-20%] w-[70%] h-[70%] rounded-full bg-gradient-to-l from-accent/15 via-blue-500/10 to-transparent blur-[100px] animate-aurora" style={{ animationDirection: 'reverse' }} />
      </div>

      {/* Floating document icons */}
      {floatingDocs.map(({ Icon, x, y, delay, duration }) => (
        <motion.div
          key={delay}
          className="absolute hidden lg:block"
          style={{ left: x, top: y }}
          animate={{ y: [0, -30, 0] }}
          transition={{ duration, repeat: Infinity, delay, ease: 'easeInOut' }}
        >
          <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center shadow-lg">
            <Icon className="w-7 h-7 text-accent-300" />
          </div>
        </motion.div>
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-dark-300 mb-8 border border-white/5"
        >
          <Sparkles className="w-4 h-4 text-accent" />
          <span>AI-Powered Document Intelligence</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-balance leading-[1.1]"
        >
          <span className="text-white">Understand</span>{' '}
          <span className="gradient-text">Documents.</span>
          <br />
          <span className="text-white">Instantly.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-6 text-lg sm:text-xl text-dark-300 max-w-2xl mx-auto text-balance"
        >
          Upload your PDFs, documents, and notes. Ask questions in natural language.
          Get precise answers with source citations — in seconds.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#"
            className="group relative px-8 py-4 text-base font-semibold text-white rounded-2xl bg-gradient-to-r from-accent to-purple-600 hover:from-accent-600 hover:to-purple-700 transition-all duration-500 shadow-2xl shadow-accent/25 hover:shadow-accent/40 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Chatting
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </a>

          <a
            href="#features"
            className="group px-8 py-4 text-base font-medium text-dark-200 rounded-2xl glass border border-white/5 hover:border-white/10 hover:text-white transition-all duration-300"
          >
            See Features
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 sm:gap-16 text-center"
        >
          {[
            { value: '99%', label: 'Accuracy' },
            { value: '<2s', label: 'Response Time' },
            { value: '10+', label: 'Formats Supported' },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-dark-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
