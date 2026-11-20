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
const siteNav = readRequired("components/SiteNav.tsx");
const hero = readRequired("components/Hero.tsx");
const work = readRequired("components/Work.tsx");
const stack = readRequired("components/Stack.tsx");
const about = readRequired("components/About.tsx");
const pipeline = readRequired("components/Pipeline.tsx");
const footer = readRequired("components/SiteFooter.tsx");
const css = readRequired("app/globals.css");
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

// 套件与派发
for (const kitFile of [
  "public/assets/system.css",
  "public/assets/system.js",
  "public/assets/layout/layout.css",
  "public/assets/layout/layout.js",
  "public/assets/motion/motion.css",
  "public/assets/motion/motion.js",
  "public/assets/ui/cards.css",
  "public/assets/icons/icon.css",
  "public/assets/diagrams/diagram.css",
  "public/assets/diagrams/diagram.js",
  "public/assets/diagrams/mount.js",
  "public/assets/moments/moments.js",
  "public/assets/moments/lib.js",
  "public/assets/moments/word-highlight/moment.js",
]) {
  expect(existsSync(join(root, kitFile)), `${kitFile} should exist (kit copied verbatim)`);
}
expect(layout.includes("data-type=\"service\""), "layout should declare the service page type");
expect(layout.includes("data-buttons=\"tonal\""), "layout should carry the dealt button look");
expect(layout.includes("data-radius=\"soft\""), "layout should carry the dealt radius");
expect(layout.includes("data-motion"), "layout should enable the motion layer");
expect(layout.includes("m-enter"), "layout should set the hero entrance guard before first paint");
expect(layout.includes("page-type"), "layout should declare meta page-type");
expect(layout.includes("site-kind"), "layout should declare meta site-kind");
expect(layout.includes("Schibsted+Grotesk"), "layout should load the dealt type pairing");
expect(layout.includes("#e6dbc7"), "layout should carry the dealt palette ground as theme color");
expect(layout.includes("--ly-scale: 0.98"), "layout should keep the dealt ly-scale token");
expect(layout.includes("/assets/system.css"), "layout should load the kit stylesheet");

// 组件与结构
for (const section of ["Hero", "Work", "Stack", "About", "Pipeline", "SiteFooter"]) {
  expect(page.includes(section), `homepage should compose the ${section} section`);
}
expect(!page.includes("ActionBar"), "the optional action bar should stay off a service page");
expect(siteNav.includes("nav--centre"), "navigation should use the re-dealt nav-centre");
expect(siteNav.includes("nav__toggle"), "navigation should keep the phone menu toggle");
expect(siteNav.includes("skip-link"), "navigation should keep the kit skip link");
expect(hero.includes("hero--split"), "hero should use the dealt split layout");
expect(hero.includes("data-enter"), "hero should enter once on load");
expect(hero.includes("ly-float"), "hero should carry the dealt fact float card");
expect(hero.includes("/assets/profile.png"), "hero should show the client's own avatar");
expect(hero.includes("mailto:chenxiaoyou19@gmail.com"), "hero primary action should be the real email");
expect(hero.includes("/assets/resume.pdf"), "hero should offer the resume download");

expect(work.includes("api_auto_test"), "work should include api_auto_test");
expect(work.includes("github.com/chenxiaoyou/api_auto_test"), "api_auto_test card should link its repository");
expect(work.includes("/assets/icons/${id}.svg"), "work cards should load real colour tool icons");
expect(work.includes('id: "python"') || work.includes("ToolIcon id=\"python\""), "work should name real tools for icons");

expect(stack.includes("ic-40"), "stack should render real colour icons at tile size");
expect(stack.includes("toolPytest"), "stack should keep pytest as a type tile");
expect(stack.includes("ic-ink"), "black marks like GitHub should carry ic-ink");

expect(about.includes("data-moment=\"word-highlight\""), "about should host the dealt word-highlight moment");
expect(about.includes("mo-wh__text"), "about should carry the statement text");
expect(about.includes("unmountAll"), "about should remount the moment after a language switch");
expect(about.includes("expBdName"), "about should merge the experience rows");
expect(about.includes("rows__value"), "experience rows should keep ruled values");

expect(pipeline.includes("ground-inverse"), "pipeline should be the dealt dark band");
expect(pipeline.includes("data-diagram"), "pipeline should carry the one still diagram");
expect(pipeline.includes('pulse: "none"'), "the service diagram should hold still");
expect(pipeline.includes('ground: "none"'), "the service diagram should take no ground");

expect(footer.includes("closing__cta"), "footer should carry the dealt close");
expect(footer.includes("mailto:chenxiaoyou19@gmail.com"), "footer should expose the real email");
expect(footer.includes("github.com/chenxiaoyou"), "footer should link the GitHub profile");
expect(footer.includes("footer__legal"), "footer should render the legal row");
expect(!footer.includes("privacy.html"), "footer should not link pages the build does not have");

// i18n
expect(i18n.includes("五年多") || i18n.includes("5 年+"), "i18n should keep the real experience fact");
expect(i18n.includes("辰小右") && i18n.includes("测试开发工程师"), "i18n should name the person and the category in the h1");
expect(i18n.includes("test development engineer"), "i18n should name the category in English too");
expect(!i18n.includes("dockBlogs"), "i18n should not carry removed blog keys");

// css
expect(css.includes("#stack .tools"), "page CSS should lay out the tools grid");
expect(css.includes(".nav__lang"), "page CSS should style the language control");
expect(!css.includes("--p-bg"), "page CSS should not re-deal the palette tokens");

// 静态产物
for (const asset of [
  "public/assets/profile.png",
  "public/assets/logo-bytedance.svg",
  "public/assets/logo-bupt.png",
  "public/assets/logo-njupt.png",
  "public/assets/resume.pdf",
  "public/assets/icons/python.svg",
  "public/assets/icons/grafana.svg",
]) {
  expect(existsSync(join(root, asset)), `${asset} should remain available`);
}
const resumePath = join(root, "public/assets/resume.pdf");
if (existsSync(resumePath)) {
  expect(statSync(resumePath).size > 100, "public resume PDF should not be empty");
}

expect(outHome.includes("data-type=\"service\""), "built homepage should declare the service type");
expect(outHome.includes('name="page-type" content="service"'), "built homepage should carry the page-type meta");
expect(outHome.includes('name="site-kind" content="other"'), "built homepage should carry the site-kind meta");
expect(outHome.includes("辰小右") && outHome.includes("测试开发工程师"), "built homepage should include the h1");
expect(outHome.includes("rel=\"canonical\" href=\"https://chenxiaoyou.github.io\""), "homepage should have canonical metadata");
expect(outHome.includes("api_auto_test"), "built homepage should render the projects");
expect(outHome.includes("/assets/icons/python.svg"), "built homepage should load real icons");
expect(outHome.includes("data-moment=\"word-highlight\""), "built homepage should host the dealt moment");
expect(outHome.includes("/assets/system.css"), "built homepage should load the kit stylesheet");
expect(outHome.includes("data-enter"), "built homepage should keep the hero entrance");
expect(outHome.includes("mailto:chenxiaoyou19@gmail.com"), "built homepage should link the email");
expect(!outHome.includes("/blogs/"), "built homepage should not expose removed blog routes");
expect(!existsSync(join(root, "src")), "superseded Astro sources should be gone");

for (const word of ["GitHub Pages", "chenxiaoyou.github.io", "Next.js", "design-taste-frontend", "npm run build", "components/"]) {
  expect(readme.includes(word), `README.md should document ${word}`);
}

if (failures.length) {
  console.error(`Site check failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Tasteskill one-page homepage site check passed.");
