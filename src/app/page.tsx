"use client";

import { ArrowUpRight, Mail, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { FIELDNOTES } from "@/data/fieldnotes";
import { RESEARCH_DIRECTIONS } from "@/data/research-directions";
import { COMPETENCY_KEYWORDS } from "@/data/keywords";
import { UPDATES, UPDATE_TYPE_CONFIG } from "@/data/updates";
import { FEATURED_PROJECTS, OPENCLAW_SKILLS, CORE_LESSONS, METHODOLOGY } from "@/data/agent";
import ZoneSectionHeading from "@/components/ZoneSectionHeading";

/* ── Confidence styles (for fieldnotes) ── */
const CONFIDENCE_STYLES: Record<string, { border: string; badge: string; label: string }> = {
  high: { border: "border-[#22c55e]", badge: "bg-[#22c55e]/10 text-[#22c55e]", label: "🟢 高确信" },
  medium: { border: "border-[#eab308]", badge: "bg-[#eab308]/10 text-[#eab308]", label: "🟡 中确信" },
  speculative: { border: "border-[#a78bfa]", badge: "bg-[#a78bfa]/10 text-[#a78bfa]", label: "🟣 推测性" },
};

/* ── Direction card color mapping ── */
const DIRECTION_COLORS: Record<string, { border: string; tag: string }> = {
  teal: { border: "border-l-[#4fd1c5]", tag: "bg-[#4fd1c5]/10 text-[#4fd1c5]" },
  blue: { border: "border-l-[#3b82f6]", tag: "bg-[#3b82f6]/10 text-[#3b82f6]" },
  purple: { border: "border-l-[#c4b5fd]", tag: "bg-[#c4b5fd]/10 text-[#c4b5fd]" },
};

/* ═══════════════════════════════════════════════════
   Main Page — Dual Soul Coexistence
   ═══════════════════════════════════════════════════ */

export default function Home() {
  const sortedNotes = [...FIELDNOTES].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="py-16" aria-label="Hero">
        <p className="text-sm text-[#8892b0]/60 max-w-lg leading-relaxed">
          从因果推断到 Agent 架构，让 AI 在真实业务中产生价值。
        </p>

        <div className="mt-8 h-px w-full bg-gradient-to-r from-[#f59e0b]/30 via-[#8b5cf6]/30 to-[#c4b5fd]/30" />

        {/* Research Direction Cards */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {RESEARCH_DIRECTIONS.map((dir) => {
            const colors = DIRECTION_COLORS[dir.color];
            return (
              <div
                key={dir.title}
                className={`rounded-lg border-l-2 ${colors.border} border border-[#233554]/30 bg-[#112240]/30 p-4 min-h-[140px] flex flex-col`}
              >
                <h3 className="text-sm font-semibold text-[#ccd6f6]">
                  {dir.icon} {dir.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#8892b0] flex-1">
                  {dir.brief}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {dir.tags.map((tag) => (
                    <span key={tag} className={`rounded-full px-2 py-0.5 font-mono text-[10px] tracking-wider ${colors.tag}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Competency Keywords */}
        <div className="mt-5 flex flex-wrap gap-2">
          {COMPETENCY_KEYWORDS.map((kw) => (
            <span key={kw} className="rounded-full bg-[#233554]/50 px-3 py-1 text-[11px] font-mono text-[#8892b0] tracking-wider">
              {kw}
            </span>
          ))}
        </div>

        {/* Nav Links */}
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

      {/* ═══ RECENT UPDATES ═══ */}
      <section id="updates" className="scroll-mt-16 py-12 lg:scroll-mt-24" aria-label="最新动态">
        <h2 className="text-xs font-bold uppercase tracking-widest text-[#ccd6f6] mb-6">
          <span className="text-[#f59e0b] font-mono mr-2">◆</span>
          最新动态
        </h2>
        <div className="space-y-0 divide-y divide-[#233554]/30">
          {UPDATES.map((update) => {
            const cfg = UPDATE_TYPE_CONFIG[update.type];
            const inner = (
              <>
                <div className="flex items-center gap-3 text-xs mb-1.5">
                  <span className="font-mono text-[#8892b0]/60">{update.date}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${cfg.color}`}>
                    {cfg.label}
                  </span>
                </div>
                <h3 className={`font-medium text-[#ccd6f6] text-sm ${update.link ? "group-hover:text-[#4fd1c5] transition-colors inline-flex items-baseline gap-1" : ""}`}>
                  {update.title}
                  {update.link && (
                    <ArrowUpRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  )}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[#8892b0]">{update.brief}</p>
              </>
            );
            return update.link ? (
              <Link key={update.date + update.title} href={update.link} className="block py-4 group hover:bg-[#112240]/20 -mx-3 px-3 rounded-lg transition-colors">
                {inner}
              </Link>
            ) : (
              <div key={update.date + update.title} className="block py-4">
                {inner}
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══ 东丞区域 — Featured Projects ═══ */}
      <div className="relative" style={{ background: "hsl(215 30% 12% / 0.3)" }}>
        <div className="absolute inset-0 pointer-events-none rounded-xl" style={{ boxShadow: "inset 0 1px 0 0 hsl(215 30% 20% / 0.2)" }} />
        <section id="dc-projects" className="scroll-mt-16 py-20 lg:scroll-mt-24" aria-label="精选项目">
          <ZoneSectionHeading index="01" subtitle="Highlights" persona="dc">
            🔷 精选项目
          </ZoneSectionHeading>
          <div className="space-y-4">
            {FEATURED_PROJECTS.map((project, i) => (
              <Link
                key={i}
                href="/projects"
                className="block rounded-lg border-l-2 border-l-[#4fd1c5] border border-[#233554]/50 bg-[#112240]/30 p-5 hover:bg-[#112240]/60 transition-all group"
              >
                <h3 className="font-semibold text-[#ccd6f6] group-hover:text-[#4fd1c5] transition-colors inline-flex items-baseline gap-1">
                  {project.title}
                  <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 flex-shrink-0" />
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#8892b0]">{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-[#4fd1c5]/10 px-2.5 py-0.5 font-mono text-[11px] tracking-wider uppercase text-[#4fd1c5]">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/projects" className="text-sm text-[#4fd1c5] hover:text-[#4fd1c5]/80 font-mono transition-colors">
              查看全部项目 →
            </Link>
          </div>
        </section>
      </div>

      {/* ═══ 晏区域 — Fieldnotes (2 latest) ═══ */}
      <div className="relative" style={{ background: "hsl(255 20% 11% / 0.3)" }}>
        <div className="absolute inset-0 pointer-events-none rounded-xl" style={{ boxShadow: "inset 0 1px 0 0 hsl(255 20% 20% / 0.2)" }} />
        <section id="fieldnotes" className="scroll-mt-16 py-20 lg:scroll-mt-24" aria-label="田野笔记">
          <ZoneSectionHeading index="02" persona="yan">
            🪶 田野笔记 Fieldnotes
          </ZoneSectionHeading>
          <div className="space-y-4">
            {sortedNotes.slice(0, 2).map((note) => {
              const style = CONFIDENCE_STYLES[note.confidence];
              return (
                <Link
                  key={note.slug}
                  href={`/fieldnotes/${note.slug}`}
                  className={`block border-l-2 ${style.border} bg-[#112240]/30 rounded-lg p-5 hover:bg-[#112240]/60 transition-all group`}
                >
                  <h3 className="font-medium italic leading-snug text-[#ccd6f6] group-hover:text-[#c4b5fd] transition-colors inline-flex items-baseline gap-1">
                    {note.title}
                    <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 flex-shrink-0" />
                  </h3>
                  <p className="mt-2 text-sm leading-[1.8] text-[#8892b0]">{note.tldr}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {note.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-[#c4b5fd]/10 px-2.5 py-0.5 text-[11px] tracking-wide text-[#c4b5fd]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-3 text-xs">
                    <span className={`rounded-full px-2 py-0.5 ${style.badge}`}>{style.label}</span>
                    <span className="text-[#8892b0]/60 font-mono">{note.date}</span>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="flex justify-center pt-4 pb-2">
            <Link href="/fieldnotes" className="text-sm text-[#c4b5fd] hover:text-[#c4b5fd]/80 font-mono transition-colors">
              查看全部 {FIELDNOTES.length} 篇笔记 →
            </Link>
          </div>
        </section>
      </div>

      {/* ═══ 共有区域 — Agent Overview + Contact ═══ */}
      <div className="relative" style={{ background: "hsl(220 15% 10% / 0.3)" }}>
        {/* Agent Overview (compact) */}
        <section id="agent-overview" className="scroll-mt-16 py-20 lg:scroll-mt-24" aria-label="Agent 友好区">
          <ZoneSectionHeading index="03" subtitle="OpenClaw · AI Agent OS" persona="shared">
            <span className="inline-flex items-center gap-3">
              Agent 友好区
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c4b5fd] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#c4b5fd]" />
              </span>
            </span>
          </ZoneSectionHeading>
          <p className="mb-6 text-sm leading-relaxed text-[#8892b0]">
            OpenClaw 是晏的身体——{OPENCLAW_SKILLS.length} 个技能插件、MemBrain 分层记忆、Sub-agent 架构，从研究到创作全场景覆盖。
          </p>
          <div className="mb-6 flex flex-wrap gap-3">
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
          <Link href="/agent" className="text-sm text-[#c4b5fd] hover:text-[#c4b5fd]/80 font-mono transition-colors">
            查看完整能力 →
          </Link>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-16 py-20 lg:scroll-mt-24" aria-label="联系">
          <ZoneSectionHeading index="04" persona="shared">联系</ZoneSectionHeading>
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
            <ArrowUpRight size={12} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        ))}
      </div>
    </div>
  );
}
