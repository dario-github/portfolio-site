/* ═══════════════════════════════════════════════════
   About Data — HR-ready 关键成就 + 职业摘要
   ═══════════════════════════════════════════════════ */

export interface KeyAchievement {
  metric: string;
  context: string;
  impact: string;
}

export const KEY_ACHIEVEMENTS: KeyAchievement[] = [
  {
    metric: "1600+ 用户, 2000+ Agent",
    context: "AI 中台 Smart Canvas",
    impact: "企业级 AI 基础设施，日均 4000+ 次调用",
  },
  {
    metric: "30天 → 6小时",
    context: "视频 Agent 系统",
    impact: "广告素材生产效率提升 120x，雀巢/飞鹤落地",
  },
  {
    metric: "10 人团队 AI 转型",
    context: "技术团队管理",
    impact: "传统开发 → AI 工程师，获 2024 集团年度 AI Native 奖",
  },
  {
    metric: "3 行业因果推断验证",
    context: "金融 / 创投 / 营销",
    impact: "CMU + 爱丁堡教授合作，方法论跨行业迁移",
  },
  {
    metric: "5+ 大客户交付",
    context: "太保/宁德/雀巢/飞鹤/欧莱雅",
    impact: "方案设计到落地全链路，总监级交付能力",
  },
];

export interface CareerBrief {
  company: string;
  title: string;
  period: string;
  oneLiner: string;
}

export const CAREER_BRIEF: CareerBrief[] = [
  {
    company: "蓝色光标",
    title: "AI 技术副总监",
    period: "2023 — 至今",
    oneLiner: "AI 中台 + 视频 Agent + 10人团队",
  },
  {
    company: "奇绩创坛",
    title: "因果算法研究员",
    period: "2021 — 2022",
    oneLiner: "因果推断 + 创投尽调数据驱动",
  },
  {
    company: "同花顺",
    title: "NLP 算法工程师",
    period: "2018 — 2021",
    oneLiner: "金融知识图谱 + 因果AI量化 + CMU/爱丁堡合作",
  },
];
