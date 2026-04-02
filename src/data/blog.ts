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
- Phin inox RobustTA (loại 7-8cm)
- 20g - 25g cà phê RobustTA (Mộc)
- Ấm nước 92-95°C
- Ly/cốc

**Bước 1: Chuẩn bị & Tráng**
Tráng phin và ly bằng nước sôi để ổn định nhiệt độ. Cho 20g-25g cà phê vào phin, lắc nhẹ để phẳng mặt.

**Bước 2: Bloom (Ủ cà phê)**
Rót 30ml nước nóng (92-95°C) vào phin. Chờ 30-45 giây. Đây là bước quan trọng nhất để cà phê "thở" và giải phóng CO2, giúp hương vị đậm đà hơn.

**Bước 3: Chiết xuất**
Rót thêm 50ml-60ml nước nóng. Đậy nắp phin. Tốc độ nhỏ giọt lý tưởng là khoảng 1 giọt/giây.

**Bí quyết:**
- Sử dụng RobustTA R (Rich) để có hậu vị sô-cô-la đắng đậm.
- Nước pha nên là nước lọc tinh khiết để không làm biến đổi vị cà phê.`,
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
    content: `**Tỷ lệ vàng:** 1:10 (100g cà phê : 1000ml nước lạnh)

**Các bước:**
1. **Xay thô:** Sử dụng cà phê xay thô (như hạt muối biển) để tránh bị đắng gắt.
2. **Ngâm:** Cho cà phê vào túi lọc hoặc bình. Đổ nước lạnh vào và khuấy nhẹ.
3. **Kiên nhẫn:** Đậy kín và bảo quản trong ngăn mát tủ lạnh từ 12-24 tiếng.
4. **Lọc:** Loại bỏ bã cà phê. Tuyệt đối không vắt túi lọc để giữ nước cốt trong trẻo.
5. **Thưởng thức:** Có thể dùng trực tiếp với đá hoặc pha thêm cam sả, sữa tươi.

**Tại sao Cold Brew ngon?**
Vì được chiết xuất chậm ở nhiệt độ thấp, Cold Brew giảm thiểu 60% độ chua và đắng, mang lại vị ngọt tự nhiên, thanh mượt và cực kỳ sảng khoái.`,
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
  {
    id: 'pha-may-espresso',
    slug: 'huong-dan-pha-may-espresso-barista',
    title: 'Pha máy (Espresso) — Chuẩn Barista tại gia',
    excerpt: 'Làm thế nào để chiết xuất một shot Espresso hoàn hảo với lớp crema dày mượt? Dưới đây là các thông số kỹ thuật từ chuyên gia RobustTA.',
    content: `**Thông số kỹ thuật:**
- **Lượng bột:** 18g (Dose)
- **Lượng chiết xuất:** 36g - 40g (Yield)
- **Thời gian:** 25 - 30 giây
- **Áp suất:** 9 bar
- **Nhiệt độ:** 90 - 93°C

**Các bước thực hiện:**
1. **Chuẩn bị:** Xả nước grouphead và lau khô tay pha (portafilter).
2. **Nén (Tamping):** Cho 18g cà phê xay mịn vào, dùng tamper nén một lực đều tay khoảng 15-20kg để bề mặt cà phê phẳng tuyệt đối.
3. **Chiết xuất:** Lắp tay pha và bắt đầu chiết xuất ngay.
4. **Quan sát:** Dòng chảy ban đầu có màu sẫm (Pre-infusion), sau đó chuyển dần sang màu vàng mật ong (Tiger striping).

**Lưu ý:** Nếu chảy quá nhanh (>40g trong <20s), hãy xay cà phê mịn hơn. Nếu chảy quá chậm, hãy xay thô hơn.`,
    image: '/images/RobustTA-R.jpg',
    category: 'brewing',
    categoryLabel: 'Hướng dẫn pha chế',
    author: 'RobustTA',
    date: '2026-03-30',
    readTime: '5 phút',
  },
  {
    id: 'pha-pour-over',
    slug: 'nghe-thuat-pha-pour-over-v60',
    title: 'Nghệ thuật Pour-over (V60) — Đánh thức hương vị trái cây',
    excerpt: 'Pour-over là cách tốt nhất để cảm nhận trọn vẹn sự thanh khiết và các nốt hương phức hợp của cà phê. Hãy cùng khám phá kỹ thuật rót nước đỉnh cao.',
    content: `**Công thức chuẩn:**
- **Tỷ lệ:** 1:15 (20g cà phê : 300ml nước)
- **Độ xay:** Vừa - Thô (Medium-Coarse)
- **Nhiệt độ:** 92°C

**Các bước thực hiện:**
1. **Tráng giấy:** Rót nước nóng quanh phễu để khử mùi giấy và làm nóng bình chứa.
2. **Bloom:** Rót 40ml nước, chờ 30 giây để cà phê nở đều.
3. **Rót nước (Pouring):** Chia lượng nước còn lại thành 2-3 lần rót. Rót theo vòng tròn từ trong ra ngoài, tránh rót trực tiếp vào thành phễu.
4. **Kết thúc:** Tổng thời gian pha nên rơi vào khoảng 2:30 - 3:00 phút.

**Gợi ý:** Sử dụng dòng **RobustTA Taste (T)** để cảm nhận rõ nhất vị chua thanh và hương hoa cỏ tinh tế.`,
    image: '/images/RobustTA-T.jpg',
    category: 'brewing',
    categoryLabel: 'Hướng dẫn pha chế',
    author: 'RobustTA',
    date: '2026-03-30',
    readTime: '6 phút',
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug);
}
