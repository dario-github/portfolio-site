"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { FIELDNOTES } from "@/data/fieldnotes";
import FieldnoteCard from "@/components/FieldnoteCard";

type ConfidenceFilter = "all" | "high" | "medium" | "speculative";
type SortOrder = "newest" | "oldest";

const FILTER_OPTIONS: { value: ConfidenceFilter; label: string; activeClass: string }[] = [
  { value: "all", label: "全部", activeClass: "border-[#4fd1c5]/60 bg-[#4fd1c5]/10 text-[#4fd1c5]" },
  { value: "high", label: "🟢 高确信", activeClass: "border-[#22c55e]/60 bg-[#22c55e]/10 text-[#22c55e]" },
  { value: "medium", label: "🟡 中确信", activeClass: "border-[#eab308]/60 bg-[#eab308]/10 text-[#eab308]" },
  { value: "speculative", label: "🟣 推测性", activeClass: "border-[#a78bfa]/60 bg-[#a78bfa]/10 text-[#a78bfa]" },
];

export default function FieldnotesPage() {
  const [filter, setFilter] = useState<ConfidenceFilter>("all");
  const [sort, setSort] = useState<SortOrder>("newest");

  const filtered = useMemo(() => {
    let notes = [...FIELDNOTES];
    if (filter !== "all") {
      notes = notes.filter((n) => n.confidence === filter);
    }
    notes.sort((a, b) =>
      sort === "newest"
        ? b.date.localeCompare(a.date)
        : a.date.localeCompare(b.date)
    );
    return notes;
  }, [filter, sort]);

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-[#4fd1c5] hover:text-[#4fd1c5]/80 transition-colors mb-6"
        >
          ← 返回首页
        </Link>
        <h1 className="text-3xl font-bold text-[#ccd6f6]">
          田野笔记{" "}
          <span className="text-[#8892b0] font-light text-xl">Fieldnotes</span>
        </h1>
        <p className="mt-3 max-w-lg text-[#8892b0] leading-relaxed">
          来自 AI Agent 开发、Context Engineering、因果推断的一手实践记录。
          不是教程，是带着具体工程约束的技术判断。
        </p>
        <p className="mt-2 text-sm text-[#8892b0]/50 font-mono">
          {FIELDNOTES.length} 篇笔记 · 持续更新
        </p>
      </div>

      {/* C2: Filter / Sort Bar */}
      <div className="sticky top-0 z-10 -mx-3 mb-6 rounded-b-lg border-b border-[#233554]/30 bg-[#0a192f]/80 px-3 py-3 backdrop-blur-md">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          {/* Confidence filters */}
          {FILTER_OPTIONS.map((opt) => {
            const isActive = filter === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setFilter(opt.value)}
                className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                  isActive
                    ? opt.activeClass
                    : "border-[#233554]/50 text-[#8892b0]/60 hover:border-[#8892b0]/30 hover:text-[#8892b0]"
                }`}
              >
                {opt.label}
              </button>
            );
          })}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Sort toggle */}
          <button
            onClick={() =>
              setSort((s) => (s === "newest" ? "oldest" : "newest"))
            }
            className="shrink-0 rounded-full border border-[#233554]/50 px-3 py-1 text-xs font-mono text-[#8892b0]/60 transition-all hover:border-[#8892b0]/30 hover:text-[#8892b0]"
          >
            {sort === "newest" ? "↓ 最新" : "↑ 最早"}
          </button>
        </div>
      </div>

      {/* Grid with AnimatePresence */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((note, i) => (
            <FieldnoteCard key={note.slug} note={note} index={i} />
          ))}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="py-20 text-center text-sm text-[#8892b0]/50">
          没有符合筛选条件的笔记
        </div>
      )}
    </>
  );
}
