'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Search, BedDouble, Users, Maximize } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { placeholderImage } from '@/lib/utils'
import { formatVND } from '@/lib/format'
import { useLanguage } from '@/lib/language-context'
import { translateData } from '@/lib/data-translations'
import CoverImage from '@/components/ui/CoverImage'

interface AvailableRoom {
  id: string
  number: string
  floor: number
}

interface RoomTypeResult {
  id: string
  name: string
  slug: string
  basePrice: number
  maxGuests: number
  size: number
  bedType: string
  imageUrl: string | null
  availableRooms: AvailableRoom[]
  availableCount: number
}

function BookingSearchContent() {
  const searchParams = useSearchParams()
  const preselectedType = searchParams.get('type') || ''
  const { t, locale } = useLanguage()
  const td = (s: string) => translateData(s, locale)

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const dayAfter = new Date()
  dayAfter.setDate(dayAfter.getDate() + 2)

  const [checkIn, setCheckIn] = useState(
    searchParams.get('checkIn') || tomorrow.toISOString().split('T')[0]
  )
  const [checkOut, setCheckOut] = useState(
    searchParams.get('checkOut') || dayAfter.toISOString().split('T')[0]
  )
  const [guests, setGuests] = useState(searchParams.get('guests') || '2')
  const [results, setResults] = useState<RoomTypeResult[]>([])
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const params = new URLSearchParams({
      checkIn,
      checkOut,
      guests,
      ...(preselectedType ? { type: preselectedType } : {}),
    })

    const res = await fetch(`/api/rooms?${params}`)
    if (res.ok) setResults(await res.json())
    setSearched(true)
    setLoading(false)
  }

  const nights = Math.ceil(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
  )

  return (
    <div className="px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 text-center">
          <h1 className="text-3xl h-section text-ink lg:text-[2.75rem]">
            {t('booking.title')}
          </h1>
          <p className="mt-4 eyebrow text-brand">
            — {t('booking.subtitle')} —
          </p>
        </div>

        {/* Form tìm kiếm */}
        <form
          onSubmit={handleSearch}
          className="mx-auto grid max-w-4xl gap-5 border border-line bg-white p-8 sm:grid-cols-2 lg:grid-cols-4 lg:items-end lg:p-10"
        >
          <Input
            label={t('booking.checkIn')}
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            required
          />
          <Input
            label={t('booking.checkOut')}
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            min={checkIn}
            required
          />
          <Input
            label={t('booking.guests')}
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            min="1"
            max="10"
            required
          />
          <Button type="submit" disabled={loading} className="h-[46px] gap-2">
            <Search className="h-3.5 w-3.5" strokeWidth={1.5} />
            {loading ? t('booking.searching') : t('booking.search')}
          </Button>
        </form>

        {searched && results.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-base text-ink">{t('booking.noResults')}</p>
            <p className="mt-2 body-text text-ink-soft">{t('booking.tryOther')}</p>
          </div>
        )}

        {results.length > 0 && (
          <div className="mt-14 space-y-6">
            <p className="text-center eyebrow text-ink-soft">
              {t('booking.found')}{' '}
              <span className="text-ink">
                {results.reduce((s, r) => s + r.availableCount, 0)}
              </span>{' '}
              {t('booking.available')} · <span className="text-ink">{nights}</span>{' '}
              {t('booking.nights')}
            </p>

            {results.map((rt) => (
              <div key={rt.id} className="border border-line">
                <div className="grid lg:grid-cols-5">
                  <div className="relative aspect-[4/3] overflow-hidden bg-sand lg:col-span-2 lg:aspect-auto lg:min-h-[300px]">
                    <CoverImage src={rt.imageUrl || placeholderImage()} alt={rt.name} sizes="(max-width: 1024px) 100vw, 40vw" />
                  </div>

                  <div className="p-8 lg:col-span-3 lg:p-10">
                    <div className="flex flex-wrap items-start justify-between gap-5">
                      <div>
                        <h3 className="text-lg h-section text-ink">
                          {td(rt.name)}
                        </h3>
                        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 eyebrow text-ink-soft">
                          <span className="flex items-center gap-1.5">
                            <BedDouble className="h-3.5 w-3.5 text-brand" strokeWidth={1.3} />
                            {td(rt.bedType)}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Users className="h-3.5 w-3.5 text-brand" strokeWidth={1.3} />
                            {t('booking.maxGuests')} {rt.maxGuests} {t('booking.guestsUnit')}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Maximize className="h-3.5 w-3.5 text-brand" strokeWidth={1.3} />
                            {rt.size} m²
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[22px] text-ink">
                          {formatVND(rt.basePrice)}
                        </p>
                        <p className="eyebrow text-ink-soft">
                          {t('rooms.perNight')}
                        </p>
                        <p className="mt-2 eyebrow text-brand">
                          {t('booking.total')}: {formatVND(rt.basePrice * nights)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 border-t border-line pt-6">
                      <div className="flex flex-wrap gap-2.5">
                        {rt.availableRooms.map((room) => (
                          <Link
                            key={room.id}
                            href={`/dat-phong/xac-nhan?roomId=${room.id}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
                          >
                            <Button variant="outline" size="sm">
                              {t('booking.room')} {room.number} · {t('booking.floor')}{' '}
                              {room.floor}
                            </Button>
                          </Link>
                        ))}
                      </div>
                      <p className="mt-4 eyebrow text-ink-soft">
                        {rt.availableCount} {t('booking.remaining')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function BookingSearchPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center eyebrow text-ink-soft">
          ...
        </div>
      }
    >
      <BookingSearchContent />
    </Suspense>
  )
}
