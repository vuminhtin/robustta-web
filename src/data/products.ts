// RobustTA — Product Data & Helpers

export interface TasteProfile {
  body: number;    // 1-10
  bitter: number;
  sweet: number;
  aroma: number;
}

export interface ProductVariant {
  weight: string;
  grind: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  letter: string;
  tagline: string;
  taglineEn: string;
  roastLevel: string;
  description: string;
  image: string;
  images: string[];     // gallery images
  color: string;        // accent color for the product
  taste: TasteProfile;
  variants: ProductVariant[];
  brewingTip: string;
}

export const WEIGHTS = ['200g', '500g', '1kg', '2kg'] as const;
export const GRINDS = ['Hạt nguyên', 'Xay phin', 'Xay espresso', 'Xay pour-over'] as const;

export const products: Product[] = [
  {
    id: 'r-rich',
    name: 'R — Rich',
    slug: 'r-rich',
    letter: 'R',
    tagline: 'Đậm Đà & Mạnh Mẽ',
    taglineEn: 'Rich — Medium Dark Roast',
    roastLevel: 'Medium Dark Roast',
    description: 'Dòng cà phê đậm đà, mạnh mẽ cho những ai yêu vị cà phê thuần túy. Rang medium-dark giữ trọn hương thơm đất đỏ bazan Lâm Đồng, hậu vị sô-cô-la đắng quyện cùng gỗ ấm. Thích hợp pha phin truyền thống hoặc espresso đậm vị.',
    image: '/images/RobustTA-R.jpg',
    images: ['/images/RobustTA-R.jpg', '/images/RobustTA-B.jpg', '/images/RobustTA-T.jpg'],
    color: '#E8834A',
    taste: { body: 9, bitter: 8, sweet: 4, aroma: 7 },
    variants: [
      // Hạt nguyên
      { weight: '200g', grind: 'Hạt nguyên', price: 128000 },
      { weight: '500g', grind: 'Hạt nguyên', price: 258000 },
      { weight: '1kg', grind: 'Hạt nguyên', price: 386000 },
      { weight: '2kg', grind: 'Hạt nguyên', price: 698000 },
      // Xay phin
      { weight: '200g', grind: 'Xay phin', price: 128000 },
      { weight: '500g', grind: 'Xay phin', price: 258000 },
      { weight: '1kg', grind: 'Xay phin', price: 386000 },
      { weight: '2kg', grind: 'Xay phin', price: 698000 },
      // Xay espresso
      { weight: '200g', grind: 'Xay espresso', price: 128000 },
      { weight: '500g', grind: 'Xay espresso', price: 258000 },
      { weight: '1kg', grind: 'Xay espresso', price: 386000 },
      { weight: '2kg', grind: 'Xay espresso', price: 698000 },
      // Xay pour-over
      { weight: '200g', grind: 'Xay pour-over', price: 128000 },
      { weight: '500g', grind: 'Xay pour-over', price: 258000 },
      { weight: '1kg', grind: 'Xay pour-over', price: 386000 },
      { weight: '2kg', grind: 'Xay pour-over', price: 698000 },
    ],
    brewingTip: 'Pha phin: 25g cà phê / 150ml nước 92°C. Chờ 30s nở, rồi nhỏ giọt 4-5 phút. Thêm đá hoặc sữa đặc tùy khẩu vị.',
  },
  {
    id: 'b-balanced',
    name: 'B — Balanced',
    slug: 'b-balanced',
    letter: 'B',
    tagline: 'Cân Bằng & Tinh Tế',
    taglineEn: 'Balanced — Medium Roast',
    roastLevel: 'Medium Roast',
    description: 'Dòng cà phê cân bằng hoàn hảo giữa đắng – chua – ngọt. Rang medium giữ lại vị chua nhẹ tự nhiên của Robusta cao nguyên, hậu vị mật ong và hạt dẻ. Lý tưởng cho pour-over hoặc cold brew.',
    image: '/images/RobustTA-B.jpg',
    images: ['/images/RobustTA-B.jpg', '/images/RobustTA-R.jpg', '/images/RobustTA-T.jpg'],
    color: '#2B4D40',
    taste: { body: 6, bitter: 5, sweet: 7, aroma: 8 },
    variants: [
      { weight: '200g', grind: 'Hạt nguyên', price: 138000 },
      { weight: '500g', grind: 'Hạt nguyên', price: 282000 },
      { weight: '1kg', grind: 'Hạt nguyên', price: 426000 },
      { weight: '2kg', grind: 'Hạt nguyên', price: 738000 },
      { weight: '200g', grind: 'Xay phin', price: 138000 },
      { weight: '500g', grind: 'Xay phin', price: 282000 },
      { weight: '1kg', grind: 'Xay phin', price: 426000 },
      { weight: '2kg', grind: 'Xay phin', price: 738000 },
      { weight: '200g', grind: 'Xay espresso', price: 138000 },
      { weight: '500g', grind: 'Xay espresso', price: 282000 },
      { weight: '1kg', grind: 'Xay espresso', price: 426000 },
      { weight: '2kg', grind: 'Xay espresso', price: 738000 },
      { weight: '200g', grind: 'Xay pour-over', price: 138000 },
      { weight: '500g', grind: 'Xay pour-over', price: 282000 },
      { weight: '1kg', grind: 'Xay pour-over', price: 426000 },
      { weight: '2kg', grind: 'Xay pour-over', price: 738000 },
    ],
    brewingTip: 'Pour-over: 15g cà phê / 250ml nước 90°C. Bloom 30s, rót chậm vòng xoắn ốc 2-3 phút. Thưởng thức đen để cảm nhận trọn vị.',
  },
  {
    id: 't-trust',
    name: 'T — Trust',
    slug: 't-trust',
    letter: 'T',
    tagline: 'Tin Cậy & Nguyên Bản',
    taglineEn: 'Trust — Medium Roast',
    roastLevel: 'Medium Roast',
    description: 'Dòng cà phê nguyên bản nhất — được chọn lọc từ những vườn cà phê gia đình tại Lâm Đồng. Medium roast giữ trọn hương trái cây chín, vị caramel nhẹ nhàng và hậu vị kéo dài. Dành cho người sành cà phê, muốn trải nghiệm Robusta đúng nghĩa.',
    image: '/images/RobustTA-T.jpg',
    images: ['/images/RobustTA-T.jpg', '/images/RobustTA-B.jpg', '/images/RobustTA-R.jpg'],
    color: '#58413A',
    taste: { body: 7, bitter: 6, sweet: 8, aroma: 9 },
    variants: [
      { weight: '200g', grind: 'Hạt nguyên', price: 152000 },
      { weight: '500g', grind: 'Hạt nguyên', price: 328000 },
      { weight: '1kg', grind: 'Hạt nguyên', price: 488000 },
      { weight: '2kg', grind: 'Hạt nguyên', price: 882000 },
      { weight: '200g', grind: 'Xay phin', price: 152000 },
      { weight: '500g', grind: 'Xay phin', price: 328000 },
      { weight: '1kg', grind: 'Xay phin', price: 488000 },
      { weight: '2kg', grind: 'Xay phin', price: 882000 },
      { weight: '200g', grind: 'Xay espresso', price: 152000 },
      { weight: '500g', grind: 'Xay espresso', price: 328000 },
      { weight: '1kg', grind: 'Xay espresso', price: 488000 },
      { weight: '2kg', grind: 'Xay espresso', price: 882000 },
      { weight: '200g', grind: 'Xay pour-over', price: 152000 },
      { weight: '500g', grind: 'Xay pour-over', price: 328000 },
      { weight: '1kg', grind: 'Xay pour-over', price: 488000 },
      { weight: '2kg', grind: 'Xay pour-over', price: 882000 },
    ],
    brewingTip: 'Cold brew: 70g cà phê / 700ml nước lạnh. Ngâm 12-18 giờ trong tủ lạnh. Lọc, thêm đá và sữa tươi. Vị ngọt tự nhiên, rất mượt.',
  },
];

// Helpers
export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getVariantPrice(product: Product, weight: string, grind: string): number {
  const variant = product.variants.find(v => v.weight === weight && v.grind === grind);
  return variant?.price ?? product.variants[0].price;
}

export function getStartingPrice(product: Product): number {
  return Math.min(...product.variants.map(v => v.price));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
}

// Shipping fee lookup
export interface ShippingZone {
  zone: string;
  fee: number;
  provinces: string[];
}

export const shippingZones: ShippingZone[] = [
  {
    zone: 'Nội thành HCM',
    fee: 25000,
    provinces: ['Quận 1', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 7', 'Quận 8', 'Quận 10', 'Quận 11', 'Quận 12', 'Bình Thạnh', 'Gò Vấp', 'Phú Nhuận', 'Tân Bình', 'Tân Phú', 'Thủ Đức'],
  },
  {
    zone: 'Ngoại thành HCM',
    fee: 30000,
    provinces: ['Bình Chánh', 'Hóc Môn', 'Củ Chi', 'Nhà Bè', 'Cần Giờ'],
  },
  {
    zone: 'Miền Nam',
    fee: 35000,
    provinces: ['Bình Dương', 'Đồng Nai', 'Long An', 'Tây Ninh', 'Bà Rịa - Vũng Tàu', 'Bình Phước', 'Tiền Giang', 'Bến Tre', 'Vĩnh Long', 'Trà Vinh', 'Đồng Tháp', 'An Giang', 'Kiên Giang', 'Cần Thơ', 'Hậu Giang', 'Sóc Trăng', 'Bạc Liêu', 'Cà Mau', 'Lâm Đồng', 'Ninh Thuận', 'Bình Thuận'],
  },
  {
    zone: 'Miền Trung',
    fee: 40000,
    provinces: ['Đà Nẵng', 'Quảng Nam', 'Quảng Ngãi', 'Bình Định', 'Phú Yên', 'Khánh Hòa', 'Gia Lai', 'Kon Tum', 'Đắk Lắk', 'Đắk Nông', 'Thừa Thiên Huế', 'Quảng Bình', 'Quảng Trị', 'Hà Tĩnh', 'Nghệ An', 'Thanh Hóa'],
  },
  {
    zone: 'Miền Bắc',
    fee: 45000,
    provinces: ['Hà Nội', 'Hải Phòng', 'Bắc Ninh', 'Hải Dương', 'Hưng Yên', 'Vĩnh Phúc', 'Bắc Giang', 'Thái Nguyên', 'Phú Thọ', 'Nam Định', 'Thái Bình', 'Ninh Bình', 'Hà Nam', 'Quảng Ninh', 'Lạng Sơn', 'Cao Bằng', 'Bắc Kạn', 'Tuyên Quang', 'Hà Giang', 'Yên Bái', 'Lào Cai', 'Lai Châu', 'Điện Biên', 'Sơn La', 'Hòa Bình'],
  },
];

export const FREE_SHIPPING_THRESHOLD = 500000;

export function getAllProvinces(): string[] {
  return shippingZones.flatMap(z => z.provinces).sort();
}

export function getShippingFee(province: string, subtotal: number): number {
  if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  for (const zone of shippingZones) {
    if (zone.provinces.includes(province)) return zone.fee;
  }
  return 45000; // default to highest
}
