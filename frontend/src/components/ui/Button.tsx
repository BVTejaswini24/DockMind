import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { cn } from '../../utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'pill'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  error?: boolean
  icon?: ReactNode
}

const variants = {
  primary:
    'bg-[#3054ff] text-white hover:shadow-[0_0_24px_-4px_rgba(48,84,255,0.4)]',
  secondary:
    'bg-transparent text-white/60 border border-white/[0.08] hover:border-white/[0.15] hover:text-white/80 hover:bg-white/[0.02]',
  ghost:
    'bg-transparent text-white/50 hover:text-white/80',
  danger:
    'bg-red-500/80 text-white hover:bg-red-500/60',
  pill:
    'bg-[#3054ff] text-white font-semibold rounded-full hover:shadow-[0_0_24px_-4px_rgba(48,84,255,0.4)]',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-5 py-3 text-sm gap-2.5',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, error, icon, children, disabled, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.1, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          'relative inline-flex items-center justify-center max-sm:min-h-[44px]',
          'transition-all duration-300',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3054ff]/50',
          'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
          error && !disabled && 'ring-2 ring-red-500/50',
          variant === 'pill' ? '' : 'rounded-[10px]',
          sizes[size],
          variants[variant],
          className
        )}
        disabled={disabled || loading}
        {...(props as any)}
      >
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-4 h-4 animate-spin" />
          </span>
        )}
        <span className={cn('inline-flex items-center gap-[inherit]', loading && 'invisible')}>
          {icon}
          {children}
        </span>
      </motion.button>
    )
  }
)
