import Link from "next/link";
import { FIELDNOTES } from "@/data/fieldnotes";
import FieldnoteCard from "@/components/FieldnoteCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "田野笔记 — 章东丞",
  description: "关于 AI Agent、Context Engineering、因果推断的技术思考。",
};

export default function FieldnotesPage() {
  const sorted = [...FIELDNOTES].sort((a, b) => b.date.localeCompare(a.date));

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

      {/* Grid — 2 columns, equal width */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sorted.map((note, i) => (
          <FieldnoteCard key={note.slug} note={note} index={i} />
        ))}
      </div>
    </>
  );
}
