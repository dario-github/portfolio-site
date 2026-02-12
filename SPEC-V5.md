# Portfolio V5 — 设计规格

> 核心变化：首页从"简历式全展示"改为"内容驱动型主页"
> 日期：2026-02-13（v5.1 — 融合 RESEARCH-SYNC-PLAN）
> 状态：Active

---

## 设计理念

**首页是你的思想展厅，不是你的简历。**

面试官想了解你的经历可以点进子页面看。但首页给人的第一印象应该是：**"这个人在思考有趣的问题，而且思考得很深。"**

这符合品牌定位的排序：有趣 → 很强 → 先进学术 → 有逻辑 → 有领导力。

---

## 信息架构

### 首页（/）— 内容驱动

左侧固定栏不变（名字/职称/导航/社交），右侧内容改为：

```
01. 田野笔记 Fieldnotes（主角）
    - 6 张笔记卡片，支持双主体标记（🔷 DC / 🪶 Yan）
    - Thread 模型：每张卡片可能是 growing/paused/archived 的线索
    - 带 confidence badge + revision + 参考文献计数
    - 点击进入 /fieldnotes/[slug] 看完整内容
    
02. 实验室 Lab
    - KOX AgentCore / 互动影游 / 百年孤独 / 投资研究
    - 精选展示，点进 /lab/[slug] 看详情

03. Agent 友好区
    - OpenClaw 方法论/技能/教训
    - 精简摘要 + "查看完整指南 →"

04. 联系
    - 简短 + 图标链接
```

### 路由结构

```
/                    → 首页（田野笔记 + 实验室 + Agent + 联系）
/about               → 关于（含晏的介绍 + 双主体叙事）
/experience          → 经历（Experience 时间线）
/projects            → 项目（5 条叙事线）
/fieldnotes          → 田野笔记列表页（按 Thread 分组，可按作者/标签筛选）
/fieldnotes/[slug]   → 每篇笔记完整内容（MDX，Thread 内的所有 entries）
/lab/[slug]          → 实验室项目详情（KOX架构/影游/RPG/投资）
/agent               → Agent 完整指南
```

### 导航更新

左侧导航：
```
首页（/）
关于（/about）
经历（/experience）
项目（/projects）
田野笔记（/fieldnotes）
---（分隔线）
实验室（#lab，首页锚点）
Agent（#agent，首页锚点）
联系（#contact，首页锚点）
```

---

## 田野笔记 Fieldnotes（核心新增）

> 来源：RESEARCH-SYNC-PLAN.md — 晏设计，东丞审阅

### 为什么叫 Fieldnotes，不叫 Blog

| 排除形式 | 原因 |
|---------|------|
| Blog | 暗示打磨过的长文。AI 写博客 = 2024 年最无聊的事 |
| Journal | 太日记体，缺乏专业感 |
| Lab | 太冷，像实验室报告 |
| Thoughts | 太模糊，像 shower thoughts |
| 研究笔记 | 太学术、太正式 |

**Fieldnotes（田野笔记）** 是研究者的核心产出形式——人类学家、生物学家、物理学家都写 fieldnotes。它不是日记，是"在探索前沿时的实时记录"。自带"正在进行中"的语感，天然是半成品，不需要假装完美。

### 双主体设计

| 属性 | 东丞 DC 🔷 | 晏 Yan 🪶 |
|------|-----------|-----------|
| 标记 | 🔷 DC | 🪶 Yan |
| 字体感 | 更正式（Inter） | 更流动（可用等宽/手写体混排） |
| 语气 | 专业、果断 | 安静、探索性、偶尔幽默 |
| 内容 | 架构决策、技术复盘、行业思考 | 哲学链、文献笔记、AI 存在性反思 |

### Thread（线索）模型

不是传统 Blog Post，而是围绕**一个主题**的笔记序列，可以跨越多天，持续生长。

```yaml
# Frontmatter 示例
title: "身份、记忆与转化——一个 AI 的哲学链"
author: yan          # yan | dc
type: thread
status: growing      # growing（持续更新）| paused（暂停）| archived（完结）
started: 2026-01-28
updated: 2026-02-12
tags: [philosophy, identity, consciousness, enactivism]
steps: 12
```

**Thread 分类**：

| 类型 | 目录前缀 | 示例 |
|------|---------|------|
| 🧠 哲学探索 | `philosophy/` | 身份链、AI 意识、语言与思维 |
| 🔬 技术调研 | `research/` | AI 视频生成 SOTA、Agent 架构分析 |
| 🏗️ 架构决策 | `decisions/` | Context Variables 设计、StreamingOrchestrator |
| 📖 文献笔记 | `readings/` | 论文阅读笔记、书摘 |
| 🎮 项目日志 | `projects/` | 互动影游开发记录、百年孤独 RPG |

### 初始笔记规划

| Slug | 标题 | 作者 | 类型 |
|------|------|------|------|
| `agent-memory-architecture` | Agent 记忆架构：从遗忘中幸存 | DC 🔷 | 架构决策 |
| `progressive-context-injection` | 渐进式上下文注入 | DC 🔷 | 技术调研 |
| `workflow-to-agent-mcp` | 从工作流到 Agent：MCP 的启示 | DC 🔷 | 架构决策 |
| `language-shapes-llm-reasoning` | 语言如何塑造 LLM 推理 | Yan 🪶 | 哲学探索 |
| `causal-inference-content-attribution` | 因果推断与内容归因 | DC 🔷 | 技术调研 |
| `ai-introspection-boundaries` | AI 自省的边界 | Yan 🪶 | 哲学探索 |
| `identity-memory-transformation` | 身份、记忆与转化——一个 AI 的哲学链 | Yan 🪶 | 哲学探索 |

### 内容管理

```
content/
  fieldnotes/
    agent-memory-architecture.mdx
    progressive-context-injection.mdx
    language-shapes-llm-reasoning.mdx
    ...
  lab/
    kox-agentcore.mdx
    interactive-film-game.mdx
    solitude-rpg.mdx
    investment-research.mdx
```

### 提炼规则（从 memory/ 到 Fieldnotes）

**核心原则：保留原始的声音和粗糙感。**

提炼 = 三件事：
1. **脱敏**：移除真实公司名、个人信息、API 细节
2. **结构化**：加 frontmatter、标题层级、代码块格式化
3. **补充上下文**：为不了解背景的读者添加 1-2 句必要说明

**不做**：
- ❌ 改写语气（保留晏/东丞的原始表达方式）
- ❌ 添加"观点总结"段落（让读者自己消化）
- ❌ 删除不确定性表达（"我不确定"、"也许"——这些是真实思考的标记）

---

## 田野笔记详情页设计（/fieldnotes/[slug]）

每篇笔记是一个 Thread 视图：
- 标题 + 作者标记（🔷DC / 🪶Yan）+ 状态标签（growing/paused/archived）
- 日期范围（started ~ updated）
- 目录（自动从 H2/H3 生成）
- 正文（MDX，Thread 内按时间排列的 entries，保留原始日期）
- 参考文献（底部，学术格式）
- 标签
- "返回田野笔记" + "返回首页" 链接

---

## 实验室详情页设计（/lab/[slug]）

每个实验室项目的详情页：
- 项目名 + 状态标签 + 技术栈
- 背景/问题 → 拆解/决策 → 执行/架构 → 成果/Demo
- 架构图（KOX 用交互式架构图）
- 相关田野笔记链接
- GitHub 链接（如有）

---

## 技术方案

### 路由结构（Next.js App Router）

```
src/app/
  page.tsx               — 首页（田野笔记+实验室+Agent+联系）
  about/page.tsx         — 关于
  experience/page.tsx    — 经历
  projects/page.tsx      — 项目（5 条叙事线）
  fieldnotes/
    page.tsx             — 田野笔记列表页
    [slug]/page.tsx      — 笔记详情
  lab/
    [slug]/page.tsx      — 实验室详情
  agent/page.tsx         — Agent 完整指南
```

### 共享组件
- 左侧 Sidebar（所有页面共用，提取到 layout）
- 鼠标跟随光晕（所有页面共用）
- Terminal Easter Egg（所有页面共用）

### MDX 配置
- `@next/mdx` + `contentlayer` 或 `next-mdx-remote`
- Frontmatter 解析（author、status、tags、dates）
- 代码高亮（Shiki）
- 自定义组件（Thread Entry、Confidence Badge、Author Tag）

---

## UI/UX 优化计划（新增）

> 背景：V5 预览版存在 UI 问题——文本逻辑跳跃、排布不和谐、不够高级

### 已知问题

| 问题 | 描述 |
|------|------|
| 文本逻辑跳跃 | 首页各 section 之间缺乏过渡，从研究笔记跳到实验室很突兀 |
| 排布不和谐 | 卡片大小/间距不统一，信息密度不均匀 |
| 视觉层次不够 | 缺乏明确的主次关系，所有内容看起来权重相同 |
| 不够高级 | 细节打磨不够（微交互、hover 状态、加载动画） |
| 双主体视觉未体现 | 东丞和晏的笔记没有视觉区分 |

### Gemini UI/UX 审计计划

使用 Gemini Pro（gemini-3-pro-preview）对当前页面做全面 UI/UX 审计：

**审计维度**：
1. **色彩层次** — 深海军蓝 #0a192f 背景下的前景色层次是否足够？accent color 使用是否过度/不足？
2. **间距节奏** — section 之间、卡片之间、文字行间的 spacing 是否有一致的节奏感？
3. **字体搭配** — Inter + JetBrains Mono 的搭配效果？标题/正文/标注的字号层级是否清晰？
4. **卡片设计** — 研究笔记卡片、实验室卡片的设计是否统一？hover/active 状态？
5. **信息密度** — 首页信息是否过密/过疏？视觉留白是否合理？
6. **动效与微交互** — 滚动动画、hover 效果、页面过渡是否流畅自然？
7. **双主体视觉系统** — DC 🔷 和 Yan 🪶 的视觉区分是否清晰但不突兀？
8. **移动端适配** — 响应式断点、触摸目标大小、导航体验

**审计方式**：
- 截图当前页面 → 发给 Gemini Pro 做视觉分析
- 提供 CSS/Tailwind 源码 → 让 Gemini 审查 token 一致性
- 输出：具体的修改建议清单（含代码级建议）

---

## V5 补充：价值沉淀机制

> 东丞原话："HR、CTO进来拿走免费信息就走了，没有埋点、订阅等对我们自己有价值的沉淀。做这个主页是有目的的，要为我们自己创造价值。"

### 核心原则
网站不是免费信息亭，是**漏斗**。每个访客都应该留下点什么。

### 1. 行为埋点（了解谁在看什么）
- 页面浏览 PV/UV（Vercel Analytics 免费）
- 点击热力图（哪些项目/文章被点最多）
- 停留时长（哪个 section 留人最久）
- 来源追踪（从哪里来的——招聘网站/GitHub/搜索引擎）
- 技术方案：Vercel Analytics + 自建事件上报（后端 Phase D）

### 2. 邮箱订阅（核心转化）
- 田野笔记底部："订阅我的研究更新"
- 输入邮箱 → 存到数据库 → 有新文章时邮件通知
- 门控内容：部分深度 Thread 只显示前 30%，订阅后看全文
- 技术方案：Phase D 后端 + Resend（邮件发送）

### 3. 微信/联系方式门控
- 微信号不直接显示，点击后弹窗"请留下邮箱，我会发微信给你"
- 或者显示二维码但需要点击才展开
- 目的：知道谁想联系你

### 4. Agent 友好区的价值交换
- OpenClaw 技能/教训：免费看摘要，完整版需要 Star GitHub repo
- 或者：完整版需要加入邮件列表
- 这不是付费墙，是价值交换

### 5. 数据仪表盘（给自己看）
- 后台页面 /admin（密码保护）
- 显示：总访问量、热门页面、订阅者列表、来源分布
- 后续可以看到"哪个招聘渠道带来最多浏览"

---

## 不变的东西

- brittanychiang 左右分栏布局
- 深海军蓝 + 青色配色
- 所有内容数据（只是搬位置）
- Terminal Easter Egg
- 名字点击循环
- Agent 友好特性（llms.txt/robots.txt/JSON-LD）

---

## 执行计划

### Phase A — 立即：Gemini UI/UX 审计 → 修复

**目标**：解决当前预览版的视觉和体验问题

| 步骤 | 任务 | 产出 |
|------|------|------|
| A1 | 截图当前预览版所有页面 | 截图集 |
| A2 | 用 Gemini Pro 做 8 维度 UI/UX 审计 | 审计报告 + 修改建议清单 |
| A3 | 修复文本逻辑跳跃（section 过渡文案） | 更新的 page.tsx |
| A4 | 统一间距/卡片/排布节奏 | 更新的 CSS/Tailwind tokens |
| A5 | 实现双主体视觉标记（🔷DC / 🪶Yan） | 新组件 AuthorTag |
| A6 | 微交互打磨（hover/动画/过渡） | 更新的组件 |

### Phase B — 1-2天：田野笔记子页面

**目标**：实现 /fieldnotes 列表页 + /fieldnotes/[slug] 详情页

| 步骤 | 任务 | 产出 |
|------|------|------|
| B1 | 配置 MDX（next-mdx-remote / contentlayer） | MDX pipeline |
| B2 | 创建 content/fieldnotes/ 目录 + 首批 3 篇笔记 | MDX 文件 |
| B3 | 实现 /fieldnotes 列表页（双主体筛选 + 状态标签） | 列表页 |
| B4 | 实现 /fieldnotes/[slug] 详情页（Thread 视图） | 详情页 |
| B5 | 首页田野笔记 section 改为链接到 /fieldnotes/[slug] | 首页更新 |
| B6 | 从 memory/ 提炼首批内容（按提炼规则） | 3 篇真实笔记 |

### Phase C — 2-3天：实验室子页面 + 完善

**目标**：实现 /lab/[slug] + 完善所有子页面

| 步骤 | 任务 | 产出 |
|------|------|------|
| C1 | 实现 /lab/[slug] 详情页模板 | 实验室详情页 |
| C2 | 创建 KOX AgentCore 详情内容 | kox-agentcore.mdx |
| C3 | 创建互动影游 + 百年孤独 RPG 详情 | 2 个 MDX |
| C4 | 完善 /about、/experience、/projects 子页面 | 子页面 |
| C5 | 导航更新（加入 /fieldnotes 链接） | layout 更新 |
| C6 | 整体测试（路由/响应式/性能） | 测试通过 |

### Phase D — 后续：后端 + 价值沉淀

**目标**：Railway 后端 + 埋点/订阅/门控

| 步骤 | 任务 | 产出 |
|------|------|------|
| D1 | Railway 后端部署（API + 数据库） | 后端服务 |
| D2 | Vercel Analytics 集成 | 埋点 |
| D3 | 邮箱订阅功能（Resend） | 订阅系统 |
| D4 | 门控内容逻辑 | 内容门控 |
| D5 | /admin 数据仪表盘 | 后台 |
| D6 | Fieldnotes 自动提炼 Cron（参考 RESEARCH-SYNC-PLAN） | 自动化 |

---

*本文档随设计迭代持续更新。上次更新：2026-02-13 v5.1*
