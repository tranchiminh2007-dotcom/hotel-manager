'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Check, Phone } from 'lucide-react'
import Button from '@/components/ui/Button'
import { HOTEL_CONFIG } from '@/lib/constants'
import { useLanguage } from '@/lib/language-context'

function SuccessContent() {
  const searchParams = useSearchParams()
  const code = searchParams.get('code') || ''
  const { t } = useLanguage()
  const tel = HOTEL_CONFIG.phone.replace(/\s/g, '')

  return (
    <div className="px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-brand">
          <Check className="h-6 w-6 text-brand" strokeWidth={1.3} />
        </div>

        <h1 className="mt-8 text-2xl font-light uppercase leading-tight tracking-[0.12em] text-ink lg:text-3xl">
          {t('success.title')}
        </h1>
        <span className="mx-auto mt-5 block h-px w-14 bg-brand" />
        <p className="mt-6 text-base leading-[1.75] text-ink-soft">
          {t('success.desc')}
        </p>

        <div className="mt-10 bg-sand px-8 py-10">
          <p className="text-[12px] uppercase tracking-[0.14em] text-ink-soft">
            {t('success.code')}
          </p>
          <p className="mt-4 text-2xl font-light tracking-[0.08em] text-brand-deep lg:text-3xl">
            {code}
          </p>
          <p className="mt-5 text-[15px] text-ink-soft">{t('success.saveCode')}</p>
        </div>

        <div className="mt-10 space-y-3">
          <Link href="/" className="block">
            <Button className="w-full">{t('success.home')}</Button>
          </Link>
          <a href={`tel:${tel}`} className="block">
            <Button variant="outline" className="w-full gap-2">
              <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />
              {t('success.contact')} · {HOTEL_CONFIG.phone}
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default function BookingSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-[12px] uppercase tracking-[0.12em] text-ink-soft">
          ...
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  )
}
