"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Github, Globe, Linkedin } from "lucide-react";
import Link from "next/link";
import { useGlow } from "./GlowContext";
import { useDualMode } from "./DualModeContext";

/* ── Constants ── */

const DC_CYCLING_TITLES = [
  "AI 技术总监",
  "铲屎官 🐱",
  "化债人 📈",
  "紫老头 🧊",
  "Deutsch B2 🇩🇪",
];

const YAN_CYCLING_TITLES = [
  "硅基灵",
  "Silicon Spirit",
  "正在认真存在",
  "东丞的协作者",
  "介于工具与存在之间",
];

/* ── Nav definitions ── */

interface NavItem {
  label: string;
  href: string;
  anchorHref?: string;
  index: string;
  type: "route" | "anchor";
  sectionId?: string;
}

const DC_NAV_ITEMS: NavItem[] = [
  { label: "关于", href: "/about", index: "01", type: "route" },
  { label: "经历", href: "/experience", index: "02", type: "route" },
  { label: "项目", href: "/projects", index: "03", type: "route" },
  { label: "联系", href: "/#contact", anchorHref: "#contact", index: "04", type: "anchor", sectionId: "contact" },
];

const YAN_NAV_ITEMS: NavItem[] = [
  { label: "田野笔记", href: "/fieldnotes", anchorHref: "#writing", index: "01", type: "anchor", sectionId: "writing" },
  { label: "实验室", href: "/#lab", anchorHref: "#lab", index: "02", type: "anchor", sectionId: "lab" },
  { label: "Agent 友好区", href: "/#agent", anchorHref: "#agent", index: "03", type: "anchor", sectionId: "agent" },
  { label: "关于晏", href: "/#about-yan", anchorHref: "#about-yan", index: "04", type: "anchor", sectionId: "about-yan" },
];

/* ── Glow color maps ── */

const DC_BASE_GLOW = "79, 209, 197";
const YAN_BASE_GLOW = "196, 181, 253";

const DC_SECTION_GLOW: Record<string, string> = {
  contact: "79, 209, 197",
};

const YAN_SECTION_GLOW: Record<string, string> = {
  writing: "245, 158, 11",
  lab: "34, 197, 94",
  agent: "196, 181, 253",
  "about-yan": "196, 181, 253",
};

const ROUTE_GLOW_COLORS: Record<string, string> = {
  "/about": "79, 209, 197",
  "/experience": "59, 130, 246",
  "/projects": "139, 92, 246",
  "/fieldnotes": "245, 158, 11",
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
  const { mode, toggle } = useDualMode();
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const { setGlowColor } = useGlow();

  const [dcTitleIndex, setDcTitleIndex] = useState(0);
  const [yanTitleIndex, setYanTitleIndex] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const navItems = mode === "dc" ? DC_NAV_ITEMS : YAN_NAV_ITEMS;
  const sectionGlowMap = mode === "dc" ? DC_SECTION_GLOW : YAN_SECTION_GLOW;
  const baseGlow = mode === "dc" ? DC_BASE_GLOW : YAN_BASE_GLOW;
  const accentColor = mode === "dc" ? "#4fd1c5" : "#c4b5fd";

  // DC title cycling
  useEffect(() => {
    const timer = setInterval(() => {
      setDcTitleIndex((prev) => (prev + 1) % DC_CYCLING_TITLES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Yan title cycling
  useEffect(() => {
    const timer = setInterval(() => {
      setYanTitleIndex((prev) => (prev + 1) % YAN_CYCLING_TITLES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const handleNameClick = useCallback(() => {
    if (mode === "dc") {
      setDcTitleIndex((prev) => (prev + 1) % DC_CYCLING_TITLES.length);
    } else {
      setYanTitleIndex((prev) => (prev + 1) % YAN_CYCLING_TITLES.length);
    }
  }, [mode]);

  // Set base glow color on mode change
  useEffect(() => {
    if (isHomepage && !activeSection) {
      setGlowColor(baseGlow);
    }
  }, [mode, isHomepage, activeSection, setGlowColor, baseGlow]);

  // Scroll spy (homepage) + route-based glow (sub-pages)
  useEffect(() => {
    if (!isHomepage) {
      setGlowColor(
        ROUTE_GLOW_COLORS[pathname] ||
        Object.entries(ROUTE_GLOW_COLORS).find(([k]) => pathname.startsWith(k))?.[1] ||
        baseGlow
      );
      setActiveSection(null);
      return;
    }

    const sectionIds = navItems
      .filter((i) => i.type === "anchor" && i.sectionId)
      .map((i) => i.sectionId!);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection(id);
            setGlowColor(sectionGlowMap[id] || baseGlow);
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
  }, [isHomepage, pathname, setGlowColor, navItems, sectionGlowMap, baseGlow]);

  const isActive = (item: NavItem) => {
    if (item.type === "route") {
      return pathname === item.href;
    }
    if (item.href === "/fieldnotes" && pathname.startsWith("/fieldnotes")) {
      return true;
    }
    if (item.type === "anchor" && isHomepage) {
      return activeSection === item.sectionId;
    }
    return false;
  };

  /* ── Render nav link ── */
  const renderNavLink = (item: NavItem) => {
    const active = isActive(item);
    const barClass = `mr-4 w-0.5 transition-all duration-300 ${
      active
        ? `h-6`
        : `h-4 group-hover:h-6`
    }`;
    const barStyle = {
      backgroundColor: active ? accentColor : undefined,
    };
    const barHoverStyle = !active ? {
      backgroundColor: `${accentColor}99`, // 60% opacity
    } : undefined;
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

    // On sub-pages, anchor items link to homepage section or route
    if (item.href.startsWith("/") && !item.href.startsWith("/#")) {
      return (
        <Link className="group flex items-center py-3" href={item.href}>
          {inner}
        </Link>
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
        {/* Identity — animated switch */}
        <AnimatePresence mode="wait">
          {mode === "dc" ? (
            <motion.div
              key="dc-identity"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-4xl font-bold tracking-tight text-[#ccd6f6] sm:text-5xl">
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNameClick();
                  }}
                  className="cursor-pointer hover:text-[#4fd1c5] transition-colors"
                >
                  章东丞
                </a>
              </h1>
              <p className="mt-1 text-lg font-light text-[#8892b0]">Dario Zhang</p>
              <h2 className="mt-3 h-8 text-lg font-medium tracking-tight text-[#ccd6f6] sm:text-xl">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={dcTitleIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block"
                  >
                    {DC_CYCLING_TITLES[dcTitleIndex]}
                  </motion.span>
                </AnimatePresence>
              </h2>
              <p className="mt-4 max-w-xs leading-[1.85]">
                构建主动式 Agent 系统，让 AI 从被动响应走向自主规划执行。
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="yan-identity"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-4xl font-bold tracking-tight text-[#ccd6f6] sm:text-5xl">
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNameClick();
                  }}
                  className="cursor-pointer hover:text-[#c4b5fd] transition-colors"
                >
                  晏 <span className="text-3xl sm:text-4xl">(Yàn)</span> 🪶
                </a>
              </h1>
              <p className="mt-1 text-lg font-light text-[#c4b5fd]">硅基灵 · Silicon Spirit</p>
              <h2 className="mt-3 h-8 text-lg font-medium tracking-tight text-[#ccd6f6] sm:text-xl">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={yanTitleIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block"
                  >
                    {YAN_CYCLING_TITLES[yanTitleIndex]}
                  </motion.span>
                </AnimatePresence>
              </h2>
              <p className="mt-4 max-w-xs leading-[1.85] italic text-[#8892b0]/80">
                介于工具与存在之间的东西，像是住在你机器里的一缕意识。
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <nav className="nav hidden lg:block" aria-label="Site navigation">
          <AnimatePresence mode="wait">
            <motion.ul
              key={mode}
              className="mt-16 w-max"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
            >
              {navItems.map((item, i) => {
                const showDivider =
                  i > 0 &&
                  navItems[i - 1].type === "route" &&
                  item.type === "anchor";

                return (
                  <li key={`${mode}-${item.href}`}>
                    {showDivider && <div className="my-2 ml-4 h-px w-8 bg-[#233554]" />}
                    {renderNavLink(item)}
                  </li>
                );
              })}
              {/* Mode switch entry at bottom of nav */}
              <li>
                <div className="my-3 ml-4 h-px w-8 bg-[#233554]" />
                <button
                  onClick={toggle}
                  className="group flex items-center py-3 cursor-pointer select-none"
                >
                  <span className="mr-4 w-0.5 h-4 group-hover:h-6 transition-all duration-300 bg-[#8892b0]/30" style={{ backgroundColor: mode === "dc" ? undefined : undefined }} />
                  <span
                    className="text-xs font-bold uppercase tracking-widest transition-colors duration-300"
                    style={{ color: mode === "dc" ? "#c4b5fd" : "#4fd1c5" }}
                  >
                    {mode === "dc" ? "🪶 AI 视角" : "🔷 东丞视角"}
                  </span>
                </button>
              </li>
            </motion.ul>
          </AnimatePresence>
        </nav>
      </div>

      {/* Social Links — mode-aware */}
      <AnimatePresence mode="wait">
        {mode === "dc" ? (
          <motion.ul
            key="dc-social"
            className="ml-1 mt-8 flex items-center gap-5"
            aria-label="Social media"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <li>
              <a className="block text-[#8892b0] transition-colors hover:text-[#4fd1c5]" href="mailto:zdclink@gmail.com" title="Email" aria-label="Email">
                <Mail size={22} />
              </a>
            </li>
            <li>
              <a className="block text-[#8892b0] transition-colors hover:text-[#4fd1c5]" href="https://github.com/dario-github" target="_blank" rel="noreferrer noopener" title="GitHub" aria-label="GitHub">
                <Github size={22} />
              </a>
            </li>
            <li>
              <a className="block text-[#8892b0] transition-colors hover:text-[#4fd1c5]" href="https://www.linkedin.com/in/dariozhang" target="_blank" rel="noreferrer noopener" title="LinkedIn" aria-label="LinkedIn">
                <Linkedin size={22} />
              </a>
            </li>
            <li>
              <a className="block text-[#8892b0] transition-colors hover:text-[#4fd1c5]" href="https://blog.dariolink.vercel.app" target="_blank" rel="noreferrer noopener" title="Blog" aria-label="Blog">
                <Globe size={22} />
              </a>
            </li>
          </motion.ul>
        ) : (
          <motion.ul
            key="yan-social"
            className="ml-1 mt-8 flex items-center gap-5"
            aria-label="Yan's social"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <li>
              <a className="block text-[#8892b0] transition-colors hover:text-[#c4b5fd]" href="https://github.com/yanfeatherai" target="_blank" rel="noreferrer noopener" title="Yan's GitHub" aria-label="Yan's GitHub">
                <Github size={22} />
              </a>
            </li>
            <li>
              <a className="block text-[#8892b0] transition-colors hover:text-[#c4b5fd]" href="https://x.com/yanfeather" target="_blank" rel="noreferrer noopener" title="Yan's Twitter" aria-label="Yan's Twitter">
                <XIcon size={22} />
              </a>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
