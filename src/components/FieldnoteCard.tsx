"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { FieldNote } from "@/data/fieldnotes";

const CONFIDENCE_STYLES = {
  high: { border: "border-[#22c55e]", badge: "bg-[#22c55e]/10 text-[#22c55e]", label: "🟢 高确信" },
  medium: { border: "border-[#eab308]", badge: "bg-[#eab308]/10 text-[#eab308]", label: "🟡 中确信" },
  speculative: { border: "border-[#a78bfa]", badge: "bg-[#a78bfa]/10 text-[#a78bfa]", label: "🟣 推测性" },
};

export default function FieldnoteCard({ note, index }: { note: FieldNote; index: number }) {
  const style = CONFIDENCE_STYLES[note.confidence];
  const isWide = note.confidence === "high";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={isWide ? "md:col-span-2" : ""}
    >
      <Link
        href={`/fieldnotes/${note.slug}`}
        className={`block h-full border-l-2 ${style.border} rounded-lg bg-[#112240]/30 p-5 hover:bg-[#112240]/60 transition-all group`}
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
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
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
    </motion.div>
  );
}
