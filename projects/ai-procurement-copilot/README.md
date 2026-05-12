# AI Procurement Copilot

Demo production-ready cho AI Creator Hub: upload RFQ, AI bóc tách yêu cầu, đối chiếu catalog nội bộ, lịch sử bán, tồn kho, giá thị trường giả lập và tạo draft báo giá.

## App làm được gì?

- Upload RFQ: PDF, Excel, CSV, DOCX, TXT
- Nếu file đọc được: dùng nội dung file
- Nếu file khó đọc hoặc không có file: dùng sample RFQ
- Gọi Gemini qua `GEMINI_API_KEY` nếu có
- Nếu chưa có key: chạy bằng mock AI response
- Match sản phẩm với `data/products.json`
- Tính giá đề xuất và margin
- Xuất Excel gồm 4 sheet:
  - RFQ Summary
  - Extracted Requirements
  - AI Recommendations
  - Quotation Draft

## Cài đặt local

```bash
cd projects/ai-procurement-copilot
npm install
```

Tạo file `.env`:

```bash
GEMINI_API_KEY=your_gemini_key_here
PORT=8787
```

Không có `GEMINI_API_KEY` app vẫn chạy bằng mock data.

## Chạy local

Terminal 1:

```bash
npm run server
```

Terminal 2:

```bash
npm run dev
```

Mở:

```text
http://127.0.0.1:5174
```

## Demo flow để quay video

1. Mở app
2. Không cần upload file, bấm **Phân tích bằng AI**
3. Lumi Bot hiển thị trạng thái AI đang xử lý
4. Xem RFQ Summary
5. Xem bảng yêu cầu đã bóc tách
6. Xem AI Product Matching
7. Bấm **Xuất Excel báo giá**

## Deploy

### Cách dễ nhất

- Deploy frontend lên Vercel
- Deploy backend Express lên Render
- Set biến môi trường trên Render:

```bash
GEMINI_API_KEY=your_gemini_key_here
PORT=8787
```

- Set biến môi trường frontend trên Vercel:

```bash
VITE_API_URL=https://your-render-api-url
```

### Render start command

```bash
npm install && npm run server
```

### Vercel build command

```bash
npm install && npm run build
```

Output folder:

```bash
dist
```

## Ghi chú

Đây là demo để người non-tech hiểu quy trình AI procurement end-to-end. Không dùng dữ liệu thật khi chưa có kiểm duyệt bảo mật.
