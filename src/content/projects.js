export const projectStages = ["ready", "planned", "idea", "archived"];
export const projectTypes = ["tool", "assistant", "automation", "template"];

export const projectCatalog = [
  {
    slug: "caption-ai",
    type: "tool",
    title: "Caption AI",
    desc: "Nhập vài dòng, nhận caption TikTok/Facebook và hashtag tiếng Việt.",
    outcome: "Giúp creator, shop nhỏ và freelancer bớt bí khi đăng bài.",
    status: "Demo mở sẵn",
    href: "/caption-ai",
    journeyHref: "/project-01-caption-ai.html",
    icon: "✍️",
    tag: "Content AI",
    tool: "Caption AI",
    audience: ["creator", "office", "nonTech"],
    useCases: ["Viết caption", "Tạo hashtag", "Có bản nháp nhanh"],
    priority: 1,
    stage: "ready",
    featured: true,
    publishedAt: "2026-05-13",
  },
  {
    slug: "docscan-ai",
    type: "tool",
    title: "DocScan AI",
    desc: "Một chạm để AI đọc nhanh hợp đồng, báo giá, báo cáo hoặc ảnh chụp.",
    outcome: "Giúp dân văn phòng hiểu tài liệu nhanh hơn trước khi chuyển tiếp.",
    status: "Demo mở sẵn",
    href: "/docscan-ai",
    journeyHref: "/project-02-docscan-ai.html",
    icon: "📄",
    tag: "Document AI",
    tool: "DocScan AI",
    audience: ["office", "founder", "nonTech"],
    useCases: ["Đọc tài liệu", "Tóm tắt ý chính", "Chỉ ra điểm cần hỏi lại"],
    priority: 2,
    stage: "ready",
    featured: true,
    publishedAt: "2026-05-18",
  },
  {
    slug: "pdf-excel-ai",
    type: "tool",
    title: "PDF to Excel AI",
    desc: "Xem cách Lumi biến một file PDF mẫu thành bảng Excel có thể kiểm tra và tải về.",
    outcome: "Giúp doanh nghiệp nhìn thấy khả năng số hóa dữ liệu trước khi làm pilot riêng.",
    status: "MVP mẫu",
    href: "/pdf-excel-ai",
    journeyHref: "/projects",
    icon: "▦",
    tag: "Data AI",
    tool: "PDF to Excel AI",
    audience: ["office", "founder", "nonTech"],
    useCases: ["Chuyển PDF sang Excel", "Bóc bảng", "Đối soát dữ liệu"],
    priority: 3,
    stage: "ready",
    featured: true,
    publishedAt: "2026-06-03",
  },
  {
    slug: "excel-report-ai",
    type: "tool",
    title: "Excel Report AI",
    desc: "Biến dữ liệu Excel thành báo cáo dễ đọc.",
    outcome: "Dành cho người cần gửi báo cáo nhanh cho sếp hoặc team.",
    status: "Sắp làm",
    href: "/projects",
    journeyHref: "/projects",
    icon: "📊",
    tag: "Office AI",
    tool: "Excel Report AI",
    audience: ["office", "founder"],
    useCases: ["Tóm tắt số liệu", "Viết báo cáo", "Tạo insight"],
    priority: 4,
    stage: "planned",
    featured: false,
    publishedAt: "",
  },
  {
    slug: "ai-office-tools",
    type: "tool",
    title: "AI Office Tools",
    desc: "Bộ công cụ AI cho dân văn phòng.",
    outcome: "Gom những việc lặp lại thành các tool nhỏ, dễ dùng.",
    status: "Ý tưởng",
    href: "/projects",
    journeyHref: "/projects",
    icon: "🧰",
    tag: "Toolkit",
    tool: "AI Office Tools",
    audience: ["office", "nonTech"],
    useCases: ["Email", "Checklist", "Tài liệu"],
    priority: 5,
    stage: "idea",
    featured: false,
    publishedAt: "",
  },
];

export const upcomingProjects = [
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

export function getReadyProjects() {
  return projectCatalog
    .filter((project) => project.stage === "ready")
    .sort((a, b) => a.priority - b.priority);
}

export function getPlannedProjects() {
  return projectCatalog
    .filter((project) => project.stage !== "ready" && project.stage !== "archived")
    .sort((a, b) => a.priority - b.priority);
}

export function getFeaturedProjects() {
  return projectCatalog
    .filter((project) => project.featured)
    .sort((a, b) => a.priority - b.priority);
}
