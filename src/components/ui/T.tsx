'use client'

import { useLanguage } from '@/lib/language-context'

export default function T({ k, children }: { k: string; children?: React.ReactNode }) {
  const { t } = useLanguage()
  return <>{t(k)}{children}</>
}
