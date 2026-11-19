# 辰小右个人主页

基于 Astro 构建的静态单页个人主页（onepage），面向测试开发、泛自动化与稳定性方向的个人展示。正式站点由 GitHub Pages 托管，地址为 [https://chenxiaoyou.github.io](https://chenxiaoyou.github.io)。

## 页面结构

单页从上到下分为五个区块，组件位于 `src/components/`：

| 区块 | 组件 | 说明 |
| --- | --- | --- |
| 导航 | `UtilityDock.astro` | 固定顶栏：品牌、章节锚点、简历下载、主题/语言切换 |
| 首屏 | `Hero.astro` | 姓名、方向、终端风格点缀、CTA、头像 |
| 关于 | `About.astro` | 个人介绍与三个要点卡片 |
| 经历 | `Background.astro` | 工作+教育时间线、技术栈 |
| 项目 | `Projects.astro` | 作品项目卡片网格 |
| 联系 | `SiteFooter.astro` | 联系 CTA、社交链接、版权 |

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

`npm test` 会先构建再运行 `tests/site-check.mjs` 静态校验。`npm run build` 生成可直接托管的 `dist/` 静态产物。

## 修改内容

- **文案与双语**：页面默认文案写在各组件中，中英对照表在 `public/assets/site.js` 的 `translations` 对象里（`zh` / `en` 各一份）。改中文文案时同步改英文。
- **项目卡片**：在 `src/components/Projects.astro` 中增删 `<article class="project-card">`；链接指向真实仓库时加 `<a class="project-link">`，无链接则省略。
- **经历时间线**：在 `src/components/Background.astro` 的 `.timeline` 中增删条目，用 `badge-work` / `badge-edu` 徽标区分类型。
- **头像与简历**：替换 `public/assets/profile.png` 与 `public/assets/resume.pdf` 即可。
- **主题与动效**：设计令牌集中在 `public/assets/styles.css` 顶部的 `:root`（暗色默认）与 `[data-theme="light"]`（亮色）两个块；滚动动效尊重系统「减少动态」设置。

## GitHub Pages 发布

推送 `main` 分支后，`.github/workflows/deploy.yml` 自动构建并发布到 GitHub Pages（构建用官方 `withastro/action`，发布用 `actions/deploy-pages`）。

首次启用需要在仓库 **Settings → Pages → Source** 选择 **GitHub Actions**。部署完成后验证：

```bash
curl -I https://chenxiaoyou.github.io/
curl -I https://chenxiaoyou.github.io/assets/resume.pdf
```

## 静态资源

- 简历下载文件：`public/assets/resume.pdf`
- 头像与组织 Logo：`public/assets/`
- 全局交互与主题样式：`public/assets/site.js`、`public/assets/styles.css`
