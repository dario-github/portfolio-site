"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Github, Globe, Linkedin, Search } from "lucide-react";
import Link from "next/link";
import { useGlow } from "./GlowContext";
import { useDict } from "@/i18n/DictionaryContext";

/* ── Nav definitions (unified) ── */

interface NavItem {
  navKey: string;
  href: string;
  anchorHref?: string;
  index: string;
  type: "route" | "anchor";
  sectionId?: string;
  persona: "dc" | "yan" | "shared";
}

const NAV_ITEMS: NavItem[] = [
  // 东丞
  { navKey: "about", href: "/about", index: "01", type: "route", persona: "dc" },
  { navKey: "experience", href: "/experience", index: "02", type: "route", persona: "dc" },
  { navKey: "projects", href: "/projects", index: "03", type: "route", persona: "dc" },
  // 晏
  { navKey: "fieldnotes", href: "/fieldnotes", index: "04", type: "route", persona: "yan" },
  { navKey: "agent", href: "/agent", index: "05", type: "route", persona: "yan" },
  // Shared
  { navKey: "contact", href: "/#contact", anchorHref: "#contact", index: "06", type: "anchor", sectionId: "contact", persona: "shared" },
];

/* ── Glow color maps ── */

const BASE_GLOW = "79, 209, 197";

const SECTION_GLOW: Record<string, string> = {
  "dc-projects": "79, 209, 197",
  updates: "245, 158, 11",
  fieldnotes: "196, 181, 253",
  "agent-overview": "196, 181, 253",
  contact: "136, 146, 176",
};

const ROUTE_GLOW_COLORS: Record<string, string> = {
  "/about": "79, 209, 197",
  "/experience": "59, 130, 246",
  "/projects": "139, 92, 246",
  "/fieldnotes": "196, 181, 253",
  "/agent": "196, 181, 253",
};

/* ── X / Twitter icon ── */
function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* ── Helper: strip locale prefix from pathname ── */
function stripLocale(pathname: string, locale: string): string {
  const prefix = `/${locale}`;
  if (pathname === prefix) return "/";
  if (pathname.startsWith(prefix + "/")) return pathname.slice(prefix.length);
  return pathname;
}

/* ── Component ── */

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { dict, locale } = useDict();
  const { setGlowColor } = useGlow();

  const isHomepage = pathname === `/${locale}`;

  const taglines = dict.sidebar.taglines as string[];
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Tagline cycling
  useEffect(() => {
    const timer = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [taglines.length]);

  const handleNameClick = useCallback(() => {
    setTaglineIndex((prev) => (prev + 1) % taglines.length);
  }, [taglines.length]);

  // Set base glow color
  useEffect(() => {
    if (isHomepage && !activeSection) {
      setGlowColor(BASE_GLOW);
    }
  }, [isHomepage, activeSection, setGlowColor]);

  // Scroll spy (homepage) + route-based glow (sub-pages)
  useEffect(() => {
    if (!isHomepage) {
      const strippedPath = stripLocale(pathname, locale);
      setGlowColor(
        ROUTE_GLOW_COLORS[strippedPath] ||
        Object.entries(ROUTE_GLOW_COLORS).find(([k]) => strippedPath.startsWith(k))?.[1] ||
        BASE_GLOW
      );
      setActiveSection(null);
      return;
    }

    const sectionIds = NAV_ITEMS
      .filter((i) => i.type === "anchor" && i.sectionId)
      .map((i) => i.sectionId!);

    // Also observe homepage sections for glow color
    sectionIds.push("dc-projects", "updates", "fieldnotes", "agent-overview");

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
  }, [isHomepage, pathname, locale, setGlowColor]);

  const isActive = (item: NavItem) => {
    const localizedHref = `/${locale}${item.href}`;
    if (item.type === "route") {
      return pathname === localizedHref;
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

  /* ── Language switcher ── */
  const handleLocaleSwitch = () => {
    const newLocale = locale === "zh" ? "en" : "zh";
    const strippedPath = stripLocale(pathname, locale);
    router.push(`/${newLocale}${strippedPath === "/" ? "" : strippedPath}`);
  };

  /* ── Render nav link ── */
  const renderNavLink = (item: NavItem) => {
    const active = isActive(item);
    const accentColor = getAccentColor(item);
    const barClass = `mr-4 w-0.5 transition-all duration-300 ${
      active ? `h-6` : `h-4 group-hover:h-6`
    }`;
    const textClass = `text-xs font-bold uppercase tracking-widest transition-colors duration-300`;

    const label = (dict.nav as Record<string, string>)[item.navKey] ?? item.navKey;

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
          {item.index}. {label}
        </span>
      </>
    );

    if (item.type === "route") {
      return (
        <Link className="group flex items-center py-3" href={`/${locale}${item.href}`}>
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
      <a className="group flex items-center py-3" href={`/${locale}${item.href}`}>
        {inner}
      </a>
    );
  };

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[35%] lg:flex-col lg:justify-between lg:py-24">
      <div>
        {/* Identity — dual soul */}
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-[#ccd6f6] sm:text-5xl">
            <a
              href={`/${locale}`}
              onClick={(e) => {
                e.preventDefault();
                handleNameClick();
              }}
              className="cursor-pointer transition-colors"
            >
              <span className="hover:text-[#4fd1c5] transition-colors">{dict.sidebar.name1}</span>
              {" "}
              <span className="text-[#4fd1c5] font-light text-3xl sm:text-4xl">×</span>
              {" "}
              <span className="hover:text-[#c4b5fd] transition-colors">{dict.sidebar.name2}</span>
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
                {taglines[taglineIndex]}
              </motion.span>
            </AnimatePresence>
          </h2>

          <p className="mt-4 max-w-xs leading-[1.85] text-[#8892b0]/80">
            {dict.sidebar.subtitle}
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
                        {dict.nav.dcLabel}
                      </span>
                      <div className="h-px flex-1 bg-[#233554]/50" />
                    </div>
                  )}
                  {showYanHeader && (
                    <div className="mt-4 mb-2 flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c4b5fd]/60">
                        {dict.nav.yanLabel}
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

          {/* Search trigger */}
          <button
            onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
            className="mt-6 flex w-full items-center gap-3 rounded-lg border border-[#233554]/60 bg-[#112240]/40 px-3 py-2 text-sm text-[#8892b0]/60 transition-colors hover:border-[#4fd1c5]/30 hover:text-[#8892b0]"
          >
            <Search size={14} />
            <span>{dict.nav.searchPlaceholder}</span>
            <kbd className="ml-auto rounded border border-[#233554] bg-[#0a192f] px-1.5 py-0.5 font-mono text-[10px] text-[#8892b0]/40">
              ⌘K
            </kbd>
          </button>
        </nav>
      </div>

      {/* Language switcher + Social Links */}
      <div className="ml-1 mt-8">
        {/* Language switcher */}
        <div className="mb-4">
          <button
            onClick={handleLocaleSwitch}
            className="rounded-full border border-[#233554] px-3 py-1 text-xs font-mono text-[#8892b0] hover:border-[#4fd1c5] hover:text-[#4fd1c5] transition-colors"
          >
            {locale === "zh" ? "EN" : "中"}
          </button>
        </div>

        {/* Social Links — both personas side by side */}
        <div className="flex items-center gap-6">
          {/* DC socials */}
          <ul className="flex items-center gap-4" aria-label={dict.sidebar.dcSocials}>
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
          <ul className="flex items-center gap-4" aria-label={dict.sidebar.yanSocials}>
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

          {/* Divider */}
          <div className="h-4 w-px bg-[#233554]" />

          {/* Language switcher */}
          <button
            onClick={() => {
              const target = locale === "zh" ? "en" : "zh";
              const stripped = stripLocale(pathname, locale);
              router.push(`/${target}${stripped}`);
            }}
            className="rounded-full border border-[#233554] px-3 py-1 text-xs font-mono text-[#8892b0] transition-colors hover:border-[#4fd1c5] hover:text-[#4fd1c5]"
            aria-label="Switch language"
          >
            {locale === "zh" ? "EN" : "中文"}
          </button>
        </div>
      </div>
    </header>
  );
}
