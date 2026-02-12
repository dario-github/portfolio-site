"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface GlowContextType {
  glowColor: string;
  setGlowColor: (color: string) => void;
}

const GlowContext = createContext<GlowContextType>({
  glowColor: "79, 209, 197",
  setGlowColor: () => {},
});

export function GlowProvider({ children }: { children: ReactNode }) {
  const [glowColor, setGlowColor] = useState("79, 209, 197");
  return (
    <GlowContext.Provider value={{ glowColor, setGlowColor }}>
      {children}
    </GlowContext.Provider>
  );
}

export function useGlow() {
  return useContext(GlowContext);
}
