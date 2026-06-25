'use client'

import Link from 'next/link'
import { MapPin, Phone, Mail } from 'lucide-react'
import { HOTEL_CONFIG } from '@/lib/constants'
import { useLanguage } from '@/lib/language-context'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">{HOTEL_CONFIG.name}</h3>
            <p className="text-sm leading-relaxed">{t('hero.tagline')}</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{HOTEL_CONFIG.address}</span>
              </div>
              <a href={`tel:${HOTEL_CONFIG.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-sm hover:text-amber-400 transition-colors">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>{HOTEL_CONFIG.phone}</span>
              </a>
              <a href={`mailto:${HOTEL_CONFIG.email}`} className="flex items-center gap-2 text-sm hover:text-amber-400 transition-colors">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>{HOTEL_CONFIG.email}</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/phong" className="hover:text-amber-400 transition-colors">{t('nav.rooms')}</Link></li>
              <li><Link href="/dat-phong" className="hover:text-amber-400 transition-colors">{t('nav.booking')}</Link></li>
              <li><Link href="/tien-ich" className="hover:text-amber-400 transition-colors">{t('nav.amenities')}</Link></li>
              <li><Link href="/khu-vuc" className="hover:text-amber-400 transition-colors">{t('nav.area')}</Link></li>
              <li><Link href="/lien-he" className="hover:text-amber-400 transition-colors">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">{t('footer.explore')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/ve-chung-toi" className="hover:text-amber-400 transition-colors">{t('nav.about')}</Link></li>
              <li><Link href="/danh-gia" className="hover:text-amber-400 transition-colors">{t('nav.reviews')}</Link></li>
              <li><Link href="/uu-dai" className="hover:text-amber-400 transition-colors">{t('nav.offers')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} {HOTEL_CONFIG.name}. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  )
}
