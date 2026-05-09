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

Website hiện là React/Vite app. File chính:

```text
src/App.jsx
```

Vite sẽ build ra thư mục `dist/` khi deploy.

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
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Bấm Deploy.

## 4. Public website

Sau khi deploy xong, Vercel sẽ tạo link dạng:

```text
https://codex-zero-to-hero-vn.vercel.app
```

Gửi link này cho người khác là họ có thể xem website.

## Ghi chú

Project hiện là frontend thuần React/Vite, không cần backend, database, login hoặc API key.
