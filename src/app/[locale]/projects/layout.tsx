import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "项目 — 章东丞",
  description:
    "章东丞的项目作品集：企业 AI 基建、视频 Agent 系统、互动影游、投资规则引擎等 AI 工程化实践。",
  openGraph: {
    title: "项目 — 章东丞",
    description:
      "企业 AI 基建、视频 Agent 系统、互动影游等 AI 工程化实践。",
    url: "https://www.dariolink.com/projects",
  },
  twitter: {
    card: "summary_large_image",
    title: "项目 — 章东丞",
    description:
      "企业 AI 基建、视频 Agent 系统、互动影游等 AI 工程化实践。",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
