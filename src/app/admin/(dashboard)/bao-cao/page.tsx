import { prisma } from '@/lib/prisma'
import { formatVND } from '@/lib/format'
import Card, { CardHeader, CardContent } from '@/components/ui/Card'

export default async function AdminReportsPage() {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)

  const [
    totalBookings,
    totalRevenue,
    lastMonthRevenue,
    bookingsByStatus,
    totalRooms,
    occupiedRooms,
    totalReviews,
    avgRating,
    stockAlerts,
  ] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.aggregate({
      where: { status: { in: ['CONFIRMED', 'CHECKED_IN', 'CHECKED_OUT'] } },
      _sum: { totalPrice: true },
    }),
    prisma.booking.aggregate({
      where: {
        status: { in: ['CONFIRMED', 'CHECKED_IN', 'CHECKED_OUT'] },
        createdAt: { gte: startOfLastMonth, lt: startOfMonth },
      },
      _sum: { totalPrice: true },
    }),
    prisma.booking.groupBy({
      by: ['status'],
      _count: true,
    }),
    prisma.room.count(),
    prisma.room.count({ where: { status: 'OCCUPIED' } }),
    prisma.review.count(),
    prisma.review.aggregate({ _avg: { rating: true } }),
    prisma.$queryRawUnsafe<{ count: number }[]>(
      `SELECT COUNT(*) as count FROM "StockItem" WHERE "currentStock" < "minStock"`
    ),
  ])

  const statusCounts = bookingsByStatus.reduce((acc, b) => {
    acc[b.status] = b._count
    return acc
  }, {} as Record<string, number>)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Báo cáo</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent>
            <p className="text-sm text-gray-500">Tổng đặt phòng</p>
            <p className="text-3xl font-bold text-gray-900">{totalBookings}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm text-gray-500">Tổng doanh thu</p>
            <p className="text-2xl font-bold text-brand-deep">{formatVND(totalRevenue._sum.totalPrice || 0)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm text-gray-500">Công suất phòng</p>
            <p className="text-3xl font-bold text-gray-900">
              {totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0}%
            </p>
            <p className="text-xs text-gray-500">{occupiedRooms}/{totalRooms} phòng</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm text-gray-500">Đánh giá trung bình</p>
            <p className="text-3xl font-bold text-gray-900">
              {avgRating._avg.rating?.toFixed(1) || '0'}/5
            </p>
            <p className="text-xs text-gray-500">{totalReviews} đánh giá</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><h2 className="font-semibold">Đặt phòng theo trạng thái</h2></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { key: 'PENDING', label: 'Chờ xác nhận', color: 'bg-yellow-500' },
                { key: 'CONFIRMED', label: 'Đã xác nhận', color: 'bg-blue-500' },
                { key: 'CHECKED_IN', label: 'Đã nhận phòng', color: 'bg-green-500' },
                { key: 'CHECKED_OUT', label: 'Đã trả phòng', color: 'bg-gray-500' },
                { key: 'CANCELLED', label: 'Đã hủy', color: 'bg-red-500' },
              ].map((s) => {
                const count = statusCounts[s.key] || 0
                const pct = totalBookings > 0 ? (count / totalBookings) * 100 : 0
                return (
                  <div key={s.key}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{s.label}</span>
                      <span className="font-medium">{count}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className={`${s.color} h-2 rounded-full`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><h2 className="font-semibold">Tổng quan</h2></CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600">Doanh thu tháng trước</dt>
                <dd className="font-medium">{formatVND(lastMonthRevenue._sum.totalPrice || 0)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600">Tổng số phòng</dt>
                <dd className="font-medium">{totalRooms}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600">Phòng đang sử dụng</dt>
                <dd className="font-medium">{occupiedRooms}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600">Cảnh báo tồn kho</dt>
                <dd className="font-medium text-red-600">
                  {(stockAlerts[0] as unknown as { count: number })?.count || 0} mặt hàng thiếu
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
