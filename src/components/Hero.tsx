"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const impactNumbers = [
  { value: "1,600+", label: "Platform Users" },
  { value: "2,000+", label: "AI Agents Built" },
  { value: "4,000+", label: "Daily API Calls" },
  { value: "10x", label: "Cost Reduction" },
];

const tags = ["AI-native", "Product × Engineering", "Computational Reasoning"];

export default function Hero() {
  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 min-h-[calc(100vh-64px)]">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="relative max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#EDEDED] leading-[1.1]">
            From Reasoning
            <br />
            to Shipping
          </h1>

          <p className="mt-6 text-xl text-[#A0A0A0] max-w-xl">
            I build AI that works in production — not demos.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="bg-[#1E293B] text-[#94A3B8] border-[#334155] px-3 py-1 text-sm"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {impactNumbers.map((item) => (
            <div
              key={item.label}
              className="bg-[#141414] border border-[#262626] rounded-xl p-6 text-center hover:border-[#3B82F6] hover:scale-[1.02] transition-all duration-300"
            >
              <div className="text-2xl md:text-3xl font-bold text-[#EDEDED] font-[family-name:var(--font-geist-mono)]">
                {item.value}
              </div>
              <div className="mt-2 text-sm text-[#A0A0A0]">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
