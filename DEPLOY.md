# Deploy website Codex Zero To Hero Việt Nam

Flow mục tiêu:

```text
Project
  ↓
Push GitHub
  ↓
Connect Vercel
  ↓
Public website
```

## 1. Project

Website đã có file chính:

```text
index.html
```

Khi deploy, Vercel sẽ mở file này ở trang chủ.

## 2. Push GitHub

Nếu máy đã có Git:

```bash
git init
git add .
git commit -m "Initial Codex Zero To Hero VN website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/codex-zero-to-hero-vn.git
git push -u origin main
```

Nếu chưa có Git, có thể tạo repo trên GitHub rồi upload toàn bộ folder bằng giao diện web.

## 3. Connect Vercel

1. Vào Vercel.
2. Chọn Add New Project.
3. Import repo `codex-zero-to-hero-vn`.
4. Framework Preset: Other.
5. Build Command: để trống.
6. Output Directory: để trống.
7. Bấm Deploy.

## 4. Public website

Sau khi deploy xong, Vercel sẽ tạo link dạng:

```text
https://codex-zero-to-hero-vn.vercel.app
```

Gửi link này cho người khác là họ có thể xem website.

## Ghi chú

Project hiện là static website thuần HTML/CSS/JS, không cần server, không cần API key, không cần build command.
