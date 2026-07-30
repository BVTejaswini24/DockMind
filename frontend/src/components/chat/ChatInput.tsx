import { useRef, useEffect } from 'react'
import { Send } from 'lucide-react'

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  disabled?: boolean
  placeholder?: string
}

export function ChatInput({ value, onChange, onSend, disabled, placeholder }: ChatInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className="border-t border-white/[0.06] bg-black">
      <div className="max-w-3xl mx-auto px-6 py-5">
        <div className="flex items-center gap-3 bg-[#111111] border border-white/[0.08] rounded-xl px-4 py-3 focus-within:border-[#3054ff]/30 transition-all duration-300">
          <input
            ref={inputRef}
            value={value}
            onChange={e => onChange(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && onSend()}
            placeholder={placeholder || 'Ask a question about your documents...'}
            disabled={disabled}
            className="flex-1 bg-transparent text-sm text-white/80 placeholder:text-white/30 focus:outline-none disabled:opacity-50"
          />
          <button
            onClick={onSend}
            disabled={!value.trim() || disabled}
            className="p-1.5 rounded-xl text-white/40 hover:text-[#3054ff] hover:bg-[#3054ff]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-300 shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
