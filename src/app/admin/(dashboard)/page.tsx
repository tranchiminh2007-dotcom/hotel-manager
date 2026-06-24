import { prisma } from '@/lib/prisma'
import { formatVND, formatDate } from '@/lib/format'
import Card, { CardContent } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { BOOKING_STATUS } from '@/lib/constants'
import { BedDouble, CalendarDays, DollarSign, AlertTriangle } from 'lucide-react'

export default async function AdminDashboard() {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const [totalRooms, occupiedRooms, bookingsThisMonth, revenueThisMonth, pendingBookings, recentBookings, lowStockItems] = await Promise.all([
    prisma.room.count(),
    prisma.room.count({ where: { status: 'OCCUPIED' } }),
    prisma.booking.count({
      where: { createdAt: { gte: startOfMonth } },
    }),
    prisma.booking.aggregate({
      where: {
        status: { in: ['CONFIRMED', 'CHECKED_IN', 'CHECKED_OUT'] },
        createdAt: { gte: startOfMonth },
      },
      _sum: { totalPrice: true },
    }),
    prisma.booking.count({ where: { status: 'PENDING' } }),
    prisma.booking.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { guest: true, room: { include: { roomType: true } } },
    }),
    prisma.$queryRawUnsafe<{ id: string; name: string; currentStock: number; minStock: number; unit: string }[]>(
      `SELECT id, name, "currentStock", "minStock", unit FROM "StockItem" WHERE "currentStock" < "minStock"`
    ),
  ])

  const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0

  const stats = [
    { label: 'Đặt phòng tháng này', value: bookingsThisMonth.toString(), icon: CalendarDays, color: 'text-blue-600 bg-blue-50' },
    { label: 'Công suất phòng', value: `${occupancyRate}%`, icon: BedDouble, color: 'text-green-600 bg-green-50' },
    { label: 'Doanh thu tháng', value: formatVND(revenueThisMonth._sum.totalPrice || 0), icon: DollarSign, color: 'text-amber-600 bg-amber-50' },
    { label: 'Chờ xác nhận', value: pendingBookings.toString(), icon: AlertTriangle, color: 'text-orange-600 bg-orange-50' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Bảng điều khiển</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4">
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Đặt phòng gần đây</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">Mã</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">Khách</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">Phòng</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">Nhận phòng</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentBookings.map((b) => {
                    const status = BOOKING_STATUS[b.status] || { label: b.status, color: 'bg-gray-100' }
                    return (
                      <tr key={b.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-mono text-xs">{b.code}</td>
                        <td className="px-4 py-3">{b.guest.fullName}</td>
                        <td className="px-4 py-3">{b.room.number} ({b.room.roomType.name})</td>
                        <td className="px-4 py-3">{formatDate(b.checkIn)}</td>
                        <td className="px-4 py-3">
                          <Badge className={status.color}>{status.label}</Badge>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div>
          <Card>
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Cảnh báo tồn kho</h2>
            </div>
            <CardContent>
              {lowStockItems.length === 0 ? (
                <p className="text-sm text-gray-500">Tất cả mặt hàng đều đủ tồn kho.</p>
              ) : (
                <div className="space-y-3">
                  {lowStockItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-red-600">
                          Còn {item.currentStock} / Tối thiểu {item.minStock} {item.unit}
                        </p>
                      </div>
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
