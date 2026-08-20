'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Minus, Plus } from 'lucide-react'
import CoverImage from '@/components/ui/CoverImage'
import { useLanguage } from '@/lib/language-context'
import { formatVND } from '@/lib/format'
import { translateData } from '@/lib/data-translations'

interface BookingWidgetProps {
  cheapest?: { name: string; slug: string; basePrice: number } | null
}

export default function BookingWidget({ cheapest }: BookingWidgetProps) {
  const router = useRouter()
  const { t, locale } = useLanguage()

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const dayAfter = new Date()
  dayAfter.setDate(dayAfter.getDate() + 2)

  const [checkIn, setCheckIn] = useState(tomorrow.toISOString().split('T')[0])
  const [checkOut, setCheckOut] = useState(dayAfter.toISOString().split('T')[0])
  const [guests, setGuests] = useState(2)

  function submit() {
    const params = new URLSearchParams({ checkIn, checkOut, guests: String(guests) })
    router.push(`/dat-phong?${params}`)
  }

  return (
    <section className="px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
      <div className="relative overflow-hidden">
        <CoverImage src="/images/hotel-hero.jpg" alt="" sizes="100vw" />
        <div className="absolute inset-0 bg-night/85" />

        <div className="relative grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-3 lg:gap-8 lg:p-14">
          {/* Cột trái */}
          <div className="order-2 text-center lg:order-1">
            <h3 className="font-display text-[32px] font-light text-white lg:text-[38px]">
              {t('widget.holiday')}
            </h3>
            <span className="mx-auto mt-4 block h-px w-10 bg-brand" />
            <p className="mx-auto mt-5 max-w-sm text-[15px] leading-[1.75] text-white/85">
              {t('widget.holidayDesc')}
            </p>
            <Link
              href="/phong"
              className="mt-7 inline-block border-b border-white/40 pb-1.5 text-[14px] uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-75"
            >
              {t('hero.roomsSuites')}
            </Link>
          </div>

          {/* Thẻ tìm phòng */}
          <div className="order-1 bg-white p-7 shadow-[0_18px_50px_rgba(0,0,0,0.25)] sm:p-9 lg:order-2">
            <div className="border-b border-line pb-5 text-center">
              <h3 className="font-display text-[26px] font-light text-ink">
                {t('widget.searchRooms')}
              </h3>
              <p className="mt-1.5 text-[13px] uppercase tracking-[0.14em] text-ink-muted">
                {t('widget.startBooking')}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 py-6">
              <div className="text-center">
                <label
                  htmlFor="w-checkin"
                  className="mb-2.5 block text-[13px] uppercase tracking-[0.1em] text-ink-soft"
                >
                  {t('booking.checkIn')}
                </label>
                <input
                  id="w-checkin"
                  type="date"
                  value={checkIn}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full border-none bg-transparent text-center text-base text-ink focus:outline-none"
                />
              </div>
              <div className="border-l border-line text-center">
                <label
                  htmlFor="w-checkout"
                  className="mb-2.5 block text-[13px] uppercase tracking-[0.1em] text-ink-soft"
                >
                  {t('booking.checkOut')}
                </label>
                <input
                  id="w-checkout"
                  type="date"
                  value={checkOut}
                  min={checkIn}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full border-none bg-transparent text-center text-base text-ink focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between border-y border-line py-4">
              <button
                onClick={() => setGuests((g) => Math.max(1, g - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-brand hover:text-brand"
                aria-label="Giảm số khách"
              >
                <Minus className="h-3.5 w-3.5" strokeWidth={1.6} />
              </button>
              <span className="text-[15px] text-ink">
                {guests} {t('widget.guest')}
              </span>
              <button
                onClick={() => setGuests((g) => Math.min(10, g + 1))}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-brand hover:text-brand"
                aria-label="Tăng số khách"
              >
                <Plus className="h-3.5 w-3.5" strokeWidth={1.6} />
              </button>
            </div>

            <button
              onClick={submit}
              className="mt-6 w-full bg-brand-deep py-3.5 text-[14px] uppercase tracking-[0.12em] text-white transition-colors hover:bg-night"
            >
              {t('widget.checkAvailability')}
            </button>
          </div>

          {/* Cột phải */}
          <div className="order-3 text-center">
            <h3 className="font-display text-[26px] font-light text-white lg:text-[30px]">
              {t('widget.bestPrice')}
            </h3>
            <span className="mx-auto mt-4 block h-px w-10 bg-brand" />
            {cheapest && (
              <>
                <p className="mt-6 text-[15px] uppercase tracking-[0.1em] text-white/85">
                  {translateData(cheapest.name, locale)}
                </p>
                <p className="mt-3 text-[34px] font-light text-white lg:text-[40px]">
                  {formatVND(cheapest.basePrice)}
                </p>
                <p className="mt-1 text-[13px] text-white/65">{t('widget.perNightShort')}</p>
                <Link
                  href={`/dat-phong?type=${cheapest.slug}`}
                  className="mt-7 inline-block border-b border-white/40 pb-1.5 text-[14px] uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-75"
                >
                  {t('widget.flashSale')}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
