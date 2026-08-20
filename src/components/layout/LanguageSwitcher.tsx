'use client'

import { Globe } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { cn } from '@/lib/utils'

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useLanguage()

  const btn = (active: boolean) =>
    cn(
      'text-[12px] tracking-[0.08em] transition-colors',
      compact
        ? active
          ? 'text-ink font-medium'
          : 'text-ink-muted hover:text-ink'
        : active
          ? 'text-white font-medium'
          : 'text-white/65 hover:text-white'
    )

  return (
    <div className="flex items-center gap-2.5">
      {!compact && (
        <span className="flex items-center gap-1.5 text-white/70">
          <Globe className="h-3.5 w-3.5" strokeWidth={1.6} />
          <span className="text-[12px] tracking-[0.1em]">{t('ui.languages')}</span>
        </span>
      )}
      <div className="flex items-center gap-2">
        <button onClick={() => setLocale('vi')} className={btn(locale === 'vi')}>
          VI
        </button>
        <span className={compact ? 'text-line' : 'text-white/30'}>/</span>
        <button onClick={() => setLocale('en')} className={btn(locale === 'en')}>
          EN
        </button>
      </div>
    </div>
  )
}
