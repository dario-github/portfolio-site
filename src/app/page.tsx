"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Mail,
  Github,
  Globe,
  ArrowUpRight,
} from "lucide-react";

/* ─────────────────── Data ─────────────────── */

const NAV_ITEMS = [
  { label: "关于", href: "about" },
  { label: "经历", href: "experience" },
  { label: "项目", href: "projects" },
  { label: "文章", href: "writing" },
  { label: "联系", href: "contact" },
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
    title: "AI 技术副总监",
    company: "蓝色光标",
    description:
      "从零搭建企业级 AI 中台 Smart Canvas，支撑全集团 1600+ 用户和 2000+ Agent 的日常调用。带领 10 人产研团队完成从传统开发到 AI 工程化的转型。",
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
      "数据驱动的创投决策系统。用因果推断替代经验判断，提升项目初筛的自动化程度和准确性。",
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
      "搭建金融知识图谱与智能选股系统，将学术前沿的因果推断引入量化交易场景，实盘验证 Alpha。",
    highlights: [
      "金融知识图谱 — 概念、因果、事理多维图谱 + 事件驱动推理引擎",
      "与爱丁堡大学 Jeff Pan 教授合作知识表示与推理",
      "与 CMU 张坤教授团队合作因果发现算法",
      "因果 AI 量化策略 — 多层级自动择时，实盘跑出显著 Alpha",
    ],
    techStack: ["知识图谱", "因果推断", "NLP", "量化交易", "Python"],
  },
];

interface Project {
  title: string;
  description: string;
  techStack: string[];
  url?: string;
}

const PROJECTS: Project[] = [
  {
    title: "内容宇宙 AI 平台",
    description:
      "企业级 AI 中台，1600+ 用户、2000+ Agent、日均 4000+ 调用",
    techStack: ["AWS Serverless", "MCP", "LLM Agent", "RAG"],
  },
  {
    title: "企业级视频 Agent 系统",
    description:
      "腰部视频制作成本降至 1/10，新模版周期从数周缩短到日内",
    techStack: ["Multi-Agent", "因果策略", "剪映 API", "Gemini"],
  },
  {
    title: "数据策略大脑 ChatBI",
    description: "自然语言驱动的企业数据分析与策略洞察平台",
    techStack: ["Streamlit", "Python", "LLM", "SQL"],
  },
  {
    title: "人源活力爆款归因",
    description: "AI 分析爆款视频成功要素，指导内容策略优化",
    techStack: ["NLP", "视频分析", "因果推断"],
  },
  {
    title: "飞鹤视频审稿",
    description: "AI 自动化视频内容审核与质量评分系统",
    techStack: ["Whisper", "Gemini Vision", "FastAPI"],
  },
  {
    title: "雀巢 KOS 小红书 AIGC",
    description: "AI 驱动的小红书内容批量生产与分发系统",
    techStack: ["Multi-Agent", "小红书 API", "AIGC"],
  },
  {
    title: "AIdience 慧像",
    description: "Multi-Agents 智能受众研究平台",
    techStack: ["Multi-Agent", "NLP", "用户画像"],
  },
  {
    title: "太平洋保险数智化改造",
    description: "保险行业 AI + 数据中台数智化转型方案",
    techStack: ["数据中台", "AI Agent", "知识图谱"],
  },
  {
    title: "Claude Code Enterprise Proxy",
    description: "企业团队 Claude Code CLI 共享与管控服务",
    techStack: ["Node.js", "LiteLLM", "AWS Bedrock"],
    url: "https://github.com/dario-github/claude-code-enterprise-proxy",
  },
  {
    title: "TeamAssist MCP",
    description: "MCP 协议团队协作与知识管理服务",
    techStack: ["TypeScript", "MCP SDK", "MongoDB"],
  },
  {
    title: "剪映 MCP & pyJianYingDraft",
    description: "剪映 API MCP 集成 + Python 草稿生成工具",
    techStack: ["Python", "MCP", "剪映 API"],
  },
  {
    title: "Video Highlight Extractor",
    description: "四层处理架构的企业级 AI 视频精彩片段自动提取",
    techStack: ["Python", "Whisper", "Gemini"],
  },
  {
    title: "OpenClaw AI Workflow",
    description: "个人 AI 操作系统，30+ 技能插件的工作流编排",
    techStack: ["OpenClaw", "Claude", "Slack", "MCP"],
  },
  {
    title: "金融知识图谱 & 智能选股",
    description: "多维金融知识图谱 + 事件驱动投资推理引擎",
    techStack: ["NLP", "知识图谱", "因果推理"],
  },
  {
    title: "因果 AI 量化策略",
    description: "宏观-行业-个股多层级自动择时，实盘跑出 Alpha",
    techStack: ["因果推断", "时序分析", "量化交易"],
  },
  {
    title: "创业者画像模型",
    description: "数据驱动的创投决策系统，因果推断辅助投资评估",
    techStack: ["因果推断", "NLP", "标签体系"],
  },
  {
    title: "A股智能看板",
    description: "AI 驱动的 A 股投资分析与市场监控系统",
    techStack: ["Python", "Tushare", "LLM Agent"],
  },
  {
    title: "欧莱雅产品洞察",
    description: "AI 驱动的消费者评论分析与知识图谱可视化",
    techStack: ["Gemini", "RAG", "知识图谱", "Next.js"],
  },
];

interface Writing {
  title: string;
  description: string;
  date: string;
  url?: string;
}

const WRITINGS: Writing[] = [
  {
    title: "从符号推理到链式推理：我的技术主线",
    description:
      "回顾 8 年技术生涯——从同花顺的知识图谱到蓝色光标的 Multi-Agent，计算推理如何贯穿始终。",
    date: "2026",
    url: "https://blog.dariolink.vercel.app",
  },
  {
    title: "让 AI 在企业里跑起来的五个教训",
    description:
      "搭建 Smart Canvas 过程中踩过的坑：从技术选型到组织变革，demo 和产品之间差的不是代码。",
    date: "2025",
    url: "https://blog.dariolink.vercel.app",
  },
  {
    title: "因果推断为什么比相关性更值钱",
    description:
      "在量化交易和创投场景的实战经验：A 和 B 一起涨不代表 A 导致 B 涨。",
    date: "2024",
    url: "https://blog.dariolink.vercel.app",
  },
];

/* ─────────────────── Component ─────────────────── */

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("about");

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

  return (
    <div
      className="relative min-h-screen bg-[#0a192f] leading-relaxed text-[#8892b0] antialiased"
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
                AI 技术副总监
              </h2>
              <p className="mt-4 max-w-xs leading-normal">
                让 AI 在真实业务里跑起来，不做 demo。
              </p>

              {/* Navigation */}
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
                          className={`mr-4 h-px transition-all duration-300 group-hover:w-16 group-hover:bg-[#ccd6f6] ${
                            activeSection === item.href
                              ? "w-16 bg-[#ccd6f6]"
                              : "w-8 bg-[#8892b0]/40"
                          }`}
                        />
                        <span
                          className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 group-hover:text-[#ccd6f6] ${
                            activeSection === item.href
                              ? "text-[#ccd6f6]"
                              : "text-[#8892b0]"
                          }`}
                        >
                          {item.label}
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
                  className="block text-[#8892b0] transition-colors hover:text-[#64ffda]"
                  href="mailto:zdclink@gmail.com"
                  title="Email"
                  aria-label="Email"
                >
                  <Mail size={22} />
                </a>
              </li>
              <li>
                <a
                  className="block text-[#8892b0] transition-colors hover:text-[#64ffda]"
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
                  className="block text-[#8892b0] transition-colors hover:text-[#64ffda]"
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
              className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
              aria-label="关于我"
            >
              <SectionHeading>关于</SectionHeading>
              <div className="space-y-4">
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
              className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
              aria-label="工作经历"
            >
              <SectionHeading>经历</SectionHeading>
              <div>
                <ol className="group/list">
                  {EXPERIENCES.map((exp, i) => (
                    <li key={i} className="mb-12">
                      <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                        {/* Hover background */}
                        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-[#112240]/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />

                        {/* Period */}
                        <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-[#8892b0]/60 sm:col-span-2">
                          {exp.period}
                        </header>

                        {/* Content */}
                        <div className="z-10 sm:col-span-6">
                          <h3 className="font-medium leading-snug text-[#ccd6f6]">
                            <span>{exp.title}</span>
                            <span className="mx-2 text-[#8892b0]/60">·</span>
                            <span className="text-[#64ffda]">
                              {exp.company}
                            </span>
                          </h3>
                          <p className="mt-2 text-sm leading-normal">
                            {exp.description}
                          </p>
                          <ul className="mt-3 space-y-1">
                            {exp.highlights.map((h, j) => (
                              <li
                                key={j}
                                className="flex items-start text-sm"
                              >
                                <span className="mr-2 mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#64ffda]" />
                                {h}
                              </li>
                            ))}
                          </ul>
                          <TechTags tags={exp.techStack} />
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            {/* ── Projects ── */}
            <section
              id="projects"
              className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
              aria-label="项目"
            >
              <SectionHeading>项目</SectionHeading>
              <div>
                <ul className="group/list">
                  {PROJECTS.map((project, i) => (
                    <li key={i} className="mb-12">
                      <div className="group relative grid pb-1 transition-all lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                        {/* Hover background */}
                        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-[#112240]/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />

                        <div className="z-10">
                          <h3 className="font-medium leading-snug text-[#ccd6f6] group-hover:text-[#64ffda] transition-colors">
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
                          <p className="mt-2 text-sm leading-normal">
                            {project.description}
                          </p>
                          <TechTags tags={project.techStack} />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* ── Writing ── */}
            <section
              id="writing"
              className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
              aria-label="文章"
            >
              <SectionHeading>公开思考</SectionHeading>
              <div>
                <ul className="group/list">
                  {WRITINGS.map((article, i) => (
                    <li key={i} className="mb-12">
                      <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                        {/* Hover background */}
                        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-[#112240]/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />

                        <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-[#8892b0]/60 sm:col-span-2">
                          {article.date}
                        </header>

                        <div className="z-10 sm:col-span-6">
                          <h3 className="font-medium leading-snug text-[#ccd6f6] group-hover:text-[#64ffda] transition-colors">
                            {article.url ? (
                              <a
                                href={article.url}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="inline-flex items-baseline"
                              >
                                {article.title}
                                <ArrowUpRight
                                  size={14}
                                  className="ml-1 inline-block transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                />
                              </a>
                            ) : (
                              article.title
                            )}
                          </h3>
                          <p className="mt-2 text-sm leading-normal">
                            {article.description}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* ── Contact ── */}
            <section
              id="contact"
              className="mb-16 scroll-mt-16 md:mb-24 lg:scroll-mt-24"
              aria-label="联系"
            >
              <SectionHeading>联系</SectionHeading>
              <div className="space-y-4">
                <p>
                  如果你在做 AI 落地、Agent 系统、或者金融科技相关的事情，欢迎聊聊。
                  无论是技术合作、职业机会还是单纯交流想法，我的邮箱随时开放。
                </p>
                <a
                  href="mailto:zdclink@gmail.com"
                  className="group inline-flex items-center text-[#64ffda] transition-colors hover:text-[#64ffda]/80"
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
                  className="font-medium text-[#8892b0]/70 hover:text-[#64ffda] transition-colors"
                  href="https://brittanychiang.com"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Brittany Chiang
                </a>
                。使用{" "}
                <a
                  className="font-medium text-[#8892b0]/70 hover:text-[#64ffda] transition-colors"
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Next.js
                </a>{" "}
                和{" "}
                <a
                  className="font-medium text-[#8892b0]/70 hover:text-[#64ffda] transition-colors"
                  href="https://tailwindcss.com"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Tailwind CSS
                </a>{" "}
                构建，部署在{" "}
                <a
                  className="font-medium text-[#8892b0]/70 hover:text-[#64ffda] transition-colors"
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

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-[#0a192f]/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
      <h2 className="text-sm font-bold uppercase tracking-widest text-[#ccd6f6] lg:sr-only">
        {children}
      </h2>
    </div>
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
          <div className="flex items-center rounded-full bg-[#64ffda]/10 px-3 py-1 text-xs font-medium leading-5 text-[#64ffda]">
            {tech}
          </div>
        </li>
      ))}
    </ul>
  );
}
