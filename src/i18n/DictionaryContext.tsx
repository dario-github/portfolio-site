"use client";

import { createContext, useContext } from "react";
import type { Dictionary } from "./get-dictionary";
import type { Locale } from "./config";

interface DictionaryContextValue {
  dict: Dictionary;
  locale: Locale;
}

const DictionaryContext = createContext<DictionaryContextValue | null>(null);

export function DictionaryProvider({
  children,
  dict,
  locale,
}: {
  children: React.ReactNode;
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <DictionaryContext.Provider value={{ dict, locale }}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDict(): DictionaryContextValue {
  const ctx = useContext(DictionaryContext);
  if (!ctx) {
    throw new Error("useDict must be used within a DictionaryProvider");
  }
  return ctx;
}
