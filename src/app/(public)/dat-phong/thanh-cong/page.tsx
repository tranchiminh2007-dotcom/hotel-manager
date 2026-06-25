'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Phone } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { HOTEL_CONFIG } from '@/lib/constants'
import { useLanguage } from '@/lib/language-context'

function SuccessContent() {
  const searchParams = useSearchParams()
  const code = searchParams.get('code') || ''
  const { t } = useLanguage()

  return (
    <div className="py-16">
      <div className="max-w-lg mx-auto px-4 text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{t('success.title')}</h1>
        <p className="text-gray-600 mb-8">{t('success.desc')}</p>

        <Card className="p-6 mb-8">
          <p className="text-sm text-gray-500 mb-2">{t('success.code')}</p>
          <p className="text-3xl font-bold text-amber-700 mb-4">{code}</p>
          <p className="text-sm text-gray-500">{t('success.saveCode')}</p>
        </Card>

        <div className="space-y-3">
          <Link href="/">
            <Button className="w-full">{t('success.home')}</Button>
          </Link>
          <a href={`tel:${HOTEL_CONFIG.phone.replace(/\s/g, '')}`}>
            <Button variant="outline" className="w-full flex items-center justify-center gap-2 mt-2">
              <Phone className="h-4 w-4" />
              {t('success.contact')}: {HOTEL_CONFIG.phone}
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<div className="py-16 text-center text-gray-500">Đang tải...</div>}>
      <SuccessContent />
    </Suspense>
  )
}
