import Link from 'next/link'
import { Tag, Calendar, Percent } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import PageHeader from '@/components/ui/PageHeader'
import T from '@/components/ui/T'
import TD from '@/components/ui/TD'
import { prisma } from '@/lib/prisma'
import { formatDate, formatVND } from '@/lib/format'

export const metadata = {
  title: 'Ưu đãi đặc biệt',
  description: 'Các chương trình ưu đãi và mã giảm giá khi đặt phòng trực tiếp tại Khách Sạn Ninh Bình.',
}

export default async function OffersPage() {
  const promotions = await prisma.promotion.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
  })

  const discountCodes = await prisma.discountCode.findMany({
    where: {
      isActive: true,
      validTo: { gte: new Date() },
    },
  })

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader titleKey="offers.title" descKey="offers.desc" />

        {promotions.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6"><T k="offers.promotions" /></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {promotions.map((promo) => (
                <Card key={promo.id} hover className="p-6 border-amber-200 bg-amber-50/50">
                  {promo.badgeText && (
                    <span className="inline-block bg-amber-700 text-white text-xs font-bold px-2.5 py-1 rounded mb-3">
                      <TD>{promo.badgeText}</TD>
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-gray-900 mb-2"><TD>{promo.title}</TD></h3>
                  <p className="text-sm text-gray-600 mb-4"><TD>{promo.description}</TD></p>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
                    <Calendar className="h-3 w-3" />
                    <span><T k="offers.until" /> {formatDate(promo.validTo)}</span>
                  </div>
                  <Link href="/dat-phong">
                    <Button size="sm" className="w-full"><T k="offers.bookNow" /></Button>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        )}

        {discountCodes.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6"><T k="offers.discountCodes" /></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {discountCodes.map((dc) => (
                <Card key={dc.id} className="p-6 flex items-center gap-4">
                  <div className="flex-shrink-0 h-16 w-16 bg-amber-100 rounded-xl flex items-center justify-center">
                    {dc.type === 'PERCENTAGE' ? (
                      <Percent className="h-8 w-8 text-amber-700" />
                    ) : (
                      <Tag className="h-8 w-8 text-amber-700" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-bold text-amber-800">
                        {dc.code}
                      </code>
                      <span className="text-sm font-semibold text-green-700">
                        {dc.type === 'PERCENTAGE' ? <><T k="offers.minNights" /> {dc.value}%</> : <>{formatVND(dc.value)} <T k="offers.bookNow" /></>}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      <T k="offers.minNights" /> {dc.minNights} <T k="offers.nightsUnit" /> • <T k="offers.until" /> {formatDate(dc.validTo)}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="bg-amber-800 text-white rounded-2xl p-8 lg:p-12 text-center">
          <h2 className="text-2xl font-bold mb-4"><T k="offers.whyDirect" /></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { tKey: 'offers.bestPrice', dKey: 'offers.bestPrice.desc' },
              { tKey: 'offers.exclusive', dKey: 'offers.exclusive.desc' },
              { tKey: 'offers.support', dKey: 'offers.support.desc' },
            ].map((item) => (
              <div key={item.tKey}>
                <h3 className="font-semibold mb-1"><T k={item.tKey} /></h3>
                <p className="text-sm opacity-90"><T k={item.dKey} /></p>
              </div>
            ))}
          </div>
          <Link href="/dat-phong">
            <Button size="lg" className="bg-white text-amber-800 hover:bg-gray-100">
              <T k="hero.bookNow" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
