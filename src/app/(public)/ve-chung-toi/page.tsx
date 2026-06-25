import { prisma } from '@/lib/prisma'
import { placeholderImage } from '@/lib/utils'
import PageHeader from '@/components/ui/PageHeader'
import T from '@/components/ui/T'
import TD from '@/components/ui/TD'

export const metadata = {
  title: 'Về chúng tôi',
  description: 'Câu chuyện Khách Sạn Ninh Bình - nơi nghỉ dưỡng giữa lòng di sản thiên nhiên.',
}

export default async function AboutPage() {
  const settings = await prisma.hotelSettings.findUnique({ where: { id: 'main' } })

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader titleKey="about.title" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-200">
            <img
              src={placeholderImage(800, 600, 'Khách Sạn')}
              alt="Khách Sạn Ninh Bình"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4"><T k="about.story" /></h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              <TD>{settings?.story || ''}</TD>
            </p>
          </div>
        </div>

        <div className="bg-amber-50 rounded-2xl p-8 lg:p-12 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center"><T k="about.values" /></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { titleKey: 'about.val1.title', descKey: 'about.val1.desc' },
              { titleKey: 'about.val2.title', descKey: 'about.val2.desc' },
              { titleKey: 'about.val3.title', descKey: 'about.val3.desc' },
            ].map((v) => (
              <div key={v.titleKey} className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2"><T k={v.titleKey} /></h3>
                <p className="text-sm text-gray-600"><T k={v.descKey} /></p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center"><T k="about.sustainability" /></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {['about.sus1', 'about.sus2', 'about.sus3', 'about.sus4'].map((key) => (
              <div key={key} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                <span className="text-green-600 font-bold mt-0.5">✓</span>
                <p className="text-sm text-gray-700"><T k={key} /></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
