import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const failures = [];

function expect(condition, message) {
  if (!condition) failures.push(message);
}

function readRequired(path) {
  const fullPath = join(root, path);
  expect(existsSync(fullPath), `${path} should exist`);
  return existsSync(fullPath) ? readFileSync(fullPath, "utf8") : "";
}

const pkg = readRequired("package.json");
const astroConfig = readRequired("astro.config.mjs");
const contentConfig = readRequired("src/content.config.ts");
const layout = readRequired("src/layouts/BaseLayout.astro");
const dock = readRequired("src/components/UtilityDock.astro");
const list = readRequired("src/components/BlogList.astro");
const home = readRequired("src/pages/index.astro");
const blogsIndex = readRequired("src/pages/blogs/index.astro");
const blogPage = readRequired("src/pages/blogs/[slug].astro");
const sample = readRequired("src/content/blogs/reliable-automation-regression.md");
const draft = readRequired("src/content/blogs/private-draft.md");
const css = readRequired("public/assets/styles.css");
const js = readRequired("public/assets/site.js");
const readme = readRequired("README.md");
const distHome = readRequired("dist/index.html");
const distBlogs = readRequired("dist/blogs/index.html");
const distArticle = readRequired("dist/blogs/reliable-automation-regression/index.html");

expect(pkg.includes("\"astro\""), "package.json should depend on Astro");
expect(pkg.includes("astro build"), "package.json should expose the Astro static build");
expect(pkg.includes("ASTRO_TELEMETRY_DISABLED=1"), "project scripts should disable Astro telemetry during local and hosted builds");
expect(pkg.includes("astro check"), "package.json should expose Astro validation");
expect(astroConfig.includes("https://www.chenxiaoyou.com"), "Astro canonical site should use the Vercel www domain");
expect(astroConfig.includes("output: \"static\""), "Astro should generate static output");
expect(!existsSync(join(root, "CNAME")), "GitHub Pages CNAME should be removed for the Vercel-only site");

for (const schemaField of ["title", "description", "publishedAt", "updatedAt", "tags", "draft", "lang"]) {
  expect(contentConfig.includes(schemaField), `blogs content schema should define ${schemaField}`);
}
expect(contentConfig.includes("const blogs"), "content collection should use the blogs name");
expect(contentConfig.includes("src/content/blogs"), "blogs collection should load Markdown files from the blog content directory");

expect(layout.includes('canonicalURL'), "base layout should expose canonical metadata");
expect(layout.includes("og:title"), "base layout should provide Open Graph metadata");
expect(layout.includes("UtilityDock"), "base layout should share the top utility dock");
expect(layout.includes("defer"), "base layout should defer the preference script until controls are rendered");
expect(dock.includes("/blogs/"), "top utility dock should link to the blog list");
expect(
  /class="dock-button dock-icon blogs-link"[\s\S]*?target="_blank"[\s\S]*?rel="noopener noreferrer"/.test(dock),
  "top blog dock entry should open in a safe new tab",
);
expect(dock.includes("data-theme-toggle"), "top utility dock should preserve theme controls");
expect(dock.includes("data-lang-toggle"), "top utility dock should preserve language controls");

expect(home.includes("getCollection(\"blogs\""), "homepage should read published Markdown blog content");
expect(home.includes("slice(0, 3)"), "homepage should render only the latest three blog posts");
expect(
  /class="blogs-all"[\s\S]*?target="_blank"[\s\S]*?rel="noopener noreferrer"/.test(home),
  "homepage all-blogs entry should open in a safe new tab",
);
expect(home.indexOf('id="tech-stack"') < home.indexOf('id="blogs"'), "blog module should follow the technology stack");
expect(home.includes("测试开发"), "homepage should preserve the resume positioning");
expect(home.includes("北京邮电大学"), "homepage should preserve education content");
expect(home.includes("字节跳动"), "homepage should preserve work experience");
expect(dock.includes("assets/resume.pdf"), "shared utility dock should preserve resume download");
expect(list.includes("blog-row"), "shared blog list should render compact blog rows");
expect(
  /class="blog-link"[\s\S]*?target="_blank"[\s\S]*?rel="noopener noreferrer"/.test(list),
  "blog article entries should open in a safe new tab",
);
expect(list.includes("data-i18n-date"), "blog lists should localize published dates with the interface language");

expect(blogsIndex.includes("getCollection(\"blogs\""), "blog index should render collection entries");
expect(blogPage.includes("getStaticPaths"), "blog detail pages should be statically generated");
expect(blogPage.includes("render("), "blog detail pages should render Markdown");
expect(blogPage.includes("headings"), "blog detail pages should expose a table of contents");
expect(blogPage.includes("blog-toc"), "blog detail pages should include a table of contents UI");
expect(blogPage.includes("data-i18n-date"), "blog metadata dates should localize with the interface language");

for (const token of [
  "title: 如何设计可靠的自动化回归流程",
  "publishedAt:",
  "tags:",
  "## 回归流程的核心目标",
  "```python",
  "| 阶段 |",
]) {
  expect(sample.includes(token), `sample Markdown should include ${token}`);
}
expect(draft.includes("draft: true"), "a private draft fixture should exercise unpublished blog filtering");

expect(css.includes(".blogs-section"), "styles should cover the homepage blogs module");
expect(css.includes(".blogs-page"), "styles should cover the blog list page");
expect(css.includes(".blog-layout"), "styles should cover the article layout");
expect(css.includes(".blog-toc"), "styles should cover the table of contents");
expect(css.includes(".prose"), "styles should cover rendered Markdown prose");
expect(/\.prose\s*{[^}]*width:\s*100%;/s.test(css), "Markdown prose should be constrained within mobile article width");
expect(css.includes(".blogs-icon"), "styles should provide the blog dock icon");
expect(css.includes('[data-theme="dark"]'), "styles should preserve dark mode");
expect(js.includes("localStorage"), "site script should persist theme and language preferences");
expect(js.includes("blogsTitle"), "site script should translate blog interface labels");
expect(js.includes("data-i18n-date"), "site script should update blog metadata date formatting when language changes");

for (const asset of [
  "public/assets/profile.png",
  "public/assets/logo-bytedance.svg",
  "public/assets/logo-bupt.png",
  "public/assets/logo-njupt.png",
  "public/assets/resume.pdf",
]) {
  expect(existsSync(join(root, asset)), `${asset} should remain available as a public asset`);
}
const resumePath = join(root, "public/assets/resume.pdf");
if (existsSync(resumePath)) {
  expect(statSync(resumePath).size > 100, "public resume PDF should not be empty");
}

expect(distHome.includes("辰小右"), "built homepage should include the profile");
expect(distHome.includes('href="/blogs/"'), "built homepage should expose the blog entry");
expect(distHome.includes('target="_blank"'), "built homepage should open blog entries in new tabs");
expect(distHome.includes("博客"), "built homepage should label the Markdown area as 博客");
expect(distHome.includes("如何设计可靠的自动化回归流程"), "built homepage should show the latest published blog post");
expect(distHome.includes('rel="canonical" href="https://www.chenxiaoyou.com/"'), "homepage should have canonical metadata");
expect(distBlogs.includes("全部博客"), "built blog index should be generated");
expect(distBlogs.includes("如何设计可靠的自动化回归流程"), "blog index should list published content");
expect(!distBlogs.includes("仅供草稿验证"), "blog index should hide drafts");
expect(distArticle.includes("如何设计可靠的自动化回归流程"), "built article should render its title");
expect(distArticle.includes("<table"), "built article should render Markdown tables");
expect(distArticle.includes("astro-code"), "built article should highlight fenced code");
expect(distArticle.includes("blog-toc"), "built article should render its table of contents");
expect(!existsSync(join(root, "dist/blogs/private-draft/index.html")), "draft entries should not generate public routes");
expect(!existsSync(join(root, "dist/docs/index.html")), "legacy docs routes should not remain in the static output");
expect(!distHome.includes('href="/docs/"'), "built homepage should not expose the legacy docs route");

for (const word of ["Vercel", "www.chenxiaoyou.com", "Markdown", "src/content/blogs", "npm run build"]) {
  expect(readme.includes(word), `README.md should document ${word}`);
}
for (const source of [contentConfig, dock, list, home, blogsIndex, blogPage, js, readme]) {
  expect(!source.includes("/docs/") && !source.includes("src/content/docs"), "site sources should no longer expose docs paths");
}

if (failures.length) {
  console.error(`Site check failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Astro blog site check passed.");
