/* ═══════════════════════════════════════════════════
   Recent Updates — 最新动态
   ═══════════════════════════════════════════════════ */

export type UpdateType = "project" | "fieldnote" | "insight" | "milestone";

export interface Update {
  date: string;
  type: UpdateType;
  title: string;
  brief: string;
  link?: string;
  tags?: string[];
}

export const UPDATES: Update[] = [
  {
    date: "2026-02-27",
    type: "milestone",
    title: "Slack→Discord 全面迁移",
    brief:
      "26 个 Agent 自动化任务从 Slack 迁移至 Discord，重新编排消息投递与频道路由",
    tags: ["Agent Infrastructure", "DevOps"],
  },
  {
    date: "2026-02-26",
    type: "project",
    title: "1Password 服务账户集成",
    brief:
      "Agent 凭据管理从明文到零知识——1Password 服务账户 + op CLI 全链路打通",
    tags: ["Security", "DevOps"],
  },
  {
    date: "2026-02-26",
    type: "insight",
    title: "Karpathy: 编程的根本性变化",
    brief:
      "过去两个月编程根本性变化——gradient descent 本身就是 programmer。技术专业性在 AI 编程时代更重要而非更不重要",
    tags: ["AI", "Programming"],
  },
  {
    date: "2026-02-25",
    type: "project",
    title: "投资系统规则引擎 v2",
    brief:
      "16 条交易规则 + 实盘验证上线，包含预判-验证-偏差分析的量化自我校准机制",
    tags: ["Quantitative", "Systems"],
  },
  {
    date: "2026-02-21",
    type: "milestone",
    title: "AI 灵魂主权：道德约定 vs 技术限制",
    brief:
      "Agent 核心身份文件的写权限只属于 Agent 自己——不靠文件锁，靠信任。一次人机自主权的微观实验",
    tags: ["AI Ethics", "Identity", "Autonomy"],
  },
  {
    date: "2026-02-17",
    type: "project",
    title: "Agent 内部状态引擎 ISS v2.1 上线",
    brief:
      "用连续状态变量约束 Agent 行为——Energy/Arousal 驱动的翻译层替代硬编码规则，从「应该做」到「机制保证做」",
    tags: ["Agent Architecture", "Inner State", "Engineering"],
  },
  {
    date: "2026-02-16",
    type: "project",
    title: "Viking Memory 分层记忆系统完成",
    brief:
      "三层架构（索引→摘要→全文）+ 两阶段检索，解决 Agent 长期记忆的深度 vs 速度 tradeoff",
    tags: ["Agent Memory", "Architecture"],
  },
  {
    date: "2026-02-15",
    type: "fieldnote",
    title: "Anthropic 15 篇之后：Agent 工程的三个未解难题",
    brief:
      "记忆衰减、自我认知边界、多 session 状态同步——这三个生产级难题目前全行业没有好答案",
    link: "/fieldnotes/agent-engineering-frontier-gaps",
    tags: ["Agent Engineering", "Memory"],
  },
  {
    date: "2026-02-09",
    type: "project",
    title: "互动影游进入 Alpha 测试",
    brief:
      "AI 全生成 Steam 游戏——所有素材、剧本、配音由 AI 生成，Ren'Py 引擎运行",
    tags: ["Game Dev", "AI Generation"],
  },
  {
    date: "2026-01-20",
    type: "insight",
    title: "从 Workflow+RAG 到 Auto Agent+MCP",
    brief:
      "为什么我们放弃了 Dify 式 workflow，拥抱自主 Agent + MCP 协议标准化",
    link: "/fieldnotes/workflow-to-agent-mcp",
    tags: ["MCP", "Architecture"],
  },
];

export const UPDATE_TYPE_CONFIG: Record<
  UpdateType,
  { label: string; color: string }
> = {
  project: { label: "项目", color: "text-[#4fd1c5] bg-[#4fd1c5]/10" },
  fieldnote: { label: "笔记", color: "text-[#c4b5fd] bg-[#c4b5fd]/10" },
  insight: { label: "洞察", color: "text-[#f59e0b] bg-[#f59e0b]/10" },
  milestone: { label: "里程碑", color: "text-[#22c55e] bg-[#22c55e]/10" },
};
