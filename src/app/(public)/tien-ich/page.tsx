import { prisma } from '@/lib/prisma'
import Card from '@/components/ui/Card'
import {
  Wifi, Car, UtensilsCrossed, Coffee, Clock, Shirt, Bike, TreePine,
} from 'lucide-react'

export const metadata = {
  title: 'Tiện ích & Dịch vụ',
  description: 'Khám phá các tiện ích và dịch vụ tại Khách Sạn Ninh Bình. WiFi miễn phí, nhà hàng, bãi đỗ xe và nhiều hơn nữa.',
}

const iconMap: Record<string, React.ElementType> = {
  Wifi, Car, UtensilsCrossed, Coffee, Clock, Shirt, Bike, TreePine,
}

const categoryLabels: Record<string, string> = {
  SERVICES: 'Dịch vụ',
  DINING: 'Ẩm thực',
  RECREATION: 'Giải trí & Thư giãn',
  WELLNESS: 'Sức khỏe',
}

export default async function AmenitiesPage() {
  const amenities = await prisma.amenity.findMany()

  const grouped = amenities.reduce((acc, a) => {
    if (!acc[a.category]) acc[a.category] = []
    acc[a.category].push(a)
    return acc
  }, {} as Record<string, typeof amenities>)

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Tiện ích & Dịch vụ</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Mọi thứ bạn cần cho kỳ nghỉ hoàn hảo tại Ninh Bình đều có tại khách sạn của chúng tôi.
          </p>
        </div>

        {Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {categoryLabels[category] || category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((amenity) => {
                const Icon = iconMap[amenity.icon] || Wifi
                return (
                  <Card key={amenity.id} className="p-6" hover>
                    <Icon className="h-8 w-8 text-amber-700 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{amenity.name}</h3>
                    <p className="text-sm text-gray-600">{amenity.description}</p>
                  </Card>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
