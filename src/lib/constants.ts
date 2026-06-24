export const HOTEL_CONFIG = {
  name: 'Khách Sạn Ninh Bình',
  tagline: 'Nghỉ dưỡng giữa lòng di sản',
  address: 'Ninh Bình, Việt Nam',
  phone: '0229 xxx xxxx',
  email: 'info@ksninhbinh.vn',
  mapUrl: '',
}

export const NAV_ITEMS = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Phòng & Giá', href: '/phong' },
  { label: 'Đặt phòng', href: '/dat-phong' },
  { label: 'Tiện ích', href: '/tien-ich' },
  { label: 'Đánh giá', href: '/danh-gia' },
  { label: 'Ưu đãi', href: '/uu-dai' },
  { label: 'Khu vực', href: '/khu-vuc' },
  { label: 'Về chúng tôi', href: '/ve-chung-toi' },
  { label: 'Liên hệ', href: '/lien-he' },
]

export const ADMIN_NAV_ITEMS = [
  { label: 'Bảng điều khiển', href: '/admin', icon: 'LayoutDashboard' },
  { label: 'Đặt phòng', href: '/admin/dat-phong', icon: 'CalendarDays' },
  { label: 'Phòng', href: '/admin/phong', icon: 'BedDouble' },
  { label: 'Đánh giá', href: '/admin/danh-gia', icon: 'Star' },
  { label: 'Kho hàng', href: '/admin/kho', icon: 'Package' },
  { label: 'Nhân viên', href: '/admin/nhan-vien', icon: 'Users' },
  { label: 'Khuyến mãi', href: '/admin/khuyen-mai', icon: 'Tag' },
  { label: 'Báo cáo', href: '/admin/bao-cao', icon: 'BarChart3' },
]

export const BOOKING_STATUS: Record<string, { label: string; color: string }> = {
  PENDING: { label: 'Chờ xác nhận', color: 'bg-yellow-100 text-yellow-800' },
  CONFIRMED: { label: 'Đã xác nhận', color: 'bg-blue-100 text-blue-800' },
  CHECKED_IN: { label: 'Đã nhận phòng', color: 'bg-green-100 text-green-800' },
  CHECKED_OUT: { label: 'Đã trả phòng', color: 'bg-gray-100 text-gray-800' },
  CANCELLED: { label: 'Đã hủy', color: 'bg-red-100 text-red-800' },
}

export const ROOM_STATUS: Record<string, { label: string; color: string }> = {
  AVAILABLE: { label: 'Trống', color: 'bg-green-100 text-green-800' },
  OCCUPIED: { label: 'Đang sử dụng', color: 'bg-blue-100 text-blue-800' },
  MAINTENANCE: { label: 'Bảo trì', color: 'bg-orange-100 text-orange-800' },
  CLEANING: { label: 'Đang dọn', color: 'bg-purple-100 text-purple-800' },
}

export const TASK_PRIORITY: Record<string, { label: string; color: string }> = {
  LOW: { label: 'Thấp', color: 'bg-gray-100 text-gray-800' },
  MEDIUM: { label: 'Trung bình', color: 'bg-blue-100 text-blue-800' },
  HIGH: { label: 'Cao', color: 'bg-orange-100 text-orange-800' },
  URGENT: { label: 'Khẩn cấp', color: 'bg-red-100 text-red-800' },
}

export const TASK_STATUS: Record<string, { label: string; color: string }> = {
  PENDING: { label: 'Chờ xử lý', color: 'bg-yellow-100 text-yellow-800' },
  IN_PROGRESS: { label: 'Đang thực hiện', color: 'bg-blue-100 text-blue-800' },
  COMPLETED: { label: 'Hoàn thành', color: 'bg-green-100 text-green-800' },
}

export const STOCK_HISTORY_TYPE: Record<string, string> = {
  RESTOCK: 'Nhập kho',
  USAGE: 'Sử dụng',
  ADJUSTMENT: 'Điều chỉnh',
}
