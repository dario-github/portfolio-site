"use client";

import { ArrowUpRight, Mail, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { FIELDNOTES } from "@/data/fieldnotes";
import { RESEARCH_DIRECTIONS } from "@/data/research-directions";
import { COMPETENCY_KEYWORDS } from "@/data/keywords";
import { UPDATES, UPDATE_TYPE_CONFIG } from "@/data/updates";
import { FEATURED_PROJECTS, OPENCLAW_SKILLS, CORE_LESSONS, METHODOLOGY } from "@/data/agent";
import ZoneSectionHeading from "@/components/ZoneSectionHeading";
import Subscribe from "@/components/Subscribe";
import { useDict } from "@/i18n/DictionaryContext";

/* ── i18n helper: pick localized field ── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function t(item: any, field: string, locale: string): string {
  if (locale === "en") {
    const enField = `${field}En`;
    if (enField in item && item[enField]) return item[enField] as string;
  }
  return item[field] as string;
}

/* ── Direction card color mapping ── */
const DIRECTION_COLORS: Record<string, { border: string; tag: string }> = {
  teal: { border: "border-l-[#4fd1c5]", tag: "bg-[#4fd1c5]/10 text-[#4fd1c5]" },
  blue: { border: "border-l-[#3b82f6]", tag: "bg-[#3b82f6]/10 text-[#3b82f6]" },
  purple: { border: "border-l-[#c4b5fd]", tag: "bg-[#c4b5fd]/10 text-[#c4b5fd]" },
  amber: { border: "border-l-[#f59e0b]", tag: "bg-[#f59e0b]/10 text-[#f59e0b]" },
};

/* ── C1: Hero word-stagger variants ── */
const heroContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const heroWordVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* ── C3: Scroll reveal wrapper ── */
function RevealSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   Main Page — Dual Soul Coexistence
   ═══════════════════════════════════════════════════ */

export default function Home() {
  const { dict, locale } = useDict();
  const prefersReducedMotion = useReducedMotion();
  const sortedNotes = [...FIELDNOTES].sort((a, b) => b.date.localeCompare(a.date));

  /* ── Confidence styles (for fieldnotes) — uses dict ── */
  const CONFIDENCE_STYLES: Record<string, { border: string; badge: string; label: string }> = {
    high: { border: "border-[#22c55e]", badge: "bg-[#22c55e]/10 text-[#22c55e]", label: dict.home.confidenceHigh },
    medium: { border: "border-[#eab308]", badge: "bg-[#eab308]/10 text-[#eab308]", label: dict.home.confidenceMedium },
    speculative: { border: "border-[#a78bfa]", badge: "bg-[#a78bfa]/10 text-[#a78bfa]", label: dict.home.confidenceSpeculative },
  };

  /* C4: Parallax background (desktop only) */
  const { scrollY } = useScroll();
  const gridY = useTransform(scrollY, (v) => v * -0.3);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* C1: Hero text split into words */
  const heroText = dict.hero.text;
  const heroWords = heroText.split(" ");

  return (
    <>
      {/* C4: Parallax grid background (desktop only) */}
      {isDesktop && !prefersReducedMotion && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-0 bg-grid-pattern opacity-30"
          style={{ y: gridY }}
          aria-hidden="true"
        />
      )}

      {/* ═══ HERO ═══ */}
      <section className="py-16" aria-label="Hero">
        {/* C1: Hero text stagger reveal */}
        <motion.p
          className="text-sm text-[#8892b0]/60 max-w-lg leading-relaxed"
          variants={prefersReducedMotion ? undefined : heroContainerVariants}
          initial={prefersReducedMotion ? undefined : "hidden"}
          animate={prefersReducedMotion ? undefined : "visible"}
        >
          {heroWords.map((word, i) => (
            <motion.span
              key={i}
              variants={prefersReducedMotion ? undefined : heroWordVariants}
              className="inline-block"
              style={{ marginRight: i < heroWords.length - 1 ? "0.3em" : 0 }}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>

        <div className="mt-8 h-px w-full bg-gradient-to-r from-[#f59e0b]/30 via-[#8b5cf6]/30 to-[#c4b5fd]/30" />

        {/* Research Direction Cards */}
        <RevealSection delay={0.1} className="mt-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {RESEARCH_DIRECTIONS.map((dir, i) => {
              const colors = DIRECTION_COLORS[dir.color];
              return (
                <motion.div
                  key={dir.title}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className={`rounded-lg border-l-2 ${colors.border} border border-[#233554]/30 bg-[#112240]/30 p-4 min-h-[140px] flex flex-col`}
                >
                  <h3 className="text-sm font-semibold text-[#ccd6f6]">
                    {dir.icon} {t(dir, "title", locale)}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#8892b0] flex-1">
                    {t(dir, "brief", locale)}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {dir.tags.map((tag) => (
                      <span key={tag} className={`rounded-full px-2 py-0.5 font-mono text-[10px] tracking-wider ${colors.tag}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </RevealSection>

        {/* Competency Keywords */}
        <RevealSection delay={0.2}>
          <div className="mt-5 flex flex-wrap gap-2">
            {COMPETENCY_KEYWORDS.map((kw) => (
              <span key={kw} className="rounded-full bg-[#233554]/50 px-3 py-1 text-[11px] font-mono text-[#8892b0] tracking-wider">
                {kw}
              </span>
            ))}
          </div>
        </RevealSection>

        {/* Nav Links */}
        <div className="mt-6 flex flex-wrap gap-3">
          {[
            { label: dict.hero.aboutLink, href: `/${locale}/about` },
            { label: dict.hero.experienceLink, href: `/${locale}/experience` },
            { label: dict.hero.projectsLink, href: `/${locale}/projects` },
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
      <section id="updates" className="scroll-mt-16 py-12 lg:scroll-mt-24" aria-label={dict.sections.updates}>
        <RevealSection>
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#ccd6f6] mb-6">
            <span className="text-[#f59e0b] font-mono mr-2">◆</span>
            {dict.sections.updates}
          </h2>
        </RevealSection>
        <RevealSection delay={0.15}>
          <div className="space-y-0 divide-y divide-[#233554]/30">
            {UPDATES.slice(0, 3).map((update) => {
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
                    {t(update, "title", locale)}
                    {update.link && (
                      <ArrowUpRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    )}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#8892b0]">{t(update, "brief", locale)}</p>
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
        </RevealSection>
        <div className="mt-4 text-center">
          <Link href={`/${locale}/updates`} className="text-sm text-[#f59e0b] hover:text-[#f59e0b]/80 font-mono transition-colors">
            {dict.home.viewAllUpdates || `查看全部 ${UPDATES.length} 条动态 →`}
          </Link>
        </div>
      </section>

      {/* ═══ 东丞区域 — Featured Projects ═══ */}
      <div className="relative" style={{ background: "hsl(215 30% 12% / 0.3)" }}>
        <div className="absolute inset-0 pointer-events-none rounded-xl" style={{ boxShadow: "inset 0 1px 0 0 hsl(215 30% 20% / 0.2)" }} />
        <section id="dc-projects" className="scroll-mt-16 py-20 lg:scroll-mt-24" aria-label={dict.sections.featuredProjects}>
          <RevealSection>
            <ZoneSectionHeading index="01" subtitle="Highlights" persona="dc">
              {dict.sections.featuredProjects}
            </ZoneSectionHeading>
          </RevealSection>
          <RevealSection delay={0.15}>
            <div className="space-y-4">
              {FEATURED_PROJECTS.map((project, i) => (
                <motion.div
                  key={i}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Link
                    href={`/${locale}/projects`}
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
                </motion.div>
              ))}
            </div>
          </RevealSection>
          <div className="mt-6 text-center">
            <Link href={`/${locale}/projects`} className="text-sm text-[#4fd1c5] hover:text-[#4fd1c5]/80 font-mono transition-colors">
              {dict.home.viewAllProjects}
            </Link>
          </div>
        </section>
      </div>

      {/* ═══ 晏区域 — Fieldnotes (2 latest) ═══ */}
      <div className="relative" style={{ background: "hsl(255 20% 11% / 0.3)" }}>
        <div className="absolute inset-0 pointer-events-none rounded-xl" style={{ boxShadow: "inset 0 1px 0 0 hsl(255 20% 20% / 0.2)" }} />
        <section id="fieldnotes" className="scroll-mt-16 py-20 lg:scroll-mt-24" aria-label={dict.sections.fieldnotes}>
          <RevealSection>
            <ZoneSectionHeading index="02" persona="yan">
              {dict.sections.fieldnotes}
            </ZoneSectionHeading>
          </RevealSection>
          <RevealSection delay={0.15}>
            <div className="space-y-4">
              {sortedNotes.slice(0, 2).map((note) => {
                const style = CONFIDENCE_STYLES[note.confidence];
                return (
                  <Link
                    key={note.slug}
                    href={`/${locale}/fieldnotes/${note.slug}`}
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
          </RevealSection>
          <div className="flex justify-center pt-4 pb-2">
            <Link href={`/${locale}/fieldnotes`} className="text-sm text-[#c4b5fd] hover:text-[#c4b5fd]/80 font-mono transition-colors">
              {dict.home.viewAllNotes.replace("{count}", String(FIELDNOTES.length))}
            </Link>
          </div>
        </section>
      </div>

      {/* ═══ 共有区域 — Agent Overview + Contact ═══ */}
      <div className="relative" style={{ background: "hsl(220 15% 10% / 0.3)" }}>
        {/* Agent Overview (compact) */}
        <section id="agent-overview" className="scroll-mt-16 py-20 lg:scroll-mt-24" aria-label={dict.sections.agentOverview}>
          <RevealSection>
            <ZoneSectionHeading index="03" subtitle="OpenClaw · AI Agent OS" persona="shared">
              <span className="inline-flex items-center gap-3">
                {dict.sections.agentOverview}
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c4b5fd] opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#c4b5fd]" />
                </span>
              </span>
            </ZoneSectionHeading>
          </RevealSection>
          <RevealSection delay={0.15}>
            <p className="mb-6 text-sm leading-relaxed text-[#8892b0]">
              {dict.home.agentDesc.replace("{skillCount}", String(OPENCLAW_SKILLS.length))}
            </p>
            <div className="mb-6 flex flex-wrap gap-3">
              <span className="rounded-md bg-[#c4b5fd]/5 px-3 py-1.5 font-mono text-xs text-[#c4b5fd] border border-[#c4b5fd]/20">
                {dict.home.skillCount.replace("{count}", String(OPENCLAW_SKILLS.length))}
              </span>
              <span className="rounded-md bg-[#c4b5fd]/5 px-3 py-1.5 font-mono text-xs text-[#c4b5fd] border border-[#c4b5fd]/20">
                {dict.home.methodologyCount.replace("{count}", String(METHODOLOGY.length))}
              </span>
              <span className="rounded-md bg-[#c4b5fd]/5 px-3 py-1.5 font-mono text-xs text-[#c4b5fd] border border-[#c4b5fd]/20">
                {dict.home.lessonCount.replace("{count}", String(CORE_LESSONS.length))}
              </span>
            </div>
            <Link href={`/${locale}/agent`} className="text-sm text-[#c4b5fd] hover:text-[#c4b5fd]/80 font-mono transition-colors">
              {dict.home.viewFullCapabilities}
            </Link>
          </RevealSection>
        </section>

        {/* Subscribe */}
        <RevealSection className="pb-8">
          <Subscribe />
        </RevealSection>

        {/* Contact */}
        <section id="contact" className="scroll-mt-16 py-20 lg:scroll-mt-24" aria-label={dict.sections.contact}>
          <RevealSection>
            <ZoneSectionHeading index="04" persona="shared">{dict.sections.contact}</ZoneSectionHeading>
          </RevealSection>
          <RevealSection delay={0.15}>
            <p className="mb-6 text-sm leading-relaxed text-[#8892b0]">
              {dict.home.contactDesc}
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
                name="🪶 晏 (Yan)"
                borderColor="border-[#c4b5fd]/20"
                hoverColor="hover:text-[#c4b5fd]"
                links={[
                  { icon: "mail", label: "yanfeatherai@gmail.com", href: "mailto:yanfeatherai@gmail.com" },
                  { icon: "github", label: "yanfeatherai", href: "https://github.com/yanfeatherai" },
                  { icon: "x", label: "@yanfeather", href: "https://x.com/yanfeather" },
                ]}
              />
            </div>
          </RevealSection>
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
