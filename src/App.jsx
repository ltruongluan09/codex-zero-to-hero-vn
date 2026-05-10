const tools = [
  {
    icon: "⌘",
    name: "Codex",
    description: "Viết code bằng AI ngay trong terminal.",
    href: "#codex",
  },
  {
    icon: "🟣",
    name: "Claude",
    description: "Phân tích, viết tài liệu và hỗ trợ coding.",
    href: "#claude",
  },
  {
    icon: "💬",
    name: "ChatGPT",
    description: "Hỏi đáp, viết nội dung và tạo ý tưởng.",
    href: "#chatgpt",
  },
  {
    icon: "🧭",
    name: "Cursor",
    description: "Code nhanh hơn trong editor có AI.",
    href: "#cursor",
  },
  {
    icon: "✨",
    name: "Gemini",
    description: "Trợ lý AI cho tìm kiếm và công việc Google.",
    href: "#gemini",
  },
  {
    icon: "🎨",
    name: "Midjourney",
    description: "Tạo hình ảnh đẹp từ mô tả ngắn.",
    href: "#midjourney",
  },
];

const goals = [
  {
    icon: "💻",
    title: "Viết code nhanh hơn",
    description: "Dùng AI để tạo app, sửa lỗi và hiểu project.",
  },
  {
    icon: "✍️",
    title: "Tạo nội dung & copywriting",
    description: "Viết bài, email, kịch bản, mô tả sản phẩm.",
  },
  {
    icon: "⚡",
    title: "Tự động hoá công việc",
    description: "Tạo workflow, xử lý dữ liệu và giảm việc lặp lại.",
  },
  {
    icon: "🎨",
    title: "Thiết kế & tạo ảnh",
    description: "Tạo visual, mockup, concept và tài sản marketing.",
  },
];

const latestPosts = [
  {
    tool: "Codex",
    title: "Codex là gì? Giải thích cho người chưa biết code",
    description: "Hiểu Codex như một cộng sự kỹ thuật AI.",
    readTime: "6 phút đọc",
    href: "#post-codex-intro",
  },
  {
    tool: "Codex",
    title: "Tạo website đầu tiên bằng Codex",
    description: "Từ prompt tiếng Việt đến trang web chạy được.",
    readTime: "9 phút đọc",
    href: "#post-codex-website",
  },
  {
    tool: "Claude",
    title: "Dùng Claude để viết tài liệu rõ hơn",
    description: "Biến ghi chú rời rạc thành tài liệu dễ đọc.",
    readTime: "7 phút đọc",
    href: "#post-claude-docs",
  },
  {
    tool: "Claude",
    title: "Claude cho BA/PM: phân tích yêu cầu nhanh",
    description: "Tóm tắt, chia task và tìm rủi ro nghiệp vụ.",
    readTime: "8 phút đọc",
    href: "#post-claude-ba",
  },
  {
    tool: "ChatGPT",
    title: "Prompt cơ bản cho dân văn phòng",
    description: "Cách viết prompt rõ để AI trả lời đúng việc.",
    readTime: "5 phút đọc",
    href: "#post-chatgpt-prompt",
  },
  {
    tool: "ChatGPT",
    title: "Tạo nội dung marketing bằng ChatGPT",
    description: "Từ ý tưởng thô đến bản copy có thể dùng.",
    readTime: "6 phút đọc",
    href: "#post-chatgpt-copy",
  },
];

const footerLinks = {
  "Theo tool": ["Codex", "Claude", "ChatGPT", "Cursor", "Gemini", "Midjourney"],
  "Theo mục tiêu": ["Viết code", "Tạo nội dung", "Automation", "Thiết kế ảnh"],
  "Về Lumi Labs": ["Giới thiệu", "Build in public", "Góp ý"],
};

const toolTagStyles = {
  Codex: "bg-indigo-50 text-indigo-700 ring-indigo-100",
  Claude: "bg-violet-50 text-violet-700 ring-violet-100",
  ChatGPT: "bg-slate-100 text-slate-700 ring-slate-200",
};

function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-4 md:px-6">
        <a href="#top" className="flex shrink-0 items-center gap-3" aria-label="Lumi Labs">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-indigo-600 text-base font-black text-white shadow-sm">
            L
          </span>
          <span className="text-lg font-black tracking-tight text-slate-950">Lumi Labs</span>
        </a>

        <label className="mx-auto hidden w-full max-w-xl items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500 shadow-sm md:flex">
          <span className="text-lg">⌕</span>
          <input
            className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
            placeholder="Tìm tài liệu... (ví dụ: Claude, Codex, prompt)"
            aria-label="Tìm tài liệu"
          />
        </label>
      </div>

      <div className="px-4 pb-4 md:hidden">
        <label className="mx-auto flex w-full max-w-6xl items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500 shadow-sm">
          <span className="text-lg">⌕</span>
          <input
            className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
            placeholder="Tìm tài liệu..."
            aria-label="Tìm tài liệu"
          />
        </label>
      </div>
    </header>
  );
}

function SectionHeading({ title, description }) {
  return (
    <div className="mb-8 max-w-2xl">
      <h2 className="text-2xl font-black tracking-tight text-slate-950 md:text-3xl">{title}</h2>
      {description ? <p className="mt-3 text-base leading-7 text-slate-600">{description}</p> : null}
    </div>
  );
}

function ToolCard({ tool }) {
  return (
    <a
      href={tool.href}
      className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/50"
    >
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
        {tool.icon}
      </div>
      <h3 className="text-xl font-black text-slate-950">{tool.name}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{tool.description}</p>
      <span className="mt-5 inline-flex text-sm font-bold text-indigo-600 group-hover:text-indigo-700">
        Xem tài liệu →
      </span>
    </a>
  );
}

function GoalCard({ goal }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 text-3xl">{goal.icon}</div>
      <h3 className="text-xl font-black text-slate-950">{goal.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{goal.description}</p>
    </article>
  );
}

function PostCard({ post }) {
  return (
    <a
      href={post.href}
      className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/50"
    >
      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ring-1 ${toolTagStyles[post.tool]}`}>
        {post.tool}
      </span>
      <h3 className="mt-4 text-lg font-black leading-snug text-slate-950 group-hover:text-indigo-700">
        {post.title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{post.description}</p>
      <div className="mt-5 text-sm font-semibold text-slate-500">{post.readTime}</div>
    </a>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1.2fr_1fr_1fr_1fr] md:px-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-indigo-600 text-base font-black text-white">
              L
            </span>
            <span className="text-lg font-black text-slate-950">Lumi Labs</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-6 text-slate-600">
            Tài liệu tiếng Việt giúp người không chuyên dùng AI để tạo sản phẩm và công cụ thật.
          </p>
        </div>

        {Object.entries(footerLinks).map(([group, links]) => (
          <div key={group}>
            <h3 className="text-sm font-black text-slate-950">{group}</h3>
            <ul className="mt-4 grid gap-3">
              {links.map((link) => (
                <li key={link}>
                  <a href="#top" className="text-sm text-slate-600 hover:text-indigo-600">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}

function App() {
  return (
    <main id="top" className="min-h-screen bg-slate-50 text-slate-950">
      <Header />

      <section className="border-b border-slate-200 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,.16),transparent_38%),linear-gradient(180deg,#ffffff,#f8fafc)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1.05fr_.95fr] md:px-6 md:py-24">
          <div className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit rounded-full bg-indigo-50 px-4 py-2 text-sm font-black text-indigo-700 ring-1 ring-indigo-100">
              Tài liệu AI tiếng Việt cho người mới
            </div>
            <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-slate-950 md:text-6xl">
              Học AI — Không cần biết code
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
              Tài liệu tiếng Việt về Codex, Claude, ChatGPT và các công cụ AI phổ biến nhất
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#tools"
                className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-6 py-4 text-sm font-black text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
              >
                Bắt đầu từ đây →
              </a>
              <a
                href="#latest"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-black text-slate-900 shadow-sm transition hover:border-indigo-200 hover:text-indigo-700"
              >
                Xem tất cả tài liệu
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70">
            <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-indigo-200">Lộ trình đề xuất</p>
                  <h2 className="mt-1 text-2xl font-black">Bắt đầu với Codex</h2>
                </div>
                <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-black text-indigo-100">
                  Beginner
                </span>
              </div>
              <div className="grid gap-3">
                {["Codex là gì?", "Viết prompt đầu tiên", "Tạo project nhỏ", "Deploy lên Vercel"].map((item, index) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/8 p-3">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-sm font-black text-indigo-600">
                      {index + 1}
                    </span>
                    <span className="text-sm font-bold text-slate-100">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tools" className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <SectionHeading title="Bạn muốn học tool nào?" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <SectionHeading title="Bạn muốn làm gì?" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {goals.map((goal) => (
            <GoalCard key={goal.title} goal={goal} />
          ))}
        </div>
      </section>

      <section id="latest" className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <SectionHeading
          title="Tài liệu mới nhất"
          description="Các bài viết ngắn, dễ hiểu, tập trung vào việc áp dụng AI vào công việc thật."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <PostCard key={post.title} post={post} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default App;
