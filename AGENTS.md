# Lumi Labs Agent Notes

## Default Delivery Flow

- Khi hoàn tất một task code/content cho Lumi Labs, hãy chạy validation phù hợp trước khi kết thúc.
- Mặc định chạy:
  - `npm run audit:content`
  - `npm run test:smoke`
  - `npm run build`
- Nếu validation pass và task đã hoàn tất, commit thay đổi với message rõ scope.
- Sau khi commit, push lên `origin main` để Vercel production tự deploy.
- Chỉ không commit/push khi user nói rõ là chưa muốn đưa production hoặc yêu cầu chỉ review/plan.

## Production Mindset

- Lumi Labs đang public, nên mọi thay đổi phải giữ trải nghiệm mobile, tránh dead click, tránh text lỗi encoding, tránh route 404.
- Với MVP/tool mới, phải đưa vào kiến trúc scale qua registry nếu đó là demo thật người dùng có thể truy cập.
- Ưu tiên trải nghiệm non-tech: nhìn vào hiểu ngay, CTA rõ, không nhồi quá nhiều thông tin.
