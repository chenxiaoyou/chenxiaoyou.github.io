import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { SiteProvider } from "@/lib/i18n";
import SiteNav from "@/components/SiteNav";

const siteDescription =
  "辰小右的个人主页：五年多互联网测试开发经验，做自动化回归、CI 质量门禁与稳定性巡检，现居北京。";

export const metadata: Metadata = {
  title: "辰小右：测试开发工程师，把质量风险拦在发布之前",
  description: siteDescription,
  metadataBase: new URL("https://chenxiaoyou.github.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "辰小右：测试开发工程师",
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
  themeColor: "#f7f8fa",
};

// 时刻守卫：word-highlight 由 About 组件手动挂载（__momentsManual）
const momentsGuard = `window.__momentsManual = true;document.documentElement.classList.add('mo-js');document.documentElement.classList.add('js');setTimeout(()=>document.documentElement.classList.add('mo-safe'),2500)`;

// 页面 CSS 以内联方式进 HTML：tokens/base 先内联（异步 @import 会造成整页弹跳），stamp 原样保留
const tokensCss = readFileSync(join(process.cwd(), "public", "tokens.css"), "utf8");
const baseCss = readFileSync(join(process.cwd(), "public", "base.css"), "utf8");
const pageCss = readFileSync(join(process.cwd(), "app", "globals.css"), "utf8")
  .replace('@import url("tokens.css");', tokensCss)
  .replace('@import url("base.css");', baseCss);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Piazzolla:wght@400;500;600&family=Onest:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <style dangerouslySetInnerHTML={{ __html: pageCss }} />
        <Script id="moments-guard" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: momentsGuard }} />
        <link rel="modulepreload" href="/assets/moments/moments.js" />
        <link rel="modulepreload" href="/assets/moments/lib.js" />
        <link rel="modulepreload" href="/assets/moments/word-highlight/moment.js" />
      </head>
      <body>
        <SiteProvider>
          <SiteNav />
          {children}
        </SiteProvider>
        <Script src="/assets/moments/moments.js" type="module" strategy="afterInteractive" />
      </body>
    </html>
  );
}
