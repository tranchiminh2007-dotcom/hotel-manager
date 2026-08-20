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
      {subtitleKey && (
        <p className="mb-4 text-[12px] uppercase tracking-[0.18em] text-brand-deep">
          {t(subtitleKey)}
        </p>
      )}
      <h1 className="text-[28px] font-light uppercase tracking-[0.08em] text-ink sm:text-[34px] lg:text-[40px]">
        {t(titleKey)}
      </h1>
      <span className="mx-auto mt-6 block h-px w-16 bg-brand" />
      {descKey && (
        <p className="mx-auto mt-7 max-w-2xl text-base leading-[1.75] text-ink-soft">
          {t(descKey)}
        </p>
      )}
      {children}
    </div>
  )
}
