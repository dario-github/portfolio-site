import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "章东丞 — AI 原生技术产品人",
  description: "章东丞的个人作品集。从推理到交付——让 AI 在真实业务里跑起来。",
  openGraph: {
    title: "章东丞 — AI 原生技术产品人",
    description: "从推理到交付——让 AI 在真实业务里跑起来。",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="dark">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "章东丞",
          "alternateName": "Dario Zhang",
          "jobTitle": "AI Technical Product Lead",
          "knowsAbout": ["AI Agents", "MCP", "LLM Applications", "Product Management"],
          "alumniOf": [
            { "@type": "EducationalOrganization", "name": "Tongji University" }
          ],
          "url": "https://portfolio-site-dario.vercel.app",
          "sameAs": ["https://github.com/dario-github", "https://blog.dariolink.vercel.app"]
        })}} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0A0A0A] text-[#EDEDED]`}>
        {children}
      </body>
    </html>
  );
}
