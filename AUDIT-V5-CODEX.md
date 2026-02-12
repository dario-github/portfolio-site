# AUDIT-V5: 技术可行性审计

> 审计人: Claude Opus (替代 Codex，因 IP 白名单不可用)
> 日期: 2026-02-13
> 基于: SPEC-V5.md + page.tsx (1611行) + layout.tsx + Terminal.tsx (634行) + package.json

---

## 1. FEASIBILITY — 拆分可行性

### 结论：✅ 可行，但需要注意状态依赖

**当前 page.tsx 结构分析 (1611行)：**

| 区域 | 行号范围 | 内容 |
|------|---------|------|
| 数据常量 | 1-533 | NAV_ITEMS, EXPERIENCES, NARRATIVES, WRITING_PIECES, AGENT_CONTENT, YAN_CONTENT 等 |
| Home 组件 + 状态 | 534-600 | 7 个 useState + 3 个 useEffect + 2 个 useCallback |
| JSX 渲染 | 600-1555 | 左侧 sidebar + 右侧 7 个 section |
| 子组件 | 1557-1611 | SectionHeading, Highlight, TechTags |

**共享状态依赖分析：**

| 状态 | 作用域 | 子页面需要? | 迁移方案 |
|------|--------|-----------|---------|
| `mousePosition` | 全局光晕 | ✅ 所有页面 | → layout.tsx (提升到 Provider 或直接在 layout) |
| `activeSection` | 导航高亮 + 光晕颜色 | ⚠️ 复杂 | 首页 scroll-spy 模式 vs 子页面 route-based 高亮，需要两套逻辑 |
| `titleIndex` | 名字循环点击 | ✅ 所有页面 | → layout.tsx sidebar 内部状态 |
| `yanTitleIndex` | 晏标题循环 | ✅ 所有页面 | → layout.tsx sidebar 内部状态 |
| `narrativesExpanded` | 项目展开/收起 | ❌ 仅首页/projects | 留在对应 page |
| `writingExpanded` | 研究笔记展开 | ❌ 仅首页 | 留在首页 page |
| `agentExpanded` | Agent 展开 | ❌ 仅首页 | 留在首页 page |
| TerminalOverlay | 全局彩蛋 | ✅ 所有页面 | → layout.tsx (已是独立组件) |

**关键风险点：`activeSection` 的双模逻辑**

当前 activeSection 通过 IntersectionObserver 驱动，左侧导航高亮和光晕颜色都依赖它。迁移到多页面后：
- 首页：仍用 scroll-spy（`#writing`, `#lab`, `#agent`, `#contact` 锚点）
- 子页面：需要基于当前路由 `/about` → 高亮"关于"
- **推荐**：创建 `NavigationContext`，首页通过 scroll-spy 更新，子页面通过 `usePathname()` 更新

### 数据常量拆分

所有数据（EXPERIENCES, NARRATIVES, WRITING_PIECES 等）目前内联在 page.tsx。应提取到 `src/data/` 目录：
```
src/data/
  experiences.ts
  narratives.ts
  writing.ts
  agent.ts
  nav.ts
```
这步零风险，纯粹搬运。

---

## 2. ROUTING — App Router 结构

### 结论：✅ 方案基本正确，有 2 个需要注意的设计问题

**SPEC 提议的结构：**
```
src/app/
  layout.tsx      ← Sidebar + 光晕 + Terminal（共享）
  page.tsx        ← 首页（研究笔记+实验室+Agent+联系）
  about/page.tsx
  experience/page.tsx
  projects/page.tsx
  writing/[slug]/page.tsx
  lab/[slug]/page.tsx
  agent/page.tsx
```

**问题 1：layout.tsx 需要 `"use client"`**

当前 layout.tsx 是 Server Component（无 `"use client"`），只做 metadata + font + body。迁移后 layout 需要包含：
- 鼠标跟踪 (onMouseMove) → 需要 client
- 动画 sidebar (framer-motion) → 需要 client

**方案**：layout.tsx 保持 Server Component（metadata 需要），创建 `ClientLayout.tsx` 作为 client wrapper：
```tsx
// layout.tsx (Server Component - keeps metadata)
export default function RootLayout({ children }) {
  return (
    <html><body>
      <ClientLayout>{children}</ClientLayout>
    </body></html>
  );
}

// ClientLayout.tsx ("use client")
// 包含 Sidebar + 光晕 + Terminal + mousePosition state
```

**问题 2：导航模式混合**

SPEC 设计了混合导航：
- 关于/经历/项目 → 独立子页面路由
- 研究笔记/实验室/Agent/联系 → 首页内锚点

这意味着左侧导航的 `<a href>` 有两种行为：
- `/about`, `/experience`, `/projects` → `<Link href="/about">` (路由跳转)
- `#writing`, `#lab`, `#agent`, `#contact` → 首页才生效的锚点

**在子页面点 `#writing` 应该跳回首页的 writing 区域**，需要改为 `<Link href="/#writing">`。

**问题 3：子页面右侧布局**

当前左右分栏是 page.tsx 内部实现的 `lg:flex lg:justify-between`。迁移后这个分栏结构应该在 ClientLayout 里，children 只渲染右侧内容区。这要求：
- 左侧 sidebar 在 layout
- 右侧 `<main>` 包裹 `{children}`
- 所有子页面只输出内容，不包含分栏结构

✅ 这完全可行，Next.js App Router 就是为这个设计的。

---

## 3. MDX INTEGRATION — 复杂度评估

### 结论：⚠️ 中等复杂度，建议分阶段

**当前无 MDX 依赖。** package.json 里只有标准 Next.js + Framer Motion + Tailwind。

**方案 A：next-mdx-remote (推荐)**

最小配置：
```bash
npm install next-mdx-remote
```

```
content/writing/
  agent-memory-architecture.mdx
  progressive-context-injection.mdx
  ...
```

```tsx
// src/app/writing/[slug]/page.tsx
import { MDXRemote } from 'next-mdx-remote/rsc'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default async function WritingPage({ params }) {
  const { slug } = await params
  const source = fs.readFileSync(
    path.join(process.cwd(), 'content/writing', `${slug}.mdx`), 'utf8'
  )
  const { content, data } = matter(source)
  return <MDXRemote source={content} />
}
```

优点：
- Server Component 兼容（RSC 模式）
- 支持 frontmatter (gray-matter)
- 可传入自定义组件 (代码高亮、图表等)

**方案 B：@next/mdx (更简单但灵活性低)**

适合 MDX 文件直接作为页面，但不适合动态路由 `[slug]`。

**推荐**：先用 next-mdx-remote + gray-matter。初始文章内容可以先硬编码在 page.tsx 里，后续再迁移到 .mdx 文件。

**额外依赖**：
- `gray-matter` — frontmatter 解析
- `rehype-highlight` 或 `shiki` — 代码高亮（可选，后加）
- `rehype-slug` + `rehype-autolink-headings` — 自动目录（可选）

---

## 4. PERFORMANCE — 多页面 vs 单 SPA

### 结论：✅ 无重大性能问题，有 1 个需要注意的点

**Next.js App Router 的 client-side navigation**：

使用 `<Link>` 组件时，Next.js 做的是 **RSC payload fetch + client-side transition**，不是完整页面刷新。这意味着：
- ✅ 左侧 sidebar 不会闪烁（在 layout 里，不重新挂载）
- ✅ 鼠标光晕不会中断
- ✅ Terminal 状态保持（在 layout 里）
- ✅ 过渡动画可以用 framer-motion `<AnimatePresence>` + `usePathname()`

**注意点：首次加载 bundle size**

当前所有内容在一个 page.tsx 里，首次加载就下载全部 1611 行内容。拆分后：
- 首页只加载首页内容 → **首屏更快**
- 子页面按需加载 → **总体更好**
- Next.js 自动 prefetch Link 目标 → 导航几乎无延迟

**光晕颜色问题**：

当前光晕颜色基于 `activeSection` 的 scroll-spy 动态变化。子页面不会有 7 个 section 可 spy，需要：
- 每个子页面定义自己的固定光晕颜色（如 `/about` → 青色，`/experience` → 绿色）
- 或子页面内部也做 scroll-spy（如果有多个 section）

---

## 5. MIGRATION RISK — 最高风险点

### 风险等级排序

| 风险 | 等级 | 原因 | 缓解 |
|------|------|------|------|
| **Sidebar 提取** | 🔴 高 | 当前 sidebar 和 scrollspy/activeSection 深度耦合，提取到 layout 后需要重写导航逻辑 | 先做这步，跑通后再拆内容 |
| **Scroll-spy 失效** | 🟡 中 | 首页 section 减少（从 7 个变 4 个），IntersectionObserver 配置需要调整 | 重新调 rootMargin |
| **framer-motion 动画断裂** | 🟡 中 | AnimatePresence 跨页面时可能丢失动画状态 | 用 layout-level AnimatePresence + `usePathname()` |
| **移动端 sticky header** | 🟡 中 | 当前每个 section 有 sticky 头，子页面结构不同 | 子页面用固定顶栏替代 |
| **Terminal 快捷键冲突** | 🟢 低 | Terminal 全局监听键盘，搬到 layout 后行为不变 | 无需额外处理 |
| **SEO/metadata** | 🟢 低 | 子页面需要各自的 metadata export | 简单添加 |
| **MDX 渲染** | 🟡 中 | 新引入依赖 + 自定义组件样式需要匹配 | 最后做，先内联内容 |

### 最高风险：Sidebar 提取 + 导航逻辑重写

这是整个重构的 **关键路径**。原因：
1. Sidebar 当前包含 ~150 行 JSX（名字 + 晏 + 导航 + 社交链接）
2. 导航高亮逻辑耦合了 scroll-spy state
3. 提取后需要 Context/Provider 在 layout 和 page 之间传递 activeSection
4. 如果这步出问题，所有后续步骤都阻塞

**建议**：Sidebar 提取应该作为独立 PR，在不拆分内容的情况下先完成并验证。

---

## 6. ESTIMATED EFFORT — 工作量估算

### 分步估算

| 步骤 | 描述 | 预估时间 | 依赖 |
|------|------|---------|------|
| **Phase 0** | 数据常量提取到 `src/data/` | 30 min | 无 |
| **Phase 1** | Sidebar + 光晕 + Terminal 提取到 layout | 2-3 hr | Phase 0 |
| **Phase 2** | NavigationContext (scroll-spy + route-based 双模) | 1-2 hr | Phase 1 |
| **Phase 3** | 创建 about/experience/projects 子页面 | 1-2 hr | Phase 2 |
| **Phase 4** | 重写首页（只保留研究笔记+实验室+Agent+联系）| 1-2 hr | Phase 3 |
| **Phase 5** | MDX 集成 + writing/[slug] 路由 | 2-3 hr | Phase 4 |
| **Phase 6** | lab/[slug] + agent 页面 | 1-2 hr | Phase 5 |
| **Phase 7** | 测试 + 修 bug + 动画调优 | 2-3 hr | Phase 6 |
| **总计** | | **10-17 hr** | |

### Sub-agent 运行估算

如果用 Claude Code / Codex sub-agent：
- **Phase 0+1+2**：1 次 sub-agent（关键路径，需要人工审核）
- **Phase 3+4**：1 次 sub-agent（内容搬运，低风险）
- **Phase 5+6**：1 次 sub-agent（MDX 集成，中等复杂度）
- **Phase 7**：1 次 sub-agent（测试修复）

预估 **4-5 次 sub-agent 运行**，每次 30-60 分钟。

---

## 7. 技术建议

### 推荐执行顺序

```
Phase 0 → Phase 1 → ✅ 验证 build + 功能正常 → Phase 2+3 → ✅ 验证 → Phase 4 → ✅ 验证 → Phase 5+6+7
```

每个阶段后都要 `next build` + 本地测试。

### 架构建议

1. **创建 `src/components/Sidebar.tsx`** — 独立组件，接收 `activeItem` prop
2. **创建 `src/components/ClientLayout.tsx`** — "use client" wrapper，包含鼠标跟踪 + sidebar + terminal
3. **创建 `src/contexts/NavigationContext.tsx`** — 提供 `activeSection` + `setActiveSection`
4. **数据层 `src/data/`** — 所有常量数据独立文件
5. **MDX 用 `next-mdx-remote/rsc`** — Server Component 模式，初期不需要交互组件

### 不建议

- ❌ 不要用 `@next/mdx` (不适合动态路由)
- ❌ 不要在 Phase 1 前创建子页面（会导致重复代码）
- ❌ 不要一次性重构（渐进式，每步验证）
- ❌ 不要引入状态管理库（Zustand/Jotai），React Context 足够

### 关于 SPEC 的修正建议

1. **导航 href 修正**：`#writing` 在子页面应为 `/#writing`
2. **缺少 `/yan` 页面**：SPEC 子页面列表没有晏的独立页面，但首页有第 06 section。建议要么加 `/yan` 路由，要么将晏的内容整合到 sidebar
3. **光晕颜色方案**：SPEC 未提及子页面的光晕颜色策略，需要补充定义

---

## 总结

| 维度 | 评分 | 说明 |
|------|------|------|
| 技术可行性 | ⭐⭐⭐⭐ | 完全可行，Next.js App Router 天然支持 |
| 复杂度 | ⭐⭐⭐ | 中等，关键在 sidebar 提取和导航双模逻辑 |
| 风险 | ⭐⭐⭐ | 可控，渐进迁移可降低风险 |
| ROI | ⭐⭐⭐⭐⭐ | 高，首页从简历变内容展厅，且支持 MDX 长文 |

**总体判断：建议执行。** 方案设计合理，代码结构支持拆分，渐进迁移策略可将风险降到可接受水平。
