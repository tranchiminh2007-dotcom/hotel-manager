'use client'

import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'light' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center uppercase font-normal transition-all duration-300 focus:outline-none disabled:opacity-45 disabled:pointer-events-none whitespace-nowrap',
          {
            'bg-brand text-white hover:bg-brand-deep': variant === 'primary',
            'bg-night text-white hover:bg-ink': variant === 'secondary',
            'border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-white':
              variant === 'outline',
            'border border-white/50 text-white hover:bg-white hover:text-ink':
              variant === 'light',
            'bg-red-700/90 text-white hover:bg-red-800': variant === 'danger',
            'text-ink-soft hover:text-ink': variant === 'ghost',
          },
          {
            'px-5 py-2.5 text-[10px] tracking-[0.18em]': size === 'sm',
            'px-7 py-3 text-[11px] tracking-[0.2em]': size === 'md',
            'px-10 py-4 text-xs tracking-[0.22em]': size === 'lg',
          },
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export default Button
