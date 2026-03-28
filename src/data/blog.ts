// Blog data — Kiến thức cà phê

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: 'knowledge' | 'brewing' | 'lifestyle' | 'news';
  categoryLabel: string;
  author: string;
  date: string;
  readTime: string;
}

export const blogCategories = [
  { id: 'all', label: 'Tất cả' },
  { id: 'knowledge', label: 'Kiến thức cà phê' },
  { id: 'brewing', label: 'Hướng dẫn pha chế' },
  { id: 'lifestyle', label: 'Lối sống' },
  { id: 'news', label: 'Tin tức' },
] as const;

export const blogPosts: BlogPost[] = [
  {
    id: 'robusta-vs-arabica',
    slug: 'robusta-vs-arabica-su-that',
    title: 'Robusta vs Arabica — Sự thật mà ít người biết',
    excerpt: 'Robusta bị đánh giá thấp hơn Arabica là chuyện xưa như trái đất. Nhưng sự thật có phải vậy? Hãy cùng tìm hiểu câu chuyện thật sự đằng sau hai giống cà phê này.',
    content: `Nhiều người vẫn nghĩ Arabica "cao cấp" hơn Robusta. Nhưng thực tế, một hạt Robusta được trồng cẩn thận và rang đúng kỹ thuật hoàn toàn có thể sánh ngang hoặc vượt qua nhiều loại Arabica thương mại.

**Robusta Việt Nam — Tiềm năng chưa được khai phá**

Việt Nam là nước sản xuất Robusta lớn nhất thế giới, nhưng phần lớn hạt được xuất khẩu dạng thô với giá rẻ. RobustTA ra đời với sứ mệnh thay đổi điều này — bằng cách chọn lọc kỹ càng, rang mộc đúng chuẩn, và mang đến cho người tiêu dùng Việt Nam sản phẩm cà phê xứng đáng.

**So sánh nhanh:**
- Caffeine: Robusta (2.7%) > Arabica (1.5%)
- Body: Robusta đậm, mạnh hơn
- Giá: Robusta phải chăng hơn
- Trồng: Robusta dễ trồng, kháng sâu bệnh tốt hơn`,
    image: '/images/IMG_9020.jpg',
    category: 'knowledge',
    categoryLabel: 'Kiến thức cà phê',
    author: 'RobustTA',
    date: '2025-12-15',
    readTime: '5 phút',
  },
  {
    id: 'pha-phin-chuan',
    slug: 'huong-dan-pha-phin-chuan-vi',
    title: 'Hướng dẫn pha phin chuẩn vị — Từ A đến Z',
    excerpt: 'Pha phin nghe đơn giản, nhưng để có tách cà phê phin "chuẩn" cần hiểu đúng tỷ lệ, nhiệt độ nước, và thời gian. Dưới đây là bí quyết pha phin hoàn hảo.',
    content: `**Dụng cụ cần có:**
- Phin inox (loại 7-8cm)
- Cà phê xay phin (trung bình–thô)
- Ấm nước 90-95°C
- Ly/cốc

**Bước 1: Chuẩn bị**
Cho 25g cà phê vào phin. Lắc nhẹ để cà phê phẳng đều.

**Bước 2: Bloom (Nở)**
Rót 30ml nước nóng, chờ 30 giây. Đây là lúc cà phê "thở" và giải phóng CO2.

**Bước 3: Chiết xuất**
Rót thêm 120-150ml nước nóng. Đặt nắp phin. Chờ 4-5 phút để cà phê nhỏ giọt hoàn toàn.

**Bí quyết:**
- Nước quá nóng (100°C) sẽ làm cà phê đắng khét
- Xay quá mịn sẽ tắc phin, quá thô sẽ nhạt`,
    image: '/images/IMG_8569.jpg',
    category: 'brewing',
    categoryLabel: 'Hướng dẫn pha chế',
    author: 'RobustTA',
    date: '2025-11-20',
    readTime: '4 phút',
  },
  {
    id: 'ca-phe-sach',
    slug: 'ca-phe-sach-la-gi',
    title: 'Cà phê "sạch" thật sự có nghĩa là gì?',
    excerpt: 'Cà phê sạch, cà phê nguyên chất, cà phê hữu cơ... Quá nhiều thuật ngữ khiến người tiêu dùng bối rối. Bài viết này giúp bạn phân biệt rõ ràng.',
    content: `Thị trường Việt Nam tràn ngập các loại "cà phê" — nhưng không phải tất cả đều thật sự là cà phê.

**Cà phê tẩm ướp:**
Là loại cà phê được trộn thêm bơ, rượu, hương liệu, chất tạo đặc. Đây KHÔNG phải cà phê nguyên chất.

**Cà phê nguyên chất (rang mộc):**
100% hạt cà phê, chỉ qua quy trình rang — không thêm bất kỳ phụ gia nào. Đây là cam kết của RobustTA.

**Cà phê hữu cơ (organic):**
Cà phê được trồng không sử dụng thuốc trừ sâu, phân bón hóa học. Cần chứng nhận từ tổ chức uy tín.

**Cách nhận biết cà phê thật:**
1. Hạt cà phê có kích thước không đều (tự nhiên)
2. Khi pha, bọt mịn nhẹ, không quá đậm đặc
3. Hậu vị sạch, không có vị hóa chất`,
    image: '/images/IMG_8563.jpg',
    category: 'knowledge',
    categoryLabel: 'Kiến thức cà phê',
    author: 'RobustTA',
    date: '2025-10-05',
    readTime: '6 phút',
  },
  {
    id: 'cold-brew-tai-nha',
    slug: 'cold-brew-tai-nha-don-gian',
    title: 'Cold Brew tại nhà — Đơn giản hơn bạn nghĩ',
    excerpt: 'Cold brew không cần thiết bị đắt tiền. Chỉ cần một bình thủy tinh, cà phê xay thô, và 12 tiếng kiên nhẫn.',
    content: `**Tỷ lệ vàng:** 1:10 (70g cà phê : 700ml nước lạnh)

**Các bước:**
1. Cho cà phê xay thô vào bình
2. Đổ nước lạnh/nước nguội
3. Khuấy nhẹ, đậy nắp
4. Cho vào tủ lạnh 12-18 tiếng
5. Lọc qua giấy lọc hoặc vải lọc
6. Thưởng thức với đá, sữa tươi, hoặc sirô đơn giản

**Tại sao Cold Brew ngon?**
Vì được chiết xuất ở nhiệt độ thấp, cold brew ít đắng hơn, vị ngọt tự nhiên hơn, và có hương thơm đặc biệt mà cà phê nóng không có được.`,
    image: '/images/IMG_9020.jpg',
    category: 'brewing',
    categoryLabel: 'Hướng dẫn pha chế',
    author: 'RobustTA',
    date: '2025-09-18',
    readTime: '3 phút',
  },
  {
    id: 'uong-ca-phe-lanh-manh',
    slug: 'uong-ca-phe-lanh-manh',
    title: 'Uống cà phê lành mạnh — Bao nhiêu là đủ?',
    excerpt: 'Cà phê có lợi cho sức khỏe, nhưng uống bao nhiêu là vừa? WHO khuyến cáo gì? Và nên uống vào lúc nào?',
    content: `**WHO khuyến cáo:** Không quá 400mg caffeine/ngày (khoảng 3-4 ly cà phê phin).

**Thời điểm tốt nhất:**
- 9:30 - 11:30 sáng (sau cortisol tự nhiên giảm)
- 13:30 - 15:00 chiều (sau bữa trưa)
- Tránh uống sau 16h nếu bạn khó ngủ

**Lợi ích sức khỏe (được nghiên cứu chứng minh):**
1. Tăng tập trung và năng suất
2. Chứa chất chống oxy hóa
3. Hỗ trợ chuyển hóa
4. Giảm nguy cơ một số bệnh (tiểu đường type 2, Parkinson)

**Lưu ý:**
- Uống cà phê đen (không đường, không sữa) để nhận được nhiều lợi ích nhất
- Chọn cà phê nguyên chất, tránh loại tẩm ướp có phụ gia`,
    image: '/images/IMG_8563.jpg',
    category: 'lifestyle',
    categoryLabel: 'Lối sống',
    author: 'RobustTA',
    date: '2025-08-22',
    readTime: '4 phút',
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug);
}
