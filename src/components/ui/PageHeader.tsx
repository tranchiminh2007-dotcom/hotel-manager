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
    <div className="mb-14 text-center lg:mb-20">
      {subtitleKey && <p className="eyebrow mb-4 text-brand-deep">{t(subtitleKey)}</p>}
      <h1 className="h-section text-[28px] text-ink sm:text-[34px] lg:text-[40px]">
        {t(titleKey)}
      </h1>
      <span className="mx-auto mt-6 block h-px w-16 bg-brand" />
      {descKey && (
        <p className="body-text mx-auto mt-7 max-w-2xl text-ink-soft">{t(descKey)}</p>
      )}
      {children}
    </div>
  )
}
