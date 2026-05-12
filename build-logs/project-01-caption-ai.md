# Project 01 - Caption AI

## Tóm tắt ngắn

Caption AI là project đầu tiên của Lumi Labs.

Ý tưởng rất đơn giản:

Người dùng nhập tên sản phẩm và mô tả ngắn. Sau đó AI tạo caption TikTok, Facebook và hashtag bằng tiếng Việt.

Mục tiêu không phải làm một app phức tạp. Mục tiêu là tạo một công cụ nhỏ nhưng dùng được ngay, để người non-tech nhìn vào có thể hiểu:

> "À, AI có thể giúp mình làm việc thật như thế này."

## Vì sao chọn project này?

Caption là một nhu cầu rất gần với người Việt:

- chủ shop online cần đăng bài mỗi ngày
- creator cần ý tưởng nội dung
- freelancer cần viết bài cho khách
- nhân viên marketing cần bản nháp nhanh
- người không chuyên không biết bắt đầu câu chữ thế nào

Đây là bài toán đủ nhỏ để bắt đầu, nhưng đủ thực tế để tạo cảm giác "wow".

## Người dùng mục tiêu

Caption AI dành cho:

- chủ shop nhỏ
- creator mới bắt đầu
- freelancer làm nội dung
- dân văn phòng cần viết bài nhanh
- người chỉ biết dùng ChatGPT nhưng chưa biết build tool

Người dùng không cần biết code, không cần đăng ký, không cần hiểu AI hoạt động bên trong.

## Phiên bản đầu tiên

Phiên bản đầu tiên tập trung vào một flow cực ngắn:

1. Nhập tên sản phẩm
2. Nhập mô tả ngắn
3. Bấm tạo caption
4. Nhận caption TikTok, Facebook và hashtag
5. Copy để dùng ngay

Triết lý là: càng ít bước càng tốt.

## Những quyết định quan trọng

### 1. Không làm chatbot

Nếu làm chatbot, người dùng phải nghĩ cách hỏi.

Caption AI làm ngược lại: đưa sẵn một form rất rõ ràng. Người dùng chỉ cần điền thông tin sản phẩm.

Điều này hợp hơn với người non-tech vì họ không phải suy nghĩ nhiều.

### 2. Dùng placeholder thay vì chữ mẫu trong ô nhập

Ban đầu ô nhập có sẵn chữ mẫu. Người test phải xóa đi rồi mới nhập nội dung mới.

Sau đó đổi thành placeholder để trải nghiệm tự nhiên hơn:

- ô trống để nhập
- vẫn có ví dụ gợi ý
- không làm người dùng bối rối

### 3. Thêm ví dụ nhanh theo ngành

Các ví dụ nhanh giúp người mới hiểu ngay app dùng thế nào:

- Đồ ăn
- Mỹ phẩm
- Dịch vụ

Đây là cách giảm ma sát rất tốt. Người dùng không cần nghĩ quá lâu, chỉ cần bấm thử.

### 4. Giữ Lumi Bot làm nhận diện

Lumi Bot được dùng như trợ lý AI của Lumi Labs.

Vai trò của Lumi Bot:

- xuất hiện khi AI đang xử lý
- tạo cảm giác thân thiện
- giúp tool có nhận diện riêng
- làm trải nghiệm bớt khô như một form bình thường

Sau này các project khác cũng có thể dùng Lumi Bot ở trạng thái loading, gợi ý hoặc hướng dẫn.

### 5. Ưu tiên output hay hơn số lượng tính năng

Đã có lúc thử thêm nhiều lựa chọn như nền tảng, giọng văn, Instagram.

Nhưng khi thêm quá nhiều control, tool bắt đầu bị nặng và output không còn tự nhiên như bản tốt nhất.

Bài học: với project đầu tiên, chất lượng caption quan trọng hơn số lượng nút bấm.

## Điều làm bản production tốt

Bản production hay nhất khi Gemini tạo ra caption có giọng rất đời:

- nói như người Việt thật
- có cảm xúc
- có ngữ cảnh rõ
- có ví dụ sát đời sống
- không giống template máy móc

Ví dụ vibe tốt:

> "Mấy bà công sở, creator hay freelance làm việc khuya..."

Đây là kiểu ngôn ngữ người dùng Việt dễ thấy gần gũi.

## Lỗi và điểm chưa ổn từng gặp

### Loading chưa rõ

Có lúc bấm tạo caption nhưng người dùng không thấy AI đang xử lý.

Bài học:

Loading phải nằm ở vị trí người dùng đang nhìn, không chỉ ở một vùng khác của màn hình.

### Local khác production

Local có thể không dùng Gemini giống production, nên output rơi về bản dự phòng và kém hay hơn.

Bài học:

Cần phân biệt rõ:

- production dùng AI thật
- local có thể dùng mock hoặc fallback
- fallback cũng phải đủ hay để demo không bị tụt chất lượng

### Thêm nhiều tính năng làm tool bị loãng

Thêm quá nhiều lựa chọn có thể làm người non-tech bị ngợp.

Bài học:

Một tool đầu tiên nên giữ flow đơn giản:

Nhập sản phẩm -> bấm tạo -> copy kết quả.

## Công nghệ đang dùng

Ở mức người không biết code cần hiểu:

- React/Vite: phần giao diện website
- Vercel: nơi đưa website lên mạng
- Gemini: AI viết caption
- Lumi Bot: nhân vật đại diện cho trạng thái AI đang hỗ trợ

Không cần giải thích sâu hơn trong nội dung dành cho non-tech.

## Flow demo để quay video

1. Mở Lumi Labs
2. Kéo đến Caption AI
3. Bấm ví dụ "Mỹ phẩm"
4. Bấm tạo caption
5. Cho thấy Lumi Bot đang xử lý
6. Hiện caption TikTok/Facebook/hashtag
7. Bấm copy
8. Kết luận: "Đây là project AI đầu tiên mình build công khai"

Video nên ngắn, rõ, có kết quả thật trong 20-40 giây.

## Bài học lớn nhất

Project đầu tiên không cần quá phức tạp.

Quan trọng là:

- người dùng hiểu ngay
- thao tác được ngay
- thấy kết quả thật
- cảm giác AI giúp mình làm được việc

Caption AI đã làm đúng vai trò của Project 1: một demo nhỏ, gần gũi, dễ hiểu, có thể dùng để giải thích Lumi Labs đang đi theo hướng nào.

## Việc nên làm tiếp theo

Ưu tiên giữ bản production ổn định.

Các cải tiến nên làm sau:

- viết fallback hay hơn nhưng không phá output Gemini
- thêm trạng thái loading rõ hơn nhưng không làm rối UI
- thêm mục "Nhật ký làm project này" lên homepage hoặc trang riêng
- lưu lại các prompt tốt đã dùng để tạo caption
- thêm một video demo ngắn cho Caption AI

Không nên vội thêm quá nhiều lựa chọn nâng cao.

## Trạng thái hiện tại

Caption AI đang là project demo đầu tiên của Lumi Labs.

Vai trò hiện tại:

- chứng minh Lumi Labs không chỉ nói về AI, mà có tool thật
- tạo niềm tin với người non-tech
- làm nền tảng cho các project tiếp theo
- là câu chuyện đầu tiên trong hành trình build in public
