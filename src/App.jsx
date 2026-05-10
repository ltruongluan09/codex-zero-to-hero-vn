import { useEffect, useRef, useState } from "react";

const navItems = [
  "Home",
  "Journey",
  "Projects",
  "21 Days",
  "Build Logs",
  "Resources",
  "About",
];

const phases = [
  { name: "Foundation", week: "Tuần 1-2", state: "done" },
  { name: "First Build", week: "Tuần 3-4", state: "done" },
  { name: "Ship Real", week: "Tuần 5-8", state: "current" },
  { name: "Scale Up", week: "Tuần 9-16", state: "future" },
  { name: "Creator", week: "Tuần 17+", state: "future" },
];

const toolColors = {
  Claude: { bg: "#1a1040", icon: "#818CF8", symbol: "●" },
  ChatGPT: { bg: "#0d2218", icon: "#10A37F", symbol: "●" },
  Cursor: { bg: "#0f0f1a", icon: "#8B8FA8", symbol: "▣" },
  Codex: { bg: "#0a1929", icon: "#378ADD", symbol: "</>" },
  Make: { bg: "#0d1a0d", icon: "#10B981", symbol: "⎇" },
};

const projects = [
  {
    title: "AI Email Writer",
    desc: "Tool viết email chuyên nghiệp từ vài gạch đầu dòng.",
    stack: ["Claude", "Cursor"],
    status: "Live",
    tool: "Claude",
    demoUrl: "https://codex-zero-to-hero-vn.vercel.app",
    codeUrl: "https://github.com/ltruongluan09/codex-zero-to-hero-vn",
  },
  {
    title: "HRM Assistant",
    desc: "Demo chatbot nội bộ cho onboarding và chính sách nhân sự.",
    stack: ["ChatGPT", "Codex"],
    status: "Building",
    tool: "ChatGPT",
    demoUrl: "#projects",
    codeUrl: "https://github.com/ltruongluan09/codex-zero-to-hero-vn",
  },
  {
    title: "Vercel Launch Page",
    desc: "Landing page public đầu tiên trong hành trình build AI.",
    stack: ["Codex", "Vercel"],
    status: "Live",
    tool: "Codex",
    demoUrl: "https://codex-zero-to-hero-vn.vercel.app",
    codeUrl: "https://github.com/ltruongluan09/codex-zero-to-hero-vn",
  },
];

const buildLogs = [
  {
    number: 23,
    title: "Khi Claude từ chối code của tôi - và cách tôi fix nó",
    meta: "Hôm nay · Claude · Cursor · 6 phút đọc",
  },
  {
    number: 22,
    title: "Deploy fail vì cấu hình Vercel, bài học nhỏ nhưng đau",
    meta: "Hôm qua · Codex · Vercel · 5 phút đọc",
  },
  {
    number: 21,
    title: "Từ prompt mơ hồ đến UI dùng được cho người không biết code",
    meta: "2 ngày trước · Codex · UX · 7 phút đọc",
  },
];

const resources = [
  { icon: "⌘", title: "Prompt Library", count: "47 prompts · Copy 1 click" },
  { icon: "▤", title: "Project Templates", count: "12 templates · Dễ chỉnh sửa" },
  { icon: "✦", title: "AI Tools Map", count: "25 tools · Chọn theo use case" },
];

const terminalLines = [
  ["$ lumi start --day=23", "muted"],
  ["✓ Project: AI Email Writer", "success"],
  ["✓ Stack: Claude + Cursor", "success"],
  ["→ Gặp lỗi: API rate limit", "brand"],
  ["  → Fix: exponential backoff", "muted"],
  ["✓ Shipped sau 3h 20m", "success"],
  ["⚡ 847 emails generated today", "warning"],
];

function slugify(value) {
  return value.toLowerCase().replaceAll(" ", "-");
}

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useCountUp() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-count]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = Number(el.getAttribute("data-count"));
          const suffix = el.getAttribute("data-suffix") ?? "";
          const start = performance.now();
          const duration = 1000;

          const update = (time) => {
            const progress = Math.min((time - start) / duration, 1);
            el.textContent = `${Math.floor(progress * target)}${suffix}`;
            if (progress < 1) requestAnimationFrame(update);
            else el.textContent = `${target}${suffix}`;
          };

          requestAnimationFrame(update);
          observer.unobserve(el);
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useTerminalTypewriter() {
  const ref = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const node = ref.current;
    if (!node) return;
    node.innerHTML = "";

    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    async function typeLine(text, cls) {
      const line = document.createElement("div");
      line.className = `term-line ${cls}`;
      node.appendChild(line);
      for (const char of text) {
        if (cancelled) return;
        line.textContent += char;
        await wait(18);
      }
      await wait(180);
    }

    async function run() {
      for (const [text, cls] of terminalLines) {
        await typeLine(text, cls);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return ref;
}

function SparkIcon() {
  return (
    <svg className="logo-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9L12 2z" />
      <path d="M19 15l.8 2.4L22 18l-2.2.6L19 21l-.8-2.4L16 18l2.2-.6L19 15z" />
    </svg>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={scrolled ? "site-nav scrolled" : "site-nav"}>
      <div className="nav-inner">
        <a className="logo" href="#home" onClick={() => setOpen(false)}>
          <SparkIcon />
          <span>Lumi Labs</span>
        </a>
        <nav className="desktop-nav" aria-label="Điều hướng chính">
          {navItems.map((item) => (
            <a key={item} className={item === "Home" ? "active" : ""} href={`#${slugify(item)}`}>
              {item}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <a className="nav-cta" href="#journey">Start Building →</a>
          <button className="menu-btn" type="button" onClick={() => setOpen(true)} aria-label="Mở menu">
            ☰
          </button>
        </div>
      </div>
      <div className={open ? "mobile-drawer open" : "mobile-drawer"}>
        <button className="drawer-close" type="button" onClick={() => setOpen(false)} aria-label="Đóng menu">
          ×
        </button>
        {navItems.map((item) => (
          <a key={item} href={`#${slugify(item)}`} onClick={() => setOpen(false)}>
            {item}
          </a>
        ))}
        <a className="nav-cta drawer-cta" href="#journey" onClick={() => setOpen(false)}>Start Building →</a>
      </div>
    </header>
  );
}

function LiveTerminal() {
  const terminalRef = useTerminalTypewriter();

  return (
    <div className="terminal" data-reveal>
      <div className="terminal-head">
        <div className="dots">
          <span className="dot red" />
          <span className="dot amber" />
          <span className="dot green" />
        </div>
        <span>build-log-23.sh</span>
      </div>
      <div className="terminal-body" ref={terminalRef} />
      <a className="terminal-foot" href="#build-logs">→ Đọc Build Log #23</a>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="hero-shell">
      <div className="hero-grid">
        <div className="hero-copy" data-reveal>
          <div className="badge-live">
            <span className="pulse-dot" />
            Đang build · Day 23 · Cập nhật hôm nay
          </div>
          <h1>
            Tôi đang build
            <br />
            sản phẩm <span>AI</span>
            <br />
            từ con số 0.
          </h1>
          <p>
            Không phải tutorial hoàn hảo - đây là nhật ký thật. Mọi thứ tôi học, fail,
            và ship bằng AI tools. Tất cả công khai, tất cả có demo.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#journey">Xem hành trình →</a>
            <a className="btn secondary" href="#projects">Browse Projects</a>
          </div>
          <div className="stats">
            <div><strong data-count="23">0</strong><span>ngày building</span></div>
            <div><strong data-count="8">0</strong><span>projects shipped</span></div>
            <div><strong data-count="47">0</strong><span>prompts shared</span></div>
            <div><strong data-count="1" data-suffix=".2k">0</strong><span>người follow</span></div>
          </div>
        </div>
        <LiveTerminal />
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section id="journey" className="section journey-section">
      <div className="section-head" data-reveal>
        <span className="section-label">AI Builder Journey</span>
        <h2>Con đường từ zero → builder</h2>
      </div>
      <div className="timeline" data-reveal>
        {phases.map((phase) => (
          <div key={phase.name} className={`phase ${phase.state}`}>
            <div className="phase-circle">{phase.state === "done" ? "✓" : phase.state === "current" ? "→" : ""}</div>
            <h3>{phase.name}</h3>
            <p>{phase.week}</p>
          </div>
        ))}
      </div>
      <a className="text-link" href="#journey">Xem toàn bộ lộ trình & bài học →</a>
    </section>
  );
}

function ProjectCard({ project }) {
  const color = toolColors[project.tool] ?? toolColors.Codex;
  return (
    <article className="project-card" data-reveal>
      <div className="project-preview" style={{ backgroundColor: color.bg }}>
        <span className="project-icon" style={{ color: color.icon }}>{color.symbol}</span>
        <span className={project.status === "Live" ? "status live" : "status building"}>{project.status}</span>
      </div>
      <div className="project-body">
        <div className="tag-row">
          {project.stack.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <h3>{project.title}</h3>
        <p>{project.desc}</p>
        <div className="project-links">
          <a href={project.demoUrl}>Demo ↗</a>
          <a href={project.codeUrl}>Code ↗</a>
        </div>
      </div>
    </article>
  );
}

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="section-head" data-reveal>
        <span className="section-label">Projects</span>
        <h2>Demo thật - không phải mockup</h2>
      </div>
      <div className="project-grid">
        {projects.map((project) => <ProjectCard key={project.title} project={project} />)}
      </div>
    </section>
  );
}

function BuildLogs() {
  return (
    <section id="build-logs" className="section logs-section">
      <div className="section-head" data-reveal>
        <span className="section-label">Build Logs</span>
        <h2>Nhật ký thật - không filter</h2>
      </div>
      <div className="log-list">
        {buildLogs.map((log, index) => (
          <a key={log.number} className={index === 0 ? "log-item latest" : "log-item"} href="#build-logs" data-reveal>
            <span className="log-num">#{log.number}</span>
            <span className="log-body">
              <strong>{log.title}</strong>
              <small>{log.meta}</small>
            </span>
          </a>
        ))}
      </div>
      <a className="text-link" href="#build-logs">Đọc tất cả 23 Build Logs →</a>
    </section>
  );
}

function Challenge() {
  const today = 8;
  const days = Array.from({ length: 21 }, (_, index) => index + 1);

  return (
    <section id="21-days" className="section">
      <div className="challenge-card" data-reveal>
        <div>
          <span className="challenge-badge">Challenge · Cộng đồng</span>
          <h2>21 ngày, 21 AI task thực chiến</h2>
          <p>Mỗi ngày 1 task cụ thể để bạn học bằng cách làm: prompt, tool, automation, demo, deploy.</p>
          <div className="progress-bar"><span style={{ width: `${(today / 21) * 100}%` }} /></div>
          <small>Day 8 / 21 · 127 người đang tham gia</small>
          <a className="btn primary" href="#21-days">Tham gia ngay - miễn phí →</a>
        </div>
        <div className="heatmap" aria-label="21 ngày thử thách">
          {days.map((day) => (
            <span key={day} className={day < today ? "done" : day === today ? "today" : "future"} title={`Day ${day}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Resources() {
  return (
    <section id="resources" className="section resources-section">
      <div className="resources-grid">
        {resources.map((item) => (
          <a key={item.title} className="resource-card" href="#resources" data-reveal>
            <span>{item.icon}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.count}</p>
            </div>
            <strong>Xem →</strong>
          </a>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="about" className="footer">
      <a className="logo" href="#home">
        <SparkIcon />
        <span>Lumi Labs</span>
      </a>
      <span>Building publicly · 2025</span>
      <span>Made with AI</span>
    </footer>
  );
}

function App() {
  useReveal();
  useCountUp();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Journey />
        <Projects />
        <BuildLogs />
        <Challenge />
        <Resources />
      </main>
      <Footer />
    </>
  );
}

export default App;
