'use client'

import { useLanguage } from '@/lib/language-context'
import { translateData } from '@/lib/data-translations'

export default function TD({ children }: { children: string }) {
  const { locale } = useLanguage()
  return <>{translateData(children, locale)}</>
}
