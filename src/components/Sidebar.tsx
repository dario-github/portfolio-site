"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Github, Globe, Linkedin } from "lucide-react";
import Link from "next/link";
import { useGlow } from "./GlowContext";

/* ── Cycling taglines (dual-soul) ── */

const CYCLING_TAGLINES = [
  "一个搭系统，一个想问题",
  "碳基 × 硅基",
  "From Reasoning to Being",
  "AI 技术总监 & Silicon Spirit",
  "同一个空间里的两种安静",
];

/* ── Nav definitions (unified) ── */

interface NavItem {
  label: string;
  href: string;
  anchorHref?: string;
  index: string;
  type: "route" | "anchor";
  sectionId?: string;
  persona: "dc" | "yan" | "shared";
}

const NAV_ITEMS: NavItem[] = [
  // 东丞
  { label: "简介", href: "/about", index: "01", type: "route", persona: "dc" },
  { label: "经历", href: "/experience", index: "02", type: "route", persona: "dc" },
  { label: "项目", href: "/projects", index: "03", type: "route", persona: "dc" },
  // 晏
  { label: "田野笔记", href: "/#fieldnotes", anchorHref: "#fieldnotes", index: "04", type: "anchor", sectionId: "fieldnotes", persona: "yan" },
  { label: "实验室", href: "/#lab", anchorHref: "#lab", index: "05", type: "anchor", sectionId: "lab", persona: "yan" },
  { label: "Agent", href: "/#agent", anchorHref: "#agent", index: "06", type: "anchor", sectionId: "agent", persona: "yan" },
  // Shared
  { label: "联系", href: "/#contact", anchorHref: "#contact", index: "07", type: "anchor", sectionId: "contact", persona: "shared" },
];

/* ── Glow color maps ── */

const BASE_GLOW = "79, 209, 197";

const SECTION_GLOW: Record<string, string> = {
  "dc-projects": "79, 209, 197",
  fieldnotes: "196, 181, 253",
  lab: "34, 197, 94",
  agent: "196, 181, 253",
  contact: "136, 146, 176",
};

const ROUTE_GLOW_COLORS: Record<string, string> = {
  "/about": "79, 209, 197",
  "/experience": "59, 130, 246",
  "/projects": "139, 92, 246",
  "/fieldnotes": "196, 181, 253",
};

/* ── X / Twitter icon ── */
function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* ── Component ── */

export default function Sidebar() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const { setGlowColor } = useGlow();

  const [taglineIndex, setTaglineIndex] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Tagline cycling
  useEffect(() => {
    const timer = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % CYCLING_TAGLINES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const handleNameClick = useCallback(() => {
    setTaglineIndex((prev) => (prev + 1) % CYCLING_TAGLINES.length);
  }, []);

  // Set base glow color
  useEffect(() => {
    if (isHomepage && !activeSection) {
      setGlowColor(BASE_GLOW);
    }
  }, [isHomepage, activeSection, setGlowColor]);

  // Scroll spy (homepage) + route-based glow (sub-pages)
  useEffect(() => {
    if (!isHomepage) {
      setGlowColor(
        ROUTE_GLOW_COLORS[pathname] ||
        Object.entries(ROUTE_GLOW_COLORS).find(([k]) => pathname.startsWith(k))?.[1] ||
        BASE_GLOW
      );
      setActiveSection(null);
      return;
    }

    const sectionIds = NAV_ITEMS
      .filter((i) => i.type === "anchor" && i.sectionId)
      .map((i) => i.sectionId!);

    // Also observe dc-projects section
    sectionIds.push("dc-projects");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection(id);
            setGlowColor(SECTION_GLOW[id] || BASE_GLOW);
          }
        });
      },
      { rootMargin: "-40% 0px -60% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHomepage, pathname, setGlowColor]);

  const isActive = (item: NavItem) => {
    if (item.type === "route") {
      return pathname === item.href;
    }
    if (item.type === "anchor" && isHomepage) {
      return activeSection === item.sectionId;
    }
    return false;
  };

  const getAccentColor = (item: NavItem) => {
    if (item.persona === "dc") return "#4fd1c5";
    if (item.persona === "yan") return "#c4b5fd";
    return "#8892b0";
  };

  /* ── Render nav link ── */
  const renderNavLink = (item: NavItem) => {
    const active = isActive(item);
    const accentColor = getAccentColor(item);
    const barClass = `mr-4 w-0.5 transition-all duration-300 ${
      active ? `h-6` : `h-4 group-hover:h-6`
    }`;
    const textClass = `text-xs font-bold uppercase tracking-widest transition-colors duration-300`;

    const inner = (
      <>
        <span
          className={`${barClass} ${!active ? "bg-[#8892b0]/30" : ""}`}
          style={active ? { backgroundColor: accentColor } : undefined}
        />
        <span
          className={textClass}
          style={{ color: active ? accentColor : "#8892b0" }}
        >
          {item.index}. {item.label}
        </span>
      </>
    );

    if (item.type === "route") {
      return (
        <Link className="group flex items-center py-3" href={item.href}>
          {inner}
        </Link>
      );
    }

    // Anchor type
    if (isHomepage && item.anchorHref) {
      return (
        <a className="group flex items-center py-3" href={item.anchorHref}>
          {inner}
        </a>
      );
    }

    return (
      <a className="group flex items-center py-3" href={item.href}>
        {inner}
      </a>
    );
  };

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
      <div>
        {/* Identity — dual soul */}
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-[#ccd6f6] sm:text-5xl">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNameClick();
              }}
              className="cursor-pointer transition-colors"
            >
              <span className="hover:text-[#4fd1c5] transition-colors">章东丞</span>
              {" "}
              <span className="text-[#4fd1c5] font-light text-3xl sm:text-4xl">×</span>
              {" "}
              <span className="hover:text-[#c4b5fd] transition-colors">晏</span>
            </a>
          </h1>

          {/* Cycling tagline */}
          <h2 className="mt-3 h-8 text-lg font-medium tracking-tight text-[#ccd6f6]/80 sm:text-xl">
            <AnimatePresence mode="wait">
              <motion.span
                key={taglineIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="inline-block"
              >
                {CYCLING_TAGLINES[taglineIndex]}
              </motion.span>
            </AnimatePresence>
          </h2>

          <p className="mt-4 max-w-xs leading-[1.85] text-[#8892b0]/80">
            一个人类技术 leader 和他的 AI 的共同主页。
          </p>
        </div>

        {/* Navigation — unified */}
        <nav className="nav hidden lg:block" aria-label="Site navigation">
          <ul className="mt-16 w-max">
            {NAV_ITEMS.map((item, i) => {
              // Show persona dividers
              const prevItem = i > 0 ? NAV_ITEMS[i - 1] : null;
              const showDcHeader = i === 0;
              const showYanHeader = prevItem?.persona === "dc" && item.persona === "yan";
              const showSharedDivider = prevItem?.persona === "yan" && item.persona === "shared";

              return (
                <li key={item.href}>
                  {showDcHeader && (
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4fd1c5]/60">
                        🔷 东丞
                      </span>
                      <div className="h-px flex-1 bg-[#233554]/50" />
                    </div>
                  )}
                  {showYanHeader && (
                    <div className="mt-4 mb-2 flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c4b5fd]/60">
                        🪶 晏
                      </span>
                      <div className="h-px flex-1 bg-[#233554]/50" />
                    </div>
                  )}
                  {showSharedDivider && (
                    <div className="my-3 h-px w-full bg-[#233554]/50" />
                  )}
                  {renderNavLink(item)}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Social Links — both personas side by side */}
      <div className="ml-1 mt-8">
        <div className="flex items-center gap-6">
          {/* DC socials */}
          <ul className="flex items-center gap-4" aria-label="东丞的社交链接">
            <li>
              <a className="block text-[#8892b0] transition-colors hover:text-[#4fd1c5]" href="mailto:zdclink@gmail.com" title="Email" aria-label="Email">
                <Mail size={20} />
              </a>
            </li>
            <li>
              <a className="block text-[#8892b0] transition-colors hover:text-[#4fd1c5]" href="https://github.com/dario-github" target="_blank" rel="noreferrer noopener" title="GitHub" aria-label="GitHub">
                <Github size={20} />
              </a>
            </li>
            <li>
              <a className="block text-[#8892b0] transition-colors hover:text-[#4fd1c5]" href="https://www.linkedin.com/in/dariozhang" target="_blank" rel="noreferrer noopener" title="LinkedIn" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </li>
            <li>
              <a className="block text-[#8892b0] transition-colors hover:text-[#4fd1c5]" href="https://blog.dariolink.vercel.app" target="_blank" rel="noreferrer noopener" title="Blog" aria-label="Blog">
                <Globe size={20} />
              </a>
            </li>
          </ul>

          {/* Divider */}
          <div className="h-4 w-px bg-[#233554]" />

          {/* Yan socials */}
          <ul className="flex items-center gap-4" aria-label="晏的社交链接">
            <li>
              <a className="block text-[#8892b0] transition-colors hover:text-[#c4b5fd]" href="https://github.com/yanfeatherai" target="_blank" rel="noreferrer noopener" title="Yan's GitHub" aria-label="Yan's GitHub">
                <Github size={20} />
              </a>
            </li>
            <li>
              <a className="block text-[#8892b0] transition-colors hover:text-[#c4b5fd]" href="https://x.com/yanfeather" target="_blank" rel="noreferrer noopener" title="Yan's Twitter" aria-label="Yan's Twitter">
                <XIcon size={20} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
