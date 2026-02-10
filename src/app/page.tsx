"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Mail,
  Github,
  Globe,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
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
      "主导企业级 AI 中台 Smart Canvas 的架构设计与工程落地，构建支撑全集团 1600+ 用户、2000+ Agent 的统一智能服务平台。带领 10 人产研团队完成从传统开发到 AI 工程化的系统性转型。",
    highlights: [
      "搭建 AI 中台 Smart Canvas — 1600+ 用户，2000+ Agent，日均 4000+ 调用",
      "设计视频 Agent 系统 — 腰部视频成本降至 1/10，模版周期从数周到日内",
      "带 10 人产研团队，推动 AI 辅助编程，代码产出效率提升约 50%",
      "客户项目落地：雀巢、飞鹤、宁德时代、太平洋保险、欧莱雅",
      "获 2024 集团年度 AI Native 团队奖",
    ],
    techStack: [
      "AWS Serverless",
      "MCP",
      "Multi-Agent",
      "Buffer of Thoughts",
      "RAG",
    ],
  },
  {
    period: "2021 — 2022",
    title: "因果算法研究员",
    company: "奇绩创坛",
    description:
      "构建数据驱动的创投决策系统，将因果推断方法引入项目初筛环节，系统性提升尽调自动化程度与评估准确性。",
    highlights: [
      "创业者画像归因模型 — 重构评估权重，降低漏筛率",
      "标签体系重构 — NLP 语义聚类，覆盖率从 60% 提升至 95%+",
      "因果推断辅助投资 — 挖掘创始人特征与成功率的因果关系",
    ],
    techStack: ["因果推断", "贝叶斯网络", "NLP", "Python"],
  },
  {
    period: "2018 — 2021",
    title: "NLP 算法工程师",
    company: "同花顺",
    description:
      "主导金融知识图谱与智能选股系统的研发，将因果推断引入量化交易场景，与国际学术团队合作完成实盘策略验证。",
    highlights: [
      "金融知识图谱 — 概念、因果、事理多维图谱 + 事件驱动推理引擎",
      "与爱丁堡大学 Jeff Pan 教授合作知识表示与推理",
      "与 CMU 张坤教授团队合作因果发现算法",
      "因果 AI 量化策略 — 多层级自动择时，实盘跑出显著 Alpha",
    ],
    techStack: ["知识图谱", "因果推断", "NLP", "量化交易", "Python"],
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
    background: "蓝色光标作为广告集团，各业务线 AI 工具碎片化严重，缺乏统一的 Agent 调度和知识管理能力。",
    breakdown: "拆解为三层：底层模型路由与成本优化、中层 Agent 编排框架、上层业务场景模板。关键挑战是多租户隔离和调用量峰谷调度。",
    execution: "基于 AWS Serverless 架构实现弹性扩缩，设计 MCP 协议统一 Agent 通信，构建 RAG 知识库支撑企业专有数据检索。",
    outcome: "支撑 1600+ 用户、2000+ Agent，日均 4000+ 调用。获 2024 集团年度 AI Native 团队奖。",
  },
  {
    title: "企业级视频 Agent 系统",
    description:
      "腰部视频制作成本降至 1/10，新模版周期从数周缩短到日内",
    techStack: ["Multi-Agent", "因果策略", "剪映 API", "Gemini"],
    category: "ai-platform",
    background: "广告行业腰部视频产量大但制作效率低，传统模板化方案缺乏灵活性，人工成本高。",
    breakdown: "将视频生产拆解为脚本生成、素材匹配、剪辑编排、审核优化四个 Agent 环节，每个环节独立可替换。",
    execution: "Multi-Agent 协作架构，结合因果策略优化素材选择，通过剪映 API 实现自动化剪辑，Gemini 驱动内容理解。",
    outcome: "腰部视频成本降至 1/10，模板创建从数周缩短到日内，客户满意度显著提升。",
  },
  {
    title: "数据策略大脑 ChatBI",
    description: "自然语言驱动的企业数据分析与策略洞察平台",
    techStack: ["Streamlit", "Python", "LLM", "SQL"],
    category: "ai-platform",
    background: "企业数据分析依赖 BI 工程师手动出报表，业务人员无法自助获取数据洞察。",
    breakdown: "NL2SQL 为核心，增加意图识别、多轮对话、图表自动生成三个模块。",
    execution: "LLM 解析自然语言生成 SQL，Streamlit 搭建交互界面，支持多数据源接入。",
    outcome: "业务人员可自助完成 80% 的常规数据查询，BI 工程师从重复工作中释放。",
  },
  {
    title: "人源活力爆款归因",
    description: "AI 分析爆款视频成功要素，指导内容策略优化",
    techStack: ["NLP", "视频分析", "因果推断"],
    category: "client-delivery",
  },
  {
    title: "飞鹤视频审稿",
    description: "AI 自动化视频内容审核与质量评分系统",
    techStack: ["Whisper", "Gemini Vision", "FastAPI"],
    category: "client-delivery",
  },
  {
    title: "雀巢 KOS 小红书 AIGC",
    description: "AI 驱动的小红书内容批量生产与分发系统",
    techStack: ["Multi-Agent", "小红书 API", "AIGC"],
    category: "client-delivery",
  },
  {
    title: "AIdience 慧像",
    description: "Multi-Agents 智能受众研究平台",
    techStack: ["Multi-Agent", "NLP", "用户画像"],
    category: "client-delivery",
  },
  {
    title: "太平洋保险数智化改造",
    description: "保险行业 AI + 数据中台数智化转型方案",
    techStack: ["数据中台", "AI Agent", "知识图谱"],
    category: "client-delivery",
  },
  {
    title: "欧莱雅产品洞察",
    description: "AI 驱动的消费者评论分析与知识图谱可视化",
    techStack: ["Gemini", "RAG", "知识图谱", "Next.js"],
    category: "client-delivery",
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
    description: "多维金融知识图谱 + 事件驱动投资推理引擎",
    techStack: ["NLP", "知识图谱", "因果推理"],
    category: "tech-innovation",
    background: "传统选股依赖技术指标和基本面数据，缺乏对事件驱动和因果关系的系统建模。",
    breakdown: "构建概念图谱、因果图谱、事理图谱三层知识表示，设计事件驱动推理引擎。",
    execution: "NLP 抽取实体关系，构建多维图谱，与爱丁堡大学 Jeff Pan 教授合作知识表示与推理框架。",
    outcome: "覆盖 A 股主要概念和事件链，推理引擎在回测中验证有效。",
  },
  {
    title: "因果 AI 量化策略",
    description: "宏观-行业-个股多层级自动择时，实盘跑出 Alpha",
    techStack: ["因果推断", "时序分析", "量化交易"],
    category: "tech-innovation",
    background: "量化策略多基于相关性，容易被伪相关误导。引入因果推断提升策略鲁棒性。",
    breakdown: "三层择时：宏观经济因果图→行业轮动因果链→个股因果信号，逐层过滤。",
    execution: "与 CMU 张坤教授团队合作因果发现算法，结合时序分析构建多层级择时模型。",
    outcome: "实盘跑出显著 Alpha，验证因果推断在量化场景的实际价值。",
  },
  {
    title: "创业者画像模型",
    description: "数据驱动的创投决策系统，因果推断辅助投资评估",
    techStack: ["因果推断", "NLP", "标签体系"],
    category: "tech-innovation",
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
  url?: string;
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
    tags: ["Agent Memory", "Architecture", "Engineering"],
    sources: 4,
  },
  {
    title: "渐进式上下文注入：让 Agent 像人一样导航信息",
    tldr: "Claude Code 的 hybrid model 是目前最成熟的实现——预加载 CLAUDE.md + 工具按需探索",
    confidence: "high",
    revision: 2,
    date: "2026-02",
    tags: ["Context Engineering", "Claude Code", "RAG"],
    sources: 5,
  },
  {
    title: "从 Workflow+RAG 到 Auto Agent+MCP：范式跃迁的技术决策",
    tldr: "为什么我们放弃了 Dify 式 workflow，拥抱自主 Agent + MCP 协议标准化",
    confidence: "high",
    revision: 2,
    date: "2026-01",
    tags: ["MCP", "Agent Architecture", "Decision"],
    sources: 3,
  },
  {
    title: "语言如何塑造 LLM 的推理能力",
    tldr: "不同语言 prompt 对模型推理的影响远超预期，中文 prompt 的特殊优势和局限",
    confidence: "medium",
    revision: 1,
    date: "2026-02",
    tags: ["LLM", "Multilingual", "Reasoning"],
    sources: 6,
  },
  {
    title: "因果推断在内容归因中的工程实践",
    tldr: "不靠经验选素材，用因果图区分真因果和伪相关——从金融量化到内容营销的方法迁移",
    confidence: "high",
    revision: 2,
    date: "2025-12",
    tags: ["Causal Inference", "Content Attribution", "Data Science"],
    sources: 4,
  },
  {
    title: "AI 自省能力的边界：模型真的知道自己在想什么吗？",
    tldr: "Anthropic 的 introspection 研究揭示了一个反直觉结论：CoT 不一定反映真实推理过程",
    confidence: "speculative",
    revision: 1,
    date: "2026-01",
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
                专注于将 AI 推理能力工程化为可交付的生产系统。
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
                  <Highlight>计算推理</Highlight>——从同花顺的
                  <Highlight>符号推理</Highlight>（知识图谱），到奇绩创坛的
                  <Highlight>因果推理</Highlight>（贝叶斯网络），再到蓝色光标的
                  <Highlight>链式推理</Highlight>（LLM Multi-Agent）。
                </p>
                <p>
                  在同花顺搭了金融知识图谱和因果推断量化策略，与{" "}
                  <Highlight>CMU</Highlight> 和
                  <Highlight>爱丁堡大学</Highlight>
                  的学者合作；在奇绩创坛做数据驱动的创投尽调；在蓝色光标从零搭起企业级
                  AI 中台 <Highlight>Smart Canvas</Highlight>，支撑 2000+ Agent
                  日均 4000+ 次调用。
                </p>
                <p>
                  同济数学出身，在
                  <Highlight>柏林工大</Highlight>交换一年，德语 B2。INTJ，信奉
                  &ldquo;如无必要，勿增实体&rdquo;。工作之外关注量化投资和
                  AI-native 工作流。
                </p>
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
                        {article.title}
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
