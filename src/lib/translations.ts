export type Locale = 'vi' | 'en'

export const translations: Record<Locale, Record<string, string>> = {
  vi: {
    // Navigation
    'nav.home': 'Trang chủ',
    'nav.rooms': 'Phòng & Giá',
    'nav.booking': 'Đặt phòng',
    'nav.amenities': 'Tiện ích',
    'nav.reviews': 'Đánh giá',
    'nav.offers': 'Ưu đãi',
    'nav.area': 'Khu vực',
    'nav.about': 'Về chúng tôi',
    'nav.contact': 'Liên hệ',
    'nav.bookNow': 'Đặt phòng ngay',

    // Hero
    'hero.tagline': 'Nghỉ dưỡng giữa lòng di sản',
    'hero.bookNow': 'Đặt phòng ngay',
    'hero.viewRooms': 'Xem phòng & giá',

    // Homepage sections
    'home.rooms.title': 'Phòng nghỉ của chúng tôi',
    'home.rooms.desc': 'Lựa chọn phòng phù hợp với nhu cầu của bạn, từ phòng đơn ấm cúng đến phòng family rộng rãi cho cả gia đình.',
    'home.rooms.viewDetail': 'Xem chi tiết',
    'home.rooms.perNight': '/ đêm',
    'home.amenities.title': 'Tiện ích & Dịch vụ',
    'home.amenities.desc': 'Mọi thứ bạn cần cho kỳ nghỉ hoàn hảo',
    'home.amenities.viewAll': 'Xem tất cả tiện ích',
    'home.reviews.title': 'Khách hàng nói gì',
    'home.reviews.viewAll': 'Xem tất cả đánh giá',
    'home.offers.title': 'Ưu đãi đặc biệt',
    'home.offers.desc': 'Đặt phòng trực tiếp để nhận giá tốt nhất',
    'home.offers.bookNow': 'Đặt ngay',
    'home.cta.title': 'Sẵn sàng cho kỳ nghỉ tuyệt vời?',
    'home.cta.desc': 'Đặt phòng trực tiếp với chúng tôi để nhận giá tốt nhất và nhiều ưu đãi hấp dẫn.',

    // Amenities
    'amenity.wifi': 'WiFi miễn phí',
    'amenity.wifi.desc': 'Tốc độ cao toàn khu vực',
    'amenity.parking': 'Bãi đỗ xe',
    'amenity.parking.desc': 'Miễn phí cho khách lưu trú',
    'amenity.restaurant': 'Nhà hàng',
    'amenity.restaurant.desc': 'Ẩm thực địa phương',
    'amenity.relax': 'Khu vực thư giãn',
    'amenity.relax.desc': 'Không gian yên tĩnh',

    // Booking
    'booking.title': 'Đặt phòng',
    'booking.subtitle': 'Chọn ngày và tìm phòng trống',
    'booking.checkIn': 'Ngày nhận phòng',
    'booking.checkOut': 'Ngày trả phòng',
    'booking.guests': 'Số khách',
    'booking.search': 'Tìm phòng',
    'booking.searching': 'Đang tìm...',
    'booking.noResults': 'Không tìm thấy phòng trống cho ngày đã chọn.',
    'booking.tryOther': 'Vui lòng thử ngày khác hoặc liên hệ trực tiếp.',
    'booking.found': 'Tìm thấy',
    'booking.available': 'phòng trống',
    'booking.for': 'cho',
    'booking.nights': 'đêm',
    'booking.room': 'Phòng',
    'booking.floor': 'Tầng',
    'booking.remaining': 'phòng trống — chọn phòng để tiếp tục',
    'booking.total': 'Tổng',
    'booking.maxGuests': 'Tối đa',
    'booking.guestsUnit': 'khách',

    // Booking confirm
    'confirm.title': 'Xác nhận đặt phòng',
    'confirm.guestInfo': 'Thông tin khách hàng',
    'confirm.fullName': 'Họ tên',
    'confirm.phone': 'Số điện thoại',
    'confirm.email': 'Email',
    'confirm.idNumber': 'CMND/CCCD',
    'confirm.nationality': 'Quốc tịch',
    'confirm.specialRequests': 'Yêu cầu đặc biệt',
    'confirm.discountCode': 'Mã giảm giá',
    'confirm.apply': 'Áp dụng',
    'confirm.bookingInfo': 'Thông tin đặt phòng',
    'confirm.roomType': 'Loại phòng',
    'confirm.numNights': 'Số đêm',
    'confirm.pricePerNight': 'Giá phòng',
    'confirm.discount': 'Giảm giá',
    'confirm.totalPrice': 'Tổng cộng',
    'confirm.submit': 'Xác nhận đặt phòng',
    'confirm.processing': 'Đang xử lý...',

    // Success
    'success.title': 'Đặt phòng thành công!',
    'success.desc': 'Cảm ơn bạn đã đặt phòng. Chúng tôi sẽ xác nhận sớm nhất.',
    'success.code': 'Mã đặt phòng của bạn',
    'success.saveCode': 'Vui lòng lưu mã này để tra cứu thông tin đặt phòng.',
    'success.home': 'Về trang chủ',
    'success.contact': 'Liên hệ',

    // Contact
    'contact.title': 'Liên hệ',
    'contact.desc': 'Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ để được tư vấn và đặt phòng.',
    'contact.address': 'Địa chỉ',
    'contact.phone': 'Điện thoại',
    'contact.email': 'Email',
    'contact.sendMessage': 'Gửi tin nhắn',
    'contact.name': 'Họ tên',
    'contact.subject': 'Tiêu đề',
    'contact.message': 'Nội dung',
    'contact.send': 'Gửi tin nhắn',
    'contact.sending': 'Đang gửi...',
    'contact.hours': 'Giờ làm việc',

    // Reviews
    'reviews.title': 'Đánh giá của khách',
    'reviews.writeReview': 'Viết đánh giá',
    'reviews.yourName': 'Họ tên',
    'reviews.rating': 'Đánh giá',
    'reviews.comment': 'Nhận xét (tùy chọn)',
    'reviews.submit': 'Gửi đánh giá',
    'reviews.submitting': 'Đang gửi...',
    'reviews.noReviews': 'Chưa có đánh giá nào.',
    'reviews.reviews': 'đánh giá',
    'reviews.thanks': 'Cảm ơn bạn đã đánh giá!',
    'reviews.error': 'Có lỗi xảy ra, vui lòng thử lại.',

    // Rooms page
    'rooms.title': 'Phòng & Giá',
    'rooms.desc': 'Chọn loại phòng phù hợp với nhu cầu của bạn. Tất cả phòng đều được trang bị đầy đủ tiện nghi hiện đại.',
    'rooms.maxGuests': 'Tối đa',
    'rooms.guests': 'khách',
    'rooms.detail': 'Chi tiết',
    'rooms.bookRoom': 'Đặt phòng',
    'rooms.perNight': '/ đêm',
    'rooms.amenities': 'Tiện nghi phòng',
    'rooms.backToList': '← Quay lại danh sách phòng',
    'rooms.bookNow': 'Đặt phòng ngay',
    'rooms.bookDirect': 'Đặt trực tiếp để nhận giá tốt nhất',

    // Amenities page
    'amenities.title': 'Tiện ích & Dịch vụ',
    'amenities.desc': 'Mọi thứ bạn cần cho kỳ nghỉ hoàn hảo tại Ninh Bình đều có tại khách sạn của chúng tôi.',
    'amenities.cat.SERVICES': 'Dịch vụ',
    'amenities.cat.DINING': 'Ẩm thực',
    'amenities.cat.RECREATION': 'Giải trí & Thư giãn',
    'amenities.cat.WELLNESS': 'Sức khỏe',

    // About page
    'about.title': 'Về chúng tôi',
    'about.story': 'Câu chuyện của chúng tôi',
    'about.values': 'Giá trị cốt lõi',
    'about.sustainability': 'Cam kết bền vững',
    'about.val1.title': 'Chất lượng dịch vụ',
    'about.val1.desc': 'Chúng tôi luôn đặt sự hài lòng của khách hàng lên hàng đầu, với đội ngũ nhân viên tận tâm và chuyên nghiệp.',
    'about.val2.title': 'Bền vững & Thân thiện',
    'about.val2.desc': 'Cam kết bảo vệ môi trường và phát triển bền vững, góp phần gìn giữ vẻ đẹp thiên nhiên Ninh Bình cho thế hệ sau.',
    'about.val3.title': 'Trải nghiệm văn hóa',
    'about.val3.desc': 'Kết nối du khách với văn hóa và con người Ninh Bình, tạo nên những kỷ niệm đáng nhớ trong mỗi chuyến đi.',

    // Offers page
    'offers.title': 'Ưu đãi đặc biệt',
    'offers.desc': 'Đặt phòng trực tiếp với chúng tôi để nhận nhiều ưu đãi hấp dẫn. Giá tốt nhất, đảm bảo!',
    'offers.promotions': 'Chương trình khuyến mãi',
    'offers.discountCodes': 'Mã giảm giá',
    'offers.bookNow': 'Đặt ngay',
    'offers.until': 'Đến',
    'offers.minNights': 'Tối thiểu',
    'offers.nightsUnit': 'đêm',
    'offers.whyDirect': 'Tại sao đặt trực tiếp?',
    'offers.bestPrice': 'Giá tốt nhất',
    'offers.bestPrice.desc': 'Đảm bảo giá thấp hơn các trang đặt phòng khác',
    'offers.exclusive': 'Ưu đãi riêng',
    'offers.exclusive.desc': 'Mã giảm giá và quà tặng chỉ dành cho đặt trực tiếp',
    'offers.support': 'Hỗ trợ nhanh',
    'offers.support.desc': 'Liên hệ trực tiếp, thay đổi linh hoạt, hủy miễn phí',

    // Area page
    'area.title': 'Khu vực lân cận',
    'area.desc': 'Ninh Bình - vùng đất di sản với nhiều danh thắng nổi tiếng. Khám phá những điểm đến tuyệt vời ngay gần khách sạn.',
    'area.cat.NATURE': 'Thiên nhiên',
    'area.cat.CULTURE': 'Văn hóa & Lịch sử',
    'area.cat.FOOD': 'Ẩm thực',
    'area.cat.ACTIVITY': 'Hoạt động',
    'area.viewMap': 'Xem bản đồ',

    // Contact page extras
    'contact.reception': 'Lễ tân: 24/7',
    'contact.receptionDesc': 'Luôn sẵn sàng phục vụ bạn',
    'contact.restaurant': 'Nhà hàng: 06:00 - 22:00',
    'contact.breakfast': 'Bữa sáng: 06:00 - 09:30',
    'contact.success': 'Tin nhắn đã được gửi thành công! Chúng tôi sẽ phản hồi sớm nhất.',

    // About sustainability items
    'about.sus1': 'Sử dụng năng lượng tái tạo và thiết bị tiết kiệm điện',
    'about.sus2': 'Giảm thiểu rác thải nhựa, khuyến khích khách sử dụng vật liệu tái chế',
    'about.sus3': 'Ưu tiên sử dụng thực phẩm địa phương, hỗ trợ nông dân vùng Ninh Bình',
    'about.sus4': 'Tham gia các hoạt động bảo tồn thiên nhiên và di sản văn hóa địa phương',

    // Contact form labels
    'contact.namePlaceholder': 'Nhập họ tên',
    'contact.emailPlaceholder': 'Nhập email',
    'contact.phonePlaceholder': 'Nhập số điện thoại',
    'contact.subjectPlaceholder': 'Tiêu đề tin nhắn',
    'contact.messagePlaceholder': 'Nhập nội dung tin nhắn...',

    // 404
    'notfound.title': 'Trang không tồn tại',
    'notfound.desc': 'Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.',
    'notfound.home': 'Về trang chủ',

    // Footer
    'footer.quickLinks': 'Liên kết nhanh',
    'footer.explore': 'Khám phá',
    'footer.rights': 'Tất cả quyền được bảo lưu.',

    // Language
    'lang.choose': 'Ngôn ngữ',
    'lang.vi': 'Tiếng Việt',
    'lang.en': 'English',

    // Topbar / chrome
    'ui.languages': 'Ngôn ngữ',
    'ui.ourSocial': 'Mạng xã hội',
    'ui.ourRooms': 'Phòng nghỉ',
    'ui.contactUs': 'Liên hệ',
    'ui.address': 'Địa chỉ',
    'ui.tel': 'Điện thoại',
    'ui.hotelSub': 'Khách sạn',

    // Hero
    'hero.roomsSuites': 'Phòng & Hạng phòng',

    // Booking widget
    'widget.searchRooms': 'Tìm phòng',
    'widget.startBooking': 'Bắt đầu đặt phòng',
    'widget.guest': 'Khách',
    'widget.checkAvailability': 'Kiểm tra phòng trống',
    'widget.holiday': 'Kỳ nghỉ',
    'widget.holidayDesc':
      'Nghỉ dưỡng giữa vùng đất di sản Ninh Bình. Phòng nghỉ tiện nghi, dịch vụ chu đáo, chỉ vài phút tới Tràng An và Bái Đính.',
    'widget.bestPrice': 'Giá tốt nhất',
    'widget.flashSale': 'Ưu đãi nhanh',
    'widget.perNightShort': 'mỗi đêm',

    // Section subtitles
    'home.rooms.subtitle': 'Hạng phòng',
    'home.amenities.subtitle': 'Trải nghiệm',
    'home.reviews.subtitle': 'Cảm nhận',
    'home.offers.subtitle': 'Ưu đãi',
    'rooms.subtitle': 'Bảng giá',
    'amenities.subtitle': 'Dịch vụ',
    'reviews.subtitle': 'Nhận xét',
    'offers.subtitle': 'Khuyến mãi',
    'area.subtitle': 'Khám phá',
    'about.subtitle': 'Câu chuyện',
    'contact.subtitle': 'Kết nối',

    // Room card meta
    'card.guests': 'khách',
    'card.from': 'Từ',

    // Common
    'common.loading': 'Đang tải...',
    'common.backToList': '← Quay lại',
    'common.viewAll': 'Xem tất cả',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.rooms': 'Rooms & Rates',
    'nav.booking': 'Book Now',
    'nav.amenities': 'Amenities',
    'nav.reviews': 'Reviews',
    'nav.offers': 'Offers',
    'nav.area': 'Local Area',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.bookNow': 'Book Now',

    // Hero
    'hero.tagline': 'Relaxation in the heart of heritage',
    'hero.bookNow': 'Book Now',
    'hero.viewRooms': 'View Rooms & Rates',

    // Homepage sections
    'home.rooms.title': 'Our Rooms',
    'home.rooms.desc': 'Choose the room that suits your needs, from cozy single rooms to spacious family rooms.',
    'home.rooms.viewDetail': 'View Details',
    'home.rooms.perNight': '/ night',
    'home.amenities.title': 'Amenities & Services',
    'home.amenities.desc': 'Everything you need for a perfect stay',
    'home.amenities.viewAll': 'View All Amenities',
    'home.reviews.title': 'What Our Guests Say',
    'home.reviews.viewAll': 'View All Reviews',
    'home.offers.title': 'Special Offers',
    'home.offers.desc': 'Book directly for the best rates',
    'home.offers.bookNow': 'Book Now',
    'home.cta.title': 'Ready for an amazing stay?',
    'home.cta.desc': 'Book directly with us for the best rates and exclusive offers.',

    // Amenities
    'amenity.wifi': 'Free WiFi',
    'amenity.wifi.desc': 'High speed throughout',
    'amenity.parking': 'Parking',
    'amenity.parking.desc': 'Free for guests',
    'amenity.restaurant': 'Restaurant',
    'amenity.restaurant.desc': 'Local cuisine',
    'amenity.relax': 'Relaxation Area',
    'amenity.relax.desc': 'Peaceful space',

    // Booking
    'booking.title': 'Book a Room',
    'booking.subtitle': 'Select dates and find available rooms',
    'booking.checkIn': 'Check-in Date',
    'booking.checkOut': 'Check-out Date',
    'booking.guests': 'Guests',
    'booking.search': 'Search Rooms',
    'booking.searching': 'Searching...',
    'booking.noResults': 'No rooms available for selected dates.',
    'booking.tryOther': 'Please try different dates or contact us directly.',
    'booking.found': 'Found',
    'booking.available': 'available rooms',
    'booking.for': 'for',
    'booking.nights': 'nights',
    'booking.room': 'Room',
    'booking.floor': 'Floor',
    'booking.remaining': 'rooms available — select a room to continue',
    'booking.total': 'Total',
    'booking.maxGuests': 'Max',
    'booking.guestsUnit': 'guests',

    // Booking confirm
    'confirm.title': 'Confirm Booking',
    'confirm.guestInfo': 'Guest Information',
    'confirm.fullName': 'Full Name',
    'confirm.phone': 'Phone Number',
    'confirm.email': 'Email',
    'confirm.idNumber': 'ID Number',
    'confirm.nationality': 'Nationality',
    'confirm.specialRequests': 'Special Requests',
    'confirm.discountCode': 'Discount Code',
    'confirm.apply': 'Apply',
    'confirm.bookingInfo': 'Booking Details',
    'confirm.roomType': 'Room Type',
    'confirm.numNights': 'Nights',
    'confirm.pricePerNight': 'Room Price',
    'confirm.discount': 'Discount',
    'confirm.totalPrice': 'Total',
    'confirm.submit': 'Confirm Booking',
    'confirm.processing': 'Processing...',

    // Success
    'success.title': 'Booking Successful!',
    'success.desc': 'Thank you for your booking. We will confirm shortly.',
    'success.code': 'Your Booking Code',
    'success.saveCode': 'Please save this code to check your booking details.',
    'success.home': 'Back to Home',
    'success.contact': 'Contact Us',

    // Contact
    'contact.title': 'Contact Us',
    'contact.desc': 'We are always ready to help. Contact us for inquiries and reservations.',
    'contact.address': 'Address',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.sendMessage': 'Send a Message',
    'contact.name': 'Full Name',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.hours': 'Working Hours',

    // Reviews
    'reviews.title': 'Guest Reviews',
    'reviews.writeReview': 'Write a Review',
    'reviews.yourName': 'Your Name',
    'reviews.rating': 'Rating',
    'reviews.comment': 'Comment (optional)',
    'reviews.submit': 'Submit Review',
    'reviews.submitting': 'Submitting...',
    'reviews.noReviews': 'No reviews yet.',
    'reviews.reviews': 'reviews',
    'reviews.thanks': 'Thank you for your review!',
    'reviews.error': 'Something went wrong, please try again.',

    // Rooms page
    'rooms.title': 'Rooms & Rates',
    'rooms.desc': 'Choose the room that suits your needs. All rooms are fully equipped with modern amenities.',
    'rooms.maxGuests': 'Max',
    'rooms.guests': 'guests',
    'rooms.detail': 'Details',
    'rooms.bookRoom': 'Book Room',
    'rooms.perNight': '/ night',
    'rooms.amenities': 'Room Amenities',
    'rooms.backToList': '← Back to room list',
    'rooms.bookNow': 'Book Now',
    'rooms.bookDirect': 'Book directly for the best rate',

    // Amenities page
    'amenities.title': 'Amenities & Services',
    'amenities.desc': 'Everything you need for a perfect stay in Ninh Binh is available at our hotel.',
    'amenities.cat.SERVICES': 'Services',
    'amenities.cat.DINING': 'Dining',
    'amenities.cat.RECREATION': 'Recreation & Relaxation',
    'amenities.cat.WELLNESS': 'Wellness',

    // About page
    'about.title': 'About Us',
    'about.story': 'Our Story',
    'about.values': 'Core Values',
    'about.sustainability': 'Sustainability Commitment',
    'about.val1.title': 'Service Quality',
    'about.val1.desc': 'We always put customer satisfaction first, with a dedicated and professional team.',
    'about.val2.title': 'Sustainable & Friendly',
    'about.val2.desc': 'Committed to environmental protection and sustainable development, preserving the beauty of Ninh Binh.',
    'about.val3.title': 'Cultural Experience',
    'about.val3.desc': 'Connecting visitors with the culture and people of Ninh Binh, creating memorable experiences.',

    // Offers page
    'offers.title': 'Special Offers',
    'offers.desc': 'Book directly with us for the best deals. Best price guaranteed!',
    'offers.promotions': 'Promotions',
    'offers.discountCodes': 'Discount Codes',
    'offers.bookNow': 'Book Now',
    'offers.until': 'Until',
    'offers.minNights': 'Minimum',
    'offers.nightsUnit': 'nights',
    'offers.whyDirect': 'Why Book Direct?',
    'offers.bestPrice': 'Best Price',
    'offers.bestPrice.desc': 'Guaranteed lower than other booking sites',
    'offers.exclusive': 'Exclusive Offers',
    'offers.exclusive.desc': 'Discount codes and gifts only for direct bookings',
    'offers.support': 'Fast Support',
    'offers.support.desc': 'Direct contact, flexible changes, free cancellation',

    // Area page
    'area.title': 'Local Area Guide',
    'area.desc': 'Ninh Binh — a heritage land with famous scenic spots. Discover amazing destinations near our hotel.',
    'area.cat.NATURE': 'Nature',
    'area.cat.CULTURE': 'Culture & History',
    'area.cat.FOOD': 'Food & Dining',
    'area.cat.ACTIVITY': 'Activities',
    'area.viewMap': 'View Map',

    // Contact page extras
    'contact.reception': 'Reception: 24/7',
    'contact.receptionDesc': 'Always ready to serve you',
    'contact.restaurant': 'Restaurant: 06:00 - 22:00',
    'contact.breakfast': 'Breakfast: 06:00 - 09:30',
    'contact.success': 'Message sent successfully! We will respond soon.',

    // About sustainability items
    'about.sus1': 'Using renewable energy and energy-efficient equipment',
    'about.sus2': 'Reducing plastic waste, encouraging guests to use recyclable materials',
    'about.sus3': 'Prioritizing local food sources, supporting Ninh Binh farmers',
    'about.sus4': 'Participating in nature conservation and local cultural heritage activities',

    // Contact form labels
    'contact.namePlaceholder': 'Enter your name',
    'contact.emailPlaceholder': 'Enter email',
    'contact.phonePlaceholder': 'Enter phone number',
    'contact.subjectPlaceholder': 'Message subject',
    'contact.messagePlaceholder': 'Enter your message...',

    // 404
    'notfound.title': 'Page Not Found',
    'notfound.desc': 'Sorry, the page you are looking for does not exist or has been moved.',
    'notfound.home': 'Back to Home',

    // Footer
    'footer.quickLinks': 'Quick Links',
    'footer.explore': 'Explore',
    'footer.rights': 'All rights reserved.',

    // Language
    'lang.choose': 'Language',
    'lang.vi': 'Tiếng Việt',
    'lang.en': 'English',

    // Topbar / chrome
    'ui.languages': 'Languages',
    'ui.ourSocial': 'Our Social',
    'ui.ourRooms': 'Our Rooms',
    'ui.contactUs': 'Contact Us',
    'ui.address': 'Address',
    'ui.tel': 'Tel',
    'ui.hotelSub': 'Hotel',

    // Hero
    'hero.roomsSuites': 'Rooms & Suites',

    // Booking widget
    'widget.searchRooms': 'Search Rooms',
    'widget.startBooking': 'Start Booking',
    'widget.guest': 'Guest',
    'widget.checkAvailability': 'Check Availability',
    'widget.holiday': 'Holiday',
    'widget.holidayDesc':
      'A retreat in the heart of Ninh Binh heritage land. Comfortable rooms, attentive service, minutes from Trang An and Bai Dinh.',
    'widget.bestPrice': 'Best Season Price',
    'widget.flashSale': 'Flash Sale',
    'widget.perNightShort': 'per night',

    // Section subtitles
    'home.rooms.subtitle': 'Room Types',
    'home.amenities.subtitle': 'Experience',
    'home.reviews.subtitle': 'Testimonials',
    'home.offers.subtitle': 'Promotions',
    'rooms.subtitle': 'Rates',
    'amenities.subtitle': 'Services',
    'reviews.subtitle': 'Testimonials',
    'offers.subtitle': 'Promotions',
    'area.subtitle': 'Discover',
    'about.subtitle': 'Our Story',
    'contact.subtitle': 'Get In Touch',

    // Room card meta
    'card.guests': 'guests',
    'card.from': 'From',

    // Common
    'common.loading': 'Loading...',
    'common.backToList': '← Back',
    'common.viewAll': 'View All',
  },
}
