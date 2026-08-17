'use client'

import { useLanguage } from '@/lib/language-context'

interface PageHeaderProps {
  titleKey: string
  descKey?: string
  subtitleKey?: string
  children?: React.ReactNode
}

export default function PageHeader({
  titleKey,
  descKey,
  subtitleKey,
  children,
}: PageHeaderProps) {
  const { t } = useLanguage()

  return (
    <div className="text-center mb-14 lg:mb-20">
      <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extralight uppercase leading-tight tracking-[0.2em] sm:tracking-[0.25em] text-ink">
        {t(titleKey)}
      </h1>
      {subtitleKey && (
        <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-brand">
          — {t(subtitleKey)} —
        </p>
      )}
      {descKey && (
        <p className="mt-6 mx-auto max-w-2xl text-sm font-light leading-relaxed text-ink-soft">
          {t(descKey)}
        </p>
      )}
      {children}
    </div>
  )
}
