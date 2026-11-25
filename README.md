# 辰小右个人主页

基于 Next.js（App Router + 静态导出）构建、经 design-taste-frontend 与 hallmark 两套设计技能先后打磨的静态单页个人主页，面向测试开发、泛自动化与稳定性方向的个人展示。当前视觉走 **路线 A：真·一页简历**（v2.2.0）：浅色纸面、首屏定位 + 标签 + CTA，正文仅「背景」与「代表作」卡片。正式站点由 GitHub Pages 托管：[https://chenxiaoyou.github.io](https://chenxiaoyou.github.io)。

## 设计体系

hallmark 全权定制路线（`redesign: restyle`，stamp 见 `public/tokens.css` 首行）：

- **令牌**：OKLCH（浅色纸面 `oklch(97.5% 0.004 250)` + 钢青强调 `oklch(42% 0.12 255)`），在 `public/tokens.css`；暗黑主题为同族冷纸反相（`[data-theme="dark"]`），导航可切换、存档于 `site-theme`，首帧前有防闪色引导脚本，头像永远保持彩色
- **字型**：Piazzolla（衬线 display）+ Onest（正文）+ IBM Plex Mono（数据/标签），Google css2 引入
- **底座**：`public/base.css`（Floor 规则：focus-visible、selection、reduced-motion、container）
- **页面 CSS**：`app/globals.css`；构建时 tokens/base/globals 三个文件内联进 `<head>`（避免异步 @import 弹跳）
- **门禁**：hallmark sloplint（0 FAIL）、copy-lint、perf（CLS 0.000）、`npm test`

## 页面结构（路线 A）

`app/page.tsx` 组合三个组件（在 `components/`）：

| 区块 | 组件 | 说明 |
| --- | --- | --- |
| 首屏 | `Hero.tsx` | 头像 + 定位句 + 简介 + 三个方向标签 + 签名 + 邮件/简历/GitHub |
| 正文 | `Resume.tsx` | **背景**（经历 + 学历 `rows`）+ **做过什么**（`work-cards` 卡片） |
| 联系 | `SiteFooter.tsx` | 短 close 语 + 邮箱直链 + GitHub/回顶部 + 法务行 |

代表作与文案在 `lib/i18n.tsx`；卡片数据在 `Resume.tsx` 的 `CARDS` / `BACKGROUND_ROWS`。

导航 `SiteNav.tsx`：固定栏 + 右上角纯图标控件（下载简历/发邮件/深浅/语言）+ 移动端 sheet。双语词典与语言状态在 `lib/i18n.tsx`（`useSite().t()`）。

## 本地开发

```bash
npm install
npm run dev
```

构建与校验：

```bash
npm run check
npm run build
npm test
```

## 修改内容

- **文案**：`lib/i18n.tsx` 的 `translations`（zh/en 各一份），不造事实
- **作品/背景**：`components/Resume.tsx` 的 `CARDS` / `BACKGROUND_ROWS`；链接指向真实仓库
- **首屏标签**：`components/Hero.tsx` 的 `TAG_KEYS` + `lib/i18n.tsx` 的 `tag*`
- **令牌/排版**：`public/tokens.css`（颜色、字体）；页面布局在 `app/globals.css`
- **头像/简历**：替换 `public/assets/profile.png` 与 `public/assets/resume.pdf`

## GitHub Pages 发布

推送 `main` 后 `.github/workflows/deploy.yml` 自动静态导出（`out/`）并发布到 `gh-pages` 分支。验证：

```bash
curl -I https://chenxiaoyou.github.io/
curl -I https://chenxiaoyou.github.io/assets/resume.pdf
```
