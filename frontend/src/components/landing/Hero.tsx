import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, Upload, MessageSquare, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import Hls from 'hls.js'

const VIDEO_SRC = 'https://stream.mux.com/T6oQJQ02cQ6N01TR6iHwZkKFkbepS34dkkIc9iukgy400g.m3u8'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(VIDEO_SRC)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((e) => console.log('Auto-play prevented:', e))
      })
      return () => {
        hls.destroy()
      }
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = VIDEO_SRC
      video.addEventListener('loadedmetadata', () => {
        video.play().catch((e) => console.log('Auto-play prevented:', e))
      })
    }
  }, [])

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-black text-white">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        muted
        loop
        playsInline
        autoPlay
      />

      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-sm font-['Instrument_Sans'] text-white/60 backdrop-blur-sm">
            <BookOpen className="w-3.5 h-3.5" />
            AI-Powered Retrieval-Augmented Generation
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-sans font-semibold text-5xl sm:text-7xl lg:text-[96px] leading-[1] tracking-tighter bg-gradient-to-b from-white via-white to-[#b4c0ff] bg-clip-text text-transparent max-w-5xl mx-auto"
        >
          Understand Every Document Instantly
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-['Instrument_Sans'] text-base sm:text-lg leading-[1.7] text-white max-w-2xl mx-auto mt-6"
        >
          Upload PDFs, DOCX, and TXT files. Ask questions in natural language and receive grounded answers with accurate citations powered by Retrieval-Augmented Generation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-5 items-center justify-center mt-10"
        >
          <Link
            to="/documents"
            className="inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-white text-[#0a0400] font-medium text-base font-['Instrument_Sans'] group hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300"
          >
            <span>Upload Documents</span>
            <span className="w-10 h-10 rounded-full bg-[#3054ff] hover:bg-[#2040e0] flex items-center justify-center transition-colors">
              <Upload className="w-4 h-4 text-white" />
            </span>
          </Link>

          <Link
            to="/chat"
            className="group inline-flex items-center gap-2 text-white/70 hover:text-white px-5 py-2.5 rounded-lg backdrop-blur-sm hover:bg-white/5 transition-all font-['Instrument_Sans'] text-base"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Try AI Chat</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
