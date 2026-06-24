import type { Metadata } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['vietnamese', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Khách Sạn Ninh Bình - Nghỉ dưỡng giữa lòng di sản',
    template: '%s | Khách Sạn Ninh Bình',
  },
  description: 'Khách sạn tại Ninh Bình với phòng nghỉ thoải mái, gần Tràng An, Bái Đính, Phố Cổ Hoa Lư. Đặt phòng trực tiếp để nhận ưu đãi tốt nhất.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className={`${beVietnamPro.className} h-full antialiased`} style={{ colorScheme: 'light' }}>
      <body className="min-h-full flex flex-col bg-white text-gray-900" style={{ backgroundColor: '#ffffff' }}>
        {children}
      </body>
    </html>
  )
}
