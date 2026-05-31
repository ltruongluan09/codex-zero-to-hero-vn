# Lumi Labs

Lumi Labs là AI Creator Hub tiếng Việt dành cho người non-tech: thử demo AI, đọc bài học thực chiến, theo dõi hành trình build sản phẩm AI thật.

Website hiện chạy tại:

- Production: `https://www.luanai.io.vn`
- Stack: React + Vite + Vercel Serverless Functions

## Mục tiêu sản phẩm

- Build nhanh các MVP AI nhỏ, dùng được ngay.
- Viết bài học AI dễ hiểu cho người mới.
- Ghi lại hành trình build thật để người đọc có thể làm theo.
- Dẫn người dùng từ demo → hiểu giá trị → feedback/community.

## Cấu trúc quan trọng

```text
src/
  App.jsx                    # Router mỏng, chỉ ghép layout/page
  app/
    auth/
      useAuth.js             # Supabase Auth, profile, follow project
    hooks/
      useReveal.js           # Scroll reveal animation
    routes/
      DashboardPage.jsx      # Khu bắt đầu nhanh sau login
      HomePage.jsx           # Trang chủ
      ProjectsPage.jsx       # Trang danh sách demo/project
  components/layout/
    SiteHeader.jsx           # Header/navigation
    SiteFooter.jsx           # Footer
    LoginModal.jsx           # Modal đăng nhập
    UserMenu.jsx             # Menu user sau login
  components/lumi/
    LumiAssistant.jsx        # Lumi Bot dẫn đường xuyên suốt Hub
    LumiFeedbackCard.jsx     # Feedback chung cho các MVP
  features/
    caption-ai/
      CaptionAISection.jsx   # Tool Caption AI
    docscan-ai/
      DocScanAISection.jsx   # Tool DocScan AI
  content/
    articles.js              # Registry bài viết/bài học
    projects.js              # Registry MVP/tool
    navigation.js            # Route và navigation chính
  supabaseClient.js          # Supabase Auth client
  clarity.js                 # Microsoft Clarity loader

api/
  analyze-document.js        # DocScan AI
  generate-caption.js        # Caption AI
  mini-lab.js                # Lab thực hành trong bài viết
  feedback.js                # Feedback người dùng
  subscribe.js               # Subscribe/follow
  _rate-limit.js             # Rate limit đơn giản

public/
  bai-viet.html              # Kho bài viết
  *.html                     # Bài viết, series, project journey
  lumi-bot.png               # Lumi Bot

tools/
  content-audit.mjs          # Kiểm tra registry/content
  smoke-test.mjs             # Smoke test route/link/API cơ bản

docs/
  ARCHITECTURE.md            # Quy chuẩn scale repo
```

## Chạy local

```bash
npm install
npm run dev
```

Build production:

```bash
npm run build
```

## Kiểm tra trước khi public

Chạy đủ 3 lệnh:

```bash
npm run audit:content
npm run test:smoke
npm run build
```

Ý nghĩa:

- `audit:content`: kiểm bài viết/project trong registry có đủ field, link đúng file.
- `test:smoke`: kiểm route chính, bài viết, mini lab, API rate limit.
- `build`: kiểm production build không lỗi.

## Thêm một MVP mới

1. Thêm project vào `src/content/projects.js`.
2. Nếu có demo riêng, tạo route/page trong React app.
3. Nếu cần AI, thêm API trong `api/`.
4. Nếu có hành trình build, thêm file HTML trong `public/`.
5. Chạy `npm run audit:content`, `npm run test:smoke`, `npm run build`.

Mỗi MVP nên có:

- tên dễ hiểu
- một câu mô tả lợi ích
- CTA dùng thử rõ ràng
- nhóm người dùng chính
- 2-4 use case cụ thể
- trạng thái `ready`, `planned`, hoặc `idea`
- link hành trình build nếu đã có

## Thêm một bài viết/bài học

1. Tạo file HTML trong `public/`.
2. Thêm metadata vào `src/content/articles.js`.
3. Đảm bảo `public/bai-viet.html` có link tới bài.
4. Nếu bài có thực hành, dùng mini lab và kiểm bằng smoke test.

Mỗi bài nên phục vụ người non-tech:

- mở đầu bằng vấn đề đời thường
- ví dụ gần công việc Việt Nam
- có prompt hoặc thao tác làm thử
- có kết quả đúng trông như thế nào
- có bước tiếp theo rõ ràng

Metadata bắt buộc nằm trong `src/content/articles.js`:

- `type`: `article`, `series`, `session`, hoặc `project-journey`
- `difficulty`: `beginner`, `practical`, hoặc `advanced`
- `category`
- `tool`
- `audience`
- `publishedAt` nếu bài đã public

## Biến môi trường

Tùy feature đang bật, Vercel có thể cần:

```text
GEMINI_API_KEY
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
VITE_CLARITY_PROJECT_ID
```

Không đưa secret vào frontend hoặc commit vào repo.

## Deploy

Nếu dùng GitHub integration, push lên `main` để Vercel tự deploy.

Deploy thủ công:

```bash
vercel deploy --prod
```

## Quy tắc scale

Nếu thêm một bài viết hoặc một MVP mà phải sửa nhiều nơi thủ công, cần đưa dữ liệu đó về `src/content/` trước. Registry là nguồn dữ liệu trung tâm để tránh mất kiểm soát khi Lumi Labs có nhiều tool và nhiều bài học hơn.
