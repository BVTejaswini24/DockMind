import { MessageSquare } from 'lucide-react'

interface EmptyChatProps {
  suggestions: string[]
  onSuggestionClick: (text: string) => void
}

export function EmptyChat({ suggestions, onSuggestionClick }: EmptyChatProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-14 h-14 rounded-full bg-[#3054ff]/10 border border-[#3054ff]/20 flex items-center justify-center mb-6">
        <MessageSquare className="w-6 h-6 text-[#3054ff]" />
      </div>
      <h2 className="text-base text-white/80 mb-3">Ask your documents</h2>
      <p className="text-sm text-white/40 max-w-md leading-relaxed">
        Upload documents and ask questions. Answers will include inline citations from your sources with page references and confidence scores.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-10 w-full max-w-lg">
        {suggestions.map(s => (
          <button
            key={s}
            onClick={() => onSuggestionClick(s)}
            className="text-left p-4 rounded-xl border border-white/[0.08] bg-[#0B0B0B] text-sm text-white/50 hover:text-white/70 hover:border-white/[0.15] transition-all duration-300"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}
