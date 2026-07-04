import { getPlannedProjects, getReadyProjects } from "../../content/projects";

const ctaLabel = {
  "caption-ai": "Viết caption ngay",
  "docscan-ai": "Đọc tài liệu ngay",
  "pdf-excel-ai": "Xem PDF sang Excel",
  "siteflow-demo": "Xem demo SiteFlow",
};

const usefulFor = {
  "caption-ai": "Phù hợp shop nhỏ, creator, freelancer, nhân viên marketing cần đăng bài nhanh.",
  "docscan-ai": "Phù hợp người cần đọc nhanh hợp đồng, báo giá, báo cáo, ảnh chụp tài liệu.",
  "pdf-excel-ai": "Phù hợp team vận hành, kế toán, backoffice cần biến file có bảng thành Excel.",
  "siteflow-demo": "Phù hợp nhà thầu, chủ đầu tư hoặc founder cần demo SaaS quản lý công trình.",
};

export default function ProjectsPage() {
  const readyProjects = getReadyProjects();
  const comingProjects = getPlannedProjects();

  return (
    <section className="projects-page">
      <section className="projects-hero" data-reveal>
        <span className="caption-badge">Chọn 1 demo để thử ngay</span>
        <h1>Tool AI thật, mở lên là hiểu được</h1>
        <p>
          Nếu bạn mới vào Lumi Labs, hãy bắt đầu bằng một trong các demo đang chạy.
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
        <strong>Đang xem được ngay</strong>
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
              <b>{project.status}</b>
            </div>
            <p>{project.desc}</p>
            <p className="project-fit">{usefulFor[project.slug]}</p>
            <em>{project.outcome}</em>
            <div className="project-card-actions">
              <a href={project.href}>{ctaLabel[project.slug] || "Dùng thử ngay"}</a>
              <a className="ghost" href={project.journeyHref}>
                {project.journeyHref === "/projects" ? "Đang viết hành trình" : "Xem hành trình"}
              </a>
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
