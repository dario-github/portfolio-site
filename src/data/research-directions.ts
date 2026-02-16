/* ═══════════════════════════════════════════════════
   Research Directions — 核心研究方向
   ═══════════════════════════════════════════════════ */

export interface ResearchDirection {
  title: string;
  brief: string;
  tags: string[];
  icon: string;
  color: "teal" | "blue" | "purple";
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
];
