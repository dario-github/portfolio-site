"use client";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-[#262626]">
      <div className="max-w-[1200px] mx-auto px-6 text-center space-y-2">
        <p className="text-sm text-[#666666]">
          © 2026 章东丞 · 基于 Next.js 构建 · Claude 评估
        </p>
        <p className="text-sm text-[#666666]">
          🤖 本站对 AI Agent 友好。试试：{" "}
          <code className="font-[family-name:var(--font-geist-mono)] text-[#A0A0A0]">
            curl dario.dev/llms.txt
          </code>
        </p>
      </div>
    </footer>
  );
}
