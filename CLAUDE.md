# Portfolio Site — Dario Zhang

## 项目说明
个人作品集网站。设计文档在 DESIGN.md，严格按照里面的规格实现。

## 技术栈
- Next.js 15 (App Router, TypeScript)
- Tailwind CSS v4 + shadcn/ui
- Framer Motion (轻度动效)
- Recharts (雷达图)
- 部署目标: Vercel

## 实现要求

### 必须做到
1. 单页 SPA + 锚点导航，固定顶部毛玻璃导航栏
2. 暗色主题为默认，配色严格按 DESIGN.md 第六节
3. 字体: Inter/Geist Sans + JetBrains Mono
4. 最大宽度 1200px 居中
5. 响应式：移动端单列，桌面端双列/三列

### Hero Section
- 标题: "From Reasoning to Shipping"
- 副标题: "I build AI that works in production — not demos."
- 关键标签: AI-native / Product × Engineering / Computational Reasoning
- 下方放 Impact Numbers 卡片行：1600+ Users / 2000+ Agents / 4000+ Daily Calls / 30d→6h

### About Section
- 用 DESIGN.md 第四节的中文简介文案
- 计算推理主线可视化（三段：符号推理→因果推理→链式推理）

### Skill Assessment Section
- 默认显示：总结段落 + 雷达图（8维）
- 雷达图数据：AI工具驾驭 90, 产品思维 85, 独立交付 85, 架构设计 80, 数据分析 80, 代码质量 65, 工程规范 55, 深度技术 50
- 折叠面板展开完整评估（代码质量、工程能力、AI工具、产品思维、架构设计、独立交付、短板）
- 标注 "Assessed by Claude — based on real codebase analysis"

### Projects Section
- 卡片网格（桌面3列，平板2列，手机1列）
- 6个项目按 DESIGN.md 第三节
- 卡片: 标题 + 一句话 + 技术栈标签 + "View Details →"
- 点击展开详情（用 Dialog 或 Drawer）

### Contact Section
- 极简: Email + GitHub + LinkedIn 图标链接
- 可选: 简历下载按钮

### Footer
- "© 2026 Dario Zhang · Built with Next.js · Assessed by Claude"

### 组件风格
- 卡片: 圆角12px, 1px solid #262626 边框, hover 边框变 #3B82F6
- 按钮: Ghost 风格为主
- Section 间距 120-160px
- 卡片间距 24-32px

## 不要做
- 不要亮色主题切换（暂时不需要）
- 不要 CMS
- 不要过度动效
- 不要放头像

## 完成后
运行 `npm run build` 确保构建通过，然后 `openclaw gateway wake --text "Done: Portfolio site MVP built" --mode now`
