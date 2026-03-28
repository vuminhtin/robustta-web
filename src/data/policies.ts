export interface PolicyContent {
  title: string;
  slug: string;
  content: string;
}

export const POLICIES: Record<string, PolicyContent> = {
  'refund-returns': {
    title: 'Chính sách đổi trả & hoàn tiền',
    slug: 'refund-returns',
    content: `
## 1. Trường hợp được đổi/trả
Khách hàng có thể yêu cầu đổi sản phẩm hoặc trả hàng/hoàn tiền trong các trường hợp sau:
- Sản phẩm bị lỗi do nhà sản xuất.
- RobustTA giao không đúng sản phẩm (sai chủng loại/mẫu mã) hoặc thiếu số lượng so với đơn hàng.

## 2. Điều kiện đổi/trả
Để được hỗ trợ nhanh chóng, khách hàng vui lòng đảm bảo:
- Thông báo yêu cầu đổi/trả trong vòng 03 – 07 ngày kể từ khi nhận hàng.
- Sản phẩm còn nguyên vẹn, chưa qua sử dụng, còn đầy đủ phụ kiện (nếu có) và bao bì/tem nhãn đi kèm (nếu có).

## 3. Trường hợp không áp dụng đổi/trả
RobustTA xin phép không áp dụng đổi/trả đối với:
- Sản phẩm đã qua sử dụng.
- Lỗi phát sinh do khách hàng sử dụng/ bảo quản không đúng cách, rơi vỡ, va đập, vào nước, tác động ngoại lực hoặc các nguyên nhân chủ quan từ phía khách hàng.

## 4. Cách gửi yêu cầu đổi/trả
Khi cần hỗ trợ, khách hàng vui lòng liên hệ Hotline: 0889999022 và cung cấp:
- Mã đơn hàng, số điện thoại đặt hàng.
- Mô tả tình trạng sản phẩm (kèm hình ảnh/video nếu có).
RobustTA sẽ tiếp nhận thông tin và phản hồi hướng xử lý phù hợp trong thời gian sớm nhất.
    `
  },
  'promotions': {
    title: 'Chính sách khuyến mãi',
    slug: 'promotions',
    content: `
## 1. Hình thức khuyến mãi
Tùy từng thời điểm, RobustTA có thể áp dụng một hoặc nhiều hình thức khuyến mãi, bao gồm nhưng không giới hạn:
- Giảm giá trực tiếp trên sản phẩm.
- Mã giảm giá (voucher/coupon).
- Quà tặng kèm theo đơn hàng.
- Miễn/giảm phí vận chuyển theo điều kiện.
- Chương trình mua kèm/mua nhiều ưu đãi.
- Các chương trình ưu đãi khác theo quy định pháp luật và thông báo của RobustTA.

## 2. Điều kiện áp dụng
Mỗi chương trình khuyến mãi sẽ có điều kiện riêng và được công bố rõ tại trang chương trình/sản phẩm hoặc tại bước đặt hàng, có thể bao gồm:
- Thời gian diễn ra chương trình.
- Phạm vi áp dụng (toàn bộ sản phẩm hoặc một số sản phẩm/nhóm sản phẩm).
- Giá trị đơn hàng tối thiểu.
- Số lượng/giới hạn lượt sử dụng.
- Đối tượng áp dụng (khách hàng mới, khách hàng thân thiết… nếu có).
Trong trường hợp khách hàng không đáp ứng điều kiện, hệ thống có thể không áp dụng ưu đãi hoặc ưu đãi sẽ không được xác nhận khi xử lý đơn hàng.

## 3. Quy định về mã giảm giá (voucher/coupon)
- Mỗi mã giảm giá có thể có giá trị giảm, điều kiện áp dụng và thời hạn riêng.
- Mã giảm giá chỉ có hiệu lực khi được nhập đúng và hiển thị áp dụng thành công tại bước thanh toán/xác nhận đơn.
- Trừ khi có thông báo khác, mỗi đơn hàng chỉ áp dụng 01 mã giảm giá.
- Mã giảm giá có thể không áp dụng đồng thời với các chương trình ưu đãi khác (tùy quy định từng chương trình).
- RobustTA có quyền từ chối áp dụng mã giảm giá trong các trường hợp có dấu hiệu gian lận/lạm dụng.

## 4. Quy định về quà tặng kèm
- Quà tặng (nếu có) áp dụng theo điều kiện chương trình và số lượng có hạn.
- Quà tặng có thể được thay thế bằng sản phẩm/quà tặng tương đương trong trường hợp hết hàng (RobustTA sẽ thông báo trước khi xử lý đơn, nếu cần).
- Quà tặng không quy đổi thành tiền mặt (trừ khi chương trình có quy định khác).

## 5. Kết hợp khuyến mãi
- Việc áp dụng đồng thời nhiều chương trình ưu đãi phụ thuộc vào điều kiện từng chương trình.
- Trong trường hợp hệ thống cho phép nhiều ưu đãi cùng lúc, thứ tự/giá trị ưu đãi sẽ được tính theo quy tắc hiển thị tại bước thanh toán.
- Nếu có mâu thuẫn về cách áp dụng, quyết định của RobustTA (dựa trên thông tin công bố và dữ liệu hệ thống) sẽ là căn cứ xử lý.

## 6. Hủy đơn, đổi trả và hoàn tiền trong thời gian khuyến mãi
- Trường hợp khách hàng hủy đơn/đổi trả/hoàn tiền, RobustTA sẽ xử lý theo Chính sách đổi trả & hoàn tiền đã công bố.
- Giá trị hoàn tiền (nếu có) được tính trên số tiền khách hàng thực tế đã thanh toán sau khuyến mãi.
- Với đơn hàng có sử dụng mã giảm giá/quà tặng:
    - Mã giảm giá có thể không được hoàn lại/khôi phục nếu đã hết hạn hoặc đã đạt giới hạn lượt sử dụng.
    - Quà tặng kèm (nếu đã nhận) có thể cần hoàn trả cùng sản phẩm.
    `
  },
  'privacy': {
    title: 'Chính sách bảo mật',
    slug: 'privacy',
    content: `
## 1. Mục đích thu thập và sử dụng thông tin
RobustTA cam kết không mua bán, trao đổi thông tin cá nhân của khách hàng. Thông tin thu thập được chỉ sử dụng trong nội bộ công ty và/hoặc cho các mục đích cần thiết để vận hành dịch vụ, bao gồm:
- Xử lý đơn hàng: xác nhận đơn, đóng gói, giao hàng, xuất hóa đơn (nếu có), hỗ trợ đổi trả/bảo hành.
- Duy trì tài khoản: tạo và quản lý tài khoản khách hàng.
- Chăm sóc khách hàng: tiếp nhận và phản hồi yêu cầu, khiếu nại, góp ý.
- Cá nhân hóa trải nghiệm: cải thiện nội dung/tiện ích, đề xuất sản phẩm phù hợp.
- Thông tin tiếp thị (nếu khách hàng đồng ý).
- An ninh – phòng chống gian lận.
- Tuân thủ pháp luật.

## 2. Phạm vi thu thập thông tin
RobustTA thu thập thông tin khi khách hàng:
- Cung cấp trực tiếp khi đặt hàng/đăng ký: Họ tên, địa chỉ, số điện thoại, email.
- Tương tác với website: Sử dụng cookie để ghi nhớ giỏ hàng, thống kê lượt truy cập.

## 3. Thời gian lưu trữ thông tin
Thông tin khách hàng được lưu trữ cho đến khi khách hàng yêu cầu hủy/xóa, hoặc theo quy định pháp luật.

## 4. Chia sẻ thông tin với bên thứ ba
RobustTA cam kết không cung cấp thông tin khách hàng cho bên thứ ba, trừ các đối tác vận chuyển/thanh toán phục vụ việc thực hiện đơn hàng, hoặc theo yêu cầu pháp lý.

## 5. Quyền của khách hàng
Khách hàng có quyền kiểm tra, cập nhật, điều chỉnh hoặc yêu cầu xóa thông tin cá nhân của mình.
    `
  },
  'shipping': {
    title: 'Chính sách giao hàng toàn quốc',
    slug: 'shipping',
    content: `
## 1. Phạm vi giao hàng
RobustTA hỗ trợ giao hàng toàn quốc thông qua các đơn vị vận chuyển đối tác.

## 2. Thời gian giao hàng
- Thời gian giao hàng dự kiến: 01 – 05 ngày làm việc, tùy khu vực.
- Thời gian trên không bao gồm ngày lễ, Tết.

## 3. Phí giao hàng
- **Miễn phí giao hàng**: Cho đơn hàng từ 600.000 VNĐ trở lên tại khu vực nội thành TP. Hồ Chí Minh.
- **Phí giao hàng thông thường**: Áp dụng cho đơn hàng dưới 600.000 VNĐ hoặc khu vực ngoại thành/liên tỉnh. Mức phí tính theo đơn vị vận chuyển và hiển thị tại bước đặt hàng.

## 4. Trách nhiệm với hàng hóa
RobustTA chịu trách nhiệm đối với hàng hóa cho đến khi sản phẩm được giao thành công. Khách hàng vui lòng kiểm tra hàng khi nhận.
    `
  },
  'complaints': {
    title: 'Chính sách giải quyết khiếu nại',
    slug: 'complaints',
    content: `
## 1. Nguyên tắc giải quyết
RobustTA tiếp nhận và xử lý khiếu nại trên tinh thần tôn trọng – hợp tác – minh bạch.

## 2. Kênh tiếp nhận
- Hotline: 088 9999 022
- Email: info@robustta.com

## 3. Quy trình xử lý
- **Bước 1**: Tiếp nhận khiếu nại.
- **Bước 2**: Xác minh thông tin và bằng chứng.
- **Bước 3**: Phản hồi phương án xử lý (đổi hàng, hoàn tiền, hỗ trợ kỹ thuật...).
- **Bước 4**: Thực hiện và kết thúc khiếu nại.
    `
  },
  'terms': {
    title: 'Điều khoản và điều kiện giao dịch',
    slug: 'terms',
    content: `
## 1. Quy trình đặt hàng
Khách hàng lựa chọn sản phẩm, điền thông tin, chọn phương thức thanh toán và xác nhận đặt hàng.

## 2. Xác lập giao dịch
Giao dịch mua bán được xác lập khi RobustTA và khách hàng thống nhất các thông tin về sản phẩm, giá cả và giao nhận.

## 3. Trách nhiệm của khách hàng
Khách hàng có trách nhiệm cung cấp thông tin chính xác. Mọi rủi ro do thông tin sai lệch khách hàng sẽ tự chịu trách nhiệm.

## 4. Giải quyết tranh chấp
Mọi tranh chấp phát sinh sẽ được ưu tiên giải quyết qua thương lượng, hòa giải.
    `
  },
  'inspection': {
    title: 'Chính sách đồng kiểm',
    slug: 'inspection',
    content: `
## 1. Định nghĩa
Đồng kiểm là việc khách hàng kiểm tra kiện hàng cùng nhân viên giao hàng tại thời điểm nhận.

## 2. Phạm vi đồng kiểm
Khách hàng được kiểm tra ngoại quan kiện hàng, số lượng sản phẩm, chủng loại/mẫu mã. Không bao gồm dùng thử sản phẩm.

## 3. Xử lý bất thường
Nếu phát hiện hàng hư hỏng, sai/thiếu, khách hàng có quyền từ chối nhận và liên hệ ngay Hotline: 088 9999 022.
    `
  },
  'payment': {
    title: 'Hình thức thanh toán',
    slug: 'payment',
    content: `
## 1. Các hình thức thanh toán
- **Thanh toán khi nhận hàng (COD)**: Trả tiền mặt cho shipper.
- **Chuyển khoản ngân hàng**: MB Bank - 889999022 (CÔNG TY TNHH RBT GROUP).
- **Thanh toán qua SePay**: QR chuyển khoản tự động.

## 2. Xác nhận thanh toán
Mọi khoản thanh toán sẽ được RobustTA xác nhận trước khi tiến hành giao hàng.
    `
  }
};
