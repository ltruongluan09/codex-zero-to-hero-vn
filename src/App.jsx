import { useEffect, useRef, useState } from "react";
import { getUserProfile, hasSupabaseConfig, supabase } from "./supabaseClient";

const navItems = [
  { label: "Trang chủ", href: "/" },
  { label: "Demo AI", href: "/projects" },
  { label: "Bài học", href: "/bai-viet.html" },
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

const documentAnalysisTypes = [
  { id: "contract", label: "Hợp đồng", hint: "Tìm rủi ro trước khi ký" },
  { id: "quote", label: "Báo giá", hint: "Soát giá, điều kiện, bảo hành" },
  { id: "finance", label: "Số liệu", hint: "Nhìn nhanh điểm bất thường" },
  { id: "report", label: "Báo cáo", hint: "Tóm tắt ý chính dễ hiểu" },
];

const sampleDocumentResult = {
  document_type: "Chưa đọc được nội dung thật",
  summary:
    "DocScan đã nhận file, nhưng chưa phân tích được nội dung thật của tài liệu này. Kết quả bên dưới chỉ là trạng thái an toàn, không phải nhận xét về file của bạn.",
  key_points: [
    {
      label: "Trạng thái",
      value: "File đã được chọn, nhưng AI chưa trả về bản phân tích bám theo nội dung thật.",
      importance: "high",
    },
    {
      label: "Nên làm gì",
      value: "Hãy thử lại với file PDF, Word, Excel hoặc ảnh rõ nét hơn. Nếu vẫn lỗi, Lumi Labs cần kiểm tra kết nối AI.",
      importance: "medium",
    },
  ],
  risks_or_notes: [
    {
      title: "Chưa có nhận xét từ nội dung thật",
      detail: "Lumi Bot chưa đọc được nội dung bên trong file, nên chưa thể chỉ ra điểm cần chú ý cụ thể.",
      severity: "medium",
    },
  ],
  suggested_questions: [
    "File này có đúng định dạng được hỗ trợ không?",
    "Tài liệu có bị mờ, scan lệch hoặc quá nặng không?",
    "Nếu thử lại vẫn lỗi, Lumi Labs có cần kiểm tra kết nối AI không?",
  ],
  action_items: [
    "Thử upload lại file rõ hơn hoặc nhỏ hơn 20MB.",
    "Nếu vẫn chưa được, hãy thử lại sau ít phút.",
  ],
  score: 0,
  verdict: "Chưa đọc được nội dung thật của file.",
  verdict_icon: "🔒",
  risks: [
    {
      level: "medium",
      title: "Chưa có nhận xét từ nội dung thật",
      body: "Lumi Bot chưa đọc được nội dung bên trong file, nên chưa thể chỉ ra điểm cần chú ý cụ thể.",
    },
  ],
  keyPoints: [
    "File đã được chọn nhưng chưa có bản phân tích thật.",
    "Không hiển thị rủi ro giả nếu AI chưa đọc được tài liệu.",
  ],
  questions: [
    "File này có đúng định dạng được hỗ trợ không?",
    "Nếu thử lại vẫn lỗi, Lumi Labs có cần kiểm tra kết nối AI không?",
  ],
  plainSummary:
    "DocScan đã nhận file nhưng chưa đọc được nội dung thật, nên chưa đưa ra nhận xét cụ thể.",
};

const AUTH_RETURN_PATH_KEY = "lumi_auth_return_path";

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
    desc: "Nhập vài dòng, nhận caption TikTok/Facebook và hashtag tiếng Việt.",
    outcome: "Giúp creator, shop nhỏ và freelancer bớt bí khi đăng bài.",
    status: "Demo mở sẵn",
    href: "/caption-ai",
    journeyHref: "/project-01-caption-ai.html",
    icon: "✍️",
    tag: "Content AI",
  },
  {
    slug: "docscan-ai",
    title: "DocScan AI",
    desc: "Một chạm để AI đọc nhanh hợp đồng, báo giá, báo cáo hoặc ảnh chụp.",
    outcome: "Giúp dân văn phòng hiểu tài liệu nhanh hơn trước khi chuyển tiếp.",
    status: "Demo mở sẵn",
    href: "/docscan-ai",
    journeyHref: "/project-02-docscan-ai.html",
    icon: "📄",
    tag: "Document AI",
  },
  {
    slug: "excel-report-ai",
    title: "Excel Report AI",
    desc: "Biến dữ liệu Excel thành báo cáo dễ đọc.",
    outcome: "Dành cho người cần gửi báo cáo nhanh cho sếp hoặc team.",
    status: "Sắp làm",
    href: "/projects",
    journeyHref: "/projects",
    icon: "📊",
    tag: "Office AI",
  },
  {
    slug: "ai-office-tools",
    title: "AI Office Tools",
    desc: "Bộ công cụ AI cho dân văn phòng.",
    outcome: "Gom những việc lặp lại thành các tool nhỏ, dễ dùng.",
    status: "Ý tưởng",
    href: "/projects",
    journeyHref: "/projects",
    icon: "🧰",
    tag: "Toolkit",
  },
];

const beginnerArticles = [
  {
    title: "Prompt AI hiệu quả: 5 nguyên tắc đơn giản",
    desc: "Biết cách giao việc để AI hiểu bạn hơn và trả kết quả dùng được ngay.",
    href: "/prompt-ai-hieu-qua.html",
    tag: "Hướng dẫn",
    time: "8 phút đọc",
    image: "/lumi-bot.png",
  },
  {
    title: "Codex thực chiến: tự tạo tool bằng AI trong 4 buổi",
    desc: "Một series từng bước để người không biết code vẫn biết giao việc cho Codex và tạo tool đầu tiên.",
    href: "/codex-training-thuc-chien.html",
    tag: "Series",
    time: "4 buổi",
    icon: "🎓",
  },
  {
    title: "Nhờ AI viết email dễ nghe hơn",
    desc: "Soạn email lịch sự, rõ ý, không bị cứng cho công việc hằng ngày.",
    href: "/ai-viet-email-de-hieu.html",
    tag: "Văn phòng",
    time: "5 phút đọc",
    icon: "✉",
  },
  {
    title: "Tóm tắt cuộc họp bằng AI sao cho ra việc",
    desc: "Biến ghi chú họp thành việc cần làm, người phụ trách và deadline.",
    href: "/ai-tom-tat-cuoc-hop.html",
    tag: "Cuộc họp",
    time: "5 phút đọc",
    icon: "☑",
  },
  {
    title: "Biến việc rối thành checklist bằng AI",
    desc: "Khi chưa biết bắt đầu từ đâu, để AI chia việc thành từng bước nhỏ.",
    href: "/ai-lap-checklist-cong-viec.html",
    tag: "Checklist",
    time: "6 phút đọc",
    icon: "🧭",
  },
  {
    title: "Chụp ảnh tài liệu rồi nhờ AI giải thích",
    desc: "Dùng AI đọc hóa đơn, báo giá, hợp đồng ngắn hoặc ảnh chụp từ Zalo.",
    href: "/ai-doc-anh-tai-lieu.html",
    tag: "Tài liệu",
    time: "6 phút đọc",
    icon: "📄",
  },
  {
    title: "Viết bài đăng bán hàng đầu tiên bằng AI",
    desc: "Có bản nháp gần gũi để sửa nhanh, không còn nhìn màn hình trống.",
    href: "/ai-viet-bai-dang-ban-hang.html",
    tag: "Bán hàng",
    time: "5 phút đọc",
    icon: "✍",
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

  const getCleanAuthPath = () => {
    const url = new URL(window.location.href);
    const hadAuthHash = url.hash.includes("access_token=") || url.hash.includes("error=");
    const hadAuthCode = url.searchParams.has("code");
    ["code", "error", "error_code", "error_description"].forEach((key) => {
      url.searchParams.delete(key);
    });
    if (hadAuthHash) {
      url.hash = "";
    }
    const cleanPath = `${url.pathname}${url.search}${url.hash}` || "/";
    return { cleanPath, shouldClean: hadAuthHash || hadAuthCode };
  };

  const cleanAuthUrl = () => {
    const { cleanPath, shouldClean } = getCleanAuthPath();

    if (shouldClean) {
      window.history.replaceState(null, "", cleanPath);
    }

    return cleanPath;
  };

  const finishAuthRedirect = () => {
    const returnPath = localStorage.getItem(AUTH_RETURN_PATH_KEY);
    const cleanPath = cleanAuthUrl();
    localStorage.removeItem(AUTH_RETURN_PATH_KEY);

    if (returnPath && returnPath !== cleanPath) {
      window.location.replace(returnPath);
      return true;
    }

    return false;
  };

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

    const applySession = async (nextSession) => {
      if (!active) return false;
      setSession(nextSession);
      setUser(nextSession?.user || null);
      if (nextSession?.user) {
        setProfile(getUserProfile(nextSession.user));
        await Promise.race([
          Promise.allSettled([
            syncProfile(nextSession.user),
            loadFollowedProjects(nextSession.user.id),
            loadMembership(nextSession.user.id),
          ]),
          new Promise((resolve) => setTimeout(resolve, 1800)),
        ]);
        if (finishAuthRedirect()) return;
      } else {
        setProfile(null);
        setFollowedProjects([]);
        setMembership(null);
      }
      return true;
    };

    const initAuth = async () => {
      const url = new URL(window.location.href);

      if (url.searchParams.has("code")) {
        try {
          await supabase.auth.exchangeCodeForSession(url.searchParams.get("code"));
        } catch (error) {
          console.error("OAuth callback exchange failed", error);
        } finally {
          cleanAuthUrl();
        }
      }

      try {
        const { data } = await Promise.race([
          supabase.auth.getSession(),
          new Promise((resolve) => setTimeout(() => resolve({ data: { session: null } }), 1800)),
        ]);
        await applySession(data.session);
      } catch (error) {
        console.warn("Auth init did not finish cleanly", error);
      } finally {
        if (active) setAuthLoading(false);
      }
    };

    initAuth();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      await applySession(nextSession);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const signInWithProvider = async (provider) => {
    if (!supabase) {
      return {
        ok: false,
        message: "Chưa cấu hình đăng nhập ở môi trường này. Nếu đang chạy local, hãy thêm Supabase URL và Publishable Key vào file .env.local rồi khởi động lại dev server.",
      };
    }
    const returnPath = `${window.location.pathname}${window.location.search}`;
    const isLuanDomain = /(^|\.)luanai\.io\.vn$/.test(window.location.hostname);
    const redirectOrigin = isLuanDomain ? "https://luanai.io.vn" : window.location.origin;
    const redirectTo = `${redirectOrigin}${window.location.pathname}`;
    localStorage.setItem(AUTH_RETURN_PATH_KEY, returnPath || "/");
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
        skipBrowserRedirect: true,
        queryParams: {
          prompt: "select_account",
        },
      },
    });

    if (error) {
      console.error("OAuth login failed", error);
      return {
        ok: false,
        message: error.message || "Chưa mở được màn hình đăng nhập Google. Bạn thử lại giúp mình nhé.",
      };
    }

    if (data?.url) {
      window.location.assign(data.url);
      return { ok: true };
    }

    return {
      ok: false,
      message: "Chưa lấy được đường dẫn đăng nhập Google. Bạn thử refresh trang rồi bấm lại nhé.",
    };
  };

  const signInWithGoogle = () => signInWithProvider("google");
  const signInWithFacebook = () => signInWithProvider("facebook");

  const signOut = async () => {
    const clearLocalAuth = () => {
      setSession(null);
      setUser(null);
      setProfile(null);
      setFollowedProjects([]);
      setMembership(null);
    };

    localStorage.removeItem(AUTH_RETURN_PATH_KEY);
    cleanAuthUrl();

    try {
      if (supabase) {
        await Promise.race([
          supabase.auth.signOut({ scope: "local" }),
          new Promise((resolve) => setTimeout(resolve, 1600)),
        ]);
      }
    } catch (error) {
      console.warn("Supabase sign out did not finish cleanly", error);
    } finally {
      clearLocalAuth();
    }
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

function SocialLoginButton({ provider, onClick, disabled = false, label }) {
  const defaultLabel = provider === "facebook" ? "Đăng nhập bằng Facebook" : "Đăng nhập bằng Google";
  const letter = provider === "facebook" ? "f" : "G";

  return (
    <button className={`social-login-btn ${provider}`} type="button" onClick={onClick} disabled={disabled}>
      <span>{letter}</span>
      {label || defaultLabel}
    </button>
  );
}

function LoginButton({ onClick }) {
  return (
    <button className="login-entry-btn" type="button" onClick={onClick}>
      <span>G</span>
      Đăng nhập
    </button>
  );
}

function UserMenu({ profile, onSignOut }) {
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const initial = profile?.name?.charAt(0) || profile?.email?.charAt(0) || "L";

  const handleSignOut = async () => {
    setSigningOut(true);
    setOpen(false);
    try {
      await onSignOut();
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
          <a href="/dashboard">Khu bắt đầu nhanh</a>
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
  const mobileInitial = profile?.name?.charAt(0) || profile?.email?.charAt(0) || "L";
  const openLoginFromDrawer = () => {
    setOpen(false);
    onOpenLogin();
  };

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
        </nav>
        <div className="nav-actions">
          <a className="nav-cta" href="/projects">Thử demo</a>
          {profile ? (
            <UserMenu profile={profile} onSignOut={onSignOut} />
          ) : (
            <LoginButton onClick={onOpenLogin} />
          )}
          {profile && (
            <a className="mobile-user-avatar" href="/dashboard" aria-label="Khu bắt đầu nhanh">
              {profile.avatar ? <img src={profile.avatar} alt="" /> : <span>{mobileInitial}</span>}
            </a>
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
        {profile && <a href="/dashboard" onClick={() => setOpen(false)}>Khu bắt đầu nhanh</a>}
        <a className="nav-cta drawer-cta" href="/projects" onClick={() => setOpen(false)}>
          Thử demo đang mở
        </a>
        {profile ? (
          <UserMenu profile={profile} onSignOut={onSignOut} />
        ) : (
          <LoginButton onClick={openLoginFromDrawer} />
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
  const activeProjects = projectCatalog.slice(0, 2);
  const mainArticle = beginnerArticles[0];
  const codexSeries = beginnerArticles.find((article) => article.href === "/codex-training-thuc-chien.html");
  const sideArticles = beginnerArticles
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

function LumiAssistant({ path }) {
  const [open, setOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showCommunity, setShowCommunity] = useState(false);
  const [assistantReply, setAssistantReply] = useState("");
  const zaloCommunityUrl = "https://zalo.me/g/sf1nek4pce9gkmvz5cos";

  const quickActions = [
    { label: "📄 Đọc thử tài liệu", href: "/docscan-ai" },
    { label: "✍️ Tạo caption", href: "/caption-ai" },
    { label: "🚀 Xem project mới", href: "/projects" },
  ];

  const toggleOpen = () => {
    setOpen((value) => !value);
  };

  const rememberInteraction = () => {
    setHasInteracted(true);
  };

  const helpMeStart = () => {
    setHasInteracted(true);
    setShowCommunity(true);
    setAssistantReply("Nếu bạn mới bắt đầu, hãy thử DocScan trước. Chỉ cần upload tài liệu và xem AI phân tích.");
  };

  return (
    <aside className={open ? "lumi-assistant open" : "lumi-assistant"} aria-label="Lumi Assistant dẫn đường">
      <button className="lumi-assistant-orb" type="button" onClick={toggleOpen} aria-expanded={open}>
        <span className="lumi-orb-ring" />
        <img src="/lumi-bot.png" alt="" />
        <b>Lumi</b>
      </button>
      {open && (
        <div className="lumi-assistant-panel">
          <div className="lumi-assistant-head">
            <span>Lumi đang dẫn đường</span>
            <button type="button" onClick={toggleOpen} aria-label="Ẩn Lumi Assistant">×</button>
          </div>
          <div className="lumi-assistant-intro">
            <img src="/lumi-bot.png" alt="" />
            <div>
              <h2>Bạn mới vào Lumi Labs?</h2>
              <p>Mình sẽ dẫn bạn thử nhanh một demo AI phù hợp.</p>
            </div>
          </div>
          <div className="lumi-assistant-quick-actions">
            {quickActions.map((action) => (
              <a key={action.href} href={action.href} onClick={rememberInteraction}>
                {action.label}
              </a>
            ))}
            <button type="button" onClick={helpMeStart}>
              💬 Tôi chưa biết bắt đầu từ đâu
            </button>
          </div>
          {assistantReply && <p className="lumi-assistant-reply">{assistantReply}</p>}
          {showCommunity && (
            <div className="lumi-assistant-community">
              <span>💡</span>
              <div>
                <strong>Muốn theo dõi hành trình build AI Hub?</strong>
                <small>Lumi thường update demo mới, workflow AI thực tế và nhận góp ý trong cộng đồng.</small>
                <a href={zaloCommunityUrl} target="_blank" rel="noreferrer">
                  Theo dõi hành trình
                </a>
              </div>
            </div>
          )}
        </div>
      )}
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

function ProjectsPage() {
  const readyProjects = projectCatalog.filter((project) => project.href !== "/projects");
  const comingProjects = projectCatalog.filter((project) => project.href === "/projects");
  const ctaLabel = {
    "caption-ai": "Viết caption ngay",
    "docscan-ai": "Đọc tài liệu ngay",
  };
  const usefulFor = {
    "caption-ai": "Phù hợp shop nhỏ, creator, freelancer, nhân viên marketing cần đăng bài nhanh.",
    "docscan-ai": "Phù hợp người cần đọc nhanh hợp đồng, báo giá, báo cáo, ảnh chụp tài liệu.",
  };

  return (
    <section className="projects-page">
      <section className="projects-hero" data-reveal>
        <span className="caption-badge">Chọn 1 demo để thử ngay</span>
        <h1>Tool AI thật, mở lên là dùng được</h1>
        <p>
          Nếu bạn mới vào Lumi Labs, hãy bắt đầu bằng một trong hai demo đang chạy.
          Không cần đăng nhập, không cần biết code, chỉ cần bấm thử.
        </p>
        <div className="projects-quick-actions">
          {readyProjects.map((project) => (
            <a key={project.slug} href={project.href}>
              <span>{project.icon}</span>
              <strong>{ctaLabel[project.slug] || "Dùng thử ngay"}</strong>
              <small>{project.title}</small>
            </a>
          ))}
        </div>
      </section>

      <section className="projects-ready-strip" data-reveal>
        <strong>Đang dùng được ngay</strong>
        <span>{readyProjects.length} demo mở sẵn · Không cần tài khoản · Dành cho người non-tech</span>
      </section>

      <section className="project-library-grid">
        {readyProjects.map((project, index) => (
          <article className="project-library-card unified-project-card ready-project" key={project.slug} data-reveal>
            <div className="project-card-top">
              <span className="project-icon">{project.icon}</span>
              <div>
                <small>Project #{index + 1} · {project.tag}</small>
                <h2>{project.title}</h2>
              </div>
              <b>Dùng được</b>
            </div>
            <p>{project.desc}</p>
            <p className="project-fit">{usefulFor[project.slug]}</p>
            <em>{project.outcome}</em>
            <div className="project-card-actions">
              <a href={project.href}>{ctaLabel[project.slug] || "Dùng thử ngay"}</a>
              <a className="ghost" href={project.journeyHref}>{project.journeyHref === "/projects" ? "Chưa có hành trình" : "Xem hành trình"}</a>
            </div>
          </article>
        ))}
      </section>

      <section className="projects-coming-section" data-reveal>
        <div>
          <span className="section-label">Sắp tới</span>
          <h2>Dự án tiếp theo</h2>
          <p>Mình để các ý tưởng chưa sẵn sàng ở đây để bạn không bấm nhầm vào demo chưa hoàn thiện.</p>
        </div>
        <div className="projects-coming-list">
          {comingProjects.map((project) => (
            <article key={project.slug}>
              <span>{project.icon}</span>
              <div>
                <strong>{project.title}</strong>
                <small>{project.desc}</small>
              </div>
              <b>Sắp có</b>
            </article>
          ))}
        </div>
      </section>
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

function LumiFeedbackCard({ project, projectLabel, context = "", profile = null, metadata = {} }) {
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const ratingOptions = [
    {
      id: "good",
      icon: "😍",
      label: "Hữu ích",
      note: "Đúng thứ mình cần",
    },
    {
      id: "okay",
      icon: "🙂",
      label: "Tạm ổn",
      note: "Cần chỉnh thêm",
    },
    {
      id: "bad",
      icon: "😢",
      label: "Chưa đúng",
      note: "Lumi cần học lại",
    },
  ];

  const submitFeedback = async (nextRating = rating) => {
    if (!nextRating || status === "sending") return;
    setStatus("sending");
    setMessage("Lumi đang ghi nhận góp ý của bạn...");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project,
          rating: nextRating,
          comment,
          page_path: `${window.location.pathname}${window.location.search}`,
          profile: profile ? { name: profile.name, email: profile.email } : {},
          metadata: {
            context,
            ...metadata,
          },
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.ok === false) {
        throw new Error(data.message || "Chưa gửi được góp ý.");
      }
      setStatus("sent");
      setMessage(
        nextRating === "good"
          ? "Cảm ơn bạn. Lumi sẽ học từ những lần dùng thật như thế này."
          : "Cảm ơn bạn. Góp ý này giúp Lumi biết cần sửa đúng chỗ nào."
      );
    } catch {
      setStatus("sent");
      setMessage("Cảm ơn bạn. Lumi đã nhận tín hiệu này, mình sẽ kiểm tra lại phần lưu góp ý.");
    }
  };

  const chooseRating = (nextRating) => {
    setRating(nextRating);
    setMessage("");
    if (nextRating === "good") {
      submitFeedback(nextRating);
    } else {
      setStatus("idle");
    }
  };

  return (
    <section className="lumi-feedback-card" aria-label={`Góp ý cho ${projectLabel}`}>
      <div className="lumi-feedback-bot" aria-hidden="true">
        <span></span>
        <img src="/lumi-bot.png" alt="" />
      </div>
      <div className="lumi-feedback-copy">
        <span className="lumi-feedback-kicker">Lumi hỏi nhanh nhé</span>
        <h3>Kết quả này có giúp bạn không?</h3>
        <p>Chỉ một chạm thôi. Lumi Labs sẽ dựa vào phản hồi thật để làm tool này dễ dùng hơn cho mọi người.</p>
      </div>
      <div className="lumi-feedback-actions">
        {ratingOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            className={rating === option.id ? "active" : ""}
            onClick={() => chooseRating(option.id)}
            disabled={status === "sending"}
          >
            <span>{option.icon}</span>
            <strong>{option.label}</strong>
            <small>{option.note}</small>
          </button>
        ))}
      </div>
      {rating && rating !== "good" && (
        <div className="lumi-feedback-comment">
          <label>
            Bạn muốn Lumi làm tốt hơn chỗ nào?
            <textarea
              data-clarity-mask="True"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Ví dụ: đọc thiếu nội dung, tóm tắt chưa đúng, caption chưa giống giọng người Việt..."
              rows="3"
            />
          </label>
          <button type="button" onClick={() => submitFeedback()} disabled={status === "sending"}>
            {status === "sending" ? "Đang gửi..." : "Gửi góp ý"}
          </button>
        </div>
      )}
      {message && <p className={status === "sent" ? "lumi-feedback-status done" : "lumi-feedback-status"}>{message}</p>}
    </section>
  );
}

function CaptionAISection({ profile = null }) {
  const [productName, setProductName] = useState(captionExamples[0].productName);
  const [description, setDescription] = useState(captionExamples[0].description);
  const [result, setResult] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [source, setSource] = useState("demo");
  const [copied, setCopied] = useState("");
  const [error, setError] = useState("");
  const generate = async (override = null) => {
    const nextProductName = override?.productName ?? productName;
    const nextDescription = override?.description ?? description;
    if (!nextProductName.trim()) return;
    setIsGenerating(true);
    setCopied("");
    setError("");
    try {
      const response = await fetch("/api/generate-caption", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName: nextProductName, description: nextDescription, mode: "ban-hang" }),
      });
      const data = await response.json();
      if (!response.ok || data.error) {
        setError(data.error || "Lumi Bot chưa tạo được caption lúc này. Bạn thử lại sau vài giây nhé.");
        return;
      }
      setResult({
        tiktok: data.tiktok,
        facebook: data.facebook,
        hashtags: data.hashtags,
      });
      setSource(data.source === "gemini" ? "gemini" : "fallback");
    } catch {
      setError("Kết nối hơi chập chờn. Lumi Bot chưa gửi được yêu cầu, bạn thử lại sau vài giây nhé.");
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
    generate(sample);
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
            Viết 1-2 dòng về thứ bạn muốn đăng. Lumi Bot sẽ tự tạo caption TikTok,
            Facebook và hashtag tiếng Việt trong một lần bấm.
          </p>
          <div className="caption-mini-proof">
            <span>Xem cách hoạt động</span>
            <span>Dùng full miễn phí</span>
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
              <span>1. Bạn muốn đăng gì?</span>
              <button type="button" className="sample-btn" onClick={() => useSample()}>
                Thử mẫu
              </button>
            </div>
            <label>
              Sản phẩm / dịch vụ
              <input
                data-clarity-mask="True"
                value={productName}
                onChange={(event) => setProductName(event.target.value)}
                placeholder="Ví dụ: Bánh chuối ít ngọt"
              />
            </label>
            <label>
              Nói thêm một câu
              <textarea
                data-clarity-mask="True"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Ví dụ: Ăn sáng nhanh, phù hợp dân văn phòng, không quá ngọt..."
                rows="4"
              />
            </label>
            <p className="form-helper">Không cần chọn nhiều. Lumi Bot tự viết bản dễ dùng nhất trước.</p>
            <button
              className={!productName.trim() ? "generate-btn idle" : "generate-btn"}
              type="button"
              onClick={generate}
              disabled={isGenerating || !productName.trim()}
            >
              {!productName.trim()
                ? "Nhập sản phẩm để bắt đầu"
                : isGenerating
                  ? "Đang viết caption..."
                  : "Viết caption cho tôi →"}
            </button>
            {error && <em className="caption-error">{error}</em>}
            <p className="caption-source">
              {isGenerating
                ? "AI đang đọc thông tin và viết bản nháp đầu tiên..."
                : source === "gemini"
                ? "Đang dùng Gemini để viết caption thật."
                : source === "fallback"
                  ? "Đang dùng bản demo dự phòng. Thêm Gemini API key để kết quả hay hơn."
                  : "Một lần bấm sẽ có đủ TikTok, Facebook và hashtag."}
            </p>
          </div>

          <div className={result ? "caption-results" : "caption-results empty"} data-lumi-sensitive={result ? "true" : undefined}>
            <div className="caption-result-head">
              <div>
                <strong>2. Kết quả sẵn sàng</strong>
                <small>TikTok, Facebook và hashtag nằm chung một chỗ để bạn copy nhanh.</small>
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
                <LumiFeedbackCard
                  project="caption-ai"
                  projectLabel="Caption AI"
                  context="Sau khi tao caption"
                  profile={profile}
                  metadata={{ source, productName: productName.slice(0, 80) }}
                />
              </>
            ) : (
              <article className="empty-result">
                <span>2. Xem kết quả</span>
                <h3>Caption sẽ hiện ở đây sau một lần bấm.</h3>
                <p>
                  Nhập sản phẩm, viết thêm một câu nếu muốn, rồi bấm nút tím. Không cần chọn nền tảng trước.
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

function DocScanAISection({ profile = null }) {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [source, setSource] = useState("sample");
  const [loading, setLoading] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [filePickerHint, setFilePickerHint] = useState(false);
  const [pickerNudge, setPickerNudge] = useState(false);
  const [rawTextOpen, setRawTextOpen] = useState(false);
  const [rawTextCopied, setRawTextCopied] = useState(false);

  const steps = ["Đọc tài liệu", "Tìm điểm chính", "Nhận diện điểm cần chú ý", "Gợi ý bước tiếp theo"];
  const allowedExtensions = [".pdf", ".docx", ".xlsx", ".xls", ".csv", ".txt", ".png", ".jpg", ".jpeg", ".webp"];
  const getFriendlyFileName = (nextFile) => {
    if (!nextFile?.name) return "";
    const name = nextFile.name;
    const ext = name.match(/\.([a-z0-9]+)$/i)?.[1]?.toUpperCase();
    const base = name.replace(/\.[^.]+$/, "");
    const isCameraName = /^[0-9_\-\s]{12,}$/.test(base) || /^(img|image|photo|zalo|messenger|screenshot|pxl|dsc|dcim)[_\-\s0-9]+$/i.test(base);
    if (nextFile.type?.startsWith("image/")) {
      return ext ? `Ảnh tài liệu (${ext})` : "Ảnh tài liệu";
    }
    if (isCameraName) {
      return ext ? `Tài liệu vừa chọn (${ext})` : "Tài liệu vừa chọn";
    }
    return name.length > 42 ? `${name.slice(0, 26)}...${name.slice(-10)}` : name;
  };
  const friendlyFileName = getFriendlyFileName(file);
  const fileMeta = file
    ? `${file.type?.startsWith("image/") ? "Ảnh chụp" : "File"} · ${Math.max(1, Math.round(file.size / 1024))}KB`
    : "";
  const uploadStatus = loading
    ? "Đang đọc tài liệu..."
    : error
      ? "Cần thử lại"
      : result
        ? "Đọc xong"
        : file
          ? "Đã nhận file"
          : "Chưa chọn file";

  useEffect(() => {
    if (!loading) return undefined;
    const timer = setInterval(() => setStepIndex((value) => (value + 1) % steps.length), 800);
    return () => clearInterval(timer);
  }, [loading]);

  const toBase64 = (nextFile) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result).split(",")[1] || "");
      reader.onerror = () => reject(new Error("Không đọc được file."));
      reader.readAsDataURL(nextFile);
    });

  const processFile = (nextFile) => {
    if (!nextFile) return;
    setPickerNudge(false);
    const fileName = nextFile.name || "";
    const lowerName = fileName.toLowerCase();
    const supported = allowedExtensions.some((ext) => lowerName.endsWith(ext));
    if (!supported) {
      setFile(null);
      setResult(null);
      setSource("sample");
      setError("File này chưa được hỗ trợ. Bạn dùng PDF, Word, Excel, CSV, TXT hoặc ảnh nhé.");
      return;
    }
    if (nextFile.size > 20 * 1024 * 1024) {
      setFile(null);
      setResult(null);
      setSource("sample");
      setError("File hơi lớn rồi. Bạn chọn file dưới 20MB giúp mình nhé.");
      return;
    }
    setFile(nextFile);
    setResult(null);
    setSource("sample");
    setError("");
    analyze(nextFile);
  };

  const selectFile = (event) => {
    setFilePickerHint(false);
    const nextFile = event.target.files?.[0];
    if (!nextFile) {
      setPickerNudge(true);
      window.setTimeout(() => setPickerNudge(false), 5200);
      return;
    }
    processFile(nextFile);
    event.target.value = "";
  };

  const openFilePicker = () => {
    if (loading) return;
    setPickerNudge(false);
    setFilePickerHint(true);
    fileInputRef.current?.click();
    window.setTimeout(() => {
      setFilePickerHint(false);
      if (!fileInputRef.current?.files?.length && !file && !loading) {
        setPickerNudge(true);
        window.setTimeout(() => setPickerNudge(false), 5200);
      }
    }, 2600);
  };

  const showSampleResult = () => {
    setFile(null);
    setError("");
    setCopied(false);
    setRawTextOpen(false);
    setRawTextCopied(false);
    setPickerNudge(false);
    setFilePickerHint(false);
    setSource("demo");
    setResult({
      document_type: "Kết quả mẫu DocScan",
      summary: "Đây là ví dụ để bạn thấy DocScan sẽ trả về gì sau khi đọc một tài liệu thật.",
      one_line_answer: "DocScan tóm tắt ý chính, chỉ ra phần nên kiểm tra và gợi ý câu nên hỏi lại.",
      verdict: "Bản mẫu giúp người mới hiểu cách dùng trước khi upload file thật.",
      verdict_icon: "✨",
      top_3_takeaways: [
        {
          title: "Nội dung chính",
          detail: "AI gom tài liệu dài thành vài ý dễ đọc, không bắt bạn tự dò từng dòng.",
        },
        {
          title: "Điểm cần chú ý",
          detail: "Những chỗ như deadline, chi phí, điều kiện hoặc phần đánh dấu sẽ được nhắc lại.",
        },
        {
          title: "Việc nên làm tiếp",
          detail: "Bạn nhận được câu hỏi nên xác nhận trước khi gửi tiếp hoặc ra quyết định.",
        },
      ],
      red_flags: [
        {
          title: "Cần kiểm tra phần quan trọng",
          detail: "Nếu tài liệu có số tiền, thời hạn, điều kiện hoặc cam kết, DocScan sẽ nhắc bạn xem kỹ.",
        },
      ],
      questions_to_ask: [
        "Thông tin quan trọng đã đủ rõ để mình quyết định chưa?",
        "Có phần nào cần hỏi lại người gửi tài liệu không?",
      ],
      next_actions: [
        "Sau khi xem mẫu, hãy thử upload ảnh, PDF, Word hoặc Excel của bạn.",
      ],
      copy_ready_summary: "DocScan AI: Kết quả mẫu gồm tóm tắt nội dung chính, điểm cần chú ý và câu nên hỏi lại.",
      extracted_text: "",
    });
  };

  const handleUploadKeyDown = (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openFilePicker();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    processFile(event.dataTransfer.files?.[0]);
  };

  const analyze = async (selectedFile = file) => {
    if (!selectedFile) return;
    setLoading(true);
    setCopied(false);
    setRawTextOpen(false);
    setRawTextCopied(false);
    setError("");
    const startedAt = Date.now();

    try {
      const fileBase64 = await toBase64(selectedFile);
      const response = await fetch("/api/analyze-document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileBase64,
          mimeType: selectedFile.type || "application/octet-stream",
          fileName: selectedFile.name,
        }),
      });
      const rawText = await response.text();
      let data = null;
      try {
        data = rawText ? JSON.parse(rawText) : null;
      } catch {
        data = null;
      }
      if (response.status === 429) {
        setError(data?.error || "Hôm nay bạn đã dùng hết lượt AI miễn phí. Bạn quay lại sau nhé.");
        setResult(null);
        return;
      }
      if (!response.ok) throw new Error(data?.error || "Chưa đọc được file.");
      const elapsed = Date.now() - startedAt;
      if (elapsed < 1100) {
        await new Promise((resolve) => setTimeout(resolve, 1100 - elapsed));
      }
      setResult(data.data || sampleDocumentResult);
      setSource(data.source || "fallback");
    } catch (nextError) {
      console.warn("DocScan fallback", nextError);
      const elapsed = Date.now() - startedAt;
      if (elapsed < 900) {
        await new Promise((resolve) => setTimeout(resolve, 900 - elapsed));
      }
      setResult(sampleDocumentResult);
      setSource("fallback");
    } finally {
      setLoading(false);
      setStepIndex(0);
    }
  };

  const copySummary = async () => {
    if (!result) return;
    const text = result.copy_ready_summary || [
      `Loại tài liệu: ${result.document_type || "Tài liệu"}`,
      `Kết luận nhanh: ${result.one_line_answer || result.summary || result.verdict}`,
      "",
      "Bạn cần biết ngay:",
      ...(result.top_3_takeaways || result.key_points || []).map((item) => `- ${item.title || item.label}: ${item.detail || item.value}`),
      "",
      "Điểm cần chú ý:",
      ...(result.red_flags || result.risks || []).map((item) => `- ${item.title}: ${item.detail || item.body}`),
      "",
      "Thông tin còn thiếu:",
      ...(result.missing_information || []).map((item) => `- ${item}`),
      "",
      "Câu nên hỏi lại:",
      ...(result.questions_to_ask || result.questions || []).map((item) => `- ${item}`),
      "",
      "Việc nên làm tiếp:",
      ...(result.next_actions || result.action_items || []).map((item) => `- ${item}`),
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const rawText = result?.extracted_text?.trim() || "";
  const docscanRisks = (result?.red_flags || result?.risks || []).filter(Boolean);
  const docscanMissingInfo = (result?.missing_information || []).filter(Boolean);
  const docscanQuestions = (result?.questions_to_ask || result?.questions || result?.suggested_questions || []).filter(Boolean);
  const docscanNextActions = (result?.next_actions || result?.action_items || []).filter(Boolean);
  const docscanEvidence = (result?.evidence_snippets || []).filter(Boolean);
  const hasDocscanAttention = Boolean(
    docscanRisks.length ||
    docscanMissingInfo.length ||
    docscanQuestions.length ||
    docscanNextActions.length ||
    docscanEvidence.length,
  );

  const copyRawText = async () => {
    if (!rawText) return;
    try {
      await navigator.clipboard.writeText(rawText);
      setRawTextCopied(true);
      setTimeout(() => setRawTextCopied(false), 2000);
    } catch {
      setRawTextCopied(false);
    }
  };

  const downloadRawText = () => {
    if (!rawText) return;
    const baseName = (file?.name || "docscan")
      .replace(/\.[^.]+$/, "")
      .replace(/[\\/:*?"<>|]/g, "-")
      .trim() || "docscan";
    const blob = new Blob([rawText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${baseName}_text.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="docscan-page">
      <div className="docscan-shell" data-reveal>
        <header className="docscan-top">
          <div className="docscan-brand">
            <span className="docscan-logo">▰</span>
            <div>
              <h1>DocScan <em>AI</em></h1>
              <p>AI đọc tài liệu và chỉ ra điểm cần chú ý.</p>
            </div>
          </div>
          <div className="docscan-helper">
            <img src="/lumi-bot.png" alt="" />
            <div>
              <strong>AI sẽ giúp bạn hiểu tài liệu</strong>
              <span>An toàn và bảo mật tuyệt đối.</span>
            </div>
          </div>
        </header>

        <div className={result ? "docscan-grid has-result" : "docscan-grid"}>
          <section id="docscan-upload" className="docscan-card docscan-upload-card">
            <div
              role="button"
              tabIndex={0}
              aria-label="Chọn tài liệu để DocScan AI phân tích"
              className={[
                "docscan-drop",
                file ? "has-file" : "",
                loading ? "is-analyzing" : "",
                error ? "has-error" : "",
                filePickerHint ? "is-picking" : "",
                dragActive ? "is-dragging" : "",
              ].filter(Boolean).join(" ")}
              onClick={openFilePicker}
              onKeyDown={handleUploadKeyDown}
              onDragEnter={(event) => {
                event.preventDefault();
                setDragActive(true);
              }}
              onDragOver={(event) => event.preventDefault()}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                data-clarity-mask="True"
                type="file"
                accept=".pdf,.docx,.xlsx,.xls,.csv,.txt,.png,.jpg,.jpeg,.webp"
                onChange={selectFile}
                onClick={(event) => event.stopPropagation()}
              />
              <span className="docscan-file-icon"><i>+</i></span>
              <strong>{file ? friendlyFileName : "Tải tài liệu lên"}</strong>
              <p>
                {loading
                  ? "Lumi Bot đang đọc file. Bạn cứ chờ ở màn hình này nhé."
                  : filePickerHint
                    ? "Đang mở hộp chọn file..."
                  : file
                    ? "Đã nhận file. Kết quả sẽ hiện ở khung bên phải sau vài giây."
                    : "Bấm vào khung này, dấu cộng hoặc nút bên dưới để chọn file."}
              </p>
              <small>{file ? fileMeta : "PDF, Word, Excel hoặc ảnh"}</small>
              {error && <em className="docscan-error">{error}</em>}
              {!file && !loading && (
                <div className="docscan-mini-steps" aria-label="Cách dùng DocScan">
                  <span>1. Chọn file</span>
                  <span>2. AI đọc</span>
                  <span>3. Nhận tóm tắt</span>
                </div>
              )}
              {pickerNudge && !file && !loading && (
                <em className="docscan-picker-nudge">Bạn chưa chọn file nào. Có thể chọn lại hoặc xem thử kết quả mẫu trước.</em>
              )}
              <div className="docscan-upload-actions">
                <button type="button" onClick={(event) => {
                  event.stopPropagation();
                  openFilePicker();
                }}>
                  {loading ? "Đang phân tích..." : file ? "Chọn file khác" : "⇧ Chọn file"}
                </button>
                {!loading && !file && (
                  <button
                    className="docscan-sample-button"
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      showSampleResult();
                    }}
                  >
                    Xem kết quả mẫu
                  </button>
                )}
              </div>
            </div>
            <div className="docscan-guidance">
              <img src="/lumi-bot.png" alt="" />
              <div>
                <strong>Lumi gợi ý</strong>
                <p>Ảnh chụp rõ chữ, PDF, Word hoặc Excel đều được. Chọn file xong DocScan tự đọc, không cần bấm thêm.</p>
              </div>
            </div>
            <div className={error ? "docscan-upload-state error" : loading ? "docscan-upload-state loading" : result ? "docscan-upload-state success" : "docscan-upload-state"}>
              <span>{uploadStatus}</span>
              <small>
                {error
                  ? "Không sao, bạn có thể chọn lại file khác ngay."
                  : loading
                    ? steps[stepIndex]
                    : result
                      ? "Bạn có thể copy kết quả hoặc thử file khác."
                      : "Một lần chọn file là DocScan tự bắt đầu đọc."}
              </small>
            </div>
            <div className="docscan-safe-note">
              <span>♙</span>
              <div>
              <strong>Tài liệu của bạn được xử lý an toàn.</strong>
                <p>{source === "fallback" && result ? "Chưa đọc được nội dung thật, nên DocScan không đưa ra nhận xét giả." : "Không lưu trữ sau khi hoàn tất."}</p>
              </div>
            </div>
          </section>

          <section className="docscan-card docscan-result-card">
            {loading ? (
              <div className="docscan-loading">
                <img src="/lumi-bot.png" alt="" />
              <h2>{steps[stepIndex]}...</h2>
                <p>Lumi Bot đang đọc trong một lần, rồi gom lại phần quan trọng nhất cho bạn.</p>
                <div>{steps.map((step, index) => <span key={step} className={index <= stepIndex ? "active" : ""} />)}</div>
              </div>
            ) : result ? (
              <div className="docscan-result-ready" data-lumi-sensitive>
                <div className="docscan-score-mini">
                  <span>{result.verdict_icon}</span>
                  <div>
                    <small>{source === "gemini" ? "Đã đọc bằng AI" : source === "demo" ? "Kết quả mẫu" : "Chưa đọc nội dung thật"}</small>
                    <h2>{result.document_type || "Đã đọc xong"}</h2>
                    <p>{result.one_line_answer || result.summary || result.verdict}</p>
                  </div>
                </div>
                {(result.top_3_takeaways || result.key_points || []).length > 0 && (
                  <div className="docscan-keypoints">
                    {(result.top_3_takeaways || result.key_points).slice(0, 3).map((point) => (
                      <span key={`${point.title || point.label}-${point.detail || point.value}`}>
                        <b>{point.title || point.label}</b>
                        {point.detail || point.value}
                      </span>
                    ))}
                  </div>
                )}
                <div className="docscan-result-list">
                  <h3>Điểm cần chú ý</h3>
                  {docscanRisks.slice(0, 3).map((risk) => (
                    <article key={risk.title || risk.label}>
                      <strong>{risk.title || risk.label}</strong>
                      <p>{risk.detail || risk.body || risk.value}</p>
                    </article>
                  ))}
                  {docscanMissingInfo.length > 0 && (
                    <article className="docscan-missing-info">
                      <strong>Thông tin còn thiếu</strong>
                      <p>{docscanMissingInfo.slice(0, 3).join(" ")}</p>
                    </article>
                  )}
                  {docscanQuestions.length > 0 && (
                    <article className="docscan-questions">
                      <strong>Câu nên hỏi lại</strong>
                      <p>{docscanQuestions.slice(0, 3).join(" ")}</p>
                    </article>
                  )}
                  {docscanNextActions.length > 0 && (
                    <article className="docscan-next-actions">
                      <strong>Việc nên làm tiếp</strong>
                      <p>{docscanNextActions.slice(0, 3).join(" ")}</p>
                    </article>
                  )}
                  {docscanEvidence.length > 0 && (
                    <article className="docscan-evidence">
                      <strong>Căn cứ DocScan nhìn thấy</strong>
                      <p>{docscanEvidence.slice(0, 3).map((item) => `“${item}”`).join(" ")}</p>
                    </article>
                  )}
                  {!hasDocscanAttention && rawText && (
                    <article className="docscan-neutral-note">
                      <strong>Chưa thấy cảnh báo rõ</strong>
                      <p>DocScan đã đọc được văn bản, nhưng chưa thấy điểm nào đủ rõ để cảnh báo. Nếu dùng tài liệu này để làm việc, bạn vẫn nên kiểm tra lại mục tiêu chính, deadline, chi phí và người phụ trách trước khi gửi tiếp.</p>
                    </article>
                  )}
                </div>
                {rawText && (
                  <section className={rawTextOpen ? "docscan-raw-text open" : "docscan-raw-text"}>
                    <button
                      className="docscan-raw-toggle"
                      type="button"
                      onClick={() => setRawTextOpen((value) => !value)}
                      aria-expanded={rawTextOpen}
                    >
                      <span>📄 Văn bản gốc</span>
                      <b>{rawTextOpen ? "Ẩn" : "Xem"}</b>
                    </button>
                    {rawTextOpen && (
                      <div className="docscan-raw-body">
                        <textarea data-clarity-mask="True" readOnly value={rawText} />
                        <div>
                          <button type="button" onClick={copyRawText}>
                            {rawTextCopied ? "Đã copy!" : "Copy text"}
                          </button>
                          <button type="button" onClick={downloadRawText}>
                            Tải về .txt
                          </button>
                        </div>
                      </div>
                    )}
                  </section>
                )}
                <LumiFeedbackCard
                  project="docscan-ai"
                  projectLabel="DocScan AI"
                  context="Sau khi đọc tài liệu"
                  profile={profile}
                  metadata={{
                    source,
                    fileType: file?.type || "",
                    fileSize: file?.size || 0,
                    hasRawText: Boolean(rawText),
                    attentionCount: docscanRisks.length + docscanMissingInfo.length + docscanQuestions.length + docscanNextActions.length,
                  }}
                />
              </div>
            ) : (
              <div className="docscan-empty">
                <span>▤</span>
                <h2>Kết quả sẽ hiển thị ở đây</h2>
                <p>Sau khi bạn tải tài liệu lên, AI sẽ đọc và chỉ ra những điểm cần chú ý và gợi ý câu hỏi nên làm rõ.</p>
                <ul>
                  <li>Phân tích tự động</li>
                  <li>Dễ hiểu, dễ áp dụng</li>
                  <li>Dễ dàng copy và sử dụng</li>
                </ul>
                <button className="docscan-empty-sample" type="button" onClick={showSampleResult}>
                  Xem thử kết quả mẫu
                </button>
              </div>
            )}
          </section>
        </div>

        <footer className="docscan-summary">
          <div>
            <span>▣</span>
            <div>
              <strong>Tóm tắt để sử dụng</strong>
              <p>Bạn có thể copy toàn bộ kết quả để lưu lại hoặc gửi cho người khác.</p>
            </div>
          </div>
          <div className="docscan-summary-actions">
            <a href="/project-02-docscan-ai.html">Xem hành trình build</a>
            <button type="button" onClick={copySummary} disabled={!result}>
              {copied ? "Đã copy" : "Copy kết quả"}
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}

function LoginModal({ onClose, onGoogleLogin }) {
  const [loginStatus, setLoginStatus] = useState("idle");
  const [loginMessage, setLoginMessage] = useState("");

  const handleGoogleLogin = async () => {
    setLoginStatus("loading");
    setLoginMessage("Đang mở màn hình đăng nhập Google...");
    try {
      const result = await onGoogleLogin();
      if (result?.ok === false) {
        setLoginStatus("error");
        setLoginMessage(result.message);
      }
    } catch (error) {
      console.error("Google login failed", error);
      setLoginStatus("error");
      setLoginMessage("Đăng nhập chưa chạy được. Bạn thử refresh trang rồi bấm lại giúp mình nhé.");
    }
  };

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
        <span className="follow-badge">Tài khoản Lumi Labs</span>
        <h3 id="login-modal-title">Đăng nhập để lưu hành trình của bạn</h3>
        <p>
          Demo hiện đang mở miễn phí cho mọi người. Đăng nhập giúp bạn lưu project đang theo dõi và nhận bản cập nhật khi có demo mới.
        </p>
        <div className="login-benefits">
          <span>Lưu project yêu thích</span>
          <span>Nhận bản mới sớm</span>
          <span>Mở dashboard cá nhân</span>
        </div>
        <div className="social-login-stack">
          <SocialLoginButton
            provider="google"
            onClick={handleGoogleLogin}
            disabled={loginStatus === "loading"}
            label={loginStatus === "loading" ? "Đang mở Google..." : undefined}
          />
        </div>
        {loginMessage && (
          <p className={loginStatus === "error" ? "login-status error" : "login-status"}>
            {loginMessage}
          </p>
        )}
        <small className="login-note">Không cần mật khẩu mới. Bạn có thể đăng xuất bất cứ lúc nào.</small>
      </div>
    </div>
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
  const readyProjects = projectCatalog.filter((project) => project.href !== "/projects");

  return (
    <main className="dashboard-page dashboard-start-page">
      <section className="dashboard-hero dashboard-start-hero">
        <div>
          <a className="back-home-link" href="/">← Về trang chủ</a>
          <span className="section-label">Khu bắt đầu nhanh</span>
          <h1>Bạn muốn thử gì tiếp?</h1>
          <p>
            Đây không phải trang quản trị phức tạp. Mình gom những lối đi hữu ích nhất ở đây
            để bạn mở demo, đọc bài hướng dẫn hoặc quay lại project đang quan tâm.
          </p>
        </div>
        <div className="dashboard-lumi-guide">
          <img src="/lumi-bot.png" alt="" />
          <strong>Lumi gợi ý</strong>
          <span>Bắt đầu bằng 1 demo đang mở. Dùng được thì hãy lưu lại sau.</span>
        </div>
      </section>

      {authLoading && !profile && (
        <section className="dashboard-card dashboard-status-card">
          <span className="section-label">Đang kiểm tra phiên</span>
          <p>Bạn vẫn có thể bấm thử demo trong lúc Lumi kiểm tra đăng nhập.</p>
        </section>
      )}

      <section className="dashboard-quick-grid">
        <a className="dashboard-quick-card primary" href="/docscan-ai">
          <span>📄</span>
          <strong>Đọc thử tài liệu</strong>
          <small>Upload PDF, Word, Excel hoặc ảnh. DocScan chỉ ra điểm cần chú ý.</small>
        </a>
        <a className="dashboard-quick-card" href="/caption-ai">
          <span>✍️</span>
          <strong>Viết caption nhanh</strong>
          <small>Nhập vài dòng, nhận caption TikTok/Facebook và hashtag.</small>
        </a>
        <a className="dashboard-quick-card" href="/bai-viet.html">
          <span>📚</span>
          <strong>Đọc bài cho người mới</strong>
          <small>Học cách giao việc cho AI bằng ví dụ đời thường.</small>
        </a>
      </section>

      {!profile ? (
        <section className="dashboard-card protected-card">
          <img src="/lumi-bot.png" alt="" />
          <div>
            <span className="follow-badge">Đăng nhập là tùy chọn</span>
            <h2>Bạn có thể dùng demo ngay, không cần đăng nhập.</h2>
            <p>
              Đăng nhập Google chỉ dùng để Lumi Labs nhớ bạn, lưu project bạn quan tâm
              và sau này mở thêm nội dung riêng cho người theo dõi.
            </p>
            <div className="dashboard-soft-actions">
              <a href="/projects">Xem tất cả demo</a>
              <SocialLoginButton provider="google" onClick={onGoogleLogin} label="Đăng nhập nếu muốn lưu" />
            </div>
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
              <span className="section-label">Việc nên làm tiếp</span>
              <h2>Mở một demo và dùng thử thật</h2>
              <p>Phần quan trọng nhất của Lumi Labs vẫn là trải nghiệm tool thật, không phải ngồi trong dashboard.</p>
              <div className="dashboard-soft-actions">
                <a href="/docscan-ai">Thử DocScan AI</a>
                <a href="/caption-ai">Thử Caption AI</a>
              </div>
            </article>
            <article className="dashboard-card">
              <span className="section-label">Đã lưu lại</span>
              <h2>{followed.length ? `${followed.length} project` : "Chưa lưu project nào"}</h2>
              <p>{followed.length ? "Project bạn quan tâm sẽ hiện bên dưới." : "Bạn cứ thử demo trước. Thích tool nào thì lưu lại sau cũng được."}</p>
            </article>
          </section>
        </>
      )}

      <section className="dashboard-card">
        <div className="dashboard-section-head">
          <div>
            <span className="section-label">Demo đang mở</span>
            <h2>Tool bạn có thể dùng ngay</h2>
          </div>
          <a className="back-home-link" href="/projects">Xem trang demo →</a>
        </div>
        <div className="dashboard-project-list">
          {readyProjects.map((project) => {
            const isFollowed = followedProjects.includes(project.slug);
            return (
              <article key={project.slug} className="dashboard-project-item">
                <div>
                  <small>{project.tag}</small>
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                </div>
                <div className="dashboard-project-actions">
                  <a href={project.href}>Dùng thử</a>
                  {profile && (
                    <button type="button" onClick={() => onFollowProject(project.slug)}>
                      {isFollowed ? "Đã lưu" : "Lưu lại"}
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
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
  const isDocumentPage = currentPath === "/docscan-ai";
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
        <LumiAssistant path={currentPath} />
      </>
    );
  }

  if (isCaptionPage || isDocumentPage || isProjectsPage || isChallengePage) {
    return (
      <>
        <Header
          profile={auth.profile}
          onOpenLogin={() => setLoginOpen(true)}
          onSignOut={auth.signOut}
        />
        <main>
          {isCaptionPage && <CaptionAISection profile={auth.profile} />}
          {isDocumentPage && <DocScanAISection profile={auth.profile} />}
          {isProjectsPage && <ProjectsPage />}
          {isChallengePage && <ChallengeSection />}
        </main>
        <Footer />
        {loginOpen && (
          <LoginModal
            onClose={() => setLoginOpen(false)}
            onGoogleLogin={auth.signInWithGoogle}
          />
        )}
        <LumiAssistant path={currentPath} />
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
      <LumiAssistant path={currentPath} />
    </>
  );
}

export default App;
