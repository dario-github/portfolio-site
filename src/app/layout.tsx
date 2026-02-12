import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { GlowProvider } from "@/components/GlowContext";
import MouseGlow from "@/components/MouseGlow";
import Sidebar from "@/components/Sidebar";
import TerminalOverlay from "@/components/Terminal";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "章东丞 — AI 技术总监",
  description:
    "章东丞（Dario Zhang）的个人主页。8 年算法经验，从符号推理到因果推理到主动式 Agent——让 AI 不只是被动响应，而是主动理解、预判、执行。",
  openGraph: {
    title: "章东丞 — AI 技术总监",
    description:
      "从被动工具到主动 Agent——让 AI 在真实业务里跑起来。",
    type: "website",
    url: "https://portfolio-site-dario.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "章东丞 — AI 技术总监",
    description:
      "从被动工具到主动 Agent——让 AI 在真实业务里跑起来。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "章东丞",
              alternateName: "Dario Zhang",
              jobTitle: "AI 技术总监",
              worksFor: {
                "@type": "Organization",
                name: "蓝色光标",
              },
              knowsAbout: [
                "Proactive AI Agents",
                "Context Learning",
                "MCP",
                "Multi-Agent Systems",
                "LLM Applications",
              ],
              alumniOf: [
                {
                  "@type": "EducationalOrganization",
                  name: "Tongji University",
                },
              ],
              url: "https://portfolio-site-dario.vercel.app",
              sameAs: [
                "https://github.com/dario-github",
                "https://blog.dariolink.vercel.app",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#0a192f] leading-[1.85] text-[#8892b0]`}
      >
        <GlowProvider>
          <MouseGlow />
          <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
            <div className="lg:flex lg:justify-between lg:gap-4">
              <Sidebar />
              <main id="content" className="pt-24 lg:w-1/2 lg:py-24">
                {children}
                {/* Footer */}
                <footer className="max-w-md pb-16 text-sm text-[#8892b0]/50">
                  <p>
                    设计灵感来自{" "}
                    <a
                      className="font-medium text-[#8892b0]/70 hover:text-[#4fd1c5] transition-colors"
                      href="https://brittanychiang.com"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Brittany Chiang
                    </a>
                    。使用{" "}
                    <a
                      className="font-medium text-[#8892b0]/70 hover:text-[#4fd1c5] transition-colors"
                      href="https://nextjs.org"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Next.js
                    </a>{" "}
                    和{" "}
                    <a
                      className="font-medium text-[#8892b0]/70 hover:text-[#4fd1c5] transition-colors"
                      href="https://tailwindcss.com"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Tailwind CSS
                    </a>{" "}
                    构建，部署在{" "}
                    <a
                      className="font-medium text-[#8892b0]/70 hover:text-[#4fd1c5] transition-colors"
                      href="https://vercel.com"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Vercel
                    </a>
                    。
                  </p>
                </footer>
              </main>
            </div>
          </div>
          <TerminalOverlay />
        </GlowProvider>
      </body>
    </html>
  );
}
