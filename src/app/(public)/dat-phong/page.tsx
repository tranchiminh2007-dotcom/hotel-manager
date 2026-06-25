'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, BedDouble, Users, Maximize } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import { placeholderImage } from '@/lib/utils'
import { useLanguage } from '@/lib/language-context'
import { translateData } from '@/lib/data-translations'

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

  const [checkIn, setCheckIn] = useState(tomorrow.toISOString().split('T')[0])
  const [checkOut, setCheckOut] = useState(dayAfter.toISOString().split('T')[0])
  const [guests, setGuests] = useState('2')
  const [results, setResults] = useState<RoomTypeResult[]>([])
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const params = new URLSearchParams({
      checkIn, checkOut, guests,
      ...(preselectedType ? { type: preselectedType } : {}),
    })

    const res = await fetch(`/api/rooms?${params}`)
    if (res.ok) {
      setResults(await res.json())
    }
    setSearched(true)
    setLoading(false)
  }

  function formatVND(n: number) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(n)
  }

  const nights = Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{t('booking.title')}</h1>
          <p className="text-gray-600">{t('booking.subtitle')}</p>
        </div>

        <Card className="p-6 mb-8">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
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
            <Button type="submit" size="lg" disabled={loading} className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              {loading ? t('booking.searching') : t('booking.search')}
            </Button>
          </form>
        </Card>

        {searched && results.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t('booking.noResults')}</p>
            <p className="text-gray-400 mt-2">{t('booking.tryOther')}</p>
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-6">
            <p className="text-gray-600">
              {t('booking.found')} <strong>{results.reduce((s, r) => s + r.availableCount, 0)}</strong> {t('booking.available')} {t('booking.for')} <strong>{nights}</strong> {t('booking.nights')}
            </p>

            {results.map((rt) => (
              <Card key={rt.id} className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="aspect-[4/3] md:aspect-auto bg-gray-200">
                    <img
                      src={rt.imageUrl || placeholderImage(600, 400, rt.name)}
                      alt={rt.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:col-span-2 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{td(rt.name)}</h3>
                        <div className="flex gap-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center gap-1"><BedDouble className="h-4 w-4" /> {td(rt.bedType)}</span>
                          <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {t('booking.maxGuests')} {rt.maxGuests} {t('booking.guestsUnit')}</span>
                          <span className="flex items-center gap-1"><Maximize className="h-4 w-4" /> {rt.size} m²</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-amber-700">{formatVND(rt.basePrice)}</p>
                        <p className="text-sm text-gray-500">{t('rooms.perNight')}</p>
                        <p className="text-sm font-semibold text-gray-900 mt-1">
                          {t('booking.total')}: {formatVND(rt.basePrice * nights)}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {rt.availableRooms.map((room) => (
                        <a
                          key={room.id}
                          href={`/dat-phong/xac-nhan?roomId=${room.id}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
                        >
                          <Button variant="outline" size="sm">
                            {t('booking.room')} {room.number} ({t('booking.floor')} {room.floor})
                          </Button>
                        </a>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      {rt.availableCount} {t('booking.remaining')}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function BookingSearchPage() {
  return (
    <Suspense fallback={<div className="py-16 text-center text-gray-500">Đang tải...</div>}>
      <BookingSearchContent />
    </Suspense>
  )
}
