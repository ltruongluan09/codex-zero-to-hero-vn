# DocScan AI

Project #2 của Lumi Labs.

## Triết lý

One touch, edit magic.

Người dùng không cần hiểu công nghệ phía sau. Họ chỉ cần:

1. Thả tài liệu vào.
2. Bấm một nút.
3. Nhận bản đọc nhanh.
4. Chỉnh lại, copy hoặc hỏi tiếp.

## Mục tiêu

Giúp người không chuyên đọc nhanh hợp đồng, báo giá, file Excel hoặc báo cáo.

DocScan AI không thay thế luật sư, kế toán hay chuyên gia. Nó chỉ giúp người dùng có một điểm bắt đầu rõ ràng hơn trước khi ký, duyệt hoặc hỏi lại.

## Trang demo

`/docscan-ai`

Link cũ `/soi-tai-lieu` vẫn được giữ để tránh gãy đường dẫn.

## Công nghệ

- Frontend: React/Vite trong Lumi Labs.
- API: `/api/analyze-document`.
- AI: Gemini qua `GEMINI_API_KEY`.
- Word/Excel: `mammoth`, `xlsx`.
- Có fallback demo nếu API key lỗi hoặc chưa được cấu hình.
