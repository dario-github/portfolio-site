"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, Home, Briefcase, FlaskConical, Users, BookOpen, Bot, Search } from "lucide-react";
import { Command as CommandPrimitive } from "cmdk";
import { FIELDNOTES } from "@/data/fieldnotes";

/* ── Navigation items ── */

const NAV_ITEMS = [
  { label: "首页", href: "/", icon: Home },
  { label: "简介", href: "/about", icon: Users },
  { label: "经历", href: "/experience", icon: Briefcase },
  { label: "项目", href: "/projects", icon: FlaskConical },
  { label: "田野笔记", href: "/fieldnotes", icon: BookOpen },
  { label: "Agent", href: "/agent", icon: Bot },
];

/* ── Component ── */

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Cmd+K / Ctrl+K handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const navigate = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router]
  );

  return (
    <>
      {/* Mobile search button — rendered via portal-like fixed positioning */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#112240] border border-[#233554] text-[#4fd1c5] shadow-lg hover:bg-[#1d3461] transition-colors lg:hidden"
        aria-label="搜索"
      >
        <Search size={20} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Command palette */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2"
            >
              <CommandPrimitive
                className="overflow-hidden rounded-lg border border-[#233554] bg-[#0d1117] shadow-2xl"
                loop
              >
                {/* Input */}
                <div className="flex items-center gap-2 border-b border-[#233554] px-4">
                  <Search size={16} className="shrink-0 text-[#8892b0]/50" />
                  <CommandPrimitive.Input
                    placeholder="搜索田野笔记或跳转页面…"
                    className="flex h-12 w-full bg-transparent text-sm text-[#ccd6f6] outline-none placeholder:text-[#8892b0]/40"
                    autoFocus
                  />
                  <kbd className="hidden shrink-0 rounded border border-[#233554] bg-[#112240] px-1.5 py-0.5 font-mono text-[10px] text-[#8892b0]/60 sm:inline">
                    ESC
                  </kbd>
                </div>

                {/* Results */}
                <CommandPrimitive.List className="max-h-[320px] overflow-y-auto p-2">
                  <CommandPrimitive.Empty className="py-8 text-center text-sm text-[#8892b0]/60">
                    没有找到匹配结果
                  </CommandPrimitive.Empty>

                  {/* Navigation group */}
                  <CommandPrimitive.Group
                    heading="导航"
                    className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-[#8892b0]/50"
                  >
                    {NAV_ITEMS.map((item) => (
                      <CommandPrimitive.Item
                        key={item.href}
                        value={item.label}
                        onSelect={() => navigate(item.href)}
                        className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm text-[#8892b0] transition-colors data-[selected=true]:bg-[#112240] data-[selected=true]:text-[#ccd6f6]"
                      >
                        <item.icon size={16} className="shrink-0 text-[#4fd1c5]/60" />
                        {item.label}
                      </CommandPrimitive.Item>
                    ))}
                  </CommandPrimitive.Group>

                  {/* Fieldnotes group */}
                  <CommandPrimitive.Group
                    heading="田野笔记"
                    className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-[#8892b0]/50"
                  >
                    {FIELDNOTES.map((note) => (
                      <CommandPrimitive.Item
                        key={note.slug}
                        value={`${note.title} ${note.tldr} ${note.tags.join(" ")}`}
                        onSelect={() => navigate(`/fieldnotes/${note.slug}`)}
                        className="flex cursor-pointer items-start gap-3 rounded-md px-3 py-2.5 text-sm text-[#8892b0] transition-colors data-[selected=true]:bg-[#112240] data-[selected=true]:text-[#ccd6f6]"
                      >
                        <FileText size={16} className="mt-0.5 shrink-0 text-[#c4b5fd]/60" />
                        <div className="min-w-0">
                          <div className="truncate font-medium text-[#ccd6f6]/90">{note.title}</div>
                          <div className="mt-0.5 truncate text-xs text-[#8892b0]/60">{note.tldr}</div>
                        </div>
                      </CommandPrimitive.Item>
                    ))}
                  </CommandPrimitive.Group>
                </CommandPrimitive.List>

                {/* Footer hint */}
                <div className="flex items-center justify-between border-t border-[#233554] px-4 py-2 text-[10px] text-[#8892b0]/40">
                  <span>↑↓ 导航 · ↵ 选择 · ESC 关闭</span>
                  <span className="hidden sm:inline">⌘K 切换</span>
                </div>
              </CommandPrimitive>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
