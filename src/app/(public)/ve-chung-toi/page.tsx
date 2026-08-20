import { prisma } from '@/lib/prisma'
import { placeholderImage } from '@/lib/utils'
import PageHeader from '@/components/ui/PageHeader'
import T from '@/components/ui/T'
import TD from '@/components/ui/TD'
import CoverImage from '@/components/ui/CoverImage'

export const metadata = {
  title: 'Về chúng tôi',
  description: 'Câu chuyện Long Hải Hotel — nơi nghỉ dưỡng giữa lòng di sản thiên nhiên.',
}

export default async function AboutPage() {
  const settings = await prisma.hotelSettings.findUnique({ where: { id: 'main' } })

  return (
    <div className="px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[1400px]">
        <PageHeader titleKey="about.title" subtitleKey="about.subtitle" />

        {/* Câu chuyện */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden bg-sand">
            <CoverImage src={placeholderImage()} alt="Long Hải Hotel" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div>
            <h2 className="text-xl font-light uppercase tracking-[0.12em] text-ink lg:text-2xl">
              <T k="about.story" />
            </h2>
            <span className="mt-5 block h-px w-14 bg-brand" />
            <p className="mt-7 whitespace-pre-line text-base leading-[1.8] text-ink-soft">
              <TD>{settings?.story || ''}</TD>
            </p>
          </div>
        </div>

        {/* Giá trị cốt lõi */}
        <div className="mt-20 bg-sand px-8 py-14 lg:mt-28 lg:px-14 lg:py-20">
          <h2 className="text-center text-xl font-light uppercase tracking-[0.12em] text-ink lg:text-2xl">
            <T k="about.values" />
          </h2>
          <span className="mx-auto mt-5 block h-px w-14 bg-brand" />

          <div className="mt-14 grid gap-12 md:grid-cols-3">
            {[
              { n: '01', titleKey: 'about.val1.title', descKey: 'about.val1.desc' },
              { n: '02', titleKey: 'about.val2.title', descKey: 'about.val2.desc' },
              { n: '03', titleKey: 'about.val3.title', descKey: 'about.val3.desc' },
            ].map((v) => (
              <div key={v.titleKey} className="text-center">
                <span className="block text-2xl font-light text-brand">{v.n}</span>
                <h3 className="mt-5 text-[13px] uppercase tracking-[0.12em] text-ink">
                  <T k={v.titleKey} />
                </h3>
                <p className="mt-4 text-[15px] leading-[1.75] text-ink-soft">
                  <T k={v.descKey} />
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Cam kết bền vững */}
        <div className="mt-20 lg:mt-28">
          <h2 className="text-center text-xl font-light uppercase tracking-[0.12em] text-ink lg:text-2xl">
            <T k="about.sustainability" />
          </h2>
          <span className="mx-auto mt-5 block h-px w-14 bg-brand" />

          <div className="mx-auto mt-12 grid max-w-4xl gap-px bg-line sm:grid-cols-2">
            {['about.sus1', 'about.sus2', 'about.sus3', 'about.sus4'].map((key, i) => (
              <div key={key} className="flex gap-4 bg-white p-8">
                <span className="text-[12px] font-normal tracking-[0.1em] text-brand">
                  0{i + 1}
                </span>
                <p className="text-[15px] leading-[1.75] text-ink-soft">
                  <T k={key} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
