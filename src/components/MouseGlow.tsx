"use client";

import { useEffect } from "react";
import { useGlow } from "./GlowContext";

export default function MouseGlow() {
  const { glowColor } = useGlow();

  useEffect(() => {
    // Skip mousemove listener on touch-only devices
    const mq = window.matchMedia("(hover: hover)");
    if (!mq.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-all duration-500 mouse-glow"
      style={{
        background: `radial-gradient(600px at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(${glowColor}, 0.15), transparent 80%)`,
      }}
    />
  );
}
