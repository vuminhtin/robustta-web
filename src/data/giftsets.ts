// Gift Set data

export interface GiftSet {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  price: number;
  items: string[];
  occasion: string;
}

export const giftSets: GiftSet[] = [
  {
    id: 'set-le',
    slug: 'set-le',
    name: 'Set Quà — Lễ',
    tagline: 'Trang trọng & Ý nghĩa',
    description: 'Bộ quà tặng dành cho dịp lễ tết, tân gia, hay cảm ơn đối tác. Hộp quà sang trọng gồm đủ 3 dòng cà phê R, B, T — gửi gắm trọn vẹn câu chuyện RobustTA.',
    image: '/images/RobustTA-R.jpg',
    price: 890000,
    items: [
      'R — Rich (200g)',
      'B — Balanced (200g)',
      'T — Trust (200g)',
      'Phin inox RobustTA',
      'Hộp quà cao cấp',
      'Thiệp chúc mừng',
    ],
    occasion: 'Tết, Lễ, Tân gia',
  },
  {
    id: 'set-binh-an',
    slug: 'set-binh-an',
    name: 'Set Quà — Bình An',
    tagline: 'Tối giản & Tinh tế',
    description: 'Bộ quà đơn giản nhưng tinh tế — dành tặng bạn bè, đồng nghiệp, hay tự thưởng cho chính mình. Hạt rang mộc kèm phin, sẵn sàng thưởng thức.',
    image: '/images/RobustTA-B.jpg',
    price: 520000,
    items: [
      'B — Balanced (500g)',
      'Phin inox RobustTA',
      'Hộp quà craft',
    ],
    occasion: 'Sinh nhật, Cảm ơn',
  },
  {
    id: 'set-tri-an',
    slug: 'set-tri-an',
    name: 'Set Quà — Tri Ân',
    tagline: 'Sang trọng & Đẳng cấp',
    description: 'Bộ quà cao cấp nhất cho đối tác, khách hàng VIP, hoặc người thân đặc biệt. Đóng gói riêng, có thể in logo doanh nghiệp theo yêu cầu.',
    image: '/images/RobustTA-T.jpg',
    price: 1680000,
    items: [
      'R — Rich (500g)',
      'B — Balanced (500g)',
      'T — Trust (500g)',
      'Phin inox RobustTA cao cấp',
      'Ly sứ RobustTA',
      'Hộp gỗ khắc laser',
      'Thiệp chúc mừng cá nhân hóa',
    ],
    occasion: 'Doanh nghiệp, VIP, Đặc biệt',
  },
];

export function getGiftSetBySlug(slug: string): GiftSet | undefined {
  return giftSets.find(g => g.slug === slug);
}
