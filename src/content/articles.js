export const articleTypes = ["article", "series", "session", "project-journey"];
export const articleStatuses = ["published", "draft", "archived"];
export const articleDifficulties = ["beginner", "practical", "advanced"];

export const articleAudiences = {
  nonTech: "Người không biết code",
  office: "Dân văn phòng",
  creator: "Creator/Freelancer",
  trainer: "Trainer",
  founder: "Founder/Manager",
};

export const articleCategories = {
  prompt: "Prompt AI",
  office: "AI văn phòng",
  workflow: "Quy trình làm việc",
  document: "Tài liệu",
  content: "Nội dung",
  codex: "Codex",
  projectJourney: "Hành trình project",
};

export const articles = [
  {
    slug: "prompt-ai-hieu-qua",
    type: "article",
    title: "Prompt AI hiệu quả: 5 nguyên tắc đơn giản",
    desc: "Biết cách giao việc để AI hiểu bạn hơn và trả kết quả dùng được ngay.",
    href: "/prompt-ai-hieu-qua.html",
    tag: "Hướng dẫn",
    time: "8 phút đọc",
    image: "/lumi-bot.png",
    icon: "💬",
    difficulty: "beginner",
    level: "beginner",
    category: "prompt",
    tool: "AI chung",
    audience: ["nonTech", "office", "creator"],
    status: "published",
    publishedAt: "2026-05-15",
    featured: true,
    hasMiniLab: true,
    priority: 1,
  },
  {
    slug: "codex-training-thuc-chien",
    type: "series",
    title: "Codex thực chiến: tự tạo tool bằng AI trong 4 buổi",
    desc: "Một series từng bước để người không biết code vẫn biết giao việc cho Codex và tạo tool đầu tiên.",
    href: "/codex-training-thuc-chien.html",
    tag: "Series",
    time: "4 buổi",
    icon: "🎓",
    difficulty: "beginner",
    level: "beginner",
    category: "codex",
    tool: "Codex",
    audience: ["nonTech", "trainer", "founder"],
    status: "published",
    publishedAt: "2026-05-23",
    featured: true,
    hasMiniLab: false,
    priority: 2,
  },
  {
    slug: "ai-viet-email-de-hieu",
    type: "article",
    title: "Nhờ AI viết email dễ nghe hơn",
    desc: "Soạn email lịch sự, rõ ý, không bị cứng cho công việc hằng ngày.",
    href: "/ai-viet-email-de-hieu.html",
    tag: "Văn phòng",
    time: "5 phút đọc",
    icon: "✉️",
    difficulty: "beginner",
    level: "beginner",
    category: "office",
    tool: "AI chung",
    audience: ["nonTech", "office"],
    status: "published",
    publishedAt: "2026-05-16",
    featured: false,
    hasMiniLab: true,
    priority: 3,
  },
  {
    slug: "ai-tom-tat-cuoc-hop",
    type: "article",
    title: "Tóm tắt cuộc họp bằng AI sao cho ra việc",
    desc: "Biến ghi chú họp thành việc cần làm, người phụ trách và deadline.",
    href: "/ai-tom-tat-cuoc-hop.html",
    tag: "Cuộc họp",
    time: "5 phút đọc",
    icon: "☑️",
    difficulty: "beginner",
    level: "beginner",
    category: "office",
    tool: "AI chung",
    audience: ["nonTech", "office", "founder"],
    status: "published",
    publishedAt: "2026-05-16",
    featured: false,
    hasMiniLab: true,
    priority: 4,
  },
  {
    slug: "ai-lap-checklist-cong-viec",
    type: "article",
    title: "Biến việc rối thành checklist bằng AI",
    desc: "Khi chưa biết bắt đầu từ đâu, để AI chia việc thành từng bước nhỏ.",
    href: "/ai-lap-checklist-cong-viec.html",
    tag: "Checklist",
    time: "6 phút đọc",
    icon: "🧭",
    difficulty: "beginner",
    level: "beginner",
    category: "workflow",
    tool: "AI chung",
    audience: ["nonTech", "office", "founder"],
    status: "published",
    publishedAt: "2026-05-16",
    featured: false,
    hasMiniLab: true,
    priority: 5,
  },
  {
    slug: "ai-doc-anh-tai-lieu",
    type: "article",
    title: "Chụp ảnh tài liệu rồi nhờ AI giải thích",
    desc: "Dùng AI đọc hóa đơn, báo giá, hợp đồng ngắn hoặc ảnh chụp từ Zalo.",
    href: "/ai-doc-anh-tai-lieu.html",
    tag: "Tài liệu",
    time: "6 phút đọc",
    icon: "📄",
    difficulty: "beginner",
    level: "beginner",
    category: "document",
    tool: "DocScan AI",
    audience: ["nonTech", "office", "founder"],
    status: "published",
    publishedAt: "2026-05-16",
    featured: false,
    hasMiniLab: true,
    priority: 6,
  },
  {
    slug: "ai-viet-bai-dang-ban-hang",
    type: "article",
    title: "Viết bài đăng bán hàng đầu tiên bằng AI",
    desc: "Có bản nháp gần gũi để sửa nhanh, không còn nhìn màn hình trống.",
    href: "/ai-viet-bai-dang-ban-hang.html",
    tag: "Bán hàng",
    time: "5 phút đọc",
    icon: "✍️",
    difficulty: "beginner",
    level: "beginner",
    category: "content",
    tool: "Caption AI",
    audience: ["nonTech", "creator"],
    status: "published",
    publishedAt: "2026-05-16",
    featured: false,
    hasMiniLab: true,
    priority: 7,
  },
  {
    slug: "project-01-caption-ai",
    type: "project-journey",
    title: "Hành trình xây dựng Caption AI",
    desc: "Câu chuyện build project đầu tiên của Lumi Labs: từ ý tưởng nhỏ đến demo dùng được.",
    href: "/project-01-caption-ai.html",
    tag: "Hành trình",
    time: "7 ngày",
    icon: "🧪",
    difficulty: "practical",
    level: "practical",
    category: "projectJourney",
    tool: "Caption AI",
    audience: ["nonTech", "creator", "founder"],
    status: "published",
    publishedAt: "2026-05-18",
    featured: false,
    hasMiniLab: false,
    priority: 20,
  },
  {
    slug: "project-02-docscan-ai",
    type: "project-journey",
    title: "7 ngày làm nên DocScan AI",
    desc: "Hành trình biến nhu cầu đọc tài liệu nhanh thành một demo AI thật.",
    href: "/project-02-docscan-ai.html",
    tag: "Hành trình",
    time: "7 ngày",
    icon: "📄",
    difficulty: "practical",
    level: "practical",
    category: "projectJourney",
    tool: "DocScan AI",
    audience: ["nonTech", "office", "founder"],
    status: "published",
    publishedAt: "2026-05-22",
    featured: false,
    hasMiniLab: false,
    priority: 21,
  },
];

// Backward-compatible export. UI cũ vẫn dùng tên này, nhưng dữ liệu đã theo schema mới.
export const beginnerArticles = articles;

export function getPublishedArticles() {
  return articles
    .filter((article) => article.status === "published")
    .sort((a, b) => a.priority - b.priority);
}

export function getFeaturedArticles() {
  return getPublishedArticles().filter((article) => article.featured);
}

export function getArticlesByType(type) {
  return getPublishedArticles().filter((article) => article.type === type);
}

export function getArticlesByCategory(category) {
  return getPublishedArticles().filter((article) => article.category === category);
}

export function getArticlesForTool(tool) {
  return getPublishedArticles().filter((article) => article.tool === tool);
}
