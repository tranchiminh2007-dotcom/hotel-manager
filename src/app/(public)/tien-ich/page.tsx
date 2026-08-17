import { prisma } from '@/lib/prisma'
import PageHeader from '@/components/ui/PageHeader'
import T from '@/components/ui/T'
import TD from '@/components/ui/TD'
import { Wifi, Car, UtensilsCrossed, Coffee, Clock, Shirt, Bike, TreePine } from 'lucide-react'

export const metadata = {
  title: 'Tiện ích & Dịch vụ',
  description:
    'Khám phá các tiện ích và dịch vụ tại Long Hải Hotel. WiFi miễn phí, nhà hàng, bãi đỗ xe và nhiều hơn nữa.',
}

const iconMap: Record<string, React.ElementType> = {
  Wifi,
  Car,
  UtensilsCrossed,
  Coffee,
  Clock,
  Shirt,
  Bike,
  TreePine,
}

export default async function AmenitiesPage() {
  const amenities = await prisma.amenity.findMany()

  const grouped = amenities.reduce(
    (acc, a) => {
      if (!acc[a.category]) acc[a.category] = []
      acc[a.category].push(a)
      return acc
    },
    {} as Record<string, typeof amenities>
  )

  return (
    <div className="px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[1400px]">
        <PageHeader
          titleKey="amenities.title"
          subtitleKey="amenities.subtitle"
          descKey="amenities.desc"
        />

        <div className="space-y-16">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <div className="mb-10 flex items-center gap-5">
                <h2 className="whitespace-nowrap text-[11px] uppercase tracking-[0.26em] text-ink">
                  <T k={`amenities.cat.${category}`} />
                </h2>
                <span className="h-px flex-1 bg-line" />
              </div>

              <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
                {items.map((amenity) => {
                  const Icon = iconMap[amenity.icon] || Wifi
                  return (
                    <div
                      key={amenity.id}
                      className="group bg-white p-9 transition-colors duration-500 hover:bg-sand"
                    >
                      <Icon
                        className="mb-6 h-7 w-7 text-brand transition-transform duration-500 group-hover:scale-110"
                        strokeWidth={1}
                      />
                      <h3 className="text-[11px] uppercase tracking-[0.2em] text-ink">
                        <TD>{amenity.name}</TD>
                      </h3>
                      <p className="mt-3.5 text-xs font-light leading-relaxed text-ink-soft">
                        <TD>{amenity.description}</TD>
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
