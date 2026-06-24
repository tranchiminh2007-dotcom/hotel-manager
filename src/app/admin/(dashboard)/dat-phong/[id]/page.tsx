import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { formatVND, formatDate, formatDateTime } from '@/lib/format'
import Card, { CardContent, CardHeader } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { BOOKING_STATUS } from '@/lib/constants'

async function updateStatus(formData: FormData) {
  'use server'
  const id = formData.get('id') as string
  const status = formData.get('status') as string

  await prisma.booking.update({
    where: { id },
    data: { status },
  })

  if (status === 'CHECKED_IN') {
    const booking = await prisma.booking.findUnique({ where: { id } })
    if (booking) {
      await prisma.room.update({
        where: { id: booking.roomId },
        data: { status: 'OCCUPIED' },
      })
    }
  } else if (status === 'CHECKED_OUT' || status === 'CANCELLED') {
    const booking = await prisma.booking.findUnique({ where: { id } })
    if (booking) {
      await prisma.room.update({
        where: { id: booking.roomId },
        data: { status: 'CLEANING' },
      })
    }
  }

  redirect('/admin/dat-phong')
}

export default async function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      guest: true,
      room: { include: { roomType: true } },
      discountCode: true,
    },
  })

  if (!booking) notFound()

  const status = BOOKING_STATUS[booking.status] || { label: booking.status, color: 'bg-gray-100' }

  const nextActions: { status: string; label: string; variant: 'primary' | 'danger' | 'secondary' }[] = []
  if (booking.status === 'PENDING') {
    nextActions.push({ status: 'CONFIRMED', label: 'Xác nhận', variant: 'primary' })
    nextActions.push({ status: 'CANCELLED', label: 'Hủy', variant: 'danger' })
  } else if (booking.status === 'CONFIRMED') {
    nextActions.push({ status: 'CHECKED_IN', label: 'Nhận phòng', variant: 'primary' })
    nextActions.push({ status: 'CANCELLED', label: 'Hủy', variant: 'danger' })
  } else if (booking.status === 'CHECKED_IN') {
    nextActions.push({ status: 'CHECKED_OUT', label: 'Trả phòng', variant: 'primary' })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link href="/admin/dat-phong" className="text-sm text-amber-700 hover:text-amber-800">
            ← Quay lại danh sách
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">Đặt phòng {booking.code}</h1>
        </div>
        <Badge className={`${status.color} text-base px-4 py-1`}>{status.label}</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><h2 className="font-semibold">Thông tin khách hàng</h2></CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div><dt className="text-gray-500">Họ tên</dt><dd className="font-medium">{booking.guest.fullName}</dd></div>
                <div><dt className="text-gray-500">Điện thoại</dt><dd className="font-medium">{booking.guest.phone}</dd></div>
                <div><dt className="text-gray-500">Email</dt><dd className="font-medium">{booking.guest.email || '—'}</dd></div>
                <div><dt className="text-gray-500">CMND/CCCD</dt><dd className="font-medium">{booking.guest.idNumber || '—'}</dd></div>
                <div><dt className="text-gray-500">Quốc tịch</dt><dd className="font-medium">{booking.guest.nationality}</dd></div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><h2 className="font-semibold">Chi tiết đặt phòng</h2></CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div><dt className="text-gray-500">Phòng</dt><dd className="font-medium">{booking.room.number} — {booking.room.roomType.name}</dd></div>
                <div><dt className="text-gray-500">Số khách</dt><dd className="font-medium">{booking.numGuests}</dd></div>
                <div><dt className="text-gray-500">Nhận phòng</dt><dd className="font-medium">{formatDate(booking.checkIn)}</dd></div>
                <div><dt className="text-gray-500">Trả phòng</dt><dd className="font-medium">{formatDate(booking.checkOut)}</dd></div>
                <div><dt className="text-gray-500">Ngày đặt</dt><dd className="font-medium">{formatDateTime(booking.createdAt)}</dd></div>
                {booking.specialRequests && (
                  <div className="col-span-2"><dt className="text-gray-500">Yêu cầu đặc biệt</dt><dd className="font-medium">{booking.specialRequests}</dd></div>
                )}
              </dl>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><h2 className="font-semibold">Thanh toán</h2></CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Tổng tiền</span>
                  <span className="font-bold text-xl text-amber-700">{formatVND(booking.totalPrice)}</span>
                </div>
                {booking.discountCode && (
                  <div className="flex justify-between text-green-600">
                    <span>Mã giảm giá</span>
                    <span>{booking.discountCode.code}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {nextActions.length > 0 && (
            <Card>
              <CardHeader><h2 className="font-semibold">Thao tác</h2></CardHeader>
              <CardContent className="space-y-2">
                {nextActions.map((action) => (
                  <form key={action.status} action={updateStatus}>
                    <input type="hidden" name="id" value={booking.id} />
                    <input type="hidden" name="status" value={action.status} />
                    <Button type="submit" variant={action.variant} className="w-full">
                      {action.label}
                    </Button>
                  </form>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
