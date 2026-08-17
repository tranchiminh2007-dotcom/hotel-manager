'use client'

import { useLanguage } from '@/lib/language-context'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  titleKey: string
  subtitleKey?: string
  descKey?: string
  light?: boolean
  className?: string
}

export default function SectionHeader({
  titleKey,
  subtitleKey,
  descKey,
  light = false,
  className,
}: SectionHeaderProps) {
  const { t } = useLanguage()

  return (
    <div className={cn('text-center', className)}>
      <h2
        className={cn(
          'text-2xl sm:text-3xl lg:text-[2.5rem] font-extralight uppercase leading-tight tracking-[0.2em] sm:tracking-[0.25em]',
          light ? 'text-white' : 'text-ink'
        )}
      >
        {t(titleKey)}
      </h2>
      {subtitleKey && (
        <p
          className={cn(
            'mt-4 text-[10px] uppercase tracking-[0.3em]',
            light ? 'text-white/70' : 'text-brand'
          )}
        >
          — {t(subtitleKey)} —
        </p>
      )}
      {descKey && (
        <p
          className={cn(
            'mt-5 mx-auto max-w-2xl text-sm font-light leading-relaxed',
            light ? 'text-white/80' : 'text-ink-soft'
          )}
        >
          {t(descKey)}
        </p>
      )}
    </div>
  )
}
