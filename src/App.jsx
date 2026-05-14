import { useEffect, useState } from "react";
import { getUserProfile, hasSupabaseConfig, supabase } from "./supabaseClient";

const navItems = [
  { label: "Trang chủ", href: "/" },
  { label: "Hành trình", href: "/challenge" },
  { label: "Dự án", href: "/projects" },
  { label: "Bài viết", href: "/project-01-caption-ai.html" },
  { label: "Về mình", href: "/dashboard" },
];

const captionModes = [
  { id: "ban-hang", label: "Bán hàng nhẹ nhàng" },
  { id: "ke-chuyen", label: "Kể chuyện gần gũi" },
  { id: "viral", label: "Ngắn gọn dễ viral" },
];

const captionExamples = [
  {
    label: "Đồ ăn",
    productName: "Bánh biscotti healthy",
    description: "Ít ngọt, nhiều hạt, phù hợp dân văn phòng muốn ăn vặt lành mạnh",
  },
  {
    label: "Mỹ phẩm",
    productName: "Serum phục hồi da ban đêm",
    description: "Dành cho da khô, da yếu sau treatment, chất nhẹ, dễ thấm",
  },
  {
    label: "Dịch vụ",
    productName: "Gói chụp ảnh sản phẩm tại nhà",
    description: "Phù hợp shop online nhỏ, có ảnh đẹp để đăng Facebook và TikTok",
  },
];

const DEMO_UNLOCK_KEY = "lumi_demo_unlocked";

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
    desc: "Một tool nhỏ, làm nhanh, mở lên dùng thử ngay.",
    status: "Sắp bắt đầu",
  },
  {
    level: "Cho công việc",
    title: "Công cụ dùng trong văn phòng",
    desc: "Excel, báo cáo, tài liệu, nhân sự, marketing.",
    status: "Đang chuẩn bị",
  },
  {
    level: "Khó dần",
    title: "Ứng dụng phức tạp hơn",
    desc: "Trợ lý AI, automation và app demo có thể dùng thật.",
    status: "Giai đoạn sau",
  },
];

const projectCatalog = [
  {
    slug: "caption-ai",
    title: "Caption AI",
    desc: "Tool viết caption TikTok, Facebook và hashtag tiếng Việt.",
    status: "Đang mở demo",
  },
  {
    slug: "excel-report-ai",
    title: "Excel Report AI",
    desc: "Biến dữ liệu Excel thành báo cáo dễ đọc.",
    status: "Sắp làm",
  },
  {
    slug: "ai-office-tools",
    title: "AI Office Tools",
    desc: "Bộ công cụ AI cho dân văn phòng.",
    status: "Ý tưởng",
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

function useAuth() {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [followedProjects, setFollowedProjects] = useState([]);
  const [membership, setMembership] = useState(null);
  const [authLoading, setAuthLoading] = useState(hasSupabaseConfig);

  const loadFollowedProjects = async (userId) => {
    if (!supabase || !userId) return;

    const { data } = await supabase
      .from("followed_projects")
      .select("project_slug")
      .eq("user_id", userId);

    setFollowedProjects((data || []).map((item) => item.project_slug));
  };

  const syncProfile = async (currentUser) => {
    if (!supabase || !currentUser) return;
    const nextProfile = getUserProfile(currentUser);
    setProfile(nextProfile);
    const provider = currentUser.app_metadata?.provider || "oauth";

    await supabase.from("profiles").upsert(
      {
        id: currentUser.id,
        email: nextProfile.email,
        name: nextProfile.name,
        avatar_url: nextProfile.avatar,
        provider,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );

    await supabase.from("subscribers").upsert(
      {
        email: nextProfile.email,
        user_id: currentUser.id,
        name: nextProfile.name,
        avatar_url: nextProfile.avatar,
        source: "auth_login",
        provider,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "email" }
    );
  };

  const loadMembership = async (userId) => {
    if (!supabase || !userId) return;

    const { data, error } = await supabase
      .from("memberships")
      .select("plan,status,expires_at")
      .eq("user_id", userId)
      .maybeSingle();

    if (!error) {
      setMembership(data || { plan: "free", status: "active" });
    } else {
      setMembership({ plan: "free", status: "active" });
    }
  };

  useEffect(() => {
    if (!supabase) {
      setAuthLoading(false);
      return undefined;
    }

    let active = true;

    supabase.auth.getSession().then(async ({ data }) => {
      if (!active) return;
      const nextSession = data.session;
      setSession(nextSession);
      setUser(nextSession?.user || null);
      if (nextSession?.user) {
        await syncProfile(nextSession.user);
        await loadFollowedProjects(nextSession.user.id);
        await loadMembership(nextSession.user.id);
        localStorage.setItem(DEMO_UNLOCK_KEY, "true");
        window.dispatchEvent(new Event("lumi-demo-unlocked"));
      }
      setAuthLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user || null);
      if (nextSession?.user) {
        await syncProfile(nextSession.user);
        await loadFollowedProjects(nextSession.user.id);
        await loadMembership(nextSession.user.id);
        localStorage.setItem(DEMO_UNLOCK_KEY, "true");
        window.dispatchEvent(new Event("lumi-demo-unlocked"));
      } else {
        setProfile(null);
        setFollowedProjects([]);
        setMembership(null);
      }
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const signInWithProvider = async (provider) => {
    if (!supabase) return;
    const redirectTo = `${window.location.origin}${window.location.pathname}`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
        queryParams: {
          prompt: "select_account",
        },
      },
    });

    if (error) {
      console.error("OAuth login failed", error);
    }
  };

  const signInWithGoogle = () => signInWithProvider("google");
  const signInWithFacebook = () => signInWithProvider("facebook");

  const signOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setProfile(null);
    setFollowedProjects([]);
    setMembership(null);
    localStorage.removeItem(DEMO_UNLOCK_KEY);
  };

  const followProject = async (projectSlug) => {
    if (!supabase || !user) {
      await signInWithGoogle();
      return;
    }

    await supabase.from("followed_projects").upsert(
      {
        user_id: user.id,
        project_slug: projectSlug,
        created_at: new Date().toISOString(),
      },
      { onConflict: "user_id,project_slug" }
    );

    setFollowedProjects((items) =>
      items.includes(projectSlug) ? items : [...items, projectSlug]
    );
  };

  return {
    session,
    user,
    profile,
    followedProjects,
    membership,
    authLoading,
    signInWithGoogle,
    signInWithFacebook,
    signOut,
    followProject,
  };
}

function Logo() {
  return (
    <a className="logo" href="/" aria-label="Lumi Labs">
      <span className="logo-bot"><img src="/lumi-bot.png" alt="" /></span>
      <span>
        <strong>Lumi Labs</strong>
        <small>AI dễ hiểu cho mọi người ✨</small>
      </span>
    </a>
  );
}

function SocialLoginButton({ provider, onClick }) {
  const label = provider === "facebook" ? "Đăng nhập bằng Facebook" : "Đăng nhập bằng Google";
  const letter = provider === "facebook" ? "f" : "G";

  return (
    <button className={`social-login-btn ${provider}`} type="button" onClick={onClick}>
      <span>{letter}</span>
      {label}
    </button>
  );
}

function LoginButton({ onClick }) {
  return (
    <button className="login-entry-btn" type="button" onClick={onClick}>
      <span>G</span>
      Đăng nhập với Google
    </button>
  );
}

function UserMenu({ profile, onSignOut }) {
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const initial = profile?.name?.charAt(0) || profile?.email?.charAt(0) || "L";

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await onSignOut();
      setOpen(false);
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <div className="user-menu">
      <button className="user-menu-trigger" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        {profile?.avatar ? (
          <img src={profile.avatar} alt="" />
        ) : (
          <span className="user-fallback">{initial}</span>
        )}
        <span>
          <strong>{profile?.name || "Bạn mới"}</strong>
          <small>{profile?.email}</small>
        </span>
        <span className="user-menu-chevron">⌄</span>
      </button>
      {open && (
        <div className="user-menu-popover">
          <div className="user-menu-card">
            {profile?.avatar ? <img src={profile.avatar} alt="" /> : <span className="user-fallback">{initial}</span>}
            <div>
              <strong>{profile?.name || "Bạn mới"}</strong>
              <small>{profile?.email}</small>
            </div>
          </div>
          <a href="/dashboard">Dashboard của tôi</a>
          <button type="button" onClick={handleSignOut} disabled={signingOut}>
            {signingOut ? "Đang đăng xuất..." : "Đăng xuất"}
          </button>
        </div>
      )}
    </div>
  );
}

function Header({ profile, onOpenLogin, onSignOut }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = window.location.pathname;

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
          {navItems.map((item) => (
            <a key={item.label} className={path === item.href ? "active" : ""} href={item.href}>
              {item.label}
            </a>
          ))}
          {profile && <a href="/dashboard">Dashboard</a>}
        </nav>
        <div className="nav-actions">
          <a className="nav-cta" href="/dashboard">♡ Theo dõi hành trình</a>
          {profile ? (
            <UserMenu profile={profile} onSignOut={onSignOut} />
          ) : (
            <LoginButton onClick={onOpenLogin} />
          )}
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
        {profile && <a href="/dashboard" onClick={() => setOpen(false)}>Dashboard</a>}
        <a className="nav-cta drawer-cta" href="/dashboard" onClick={() => setOpen(false)}>
          ♡ Theo dõi hành trình
        </a>
        {profile ? (
          <UserMenu profile={profile} onSignOut={onSignOut} />
        ) : (
          <LoginButton onClick={onOpenLogin} />
        )}
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
  return (
    <div className="home-cards" data-reveal>
      <article className="home-project-card">
        <h2>💼 Dự án đang thực hiện</h2>
        <div className="home-project-content">
          <div className="project-illustration">
            <span>✦</span>
            <strong>✎</strong>
          </div>
          <div>
            <span className="status-pill">Đang phát triển</span>
            <h3>Caption AI</h3>
            <p>AI giúp bạn viết caption hấp dẫn cho Facebook, TikTok, YouTube, LinkedIn...</p>
            <div className="mini-actions">
              <span>💬 Viết caption</span>
              <span>⚡ Viết hook</span>
              <span>☷ Viết kịch bản</span>
            </div>
            <a href="/caption-ai">Xem chi tiết →</a>
          </div>
        </div>
      </article>

      <article className="home-article-card">
        <div className="home-card-head">
          <h2>📄 Bài viết mới nhất</h2>
          <a href="/project-01-caption-ai.html">Xem tất cả →</a>
        </div>
        <div className="article-feature">
          <img src="/lumi-bot.png" alt="" />
          <div>
            <span>Hướng dẫn · 2 ngày trước</span>
            <h3>Prompt AI hiệu quả: 5 nguyên tắc đơn giản</h3>
            <p>Viết prompt đúng cách để AI hiểu và cho ra kết quả tốt hơn.</p>
          </div>
        </div>
        <ul className="article-list">
          <li><a href="/project-01-caption-ai.html">Tự động hóa công việc với AI (Phần 1)</a><span>5 ngày trước</span></li>
          <li><a href="/project-01-caption-ai.html">Hành trình xây dựng Caption AI</a><span>1 tuần trước</span></li>
        </ul>
      </article>
    </div>
  );
}

function HeroBenefits({ onOpenLogin }) {
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
      <article className="home-login-card">
        <div className="home-login-bot">
          <img src="/lumi-bot.png" alt="" />
          <span />
        </div>
        <div className="home-login-copy">
          <div className="demo-widget-head">
            <strong>Mở demo</strong>
            <small>Project 1/21</small>
          </div>
          <div className="demo-widget-progress">
            <span />
          </div>
          <button type="button" onClick={onOpenLogin}>Email hoặc Google</button>
        </div>
      </article>
    </div>
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
          cùng <span>AI mỗi ngày.</span>
        </h1>
        <p>
          Mình chia sẻ hành trình thật khi tạo ra những sản phẩm với AI —
          theo cách dễ hiểu để ai cũng có thể bắt đầu.
        </p>
        <div className="hero-actions">
          <a className="btn primary" href="/challenge">▶ Xem hành trình</a>
          <a className="btn secondary" href="/projects">Khám phá thêm</a>
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
      <HeroBenefits onOpenLogin={onOpenLogin} />
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

function CaptionAISection({ user, onOpenLogin }) {
  const [productName, setProductName] = useState(captionExamples[0].productName);
  const [description, setDescription] = useState(captionExamples[0].description);
  const [mode, setMode] = useState("ban-hang");
  const [result, setResult] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [source, setSource] = useState("demo");
  const [copied, setCopied] = useState("");
  const [isDemoUnlocked, setIsDemoUnlocked] = useState(false);

  useEffect(() => {
    setIsDemoUnlocked(Boolean(user));

    const onUnlocked = () => setIsDemoUnlocked(true);
    window.addEventListener("lumi-demo-unlocked", onUnlocked);
    return () => window.removeEventListener("lumi-demo-unlocked", onUnlocked);
  }, [user]);

  const generate = async () => {
    if (!isDemoUnlocked) {
      onOpenLogin?.();
      return;
    }
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

  const useSample = (sample = captionExamples[0]) => {
    setProductName(sample.productName);
    setDescription(sample.description);
    setResult(null);
    setSource("demo");
  };

  const resetCaption = () => {
    setProductName("");
    setDescription("");
    setResult(null);
    setSource("demo");
    setCopied("");
  };

  const copyAll = () => {
    if (!result) return;
    copyText(
      "all",
      `TikTok:\n${result.tiktok}\n\nFacebook:\n${result.facebook}\n\nHashtag:\n${result.hashtags.join(" ")}`
    );
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
            <span>Xem cách hoạt động</span>
            <span>Email để tạo thử</span>
            <span>Không cần tài khoản</span>
          </div>
          <a className="caption-log-link" href="/project-01-caption-ai.html">
            <span className="caption-log-bot">
              <img src="/lumi-bot.png" alt="" />
            </span>
            <span>
              <strong>Đi cùng Lumi Bot xem câu chuyện thật</strong>
              <small>Từ ý tưởng nhỏ đến tool dùng được →</small>
            </span>
            <i aria-hidden="true">→</i>
          </a>
          <div className="caption-steps-card" aria-label="Caption viral chỉ với 3 bước">
            <strong>Caption viral chỉ với 3 bước</strong>
            <div>
              <span>1<small>Nhập thông tin</small></span>
              <i></i>
              <span>AI<small>AI tạo nội dung</small></span>
              <i></i>
              <span>3<small>Sao chép & đăng</small></span>
            </div>
          </div>
          <div className="caption-progress-card" aria-label="Tiến độ dự án">
            <strong>Project 1/21</strong>
            <span><i></i></span>
            <small>5% hoàn thành</small>
          </div>
        </div>

        <div className="caption-app">
          <div className="caption-window-top">
            <div>
              <span className="live-dot"></span>
              Khu viết caption
            </div>
            <span>Dự án #1</span>
          </div>
          <div className="caption-form">
            <div className="caption-form-head">
              <span>1. Nhập ý tưởng</span>
              <button type="button" className="sample-btn" onClick={() => useSample()}>
                Dùng ví dụ mẫu
              </button>
            </div>
            <div className="example-row" aria-label="Chọn ví dụ nhanh">
              {captionExamples.map((sample) => (
                <button key={sample.label} type="button" onClick={() => useSample(sample)}>
                  {sample.label}
                </button>
              ))}
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
              className={!isDemoUnlocked || !productName.trim() ? "generate-btn idle" : "generate-btn"}
              type="button"
              onClick={generate}
              disabled={isGenerating || (isDemoUnlocked && !productName.trim())}
            >
              {!isDemoUnlocked
                ? "Tạo caption ngay →"
                : !productName.trim()
                ? "Nhập tên sản phẩm để bắt đầu"
                : isGenerating
                  ? "Đang viết caption..."
                  : "Tạo caption ngay →"}
            </button>
            <button className="reset-btn" type="button" onClick={resetCaption}>
              Làm lại từ đầu
            </button>
            <p className="caption-source">
              {isGenerating
                ? "AI đang đọc thông tin và viết bản nháp đầu tiên..."
                : !isDemoUnlocked
                ? "Preview đang mở. Đăng nhập để tạo thử."
                : source === "gemini"
                ? "Đang dùng Gemini để viết caption thật."
                : source === "fallback"
                  ? "Đang dùng bản demo dự phòng. Thêm Gemini API key để kết quả hay hơn."
                  : "Bản demo sẵn sàng. Thêm Gemini API key để dùng AI thật."}
            </p>
          </div>

          <div className={result ? "caption-results" : "caption-results empty"}>
            <div className="caption-result-head">
              <div>
                <strong>2. Kết quả caption</strong>
                <small>Chọn nền tảng để xem kết quả phù hợp nhất.</small>
              </div>
              <div className="caption-platform-tabs" aria-label="Nền tảng caption">
                <span className="active">TikTok</span>
                <span>Facebook</span>
                <span>Hashtag</span>
              </div>
            </div>
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
                <div className="result-toolbar">
                  <span>Sẵn sàng đăng</span>
                  <button type="button" onClick={copyAll}>
                    {copied === "all" ? "Đã copy tất cả" : "Copy tất cả"}
                  </button>
                </div>
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
              <article className={isDemoUnlocked ? "empty-result" : "empty-result locked-preview"}>
                <span>2. Xem kết quả</span>
                <h3>{isDemoUnlocked ? "Caption TikTok, Facebook và hashtag sẽ hiện ở đây." : "Kết quả sẽ hiện ở đây."}</h3>
                <p>
                  {isDemoUnlocked
                    ? "Nhập tên sản phẩm, thêm mô tả ngắn rồi bấm tạo. Nếu muốn thử nhanh, hãy dùng ví dụ mẫu ở bên trái."
                    : "Bấm tạo caption, Lumi Bot sẽ hướng dẫn bước tiếp theo nếu cần."}
                </p>
                <div className="empty-preview">
                  <span>TikTok caption</span>
                  <span>Facebook caption</span>
                  <span>#Hashtag</span>
                </div>
                {!isDemoUnlocked && (
                  <div className="locked-preview-card" aria-hidden="true">
                    <small>Ví dụ kết quả sau khi mở demo</small>
                    <p>Mấy bà công sở làm việc khuya mà vẫn muốn da sáng mịn thì thử em serum này nha...</p>
                    <strong>#SerumPhucHoi #ChamSocDa #LumiLabs</strong>
                  </div>
                )}
                {!isDemoUnlocked && (
                  <button className="unlock-demo-btn" type="button" onClick={() => onOpenLogin?.()}>
                    Đăng nhập →
                  </button>
                )}
              </article>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function LoginModal({ onClose, onGoogleLogin }) {
  return (
    <div className="login-modal-backdrop" role="presentation" onClick={onClose}>
      <div className="login-modal" role="dialog" aria-modal="true" aria-labelledby="login-modal-title" onClick={(event) => event.stopPropagation()}>
        <button className="journey-widget-close" type="button" onClick={onClose} aria-label="Đóng đăng nhập">
          ×
        </button>
        <div className="login-modal-hero">
          <img src="/lumi-bot.png" alt="" />
          <span>Lumi Bot</span>
        </div>
        <span className="follow-badge">Mở khóa nội dung</span>
        <h3 id="login-modal-title">Đăng nhập để xem demo đầy đủ hơn</h3>
        <p>
          Bạn sẽ xem được phần thực hành chi tiết, lưu project đang theo dõi và nhận bản cập nhật khi có demo mới.
        </p>
        <div className="login-benefits">
          <span>Xem demo đầy đủ</span>
          <span>Lưu project yêu thích</span>
          <span>Nhận bản mới sớm</span>
        </div>
        <div className="social-login-stack">
          <SocialLoginButton provider="google" onClick={onGoogleLogin} />
        </div>
        <small className="login-note">Không cần mật khẩu mới. Bạn có thể đăng xuất bất cứ lúc nào.</small>
      </div>
    </div>
  );
}

function JourneyWidget({ user, profile, followedProjects, onOpenLogin, onFollowProject }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    const onOpenUnlock = () => setOpen(true);
    window.addEventListener("lumi-open-unlock", onOpenUnlock);
    return () => window.removeEventListener("lumi-open-unlock", onOpenUnlock);
  }, []);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const submit = async (event) => {
    event.preventDefault();
    const cleanEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setStatus("error");
      setMessage("Bạn nhập email giúp mình nhé. Ví dụ: tenban@gmail.com");
      return;
    }

    setStatus("loading");
    setMessage("Lumi Bot đang lưu email của bạn...");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail }),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        if (data.code === "missing_config") {
          setStatus("success");
          localStorage.setItem(DEMO_UNLOCK_KEY, "true");
          window.dispatchEvent(new Event("lumi-demo-unlocked"));
          setMessage("Demo da mo tren trinh duyet nay. Khi len production, email se duoc luu vao he thong.");
          setEmail("");
          return;
        }
        setStatus("error");
        setMessage(data.message || "Chưa đăng ký được. Bạn thử lại giúp mình nhé.");
        return;
      }

      setStatus("success");
      localStorage.setItem(DEMO_UNLOCK_KEY, "true");
      window.dispatchEvent(new Event("lumi-demo-unlocked"));
      setMessage(
        data.status === "already_subscribed"
          ? "Email này đã có rồi. Bạn có thể mở demo và nhận project mới."
          : "Xong rồi. Bạn có thể mở demo và mình sẽ gửi project mới khi có."
      );
      setEmail("");
    } catch {
      localStorage.setItem(DEMO_UNLOCK_KEY, "true");
      window.dispatchEvent(new Event("lumi-demo-unlocked"));
      setStatus("success");
      setMessage("Demo da mo tren trinh duyet nay. Email se duoc luu khi server san sang.");
      setEmail("");
      return;
      setStatus("error");
      setMessage("Kết nối hơi chập chờn. Bạn thử lại sau một chút nhé.");
    }
  };

  return (
    <aside className={open ? "journey-widget open" : "journey-widget"} aria-label="Mở demo">
      <button className="journey-widget-main" type="button" onClick={() => setOpen((value) => !value)}>
        <span className="journey-widget-avatar">
          <img src="/lumi-bot.png" alt="" />
        </span>
        <span className="journey-widget-body">
          <span className="journey-widget-top">
            <strong>Mở demo</strong>
            <small>Project 1/21</small>
          </span>
          <span className="journey-widget-progress" aria-hidden="true">
            <i />
          </span>
          <span className="journey-widget-action">{open ? "Đóng lại" : "Email hoặc Google"}</span>
        </span>
      </button>

      {open && (
        <form className="journey-widget-panel" onSubmit={submit} noValidate>
          <button
            className="journey-widget-close"
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Đóng ghi chú hành trình"
          >
            ×
          </button>
          <span className="follow-badge">Tài khoản miễn phí</span>
          <h3>Đăng nhập để xem được nhiều hơn.</h3>
          <p>
            Lưu demo đã mở, theo dõi project bạn quan tâm và chuẩn bị cho bản đầy đủ sau này.
          </p>
          {!user ? (
            <button className="widget-login-primary" type="button" onClick={onOpenLogin}>
              Đăng nhập
            </button>
          ) : (
            <p className="follow-message success">Bạn đã đăng nhập. Demo đã được mở trên trình duyệt này.</p>
          )}
          {user && (
            <button
              className="follow-project-btn"
              type="button"
              onClick={() => onFollowProject("caption-ai")}
            >
              {followedProjects.includes("caption-ai")
                ? "Đang theo dõi Project Caption AI"
                : "Theo dõi Project Caption AI"}
            </button>
          )}
          {profile && (
            <div className="widget-user-line">
              {profile.avatar ? <img src={profile.avatar} alt="" /> : <span>{profile.name.charAt(0)}</span>}
              <small>{profile.email}</small>
            </div>
          )}
        </form>
      )}
    </aside>
  );
}

function JourneyWidgetV2({ user, profile, followedProjects, onOpenLogin, onFollowProject }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpenUnlock = () => setOpen(true);
    window.addEventListener("lumi-open-unlock", onOpenUnlock);
    return () => window.removeEventListener("lumi-open-unlock", onOpenUnlock);
  }, []);

  const unlockDemo = (nextMessage) => {
    localStorage.setItem(DEMO_UNLOCK_KEY, "true");
    window.dispatchEvent(new Event("lumi-demo-unlocked"));
    setStatus("success");
    setMessage(nextMessage);
    setOpen(false);
  };

  const submit = async (event) => {
    event.preventDefault();
    const cleanEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setStatus("error");
      setMessage("Nhap email dung de mo demo nhe.");
      return;
    }

    setStatus("loading");
    setMessage("Lumi Bot dang mo demo...");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.ok) {
        if (data.code === "invalid_email") {
          setStatus("error");
          setMessage(data.message || "Email chua dung dinh dang.");
          return;
        }
        unlockDemo("Demo da mo. Email se duoc luu khi he thong san sang.");
        setEmail("");
        return;
      }

      unlockDemo(data.status === "already_subscribed" ? "Email nay da co roi. Demo da mo." : "Xong roi. Demo da mo.");
      setEmail("");
    } catch {
      unlockDemo("Demo da mo tren trinh duyet nay.");
      setEmail("");
    }
  };

  return (
    <aside className={open ? "journey-widget open" : "journey-widget"} aria-label="Dang nhap">
      <button className="journey-widget-main" type="button" onClick={() => setOpen((value) => !value)}>
        <span className="journey-widget-avatar">
          <img src="/lumi-bot.png" alt="" />
        </span>
        <span className="journey-widget-body">
          <span className="journey-widget-top">
            <strong>Dang nhap</strong>
            <small>Project 1/21</small>
          </span>
          <span className="journey-widget-progress" aria-hidden="true">
            <i />
          </span>
          <span className="journey-widget-action">{open ? "Dong lai" : "Dang nhap"}</span>
        </span>
      </button>

      {open && (
        <form className="journey-widget-panel" onSubmit={(event) => event.preventDefault()} noValidate>
          <button className="journey-widget-close" type="button" onClick={() => setOpen(false)} aria-label="Dong">
            x
          </button>
          <span className="follow-badge">Mien phi</span>
          <h3>Dang nhap de xem day du</h3>
          <p>Dang nhap Google xong, Caption AI se mo full demo tu dong.</p>
          {!user ? (
            <>
              <button className="widget-login-primary" type="button" onClick={onOpenLogin}>
                Dang nhap Google
              </button>
            </>
          ) : (
            <p className="follow-message success">Ban da dang nhap. Demo da mo.</p>
          )}
          {user && (
            <button className="follow-project-btn" type="button" onClick={() => onFollowProject("caption-ai")}>
              {followedProjects.includes("caption-ai") ? "Dang theo doi Caption AI" : "Theo doi Caption AI"}
            </button>
          )}
          {profile && (
            <div className="widget-user-line">
              {profile.avatar ? <img src={profile.avatar} alt="" /> : <span>{profile.name.charAt(0)}</span>}
              <small>{profile.email}</small>
            </div>
          )}
        </form>
      )}
    </aside>
  );
}

function UpcomingSection() {
  return (
    <section id="upcoming" className="section upcoming-section">
      <div className="section-head" data-reveal>
        <span className="section-label">Sắp tới sẽ có gì?</span>
        <h2>Dự án tiếp theo</h2>
        <p className="section-note">
          Mỗi project là một tool nhỏ, dễ hiểu, có demo thật để mở lên thử.
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
          <h2>21 ngày dùng AI tốt hơn</h2>
          <p>
            Mỗi ngày 1 việc nhỏ, thực tế, dễ làm theo.
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

function DashboardPage({ profile, followedProjects, membership, authLoading, onGoogleLogin, onSignOut, onFollowProject }) {
  const followed = projectCatalog.filter((project) => followedProjects.includes(project.slug));

  return (
    <main className="dashboard-page">
      <section className="dashboard-hero">
        <a className="back-home-link" href="/">← Về trang chủ</a>
        <span className="section-label">Dashboard cá nhân</span>
        <h1>Khu theo dõi project của bạn</h1>
        <p>
          Đây là nơi lưu các project bạn quan tâm. Trước mắt rất đơn giản:
          đăng nhập Google, theo dõi project, rồi quay lại xem tiếp khi Lumi Labs cập nhật.
        </p>
      </section>

      {authLoading ? (
        <section className="dashboard-card">
          <h2>Đang kiểm tra đăng nhập...</h2>
        </section>
      ) : !profile ? (
        <section className="dashboard-card protected-card">
          <img src="/lumi-bot.png" alt="" />
          <div>
            <span className="follow-badge">Cần đăng nhập</span>
            <h2>Đăng nhập Google để mở dashboard.</h2>
            <p>
              Không cần mật khẩu mới. Google chỉ giúp Lumi Labs ghi nhớ bạn và các project bạn theo dõi.
            </p>
            <SocialLoginButton provider="google" onClick={onGoogleLogin} />
          </div>
        </section>
      ) : (
        <>
          <section className="dashboard-card account-card">
            {profile.avatar ? <img src={profile.avatar} alt="" /> : <span>{profile.name.charAt(0)}</span>}
            <div>
              <h2>{profile.name}</h2>
              <p>{profile.email}</p>
            </div>
            <button type="button" onClick={onSignOut}>Đăng xuất</button>
          </section>

          <section className="dashboard-grid">
            <article className="dashboard-card">
              <span className="section-label">Đang theo dõi</span>
              <h2>{followed.length || 0} project</h2>
              <p>Project bạn follow sẽ hiện ở đây để sau này mở hướng dẫn sâu hơn.</p>
            </article>
            <article className="dashboard-card">
              <span className="section-label">Quyền truy cập</span>
              <h2>{membership?.plan === "vip" ? "VIP" : "Cơ bản"}</h2>
              <p>
                {membership?.plan === "vip"
                  ? "Bạn có thể xem toàn bộ nội dung đang mở trong Lumi Labs."
                  : "Homepage, demo cơ bản và project đang theo dõi. Gói đầy đủ có thể mở sau."}
              </p>
            </article>
          </section>

          <section className="dashboard-card">
            <div className="dashboard-section-head">
              <div>
                <span className="section-label">Danh sách project</span>
                <h2>Project của Lumi Labs</h2>
              </div>
            </div>
            <div className="dashboard-project-list">
              {projectCatalog.map((project) => {
                const isFollowed = followedProjects.includes(project.slug);
                return (
                  <article key={project.slug} className="dashboard-project-item">
                    <div>
                      <small>{project.status}</small>
                      <h3>{project.title}</h3>
                      <p>{project.desc}</p>
                    </div>
                    <button type="button" onClick={() => onFollowProject(project.slug)}>
                      {isFollowed ? "Đang theo dõi" : "Theo dõi"}
                    </button>
                  </article>
                );
              })}
            </div>
          </section>
        </>
      )}
    </main>
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
  const auth = useAuth();
  const currentPath = window.location.pathname;
  const isDashboard = currentPath === "/dashboard";
  const isCaptionPage = currentPath === "/caption-ai";
  const isProjectsPage = currentPath === "/projects";
  const isChallengePage = currentPath === "/challenge";
  const [loginOpen, setLoginOpen] = useState(false);

  if (isDashboard) {
    return (
      <>
        <Header
          profile={auth.profile}
          onOpenLogin={() => setLoginOpen(true)}
          onSignOut={auth.signOut}
        />
        <DashboardPage
          profile={auth.profile}
          followedProjects={auth.followedProjects}
          membership={auth.membership}
          authLoading={auth.authLoading}
          onGoogleLogin={auth.signInWithGoogle}
          onSignOut={auth.signOut}
          onFollowProject={auth.followProject}
        />
        {loginOpen && (
          <LoginModal
            onClose={() => setLoginOpen(false)}
            onGoogleLogin={auth.signInWithGoogle}
          />
        )}
      </>
    );
  }

  if (isCaptionPage || isProjectsPage || isChallengePage) {
    return (
      <>
        <Header
          profile={auth.profile}
          onOpenLogin={() => setLoginOpen(true)}
          onSignOut={auth.signOut}
        />
        <main>
          {isCaptionPage && <CaptionAISection user={auth.user} onOpenLogin={() => setLoginOpen(true)} />}
          {isProjectsPage && <UpcomingSection />}
          {isChallengePage && <ChallengeSection />}
        </main>
        <JourneyWidgetV2
          user={auth.user}
          profile={auth.profile}
          followedProjects={auth.followedProjects}
          onOpenLogin={() => setLoginOpen(true)}
          onFollowProject={auth.followProject}
        />
        <Footer />
        {loginOpen && (
          <LoginModal
            onClose={() => setLoginOpen(false)}
            onGoogleLogin={auth.signInWithGoogle}
          />
        )}
      </>
    );
  }

  return (
    <>
      <Header
        profile={auth.profile}
        onOpenLogin={() => setLoginOpen(true)}
        onSignOut={auth.signOut}
      />
      <main>
        <Hero onOpenLogin={() => setLoginOpen(true)} />
      </main>
      {loginOpen && (
        <LoginModal
          onClose={() => setLoginOpen(false)}
          onGoogleLogin={auth.signInWithGoogle}
        />
      )}
    </>
  );
}

export default App;
