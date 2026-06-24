import { z } from 'zod'

export const bookingSearchSchema = z.object({
  checkIn: z.string().min(1, 'Vui lòng chọn ngày nhận phòng'),
  checkOut: z.string().min(1, 'Vui lòng chọn ngày trả phòng'),
  guests: z.coerce.number().min(1, 'Tối thiểu 1 khách').max(10, 'Tối đa 10 khách'),
  roomType: z.string().optional(),
})

export const bookingCreateSchema = z.object({
  checkIn: z.string(),
  checkOut: z.string(),
  numGuests: z.coerce.number().min(1).max(10),
  roomId: z.string().min(1, 'Vui lòng chọn phòng'),
  fullName: z.string().min(2, 'Vui lòng nhập họ tên'),
  email: z.string().email('Email không hợp lệ').optional().or(z.literal('')),
  phone: z.string().min(9, 'Số điện thoại không hợp lệ'),
  idNumber: z.string().optional(),
  nationality: z.string().default('Việt Nam'),
  specialRequests: z.string().optional(),
  discountCode: z.string().optional(),
})

export const contactSchema = z.object({
  name: z.string().min(2, 'Vui lòng nhập họ tên'),
  email: z.string().email('Email không hợp lệ'),
  phone: z.string().min(9, 'Số điện thoại không hợp lệ'),
  subject: z.string().min(2, 'Vui lòng nhập tiêu đề'),
  message: z.string().min(10, 'Nội dung tối thiểu 10 ký tự'),
})

export const reviewSchema = z.object({
  guestName: z.string().min(2, 'Vui lòng nhập tên'),
  rating: z.coerce.number().min(1, 'Vui lòng chọn đánh giá').max(5),
  content: z.string().optional(),
})

export const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự'),
})

export const stockItemSchema = z.object({
  name: z.string().min(1, 'Vui lòng nhập tên sản phẩm'),
  sku: z.string().min(1, 'Vui lòng nhập mã SKU'),
  currentStock: z.coerce.number().min(0),
  minStock: z.coerce.number().min(0),
  unit: z.string().min(1, 'Vui lòng nhập đơn vị'),
  categoryId: z.string().min(1, 'Vui lòng chọn danh mục'),
})

export const taskSchema = z.object({
  title: z.string().min(1, 'Vui lòng nhập tiêu đề'),
  description: z.string().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  assignedToId: z.string().optional(),
  dueDate: z.string().optional(),
  roomNumber: z.string().optional(),
})
