import { philosophyQuote } from "@/data/portfolio";
import { Reveal, SectionLabel } from "./motion";

export function Philosophy() {
  return (
    <section
      id="philosophy"
      aria-label="Philosophy"
      className="relative overflow-hidden py-24 md:py-36 border-t border-border/60 bg-background"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        {/* Section label placed in the middle */}
        <div className="flex justify-center mb-8">
          <Reveal>
            <SectionLabel>Core Philosophy</SectionLabel>
          </Reveal>
        </div>

        {/* Headline placed directly in the middle */}
        <Reveal delay={0.1}>
          <h2 className="mx-auto max-w-5xl text-center font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-normal leading-[1.08] tracking-[-0.035em] text-foreground">
            Understand the problem —
            <br />
            <span className="serif-em text-[1.08em] text-muted-foreground">
              build something reliable.
            </span>
          </h2>
        </Reveal>

        {/* Centered quote */}
        <Reveal delay={0.2} className="mx-auto mt-10 sm:mt-12 max-w-2xl text-center">
          <p className="font-display text-lg sm:text-xl md:text-2xl font-normal leading-relaxed text-foreground/85">
            “{philosophyQuote.quote}”
          </p>
        </Reveal>

        {/* Centered engineering focus pills */}
        <Reveal delay={0.3} className="mx-auto mt-12 sm:mt-14 max-w-3xl text-center">
          <p className="label-caps text-center text-muted-foreground text-[0.625rem] tracking-widest mb-5">
            What Drives My Engineering Focus
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {philosophyQuote.interests.map((interest) => (
              <div
                key={interest}
                className="flex items-center gap-2 rounded-full border border-border/80 bg-card/60 px-4 py-2 text-xs sm:text-[0.8125rem] text-foreground/90 font-medium shadow-xs transition-colors hover:border-foreground/30"
              >
                <span className="size-1.5 rounded-full bg-foreground shrink-0" />
                <span>{interest}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
