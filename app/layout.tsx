import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { SiteProvider } from "@/lib/i18n";
import SiteNav from "@/components/SiteNav";

const siteDescription =
  "辰小右的个人主页：五年多互联网测试开发经验，做自动化回归、CI 质量门禁与稳定性巡检，现居北京。";

export const metadata: Metadata = {
  title: "辰小右：测试开发工程师的个人主页",
  description: siteDescription,
  metadataBase: new URL("https://chenxiaoyou.github.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "辰小右：测试开发工程师的个人主页",
    description: siteDescription,
    type: "website",
    url: "/",
    images: ["/share.jpg"],
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/assets/profile.png",
  },
  other: {
    "site-kind": "other",
    "page-type": "service",
  },
};

export const viewport: Viewport = {
  themeColor: "#e6dbc7",
};

// start.mjs 派发的调色板与字型（保持原样，放在套件样式链接之后）
const designTokens = `
:root {
  --p-panel-lit: radial-gradient(120% 100% at 28% 18%, #f2e9d6 0%, #e6dbc7 48%, #d5c6a8 100%);
  --p-bg: #e6dbc7; --p-surface: #ddd0b9; --p-ink: #062b8a; --p-muted: #3253a4;
  --p-accent: #062b8a; --p-accent-ink: #e6dbc7; --p-action: #062b8a; --p-action-ink: #e6dbc7;
  --p-inv-bg: #062b8a; --p-inv-surface: #153a90; --p-inv-ink: #e6dbc7; --p-inv-muted: #aab0bc;
  --p-inv-accent: #e6dbc7; --p-inv-accent-ink: #062b8a; --p-inv-action: #e6dbc7; --p-inv-action-ink: #062b8a;
  --font-display: "Schibsted Grotesk", system-ui, sans-serif;
  --font-text: "Schibsted Grotesk", system-ui, sans-serif;
  --display-weight: 400;
  --display-tracking: -0.035em;
  --display-tracking-xl: -0.042em;
  --ly-scale: 0.98;
}
`;

// hero 进入动画与时刻的守卫，首帧前设置（starter.html 的两行）
const motionGuards = `document.documentElement.classList.add('m-enter');setTimeout(()=>document.documentElement.classList.add('m-enter-done'),700)`;
const momentsGuard = `window.__momentsManual = true;document.documentElement.classList.add('mo-js');setTimeout(()=>document.documentElement.classList.add('mo-safe'),2500)`;

// 页面 CSS 以内联方式进 HTML（构建时读取，注释原样保留）——审计与首帧都可见
const pageCss = readFileSync(join(process.cwd(), "app", "globals.css"), "utf8");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="zh-CN"
      data-type="service"
      data-radius="soft"
      data-buttons="tonal"
      data-motion
      suppressHydrationWarning
    >
      <body>
        {/* 页面 CSS（含 Hallmark stamp 第一行） */}
        <style dangerouslySetInnerHTML={{ __html: pageCss }} />
        {/* 套件样式（原样加载，顺序即 starter.html 的顺序）与派发 tokens */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400..700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/assets/system.css" />
        <link rel="stylesheet" href="/assets/ui/cards.css" />
        <link rel="stylesheet" href="/assets/motion/motion.css" />
        <link rel="stylesheet" href="/assets/layout/layout.css" />
        <link rel="stylesheet" href="/assets/icons/icon.css" />
        <link rel="stylesheet" href="/assets/diagrams/diagram.css" />
        <style dangerouslySetInnerHTML={{ __html: designTokens }} />
        {/* 进入动画与时刻的守卫：进 head，首帧前设置（starter.html 的两行） */}
        <Script id="m-enter-guard" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: motionGuards }} />
        <Script id="moments-guard" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: momentsGuard }} />
        <link rel="modulepreload" href="/assets/moments/moments.js" />
        <link rel="modulepreload" href="/assets/moments/lib.js" />
        <link rel="modulepreload" href="/assets/moments/word-highlight/moment.js" />
        <SiteProvider>
          <SiteNav />
          {children}
        </SiteProvider>
        {/* 套件脚本：水合完成后再注入（afterInteractive），避免提前改 DOM 触发水合错误 */}
        <Script src="/assets/system.js" type="module" strategy="afterInteractive" />
        <Script src="/assets/motion/motion.js" type="module" strategy="afterInteractive" />
        <Script src="/assets/layout/layout.js" type="module" strategy="afterInteractive" />
        <Script src="/assets/diagrams/mount.js" type="module" strategy="afterInteractive" />
        <Script src="/assets/moments/moments.js" type="module" strategy="afterInteractive" />
      </body>
    </html>
  );
}
