import Link from "next/link";
import { notFound } from "next/navigation";
import { FIELDNOTES, FIELDNOTE_CONTENT } from "@/data/fieldnotes";
import type { Metadata } from "next";

const CONFIDENCE_STYLES = {
  high: { badge: "bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e]/20", label: "🟢 高确信" },
  medium: { badge: "bg-[#eab308]/10 text-[#eab308] border-[#eab308]/20", label: "🟡 中确信" },
  speculative: { badge: "bg-[#a78bfa]/10 text-[#a78bfa] border-[#a78bfa]/20", label: "🟣 推测性" },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return FIELDNOTES.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = FIELDNOTES.find((n) => n.slug === slug);
  if (!note) return { title: "Not Found" };
  return {
    title: `${note.title} — 章东丞`,
    description: note.tldr,
  };
}

export default async function FieldnoteDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const note = FIELDNOTES.find((n) => n.slug === slug);
  if (!note) notFound();

  const paragraphs = FIELDNOTE_CONTENT[slug] || [];
  const style = CONFIDENCE_STYLES[note.confidence];

  return (
    <>
      {/* Back link */}
      <Link
        href="/fieldnotes"
        className="inline-flex items-center gap-1 text-sm text-[#4fd1c5] hover:text-[#4fd1c5]/80 transition-colors mb-8"
      >
        ← 田野笔记
      </Link>

      {/* Title */}
      <h1 className="text-2xl font-bold leading-tight text-[#ccd6f6] sm:text-3xl">
        {note.title}
      </h1>

      {/* Meta row */}
      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
        <span className={`rounded-full border px-3 py-1 text-xs font-medium ${style.badge}`}>
          {style.label}
        </span>
        <span className="rounded-full bg-[#8892b0]/10 px-3 py-1 text-xs text-[#8892b0]">
          v{note.revision}
        </span>
        <span className="text-[#8892b0]/60 font-mono text-xs">{note.date}</span>
        <span className="text-[#8892b0]/50 font-mono text-xs">
          {note.sources} 个一手信源
        </span>
      </div>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {note.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-[#4fd1c5]/10 px-3 py-1 font-mono text-[11px] tracking-wider text-[#4fd1c5]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* TL;DR */}
      <div className="mt-8 rounded-lg border border-[#4fd1c5]/20 bg-[#4fd1c5]/5 px-5 py-4">
        <p className="text-xs font-mono text-[#4fd1c5]/60 uppercase tracking-widest mb-1">TL;DR</p>
        <p className="text-sm leading-relaxed text-[#ccd6f6]">{note.tldr}</p>
      </div>

      {/* Divider */}
      <div className="my-8 h-px bg-[#233554]" />

      {/* Content */}
      <article className="space-y-6">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-[15px] leading-[1.9] text-[#8892b0]">
            {p}
          </p>
        ))}
      </article>

      {/* References */}
      {note.references.length > 0 && (
        <div className="mt-12 pt-8 border-t border-[#233554]">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[#ccd6f6] mb-4">
            参考文献
          </h2>
          <ol className="space-y-2 list-decimal pl-5">
            {note.references.map((ref, i) => (
              <li
                key={i}
                className="text-xs font-mono leading-relaxed text-[#8892b0]/60"
              >
                {ref}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-12 pt-8 border-t border-[#233554] flex justify-between">
        {(() => {
          const idx = FIELDNOTES.findIndex((n) => n.slug === slug);
          const prev = idx > 0 ? FIELDNOTES[idx - 1] : null;
          const next = idx < FIELDNOTES.length - 1 ? FIELDNOTES[idx + 1] : null;
          return (
            <>
              <div>
                {prev && (
                  <Link
                    href={`/fieldnotes/${prev.slug}`}
                    className="text-sm text-[#4fd1c5] hover:text-[#4fd1c5]/80 transition-colors"
                  >
                    ← {prev.title.length > 20 ? prev.title.slice(0, 20) + "…" : prev.title}
                  </Link>
                )}
              </div>
              <div>
                {next && (
                  <Link
                    href={`/fieldnotes/${next.slug}`}
                    className="text-sm text-[#4fd1c5] hover:text-[#4fd1c5]/80 transition-colors"
                  >
                    {next.title.length > 20 ? next.title.slice(0, 20) + "…" : next.title} →
                  </Link>
                )}
              </div>
            </>
          );
        })()}
      </div>
    </>
  );
}
