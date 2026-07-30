import { cn } from '../../utils/cn'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div className={cn(
      'rounded-2xl p-6 border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl',
      hover && 'cursor-pointer hover:border-white/[0.12] transition-all duration-300',
      className
    )}>
      {children}
    </div>
  )
}
