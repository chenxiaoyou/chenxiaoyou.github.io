# 辰小右个人主页

基于 Astro 构建的静态个人主页，面向测试开发、自动化与稳定性方向的个人展示。正式站点由 Vercel 托管，域名为 [www.chenxiaoyou.com](https://www.chenxiaoyou.com)。

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

`npm run build` 会生成可直接托管的 `dist/` 静态产物。

## 编写 Markdown 博客

博客文章放在 `src/content/blogs/`，新增一个 `.md` 文件即可生成 `/blogs/<文件名>/` 页面。首页在技术栈后展示最近发布的 3 篇，全部文章可在 `/blogs/` 查看。

Frontmatter 示例：

```yaml
---
title: 如何设计可靠的自动化回归流程
description: 文章摘要
publishedAt: 2026-05-26
updatedAt: 2026-05-27 # 可选
tags:
  - 自动化测试
draft: false
lang: zh
---
```

- `draft: true` 的博客草稿不会生成公开页面，也不会出现在列表中。
- `lang` 只表示文章原文语言；页面工具栏可以中英切换，正文不会自动翻译。
- 博客图片放在 `public/assets/blogs/<article>/` 下，并通过 `/assets/blogs/<article>/<image>` 引用。
- Markdown 博客阅读页支持目录、表格、图片和代码高亮。

## 静态资源

- 简历下载文件：`public/assets/resume.pdf`
- 头像与组织 Logo：`public/assets/`
- 全局交互与主题样式：`public/assets/site.js`、`public/assets/styles.css`

## Vercel 发布

本项目仅维护 Vercel 正式发布链路，不再依赖 GitHub Pages 的 `CNAME` 文件或 Nginx 配置。

1. 在 Vercel 导入 GitHub 仓库。
2. Framework Preset 选择 Astro，构建命令使用 `npm run build`，输出目录为 `dist`。
3. 在 Vercel 中绑定 `www.chenxiaoyou.com`，并将 DNS 按 Vercel 提示指向其域名服务。
4. 推送到 GitHub 后，Vercel 自动构建并发布。

部署后验证：

```bash
curl -I https://www.chenxiaoyou.com/
curl -I https://www.chenxiaoyou.com/blogs/
```
