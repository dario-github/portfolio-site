"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type Mode = "dc" | "yan";

interface DualModeContextType {
  mode: Mode;
  toggle: () => void;
}

const DualModeContext = createContext<DualModeContextType>({
  mode: "dc",
  toggle: () => {},
});

export function DualModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("dc");
  const toggle = () => setMode((prev) => (prev === "dc" ? "yan" : "dc"));
  return (
    <DualModeContext.Provider value={{ mode, toggle }}>
      {children}
    </DualModeContext.Provider>
  );
}

export function useDualMode() {
  return useContext(DualModeContext);
}
