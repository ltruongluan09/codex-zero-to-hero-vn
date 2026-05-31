import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
  articleAudiences,
  articleCategories,
  articleDifficulties,
  articles,
  articleStatuses,
  articleTypes,
} from "../src/content/articles.js";
import { appRoutes, navItems, serverlessApiRoutes } from "../src/content/navigation.js";
import { projectCatalog, projectStages, projectTypes } from "../src/content/projects.js";

const root = process.cwd();

function fail(message) {
  throw new Error(message);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function publicFileForHref(href) {
  if (href === "/") return "index.html";
  if (href.endsWith(".html")) return `public${href}`;
  return null;
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}

const seenArticleSlugs = new Set();
const seenProjectSlugs = new Set();
const seenArticlePriorities = new Set();
const seenProjectPriorities = new Set();
const audienceKeys = new Set(Object.keys(articleAudiences));
const categoryKeys = new Set(Object.keys(articleCategories));

for (const item of navItems) {
  assert(item.label?.trim(), "Navigation item missing label");
  assert(item.href?.startsWith("/"), `Navigation item has invalid href: ${item.href}`);
}

for (const route of Object.values(appRoutes)) {
  assert(route.startsWith("/"), `Invalid app route: ${route}`);
}

for (const route of serverlessApiRoutes) {
  const apiFile = route.replace("/api/", "api/") + ".js";
  assert(existsSync(join(root, apiFile)), `API route points to missing file: ${apiFile}`);
}

for (const article of articles) {
  assert(article.slug, `Article missing slug: ${article.title}`);
  assert(!seenArticleSlugs.has(article.slug), `Duplicate article slug: ${article.slug}`);
  seenArticleSlugs.add(article.slug);
  assert(article.title && article.desc && article.href, `Article incomplete: ${article.slug}`);
  assert(articleTypes.includes(article.type), `Invalid article type: ${article.slug}`);
  assert(articleStatuses.includes(article.status), `Invalid article status: ${article.slug}`);
  assert(articleDifficulties.includes(article.difficulty), `Invalid article difficulty: ${article.slug}`);
  assert(categoryKeys.has(article.category), `Unknown article category: ${article.slug}`);
  assert(article.tool?.trim(), `Article missing tool: ${article.slug}`);
  assert(Array.isArray(article.audience) && article.audience.length > 0, `Article missing audience: ${article.slug}`);
  article.audience.forEach((audience) => {
    assert(audienceKeys.has(audience), `Unknown article audience "${audience}" in ${article.slug}`);
  });
  assert(Number.isInteger(article.priority), `Article priority must be integer: ${article.slug}`);
  assert(!seenArticlePriorities.has(article.priority), `Duplicate article priority: ${article.priority}`);
  seenArticlePriorities.add(article.priority);

  if (article.status === "published") {
    assert(/^\d{4}-\d{2}-\d{2}$/.test(article.publishedAt || ""), `Published article missing publishedAt date: ${article.slug}`);
  }

  const filePath = publicFileForHref(article.href);
  if (article.status === "published" && filePath) {
    assert(existsSync(join(root, filePath)), `Published article file missing: ${filePath}`);
  }
}

for (const project of projectCatalog) {
  assert(project.slug, `Project missing slug: ${project.title}`);
  assert(!seenProjectSlugs.has(project.slug), `Duplicate project slug: ${project.slug}`);
  seenProjectSlugs.add(project.slug);
  assert(project.title && project.desc && project.href, `Project incomplete: ${project.slug}`);
  assert(projectTypes.includes(project.type), `Invalid project type: ${project.slug}`);
  assert(projectStages.includes(project.stage), `Invalid project stage: ${project.slug}`);
  assert(project.outcome?.trim(), `Project missing outcome: ${project.slug}`);
  assert(project.tool?.trim(), `Project missing tool: ${project.slug}`);
  assert(Array.isArray(project.audience) && project.audience.length > 0, `Project missing audience: ${project.slug}`);
  assert(Array.isArray(project.useCases) && project.useCases.length > 0, `Project missing useCases: ${project.slug}`);
  assert(Number.isInteger(project.priority), `Project priority must be integer: ${project.slug}`);
  assert(!seenProjectPriorities.has(project.priority), `Duplicate project priority: ${project.priority}`);
  seenProjectPriorities.add(project.priority);
  assert(project.stage !== "ready" || project.href !== "/projects", `Ready project cannot point only to /projects: ${project.slug}`);
  if (project.stage === "ready") {
    assert(/^\d{4}-\d{2}-\d{2}$/.test(project.publishedAt || ""), `Ready project missing publishedAt date: ${project.slug}`);
  }
}

const articleIndex = read("public/bai-viet.html");
const vercelConfig = JSON.parse(read("vercel.json"));
const vercelRewrites = new Set((vercelConfig.rewrites || []).map((rewrite) => rewrite.source));

for (const route of [appRoutes.projects, appRoutes.dashboard, appRoutes.captionAi, appRoutes.docscanAi]) {
  assert(vercelRewrites.has(route), `Vercel rewrite missing for SPA route: ${route}`);
}

for (const article of articles.filter((item) => item.status === "published")) {
  assert(articleIndex.includes(article.href), `Article is published but not linked in article index: ${article.href}`);
}

console.log(`Content audit passed: ${articles.length} articles, ${projectCatalog.length} projects, ${navItems.length} nav items.`);
