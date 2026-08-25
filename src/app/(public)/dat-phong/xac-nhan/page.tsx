'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CalendarDays, Users } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { formatVND } from '@/lib/format'
import { useLanguage } from '@/lib/language-context'
import { translateData } from '@/lib/data-translations'

function BookingConfirmContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { t, locale } = useLanguage()
  const td = (s: string) => translateData(s, locale)

  const roomId = searchParams.get('roomId') || ''
  const checkIn = searchParams.get('checkIn') || ''
  const checkOut = searchParams.get('checkOut') || ''
  const guests = searchParams.get('guests') || '2'

  const [roomInfo, setRoomInfo] = useState<{
    number: string
    floor: number
    typeName: string
    basePrice: number
  } | null>(null)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    idNumber: '',
    nationality: 'Việt Nam',
    specialRequests: '',
    discountCode: '',
  })
  const [discount, setDiscount] = useState<{ description: string; discountAmount: number } | null>(
    null
  )
  const [discountError, setDiscountError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const nights = Math.ceil(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
  )

  useEffect(() => {
    if (!roomId) return
    fetch(`/api/admin/rooms/${roomId}`)
      .then((r) => r.json())
      .then((data) => {
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
  }, [roomId])

  const baseTotal = (roomInfo?.basePrice || 0) * nights
  const finalTotal = discount ? baseTotal - discount.discountAmount : baseTotal

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
    if (res.ok) setDiscount(data)
    else setDiscountError(data.error)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        checkIn,
        checkOut,
        numGuests: parseInt(guests),
        roomId,
        ...formData,
        discountCode: discount ? formData.discountCode.toUpperCase() : undefined,
      }),
    })

    const data = await res.json()
    if (res.ok) router.push(`/dat-phong/thanh-cong?code=${data.code}`)
    else setError(data.error || 'Có lỗi xảy ra')
    setSubmitting(false)
  }

  const row = 'flex items-center justify-between py-2.5 body-text'
  const rowLabel = 'text-ink-soft'

  return (
    <div className="px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h1 className="text-2xl h-section text-ink lg:text-4xl">
            {t('confirm.title')}
          </h1>
          <span className="mx-auto mt-5 block h-px w-14 bg-brand" />
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="border border-line p-8 lg:p-10">
              <h2 className="eyebrow text-ink">
                {t('confirm.guestInfo')}
              </h2>
              <span className="mt-4 mb-8 block h-px w-10 bg-brand" />

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    label={`${t('confirm.fullName')} *`}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                  <Input
                    label={`${t('confirm.phone')} *`}
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    label={t('confirm.email')}
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <Input
                    label={t('confirm.idNumber')}
                    value={formData.idNumber}
                    onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                  />
                </div>
                <Input
                  label={t('confirm.nationality')}
                  value={formData.nationality}
                  onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                />
                <div>
                  <label className="mb-2 block eyebrow text-ink-soft">
                    {t('confirm.specialRequests')}
                  </label>
                  <textarea
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    rows={3}
                    className="w-full border border-line bg-white px-4 py-3 text-base text-ink transition-colors focus:border-brand focus:outline-none"
                  />
                </div>

                <div className="border-t border-line pt-6">
                  <label className="mb-2 block eyebrow text-ink-soft">
                    {t('confirm.discountCode')}
                  </label>
                  <div className="flex gap-3">
                    <Input
                      value={formData.discountCode}
                      onChange={(e) => setFormData({ ...formData, discountCode: e.target.value })}
                      className="flex-1 uppercase"
                    />
                    <Button type="button" variant="outline" onClick={validateDiscount}>
                      {t('confirm.apply')}
                    </Button>
                  </div>
                  {discount && (
                    <p className="mt-2 body-text text-emerald-700">
                      {discount.description} · −{formatVND(discount.discountAmount)}
                    </p>
                  )}
                  {discountError && (
                    <p className="mt-2 body-text text-red-600">{discountError}</p>
                  )}
                </div>

                {error && <p className="body-text text-red-600">{error}</p>}

                <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                  {submitting
                    ? t('confirm.processing')
                    : `${t('confirm.submit')} — ${formatVND(finalTotal)}`}
                </Button>
              </form>
            </div>
          </div>

          {/* Tóm tắt */}
          <div>
            <div className="sticky top-32 bg-sand p-8">
              <h2 className="eyebrow text-ink">
                {t('confirm.bookingInfo')}
              </h2>
              <span className="mt-4 mb-6 block h-px w-10 bg-brand" />

              <div className="divide-y divide-line/70">
                {roomInfo && (
                  <>
                    <div className={row}>
                      <span className={rowLabel}>{t('confirm.roomType')}</span>
                      <span className="text-ink">{td(roomInfo.typeName)}</span>
                    </div>
                    <div className={row}>
                      <span className={rowLabel}>{t('booking.room')}</span>
                      <span className="text-ink">
                        {roomInfo.number} · {t('booking.floor')} {roomInfo.floor}
                      </span>
                    </div>
                  </>
                )}
                <div className={row}>
                  <span className={`${rowLabel} flex items-center gap-1.5`}>
                    <CalendarDays className="h-3.5 w-3.5 text-brand" strokeWidth={1.3} />
                    {t('booking.checkIn')}
                  </span>
                  <span className="text-ink">
                    {new Date(checkIn).toLocaleDateString('vi-VN')}
                  </span>
                </div>
                <div className={row}>
                  <span className={`${rowLabel} flex items-center gap-1.5`}>
                    <CalendarDays className="h-3.5 w-3.5 text-brand" strokeWidth={1.3} />
                    {t('booking.checkOut')}
                  </span>
                  <span className="text-ink">
                    {new Date(checkOut).toLocaleDateString('vi-VN')}
                  </span>
                </div>
                <div className={row}>
                  <span className={`${rowLabel} flex items-center gap-1.5`}>
                    <Users className="h-3.5 w-3.5 text-brand" strokeWidth={1.3} />
                    {t('booking.guests')}
                  </span>
                  <span className="text-ink">{guests}</span>
                </div>
                <div className={row}>
                  <span className={rowLabel}>{t('confirm.numNights')}</span>
                  <span className="text-ink">{nights}</span>
                </div>
                <div className={row}>
                  <span className={rowLabel}>
                    {t('confirm.pricePerNight')} × {nights}
                  </span>
                  <span className="text-ink">{formatVND(baseTotal)}</span>
                </div>
                {discount && (
                  <div className={row}>
                    <span className="text-emerald-700">{t('confirm.discount')}</span>
                    <span className="text-emerald-700">
                      −{formatVND(discount.discountAmount)}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-5 border-t border-ink/15 pt-5 text-center">
                <p className="eyebrow text-ink-soft">
                  {t('confirm.totalPrice')}
                </p>
                <p className="mt-2 text-[26px] text-ink">{formatVND(finalTotal)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BookingConfirmPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center eyebrow text-ink-soft">
          ...
        </div>
      }
    >
      <BookingConfirmContent />
    </Suspense>
  )
}
