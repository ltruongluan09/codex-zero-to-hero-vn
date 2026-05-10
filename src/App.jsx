import { useEffect, useMemo, useRef, useState } from "react";

const tools = [
  {
    name: "Claude",
    icon: "◐",
    color: "#7C3AED",
    desc: "AI đàm thoại thông minh nhất hiện nay",
    count: 12,
    tag: "Phổ biến",
    href: "#claude",
    posts: ["Claude cho người mới", "Viết tài liệu bằng Claude", "Claude vs ChatGPT"],
  },
  {
    name: "Codex",
    icon: "⌘",
    color: "#24292F",
    desc: "Viết và debug code bằng AI trong terminal",
    count: 8,
    tag: "Mới",
    href: "#codex",
    posts: ["Codex là gì?", "Build web đầu tiên", "Debug lỗi với Codex"],
  },
  {
    name: "ChatGPT",
    icon: "●",
    color: "#10A37F",
    desc: "Trợ lý AI đa năng của OpenAI",
    count: 15,
    tag: "Phổ biến",
    href: "#chatgpt",
    posts: ["Prompt căn bản", "Viết email với ChatGPT", "Tạo kế hoạch học AI"],
  },
  {
    name: "Cursor",
    icon: "◆",
    color: "#1A1A1A",
    desc: "IDE tích hợp AI, viết code nhanh gấp 10x",
    count: 6,
    tag: "Nâng cao",
    href: "#cursor",
    posts: ["Cursor cho người mới", "Sửa code trong editor", "Refactor bằng AI"],
  },
  {
    name: "Gemini",
    icon: "✦",
    color: "#4285F4",
    desc: "AI đa phương thức của Google",
    count: 5,
    tag: "Mới",
    href: "#gemini",
    posts: ["Gemini trong Google Workspace", "Tìm kiếm với Gemini", "Gemini cho tài liệu"],
  },
  {
    name: "Midjourney",
    icon: "✹",
    color: "#FF6B35",
    desc: "Tạo ảnh AI chất lượng cao bằng prompt",
    count: 7,
    tag: "",
    href: "#midjourney",
    posts: ["Prompt tạo ảnh", "Moodboard bằng AI", "Ảnh sản phẩm giả lập"],
  },
];

const goals = [
  {
    icon: "💻",
    title: "Viết code nhanh hơn",
    tools: "Codex, Cursor, GitHub Copilot",
    docs: ["Tạo app đầu tiên", "Sửa lỗi cơ bản", "Deploy lên Vercel"],
  },
  {
    icon: "✍️",
    title: "Tạo nội dung & copy",
    tools: "Claude, ChatGPT",
    docs: ["Viết email", "Tạo landing page copy", "Biên tập bài viết"],
  },
  {
    icon: "⚡",
    title: "Tự động hoá công việc",
    tools: "Claude, Zapier AI, Make",
    docs: ["Tự động báo cáo", "Tóm tắt email", "Workflow văn phòng"],
  },
  {
    icon: "🎨",
    title: "Thiết kế & tạo ảnh",
    tools: "Midjourney, DALL-E, Stable Diffusion",
    docs: ["Tạo ảnh hero", "Mockup sản phẩm", "Ý tưởng visual"],
  },
];

const featuredPosts = [
  {
    tool: "Codex",
    title: "Codex là gì? Cách hiểu cực dễ cho người chưa biết code",
    desc: "Xem Codex như một nhân viên kỹ thuật AI.",
    read: "5 phút đọc",
    views: "1.2k lượt xem",
  },
  {
    tool: "Claude",
    title: "Dùng Claude để biến ghi chú rời rạc thành tài liệu rõ ràng",
    desc: "Workflow viết tài liệu cho BA, PM và manager.",
    read: "7 phút đọc",
    views: "980 lượt xem",
  },
  {
    tool: "ChatGPT",
    title: "Prompt căn bản cho dân văn phòng muốn dùng AI hiệu quả",
    desc: "Công thức prompt dễ nhớ, dùng được ngay.",
    read: "6 phút đọc",
    views: "1.5k lượt xem",
  },
  {
    tool: "Codex",
    title: "Tạo landing page đầu tiên bằng AI trong một buổi tối",
    desc: "Từ ý tưởng đến website public trên Vercel.",
    read: "8 phút đọc",
    views: "860 lượt xem",
  },
  {
    tool: "Claude",
    title: "Claude cho BA/PM: chia yêu cầu thành task dễ làm",
    desc: "Biến yêu cầu mơ hồ thành checklist rõ ràng.",
    read: "6 phút đọc",
    views: "740 lượt xem",
  },
  {
    tool: "ChatGPT",
    title: "Tạo nội dung marketing bằng ChatGPT mà không bị chung chung",
    desc: "Cách đưa context để AI viết đúng khách hàng.",
    read: "5 phút đọc",
    views: "1.1k lượt xem",
  },
];

const promptOptions = [
  {
    id: "email",
    label: "📝 Viết email chuyên nghiệp",
    response: "Kính gửi [Tên],\n\nTôi muốn liên hệ về dự án mà đội ngũ của anh/chị đang triển khai. Tôi đã xem qua thông tin ban đầu và tin rằng chúng ta có thể trao đổi thêm để tìm ra hướng hợp tác phù hợp.\n\nTrân trọng,",
  },
  {
    id: "summary",
    label: "🔍 Tóm tắt tài liệu",
    response: "Tài liệu này đề cập đến 3 điểm chính:\n1. Vấn đề người dùng đang gặp phải.\n2. Giải pháp AI có thể hỗ trợ.\n3. Các bước triển khai đơn giản để bắt đầu.",
  },
  {
    id: "explain",
    label: "💡 Giải thích khái niệm khó",
    response: "Hãy tưởng tượng AI như một trợ lý siêu thông minh. Bạn đưa mục tiêu, ví dụ và giới hạn rõ ràng; trợ lý sẽ giúp bạn tạo bản nháp, kiểm tra và cải thiện từng bước.",
  },
];

const footerLinks = {
  "Theo tool": ["Claude", "Codex", "ChatGPT", "Cursor", "Gemini", "Midjourney"],
  "Theo mục tiêu": ["Viết code", "Tạo nội dung", "Automation", "Thiết kế ảnh"],
  "Về Lumi Labs": ["Giới thiệu", "Build in public", "Góp ý"],
};

function useTypewriter(text, speed = 30) {
  const [output, setOutput] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    setOutput("");
    setTyping(true);
    let index = 0;
    const timer = setInterval(() => {
      setOutput(text.slice(0, index + 1));
      index += 1;
      if (index >= text.length) {
        clearInterval(timer);
        setTimeout(() => setTyping(false), 600);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { output, typing };
}

function useScrollAnimations() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function Header() {
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <a href="#top" className="brand" aria-label="Lumi Labs">
          <SparkIcon />
          <span>Lumi Labs</span>
        </a>
        <nav className="nav-links" aria-label="Điều hướng chính">
          <a href="#tools">Tài liệu</a>
          <a href="#featured">Demo</a>
          <a href="#goals">So sánh</a>
          <a href="#featured">Prompt Library</a>
        </nav>
        <a className="btn btn-solid nav-cta" href="#tools">
          Bắt đầu
        </a>
      </div>
    </header>
  );
}

function SparkIcon() {
  return (
    <svg className="brand-icon" viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="12" fill="#4F46E5" />
      <path d="M20 7l2.8 8.4L31 18.2l-8.2 2.8L20 29l-2.8-8-8.2-2.8 8.2-2.8L20 7z" fill="white" />
    </svg>
  );
}

function PromptPlayground() {
  const [active, setActive] = useState(promptOptions[0]);
  const { output, typing } = useTypewriter(active.response, 30);

  return (
    <div className="playground animate-on-scroll">
      <div className="playground-header">
        <div>
          <p className="caption">Prompt Playground</p>
          <h2>Thử Claude ngay</h2>
        </div>
        <span className="online-dot" aria-label="Online" />
      </div>
      <div className="prompt-chips">
        {promptOptions.map((option) => (
          <button
            key={option.id}
            className={option.id === active.id ? "prompt-chip active" : "prompt-chip"}
            onClick={() => setActive(option)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
      <pre className="ai-output">
        {output}
        {typing ? <span className="cursor">|</span> : null}
      </pre>
      <a className="playground-link" href="#claude">
        Xem tài liệu đầy đủ về Claude →
      </a>
    </div>
  );
}

function ToolCard({ tool, index }) {
  return (
    <a
      href={tool.href}
      className="tool-card animate-on-scroll"
      style={{ "--tool-color": tool.color, transitionDelay: `${index * 50}ms` }}
    >
      <div className="tool-strip" />
      <div className="tool-head">
        <span className="tool-icon">{tool.icon}</span>
        <div>
          <h3>{tool.name}</h3>
          <p>{tool.desc}</p>
        </div>
      </div>
      <div className="tool-meta">
        <span>{tool.count} bài viết</span>
        {tool.tag ? <span className="pill">{tool.tag}</span> : null}
      </div>
      <div className="tool-preview">
        <strong>Bài nổi bật</strong>
        {tool.posts.map((post) => (
          <span key={post}>{post}</span>
        ))}
      </div>
    </a>
  );
}

function GoalCard({ goal, index }) {
  return (
    <article className="goal-card animate-on-scroll" style={{ transitionDelay: `${index * 60}ms` }}>
      <div className="goal-icon">{goal.icon}</div>
      <h3>{goal.title}</h3>
      <p>{goal.tools}</p>
      <ul>
        {goal.docs.map((doc) => (
          <li key={doc}>{doc}</li>
        ))}
      </ul>
    </article>
  );
}

function FeaturedCard({ post, index }) {
  const tool = tools.find((item) => item.name === post.tool);
  return (
    <a
      href="#featured"
      className="featured-card animate-on-scroll"
      style={{ "--tool-color": tool?.color ?? "#4F46E5", transitionDelay: `${index * 60}ms` }}
    >
      <div className="thumb" />
      <div className="featured-body">
        <span className="tool-tag">{post.tool}</span>
        <h3>{post.title}</h3>
        <p>{post.desc}</p>
        <div className="post-footer">
          <span>◷ {post.read}</span>
          <span>◉ {post.views}</span>
        </div>
      </div>
    </a>
  );
}

function Stats() {
  const stats = useMemo(
    () => [
      ["1,200+", "người dùng tin tưởng"],
      ["6", "tool AI phổ biến"],
      ["21", "ngày thử thách AI"],
    ],
    []
  );

  return (
    <div className="stats-row animate-on-scroll">
      {stats.map(([value, label]) => (
        <div key={label}>
          <strong>{value}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading animate-on-scroll">
      {eyebrow ? <span className="caption">{eyebrow}</span> : null}
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        {Object.entries(footerLinks).map(([group, links]) => (
          <div key={group}>
            <h3>{group}</h3>
            <ul>
              {links.map((link) => (
                <li key={link}>
                  <a href="#top">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-bottom">© 2025 Lumi Labs | Made with ❤️ cho cộng đồng AI Việt Nam</div>
    </footer>
  );
}

function App() {
  useScrollAnimations();

  return (
    <main id="top">
      <Header />

      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy animate-on-scroll">
            <div className="update-badge">✦ Cập nhật mới — Claude 4, Codex Agent</div>
            <h1>
              Học AI thực chiến
              <span>Không cần background kỹ thuật</span>
            </h1>
            <p>
              Tài liệu tiếng Việt + demo tương tác cho Codex, Claude, ChatGPT và các công cụ AI phổ biến nhất.
            </p>
            <div className="hero-actions">
              <a className="btn btn-solid" href="#tools">
                Xem tài liệu ngay →
              </a>
              <a className="btn btn-outline" href="#featured">
                Thử demo
              </a>
            </div>
            <div className="social-proof">★★★★★ Được 1,200+ người dùng tin tưởng</div>
          </div>
          <PromptPlayground />
        </div>
      </section>

      <Stats />

      <section id="tools" className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Theo công cụ"
            title="Chọn công cụ bạn muốn học"
            description="Mỗi tool có lộ trình ngắn, ví dụ rõ và demo để thử ngay."
          />
          <div className="tool-grid">
            {tools.map((tool, index) => (
              <ToolCard key={tool.name} tool={tool} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="goals" className="section section-muted">
        <div className="container">
          <SectionHeading
            eyebrow="Theo mục tiêu"
            title="Bạn muốn làm gì?"
            description="Không cần biết nên học tool nào trước. Hãy bắt đầu từ việc bạn muốn làm."
          />
          <div className="goal-grid">
            {goals.map((goal, index) => (
              <GoalCard key={goal.title} goal={goal} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="featured" className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Bài nổi bật"
            title="Tài liệu nổi bật"
            description="Các bài viết ngắn, dễ hiểu, phù hợp để bắt đầu trong 5–10 phút."
          />
          <div className="featured-grid">
            {featuredPosts.map((post, index) => (
              <FeaturedCard key={post.title} post={post} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-inner">
          <div>
            <h2>Bắt đầu hành trình AI của bạn hôm nay</h2>
            <p>Miễn phí. Không cần đăng ký. Học theo tốc độ của bạn.</p>
          </div>
          <a className="btn btn-light" href="#tools">
            Xem tất cả tài liệu →
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default App;
