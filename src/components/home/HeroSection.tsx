'use client'

import Link from 'next/link'
import { ChevronDown, Star } from 'lucide-react'
import CoverImage from '@/components/ui/CoverImage'
import { HOTEL_CONFIG } from '@/lib/constants'
import { useLanguage } from '@/lib/language-context'

export default function HeroSection() {
  const { t } = useLanguage()
  const tel = HOTEL_CONFIG.phone.replace(/\s/g, '')

  return (
    <>
      <section className="px-4 pt-4 sm:px-6 lg:px-10">
        <div className="relative h-[62vh] min-h-[460px] overflow-hidden lg:h-[72vh]">
          <CoverImage
            src="/images/hotel-hero.jpg"
            alt={HOTEL_CONFIG.name}
            priority
            sizes="100vw"
            className="object-[center_30%]"
          />
          {/* Lớp phủ để chữ trắng luôn đủ tương phản */}
          <div className="absolute inset-0 bg-black/50" />

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
            <h1 className="text-[30px] font-light uppercase leading-[1.2] tracking-[0.08em] sm:text-[46px] lg:text-[60px]">
              Long Hải Hotel
            </h1>

            <div className="mt-7 space-y-2">
              <p className="text-[14px] tracking-[0.06em] text-white">
                {HOTEL_CONFIG.address}
              </p>
              <p className="text-[14px] tracking-[0.06em] text-white">
                {t('ui.tel')}{' '}
                <a href={`tel:${tel}`} className="hover:underline">
                  {HOTEL_CONFIG.phone}
                </a>
              </p>
            </div>

            <div className="mt-5 flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-white text-white" strokeWidth={0} />
              ))}
            </div>

            <div className="mt-9 w-full max-w-[300px] border-t border-white/40 pt-6">
              <Link
                href="/phong"
                className="text-[14px] uppercase tracking-[0.14em] text-white transition-opacity hover:opacity-75"
              >
                {t('hero.roomsSuites')}
              </Link>
            </div>
          </div>

          {/* Nút cuộn xuống */}
          <div className="absolute bottom-0 left-1/2 z-20 -translate-x-1/2 translate-y-1/2">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.14)]">
              <ChevronDown className="h-4 w-4 text-ink-soft" strokeWidth={1.6} />
            </div>
          </div>
        </div>
      </section>

      {/* Dải địa chỉ / email */}
      <div className="px-4 pt-10 pb-2 sm:px-6 lg:px-10">
        <div className="flex flex-col items-center justify-between gap-2 text-[14px] text-ink-soft sm:flex-row">
          <p>
            <span className="text-ink">{t('ui.address')}:</span> {HOTEL_CONFIG.address}
          </p>
          <p>
            <span className="text-ink">Email:</span>{' '}
            <a
              href={`mailto:${HOTEL_CONFIG.email}`}
              className="text-brand-deep hover:underline"
            >
              {HOTEL_CONFIG.email}
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
