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
const work = readRequired("components/Work.tsx");
const about = readRequired("components/About.tsx");
const pipeline = readRequired("components/Pipeline.tsx");
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
expect(pageCss.includes("/* Hallmark ·"), "page CSS should start with the Hallmark stamp");
expect(pageCss.includes("idea:"), "stamp should carry the idea line");
expect(pageCss.includes("posture:"), "stamp should declare the colour posture");
expect(pageCss.includes("@import url(\"tokens.css\")"), "page CSS should import the tokens");
expect(pageCss.includes("@import url(\"base.css\")"), "page CSS should import the base rules");
expect(tokens.includes("--color-paper: oklch(16% 0.012 50)"), "tokens should carry the dark warm paper");
expect(tokens.includes("--color-accent: oklch(46% 0.19 38)"), "tokens should carry the vermillion accent");
expect(tokens.includes("--font-display: var(--font-plex-mono)"), "tokens should set IBM Plex Mono as the display face");
expect(tokens.includes("--font-body: var(--font-plex-mono)"), "tokens should set the mono material as the body face");
expect(tokens.includes("--bg: var(--color-paper)"), "tokens should alias the moment tokens");
expect(base.includes("overflow-x: clip"), "base should keep overflow-x clip");
expect(base.includes(":focus-visible"), "base should keep the focus ring");
expect(base.includes("prefers-reduced-motion"), "base should keep the reduced-motion collapse");
expect(layout.includes("tokens.css") && layout.includes("base.css"), "layout should load the token sheets");
expect(layout.includes("IBM+Plex+Mono"), "layout should load IBM Plex Mono");
expect(layout.includes("site-kind"), "layout should declare meta site-kind");
expect(layout.includes("page-type"), "layout should declare meta page-type");

// 组件与结构
for (const section of ["Hero", "Work", "About", "Pipeline", "SiteFooter"]) {
  expect(page.includes(section), `homepage should compose the ${section} section`);
}
expect(siteNav.includes("nav__toggle"), "navigation should keep the phone menu toggle");
expect(siteNav.includes("skip-link"), "navigation should keep the skip link");
expect(hero.includes("report-meta"), "hero should carry the acceptance-report header");
expect(hero.includes("criteria"), "hero should carry the four-stage criteria rail");
expect(hero.includes("/assets/profile.png"), "hero should show the client's own avatar as the specimen");
expect(hero.includes("mailto:chenxiaoyou19@gmail.com"), "hero primary action should be the real email");
expect(hero.includes("/assets/resume.pdf"), "hero should offer the resume download");
expect(!hero.includes("hero__kicker"), "hero should not carry an eyebrow");

expect(work.includes("work-index"), "work should render as a numbered index");
expect(work.includes("api_auto_test"), "work should include api_auto_test");
expect(work.includes("github.com/chenxiaoyou/api_auto_test"), "api_auto_test card should link its repository");
expect(work.includes('ToolIcon id="python"') || work.includes("icon: \"python\""), "work chips should use real colour tool logos");
expect(work.includes("workEvalStatus"), "work should include the AI evaluation practice");
expect(!work.includes("/blogs/"), "work should not link to removed blog routes");

expect(i18n.includes("五年多互联网测试开发经验"), "i18n should keep the real Chinese about copy");
expect(i18n.includes("Five-plus years"), "i18n should keep the English about copy");
expect(i18n.includes("把质量风险，拦在发布之前"), "i18n should keep the Chinese hero headline");
expect(i18n.includes("Stop quality risks before the release"), "i18n should keep the English hero headline");
expect(!i18n.includes("dockBlogs"), "i18n should not carry removed blog keys");

expect(about.includes("data-moment=\"word-highlight\""), "about should host the dealt word-highlight moment");
expect(about.includes("mo-wh__text"), "about should carry the statement text");
expect(about.includes("aboutExpLabel"), "about should label the experience rows");
expect(about.includes("expBdName"), "about should keep the experience rows");

expect(pipeline.includes("pipe-rail"), "pipeline should carry the page-drawn acceptance rail");
expect(pipeline.includes("dgStepRegression"), "the rail should keep the four stages");
expect(pipeline.includes('role="img"'), "the rail should be named as a diagram of a real system");

expect(footer.includes("footer__mail"), "footer should carry the plain email contact");
expect(footer.includes("mailto:chenxiaoyou19@gmail.com"), "footer should expose the real email");
expect(footer.includes("close__word"), "footer should end with the name set wide");
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

expect(outHome.includes("把质量风险，拦在发布之前"), "built homepage should carry the hero headline");
expect(outHome.includes("rel=\"canonical\" href=\"https://chenxiaoyou.github.io\""), "homepage should have canonical metadata");
expect(outHome.includes("api_auto_test"), "built homepage should render the projects");
expect(outHome.includes("data-moment=\"word-highlight\""), "built homepage should host the dealt moment");
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
