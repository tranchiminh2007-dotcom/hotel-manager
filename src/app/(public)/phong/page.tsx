import Link from 'next/link'
import { BedDouble, Users, Maximize } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import PageHeader from '@/components/ui/PageHeader'
import T from '@/components/ui/T'
import { prisma } from '@/lib/prisma'
import { formatVND } from '@/lib/format'
import { placeholderImage } from '@/lib/utils'

export const metadata = {
  title: 'Phòng & Giá',
  description: 'Xem các loại phòng và giá tại Khách Sạn Ninh Bình. Phòng Đơn và Phòng Family với đầy đủ tiện nghi.',
}

export default async function RoomsPage() {
  const roomTypes = await prisma.roomType.findMany({
    include: { images: { orderBy: { sortOrder: 'asc' } } },
    orderBy: { basePrice: 'asc' },
  })

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader titleKey="rooms.title" descKey="rooms.desc" />

        <div className="space-y-12">
          {roomTypes.map((rt) => {
            const amenities: string[] = JSON.parse(rt.amenities)
            return (
              <Card key={rt.id} className="overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="aspect-[4/3] lg:aspect-auto bg-gray-200">
                    <img
                      src={rt.images[0]?.url || placeholderImage(800, 600, rt.name)}
                      alt={rt.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{rt.name}</h2>
                    <p className="text-gray-600 mb-6">{rt.description}</p>

                    <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <BedDouble className="h-4 w-4 text-amber-700" />
                        <span>{rt.bedType}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="h-4 w-4 text-amber-700" />
                        <span>Tối đa {rt.maxGuests} khách</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Maximize className="h-4 w-4 text-amber-700" />
                        <span>{rt.size} m²</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900 mb-2">Tiện nghi phòng:</h3>
                      <div className="flex flex-wrap gap-2">
                        {amenities.map((a) => (
                          <span key={a} className="bg-amber-50 text-amber-800 text-xs px-2.5 py-1 rounded-full">
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <span className="text-3xl font-bold text-amber-700">{formatVND(rt.basePrice)}</span>
                        <span className="text-gray-500"> / đêm</span>
                      </div>
                      <div className="flex gap-3">
                        <Link href={`/phong/${rt.slug}`}>
                          <Button variant="outline" size="sm">Chi tiết</Button>
                        </Link>
                        <Link href={`/dat-phong?type=${rt.slug}`}>
                          <Button size="sm">Đặt phòng</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
