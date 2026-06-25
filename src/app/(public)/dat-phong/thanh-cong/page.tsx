'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Phone } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { HOTEL_CONFIG } from '@/lib/constants'

function SuccessContent() {
  const searchParams = useSearchParams()
  const code = searchParams.get('code') || ''

  return (
    <div className="py-16">
      <div className="max-w-lg mx-auto px-4 text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Đặt phòng thành công!</h1>
        <p className="text-gray-600 mb-8">
          Cảm ơn bạn đã đặt phòng tại {HOTEL_CONFIG.name}. Chúng tôi sẽ xác nhận đặt phòng sớm nhất.
        </p>

        <Card className="p-6 mb-8">
          <p className="text-sm text-gray-500 mb-2">Mã đặt phòng của bạn</p>
          <p className="text-3xl font-bold text-amber-700 mb-4">{code}</p>
          <p className="text-sm text-gray-500">
            Vui lòng lưu mã này để tra cứu thông tin đặt phòng.
          </p>
        </Card>

        <div className="space-y-3">
          <Link href="/">
            <Button className="w-full">Về trang chủ</Button>
          </Link>
          <a href={`tel:${HOTEL_CONFIG.phone}`}>
            <Button variant="outline" className="w-full flex items-center justify-center gap-2 mt-2">
              <Phone className="h-4 w-4" />
              Liên hệ: {HOTEL_CONFIG.phone}
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
