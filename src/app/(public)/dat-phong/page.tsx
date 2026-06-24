'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, BedDouble, Users, Maximize } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import { placeholderImage } from '@/lib/utils'

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

export default function BookingSearchPage() {
  const searchParams = useSearchParams()
  const preselectedType = searchParams.get('type') || ''

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
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Đặt phòng</h1>
          <p className="text-gray-600">Chọn ngày và tìm phòng trống</p>
        </div>

        <Card className="p-6 mb-8">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <Input
              label="Ngày nhận phòng"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
            />
            <Input
              label="Ngày trả phòng"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={checkIn}
              required
            />
            <Input
              label="Số khách"
              type="number"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              min="1"
              max="10"
              required
            />
            <Button type="submit" size="lg" disabled={loading} className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              {loading ? 'Đang tìm...' : 'Tìm phòng'}
            </Button>
          </form>
        </Card>

        {searched && results.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Không tìm thấy phòng trống cho ngày đã chọn.</p>
            <p className="text-gray-400 mt-2">Vui lòng thử ngày khác hoặc liên hệ trực tiếp.</p>
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-6">
            <p className="text-gray-600">
              Tìm thấy <strong>{results.reduce((s, r) => s + r.availableCount, 0)}</strong> phòng trống
              cho <strong>{nights}</strong> đêm
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
                        <h3 className="text-xl font-bold text-gray-900">{rt.name}</h3>
                        <div className="flex gap-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center gap-1"><BedDouble className="h-4 w-4" /> {rt.bedType}</span>
                          <span className="flex items-center gap-1"><Users className="h-4 w-4" /> Tối đa {rt.maxGuests} khách</span>
                          <span className="flex items-center gap-1"><Maximize className="h-4 w-4" /> {rt.size} m²</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-amber-700">{formatVND(rt.basePrice)}</p>
                        <p className="text-sm text-gray-500">/ đêm</p>
                        <p className="text-sm font-semibold text-gray-900 mt-1">
                          Tổng: {formatVND(rt.basePrice * nights)}
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
                            Phòng {room.number} (Tầng {room.floor})
                          </Button>
                        </a>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Còn {rt.availableCount} phòng trống — chọn phòng để tiếp tục
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
