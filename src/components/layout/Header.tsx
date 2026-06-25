'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { HOTEL_CONFIG } from '@/lib/constants'
import { useLanguage } from '@/lib/language-context'
import Button from '@/components/ui/Button'
import LanguageSwitcher from './LanguageSwitcher'

const NAV_KEYS = [
  { key: 'nav.home', href: '/' },
  { key: 'nav.rooms', href: '/phong' },
  { key: 'nav.booking', href: '/dat-phong' },
  { key: 'nav.amenities', href: '/tien-ich' },
  { key: 'nav.reviews', href: '/danh-gia' },
  { key: 'nav.offers', href: '/uu-dai' },
  { key: 'nav.area', href: '/khu-vuc' },
  { key: 'nav.about', href: '/ve-chung-toi' },
  { key: 'nav.contact', href: '/lien-he' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-amber-800">{HOTEL_CONFIG.name}</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_KEYS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-amber-800 rounded-lg hover:bg-amber-50 transition-colors"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <a href={`tel:${HOTEL_CONFIG.phone.replace(/\s/g, '')}`} className="flex items-center gap-1 text-sm text-gray-600">
              <Phone className="h-4 w-4" />
              {HOTEL_CONFIG.phone}
            </a>
            <Link href="/dat-phong">
              <Button size="sm">{t('nav.bookNow')}</Button>
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 space-y-1">
            {NAV_KEYS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-amber-800 hover:bg-amber-50 rounded-lg"
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-100 space-y-2">
              <a
                href={`tel:${HOTEL_CONFIG.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2 px-3 py-2 text-base font-medium text-amber-700"
              >
                <Phone className="h-5 w-5" />
                {HOTEL_CONFIG.phone}
              </a>
              <Link href="/dat-phong" onClick={() => setMobileOpen(false)}>
                <Button className="w-full">{t('nav.bookNow')}</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
