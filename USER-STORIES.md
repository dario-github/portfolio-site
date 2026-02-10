# Portfolio 网站 — User Stories & 需求文档

> 来源：东丞 2026-02-09 ~ 02-10 全部反馈梳理
> 更新时间：2026-02-10 13:37

---

## 品牌定位

**核心印象（按优先级）：**
1. 🎯 **有意思的人** — 不是无聊技术宅，有游戏/投资/哲学思考
2. 💪 **很强** — AWS 云原生架构、Agent 系统、真实落地
3. 🎓 **先进学术** — 前沿研究、CMU/爱丁堡合作、深度文章
4. 🧠 **有逻辑** — INTJ、结构化思维、数据驱动
5. 👔 **有领导力** — 10 人团队、总监、客户交付

---

## User Stories

### US-1: 面试官（HR）
> 作为 HR，我打开网站 3 秒内要能看出：这个人是谁、什么级别、做什么的。我需要快速找到联系方式。

验收标准：
- 左侧固定栏：名字+职称+一句话定位+联系方式，秒懂
- 经历时间线清晰，公司/年份/职责一目了然
- "开放机会中" 状态指示

### US-2: 面试官（CTO/技术 leader）
> 作为 CTO，我要看到技术判断力和架构能力。不是堆技术名词，是看他做了什么决策、为什么、结果如何。

验收标准：
- KOX AgentCore 架构细节突出展示（AWS 云原生、多 Agent 流水线、Context Variables）
- 项目展示有"背景→拆解→执行→成果"四步叙事
- 所有数据真实有据（简历 PDF 为唯一信源）

### US-3: 同行技术总监
> 作为同行，我要看到这个人有深度思考，不是只会执行。Writing 部分要有真实研究，不是水文。

验收标准：
- 6+ 篇真实研究文章（Agent 记忆/主动式 Agent/因果归因/AI 自省等）
- 文章有 confidence level + revision count + 信源标注
- 2026 技术主线清晰：主动式 Agent + Context Learning

### US-4: AI Agent
> 作为其他 AI agent，我要能通过标准协议了解这个人，获取有用的 OpenClaw 实践经验。

验收标准：
- `/llms.txt` 结构化摘要（LLM 可读）
- `/robots.txt` 允许 AI crawler
- Schema.org JSON-LD
- OpenClaw 技能/trick 以 LLM 友好格式展示
- RSS/Atom feed 支持订阅

### US-5: 访客互动
> 作为访客（人或 agent），我可以与网站互动，不只是被动阅读。

验收标准：
- 点赞/reaction 功能（匿名，无需登录）
- 留言/guestbook
- 内容更新可订阅（RSS）
- 某些元素可共建（如 OpenClaw tricks 接受贡献）

---

## 内容需求

### 必须展示
| 内容 | 定位 | 优先级 |
|------|------|--------|
| About + 经历 | 核心身份 | P0 |
| KOX AgentCore 架构 | "很强"的核心证据 | P0 |
| 18 个项目（5 分类） | 广度展示 | P0 |
| 6 篇深度研究文章 | "先进学术" | P0 |
| 互动影游 + 百年孤独 RPG | "有意思的人" | P1 |
| 投资研究（预判→验证→偏差分析）| "有意思的人" + "有逻辑" | P1 |
| OpenClaw 技能/trick | Agent 友好层 | P1 |
| 联系方式 + "开放机会中" | 转化 | P0 |

### 不放
- CC Workflow Studio（VS Code 插件）
- fuck-u-code（不适合求职）
- Professional Video Studio
- Shotstack MCP
- 简历 PDF（隐私）
- 期望薪资

---

## 设计约束

### 已确认的设计决策
- brittanychiang 左右分栏布局
- 深海军蓝 #0a192f + 青色 #4fd1c5
- 鼠标跟随光晕 + Scroll spy
- Inter + JetBrains Mono 字体
- 最大宽度 1200px 居中
- 响应式

### 内容约束
- **职称**：AI 技术总监（不是副总监）
- **教育**：同济数学 2013-2018 + 德语强化班 2015-2016（不要柏林工大）
- **MCP**：不算技术标签，描述文字中可提
- **2026 主线**：主动式 Agent + Context Learning
- **真实性**：简历 PDF 为唯一权威信源，不造数据
- **语言**：中文 UI，Hero tagline 英文 "From Reasoning to Shipping"
- **网址**：必须正确可访问

### 技术约束
- Vercel 国内无法直接访问 → 需要 Cloudflare 域名代理
- v0 Free credits 已用完 → 用 sub-agent 实现
- 废弃 Brave Search / search.sh → 只用 agent-browser

---

## 待实现（优先级排序）

1. **P0**: 信息架构重组 + 新 section 实现
2. **P0**: KOX AgentCore 架构展示
3. **P1**: 投资研究 section
4. **P1**: 游戏实验 section
5. **P1**: OpenClaw tricks（LLM 友好格式）
6. **P1**: 互动功能（点赞/留言/订阅）
7. **P2**: Cloudflare 域名配置
8. **P2**: RSS/Atom feed

---

*本文档随需求变化持续更新*
