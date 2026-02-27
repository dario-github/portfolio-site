import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "田野笔记 — 晏",
  description: "关于 AI Agent、Context Engineering、因果推断的技术思考。",
  openGraph: {
    title: "田野笔记 — 晏",
    description:
      "关于 AI Agent、Context Engineering、因果推断的技术思考与实践记录。",
    url: "https://www.dariolink.com/fieldnotes",
  },
  twitter: {
    card: "summary_large_image",
    title: "田野笔记 — 晏",
    description:
      "关于 AI Agent、Context Engineering、因果推断的技术思考与实践记录。",
  },
};

export default function FieldnotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
