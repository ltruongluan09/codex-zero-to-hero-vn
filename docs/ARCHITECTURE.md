# Lumi Labs Architecture

Mục tiêu của repo là scale nhanh nhiều MVP AI và nhiều bài học AI mà không mất kiểm soát.

## Nguyên tắc chính

1. Một nội dung chỉ khai báo ở một nơi.
2. Mỗi MVP là một module độc lập.
3. Homepage, Projects và Kho bài học đọc từ registry chung.
4. Auth, layout, route và feature không để lẫn trong một file lớn.
5. Trước khi public, mọi route quan trọng phải có smoke test.
6. UI giữ đơn giản cho người non-tech: nhìn thấy gì, bấm gì, nhận kết quả gì.

## Cấu trúc React hiện tại

```text
src/
  App.jsx                         # Router mỏng, chỉ ghép page/layout
  app/
    auth/useAuth.js               # Supabase Auth, profile, follow project
    hooks/useReveal.js            # Scroll reveal animation
    routes/
      HomePage.jsx
      ProjectsPage.jsx
      DashboardPage.jsx
  components/
    layout/
      SiteHeader.jsx
      SiteFooter.jsx
      LoginModal.jsx
      Logo.jsx
      UserMenu.jsx
    lumi/
      LumiAssistant.jsx
      LumiFeedbackCard.jsx
  features/
    caption-ai/CaptionAISection.jsx
    docscan-ai/DocScanAISection.jsx
  content/
    articles.js
    projects.js
    navigation.js
```

Quy tắc: `App.jsx` không chứa business logic dài. Khi thêm page/tool mới, tạo file riêng trong `app/routes` hoặc `features`, rồi chỉ nối route trong `App.jsx`.

## Content registry

Các danh sách trung tâm nằm trong `src/content/`.

- `src/content/projects.js`: quản lý toàn bộ MVP/tool.
- `src/content/articles.js`: quản lý toàn bộ bài viết, bài học, series.
- `src/content/navigation.js`: quản lý route và navigation chính.

Khi thêm project hoặc bài viết mới, ưu tiên thêm vào registry trước rồi mới nối UI.

## Project contract

Mỗi MVP nên có đủ:

- `slug`: mã ổn định, không đổi sau khi public.
- `type`: `tool`, `assistant`, `automation`, hoặc `template`.
- `title`: tên dễ hiểu.
- `desc`: mô tả một câu.
- `outcome`: người dùng được lợi gì.
- `status`: text hiển thị.
- `stage`: `ready`, `planned`, hoặc `idea`.
- `href`: route dùng thử.
- `journeyHref`: bài kể hành trình build.
- `tool`: tên tool hiển thị.
- `audience`: nhóm người dùng chính.
- `useCases`: 2-4 việc người dùng làm được.
- `publishedAt`: bắt buộc nếu `stage` là `ready`.
- API riêng trong `api/` nếu cần AI.
- smoke test kiểm route/link chính.

Ví dụ:

```js
{
  slug: "docscan-ai",
  title: "DocScan AI",
  desc: "Một chạm để AI đọc nhanh tài liệu.",
  outcome: "Giúp dân văn phòng hiểu tài liệu nhanh hơn.",
  type: "tool",
  stage: "ready",
  href: "/docscan-ai",
  journeyHref: "/project-02-docscan-ai.html",
  tool: "DocScan AI",
  audience: ["office", "founder", "nonTech"],
  useCases: ["Đọc tài liệu", "Tóm tắt ý chính", "Chỉ ra điểm cần hỏi lại"],
  publishedAt: "2026-05-18"
}
```

## Article contract

Mỗi bài học/bài viết nên có:

- `slug`
- `type`: `article`, `series`, `session`, hoặc `project-journey`
- `title`
- `desc`
- `href`
- `tag`
- `difficulty`: `beginner`, `practical`, `advanced`
- `level`: giữ để tương thích UI cũ, thường giống `difficulty`
- `category`: `prompt`, `office`, `document`, `codex`, ...
- `tool`: tool/liên hệ chính của bài
- `audience`: nhóm người đọc chính
- `status`: `published` hoặc `draft`
- `publishedAt`: bắt buộc nếu `status` là `published`
- `hasMiniLab`: bài có thực hành mô phỏng hay không
- `priority`: thứ tự hiển thị

## Feature module contract

Mỗi tool trong `src/features/` nên tự chứa:

- UI chính của tool.
- State loading/success/error.
- Copy rõ ràng cho người non-tech.
- Call tới API serverless, không để API key ở frontend.
- Feedback hoặc trạng thái sau khi user nhận kết quả.

Nếu tool vượt quá một file dài, tách tiếp thành:

```text
features/my-tool/
  MyToolPage.jsx
  components/
  hooks/
  constants.js
```

## Checklist trước khi public

Chạy:

```bash
npm run audit:content
npm run test:smoke
npm run build
```

Kiểm thủ công:

- Mobile homepage
- `/projects`
- `/caption-ai`
- `/docscan-ai`
- `/bai-viet.html`
- Ít nhất một bài mini lab
- login/logout nếu có thay đổi auth

## Quy tắc scale

Nếu một thay đổi bắt buộc sửa trên 3 file để thêm một bài hoặc một project, cần đưa phần đó về registry hoặc component chung trước.
