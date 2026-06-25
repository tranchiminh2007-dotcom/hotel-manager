'use client'

import { useLanguage } from '@/lib/language-context'
import { Globe } from 'lucide-react'
import { useState } from 'react'

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage()
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2 py-1.5 text-sm text-gray-600 hover:text-amber-800 rounded-lg hover:bg-amber-50 transition-colors"
      >
        <Globe className="h-4 w-4" />
        <span>{locale === 'vi' ? 'VI' : 'EN'}</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-50 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[160px]">
            <p className="px-3 py-1.5 text-xs text-gray-400 font-medium">{t('lang.choose')}</p>
            <button
              onClick={() => { setLocale('vi'); setOpen(false) }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-amber-50 flex items-center gap-2 ${locale === 'vi' ? 'text-amber-800 font-medium bg-amber-50' : 'text-gray-700'}`}
            >
              🇻🇳 Tiếng Việt
            </button>
            <button
              onClick={() => { setLocale('en'); setOpen(false) }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-amber-50 flex items-center gap-2 ${locale === 'en' ? 'text-amber-800 font-medium bg-amber-50' : 'text-gray-700'}`}
            >
              🇬🇧 English
            </button>
          </div>
        </>
      )}
    </div>
  )
}
