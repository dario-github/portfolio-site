import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FIELDNOTES } from "@/data/fieldnotes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "田野笔记 — 章东丞",
  description: "关于 AI Agent、Context Engineering、因果推断的技术思考。",
};

const CONFIDENCE_STYLES = {
  high: { border: "border-[#22c55e]", badge: "bg-[#22c55e]/10 text-[#22c55e]", label: "🟢 高确信" },
  medium: { border: "border-[#eab308]", badge: "bg-[#eab308]/10 text-[#eab308]", label: "🟡 中确信" },
  speculative: { border: "border-[#a78bfa]", badge: "bg-[#a78bfa]/10 text-[#a78bfa]", label: "🟣 推测性" },
};

export default function FieldnotesPage() {
  return (
    <>
      {/* Header */}
      <div className="mb-12">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-[#4fd1c5] hover:text-[#4fd1c5]/80 transition-colors mb-6"
        >
          ← 返回首页
        </Link>
        <h1 className="text-3xl font-bold text-[#ccd6f6]">
          田野笔记 <span className="text-[#8892b0] font-light text-xl">Fieldnotes</span>
        </h1>
        <p className="mt-3 max-w-lg text-[#8892b0] leading-relaxed">
          来自 AI Agent 开发、Context Engineering、因果推断的一手实践记录。
          不是教程，是带着具体工程约束的技术判断。
        </p>
        <p className="mt-2 text-sm text-[#8892b0]/50 font-mono">
          {FIELDNOTES.length} 篇笔记 · 持续更新
        </p>
      </div>

      {/* Notes grid — newest first */}
      <div className="space-y-4">
        {[...FIELDNOTES].sort((a, b) => b.date.localeCompare(a.date)).map((note) => {
          const style = CONFIDENCE_STYLES[note.confidence];
          return (
            <Link
              key={note.slug}
              href={`/fieldnotes/${note.slug}`}
              className={`block border-l-2 ${style.border} rounded-lg bg-[#112240]/30 p-5 hover:bg-[#112240]/60 transition-all group`}
            >
              <h2 className="font-medium leading-snug text-[#ccd6f6] group-hover:text-[#4fd1c5] transition-colors inline-flex items-baseline gap-1">
                {note.title}
                <ArrowUpRight
                  size={14}
                  className="ml-1 opacity-0 group-hover:opacity-100 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#8892b0]">
                {note.tldr}
              </p>
              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {note.tags.map((tag) => (
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
                <span className={`rounded-full px-2 py-0.5 ${style.badge}`}>
                  {style.label}
                </span>
                <span className="rounded-full bg-[#8892b0]/10 px-2 py-0.5 text-[#8892b0]">
                  v{note.revision}
                </span>
                <span className="text-[#8892b0]/60 font-mono">{note.date}</span>
                <span className="text-[#8892b0]/50 font-mono ml-auto">
                  {note.sources} 个信源 · {note.references.length} 篇参考
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
