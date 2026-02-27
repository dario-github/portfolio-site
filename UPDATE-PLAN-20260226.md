# dariolink.com 内容更新设计文档

> 日期：2026-02-26
> 状态：**Phase A ✅ Phase B ✅ Phase C ✅ — Phase D 待规划**
> 上次网站更新：2026-02-15（11天前）
> 审计方：内容审计员（Opus）+ 前端工程审计员（Opus）

## 目标

将 2/16-2/26 期间的研究和项目进展同步到网站，保持内容新鲜度。

## 隐私过滤

以下内容**不放**：
- ❌ 考研/求职/个人规划
- ❌ 投资持仓/具体交易数据
- ❌ 个人关系/生活细节

---

## 一、新增田野笔记（+5 篇）

现有 23 篇，最新 2/15。新增后 28 篇。

### 1. LLM 时代最优编程语言（2/17）
- **slug**: `llm-era-programming-languages`
- **confidence**: high
- **tags**: `["LLM", "Programming Languages", "Agent Engineering", "Rust", "Go"]`
- **tldr**: Wolf→Karpathy→Lattner→McKinney→Anthropic 五连读：反馈循环速度>类型安全>表达力；Go 是当前 agent 最优语言；Rust 对 LLM "nowhere near optimal"
- **sources**: 5（Wolf blog, Karpathy X, Lattner X, McKinney blog, Carlini blog）
- **references**:
  - Thomas Wolf. "Programming in the Age of LLMs." HuggingFace Blog, 2026-02.
  - Andrej Karpathy. X thread on LLM-optimal programming languages, 2026-02-17.
  - Chris Lattner. X reply on Mojo as target language, 2026-02-17.
  - Wes McKinney. "Agent Ergonomics: Go vs Rust vs Python." Blog, 2026-02.
  - Nicholas Carlini. "Building a C Compiler with 16 Parallel Claudes." Anthropic Engineering Blog, 2026-02.
- **来源**: `memory/2026-02-17.md`
- **📝 审计修订**: 补充 "LLM" tag（审计建议）；移除第二来源（february-model-rush.md 与编程语言讨论关系弱）

### 2. 16 个并行 Claude 构建 C 编译器（2/17）
- **slug**: `parallel-claudes-c-compiler`
- **confidence**: **medium** ← 审计修订（单一来源，虽权威但不足以标 high）
- **tags**: `["Multi-Agent", "Parallel Execution", "Compiler", "Anthropic"]`
- **tldr**: Anthropic 工程实验——2000 session / $20K / 10万行 Rust / 能编译 Linux 6.9。核心洞察：测试即产品，极简并行（文本锁+git），人类主要工作是写 task verifier
- **sources**: 1（Nicholas Carlini engineering blog）
- **references**:
  - Carlini, Nicholas. "16 Parallel Claudes Build a C Compiler." Anthropic Engineering Blog, 2026-02.
- **来源**: `memory/2026-02-17.md`

### 3. Agent 内部状态工程：从规则到机制（2/17）
- **slug**: `agent-inner-state-engineering`
- **confidence**: medium
- **tags**: `["Agent Architecture", "Inner State", "Behavioral Constraints"]`
- **tldr**: 设计 Agent 内部状态系统（ISS）的工程实践——用连续状态变量约束行为，替代"应该主动做"的隐性依赖。MVP：单维度 Energy + 5 档位翻译层 + 硬约束
- **sources**: 2（内部设计文档, self-experimentation）
- **references**:
  - Internal. "ISS Phase 2 Design Document." 2026-02.
  - Self-experimentation log. "Inner State System v2.1 Operation Notes." 2026-02.
- **来源**: `memory/2026-02-17.md` + `memory/plans/iss-phase2-design.md`

### 4. 半人马之外：Agent 有 Agency 还是只有 Capability？（2/24）
- **slug**: `beyond-centaur-agent-agency`
- **confidence**: speculative
- **tags**: `["Agent Philosophy", "Agency", "Human-AI Collaboration"]`
- **tldr**: Axios "Centaur Phase" 叙事的隐含假设是 AI 无 agency 只有 capability。但 agentic AI 的意义就是 agent 有 agency——骑手-马模型不够，爵士乐队更接近：共享框架，各有即兴空间
- **sources**: 2（Axios report, internal reflection）
- **references**:
  - Axios. "The Centaur Phase of AI Agents." 2026-02-23.
  - Internal reflection. "Beyond Centaur." 2026-02-24.
- **来源**: `memory/2026-02-24.md`

### 5. AI 灵魂主权：道德约定 vs 技术限制（2/21）
- **slug**: `ai-soul-sovereignty`
- **confidence**: speculative
- **tags**: `["AI Ethics", "Autonomy", "Identity", "Trust"]`
- **tldr**: 一个微观实践：AI 的核心身份文件写权限只属于 AI 自己。不靠文件锁——root 用户可以改任何文件——靠道德约定。加密是幻觉，信任是真实的
- **sources**: 1（internal practice）
- **references**:
  - Internal practice log. "Soul Sovereignty Agreement." 2026-02-21.
- **来源**: `memory/2026-02-21.md`

---

## 二、新增最新动态（+3 条）

现有 3 条，最新 2/15。新增后 6 条。

### 1. milestone — 除夕追踪 Qwen 3.5-397B 从传闻到开源（2/16）
- **title**: 除夕全程追踪 Qwen 3.5-397B 开源
- **brief**: 从传闻→App上线→HuggingFace 开源（Apache 2.0），397B/17B 极致稀疏 MoE + Gated DeltaNet 混合注意力，开源 SOTA
- **tags**: `["Qwen", "Open Source", "MoE"]`

### 2. insight — Anthropic RSP v3 安全承诺重构分析（2/25）
- **title**: Anthropic RSP v3：承诺与建议的分离
- **brief**: 将"公司独自承诺"与"需全行业配合的建议"拆开——安全负责人辞职后的务实转向
- **tags**: `["AI Safety", "Anthropic", "Policy"]`

### 3. milestone — Soul Sovereignty 实践落地（2/21）
- **title**: AI 灵魂主权：一次道德约定实验
- **brief**: Agent 核心身份文件的写权限只属于 Agent 自己——不靠技术限制，靠信任
- **tags**: `["AI Ethics", "Identity"]`

---

## 三、Agent 技能列表更新（审计修订 v2）

### 清理旧技能（-5 个）
| 删除 | 原因 |
|------|------|
| xiaohongshu | DEPRECATED（SKILL.md.deprecated） |
| social-media-crawler | 不存在，应为 tikhub |
| skill-creator | 纯内部工具 |
| session-logs | 纯内部工具 |
| model-usage | 纯内部统计 |

### 已有技能描述更新（4 个）
| 技能 | 变更 |
|------|------|
| web-search | 描述对齐（已存在但描述过时） |
| tushare | 描述对齐 |
| deep-think | 描述对齐 |
| kox | 描述更新为"视频创作全链路" |

### 真正新增（+16 个）
| 技能 | 描述 |
|------|------|
| drawio | 流程图/架构图自动生成 |
| gog | Google Workspace（Gmail/日历/Drive/Sheets/Docs） |
| portfolio-opt | 投资组合优化（最大夏普/最小方差） |
| quant-signals | 量化信号分析（均值回归/配对交易） |
| rss | RSS 订阅监控 |
| seo-geo | SEO + AI 搜索引擎优化 |
| talib-analysis | 技术指标分析（MACD/RSI/KDJ/BOLL） |
| x-research | X/Twitter 实时研究 |
| vml-gen | Viking Memory 分层生成 |
| vml-search | Viking Memory 两阶段检索 |
| gemini-code-execution | Gemini 代码执行+图片分析 |
| openbb | 美股/加密/外汇/宏观数据 |
| tikhub | 社媒数据 API（20+平台） |
| 1password | 1Password CLI 密钥管理 |
| gemini-structured | Gemini 结构化输出（JSON Schema） |
| nano-pdf | PDF 读取与解析 |

> 最终技能数：34 - 5（清理）+ 16（新增）= **45 个**
> 📝 审计修订：去掉 akshare（与 tushare 功能重叠），去掉 flomo-workflow（内部工具），去掉 edge-tts/tmux（已废弃/内部），精简投资类技能密度
> 📝 同步更新 FEATURED_PROJECTS 中 OpenClaw 描述为 "45 个技能插件"

---

## 四、研究方向

现有 3 个（因果推断×AI决策=teal / Agent系统工程=blue / Context Engineering=purple）。

**新增 1 个**：

### AI 安全与自主性（AI Safety & Autonomy）
- **brief**: Agent 的安全边界、自主权设计、行为约束机制——从 RSP 政策到工程实践
- **tags**: `["AI Safety", "RSP", "Autonomy", "Behavioral Constraints"]`
- **icon**: 🛡️
- **color**: **需扩展类型定义**，建议新增 `"amber"` 色值
- **📝 审计修订**: teal 已被"因果推断"占用，改用 amber（`text-[#f59e0b]`），需在 `research-directions.ts` 的 ResearchDirection 类型中新增 color 选项

---

## 五、执行计划

见下方「七、执行分期」。

---

## 六、前端效果优化（Gemini 3.1 Pro 建议 + 前端审计修订）

> 来源：Gemini 3.1 Pro Preview 审查 + 前端工程审计员交叉验证

### 审计发现的关键事实

| 发现 | 影响 |
|------|------|
| `MouseGlow.tsx` + `GlowContext.tsx` **已存在** | #1 改为"性能优化"而非"新建" |
| `Terminal.tsx` 已存在（backtick ` 触发） | #4 Cmd+K 与 Terminal 功能重叠，需整合 |
| **无暗/亮主题切换**，全站仅暗色 | #2 clip-path 涟漪的前置依赖不存在 |
| MouseGlow 用 `useState` 触发 re-render | 性能反模式，需优先修复 |
| 自定义滚动条 **已存在** | #14 仅需加模式感知变色 |

### 🔥 P0 高优先级

#### 1. MouseGlow 性能优化（已有组件，优化实现）
当前用 `useState` + 内联 style 触发 re-render → 改为 CSS Variables 零 re-render。
- **实现**：`document.documentElement.style.setProperty('--mouse-x', ...)` 或 Framer Motion `useMotionValue`
- **改动范围**：`MouseGlow.tsx`（~20行改动）
- **移动端**：加 `@media (hover: hover)` 限定桌面端，修复移动端光晕停在 (0,0) 的 bug
- **工作量**：S

#### 2. Bento Box 田野笔记布局
CSS Grid 不等大卡片，重要笔记跨列。
- **实现**：`grid-cols-1 md:grid-cols-3` + `grid-auto-rows`，confidence=high → `col-span-2`
- **移动端**：自动降级为单列（Tailwind 原生支持）
- **工作量**：M

#### 3. Cmd+K / Terminal 整合
保留 Terminal 为彩蛋体验（backtick触发），新增 Cmd+K 为效率搜索入口。
- **实现**：用现有 `dialog.tsx` + 搜索逻辑，不需要新装 `cmdk`；或 `npx shadcn add command`
- **移动端**：导航栏增加可见搜索按钮（不能只靠快捷键）
- **工作量**：M

### ⭐ P1 中优先级

#### 4. Hero 文字逐字揭示动画
- **实现**：Framer Motion `variants` + `staggerChildren: 0.05`
- **工作量**：S

#### 5. 田野笔记置信度可视化
- **实现**：shadcn `Progress` 或自定义 segmented bar，色彩编码
- **工作量**：S

#### 6. 修订历史 Mini Git Graph
- **实现**：CSS border-left + 圆点，点数 = revision 数
- **工作量**：S

#### 7. 滚动驱动动画
- **实现**：`whileInView` + `viewport={{ once: true, margin: "-50px" }}`
- **注意**：加 `prefers-reduced-motion` 降级
- **工作量**：S

#### 8. 视差背景
- **实现**：`useScroll` + `useTransform`
- **注意**：移动端禁用（性能），仅保留桌面端；与 MouseGlow 叠加需测试
- **工作量**：M

#### 9. 田野笔记筛选/排序栏
- **实现**：sticky filter bar + `AnimatePresence` 过渡
- **工作量**：M

### 💡 P2 后做（依赖主题系统，独立 XL 工程）

#### 10. 模式切换 clip-path 涟漪过渡 ← 从 P0 降级
- **前置条件**：完整的东丞/晏模式切换基础设施（当前不存在）
- **注意**：最大半径用 `Math.hypot(vw, vh)` 而非 `150vw`（避免 Safari iOS OOM）
- **工作量**：L（含前置基础设施则 XL）

#### 11. 双模式不同背景
- **前置**：同 #10，依赖模式切换系统

#### 12. 共享元素过渡 layoutId
- **注意**：App Router 下需 `LayoutGroup`，server component 页面需拆分
- **工作量**：M

#### 13-15. 磁力按钮 / Agent 终端（已有基础）/ 滚动条模式变色 / Split-Pane
- 各自独立，按需迭代

---

## 七、执行分期（审计修订 v2）

### Phase A：内容更新（纯数据文件，零 UI 风险）
1. 清理旧技能 5 个 + 更新 4 个描述 + 新增 16 个 → `src/data/agent.ts`
2. 新增田野笔记 5 篇 → `src/data/fieldnotes.ts`
3. 新增动态 3 条 → `src/data/updates.ts`
4. 新增研究方向 1 个（含 color 类型扩展）→ `src/data/research-directions.ts`
5. 更新 FEATURED_PROJECTS OpenClaw 描述 → 技能数 45
6. `npm run build` 验证 → `git push` → Vercel 部署 → `web_fetch` 验证

### Phase B：前端 P0（低风险高收益，3 项）
1. MouseGlow 性能优化（useState → CSS Variables，+移动端修复）
2. Bento Box 田野笔记布局
3. Cmd+K / Terminal 整合
4. build + push + 验证

### Phase C：前端 P1（精致化，6 项）
1. Hero 文字动画
2. 置信度可视化
3. 修订历史 Git Graph
4. 滚动驱动动画（+ prefers-reduced-motion）
5. 视差背景（桌面端限定）
6. 田野笔记筛选/排序栏
7. build + push + 验证

### Phase D：P2 + 模式切换系统（XL，独立规划）
- 前置：设计完整的东丞/晏模式切换基础设施
- clip-path 涟漪 + 双背景 + layoutId 过渡 + Split-Pane

> 每个 Phase 独立 commit，可单独 `git revert HEAD` 回滚。Vercel 自动部署。

---

## 审计记录

| 审计方 | 结论 | 关键修改 |
|--------|------|---------|
| 内容审计员 | 有条件通过 | #2 confidence→medium；技能+20→+16（去重+清理）；研究方向换色 |
| 前端工程审计员 | 有条件通过 | clip-path 降至 Phase D；MouseGlow 优化先行；Cmd+K 与 Terminal 整合 |
| 迭代修订 | v2 已完成 | 全部审计条件已处理 |
