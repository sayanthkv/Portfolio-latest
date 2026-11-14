import { ArrowUpRight, Cpu } from "lucide-react";
import engineeringImage from "@/assets/engineering-system.jpg";
import { architecturePractices } from "@/data/portfolio";
import { ImageReveal, LineReveal, Reveal } from "./motion";

export function Engineering() {
  return (
    <section aria-labelledby="engineering-title" className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-36">
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
              <span id="engineering-title">Behind every interface,</span>,
              <span className="serif-em text-[1.1em] text-ink-muted">there is a system.</span>,
            ]}
          />
        </div>

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5 lg:col-span-4">
            <ImageReveal className="rounded-2xl bg-ink-raised">
              <img
                src={engineeringImage}
                alt="System blueprint and architectural structure"
                width={1024}
                height={1280}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover transition-transform duration-[1.6s] ease-out hover:scale-[1.04]"
              />
            </ImageReveal>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-muted">
              Engineering beyond basic UI: addressing data integrity, concurrency limits, 
              security boundaries, and real-world system resilience.
            </p>
            <a
              href="#projects"
              className="group mt-6 inline-flex items-center gap-2 text-sm text-ink-foreground hover:underline"
            >
              See architectural case studies
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
            </a>
          </div>

          {/* Architectural Practices & Methodologies (differentiated from tech skills) */}
          <ol className="md:col-span-7 md:col-start-6 lg:col-span-7 lg:col-start-6 space-y-2">
            {architecturePractices.map((practice, i) => (
              <Reveal
                as="li"
                key={practice.title}
                delay={i * 0.05}
                className="group relative border-b border-ink-border/80 pb-6 pt-5 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-ink-muted">
                    [{practice.number}]
                  </span>
                  <span className="label-caps text-[0.625rem] text-ink-muted tracking-wider">
                    {practice.domain}
                  </span>
                </div>

                <h3 className="mt-2.5 font-display text-xl sm:text-2xl font-medium tracking-tight text-ink-foreground transition-all duration-300 group-hover:translate-x-1">
                  {practice.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-muted">
                  {practice.summary}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {practice.highlights.map((h) => (
                    <span
                      key={h}
                      className="rounded-full border border-ink-border/60 bg-ink-raised/50 px-2.5 py-0.5 font-mono text-[0.65rem] text-ink-muted"
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
