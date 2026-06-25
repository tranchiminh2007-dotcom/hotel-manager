'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CalendarDays, Users } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'

function BookingConfirmContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const roomId = searchParams.get('roomId') || ''
  const checkIn = searchParams.get('checkIn') || ''
  const checkOut = searchParams.get('checkOut') || ''
  const guests = searchParams.get('guests') || '2'

  const [roomInfo, setRoomInfo] = useState<{ number: string; floor: number; typeName: string; basePrice: number } | null>(null)
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', idNumber: '', nationality: 'Việt Nam', specialRequests: '', discountCode: '',
  })
  const [discount, setDiscount] = useState<{ description: string; discountAmount: number } | null>(null)
  const [discountError, setDiscountError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const nights = Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))

  useEffect(() => {
    if (roomId) {
      fetch(`/api/admin/rooms/${roomId}`)
        .then(r => r.json())
        .then(data => {
          if (data.number) {
            setRoomInfo({
              number: data.number,
              floor: data.floor,
              typeName: data.roomType?.name || '',
              basePrice: data.roomType?.basePrice || 0,
            })
          }
        })
        .catch(() => {})
    }
  }, [roomId])

  const baseTotal = (roomInfo?.basePrice || 0) * nights
  const finalTotal = discount ? baseTotal - discount.discountAmount : baseTotal

  function formatVND(n: number) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(n)
  }

  async function validateDiscount() {
    if (!formData.discountCode) return
    setDiscountError('')
    setDiscount(null)

    const res = await fetch('/api/discount-codes/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: formData.discountCode.toUpperCase(),
        nights,
        totalPrice: baseTotal,
      }),
    })

    const data = await res.json()
    if (res.ok) {
      setDiscount(data)
    } else {
      setDiscountError(data.error)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        checkIn, checkOut,
        numGuests: parseInt(guests),
        roomId,
        ...formData,
        discountCode: discount ? formData.discountCode.toUpperCase() : undefined,
      }),
    })

    const data = await res.json()
    if (res.ok) {
      router.push(`/dat-phong/thanh-cong?code=${data.code}`)
    } else {
      setError(data.error || 'Có lỗi xảy ra')
    }
    setSubmitting(false)
  }

  return (
    <div className="py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Xác nhận đặt phòng</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Thông tin khách hàng</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Họ tên *"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Nhập họ tên"
                    required
                  />
                  <Input
                    label="Số điện thoại *"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Nhập số điện thoại"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Nhập email (tùy chọn)"
                  />
                  <Input
                    label="CMND/CCCD"
                    value={formData.idNumber}
                    onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                    placeholder="Nhập số CMND/CCCD"
                  />
                </div>
                <Input
                  label="Quốc tịch"
                  value={formData.nationality}
                  onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Yêu cầu đặc biệt</label>
                  <textarea
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    placeholder="Ví dụ: Phòng yên tĩnh, thêm gối..."
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="pt-4 border-t">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mã giảm giá</label>
                  <div className="flex gap-2">
                    <Input
                      value={formData.discountCode}
                      onChange={(e) => setFormData({ ...formData, discountCode: e.target.value })}
                      placeholder="Nhập mã giảm giá"
                      className="flex-1"
                    />
                    <Button type="button" variant="outline" onClick={validateDiscount}>
                      Áp dụng
                    </Button>
                  </div>
                  {discount && <p className="text-sm text-green-600 mt-1">{discount.description} (-{formatVND(discount.discountAmount)})</p>}
                  {discountError && <p className="text-sm text-red-600 mt-1">{discountError}</p>}
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                  {submitting ? 'Đang xử lý...' : `Xác nhận đặt phòng - ${formatVND(finalTotal)}`}
                </Button>
              </form>
            </Card>
          </div>

          <div>
            <Card className="p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Thông tin đặt phòng</h2>
              <div className="space-y-3 text-sm">
                {roomInfo && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Loại phòng</span>
                      <span className="font-medium">{roomInfo.typeName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phòng</span>
                      <span className="font-medium">{roomInfo.number} (Tầng {roomInfo.floor})</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600 flex items-center gap-1"><CalendarDays className="h-4 w-4" /> Nhận phòng</span>
                  <span className="font-medium">{new Date(checkIn).toLocaleDateString('vi-VN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 flex items-center gap-1"><CalendarDays className="h-4 w-4" /> Trả phòng</span>
                  <span className="font-medium">{new Date(checkOut).toLocaleDateString('vi-VN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 flex items-center gap-1"><Users className="h-4 w-4" /> Số khách</span>
                  <span className="font-medium">{guests}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Số đêm</span>
                  <span className="font-medium">{nights}</span>
                </div>

                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Giá phòng × {nights} đêm</span>
                    <span>{formatVND(baseTotal)}</span>
                  </div>
                  {discount && (
                    <div className="flex justify-between text-green-600">
                      <span>Giảm giá</span>
                      <span>-{formatVND(discount.discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                    <span>Tổng cộng</span>
                    <span className="text-amber-700">{formatVND(finalTotal)}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BookingConfirmPage() {
  return (
    <Suspense fallback={<div className="py-16 text-center text-gray-500">Đang tải...</div>}>
      <BookingConfirmContent />
    </Suspense>
  )
}
