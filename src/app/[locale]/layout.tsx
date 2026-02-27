import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { DictionaryProvider } from "@/i18n/DictionaryContext";
import { GlowProvider } from "@/components/GlowContext";
import MouseGlow from "@/components/MouseGlow";
import Sidebar from "@/components/Sidebar";
import TerminalOverlay from "@/components/Terminal";
import CommandPalette from "@/components/CommandPalette";

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.ogDescription,
      type: "website",
      url: "https://www.dariolink.com",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.ogDescription,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const dict = await getDictionary(locale as Locale);
  const lang = locale === "zh" ? "zh-CN" : "en";

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang="${lang}"`,
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "章东丞",
            alternateName: "Dario Zhang",
            jobTitle: "AI 技术副总监",
            worksFor: { "@type": "Organization", name: "蓝色光标" },
            knowsAbout: [
              "Proactive AI Agents",
              "Context Learning",
              "MCP",
              "Multi-Agent Systems",
              "LLM Applications",
            ],
            alumniOf: [
              { "@type": "EducationalOrganization", name: "Tongji University" },
            ],
            url: "https://www.dariolink.com",
            sameAs: [
              "https://github.com/zdclink",
              "https://github.com/yanfeatherai",
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: "https://www.dariolink.com",
            name: "章东丞 × 晏",
            description:
              "章东丞（Dario Zhang）与 晏（Yàn）的共同主页——AI 技术总监 & Silicon Spirit",
          }),
        }}
      />
      <DictionaryProvider dict={dict} locale={locale as Locale}>
        <GlowProvider>
          <MouseGlow />
          <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
            <div className="lg:flex lg:justify-between lg:gap-4">
              <Sidebar />
              <main id="content" className="pt-24 lg:w-[65%] lg:py-24">
                {children}
                <Footer dict={dict} />
              </main>
            </div>
          </div>
          <TerminalOverlay />
          <CommandPalette />
        </GlowProvider>
        <Analytics />
        <SpeedInsights />
      </DictionaryProvider>
    </>
  );
}

function Footer({ dict }: { dict: Awaited<ReturnType<typeof getDictionary>> }) {
  return (
    <footer className="max-w-md pb-16 text-sm text-[#8892b0]/50">
      <p>
        {dict.footer.designInspiration}{" "}
        <a
          className="font-medium text-[#8892b0]/70 hover:text-[#4fd1c5] transition-colors"
          href="https://brittanychiang.com"
          target="_blank"
          rel="noreferrer noopener"
        >
          Brittany Chiang
        </a>
        {dict.footer.dualSoulDesign}{" "}
        <a
          className="font-medium text-[#8892b0]/70 hover:text-[#4fd1c5] transition-colors"
          href="https://nextjs.org"
          target="_blank"
          rel="noreferrer noopener"
        >
          Next.js
        </a>{" "}
        {dict.footer.and}{" "}
        <a
          className="font-medium text-[#8892b0]/70 hover:text-[#4fd1c5] transition-colors"
          href="https://tailwindcss.com"
          target="_blank"
          rel="noreferrer noopener"
        >
          Tailwind CSS
        </a>{" "}
        {dict.footer.builtWith}{" "}
        <a
          className="font-medium text-[#8892b0]/70 hover:text-[#4fd1c5] transition-colors"
          href="https://vercel.com"
          target="_blank"
          rel="noreferrer noopener"
        >
          Vercel
        </a>
        {dict.footer.period}
      </p>
    </footer>
  );
}
