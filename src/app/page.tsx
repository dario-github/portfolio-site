"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Mail,
  Github,
  Globe,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Linkedin,
  GraduationCap,
  Download,
} from "lucide-react";

/* ─────────────────── Data ─────────────────── */

const NAV_ITEMS = [
  { label: "关于", href: "about", index: "01" },
  { label: "经历", href: "experience", index: "02" },
  { label: "项目", href: "projects", index: "03" },
  { label: "文章", href: "writing", index: "04" },
  { label: "联系", href: "contact", index: "05" },
];

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
      "主导企业级 AI 中台 Smart Canvas 的架构设计与工程落地，构建支撑全集团 1600+ 用户、2000+ Agent 的统一智能服务平台。当前重心：基于 MCP 协议的主动式多 Agent 系统，让 Agent 从被动响应升级为自主感知上下文、预判意图、规划执行的智能体。",
    highlights: [
      "搭建 AI 中台 Smart Canvas — 1600+ 用户，2000+ Agent，日均 4000+ 调用",
      "设计主动式多 Agent 系统 — 基于 MCP 协议统一 Agent 通信，实现跨场景的自主编排与协作",
      "视频 Agent 系统 — 广告素材从脚本到成片从 30 天压缩到 6 小时，在雀巢、飞鹤等项目验证落地",
      "推动 Context Learning 在企业场景的应用 — Agent 根据对话上下文动态调整策略，而非依赖静态 prompt",
      "带 10 人产研团队，推动 AI 辅助编程落地，代码产出效率提升约 50%",
      "客户项目落地：雀巢、飞鹤、宁德时代、太平洋保险、欧莱雅等 6 家头部企业",
      "获 2024 集团年度 AI Native 团队奖（全集团唯一）",
    ],
    techStack: [
      "MCP",
      "Multi-Agent",
      "Context Learning",
      "AWS Serverless",
      "Agent 编排",
    ],
  },
  {
    period: "2021 — 2022",
    title: "因果算法研究员",
    company: "奇绩创坛",
    description:
      "构建数据驱动的创投决策系统，将因果推断引入项目初筛与尽调自动化。",
    highlights: [
      "创业者画像归因模型 — 因果推断辅助合伙人投资决策，提升初筛自动化程度",
    ],
    techStack: ["因果推断", "NLP", "Python"],
  },
  {
    period: "2018 — 2021",
    title: "NLP 算法工程师",
    company: "同花顺",
    description:
      "主导金融知识图谱与因果推断量化策略的研发，与 CMU、爱丁堡大学团队开展学术合作。",
    highlights: [
      "搭建概念-因果-事理三层金融知识图谱，落地事件驱动智能选股系统",
    ],
    techStack: ["知识图谱", "因果推断", "NLP"],
  },
];

/* ── Project Categories ── */

const PROJECT_CATEGORIES = [
  { key: "ai-platform", label: "🎯AI中台" },
  { key: "client-delivery", label: "🚀客户交付" },
  { key: "tech-innovation", label: "🔧技术创新" },
  { key: "team-enablement", label: "🏗️团队赋能" },
  { key: "personal", label: "🎮个人兴趣" },
] as const;

interface Project {
  title: string;
  description: string;
  techStack: string[];
  url?: string;
  category: string;
  background?: string;
  breakdown?: string;
  execution?: string;
  outcome?: string;
}

const PROJECTS: Project[] = [
  {
    title: "内容宇宙 AI 平台",
    description:
      "企业级 AI 中台，1600+ 用户、2000+ Agent、日均 4000+ 调用",
    techStack: ["AWS Serverless", "MCP", "LLM Agent", "RAG"],
    category: "ai-platform",
    background: "蓝色光标各业务线 AI 工具碎片化严重，缺乏统一的 Agent 调度和知识管理能力，各团队重复造轮子。",
    breakdown: "拆解为三层：底层模型路由与成本优化（多模型 fallback + token 预算控制）、中层 Agent 编排框架（MCP 协议统一通信）、上层业务场景模板（可复用 workflow）。关键挑战：多租户隔离和峰谷流量调度。",
    execution: "基于 AWS Lambda + API Gateway 实现弹性扩缩（冷启动 < 2s），设计 MCP 协议统一 Agent 通信，构建 RAG 知识库支撑企业专有数据检索。选择 Serverless 而非 K8s 是因为流量峰谷比达 10:1，按需付费显著降低基础设施成本。",
    outcome: "支撑 1600+ 用户、2000+ Agent，日均 4000+ 调用。获 2024 集团年度 AI Native 团队奖。",
  },
  {
    title: "企业级视频 Agent 系统",
    description:
      "广告素材从脚本到成片从 30 天压缩到 6 小时，在雀巢、飞鹤等项目验证落地",
    techStack: ["Multi-Agent", "因果策略", "剪映 API", "Gemini"],
    category: "ai-platform",
    background: "广告行业腰部视频产量大但制作效率低，传统流程从脚本到成片需要约 30 天。",
    breakdown: "将视频生产拆解为脚本生成、素材匹配、剪辑编排、审核优化四个独立 Agent，每个环节可替换可并行。核心技术决策：选择 Agent 编排而非端到端模型，因为广告视频需要精确控制每个环节的品牌合规性。",
    execution: "Multi-Agent 协作架构，脚本 Agent（GPT-4o）→ 素材 Agent（Gemini Vision 匹配）→ 剪辑 Agent（剪映 API 编排）→ 审核 Agent（品牌合规检查）。因果策略优化素材选择，从相关性匹配升级为因果效果预测。",
    outcome: "广告素材制作周期从 30 天压缩到 6 小时。用因果策略做内容效果归因，在雀巢、飞鹤项目上验证落地。",
  },
  {
    title: "数据策略大脑 ChatBI",
    description: "自然语言驱动的企业数据分析与策略洞察平台",
    techStack: ["Streamlit", "Python", "LLM", "SQL"],
    category: "ai-platform",
    background: "企业数据分析依赖 BI 工程师手动出报表，业务人员无法自助获取数据洞察。",
    breakdown: "NL2SQL 为核心，增加意图识别、多轮对话、图表自动生成三个模块。",
    execution: "LLM 解析自然语言生成 SQL，Streamlit 搭建交互界面，支持多数据源接入。",
    outcome: "业务人员可自助完成常规数据查询，减少对 BI 工程师的依赖。",
  },
  {
    title: "雀巢 KOS 小红书 AIGC",
    description: "AI 驱动的小红书 KOS 内容批量生产与分发。累计产出 1000+ 篇种草图文，效率提升 90%，成本降低 50%。",
    techStack: ["Multi-Agent", "小红书 API", "AIGC", "因果归因"],
    category: "client-delivery",
    background: "雀巢需要在小红书快速铺量 KOS（Key Opinion Sales）内容，但人工创作产能有限且爆文率低。",
    breakdown: "拆解为选题挖掘（因果归因爆款因素）→ 文案生成（Multi-Agent 协作）→ 视觉匹配 → 发布调度四阶段。",
    execution: "因果推断分析爆款视频成功要素，指导选题和内容策略；Multi-Agent 系统批量生成差异化文案。",
    outcome: "累计产出 1000+ 篇种草图文，效率提升 90%，成本降低 50%。模式复制到飞鹤等其他客户。",
  },
  {
    title: "欧莱雅消费者洞察知识图谱",
    description: "AI 驱动的消费者评论分析与产品知识图谱可视化",
    techStack: ["Gemini", "RAG", "知识图谱", "Next.js"],
    category: "client-delivery",
    background: "欧莱雅需要从海量消费者评论中快速提取产品洞察，传统 BI 报表无法捕捉语义层面的用户需求变化。",
    breakdown: "构建产品-成分-功效-用户评价四层知识图谱，结合 RAG 实现自然语言查询。",
    execution: "Gemini 驱动评论理解和实体抽取，Next.js 构建可交互的图谱可视化界面。",
    outcome: "为欧莱雅构建产品洞察知识图谱，支持自然语言查询消费者反馈。",
  },
  {
    title: "太平洋保险数智化改造",
    description: "保险行业 AI + 数据中台数智化转型，从理赔智能审核到客户画像，落地 3 个核心场景。",
    techStack: ["数据中台", "AI Agent", "知识图谱"],
    category: "client-delivery",
    background: "太平洋保险传统 IT 系统数据孤岛严重，AI 能力缺乏统一调度。",
    breakdown: "聚焦理赔智能审核、客户画像精准营销、内部知识库三个高 ROI 场景。",
    execution: "构建数据中台打通多源数据，AI Agent 编排业务流程，知识图谱支撑专业领域推理。",
    outcome: "主导设计保险行业 AI 技术合作方案，聚焦理赔审核、客户画像、内部知识库三个场景。",
  },
  {
    title: "Video Highlight Extractor",
    description: "四层处理架构的企业级 AI 视频精彩片段自动提取",
    techStack: ["Python", "Whisper", "Gemini"],
    category: "tech-innovation",
  },
  {
    title: "剪映 MCP & pyJianYingDraft",
    description: "剪映 API MCP 集成 + Python 草稿生成工具",
    techStack: ["Python", "MCP", "剪映 API"],
    category: "tech-innovation",
  },
  {
    title: "金融知识图谱 & 智能选股",
    description: "概念-因果-事理三层知识图谱 + 事件驱动推理引擎",
    techStack: ["NLP", "知识图谱", "因果推理"],
    category: "tech-innovation",
    background: "传统选股依赖技术指标和基本面数据，缺乏对事件驱动和因果关系的系统建模。",
    breakdown: "构建概念图谱、因果图谱、事理图谱三层知识表示，设计事件驱动推理引擎。",
    execution: "NLP 抽取实体关系构建多维图谱。与爱丁堡大学 Jeff Pan 教授合作设计知识表示与推理框架，落地内部推理引擎。",
    outcome: "搭建覆盖 A 股主要标的的概念和事件链，推理引擎应用于智能选股产品。",
  },
  {
    title: "因果 AI 量化策略",
    description: "宏观→行业→个股三层因果择时模型，实盘验证有效",
    techStack: ["因果推断", "时序分析", "量化交易"],
    category: "tech-innovation",
    background: "量化策略多基于相关性，容易被伪相关误导，尤其在市场结构性变化时回撤严重。",
    breakdown: "三层择时：宏观经济因果图（领先指标识别）→ 行业轮动因果链（产业链传导）→ 个股因果信号（事件驱动），逐层过滤。",
    execution: "与 CMU 张坤教授团队合作，应用 PC/FCI 因果发现算法于金融时序数据。核心创新：将因果发现从 i.i.d. 数据扩展到非平稳时序，处理金融数据的 regime change 问题。",
    outcome: "回测和实盘均跑出显著 Alpha，验证因果推断在量化交易中的有效性。",
  },
  {
    title: "创业者画像归因模型",
    description: "数据驱动的创投决策系统，因果推断辅助项目初筛",
    techStack: ["因果推断", "NLP", "标签体系"],
    category: "tech-innovation",
    background: "VC 项目初筛依赖合伙人经验判断，主观性强且漏筛率高。",
    breakdown: "构建创始人特征→创业成功率的因果图谱，区分真因果和伪相关。",
    execution: "NLP 提取创始人背景特征，因果推断建模替代传统相关性打分。",
    outcome: "降低漏筛率，提升评估一致性。模型被纳入常规尽调流程。",
  },
  {
    title: "Claude Code Enterprise Proxy",
    description: "企业团队 Claude Code CLI 共享与管控服务",
    techStack: ["Node.js", "LiteLLM", "AWS Bedrock"],
    url: "https://github.com/dario-github/claude-code-enterprise-proxy",
    category: "team-enablement",
  },
  {
    title: "TeamAssist MCP",
    description: "MCP 协议团队协作与知识管理服务",
    techStack: ["TypeScript", "MCP SDK", "MongoDB"],
    category: "team-enablement",
  },
  {
    title: "OpenClaw AI Workflow",
    description: "个人 AI 操作系统，30+ 技能插件的工作流编排",
    techStack: ["OpenClaw", "Claude", "Slack", "MCP"],
    category: "personal",
  },
  {
    title: "A股智能看板",
    description: "AI 驱动的 A 股投资分析与市场监控系统",
    techStack: ["Python", "Tushare", "LLM Agent"],
    category: "personal",
  },
];

interface Writing {
  title: string;
  tldr: string;
  date: string;
  url: string;
  confidence: "high" | "medium" | "speculative";
  revision: number;
  tags: string[];
  sources?: number;
}

const WRITINGS: Writing[] = [
  {
    title: "AI Agent 长期记忆架构：从 ChatGPT 到 MemBrain 的方案对比",
    tldr: "逆向分析了 ChatGPT/Claude/LlamaIndex/Letta 四种记忆方案，发现工程上的核心 tradeoff 是深度 vs 速度",
    confidence: "high",
    revision: 3,
    date: "2026-02",
    url: "https://blog.dariolink.vercel.app",
    tags: ["Agent Memory", "Architecture", "Engineering"],
    sources: 4,
  },
  {
    title: "渐进式上下文注入：让 Agent 像人一样导航信息",
    tldr: "Claude Code 的 hybrid model 是目前最成熟的实现——预加载 CLAUDE.md + 工具按需探索",
    confidence: "high",
    revision: 2,
    date: "2026-02",
    url: "https://blog.dariolink.vercel.app",
    tags: ["Context Engineering", "Claude Code", "RAG"],
    sources: 5,
  },
  {
    title: "从 Workflow+RAG 到 Auto Agent+MCP：范式跃迁的技术决策",
    tldr: "为什么我们放弃了 Dify 式 workflow，拥抱自主 Agent + MCP 协议标准化",
    confidence: "high",
    revision: 2,
    date: "2026-01",
    url: "https://blog.dariolink.vercel.app",
    tags: ["MCP", "Agent Architecture", "Decision"],
    sources: 3,
  },
  {
    title: "语言如何塑造 LLM 的推理能力",
    tldr: "不同语言 prompt 对模型推理的影响远超预期，中文 prompt 的特殊优势和局限",
    confidence: "medium",
    revision: 1,
    date: "2026-02",
    url: "https://blog.dariolink.vercel.app",
    tags: ["LLM", "Multilingual", "Reasoning"],
    sources: 6,
  },
  {
    title: "因果推断在内容归因中的工程实践",
    tldr: "不靠经验选素材，用因果图区分真因果和伪相关——从金融量化到内容营销的方法迁移",
    confidence: "high",
    revision: 2,
    date: "2025-12",
    url: "https://blog.dariolink.vercel.app",
    tags: ["Causal Inference", "Content Attribution", "Data Science"],
    sources: 4,
  },
  {
    title: "AI 自省能力的边界：模型真的知道自己在想什么吗？",
    tldr: "Anthropic 的 introspection 研究揭示了一个反直觉结论：CoT 不一定反映真实推理过程",
    confidence: "speculative",
    revision: 1,
    date: "2026-01",
    url: "https://blog.dariolink.vercel.app",
    tags: ["AI Safety", "Interpretability", "Philosophy"],
    sources: 3,
  },
];

/* ─────────────────── Component ─────────────────── */

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("about");
  const [activeCategory, setActiveCategory] = useState("ai-platform");
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  // Scroll spy
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.href);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -60% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const filteredProjects = PROJECTS.filter(
    (p) => p.category === activeCategory
  );

  return (
    <div
      className="relative min-h-screen bg-[#0a192f] leading-[1.85] text-[#8892b0] antialiased"
      onMouseMove={handleMouseMove}
    >
      {/* ── Mouse follow glow ── */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition duration-300 lg:absolute"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
        }}
      />

      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-4">
          {/* ══════════════════ Left Sidebar ══════════════════ */}
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-[#ccd6f6] sm:text-5xl">
                <a href="/">章东丞</a>
              </h1>
              <p className="mt-1 text-lg font-light text-[#8892b0]">
                Dario Zhang
              </p>
              <h2 className="mt-3 text-lg font-medium tracking-tight text-[#ccd6f6] sm:text-xl">
                AI 技术总监
              </h2>
              <p className="mt-4 max-w-xs leading-[1.85]">
                构建主动式 Agent 系统，让 AI 从被动响应走向自主规划执行。
              </p>

              {/* Navigation with active vertical indicator */}
              <nav
                className="nav hidden lg:block"
                aria-label="In-page jump links"
              >
                <ul className="mt-16 w-max">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.href}>
                      <a
                        className="group flex items-center py-3"
                        href={`#${item.href}`}
                      >
                        <span
                          className={`mr-4 w-0.5 transition-all duration-300 ${
                            activeSection === item.href
                              ? "h-6 bg-[#4fd1c5]"
                              : "h-4 bg-[#8892b0]/30 group-hover:h-6 group-hover:bg-[#4fd1c5]/60"
                          }`}
                        />
                        <span
                          className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 group-hover:text-[#4fd1c5] ${
                            activeSection === item.href
                              ? "text-[#4fd1c5]"
                              : "text-[#8892b0]"
                          }`}
                        >
                          {item.index}. {item.label}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Social Links */}
            <ul
              className="ml-1 mt-8 flex items-center gap-5"
              aria-label="Social media"
            >
              <li>
                <a
                  className="block text-[#8892b0] transition-colors hover:text-[#4fd1c5]"
                  href="mailto:zdclink@gmail.com"
                  title="Email"
                  aria-label="Email"
                >
                  <Mail size={22} />
                </a>
              </li>
              <li>
                <a
                  className="block text-[#8892b0] transition-colors hover:text-[#4fd1c5]"
                  href="https://github.com/dario-github"
                  target="_blank"
                  rel="noreferrer noopener"
                  title="GitHub"
                  aria-label="GitHub"
                >
                  <Github size={22} />
                </a>
              </li>
              <li>
                <a
                  className="block text-[#8892b0] transition-colors hover:text-[#4fd1c5]"
                  href="https://www.linkedin.com/in/dariozhang"
                  target="_blank"
                  rel="noreferrer noopener"
                  title="LinkedIn"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={22} />
                </a>
              </li>
              <li>
                <a
                  className="block text-[#8892b0] transition-colors hover:text-[#4fd1c5]"
                  href="https://blog.dariolink.vercel.app"
                  target="_blank"
                  rel="noreferrer noopener"
                  title="Blog"
                  aria-label="Blog"
                >
                  <Globe size={22} />
                </a>
              </li>
            </ul>
          </header>

          {/* ══════════════════ Right Content ══════════════════ */}
          <main id="content" className="pt-24 lg:w-1/2 lg:py-24">
            {/* ── About ── */}
            <section
              id="about"
              className="scroll-mt-16 py-24 first:pt-0 lg:scroll-mt-24"
              aria-label="关于我"
            >
              <SectionHeading index="01">关于</SectionHeading>
              <div className="space-y-4 leading-[1.85]">
                <p>
                  8 年算法经验，职业主线是
                  <Highlight>让 AI 从被动工具进化为主动智能体</Highlight>——早期在同花顺和奇绩创坛做知识图谱与因果推断，积累了符号推理和数据驱动决策的基础；2023 年加入蓝色光标后，从零搭起企业级
                  AI 中台 <Highlight>Smart Canvas</Highlight>，支撑 2000+ Agent
                  日均 4000+ 次调用，重心全面转向 <Highlight>主动式 Agent 系统</Highlight>与<Highlight>多 Agent 协作</Highlight>。
                </p>
                <p>
                  当前研究方向：<Highlight>主动式 Agent 系统</Highlight>与<Highlight>Context Learning</Highlight>——让
                  AI 不只是被动响应指令，而是主动理解上下文、预判需求、自主规划执行。在蓝色光标的实践中，基于 MCP 协议构建 Agent 间的标准化通信，探索
                  Agent 根据对话上下文动态调整策略的能力。
                </p>
                <p>
                  INTJ，信奉
                  &ldquo;如无必要，勿增实体&rdquo;。工作之外关注量化投资和
                  AI-native 工作流。
                </p>
              </div>

              {/* Education */}
              <div className="mt-8 space-y-3">
                <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#ccd6f6]">
                  <GraduationCap size={16} className="text-[#4fd1c5]" />
                  教育背景
                </h3>
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[#ccd6f6] font-medium">同济大学</span>
                      <span className="mx-2 text-[#8892b0]/40">·</span>
                      <span className="text-sm">数学与应用数学（本科）</span>
                    </div>
                    <span className="text-[#4fd1c5] font-mono text-sm ml-4 whitespace-nowrap">2013 — 2018</span>
                  </div>
                </div>
              </div>

              {/* Resume Download */}
              <div className="mt-8">
                <a
                  href="/resume-dario-zhang.pdf"
                  className="group inline-flex items-center gap-2 rounded-lg border border-[#4fd1c5]/30 bg-[#4fd1c5]/5 px-4 py-2 text-sm font-medium text-[#4fd1c5] transition-all hover:bg-[#4fd1c5]/10 hover:border-[#4fd1c5]/50"
                >
                  <Download size={16} />
                  下载简历 PDF
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            </section>

            {/* ── Experience ── */}
            <section
              id="experience"
              className="scroll-mt-16 py-24 lg:scroll-mt-24"
              aria-label="工作经历"
            >
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
                    <p className="mt-2 text-sm leading-[1.85]">
                      {exp.description}
                    </p>
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

            {/* ── Projects ── */}
            <section
              id="projects"
              className="scroll-mt-16 py-24 lg:scroll-mt-24"
              aria-label="项目"
            >
              <SectionHeading index="03">项目</SectionHeading>

              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2 mb-8">
                {PROJECT_CATEGORIES.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => {
                      setActiveCategory(cat.key);
                      setExpandedProject(null);
                    }}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                      activeCategory === cat.key
                        ? "bg-[#4fd1c5]/10 text-[#4fd1c5] border border-[#4fd1c5]/30"
                        : "text-[#8892b0] border border-transparent hover:text-[#4fd1c5] hover:border-[#4fd1c5]/20"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Project Cards */}
              <div>
                <ul className="group/list">
                  {filteredProjects.map((project, i) => {
                    const globalIndex = PROJECTS.indexOf(project);
                    const hasNarrative =
                      project.background ||
                      project.breakdown ||
                      project.execution ||
                      project.outcome;
                    const isExpanded = expandedProject === globalIndex;

                    return (
                      <li key={globalIndex} className="mb-6">
                        <div className="group relative rounded-lg transition-all lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                          {/* Hover background */}
                          <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-[#112240]/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />

                          <div className="z-10 relative">
                            <div className="flex items-start justify-between">
                              <h3 className="font-medium leading-snug text-[#ccd6f6] group-hover:text-[#4fd1c5] transition-colors">
                                {project.url ? (
                                  <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="inline-flex items-baseline"
                                  >
                                    {project.title}
                                    <ArrowUpRight
                                      size={14}
                                      className="ml-1 inline-block transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                    />
                                  </a>
                                ) : (
                                  project.title
                                )}
                              </h3>
                              {hasNarrative && (
                                <button
                                  onClick={() =>
                                    setExpandedProject(
                                      isExpanded ? null : globalIndex
                                    )
                                  }
                                  className="ml-2 text-[#8892b0] hover:text-[#4fd1c5] transition-colors flex-shrink-0"
                                  aria-label={isExpanded ? "收起详情" : "展开详情"}
                                >
                                  {isExpanded ? (
                                    <ChevronUp size={18} />
                                  ) : (
                                    <ChevronDown size={18} />
                                  )}
                                </button>
                              )}
                            </div>
                            <p className="mt-2 text-sm leading-normal">
                              {project.description}
                            </p>

                            {/* 4-step narrative (expanded) */}
                            {isExpanded && hasNarrative && (
                              <div className="mt-4 space-y-3 border-l-2 border-[#4fd1c5]/20 pl-4">
                                {project.background && (
                                  <NarrativeStep
                                    label="🎯 背景"
                                    text={project.background}
                                  />
                                )}
                                {project.breakdown && (
                                  <NarrativeStep
                                    label="🔍 拆解"
                                    text={project.breakdown}
                                  />
                                )}
                                {project.execution && (
                                  <NarrativeStep
                                    label="⚡ 执行"
                                    text={project.execution}
                                  />
                                )}
                                {project.outcome && (
                                  <NarrativeStep
                                    label="📊 成果"
                                    text={project.outcome}
                                  />
                                )}
                              </div>
                            )}

                            <TechTags tags={project.techStack} />
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </section>

            {/* ── Writing ── */}
            <section
              id="writing"
              className="scroll-mt-16 py-24 lg:scroll-mt-24"
              aria-label="文章"
            >
              <SectionHeading index="04">公开思考</SectionHeading>
              <div className="space-y-4">
                {WRITINGS.map((article, i) => {
                  const borderColor =
                    article.confidence === "high"
                      ? "border-[#22c55e]"
                      : article.confidence === "medium"
                      ? "border-[#eab308]"
                      : "border-[#a78bfa]";
                  const badgeColor =
                    article.confidence === "high"
                      ? "bg-[#22c55e]/10 text-[#22c55e]"
                      : article.confidence === "medium"
                      ? "bg-[#eab308]/10 text-[#eab308]"
                      : "bg-[#a78bfa]/10 text-[#a78bfa]";
                  const confidenceLabel =
                    article.confidence === "high"
                      ? "🟢 高确信"
                      : article.confidence === "medium"
                      ? "🟡 中确信"
                      : "🟣 推测性";

                  return (
                    <div
                      key={i}
                      className={`border-l-2 ${borderColor} bg-[#112240]/30 rounded-lg p-5 hover:bg-[#112240]/60 transition`}
                    >
                      <h3 className="font-medium leading-snug text-[#ccd6f6]">
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="group/link inline-flex items-baseline hover:text-[#4fd1c5] transition-colors"
                        >
                          {article.title}
                          <ArrowUpRight
                            size={14}
                            className="ml-1 inline-block transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                          />
                        </a>
                      </h3>
                      <p className="mt-2 text-sm leading-[1.85] text-[#8892b0]">
                        {article.tldr}
                      </p>
                      {/* Tags */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {article.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-[#4fd1c5]/10 px-2.5 py-0.5 font-mono text-[11px] tracking-wider text-[#4fd1c5]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {/* Meta row */}
                      <div className="mt-3 flex items-center gap-3 text-xs">
                        <span
                          className={`rounded-full px-2 py-0.5 ${badgeColor}`}
                        >
                          {confidenceLabel}
                        </span>
                        <span className="rounded-full bg-[#8892b0]/10 px-2 py-0.5 text-[#8892b0]">
                          v{article.revision}
                        </span>
                        <span className="text-[#8892b0]/60 font-mono">
                          {article.date}
                        </span>
                        {article.sources && (
                          <span className="text-[#8892b0]/50 font-mono ml-auto">
                            基于 {article.sources} 个一手信源
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ── Contact ── */}
            <section
              id="contact"
              className="scroll-mt-16 py-24 lg:scroll-mt-24"
              aria-label="联系"
            >
              <SectionHeading index="05">联系</SectionHeading>
              <div className="space-y-4">
                <p>
                  如果你在做 AI 落地、Agent 系统、或者金融科技相关的事情，欢迎聊聊。
                  无论是技术合作、职业机会还是单纯交流想法，我的邮箱随时开放。
                </p>
                <a
                  href="mailto:zdclink@gmail.com"
                  className="group inline-flex items-center text-[#4fd1c5] transition-colors hover:text-[#4fd1c5]/80"
                >
                  <Mail size={16} className="mr-2" />
                  zdclink@gmail.com
                  <ArrowUpRight
                    size={14}
                    className="ml-1 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            </section>

            {/* ── Footer ── */}
            <footer className="max-w-md pb-16 text-sm text-[#8892b0]/50">
              <p>
                设计灵感来自{" "}
                <a
                  className="font-medium text-[#8892b0]/70 hover:text-[#4fd1c5] transition-colors"
                  href="https://brittanychiang.com"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Brittany Chiang
                </a>
                。使用{" "}
                <a
                  className="font-medium text-[#8892b0]/70 hover:text-[#4fd1c5] transition-colors"
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Next.js
                </a>{" "}
                和{" "}
                <a
                  className="font-medium text-[#8892b0]/70 hover:text-[#4fd1c5] transition-colors"
                  href="https://tailwindcss.com"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Tailwind CSS
                </a>{" "}
                构建，部署在{" "}
                <a
                  className="font-medium text-[#8892b0]/70 hover:text-[#4fd1c5] transition-colors"
                  href="https://vercel.com"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Vercel
                </a>
                。
              </p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── Sub-components ─────────────────── */

function SectionHeading({
  children,
  index,
}: {
  children: React.ReactNode;
  index: string;
}) {
  return (
    <>
      {/* Mobile: sticky header */}
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-[#0a192f]/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:hidden">
        <h2 className="text-sm font-bold uppercase tracking-widest text-[#ccd6f6]">
          <span className="text-[#4fd1c5] font-mono mr-2">{index}.</span>
          {children}
        </h2>
      </div>
      {/* Desktop: numbered heading with decorative line */}
      <div className="hidden lg:flex items-center gap-2 mb-8">
        <span className="text-[#4fd1c5] font-mono text-sm">{index}.</span>
        <h2 className="text-2xl font-bold text-[#ccd6f6]">{children}</h2>
        <div className="h-px bg-[#233554] flex-1 ml-4" />
      </div>
    </>
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[#ccd6f6] font-medium">{children}</span>
  );
}

function TechTags({ tags }: { tags: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
      {tags.map((tech) => (
        <li key={tech}>
          <div className="flex items-center rounded-full bg-[#4fd1c5]/10 px-3 py-1 font-mono text-[11px] font-medium tracking-wider leading-5 text-[#4fd1c5]">
            {tech}
          </div>
        </li>
      ))}
    </ul>
  );
}

function NarrativeStep({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <span className="text-xs font-semibold text-[#ccd6f6]">{label}</span>
      <p className="mt-0.5 text-sm leading-normal">{text}</p>
    </div>
  );
}
