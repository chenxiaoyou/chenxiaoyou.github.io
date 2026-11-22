# 辰小右个人主页

基于 Next.js（App Router + 静态导出）构建、经 design-taste-frontend 与 hallmark 两套设计技能先后打磨的静态单页个人主页，面向测试开发、泛自动化与稳定性方向的个人展示。当前视觉走素雅简历风（验收报告体）：浅色纸面、衬线姓名、等宽数据、台账式排版。正式站点由 GitHub Pages 托管：[https://chenxiaoyou.github.io](https://chenxiaoyou.github.io)。

## 设计体系

hallmark 全权定制路线（`redesign: restyle`，stamp 见 `public/tokens.css` 首行）：

- **令牌**：OKLCH（浅色纸面 `oklch(97.5% 0.004 250)` + 钢青强调 `oklch(42% 0.12 255)`），在 `public/tokens.css`；暗黑主题为同族冷纸反相（`[data-theme="dark"]`），导航可切换、存档于 `site-theme`，首帧前有防闪色引导脚本，头像永远保持彩色
- **字型**：Piazzolla（衬线 display）+ Onest（正文）+ IBM Plex Mono（数据/标签），Google css2 引入
- **底座**：`public/base.css`（Floor 规则：focus-visible、selection、reduced-motion、container）
- **页面 CSS**：`app/globals.css`；构建时 tokens/base/globals 三个文件内联进 `<head>`（避免异步 @import 弹跳）
- **门禁**：hallmark sloplint（0 FAIL）、copy-lint、perf（CLS 0.000）、`npm test`

## 页面结构（六段式简历）

`app/page.tsx` 组合三个组件（在 `components/`）：

| 区块 | 组件 | 说明 |
| --- | --- | --- |
| 报告头 | `Hero.tsx` | 受测对象元信息行 + 姓名 h1 + 一句话简介 + 四道工序状态栏 |
| 六段正文 | `Resume.tsx` | 教育背景 / 专业技能 / 工作经历 / 项目经历 / 我的作品 / 自我评价（缺失内容以（占位）标注） |
| 联系 | `SiteFooter.tsx` | 短 close 语 + 邮箱直链 + GitHub/回顶部 + 法务行 |

`Resume.tsx` 六段均为台账式：教育/技能/经历用 `rows` 行，项目/作品用 `work-index` 条目（状态 + 标签 + 链接）。技能与自我评价暂为占位，补内容时改 `lib/i18n.tsx` 的 `skill*`/`evalBody` 键。

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
- **作品/经历**：`components/Resume.tsx` 的 `PROJECTS`/`WORKS`/`EDU_ROWS`/`SKILL_ROWS`/`EXP_ROWS`；链接指向真实仓库
- **工序状态**：`components/Hero.tsx` 的 `criteria` 数组（在岗/规划中）
- **令牌/排版**：`public/tokens.css`（颜色、字体）；页面布局在 `app/globals.css`
- **头像/简历**：替换 `public/assets/profile.png` 与 `public/assets/resume.pdf`

## GitHub Pages 发布

推送 `main` 后 `.github/workflows/deploy.yml` 自动静态导出（`out/`）并经 `actions/deploy-pages` 发布。验证：

```bash
curl -I https://chenxiaoyou.github.io/
curl -I https://chenxiaoyou.github.io/assets/resume.pdf
```
