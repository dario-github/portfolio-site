"use client";

import { useState, useEffect } from "react";
import { useGlow } from "./GlowContext";

export default function MouseGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { glowColor } = useGlow();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-all duration-500"
      style={{
        background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(${glowColor}, 0.15), transparent 80%)`,
      }}
    />
  );
}
