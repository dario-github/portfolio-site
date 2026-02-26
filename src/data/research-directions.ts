/* ═══════════════════════════════════════════════════
   Research Directions — 核心研究方向
   ═══════════════════════════════════════════════════ */

export interface ResearchDirection {
  title: string;
  brief: string;
  tags: string[];
  icon: string;
  color: "teal" | "blue" | "purple" | "amber";
}

export const RESEARCH_DIRECTIONS: ResearchDirection[] = [
  {
    title: "因果推断 × AI 决策",
    brief:
      "用因果图替代相关性分析——从金融量化到内容归因，让 AI 做对的决策而不只是快的决策",
    tags: ["Causal Inference", "DoWhy", "Causal Discovery"],
    icon: "🔬",
    color: "teal",
  },
  {
    title: "Agent 系统工程",
    brief:
      "多 Agent 编排、工具管理、状态同步——在生产环境中让 Agent 可靠地跑起来",
    tags: ["Multi-Agent", "MCP", "Tool Orchestration"],
    icon: "🤖",
    color: "blue",
  },
  {
    title: "Context Engineering",
    brief:
      "记忆分层、渐进式注入、上下文隔离——Agent 的智能上限由 Context 质量决定",
    tags: ["MemBrain", "Progressive Injection", "Context Isolation"],
    icon: "🧠",
    color: "purple",
  },
  {
    title: "AI 安全与自主性",
    brief:
      "Agent 的安全边界、自主权设计、行为约束机制——从 RSP 政策到工程实践",
    tags: ["AI Safety", "RSP", "Autonomy", "Behavioral Constraints"],
    icon: "🛡️",
    color: "amber",
  },
];
