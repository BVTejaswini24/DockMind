import type { ReactNode } from 'react'
import { CitationMarker } from './CitationMarker'
import type { Citation } from '../../types'

interface MarkdownRendererProps {
  text: string
  citations: Citation[]
  onCitationClick: (citation: Citation) => void
}

function parseInline(text: string, citations: Citation[]): ReactNode[] {
  const parts: ReactNode[] = []
  const regex = /(`{1,2})(.*?)\1|(\*\*)(.*?)\3|(\*)(.*?)\5|(\[(\d+)\])/g
  let lastIndex = 0
  let key = 0

  for (const match of text.matchAll(regex)) {
    if (match.index !== undefined && match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    if (match[2] !== undefined) {
      parts.push(<code key={key++} className="px-1.5 py-0.5 rounded bg-[#1a1a1a] text-[13px] text-[#3054ff]">{match[2]}</code>)
    } else if (match[4] !== undefined) {
      parts.push(<strong key={key++} className="text-white/90">{match[4]}</strong>)
    } else if (match[6] !== undefined) {
      parts.push(<em key={key++} className="text-white/50">{match[6]}</em>)
    } else if (match[8] !== undefined) {
      const num = parseInt(match[8], 10)
      const idx = num - 1
      parts.push(
        <CitationMarker
          key={`cit-${key++}`}
          number={num}
          citation={idx >= 0 && idx < citations.length ? citations[idx] : undefined}
        />
      )
    }

    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts
}

export function MarkdownRenderer({ text, citations }: MarkdownRendererProps) {
  const lines = text.split('\n')
  const elements: ReactNode[] = []
  let key = 0
  let inCodeBlock = false
  let codeBuffer: string[] = []
  let codeLang = ''

  const flushCodeBlock = () => {
    if (codeBuffer.length > 0) {
      elements.push(
        <pre key={`code-${key++}`} className="my-6 p-5 rounded-xl bg-[#1a1a1a] border border-white/[0.08] overflow-x-auto">
          <code className="text-[13px] leading-relaxed text-white/80">{codeBuffer.join('\n')}</code>
        </pre>
      )
      codeBuffer = []
    }
  }

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        flushCodeBlock()
        inCodeBlock = false
        codeLang = ''
      } else {
        flushCodeBlock()
        inCodeBlock = true
        codeLang = line.trim().slice(3).trim()
      }
      continue
    }

    if (inCodeBlock) {
      codeBuffer.push(line)
      continue
    }

    if (line.trim() === '') {
      elements.push(<div key={`empty-${key++}`} className="h-4" />)
      continue
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/)
    if (headingMatch) {
      const level = headingMatch[1].length
      const content = headingMatch[2]
      const cls = level === 1 ? 'text-base font-semibold mt-8 mb-3 text-white/90'
        : level === 2 ? 'text-base font-semibold mt-6 mb-3 text-white/85'
        : 'text-sm font-medium mt-5 mb-2 text-white/80'
      elements.push(
        <p key={`h-${key++}`} className={cls}>
          {parseInline(content, citations)}
        </p>
      )
      continue
    }

    const listMatch = line.match(/^[-*+]\s+(.+)$/)
    if (listMatch) {
      elements.push(
        <div key={`li-${key++}`} className="flex items-start gap-3 pl-1 my-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-white/[0.15] mt-2 shrink-0" />
          <span className="text-sm text-white/65 flex-1 leading-relaxed">{parseInline(listMatch[1], citations)}</span>
        </div>
      )
      continue
    }

    const olMatch = line.match(/^\d+\.\s+(.+)$/)
    if (olMatch) {
      elements.push(
        <div key={`ol-${key++}`} className="flex items-start gap-3 pl-1 my-1.5">
          <span className="text-sm text-white/40 mt-0.5 shrink-0 w-4 text-right">{key}</span>
          <span className="text-sm text-white/65 flex-1 leading-relaxed">{parseInline(olMatch[1], citations)}</span>
        </div>
      )
      continue
    }

    elements.push(
      <p key={`p-${key++}`} className="text-sm text-white/65 leading-relaxed my-2">
        {parseInline(line, citations)}
      </p>
    )
  }

  flushCodeBlock()

  return <div className="space-y-0.5">{elements}</div>
}
