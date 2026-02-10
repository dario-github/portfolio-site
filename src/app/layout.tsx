import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
