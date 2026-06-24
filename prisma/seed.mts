import { PrismaClient } from '../src/generated/prisma/client.ts'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import bcrypt from 'bcryptjs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.resolve(__dirname, '..', 'dev.db')
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` })

const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Đang tạo dữ liệu mẫu...')

  // Users
  const hashedPassword = await bcrypt.hash('123456', 10)
  const manager = await prisma.user.create({
    data: {
      email: 'admin@hotel.com',
      password: hashedPassword,
      name: 'Nguyễn Văn An',
      role: 'MANAGER',
    },
  })
  const staff = await prisma.user.create({
    data: {
      email: 'nhanvien@hotel.com',
      password: hashedPassword,
      name: 'Trần Thị Bình',
      role: 'STAFF',
    },
  })

  // Room Types
  const phongDon = await prisma.roomType.create({
    data: {
      name: 'Phòng Đơn',
      slug: 'phong-don',
      description:
        'Phòng đơn ấm cúng, thiết kế hiện đại với đầy đủ tiện nghi cho khách du lịch cá nhân hoặc cặp đôi. Phòng được trang bị giường đôi êm ái, điều hòa, tivi màn hình phẳng, minibar và phòng tắm riêng với vòi sen nước nóng. Cửa sổ hướng ra khung cảnh thiên nhiên Ninh Bình tươi đẹp.',
      basePrice: 750000,
      maxGuests: 2,
      size: 25,
      bedType: 'Giường đôi',
      amenities: JSON.stringify([
        'WiFi miễn phí',
        'Điều hòa',
        'Tivi màn hình phẳng',
        'Minibar',
        'Phòng tắm riêng',
        'Vòi sen nước nóng',
        'Khăn tắm',
        'Đồ vệ sinh cá nhân',
      ]),
    },
  })
  const phongFamily = await prisma.roomType.create({
    data: {
      name: 'Phòng Family',
      slug: 'phong-family',
      description:
        'Phòng rộng rãi dành cho gia đình, với không gian thoáng đãng và đầy đủ tiện nghi cho cả nhà. Phòng có 2 giường lớn, khu vực sinh hoạt riêng biệt, điều hòa, tivi màn hình lớn, minibar, phòng tắm rộng với bồn tắm và vòi sen. Lý tưởng cho gia đình có trẻ nhỏ muốn tận hưởng kỳ nghỉ bên nhau.',
      basePrice: 1050000,
      maxGuests: 4,
      size: 40,
      bedType: '2 giường đôi',
      amenities: JSON.stringify([
        'WiFi miễn phí',
        'Điều hòa',
        'Tivi màn hình lớn',
        'Minibar',
        'Phòng tắm rộng',
        'Bồn tắm & vòi sen',
        'Khăn tắm',
        'Đồ vệ sinh cá nhân',
        'Bàn làm việc',
        'Tủ quần áo',
      ]),
    },
  })

  // Room Images
  await prisma.roomImage.createMany({
    data: [
      { roomTypeId: phongDon.id, url: '/images/phong-don-1.jpg', alt: 'Phòng Đơn - Toàn cảnh', sortOrder: 0 },
      { roomTypeId: phongDon.id, url: '/images/phong-don-2.jpg', alt: 'Phòng Đơn - Phòng tắm', sortOrder: 1 },
      { roomTypeId: phongFamily.id, url: '/images/phong-family-1.jpg', alt: 'Phòng Family - Toàn cảnh', sortOrder: 0 },
      { roomTypeId: phongFamily.id, url: '/images/phong-family-2.jpg', alt: 'Phòng Family - Khu vực sinh hoạt', sortOrder: 1 },
    ],
  })

  // Rooms: 23 rooms, floors 2-6
  const rooms: { number: string; floor: number; roomTypeId: string }[] = [
    // Tầng 2: 5 phòng
    { number: '201', floor: 2, roomTypeId: phongDon.id },
    { number: '202', floor: 2, roomTypeId: phongDon.id },
    { number: '203', floor: 2, roomTypeId: phongDon.id },
    { number: '204', floor: 2, roomTypeId: phongFamily.id },
    { number: '205', floor: 2, roomTypeId: phongFamily.id },
    // Tầng 3: 5 phòng
    { number: '301', floor: 3, roomTypeId: phongDon.id },
    { number: '302', floor: 3, roomTypeId: phongDon.id },
    { number: '303', floor: 3, roomTypeId: phongDon.id },
    { number: '304', floor: 3, roomTypeId: phongFamily.id },
    { number: '305', floor: 3, roomTypeId: phongFamily.id },
    // Tầng 4: 5 phòng
    { number: '401', floor: 4, roomTypeId: phongDon.id },
    { number: '402', floor: 4, roomTypeId: phongDon.id },
    { number: '403', floor: 4, roomTypeId: phongDon.id },
    { number: '404', floor: 4, roomTypeId: phongFamily.id },
    { number: '405', floor: 4, roomTypeId: phongFamily.id },
    // Tầng 5: 5 phòng
    { number: '501', floor: 5, roomTypeId: phongDon.id },
    { number: '502', floor: 5, roomTypeId: phongDon.id },
    { number: '503', floor: 5, roomTypeId: phongDon.id },
    { number: '504', floor: 5, roomTypeId: phongFamily.id },
    { number: '505', floor: 5, roomTypeId: phongFamily.id },
    // Tầng 6: 3 phòng
    { number: '601', floor: 6, roomTypeId: phongDon.id },
    { number: '602', floor: 6, roomTypeId: phongDon.id },
    { number: '603', floor: 6, roomTypeId: phongFamily.id },
  ]

  const createdRooms = await Promise.all(
    rooms.map((r) => prisma.room.create({ data: r }))
  )

  // Guests
  const guests = await Promise.all([
    prisma.guest.create({ data: { fullName: 'Lê Minh Tuấn', phone: '0912345678', email: 'tuan.le@email.com', nationality: 'Việt Nam' } }),
    prisma.guest.create({ data: { fullName: 'Phạm Thị Hương', phone: '0923456789', email: 'huong.pham@email.com', nationality: 'Việt Nam' } }),
    prisma.guest.create({ data: { fullName: 'Nguyễn Hoàng Nam', phone: '0934567890', email: 'nam.nguyen@email.com', nationality: 'Việt Nam' } }),
    prisma.guest.create({ data: { fullName: 'Võ Thanh Hà', phone: '0945678901', nationality: 'Việt Nam' } }),
    prisma.guest.create({ data: { fullName: 'Đặng Quốc Bảo', phone: '0956789012', email: 'bao.dang@email.com', nationality: 'Việt Nam' } }),
    prisma.guest.create({ data: { fullName: 'Trương Thị Mai', phone: '0967890123', nationality: 'Việt Nam' } }),
    prisma.guest.create({ data: { fullName: 'Bùi Văn Đức', phone: '0978901234', email: 'duc.bui@email.com', nationality: 'Việt Nam' } }),
    prisma.guest.create({ data: { fullName: 'Hoàng Thị Lan', phone: '0989012345', nationality: 'Việt Nam' } }),
  ])

  // Bookings
  const now = new Date()
  await Promise.all([
    prisma.booking.create({
      data: {
        code: 'BK-20260620-001',
        checkIn: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2),
        checkOut: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
        numGuests: 2,
        totalPrice: 2250000,
        status: 'CHECKED_IN',
        guestId: guests[0].id,
        roomId: createdRooms[0].id,
      },
    }),
    prisma.booking.create({
      data: {
        code: 'BK-20260620-002',
        checkIn: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
        checkOut: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 4),
        numGuests: 4,
        totalPrice: 3150000,
        status: 'CONFIRMED',
        guestId: guests[1].id,
        roomId: createdRooms[3].id,
      },
    }),
    prisma.booking.create({
      data: {
        code: 'BK-20260619-003',
        checkIn: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5),
        checkOut: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2),
        numGuests: 2,
        totalPrice: 2250000,
        status: 'CHECKED_OUT',
        guestId: guests[2].id,
        roomId: createdRooms[1].id,
      },
    }),
    prisma.booking.create({
      data: {
        code: 'BK-20260621-004',
        checkIn: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3),
        checkOut: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5),
        numGuests: 3,
        totalPrice: 2100000,
        status: 'PENDING',
        guestId: guests[3].id,
        roomId: createdRooms[8].id,
      },
    }),
    prisma.booking.create({
      data: {
        code: 'BK-20260618-005',
        checkIn: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7),
        checkOut: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5),
        numGuests: 2,
        totalPrice: 1500000,
        status: 'CHECKED_OUT',
        guestId: guests[4].id,
        roomId: createdRooms[5].id,
      },
    }),
    prisma.booking.create({
      data: {
        code: 'BK-20260622-006',
        checkIn: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5),
        checkOut: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7),
        numGuests: 2,
        totalPrice: 1500000,
        status: 'CONFIRMED',
        guestId: guests[5].id,
        roomId: createdRooms[10].id,
      },
    }),
    prisma.booking.create({
      data: {
        code: 'BK-20260617-007',
        checkIn: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 10),
        checkOut: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 8),
        numGuests: 1,
        totalPrice: 1500000,
        status: 'CANCELLED',
        guestId: guests[6].id,
        roomId: createdRooms[2].id,
      },
    }),
    prisma.booking.create({
      data: {
        code: 'BK-20260623-008',
        checkIn: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
        checkOut: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2),
        numGuests: 4,
        totalPrice: 2100000,
        status: 'CHECKED_IN',
        guestId: guests[7].id,
        roomId: createdRooms[13].id,
      },
    }),
    prisma.booking.create({
      data: {
        code: 'BK-20260624-009',
        checkIn: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7),
        checkOut: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10),
        numGuests: 2,
        totalPrice: 2250000,
        status: 'PENDING',
        guestId: guests[0].id,
        roomId: createdRooms[15].id,
      },
    }),
    prisma.booking.create({
      data: {
        code: 'BK-20260624-010',
        checkIn: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2),
        checkOut: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 4),
        numGuests: 3,
        totalPrice: 2100000,
        status: 'CONFIRMED',
        guestId: guests[2].id,
        roomId: createdRooms[18].id,
      },
    }),
  ])

  // Reviews
  await prisma.review.createMany({
    data: [
      { guestName: 'Nguyễn Thị Hoa', rating: 5, content: 'Khách sạn rất đẹp, phòng sạch sẽ và nhân viên thân thiện. Vị trí thuận tiện để đi Tràng An và Bái Đính. Chắc chắn sẽ quay lại!' },
      { guestName: 'Trần Văn Minh', rating: 4, content: 'Phòng rộng rãi, view đẹp. Bữa sáng ngon. Chỉ tiếc là WiFi hơi chậm vào buổi tối.' },
      { guestName: 'Phạm Thanh Tùng', rating: 5, content: 'Tuyệt vời! Gia đình tôi rất hài lòng với phòng Family. Rộng rãi, sạch sẽ, đủ tiện nghi cho cả nhà.' },
      { guestName: 'Lê Thị Mai Anh', rating: 4, content: 'Vị trí rất tốt, gần các điểm du lịch. Nhân viên nhiệt tình hướng dẫn đường đi Tràng An.' },
      { guestName: 'Hoàng Đức Thắng', rating: 5, content: 'Dịch vụ xuất sắc, phòng đẹp, giá cả hợp lý. Đặc biệt ấn tượng với sự nhiệt tình của nhân viên lễ tân.' },
      { guestName: 'Vũ Thị Ngọc', rating: 3, content: 'Phòng ổn, sạch sẽ. Tuy nhiên cách âm chưa tốt lắm, nghe tiếng ồn từ hành lang.' },
      { guestName: 'Đỗ Quang Huy', rating: 5, content: 'Lần thứ 2 đến đây và vẫn rất hài lòng. Khách sạn luôn giữ chất lượng tốt.' },
      { guestName: 'Ngô Thị Bích', rating: 4, content: 'Phòng Family rất phù hợp cho gia đình có trẻ nhỏ. Bé nhà mình rất thích!' },
      { guestName: 'Bùi Văn Thành', rating: 5, content: 'Giá tốt, phòng sạch, nhân viên thân thiện. Sẽ giới thiệu cho bạn bè.' },
      { guestName: 'Dương Thị Hạnh', rating: 4, content: 'Đi công tác Ninh Bình và chọn ở đây. Rất tiện nghi, WiFi ổn để làm việc.' },
      { guestName: 'Phan Minh Đức', rating: 5, content: 'Khách sạn nằm ở vị trí đắc địa, đi Tràng An chỉ mất 15 phút. Phòng thoáng mát, sạch sẽ.' },
      { guestName: 'Trịnh Thị Yến', rating: 4, content: 'Kỳ nghỉ tuyệt vời tại Ninh Bình. Cảm ơn khách sạn đã cho trải nghiệm tốt!' },
    ],
  })

  // Discount Codes
  await prisma.discountCode.createMany({
    data: [
      {
        code: 'CHAODON',
        type: 'PERCENTAGE',
        value: 10,
        minNights: 1,
        maxUses: 100,
        usedCount: 12,
        validFrom: new Date('2026-01-01'),
        validTo: new Date('2026-12-31'),
        isActive: true,
      },
      {
        code: 'MUAHE2026',
        type: 'PERCENTAGE',
        value: 15,
        minNights: 2,
        maxUses: 50,
        usedCount: 8,
        validFrom: new Date('2026-06-01'),
        validTo: new Date('2026-08-31'),
        isActive: true,
      },
      {
        code: 'TRUCTUYẾN',
        type: 'FIXED',
        value: 200000,
        minNights: 2,
        maxUses: 200,
        usedCount: 35,
        validFrom: new Date('2026-01-01'),
        validTo: new Date('2026-12-31'),
        isActive: true,
      },
      {
        code: 'KHACHQUEN',
        type: 'PERCENTAGE',
        value: 20,
        minNights: 3,
        maxUses: 30,
        usedCount: 5,
        validFrom: new Date('2026-01-01'),
        validTo: new Date('2026-12-31'),
        isActive: true,
      },
    ],
  })

  // Amenities
  await prisma.amenity.createMany({
    data: [
      { name: 'WiFi miễn phí', description: 'Kết nối Internet tốc độ cao miễn phí tại tất cả các khu vực trong khách sạn.', icon: 'Wifi', category: 'SERVICES' },
      { name: 'Bãi đỗ xe', description: 'Bãi đỗ xe rộng rãi, miễn phí cho khách lưu trú. Có bảo vệ 24/7.', icon: 'Car', category: 'SERVICES' },
      { name: 'Nhà hàng', description: 'Nhà hàng phục vụ các món ăn đặc sản Ninh Bình và ẩm thực Việt Nam. Bữa sáng buffet hàng ngày.', icon: 'UtensilsCrossed', category: 'DINING' },
      { name: 'Quán cà phê', description: 'Quán cà phê với view đẹp, phục vụ đồ uống và bánh ngọt cả ngày.', icon: 'Coffee', category: 'DINING' },
      { name: 'Lễ tân 24/7', description: 'Dịch vụ lễ tân hoạt động 24/7, hỗ trợ khách hàng mọi lúc.', icon: 'Clock', category: 'SERVICES' },
      { name: 'Dịch vụ giặt ủi', description: 'Dịch vụ giặt ủi nhanh trong ngày với giá ưu đãi cho khách lưu trú.', icon: 'Shirt', category: 'SERVICES' },
      { name: 'Cho thuê xe', description: 'Dịch vụ cho thuê xe máy và ô tô để khám phá Ninh Bình và vùng lân cận.', icon: 'Bike', category: 'SERVICES' },
      { name: 'Khu vực thư giãn', description: 'Khu vườn và sân thượng yên tĩnh để thư giãn sau một ngày khám phá.', icon: 'TreePine', category: 'RECREATION' },
    ],
  })

  // Stock Categories & Items
  const catVeSinh = await prisma.stockCategory.create({ data: { name: 'Đồ vệ sinh' } })
  const catKhan = await prisma.stockCategory.create({ data: { name: 'Khăn trải' } })
  const catMinibar = await prisma.stockCategory.create({ data: { name: 'Minibar' } })
  const catVatTu = await prisma.stockCategory.create({ data: { name: 'Vật tư vệ sinh' } })

  await prisma.stockItem.createMany({
    data: [
      { name: 'Dầu gội', sku: 'VS-001', currentStock: 150, minStock: 50, unit: 'chai', categoryId: catVeSinh.id },
      { name: 'Sữa tắm', sku: 'VS-002', currentStock: 140, minStock: 50, unit: 'chai', categoryId: catVeSinh.id },
      { name: 'Bàn chải đánh răng', sku: 'VS-003', currentStock: 200, minStock: 60, unit: 'cái', categoryId: catVeSinh.id },
      { name: 'Kem đánh răng', sku: 'VS-004', currentStock: 180, minStock: 60, unit: 'tuýp', categoryId: catVeSinh.id },
      { name: 'Xà phòng rửa tay', sku: 'VS-005', currentStock: 100, minStock: 30, unit: 'chai', categoryId: catVeSinh.id },
      { name: 'Giấy vệ sinh', sku: 'VS-006', currentStock: 300, minStock: 100, unit: 'cuộn', categoryId: catVeSinh.id },
      { name: 'Khăn tắm lớn', sku: 'KT-001', currentStock: 80, minStock: 30, unit: 'cái', categoryId: catKhan.id },
      { name: 'Khăn tắm nhỏ', sku: 'KT-002', currentStock: 100, minStock: 40, unit: 'cái', categoryId: catKhan.id },
      { name: 'Khăn mặt', sku: 'KT-003', currentStock: 120, minStock: 40, unit: 'cái', categoryId: catKhan.id },
      { name: 'Ga trải giường', sku: 'KT-004', currentStock: 60, minStock: 25, unit: 'bộ', categoryId: catKhan.id },
      { name: 'Vỏ gối', sku: 'KT-005', currentStock: 80, minStock: 30, unit: 'cái', categoryId: catKhan.id },
      { name: 'Nước suối', sku: 'MB-001', currentStock: 200, minStock: 80, unit: 'chai', categoryId: catMinibar.id },
      { name: 'Nước ngọt', sku: 'MB-002', currentStock: 100, minStock: 40, unit: 'lon', categoryId: catMinibar.id },
      { name: 'Bánh snack', sku: 'MB-003', currentStock: 80, minStock: 30, unit: 'gói', categoryId: catMinibar.id },
      { name: 'Trà túi lọc', sku: 'MB-004', currentStock: 150, minStock: 50, unit: 'gói', categoryId: catMinibar.id },
      { name: 'Cà phê hòa tan', sku: 'MB-005', currentStock: 120, minStock: 40, unit: 'gói', categoryId: catMinibar.id },
      { name: 'Nước lau sàn', sku: 'VT-001', currentStock: 20, minStock: 10, unit: 'can', categoryId: catVatTu.id },
      { name: 'Nước tẩy rửa', sku: 'VT-002', currentStock: 15, minStock: 8, unit: 'chai', categoryId: catVatTu.id },
      { name: 'Túi rác', sku: 'VT-003', currentStock: 500, minStock: 200, unit: 'cái', categoryId: catVatTu.id },
      { name: 'Khăn lau', sku: 'VT-004', currentStock: 50, minStock: 20, unit: 'cái', categoryId: catVatTu.id },
      { name: 'Găng tay cao su', sku: 'VT-005', currentStock: 8, minStock: 10, unit: 'đôi', categoryId: catVatTu.id },
    ],
  })

  // Tasks
  await prisma.task.createMany({
    data: [
      { title: 'Dọn phòng 201', description: 'Thay ga, khăn, bổ sung đồ vệ sinh', priority: 'HIGH', status: 'PENDING', roomNumber: '201', assignedToId: staff.id, dueDate: new Date() },
      { title: 'Kiểm tra điều hòa phòng 305', description: 'Khách phản ánh điều hòa không mát', priority: 'URGENT', status: 'IN_PROGRESS', roomNumber: '305', assignedToId: staff.id, dueDate: new Date() },
      { title: 'Bổ sung minibar tầng 4', description: 'Nước suối và nước ngọt tầng 4 đã hết', priority: 'MEDIUM', status: 'PENDING', roomNumber: '401', assignedToId: staff.id },
      { title: 'Sửa vòi nước phòng 502', description: 'Vòi nước bị rỉ, cần thay mới', priority: 'HIGH', status: 'PENDING', roomNumber: '502', assignedToId: staff.id, dueDate: new Date(now.getTime() + 86400000) },
      { title: 'Vệ sinh khu vực sảnh', description: 'Lau sàn, lau bàn, sắp xếp ghế', priority: 'LOW', status: 'COMPLETED', assignedToId: staff.id },
    ],
  })

  // Shifts
  await prisma.shift.createMany({
    data: [
      { userId: staff.id, date: new Date(), shiftType: 'MORNING', startTime: '06:00', endTime: '14:00' },
      { userId: manager.id, date: new Date(), shiftType: 'MORNING', startTime: '08:00', endTime: '17:00' },
      { userId: staff.id, date: new Date(now.getTime() + 86400000), shiftType: 'AFTERNOON', startTime: '14:00', endTime: '22:00' },
      { userId: staff.id, date: new Date(now.getTime() + 2 * 86400000), shiftType: 'MORNING', startTime: '06:00', endTime: '14:00' },
    ],
  })

  // Promotions
  await prisma.promotion.createMany({
    data: [
      {
        title: 'Giảm 10% cho khách lần đầu',
        description: 'Sử dụng mã CHAODON khi đặt phòng trực tiếp để nhận giảm giá 10% cho lần đầu lưu trú.',
        badgeText: 'Mới',
        isActive: true,
        validFrom: new Date('2026-01-01'),
        validTo: new Date('2026-12-31'),
      },
      {
        title: 'Ưu đãi mùa hè 2026',
        description: 'Giảm 15% cho đặt phòng từ 2 đêm trở lên trong tháng 6-8. Dùng mã MUAHE2026.',
        badgeText: 'HOT',
        isActive: true,
        validFrom: new Date('2026-06-01'),
        validTo: new Date('2026-08-31'),
      },
      {
        title: 'Đặt trực tiếp tiết kiệm hơn',
        description: 'Đặt phòng trực tiếp trên website, tiết kiệm 200.000đ so với các trang đặt phòng khác. Dùng mã TRUCTUYẾN.',
        badgeText: 'Tiết kiệm',
        isActive: true,
        validFrom: new Date('2026-01-01'),
        validTo: new Date('2026-12-31'),
      },
    ],
  })

  // Attractions
  await prisma.attraction.createMany({
    data: [
      {
        name: 'Quần thể danh thắng Tràng An',
        description: 'Di sản thế giới UNESCO, nổi tiếng với hệ thống hang động và cảnh quan núi non hùng vĩ. Du khách được ngồi thuyền len lỏi qua các hang động tự nhiên và chiêm ngưỡng vẻ đẹp thiên nhiên hoang sơ.',
        category: 'NATURE',
        distance: '15 phút lái xe',
        mapUrl: 'https://maps.google.com/?q=Trang+An+Ninh+Binh',
      },
      {
        name: 'Chùa Bái Đính',
        description: 'Ngôi chùa lớn nhất Đông Nam Á với kiến trúc hoành tráng, nhiều kỷ lục Việt Nam và châu Á. Khu chùa mới và cũ trải dài trên diện tích rộng lớn giữa núi rừng.',
        category: 'CULTURE',
        distance: '20 phút lái xe',
        mapUrl: 'https://maps.google.com/?q=Bai+Dinh+Pagoda+Ninh+Binh',
      },
      {
        name: 'Phố Cổ Hoa Lư',
        description: 'Cố đô đầu tiên của Việt Nam, nơi lưu giữ nhiều di tích lịch sử và văn hóa quý giá từ thời Đinh - Lê. Khám phá đền vua Đinh, đền vua Lê và không gian cổ kính.',
        category: 'CULTURE',
        distance: '10 phút lái xe',
        mapUrl: 'https://maps.google.com/?q=Hoa+Lu+Ancient+Capital+Ninh+Binh',
      },
    ],
  })

  // Hotel Settings
  await prisma.hotelSettings.create({
    data: {
      id: 'main',
      name: 'Khách Sạn Ninh Bình',
      address: 'Ninh Bình, Việt Nam',
      phone: '0834 367 026',
      email: 'info@ksninhbinh.vn',
      description: 'Khách sạn hiện đại giữa lòng di sản thiên nhiên Ninh Bình, gần Tràng An, Bái Đính và Phố Cổ Hoa Lư.',
      story: 'Khách Sạn Ninh Bình được thành lập với mong muốn mang đến cho du khách một nơi nghỉ dưỡng thoải mái, tiện nghi ngay giữa vùng đất di sản. Chúng tôi tự hào là điểm dừng chân lý tưởng để khám phá vẻ đẹp thiên nhiên và văn hóa của Ninh Bình. Với cam kết về chất lượng dịch vụ và sự thân thiện, chúng tôi luôn nỗ lực để mỗi khách hàng đều có trải nghiệm đáng nhớ.',
    },
  })

  console.log('Tạo dữ liệu mẫu thành công!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
