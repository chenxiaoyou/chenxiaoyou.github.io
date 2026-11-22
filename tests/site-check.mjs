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
const nextConfig = readRequired("next.config.mjs");
const workflow = readRequired(".github/workflows/deploy.yml");
const layout = readRequired("app/layout.tsx");
const page = readRequired("app/page.tsx");
const i18n = readRequired("lib/i18n.tsx");
const tokens = readRequired("public/tokens.css");
const base = readRequired("public/base.css");
const pageCss = readRequired("app/globals.css");
const siteNav = readRequired("components/SiteNav.tsx");
const hero = readRequired("components/Hero.tsx");
const resume = readRequired("components/Resume.tsx");
const footer = readRequired("components/SiteFooter.tsx");
const readme = readRequired("README.md");
const outHome = readRequired("out/index.html");

expect(pkg.includes("\"next\""), "package.json should depend on Next.js");
expect(pkg.includes("next build"), "package.json should expose the Next.js static build");
expect(pkg.includes("NEXT_TELEMETRY_DISABLED=1"), "project scripts should disable Next.js telemetry");
expect(pkg.includes("tsc --noEmit"), "package.json should expose TypeScript validation");

expect(nextConfig.includes("output: \"export\""), "Next.js should generate static export output");

expect(workflow.includes("branches: [main]"), "deploy workflow should trigger on pushes to main");
expect(workflow.includes("node-version: 22"), "deploy workflow should pin Node 22 for Next.js");
expect(workflow.includes("path: out"), "deploy workflow should upload the static export output");
expect(workflow.includes("actions/deploy-pages"), "deploy workflow should publish with actions/deploy-pages");

// Hallmark 定制：stamp、tokens、base
expect(pageCss.includes("/* Hallmark · v2.1.0"), "page CSS should start with the Hallmark stamp (v2.1.0 restyle)");
expect(pageCss.includes("redesign: restyle"), "page CSS should declare the restyle depth");
expect(pageCss.includes("idea:"), "stamp should carry the idea line");
expect(pageCss.includes("posture:"), "stamp should declare the colour posture");
expect(pageCss.includes("@import url(\"tokens.css\")"), "page CSS should import the tokens");
expect(pageCss.includes("@import url(\"base.css\")"), "page CSS should import the base rules");
expect(tokens.includes("--color-paper: oklch(97.5% 0.004 250)"), "tokens should carry the light cool paper");
expect(tokens.includes("--color-accent: oklch(42% 0.12 255)"), "tokens should carry the pine accent");
expect(tokens.includes("--font-display: \"Piazzolla\""), "tokens should set Piazzolla as the display face");
expect(tokens.includes("--font-body: \"Onest\""), "tokens should set Onest as the body face");
expect(tokens.includes('[data-theme="dark"]'), "tokens should define the dark theme");
expect(tokens.includes("color-scheme: dark"), "dark theme should declare color-scheme");
expect(layout.includes("site-theme"), "layout should bootstrap the theme before first paint");
expect(tokens.includes("--bg: var(--color-paper)"), "tokens should alias the moment tokens");
expect(base.includes("overflow-x: clip"), "base should keep overflow-x clip");
expect(base.includes(":focus-visible"), "base should keep the focus ring");
expect(base.includes("prefers-reduced-motion"), "base should keep the reduced-motion collapse");
expect(layout.includes("tokens.css") && layout.includes("base.css"), "layout should load the token sheets");
expect(layout.includes("family=Piazzolla") && layout.includes("family=Onest"), "layout should load Piazzolla and Onest");
expect(layout.includes("site-kind"), "layout should declare meta site-kind");
expect(layout.includes("page-type"), "layout should declare meta page-type");

// 组件与结构
for (const section of ["Hero", "Resume", "SiteFooter"]) {
  expect(page.includes(section), `homepage should compose the ${section} section`);
}
expect(siteNav.includes("nav__toggle"), "navigation should keep the phone menu toggle");
expect(siteNav.includes("nav__theme"), "navigation should offer the theme toggle");
expect(siteNav.includes("nav__cta--fill") && siteNav.includes("nav__cta--ghost"), "navigation should carry the mail and resume CTAs top-right");
expect(siteNav.includes("skip-link"), "navigation should keep the skip link");
expect(hero.includes("report-meta"), "hero should carry the acceptance-report header");
expect(hero.includes("criteria"), "hero should carry the four-stage criteria rail");
expect(hero.includes("/assets/profile.png"), "hero should show the client's own avatar as the specimen");
// v1.7.2：CTA 只保留右上角导航一处（icon + 文案，窄屏纯 icon）
expect(siteNav.includes("mailto:chenxiaoyou19@gmail.com"), "nav primary action should be the real email");
expect(siteNav.includes("/assets/resume.pdf"), "nav should offer the resume download");
expect(siteNav.includes("nav__cta-icon"), "nav CTAs should render with icons");
expect(!hero.includes("hero__kicker"), "hero should not carry an eyebrow");

// v1.8.0：六段式简历（教育背景 / 专业技能 / 工作经历 / 项目经历 / 我的作品 / 自我评价）
for (const sectionId of ["education", "skills", "experience", "projects", "works", "evaluation"]) {
  expect(resume.includes(`id="${sectionId}"`), `resume should carry the ${sectionId} section`);
}
expect(resume.includes("work-index"), "resume should render projects as a numbered index");
expect(resume.includes("api_auto_test"), "resume should include api_auto_test");
expect(resume.includes("github.com/chenxiaoyou/api_auto_test"), "api_auto_test card should link its repository");
expect(resume.includes('ToolIcon id="python"') || resume.includes("icon: \"python\""), "resume chips should use real colour tool logos");
expect(resume.includes("workEvalStatus"), "resume should include the AI evaluation practice");
expect(!resume.includes("/blogs/"), "resume should not link to removed blog routes");
expect(resume.includes("rows__name") && resume.includes("rows__value"), "resume should render education, skills and experience as ruled ledgers");
expect(resume.includes("skillsTbd") && resume.includes("evalBody"), "missing resume content should use marked placeholders");

expect(i18n.includes("五年多，只做一件事"), "i18n should keep the real experience fact");
expect(i18n.includes("Five years, one job"), "i18n should keep the English experience fact");
expect(!i18n.includes("dockBlogs"), "i18n should not carry removed blog keys");



expect(footer.includes("footer__mail"), "footer should carry the plain email contact");
expect(footer.includes("mailto:chenxiaoyou19@gmail.com"), "footer should expose the real email");
expect(footer.includes("footer__mail"), "footer should carry the plain email contact");
expect(footer.includes("footer__legal"), "footer should render the legal row");
expect(footer.includes("socials"), "footer should keep the GitHub mark");

expect(pageCss.includes(".work-chip"), "page CSS should style the work chips");
expect(pageCss.includes(".criteria"), "page CSS should style the criteria rail");
expect(pageCss.includes(".footer__mail"), "page CSS should style the plain email contact");

// 静态产物
for (const asset of [
  "public/tokens.css",
  "public/base.css",
  "public/assets/profile.png",
  "public/assets/resume.pdf",
  "public/assets/icons/python.svg",
  "public/assets/icons/grafana.svg",
  "public/share.jpg",
]) {
  expect(existsSync(join(root, asset)), `${asset} should remain available`);
}
const resumePath = join(root, "public/assets/resume.pdf");
if (existsSync(resumePath)) {
  expect(statSync(resumePath).size > 100, "public resume PDF should not be empty");
}

expect(outHome.includes("<h1 id=\"hero-h\">辰小右</h1>"), "built homepage should carry the name as the hero headline");
expect(outHome.includes("rel=\"canonical\" href=\"https://chenxiaoyou.github.io\""), "homepage should have canonical metadata");
expect(outHome.includes("api_auto_test"), "built homepage should render the projects");
expect(outHome.includes("/assets/icons/python.svg"), "built homepage should load real icons");
expect(outHome.includes("mailto:chenxiaoyou19@gmail.com"), "built homepage should link the email");
expect(!outHome.includes("/blogs/"), "built homepage should not expose removed blog routes");

for (const word of ["GitHub Pages", "chenxiaoyou.github.io", "Next.js", "design-taste-frontend", "hallmark", "npm run build"]) {
  expect(readme.includes(word), `README.md should document ${word}`);
}

if (failures.length) {
  console.error(`Site check failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Hallmark acceptance-report site check passed.");
