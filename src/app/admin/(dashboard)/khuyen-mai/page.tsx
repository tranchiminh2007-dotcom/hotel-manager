import { prisma } from '@/lib/prisma'
import { formatDate, formatVND } from '@/lib/format'
import Card, { CardHeader } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

export default async function AdminPromotionsPage() {
  const [promotions, discountCodes] = await Promise.all([
    prisma.promotion.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.discountCode.findMany({ orderBy: { createdAt: 'desc' } }),
  ])

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Khuyến mãi & Mã giảm giá</h1>

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Chương trình khuyến mãi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {promotions.map((p) => (
            <Card key={p.id} className="p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-gray-900">{p.title}</h3>
                <Badge className={p.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}>
                  {p.isActive ? 'Đang chạy' : 'Tạm dừng'}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-3">{p.description}</p>
              <p className="text-xs text-gray-500">
                {formatDate(p.validFrom)} — {formatDate(p.validTo)}
              </p>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Mã giảm giá</h2>
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Mã</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Loại</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Giá trị</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Tối thiểu</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Đã dùng</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Hiệu lực</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {discountCodes.map((dc) => (
                  <tr key={dc.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono font-bold">{dc.code}</td>
                    <td className="px-4 py-3">{dc.type === 'PERCENTAGE' ? 'Phần trăm' : 'Cố định'}</td>
                    <td className="px-4 py-3 font-medium">
                      {dc.type === 'PERCENTAGE' ? `${dc.value}%` : formatVND(dc.value)}
                    </td>
                    <td className="px-4 py-3">{dc.minNights} đêm</td>
                    <td className="px-4 py-3">{dc.usedCount}/{dc.maxUses}</td>
                    <td className="px-4 py-3 text-xs">
                      {formatDate(dc.validFrom)} — {formatDate(dc.validTo)}
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={dc.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}>
                        {dc.isActive ? 'Hoạt động' : 'Tắt'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
