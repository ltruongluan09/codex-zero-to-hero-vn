# Outline ebook: Codex Zero To Hero Việt Nam

## 00. Giới thiệu

- Mục tiêu: Giúp người đọc hiểu đây không phải sách dạy lập trình, mà là hướng dẫn làm việc với AI coding assistant.
- Người học hiểu được: Vì sao người không biết code vẫn có thể tạo demo, tool nội bộ, landing page, dashboard.
- Ví dụ thực tế: Một trưởng phòng nhân sự muốn tạo tool lọc CV đơn giản.
- Project liên quan: Chưa có, chỉ chuẩn bị tư duy.
- Prompt mẫu: "Hãy giải thích Codex cho tôi như tôi là người văn phòng chưa từng code."
- Lỗi thường gặp: Nghĩ rằng phải học lập trình nhiều tháng mới dùng được Codex.

## 01. Codex là gì?

- Mục tiêu: Giải thích Codex như một cộng sự kỹ thuật có thể đọc, sửa, chạy và giải thích project.
- Người học hiểu được: Codex không chỉ trả lời, mà còn có thể thao tác trên file, chạy lệnh, kiểm tra lỗi.
- Ví dụ thực tế: Bạn nói "tạo landing page cho khóa học Excel", Codex tạo file, sửa UI, chạy thử.
- Project liên quan: landing-page.
- Prompt mẫu: "Tạo cho tôi một landing page giới thiệu dịch vụ tư vấn tuyển dụng."
- Lỗi thường gặp: Xem Codex như chatbot chỉ để hỏi đáp.

## 02. Codex vs ChatGPT

- Mục tiêu: Phân biệt ChatGPT để trò chuyện và Codex để làm việc trên project.
- Người học hiểu được: ChatGPT giống cố vấn, Codex giống người cùng ngồi trong thư mục dự án.
- Ví dụ thực tế: ChatGPT giúp nghĩ nội dung, Codex giúp biến nội dung thành website.
- Project liên quan: landing-page.
- Prompt mẫu: "Dựa trên nội dung này, hãy tạo website một trang."
- Lỗi thường gặp: Dán lỗi vào ChatGPT nhưng không cho AI xem toàn bộ project.

## 03. Codex làm được gì?

- Mục tiêu: Liệt kê các việc Codex làm tốt.
- Người học hiểu được: Tạo app, sửa bug, viết tài liệu, cải thiện UI, tạo prompt, hỗ trợ deploy.
- Ví dụ thực tế: Tạo dashboard theo dõi doanh số theo khu vực.
- Project liên quan: dashboard.
- Prompt mẫu: "Tạo dashboard quản lý KPI cho team sales."
- Lỗi thường gặp: Chỉ dùng Codex để viết code, không dùng để lập kế hoạch và kiểm tra.

## 04. Codex không làm được gì?

- Mục tiêu: Đặt kỳ vọng đúng.
- Người học hiểu được: Codex có thể sai, cần dữ liệu rõ, cần người kiểm tra, không thay thế trách nhiệm sản phẩm.
- Ví dụ thực tế: AI tạo báo cáo nhìn đẹp nhưng công thức doanh thu sai vì yêu cầu mơ hồ.
- Project liên quan: ai-report-tool.
- Prompt mẫu: "Hãy liệt kê giả định bạn đang dùng trước khi build."
- Lỗi thường gặp: Tin kết quả AI 100% mà không kiểm tra.

## 05. Tư duy đúng khi dùng Codex

- Mục tiêu: Chuyển từ "tôi không biết code" sang "tôi biết giao việc cho AI".
- Người học hiểu được: Làm sản phẩm là chia nhỏ việc, kiểm tra từng bước, phản hồi rõ.
- Ví dụ thực tế: Thay vì yêu cầu "làm app quản lý công ty", hãy bắt đầu bằng "màn hình danh sách nhân sự".
- Project liên quan: dashboard.
- Prompt mẫu: "Hãy chia yêu cầu này thành các bước nhỏ để người mới làm được."
- Lỗi thường gặp: Giao một yêu cầu quá lớn, quá mơ hồ.

## 06. Cách nói chuyện với Codex

- Mục tiêu: Dạy công thức prompt đơn giản.
- Người học hiểu được: Bối cảnh, mục tiêu, dữ liệu, yêu cầu giao diện, cách kiểm tra, giới hạn.
- Ví dụ thực tế: Viết prompt tạo tool tổng hợp chi phí văn phòng.
- Project liên quan: excel-helper.
- Prompt mẫu: "Tôi là kế toán nội bộ, cần tool nhập chi phí và xuất bảng tổng hợp."
- Lỗi thường gặp: Prompt chỉ có một câu ngắn như "làm web đẹp".

## 07. Workflow làm việc với Codex

- Mục tiêu: Đưa ra quy trình 7 bước từ ý tưởng đến demo.
- Người học hiểu được: Mô tả việc, tạo bản đầu, chạy thử, đọc lỗi, sửa, polish, deploy.
- Ví dụ thực tế: Làm MVP form đăng ký sự kiện nội bộ.
- Project liên quan: landing-page.
- Prompt mẫu: "Hãy làm bản đơn giản trước, sau đó hỏi tôi trước khi thêm tính năng lớn."
- Lỗi thường gặp: Thêm quá nhiều tính năng trước khi bản đầu chạy được.

## 08. Cách đọc output AI

- Mục tiêu: Giúp người mới không hoảng khi thấy code, log, lỗi.
- Người học hiểu được: Đọc phần tóm tắt, file đã sửa, lệnh đã chạy, lỗi còn lại.
- Ví dụ thực tế: Codex nói "port đang bận", nghĩa là app đang cần đổi cổng chạy.
- Project liên quan: tất cả project.
- Prompt mẫu: "Giải thích output này bằng ngôn ngữ người mới học."
- Lỗi thường gặp: Thấy chữ đỏ là nghĩ project hỏng hoàn toàn.

## 09. Cài môi trường

- Mục tiêu: Giải thích môi trường như "bàn làm việc" của app.
- Người học hiểu được: Editor, terminal, Node.js, browser, tài khoản deploy.
- Ví dụ thực tế: Cài đủ công cụ để chạy web demo trên máy.
- Project liên quan: landing-page.
- Prompt mẫu: "Kiểm tra giúp tôi máy này đã đủ môi trường chạy project chưa."
- Lỗi thường gặp: Cài thiếu Node.js hoặc mở sai thư mục.

## 10. Project là gì?

- Mục tiêu: Giải thích project như một thư mục chứa mọi thứ của sản phẩm.
- Người học hiểu được: File, folder, README, source code, assets, cấu hình.
- Ví dụ thực tế: Một website công ty giống một bộ hồ sơ có nhiều ngăn.
- Project liên quan: tất cả.
- Prompt mẫu: "Giải thích cấu trúc project này cho người không biết code."
- Lỗi thường gặp: Sửa nhầm file vì không hiểu vai trò từng thư mục.

## 11. Chạy project đầu tiên

- Mục tiêu: Cho người học trải nghiệm app chạy thật.
- Người học hiểu được: Cài dependency, chạy dev server, mở localhost.
- Ví dụ thực tế: Mở landing page trên trình duyệt.
- Project liên quan: landing-page.
- Prompt mẫu: "Hãy chạy project này và nói tôi mở link nào."
- Lỗi thường gặp: Đóng terminal làm app tắt.

## 12. Build landing page

- Mục tiêu: Tạo website một trang.
- Người học hiểu được: Hero, lợi ích, dịch vụ, form liên hệ, CTA.
- Ví dụ thực tế: Landing page cho lớp học tiếng Anh giao tiếp.
- Project liên quan: landing-page.
- Prompt mẫu: "Tạo landing page cho dịch vụ [tên dịch vụ], khách hàng là [đối tượng]."
- Lỗi thường gặp: Nội dung quá chung, thiếu đối tượng khách hàng.

## 13. Build dashboard

- Mục tiêu: Tạo dashboard quản lý số liệu.
- Người học hiểu được: KPI card, bảng dữ liệu, bộ lọc, biểu đồ.
- Ví dụ thực tế: Dashboard doanh số theo tháng cho cửa hàng.
- Project liên quan: dashboard.
- Prompt mẫu: "Tạo dashboard theo dõi doanh thu, chi phí, lợi nhuận, khách hàng mới."
- Lỗi thường gặp: Đưa quá nhiều chỉ số khiến màn hình rối.

## 14. Build Excel helper

- Mục tiêu: Tạo công cụ hỗ trợ xử lý dữ liệu bảng.
- Người học hiểu được: Upload file, đọc dữ liệu, lọc, tổng hợp, xuất kết quả.
- Ví dụ thực tế: Tổng hợp chấm công từ nhiều file Excel.
- Project liên quan: excel-helper.
- Prompt mẫu: "Tạo tool upload file CSV và tổng hợp theo phòng ban."
- Lỗi thường gặp: File dữ liệu không đồng nhất tên cột.

## 15. Build AI report tool

- Mục tiêu: Tạo tool nhập dữ liệu và sinh báo cáo.
- Người học hiểu được: Form nhập thông tin, template báo cáo, AI hỗ trợ viết bản nháp.
- Ví dụ thực tế: Báo cáo tuần cho team marketing.
- Project liên quan: ai-report-tool.
- Prompt mẫu: "Tạo tool sinh báo cáo tuần từ các gạch đầu dòng tôi nhập."
- Lỗi thường gặp: Báo cáo nghe hay nhưng thiếu số liệu kiểm chứng.

## 16. Debug và fix lỗi

- Mục tiêu: Dạy cách xử lý lỗi bình tĩnh.
- Người học hiểu được: Copy lỗi, mô tả thao tác trước khi lỗi xảy ra, yêu cầu Codex sửa và giải thích.
- Ví dụ thực tế: Bấm nút submit nhưng không có phản hồi.
- Project liên quan: tất cả.
- Prompt mẫu: "Tôi bấm [hành động] thì gặp lỗi [nội dung lỗi]. Hãy tìm nguyên nhân và sửa."
- Lỗi thường gặp: Chỉ nói "bị lỗi" mà không đưa thông tin.

## 17. Cải thiện UI

- Mục tiêu: Biến app từ "chạy được" thành "dễ dùng và nhìn tin cậy".
- Người học hiểu được: Khoảng cách, màu, font, trạng thái rỗng, mobile, nút chính.
- Ví dụ thực tế: Dashboard cho sếp xem trong cuộc họp.
- Project liên quan: dashboard.
- Prompt mẫu: "Cải thiện UI theo phong cách hiện đại, rõ ràng, dành cho người quản lý bận rộn."
- Lỗi thường gặp: Yêu cầu "đẹp hơn" nhưng không nói đẹp theo kiểu nào.

## 18. OpenAI API là gì?

- Mục tiêu: Giải thích API như cách app nói chuyện với AI.
- Người học hiểu được: App gửi yêu cầu, AI trả lời, cần API key và chi phí.
- Ví dụ thực tế: Chatbot tư vấn chính sách nhân sự nội bộ.
- Project liên quan: chatbot-ai.
- Prompt mẫu: "Giải thích OpenAI API bằng ví dụ quầy lễ tân nhận câu hỏi."
- Lỗi thường gặp: Đưa API key vào nơi công khai.

## 19. Build chatbot AI

- Mục tiêu: Tạo chatbot đơn giản cho dữ liệu nội bộ hoặc FAQ.
- Người học hiểu được: Ô chat, prompt hệ thống, lịch sử hội thoại, giới hạn trả lời.
- Ví dụ thực tế: Chatbot trả lời câu hỏi onboarding nhân viên mới.
- Project liên quan: chatbot-ai.
- Prompt mẫu: "Tạo chatbot trả lời FAQ cho nhân viên mới dựa trên nội dung sau."
- Lỗi thường gặp: Chatbot trả lời ngoài phạm vi vì không đặt giới hạn.

## 20. Deploy Vercel

- Mục tiêu: Đưa app lên mạng để người khác xem.
- Người học hiểu được: Deploy là xuất bản app, cần repo hoặc upload, cần biến môi trường.
- Ví dụ thực tế: Gửi link demo landing page cho khách hàng.
- Project liên quan: landing-page, dashboard, chatbot-ai.
- Prompt mẫu: "Hướng dẫn tôi deploy project này lên Vercel từng bước."
- Lỗi thường gặp: App chạy local nhưng deploy lỗi vì thiếu biến môi trường.

## 21. API key và bảo mật

- Mục tiêu: Dạy các nguyên tắc bảo mật tối thiểu.
- Người học hiểu được: API key giống chìa khóa, không đưa lên GitHub, dùng `.env`.
- Ví dụ thực tế: Key OpenAI bị lộ có thể phát sinh chi phí.
- Project liên quan: chatbot-ai, ai-report-tool.
- Prompt mẫu: "Kiểm tra project này có chỗ nào dễ lộ API key không."
- Lỗi thường gặp: Dán key trực tiếp vào code hoặc screenshot.

## 22. Build sản phẩm thật

- Mục tiêu: Gộp kỹ năng thành MVP có người dùng thật.
- Người học hiểu được: Chọn vấn đề nhỏ, đo kết quả, lấy feedback, lặp lại.
- Ví dụ thực tế: Tool tạo báo giá nhanh cho team sales.
- Project liên quan: tất cả.
- Prompt mẫu: "Giúp tôi biến ý tưởng này thành MVP trong 7 ngày."
- Lỗi thường gặp: Làm sản phẩm quá lớn trước khi có người dùng thử.

## 23. Làm video demo AI

- Mục tiêu: Hướng dẫn kể câu chuyện sản phẩm bằng video demo ngắn.
- Người học hiểu được: Vấn đề, giải pháp, màn hình chính, kết quả, lời kêu gọi.
- Ví dụ thực tế: Video 60 giây giới thiệu tool báo cáo tuần.
- Project liên quan: ai-report-tool, chatbot-ai.
- Prompt mẫu: "Viết kịch bản video demo 60 giây cho app này."
- Lỗi thường gặp: Demo nhiều tính năng nhưng không nói rõ lợi ích.

## 24. Roadmap Zero To Hero

- Mục tiêu: Tổng kết và đưa người học sang bước tự làm.
- Người học hiểu được: Nên học tiếp gì, luyện prompt thế nào, xây portfolio ra sao.
- Ví dụ thực tế: Tạo 3 demo nhỏ để trình bày với sếp hoặc khách hàng.
- Project liên quan: tất cả.
- Prompt mẫu: "Dựa trên kỹ năng hiện tại, hãy đề xuất 3 project tiếp theo cho tôi."
- Lỗi thường gặp: Học xong không tạo sản phẩm cá nhân nào.

