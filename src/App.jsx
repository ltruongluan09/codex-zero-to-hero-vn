import { useEffect, useState } from "react";

const navItems = [
  { label: "Trang chủ", href: "#home" },
  { label: "Hành trình", href: "#journey" },
  { label: "Dự án sắp làm", href: "#upcoming" },
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
    title: "Tôi muốn tạo công cụ AI của mình",
    desc: "Có ý tưởng, không biết bắt đầu từ đâu",
  },
  {
    icon: "👀",
    tone: "amber",
    title: "Tôi muốn theo dõi hành trình",
    desc: "Xem một người bắt đầu từ ngày 1",
  },
];

const valueCards = [
  {
    icon: "📖",
    title: "Nhật ký làm thật",
    desc: "Tôi ghi lại quá trình làm từng bước: nghĩ gì, thử gì, sai ở đâu, sửa thế nào. Không làm màu.",
    tag: "⬤ Đang viết",
    active: true,
  },
  {
    icon: "🛠️",
    title: "Công cụ AI dùng được",
    desc: "Mỗi công cụ sẽ có bản demo để bạn mở lên xem ngay. Mục tiêu là giúp người đi làm tiết kiệm thời gian.",
    tag: "⬤ Công cụ đầu tiên: Tháng 6/2026",
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

const upcomingProjects = [
  {
    level: "Dễ bắt đầu",
    title: "Dự án AI đơn giản",
    desc: "Một công cụ nhỏ, dễ hiểu, làm được trong 1 buổi. Mục tiêu là giúp bạn thấy: à, mình cũng có thể bắt đầu.",
    status: "Sắp bắt đầu",
  },
  {
    level: "Cho công việc",
    title: "Công cụ dùng trong văn phòng",
    desc: "Bảng theo dõi, tài liệu, Excel, nhân sự, marketing, vận hành. Những thứ người đi làm thật sự cần.",
    status: "Đang chuẩn bị",
  },
  {
    level: "Khó dần",
    title: "Ứng dụng phức tạp hơn",
    desc: "Trợ lý AI, tự động hoá, app demo, sản phẩm thử nghiệm nhỏ. Đi từng bước, không nhảy vào phần khó ngay.",
    status: "Giai đoạn sau",
  },
];

const timelineItems = [
  {
    date: "Tháng 5 · 2026 — Hôm nay",
    title: "Ra mắt Lumi Labs",
    desc: "Website này vừa được tạo ra. Đây sẽ là nơi tôi ghi lại cách dùng AI để tạo công cụ thật cho công việc.",
    badge: "⬤ Đang xảy ra",
    state: "now",
  },
  {
    date: "Tháng 5 · 2026 — Tuần 2",
    title: "Bắt đầu đăng dự án thật đầu tiên",
    desc: "Tôi sẽ chọn một dự án rất nhỏ, làm từ đầu, giải thích từng quyết định bằng ngôn ngữ dễ hiểu cho người không biết code.",
    badge: "Dự án đầu tiên",
    state: "soon",
  },
  {
    date: "Tháng 5 · 2026 — Tuần 3",
    title: "Khởi động Thử thách 21 ngày AI",
    desc: "Mỗi ngày 1 việc AI thực tế dành cho người mới hoàn toàn. Miễn phí. Cùng nhau làm.",
    badge: "Sắp diễn ra",
    state: "soon",
  },
  {
    date: "Tháng 6 · 2026",
    title: "Ra mắt công cụ AI đầu tiên",
    desc: "Một công cụ thật, có thể mở lên dùng thử. Tôi ghi lại toàn bộ quá trình — từ ý tưởng đến lúc hoạt động.",
    badge: "Đang lên kế hoạch",
    state: "future",
  },
  {
    date: "Tháng 7 · 2026",
    title: "Xây dựng Cộng đồng + Zoom định kỳ",
    desc: "Gặp nhau online, chia sẻ công cụ, học cùng nhau. Không phải khóa học — là cộng đồng cùng làm thật.",
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
      <div className="live-meter">
        <span>Đang mở</span>
        <strong>Ngày 1</strong>
      </div>
      <p className="card-kicker">Bạn đang cần gì?</p>
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
          Nơi học dùng AI cho người không biết code
        </div>
        <h1 className="hero-h1">
          Dùng AI để tạo
          <br />
          công cụ làm việc <span>thật</span>
          <br />
          <em>— giải thích thật dễ hiểu.</em>
        </h1>
        <div className="live-note">
          <span>Đang xảy ra</span>
          <strong>Hôm nay là ngày 1. Tôi sẽ xây từng công cụ AI thật, từ đơn giản đến phức tạp, để người không biết code vẫn xem hiểu và làm theo được.</strong>
        </div>
        <p>
          Lumi Labs là nơi tôi chia sẻ cách dùng AI để tạo website, báo cáo,
          bảng theo dõi, tài liệu, tự động hoá và ứng dụng mẫu. Không dạy lập trình khô khan —
          chỉ tập trung vào <strong>làm ra thứ dùng được</strong>.
        </p>
        <div className="hero-actions">
          <a className="btn primary" href="#upcoming">Xem sắp làm gì →</a>
          <a className="btn secondary" href="#journey">Theo dõi hành trình</a>
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

function UpcomingSection() {
  return (
    <section id="upcoming" className="section upcoming-section">
      <div className="section-head" data-reveal>
        <span className="section-label">Sắp tới sẽ có gì?</span>
        <h2>Dự án thật, đi từ <strong>dễ đến khó</strong></h2>
        <p className="section-note">
          Hiện tại chưa có thư viện dự án lớn. Tôi sẽ xây từng dự án công khai, giải thích bằng ngôn ngữ đời thường để bạn có thể theo dõi và làm theo.
        </p>
      </div>
      <div className="upcoming-grid">
        {upcomingProjects.map((project, index) => (
          <article key={project.title} className="upcoming-card" data-reveal>
            <span className="upcoming-num">0{index + 1}</span>
            <small>{project.level}</small>
            <h3>{project.title}</h3>
            <p>{project.desc}</p>
            <strong>{project.status}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function ValueSection() {
  return (
    <section id="value" className="section">
      <div className="section-head" data-reveal>
        <span className="section-label">Bạn nhận được gì?</span>
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
        <span className="timeline-runner" aria-hidden="true" />
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
            <span key={day} className={day === 1 ? "today" : day < 5 ? "warm" : ""} />
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
        <UpcomingSection />
        <ValueSection />
        <JourneySection />
        <ChallengeSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
