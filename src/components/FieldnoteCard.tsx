"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { FieldNote } from "@/data/fieldnotes";

/* ── C5: Confidence color bars ── */
const CONFIDENCE_BAR_COLORS = {
  high: "bg-[#22c55e]",
  medium: "bg-[#eab308]",
  speculative: "bg-[#a78bfa]",
};

/* ── C6: Lighter dot colors for revision indicator ── */
const CONFIDENCE_DOT_COLORS = {
  high: "bg-[#22c55e]/30",
  medium: "bg-[#eab308]/30",
  speculative: "bg-[#a78bfa]/30",
};

export default function FieldnoteCard({ note, index }: { note: FieldNote; index: number }) {
  const barColor = CONFIDENCE_BAR_COLORS[note.confidence];
  const dotColor = CONFIDENCE_DOT_COLORS[note.confidence];
  const dotCount = Math.min(note.revision, 5);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
    >
      <Link
        href={`/fieldnotes/${note.slug}`}
        className="group relative block h-full overflow-hidden rounded-lg border border-[#233554]/50 bg-[#112240]/30 pl-4 pr-5 py-5 transition-all hover:border-[#4fd1c5]/30 hover:bg-[#112240]/60 hover:shadow-lg hover:shadow-[#4fd1c5]/5"
      >
        {/* C5: Left confidence color bar */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-0.5 transition-all duration-300 group-hover:w-[3px] group-hover:brightness-125 ${barColor}`}
        />

        {/* Meta row */}
        <div className="mb-3 flex items-center gap-2">
          <span className="font-mono text-[10px] text-[#8892b0]/40">{note.date}</span>

          {/* C6: Revision indicator with dots */}
          <span className="font-mono text-[10px] text-[#8892b0]/30 inline-flex items-center gap-1">
            v{note.revision}
            <span className="inline-flex items-center gap-0.5 ml-0.5">
              {Array.from({ length: dotCount }).map((_, i) => (
                <span
                  key={i}
                  className={`inline-block h-1 w-1 rounded-full ${dotColor}`}
                />
              ))}
              {note.revision > 5 && (
                <span className="text-[8px] text-[#8892b0]/30 ml-px">+</span>
              )}
            </span>
          </span>
        </div>

        {/* Title */}
        <h2 className="font-medium leading-snug text-[#ccd6f6] group-hover:text-[#4fd1c5] transition-colors">
          {note.title}
          <ArrowUpRight
            size={14}
            className="ml-1 inline-block opacity-0 group-hover:opacity-100 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </h2>

        {/* TL;DR — 2 lines max */}
        <p className="mt-2 text-sm leading-relaxed text-[#8892b0] line-clamp-2">
          {note.tldr}
        </p>

        {/* Top 3 tags only */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {note.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#4fd1c5]/8 px-2 py-0.5 font-mono text-[10px] tracking-wider text-[#4fd1c5]/70"
            >
              {tag}
            </span>
          ))}
          {note.tags.length > 3 && (
            <span className="rounded-full px-2 py-0.5 font-mono text-[10px] text-[#8892b0]/30">
              +{note.tags.length - 3}
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
