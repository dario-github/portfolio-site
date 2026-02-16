# DESIGN-V7.md — 主页重构 + /about HR 入口

> 协调文档：另一个对话也在改主页，以此为准。
> 状态：**待确认**

---

## 背景

V6 主页内容过重：精选项目(3) + 田野笔记(6) + 实验室(6) + Agent 完整区(34技能+8教训+4方法论) + 联系。
滚动太长，HR 没有独立可发的 URL。

## 目标

1. **主页变摘要索引**——快速扫一眼知道这人做什么，点进去看细节
2. **/about 作为 HR 可发链接**——独立完整，包含两人简介 + 联系方式
3. **新增 /agent 页面**——把完整 Agent 区（技能/教训/方法论）移过去
4. **Lab 合并进 /projects**——减少一个维度

---

## 路由结构（6 项导航）

| # | 标签 | 路由 | 内容 | 变化 |
|---|------|------|------|------|
| 01 | 简介 | `/about` | 东丞 bio + 晏空间 + 底部联系 | **改**：加底部联系方式块 |
| 02 | 经历 | `/experience` | 时间线 | 不变 |
| 03 | 项目 | `/projects` | 全部项目 + 原 Lab 合并 | **改**：Lab 6 项合入 |
| 04 | 田野笔记 | `/fieldnotes` | 全部笔记 | 不变 |
| 05 | Agent | `/agent` | **新页面**：完整技能/教训/方法论 | **新增** |
| 06 | 联系 | `/#contact` | 双人联系卡片 | 不变（锚点留在主页底部） |

---

## 主页 `/` 改动明细

### Hero（保留，微调）

```
现有：8 年经验一句话 + 4 stat 卡片(8年+/18+/34/田野笔记数) + 3 个跳转按钮
改为：保持一句话 + 4 stat 卡片 + 3 按钮不变
```

微调：stat 数字检查准确性即可，结构不动。

### 新增：最新动态（Hero 下方）

2-3 条带时间戳 + 状态标签的动态条目，从数据文件读取。

```tsx
// src/data/updates.ts
export const UPDATES = [
  { date: "2026-02", label: "🔨 构建中", text: "互动影游 MVP — AI 全生成 Steam 游戏" },
  { date: "2026-02", label: "📝 研究中", text: "主动式 Agent 系统 × Context Learning" },
  { date: "2026-01", label: "⚡ 日常使用", text: "OpenClaw 34 个技能插件投入生产" },
];
```

视觉：紧凑列表，每行 = `时间 | 状态标签 | 一句话`。不需要卡片，不需要展开。

### 精选项目（缩小）

```
现有：3 个展开卡片（标题 + 描述 + tags），底部 "查看全部项目 →"
改为：3 个 mini 卡片，只保留标题 + 一句话描述，无 tags，底部链接不变
```

去掉 `border-l-2` 重色左边框，改成普通 hover 卡片。

### 田野笔记（大幅精简）

```
现有：6 篇完整卡片（标题+摘要+tags+确信度+版本+日期+信源数）
改为：最新 2 篇标题 + 日期，一行一篇，底部 "查看全部 → /fieldnotes"
```

### 实验室（移除）

```
现有：6 个项目卡片
改为：删除整个 section。内容合并到 /projects 页面
```

### Agent 友好区（极度精简）

```
现有：完整展示 34 技能 + 8 教训 + 4 方法论 + GitHub 链接
改为：1 句话摘要 + 3 个数字（技能/教训/方法论），底部 "深入了解 → /agent"
```

### Contact（保留）

双人联系卡片不变。

---

## /about 页面改动

**现有结构**（保留）：
1. "关于我们"双主体引导
2. 东丞职业简介（8 年经验一段话 + 核心能力 + 研究方向）
3. 教育背景
4. 晏的空间（名字故事 + 好奇心卡片 + 社交链接 + 给同类/人类的话 + 时间线 + 折叠反思区）

**新增**（底部）：
- 联系方式块：东丞邮箱 + LinkedIn + 晏 GitHub/Twitter
- 格式与主页 Contact 一致，但紧凑版（一个水平排列而非双卡片）

**确保独立性**：不依赖首页上下文，HR 打开 `dariolink.com/about` 就能完整了解。

---

## 新增 /agent 页面

从 `page.tsx` 剥离以下内容到 `src/app/agent/page.tsx`：

1. **OPENCLAW_SKILLS**（34 项）→ 移到 `src/data/agent.ts`
2. **CORE_LESSONS**（8 项）→ 同上
3. **METHODOLOGY**（4 项）→ 同上
4. 页面布局保持现有 Agent 友好区的完整设计（技能 grid + 教训 cards + 方法论 cards + GitHub 链接）

---

## Lab → /projects 合并

**LAB_ITEMS**（6 项）移到 `/projects` 页面：
- 新增一个 "实验室" 分类标签
- 卡片样式保持 Lab 原有的 status badge

---

## Sidebar 导航更新

```tsx
const NAV_ITEMS: NavItem[] = [
  { label: "简介", href: "/about", index: "01", type: "route", persona: "dc" },
  { label: "经历", href: "/experience", index: "02", type: "route", persona: "dc" },
  { label: "项目", href: "/projects", index: "03", type: "route", persona: "dc" },
  { label: "田野笔记", href: "/fieldnotes", index: "04", type: "route", persona: "yan" },
  { label: "Agent", href: "/agent", index: "05", type: "route", persona: "yan" },
  { label: "联系", href: "/#contact", anchorHref: "#contact", index: "06", type: "anchor", sectionId: "contact", persona: "shared" },
];
```

变化：
- 实验室 (`/#lab`) 删除
- Agent 从锚点 (`/#agent`) 变独立路由 (`/agent`)
- 所有 anchor 类型只剩 "联系"
- persona 标注不变（分组线仍保留 🔷东丞 / 🪶晏 / 共有 分割）

---

## 数据文件拆分

| 文件 | 内容 | 从哪来 |
|------|------|--------|
| `src/data/updates.ts` | 最新动态 | **新建** |
| `src/data/agent.ts` | 技能/教训/方法论 | 从 `page.tsx` 剥离 |
| `src/data/fieldnotes.ts` | 田野笔记 | 已存在 |
| `src/data/projects.ts` | 项目 + Lab 合并 | 从 `page.tsx` + `projects/page.tsx` 整合 |

---

## 不动的部分

- `layout.tsx`（全局布局、字体、metadata）
- `GlowContext.tsx` / `MouseGlow.tsx`（光效系统）
- `Terminal.tsx`（终端彩蛋）
- `SectionHeading.tsx`（通用标题组件）
- `fieldnotes/[slug]/page.tsx`（单篇笔记页）
- `experience/page.tsx`

---

## 影响范围汇总

| 文件 | 操作 |
|------|------|
| `src/app/page.tsx` | **大改**：删 Lab + 精简 Agent + 精简 Fieldnotes + 新增 Updates |
| `src/app/about/page.tsx` | **小改**：底部加联系方式块 |
| `src/app/agent/page.tsx` | **新建**：完整 Agent 友好区 |
| `src/app/projects/page.tsx` | **改**：合入 Lab 项目 |
| `src/components/Sidebar.tsx` | **改**：NAV_ITEMS 6 项 |
| `src/data/updates.ts` | **新建** |
| `src/data/agent.ts` | **新建** |

---

## 执行顺序

1. 新建 `src/data/updates.ts` + `src/data/agent.ts`（纯数据，无副作用）
2. 新建 `src/app/agent/page.tsx`（新页面，不影响现有）
3. 改 `src/app/projects/page.tsx`（合入 Lab）
4. 改 `src/app/about/page.tsx`（加底部联系方式）
5. 改 `src/components/Sidebar.tsx`（导航更新）
6. 改 `src/app/page.tsx`（主页重构——最后动，影响最大）

> 步骤 1-4 互相独立可并行，5-6 有依赖需顺序执行。
