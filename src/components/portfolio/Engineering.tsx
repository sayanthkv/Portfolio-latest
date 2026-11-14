"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import engineeringImage from "@/assets/engineering-system.jpg";
import { architecturePractices } from "@/data/portfolio";
import { ImageReveal, LineReveal, Reveal } from "./motion";

export function Engineering() {
  const sectionRef = useRef<HTMLElement>(null);

  // Track scroll progress across the right-hand list to drive a subtle progress bar
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="engineering-title"
      className="relative w-full bg-ink text-ink-foreground"
    >
      <div className="w-full px-6 py-24 sm:px-10 md:px-14 md:py-36 lg:px-20">
        {/* Section Heading */}
        <div className="grid gap-8 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <p className="label-caps flex items-center gap-2 text-ink-muted">
              <span className="inline-block size-2 rounded-full border border-current" aria-hidden />
              System Architecture
            </p>
          </Reveal>
          <LineReveal
            as="h2"
            className="font-display text-[2.3rem] font-normal leading-[1.02] tracking-[-0.03em] sm:text-5xl md:col-span-9 md:text-6xl lg:text-7xl"
            lines={[
              <span id="engineering-title" key="title-1">Behind every interface,</span>,
              <span className="serif-em text-[1.1em] text-ink-muted" key="title-2">there is a system.</span>,
            ]}
          />
        </div>

        {/* Sticky Split Layout: Left stays pinned until all 6 points scroll through */}
        <div className="mt-16 grid items-start gap-12 md:mt-24 md:grid-cols-12 md:gap-10">
          {/* Pinned Left Column */}
          <div className="md:sticky md:top-28 md:col-span-5 lg:col-span-4">
            <ImageReveal className="rounded-2xl bg-ink-raised">
              <img
                src={engineeringImage}
                alt="System blueprint and architectural structure"
                width={1024}
                height={1280}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] max-h-[54vh] w-full object-cover transition-transform duration-[1.6s] ease-out hover:scale-[1.04]"
              />
            </ImageReveal>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-muted">
              Engineering beyond basic UI: addressing data integrity, concurrency limits,
              security boundaries, and real-world system resilience.
            </p>

            <div className="mt-6 flex items-center justify-between gap-4">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 text-sm text-ink-foreground hover:underline"
              >
                See architectural case studies
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
              </a>

              {/* Live Scroll Progress Indicator */}
              <div className="hidden items-center gap-2.5 md:flex">
                <span className="font-mono text-[0.65rem] text-ink-muted">01 — 06</span>
                <div className="relative h-8 w-[2px] overflow-hidden rounded-full bg-ink-border">
                  <motion.div
                    style={{ scaleY, transformOrigin: "top" }}
                    className="h-full w-full bg-ink-foreground"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Scrolling Right Column (All 6 Architectural Practices) */}
          <ol className="space-y-6 md:col-span-7 md:pb-12 lg:col-span-7 lg:col-start-6">
            {architecturePractices.map((practice, i) => (
              <Reveal
                as="li"
                key={practice.title}
                delay={i * 0.04}
                className="group relative border-b border-ink-border/80 pb-10 pt-6 transition-colors last:border-b-0 last:pb-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-ink-muted">
                    [{practice.number}]
                  </span>
                  <span className="label-caps text-[0.625rem] tracking-wider text-ink-muted">
                    {practice.domain}
                  </span>
                </div>

                <h3 className="mt-3 font-display text-xl font-medium tracking-tight text-ink-foreground transition-all duration-300 group-hover:translate-x-1 sm:text-2xl md:text-3xl">
                  {practice.title}
                </h3>

                <p className="mt-3 text-xs leading-relaxed text-ink-muted sm:text-sm md:text-base">
                  {practice.summary}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {practice.highlights.map((h) => (
                    <span
                      key={h}
                      className="rounded-full border border-ink-border/60 bg-ink-raised/50 px-3 py-1 font-mono text-[0.65rem] text-ink-muted"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-ink-foreground transition-transform duration-500 group-hover:scale-x-100" />
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}