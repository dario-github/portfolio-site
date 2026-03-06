import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import { UPDATES, UPDATE_TYPE_CONFIG } from "@/data/updates";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  return {
    title: isEn ? "Updates — Dario × Yàn" : "最新动态 — 章东丞 × 晏",
    description: isEn ? "Latest updates and milestones" : "最新动态与里程碑",
  };
}

/* i18n helper */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function t(item: any, field: string, locale: string): string {
  if (locale === "en") {
    const enField = `${field}En`;
    if (enField in item && item[enField]) return item[enField] as string;
  }
  return item[field] as string;
}

export default async function UpdatesPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const isEn = locale === "en";

  return (
    <>
      <Link
        href={`/${locale}`}
        className="inline-flex items-center gap-1 text-sm text-[#4fd1c5] hover:text-[#4fd1c5]/80 transition-colors mb-8"
      >
        ← {isEn ? "Back to home" : "返回首页"}
      </Link>

      <SectionHeading index="◆">
        {isEn ? "All Updates" : "全部动态"}
      </SectionHeading>

      <p className="mt-2 mb-8 text-sm text-[#8892b0]">
        {isEn
          ? `${UPDATES.length} updates — projects, insights, and milestones`
          : `共 ${UPDATES.length} 条动态 — 项目进展、洞察与里程碑`}
      </p>

      <div className="space-y-0 divide-y divide-[#233554]/30">
        {UPDATES.map((update) => {
          const cfg = UPDATE_TYPE_CONFIG[update.type];
          const inner = (
            <>
              <div className="flex items-center gap-3 text-xs mb-1.5">
                <span className="font-mono text-[#8892b0]/60">{update.date}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${cfg.color}`}
                >
                  {isEn ? cfg.labelEn : cfg.label}
                </span>
              </div>
              <h3
                className={`font-medium text-[#ccd6f6] text-sm ${
                  update.link
                    ? "group-hover:text-[#4fd1c5] transition-colors inline-flex items-baseline gap-1"
                    : ""
                }`}
              >
                {t(update, "title", locale)}
                {update.link && (
                  <ArrowUpRight
                    size={12}
                    className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                  />
                )}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-[#8892b0]">
                {t(update, "brief", locale)}
              </p>
              {update.tags && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {update.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#233554]/50 px-2 py-0.5 text-[10px] font-mono text-[#8892b0] tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </>
          );
          return update.link ? (
            <Link
              key={update.date + update.title}
              href={update.link}
              className="block py-4 group hover:bg-[#112240]/20 -mx-3 px-3 rounded-lg transition-colors"
            >
              {inner}
            </Link>
          ) : (
            <div key={update.date + update.title} className="block py-4">
              {inner}
            </div>
          );
        })}
      </div>
    </>
  );
}
