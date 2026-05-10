import { useEffect, useState } from "react";

const navItems = [
  { label: "Trang chủ", href: "#home" },
  { label: "Hành trình", href: "#journey" },
  { label: "Tool AI", href: "#value" },
  { label: "Thử thách 21 ngày", href: "#challenge" },
  { label: "Cộng đồng", href: "#community" },
];

const whoOptions = [
  {
    icon: "🙋",
    tone: "indigo",
    title: "Tôi muốn học dùng AI",
    desc: "Chưa biết gì, muốn bắt đầu từ số 0",
  },
  {
    icon: "✍️",
    tone: "green",
    title: "Tôi muốn tạo tool AI của mình",
    desc: "Có ý tưởng, không biết bắt đầu từ đâu",
  },
  {
    icon: "👀",
    tone: "amber",
    title: "Tôi muốn theo dõi hành trình",
    desc: "Xem một người xây Hub AI từ ngày 1",
  },
];

const valueCards = [
  {
    icon: "📖",
    title: "Nhật ký hành trình thật",
    desc: "Tôi ghi lại mọi quyết định, mọi lần fail, mọi thứ học được khi xây Hub này. Không filter.",
    tag: "⬤ Đang viết",
    active: true,
  },
  {
    icon: "🛠️",
    title: "Tool AI dùng được ngay",
    desc: "Mỗi tool tôi tạo đều có link thử trực tiếp. Không cần tài khoản, không cần kỹ thuật.",
    tag: "⬤ Tool đầu tiên: Tháng 6/2026",
    active: true,
  },
  {
    icon: "🎯",
    title: "Công thức AI cho người mới",
    desc: "Những câu hỏi tôi dùng hàng ngày để làm việc với AI. Copy về dùng luôn, miễn phí.",
    tag: "Sắp có",
    active: false,
  },
];

const timelineItems = [
  {
    date: "Tháng 5 · 2026 — Hôm nay",
    title: "Ra mắt Lumi Labs Hub",
    desc: "Website này vừa được tạo ra. Thiết kế, nội dung, định hướng — tất cả đang được xây ngay lúc bạn đọc bài này.",
    badge: "⬤ Đang xảy ra",
    state: "now",
  },
  {
    date: "Tháng 5 · 2026 — Tuần 2",
    title: "Khởi động Thử thách 21 ngày AI",
    desc: "Mỗi ngày 1 việc AI thực tế dành cho người mới hoàn toàn. Miễn phí. Cùng nhau làm.",
    badge: "Sắp diễn ra",
    state: "soon",
  },
  {
    date: "Tháng 6 · 2026",
    title: "Ra mắt tool AI đầu tiên",
    desc: "Tool thật, có thể dùng ngay. Tôi ghi lại toàn bộ quá trình — từ ý tưởng đến lúc hoạt động.",
    badge: "Đang lên kế hoạch",
    state: "future",
  },
  {
    date: "Tháng 7 · 2026",
    title: "Xây dựng Cộng đồng + Zoom định kỳ",
    desc: "Gặp nhau online, chia sẻ tool, học cùng nhau. Không phải khóa học — là cộng đồng builder thật.",
    badge: "Đang lên kế hoạch",
    state: "future",
  },
];

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
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function Logo() {
  return (
    <a className="logo" href="#home" aria-label="Lumi Labs">
      <span className="logo-dot" />
      <span>Lumi Labs</span>
    </a>
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
        <Logo />
        <nav className="nav-links" aria-label="Điều hướng chính">
          {navItems.map((item, index) => (
            <a key={item.label} className={index === 0 ? "active" : ""} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <a className="nav-cta" href="#journey">Theo dõi hành trình →</a>
          <button className="hamburger" type="button" onClick={() => setOpen(true)} aria-label="Mở menu">
            ☰
          </button>
        </div>
      </div>
      <div className={open ? "mobile-drawer open" : "mobile-drawer"}>
        <button className="drawer-close" type="button" onClick={() => setOpen(false)} aria-label="Đóng menu">
          ×
        </button>
        {navItems.map((item) => (
          <a key={item.label} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
        <a className="nav-cta drawer-cta" href="#journey" onClick={() => setOpen(false)}>
          Theo dõi hành trình →
        </a>
      </div>
    </header>
  );
}

function WhoCard() {
  const [active, setActive] = useState(0);

  return (
    <aside className="who-card" data-reveal>
      <p className="card-kicker">Bạn muốn gì từ Lumi Labs?</p>
      <div className="who-list">
        {whoOptions.map((option, index) => (
          <button
            key={option.title}
            className={active === index ? "who-opt active" : "who-opt"}
            type="button"
            onClick={() => setActive(index)}
          >
            <span className={`who-icon ${option.tone}`}>{option.icon}</span>
            <span>
              <strong>{option.title}</strong>
              <small>{option.desc}</small>
            </span>
            <b>→</b>
          </button>
        ))}
      </div>
      <div className="follow-bar">
        <span>Theo dõi để không bỏ lỡ</span>
        <div>
          <a href="#community">TikTok</a>
          <a href="#community">Facebook</a>
          <a href="#community">Threads</a>
        </div>
      </div>
    </aside>
  );
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-copy" data-reveal>
        <div className="badge-start">
          <span className="pulse-dot" />
          Tháng 5 · 2026 · Ngày đầu tiên
        </div>
        <h1 className="hero-h1">
          Hôm nay tôi bắt đầu
          <br />
          xây dựng <span>Lumi Labs</span>
          <br />
          <em>— từ con số 0.</em>
        </h1>
        <p>
          Không phải bài hướng dẫn được dàn dựng sẵn. Đây là hành trình <strong>thật</strong> —
          từ ý tưởng → Hub → Cộng đồng → Sản phẩm. Tôi ghi lại tất cả. Bạn theo dõi cùng tôi.
        </p>
        <div className="hero-actions">
          <a className="btn primary" href="#journey">Theo dõi hành trình →</a>
          <a className="btn secondary" href="#value">Lumi Labs là gì?</a>
        </div>
        <div className="proof-row">
          <div><strong>Ngày 1</strong><span>Tháng 5 · 2026</span></div>
          <div><strong>0 → ?</strong><span>hành trình bắt đầu</span></div>
          <div><strong>∞</strong><span>chia sẻ hoàn toàn</span></div>
        </div>
      </div>
      <WhoCard />
    </section>
  );
}

function ValueSection() {
  return (
    <section id="value" className="section">
      <div className="section-head" data-reveal>
        <span className="section-label">Tại sao xem trang này?</span>
        <h2>Bạn sẽ <strong>thấy được</strong>, không chỉ nghe kể</h2>
      </div>
      <div className="cards-grid">
        {valueCards.map((card) => (
          <article key={card.title} className={card.active ? "value-card active" : "value-card"} data-reveal>
            <span className="value-icon">{card.icon}</span>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
            <small>{card.tag}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function JourneySection() {
  return (
    <section id="journey" className="section journey-section">
      <div className="section-head" data-reveal>
        <span className="section-label">Hành trình · Tháng 5/2026</span>
        <h2>Đang xảy ra <strong>ngay lúc này</strong></h2>
      </div>
      <div className="journey-line">
        {timelineItems.map((item) => (
          <article key={item.title} className={`timeline-item ${item.state}`} data-reveal>
            <span className="timeline-dot" />
            <div className="timeline-content">
              <span className="timeline-date">{item.date}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <span className={`timeline-badge ${item.state}`}>{item.badge}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ChallengeSection() {
  const days = Array.from({ length: 21 }, (_, index) => index + 1);

  return (
    <section id="challenge" className="challenge-section">
      <div className="challenge-banner" data-reveal>
        <div>
          <span className="challenge-badge">🔥 Miễn phí · Bắt đầu cùng nhau</span>
          <h2>Thử thách 21 ngày AI — dành cho người chưa biết gì</h2>
          <p>
            Mỗi ngày 1 việc nhỏ, cụ thể, thực tế. Sau 21 ngày — bạn sẽ dùng được AI
            trong công việc hàng ngày.
          </p>
          <div className="progress-bar"><span /></div>
          <small>Sắp bắt đầu · Đăng ký để nhận thông báo</small>
          <a className="btn primary" href="#community">Đăng ký miễn phí →</a>
        </div>
        <div className="heatmap-col" aria-label="21 ngày thử thách">
          {days.map((day) => (
            <span key={day} className={day === 1 ? "today" : ""} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="community" className="footer">
      <Logo />
      <span>Bắt đầu tháng 5 · 2026 · Chia sẻ hoàn toàn công khai</span>
      <div className="socials">
        <a href="#community" aria-label="TikTok">T</a>
        <a href="#community" aria-label="Facebook">F</a>
        <a href="#community" aria-label="Threads">Th</a>
      </div>
    </footer>
  );
}

function App() {
  useReveal();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <ValueSection />
        <JourneySection />
        <ChallengeSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
