'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Minus, Plus } from 'lucide-react'
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
        <img
          src="/images/hotel-hero.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-night/80" />

        <div className="relative grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-3 lg:gap-6 lg:p-14">
          {/* Cột trái */}
          <div className="order-2 text-center lg:order-1">
            <h3 className="font-display text-3xl font-light text-white lg:text-4xl">
              {t('widget.holiday')}
            </h3>
            <span className="mt-2 block text-brand">✕</span>
            <p className="mx-auto mt-4 max-w-xs text-xs font-light leading-relaxed text-white/70">
              {t('widget.holidayDesc')}
            </p>
            <Link
              href="/phong"
              className="mt-6 inline-block border-t border-white/30 pt-4 text-[10px] uppercase tracking-[0.24em] text-white transition-opacity hover:opacity-70"
            >
              {t('hero.roomsSuites')}
            </Link>
          </div>

          {/* Thẻ tìm phòng */}
          <div className="order-1 bg-white p-7 shadow-[0_18px_50px_rgba(0,0,0,0.25)] sm:p-9 lg:order-2">
            <div className="border-b border-line pb-5 text-center">
              <h3 className="font-display text-2xl font-light text-ink">
                {t('widget.searchRooms')}
              </h3>
              <p className="mt-1.5 text-[9px] uppercase tracking-[0.26em] text-ink-soft">
                {t('widget.startBooking')}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 py-6">
              <div className="text-center">
                <p className="mb-2.5 text-[9px] uppercase tracking-[0.2em] text-ink-soft">
                  {t('booking.checkIn')}
                </p>
                <input
                  type="date"
                  value={checkIn}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full border-none bg-transparent text-center text-sm font-light text-ink focus:outline-none"
                />
              </div>
              <div className="border-l border-line text-center">
                <p className="mb-2.5 text-[9px] uppercase tracking-[0.2em] text-ink-soft">
                  {t('booking.checkOut')}
                </p>
                <input
                  type="date"
                  value={checkOut}
                  min={checkIn}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full border-none bg-transparent text-center text-sm font-light text-ink focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between border-y border-line py-4">
              <button
                onClick={() => setGuests((g) => Math.max(1, g - 1))}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-brand hover:text-brand"
                aria-label="-"
              >
                <Minus className="h-3 w-3" strokeWidth={1.5} />
              </button>
              <span className="text-[11px] uppercase tracking-[0.2em] text-ink">
                {guests} {t('widget.guest')}
              </span>
              <button
                onClick={() => setGuests((g) => Math.min(10, g + 1))}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-brand hover:text-brand"
                aria-label="+"
              >
                <Plus className="h-3 w-3" strokeWidth={1.5} />
              </button>
            </div>

            <button
              onClick={submit}
              className="mt-6 w-full bg-brand py-3.5 text-[10px] uppercase tracking-[0.24em] text-white transition-colors hover:bg-brand-deep"
            >
              {t('widget.checkAvailability')}
            </button>
          </div>

          {/* Cột phải */}
          <div className="order-3 text-center">
            <h3 className="font-display text-2xl font-light text-white lg:text-3xl">
              {t('widget.bestPrice')}
            </h3>
            <span className="mt-2 block text-brand">✕</span>
            {cheapest && (
              <>
                <p className="mt-5 text-[10px] uppercase tracking-[0.24em] text-white/80">
                  {translateData(cheapest.name, locale)}
                </p>
                <p className="mt-3 text-3xl font-extralight text-white lg:text-4xl">
                  {formatVND(cheapest.basePrice)}
                </p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.22em] text-white/50">
                  {t('widget.perNightShort')}
                </p>
                <Link
                  href={`/dat-phong?type=${cheapest.slug}`}
                  className="mt-6 inline-block border-t border-white/30 pt-4 text-[10px] uppercase tracking-[0.24em] text-white transition-opacity hover:opacity-70"
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
