"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Menu, RotateCcw, Sparkles, X } from "lucide-react";
import { navLinks, profile } from "@/data/portfolio";

interface NavProps {
  playMode?: boolean;
  onTogglePlayMode?: () => void;
}

export function Nav({ playMode = false, onTogglePlayMode }: NavProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!playMode) {
      document.body.style.overflow = open ? "hidden" : "";
    }
    return () => {
      if (!playMode) {
        document.body.style.overflow = "";
      }
    };
  }, [open, playMode]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-5 md:pt-7"
      >
        <nav
          aria-label="Primary"
          className={`
            pointer-events-auto relative flex w-full max-w-3xl items-center justify-between gap-4
            rounded-full border py-2 pl-5 pr-2 text-ink-foreground transition-all duration-500
            ${
              scrolled
                ? "border-white/15 bg-[#000000] shadow-[0_12px_32px_-8px_rgba(0,0,0,0.7)]"
                : "border-white/15 bg-ink/70 backdrop-blur-xl shadow-[0_12px_36px_-10px_rgba(255,255,255,0.14),inset_0_1px_0_0_rgba(255,255,255,0.22)] hover:border-white/25 hover:shadow-[0_14px_40px_-8px_rgba(255,255,255,0.2),inset_0_1px_0_0_rgba(255,255,255,0.3)]"
            }
          `}
        >
          <a
            href="#top"
            onClick={() => playMode && onTogglePlayMode?.()}
            className="font-display text-sm font-semibold tracking-[0.12em] transition-opacity hover:opacity-85"
          >
            {profile.wordmark}
          </a>

          <ul className="hidden items-center gap-6 md:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => playMode && onTogglePlayMode?.()}
                  className="group relative label-caps text-[0.625rem] text-ink-muted transition-colors duration-300 hover:text-ink-foreground"
                >
                  {l.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-ink-foreground transition-transform duration-500 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            {onTogglePlayMode && (
              <button
                type="button"
                onClick={onTogglePlayMode}
                aria-pressed={playMode}
                title={playMode ? "Restore layout" : "Break gravity & drag elements"}
                className={`
                  label-caps inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-[0.6rem] transition-all duration-300
                  ${
                    playMode
                      ? "border-emerald-400/60 bg-emerald-400 text-ink shadow-[0_0_20px_rgba(52,211,153,0.45)]"
                      : "border-white/20 bg-white/5 text-ink-foreground hover:border-white/40 hover:bg-white/10"
                  }
                `}
              >
                {playMode ? (
                  <>
                    <RotateCcw className="size-3" strokeWidth={2} />
                    <span>Reset</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="size-3 text-emerald-400" strokeWidth={1.8} />
                    <span>Play Mode</span>
                  </>
                )}
              </button>
            )}

            <a
              href={`mailto:${profile.email}`}
              aria-label="Email Sayanth"
              className="grid size-9 place-items-center rounded-full bg-ink-foreground text-ink transition-transform duration-300 hover:scale-105"
            >
              <Mail className="size-4" strokeWidth={1.6} />
            </a>

            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="grid size-9 place-items-center rounded-full text-ink-foreground transition-colors hover:bg-ink-foreground/10 md:hidden"
            >
              <Menu className="size-5" strokeWidth={1.6} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-background px-6 pb-10 pt-6 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-sm font-semibold tracking-[0.12em]">
                {profile.wordmark}
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="grid size-10 place-items-center rounded-full border"
              >
                <X className="size-5" strokeWidth={1.6} />
              </button>
            </div>
            <ul className="mt-16 flex flex-col">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6 }}
                  className="border-b"
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-4"
                  >
                    <span className="font-display text-4xl tracking-tight">{l.label}</span>
                    <span className="label-caps text-muted-foreground">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto space-y-3 border-t pt-6 text-sm text-muted-foreground">
              <a
                href={profile.resumePdf}
                download="Sayanth_KV_Resume.pdf"
                className="label-caps inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.625rem] text-foreground"
              >
                Download Resume (PDF)
              </a>
              <div>
                <a href={`mailto:${profile.email}`} className="block font-medium text-foreground">
                  {profile.email}
                </a>
                <p className="mt-0.5 text-xs text-muted-foreground">Based in {profile.location}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}