import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, RefreshCw, ChevronDown, FileText, ThumbsUp, ThumbsDown } from 'lucide-react'
import { MarkdownRenderer } from './MarkdownRenderer'
import { useStreamingText } from '../../hooks/useStreamingText'
import type { Citation } from '../../types'
import { cn } from '../../utils/cn'

interface AIAnswerProps {
  content: string
  citations: Citation[]
  streaming?: boolean
  onRegenerate?: () => void
}

export function AIAnswer({ content, citations, streaming = false, onRegenerate }: AIAnswerProps) {
  const [copied, setCopied] = useState(false)
  const [sourcesOpen, setSourcesOpen] = useState(false)
  const [feedback, setFeedback] = useState<'like' | 'dislike' | null>(null)
  const { displayedText, isComplete } = useStreamingText(streaming ? content : '', 15)
  const displayContent = streaming ? displayedText : content
  const showCursor = streaming && !isComplete

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      <div className="max-w-3xl">
        <MarkdownRenderer
          text={displayContent}
          citations={citations}
          onCitationClick={() => {}}
        />
        {showCursor && (
          <span className="inline-block w-[2px] h-[1em] bg-[#3054ff]/70 animate-pulse ml-0.5 align-middle" />
        )}
      </div>

      <div className={cn(
        'flex items-center gap-1 mt-6 transition-opacity duration-300',
        isComplete ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'
      )}>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-white/40 hover:text-white/70 hover:bg-white/[0.03] transition-colors duration-300"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
        {onRegenerate && (
          <button
            onClick={onRegenerate}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-white/40 hover:text-white/70 hover:bg-white/[0.03] transition-colors duration-300"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Regenerate
          </button>
        )}
        <button
          onClick={() => setFeedback(prev => prev === 'like' ? null : 'like')}
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors duration-300',
            feedback === 'like'
              ? 'text-green-400 bg-green-400/10'
              : 'text-white/40 hover:text-white/70 hover:bg-white/[0.03]'
          )}
        >
          <ThumbsUp className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setFeedback(prev => prev === 'dislike' ? null : 'dislike')}
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors duration-300',
            feedback === 'dislike'
              ? 'text-red-400 bg-red-400/10'
              : 'text-white/40 hover:text-white/70 hover:bg-white/[0.03]'
          )}
        >
          <ThumbsDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {citations.length > 0 && isComplete && (
        <div className="mt-8 border-t border-white/[0.06] pt-6">
          <button
            onClick={() => setSourcesOpen(!sourcesOpen)}
            className="flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors duration-300"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{citations.length} source{citations.length > 1 ? 's' : ''}</span>
            <ChevronDown className={cn('w-3 h-3 transition-transform duration-300', sourcesOpen && 'rotate-180')} />
          </button>
          {sourcesOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-3">
                {citations.map((cit, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-[#0B0B0B] border border-white/[0.08]">
                    <span className="w-5 h-5 rounded-lg bg-[#3054ff]/10 text-[#3054ff] text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <div className="space-y-1">
                      <p className="text-sm text-white/80">{cit.documentName}</p>
                      <p className="text-xs text-white/40">
                        {cit.pageNumber !== null && `Page ${cit.pageNumber} · `}
                        {(cit.confidence * 100).toFixed(0)}% confidence
                      </p>
                      <p className="text-sm text-white/50 leading-relaxed line-clamp-2">{cit.snippet}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      )}

      {streaming && displayedText === '' && (
        <div className="space-y-3 mt-4">
          <div className="h-4 bg-white/[0.04] rounded-lg w-3/4" />
          <div className="h-4 bg-white/[0.04] rounded-lg w-1/2" />
          <div className="h-4 bg-white/[0.04] rounded-lg w-5/6" />
        </div>
      )}
    </motion.div>
  )
}
