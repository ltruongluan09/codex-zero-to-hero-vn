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
  prompt: "Cách nhờ việc",
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
    title: "Nói với trợ lý thông minh sao cho ra đúng việc",
    desc: "Cách nhờ việc rõ hơn để chủ shop, HR, marketing hoặc manager nhận được bản trả lời dùng được ngay.",
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
    title: "Nỗi vất vả của HR mỗi lần gửi email cho ứng viên",
    desc: "Xem Lumi tự biến một tình huống tuyển dụng thành email, tin nhắn Zalo và checklist kiểm tra.",
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
    title: "Manager không nên rời cuộc họp với một mớ ghi chú rối",
    desc: "Xem Lumi biến ghi chú họp rời rạc thành quyết định, việc cần làm, deadline và câu cần hỏi lại.",
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
    title: "Khách hỏi giá rồi im lặng, sales nên nhắn lại thế nào?",
    desc: "Xem Lumi viết tin nhắn chăm khách nhẹ nhàng, không ép mua, có lý do để khách phản hồi.",
    href: "/ai-lap-checklist-cong-viec.html",
    tag: "Checklist",
    time: "6 phút đọc",
    icon: "🧭",
    difficulty: "beginner",
    level: "beginner",
    category: "content",
    tool: "AI chung",
    audience: ["nonTech", "office", "creator"],
    status: "published",
    publishedAt: "2026-05-16",
    featured: false,
    hasMiniLab: true,
    priority: 5,
  },
  {
    slug: "ai-doc-anh-tai-lieu",
    type: "article",
    title: "Nhận giấy tờ dài, đâu là phần cần chú ý?",
    desc: "Xem Lumi đọc nhanh tài liệu mẫu và chỉ ra ý chính, điểm rủi ro, câu nên hỏi lại.",
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
    title: "Chủ shop không nên cạn ý mỗi lần đăng bài bán hàng",
    desc: "Xem Lumi biến một sản phẩm bình thường thành bài đăng Facebook/Zalo dễ đọc, có hook và hashtag.",
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
