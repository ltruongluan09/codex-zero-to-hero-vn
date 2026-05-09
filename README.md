# Codex Zero To Hero Việt Nam

Đây là bộ tài liệu tiếng Việt dành cho người chưa từng lập trình nhưng muốn biết cách làm việc với AI coding assistant như Codex để tạo ra sản phẩm thật.

Bạn không cần bắt đầu bằng thuật toán, cấu trúc dữ liệu, hay các khái niệm kỹ thuật khó. Bạn bắt đầu bằng một việc rất đời thường: mô tả rõ điều mình muốn, đọc kết quả AI tạo ra, kiểm tra, sửa lỗi, cải thiện dần, rồi đưa sản phẩm lên mạng.

## Project này dành cho ai?

- CEO muốn tự làm demo ý tưởng trước khi giao team.
- Manager, BA, PM muốn biến yêu cầu nghiệp vụ thành prototype.
- HR, backoffice, vận hành muốn tạo công cụ nội bộ nhỏ.
- Dân văn phòng quen Excel, Google Sheet, ChatGPT.
- Người chưa biết code nhưng muốn hiểu cách AI giúp mình build app.

## Học xong bạn làm được gì?

- Hiểu Codex là gì và khác ChatGPT ở đâu.
- Biết cách nói chuyện với Codex để AI hiểu đúng việc.
- Biết tạo một project đơn giản từ con số 0.
- Biết đọc lỗi cơ bản và nhờ Codex sửa lỗi.
- Biết cải thiện giao diện để sản phẩm nhìn chuyên nghiệp hơn.
- Biết deploy app đơn giản lên Vercel.
- Biết tạo tool thật cho công việc: landing page, dashboard, helper Excel, report tool, chatbot AI.
- Biết dùng AI để làm MVP hoặc demo sản phẩm.

## Cách dùng project này

1. Đọc `outline.md` để hiểu toàn bộ ebook.
2. Đi theo `roadmap.md` nếu bạn muốn học trong 30 ngày.
3. Dùng `skill-tree.md` để biết mình đang ở level nào.
4. Mở từng file trong `chapters/` để học theo chương.
5. Vào `projects/` để thực hành bằng project thật.
6. Copy prompt trong `prompts/` để làm việc với Codex nhanh hơn.
7. Dùng `templates/` khi muốn viết thêm chương, thêm project hoặc xuất DOCX.

## Website public

Project đã có bản website HTML ở:

`index.html`

Bạn có thể mở trực tiếp file này bằng trình duyệt để xem chapter 00 dạng visual-first.

Để đưa website lên mạng:

```text
Project
  ↓
Push GitHub
  ↓
Connect Vercel
  ↓
Public website
```

Xem hướng dẫn chi tiết trong `DEPLOY.md`.

## Cách viết chapter mới

Khi viết chapter mới, hãy copy cấu trúc trong:

`templates/chapter-template.md`

Nguyên tắc viết:

- Giải thích như đang nói với một người chưa từng code.
- Mỗi khái niệm nên có ví dụ công việc thật.
- Tránh nói dài về kỹ thuật nếu người học chưa cần.
- Luôn có prompt mẫu để người học copy dùng ngay.
- Luôn có checklist cuối bài.

## Cách export DOCX

Bạn có thể dùng nội dung Markdown trong project để xuất sang DOCX bằng các công cụ như Pandoc, Google Docs, Notion hoặc editor hỗ trợ export.

Gợi ý quy trình đơn giản:

1. Gom các chapter cần xuất thành một file Markdown.
2. Dùng style trong `templates/docx-style-guide.md`.
3. Chèn screenshot minh họa sau mỗi phần thực hành.
4. Xuất sang DOCX.
5. Đọc lại như một người mới học, chỗ nào khó hiểu thì viết lại.

## Cách dùng prompt mẫu

Mở thư mục `prompts/`, chọn prompt phù hợp:

- Muốn tạo app mới: `create-project.md`
- Muốn sửa lỗi: `debug.md`
- Muốn cải thiện giao diện: `improve-ui.md`
- Muốn thêm tính năng: `add-feature.md`
- Muốn nhờ AI review project: `review-project.md`
- Muốn giải thích code: `explain-code.md`
- Muốn xuất tài liệu DOCX: `export-docx.md`

Hãy thay phần trong dấu ngoặc vuông bằng thông tin thật của bạn.

## Roadmap học đề xuất

Nếu bạn đi làm ban ngày, hãy học theo nhịp nhẹ:

- Mỗi ngày 45 đến 90 phút.
- 15 phút đọc chapter.
- 30 đến 60 phút thực hành với Codex.
- 10 phút ghi lại lỗi, prompt hay, bài học rút ra.

Lộ trình chi tiết nằm trong `roadmap.md`.

## Tinh thần của tài liệu

Codex không biến bạn thành lập trình viên chuyên sâu sau một đêm. Nhưng Codex có thể giúp bạn biến ý tưởng thành bản demo thật nhanh hơn rất nhiều.

Bạn không cần biết hết mọi thứ để bắt đầu. Bạn chỉ cần biết cách mô tả đúng việc, kiểm tra kết quả, và cải thiện từng vòng.
