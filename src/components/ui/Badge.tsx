import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  className?: string
}

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] font-normal',
        className
      )}
    >
      {children}
    </span>
  )
}
