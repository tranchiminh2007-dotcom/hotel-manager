# Khách Sạn Ninh Bình - Hệ Thống Quản Lý Khách Sạn

Hệ thống quản lý khách sạn đầy đủ tính năng, bao gồm website đặt phòng cho khách hàng và bảng điều khiển quản trị cho nhân viên/quản lý.

## Công nghệ sử dụng

- **Next.js 16** (App Router, Server Components)
- **TypeScript**
- **Tailwind CSS**
- **SQLite** + Prisma ORM
- **NextAuth.js** (xác thực)
- **Font Be Vietnam Pro** (hỗ trợ đầy đủ tiếng Việt có dấu)

## Tính năng

### Website công khai (cho khách hàng)
- Trang chủ với hero banner, phòng nổi bật, đánh giá
- Danh sách phòng & giá (Phòng Đơn 750K, Phòng Family 1.050K)
- Hệ thống đặt phòng trực tuyến (tìm phòng trống → chọn phòng → xác nhận)
- Mã giảm giá khi đặt phòng trực tiếp
- Đánh giá 1-5 sao từ khách hàng
- Tiện ích & dịch vụ khách sạn
- Ưu đãi đặc biệt & khuyến mãi
- Hướng dẫn khu vực lân cận (Tràng An, Bái Đính, Phố Cổ Hoa Lư)
- Trang liên hệ với bản đồ
- Về chúng tôi & cam kết bền vững
- Tối ưu hóa cho thiết bị di động

### Bảng điều khiển quản trị
- Đăng nhập với phân quyền (Quản lý / Nhân viên)
- Bảng điều khiển tổng quan (thống kê, biểu đồ, cảnh báo)
- Quản lý đặt phòng (xem, xác nhận, nhận phòng, trả phòng, hủy)
- Quản lý phòng (23 phòng, tầng 2-6, trạng thái phòng)
- Quản lý kho hàng (4 danh mục, cảnh báo tồn kho thấp, nhập/xuất kho)
- Quản lý công việc nhân viên (kanban, phân công, trạng thái)
- Quản lý đánh giá (xem, xóa)
- Khuyến mãi & mã giảm giá
- Báo cáo (doanh thu, công suất, tồn kho)

## Cài đặt

### Yêu cầu
- Node.js 18+
- npm

### Các bước

```bash
# 1. Clone dự án
git clone https://github.com/YOUR_USERNAME/hotel-manager.git
cd hotel-manager

# 2. Cài đặt thư viện
npm install

# 3. Tạo file .env
cp .env.example .env
# Chỉnh sửa AUTH_SECRET trong file .env

# 4. Tạo cơ sở dữ liệu và dữ liệu mẫu
npx prisma generate
npx prisma migrate dev
npx prisma db seed

# 5. Chạy ứng dụng
npm run dev
```

Truy cập http://localhost:3000

### Tài khoản demo

| Vai trò | Email | Mật khẩu |
|---------|-------|-----------|
| Quản lý | admin@hotel.com | 123456 |
| Nhân viên | nhanvien@hotel.com | 123456 |

## Cấu trúc dự án

```
hotel-manager/
├── prisma/          # Schema & migrations
├── public/          # Hình ảnh tĩnh
├── src/
│   ├── app/
│   │   ├── (public)/    # Các trang công khai
│   │   ├── admin/       # Bảng điều khiển quản trị
│   │   └── api/         # API endpoints
│   ├── components/      # React components
│   ├── lib/             # Utilities, constants, validators
│   └── types/           # TypeScript types
├── .env.example
└── package.json
```

## Scripts

```bash
npm run dev       # Chạy development server
npm run build     # Build production
npm run start     # Chạy production server
npm run db:seed   # Tạo dữ liệu mẫu
npm run db:studio # Mở Prisma Studio (xem database)
```
