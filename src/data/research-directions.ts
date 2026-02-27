/* ═══════════════════════════════════════════════════
   Research Directions — 核心研究方向
   ═══════════════════════════════════════════════════ */

export interface ResearchDirection {
  title: string;
  titleEn: string;
  brief: string;
  briefEn: string;
  tags: string[];
  icon: string;
  color: "teal" | "blue" | "purple" | "amber";
}

export const RESEARCH_DIRECTIONS: ResearchDirection[] = [
  {
    title: "因果推断 × AI 决策",
    titleEn: "Causal Inference × AI Decision-Making",
    brief:
      "用因果图替代相关性分析——从金融量化到内容归因，让 AI 做对的决策而不只是快的决策",
    briefEn:
      "Replacing correlation analysis with causal graphs — from financial quantitative to content attribution, making AI do the right decisions, not just fast ones",
    tags: ["Causal Inference", "DoWhy", "Causal Discovery"],
    icon: "🔬",
    color: "teal",
  },
  {
    title: "Agent 系统工程",
    titleEn: "Agent Systems Engineering",
    brief:
      "多 Agent 编排、工具管理、状态同步——在生产环境中让 Agent 可靠地跑起来",
    briefEn:
      "Multi-Agent orchestration, tool management, state synchronization — making Agents run reliably in production environments",
    tags: ["Multi-Agent", "MCP", "Tool Orchestration"],
    icon: "🤖",
    color: "blue",
  },
  {
    title: "Context Engineering",
    titleEn: "Context Engineering",
    brief:
      "记忆分层、渐进式注入、上下文隔离——Agent 的智能上限由 Context 质量决定",
    briefEn:
      "Memory layering, progressive injection, context isolation — an Agent's intelligence ceiling is determined by Context quality",
    tags: ["MemBrain", "Progressive Injection", "Context Isolation"],
    icon: "🧠",
    color: "purple",
  },
  {
    title: "AI 安全与自主性",
    titleEn: "AI Safety & Autonomy",
    brief:
      "Agent 的安全边界、自主权设计、行为约束机制——从 RSP 政策到工程实践",
    briefEn:
      "Agent safety boundaries, autonomy design, behavioral constraint mechanisms — from RSP policies to engineering practice",
    tags: ["AI Safety", "RSP", "Autonomy", "Behavioral Constraints"],
    icon: "🛡️",
    color: "amber",
  },
];
