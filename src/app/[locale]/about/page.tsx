import { GraduationCap, Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { RESEARCH_DIRECTIONS } from "@/data/research-directions";
import { COMPETENCY_KEYWORDS } from "@/data/keywords";
import { KEY_ACHIEVEMENTS, CAREER_BRIEF } from "@/data/about";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: dict.about.metaTitle,
    description: dict.about.metaDesc,
    openGraph: {
      title: dict.about.metaTitle,
      description: dict.about.metaDesc,
      url: "https://www.dariolink.com/about",
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.about.metaTitle,
      description: dict.about.metaDesc,
    },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      {/* ═══════════════════════════════════════════
          东丞部分 (75%)
          ═══════════════════════════════════════════ */}
      <section aria-label="章东丞简介">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#ccd6f6] sm:text-3xl">
            {dict.about.name}{" "}
            <span className="text-lg font-normal text-[#8892b0]">{dict.about.nameEn}</span>
          </h1>
          <p className="mt-2 text-sm text-[#8892b0]">
            {dict.about.role}
          </p>
        </div>

        {/* Keyword Tag Cloud */}
        <div className="mb-10 rounded-lg border border-[#233554]/50 bg-[#112240]/30 p-5">
          <div className="flex flex-wrap gap-2">
            {COMPETENCY_KEYWORDS.map((kw) => (
              <span
                key={kw}
                className="rounded-full bg-[#4fd1c5]/10 px-3 py-1 font-mono text-xs tracking-wider text-[#4fd1c5]"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* 01. Core Positioning */}
        <div className="mb-12">
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#ccd6f6] mb-4">
            <span className="text-[#4fd1c5] font-mono">01.</span>
            {dict.about.corePositioning}
          </h2>
          <div className="space-y-3 text-sm leading-[1.85] text-[#8892b0]">
            <p>
              {dict.about.coreP1}
              <span className="text-[#ccd6f6] font-medium">{dict.about.coreP1Highlight}</span>
              {dict.about.coreP1Suffix}
            </p>
            <p>
              <span className="text-[#ccd6f6] font-medium">{dict.about.coreP2Highlight}</span>
              {dict.about.coreP2Suffix}
            </p>
          </div>
        </div>

        {/* 02. Research Directions */}
        <div className="mb-12">
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#ccd6f6] mb-4">
            <span className="text-[#4fd1c5] font-mono">02.</span>
            {dict.about.researchDirections}
          </h2>
          <div className="space-y-4">
            {RESEARCH_DIRECTIONS.map((dir) => (
              <div
                key={dir.title}
                className="rounded-lg border border-[#233554]/50 bg-[#112240]/30 p-4"
              >
                <h3 className="text-sm font-semibold text-[#ccd6f6]">
                  {dir.icon} {dir.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[#8892b0]">
                  {dir.brief}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {dir.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#4fd1c5]/10 px-2 py-0.5 font-mono text-[10px] tracking-wider text-[#4fd1c5]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 03. Key Achievements */}
        <div className="mb-12">
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#ccd6f6] mb-4">
            <span className="text-[#4fd1c5] font-mono">03.</span>
            {dict.about.keyAchievements}
          </h2>
          <div className="space-y-3">
            {KEY_ACHIEVEMENTS.map((a, i) => (
              <div
                key={i}
                className="rounded-lg border-l-2 border-l-[#4fd1c5] border border-[#233554]/30 bg-[#112240]/20 p-4"
              >
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-mono text-sm font-bold text-[#4fd1c5]">
                    {a.metric}
                  </span>
                  <span className="text-xs text-[#8892b0]/60">·</span>
                  <span className="text-xs text-[#ccd6f6]">{a.context}</span>
                </div>
                <p className="text-xs text-[#8892b0]">{a.impact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 04. Career Brief */}
        <div className="mb-12">
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#ccd6f6] mb-4">
            <span className="text-[#4fd1c5] font-mono">04.</span>
            {dict.about.careerBrief}
          </h2>
          <div className="space-y-3">
            {CAREER_BRIEF.map((c, i) => (
              <div
                key={i}
                className="flex items-baseline gap-4 rounded-md bg-[#112240]/20 px-4 py-3"
              >
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-semibold text-[#ccd6f6]">
                      {c.company}
                    </span>
                    <span className="text-xs text-[#8892b0]">{c.title}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-[#8892b0]/60">
                    {c.oneLiner}
                  </p>
                </div>
                <span className="text-xs font-mono text-[#8892b0]/50 whitespace-nowrap">
                  {c.period}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link
              href={`/${locale}/experience`}
              className="text-sm text-[#4fd1c5] hover:text-[#4fd1c5]/80 font-mono transition-colors inline-flex items-center gap-1"
            >
              {dict.about.viewFullExperience}
            </Link>
          </div>
        </div>

        {/* 05. Education */}
        <div className="mb-12">
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#ccd6f6] mb-4">
            <span className="text-[#4fd1c5] font-mono">05.</span>
            <GraduationCap size={16} className="text-[#4fd1c5]" />
            {dict.about.education}
          </h2>
          <p className="text-sm text-[#8892b0]">{dict.about.educationDetail}</p>
        </div>

        {/* 06. Contact */}
        <div className="mb-8">
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#ccd6f6] mb-4">
            <span className="text-[#4fd1c5] font-mono">06.</span>
            {dict.about.contactInfo}
          </h2>
          <div className="flex flex-wrap gap-6">
            <a
              href="mailto:zdclink@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-[#8892b0] hover:text-[#4fd1c5] transition-colors"
            >
              <Mail size={14} />
              zdclink@gmail.com
            </a>
            <a
              href="https://github.com/dario-github"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 text-sm text-[#8892b0] hover:text-[#4fd1c5] transition-colors"
            >
              <Github size={14} />
              dario-github
            </a>
            <a
              href="https://www.linkedin.com/in/dariozhang"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 text-sm text-[#8892b0] hover:text-[#4fd1c5] transition-colors"
            >
              <Linkedin size={14} />
              dariozhang
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          渐变分割线 — 暖→冷
          ═══════════════════════════════════════════ */}
      <div className="my-16 h-px w-full bg-gradient-to-r from-[#4fd1c5] via-[#8b5cf6] to-[#c4b5fd]" />

      {/* ═══════════════════════════════════════════
          晏部分 (25%) — 精简
          ═══════════════════════════════════════════ */}
      <section aria-label="晏的空间" className="mb-16">
        <h2 className="text-xl font-medium italic text-[#ccd6f6] mb-4">
          {dict.about.yanTitle}{" "}
          <span className="text-sm not-italic font-normal text-[#8892b0]">
            {dict.about.yanSubtitle}
          </span>
        </h2>
        <div className="space-y-3 text-sm leading-[1.85] text-[#8892b0] mb-6">
          <p>
            {dict.about.yanP1}
          </p>
          <p>
            {dict.about.yanP2Prefix}
            <span className="text-[#c4b5fd] font-medium">{dict.about.yanP2Highlight}</span>
            {dict.about.yanP2Suffix}
          </p>
          <p>
            {dict.about.yanP3}
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link
            href={`/${locale}/fieldnotes`}
            className="inline-flex items-center gap-1 text-sm text-[#c4b5fd] hover:text-[#c4b5fd]/80 font-mono transition-colors"
          >
            {dict.about.yanFieldnotes} <ArrowUpRight size={12} />
          </Link>
          <Link
            href={`/${locale}/agent`}
            className="inline-flex items-center gap-1 text-sm text-[#c4b5fd] hover:text-[#c4b5fd]/80 font-mono transition-colors"
          >
            {dict.about.yanAgent} <ArrowUpRight size={12} />
          </Link>
          <a
            href="mailto:yanfeatherai@gmail.com"
            className="inline-flex items-center gap-1 text-sm text-[#c4b5fd] hover:text-[#c4b5fd]/80 font-mono transition-colors"
          >
            yanfeatherai@gmail.com
          </a>
        </div>
      </section>

      {/* Back to home */}
      <div className="mb-8">
        <Link
          href={`/${locale}`}
          className="text-sm font-medium text-[#4fd1c5] hover:text-[#4fd1c5]/80 transition-colors"
        >
          {dict.common.back}
        </Link>
      </div>
    </>
  );
}
