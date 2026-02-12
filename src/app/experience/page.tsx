import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { TechTags } from "@/components/SectionHeading";

/* ── Data ── */

interface Experience {
  period: string;
  title: string;
  company: string;
  description: string;
  highlights: string[];
  techStack: string[];
}

const EXPERIENCES: Experience[] = [
  {
    period: "2023 — 至今",
    title: "AI 技术总监",
    company: "蓝色光标",
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
    company: "奇绩创坛",
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
    company: "同花顺",
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

/* ── Page ── */

export default function ExperiencePage() {
  return (
    <>
      <section aria-label="工作经历">
        <SectionHeading index="02">经历</SectionHeading>
        <div className="space-y-6">
          {EXPERIENCES.map((exp, i) => (
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
          href="/"
          className="text-sm font-medium text-[#4fd1c5] hover:text-[#4fd1c5]/80 transition-colors"
        >
          ← 返回首页
        </Link>
      </div>
    </>
  );
}
