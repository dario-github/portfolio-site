# Portfolio V5 — 设计规格

> 核心变化：首页从"简历式全展示"改为"内容驱动型主页"
> 日期：2026-02-13

## 设计理念

**首页是你的思想展厅，不是你的简历。**

面试官想了解你的经历可以点进子页面看。但首页给人的第一印象应该是：**"这个人在思考有趣的问题，而且思考得很深。"**

这符合品牌定位的排序：有趣 → 很强 → 先进学术 → 有逻辑 → 有领导力。

## 信息架构

### 首页（/）— 内容驱动
左侧固定栏不变（名字/职称/导航/社交），右侧内容改为：

```
01. 研究笔记（主角）
    - 6 篇文章卡片，每张可点进子页面看完整研究
    - 带 confidence badge + revision + 参考文献计数
    
02. 实验室
    - KOX AgentCore / 互动影游 / 百年孤独 / 投资研究
    - 精选展示，点进子页面看详情

03. Agent 友好区
    - OpenClaw 方法论/技能/教训
    - 精简摘要 + "查看完整指南 →"

04. 联系
    - 简短 + 图标链接
```

### 子页面
```
/about         — 关于（原首页的 About section，含晏的介绍）
/experience    — 经历（原首页的 Experience 时间线）
/projects      — 项目（原首页的 5 条叙事线）
/writing/[slug] — 研究笔记详情页（MDX，完整文章+参考文献+目录）
/lab/[slug]    — 实验室详情页（KOX架构/影游/RPG/投资）
/agent         — Agent 完整指南
```

### 导航更新
左侧导航：
```
首页（/）
关于（/about）
经历（/experience）
项目（/projects）
---（分隔线）
研究笔记（#writing，首页锚点）
实验室（#lab，首页锚点）
Agent（#agent，首页锚点）
联系（#contact，首页锚点）
```

## 研究笔记详情页设计（/writing/[slug]）

每篇文章是一个完整的长文页面：
- 标题 + 日期 + confidence badge + revision count
- 目录（自动从 H2/H3 生成）
- 正文（MDX，支持代码块、图表、交互组件）
- 参考文献（底部，学术格式）
- 标签
- "返回首页" 链接

初始 6 篇文章的 slug：
1. `/writing/agent-memory-architecture`
2. `/writing/progressive-context-injection`
3. `/writing/workflow-to-agent-mcp`
4. `/writing/language-shapes-llm-reasoning`
5. `/writing/causal-inference-content-attribution`
6. `/writing/ai-introspection-boundaries`

## 技术方案

### 路由结构（Next.js App Router）
```
src/app/
  page.tsx           — 首页（研究笔记+实验室+Agent+联系）
  about/page.tsx     — 关于
  experience/page.tsx — 经历
  projects/page.tsx  — 项目（5 条叙事线）
  writing/
    [slug]/page.tsx  — 文章详情
  lab/
    [slug]/page.tsx  — 实验室详情
  agent/page.tsx     — Agent 完整指南
```

### 共享组件
- 左侧 Sidebar（所有页面共用）
- 鼠标跟随光晕（所有页面共用）
- Terminal Easter Egg（所有页面共用）
- 需要提取到 layout 层面

### 内容管理
- 文章用 MDX 文件管理（`content/writing/*.mdx`）
- 实验室用 MDX 文件管理（`content/lab/*.mdx`）
- 或者先用 page.tsx 内联数据，后续迁移 MDX

## 迁移计划

### 从现有代码迁移
1. 当前 page.tsx 约 1200 行，包含所有内容
2. 拆分为：
   - page.tsx（首页）: 研究笔记 + 实验室 + Agent + 联系
   - about/page.tsx: 从 page.tsx 提取 About section
   - experience/page.tsx: 从 page.tsx 提取 Experience section  
   - projects/page.tsx: 从 page.tsx 提取 Projects/Narratives section
3. Sidebar 提取到 layout.tsx 作为共享组件
4. 鼠标光晕 + Terminal 提取到 layout.tsx

### 执行顺序
1. 先把 Sidebar/光晕/Terminal 提到 layout
2. 创建子页面（about/experience/projects）搬运内容
3. 重写首页只保留研究笔记+实验室+Agent+联系
4. 创建 /writing/[slug] 动态路由
5. 导航更新

## 不变的东西
- brittanychiang 左右分栏布局
- 深海军蓝 + 青色配色
- 所有内容数据（只是搬位置）
- Terminal Easter Egg
- 名字点击循环
- Agent 友好特性（llms.txt/robots.txt/JSON-LD）

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
- 技术方案：Vercel Analytics + 自建事件上报（后端 Phase 3）

### 2. 邮箱订阅（核心转化）
- 研究笔记底部："订阅我的研究更新"
- 输入邮箱 → 存到数据库 → 有新文章时邮件通知
- 门控内容：部分深度文章只显示前 30%，订阅后看全文
- 技术方案：Phase 3 后端 + Resend（邮件发送）

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
