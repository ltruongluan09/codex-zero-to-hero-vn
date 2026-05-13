# Deploy website Lumi Labs / LuanAI

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

Domain chính của website:

```text
https://luanai.io.vn
```

Domain Vercel mặc định vẫn có thể tồn tại để debug, nhưng khi chia sẻ công khai nên dùng `https://luanai.io.vn`.

Nếu cấu hình thêm `www`, nên redirect:

```text
www.luanai.io.vn → luanai.io.vn
```

## Ghi chú

Project hiện là frontend thuần React/Vite, không cần backend, database, login hoặc API key.
