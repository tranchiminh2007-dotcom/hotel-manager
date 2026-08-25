'use client'

import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'light' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Nút bấm theo chuẩn các trang khách sạn lớn: chữ IN HOA, cỡ nhỏ,
 * nhưng weight 600 để nét chữ sắc — chữ mảnh giãn rộng sẽ bị nhạt.
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center font-semibold uppercase tracking-[0.1em] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-deep disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap',
          {
            'bg-brand-deep text-white hover:bg-night': variant === 'primary',
            'bg-night text-white hover:bg-ink': variant === 'secondary',
            'border border-ink/35 text-ink hover:border-ink hover:bg-ink hover:text-white':
              variant === 'outline',
            'border border-white/70 text-white hover:bg-white hover:text-ink':
              variant === 'light',
            'bg-red-700 text-white hover:bg-red-800': variant === 'danger',
            'font-normal normal-case tracking-normal text-ink-soft hover:text-ink':
              variant === 'ghost',
          },
          {
            'px-5 py-2.5 text-[12px]': size === 'sm',
            'px-7 py-3 text-[13px]': size === 'md',
            'px-9 py-4 text-[13px]': size === 'lg',
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
