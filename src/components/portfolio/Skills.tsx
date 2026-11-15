import { skillGroups } from "@/data/portfolio";
import { LineReveal, Reveal, SectionLabel } from "./motion";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-36">
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-6">
          <Reveal>
            <SectionLabel>Technical Skills</SectionLabel>
          </Reveal>
          <LineReveal
            className="mt-6 font-display text-5xl font-normal leading-[0.95] tracking-[-0.04em] md:text-7xl"
            lines={[<>Tools &</>, <span className="serif-em text-[1.12em]">technologies.</span>]}
          />
        </div>
        <Reveal className="md:col-span-5 md:col-start-8 md:self-end" delay={0.1}>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            The frontend libraries, backend frameworks, databases, and architectural concepts
            I use to take practical ideas into reliable full-stack web products.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 border-t border-border md:mt-24">
        {skillGroups.map((g, gi) => (
          <Reveal key={g.label} delay={gi * 0.04}>
            <div className="group/row grid gap-4 border-b border-border py-7 md:grid-cols-12 md:py-9">
              <div className="flex items-baseline gap-3 md:col-span-4">
                <span className="font-display text-xs text-muted-foreground transition-colors duration-300 group-hover/row:text-foreground">
                  {String(gi + 1).padStart(2, "0")}
                </span>
                <h3 className="label-caps text-foreground/90">{g.label}</h3>
              </div>

              <ul className="group/list flex flex-wrap items-baseline gap-x-3 gap-y-1 md:col-span-8">
                {g.items.map((s, i) => (
                  <li key={s} className="flex items-baseline gap-3">
                    <span className="group/item relative inline-grid cursor-default select-none items-baseline text-xl tracking-tight sm:text-2xl md:text-[2.2rem] md:leading-tight">
                      {/* 1. Layout anchor: locks exact width/height so siblings never shift */}
                      <span
                        aria-hidden
                        className="invisible col-start-1 row-start-1 font-display"
                      >
                        {s}
                      </span>

                      {/* 2. Default state: Display font */}
                      <span className="col-start-1 row-start-1 font-display text-foreground/90 transition-[opacity,transform] duration-300 ease-out group-hover/list:opacity-45 group-hover/item:!translate-y-[-2px] group-hover/item:!opacity-0">
                        {s}
                      </span>

                      {/* 3. Hover state: Serif italic cross-fading in */}
                      <span
                        aria-hidden
                        className="col-start-1 row-start-1 translate-y-[2px] whitespace-nowrap font-serif italic text-foreground opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover/item:translate-y-0 group-hover/item:opacity-100"
                      >
                        {s}
                      </span>
                    </span>

                    {i < g.items.length - 1 && (
                      <span
                        aria-hidden
                        className="font-serif text-xl italic text-border transition-opacity duration-300 group-hover/list:opacity-50 md:text-3xl"
                      >
                        /
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}