import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  FolderGit2,
  Github,
  Plus,
} from "lucide-react";
import { archiveProjects, profile, projects, type Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { LineReveal, Reveal, SectionLabel } from "./motion";
import { FlagshipVisual, EditorialProjectVisual } from "./ProjectVisual";

export function Projects() {
  const [showAllProjects, setShowAllProjects] = useState(false);

  return (
    <section id="projects" className="relative w-full overflow-hidden py-24 md:py-36">
      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20">
        {/* Editorial Section Header */}
        <div className="grid gap-8 border-b border-foreground/15 pb-14 md:grid-cols-12 md:pb-20">
          <Reveal className="md:col-span-3 md:pt-3">
            <SectionLabel>Selected work</SectionLabel>
          </Reveal>

          <div className="md:col-span-9">
            <LineReveal
              as="h2"
              className="font-display text-[2.2rem] font-normal leading-[1.03] tracking-[-0.03em] sm:text-5xl md:text-6xl lg:text-[4.2rem]"
              lines={[
                <>From real-world workflows</>,
                <>
                  to <span className="serif-em text-[1.1em]">reliable digital systems.</span>
                </>,
              ]}
            />
            <Reveal delay={0.15}>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Full-stack MERN applications engineered around role-based access control, atomic
                database integrity, and clean production interfaces.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Featured Projects List (Zero Empty White Space) */}
        <div className="divide-y divide-foreground/15">
          {projects.map((project, index) => (
            <BalancedProjectEntry
              key={project.id}
              project={project}
              reversed={index % 2 === 1}
            />
          ))}
        </div>

        {/* Expandable Project Archive Section */}
        <div className="border-t border-foreground/15 pt-14 md:pt-20">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="label-caps text-[0.625rem] tracking-[0.2em] text-muted-foreground">
                Archive Index ({projects.length + archiveProjects.length} Total Builds)
              </span>
              <h3 className="mt-2 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                Additional full-stack systems &amp;{" "}
                <span className="serif-em font-normal">collaborative builds.</span>
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                aria-expanded={showAllProjects}
                aria-controls="more-projects-archive"
                onClick={() => setShowAllProjects((prev) => !prev)}
                className="label-caps inline-flex items-center gap-2.5 rounded-full bg-foreground px-6 py-3 text-[0.625rem] font-medium tracking-[0.14em] text-background transition-transform duration-300 hover:-translate-y-0.5"
              >
                <Plus
                  className={cn(
                    "size-3.5 transition-transform duration-300",
                    showAllProjects && "rotate-45",
                  )}
                />
                {showAllProjects
                  ? "Collapse Archive"
                  : `View All Projects (+${archiveProjects.length})`}
              </button>

              <a
                href={`${profile.github}?tab=repositories`}
                target="_blank"
                rel="noreferrer"
                className="label-caps group inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background px-5 py-3 text-[0.625rem] font-medium tracking-[0.14em] text-foreground transition-colors duration-300 hover:bg-secondary"
              >
                <FolderGit2 className="size-3.5" />
                GitHub Repositories
                <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {showAllProjects && (
              <motion.div
                id="more-projects-archive"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <ol className="mt-10 divide-y divide-foreground/12 border-y border-foreground/12">
                  {archiveProjects.map((item) => (
                    <li
                      key={item.id}
                      className="group grid items-center gap-4 py-6 transition-colors hover:bg-secondary/40 sm:px-3 md:grid-cols-12"
                    >
                      <div className="flex items-baseline gap-4 md:col-span-4">
                        <span className="font-mono text-xs text-muted-foreground">
                          [{item.number}]
                        </span>
                        <div>
                          <h4 className="font-display text-xl font-medium tracking-tight text-foreground">
                            {item.title}
                          </h4>
                          <span className="label-caps text-[0.58rem] text-muted-foreground">
                            {item.category}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm md:col-span-5">
                        {item.summary}
                        <span className="mt-2 flex flex-wrap gap-1.5">
                          {item.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full border border-foreground/12 px-2 py-0.5 font-mono text-[0.625rem] text-foreground/75"
                            >
                              {tech}
                            </span>
                          ))}
                        </span>
                      </p>

                      <div className="flex flex-wrap items-center gap-2 md:col-span-3 md:justify-end">
                        {item.liveUrl && (
                          <a
                            href={item.liveUrl}
                            target={item.liveUrl.startsWith("http") ? "_blank" : undefined}
                            rel="noreferrer"
                            className="label-caps group/btn inline-flex items-center gap-1.5 rounded-full bg-foreground px-3.5 py-2 text-[0.6rem] text-background transition-transform duration-300 hover:-translate-y-0.5"
                          >
                            Live Demo
                            <ArrowUpRight className="size-3 transition-transform duration-300 group-hover/btn:rotate-45" />
                          </a>
                        )}
                        <a
                          href={item.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="label-caps group/btn inline-flex items-center gap-1.5 rounded-full border border-foreground/20 bg-background px-3.5 py-2 text-[0.6rem] text-foreground transition-colors hover:bg-secondary"
                        >
                          <Github className="size-3" />
                          GitHub
                          <ArrowUpRight className="size-3 transition-transform duration-300 group-hover/btn:rotate-45" />
                        </a>
                      </div>
                    </li>
                  ))}
                </ol>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

type DetailTab = "overview" | "architecture" | "portals";

function BalancedProjectEntry({
  project,
  reversed = false,
}: {
  project: Project;
  reversed?: boolean;
}) {
  const [activeTab, setActiveTab] = useState<DetailTab>("overview");

  const tabs: { id: DetailTab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "architecture", label: "Architecture" },
    ...(project.portals ? [{ id: "portals" as const, label: "Portals (3)" }] : []),
  ];

  return (
    <article aria-labelledby={`${project.id}-title`} className="py-16 md:py-24">
      {/* Full-Width Project Header Row */}
      <Reveal className="flex flex-col justify-between gap-6 pb-8 md:flex-row md:items-end md:pb-10">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-muted-foreground">[{project.number}]</span>
            <span className="label-caps rounded-full border border-foreground/15 px-3 py-0.5 text-[0.6rem] tracking-[0.16em] text-muted-foreground">
              {project.flagship ? "Flagship Build · MERN" : project.category}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3
              id={`${project.id}-title`}
              className="font-display text-4xl font-semibold tracking-[-0.035em] text-foreground sm:text-5xl md:text-6xl"
            >
              {project.title}
            </h3>
            <p className="serif-em text-2xl text-muted-foreground sm:text-3xl">
              — {project.subtitle}
            </p>
          </div>
        </div>

        {/* Action Buttons aligned right in header */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {project.links.map((l) => {
            const isPrimary = l.label.trim().toLowerCase() === "live demo";
            const isGithub = l.label.trim().toLowerCase().includes("github");

            return (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "group inline-flex items-center gap-2 rounded-full px-5 py-2.5 label-caps text-[0.625rem] transition-all duration-300 hover:-translate-y-0.5",
                  isPrimary
                    ? "bg-foreground text-background"
                    : "border border-foreground/20 bg-background text-foreground hover:bg-secondary",
                )}
              >
                {isGithub && <Github className="size-3.5" />}
                {l.label.trim()}
                <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:rotate-45" />
              </a>
            );
          })}
        </div>
      </Reveal>

      {/* Balanced 12-Column Split: Browser Preview + Interactive Details Side-by-Side */}
      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Browser Visual Column (7 cols) */}
        <Reveal
          className={cn(
            "lg:col-span-7",
            reversed ? "lg:order-2" : "lg:order-1",
          )}
        >
          {project.flagship ? (
            <FlagshipVisual project={project} />
          ) : (
            <EditorialProjectVisual project={project} />
          )}
        </Reveal>

        {/* Details, Tabs & Tech Stack Column (5 cols) */}
        <Reveal
          delay={0.1}
          className={cn(
            "flex flex-col justify-between lg:col-span-5",
            reversed ? "lg:order-1" : "lg:order-2",
          )}
        >
          {/* Tab Switcher */}
          <div className="border-b border-foreground/12">
            <div className="flex gap-6" role="tablist" aria-label={`${project.title} details`}>
              {tabs.map((tab) => {
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "relative pb-3 label-caps text-[0.65rem] tracking-[0.16em] transition-colors",
                      active
                        ? "font-semibold text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {tab.label}
                    {active && (
                      <motion.span
                        layoutId={`tab-line-${project.id}`}
                        className="absolute inset-x-0 bottom-0 h-[1.5px] bg-foreground"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Tab Content */}
          <div className="pt-5">
            {activeTab === "overview" && (
              <div className="space-y-4">
                <p className="text-sm font-medium leading-relaxed text-foreground sm:text-base">
                  {project.overview}
                </p>
                <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {project.description}
                </p>

                <div className="pt-2">
                  <span className="label-caps block text-[0.58rem] tracking-[0.18em] text-muted-foreground">
                    Key Capabilities
                  </span>
                  <ul className="mt-2.5 space-y-2 border-t border-foreground/10 pt-3">
                    {project.features.slice(0, 5).map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2 text-xs leading-relaxed text-foreground/85"
                      >
                        <span className="mt-1.5 size-1 shrink-0 rounded-full bg-foreground" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "architecture" && (
              <div className="space-y-3">
                {project.engineeringHighlights.map((highlight, idx) => {
                  const [title, ...restParts] = highlight.split(":");
                  return (
                    <div
                      key={idx}
                      className="rounded-xl border border-foreground/10 bg-secondary/40 p-3.5"
                    >
                      <p className="flex items-center gap-2 font-display text-xs font-semibold text-foreground sm:text-sm">
                        <CheckCircle2 className="size-3.5 shrink-0 text-emerald-600" />
                        {title}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {restParts.join(":") || highlight}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === "portals" && project.portals && (
              <div className="space-y-3">
                {project.portals.map((portal) => (
                  <div
                    key={portal.name}
                    className="rounded-xl border border-foreground/10 bg-secondary/40 p-3.5"
                  >
                    <h4 className="font-display text-xs font-semibold text-foreground sm:text-sm">
                      {portal.name}
                    </h4>
                    <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                      {portal.features.slice(0, 4).map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <span className="text-foreground/40">·</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tech Stack Footer inside Right Column */}
          <div className="mt-6 border-t border-foreground/10 pt-4">
            <span className="label-caps block text-[0.58rem] tracking-[0.18em] text-muted-foreground">
              Stack
            </span>
            <ul className="mt-2.5 flex flex-wrap gap-1.5" aria-label="Technologies">
              {project.technologies.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-foreground/12 bg-secondary/50 px-2.5 py-0.5 font-mono text-[0.65rem] text-foreground/85"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </article>
  );
}