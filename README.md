# 辰小右个人主页

基于 Next.js（App Router + 静态导出）与 [design-taste-frontend](https://github.com/) 设计套件构建的静态单页个人主页，面向测试开发、泛自动化与稳定性方向的个人展示。正式站点由 GitHub Pages 托管：[https://chenxiaoyou.github.io](https://chenxiaoyou.github.io)。

## 设计体系

页面由 design-taste-frontend 技能派发（deal，非手选）：

- **类型**：service（site-kind other）——照片/字体/平色主导，无特效、无暗色页
- **调色板**：`cobalt-on-sand`（温石地面 `#e6dbc7` + 工程蓝 `#062b8a`）
- **字型**：Schibsted Grotesk（display 400，tracking -3.5%）
- **hero**：split（左文右图 + 事实浮卡），进入动画一次
- **按钮** tonal · **圆角** soft · **导航** nav-centre · **页脚** footer-columns · **节奏** dark-band（链路图反色带）
- **时刻**：`word-highlight`（statement 逐词点亮，滚动驱动）

套件文件在 `public/assets/`（system/layout/motion/ui/icons/diagrams/moments），原样加载、不得修改。

## 页面结构

`app/page.tsx` 组合六个区块（组件在 `components/`）：

| 区块 | 组件 | 说明 |
| --- | --- | --- |
| 导航 | `SiteNav.tsx` | nav-centre 固定栏 + 手机抽屉 + 语言切换 |
| 首屏 | `Hero.tsx` | 姓名/方向 + 头像 + 事实浮卡 |
| 作品 | `Work.tsx` | 四个项目卡（真彩工具图标 + 真链接） |
| 工具 | `Stack.tsx` | 16 格工具墙（13 真彩图标 + 3 文字块） |
| 关于 | `About.tsx` | word-highlight 语句 + 经历 rows |
| 链路 | `Pipeline.tsx` | 反色带上的质量链路示意图（静态） |
| 联系 | `SiteFooter.tsx` + `ActionBar.tsx` | close 头行 + 页脚列 + 手机动作条 |

双语词典与全局语言状态在 `lib/i18n.tsx`（`useSite().t()`）。

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

设计检查（改版后重跑）：

```bash
node <skill>/scripts/copy-lint.mjs out/index.html --kind service
node <skill>/scripts/consistency.mjs out/index.html --root out --widths 1440,1024,820,768,390 --profile .taste-skill/chrome-check --page service --category "测试开发工程师的个人主页" --primary "发邮件给我"
node <skill>/scripts/gate.mjs out/index.html
```

## 修改内容

- **文案**：`lib/i18n.tsx` 的 `translations`（zh/en 各一份），遵守 copy 规则（h1 命名类别、标题带名词、按钮动词+宾语、不造事实）
- **项目卡**：`components/Work.tsx` 的卡片数组；链接指向真实仓库
- **工具墙**：`components/Stack.tsx` 的 `TILES`；新增图标先 `icons.mjs fetch <id> --out public/assets/icons`
- **链路图**：`components/Pipeline.tsx` 内联 JSON spec（service 页静态、无脉冲）
- **头像/简历**：替换 `public/assets/profile.png` 与 `public/assets/resume.pdf`

## GitHub Pages 发布

推送 `main` 后 `.github/workflows/deploy.yml` 自动静态导出（`out/`）并经 `actions/deploy-pages` 发布。验证：

```bash
curl -I https://chenxiaoyou.github.io/
curl -I https://chenxiaoyou.github.io/assets/resume.pdf
```
