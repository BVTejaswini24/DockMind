import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-sm text-white/50">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'w-full px-4 py-2.5 text-sm bg-transparent border text-white/80 placeholder:text-white/30',
            'rounded-[10px]',
            'focus:outline-none focus:border-[#3054ff]/30',
            'transition-all duration-300',
            error ? 'border-red-500/50' : 'border-white/[0.08]',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-400/80 mt-1">{error}</p>}
      </div>
    )
  }
)
