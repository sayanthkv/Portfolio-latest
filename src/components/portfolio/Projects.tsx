import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, ChevronDown, Layers, Server, ShieldAlert } from "lucide-react";
import { projects, type Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { LineReveal, Reveal, SectionLabel } from "./motion";
import { FlagshipVisual, EditorialProjectVisual } from "./ProjectVisual";

export function Projects() {
  const flagship = projects[0]!;
  const rest = projects.slice(1);

  return (
    <section id="projects" className="relative overflow-hidden pb-24 pt-10 md:pb-36">
      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <SectionLabel>Selected work</SectionLabel>
          </Reveal>
          <LineReveal
            className="mt-6 font-display text-[2.1rem] font-normal leading-[1.02] tracking-[-0.03em] sm:text-5xl md:text-6xl"
            lines={[
              <>From real-world workflows</>,
              <>
                — <span className="serif-em text-[1.12em]">to reliable digital systems.</span>
              </>,
            ]}
          />
          <Reveal delay={0.15}>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Full-stack MERN applications built with practical architectures, authentication,
              database integrity, and distinct user portals.
            </p>
          </Reveal>
        </div>

        {/* Flagship Project 01: Parkora */}
        <div className="mt-16 md:mt-24">
          <ProjectFeature project={flagship} variant="flagship" />
        </div>

        {/* Project 02: HireZone & Project 03: Fragranzia */}
        <div className="mt-24 space-y-28 md:mt-36 md:space-y-36">
          {rest.map((p, i) => (
            <ProjectFeature key={p.id} project={p} variant={i % 2 === 0 ? "left" : "right"} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectFeature({
  project,
  variant,
}: {
  project: Project;
  variant: "flagship" | "left" | "right";
}) {
  if (variant === "flagship") {
    return (
      <article aria-labelledby={`${project.id}-title`} className="rounded-[24px] border border-border/80 bg-card/40 p-4 sm:p-8 md:p-12">
        <div className="grid items-end gap-6 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <div className="flex items-center gap-3">
              <span className="font-display text-sm font-medium text-muted-foreground">({project.number})</span>
              <span className="label-caps rounded-full border border-foreground/20 bg-foreground/5 px-3 py-1 text-[0.625rem] text-foreground">
                Flagship Project · MERN
              </span>
            </div>
            <h3
              id={`${project.id}-title`}
              className="mt-4 font-display text-[14vw] sm:text-7xl md:text-8xl font-semibold uppercase leading-[0.85] tracking-[-0.04em]"
            >
              {project.title}
            </h3>
          </Reveal>
          <Reveal className="md:col-span-5 md:pb-2" delay={0.1}>
            <p className="serif-em text-2xl leading-snug text-muted-foreground sm:text-3xl md:text-4xl">
              {project.subtitle}
            </p>
          </Reveal>
        </div>

        {/* Optimized flagship project visual */}
        <Reveal className="mt-8 md:mt-12">
          <FlagshipVisual project={project} />
        </Reveal>

        {/* Content & Details */}
        <div className="mt-8 grid gap-8 md:grid-cols-12 md:gap-12">
          <Reveal className="md:col-span-6 space-y-5">
            <p className="text-base leading-relaxed text-foreground md:text-lg">
              {project.overview}
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>
            
            <TechList items={project.technologies} className="pt-2" />
            
            <ProjectActionLinks project={project} className="pt-4" />
          </Reveal>

          <Reveal className="md:col-span-6 md:col-start-7" delay={0.1}>
            <p className="label-caps text-muted-foreground">Key Portals & Capabilities</p>
            {project.portals ? (
              <div className="mt-4 space-y-4">
                {project.portals.map((portal) => (
                  <div key={portal.name} className="rounded-xl border border-border/80 bg-background/60 p-4">
                    <h4 className="font-display text-sm font-semibold tracking-tight text-foreground flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-foreground" />
                      {portal.name}
                    </h4>
                    <ul className="mt-2.5 space-y-1.5 text-xs text-muted-foreground">
                      {portal.features.slice(0, 3).map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <span className="text-foreground/40 shrink-0">·</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <ol className="mt-4 divide-y border-y">
                {project.features.map((f, i) => (
                  <li key={f} className="group flex items-baseline gap-4 py-3">
                    <span className="w-8 shrink-0 font-display text-[0.65rem] text-muted-foreground">
                      [{String(i + 1).padStart(2, "0")}]
                    </span>
                    <span className="font-display text-sm tracking-tight text-foreground/90 md:text-base">
                      {f}
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </Reveal>
        </div>

        {/* Case Study Deep Dive Accordion */}
        <CaseStudySection project={project} />
      </article>
    );
  }

  const imageFirst = variant === "left";
  return (
    <article aria-labelledby={`${project.id}-title`} className="grid items-center gap-10 md:grid-cols-12 md:gap-10">
      <Reveal
        className={cn(
          "md:col-span-6",
          imageFirst ? "md:order-1" : "md:order-2 md:col-start-7",
        )}
      >
        <EditorialProjectVisual project={project} />
      </Reveal>

      <Reveal
        delay={0.1}
        className={cn(
          "relative md:col-span-6",
          imageFirst ? "md:order-2 md:pl-4" : "md:order-1 md:col-start-1 md:pr-4",
        )}
      >
        <div className="flex items-center gap-2.5">
          <span className="font-display text-sm text-muted-foreground">({project.number})</span>
          <span className="label-caps rounded-full border border-border px-2.5 py-0.5 text-[0.6rem] text-muted-foreground">
            {project.category}
          </span>
        </div>
        <h3
          id={`${project.id}-title`}
          className="mt-3 font-display text-4xl font-semibold uppercase leading-[0.9] tracking-[-0.04em] sm:text-5xl md:text-6xl"
        >
          {project.title}
        </h3>
        <p className="serif-em mt-2 text-2xl text-muted-foreground sm:text-3xl">{project.subtitle}</p>
        
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {project.overview}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground/90">
          {project.description}
        </p>

        <TechList items={project.technologies} className="mt-5" />

        <ProjectActionLinks project={project} className="mt-6" />

        {/* Expandable Case Study for secondary projects */}
        <CaseStudySection project={project} compact />
      </Reveal>
    </article>
  );
}

function TechList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="Technologies">
      {items.map((t) => (
        <li
          key={t}
          className="rounded-full border border-border bg-background/80 px-2.5 py-1 text-[0.7rem] text-foreground/80 font-medium font-mono"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

function ProjectActionLinks({ project, className }: { project: Project; className?: string }) {
  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-2">
        {project.links.map((l, i) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "group inline-flex items-center gap-2 rounded-full px-4 py-2 label-caps text-[0.625rem] transition-all duration-300 hover:-translate-y-0.5",
              i === 0 && project.flagship
                ? "bg-foreground text-background"
                : "border border-border bg-background hover:bg-secondary text-foreground",
            )}
          >
            {l.label}
            <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:rotate-45" />
          </a>
        ))}
      </div>
      {project.deploymentNote && (
        <p className="mt-3 text-[0.7rem] text-muted-foreground italic">
          {project.deploymentNote}
        </p>
      )}
    </div>
  );
}

function CaseStudySection({ project, compact = false }: { project: Project; compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const panelId = `${project.id}-case-panel`;

  return (
    <div className={compact ? "mt-5 border-t border-border/60 pt-4" : "mt-10 border-t border-border pt-6"}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className="group flex w-full items-center justify-between py-2 text-left transition-colors"
      >
        <span className="label-caps text-[0.6875rem] text-foreground font-semibold flex items-center gap-2">
          <Layers className="size-3.5 text-muted-foreground" />
          Engineering Case Study & Architecture
        </span>
        <span className="flex items-center gap-1.5 label-caps text-[0.625rem] text-muted-foreground group-hover:text-foreground">
          {open ? "Hide Analysis" : "Read Breakdown"}
          <ChevronDown className={cn("size-3.5 transition-transform duration-300", open && "rotate-180")} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-4 pb-2 space-y-4 text-sm">
              <div className="rounded-xl border border-border/80 bg-background/80 p-4 space-y-3">
                <p className="label-caps text-[0.6rem] text-muted-foreground">
                  Core Engineering Solutions & Problem Solving
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {project.engineeringHighlights.map((highlight, idx) => (
                    <div key={idx} className="space-y-1">
                      <p className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                        <CheckCircle2 className="size-3 text-emerald-600 shrink-0" />
                        {highlight.split(":")[0]}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed pl-4.5">
                        {highlight.split(":")[1] || highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {project.portals && (
                <div className="rounded-xl border border-border/80 bg-muted/30 p-4 space-y-2">
                  <p className="label-caps text-[0.6rem] text-muted-foreground">
                    Role-Based Separation of Concerns
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Designed to prevent workflow bottlenecks by isolating customer reservations from gate staff verification pipelines and high-level administrative occupancy reporting.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
