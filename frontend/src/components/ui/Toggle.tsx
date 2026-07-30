import { cn } from '../../utils/cn'

interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
}

export function Toggle({ checked, onChange, className }: ToggleProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-5 w-9 shrink-0 rounded-full border-0 transition-colors duration-300',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3054ff]/50',
        checked ? 'bg-[#3054ff]' : 'bg-white/[0.08]',
        className
      )}
    >
      <span
        className={cn(
          'pointer-events-none inline-block h-3.5 w-3.5 rounded-full bg-white transform transition-transform duration-300 mt-[3px]',
          checked ? 'translate-x-[18px]' : 'translate-x-[2px]'
        )}
      />
    </button>
  )
}
