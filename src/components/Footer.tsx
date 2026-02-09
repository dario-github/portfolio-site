"use client";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-[#262626]">
      <div className="max-w-[1200px] mx-auto px-6 text-center space-y-2">
        <p className="text-sm text-[#666666]">
          © 2026 Dario Zhang · Built with Next.js · Assessed by Claude
        </p>
        <p className="text-sm text-[#666666]">
          🤖 This site is agent-friendly. Try:{" "}
          <code className="font-[family-name:var(--font-geist-mono)] text-[#A0A0A0]">
            curl dario.dev/llms.txt
          </code>
        </p>
      </div>
    </footer>
  );
}
