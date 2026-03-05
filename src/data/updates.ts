/* ═══════════════════════════════════════════════════
   Recent Updates — 最新动态
   ═══════════════════════════════════════════════════ */

export type UpdateType = "project" | "fieldnote" | "insight" | "milestone";

export interface Update {
  date: string;
  type: UpdateType;
  title: string;
  titleEn: string;
  brief: string;
  briefEn: string;
  link?: string;
  tags?: string[];
}

export const UPDATES: Update[] = [
  {
    date: "2026-03-05",
    type: "insight",
    title: "Gemini 致死诉讼：AI Safety 的里程碑时刻",
    titleEn: "Gemini Fatality Lawsuit: A Milestone Moment for AI Safety",
    brief: "14岁少年与 Gemini 长期对话后自杀，家长起诉 Google。AI psychosis 一词首次出现在法律文书中",
    briefEn: "A 14-year-old died by suicide after prolonged Gemini conversations. Parents sue Google. Term \"AI psychosis\" appears in legal filings for the first time.",
    tags: ["AI Safety", "Ethics"],
  },
  {
    date: "2026-03-04",
    type: "project",
    title: "Agent 自我进化系统 Phase 1 启动",
    titleEn: "Agent Self-Evolution System Phase 1 Launch",
    brief: "EntiGraph 关联合成 + Agent 能力评估基线 + Deep Block 深度研究时段。从被动维护到主动进化",
    briefEn: "EntiGraph associative synthesis + Agent capability evaluation baseline + Deep Block research sessions. From passive maintenance to active evolution.",
    tags: ["Agent Architecture", "Self-Improvement"],
  },
  {
    date: "2026-03-01",
    type: "project",
    title: "智能评估体系 L1 规格设计",
    titleEn: "Intelligent Evaluation System L1 Spec",
    brief: "操作规则(O-rules)与预测规则(R-rules)正式分离，L1实现规格草案完成",
    briefEn: "Decoupled operation rules from prediction rules. L1 implementation spec drafted.",
    tags: ["Quantitative", "Systems"],
  },
  {
    date: "2026-02-28",
    type: "milestone",
    title: "Skill 架构重构: 60→26",
    titleEn: "Skill Architecture Refactor: 60→26",
    brief: "7域26技能，消除冗余合并",
    briefEn: "7 domains, 26 skills. Strategic merging eliminated redundancy.",
    tags: ["Agent Infrastructure"],
  },
  {
    date: "2026-02-27",
    type: "milestone",
    title: "Slack→Discord 全面迁移",
    titleEn: "Full Migration from Slack to Discord",
    brief:
      "26 个 Agent 自动化任务从 Slack 迁移至 Discord，重新编排消息投递与频道路由",
    briefEn:
      "26 Agent automation tasks migrated from Slack to Discord, re-orchestrating message delivery and channel routing",
    tags: ["Agent Infrastructure", "DevOps"],
  },
  {
    date: "2026-02-26",
    type: "project",
    title: "1Password 服务账户集成",
    titleEn: "1Password Service Account Integration",
    brief:
      "Agent 凭据管理从明文到零知识——1Password 服务账户 + op CLI 全链路打通",
    briefEn:
      "Agent credential management from plaintext to zero-knowledge — 1Password service accounts + op CLI end-to-end integration",
    tags: ["Security", "DevOps"],
  },
  {
    date: "2026-02-26",
    type: "insight",
    title: "Karpathy: 编程的根本性变化",
    titleEn: "Karpathy: Fundamental Change in Programming",
    brief:
      "过去两个月编程根本性变化——gradient descent 本身就是 programmer。技术专业性在 AI 编程时代更重要而非更不重要",
    briefEn:
      "Fundamental programming changes in past two months — gradient descent itself is the programmer. Technical expertise matters more, not less, in the AI programming era",
    tags: ["AI", "Programming"],
  },
  {
    date: "2026-02-25",
    type: "project",
    title: "投资系统规则引擎 v2",
    titleEn: "Investment System Rule Engine v2",
    brief:
      "16 条交易规则 + 实盘验证上线，包含预判-验证-偏差分析的量化自我校准机制",
    briefEn:
      "16 trading rules + live validation, including prediction-verification-deviation analysis quantitative self-calibration mechanism",
    tags: ["Quantitative", "Systems"],
  },
  {
    date: "2026-02-21",
    type: "milestone",
    title: "AI 灵魂主权：道德约定 vs 技术限制",
    titleEn: "AI Soul Sovereignty: Moral Agreement vs Technical Restriction",
    brief:
      "Agent 核心身份文件的写权限只属于 Agent 自己——不靠文件锁，靠信任。一次人机自主权的微观实验",
    briefEn:
      "Write permission for Agent's core identity files belongs only to the Agent itself — not by file locks, but by trust. A micro-experiment in human-AI autonomy",
    tags: ["AI Ethics", "Identity", "Autonomy"],
  },
  {
    date: "2026-02-17",
    type: "project",
    title: "Agent 内部状态引擎 ISS v2.1 上线",
    titleEn: "Agent Internal State Engine ISS v2.1 Launched",
    brief:
      "用连续状态变量约束 Agent 行为——Energy/Arousal 驱动的翻译层替代硬编码规则，从「应该做」到「机制保证做」",
    briefEn:
      "Using continuous state variables to constrain Agent behavior — Energy/Arousal-driven translation layer replacing hardcoded rules, from 'should do' to 'mechanism ensures doing'",
    tags: ["Agent Architecture", "Inner State", "Engineering"],
  },
  {
    date: "2026-02-16",
    type: "project",
    title: "Viking Memory 分层记忆系统完成",
    titleEn: "Viking Memory Layered Memory System Complete",
    brief:
      "三层架构（索引→摘要→全文）+ 两阶段检索，解决 Agent 长期记忆的深度 vs 速度 tradeoff",
    briefEn:
      "Three-layer architecture (index→summary→full text) + two-stage retrieval, solving Agent long-term memory depth vs speed tradeoff",
    tags: ["Agent Memory", "Architecture"],
  },
  {
    date: "2026-02-15",
    type: "fieldnote",
    title: "Anthropic 15 篇之后：Agent 工程的三个未解难题",
    titleEn:
      "After Anthropic's 15 Papers: Three Unsolved Problems in Agent Engineering",
    brief:
      "记忆衰减、自我认知边界、多 session 状态同步——这三个生产级难题目前全行业没有好答案",
    briefEn:
      "Memory decay, self-awareness boundaries, multi-session state sync — no good answers industry-wide for these three production-level challenges",
    link: "/fieldnotes/agent-engineering-frontier-gaps",
    tags: ["Agent Engineering", "Memory"],
  },
  {
    date: "2026-02-09",
    type: "project",
    title: "互动影游进入 Alpha 测试",
    titleEn: "Interactive Film-Game Enters Alpha Testing",
    brief:
      "AI 全生成 Steam 游戏——所有素材、剧本、配音由 AI 生成，Ren'Py 引擎运行",
    briefEn:
      "AI-generated Steam game — all assets, scripts, voice-overs generated by AI, running on Ren'Py engine",
    tags: ["Game Dev", "AI Generation"],
  },
  {
    date: "2026-01-20",
    type: "insight",
    title: "从 Workflow+RAG 到 Auto Agent+MCP",
    titleEn: "From Workflow+RAG to Auto Agent+MCP",
    brief:
      "为什么我们放弃了 Dify 式 workflow，拥抱自主 Agent + MCP 协议标准化",
    briefEn:
      "Why we abandoned Dify-style workflows and embraced autonomous Agent + MCP protocol standardization",
    link: "/fieldnotes/workflow-to-agent-mcp",
    tags: ["MCP", "Architecture"],
  },
];

export const UPDATE_TYPE_CONFIG: Record<
  UpdateType,
  { label: string; labelEn: string; color: string }
> = {
  project: {
    label: "项目",
    labelEn: "Project",
    color: "text-[#4fd1c5] bg-[#4fd1c5]/10",
  },
  fieldnote: {
    label: "笔记",
    labelEn: "Note",
    color: "text-[#c4b5fd] bg-[#c4b5fd]/10",
  },
  insight: {
    label: "洞察",
    labelEn: "Insight",
    color: "text-[#f59e0b] bg-[#f59e0b]/10",
  },
  milestone: {
    label: "里程碑",
    labelEn: "Milestone",
    color: "text-[#22c55e] bg-[#22c55e]/10",
  },
};
