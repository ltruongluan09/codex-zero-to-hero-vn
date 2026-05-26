import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { checkRateLimit } from "../api/_rate-limit.js";

const root = process.cwd();
const requiredFiles = [
  "src/App.jsx",
  "src/lumi-home-final.css",
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
[
  "/caption-ai",
  "/docscan-ai",
  "/projects",
  "/dashboard",
  "/api/generate-caption",
  "/api/analyze-document",
].forEach((needle) => {
  assert(app.includes(needle), `App route/API reference missing: ${needle}`);
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

[
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
