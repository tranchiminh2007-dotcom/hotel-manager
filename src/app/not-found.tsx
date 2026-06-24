import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-amber-700 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Trang không tồn tại</h2>
        <p className="text-gray-600 mb-8">
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
        </p>
        <Link href="/">
          <Button size="lg">Về trang chủ</Button>
        </Link>
      </div>
    </div>
  )
}
