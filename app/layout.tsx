import type { Metadata, Viewport } from "next";
import { SiteProvider } from "@/lib/i18n";
import Reveal from "@/components/Reveal";
import SkipLink from "@/components/SkipLink";
import SiteNav from "@/components/SiteNav";
import "./globals.css";

const siteDescription =
  "辰小右的个人主页：测试开发、泛自动化、稳定性方向的个人介绍、教育背景、工作经历、技术栈与作品项目。";

export const metadata: Metadata = {
  title: "辰小右 · 个人主页",
  description: siteDescription,
  metadataBase: new URL("https://chenxiaoyou.github.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "辰小右 · 个人主页",
    description: siteDescription,
    type: "website",
    url: "/",
    images: ["/assets/profile.png"],
  },
  icons: {
    icon: "/assets/profile.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#070b12",
};

// 在首帧渲染前恢复用户偏好（主题/语言），避免闪烁
const bootstrapScript = `(() => {
  const root = document.documentElement;
  root.classList.add("js");
  try {
    const theme = localStorage.getItem("site-theme");
    if (theme === "light" || theme === "dark") root.dataset.theme = theme;
    const lang = localStorage.getItem("site-language");
    if (lang === "zh" || lang === "en") root.dataset.lang = lang;
  } catch {}
})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" data-theme="dark" data-lang="zh" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: bootstrapScript }} />
        <SiteProvider>
          <SkipLink />
          <SiteNav />
          {children}
        </SiteProvider>
        <Reveal />
      </body>
    </html>
  );
}
