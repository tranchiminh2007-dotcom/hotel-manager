import Link from 'next/link'
import { MapPin, Phone, Mail } from 'lucide-react'
import { HOTEL_CONFIG } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">{HOTEL_CONFIG.name}</h3>
            <p className="text-sm leading-relaxed">{HOTEL_CONFIG.tagline}</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{HOTEL_CONFIG.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>{HOTEL_CONFIG.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>{HOTEL_CONFIG.email}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/phong" className="hover:text-amber-400 transition-colors">Phòng & Giá</Link></li>
              <li><Link href="/dat-phong" className="hover:text-amber-400 transition-colors">Đặt phòng</Link></li>
              <li><Link href="/tien-ich" className="hover:text-amber-400 transition-colors">Tiện ích & Dịch vụ</Link></li>
              <li><Link href="/khu-vuc" className="hover:text-amber-400 transition-colors">Khu vực lân cận</Link></li>
              <li><Link href="/lien-he" className="hover:text-amber-400 transition-colors">Liên hệ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">Khám phá</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/ve-chung-toi" className="hover:text-amber-400 transition-colors">Về chúng tôi</Link></li>
              <li><Link href="/danh-gia" className="hover:text-amber-400 transition-colors">Đánh giá của khách</Link></li>
              <li><Link href="/uu-dai" className="hover:text-amber-400 transition-colors">Ưu đãi đặc biệt</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} {HOTEL_CONFIG.name}. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}
