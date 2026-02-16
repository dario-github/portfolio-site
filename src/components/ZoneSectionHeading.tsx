/* ═══════════════════════════════════════════════════
   ZoneSectionHeading — 参数化的 Zone-aware 标题
   替代 DcSectionHeading / YanSectionHeading / SharedSectionHeading
   ═══════════════════════════════════════════════════ */

import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  index: string;
  subtitle?: string;
  persona: "dc" | "yan" | "shared";
}

const PERSONA_CONFIG = {
  dc: {
    bgStyle: "hsla(215, 30%, 12%, 0.75)",
    headingClass: "font-bold uppercase tracking-widest",
    indexColor: "#4fd1c5",
    desktopSize: "text-xl font-semibold",
  },
  yan: {
    bgStyle: "hsla(255, 20%, 11%, 0.75)",
    headingClass: "font-medium italic tracking-wide",
    indexColor: "#c4b5fd",
    desktopSize: "text-xl font-medium italic",
  },
  shared: {
    bgStyle: "hsla(220, 15%, 10%, 0.75)",
    headingClass: "font-bold uppercase tracking-widest",
    indexColor: "#8892b0",
    desktopSize: "text-2xl font-bold",
  },
};

export default function ZoneSectionHeading({
  children,
  index,
  subtitle,
  persona,
}: Props) {
  const cfg = PERSONA_CONFIG[persona];
  return (
    <>
      {/* Mobile: sticky header */}
      <div
        className="sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:hidden"
        style={{ background: cfg.bgStyle }}
      >
        <h2 className={`text-sm ${cfg.headingClass} text-[#ccd6f6]`}>
          <span
            className="font-mono mr-2 not-italic"
            style={{ color: cfg.indexColor }}
          >
            {index}.
          </span>
          {children}
        </h2>
        {subtitle && (
          <p className="mt-0.5 text-xs text-[#8892b0]/60">{subtitle}</p>
        )}
      </div>
      {/* Desktop: numbered heading with decorative line */}
      <div className="hidden lg:block mb-8">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm" style={{ color: cfg.indexColor }}>
            {index}.
          </span>
          <h2 className={`${cfg.desktopSize} text-[#ccd6f6]`}>{children}</h2>
          <div className="h-px bg-[#233554] flex-1 ml-4" />
        </div>
        {subtitle && (
          <p
            className={`mt-1 text-sm text-[#8892b0]/60 ml-8 ${
              persona === "yan" ? "italic" : ""
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </>
  );
}
