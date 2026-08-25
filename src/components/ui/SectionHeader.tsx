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
      {subtitleKey && (
        <p className={cn('eyebrow mb-4', light ? 'text-brand' : 'text-brand-deep')}>
          {t(subtitleKey)}
        </p>
      )}
      <h2
        className={cn(
          'h-section text-[26px] sm:text-[32px] lg:text-[38px]',
          light ? 'text-white' : 'text-ink'
        )}
      >
        {t(titleKey)}
      </h2>
      <span className={cn('mx-auto mt-6 block h-px w-16', light ? 'bg-white/40' : 'bg-brand')} />
      {descKey && (
        <p
          className={cn(
            'body-text mx-auto mt-7 max-w-2xl',
            light ? 'text-white/85' : 'text-ink-soft'
          )}
        >
          {t(descKey)}
        </p>
      )}
    </div>
  )
}
