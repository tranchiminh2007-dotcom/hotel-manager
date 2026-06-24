import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Card, { CardHeader, CardContent } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { AlertTriangle } from 'lucide-react'

async function restockItem(formData: FormData) {
  'use server'
  const itemId = formData.get('itemId') as string
  const quantity = parseInt(formData.get('quantity') as string)

  if (!itemId || isNaN(quantity) || quantity <= 0) return

  await prisma.stockItem.update({
    where: { id: itemId },
    data: { currentStock: { increment: quantity } },
  })

  await prisma.stockHistory.create({
    data: {
      itemId,
      type: 'RESTOCK',
      quantity,
      notes: `Nhập kho ${quantity} đơn vị`,
    },
  })

  redirect('/admin/kho')
}

async function useItem(formData: FormData) {
  'use server'
  const itemId = formData.get('itemId') as string
  const quantity = parseInt(formData.get('quantity') as string)

  if (!itemId || isNaN(quantity) || quantity <= 0) return

  const item = await prisma.stockItem.findUnique({ where: { id: itemId } })
  if (!item || item.currentStock < quantity) return

  await prisma.stockItem.update({
    where: { id: itemId },
    data: { currentStock: { decrement: quantity } },
  })

  await prisma.stockHistory.create({
    data: {
      itemId,
      type: 'USAGE',
      quantity: -quantity,
      notes: `Sử dụng ${quantity} đơn vị`,
    },
  })

  redirect('/admin/kho')
}

export default async function AdminStockPage() {
  const categories = await prisma.stockCategory.findMany({
    include: {
      items: { orderBy: { name: 'asc' } },
    },
  })

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Quản lý kho hàng</h1>

      {categories.map((cat) => (
        <div key={cat.id} className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{cat.name}</h2>
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">Mã</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">Tên</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">Tồn kho</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">Tối thiểu</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">Đơn vị</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">Trạng thái</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {cat.items.map((item) => {
                    const isLow = item.currentStock < item.minStock
                    return (
                      <tr key={item.id} className={`hover:bg-gray-50 ${isLow ? 'bg-red-50/50' : ''}`}>
                        <td className="px-4 py-3 font-mono text-xs">{item.sku}</td>
                        <td className="px-4 py-3 font-medium">{item.name}</td>
                        <td className="px-4 py-3">
                          <span className={isLow ? 'text-red-600 font-bold' : ''}>
                            {item.currentStock}
                          </span>
                        </td>
                        <td className="px-4 py-3">{item.minStock}</td>
                        <td className="px-4 py-3">{item.unit}</td>
                        <td className="px-4 py-3">
                          {isLow ? (
                            <Badge className="bg-red-100 text-red-800 flex items-center gap-1 w-fit">
                              <AlertTriangle className="h-3 w-3" /> Thiếu
                            </Badge>
                          ) : (
                            <Badge className="bg-green-100 text-green-800">Đủ</Badge>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            <form action={restockItem} className="flex items-center gap-1">
                              <input type="hidden" name="itemId" value={item.id} />
                              <input
                                type="number"
                                name="quantity"
                                defaultValue="10"
                                min="1"
                                className="w-16 px-2 py-1 border rounded text-xs"
                              />
                              <Button type="submit" size="sm" variant="outline" className="text-xs">
                                +Nhập
                              </Button>
                            </form>
                            <form action={useItem} className="flex items-center gap-1">
                              <input type="hidden" name="itemId" value={item.id} />
                              <input
                                type="number"
                                name="quantity"
                                defaultValue="1"
                                min="1"
                                className="w-16 px-2 py-1 border rounded text-xs"
                              />
                              <Button type="submit" size="sm" variant="ghost" className="text-xs text-red-600">
                                -Dùng
                              </Button>
                            </form>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      ))}
    </div>
  )
}
