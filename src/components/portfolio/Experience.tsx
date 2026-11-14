import { journey } from "@/data/portfolio";
import { LineReveal, Reveal, SectionLabel } from "./motion";

export function Experience() {
  return (
    <section id="experience" className="bg-secondary">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <Reveal>
              <SectionLabel>Background & Education</SectionLabel>
            </Reveal>
            <LineReveal
              className="mt-6 font-display text-5xl font-normal leading-[0.95] tracking-[-0.04em] md:text-7xl"
              lines={[<>Education &</>, <span className="serif-em text-[1.12em]">experience.</span>]}
            />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Academic foundation in computer applications paired with practical full-stack
                internship experience in MERN stack development.
              </p>
            </Reveal>
          </div>
        </div>

        <ol className="md:col-span-7">
          {journey.map((j, i) => (
            <Reveal
              as="li"
              key={j.title}
              delay={i * 0.1}
              className="group relative border-t border-foreground/15 pb-14 pt-8 last:pb-0"
            >
              <span className="absolute -top-px left-0 h-px w-0 bg-foreground transition-all duration-700 group-hover:w-full" />
              <div className="flex items-center justify-between">
                <span className="label-caps text-xs text-muted-foreground font-semibold">{j.kind}</span>
                <span className="font-display text-sm text-muted-foreground">
                  ({String(i + 1).padStart(2, "0")})
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-medium leading-tight tracking-tight sm:text-3xl md:text-4xl">
                {j.title}
              </h3>
              <p className="serif-em mt-2 text-xl text-foreground/80 sm:text-2xl">
                {j.place}
                {j.location && <>, {j.location}</>}
              </p>
              {j.description && (
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {j.description}
                </p>
              )}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
