import { projectCatalog } from "../../content/projects";

function DashboardLoginButton({ onClick }) {
  return (
    <button className="social-login-btn google" type="button" onClick={onClick}>
      <span>G</span>
      Đăng nhập nếu muốn lưu
    </button>
  );
}
export default function DashboardPage({ profile, followedProjects, membership, authLoading, onGoogleLogin, onSignOut, onFollowProject }) {
  const followed = projectCatalog.filter((project) => followedProjects.includes(project.slug));
  const readyProjects = projectCatalog.filter((project) => project.href !== "/projects");

  return (
    <main className="dashboard-page dashboard-start-page">
      <section className="dashboard-hero dashboard-start-hero">
        <div>
          <a className="back-home-link" href="/">â† Vá» trang chá»§</a>
          <span className="section-label">Khu báº¯t Ä‘áº§u nhanh</span>
          <h1>Báº¡n muá»‘n thá»­ gÃ¬ tiáº¿p?</h1>
          <p>
            ÄÃ¢y khÃ´ng pháº£i trang quáº£n trá»‹ phá»©c táº¡p. MÃ¬nh gom nhá»¯ng lá»‘i Ä‘i há»¯u Ã­ch nháº¥t á»Ÿ Ä‘Ã¢y
            Ä‘á»ƒ báº¡n má»Ÿ demo, Ä‘á»c bÃ i hÆ°á»›ng dáº«n hoáº·c quay láº¡i project Ä‘ang quan tÃ¢m.
          </p>
        </div>
        <div className="dashboard-lumi-guide">
          <img src="/lumi-bot.png" alt="" />
          <strong>Lumi gá»£i Ã½</strong>
          <span>Báº¯t Ä‘áº§u báº±ng 1 demo Ä‘ang má»Ÿ. DÃ¹ng Ä‘Æ°á»£c thÃ¬ hÃ£y lÆ°u láº¡i sau.</span>
        </div>
      </section>

      {authLoading && !profile && (
        <section className="dashboard-card dashboard-status-card">
          <span className="section-label">Äang kiá»ƒm tra phiÃªn</span>
          <p>Báº¡n váº«n cÃ³ thá»ƒ báº¥m thá»­ demo trong lÃºc Lumi kiá»ƒm tra Ä‘Äƒng nháº­p.</p>
        </section>
      )}

      <section className="dashboard-quick-grid">
        <a className="dashboard-quick-card primary" href="/docscan-ai">
          <span>ðŸ“„</span>
          <strong>Äá»c thá»­ tÃ i liá»‡u</strong>
          <small>Upload PDF, Word, Excel hoáº·c áº£nh. DocScan chá»‰ ra Ä‘iá»ƒm cáº§n chÃº Ã½.</small>
        </a>
        <a className="dashboard-quick-card" href="/caption-ai">
          <span>âœï¸</span>
          <strong>Viáº¿t caption nhanh</strong>
          <small>Nháº­p vÃ i dÃ²ng, nháº­n caption TikTok/Facebook vÃ  hashtag.</small>
        </a>
        <a className="dashboard-quick-card" href="/bai-viet.html">
          <span>ðŸ“š</span>
          <strong>Äá»c bÃ i cho ngÆ°á»i má»›i</strong>
          <small>Há»c cÃ¡ch giao viá»‡c cho AI báº±ng vÃ­ dá»¥ Ä‘á»i thÆ°á»ng.</small>
        </a>
      </section>

      {!profile ? (
        <section className="dashboard-card protected-card">
          <img src="/lumi-bot.png" alt="" />
          <div>
            <span className="follow-badge">ÄÄƒng nháº­p lÃ  tÃ¹y chá»n</span>
            <h2>Báº¡n cÃ³ thá»ƒ dÃ¹ng demo ngay, khÃ´ng cáº§n Ä‘Äƒng nháº­p.</h2>
            <p>
              ÄÄƒng nháº­p Google chá»‰ dÃ¹ng Ä‘á»ƒ Lumi Labs nhá»› báº¡n, lÆ°u project báº¡n quan tÃ¢m
              vÃ  sau nÃ y má»Ÿ thÃªm ná»™i dung riÃªng cho ngÆ°á»i theo dÃµi.
            </p>
            <div className="dashboard-soft-actions">
              <a href="/projects">Xem táº¥t cáº£ demo</a>
              <DashboardLoginButton onClick={onGoogleLogin} />
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
            <button type="button" onClick={onSignOut}>ÄÄƒng xuáº¥t</button>
          </section>

          <section className="dashboard-grid">
            <article className="dashboard-card">
              <span className="section-label">Viá»‡c nÃªn lÃ m tiáº¿p</span>
              <h2>Má»Ÿ má»™t demo vÃ  dÃ¹ng thá»­ tháº­t</h2>
              <p>Pháº§n quan trá»ng nháº¥t cá»§a Lumi Labs váº«n lÃ  tráº£i nghiá»‡m tool tháº­t, khÃ´ng pháº£i ngá»“i trong dashboard.</p>
              <div className="dashboard-soft-actions">
                <a href="/docscan-ai">Thá»­ DocScan AI</a>
                <a href="/caption-ai">Thá»­ Caption AI</a>
              </div>
            </article>
            <article className="dashboard-card">
              <span className="section-label">ÄÃ£ lÆ°u láº¡i</span>
              <h2>{followed.length ? `${followed.length} project` : "ChÆ°a lÆ°u project nÃ o"}</h2>
              <p>{followed.length ? "Project báº¡n quan tÃ¢m sáº½ hiá»‡n bÃªn dÆ°á»›i." : "Báº¡n cá»© thá»­ demo trÆ°á»›c. ThÃ­ch tool nÃ o thÃ¬ lÆ°u láº¡i sau cÅ©ng Ä‘Æ°á»£c."}</p>
            </article>
          </section>
        </>
      )}

      <section className="dashboard-card">
        <div className="dashboard-section-head">
          <div>
            <span className="section-label">Demo Ä‘ang má»Ÿ</span>
            <h2>Tool báº¡n cÃ³ thá»ƒ dÃ¹ng ngay</h2>
          </div>
          <a className="back-home-link" href="/projects">Xem trang demo â†’</a>
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
                  <a href={project.href}>DÃ¹ng thá»­</a>
                  {profile && (
                    <button type="button" onClick={() => onFollowProject(project.slug)}>
                      {isFollowed ? "ÄÃ£ lÆ°u" : "LÆ°u láº¡i"}
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

