"use client";

import { useState, FormEvent } from "react";

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setMessage(data.message || "订阅成功！");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || "订阅失败，请重试。");
      }
    } catch {
      setStatus("error");
      setMessage("网络错误，请稍后重试。");
    }
  }

  return (
    <div className="rounded-lg border border-[#233554] bg-[#112240]/30 p-6 sm:p-8">
      <div className="max-w-xl mx-auto text-center">
        <h3 className="text-sm font-semibold text-[#ccd6f6] tracking-wide">
          订阅更新 · Subscribe
        </h3>
        <p className="mt-2 text-xs text-[#8892b0] leading-relaxed">
          获取最新田野笔记和项目动态
        </p>

        {status === "success" ? (
          <p className="mt-4 text-sm text-[#4fd1c5]">{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col sm:flex-row gap-3 items-center justify-center">
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-64 rounded-md border border-[#233554] bg-[#0a192f]/60 px-4 py-2 text-sm text-[#ccd6f6] placeholder-[#8892b0]/40 outline-none focus:border-[#4fd1c5]/50 transition-colors"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="shrink-0 rounded-md px-5 py-2 text-sm font-medium text-[#0a192f] transition-all disabled:opacity-50"
              style={{
                background: "linear-gradient(135deg, #4fd1c5, #c4b5fd)",
              }}
            >
              {status === "loading" ? "..." : "订阅"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-3 text-xs text-red-400">{message}</p>
        )}
      </div>
    </div>
  );
}
