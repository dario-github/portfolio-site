/* ═══════════════════════════════════════════════════
   About Data — HR-ready 关键成就 + 职业摘要
   ═══════════════════════════════════════════════════ */

export interface KeyAchievement {
  metric: string;
  metricEn: string;
  context: string;
  contextEn: string;
  impact: string;
  impactEn: string;
}

export const KEY_ACHIEVEMENTS: KeyAchievement[] = [
  {
    metric: "1600+ 用户, 2000+ Agent",
    metricEn: "1600+ Users, 2000+ Agents",
    context: "AI 中台 Smart Canvas",
    contextEn: "AI Platform Smart Canvas",
    impact: "企业级 AI 基础设施，日均 4000+ 次调用",
    impactEn: "Enterprise AI infrastructure, 4000+ daily calls",
  },
  {
    metric: "30天 → 6小时",
    metricEn: "30 Days → 6 Hours",
    context: "视频 Agent 系统",
    contextEn: "Video Agent System",
    impact: "广告素材生产效率提升 120x，雀巢/飞鹤落地",
    impactEn: "120x improvement in ad production efficiency, deployed at Nestlé/Feihe",
  },
  {
    metric: "10 人团队 AI 转型",
    metricEn: "10-Person Team AI Transformation",
    context: "技术团队管理",
    contextEn: "Tech Team Management",
    impact: "传统开发 → AI 工程师，获 2024 集团年度 AI Native 奖",
    impactEn: "Traditional dev → AI engineers, won 2024 company-wide AI Native Award",
  },
  {
    metric: "3 行业因果推断验证",
    metricEn: "Causal Inference Validated in 3 Industries",
    context: "金融 / 创投 / 营销",
    contextEn: "Finance / VC / Marketing",
    impact: "CMU + 爱丁堡教授合作，方法论跨行业迁移",
    impactEn: "Collaborated with CMU + Edinburgh professors, cross-industry methodology transfer",
  },
  {
    metric: "5+ 大客户交付",
    metricEn: "5+ Enterprise Deliveries",
    context: "太保/宁德/雀巢/飞鹤/欧莱雅",
    contextEn: "CPIC/CATL/Nestlé/Feihe/L'Oréal",
    impact: "方案设计到落地全链路，总监级交付能力",
    impactEn: "End-to-end from solution design to deployment, director-level delivery capability",
  },
];

export interface CareerBrief {
  company: string;
  companyEn: string;
  title: string;
  titleEn: string;
  period: string;
  periodEn: string;
  oneLiner: string;
  oneLinerEn: string;
}

export const CAREER_BRIEF: CareerBrief[] = [
  {
    company: "蓝色光标",
    companyEn: "BlueFocus",
    title: "AI 技术副总监",
    titleEn: "AI Tech Deputy Director",
    period: "2023 — 至今",
    periodEn: "2023 — Present",
    oneLiner: "AI 中台 + 视频 Agent + 10人团队",
    oneLinerEn: "AI Platform + Video Agent + 10-person team",
  },
  {
    company: "奇绩创坛",
    companyEn: "MiraclePlus",
    title: "因果算法研究员",
    titleEn: "Causal Algorithm Researcher",
    period: "2021 — 2022",
    periodEn: "2021 — 2022",
    oneLiner: "因果推断 + 创投尽调数据驱动",
    oneLinerEn: "Causal inference + VC data-driven due diligence",
  },
  {
    company: "同花顺",
    companyEn: "Hithink RoyalFlush",
    title: "NLP 算法工程师",
    titleEn: "NLP Algorithm Engineer",
    period: "2018 — 2021",
    periodEn: "2018 — 2021",
    oneLiner: "金融知识图谱 + 因果AI量化 + CMU/爱丁堡合作",
    oneLinerEn: "Financial KG + Causal AI quantitative + CMU/Edinburgh collaboration",
  },
];
