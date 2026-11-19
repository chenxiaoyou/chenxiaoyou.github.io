# 辰小右个人主页

基于 Next.js（App Router + 静态导出）构建的静态单页个人主页（onepage），面向测试开发、泛自动化与稳定性方向的个人展示。正式站点由 GitHub Pages 托管，地址为 [https://chenxiaoyou.github.io](https://chenxiaoyou.github.io)。

## 页面结构

单页从上到下分为六个区块，组件位于 `components/`：

| 区块 | 组件 | 说明 |
| --- | --- | --- |
| 导航 | `SiteNav.tsx` | 固定顶栏：品牌、章节锚点（scrollspy 高亮）、简历下载、主题/语言切换 |
| 首屏 | `Hero.tsx` | 姓名、方向、终端风格点缀、CTA、头像 |
| 关于 | `About.tsx` | 个人介绍与三个要点卡片 |
| 经历 | `Experience.tsx` | 工作+教育时间线、可展开的工作详情、技术栈 |
| 项目 | `Projects.tsx` | 作品项目卡片网格 |
| 联系 | `SiteFooter.tsx` | 联系 CTA、社交链接、版权 |

- `lib/i18n.tsx`：中英双语词典 + `SiteProvider`（语言/主题全局状态，`useSite()` 提供 `t()`）
- `components/Reveal.tsx`：滚动进入动画管理（IntersectionObserver，尊重系统减少动态设置）
- `app/layout.tsx`：SEO metadata（canonical/OpenGraph）+ 偏好恢复脚本 + 全局 Provider

## 本地开发

```bash
npm install
npm run dev
```

浏览器打开终端提示的本地地址查看页面。构建与校验命令：

```bash
npm run check
npm run build
npm test
```

`npm test` 会先静态导出到 `out/`（`output: "export"`），再运行 `tests/site-check.mjs` 静态校验。

## 修改内容

- **文案与双语**：中英对照表在 `lib/i18n.tsx` 的 `translations` 对象里（`zh` / `en` 各一份），组件通过 `t("key")` 取值。改中文文案时同步改英文。
- **项目卡片**：在 `components/Projects.tsx` 的 `PROJECTS` 数组中增删；`href` 指向真实仓库，没有链接就传 `null`。
- **经历时间线**：在 `components/Experience.tsx` 的 `.timeline` 中增删条目，用 `badge-work` / `badge-edu` 徽标区分类型。
- **头像与简历**：替换 `public/assets/profile.png` 与 `public/assets/resume.pdf` 即可。
- **主题与动效**：设计令牌集中在 `app/globals.css` 顶部的 `:root`（暗色默认）与 `[data-theme="light"]`（亮色）两个块。

## GitHub Pages 发布

推送 `main` 分支后，`.github/workflows/deploy.yml` 自动静态导出并发布到 GitHub Pages（`setup-node@v4` 锁定 Node 22，构建产物 `out/` 经 `actions/deploy-pages` 发布）。

部署完成后验证：

```bash
curl -I https://chenxiaoyou.github.io/
curl -I https://chenxiaoyou.github.io/assets/resume.pdf
```

## 静态资源

- 简历下载文件：`public/assets/resume.pdf`
- 头像与组织 Logo：`public/assets/`
- 全局样式：`app/globals.css`
