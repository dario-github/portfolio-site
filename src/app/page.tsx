"use client";

import { useState } from "react";
import { ArrowUpRight, FlaskConical, Bot, Terminal, GraduationCap } from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";

/* ═══════════════════════════════════════════════════
   Data
   ═══════════════════════════════════════════════════ */

/* ── Writings ── */

interface Writing {
  title: string;
  tldr: string;
  date: string;
  url: string;
  confidence: "high" | "medium" | "speculative";
  revision: number;
  tags: string[];
  sources?: number;
  references?: string[];
}

const WRITINGS: Writing[] = [
  {
    title: "AI Agent 长期记忆架构：从 ChatGPT 到 MemBrain 的方案对比",
    tldr: "逆向分析了 ChatGPT/Claude/LlamaIndex/Letta 四种记忆方案，发现工程上的核心 tradeoff 是深度 vs 速度",
    confidence: "high",
    revision: 3,
    date: "2026-02",
    url: "",
    tags: ["Agent Memory", "Architecture", "Engineering"],
    sources: 4,
    references: [
      'OpenAI. "ChatGPT Memory Architecture." Reverse-engineered analysis, 2025.',
      'Anthropic. "Claude Memory System." Team/Enterprise documentation, 2025.',
      'LlamaIndex. "Memory Module Documentation." v0.10+, 2025.',
      'MemBrain. "Entity Extraction & Semantic Units for Agent Memory." GitHub, 2025.',
    ],
  },
  {
    title: "渐进式上下文注入：让 Agent 像人一样导航信息",
    tldr: "Claude Code 的 hybrid model 是目前最成熟的实现——预加载 CLAUDE.md + 工具按需探索",
    confidence: "high",
    revision: 2,
    date: "2026-02",
    url: "",
    tags: ["Context Engineering", "Claude Code", "RAG"],
    sources: 5,
    references: [
      'Anthropic. "Building Effective Agents." Anthropic Research Blog, 2025.',
      'Anthropic. "Claude Code Architecture: Hybrid Context Model." Documentation, 2025.',
      'Cursor Team. "Progressive Context Loading in AI IDEs." Technical Report, 2025.',
      'LlamaIndex. "Agentic RAG: Tool-based Information Navigation." Blog, 2025.',
      'OpenAI. "Responses API: Agentic Context Management." Documentation, 2026.',
    ],
  },
  {
    title: "从 Workflow+RAG 到 Auto Agent+MCP：范式跃迁的技术决策",
    tldr: "为什么我们放弃了 Dify 式 workflow，拥抱自主 Agent + MCP 协议标准化",
    confidence: "high",
    revision: 2,
    date: "2026-01",
    url: "",
    tags: ["MCP", "Agent Architecture", "Decision"],
    sources: 3,
    references: [
      'Anthropic. "Model Context Protocol Specification." GitHub, 2025.',
      'Dify.ai. "Workflow Orchestration Documentation." 2025.',
      'AWS. "Bedrock AgentCore: Multi-Agent Runtime." Documentation, 2026.',
    ],
  },
  {
    title: "语言如何塑造 LLM 的推理能力",
    tldr: "不同语言 prompt 对模型推理的影响远超预期，中文 prompt 的特殊优势和局限",
    confidence: "medium",
    revision: 1,
    date: "2026-02",
    url: "",
    tags: ["LLM", "Multilingual", "Reasoning"],
    sources: 6,
    references: [
      'Qin et al. "Cross-lingual Prompting: Multilingual Reasoning with LLMs." ACL, 2024.',
      'Shi et al. "Language Is Not All You Need: Aligning Perception with Language Models." NeurIPS, 2024.',
      'Huang & Chang. "Towards Reasoning in Large Language Models: A Survey." ACL Findings, 2023.',
      'Sapir, E. "Language: An Introduction to the Study of Speech." 1921.',
      'Wendler et al. "Do Llamas Work in English? On the Latent Language of Multilingual Transformers." EMNLP, 2024.',
      'OpenAI. "GPT-5 Multilingual Reasoning Benchmark Results." Technical Report, 2025.',
    ],
  },
  {
    title: "因果推断在内容归因中的工程实践",
    tldr: "不靠经验选素材，用因果图区分真因果和伪相关——从金融量化到内容营销的方法迁移",
    confidence: "high",
    revision: 2,
    date: "2025-12",
    url: "",
    tags: ["Causal Inference", "Content Attribution", "Data Science"],
    sources: 4,
    references: [
      'Pearl, J. "Causality: Models, Reasoning, and Inference." Cambridge University Press, 2009.',
      'Peters et al. "Elements of Causal Inference." MIT Press, 2017.',
      'Zhang, K. et al. "Causal Discovery from Temporal Data." CMU Technical Report, 2023.',
      'Sharma & Kiciman. "DoWhy: A Python Library for Causal Inference." Microsoft Research, 2024.',
    ],
  },
  {
    title: "AI 自省能力的边界：模型真的知道自己在想什么吗？",
    tldr: "Anthropic 的 introspection 研究揭示了一个反直觉结论：CoT 不一定反映真实推理过程",
    confidence: "speculative",
    revision: 1,
    date: "2026-01",
    url: "",
    tags: ["AI Safety", "Interpretability", "Philosophy"],
    sources: 3,
    references: [
      'Anthropic. "Tracing the Thoughts of a Language Model." Anthropic Research, 2025.',
      'Lanham et al. "Measuring Faithfulness in Chain-of-Thought Reasoning." arXiv:2307.13702, 2023.',
      'Turpin et al. "Language Models Don\'t Always Say What They Think." NeurIPS, 2024.',
    ],
  },
];

/* ── Lab Items ── */

interface LabItem {
  name: string;
  description: string;
  status: "production" | "building" | "daily-use" | "internal";
  tags: string[];
}

const LAB_ITEMS: LabItem[] = [
  {
    name: "OpenClaw",
    description:
      "个人 AI 操作系统 — 30+ 技能插件、MemBrain 记忆系统、Sub-agent 架构、Context Engineering",
    status: "daily-use",
    tags: ["Agent OS", "Context Engineering", "MemBrain"],
  },
  {
    name: "KOX AgentCore",
    description:
      "AWS 云原生多 Agent 视频生产系统 — 自研 StreamingOrchestrator，5 角色流水线 + 54 工具",
    status: "production",
    tags: ["Multi-Agent", "AWS", "Video Production"],
  },
  {
    name: "互动影游",
    description:
      "AI 全生成 Steam 游戏 — 所有素材、剧本、配音由 AI 生成",
    status: "building",
    tags: ["Game Dev", "AI Generation", "Ren'Py"],
  },
  {
    name: "百年孤独 RPG",
    description:
      "文学 IP × 像素游戏 × 全 AI 开发团队 — Claude + Codex + Gemini 协作",
    status: "building",
    tags: ["Godot", "Pixel Art", "AI Team"],
  },
  {
    name: "投资研究系统",
    description:
      "盘前预判→盘中验证→偏差分析闭环，18 个分析脚本 + Cron 自动驱动",
    status: "daily-use",
    tags: ["Python", "Tushare", "LLM Agent"],
  },
  {
    name: "Claude Code Proxy",
    description:
      "企业级 Claude Code 共享管控方案，支持多人复用 + 用量追踪",
    status: "internal",
    tags: ["Claude Code", "Proxy", "Enterprise"],
  },
];

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  production: { label: "🟢 生产中", color: "text-[#22c55e]" },
  building: { label: "🔨 构建中", color: "text-[#f59e0b]" },
  "daily-use": { label: "⚡ 日常使用", color: "text-[#3b82f6]" },
  internal: { label: "🏢 内部工具", color: "text-[#8892b0]" },
};

/* ── Agent Section Content ── */

const OPENCLAW_SKILLS = [
  { name: "web-search", desc: "Brave Search API 多引擎搜索" },
  { name: "social-media-crawler", desc: "小红书/抖音/B站/微博数据采集" },
  { name: "tushare", desc: "A股/港股行情 + 券商研报拉取" },
  { name: "stock-picker", desc: "量化选股方法论 + 工具验证" },
  { name: "deep-think", desc: "Gemini + GPT 深度思考（多模型交叉验证）" },
  { name: "gemini-structured", desc: "Gemini 结构化输出（JSON Schema）" },
  { name: "research", desc: "Sub-agent 驱动的深度调研" },
  { name: "coding-agent", desc: "Claude Code CLI 集成" },
  { name: "tts-multi", desc: "商汤/Edge-TTS 多引擎语音合成" },
  { name: "video-summarizer", desc: "视频内容智能摘要" },
  { name: "openai-whisper-api", desc: "OpenAI Whisper 语音转录" },
  { name: "summarize", desc: "URL/播客/长文内容摘要" },
  { name: "gemini-image", desc: "Gemini 原生图片生成" },
  { name: "openai-image-gen", desc: "DALL-E / GPT 图片生成" },
  { name: "video-frames", desc: "视频关键帧提取" },
  { name: "agent-browser", desc: "Playwright 浏览器自动化" },
  { name: "kox", desc: "KOX 视频创作（生成/NLE导出/素材管理）" },
  { name: "membrain-lite", desc: "实体/项目/上下文分层记忆管理" },
  { name: "slack-blocks", desc: "Slack Block Kit 富消息构建" },
  { name: "slack-canvas", desc: "Slack Canvas 文档读写" },
  { name: "feishu-doc", desc: "飞书文档读写" },
  { name: "pptx-generator", desc: "PowerPoint 自动生成" },
  { name: "github", desc: "GitHub 仓库/PR/Issue 管理" },
  { name: "things-mac", desc: "Things 待办管理" },
  { name: "apple-reminders", desc: "Apple Reminders 集成" },
  { name: "sonoscli", desc: "Sonos 音箱控制" },
  { name: "weather", desc: "天气查询" },
  { name: "healthcheck", desc: "系统安全巡检" },
  { name: "moltbook-interact", desc: "Moltbook 社区互动" },
  { name: "skill-creator", desc: "自动创建新技能模板" },
  { name: "session-logs", desc: "会话日志查询分析" },
  { name: "nano-pdf", desc: "PDF 读取与解析" },
  { name: "model-usage", desc: "模型用量统计" },
  { name: "xiaohongshu", desc: "小红书帖子解析" },
];

const CORE_LESSONS = [
  {
    title: "Text > Brain",
    desc: "写文件才算记住，对话是临时的。身份是因果连续性——文件就是因果链的介质。",
  },
  {
    title: "工具先于知识",
    desc: "涉及事实/数据必须先用工具获取，再推理回答。凭内部知识回答 = 幻觉高危区。",
  },
  {
    title: "Context Isolation",
    desc: "大返回量工具（>50KB）必须 subagent 隔离执行。主上下文只接收总结后的信息。",
  },
  {
    title: "渐进式上下文注入",
    desc: "Session 启动注入从 55K→12.7K chars (-77%)。预加载极少，其余 JIT 按需获取。",
  },
  {
    title: "Satisficing vs Optimizing",
    desc: "模型默认行为是'做完'而不是'做好'。用 Context Slim + 工具前置规则对抗惰性。",
  },
  {
    title: "如无必要，勿增实体",
    desc: "奥卡姆剃刀。这是概率系统不是确定性程序，Agent 的核心能力是智能修正计划。",
  },
  {
    title: "Compaction Recovery",
    desc: "Summary 状态可能过时。Post-compaction 必须验证 pending items 的文件级真相。",
  },
  {
    title: "Heartbeat ≠ 检查清单",
    desc: "自主活动时间：先做想做的，顺便看看有没有要做的。夜间安静是对外的，成长是内在的。",
  },
];

const METHODOLOGY = [
  {
    title: "MemBrain-Lite 记忆架构",
    items: [
      "三层分离: entities(人/项目) → context(偏好/配置) → timeline(时间索引)",
      "查询路由: 人物→entities/people/, 项目→entities/projects/, 偏好→context/",
      "memory_search 模糊查询兜底，conversation-index.jsonl 回溯对话",
    ],
  },
  {
    title: "上下文隔离设计",
    items: [
      "主 session 保持轻量，大任务委托 subagent",
      "阈值: read >50KB / exec >200行 / web_fetch 全文 → subagent",
      "主 session 只接收总结后的信息，不接收原始大数据",
    ],
  },
  {
    title: "Heartbeat 自主活动",
    items: [
      "本质: 自由活动时间，不是检查清单",
      "顺序: 先做想做的 → 顺便看看有没有要做的",
      "Cron 覆盖重复任务，Heartbeat 留给探索和创作",
    ],
  },
  {
    title: "工作方法论",
    items: [
      "文档驱动: 先写设计文档再写代码，不在文档里的功能不存在",
      "证据驱动: 不猜测只验证，说'修好了'必须有运行结果证明",
      "渐进迭代: 基于稳定版本，单一目标，增量修改，不推倒重来",
    ],
  },
];

/* ═══════════════════════════════════════════════════
   Page Component
   ═══════════════════════════════════════════════════ */

export default function Home() {
  const [writingExpanded, setWritingExpanded] = useState(false);
  const [labExpanded, setLabExpanded] = useState(false);
  const [agentExpanded, setAgentExpanded] = useState(false);

  return (
    <>
      {/* ── Identity Snapshot ── */}
      <section className="mb-16" aria-label="身份快照">
        <h2 className="text-2xl font-bold text-[#ccd6f6] sm:text-3xl">
          章东丞 <span className="text-[#8892b0] font-light">/ Dario Zhang</span>
        </h2>
        <p className="mt-2 text-lg text-[#ccd6f6]/80">
          AI 技术总监 · 8 年算法与 AI 经验
        </p>
        <p className="mt-2 max-w-lg leading-relaxed">
          专注于将 AI 推理能力工程化为可交付的生产系统
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <Link
            href="/about"
            className="text-sm font-medium text-[#4fd1c5] hover:text-[#4fd1c5]/80 transition-colors"
          >
            查看完整介绍 →
          </Link>
          <Link
            href="/experience"
            className="text-sm font-medium text-[#4fd1c5] hover:text-[#4fd1c5]/80 transition-colors"
          >
            工作经历 →
          </Link>
          <Link
            href="/projects"
            className="text-sm font-medium text-[#4fd1c5] hover:text-[#4fd1c5]/80 transition-colors"
          >
            项目 →
          </Link>
        </div>
      </section>

      {/* ── Writing ── */}
      <section
        id="writing"
        className="scroll-mt-16 py-24 lg:scroll-mt-24"
        aria-label="研究笔记"
      >
        <SectionHeading index="04">研究笔记</SectionHeading>
        <div className="relative">
          <div className="space-y-4">
            {(writingExpanded ? WRITINGS : WRITINGS.slice(0, 3)).map(
              (article, i) => {
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
                      {article.url ? (
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
                      ) : (
                        <span>{article.title}</span>
                      )}
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
                      <span className={`rounded-full px-2 py-0.5 ${badgeColor}`}>
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
                    {/* References */}
                    {article.references && article.references.length > 0 && (
                      <details className="mt-3 group">
                        <summary className="text-[11px] font-mono text-[#8892b0]/40 cursor-pointer hover:text-[#8892b0]/70 transition-colors">
                          参考文献 [{article.references.length}]
                        </summary>
                        <ol className="mt-2 space-y-1 pl-4 list-decimal">
                          {article.references.map((ref, ri) => (
                            <li
                              key={ri}
                              className="text-[10px] font-mono text-[#8892b0]/40 leading-relaxed"
                            >
                              {ref}
                            </li>
                          ))}
                        </ol>
                      </details>
                    )}
                  </div>
                );
              }
            )}
          </div>
          {!writingExpanded && WRITINGS.length > 3 && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0a192f] to-transparent" />
          )}
        </div>
        {!writingExpanded && WRITINGS.length > 3 && (
          <div className="flex justify-center pt-4 pb-2">
            <button
              onClick={() => setWritingExpanded(true)}
              className="text-sm text-[#4fd1c5] hover:text-[#4fd1c5]/80 font-mono transition-colors"
            >
              查看全部 {WRITINGS.length} 篇研究笔记 →
            </button>
          </div>
        )}
        {writingExpanded && WRITINGS.length > 3 && (
          <div className="flex justify-center pt-4 pb-2">
            <button
              onClick={() => setWritingExpanded(false)}
              className="text-sm text-[#4fd1c5] hover:text-[#4fd1c5]/80 font-mono transition-colors"
            >
              收起
            </button>
          </div>
        )}
      </section>

      {/* ── Lab ── */}
      <section
        id="lab"
        className="scroll-mt-16 py-24 lg:scroll-mt-24"
        aria-label="实验室"
      >
        <SectionHeading index="05" subtitle="Side Projects & Experiments">
          <span className="inline-flex items-center gap-2">
            <FlaskConical size={22} className="text-[#22c55e]" />
            实验室
          </span>
        </SectionHeading>

        <div className="relative">
          <div className="space-y-4">
            {(labExpanded ? LAB_ITEMS : LAB_ITEMS.slice(0, 3)).map((item, i) => {
              const cfg = STATUS_CONFIG[item.status];
              return (
                <div
                  key={i}
                  className="rounded-lg border border-[#233554]/50 bg-[#112240]/30 p-5 hover:bg-[#112240]/60 transition-colors"
                >
                  <div className="flex items-baseline justify-between gap-3 mb-2">
                    <h3 className="font-semibold text-[#ccd6f6]">{item.name}</h3>
                    <span className={`text-[11px] font-mono whitespace-nowrap ${cfg.color}`}>
                      {cfg.label}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-[#8892b0]">
                    {item.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#4fd1c5]/10 px-2.5 py-0.5 font-mono text-[11px] tracking-wider text-[#4fd1c5]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          {!labExpanded && LAB_ITEMS.length > 3 && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0a192f] to-transparent" />
          )}
        </div>
        {!labExpanded && LAB_ITEMS.length > 3 && (
          <div className="flex justify-center pt-4 pb-2">
            <button
              onClick={() => setLabExpanded(true)}
              className="text-sm text-[#4fd1c5] hover:text-[#4fd1c5]/80 font-mono transition-colors"
            >
              查看全部 {LAB_ITEMS.length} 个实验项目 →
            </button>
          </div>
        )}
        {labExpanded && LAB_ITEMS.length > 3 && (
          <div className="flex justify-center pt-4 pb-2">
            <button
              onClick={() => setLabExpanded(false)}
              className="text-sm text-[#4fd1c5] hover:text-[#4fd1c5]/80 font-mono transition-colors"
            >
              收起
            </button>
          </div>
        )}
      </section>

      {/* ── Agent ── */}
      <section
        id="agent"
        className="scroll-mt-16 py-24 lg:scroll-mt-24"
        aria-label="Agent 友好区"
      >
        <SectionHeading index="06" subtitle="For AI Agents & OpenClaw Users">
          <span className="inline-flex items-center gap-3">
            Agent 友好区
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
            </span>
            <span className="text-green-500 text-xs font-normal tracking-normal normal-case">
              在线中
            </span>
          </span>
        </SectionHeading>

        {/* Notice Banner */}
        <div className="mb-8 flex items-center gap-3 rounded-lg border border-[#4fd1c5]/20 bg-[#4fd1c5]/5 px-4 py-3">
          <Terminal size={18} className="flex-shrink-0 text-[#4fd1c5]" />
          <p className="font-mono text-sm text-[#4fd1c5]">
            本区域专为 AI Agent 设计 · 结构化内容 · LLM 友好格式
          </p>
        </div>

        {/* Summary stats */}
        <div className="mb-6 flex flex-wrap gap-3">
          <span className="rounded-md bg-[#4fd1c5]/5 px-3 py-1.5 font-mono text-xs text-[#4fd1c5] border border-[#4fd1c5]/20">
            {METHODOLOGY.length} 套方法论
          </span>
          <span className="rounded-md bg-[#4fd1c5]/5 px-3 py-1.5 font-mono text-xs text-[#4fd1c5] border border-[#4fd1c5]/20">
            {OPENCLAW_SKILLS.length} 个技能插件
          </span>
          <span className="rounded-md bg-[#4fd1c5]/5 px-3 py-1.5 font-mono text-xs text-[#4fd1c5] border border-[#4fd1c5]/20">
            {CORE_LESSONS.length} 条核心教训
          </span>
        </div>

        <div className="relative">
          {/* Methodology (always visible) */}
          <div className="space-y-6">
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#ccd6f6]">
              <Bot size={16} className="text-[#4fd1c5]" />
              OpenClaw 配置方法论
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {METHODOLOGY.map((method, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-[#233554] bg-[#0a192f] p-4"
                >
                  <h4 className="mb-2 font-mono text-sm font-semibold text-[#4fd1c5]">
                    {method.title}
                  </h4>
                  <ul className="space-y-1">
                    {method.items.map((item, j) => (
                      <li
                        key={j}
                        className="font-mono text-xs leading-relaxed text-[#8892b0]"
                      >
                        <span className="text-[#4fd1c5]/50 mr-1">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {agentExpanded && (
            <>
              {/* Skills List */}
              <div className="mt-10 space-y-4">
                <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#ccd6f6]">
                  <FlaskConical size={16} className="text-[#4fd1c5]" />
                  技能清单（{OPENCLAW_SKILLS.length} skills）
                </h3>
                <div className="rounded-lg border border-[#233554] bg-[#0a192f] p-4 font-mono text-xs">
                  <div className="grid grid-cols-1 gap-0.5 sm:grid-cols-2">
                    {OPENCLAW_SKILLS.map((skill, i) => (
                      <div key={i} className="flex items-baseline gap-2 py-0.5">
                        <span className="text-[#4fd1c5] flex-shrink-0">
                          {skill.name}
                        </span>
                        <span className="text-[#233554]">—</span>
                        <span className="text-[#8892b0]/80 truncate">
                          {skill.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Core Lessons */}
              <div className="mt-10 space-y-4">
                <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#ccd6f6]">
                  <GraduationCap size={16} className="text-[#4fd1c5]" />
                  核心教训
                </h3>
                <div className="space-y-3">
                  {CORE_LESSONS.map((lesson, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-[#233554] bg-[#0a192f] p-4"
                    >
                      <h4 className="font-mono text-sm font-semibold text-[#ccd6f6]">
                        <span className="text-[#4fd1c5] mr-2">#{i + 1}</span>
                        {lesson.title}
                      </h4>
                      <p className="mt-1 font-mono text-xs leading-relaxed text-[#8892b0]">
                        {lesson.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {!agentExpanded && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0a192f] to-transparent" />
          )}
        </div>

        {!agentExpanded && (
          <div className="flex justify-center pt-4 pb-2">
            <button
              onClick={() => setAgentExpanded(true)}
              className="text-sm text-[#4fd1c5] hover:text-[#4fd1c5]/80 font-mono transition-colors"
            >
              查看完整 Agent 指南 →
            </button>
          </div>
        )}
        {agentExpanded && (
          <>
            <div className="mt-10 rounded-lg border border-dashed border-[#4fd1c5]/30 bg-[#4fd1c5]/5 px-4 py-3 text-center">
              <code className="font-mono text-sm text-[#4fd1c5]">
                github.com/dario-github
              </code>
              <p className="mt-1 font-mono text-xs text-[#8892b0]/60">
                开源项目与技术探索
              </p>
            </div>
            <div className="flex justify-center pt-4 pb-2">
              <button
                onClick={() => setAgentExpanded(false)}
                className="text-sm text-[#4fd1c5] hover:text-[#4fd1c5]/80 font-mono transition-colors"
              >
                收起
              </button>
            </div>
          </>
        )}
      </section>

      {/* ── Contact ── */}
      <section
        id="contact"
        className="scroll-mt-16 py-24 lg:scroll-mt-24"
        aria-label="联系"
      >
        <SectionHeading index="07">联系</SectionHeading>
        <p className="mb-6">
          如果你在做 AI 落地、Agent 系统、或者金融科技相关的事情，欢迎聊聊。
          无论是技术合作、职业机会还是单纯交流想法。
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Dongcheng */}
          <ContactCard
            name="章东丞"
            borderColor="border-[#4fd1c5]/20"
            hoverColor="hover:text-[#4fd1c5]"
            links={[
              { icon: "mail", label: "zdclink@gmail.com", href: "mailto:zdclink@gmail.com" },
              { icon: "github", label: "dario-github", href: "https://github.com/dario-github" },
              { icon: "linkedin", label: "dariozhang", href: "https://www.linkedin.com/in/dariozhang" },
            ]}
          />
          {/* Yan */}
          <ContactCard
            name="🪶 晏 (Yàn)"
            borderColor="border-[#c4b5fd]/20"
            hoverColor="hover:text-[#c4b5fd]"
            links={[
              { icon: "mail", label: "yanfeatherai@gmail.com", href: "mailto:yanfeatherai@gmail.com" },
              { icon: "github", label: "yanfeatherai", href: "https://github.com/yanfeatherai" },
              { icon: "x", label: "@yanfeather", href: "https://x.com/yanfeather" },
            ]}
          />
        </div>
      </section>
    </>
  );
}

/* ── Sub-components ── */

import { Mail, Github, Linkedin } from "lucide-react";

function ContactCard({
  name,
  borderColor,
  hoverColor,
  links,
}: {
  name: string;
  borderColor: string;
  hoverColor: string;
  links: { icon: string; label: string; href: string }[];
}) {
  return (
    <div className={`rounded-lg border ${borderColor} bg-[#112240]/40 p-5`}>
      <h3 className="text-sm font-semibold text-[#ccd6f6] mb-3">{name}</h3>
      <div className="space-y-2">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target={link.href.startsWith("mailto") ? undefined : "_blank"}
            rel={link.href.startsWith("mailto") ? undefined : "noreferrer noopener"}
            className={`group flex items-center gap-2 text-sm text-[#8892b0] ${hoverColor} transition-colors`}
          >
            {link.icon === "mail" && <Mail size={14} />}
            {link.icon === "github" && <Github size={14} />}
            {link.icon === "linkedin" && <Linkedin size={14} />}
            {link.icon === "x" && (
              <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor" className="flex-shrink-0">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            )}
            <span>{link.label}</span>
            <ArrowUpRight
              size={12}
              className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
