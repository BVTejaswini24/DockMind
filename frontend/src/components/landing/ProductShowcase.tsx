import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { Brain } from 'lucide-react'

export default function ProductShowcase() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.05 })

  return (
    <section className="py-24 sm:py-32 overflow-hidden relative">
      <div ref={ref} className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs text-beige-muted/50 mb-6">
            <span>Preview</span>
          </div>
          <h2 className="section-title">
            See it in <span className="gradient-text">action</span>
          </h2>
          <p className="section-subtitle mt-4">
            A clean, intuitive interface designed for productivity.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 48, scale: 0.97 }}
          animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto max-w-5xl"
        >
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden bg-[#0d0c10] border border-white/[0.06] shadow-2xl shadow-black/30">
              <div className="absolute top-0 left-0 right-0 h-7 bg-white/[0.02] border-b border-white/[0.04] flex items-center px-4 gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
                <div className="ml-3 flex items-center gap-1.5 text-[10px] text-beige-muted/30">
                  <Brain className="w-3 h-3" />
                  <span>DocMind AI — Workspace</span>
                </div>
              </div>
              <div className="pt-7 p-6 sm:p-10">
                <div className="grid grid-cols-12 gap-4 min-h-[280px] sm:min-h-[360px]">
                  <div className="col-span-3 space-y-2">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className={`h-7 rounded-lg bg-white/[0.03] ${i === 1 ? 'w-full' : i === 2 ? 'w-3/4' : i === 3 ? 'w-5/6' : 'w-2/3'}`} />
                    ))}
                    <div className="mt-6 space-y-2">
                      <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-blush/20 to-lavender/10" />
                      <div className="h-1.5 w-5/6 rounded-full bg-white/[0.03]" />
                      <div className="h-1.5 w-4/6 rounded-full bg-white/[0.03]" />
                    </div>
                  </div>
                  <div className="col-span-9 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-blush/8 border border-blush/15 flex items-center justify-center">
                        <Brain className="w-3.5 h-3.5 text-blush-light/60" />
                      </div>
                      <div>
                        <div className="h-2.5 w-32 rounded bg-gradient-to-r from-blush/20 to-lavender/10" />
                        <div className="h-2 w-20 rounded bg-white/[0.03] mt-1" />
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <div className="space-y-2">
                        <div className="h-2.5 w-full rounded bg-white/[0.04]" />
                        <div className="h-2.5 w-5/6 rounded bg-white/[0.04]" />
                        <div className="h-2.5 w-4/6 rounded bg-white/[0.04]" />
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-blush/[0.03] border border-blush/10">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-blush/15 border border-blush/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-[8px] text-blush-light font-semibold">AI</span>
                        </div>
                        <div className="space-y-2 flex-1">
                          <div className="h-2.5 w-full rounded bg-blush/10" />
                          <div className="h-2.5 w-5/6 rounded bg-blush/10" />
                          <div className="h-2.5 w-3/4 rounded bg-blush/10" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[90%] h-24 bg-gradient-to-r from-transparent via-blush/[0.06] to-transparent blur-3xl" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
