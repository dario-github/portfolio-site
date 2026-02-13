"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDualMode } from "./DualModeContext";

const LS_KEY = "mode-toggle-seen";

export default function ModeToggleButton() {
  const { mode, toggle } = useDualMode();
  const [showPulse, setShowPulse] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // First-visit: pulse + tooltip after 3s
  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = localStorage.getItem(LS_KEY);
    if (seen) return;

    const timer = setTimeout(() => {
      setShowPulse(true);
      setShowTooltip(true);

      // Stop pulse after one cycle (~1s)
      setTimeout(() => setShowPulse(false), 1200);
      // Auto-dismiss tooltip after 5s
      setTimeout(() => setShowTooltip(false), 5000);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = useCallback(() => {
    toggle();
    setShowTooltip(false);
    setShowPulse(false);
    if (typeof window !== "undefined") {
      localStorage.setItem(LS_KEY, "1");
    }
  }, [toggle]);

  const dismissTooltip = useCallback(() => {
    setShowTooltip(false);
    if (typeof window !== "undefined") {
      localStorage.setItem(LS_KEY, "1");
    }
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end">
      {/* Pulse ring (first visit only) */}
      {showPulse && (
        <span className="absolute inset-0 rounded-full ring-2 ring-[#4fd1c5]/50 animate-ping pointer-events-none" />
      )}

      {/* Main button */}
      <motion.button
        onClick={handleClick}
        className={`
          relative rounded-full px-4 py-2 text-sm font-medium
          border backdrop-blur-sm cursor-pointer select-none
          transition-colors duration-150 ease-out
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4fd1c5]
          ${
            mode === "dc"
              ? "bg-[#1e3a5f] border-[#4fd1c5]/40 text-[#4fd1c5] hover:bg-[#4fd1c5]/20"
              : "bg-[#2a1f4e] border-[#c4b5fd]/40 text-[#c4b5fd] hover:bg-[#c4b5fd]/20"
          }
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label={mode === "dc" ? "切换到晏的 AI 视角" : "切换到东丞模式"}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={mode}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
            className="inline-block whitespace-nowrap"
          >
            {mode === "dc" ? "🪶 探索 AI 视角" : "🔷 回到东丞"}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* First-visit tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            onClick={dismissTooltip}
            className="mt-2 max-w-[200px] rounded-lg bg-[#1e3a5f] border border-[#4fd1c5]/30 px-3 py-2 text-xs text-[#4fd1c5]/90 shadow-lg cursor-pointer"
          >
            <span>点击切换到 AI 助手晏的视角 ↑</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
