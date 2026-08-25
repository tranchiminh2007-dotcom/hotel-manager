import Link from 'next/link'
import { Star, Waves, UtensilsCrossed, Wifi, Car } from 'lucide-react'
import Button from '@/components/ui/Button'
import SectionHeader from '@/components/ui/SectionHeader'
import T from '@/components/ui/T'
import TD from '@/components/ui/TD'
import HeroSection from '@/components/home/HeroSection'
import BookingWidget from '@/components/home/BookingWidget'
import RoomCard from '@/components/home/RoomCard'
import { prisma } from '@/lib/prisma'
import { formatVND } from '@/lib/format'
import CoverImage from '@/components/ui/CoverImage'

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

  const cheapest = roomTypes[0]
    ? { name: roomTypes[0].name, slug: roomTypes[0].slug, basePrice: roomTypes[0].basePrice }
    : null

  return (
    <>
      <HeroSection />

      <BookingWidget cheapest={cheapest} />

      {/* Phòng nghỉ */}
      <section className="px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        <SectionHeader
          titleKey="home.rooms.title"
          subtitleKey="home.rooms.subtitle"
          descKey="home.rooms.desc"
          className="mb-14"
        />
        <div className="mx-auto grid max-w-[1400px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {roomTypes.map((rt) => (
            <RoomCard
              key={rt.id}
              name={rt.name}
              slug={rt.slug}
              basePrice={rt.basePrice}
              maxGuests={rt.maxGuests}
              size={rt.size}
              imageUrl={rt.images[0]?.url}
            />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/phong">
            <Button variant="outline">
              <T k="rooms.title" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Tiện ích */}
      <section className="bg-sand px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        <SectionHeader
          titleKey="home.amenities.title"
          subtitleKey="home.amenities.subtitle"
          descKey="home.amenities.desc"
          className="mb-14"
        />
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-10 lg:grid-cols-4">
          {[
            { icon: Wifi, labelKey: 'amenity.wifi', descKey: 'amenity.wifi.desc' },
            { icon: Car, labelKey: 'amenity.parking', descKey: 'amenity.parking.desc' },
            {
              icon: UtensilsCrossed,
              labelKey: 'amenity.restaurant',
              descKey: 'amenity.restaurant.desc',
            },
            { icon: Waves, labelKey: 'amenity.relax', descKey: 'amenity.relax.desc' },
          ].map((item) => (
            <div key={item.labelKey} className="text-center">
              <item.icon
                className="mx-auto mb-5 h-7 w-7 text-brand"
                strokeWidth={1}
              />
              <h3 className="eyebrow text-ink">
                <T k={item.labelKey} />
              </h3>
              <p className="mt-2.5 body-text leading-[1.75] text-ink-soft">
                <T k={item.descKey} />
              </p>
            </div>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link href="/tien-ich">
            <Button variant="outline">
              <T k="home.amenities.viewAll" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Đánh giá */}
      {reviews.length > 0 && (
        <section className="px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
          <SectionHeader
            titleKey="home.reviews.title"
            subtitleKey="home.reviews.subtitle"
            className="mb-6"
          />
          <div className="mb-14 flex items-center justify-center gap-2.5">
            <Star className="h-4 w-4 fill-brand text-brand" strokeWidth={0} />
            <span className="text-[26px] text-ink">{avgRating}</span>
            <span className="eyebrow text-ink-soft">
              / 5 · {reviews.length} <T k="reviews.reviews" />
            </span>
          </div>

          <div className="mx-auto grid max-w-[1400px] gap-6 md:grid-cols-3">
            {reviews.slice(0, 3).map((review) => (
              <div key={review.id} className="border border-line bg-white p-8 text-center">
                <div className="mb-5 flex justify-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={
                        i < review.rating
                          ? 'h-3 w-3 fill-brand text-brand'
                          : 'h-3 w-3 fill-line text-line'
                      }
                      strokeWidth={0}
                    />
                  ))}
                </div>
                {review.content && (
                  <p className="font-display text-[17px] italic leading-[1.75] text-ink-soft line-clamp-4">
                    “{review.content}”
                  </p>
                )}
                <p className="mt-6 eyebrow text-ink">
                  {review.guestName}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/danh-gia">
              <Button variant="outline">
                <T k="home.reviews.viewAll" />
              </Button>
            </Link>
          </div>
        </section>
      )}

      {/* Ưu đãi */}
      {promotions.length > 0 && (
        <section className="bg-sand px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
          <SectionHeader
            titleKey="home.offers.title"
            subtitleKey="home.offers.subtitle"
            descKey="home.offers.desc"
            className="mb-14"
          />
          <div className="mx-auto grid max-w-[1400px] gap-6 md:grid-cols-3">
            {promotions.map((promo) => (
              <div
                key={promo.id}
                className="flex flex-col border border-line bg-white p-8 text-center"
              >
                {promo.badgeText && (
                  <span className="mx-auto mb-5 bg-brand-deep px-3.5 py-1.5 eyebrow text-white">
                    <TD>{promo.badgeText}</TD>
                  </span>
                )}
                <h3 className="text-sm uppercase tracking-[0.08em] text-ink">
                  <TD>{promo.title}</TD>
                </h3>
                <p className="mt-4 flex-1 body-text leading-[1.75] text-ink-soft">
                  <TD>{promo.description}</TD>
                </p>
                <Link href="/dat-phong" className="mt-7">
                  <Button variant="outline" size="sm" className="w-full">
                    <T k="home.offers.bookNow" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA cuối */}
      <section className="relative overflow-hidden">
        <CoverImage src="/images/hotel-hero.jpg" alt="" sizes="100vw" quality={50} />
        <div className="absolute inset-0 bg-night/85" />
        <div className="relative mx-auto max-w-3xl px-6 py-20 text-center lg:py-28">
          <h2 className="text-2xl h-section text-white sm:text-3xl sm:tracking-[0.14em]">
            <T k="home.cta.title" />
          </h2>
          <p className="mx-auto mt-6 max-w-xl body-text text-white/75">
            <T k="home.cta.desc" />
          </p>
          <Link href="/dat-phong" className="mt-10 inline-block">
            <Button size="lg" variant="light">
              <T k="hero.bookNow" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
