# 辰小右个人主页

基于 Next.js（App Router + 静态导出）构建、经 hallmark 技能治理的静态单页个人主页，面向测试开发、泛自动化与稳定性方向的个人展示。视觉走素雅简历风（验收报告体）：浅色纸面、衬线姓名、等宽数据、台账式排版。正式站点由 GitHub Pages 托管：[https://chenxiaoyou.github.io](https://chenxiaoyou.github.io)。

## 设计体系

hallmark 全权定制路线（`redesign: restyle`，stamp 见 `public/tokens.css` 首行）：

- **令牌**：OKLCH（浅色纸面 `oklch(97.5% 0.004 250)` + 钢青强调 `oklch(42% 0.12 255)`），在 `public/tokens.css`
- **字型**：Piazzolla（衬线 display）+ Onest（正文）+ IBM Plex Mono（数据/标签），Google css2 引入
- **底座**：`public/base.css`（Floor 规则：focus-visible、selection、reduced-motion、container）
- **页面 CSS**：`app/globals.css`；构建时 tokens/base/globals 三个文件内联进 `<head>`（避免异步 @import 弹跳）
- **门禁**：hallmark sloplint（0 FAIL）、copy-lint、perf（CLS 0.000）、`npm test`

## 页面结构（两屏）

`app/page.tsx` 组合三个组件（在 `components/`）：

| 区块 | 组件 | 说明 |
| --- | --- | --- |
| 报告头（首屏） | `Hero.tsx` | 受测对象元信息行 + 姓名 h1 + 一句话简介 + 邮件/简历按钮 + 四道工序状态栏 |
| 作品与经历（次屏） | `Work.tsx` | 四项作品台账（状态 + 链接 + 技术标签）+ 三段经历 rows + 简历补充行 |
| 联系（页脚） | `SiteFooter.tsx` | 短 close 语 + 邮箱直链 + GitHub/简历/回顶部 + 法务行 |

导航 `SiteNav.tsx`：固定栏 + 移动端 sheet + 中英切换。双语词典与语言状态在 `lib/i18n.tsx`（`useSite().t()`）。

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
- **作品/经历**：`components/Work.tsx` 的 `PROJECTS` 数组与经历 rows；链接指向真实仓库
- **工序状态**：`components/Hero.tsx` 的 `criteria` 数组（在岗/规划中）
- **令牌/排版**：`public/tokens.css`（颜色、字体）；页面布局在 `app/globals.css`
- **头像/简历**：替换 `public/assets/profile.png` 与 `public/assets/resume.pdf`

## GitHub Pages 发布

推送 `main` 后 `.github/workflows/deploy.yml` 自动静态导出（`out/`）并经 `actions/deploy-pages` 发布。验证：

```bash
curl -I https://chenxiaoyou.github.io/
curl -I https://chenxiaoyou.github.io/assets/resume.pdf
```
