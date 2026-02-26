import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "田野笔记 — 章东丞",
  description: "关于 AI Agent、Context Engineering、因果推断的技术思考。",
};

export default function FieldnotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
