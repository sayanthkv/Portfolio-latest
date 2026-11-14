import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Project } from "@/data/portfolio";

export function BrowserFrame({
  children,
  label,
  url,
}: {
  children: React.ReactNode;
  label: string;
  url?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-foreground/12 bg-card shadow-[0_24px_60px_-20px_rgba(0,0,0,0.14)]">
      <div className="flex items-center justify-between border-b border-foreground/8 bg-secondary/80 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-foreground/25" />
          <span className="size-2 rounded-full bg-foreground/25" />
          <span className="size-2 rounded-full bg-foreground/25" />
        </div>
        <div className="flex items-center gap-2 rounded-full border border-foreground/10 bg-background px-3.5 py-0.5 font-mono text-[0.625rem] text-muted-foreground">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          <span className="max-w-[260px] truncate">{url || label}</span>
        </div>
        <div className="w-8" />
      </div>
      <div className="bg-background">{children}</div>
    </div>
  );
}

/** Flagship visual: clean full-width browser frame + floating mobile ticket device */
export function FlagshipVisual({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const phoneY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [24, -18]);

  return (
    <div
      ref={ref}
      className={project.mobileImage ? "group relative w-full pb-8 sm:pb-12" : "group w-full"}
    >
      <BrowserFrame
        label={`${project.title} — ${project.type}`}
        url="parkora-kannur.vercel.app"
      >
        <img
          src={project.image}
          alt={`${project.title} desktop interface`}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full grayscale-[20%] transition-all duration-700 ease-out group-hover:scale-[1.008] group-hover:grayscale-0"
        />
      </BrowserFrame>

      {project.mobileImage && (
        <motion.div
          style={{ y: phoneY }}
          className="pointer-events-none absolute -bottom-2 right-3 w-[33%] max-w-[195px] sm:right-6 sm:w-[24%] md:right-8"
        >
          <div className="overflow-hidden rounded-[24px] border-[4px] border-ink bg-ink shadow-[0_24px_50px_-12px_rgba(0,0,0,0.4)] ring-1 ring-white/15">
            <div className="flex items-center justify-center bg-ink py-1.5">
              <span className="h-1 w-9 rounded-full bg-white/20" />
            </div>
            <div className="overflow-hidden rounded-b-[19px] bg-white">
              <img
                src={project.mobileImage}
                alt={`${project.title} mobile interface`}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

/** Editorial browser visual for secondary projects */
export function EditorialProjectVisual({ project }: { project: Project }) {
  const urlMap: Record<string, string> = {
    hirezone: "hire-zone-eight.vercel.app",
    fragranzia: "fragranzia.vercel.app",
  };

  return (
    <div className="group w-full">
      <div className="transition-transform duration-700 ease-out group-hover:-translate-y-1">
        <BrowserFrame
          label={`${project.title} — ${project.type}`}
          url={urlMap[project.id] ?? `${project.id}.vercel.app`}
        >
          <img
            src={project.image}
            alt={`${project.title} application preview`}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full grayscale-[20%] transition-all duration-700 ease-out group-hover:grayscale-0"
          />
        </BrowserFrame>
      </div>
      <div className="mt-3 flex items-center justify-between px-1">
        <span className="label-caps text-[0.6rem] tracking-[0.16em] text-muted-foreground">
          Fig. {project.number} — {project.type}
        </span>
        <span className="font-mono text-[0.625rem] text-muted-foreground">
          {urlMap[project.id]}
        </span>
      </div>
    </div>
  );
}