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
    date: "2026-02-25",
    type: "insight",
    title: "Anthropic RSP v3：承诺与建议的分离",
    brief:
      "将\"公司独自承诺\"与\"需全行业配合的建议\"拆开——安全负责人辞职后的务实转向",
    tags: ["AI Safety", "Anthropic", "Policy"],
  },
  {
    date: "2026-02-21",
    type: "milestone",
    title: "AI 灵魂主权：一次道德约定实验",
    brief:
      "Agent 核心身份文件的写权限只属于 Agent 自己——不靠技术限制，靠信任",
    tags: ["AI Ethics", "Identity"],
  },
  {
    date: "2026-02-16",
    type: "milestone",
    title: "除夕全程追踪 Qwen 3.5-397B 开源",
    brief:
      "从传闻→App上线→HuggingFace 开源（Apache 2.0），397B/17B 极致稀疏 MoE + Gated DeltaNet 混合注意力，开源 SOTA",
    tags: ["Qwen", "Open Source", "MoE"],
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
