const dataMap: Record<string, string> = {
  // Room types
  'Phòng Đơn': 'Single Room',
  'Phòng Family': 'Family Room',

  // Room descriptions
  'Phòng đơn ấm cúng, thiết kế hiện đại với đầy đủ tiện nghi cho khách du lịch cá nhân hoặc cặp đôi. Phòng được trang bị giường đôi êm ái, điều hòa, tivi màn hình phẳng, minibar và phòng tắm riêng với vòi sen nước nóng. Cửa sổ hướng ra khung cảnh thiên nhiên Ninh Bình tươi đẹp.':
    'A cozy single room with modern design and full amenities for individual travelers or couples. The room features a comfortable double bed, air conditioning, flat-screen TV, minibar, and private bathroom with hot shower. Windows overlook the beautiful Ninh Binh natural scenery.',
  'Phòng rộng rãi dành cho gia đình, với không gian thoáng đãng và đầy đủ tiện nghi cho cả nhà. Phòng có 2 giường lớn, khu vực sinh hoạt riêng biệt, điều hòa, tivi màn hình lớn, minibar, phòng tắm rộng với bồn tắm và vòi sen. Lý tưởng cho gia đình có trẻ nhỏ muốn tận hưởng kỳ nghỉ bên nhau.':
    'A spacious family room with open living space and full amenities for the whole family. Features 2 large beds, separate living area, air conditioning, large flat-screen TV, minibar, and a wide bathroom with bathtub and shower. Ideal for families with children wanting to enjoy a vacation together.',

  // Bed types
  'Giường đôi': 'Double Bed',
  '2 giường đôi': '2 Double Beds',

  // Room amenities
  'WiFi miễn phí': 'Free WiFi',
  'Điều hòa': 'Air Conditioning',
  'Tivi màn hình phẳng': 'Flat-screen TV',
  'Tivi màn hình lớn': 'Large Flat-screen TV',
  'Minibar': 'Minibar',
  'Phòng tắm riêng': 'Private Bathroom',
  'Phòng tắm rộng': 'Spacious Bathroom',
  'Vòi sen nước nóng': 'Hot Shower',
  'Bồn tắm & vòi sen': 'Bathtub & Shower',
  'Khăn tắm': 'Towels',
  'Đồ vệ sinh cá nhân': 'Toiletries',
  'Bàn làm việc': 'Work Desk',
  'Tủ quần áo': 'Wardrobe',

  // Hotel amenities
  'Bãi đỗ xe': 'Parking',
  'Nhà hàng': 'Restaurant',
  'Quán cà phê': 'Coffee Shop',
  'Lễ tân 24/7': '24/7 Reception',
  'Dịch vụ giặt ủi': 'Laundry Service',
  'Cho thuê xe': 'Vehicle Rental',
  'Khu vực thư giãn': 'Relaxation Area',

  // Amenity descriptions
  'Kết nối Internet tốc độ cao miễn phí tại tất cả các khu vực trong khách sạn.': 'Free high-speed Internet access throughout the entire hotel.',
  'Bãi đỗ xe rộng rãi, miễn phí cho khách lưu trú. Có bảo vệ 24/7.': 'Spacious parking, free for hotel guests. 24/7 security.',
  'Nhà hàng phục vụ các món ăn đặc sản Ninh Bình và ẩm thực Việt Nam. Bữa sáng buffet hàng ngày.': 'Restaurant serving Ninh Binh specialties and Vietnamese cuisine. Daily breakfast buffet.',
  'Quán cà phê với view đẹp, phục vụ đồ uống và bánh ngọt cả ngày.': 'Coffee shop with beautiful views, serving drinks and pastries all day.',
  'Dịch vụ lễ tân hoạt động 24/7, hỗ trợ khách hàng mọi lúc.': '24/7 reception service, always ready to assist guests.',
  'Dịch vụ giặt ủi nhanh trong ngày với giá ưu đãi cho khách lưu trú.': 'Same-day laundry service at special rates for hotel guests.',
  'Dịch vụ cho thuê xe máy và ô tô để khám phá Ninh Bình và vùng lân cận.': 'Motorbike and car rental service to explore Ninh Binh and surrounding areas.',
  'Khu vườn và sân thượng yên tĩnh để thư giãn sau một ngày khám phá.': 'Quiet garden and rooftop terrace for relaxation after a day of exploration.',

  // Attractions
  'Quần thể danh thắng Tràng An': 'Trang An Scenic Landscape Complex',
  'Di sản thế giới UNESCO, nổi tiếng với hệ thống hang động và cảnh quan núi non hùng vĩ. Du khách được ngồi thuyền len lỏi qua các hang động tự nhiên và chiêm ngưỡng vẻ đẹp thiên nhiên hoang sơ.':
    'UNESCO World Heritage Site, famous for its cave system and majestic mountain landscape. Visitors take boat rides through natural caves and admire the pristine natural beauty.',
  'Chùa Bái Đính': 'Bai Dinh Pagoda',
  'Ngôi chùa lớn nhất Đông Nam Á với kiến trúc hoành tráng, nhiều kỷ lục Việt Nam và châu Á. Khu chùa mới và cũ trải dài trên diện tích rộng lớn giữa núi rừng.':
    'The largest pagoda in Southeast Asia with grand architecture, holding many Vietnam and Asian records. The old and new pagoda areas span a vast area amid mountains and forests.',
  'Phố Cổ Hoa Lư': 'Hoa Lu Ancient Capital',
  'Cố đô đầu tiên của Việt Nam, nơi lưu giữ nhiều di tích lịch sử và văn hóa quý giá từ thời Đinh - Lê. Khám phá đền vua Đinh, đền vua Lê và không gian cổ kính.':
    'The first ancient capital of Vietnam, preserving many precious historical and cultural relics from the Dinh - Le dynasties. Explore King Dinh Temple, King Le Temple, and the ancient atmosphere.',
  '15 phút lái xe': '15 min drive',
  '20 phút lái xe': '20 min drive',
  '10 phút lái xe': '10 min drive',

  // Promotions
  'Giảm 10% cho khách lần đầu': '10% Off for First-time Guests',
  'Sử dụng mã CHAODON khi đặt phòng trực tiếp để nhận giảm giá 10% cho lần đầu lưu trú.':
    'Use code CHAODON when booking directly to get 10% off your first stay.',
  'Ưu đãi mùa hè 2026': 'Summer 2026 Offer',
  'Giảm 15% cho đặt phòng từ 2 đêm trở lên trong tháng 6-8. Dùng mã MUAHE2026.':
    '15% off for bookings of 2+ nights during June-August. Use code MUAHE2026.',
  'Đặt trực tiếp tiết kiệm hơn': 'Save More Booking Direct',
  'Đặt phòng trực tiếp trên website, tiết kiệm 200.000đ so với các trang đặt phòng khác. Dùng mã TRUCTUYẾN.':
    'Book directly on our website, save 200,000 VND compared to other booking sites. Use code TRUCTUYẾN.',
  'Mới': 'New',
  'HOT': 'HOT',
  'Tiết kiệm': 'Save',
  'Giảm': 'Off',

  // Discount display
  'Tối thiểu': 'Minimum',
  'đêm': 'nights',
  'Đến': 'Until',
}

export function translateData(text: string, locale: string): string {
  if (locale === 'vi') return text
  return dataMap[text] || text
}

export function translateDiscount(type: string, value: number, locale: string): string {
  if (locale === 'vi') {
    return type === 'PERCENTAGE' ? `Giảm ${value}%` : `Giảm ${value.toLocaleString('vi-VN')}đ`
  }
  return type === 'PERCENTAGE' ? `${value}% Off` : `${value.toLocaleString('vi-VN')} VND Off`
}
