'use client'

import { cn } from '@/lib/utils'
import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="mb-2 block text-[13px] text-ink-soft">
            {label}
          </label>
        )}
        {/* text-base (16px) để iOS không tự phóng to khi bấm vào ô nhập */}
        <input
          ref={ref}
          id={id}
          className={cn(
            'w-full border border-line bg-white px-4 py-3 text-base text-ink transition-colors placeholder:text-ink-muted focus:border-brand focus:outline-none',
            error && 'border-red-500 focus:border-red-600',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-[13px] text-red-600">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
