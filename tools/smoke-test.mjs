import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { checkRateLimit } from "../api/_rate-limit.js";
import { beginnerArticles } from "../src/content/articles.js";
import { appRoutes, navItems, serverlessApiRoutes } from "../src/content/navigation.js";
import { projectCatalog } from "../src/content/projects.js";

const root = process.cwd();
const requiredFiles = [
  "src/App.jsx",
  "src/app/auth/useAuth.js",
  "src/app/hooks/useReveal.js",
  "src/app/routes/DashboardPage.jsx",
  "src/app/routes/HomePage.jsx",
  "src/app/routes/ProjectsPage.jsx",
  "src/components/layout/LoginModal.jsx",
  "src/components/layout/Logo.jsx",
  "src/components/layout/SiteFooter.jsx",
  "src/components/layout/SiteHeader.jsx",
  "src/components/layout/UserMenu.jsx",
  "src/components/lumi/LumiFeedbackCard.jsx",
  "src/content/articles.js",
  "src/content/navigation.js",
  "src/content/projects.js",
  "src/components/lumi/LumiAssistant.jsx",
  "src/features/caption-ai/CaptionAISection.jsx",
  "src/features/docscan-ai/DocScanAISection.jsx",
  "src/features/pdf-excel-ai/PdfExcelAISection.jsx",
  "src/lumi-home-final.css",
  "docs/ARCHITECTURE.md",
  "api/generate-caption.js",
  "api/analyze-document.js",
  "api/mini-lab.js",
  "public/bai-viet.html",
  "public/prompt-ai-hieu-qua.html",
  "public/codex-training-thuc-chien.html",
  "public/codex-session-01-bat-dau.html",
  "public/codex-session-02-tao-tool-dau-tien.html",
  "public/codex-session-03-agents-memory-skill.html",
  "public/codex-session-04-github-mcp-hoan-thien.html",
  "public/codex-training-session.css",
  "public/codex-training-copy.js",
  "public/ai-viet-email-de-hieu.html",
  "public/ai-tom-tat-cuoc-hop.html",
  "public/ai-lap-checklist-cong-viec.html",
  "public/ai-doc-anh-tai-lieu.html",
  "public/ai-viet-bai-dang-ban-hang.html",
  "public/lumi-mini-lab.js",
  "public/lumi-mini-lab.css",
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function file(path) {
  return readFileSync(join(root, path), "utf8");
}

for (const path of requiredFiles) {
  assert(existsSync(join(root, path)), `Missing required file: ${path}`);
}

const app = file("src/App.jsx");
const appSources = [
  app,
  file("src/app/auth/useAuth.js"),
  file("src/app/routes/DashboardPage.jsx"),
  file("src/app/routes/HomePage.jsx"),
  file("src/app/routes/ProjectsPage.jsx"),
  file("src/components/layout/LoginModal.jsx"),
  file("src/components/layout/SiteHeader.jsx"),
  file("src/features/caption-ai/CaptionAISection.jsx"),
  file("src/features/docscan-ai/DocScanAISection.jsx"),
  file("src/features/pdf-excel-ai/PdfExcelAISection.jsx"),
].join("\n");
assert(appSources.includes("./content/navigation"), "App is not wired to navigation registry");
assert(app.includes("./components/lumi/LumiAssistant"), "App is not wired to Lumi Assistant component");
assert(app.includes("./components/layout/SiteHeader"), "App is not wired to site header");
assert(app.includes("./components/layout/LoginModal"), "App is not wired to login modal");
assert(app.includes("./app/routes/HomePage"), "App is not wired to Home page component");
assert(app.includes("./app/routes/ProjectsPage"), "App is not wired to Projects page component");
[
  "/caption-ai",
  "/docscan-ai",
  "/pdf-excel-ai",
  "/projects",
  "/dashboard",
  "/bai-viet.html",
  "/codex-training-thuc-chien.html",
  "/codex-session-02-tao-tool-dau-tien.html",
  "/api/generate-caption",
  "/api/analyze-document",
].forEach((needle) => {
  assert(appSources.includes(needle), `App route/API reference missing: ${needle}`);
});

Object.values(appRoutes).forEach((route) => {
  assert(route.startsWith("/"), `App route must start with slash: ${route}`);
});

serverlessApiRoutes.forEach((route) => {
  assert(route.startsWith("/api/"), `API route must start with /api/: ${route}`);
});

navItems.forEach((item) => {
  assert(item.label && item.href, `Nav item incomplete: ${JSON.stringify(item)}`);
  assert(item.href.startsWith("/"), `Nav href must be internal absolute path: ${item.href}`);
});

[
  "Kho bài học & series",
  "Vào series Codex",
  "Xem buổi tạo tool",
].forEach((needle) => {
  assert(appSources.includes(needle), `Homepage missing learning hub entry: ${needle}`);
});

const articleIndex = file("public/bai-viet.html");
[
  "/prompt-ai-hieu-qua.html",
  "/codex-training-thuc-chien.html",
  "/ai-viet-email-de-hieu.html",
  "/ai-tom-tat-cuoc-hop.html",
  "/ai-lap-checklist-cong-viec.html",
  "/ai-doc-anh-tai-lieu.html",
  "/ai-viet-bai-dang-ban-hang.html",
].forEach((href) => {
  assert(articleIndex.includes(href), `Article library missing link: ${href}`);
});

beginnerArticles
  .filter((article) => article.status === "published")
  .forEach((article) => {
    assert(article.slug, `Article missing slug: ${article.title}`);
    assert(article.title && article.desc && article.href, `Article registry item incomplete: ${article.slug}`);
    assert(articleIndex.includes(article.href), `Article registry not reflected in article library: ${article.href}`);
    if (article.href.endsWith(".html")) {
      const publicPath = `public${article.href}`;
      assert(existsSync(join(root, publicPath)), `Article registry points to missing file: ${publicPath}`);
    }
  });

projectCatalog.forEach((project) => {
  assert(project.slug, `Project missing slug: ${project.title}`);
  assert(project.title && project.desc && project.href && project.stage, `Project registry item incomplete: ${project.slug}`);
  assert(["ready", "planned", "idea"].includes(project.stage), `Project has invalid stage: ${project.slug}`);
});

assert(projectCatalog.some((project) => project.stage === "ready" && project.href === "/caption-ai"), "Caption AI is missing from ready projects");
assert(projectCatalog.some((project) => project.stage === "ready" && project.href === "/docscan-ai"), "DocScan AI is missing from ready projects");
assert(projectCatalog.some((project) => project.stage === "ready" && project.href === "/pdf-excel-ai"), "PDF to Excel AI is missing from ready projects");

[
  "Bắt đầu series Codex",
  "Bài nền tảng",
  "Series chuyên đề",
  "Hành trình project thật",
  "Claude cho công việc văn phòng",
  "AI Automation cơ bản",
].forEach((needle) => {
  assert(articleIndex.includes(needle), `Article library missing learning structure text: ${needle}`);
});

const trainingHub = file("public/codex-training-thuc-chien.html");
[
  "/codex-session-01-bat-dau.html",
  "/codex-session-02-tao-tool-dau-tien.html",
  "/codex-session-03-agents-memory-skill.html",
  "/codex-session-04-github-mcp-hoan-thien.html",
].forEach((href) => {
  assert(trainingHub.includes(href), `Codex training hub missing session link: ${href}`);
});

[
  "public/codex-session-01-bat-dau.html",
  "public/codex-session-02-tao-tool-dau-tien.html",
  "public/codex-session-03-agents-memory-skill.html",
  "public/codex-session-04-github-mcp-hoan-thien.html",
].forEach((path) => {
  const html = file(path);
  assert(html.includes("/codex-training-session.css"), `${path} missing training CSS`);
  assert(html.includes("/codex-training-copy.js"), `${path} missing copy script`);
  assert(html.includes("data-copy="), `${path} missing copyable prompt`);
  assert(html.includes("Lumi Bot dẫn đường"), `${path} missing Lumi guide role`);
  [
    "Trước khi bắt đầu cần chuẩn bị gì?",
    "Làm theo từng bước",
    "Kết quả đúng sẽ trông như thế nào?",
    "Bài tập tự làm",
  ].forEach((needle) => {
    assert(html.includes(needle), `${path} missing guided lesson section: ${needle}`);
  });
});

const miniLabPages = requiredFiles.filter((path) => path.startsWith("public/ai-") || path.endsWith("prompt-ai-hieu-qua.html"));
for (const path of miniLabPages) {
  const html = file(path);
  assert(html.includes("data-mini-lab"), `${path} missing mini lab`);
  assert(html.includes("/lumi-mini-lab.js"), `${path} missing mini lab script`);
}

const request = { headers: { "x-forwarded-for": "203.0.113.10" } };
const now = 1700000000000;
assert(checkRateLimit(request, { key: "smoke", max: 2, windowMs: 1000, now }).allowed, "Rate limit first request blocked");
assert(checkRateLimit(request, { key: "smoke", max: 2, windowMs: 1000, now: now + 1 }).allowed, "Rate limit second request blocked");
assert(!checkRateLimit(request, { key: "smoke", max: 2, windowMs: 1000, now: now + 2 }).allowed, "Rate limit did not block third request");

console.log("Smoke tests passed: routes, article links, mini labs, and API rate limit are OK.");
