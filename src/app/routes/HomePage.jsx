import { useState } from "react";
import { getPublishedArticles } from "../../content/articles";
import { getReadyProjects } from "../../content/projects";

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

const featuredProjects = [
  {
    title: "Caption AI",
    desc: "Viết caption TikTok, Facebook và hashtag tiếng Việt.",
    progress: 75,
    tone: "coral",
  },
  {
    title: "Excel Report AI",
    desc: "Biến file Excel thành báo cáo dễ đọc cho sếp.",
    progress: 25,
    tone: "blue",
  },
  {
    title: "AI Creator Tools",
    desc: "Bộ công cụ nhỏ cho creator, shop và freelancer.",
    progress: 35,
    tone: "violet",
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
    <aside className="hero-lumi-stage hero-image-stage" data-reveal>
      <img src="/lumi-hero-journey.png" alt="Lumi Bot dẫn đường qua hành trình AI" />
      <div className="hero-visual-effects" aria-hidden="true">
        <span className="portal-title">CÙNG AI</span>
        <span className="lumi-speech">
          <strong>Xin chào! 👋</strong>
          <small>Mình là Lumi. Mình sẽ đồng hành cùng bạn trên hành trình AI này!</small>
        </span>
        <span className="journey-step-label step-label-one">
          <strong>1. Ý tưởng</strong>
          <small>Bạn có ý tưởng gì?</small>
        </span>
        <span className="journey-step-label step-label-two">
          <strong>2. Xây dựng</strong>
          <small>AI giúp bạn tạo ra</small>
        </span>
        <span className="journey-step-label step-label-three">
          <strong>3. Hoàn thành</strong>
          <small>Biến ý tưởng thành sản phẩm thật</small>
        </span>
        <span className="portal-aura" />
        <span className="path-glow" />
        <span className="spark spark-one" />
        <span className="spark spark-two" />
        <span className="spark spark-three" />
        <span className="step-pulse step-one" />
        <span className="step-pulse step-two" />
        <span className="step-pulse step-three" />
      </div>
    </aside>
  );
}

function HeroFeaturedProjects() {
  const activeProjects = getReadyProjects().slice(0, 2);
  const publishedArticles = getPublishedArticles();
  const mainArticle = publishedArticles[0];
  const codexSeries = publishedArticles.find((article) => article.href === "/codex-training-thuc-chien.html");
  const sideArticles = publishedArticles
    .filter((article) => article.href !== codexSeries?.href)
    .slice(1, 4);

  return (
    <div className="home-cards" data-reveal>
      <article className="home-project-card project-hub-card">
        <div className="home-card-head">
          <h2>💼 Demo đang dùng được</h2>
          <a href="/projects">Xem tất cả →</a>
        </div>
        <p className="project-hub-intro">
          Chọn một tool nhỏ và thử ngay. Không cần biết code, không cần đọc hướng dẫn dài.
        </p>
        <div className="home-project-list unified-project-list">
          {activeProjects.map((project, index) => (
            <article className="unified-project-card compact" key={project.slug}>
              <div className="project-card-top">
                <span className="project-icon">{project.icon}</span>
                <div>
                  <small>Project #{index + 1} · {project.tag}</small>
                  <h3>{project.title}</h3>
                </div>
                <b>{project.status}</b>
              </div>
              <p>{project.desc}</p>
              <div className="project-card-actions">
                <a href={project.href}>Dùng thử</a>
                <a className="ghost" href={project.journeyHref}>Xem hành trình</a>
              </div>
            </article>
          ))}
        </div>
      </article>

      <article className="home-article-card">
        <div className="home-card-head">
          <h2>📚 Kho bài học & series</h2>
          <a href="/bai-viet.html">Mở kho bài học →</a>
        </div>
        <p className="article-hub-intro">
          Nếu chưa biết bắt đầu ở đâu, đọc bài ngắn trước. Nếu muốn tự tạo tool, đi thẳng vào series Codex.
        </p>
        {codexSeries ? (
          <div className="home-learning-series">
            <span className="home-learning-series-icon">{codexSeries.icon}</span>
            <div>
              <small>{codexSeries.tag} · {codexSeries.time} · Có bài thực hành</small>
              <h3>{codexSeries.title}</h3>
              <p>{codexSeries.desc}</p>
              <div className="home-learning-actions">
                <a href={codexSeries.href}>Vào series Codex →</a>
                <a className="secondary" href="/codex-session-02-tao-tool-dau-tien.html">Xem buổi tạo tool</a>
              </div>
            </div>
          </div>
        ) : null}
        <a className="article-feature" href={mainArticle.href}>
          <img src={mainArticle.image} alt="" />
          <div>
            <span>{mainArticle.tag} · Có Mini Lab</span>
            <h3>{mainArticle.title}</h3>
            <p>{mainArticle.desc}</p>
            <em>Đọc và thực hành ngay →</em>
          </div>
        </a>
        <ul className="article-list">
          {sideArticles.map((article) => (
            <li key={article.href}>
              <a href={article.href}>
                <span className="article-list-icon">{article.icon}</span>
                <span>{article.title}</span>
              </a>
              <span>{article.time}</span>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}

function HeroBenefits() {
  return (
    <div className="hero-benefits" data-reveal>
      <article>
        <span><img src="/lumi-bot.png" alt="" /></span>
        <div>
          <strong>Sứ mệnh của mình 💜</strong>
          <small>Giúp mọi người khám phá và ứng dụng AI dễ dàng hơn mỗi ngày.</small>
        </div>
      </article>
      <article>
        <span>▣</span>
        <div>
          <strong>Dễ hiểu</strong>
          <small>Giải thích đơn giản, ai cũng hiểu được.</small>
        </div>
      </article>
      <article>
        <span>🚀</span>
        <div>
          <strong>Thực tế</strong>
          <small>Ứng dụng AI vào công việc và cuộc sống hằng ngày.</small>
        </div>
      </article>
      <article>
        <span>💜</span>
        <div>
          <strong>Chân thật</strong>
          <small>Chia sẻ hành trình thật, thử sai rồi làm lại.</small>
        </div>
      </article>
    </div>
  );
}

function SecurityTrustStrip() {
  return (
    <aside className="security-trust-strip" aria-label="Cam kết an toàn khi trải nghiệm">
      <strong>An toàn khi trải nghiệm</strong>
      <span>Không bắt buộc đăng nhập</span>
      <span>Không lưu file bạn tải lên</span>
      <span>Giới hạn lượt AI để hệ thống ổn định</span>
    </aside>
  );
}

function Hero({ onOpenLogin }) {
  return (
    <section id="home" className="hero home-hero">
      <div className="hero-copy" data-reveal>
        <div className="badge-start">
          <span className="pulse-dot" />
          ✨ AI không khó. Chỉ cần bắt đầu.
        </div>
        <h1 className="hero-h1">
          Mình build
          <br />
          cùng <span>AI mỗi</span>
          <br />
          <span>ngày.</span>
        </h1>
        <p>
          Mình chia sẻ hành trình thật khi tạo ra những sản phẩm với AI —
          theo cách dễ hiểu để ai cũng có thể bắt đầu.
        </p>
        <div className="hero-actions">
          <a className="btn primary" href="/projects">Thử demo đang mở</a>
          <a className="btn secondary" href="/docscan-ai">Đọc thử tài liệu</a>
        </div>
        <div className="creator-proof">
          <div className="avatar-stack">
            <span />
            <span />
            <span />
          </div>
          <strong>1.200+ người đang theo dõi hành trình</strong>
        </div>
      </div>
      <div className="hero-side">
        <LumiBotIntro />
      </div>
      <HeroFeaturedProjects />
      <HeroBenefits />
      <SecurityTrustStrip />
    </section>
  );
}

export function ChallengeSection() {
  const days = Array.from({ length: 21 }, (_, index) => index + 1);

  return (
    <section id="challenge" className="challenge-section">
      <div className="challenge-banner" data-reveal>
        <div>
          <span className="challenge-badge">🔥 Miễn phí · Bắt đầu cùng nhau</span>
          <h2>21 ngày dùng AI tốt hơn</h2>
          <p>Mỗi ngày 1 việc nhỏ, thực tế, dễ làm theo.</p>
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


export default function HomePage() {
  return <Hero />;
}
