import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { formatVND, formatDate } from '@/lib/format'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { BOOKING_STATUS } from '@/lib/constants'

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      guest: true,
      room: { include: { roomType: true } },
    },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý đặt phòng</h1>
        <span className="text-sm text-gray-500">{bookings.length} đặt phòng</span>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Mã</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Khách hàng</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Phòng</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Nhận phòng</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Trả phòng</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Tổng tiền</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Trạng thái</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.map((b) => {
                const status = BOOKING_STATUS[b.status] || { label: b.status, color: 'bg-gray-100' }
                return (
                  <tr key={b.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs">{b.code}</td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium">{b.guest.fullName}</p>
                        <p className="text-xs text-gray-500">{b.guest.phone}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p>{b.room.number}</p>
                      <p className="text-xs text-gray-500">{b.room.roomType.name}</p>
                    </td>
                    <td className="px-4 py-3">{formatDate(b.checkIn)}</td>
                    <td className="px-4 py-3">{formatDate(b.checkOut)}</td>
                    <td className="px-4 py-3 font-medium">{formatVND(b.totalPrice)}</td>
                    <td className="px-4 py-3">
                      <Badge className={status.color}>{status.label}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/dat-phong/${b.id}`}
                        className="text-brand-deep hover:text-brand-deep text-sm font-medium"
                      >
                        Chi tiết
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
