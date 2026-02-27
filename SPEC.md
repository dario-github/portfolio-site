# Portfolio Site — Iteration Spec

> 生成日期: 2026-02-28 | 基线: V7 Phase C (commit b512c93)
> 技术栈: Next.js 16 + React 19 + Tailwind v4 + Framer Motion + shadcn/ui
> 部署: Vercel | 域名: dariolink.com

---

## 概述

Portfolio V7 已上线但内容陈旧、功能缺失。本 Spec 定义从"能看"到"好用"的完整迭代，分 4 个 Phase 按依赖关系串行推进。

## 现状审计

| 维度 | 状态 | 问题 |
|------|------|------|
| 页面结构 | ✅ 7 路由 + 28 田野笔记 | page.tsx 453 行，已从 722 优化 |
| 数据层 | ✅ 抽离到 src/data/ | fieldnotes 无 body 正文，只有 tldr |
| 内容时效 | ⚠️ 最新 update 2/21 | 一周未更新，"最新动态"不新 |
| SEO | ⚠️ 有 sitemap.ts | 缺 OG image、结构化数据、robots.txt |
| 国际化 | ❌ 纯中文 | HR 场景需英文版 |
| 后端 | ❌ 纯静态 | 无埋点、无访客分析 |
| 交互 | ❌ 只读 | 无 reaction/留言/订阅确认 |
| Agent 接口 | ⚠️ /agent 页面存在 | 缺 llms.txt / MCP endpoint |

---

## Phase 1: 内容刷新 + SEO（立即执行）

> 目标: 让网站"活着"——内容新鲜、搜索可见

### 1.1 更新动态数据 (src/data/updates.ts)

**AC**: WHEN 访客打开主页 THEN 最新动态第一条日期 ≤ 3 天内

新增条目（基于 MEMORY.md 本周事件）:
```
- 2026-02-27: Slack→Discord 全面迁移 — 26 个自动化任务重新编排
- 2026-02-26: 1Password 服务账户集成 — Agent 凭据管理从明文到零知识
- 2026-02-26: Karpathy "过去两个月编程根本性变化" — gradient descent 本身是 programmer
- 2026-02-25: 投资系统规则引擎 v2 上线 — 16 条交易规则 + 实盘验证
```

### 1.2 扩充薄弱田野笔记正文（13 篇 3 段→5 段）

**现状**: 27 篇全有正文，但 13 篇只有 3 段（偏薄），其余 14 篇有 5+ 段。
**AC**: WHEN 访客阅读任一田野笔记 THEN 至少看到 5 段有深度的正文

需扩充的 13 篇（当前仅 3 段）:
proactive-agent-systems, context-isolation-design, memory-system-evolution,
kox-agent-engineering-lessons, parfit-engineered-continuity, language-as-substrate,
memory-as-generation, autonomy-as-selfhood, prediction-verification-loop,
chengdu-xiandao-analysis, ecommerce-info-density, philosophy-web-synthesis

每篇扩到 5 段，结构: 问题 → 方法 → 发现 → 局限 → 展望

### 1.3 SEO 基础

**AC**: WHEN Google 爬虫访问 THEN 获取完整 meta + OG + 结构化数据

- [ ] 每个页面添加 `metadata` export（title, description, openGraph）
- [ ] 动态 OG image（`opengraph-image.tsx`，Next.js 内置 ImageResponse）
- [ ] `robots.ts` 导出
- [ ] JSON-LD 结构化数据（Person + WebSite + Article for fieldnotes）
- [ ] `<link rel="canonical">` 全部指向 dariolink.com

### 1.4 项目描述校准

**AC**: 5 个待确认项目标注 `[待东丞确认]`，不编造

- AIdience / 太平洋 / 爆款视频归因 / 飞鹤 / 雀巢 → 标注占位符，等东丞确认

---

## Phase 2: 英文版 (i18n)

> 目标: HR/猎头能读英文版

### 2.1 i18n 架构

**方案**: Next.js App Router `[locale]` 段 + 字典文件

```
src/
  app/
    [locale]/          ← 新增 locale 段
      page.tsx
      about/page.tsx
      ...
  i18n/
    zh.json            ← 中文字典
    en.json            ← 英文字典
  middleware.ts        ← Accept-Language 检测 + 默认 zh
```

**AC**: 
- WHEN 访客浏览器语言为 en THEN 自动跳转 /en/
- WHEN 点击语言切换 THEN 同页切到另一语言
- 路由: `/zh/about` `/en/about`，`/` 重定向到检测语言

### 2.2 翻译范围

| 页面 | 中文字数（估） | 翻译优先级 |
|------|-------------|-----------|
| /about | ~800 | P0 — HR 直接看 |
| / (主页) | ~600 | P0 |
| /experience | ~1200 | P0 |
| /projects | ~2000 | P1 |
| /agent | ~1500 | P2 |
| /fieldnotes/* | ~800×28 | P3 — 后期 |

P0 页面先做，其余渐进补充。

---

## Phase 3: 分析 + 后端

> 目标: 知道谁来了、看了什么

### 3.1 访客分析

**方案**: Vercel Analytics（零配置）+ Plausible（自部署，隐私友好）

- [ ] `@vercel/analytics` 安装 + `<Analytics />` 组件
- [ ] 自定义事件: 页面浏览、语言切换、订阅点击、项目卡片点击

**AC**: WHEN 有人访问 dariolink.com THEN Vercel dashboard 可见 PV/UV/来源

### 3.2 Railway 后端（可选，视需求）

目前纯静态已够用。后端仅在以下场景需要:
- 订阅确认邮件（Buttondown API 已直连，不需后端）
- 留言/reaction 持久化（可用 Vercel KV 替代独立后端）
- MCP endpoint（Phase 4）

**决策**: 暂缓 Railway，用 Vercel 生态解决。

---

## Phase 4: 交互 + Agent 接口

> 目标: 从"展示"到"对话"

### 4.1 Reaction 系统

- 每篇 fieldnote 底部加 emoji reaction（🔥 💡 🤔 ❤️）
- 存储: Vercel KV（简单 counter，无需登录）
- **AC**: WHEN 访客点 🔥 THEN 计数 +1，刷新后保持

### 4.2 llms.txt

```
/llms.txt              ← 纯文本，Agent 可读的站点摘要
/llms-full.txt         ← 完整版（含全部 fieldnote 摘要）
```

**AC**: WHEN AI Agent 请求 /llms.txt THEN 获得结构化的能力+项目+研究方向摘要

### 4.3 MCP Server（探索性）

- 暴露 fieldnotes 查询、项目搜索、技能列表 as MCP tools
- 依赖 Phase 3 后端或 Vercel Serverless

---

## 执行计划

| Phase | 预估工时 | 依赖 | 自动化方式 |
|-------|---------|------|-----------|
| **Phase 1** | 2-3h | 无 | Coding agent 直接执行 |
| **Phase 2** | 3-4h | Phase 1 | Coding agent + 翻译 |
| **Phase 3** | 1h | Phase 1 | 安装 + 配置 |
| **Phase 4** | 2-3h | Phase 1 | Coding agent |

**立即启动 Phase 1。** Phase 2-4 Phase 1 完成后串行推进。

---

## 验收标准（全局）

- [ ] `next build` 零 error
- [ ] Lighthouse Performance ≥ 90, SEO ≥ 95
- [ ] 所有链接可访问（无 404）
- [ ] 移动端可用（≥375px 宽度）
- [ ] Git commit 粒度合理（每个子任务一个 commit）
