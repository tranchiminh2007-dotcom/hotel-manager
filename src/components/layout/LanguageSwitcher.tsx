'use client'

import { Globe } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { cn } from '@/lib/utils'

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useLanguage()

  return (
    <div className="flex items-center gap-2.5">
      {!compact && (
        <span className="hidden sm:flex items-center gap-1.5 text-white/60">
          <Globe className="h-3 w-3" strokeWidth={1.5} />
          <span className="text-[9px] uppercase tracking-[0.22em]">{t('ui.languages')}</span>
        </span>
      )}
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => setLocale('vi')}
          className={cn(
            'text-[9px] uppercase tracking-[0.18em] transition-colors',
            compact ? 'text-ink-soft hover:text-ink' : 'text-white/60 hover:text-white',
            locale === 'vi' && (compact ? 'text-ink font-medium' : 'text-white font-medium')
          )}
        >
          VI
        </button>
        <span className={compact ? 'text-line' : 'text-white/25'}>/</span>
        <button
          onClick={() => setLocale('en')}
          className={cn(
            'text-[9px] uppercase tracking-[0.18em] transition-colors',
            compact ? 'text-ink-soft hover:text-ink' : 'text-white/60 hover:text-white',
            locale === 'en' && (compact ? 'text-ink font-medium' : 'text-white font-medium')
          )}
        >
          EN
        </button>
      </div>
    </div>
  )
}
