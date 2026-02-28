import Link from "next/link";
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import { TechTags } from "@/components/SectionHeading";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

/* ── Types ── */

interface PageProps {
  params: Promise<{ locale: string }>;
}

/* ── Metadata ── */

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return {
    title: dict.experience.metaTitle,
    description: dict.experience.metaDesc,
    openGraph: {
      title: dict.experience.metaTitle,
      description: dict.experience.metaDesc,
      url: `https://www.dariolink.com/${locale}/experience`,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.experience.metaTitle,
      description: dict.experience.metaDesc,
    },
  };
}

/* ── Data ── */

interface Experience {
  period: string;
  title: string;
  company: string;
  description: string;
  highlights: string[];
  techStack: string[];
}

const EXPERIENCES_ZH: Experience[] = [
  {
    period: "2023 — 至今",
    title: "AI 技术总监",
    company: "蓝色光标 BlueFocus",
    description:
      "从 0 搭建企业级 AI 中台 Smart Canvas，基于 AWS Serverless + MCP 协议 + Buffer of Thoughts 推理框架，支撑全集团 1600+ 员工、2000+ Agent、日均 4000+ 次调用。带 10 人团队完成 AI 工程化转型。",
    highlights: [
      "AI 中台 — AWS Serverless + MCP 协议 + Buffer of Thoughts 推理框架，1600+ 员工、2000+ Agent、日均 4000+ 调用",
      "视频 Agent 系统 — 30 天→6 小时，Agent pipeline：脚本生成→素材匹配→智能剪辑→审核优化，因果策略做归因，在雀巢、飞鹤验证落地",
      "团队管理 — 带 10 人，传统开发→复合型 AI 工程师，AI 辅助编程（Vibe Coding）效率提升约 50%，AI MCN 模式探索",
      "获 2024 集团年度 AI Native 个人及团队奖",
      "客户：太保、宁德时代、香格里拉、雀巢、飞鹤",
    ],
    techStack: [
      "Multi-Agent",
      "Buffer of Thoughts",
      "AWS Serverless",
      "因果策略",
      "Agent 编排",
    ],
  },
  {
    period: "2021 — 2022",
    title: "因果算法研究员",
    company: "奇绩创坛 Miracle Plus",
    description:
      "用因果算法做创投数据驱动尽调，给投委会提供决策支持。",
    highlights: [
      "创业者画像模型 — 归因分析重构评估权重，降低漏筛率",
      "标签体系重构 — NLP 长尾标签清洗和语义聚类，覆盖率 95%+",
      "因果推断辅助投资 — 因果关系挖掘，给投委会量化决策支持",
    ],
    techStack: ["因果推断", "NLP", "Python"],
  },
  {
    period: "2018 — 2021",
    title: "NLP 算法工程师",
    company: "同花顺 Flush (10jqka)",
    description:
      "搭金融知识图谱，与 CMU/爱丁堡教授合作做因果推断量化策略。",
    highlights: [
      "金融知识图谱 & 智能选股 — 概念、因果、事理多维图谱，事件驱动投资推理",
      "学术合作 — 爱丁堡 Jeff Pan 教授（知识图谱），CMU 张坤教授（因果发现）",
      "因果 AI 量化策略 — 宏观-行业-个股多层级择时，回测和实盘跑出显著 Alpha",
      "因果分析工具包 — 内部推广，支持 2 个核心项目",
    ],
    techStack: ["知识图谱", "因果推断", "NLP", "量化交易"],
  },
];

const EXPERIENCES_EN: Experience[] = [
  {
    period: "2023 — Present",
    title: "AI Tech Director",
    company: "蓝色光标 BlueFocus",
    description:
      "Built the enterprise AI platform Smart Canvas from scratch on AWS Serverless + MCP protocol + Buffer of Thoughts reasoning framework, serving 1,600+ employees, 2,000+ Agents, and 4,000+ daily calls across the group. Led a 10-person team through full AI engineering transformation.",
    highlights: [
      "AI Platform — AWS Serverless + MCP protocol + Buffer of Thoughts framework; 1,600+ users, 2,000+ Agents, 4,000+ daily calls",
      "Video Agent System — Cut production from 30 days to 6 hours via Agent pipeline: script generation → asset matching → smart editing → review optimization; causal attribution validated at Nestlé and Feihe",
      "Team Leadership — Led 10 engineers from traditional dev to full-stack AI engineers; AI-assisted coding (Vibe Coding) boosted efficiency ~50%; pioneered AI MCN model",
      "Awarded 2024 Group AI Native Individual & Team of the Year",
      "Clients: CPIC, CATL, Shangri-La, Nestlé, Feihe",
    ],
    techStack: [
      "Multi-Agent",
      "Buffer of Thoughts",
      "AWS Serverless",
      "Causal Strategy",
      "Agent Orchestration",
    ],
  },
  {
    period: "2021 — 2022",
    title: "Causal Inference Researcher",
    company: "奇绩创坛 Miracle Plus",
    description:
      "Applied causal inference to data-driven due diligence for venture capital, providing quantitative decision support to the investment committee.",
    highlights: [
      "Founder Profiling Model — Rebuilt evaluation weights via attribution analysis, reducing false-negative screening rate",
      "Tag Taxonomy Overhaul — NLP-based long-tail tag cleaning and semantic clustering, achieving 95%+ coverage",
      "Causal Inference for Investment — Mined causal relationships to deliver quantitative decision support for the investment committee",
    ],
    techStack: ["Causal Inference", "NLP", "Python"],
  },
  {
    period: "2018 — 2021",
    title: "NLP Engineer",
    company: "同花顺 Flush (10jqka)",
    description:
      "Built financial knowledge graphs and collaborated with professors at CMU and Edinburgh on causal inference-based quantitative strategies.",
    highlights: [
      "Financial Knowledge Graph & Smart Stock Screening — Multi-dimensional graphs (conceptual, causal, event-driven) powering event-driven investment reasoning",
      "Academic Collaboration — Prof. Jeff Pan at Edinburgh (Knowledge Graphs), Prof. Kun Zhang at CMU (Causal Discovery)",
      "Causal AI Quant Strategy — Multi-level market timing (macro → sector → stock); backtests and live trading produced significant Alpha",
      "Causal Analysis Toolkit — Adopted internally, supporting 2 core projects",
    ],
    techStack: ["Knowledge Graph", "Causal Inference", "NLP", "Quant Trading"],
  },
];

/* ── Page ── */

export default async function ExperiencePage({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const experiences = locale === "en" ? EXPERIENCES_EN : EXPERIENCES_ZH;

  return (
    <>
      <section aria-label={locale === "en" ? "Work Experience" : "工作经历"}>
        <SectionHeading index="02">{dict.experience.heading}</SectionHeading>
        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="group bg-[#112240]/50 rounded-lg p-6 hover:bg-[#112240] transition-colors duration-200"
            >
              <div className="flex items-baseline justify-between mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-[#ccd6f6]">
                    {exp.title}
                    <span className="mx-2 text-[#8892b0]/60">·</span>
                    <span className="text-[#4fd1c5]">{exp.company}</span>
                  </h3>
                </div>
                <span className="text-[#4fd1c5] font-mono text-sm whitespace-nowrap ml-4">
                  {exp.period}
                </span>
              </div>
              <p className="mt-2 text-sm leading-[1.85]">{exp.description}</p>
              <ul className="mt-3 space-y-1">
                {exp.highlights.map((h, j) => (
                  <li key={j} className="flex items-start text-sm">
                    <span className="mr-2 mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#4fd1c5]" />
                    {h}
                  </li>
                ))}
              </ul>
              <TechTags tags={exp.techStack} />
            </div>
          ))}
        </div>
      </section>

      {/* Back to home */}
      <div className="mt-16 mb-8">
        <Link
          href={`/${locale}`}
          className="text-sm font-medium text-[#4fd1c5] hover:text-[#4fd1c5]/80 transition-colors"
        >
          {dict.common.back}
        </Link>
      </div>
    </>
  );
}
