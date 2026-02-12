"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useDualMode } from "./DualModeContext";

export default function ModeToggleButton() {
  const { mode, toggle } = useDualMode();

  return (
    <motion.button
      onClick={toggle}
      className="fixed top-4 right-4 z-50 rounded-full bg-[#112240]/90 border border-[#1e3a5f] px-3 py-1.5 text-sm font-medium text-[#ccd6f6] hover:border-[#4fd1c5]/50 hover:text-[#4fd1c5] transition-colors backdrop-blur-sm cursor-pointer select-none"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={mode === "dc" ? "切换到晏模式" : "切换到东丞模式"}
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
          {mode === "dc" ? "🪶 切换到晏" : "🔷 切换到东丞"}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
