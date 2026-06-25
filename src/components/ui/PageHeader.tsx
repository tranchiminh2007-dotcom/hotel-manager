'use client'

import { useLanguage } from '@/lib/language-context'

interface PageHeaderProps {
  titleKey: string
  descKey?: string
  children?: React.ReactNode
}

export default function PageHeader({ titleKey, descKey, children }: PageHeaderProps) {
  const { t } = useLanguage()

  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">{t(titleKey)}</h1>
      {descKey && (
        <p className="text-gray-600 max-w-2xl mx-auto">{t(descKey)}</p>
      )}
      {children}
    </div>
  )
}
