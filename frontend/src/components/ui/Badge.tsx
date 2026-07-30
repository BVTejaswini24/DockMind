import { cn } from '../../utils/cn'

interface BadgeProps {
  children: string
  variant?: 'success' | 'error' | 'info' | 'neutral'
  className?: string
}

const variants = {
  success: 'text-green-400/80 border-green-400/20 bg-green-400/5',
  error: 'text-red-400/80 border-red-400/20 bg-red-400/5',
  info: 'text-[#3054ff] border-[#3054ff]/20 bg-[#3054ff]/8',
  neutral: 'text-white/50 border-white/[0.08] bg-white/[0.03]',
}

export function Badge({ children, variant = 'neutral', className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 text-xs font-medium border rounded-full',
      variants[variant],
      className
    )}>
      {children}
    </span>
  )
}
