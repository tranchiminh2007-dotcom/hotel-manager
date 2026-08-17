import type { Metadata } from 'next'
import { Raleway, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const raleway = Raleway({
  subsets: ['vietnamese', 'latin'],
  weight: ['200', '300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['vietnamese', 'latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Long Hải Hotel — Nghỉ dưỡng giữa lòng di sản',
    template: '%s | Long Hải Hotel',
  },
  description:
    'Khách sạn tại Ninh Bình với phòng nghỉ thoải mái, gần Tràng An, Bái Đính, Phố Cổ Hoa Lư. Đặt phòng trực tiếp để nhận ưu đãi tốt nhất.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="vi"
      className={`${raleway.variable} ${cormorant.variable} h-full antialiased`}
      style={{ colorScheme: 'light' }}
    >
      <body
        className="min-h-full flex flex-col bg-white text-ink"
        style={{ backgroundColor: '#ffffff' }}
      >
        {children}
      </body>
    </html>
  )
}
