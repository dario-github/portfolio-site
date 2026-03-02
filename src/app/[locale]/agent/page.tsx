import { Terminal, GraduationCap, Bot } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { OPENCLAW_SKILLS, CORE_LESSONS, METHODOLOGY } from "@/data/agent";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return {
    title: dict.agent.metaTitle,
    description: dict.agent.metaDesc,
    openGraph: {
      title: dict.agent.metaTitle,
      description: dict.agent.metaDesc,
      url: "https://www.dariolink.com/agent",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.agent.metaTitle,
      description: dict.agent.metaDesc,
    },
  };
}

export default async function AgentPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      {/* Chinese-only notice for English locale */}
      {locale === "en" && (
        <div className="mb-6 rounded-md bg-[#f59e0b]/10 border border-[#f59e0b]/20 px-4 py-2 text-sm text-[#f59e0b]">
          {dict.common.chineseOnly}
        </div>
      )}

      {/* Back link */}
      <div className="mb-8">
        <Link
          href={`/${locale}`}
          className="text-sm font-medium text-[#c4b5fd] hover:text-[#c4b5fd]/80 transition-colors"
        >
          {dict.common.back}
        </Link>
      </div>

      {/* Header */}
      <section aria-label={dict.agent.heading} className="mb-16">
        <h1 className="text-2xl font-bold text-[#ccd6f6] sm:text-3xl inline-flex items-center gap-3">
          {dict.agent.heading}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c4b5fd] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#c4b5fd]" />
          </span>
        </h1>
        <p className="mt-1 text-sm text-[#8892b0]">
          {dict.agent.subtitle}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-[#8892b0] max-w-2xl">
          {dict.agent.desc.replace("{skillCount}", String(OPENCLAW_SKILLS.length))}
        </p>

        {/* Stats */}
        <div className="mt-6 flex flex-wrap gap-3">
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
      </section>

      {/* Skill List */}
      <section className="mb-16" aria-label={dict.agent.skillList}>
        <h2 className="text-lg font-bold text-[#ccd6f6] mb-4 flex items-center gap-2">
          <Terminal size={18} className="text-[#c4b5fd]" />
          {dict.agent.skillList}
        </h2>
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          {OPENCLAW_SKILLS.map((skill) => (
            <div
              key={skill.name}
              className="flex items-start gap-2 rounded-md bg-[#112240]/30 px-3 py-2 border border-[#233554]/30"
            >
              <code className="text-[11px] font-mono text-[#c4b5fd] whitespace-nowrap mt-0.5">
                {skill.name}
              </code>
              <span className="text-xs text-[#8892b0] leading-relaxed">
                {locale === "en" ? skill.descEn : skill.desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Core Lessons */}
      <section className="mb-16" aria-label={dict.agent.coreLessons}>
        <h2 className="text-lg font-bold text-[#ccd6f6] mb-4 flex items-center gap-2">
          <GraduationCap size={18} className="text-[#c4b5fd]" />
          {dict.agent.coreLessons}
        </h2>
        <div className="grid grid-cols-1 gap-3">
          {CORE_LESSONS.map((lesson, i) => (
            <div
              key={i}
              className="rounded-lg border border-[#c4b5fd]/10 bg-[#c4b5fd]/[0.02] p-4"
            >
              <h3 className="font-mono text-sm font-semibold text-[#c4b5fd] mb-1">
                {lesson.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#8892b0]">
                {lesson.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Methodology */}
      <section className="mb-16" aria-label={dict.agent.methodology}>
        <h2 className="text-lg font-bold text-[#ccd6f6] mb-4 flex items-center gap-2">
          <Bot size={18} className="text-[#c4b5fd]" />
          {dict.agent.methodology}
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {METHODOLOGY.map((method, i) => (
            <div
              key={i}
              className="rounded-lg border border-[#233554] bg-[#0a192f] p-4"
            >
              <h3 className="mb-2 font-mono text-sm font-semibold text-[#c4b5fd]">
                {method.title}
              </h3>
              <ul className="space-y-1">
                {method.items.map((item, j) => (
                  <li
                    key={j}
                    className="font-mono text-xs leading-relaxed text-[#8892b0]"
                  >
                    <span className="text-[#c4b5fd]/50 mr-1">&rarr;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* GitHub */}
      <div className="rounded-lg border border-dashed border-[#c4b5fd]/30 bg-[#c4b5fd]/5 px-4 py-3 text-center mb-16">
        <code className="font-mono text-sm text-[#c4b5fd]">
          github.com/dario-github
        </code>
        <p className="mt-1 font-mono text-xs text-[#8892b0]/60">
          {dict.agent.githubNote}
        </p>
      </div>

      {/* Back link */}
      <div className="mb-8">
        <Link
          href={`/${locale}`}
          className="text-sm font-medium text-[#c4b5fd] hover:text-[#c4b5fd]/80 transition-colors"
        >
          {dict.common.back}
        </Link>
      </div>
    </>
  );
}
