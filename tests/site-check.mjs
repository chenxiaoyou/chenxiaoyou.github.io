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
const reveal = readRequired("components/Reveal.tsx");
const siteNav = readRequired("components/SiteNav.tsx");
const hero = readRequired("components/Hero.tsx");
const about = readRequired("components/About.tsx");
const experience = readRequired("components/Experience.tsx");
const projects = readRequired("components/Projects.tsx");
const footer = readRequired("components/SiteFooter.tsx");
const css = readRequired("app/globals.css");
const readme = readRequired("README.md");
const outHome = readRequired("out/index.html");

expect(pkg.includes("\"next\""), "package.json should depend on Next.js");
expect(pkg.includes("\"react\""), "package.json should depend on React");
expect(pkg.includes("next build"), "package.json should expose the Next.js static build");
expect(pkg.includes("NEXT_TELEMETRY_DISABLED=1"), "project scripts should disable Next.js telemetry");
expect(pkg.includes("tsc --noEmit"), "package.json should expose TypeScript validation");
expect(!pkg.includes("\"astro\""), "package.json should no longer depend on Astro");

expect(nextConfig.includes("output: \"export\""), "Next.js should generate static export output");
expect(nextConfig.includes("unoptimized: true"), "images should be unoptimized for GitHub Pages");

expect(workflow.includes("branches: [main]"), "deploy workflow should trigger on pushes to main");
expect(workflow.includes("actions/setup-node"), "deploy workflow should set up Node");
expect(workflow.includes("node-version: 22"), "deploy workflow should pin Node 22 for Next.js");
expect(workflow.includes("npm ci"), "deploy workflow should install with npm ci");
expect(workflow.includes("path: out"), "deploy workflow should upload the static export output");
expect(workflow.includes("actions/deploy-pages"), "deploy workflow should publish with actions/deploy-pages");
expect(workflow.includes("id-token: write"), "deploy workflow should grant Pages deployment permissions");
expect(!workflow.includes("withastro/action"), "deploy workflow should not use the Astro action");

expect(layout.includes("metadataBase"), "layout should define the canonical site base");
expect(layout.includes("alternates"), "layout should expose canonical metadata");
expect(layout.includes("openGraph"), "layout should provide Open Graph metadata");
expect(layout.includes("themeColor"), "layout should provide a theme color");
expect(layout.includes("site-theme"), "layout should restore the persisted theme before first paint");
expect(layout.includes("SiteProvider"), "layout should wrap the page with the site context provider");
expect(layout.includes("SiteNav"), "layout should render the fixed navigation");
expect(layout.includes("suppressHydrationWarning"), "layout should tolerate pre-hydration preference mutations");

for (const section of ["Hero", "About", "Experience", "Projects", "SiteFooter"]) {
  expect(page.includes(section), `homepage should compose the ${section} section`);
}

expect(i18n.includes("navAbout"), "i18n should translate the navigation");
expect(i18n.includes("projectsTitle"), "i18n should translate the projects section");
expect(i18n.includes("footerCta"), "i18n should translate the footer CTA");
expect(i18n.includes("五年多互联网测试开发经验"), "i18n should keep the real Chinese about copy");
expect(i18n.includes("Five-plus years"), "i18n should keep the English about copy");
expect(i18n.includes("SiteProvider"), "i18n should export the site context provider");
expect(i18n.includes("localStorage"), "i18n provider should persist theme and language preferences");
expect(!i18n.includes("dockBlogs"), "i18n should not carry removed blog keys");

expect(reveal.includes("IntersectionObserver"), "reveal manager should drive scroll reveals");
expect(reveal.includes("prefers-reduced-motion"), "reveal manager should respect reduced motion preferences");
expect(reveal.includes("data-reveal"), "reveal manager should manage reveal elements");

expect(siteNav.includes("data-nav"), "navigation should expose scrollspy targets");
expect(siteNav.includes("navAbout") && siteNav.includes("navProjects"), "navigation should link page sections");
expect(siteNav.includes("assets/resume.pdf"), "navigation should preserve resume download");
expect(siteNav.includes("toggleTheme") && siteNav.includes("toggleLang"), "navigation should keep theme and language controls");
expect(!siteNav.includes("/blogs/"), "navigation should not link to removed blog routes");

expect(hero.includes("terminal-chip"), "hero should keep the terminal-style flourish");
expect(hero.includes("#projects"), "hero CTA should point to the projects section");
expect(hero.includes("https://github.com/chenxiaoyou"), "hero CTA should link the GitHub profile");

expect(about.includes("aboutPointOne"), "about should keep highlight point one");
expect(about.includes("aboutPointThree"), "about should keep highlight point three");

expect(i18n.includes("字节跳动"), "i18n should preserve work experience");
expect(i18n.includes("北京邮电大学"), "i18n should preserve education content");
expect(i18n.includes("南京邮电大学"), "i18n should preserve undergraduate education");
expect(experience.includes("badge-work"), "experience timeline should use type badges");
expect(experience.includes("aria-expanded"), "work details should keep the expandable control");
expect(experience.includes("terminal-key-problem"), "work details should keep the terminal narrative");
expect(experience.includes("data-icon={"), "tech stack should keep skill chips");
expect(experience.includes('icon: "PY"'), "tech stack should define the skill icon set");

expect(projects.includes("projectApiTitle"), "projects should include api_auto_test");
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
expect(!existsSync(join(root, "public/assets/site.js")), "superseded runtime script should be removed");
expect(!existsSync(join(root, "src")), "superseded Astro sources should be removed");

expect(outHome.includes("辰小右"), "built homepage should include the profile");
expect(outHome.includes('rel="canonical" href="https://chenxiaoyou.github.io"'), "homepage should have canonical metadata");
expect(outHome.includes('href="https://github.com/chenxiaoyou"'), "built homepage should link the GitHub profile");
expect(outHome.includes("mailto:chenxiaoyou19@gmail.com"), "built homepage should link the email address");
expect(outHome.includes("api_auto_test"), "built homepage should render the projects section");
expect(outHome.includes("href=\"#projects\""), "built homepage should anchor to the projects section");
expect(outHome.includes("/assets/resume.pdf"), "built homepage should keep the resume download");
expect(outHome.includes("/_next/static/") && outHome.includes(".css"), "built homepage should inline-link the stylesheet");
expect(!outHome.includes("/blogs/"), "built homepage should not expose removed blog routes");
expect(!existsSync(join(root, "dist")), "superseded Astro build output should be gone");

for (const word of ["GitHub Pages", "chenxiaoyou.github.io", "Next.js", "App Router", "npm run build", "components/"]) {
  expect(readme.includes(word), `README.md should document ${word}`);
}

if (failures.length) {
  console.error(`Site check failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Next.js one-page homepage site check passed.");
