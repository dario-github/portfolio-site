import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dario Zhang — AI-native Technical Product Builder",
  description: "Portfolio of 章东丞 (Dario Zhang). From reasoning to shipping — I build AI that works in production.",
  openGraph: {
    title: "Dario Zhang — AI-native Technical Product Builder",
    description: "From reasoning to shipping — I build AI that works in production.",
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
          "url": "https://dario.dev"
        })}} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0A0A0A] text-[#EDEDED]`}>
        {children}
      </body>
    </html>
  );
}
