'use client'

import Link from 'next/link'
import { ChevronDown, Star } from 'lucide-react'
import { HOTEL_CONFIG } from '@/lib/constants'
import { useLanguage } from '@/lib/language-context'

export default function HeroSection() {
  const { t } = useLanguage()

  return (
    <>
      <section className="px-4 pt-4 sm:px-6 lg:px-10">
        <div className="relative h-[62vh] min-h-[440px] overflow-hidden lg:h-[74vh]">
          <img
            src="/images/hotel-hero.jpg"
            alt={HOTEL_CONFIG.name}
            className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
            <h1 className="text-3xl font-extralight uppercase leading-[1.15] tracking-[0.16em] sm:text-5xl sm:tracking-[0.2em] lg:text-6xl">
              Long Hải Hotel
            </h1>

            <div className="mt-7 space-y-2">
              <p className="text-[9px] uppercase tracking-[0.28em] text-white/85 sm:text-[10px]">
                {HOTEL_CONFIG.address}
              </p>
              <p className="text-[9px] uppercase tracking-[0.28em] text-white/85 sm:text-[10px]">
                {t('ui.tel')} {HOTEL_CONFIG.phone}
              </p>
            </div>

            <div className="mt-5 flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-2.5 w-2.5 fill-white text-white" strokeWidth={0} />
              ))}
            </div>

            <div className="mt-8 w-full max-w-[280px] border-t border-white/35 pt-6">
              <Link
                href="/phong"
                className="text-[10px] uppercase tracking-[0.26em] text-white transition-opacity hover:opacity-70"
              >
                {t('hero.roomsSuites')}
              </Link>
            </div>
          </div>

          {/* Nút cuộn xuống */}
          <div className="absolute bottom-0 left-1/2 z-20 -translate-x-1/2 translate-y-1/2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
              <ChevronDown className="h-4 w-4 text-ink-soft" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </section>

      {/* Dải địa chỉ / email */}
      <div className="px-4 pt-9 pb-2 sm:px-6 lg:px-10">
        <div className="flex flex-col items-center justify-between gap-2 text-[9px] uppercase tracking-[0.22em] text-ink-soft sm:flex-row">
          <p>
            <span className="text-ink">{t('ui.address')} :</span> {HOTEL_CONFIG.address}
          </p>
          <p>
            <span className="text-ink">Email :</span>{' '}
            <a
              href={`mailto:${HOTEL_CONFIG.email}`}
              className="normal-case tracking-normal text-brand hover:underline"
            >
              {HOTEL_CONFIG.email}
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
