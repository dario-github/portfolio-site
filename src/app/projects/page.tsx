"use client";

import { useState } from "react";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";

/* ── Data ── */

interface NarrativeProject {
  name: string;
  role: string;
  highlight: string;
  techStack: string[];
}

interface Narrative {
  title: string;
  subtitle: string;
  description: string;
  projects: NarrativeProject[];
  keyMetrics: string[];
  icon: string;
}

const NARRATIVES: Narrative[] = [
  {
    title: "企业 AI 基建",
    subtitle: "从零搭建支撑 1600 人的 AI 中台",
    description:
      "发现各业务线重复造轮子，设计统一中台架构 Smart Canvas，支撑 1600+ 用户和 2000+ Agent。在此基础上搭建视频 Agent 系统，把广告素材生产从 30 天压到 6 小时。带 10 人团队完成从传统开发到 AI 工程化的转型。",
    projects: [
      {
        name: "AI 中台 Smart Canvas",
        role: "架构设计 & 技术负责人",
        highlight:
          "多租户 + MCP 协议 + Serverless，选择按需付费（峰谷比 10:1）替代 K8s 固定成本",
        techStack: ["AWS Serverless", "MCP", "RAG", "Buffer of Thoughts"],
      },
      {
        name: "视频 Agent / KOX AgentCore",
        role: "系统架构 & Agent 编排",
        highlight:
          "在中台基础上搭建视频内容全自动生产系统（详见 Multi-Agent 叙事线），30 天→6 小时，在雀巢、飞鹤验证落地",
        techStack: ["Multi-Agent", "AWS Bedrock", "因果策略"],
      },
      {
        name: "团队 AI 工程化转型",
        role: "团队负责人",
        highlight:
          "10 人团队从传统开发转型 AI 工程师，Vibe Coding 效率提升 ~50%。附带搭建 ChatBI 数据分析模块和 Claude Code 企业共享管控",
        techStack: ["Vibe Coding", "Claude Code", "AI MCN"],
      },
    ],
    keyMetrics: ["1600+ 用户", "2000+ Agent", "30天→6小时", "10 人团队转型"],
    icon: "🏗️",
  },
  {
    title: "Multi-Agent 架构",
    subtitle: "5 角色流水线，从创意到成片全自动",
    description:
      "自研 StreamingOrchestrator 替代 AWS Swarm（v1.16.0 无 stream_async()），设计 Context Variables 系统将 Token 消耗降低 85-90%。5 角色 Agent 流水线搭配 54 个工具，E2E 验证通过率 81.8%。从技术原型到真实客户落地。",
    projects: [
      {
        name: "KOX AgentCore / 视频 Agent 系统",
        role: "系统架构 & 核心开发",
        highlight:
          "企业级视频全自动生产系统（产品代号 DDD）。自研 StreamingOrchestrator 替代 AWS Swarm；Context Variables 资产引用系统替代 URL 传递，Token↓85-90%",
        techStack: ["AWS Bedrock", "AgentCore Runtime", "DynamoDB", "ECS", "剪映 API"],
      },
      {
        name: "雀巢 KOS AIGC",
        role: "技术方案 & 落地交付",
        highlight:
          "因果推断分析爆款因素指导选题策略——不是让 AI 写，是让 AI 写对的东西。1000+ 篇种草图文",
        techStack: ["Multi-Agent", "因果归因", "小红书 API"],
      },
      {
        name: "AIdience 慧像",
        role: "Agent 编排设计",
        highlight:
          "消费者洞察 Agent 系统，从数据采集到报告生成全自动化，落地到欧莱雅等客户",
        techStack: ["Multi-Agent", "NLP", "消费者洞察"],
      },
    ],
    keyMetrics: ["5 角色流水线", "54 个工具", "E2E 81.8%", "Token ↓85-90%"],
    icon: "🤖",
  },
  {
    title: "因果推断跨领域",
    subtitle: "从金融量化到内容归因，同一把刀切两个行业",
    description:
      "在同花顺用因果推断做量化（实盘跑出 Alpha），在奇绩创坛用因果做投资决策（降低漏筛率），在蓝色光标用因果做内容归因。同一个方法论在金融、创投、内容营销三个行业验证有效。",
    projects: [
      {
        name: "因果 AI 量化策略",
        role: "算法研究 & 实盘验证",
        highlight:
          "与 CMU 张坤教授合作，将 PC/FCI 因果发现从 i.i.d. 扩展到非平稳时序，处理 regime change",
        techStack: ["因果推断", "时序分析", "量化交易"],
      },
      {
        name: "金融知识图谱 & 智能选股",
        role: "领域建模 & 推理引擎",
        highlight:
          "与爱丁堡大学 Jeff Pan 教授合作，概念-因果-事理三层知识表示设计",
        techStack: ["知识图谱", "NLP", "因果推理"],
      },
      {
        name: "创业者画像归因模型",
        role: "因果建模",
        highlight:
          "因果图谱区分真因果 vs 伪相关，模型纳入奇绩创坛常规尽调流程",
        techStack: ["因果推断", "NLP", "标签体系"],
      },
      {
        name: "内容效果归因",
        role: "方法论迁移",
        highlight:
          "将金融因果推断方法迁移到内容营销，从 A/B 测试升级为因果归因",
        techStack: ["因果推断", "内容营销", "数据分析"],
      },
    ],
    keyMetrics: [
      "3 个行业验证",
      "实盘 Alpha",
      "CMU + 爱丁堡合作",
      "纳入常规流程",
    ],
    icon: "🔬",
  },
  {
    title: "AI 原生工作方式",
    subtitle: "用 AI 的方式重新定义日常工作",
    description:
      "搭建个人 AI 操作系统 OpenClaw（30+ 技能 / MemBrain 记忆系统 / 上下文隔离），用 AI 做投资研究（预判→验证→偏差分析闭环），用 AI 一天做出可玩的 Steam 游戏。不是「用了 AI」，是建立了系统化的 AI 工作方法论。",
    projects: [
      {
        name: "OpenClaw AI Workflow",
        role: "系统设计 & 日常使用",
        highlight:
          "30+ 技能插件、Sub-agent 架构、MemBrain 记忆管理——设计 AI 如何工作，而非用 AI 写代码",
        techStack: ["OpenClaw", "Claude", "Sub-agent", "Context Engineering"],
      },
      {
        name: "投资研究系统",
        role: "方法论设计 & 运维",
        highlight:
          "盘前预判→盘中验证→偏差分析闭环，18 个分析脚本 + Cron 自动驱动",
        techStack: ["Python", "Tushare Pro", "LLM Agent", "Cron"],
      },
      {
        name: "互动影游 / 百年孤独 RPG",
        role: "产品判断 & AI 团队管理",
        highlight:
          "AI 全生成 Steam 游戏——重点不是 AI 写代码，是如何管理 Claude + Codex + Gemini 的 AI 开发团队",
        techStack: ["Ren'Py", "Godot", "Seedance", "Claude", "Codex"],
      },
    ],
    keyMetrics: ["30+ 技能插件", "18 分析脚本", "1天→可玩MVP", "Sub-agent 架构"],
    icon: "⚡",
  },
  {
    title: "全链路客户交付",
    subtitle: "从技术方案到客户签单",
    description:
      "不只是写代码——面对真实客户需求，设计技术方案，交付可运行系统，拿到业务结果。从太保保险数智化到飞鹤视频审稿，从欧莱雅消费者洞察到宁德时代合作，总监级全链路交付能力。",
    projects: [
      {
        name: "太保数智化改造",
        role: "技术方案负责人",
        highlight:
          "保险行业 AI + 数据中台转型，理赔审核 / 客户画像 / 内部知识库三个核心场景",
        techStack: ["数据中台", "AI Agent", "知识图谱"],
      },
      {
        name: "飞鹤视频审稿系统",
        role: "技术交付",
        highlight:
          "视频 Agent 系统在飞鹤的落地，品牌合规审核自动化",
        techStack: ["Multi-Agent", "视频审核", "品牌合规"],
      },
      {
        name: "欧莱雅消费者洞察",
        role: "解决方案设计",
        highlight:
          "AIdience 系统落地，消费者画像 + 市场趋势自动分析",
        techStack: ["NLP", "消费者洞察", "数据分析"],
      },
      {
        name: "宁德时代",
        role: "技术合作",
        highlight: "新能源行业 AI 应用方案设计与交付",
        techStack: ["AI Agent", "行业解决方案"],
      },
    ],
    keyMetrics: ["5+ 大客户", "3 个行业", "方案→交付→结果", "总监级全链路"],
    icon: "🚀",
  },
];

/* ── Page ── */

export default function ProjectsPage() {
  const [narrativesExpanded, setNarrativesExpanded] = useState(false);

  return (
    <>
      <section aria-label="项目">
        <SectionHeading index="03">项目</SectionHeading>

        <div className="relative">
          <div className="space-y-12">
            {(narrativesExpanded ? NARRATIVES : NARRATIVES.slice(0, 2)).map(
              (narrative, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-[#112240]/30 p-8 border border-[#1e3a5f]/30 hover:bg-[#112240]/50 transition-colors duration-300"
                >
                  {/* Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-2xl flex-shrink-0 mt-0.5">
                      {narrative.icon}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-[#ccd6f6]">
                        {narrative.title}
                      </h3>
                      <p className="text-sm text-[#4fd1c5]/80">
                        {narrative.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-[1.85] mb-5">
                    {narrative.description}
                  </p>

                  {/* Key Metrics */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    {narrative.keyMetrics.map((metric) => (
                      <span
                        key={metric}
                        className="rounded-md bg-[#4fd1c5]/5 px-3 py-1.5 font-mono text-xs text-[#4fd1c5] border border-[#4fd1c5]/20"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>

                  {/* Project List */}
                  <div className="space-y-3">
                    {narrative.projects.map((project, j) => (
                      <div
                        key={j}
                        className="rounded-lg bg-[#0a192f]/50 px-4 py-3 border border-[#233554]/50"
                      >
                        <div className="flex items-baseline justify-between gap-2 mb-1">
                          <h4 className="font-medium text-sm text-[#ccd6f6]">
                            {project.name}
                          </h4>
                          <span className="text-[11px] text-[#4fd1c5]/60 font-mono whitespace-nowrap flex-shrink-0">
                            {project.role}
                          </span>
                        </div>
                        <p className="text-xs leading-relaxed text-[#8892b0]/80">
                          {project.highlight}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full bg-[#4fd1c5]/10 px-2 py-0.5 font-mono text-[10px] tracking-wider text-[#4fd1c5]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
          {!narrativesExpanded && NARRATIVES.length > 2 && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0a192f] to-transparent" />
          )}
        </div>
        {!narrativesExpanded && NARRATIVES.length > 2 && (
          <div className="flex justify-center pt-4 pb-2">
            <button
              onClick={() => setNarrativesExpanded(true)}
              className="text-sm text-[#4fd1c5] hover:text-[#4fd1c5]/80 font-mono transition-colors"
            >
              展开更多叙事 →
            </button>
          </div>
        )}
        {narrativesExpanded && (
          <div className="flex justify-center pt-4 pb-2">
            <button
              onClick={() => setNarrativesExpanded(false)}
              className="text-sm text-[#4fd1c5] hover:text-[#4fd1c5]/80 font-mono transition-colors"
            >
              收起
            </button>
          </div>
        )}
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
