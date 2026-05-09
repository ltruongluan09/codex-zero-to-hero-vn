# 21. API key và bảo mật

## Mục tiêu bài học

Biết các nguyên tắc bảo mật tối thiểu khi dùng AI API.

## Vì sao phần này quan trọng?

API key bị lộ có thể khiến người khác dùng tài khoản của bạn và phát sinh chi phí.

## Giải thích cực dễ hiểu

API key giống chìa khóa nhà. Không dán chìa khóa lên bảng thông báo công ty.

## Ví dụ thực tế ở Việt Nam

Bạn quay video demo và vô tình để lộ file chứa API key trên màn hình.

## Làm việc với Codex

Nhờ Codex kiểm tra chỗ có thể lộ key.

## Prompt mẫu

```text
Hãy kiểm tra project này có nguy cơ lộ API key không. Nếu có, hãy sửa theo cách dùng biến môi trường và cập nhật README hướng dẫn cấu hình.
```

## Codex sẽ tạo ra gì?

Bản sửa bảo mật cơ bản và hướng dẫn dùng `.env`.

## Cách kiểm tra kết quả

Tìm trong source code xem có key thật bị ghi trực tiếp không.

## Lỗi thường gặp

- Commit file `.env`.
- Dán key vào frontend.

## Bài tập thực hành

Viết checklist bảo mật 5 dòng cho chatbot AI.

## Checklist cuối bài

- [ ] Tôi biết API key là bí mật.
- [ ] Tôi biết dùng biến môi trường.
- [ ] Tôi biết không đưa key lên GitHub.

