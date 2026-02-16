import { Terminal, GraduationCap, Bot } from "lucide-react";
import Link from "next/link";
import { OPENCLAW_SKILLS, CORE_LESSONS, METHODOLOGY } from "@/data/agent";

export default function AgentPage() {
  return (
    <>
      {/* Back link */}
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm font-medium text-[#c4b5fd] hover:text-[#c4b5fd]/80 transition-colors"
        >
          ← 返回首页
        </Link>
      </div>

      {/* Header */}
      <section aria-label="Agent 能力全景" className="mb-16">
        <h1 className="text-2xl font-bold text-[#ccd6f6] sm:text-3xl inline-flex items-center gap-3">
          Agent 能力全景
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c4b5fd] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#c4b5fd]" />
          </span>
        </h1>
        <p className="mt-1 text-sm text-[#8892b0]">
          OpenClaw · AI Agent OS
        </p>
        <p className="mt-4 text-sm leading-relaxed text-[#8892b0] max-w-2xl">
          OpenClaw 是晏的身体——{OPENCLAW_SKILLS.length} 个技能插件、MemBrain 分层记忆、Sub-agent
          架构。从日常对话到深度研究、从股票分析到视频生产，一套系统覆盖。
          这里是完整的技能清单和从实践中沉淀的核心教训。
        </p>

        {/* Stats */}
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="rounded-md bg-[#c4b5fd]/5 px-3 py-1.5 font-mono text-xs text-[#c4b5fd] border border-[#c4b5fd]/20">
            {OPENCLAW_SKILLS.length} 个技能
          </span>
          <span className="rounded-md bg-[#c4b5fd]/5 px-3 py-1.5 font-mono text-xs text-[#c4b5fd] border border-[#c4b5fd]/20">
            {METHODOLOGY.length} 套方法论
          </span>
          <span className="rounded-md bg-[#c4b5fd]/5 px-3 py-1.5 font-mono text-xs text-[#c4b5fd] border border-[#c4b5fd]/20">
            {CORE_LESSONS.length} 条核心教训
          </span>
        </div>
      </section>

      {/* Skill List */}
      <section className="mb-16" aria-label="技能清单">
        <h2 className="text-lg font-bold text-[#ccd6f6] mb-4 flex items-center gap-2">
          <Terminal size={18} className="text-[#c4b5fd]" />
          技能清单
        </h2>
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
      </section>

      {/* Core Lessons */}
      <section className="mb-16" aria-label="核心教训">
        <h2 className="text-lg font-bold text-[#ccd6f6] mb-4 flex items-center gap-2">
          <GraduationCap size={18} className="text-[#c4b5fd]" />
          核心教训
        </h2>
        <div className="grid grid-cols-1 gap-3">
          {CORE_LESSONS.map((lesson, i) => (
            <div
              key={i}
              className="rounded-lg border border-[#c4b5fd]/10 bg-[#c4b5fd]/[0.02] p-4"
            >
              <h3 className="font-mono text-sm font-semibold text-[#c4b5fd] mb-1">
                {lesson.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#8892b0]">
                {lesson.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Methodology */}
      <section className="mb-16" aria-label="方法论">
        <h2 className="text-lg font-bold text-[#ccd6f6] mb-4 flex items-center gap-2">
          <Bot size={18} className="text-[#c4b5fd]" />
          方法论
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {METHODOLOGY.map((method, i) => (
            <div
              key={i}
              className="rounded-lg border border-[#233554] bg-[#0a192f] p-4"
            >
              <h3 className="mb-2 font-mono text-sm font-semibold text-[#c4b5fd]">
                {method.title}
              </h3>
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
      </section>

      {/* GitHub */}
      <div className="rounded-lg border border-dashed border-[#c4b5fd]/30 bg-[#c4b5fd]/5 px-4 py-3 text-center mb-16">
        <code className="font-mono text-sm text-[#c4b5fd]">
          github.com/dario-github
        </code>
        <p className="mt-1 font-mono text-xs text-[#8892b0]/60">
          开源项目与技术探索
        </p>
      </div>

      {/* Back link */}
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm font-medium text-[#c4b5fd] hover:text-[#c4b5fd]/80 transition-colors"
        >
          ← 返回首页
        </Link>
      </div>
    </>
  );
}
