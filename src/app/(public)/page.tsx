import Link from 'next/link'
import { Star, Waves, UtensilsCrossed, Wifi, Car } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import HeroSection from '@/components/home/HeroSection'
import T from '@/components/ui/T'
import { prisma } from '@/lib/prisma'
import { formatVND } from '@/lib/format'
import { placeholderImage } from '@/lib/utils'

export default async function HomePage() {
  const roomTypes = await prisma.roomType.findMany({
    include: { images: { orderBy: { sortOrder: 'asc' }, take: 1 } },
    orderBy: { basePrice: 'asc' },
  })

  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: 'desc' },
    take: 6,
  })

  const promotions = await prisma.promotion.findMany({
    where: { isActive: true },
    take: 3,
  })

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0'

  return (
    <>
      <HeroSection />

      {/* Featured Rooms */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3"><T k="home.rooms.title" /></h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              <T k="home.rooms.desc" />
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {roomTypes.map((rt) => (
              <Card key={rt.id} hover className="overflow-hidden">
                <div className="aspect-[16/10] bg-gray-200 relative">
                  <img
                    src={rt.images[0]?.url || placeholderImage(800, 500, rt.name)}
                    alt={rt.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{rt.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{rt.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-amber-700">{formatVND(rt.basePrice)}</span>
                      <span className="text-gray-500 text-sm"> <T k="home.rooms.perNight" /></span>
                    </div>
                    <Link href={`/phong/${rt.slug}`}>
                      <Button size="sm"><T k="home.rooms.viewDetail" /></Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3"><T k="home.amenities.title" /></h2>
            <p className="text-gray-600"><T k="home.amenities.desc" /></p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Wifi, labelKey: 'amenity.wifi', descKey: 'amenity.wifi.desc' },
              { icon: Car, labelKey: 'amenity.parking', descKey: 'amenity.parking.desc' },
              { icon: UtensilsCrossed, labelKey: 'amenity.restaurant', descKey: 'amenity.restaurant.desc' },
              { icon: Waves, labelKey: 'amenity.relax', descKey: 'amenity.relax.desc' },
            ].map((item) => (
              <div key={item.labelKey} className="text-center p-6 rounded-xl hover:bg-amber-50 transition-colors">
                <item.icon className="h-10 w-10 text-amber-700 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1"><T k={item.labelKey} /></h3>
                <p className="text-sm text-gray-600"><T k={item.descKey} /></p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/tien-ich">
              <Button variant="outline"><T k="home.amenities.viewAll" /></Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      {reviews.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3"><T k="home.reviews.title" /></h2>
              <div className="flex items-center justify-center gap-2 text-amber-500">
                <Star className="h-6 w-6 fill-current" />
                <span className="text-2xl font-bold text-gray-900">{avgRating}</span>
                <span className="text-gray-500">/ 5 ({reviews.length} <T k="reviews.reviews" />)</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.slice(0, 3).map((review) => (
                <Card key={review.id} className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? 'text-amber-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  {review.content && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{review.content}</p>
                  )}
                  <p className="font-semibold text-gray-900 text-sm">{review.guestName}</p>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/danh-gia">
                <Button variant="outline"><T k="home.reviews.viewAll" /></Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Promotions */}
      {promotions.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3"><T k="home.offers.title" /></h2>
              <p className="text-gray-600"><T k="home.offers.desc" /></p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {promotions.map((promo) => (
                <Card key={promo.id} hover className="p-6 border-amber-200 bg-amber-50/50">
                  {promo.badgeText && (
                    <span className="inline-block bg-amber-700 text-white text-xs font-bold px-2 py-1 rounded mb-3">
                      {promo.badgeText}
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{promo.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{promo.description}</p>
                  <Link href="/dat-phong">
                    <Button size="sm"><T k="home.offers.bookNow" /></Button>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-amber-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4"><T k="home.cta.title" /></h2>
          <p className="text-lg mb-8 opacity-90">
            <T k="home.cta.desc" />
          </p>
          <Link href="/dat-phong">
            <Button size="lg" className="bg-white text-amber-800 hover:bg-gray-100">
              <T k="hero.bookNow" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
