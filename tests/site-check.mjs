import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";
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

const html = readRequired("index.html");
const css = readRequired("assets/styles.css");
const favicon = readRequired("assets/favicon.svg");
const readme = readRequired("README.md");
const js = readRequired("assets/site.js");
const bytedanceLogo = readRequired("assets/logo-bytedance.svg");
const profilePath = join(root, "assets/profile.png");
const buptLogoPath = join(root, "assets/logo-bupt.png");
const njuptLogoPath = join(root, "assets/logo-njupt.png");
const resumePath = join(root, "assets/resume.pdf");

expect(html.includes("lang=\"zh-CN\""), "index.html should declare zh-CN language");
expect(html.includes("<title>辰小右</title>"), "index.html should use only the name in the browser title");
expect(html.includes("测试开发"), "index.html should target testing/development roles");
expect(html.includes("自动化"), "index.html should mention automation");
expect(html.includes("稳定性"), "index.html should mention stability");
expect(html.includes("assets/styles.css"), "index.html should load assets/styles.css");
expect(html.includes("assets/site.js"), "index.html should load assets/site.js");
expect(html.includes("assets/profile.png"), "index.html should include the provided profile photo asset");
expect(!html.includes("assets/profile.svg"), "index.html should stop using the old placeholder profile SVG");
expect(html.includes('rel="icon" href="assets/profile.png" type="image/png"'), "index.html should use the Doraemon avatar as the favicon");
expect(html.includes("assets/resume.pdf"), "index.html should link to assets/resume.pdf");
expect(html.includes("辰小右"), "index.html should use the updated Chinese name");
expect(!html.includes("陈小悠"), "index.html should not include the previous Chinese name");
expect(html.includes("top-dock"), "index.html should use a centered floating top dock");
expect(html.includes("utility-dock"), "index.html should use a right-aligned utility dock");
expect(html.includes("dock-icon"), "index.html should use icon-style dock buttons");
expect(html.includes("resume-icon"), "index.html should render resume as an icon");
expect(html.includes("theme-icon"), "index.html should render dark mode as an icon");
expect(html.includes("dock-divider"), "index.html should separate resume from utility controls");
expect(html.includes('data-resume-meta="PDF"'), "index.html should show a compact PDF status on the resume icon");
expect(html.includes("lang-toggle"), "index.html should use one combined language toggle");
expect((html.match(/data-lang-toggle/g) || []).length === 1, "index.html should only render one language toggle");
expect(html.indexOf("resume-link") < html.indexOf("theme-toggle"), "index.html should put resume first in the utility dock");
expect(html.indexOf("dock-divider") > html.indexOf("resume-link"), "index.html should place the divider after resume");
expect(html.indexOf("dock-divider") < html.indexOf("theme-toggle"), "index.html should place the divider before theme and language");
expect(!html.includes("dock-brand"), "index.html should remove the old brand button from the top dock");
expect(!html.includes("dock-nav"), "index.html should remove text navigation from the top dock");
expect(!html.includes('data-i18n="navAbout"'), "index.html should remove the About nav text");
expect(!html.includes('data-i18n="navBackground"'), "index.html should remove the Background nav text");
expect(!html.includes('data-i18n="navTech"'), "index.html should remove the Tech nav text");
expect(!html.includes("site-header"), "index.html should not use the old full-width header");
expect(html.includes("hero-card"), "index.html should use a centered reference-style hero card");
expect(html.includes("hero-photo-shell"), "index.html should place the profile photo inside the hero card");
expect(html.includes("brand-tagline"), "index.html should add a clear personal brand tagline in the hero");
expect(html.includes("Quality Engineering"), "index.html should position the brand around quality engineering");
expect(html.includes("hero-signal-grid"), "index.html should add compact status chips to the hero");
expect((html.match(/class="signal-chip"/g) || []).length >= 4, "index.html should render at least four hero status chips");
expect(!html.includes('data-i18n="pageType"'), "index.html should remove the visible Personal Homepage eyebrow");
expect(!html.includes("hero-actions"), "index.html should remove hero action buttons");
expect(!html.includes("action-button"), "index.html should remove hero action button links");
expect(!html.includes("下载简历"), "index.html should remove the Download resume hero copy");
expect(!html.includes("about-pill"), "index.html should not include the duplicate standalone about pill");
expect(html.includes("about-row"), "index.html should render about as a long row matching background rows");
expect(!html.includes("about-card"), "index.html should not use the older narrow about card");
expect(html.includes("about-point"), "index.html should include compact about placeholder points");

for (const sectionId of [
  "hero",
  "about",
  "experience",
  "education",
  "tech-stack",
]) {
  expect(html.includes(`id="${sectionId}"`), `index.html should include #${sectionId}`);
}

for (const removedId of ["summary", "highlights", "contact"]) {
  expect(!html.includes(`id="${removedId}"`), `index.html should not include #${removedId}`);
}

for (const text of [
  "教育背景",
  "工作经历",
  "关于我",
  "这里先占位",
  "北京邮电大学",
  "硕士 | 电子与通信工程",
  "2018 - 2021",
  "南京邮电大学",
  "本科 | 信息安全",
  "2012 - 2016",
  "字节跳动",
  "测试开发",
  "北京 | 2021.06 - 至今",
  "技术栈",
  "测试自动化",
  "稳定性观测",
  "CI / 工具链",
]) {
  expect(html.includes(text), `index.html should include ${text}`);
}

expect(
  (html.match(/class="background-row"/g) || []).length === 3,
  "index.html should render exactly three background rows",
);
expect(html.includes("background-board"), "index.html should use the reference-style background board");
expect(html.includes("org-mark"), "index.html should include circular organization marks");
expect(html.includes("assets/logo-bytedance.svg"), "index.html should use a ByteDance logo asset");
expect(html.includes("assets/logo-bupt.png"), "index.html should use the provided BUPT logo image");
expect(html.includes("assets/logo-njupt.png"), "index.html should use the provided NJUPT logo image");
expect(html.indexOf("assets/logo-bupt.png") < html.indexOf("北京邮电大学"), "index.html should pair the BUPT logo with BUPT");
expect(html.indexOf("assets/logo-njupt.png") < html.indexOf("南京邮电大学"), "index.html should pair the NJUPT logo with NJUPT");
expect(!html.includes("assets/logo-bupt.svg"), "index.html should not use the old BUPT placeholder SVG");
expect(!html.includes("assets/logo-njupt.svg"), "index.html should not use the old NJUPT placeholder SVG");
expect(html.includes("row-arrow"), "index.html should include right-side row arrows");
expect(html.includes("name-link-arrow"), "index.html should include hidden homepage arrows beside organization names");
expect(html.includes("https://www.bytedance.com/"), "index.html should link ByteDance name arrow to the ByteDance homepage");
expect(html.includes("https://www.bupt.edu.cn/"), "index.html should link BUPT name arrow to the BUPT homepage");
expect(html.includes("https://www.njupt.edu.cn/"), "index.html should link NJUPT name arrow to the NJUPT homepage");
expect(html.includes("work-detail-toggle"), "index.html should make the right work arrow an expandable detail trigger");
expect(html.includes("work-detail-panel"), "index.html should include an empty expandable work detail panel");
expect(html.includes("terminal-detail"), "index.html should render work details as a compact terminal panel");
expect(html.includes("Problem"), "index.html should frame work detail as Problem Action Result");
expect(html.includes("Action"), "index.html should frame work detail as Problem Action Result");
expect(html.includes("Result"), "index.html should frame work detail as Problem Action Result");
expect(html.includes("profile-photo"), "index.html should render photo plus introduction at the top");
expect(!html.includes("个人主页"), "index.html should remove the Personal Homepage copy");
expect(html.includes("tech-grid"), "index.html should include a compact technology grid");
expect((html.match(/class="tech-card"/g) || []).length >= 4, "index.html should render at least four technology cards");
expect((html.match(/class="tech-chip"/g) || []).length >= 12, "index.html should render technology chips");
expect((html.match(/class="tech-chip" data-icon=/g) || []).length >= 12, "index.html should add an icon hook to every technology chip");
expect((html.match(/data-skill=/g) || []).length >= 12, "index.html should add hover skill context to every technology chip");
expect(html.includes("data-i18n-skill"), "index.html should allow skill hover context to be translated");
expect(html.includes("职业方向、优势和目标岗位"), "index.html should use a concise about placeholder");
expect(!html.includes("后续可以补充 2-3 句话"), "index.html should avoid long about placeholder copy");
expect(!html.includes("实习与工作经历"), "index.html should rename internship/work section to 工作经历");

for (const oldText of [
  "新加坡国立大学",
  "南京大学",
  "江苏省锡山高级中学",
  "高中文凭",
  "渌晨科技",
  "执行副总裁",
  "加州大学伯克利分校",
  "科研实习生",
  "新加坡 | 2021 年 6 月 - 2022 年 6 月",
]) {
  expect(!html.includes(oldText), `index.html should not include old resume item ${oldText}`);
  expect(!js.includes(oldText), `assets/site.js should not include old resume item ${oldText}`);
}

for (const translatedText of [
  "Beijing University of Posts and Telecommunications",
  "M.S. | Electronic and Communication Engineering",
  "Nanjing University of Posts and Telecommunications",
  "B.S. | Information Security",
  "Test Development Engineer",
  "Beijing | 2021.06 - Present",
]) {
  expect(js.includes(translatedText), `assets/site.js should include ${translatedText}`);
}
expect(!html.includes("北京邮电大学（硕士）"), "index.html should move the BUPT degree out of the school name");
expect(!html.includes("南京邮电大学（本科）"), "index.html should move the NJUPT degree out of the school name");
expect(!js.includes("Beijing University of Posts and Telecommunications (M.S.)"), "assets/site.js should move BUPT degree out of the school name");
expect(!js.includes("Nanjing University of Posts and Telecommunications (B.S.)"), "assets/site.js should move NJUPT degree out of the school name");

const experienceIndex = html.indexOf('id="experience"');
const educationIndex = html.indexOf('id="education"');
const heroIndex = html.indexOf('id="hero"');
const aboutIndex = html.indexOf('id="about"');
expect(heroIndex > 0 && aboutIndex > 0, "index.html should include hero and about sections");
expect(heroIndex < aboutIndex, "index.html should place about content after the hero");
expect(aboutIndex < experienceIndex, "index.html should place about content before work experience");
expect(experienceIndex > 0 && educationIndex > 0, "index.html should include experience and education sections");
expect(experienceIndex < educationIndex, "index.html should place work experience above education");

for (const text of ["Recent", "最新动态", "博客", "Blog", "精选项目", "Selected Work", "精选论文", "Research"]) {
  expect(!html.includes(text), `index.html should not include ${text}`);
}

expect(html.includes("data-i18n"), "index.html should include translatable content markers");
expect(html.includes("data-lang-toggle"), "index.html should include a language toggle");
expect(html.includes("data-theme-toggle"), "index.html should include a dark-mode toggle");
expect(js.includes("localStorage"), "assets/site.js should persist language and theme preferences");
expect(js.includes("data-theme"), "assets/site.js should toggle dark mode via data-theme");
expect(js.includes("zh-CN"), "assets/site.js should support Chinese language");
expect(js.includes("en"), "assets/site.js should support English language");
expect(js.includes("辰小右"), "assets/site.js should use the updated Chinese name");
expect(js.includes("Chen Xiaoyou"), "assets/site.js should keep the English transliterated name");
expect(!js.includes("陈小悠"), "assets/site.js should not include the previous Chinese name");
expect(!js.includes("pageType"), "assets/site.js should remove the unused page type translation");
expect(!js.includes("个人主页"), "assets/site.js should remove the Personal Homepage translation");
expect(js.includes("nextLang = root.dataset.lang === \"zh\" ? \"en\" : \"zh\""), "assets/site.js should toggle language from one button");
expect(js.includes("currentLanguageLabel"), "assets/site.js should update the combined language button label");
expect(js.includes("data-i18n-label"), "assets/site.js should translate icon button labels");
expect(js.includes("data-i18n-title"), "assets/site.js should translate icon button titles");
expect(js.includes("data-i18n-skill"), "assets/site.js should translate technology chip skill context");
expect(js.includes("data-detail-toggle"), "assets/site.js should toggle expandable work detail panels");
expect(js.includes("aria-expanded"), "assets/site.js should keep detail toggle state accessible");
expect(!js.includes("navAbout"), "assets/site.js should remove unused About nav translation");
expect(!js.includes("navBackground"), "assets/site.js should remove unused Background nav translation");
expect(!js.includes("navTech"), "assets/site.js should remove unused Tech nav translation");
expect(!js.includes("下载简历"), "assets/site.js should remove unused Download resume translation");
expect(!js.includes("Download resume"), "assets/site.js should remove unused Download resume translation");
expect(!js.includes("aboutPill"), "assets/site.js should remove unused about hero action translation");

const techStackEnd = html.indexOf("</section>", html.indexOf('id="tech-stack"'));
const mainEnd = html.indexOf("</main>");
expect(techStackEnd > 0 && mainEnd > techStackEnd, "index.html should close tech stack before main ends");
expect(
  html.slice(techStackEnd, mainEnd).trim() === "</section>",
  "index.html should not render content after the tech stack inside main",
);

for (const metaName of [
  "description",
  "og:title",
  "og:description",
  "viewport",
]) {
  expect(html.includes(metaName), `index.html should include ${metaName} metadata`);
}

expect(css.includes("@media"), "assets/styles.css should include responsive styles");
expect(css.includes("max-width"), "assets/styles.css should constrain mobile layout");
expect(css.includes(":focus-visible"), "assets/styles.css should include keyboard focus styles");
expect(css.includes(".top-dock"), "assets/styles.css should style the centered floating dock");
expect(css.includes("right: clamp(12px, 3vw, 28px);"), "assets/styles.css should move the top dock to the top right");
expect(css.includes("left: auto;"), "assets/styles.css should stop centering the top dock");
expect(css.includes("transform: none;"), "assets/styles.css should remove centered dock transform");
expect(css.includes(".dock-button"), "assets/styles.css should style dock icon buttons");
expect(css.includes(".dock-icon"), "assets/styles.css should style icon-only dock controls");
expect(css.includes(".dock-divider"), "assets/styles.css should style the resume separator");
expect(css.includes(".lang-toggle"), "assets/styles.css should style the combined language toggle");
expect(css.includes(".resume-icon::before"), "assets/styles.css should draw resume icon details");
expect(css.includes(".resume-link::after"), "assets/styles.css should show PDF status on the resume icon");
expect(css.includes("content: attr(data-resume-meta);"), "assets/styles.css should source resume status from data attribute");
expect(css.includes(".theme-icon::before"), "assets/styles.css should draw theme icon details");
expect(css.includes(".theme-icon::after"), "assets/styles.css should draw theme icon rays or moon polish");
expect(css.includes(".hero-card"), "assets/styles.css should style the centered hero card");
expect(css.includes(".hero-photo-shell"), "assets/styles.css should style the embedded profile-photo shell");
expect(css.includes("grid-template-columns: minmax(0, 1fr) clamp(126px, 18vw, 148px);"), "assets/styles.css should reserve a stable hero avatar column");
expect(!css.includes("padding-right: min(196px, 30vw);"), "assets/styles.css should not reserve avatar space with padding");
expect(!css.includes("right: -18px;"), "assets/styles.css should not push the avatar outside the hero card");
expect(css.includes("justify-self: end;"), "assets/styles.css should align the avatar inside its own hero column");
expect(css.includes(".hero-photo-shell:hover .profile-photo"), "assets/styles.css should rotate the avatar on hover");
expect(css.includes("rotate(360deg)"), "assets/styles.css should rotate the avatar on hover");
expect(css.includes("transition: transform 1.2s ease;"), "assets/styles.css should slow down the avatar hover rotation");
expect(css.includes(".brand-tagline"), "assets/styles.css should style the hero brand tagline");
expect(css.includes(".hero-signal-grid"), "assets/styles.css should style hero status chips");
expect(css.includes(".signal-chip"), "assets/styles.css should style individual status chips");
expect(!css.includes(".hero-actions"), "assets/styles.css should remove hero actions styles");
expect(!css.includes(".action-button"), "assets/styles.css should remove hero action button styles");
expect(!css.includes(".about-pill"), "assets/styles.css should remove the duplicate standalone about pill style");
expect(css.includes(".about-section"), "assets/styles.css should style the about section");
expect(css.includes(".about-row"), "assets/styles.css should style the about long row");
expect(!css.includes(".about-card"), "assets/styles.css should remove the old narrow about card");
expect(css.includes(".about-point"), "assets/styles.css should style compact about points");
expect(css.includes("min-height: min(520px, calc(100svh"), "assets/styles.css should keep the hero even more compact");
expect(!css.includes("min-height: min(560px, calc(100svh"), "assets/styles.css should not use the previous taller hero");
expect(!css.includes("min-height: min(640px, calc(100svh"), "assets/styles.css should not use the previous taller hero");
expect(!css.includes("min-height: calc(100svh - 18px);"), "assets/styles.css should not make the hero occupy a full viewport");
expect(css.includes("min-height: 72px;"), "assets/styles.css should compact background rows further");
expect(!css.includes("min-height: 78px;"), "assets/styles.css should not use the previous taller background rows");
expect(!css.includes("min-height: 92px;"), "assets/styles.css should not use the previous taller background rows");
expect(!css.includes("min-height: 118px;"), "assets/styles.css should not use oversized background rows");
expect(css.includes("gap: clamp(22px, 3.5vw, 34px);"), "assets/styles.css should reduce background group spacing further");
expect(css.includes(".about-wrap"), "assets/styles.css should style the about wrapper");
expect(
  /\.about-wrap\s*{[^}]*width: min\(1180px, 100%\);/s.test(css),
  "assets/styles.css should align the about label with lower section labels",
);
expect(css.includes(".about-row::before"), "assets/styles.css should add technical scan polish to about row");
expect(!css.includes(".corner-accent"), "assets/styles.css should remove decorative corner accents");
expect(css.includes(".background-row::before"), "assets/styles.css should add scan polish to background rows");
expect(!html.includes("corner-accent"), "index.html should not render decorative corner accents");
expect(css.includes("body::before"), "assets/styles.css should keep a subtle ambient layer");
expect(!css.includes("body::after"), "assets/styles.css should remove the page scanline layer");
expect(!css.includes(".hero-stage::before"), "assets/styles.css should remove the hero HUD top line");
expect(!css.includes(".hero-stage::after"), "assets/styles.css should remove the hero HUD bottom line");
expect(css.includes("@keyframes aura-shift"), "assets/styles.css should define ambient animation");
expect(!css.includes("@keyframes scan-drift"), "assets/styles.css should remove scanline animation");
expect(css.includes("@keyframes pulse-ring"), "assets/styles.css should define photo ring animation");
expect(css.includes("@keyframes rise-in"), "assets/styles.css should define entrance animation");
expect(css.includes("@media (prefers-reduced-motion: no-preference)"), "assets/styles.css should gate motion preferences");
expect(css.includes("@media (prefers-reduced-motion: reduce)"), "assets/styles.css should respect reduced motion");
expect(css.includes(".top-dock::after"), "assets/styles.css should add dock shine polish");
expect(css.includes(".hero-photo-shell::before"), "assets/styles.css should add an animated profile ring");
expect(css.includes(".background-label::before"), "assets/styles.css should add label indicator polish");
expect(css.includes(".tech-card::before"), "assets/styles.css should add tech card scan polish");
expect(css.includes(".hero-card:hover"), "assets/styles.css should add hero hover polish");
expect(css.includes(".background-row:hover"), "assets/styles.css should add row hover polish");
expect(css.includes(".tech-card:hover"), "assets/styles.css should add tech card hover polish");
expect(css.includes(".tech-chip:hover"), "assets/styles.css should add chip hover polish");
expect(css.includes(".background-label"), "assets/styles.css should style background section labels");
expect(css.includes(".background-row"), "assets/styles.css should style reference-style rows");
expect(css.includes(".org-mark"), "assets/styles.css should style circular organization marks");
expect(css.includes(".org-logo"), "assets/styles.css should style organization logo images");
expect(css.includes(".name-link-arrow"), "assets/styles.css should style hidden homepage arrows");
expect(css.includes(".background-row:hover .name-link-arrow"), "assets/styles.css should show name arrows on row hover");
expect(css.includes(".detail-toggle"), "assets/styles.css should style expandable detail arrow buttons");
expect(css.includes(".row-detail"), "assets/styles.css should style expandable work detail area");
expect(css.includes(".terminal-detail"), "assets/styles.css should style work details with a terminal panel feel");
expect(css.includes(".terminal-line"), "assets/styles.css should style terminal detail rows");
expect(!css.includes("filter: grayscale"), "assets/styles.css should preserve the provided logo colors");
expect(css.includes(".tech-grid"), "assets/styles.css should style the technology grid");
expect(css.includes(".tech-card"), "assets/styles.css should style technology cards");
expect(css.includes(".tech-chip"), "assets/styles.css should style technology chips");
expect(css.includes(".tech-chip::before"), "assets/styles.css should render icons on technology chips");
expect(css.includes("content: attr(data-icon);"), "assets/styles.css should render each technology chip icon from data-icon");
expect(css.includes(".tech-chip::after"), "assets/styles.css should reveal skill context on hover");
expect(css.includes("content: attr(data-skill);"), "assets/styles.css should render skill context from data-skill");
expect(css.includes(".tech-chip:hover::after"), "assets/styles.css should show skill context when hovering technology chips");
expect(css.includes("border-radius: 999px"), "assets/styles.css should use pill-style labels and rows");
expect(css.includes('[data-theme="dark"]'), "assets/styles.css should include dark mode styles");
expect(css.includes(".controls"), "assets/styles.css should style language and theme controls");
expect(!css.includes("--teal"), "assets/styles.css should not use colored accent variables");
expect(!css.includes("--amber"), "assets/styles.css should not use colored accent variables");
expect(!css.includes("--coral"), "assets/styles.css should not use colored accent variables");
expect(!html.includes("「") && !html.includes("」"), "index.html should not include Chinese book-title brackets");
expect(!js.includes("「") && !js.includes("」"), "assets/site.js should not include Chinese book-title brackets");

function isNeutralHex(value) {
  const hex = value.slice(1);
  if (hex.length === 3) return hex[0] === hex[1] && hex[1] === hex[2];
  if (hex.length === 6) {
    return hex.slice(0, 2) === hex.slice(2, 4) && hex.slice(2, 4) === hex.slice(4, 6);
  }
  return true;
}

const colorSources = `${html}\n${css}\n${favicon}`;
for (const color of colorSources.match(/#[0-9a-fA-F]{3,6}\b/g) || []) {
  expect(isNeutralHex(color), `${color} should be black, white, or neutral gray`);
}

for (const declaration of css.match(/font-size:[^;]+;/g) || []) {
  for (const rem of declaration.matchAll(/([0-9.]+)rem/g)) {
    expect(Number(rem[1]) <= 3.6, `${declaration} should keep rem font size concise`);
  }
  for (const vw of declaration.matchAll(/([0-9.]+)vw/g)) {
    expect(Number(vw[1]) === 0, `${declaration} should not scale font size with viewport width`);
  }
}

expect(existsSync(resumePath), "assets/resume.pdf should exist");
if (existsSync(resumePath)) {
  const resume = readFileSync(resumePath);
  expect(resume.subarray(0, 5).toString() === "%PDF-", "assets/resume.pdf should be a PDF placeholder");
  expect(statSync(resumePath).size > 100, "assets/resume.pdf should not be empty");
}

expect(bytedanceLogo.includes("<svg"), "assets/logo-bytedance.svg should be the provided SVG logo");
expect(existsSync(profilePath), "assets/profile.png should exist");
if (existsSync(profilePath)) {
  const profile = readFileSync(profilePath);
  expect(profile.subarray(0, 8).toString("hex") === "89504e470d0a1a0a", "assets/profile.png should be a PNG file");
  expect(statSync(profilePath).size > 1000, "assets/profile.png should not be empty");
}
for (const [path, label] of [
  [buptLogoPath, "BUPT"],
  [njuptLogoPath, "NJUPT"],
]) {
  expect(existsSync(path), `assets/${label} logo PNG should exist`);
  if (existsSync(path)) {
    const logo = readFileSync(path);
    expect(logo.subarray(0, 8).toString("hex") === "89504e470d0a1a0a", `assets/${label} logo should be a PNG file`);
    expect(statSync(path).size > 1000, `assets/${label} logo should not be empty`);
  }
}

for (const word of ["Nginx", "server", "HTTPS", "DNS", "assets/resume.pdf"]) {
  expect(readme.includes(word), `README.md should document ${word}`);
}

expect(extname(resumePath) === ".pdf", "resume asset should keep a .pdf extension");

if (failures.length) {
  console.error(`Site check failed with ${failures.length} issue(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Site check passed.");
