# Lumi Labs

**Biến ý tưởng thành sản phẩm bằng AI.**

Lumi Labs là homepage thương hiệu cá nhân chia sẻ cách dùng AI để tạo sản phẩm, công cụ, tài liệu, automation và demo thực tế dành cho người không chuyên lập trình.

Codex Zero To Hero là learning path đầu tiên. Sau này website có thể mở rộng sang Claude Code, ChatGPT, Gemini, Cursor, n8n, AI Office Tools và AI Automation.

## Tech stack

- React
- Vite
- TailwindCSS
- Framer Motion
- Vercel Web Analytics

## Chạy local

Cài dependencies:

```bash
npm install
```

Chạy dev server:

```bash
npm run dev
```

Build production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Deploy Vercel

Project đã sẵn sàng deploy lên Vercel.

```bash
vercel deploy --prod
```

Nếu dùng GitHub integration, chỉ cần push lên branch `main`, Vercel sẽ tự deploy.

## Vercel Web Analytics

Project đã tích hợp Analytics component trong `src/main.jsx`:

```jsx
import { Analytics } from "@vercel/analytics/react";

<Analytics />
```

Để bật analytics trên Vercel:

1. Vào project trên Vercel.
2. Mở tab **Analytics**.
3. Enable **Web Analytics**.
4. Deploy lại nếu Vercel yêu cầu.

Không cần backend, database, login hoặc API key.

## Nội dung hiện có

- Homepage Lumi Labs ở `src/App.jsx`
- Learning path đầu tiên: Codex Zero To Hero
- Tài liệu Markdown trong `chapters/`
- Prompt mẫu trong `prompts/`
- Project demo trong `projects/`
- Template trong `templates/`
