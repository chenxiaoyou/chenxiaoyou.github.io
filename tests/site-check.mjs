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
const workflow = readRequired(".github/workflows/deploy.yml");
const layout = readRequired("src/layouts/BaseLayout.astro");
const dock = readRequired("src/components/UtilityDock.astro");
const hero = readRequired("src/components/Hero.astro");
const about = readRequired("src/components/About.astro");
const background = readRequired("src/components/Background.astro");
const projects = readRequired("src/components/Projects.astro");
const footer = readRequired("src/components/SiteFooter.astro");
const home = readRequired("src/pages/index.astro");
const css = readRequired("public/assets/styles.css");
const js = readRequired("public/assets/site.js");
const readme = readRequired("README.md");
const distHome = readRequired("dist/index.html");

expect(pkg.includes("\"astro\""), "package.json should depend on Astro");
expect(pkg.includes("astro build"), "package.json should expose the Astro static build");
expect(pkg.includes("ASTRO_TELEMETRY_DISABLED=1"), "project scripts should disable Astro telemetry");
expect(pkg.includes("astro check"), "package.json should expose Astro validation");

expect(astroConfig.includes("https://chenxiaoyou.github.io"), "Astro canonical site should use the GitHub Pages domain");
expect(astroConfig.includes("output: \"static\""), "Astro should generate static output");
expect(!existsSync(join(root, "CNAME")), "GitHub Pages user site should not carry a CNAME file");

expect(workflow.includes("branches: [main]"), "deploy workflow should trigger on pushes to main");
expect(workflow.includes("withastro/action"), "deploy workflow should build with the official Astro action");
expect(workflow.includes("actions/deploy-pages"), "deploy workflow should publish with actions/deploy-pages");
expect(workflow.includes("id-token: write"), "deploy workflow should grant Pages deployment permissions");

expect(layout.includes("canonicalURL"), "base layout should expose canonical metadata");
expect(layout.includes("og:title"), "base layout should provide Open Graph metadata");
expect(layout.includes("og:image"), "base layout should provide an Open Graph image");
expect(layout.includes("UtilityDock"), "base layout should share the fixed navigation");
expect(layout.includes("site-theme"), "base layout should restore the persisted theme before first paint");
expect(layout.includes("defer"), "base layout should defer the site script until the page is parsed");

for (const anchor of ["#about", "#experience", "#projects", "#contact"]) {
  expect(dock.includes(`href="${anchor}"`), `navigation should link to ${anchor}`);
}
expect(dock.includes("data-nav"), "navigation links should expose scrollspy targets");
expect(dock.includes("assets/resume.pdf"), "navigation should preserve resume download");
expect(dock.includes("download"), "resume navigation entry should download the PDF");
expect(dock.includes("data-theme-toggle"), "navigation should preserve theme controls");
expect(dock.includes("data-lang-toggle"), "navigation should preserve language controls");
expect(!dock.includes("/blogs/"), "navigation should not link to removed blog routes");

expect(home.includes("import Hero"), "homepage should compose the Hero section");
expect(home.includes("import About"), "homepage should compose the About section");
expect(home.includes("import Background"), "homepage should compose the Experience section");
expect(home.includes("import Projects"), "homepage should compose the Projects section");
expect(home.includes("import SiteFooter"), "homepage should compose the contact footer");
expect(!home.includes("getCollection"), "homepage should not reference removed content collections");

expect(hero.includes("terminal-chip"), "hero should keep the terminal-style flourish");
expect(hero.includes("#projects"), "hero CTA should point to the projects section");
expect(hero.includes("assets/resume.pdf"), "hero CTA should offer the resume download");
expect(hero.includes("https://github.com/chenxiaoyou"), "hero CTA should link the GitHub profile");

expect(about.includes("五年多互联网测试开发经验"), "about copy should keep the real experience summary");
expect(about.includes("aboutPointOne"), "about should keep highlight point one");
expect(about.includes("aboutPointThree"), "about should keep highlight point three");

expect(background.includes("字节跳动"), "experience timeline should preserve work experience");
expect(background.includes("北京邮电大学"), "experience timeline should preserve education content");
expect(background.includes("南京邮电大学"), "experience timeline should preserve undergraduate education");
expect(background.includes("data-detail-toggle"), "experience timeline should keep expandable work details");
expect(background.includes("terminal-key-problem"), "work details should keep the terminal narrative");
expect(background.includes("data-icon=\"PY\""), "tech stack should keep skill chips");

expect(projects.includes("projectApiTitle"), "projects should include api_auto_test");
expect(projects.includes("projectMewcodeTitle"), "projects should include mewcode internals");
expect(projects.includes("projectMewhelpTitle"), "projects should include mewhelp internals");
expect(projects.includes("projectEvalTitle"), "projects should include AI evaluation practice");
expect(
  projects.includes("https://github.com/chenxiaoyou/api_auto_test"),
  "api_auto_test card should link its repository",
);
expect(!projects.includes("/blogs/"), "project cards should not link to removed blog routes");

expect(footer.includes("mailto:chenxiaoyou19@gmail.com"), "footer should expose the email address");
expect(footer.includes("https://github.com/chenxiaoyou"), "footer should expose the GitHub profile");
expect(footer.includes("assets/resume.pdf"), "footer should offer the resume download");
expect(footer.includes("footer-copy"), "footer should render the copyright line");

expect(js.includes("navAbout"), "site script should translate the navigation");
expect(js.includes("projectsTitle"), "site script should translate the projects section");
expect(js.includes("footerCta"), "site script should translate the footer CTA");
expect(!js.includes("dockBlogs"), "site script should drop removed blog keys");
expect(js.includes("localStorage"), "site script should persist theme and language preferences");
expect(js.includes("IntersectionObserver"), "site script should drive scroll reveals and scrollspy");
expect(js.includes("prefers-reduced-motion"), "site script should respect reduced motion preferences");
expect(js.includes("data-reveal"), "site script should manage reveal elements");
expect(js.includes("data-nav"), "site script should manage scrollspy navigation");
expect(js.includes("closest(\".timeline-item\")"), "detail toggles should target the timeline item");

expect(css.includes("[data-theme=\"light\"]"), "styles should provide the light theme token set");
expect(css.includes(".site-nav"), "styles should cover the fixed navigation");
expect(css.includes(".hero-name"), "styles should cover the hero headline");
expect(css.includes(".timeline"), "styles should cover the experience timeline");
expect(css.includes(".project-card"), "styles should cover project cards");
expect(css.includes(".site-footer"), "styles should cover the contact footer");
expect(css.includes("html.js [data-reveal]"), "reveal animations should only apply when JS is available");
expect(css.includes("prefers-reduced-motion"), "styles should respect reduced motion preferences");
expect(css.includes("--gradient"), "styles should define the accent gradient token");
expect(!css.includes(".prose"), "styles should not retain removed blog prose styles");
expect(!css.includes(".blog-toc"), "styles should not retain removed blog TOC styles");

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
expect(distHome.includes('rel="canonical" href="https://chenxiaoyou.github.io/"'), "homepage should have canonical metadata");
expect(distHome.includes('href="https://github.com/chenxiaoyou"'), "built homepage should link the GitHub profile");
expect(distHome.includes("mailto:chenxiaoyou19@gmail.com"), "built homepage should link the email address");
expect(distHome.includes("api_auto_test"), "built homepage should render the projects section");
expect(distHome.includes("href=\"#projects\""), "built homepage should anchor to the projects section");
expect(!distHome.includes("/blogs/"), "built homepage should not expose removed blog routes");
expect(!existsSync(join(root, "dist/blogs")), "removed blog routes should not generate static output");
expect(!existsSync(join(root, "dist/docs")), "legacy docs routes should not remain in the static output");

for (const word of ["GitHub Pages", "chenxiaoyou.github.io", "src/components", "npm run build", "translations"]) {
  expect(readme.includes(word), `README.md should document ${word}`);
}
for (const source of [dock, hero, about, background, projects, footer, js, readme]) {
  expect(!source.includes("/docs/") && !source.includes("src/content"), "site sources should no longer reference removed content routes");
}

if (failures.length) {
  console.error(`Site check failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("One-page homepage site check passed.");
