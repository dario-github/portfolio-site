"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { FieldNote } from "@/data/fieldnotes";

const CONFIDENCE_COLORS = {
  high: "bg-[#22c55e]",
  medium: "bg-[#eab308]",
  speculative: "bg-[#a78bfa]",
};

export default function FieldnoteCard({ note, index }: { note: FieldNote; index: number }) {
  const accentColor = CONFIDENCE_COLORS[note.confidence];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
    >
      <Link
        href={`/fieldnotes/${note.slug}`}
        className="group block h-full rounded-lg border border-[#233554]/50 bg-[#112240]/30 p-5 transition-all hover:border-[#4fd1c5]/30 hover:bg-[#112240]/60 hover:shadow-lg hover:shadow-[#4fd1c5]/5"
      >
        {/* Confidence indicator bar */}
        <div className="mb-3 flex items-center gap-2">
          <div className={`h-1.5 w-1.5 rounded-full ${accentColor}`} />
          <span className="font-mono text-[10px] text-[#8892b0]/40">{note.date}</span>
          <span className="font-mono text-[10px] text-[#8892b0]/30">v{note.revision}</span>
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
