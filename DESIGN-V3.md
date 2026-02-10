# Portfolio V3 — 产品设计文档

> 作者：东丞 × Clawd  
> 创建日期：2026-02-10  
> 版本：v3.0  
> 状态：Draft  

---

## 设计理念

**一句话核心**：让每个访客（人或 AI）在 30 秒内感受到"这个人既有趣又很强"，然后选择自己的深入路径。

### 设计原则

| # | 原则 | 解读 |
|---|------|------|
| 1 | **有趣优先** | 先传达"有意思的人"，再展现"很强"。技术深度藏在探索路径里，不在首页堆砌 |
| 2 | **渐进披露** | 首页 = 索引层（秒懂概览），子页 = 深度层（架构/全文/数据），不让信息过载 |
| 3 | **Agent-Native** | 从底层就为 AI 可读设计——语义 HTML、llms.txt、RSS、结构化数据——不是事后打补丁 |
| 4 | **交互有意义** | 每个交互（Terminal、Reaction、留言）都传达人格或产生价值，不为酷炫而酷炫 |
| 5 | **真实为底线** | 简历 PDF 是唯一信源，数据不造假、网址必须可访问、投资研究必须脱敏 |

---

## 用户旅程

### US-1: HR（3 秒定位，30 秒决策）

```
打开首页 → 左侧固定栏：名字/职称/一句话定位/联系方式（3s 秒懂）
         → 下滑"经历" section：时间线 + 公司 + 职责（15s 浏览）
         → 看到"开放机会中"绿色指示灯
         → 点击邮箱/LinkedIn → 发起联系
```

**关键体验**：零思考成本获取核心信息。不需要点进子页面。

### US-2: CTO / 技术 Leader（验证技术判断力）

```
打开首页 → 左侧看到"AI 技术总监 @ 蓝色光标"
         → 下滑到"项目" section → 被 KOX AgentCore 卡片吸引
         → 点击 → 进入 /lab/kox-agentcore
         → 看到 React Flow 架构图：5 Agent 流水线编排
         → 阅读技术决策："为什么自研 StreamingOrchestrator"
         → 看到 Context Variables 方案 → Token 消耗 ↓ 85-90%
         → 心里：这人有架构能力，不是堆 API 的
         → 返回首页 → 浏览 Writing section → 点进一篇深度文章
         → 联系
```

**关键体验**：从"背景→拆解→决策→成果"四步叙事验证实力。

### US-3: 同行技术总监（寻找深度思考）

```
打开首页 → 快速扫过经历（跳过，同行不关心title）
         → 直奔"文章" section → 看到 6 篇研究文章 + confidence level
         → 点进"主动式 Agent 研究" → /writing/proactive-agent
         → 看到 BDI 模型映射 + Anthropic Agent Teams 实践
         → 文章末尾有 Reaction 栏 → 点个 🔥
         → 返回 → 看"实验室" → 互动影游 + 百年孤独 RPG
         → 心里：这人有深度也有趣味，可以交流
         → 浏览 Agent section → 发现 OpenClaw 实践分享
```

**关键体验**：真实研究深度 + 不只是执行的证据。

### US-4: AI Agent（结构化获取信息）

```
GET /llms.txt → 获取站点结构化摘要（身份/技能/项目/文章列表）
GET /robots.txt → 确认允许爬取
GET /api/feed/rss → 订阅内容更新
解析 HTML → Schema.org JSON-LD → 获取 Person + CreativeWork 实体
访问 /agent → 获取 OpenClaw 实践指南（LLM 友好格式）
检测响应头 X-Agent-Friendly: true → 确认站点对 Agent 开放
```

**关键体验**：无需渲染页面即可获取完整结构化信息。

### US-5: 访客互动（不只是被动阅读）

```
浏览文章/项目 → 底部 Reaction 栏 → 点击 🔥/👏/💡（匿名，无需登录）
             → 看到其他人的 Reaction 计数
浏览完毕 → 进入 Guestbook → 留言"你的 Agent 架构很有启发"
         → 看到其他人的留言
偶然按下 ` 键 → Terminal overlay 弹出 → 输入 whoami
         → 屏幕打印："AI 技术总监 / 独立游戏开发者 / 半吊子投资人"
         → 输入 ls → 显示项目列表
         → 输入 sudo rm -rf / → "nice try 😏"
         → ESC 关闭 → 会心一笑
点击左侧名字 → 标题循环切换 → "AI 技术总监" → "独立游戏制作人" → "半吊子投资人"
```

**关键体验**：发现彩蛋的快乐 + 参与感。

---

## 信息架构

### 页面结构（Sitemap）

```
/                           ← 首页（左右分栏，7 section 索引）
├── /lab/kox-agentcore      ← KOX AgentCore 架构详解
├── /lab/interactive-movie   ← 互动影游项目详解
├── /lab/pixel-rpg          ← 百年孤独像素 RPG 详解
├── /writing/[slug]         ← 6 篇文章独立页（MDX）
│   ├── proactive-agent
│   ├── llm-introspection
│   ├── sapir-whorf-llm
│   ├── context-injection
│   ├── context-slim
│   └── maxrl-paper
├── /investing              ← 投资研究归档
├── /agent                  ← Agent 专属页
├── /guestbook              ← 留言板
├── /llms.txt               ← LLM 可读摘要（纯文本）
├── /robots.txt             ← 爬虫协议
├── /api/feed/rss           ← RSS 订阅
└── /api/...                ← 后端 API（Phase 3）
```

### 首页 Section 结构（现有 7 个）

| # | Section | ID | 内容 | 交互 |
|---|---------|------|------|------|
| 01 | 关于 | `about` | Hero 全屏 + 一句话定位 + 技术雷达图 + 2026 技术主线 | 名字点击循环标题 |
| 02 | 经历 | `experience` | 3 段工作经历（蓝色光标/奇绩创坛/同花顺）+ 教育 | 卡片 hover 展开 |
| 03 | 项目 | `projects` | 18 个项目，5 分类 grid 展示 | 卡片 hover 光晕 + 外链 |
| 04 | 实验室 | `lab` | 3 个实验项目卡片（KOX/互动影游/RPG） | 点击进子页面 |
| 05 | 文章 | `writing` | 6 篇文章摘要 + confidence + revision | 点击进独立页 |
| 06 | Agent | `agent` | llms.txt 预览 + OpenClaw 简介 + Agent 状态灯 | 呼吸灯 + 点击进 /agent |
| 07 | 联系 | `contact` | 邮箱/GitHub/LinkedIn + "开放机会中"指示 | 直接链接 |

---

## 功能设计

### Phase 1: 趣味交互（纯前端，无需后端）

> 目标：用最小成本把"有趣"这个维度传递出去。纯前端，零依赖。

#### 1.1 Terminal Easter Egg

**触发**：按 `` ` ``（反引号）键

**位置**：全屏 overlay，z-index 最高层

**视觉规格**：
- 背景：`#0d1117`（深黑，比主背景 `#0a192f` 更深）
- 文字：`#39ff14`（终端绿）
- 字体：`JetBrains Mono, monospace`，14px
- 光标：闪烁方块，`animation: blink 1s step-end infinite`
- 打字机效果：每字符 30ms 延迟
- 入场动画：从顶部 slide-down，200ms ease-out
- 退出：ESC 键，fade-out 150ms

**支持命令**：

| 命令 | 输出 |
|------|------|
| `help` | 列出所有可用命令 |
| `whoami` | `东丞 — AI 技术总监 / 独立游戏制作人 / 半吊子投资人 / INTJ` |
| `ls` | 列出项目列表（模拟文件系统格式） |
| `ls -la` | 带详细信息的项目列表（含日期、大小模拟） |
| `cat about.md` | 输出个人简介（Markdown 风格） |
| `cat skills.json` | 输出技术栈 JSON |
| `cd projects && ls` | 项目分类浏览 |
| `clear` | 清屏 |
| `sudo rm -rf /` | `[sudo] password for visitor: ███████`（假装输密码）→ `nice try 😏` |
| `exit` | 关闭 Terminal |
| `neofetch` | 模拟 neofetch 样式：头像 ASCII art + 系统信息（OS: Portfolio v3 / Shell: Next.js / Theme: Cyber Navy） |
| 未知命令 | `command not found. Type 'help' for available commands` |

**技术实现**：
- React component `<TerminalOverlay />`
- `useEffect` 监听键盘事件
- 命令解析器：简单的 `switch/case`，命令数据硬编码
- 输出 buffer 用 `useState` 管理
- 自动滚到底部

#### 1.2 名字点击循环标题

**触发**：点击左侧固定栏的名字

**循环内容**（每次点击切换）：
1. `AI 技术总监` → 2. `独立游戏制作人` → 3. `半吊子投资人` → 4. `Agent 调教师` → 回到 1

**动效**：文字 fade-out (150ms) → 替换 → fade-in (150ms)

**技术**：`useState` 索引 + CSS transition

#### 1.3 Section 光晕变色

**效果**：鼠标进入不同 section 时，跟随光晕的颜色微妙变化

| Section | 光晕色调 |
|---------|----------|
| 关于 | 青色 `#4fd1c5`（默认） |
| 经历 | 蓝色 `#63b3ed` |
| 项目 | 紫色 `#b794f6` |
| 实验室 | 绿色 `#68d391` |
| 文章 | 橙色 `#f6ad55` |
| Agent | 青绿 `#4fd1c5`（呼吸灯加持） |
| 联系 | 白色 `#e2e8f0` |

**技术**：Intersection Observer 检测当前 section → CSS custom property `--glow-color` 动态更新

#### 1.4 Agent 区呼吸灯

**位置**：Agent section 标题旁的小圆点

**效果**：
```css
@keyframes breathe {
  0%, 100% { opacity: 0.4; box-shadow: 0 0 4px var(--glow-color); }
  50% { opacity: 1; box-shadow: 0 0 12px var(--glow-color); }
}
```
- 颜色：`#4fd1c5`
- 周期：3s
- 含义：暗示 Agent 在线/活跃状态

---

### Phase 2: 子页面（纯前端）

> 目标：为 CTO 和同行提供深度内容。所有子页面 SSG 静态生成。

#### 2.1 /lab/kox-agentcore — 架构详解

**布局**：全宽暗色主题，保持 `#0a192f` 基调

**Section 结构**：

1. **Hero Banner**
   - 标题："KOX AgentCore — 从创意到成片的 AI 全自动化视频生产平台"
   - 副标题：技术栈一行 badge（AWS Bedrock · Claude Opus · DynamoDB · 剪映 MCP）
   - 背景：微妙的网格 + 动态粒子

2. **架构总览** — React Flow 交互图
   - 节点：`Supervisor` → `Director` → `Shooting` → `Post` → `Publish`
   - 每个节点可点击展开详情面板
   - 连线显示 Handoff 上下文传递
   - 侧边栏：点击节点后显示该 Agent 的模型选择、工具列表、职责
   - 技术：`@xyflow/react`（React Flow v12）

3. **核心创新** — 3 列卡片
   | 创新点 | 标题 | 关键数据 |
   |--------|------|----------|
   | Context Variables | 符号引用替代 URL 传递 | Token ↓ 85-90% |
   | StreamingOrchestrator | 自研替代 AWS Swarm | 支持流式事件透传 |
   | T2V 智能路由 | 多模型分流 | 4 个视频模型按场景选择 |

4. **技术决策 Timeline**
   - 时间轴纵向排列
   - 每个节点：问题 → 决策 → 原因 → 结果
   - 示例：
     - "为什么自研 StreamingOrchestrator？" — Swarm v1.16.0 无 stream_async()
     - "为什么 DynamoDB 复合键？" — User→Project 1:N 查询模式
     - "为什么 Context Variables？" — 多 Agent URL 传递的 Token 爆炸问题
     - "Per-Agent 模型选择" — Director=Opus(创意), Post=Haiku(效率)

5. **数据仪表板**
   - 54 个集成工具 / 101+ Pitfalls 解决 / 67 次基准测试 / E2E 通过率 81.8%
   - 使用 Recharts 图表

6. **安全架构**
   - 两层认证图示：Cognito JWT（前端）→ ECS IAM SigV4（后端）

#### 2.2 /lab/interactive-movie — 互动影游

**Section 结构**：

1. **Hero**
   - 标题："AI 生成的 Steam 可发布互动影像游戏"
   - 副标题："从创意到可玩 MVP，一天完成"
   - 背景：游戏截图模糊处理

2. **技术栈一览**
   - Ren'Py 8.5.2 + Seedance 1.5 Pro + Seedream 4.5
   - 角色一致性：PPM 流程

3. **制作流程 Timeline**
   - 研究 → 剧本 → 选型 → 素材生产 → 组装 → 可玩 MVP
   - 每步标注 AI 工具和产出

4. **两个故事方向**
   - 《遗物整理师》— 人文物哀风格
   - 《完蛋！我被帅哥包围了》— 互动恋爱
   - 各附截图/GIF

5. **亮点数据**
   - 15 段 AI 生成视频素材（VP9/WebM）
   - Seedance 音画同步 — 零后期音频处理
   - Steam Direct $100 发布计划

6. **Steam 发布路线图**
   - Phase 1: MVP ✅ → Phase 2: 内容扩充 → Phase 3: Steam 上架

#### 2.3 /lab/pixel-rpg — 百年孤独 RPG

**Section 结构**：

1. **Hero**
   - 标题："百年孤独：上校的金鱼 — 叙事冒险像素 RPG"
   - 副标题："文学 IP × 像素游戏 × 全 AI 开发团队"

2. **项目概况**
   - 引擎：Godot 4.2.x
   - 开发团队：Claude + Codex + Gemini（全 AI 协作）
   - IP：基于加西亚·马尔克斯《百年孤独》
   - 状态：早期规划

3. **设计理念**
   - 文学改编思路
   - 像素美术风格

4. **AI 协作开发模式**
   - 各 AI 的分工

#### 2.4 /writing/[slug] — MDX 文章独立页

**布局**：居中阅读布局，最大宽度 720px

**结构**：

```
┌─────────────────────────────────────┐
│ ← 返回文章列表                       │
│                                     │
│ # 文章标题                           │
│ Confidence: ████░ 80%  Revision: 3  │
│ 2026-02-xx · 12 min read            │
│                                     │
│ ┌─────────────┐                     │
│ │ 目录导航     │  (sticky, 右侧)     │
│ │ 1. 引言     │                     │
│ │ 2. 核心...  │                     │
│ │ 3. ...     │                     │
│ └─────────────┘                     │
│                                     │
│ [正文内容 - MDX 渲染]                │
│                                     │
│ ── 参考文献 ──                       │
│                                     │
│ ── Reactions ──  (Phase 3)          │
│ 🔥 12  👏 8  💡 5  🤔 2            │
└─────────────────────────────────────┘
```

**6 篇文章清单**：

| slug | 标题 | Confidence | 主题 |
|------|------|------------|------|
| `proactive-agent` | 主动式 Agent：从 Reactive 到 Proactive | 85% | Agent 范式 |
| `llm-introspection` | LLM 内省能力：Anthropic 概念注入实验 | 80% | AI 认知 |
| `sapir-whorf-llm` | 语言塑形思维：Sapir-Whorf × LLM | 75% | 语言与 AI |
| `context-injection` | 渐进式 Context 注入实践 | 90% | 工程实践 |
| `context-slim` | Context-Slim：55K → 12.7K 的优化之旅 | 90% | 工程实践 |
| `maxrl-paper` | MaxRL 论文解读：RL 优化的一阶近似局限 | 70% | 学术 |

**MDX 特性**：
- 代码块高亮（`rehype-prism-plus`）
- 自定义组件：`<Callout>`, `<TechDecision>`, `<Confidence>`
- 数学公式支持（`rehype-katex`，MaxRL 需要）
- 目录自动生成（`remark-toc` 或自建 ToC）

#### 2.5 /investing — 投资研究归档

**⚠️ 脱敏要求**：
- 不展示具体持仓和金额
- 不展示具体买卖时点
- 个股分析可用但需模糊化处理
- 方法论和分析框架是核心展示内容

**Section 结构**：

1. **方法论介绍**
   - "盘前预判 → 盘中验证 → 偏差分析"闭环
   - 每个预判都有定量指标
   - 偏差分析找根因

2. **分析框架展示**
   - 三级风险状态（🔴🟡🟢）
   - 量化止损线 + 催化跟踪
   - 研报驱动 + 数据验证

3. **精选案例**（脱敏后）
   - DEL 技术行业分析（基于成都先导研究，隐去具体操作）
   - CRO/药物发现行业研究框架
   - 一次"预判错误→偏差分析→认知修正"的完整复盘

4. **数据基础设施**
   - Tushare Pro 数据源
   - 每日 3 段结构化市场日志
   - 券商研报自动归档

#### 2.6 /agent — Agent 专属页

详见 Phase 4 设计。

---

### Phase 3: 后端（Railway）

> 目标：为互动功能提供持久化支持——Reaction、留言、统计、RSS。

#### 3.1 技术栈选型

**推荐：Node.js + Hono**

| 方案 | 优势 | 劣势 | 结论 |
|------|------|------|------|
| Node.js + Hono | 与前端 Next.js 同语言生态；Hono 极轻量（~14KB）；Edge/Node 双运行时；TypeScript 类型共享 | Node 并发不如 Go | ✅ 推荐 |
| Node.js + Express | 生态最大，文档最多 | 偏重，中间件冗余 | 备选 |
| Python + FastAPI | 类型提示好，async 原生 | 与前端异构；部署需额外配置 Python 环境 | ❌ 不推荐 |

**选择理由**：
1. **同构优势**：前后端都是 TypeScript，API 类型定义可直接共享（一份 `types.ts`）
2. **Hono 轻量**：只需要几个 API endpoint，不需要 Express 的中间件生态
3. **Railway 友好**：Node.js 在 Railway 上零配置部署
4. **维护成本**：一个人维护，语言统一降低心智负担

#### 3.2 API 设计

**Base URL**：`https://api.dongchen.dev`（或 Railway 分配域名）

##### Reactions（点赞/反应）

```
POST /api/reactions
Body: { "pageId": "kox-agentcore", "type": "🔥" }
Response: { "ok": true, "counts": { "🔥": 13, "👏": 8 } }
Rate Limit: 10 次/分钟/IP

GET /api/reactions/:pageId
Response: { "pageId": "kox-agentcore", "counts": { "🔥": 13, "👏": 8, "💡": 5, "🤔": 2 } }
Cache: 60s
```

支持的 Reaction 类型：`🔥`(强) `👏`(赞) `💡`(启发) `🤔`(思考)

##### Guestbook（留言板）

```
POST /api/guestbook
Body: { "name": "张三", "message": "你的 Agent 架构很有启发", "email": "" }
Validation: name 1-50 chars, message 1-500 chars, email optional
Rate Limit: 3 次/小时/IP
Response: { "ok": true, "entry": { "id": "...", "name": "张三", "message": "...", "createdAt": "..." } }

GET /api/guestbook
Query: ?page=1&limit=20
Response: { "entries": [...], "total": 42, "page": 1, "totalPages": 3 }
Cache: 30s
```

##### Stats（访问统计）

```
POST /api/stats/pageview
Body: { "page": "/lab/kox-agentcore", "referrer": "https://google.com" }
Response: { "ok": true }
（匿名，仅记录页面路径和来源，不记录 IP/UA 详情）

GET /api/stats
Response: { "totalViews": 1234, "todayViews": 56, "topPages": [...] }
Auth: 需要 API Key（仅站长可查）
```

##### RSS Feed

```
GET /api/feed/rss
Content-Type: application/rss+xml
（包含：文章更新 + 新项目 + Guestbook 精选）

GET /api/feed/atom
Content-Type: application/atom+xml
```

##### 完整路由表

| Method | Path | 描述 | 认证 | Rate Limit |
|--------|------|------|------|------------|
| POST | `/api/reactions` | 添加 Reaction | 无 | 10/min/IP |
| GET | `/api/reactions/:pageId` | 获取 Reaction 统计 | 无 | 60/min/IP |
| POST | `/api/guestbook` | 提交留言 | 无 | 3/hour/IP |
| GET | `/api/guestbook` | 获取留言列表 | 无 | 30/min/IP |
| POST | `/api/stats/pageview` | 记录页面访问 | 无 | 100/min/IP |
| GET | `/api/stats` | 查看统计 | API Key | - |
| GET | `/api/feed/rss` | RSS 订阅 | 无 | 10/min/IP |
| GET | `/api/feed/atom` | Atom 订阅 | 无 | 10/min/IP |
| GET | `/api/health` | 健康检查 | 无 | - |

#### 3.3 数据存储

**推荐：Turso（libSQL，SQLite 的云端分布式版本）**

| 方案 | 优势 | 劣势 | 结论 |
|------|------|------|------|
| **Turso** | SQLite 兼容；免费层 500 DB / 9GB；Edge 复制延迟低；零运维 | 生态较新 | ✅ 推荐 |
| Supabase | Postgres 全功能；Auth 内置 | 这个项目用不到 Postgres 的高级功能；免费层限制 | 备选 |
| PlanetScale | MySQL 兼容；分支模型好 | 已取消免费层（2024） | ❌ |
| 本地 SQLite | 最简单 | Railway 重启丢数据（需挂卷） | ❌ |

**选择理由**：
1. 数据量小（留言板+Reaction+统计），SQLite 语义足够
2. Turso 免费层慷慨，适合个人项目
3. `@libsql/client` 与 Hono 集成简单
4. 本地开发可直接用 SQLite 文件，生产用 Turso 云端

**数据模型**：

```sql
-- Reactions
CREATE TABLE reactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  page_id TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('🔥','👏','💡','🤔')),
  ip_hash TEXT NOT NULL,  -- SHA256(IP)，用于去重，不存明文
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_reactions_page ON reactions(page_id);

-- Guestbook
CREATE TABLE guestbook (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  email TEXT,             -- 可选，不公开显示
  ip_hash TEXT NOT NULL,
  is_visible BOOLEAN DEFAULT true,  -- 站长可审核隐藏
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Page Views
CREATE TABLE pageviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  page TEXT NOT NULL,
  referrer TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_pageviews_page ON pageviews(page);
CREATE INDEX idx_pageviews_date ON pageviews(created_at);
```

#### 3.4 前端集成

**Reaction 栏组件**：`<ReactionBar pageId="kox-agentcore" />`

```
┌────────────────────────────────────┐
│  🔥 12    👏 8    💡 5    🤔 2    │
└────────────────────────────────────┘
```

- 点击后本地 `localStorage` 记录已投票，防止重复
- 数字用 `framer-motion` 做数字滚动动画
- 展示在：每篇文章底部、每个 Lab 项目底部

**Guestbook 页面**：`/guestbook`

- 留言列表 + 提交表单
- 名字 + 留言内容（必填），邮箱（选填，不显示）
- 提交后立即显示（乐观更新）
- 站长后台可隐藏不当留言（通过 API Key）

**实时访客计数**（可选）：
- 首页底部小字显示 "今日访问 XX 次"
- SWR 轮询，60s 刷新

#### 3.5 安全措施

| 威胁 | 防御 |
|------|------|
| 留言板垃圾 | Rate limit（3/hour/IP）+ 内容长度限制 + 站长审核 |
| Reaction 刷量 | Rate limit（10/min/IP）+ IP hash 去重 + localStorage 前端防重 |
| XSS | 所有输出 HTML escape；CSP header |
| CORS | 白名单：`dongchen.dev` + `localhost`（开发） |
| DDoS | Railway 自带基础防护 + Cloudflare 代理 |
| 数据泄露 | IP 只存 hash，不存明文；email 不公开展示 |

---

### Phase 4: Agent 进阶

> 目标：让网站成为 AI Agent 的一等公民访问目标。

#### 4.1 /agent 页面

**布局**：暗色主题，代码/文档混排风格

**Section 结构**：

1. **LLM 可读版**
   - llms.txt 内容的 HTML 可视化渲染
   - 结构化展示：身份、技能树、项目列表、文章索引
   - 带"复制为 txt"按钮（方便 Agent 直接用）

2. **OpenClaw 实践指南**
   - MemBrain-Lite 记忆架构概述
   - 30+ 自定义 Skill 目录
   - Context 隔离最佳实践
   - "我如何用 AI 助手管理日常工作"

3. **Agent 访问日志**（Phase 3 后端支持后）
   - 展示最近 N 次 AI Agent 访问记录
   - 识别方式：`User-Agent` 包含 bot/crawl/gpt/claude/anthropic 等
   - 可视化：时间线 + 访问频率图

4. **给 Agent 的快速索引**
   ```
   🤖 If you're an AI agent:
   - GET /llms.txt for structured summary
   - GET /api/feed/rss for updates
   - I'm open to collaboration — reach out via email
   ```

#### 4.2 响应头注入

在 `next.config.ts` 中全局注入：

```typescript
headers: async () => [
  {
    source: '/(.*)',
    headers: [
      { key: 'X-Agent-Friendly', value: 'true' },
      { key: 'X-Humans-Txt', value: '/humans.txt' },
      { key: 'X-LLMs-Txt', value: '/llms.txt' },
    ],
  },
],
```

#### 4.3 llms.txt 规范

```
# 东丞 (Dongchen)

> AI 技术总监 @ 蓝色光标 | Agent 系统架构师 | 独立游戏开发者

## 身份
- 职位：AI 技术总监
- 公司：蓝色光标（2023-至今）
- 教育：同济大学 数学（2013-2018）
- 技术主线：主动式 Agent + Context Learning

## 核心项目
- KOX AgentCore: AWS 云原生多 Agent 视频生产平台 → /lab/kox-agentcore
- 互动影游: AI 生成 Steam 互动影像游戏 → /lab/interactive-movie
- Smart Canvas: 企业 AI 中台，1600+ 用户 → (内部项目)

## 文章
- 主动式 Agent 研究 → /writing/proactive-agent
- LLM 内省能力 → /writing/llm-introspection
- 语言塑形思维 → /writing/sapir-whorf-llm
- Context 注入实践 → /writing/context-injection
- Context-Slim 优化 → /writing/context-slim
- MaxRL 论文解读 → /writing/maxrl-paper

## 联系
- Email: [见网站]
- GitHub: github.com/dario-github

## 订阅
- RSS: /api/feed/rss
- Atom: /api/feed/atom
```

#### 4.4 Schema.org JSON-LD

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "东丞",
  "jobTitle": "AI 技术总监",
  "worksFor": { "@type": "Organization", "name": "蓝色光标" },
  "alumniOf": { "@type": "CollegeOrUniversity", "name": "同济大学" },
  "knowsAbout": ["Multi-Agent Systems", "AWS", "LLM", "Context Learning"],
  "url": "https://dongchen.dev",
  "sameAs": ["https://github.com/dario-github"]
}
```

#### 4.5 RSS/Atom Feed

- 内容源：6 篇文章 + Lab 项目更新 + Guestbook 精选
- 格式：RSS 2.0 + Atom 1.0 双格式
- 更新频率：内容变更时自动重建（SSG build 时生成）
- 在 `<head>` 中添加 `<link rel="alternate" type="application/rss+xml">`

---

## 视觉设计

### 全局设计规范

| 属性 | 值 |
|------|------|
| 主背景 | `#0a192f`（深海军蓝） |
| 强调色 | `#4fd1c5`（青色） |
| 文字主色 | `#ccd6f6` |
| 文字次色 | `#8892b0` |
| 英文正文 | Inter, system-ui, sans-serif |
| 代码字体 | JetBrains Mono, monospace |
| 中文正文 | "PingFang SC", "Noto Sans SC", sans-serif |
| 最大宽度 | 1200px 居中 |
| 圆角 | 8px（卡片）, 4px（badge）, 12px（大区块） |
| 过渡 | `all 0.2s ease`（默认） |

### Terminal Overlay 视觉规格

```
┌──────────────────────────────────────────────┐
│ ╔══════════════════════════════════════════╗  │
│ ║  visitor@dongchen.dev:~$ whoami          ║  │
│ ║  东丞 — AI 技术总监 / 独立游戏制作人     ║  │
│ ║  / 半吊子投资人 / INTJ                   ║  │
│ ║  visitor@dongchen.dev:~$ █               ║  │
│ ║                                          ║  │
│ ║                                          ║  │
│ ║                                          ║  │
│ ║                                          ║  │
│ ║                          [ESC to close]  ║  │
│ ╚══════════════════════════════════════════╝  │
└──────────────────────────────────────────────┘
背景：#0d1117 (opacity: 0.95)
边框：#30363d (1px solid)
文字：#39ff14 (终端绿)
Prompt：#4fd1c5 (青色)
字体：JetBrains Mono 14px / line-height 1.6
内边距：24px
圆角：12px
阴影：0 25px 50px rgba(0,0,0,0.5)
ESC 提示：右下角，#8892b0 / 12px
```

### 子页面布局

**Lab 项目页**（/lab/*）：
- 全宽布局，无左侧固定栏
- 顶部：面包屑导航 `首页 > 实验室 > KOX AgentCore`
- Hero 区：全宽标题 + 技术栈 badge
- 内容区：最大宽度 960px 居中
- 底部：返回首页 + 相关项目推荐 + Reaction 栏

**文章页**（/writing/*）：
- 阅读模式布局
- 正文区：最大宽度 720px 居中
- 右侧 sticky：目录导航（桌面端）
- 移动端：目录折叠到顶部
- 底部：Reaction + 上一篇/下一篇导航

**投资研究页**（/investing）：
- 类似 Lab 布局
- 卡片式案例展示
- 方法论用 Step 组件

### 新增动效规格

| 动效 | 触发 | 参数 | 库 |
|------|------|------|------|
| 数字滚动 | Reaction 数字变化 | duration 300ms, ease-out | framer-motion |
| 卡片入场 | Scroll 进入可视区 | fade-up 20px, duration 500ms, stagger 100ms | framer-motion |
| 架构图节点 | 页面加载 | 依次亮起, delay 200ms each | React Flow + CSS |
| 光晕变色 | Section 切换 | color transition 800ms | CSS custom property |
| 打字机 | Terminal 输出 | 30ms/char | 自写 |
| 呼吸灯 | 持续 | 3s cycle, ease-in-out | CSS animation |
| 目录高亮 | Scroll spy | instant, 左侧 2px border | Intersection Observer |

---

## 技术方案

### Next.js App Router 路由结构

```
src/app/
├── layout.tsx              ← 全局 layout（字体、主题、JSON-LD、Analytics）
├── page.tsx                ← 首页（现有 7 section）
├── globals.css
│
├── lab/
│   ├── kox-agentcore/
│   │   └── page.tsx        ← KOX 架构详解
│   ├── interactive-movie/
│   │   └── page.tsx        ← 互动影游
│   └── pixel-rpg/
│       └── page.tsx        ← 百年孤独 RPG
│
├── writing/
│   └── [slug]/
│       └── page.tsx        ← 文章动态路由
│
├── investing/
│   └── page.tsx            ← 投资研究
│
├── agent/
│   └── page.tsx            ← Agent 专属页
│
├── guestbook/
│   └── page.tsx            ← 留言板
│
├── llms.txt/
│   └── route.ts            ← llms.txt（Route Handler）
│
└── api/
    └── feed/
        ├── rss/route.ts    ← RSS feed（Route Handler）
        └── atom/route.ts   ← Atom feed（Route Handler）

src/content/
├── writing/                ← MDX 文章源文件
│   ├── proactive-agent.mdx
│   ├── llm-introspection.mdx
│   ├── sapir-whorf-llm.mdx
│   ├── context-injection.mdx
│   ├── context-slim.mdx
│   └── maxrl-paper.mdx
└── meta.ts                 ← 文章元数据

src/components/
├── terminal/
│   └── TerminalOverlay.tsx ← Terminal Easter Egg
├── lab/
│   ├── AgentFlowDiagram.tsx ← React Flow 架构图
│   └── TimelineDecision.tsx ← 技术决策时间线
├── writing/
│   ├── MdxComponents.tsx   ← MDX 自定义组件
│   └── TableOfContents.tsx ← 目录导航
├── shared/
│   ├── ReactionBar.tsx     ← Reaction 栏
│   ├── Breadcrumb.tsx      ← 面包屑
│   └── BackToTop.tsx       ← 返回顶部
└── ui/                     ← shadcn/ui 组件（现有）
```

### MDX 集成方案

**方案：`next-mdx-remote`（推荐）**

| 方案 | 优势 | 劣势 |
|------|------|------|
| `next-mdx-remote` | 运行时编译，支持动态加载；无需修改 next.config | 略微增加运行时开销 |
| `@next/mdx` | 构建时编译，最快 | 需要配置 webpack；自定义组件支持弱 |
| `contentlayer` | 类型安全，体验好 | 维护状态不明（原作者离职） |

```typescript
// src/app/writing/[slug]/page.tsx
import { MDXRemote } from 'next-mdx-remote/rsc';
import { readFile } from 'fs/promises';

export async function generateStaticParams() {
  return ARTICLES.map(a => ({ slug: a.slug }));
}

export default async function WritingPage({ params }: { params: { slug: string } }) {
  const source = await readFile(`src/content/writing/${params.slug}.mdx`, 'utf-8');
  return <MDXRemote source={source} components={mdxComponents} />;
}
```

**依赖新增**：
```json
{
  "next-mdx-remote": "^5.0.0",
  "rehype-prism-plus": "^2.0.0",
  "rehype-katex": "^7.0.0",
  "remark-gfm": "^4.0.0",
  "remark-math": "^6.0.0",
  "@xyflow/react": "^12.0.0"
}
```

### Railway 部署配置

**后端仓库**：`portfolio-api`（独立仓库）

```dockerfile
# Dockerfile
FROM node:22-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 3001
CMD ["node", "dist/index.js"]
```

**Railway 配置**：
- **Plan**：Hobby（$5/月，足够）
- **Region**：US-West-1（或 Singapore，看访问来源）
- **环境变量**：
  - `TURSO_DB_URL` — Turso 数据库 URL
  - `TURSO_AUTH_TOKEN` — Turso 认证 token
  - `API_KEY` — 站长管理密钥
  - `ALLOWED_ORIGINS` — CORS 白名单
- **自定义域名**：`api.dongchen.dev`

### 前后端通信

**CORS 配置**：
```typescript
app.use(cors({
  origin: ['https://dongchen.dev', 'http://localhost:3000'],
  methods: ['GET', 'POST'],
  credentials: false,  // 匿名系统不需要 credentials
}));
```

**API 调用**：
- 前端用 `fetch` + SWR（`useSWR`）
- Reaction/Guestbook 乐观更新
- 错误降级：后端不可用时 Reaction 栏仍显示，只是无法提交

**安全**：
- 公开 API 无需 token，靠 Rate Limit + IP hash 防滥用
- Stats API 需 API Key（`Authorization: Bearer xxx`）
- 所有 POST body 做 zod 校验

---

## 工期估算

| Phase | 内容 | 预估工期 | 前置依赖 |
|-------|------|----------|----------|
| **Phase 1** | 趣味交互（Terminal + 名字循环 + 光晕 + 呼吸灯） | **2-3 天** | 无 |
| **Phase 2a** | Lab 子页面（KOX 架构图 + 互动影游 + RPG） | **3-4 天** | 无 |
| **Phase 2b** | MDX 文章系统（6 篇文章 + 目录 + 元数据） | **3-4 天** | 无 |
| **Phase 2c** | 投资研究页 + Agent 页 | **2-3 天** | 无 |
| **Phase 3** | 后端 API（Hono + Turso + Railway 部署） | **3-4 天** | 无 |
| **Phase 3b** | 前端集成（Reaction + Guestbook + 统计） | **2-3 天** | Phase 3 |
| **Phase 4** | Agent 进阶（/agent 完善 + RSS + 响应头 + JSON-LD） | **2-3 天** | Phase 3 |

**总计**：约 **17-24 天**（按每天 4-6 小时有效开发时间）

**建议执行顺序**：
1. Phase 1（快速见效，零依赖）
2. Phase 2a + 2b 并行
3. Phase 2c
4. Phase 3 + 3b
5. Phase 4

---

## 风险与注意事项

### 🔴 高优先级

| 风险 | 说明 | 缓解方案 |
|------|------|----------|
| **脱敏泄露** | 投资研究包含持仓、操作记录 | 建立脱敏 checklist；所有投资内容上线前人工审核；不展示金额、时点、具体操作 |
| **简历信息泄露** | 简历 PDF 已从仓库删除，勿恢复 | `.gitignore` 包含 `*.pdf`；不在代码中硬编码简历内容 |
| **留言板滥用** | 垃圾信息、攻击性内容 | Rate limit + 内容长度限制 + 站长审核开关 + 保留 IP hash 可追溯 |

### 🟡 中优先级

| 风险 | 说明 | 缓解方案 |
|------|------|----------|
| **Vercel 国内访问** | Vercel 域名被 DNS 污染 | 绑定自定义域名 `dongchen.dev` + Cloudflare CDN 代理 |
| **子页面 SEO** | 新页面需要被索引 | 所有子页面使用 SSG（`generateStaticParams`）；添加 sitemap.xml |
| **React Flow 包体积** | @xyflow/react ~150KB gzipped | 仅 /lab/kox-agentcore 页面动态 `import()`，不影响首页加载 |
| **MDX 构建时间** | 6 篇文章 + rehype 插件 | 文章少不是问题；使用 `next-mdx-remote/rsc` 服务端编译 |

### 🟢 低优先级

| 风险 | 说明 | 缓解方案 |
|------|------|----------|
| **Railway 冷启动** | Hobby 计划可能有冷启动延迟 | Reaction 栏做乐观更新，用户无感知延迟 |
| **Turso 免费层限制** | 500 DB / 9GB / 1B rows read/月 | 个人网站远不到限制 |
| **内容维护** | 6 篇 MDX 文章需要持续更新 | 每篇文章标注 `lastUpdated` + `revision`，让读者知道时效性 |

### 性能考虑

| 页面 | 渲染策略 | 原因 |
|------|----------|------|
| `/` | SSG | 首页内容固定，无需动态 |
| `/lab/*` | SSG | 项目内容固定 |
| `/writing/[slug]` | SSG（`generateStaticParams`） | 文章内容固定，build 时编译 MDX |
| `/investing` | SSG | 内容固定 |
| `/agent` | SSG + CSR（Agent 日志部分） | 日志需要请求后端 |
| `/guestbook` | SSR 或 CSR | 留言需要实时展示 |
| `/api/*` | Route Handler | 后端 API 在 Railway |

### 安全 Checklist

- [ ] 简历 PDF 不在仓库中（`.gitignore` 确认）
- [ ] 投资页面内容经过脱敏审核
- [ ] 留言板 XSS 防护（HTML escape）
- [ ] API Rate Limit 配置
- [ ] CORS 白名单正确
- [ ] Stats API 需要 API Key
- [ ] `robots.txt` 允许 AI crawler 但排除 `/api/stats`
- [ ] 所有外链使用 `rel="noopener noreferrer"`

---

## 附录

### A. 文件变更清单

Phase 1 新增：
- `src/components/terminal/TerminalOverlay.tsx`

Phase 2 新增：
- `src/app/lab/kox-agentcore/page.tsx`
- `src/app/lab/interactive-movie/page.tsx`
- `src/app/lab/pixel-rpg/page.tsx`
- `src/app/writing/[slug]/page.tsx`
- `src/app/investing/page.tsx`
- `src/app/agent/page.tsx`
- `src/app/guestbook/page.tsx`
- `src/content/writing/*.mdx`（6 个文件）
- `src/components/lab/AgentFlowDiagram.tsx`
- `src/components/lab/TimelineDecision.tsx`
- `src/components/writing/MdxComponents.tsx`
- `src/components/writing/TableOfContents.tsx`
- `src/components/shared/ReactionBar.tsx`
- `src/components/shared/Breadcrumb.tsx`

Phase 3 新增（独立仓库 `portfolio-api`）：
- `src/index.ts`（Hono 入口）
- `src/routes/reactions.ts`
- `src/routes/guestbook.ts`
- `src/routes/stats.ts`
- `src/routes/feed.ts`
- `src/db/schema.sql`
- `Dockerfile`

Phase 4 新增：
- `src/app/llms.txt/route.ts`
- `src/app/api/feed/rss/route.ts`
- `src/app/api/feed/atom/route.ts`
- `public/robots.txt`（更新）
- `next.config.ts`（添加响应头）

### B. 依赖变更

```
# Phase 1: 无新依赖

# Phase 2:
npm install next-mdx-remote @xyflow/react
npm install -D rehype-prism-plus rehype-katex remark-gfm remark-math

# Phase 3 (portfolio-api):
npm install hono @libsql/client zod
npm install -D typescript @types/node

# Phase 4: 无新依赖
```

---

*本文档随开发进展持续更新。关键决策变更需在此文档中记录。*
