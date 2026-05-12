import { useEffect, useState } from "react";

const navItems = [
  { label: "Trang chủ", href: "#home" },
  { label: "Caption AI", href: "#caption-ai" },
  { label: "Hành trình", href: "#journey" },
  { label: "Dự án sắp làm", href: "#upcoming" },
  { label: "Thử thách 21 ngày", href: "#challenge" },
  { label: "Cộng đồng", href: "#community" },
];

const captionModes = [
  { id: "ban-hang", label: "Bán hàng nhẹ nhàng" },
  { id: "ke-chuyen", label: "Kể chuyện gần gũi" },
  { id: "viral", label: "Ngắn gọn dễ viral" },
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

function LumiBotIntro() {
  return (
    <aside className="lumi-bot-card" data-reveal>
      <div className="lumi-bot-avatar">
        <img src="/lumi-bot.png" alt="Lumi Bot" />
      </div>
      <div>
        <span>Lumi Bot</span>
        <h2>Trợ lý AI thử nghiệm của Lumi Labs.</h2>
        <p>Mình sẽ xuất hiện khi các tool đang suy nghĩ, viết nháp hoặc gợi ý bước tiếp theo.</p>
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
          Build công khai từ Việt Nam · Cho người không biết code
        </div>
        <h1 className="hero-h1">
          Xem nhiều video AI rồi,
          <br />
          nhưng vẫn chưa tự
          <br />
          <span>làm được gì?</span>
        </h1>
        <div className="live-note">
          <span>Đang xảy ra</span>
          <strong>Hôm nay là ngày 1. Tôi bắt đầu từ con số 0 — và sẽ đăng từng dự án thật từ dễ đến khó.</strong>
        </div>
        <div className="hero-bot-pill">
          <img src="/lumi-bot.png" alt="" />
          <span>Lumi Bot sẽ đồng hành trong các demo AI.</span>
        </div>
        <p>
          Lumi Labs là nơi tôi dùng AI để build các công cụ thật cho công việc:
          báo cáo, bảng theo dõi, tài liệu, tự động hoá và ứng dụng mẫu.
          Tất cả được chia sẻ từng bước, dễ hiểu, có hình ảnh và demo khi hoàn thành.
        </p>
        <div className="hero-actions">
          <a className="btn primary" href="#upcoming">Xem sắp làm gì →</a>
          <a className="btn secondary" href="#journey">Theo dõi hành trình</a>
        </div>
        <div className="trust-row">
          <span>Từng bước dễ hiểu</span>
          <span>Có hình ảnh & demo</span>
          <span>Không cần biết code</span>
        </div>
        <div className="proof-row">
          <div><strong>Ngày 1</strong><span>Tháng 5 · 2026</span></div>
          <div><strong>0 → ?</strong><span>dự án thật sắp bắt đầu</span></div>
          <div><strong>∞</strong><span>chia sẻ công khai</span></div>
        </div>
      </div>
      <div className="hero-side">
        <LumiBotIntro />
        <WhoCard />
      </div>
    </section>
  );
}

function normalizeHashtag(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 4)
    .join("");
}

function buildCaption({ productName, description, mode }) {
  const name = productName.trim() || "sản phẩm của bạn";
  const desc = description.trim() || "giúp công việc hằng ngày nhẹ hơn, nhanh hơn và dễ bắt đầu hơn";
  const shortName = name.length > 46 ? `${name.slice(0, 46)}...` : name;
  const hashName = normalizeHashtag(name) || "SanPhamViet";

  const variants = {
    "ban-hang": {
      tiktok: `Bạn đang tìm một thứ vừa dễ dùng, vừa giúp tiết kiệm thời gian?\n\n${shortName} được tạo ra cho chuyện đó.\n\n${desc}.\n\nNếu bạn muốn bắt đầu đơn giản hơn, thử lưu lại bài này nhé.`,
      facebook: `${shortName} dành cho những ai muốn một giải pháp đơn giản nhưng dùng được ngay.\n\nĐiểm mình thích nhất: ${desc}.\n\nKhông cần làm mọi thứ phức tạp. Chỉ cần một công cụ đúng lúc, đúng việc, là công việc đã nhẹ hơn rất nhiều.`,
    },
    "ke-chuyen": {
      tiktok: `Có những việc nhỏ nhưng làm mỗi ngày lại rất tốn thời gian.\n\nĐó là lý do mình muốn giới thiệu ${shortName}.\n\n${desc}.\n\nĐơn giản, dễ hiểu, và hợp với người mới bắt đầu.`,
      facebook: `Mình luôn tin rằng một sản phẩm tốt không cần nói quá nhiều.\n\n${shortName} giải quyết một việc rất cụ thể: ${desc}.\n\nNếu bạn từng thấy công việc nhỏ lặp đi lặp lại quá nhiều lần, đây có thể là một cách bắt đầu nhẹ nhàng hơn.`,
    },
    viral: {
      tiktok: `Đừng làm thủ công nữa.\n\nThử ${shortName} nếu bạn muốn: ${desc}.\n\nNhanh hơn. Gọn hơn. Dễ bắt đầu hơn.`,
      facebook: `${shortName} giúp bạn xử lý việc này đơn giản hơn:\n\n${desc}.\n\nMột công cụ nhỏ, nhưng có thể tiết kiệm rất nhiều thời gian nếu dùng đúng lúc.`,
    },
  };

  return {
    ...variants[mode],
    hashtags: [`#${hashName}`, "#AIChoCongViec", "#LumiLabs", "#CongCuAI", "#NguoiVietDungAI"],
  };
}

function CaptionAISection() {
  const sampleProduct = "Bánh biscotti healthy";
  const sampleDescription = "Ít ngọt, nhiều hạt, phù hợp dân văn phòng muốn ăn vặt lành mạnh";
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [mode, setMode] = useState("ban-hang");
  const [result, setResult] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [source, setSource] = useState("demo");
  const [copied, setCopied] = useState("");

  const generate = async () => {
    if (!productName.trim()) return;
    setIsGenerating(true);
    setCopied("");
    try {
      const response = await fetch("/api/generate-caption", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName, description, mode }),
      });
      const data = await response.json();
      setResult({
        tiktok: data.tiktok,
        facebook: data.facebook,
        hashtags: data.hashtags,
      });
      setSource(data.source === "gemini" ? "gemini" : "fallback");
    } catch {
      setResult(buildCaption({ productName, description, mode }));
      setSource("fallback");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyText = async (key, text) => {
    try {
      await navigator.clipboard.writeText(Array.isArray(text) ? text.join(" ") : text);
      setCopied(key);
      setTimeout(() => setCopied(""), 1500);
    } catch {
      setCopied("");
    }
  };

  const useSample = () => {
    setProductName(sampleProduct);
    setDescription(sampleDescription);
    setResult(null);
    setSource("demo");
  };

  return (
    <section id="caption-ai" className="caption-ai-section">
      <div className="caption-shell" data-reveal>
        <div className="caption-intro">
          <span className="caption-badge">Demo đầu tiên · dùng ngay</span>
          <h2>Caption AI</h2>
          <p>
            Nhập tên sản phẩm và mô tả ngắn. Lumi Labs sẽ tạo nhanh caption TikTok,
            Facebook và hashtag tiếng Việt để bạn đăng thử ngay.
          </p>
          <div className="caption-mini-proof">
            <span>Không đăng ký</span>
            <span>Không cần tài khoản</span>
            <span>Ra kết quả ngay</span>
          </div>
        </div>

        <div className="caption-app">
          <div className="caption-window-top">
            <div>
              <span className="live-dot"></span>
              Caption AI Studio
            </div>
            <span>Project #1</span>
          </div>
          <div className="caption-form">
            <div className="caption-form-head">
              <span>1. Nhập ý tưởng</span>
              <button type="button" className="sample-btn" onClick={useSample}>
                Dùng ví dụ mẫu
              </button>
            </div>
            <label>
              Tên sản phẩm
              <input
                value={productName}
                onChange={(event) => setProductName(event.target.value)}
                placeholder="Ví dụ: Bánh biscotti healthy"
              />
            </label>
            <label>
              Mô tả ngắn
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Ví dụ: ít ngọt, nhiều hạt, phù hợp dân văn phòng..."
                rows="4"
              />
            </label>
            <p className="form-helper">Chỉ cần viết như đang nhắn tin cho nhân viên marketing.</p>
            <div className="mode-row" aria-label="Chọn kiểu caption">
              {captionModes.map((item) => (
                <button
                  key={item.id}
                  className={mode === item.id ? "mode-chip active" : "mode-chip"}
                  type="button"
                  onClick={() => setMode(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button
              className="generate-btn"
              type="button"
              onClick={generate}
              disabled={isGenerating || !productName.trim()}
            >
              {!productName.trim()
                ? "Nhập tên sản phẩm để bắt đầu"
                : isGenerating
                  ? "Đang viết caption..."
                  : "Tạo caption ngay →"}
            </button>
            <p className="caption-source">
              {isGenerating
                ? "AI đang đọc thông tin và viết bản nháp đầu tiên..."
                : source === "gemini"
                ? "Đang dùng Gemini để viết caption thật."
                : source === "fallback"
                  ? "Đang dùng bản demo dự phòng. Thêm Gemini API key để kết quả hay hơn."
                  : "Bản demo sẵn sàng. Thêm Gemini API key để dùng AI thật."}
            </p>
          </div>

          <div className={result ? "caption-results" : "caption-results empty"}>
            {isGenerating ? (
              <article className="ai-thinking">
                <div className="thinking-orb" aria-hidden="true">
                  <img src="/lumi-bot.png" alt="" />
                </div>
                <span className="thinking-label">AI đang phân tích</span>
                <p className="thinking-speech">Lumi Bot: Mình đang viết bản nháp đầu tiên cho bạn...</p>
                <h3>Đang biến ý tưởng của bạn thành caption có thể đăng ngay...</h3>
                <div className="thinking-steps">
                  <div className="thinking-step active">
                    <span></span>
                    Đọc tên sản phẩm
                  </div>
                  <div className="thinking-step active delay-1">
                    <span></span>
                    Chọn giọng văn phù hợp
                  </div>
                  <div className="thinking-step active delay-2">
                    <span></span>
                    Viết caption TikTok & Facebook
                  </div>
                  <div className="thinking-step active delay-3">
                    <span></span>
                    Tạo hashtag tiếng Việt
                  </div>
                </div>
              </article>
            ) : result ? (
              <>
                <article>
                  <div>
                    <span>TikTok</span>
                    <button type="button" onClick={() => copyText("tiktok", result.tiktok)}>
                      {copied === "tiktok" ? "Đã copy" : "Copy"}
                    </button>
                  </div>
                  <p>{result.tiktok}</p>
                </article>
                <article>
                  <div>
                    <span>Facebook</span>
                    <button type="button" onClick={() => copyText("facebook", result.facebook)}>
                      {copied === "facebook" ? "Đã copy" : "Copy"}
                    </button>
                  </div>
                  <p>{result.facebook}</p>
                </article>
                <article className="hashtag-card">
                  <div>
                    <span>Hashtag</span>
                    <button type="button" onClick={() => copyText("hashtags", result.hashtags)}>
                      {copied === "hashtags" ? "Đã copy" : "Copy"}
                    </button>
                  </div>
                  <p>{result.hashtags.join(" ")}</p>
                </article>
              </>
            ) : (
              <article className="empty-result">
                <span>2. Xem kết quả</span>
                <h3>Caption TikTok, Facebook và hashtag sẽ hiện ở đây.</h3>
                <p>
                  Nhập tên sản phẩm, thêm mô tả ngắn rồi bấm tạo. Nếu muốn thử nhanh,
                  hãy dùng ví dụ mẫu ở bên trái.
                </p>
                <div className="empty-preview">
                  <span>TikTok caption</span>
                  <span>Facebook caption</span>
                  <span>#Hashtag</span>
                </div>
              </article>
            )}
          </div>
        </div>
      </div>
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
        <CaptionAISection />
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
