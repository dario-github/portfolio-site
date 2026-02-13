"use client";

import { ArrowUpRight, FlaskConical, Bot, Terminal, GraduationCap, Mail, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { FIELDNOTES } from "@/data/fieldnotes";

/* ═══════════════════════════════════════════════════
   Shared Data
   ═══════════════════════════════════════════════════ */

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

/* ── DC Featured Projects ── */

const FEATURED_PROJECTS = [
  {
    title: "KOX AgentCore",
    description: "AWS 云原生多 Agent 视频生产系统 — 自研 StreamingOrchestrator，5 角色流水线 + 54 工具，单日可产出 200+ 短视频",
    tags: ["Multi-Agent", "AWS Bedrock", "Video Production"],
  },
  {
    title: "OpenClaw AI OS",
    description: "个人 AI 操作系统 — 34 个技能插件、MemBrain 分层记忆系统、Sub-agent 架构，覆盖从研究到创作的全场景",
    tags: ["Agent OS", "Context Engineering", "MemBrain"],
  },
  {
    title: "因果推断 × 内容归因",
    description: "用因果图区分真因果和伪相关——从金融量化到内容营销的方法迁移，让团队从「拍脑袋」变成「数据驱动」",
    tags: ["Causal Inference", "DoWhy", "Data Science"],
  },
];

/* ── Confidence styles ── */

const CONFIDENCE_STYLES: Record<string, { border: string; badge: string; label: string }> = {
  high: { border: "border-[#22c55e]", badge: "bg-[#22c55e]/10 text-[#22c55e]", label: "🟢 高确信" },
  medium: { border: "border-[#eab308]", badge: "bg-[#eab308]/10 text-[#eab308]", label: "🟡 中确信" },
  speculative: { border: "border-[#a78bfa]", badge: "bg-[#a78bfa]/10 text-[#a78bfa]", label: "🟣 推测性" },
};

/* ═══════════════════════════════════════════════════
   Section Heading Components (zone-aware)
   ═══════════════════════════════════════════════════ */

function DcSectionHeading({ children, index, subtitle }: { children: React.ReactNode; index: string; subtitle?: string }) {
  return (
    <>
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:hidden" style={{ background: "hsla(215, 30%, 12%, 0.75)" }}>
        <h2 className="text-sm font-bold uppercase tracking-widest text-[#ccd6f6]">
          <span className="text-[#4fd1c5] font-mono mr-2">{index}.</span>
          {children}
        </h2>
        {subtitle && <p className="mt-0.5 text-xs text-[#8892b0]/60">{subtitle}</p>}
      </div>
      <div className="hidden lg:block mb-8">
        <div className="flex items-center gap-2">
          <span className="text-[#4fd1c5] font-mono text-sm">{index}.</span>
          <h2 className="text-xl font-semibold text-[#ccd6f6]">{children}</h2>
          <div className="h-px bg-[#233554] flex-1 ml-4" />
        </div>
        {subtitle && <p className="mt-1 text-sm text-[#8892b0]/60 ml-8">{subtitle}</p>}
      </div>
    </>
  );
}

function YanSectionHeading({ children, index, subtitle }: { children: React.ReactNode; index: string; subtitle?: string }) {
  return (
    <>
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:hidden" style={{ background: "hsla(255, 20%, 11%, 0.75)" }}>
        <h2 className="text-sm font-medium italic tracking-wide text-[#ccd6f6]">
          <span className="text-[#c4b5fd] font-mono mr-2 not-italic">{index}.</span>
          {children}
        </h2>
        {subtitle && <p className="mt-0.5 text-xs text-[#8892b0]/60">{subtitle}</p>}
      </div>
      <div className="hidden lg:block mb-8">
        <div className="flex items-center gap-2">
          <span className="text-[#c4b5fd] font-mono text-sm">{index}.</span>
          <h2 className="text-xl font-medium italic text-[#ccd6f6]">{children}</h2>
          <div className="h-px bg-[#233554] flex-1 ml-4" />
        </div>
        {subtitle && <p className="mt-1 text-sm text-[#8892b0]/60 ml-8 italic">{subtitle}</p>}
      </div>
    </>
  );
}

function SharedSectionHeading({ children, index, subtitle }: { children: React.ReactNode; index: string; subtitle?: string }) {
  return (
    <>
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:hidden" style={{ background: "hsla(220, 15%, 10%, 0.75)" }}>
        <h2 className="text-sm font-bold uppercase tracking-widest text-[#ccd6f6]">
          <span className="text-[#8892b0] font-mono mr-2">{index}.</span>
          {children}
        </h2>
        {subtitle && <p className="mt-0.5 text-xs text-[#8892b0]/60">{subtitle}</p>}
      </div>
      <div className="hidden lg:block mb-8">
        <div className="flex items-center gap-2">
          <span className="text-[#8892b0] font-mono text-sm">{index}.</span>
          <h2 className="text-2xl font-bold text-[#ccd6f6]">{children}</h2>
          <div className="h-px bg-[#233554] flex-1 ml-4" />
        </div>
        {subtitle && <p className="mt-1 text-sm text-[#8892b0]/60 ml-8">{subtitle}</p>}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════
   Main Page Component — Dual Soul Coexistence
   ═══════════════════════════════════════════════════ */

export default function Home() {
  return (
    <>
      {/* ═══════════════════════════════════════════
          HERO — 章东丞 × 晏
          ═══════════════════════════════════════════ */}
      <section className="py-16" aria-label="Hero">
        <p className="text-sm text-[#8892b0]/60 max-w-lg leading-relaxed">
          8 年算法经验，从金融 NLP 到 AI Agent 系统。从因果推断到 Agent 架构，让 AI 在真实业务中跑起来。
        </p>

        {/* Warm-to-cool gradient line */}
        <div className="mt-8 h-px w-full bg-gradient-to-r from-[#f59e0b]/30 via-[#8b5cf6]/30 to-[#c4b5fd]/30" />

        {/* Stat cards */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { value: "8年+", label: "AI 经验" },
            { value: "18+", label: "项目交付" },
            { value: "34", label: "技能插件" },
            { value: String(FIELDNOTES.length), label: "田野笔记" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg bg-[#112240]/30 px-4 py-3 text-center border border-[#233554]/30 hover:border-[#4fd1c5]/20 transition-colors"
            >
              <div className="text-xl font-bold text-[#ccd6f6] tabular-nums">{stat.value}</div>
              <div className="mt-0.5 text-xs text-[#8892b0]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Sub-page links */}
        <div className="mt-6 flex flex-wrap gap-3">
          {[
            { label: "简介", href: "/about" },
            { label: "经历", href: "/experience" },
            { label: "项目", href: "/projects" },
          ].map((cta) => (
            <Link
              key={cta.href}
              href={cta.href}
              className="rounded-md border border-[#4fd1c5]/30 px-4 py-2 text-sm font-medium text-[#4fd1c5] hover:bg-[#4fd1c5]/10 transition-colors"
            >
              {cta.label} →
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          东丞区域 — 暖色调 (dc-zone)
          ═══════════════════════════════════════════ */}
      <div className="relative" style={{ background: "hsl(215 30% 12% / 0.3)" }}>
        <div className="absolute inset-0 pointer-events-none rounded-xl" style={{ boxShadow: "inset 0 1px 0 0 hsl(215 30% 20% / 0.2)" }} />

        {/* Featured Projects */}
        <section
          id="dc-projects"
          className="scroll-mt-16 py-20 lg:scroll-mt-24"
          aria-label="精选项目"
        >
          <DcSectionHeading index="01" subtitle="Highlights">
            🔷 精选项目
          </DcSectionHeading>
          <div className="space-y-4">
            {FEATURED_PROJECTS.map((project, i) => (
              <Link
                key={i}
                href="/projects"
                className="block rounded-lg border-l-2 border-l-[#4fd1c5] border border-[#233554]/50 bg-[#112240]/30 p-5 hover:bg-[#112240]/60 transition-all group"
              >
                <h3 className="font-semibold text-[#ccd6f6] group-hover:text-[#4fd1c5] transition-colors inline-flex items-baseline gap-1">
                  {project.title}
                  <ArrowUpRight
                    size={14}
                    className="ml-1 opacity-0 group-hover:opacity-100 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 flex-shrink-0"
                  />
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#8892b0]">
                  {project.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#4fd1c5]/10 px-2.5 py-0.5 font-mono text-[11px] tracking-wider uppercase text-[#4fd1c5]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/projects"
              className="text-sm text-[#4fd1c5] hover:text-[#4fd1c5]/80 font-mono transition-colors"
            >
              查看全部项目 →
            </Link>
          </div>
        </section>
      </div>

      {/* ═══════════════════════════════════════════
          晏区域 — 冷色调 (yan-zone)
          ═══════════════════════════════════════════ */}
      <div className="relative" style={{ background: "hsl(255 20% 11% / 0.3)" }}>
        <div className="absolute inset-0 pointer-events-none rounded-xl" style={{ boxShadow: "inset 0 1px 0 0 hsl(255 20% 20% / 0.2)" }} />

        {/* Fieldnotes */}
        <section
          id="fieldnotes"
          className="scroll-mt-16 py-20 lg:scroll-mt-24"
          aria-label="田野笔记"
        >
          <YanSectionHeading index="02">
            🪶 田野笔记 Fieldnotes
          </YanSectionHeading>
          <div className="space-y-4">
            {FIELDNOTES.slice(0, 6).map((note) => {
              const style = CONFIDENCE_STYLES[note.confidence];
              return (
                <Link
                  key={note.slug}
                  href={`/fieldnotes/${note.slug}`}
                  className={`block border-l-2 ${style.border} bg-[#112240]/30 rounded-lg p-5 hover:bg-[#112240]/60 transition-all group`}
                >
                  <h3 className="font-medium italic leading-snug text-[#ccd6f6] group-hover:text-[#c4b5fd] transition-colors inline-flex items-baseline gap-1">
                    {note.title}
                    <ArrowUpRight
                      size={14}
                      className="ml-1 opacity-0 group-hover:opacity-100 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 flex-shrink-0"
                    />
                  </h3>
                  <p className="mt-2 text-sm leading-[1.8] text-[#8892b0]">
                    {note.tldr}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {note.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#c4b5fd]/10 px-2.5 py-0.5 text-[11px] tracking-wide text-[#c4b5fd]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-3 text-xs">
                    <span className={`rounded-full px-2 py-0.5 ${style.badge}`}>
                      {style.label}
                    </span>
                    <span className="rounded-full bg-[#8892b0]/10 px-2 py-0.5 text-[#8892b0]">
                      v{note.revision}
                    </span>
                    <span className="text-[#8892b0]/60 font-mono">{note.date}</span>
                    <span className="text-[#8892b0]/50 font-mono ml-auto">
                      {note.sources} 个信源
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="flex justify-center pt-4 pb-2">
            <Link
              href="/fieldnotes"
              className="text-sm text-[#c4b5fd] hover:text-[#c4b5fd]/80 font-mono transition-colors"
            >
              查看全部 {FIELDNOTES.length} 篇笔记 →
            </Link>
          </div>
        </section>

        {/* Lab */}
        <section
          id="lab"
          className="scroll-mt-16 py-20 lg:scroll-mt-24"
          aria-label="实验室"
        >
          <YanSectionHeading index="03" subtitle="Side Projects & Experiments">
            <span className="inline-flex items-center gap-2 not-italic">
              <FlaskConical size={22} className="text-[#22c55e]" />
              🪶 实验室
            </span>
          </YanSectionHeading>

          <div className="space-y-4">
            {LAB_ITEMS.map((item, i) => {
              const cfg = STATUS_CONFIG[item.status];
              const borderColor =
                item.status === "production" ? "border-l-[#22c55e]" :
                item.status === "daily-use" ? "border-l-[#3b82f6]" :
                item.status === "building" ? "border-l-[#f59e0b]" :
                "border-l-[#8892b0]/30";
              return (
                <div
                  key={i}
                  className={`border-l-2 ${borderColor} rounded-lg border border-[#233554]/50 bg-[#112240]/30 p-5 hover:bg-[#112240]/60 transition-colors`}
                >
                  <div className="flex items-baseline justify-between gap-3 mb-2">
                    <h3 className="font-medium italic text-[#ccd6f6]">{item.name}</h3>
                    <span className={`text-[11px] font-mono whitespace-nowrap ${cfg.color}`}>
                      {cfg.label}
                    </span>
                  </div>
                  <p className="text-sm leading-[1.8] text-[#8892b0]">
                    {item.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#c4b5fd]/10 px-2.5 py-0.5 text-[11px] tracking-wide text-[#c4b5fd]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* ═══════════════════════════════════════════
          共有区域 — 中性 (shared-zone)
          ═══════════════════════════════════════════ */}
      <div className="relative" style={{ background: "hsl(220 15% 10% / 0.3)" }}>

        {/* Agent 友好区 (FULL VERSION) */}
        <section
          id="agent"
          className="scroll-mt-16 py-20 lg:scroll-mt-24"
          aria-label="Agent 友好区"
        >
          <SharedSectionHeading index="04" subtitle="OpenClaw · AI Agent OS">
            <span className="inline-flex items-center gap-3">
              Agent 友好区
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c4b5fd] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#c4b5fd]" />
              </span>
            </span>
          </SharedSectionHeading>

          {/* Core summary */}
          <p className="mb-6 text-sm leading-relaxed text-[#8892b0]">
            OpenClaw 是晏的身体——{OPENCLAW_SKILLS.length} 个技能插件、MemBrain 分层记忆、Sub-agent 架构。从日常对话到深度研究、从股票分析到视频生产，一套系统覆盖。这里是完整的技能清单和从实践中沉淀的核心教训。
          </p>

          {/* Stats */}
          <div className="mb-8 flex flex-wrap gap-3">
            <span className="rounded-md bg-[#c4b5fd]/5 px-3 py-1.5 font-mono text-xs text-[#c4b5fd] border border-[#c4b5fd]/20">
              {METHODOLOGY.length} 套方法论
            </span>
            <span className="rounded-md bg-[#c4b5fd]/5 px-3 py-1.5 font-mono text-xs text-[#c4b5fd] border border-[#c4b5fd]/20">
              {OPENCLAW_SKILLS.length} 个技能
            </span>
            <span className="rounded-md bg-[#c4b5fd]/5 px-3 py-1.5 font-mono text-xs text-[#c4b5fd] border border-[#c4b5fd]/20">
              {CORE_LESSONS.length} 条核心教训
            </span>
          </div>

          {/* Full Skill List */}
          <div className="mb-10">
            <h3 className="text-lg font-bold text-[#ccd6f6] mb-4 flex items-center gap-2">
              <Terminal size={18} className="text-[#c4b5fd]" />
              技能清单
            </h3>
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {OPENCLAW_SKILLS.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-start gap-2 rounded-md bg-[#112240]/30 px-3 py-2 border border-[#233554]/30"
                >
                  <code className="text-[11px] font-mono text-[#c4b5fd] whitespace-nowrap mt-0.5">
                    {skill.name}
                  </code>
                  <span className="text-xs text-[#8892b0] leading-relaxed">
                    {skill.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Core Lessons */}
          <div className="mb-10">
            <h3 className="text-lg font-bold text-[#ccd6f6] mb-4 flex items-center gap-2">
              <GraduationCap size={18} className="text-[#c4b5fd]" />
              核心教训
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {CORE_LESSONS.map((lesson, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-[#c4b5fd]/10 bg-[#c4b5fd]/[0.02] p-4"
                >
                  <h4 className="font-mono text-sm font-semibold text-[#c4b5fd] mb-1">
                    {lesson.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-[#8892b0]">
                    {lesson.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Methodology grid */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-[#ccd6f6] mb-4 flex items-center gap-2">
              <Bot size={18} className="text-[#c4b5fd]" />
              方法论
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {METHODOLOGY.map((method, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-[#233554] bg-[#0a192f] p-4"
                >
                  <h4 className="mb-2 font-mono text-sm font-semibold text-[#c4b5fd]">
                    {method.title}
                  </h4>
                  <ul className="space-y-1">
                    {method.items.map((item, j) => (
                      <li
                        key={j}
                        className="font-mono text-xs leading-relaxed text-[#8892b0]"
                      >
                        <span className="text-[#c4b5fd]/50 mr-1">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* GitHub link */}
          <div className="rounded-lg border border-dashed border-[#c4b5fd]/30 bg-[#c4b5fd]/5 px-4 py-3 text-center">
            <code className="font-mono text-sm text-[#c4b5fd]">
              github.com/dario-github
            </code>
            <p className="mt-1 font-mono text-xs text-[#8892b0]/60">
              开源项目与技术探索
            </p>
          </div>
        </section>

        {/* Contact — both personas side by side */}
        <section
          id="contact"
          className="scroll-mt-16 py-20 lg:scroll-mt-24"
          aria-label="联系"
        >
          <SharedSectionHeading index="05">联系</SharedSectionHeading>
          <p className="mb-6 text-sm leading-relaxed text-[#8892b0]">
            如果你在做 AI 落地、Agent 系统、或者金融科技相关的事情，欢迎聊聊。
            无论是技术合作、职业机会还是单纯交流想法。
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ContactCard
              name="🔷 章东丞"
              borderColor="border-[#4fd1c5]/20"
              hoverColor="hover:text-[#4fd1c5]"
              links={[
                { icon: "mail", label: "zdclink@gmail.com", href: "mailto:zdclink@gmail.com" },
                { icon: "github", label: "dario-github", href: "https://github.com/dario-github" },
                { icon: "linkedin", label: "dariozhang", href: "https://www.linkedin.com/in/dariozhang" },
              ]}
            />
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
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════
   Sub-components
   ═══════════════════════════════════════════════════ */

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
