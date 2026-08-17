import Link from 'next/link'
import { Tag, Calendar, Percent } from 'lucide-react'
import Button from '@/components/ui/Button'
import PageHeader from '@/components/ui/PageHeader'
import T from '@/components/ui/T'
import TD from '@/components/ui/TD'
import { prisma } from '@/lib/prisma'
import { formatDate, formatVND } from '@/lib/format'

export const metadata = {
  title: 'Ưu đãi đặc biệt',
  description: 'Các chương trình ưu đãi và mã giảm giá khi đặt phòng trực tiếp tại Long Hải Hotel.',
}

export default async function OffersPage() {
  const promotions = await prisma.promotion.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
  })

  const discountCodes = await prisma.discountCode.findMany({
    where: { isActive: true, validTo: { gte: new Date() } },
  })

  return (
    <div className="px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[1400px]">
        <PageHeader titleKey="offers.title" subtitleKey="offers.subtitle" descKey="offers.desc" />

        {promotions.length > 0 && (
          <div className="mb-20">
            <div className="mb-10 flex items-center gap-5">
              <h2 className="whitespace-nowrap text-[11px] uppercase tracking-[0.26em] text-ink">
                <T k="offers.promotions" />
              </h2>
              <span className="h-px flex-1 bg-line" />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {promotions.map((promo) => (
                <div key={promo.id} className="flex flex-col border border-line p-9 text-center">
                  {promo.badgeText && (
                    <span className="mx-auto mb-6 bg-brand px-3.5 py-1.5 text-[9px] uppercase tracking-[0.2em] text-white">
                      <TD>{promo.badgeText}</TD>
                    </span>
                  )}
                  <h3 className="text-sm uppercase tracking-[0.14em] text-ink">
                    <TD>{promo.title}</TD>
                  </h3>
                  <span className="mx-auto mt-4 block h-px w-10 bg-brand" />
                  <p className="mt-5 flex-1 text-xs font-light leading-relaxed text-ink-soft">
                    <TD>{promo.description}</TD>
                  </p>
                  <p className="mt-6 flex items-center justify-center gap-1.5 text-[9px] uppercase tracking-[0.18em] text-ink-soft">
                    <Calendar className="h-3 w-3" strokeWidth={1.5} />
                    <T k="offers.until" /> {formatDate(promo.validTo)}
                  </p>
                  <Link href="/dat-phong" className="mt-6">
                    <Button variant="outline" size="sm" className="w-full">
                      <T k="offers.bookNow" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {discountCodes.length > 0 && (
          <div className="mb-20">
            <div className="mb-10 flex items-center gap-5">
              <h2 className="whitespace-nowrap text-[11px] uppercase tracking-[0.26em] text-ink">
                <T k="offers.discountCodes" />
              </h2>
              <span className="h-px flex-1 bg-line" />
            </div>

            <div className="grid gap-px bg-line md:grid-cols-2">
              {discountCodes.map((dc) => (
                <div key={dc.id} className="flex items-center gap-6 bg-white p-8">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center border border-brand/40">
                    {dc.type === 'PERCENTAGE' ? (
                      <Percent className="h-5 w-5 text-brand" strokeWidth={1.2} />
                    ) : (
                      <Tag className="h-5 w-5 text-brand" strokeWidth={1.2} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <code className="bg-sand px-3 py-1 text-xs tracking-[0.14em] text-ink">
                        {dc.code}
                      </code>
                      <span className="text-[11px] uppercase tracking-[0.14em] text-brand-deep">
                        {dc.type === 'PERCENTAGE' ? `−${dc.value}%` : `−${formatVND(dc.value)}`}
                      </span>
                    </div>
                    <p className="mt-2.5 text-[9px] uppercase tracking-[0.16em] text-ink-soft">
                      <T k="offers.minNights" /> {dc.minNights} <T k="offers.nightsUnit" /> ·{' '}
                      <T k="offers.until" /> {formatDate(dc.validTo)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tại sao đặt trực tiếp */}
        <div className="relative overflow-hidden">
          <img
            src="/images/hotel-hero.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-night/85" />
          <div className="relative px-8 py-16 text-center lg:px-14 lg:py-20">
            <h2 className="text-xl font-light uppercase tracking-[0.22em] text-white lg:text-2xl">
              <T k="offers.whyDirect" />
            </h2>
            <span className="mx-auto mt-5 block h-px w-14 bg-brand" />

            <div className="mx-auto mt-14 grid max-w-4xl gap-12 md:grid-cols-3">
              {[
                { n: '01', tKey: 'offers.bestPrice', dKey: 'offers.bestPrice.desc' },
                { n: '02', tKey: 'offers.exclusive', dKey: 'offers.exclusive.desc' },
                { n: '03', tKey: 'offers.support', dKey: 'offers.support.desc' },
              ].map((item) => (
                <div key={item.tKey}>
                  <span className="block text-2xl font-extralight text-brand">{item.n}</span>
                  <h3 className="mt-4 text-[11px] uppercase tracking-[0.2em] text-white">
                    <T k={item.tKey} />
                  </h3>
                  <p className="mt-3.5 text-xs font-light leading-relaxed text-white/65">
                    <T k={item.dKey} />
                  </p>
                </div>
              ))}
            </div>

            <Link href="/dat-phong" className="mt-14 inline-block">
              <Button size="lg" variant="light">
                <T k="hero.bookNow" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
