import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown } from 'lucide-react'
import type { Citation } from '../../types'

interface CitationMarkerProps {
  number: number
  citation?: Citation
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text
  return text.slice(0, max).trimEnd() + '…'
}

function CitationCard({
  citation,
  number,
  onClose,
  cardRef,
}: {
  citation: Citation
  number: number
  onClose: () => void
  cardRef: React.RefObject<HTMLDivElement>
}) {
  const [expanded, setExpanded] = useState(false)
  const snippet = citation.snippet || ''

  const label = `citation, source ${citation.documentName}${citation.pageNumber !== null ? `, page ${citation.pageNumber}` : ''}`

  return (
    <div
      ref={cardRef}
      tabIndex={-1}
      role="dialog"
      aria-label={label}
      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3054ff]/50"
    >
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-1.5 h-1.5 rounded-full bg-[#3054ff] shrink-0" />
            <span className="text-sm text-white/80 truncate">{citation.documentName}</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close citation"
            className="shrink-0 ml-2 p-0.5 rounded-lg text-white/40 hover:text-white/70 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3054ff]/50"
          >
            <X className="w-3 h-3" />
          </button>
        </div>

        <div className="flex items-center gap-3 text-xs text-white/40">
          {citation.pageNumber !== null && (
            <span>Page {citation.pageNumber}</span>
          )}
          <span>{(citation.confidence * 100).toFixed(0)}% confidence</span>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-white/50 leading-relaxed">
            {expanded ? snippet : truncate(snippet, 120)}
          </p>

          {snippet.length > 120 && (
            <button
              onClick={() => setExpanded(prev => !prev)}
              className="flex items-center gap-1 text-xs text-[#3054ff] hover:text-[#3054ff]/80 transition-colors duration-300"
            >
              <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
              {expanded ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 border-t border-white/[0.06]">
              <p className="text-xs text-white/30 uppercase tracking-wider mb-2">Full source</p>
              <p className="text-sm text-white/50 leading-relaxed whitespace-pre-wrap">{snippet}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function CitationMarker({ number, citation }: CitationMarkerProps) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => {
    setOpen(false)
    buttonRef.current?.focus()
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') close()
  }, [close])

  useEffect(() => {
    if (!open || !cardRef.current) return
    const timer = setTimeout(() => cardRef.current?.focus(), 50)
    return () => clearTimeout(timer)
  }, [open])

  useEffect(() => {
    if (!open) return
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !cardRef.current) return
      const focusable = cardRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length === 0) {
        e.preventDefault()
        return
      }
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleTab)
    return () => document.removeEventListener('keydown', handleTab)
  }, [open])

  const label = citation
    ? `citation, source ${citation.documentName}${citation.pageNumber !== null ? `, page ${citation.pageNumber}` : ''}`
    : `citation ${number}`

  return (
    <span className="relative inline">
      <button
        ref={buttonRef}
        onClick={(e) => { e.stopPropagation(); setOpen(!open) }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onKeyDown={handleKeyDown}
        aria-label={label}
        className="inline-flex items-center justify-center w-[18px] h-[18px] text-xs
                   rounded bg-[#3054ff] text-white
                   hover:brightness-110 transition-all duration-300
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3054ff]/50
                   align-middle mx-0.5 -mt-0.5 cursor-pointer"
      >
        {number}
      </button>

      <AnimatePresence>
        {open && citation && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.96 }}
              transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
              className="hidden sm:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72
                         bg-[#0B0B0B] border border-white/[0.08] rounded-xl z-50 overflow-hidden"
            >
              <CitationCard citation={citation} number={number} onClose={close} cardRef={cardRef} />
            </motion.div>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="sm:hidden fixed inset-0 z-50"
                  onClick={close}
                  onKeyDown={handleKeyDown}
                >
                  <div className="absolute inset-0 bg-black/40" />
                  <motion.div
                    ref={cardRef}
                    tabIndex={-1}
                    role="dialog"
                    aria-label={label}
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute bottom-0 left-0 right-0 bg-[#0B0B0B] border-t border-white/[0.08] rounded-t-xl p-5 pb-8"
                    onClick={e => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-8 h-1 rounded-full bg-white/[0.06] mx-auto" />
                      <button
                        onClick={close}
                        aria-label="Close citation"
                        className="p-1 rounded-lg text-white/40 hover:text-white/70 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3054ff]/50"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <CitationCard citation={citation} number={number} onClose={close} cardRef={cardRef} />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>

      {open && !citation && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5
                        bg-[#0B0B0B] border border-white/[0.08] rounded-xl text-sm text-white/50
                        whitespace-nowrap z-50">
          Source unavailable
        </span>
      )}
    </span>
  )
}
