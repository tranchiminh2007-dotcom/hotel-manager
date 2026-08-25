import type { Metadata } from 'next'
import { Be_Vietnam_Pro, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

/**
 * Chỉ tải đúng số kiểu chữ đang dùng — mỗi kiểu là một file tải về, và khi
 * font tải xong trình duyệt phải dựng lại chữ, tải thừa sẽ gây giật lúc cuộn.
 * Font chính thiết kế riêng cho tiếng Việt nên dấu hiển thị rõ ở mọi cỡ chữ.
 */
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['vietnamese', 'latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

/** Font trang trí — chỉ dùng cho vài tiêu đề lớn và trích dẫn. */
const cormorant = Cormorant_Garamond({
  subsets: ['vietnamese', 'latin'],
  weight: ['400'],
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
      className={`${beVietnamPro.variable} ${cormorant.variable} h-full antialiased`}
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
