import { ArrowUpRight } from "lucide-react";
import profilePhoto from "@/assets/sayanth-portrait.jpg"; // Place your photo in src/assets/
import { profile, stackMarquee, aboutContent } from "@/data/portfolio";
import { ImageReveal, LineReveal, Reveal, SectionLabel } from "./motion";

const quickFacts = [
  {
    label: "Current Role",
    value: "MERN Stack Developer Intern",
    detail: "Softroniics, Kozhikode",
  },
  {
    label: "Education",
    value: "Bachelor of Computer Applications",
    detail: "Yenepoya University, Bengaluru (2026)",
  },
  {
    label: "Primary Stack",
    value: "MongoDB, Express, React, Node.js",
    detail: "TypeScript, Tailwind CSS & REST APIs",
  },
  {
    label: "Engineering Focus",
    value: "Full-Stack & App Security",
    detail: "JWT Auth, Transactions & Clean UI",
  },
];

export function About() {
  return (
    <section id="about" className="w-full px-6 pb-20 pt-24 sm:px-10 md:px-14 md:pb-28 md:pt-36 lg:px-20">
      <div className="grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-3 lg:pt-4">
          <SectionLabel>About me</SectionLabel>
        </Reveal>
        <LineReveal
          className="font-display text-[2rem] font-normal leading-[1.08] tracking-[-0.03em] sm:text-5xl lg:col-span-9 lg:text-right lg:text-[3.6rem]"
          lines={[
            <>“I don&apos;t just build applications.</>,
            <>
              I build <span className="serif-em text-[1.12em]">systems</span> that solve
            </>,
            <>
              <span className="serif-em text-[1.12em]">real problems.</span>”
            </>,
          ]}
        />
      </div>

      <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-12 md:gap-12">
        {/* Left Column: Your Portrait Photo */}
        <div className="md:col-span-6 lg:col-span-5">
          <ImageReveal className="rounded-2xl bg-secondary">
            <img
              src={profilePhoto}
              alt="Sayanth KV — MERN Stack Developer"
              width={1024}
              height={1280}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover object-top grayscale transition-transform duration-[1.6s] ease-out hover:scale-[1.03]"
            />
          </ImageReveal>
          <p className="label-caps mt-3 text-muted-foreground">Fig. 01 — {profile.name}</p>
        </div>

        {/* Right Column: Bio + Structured Quick Facts Grid + Links */}
        <Reveal className="flex flex-col justify-between md:col-span-6 lg:col-span-6 lg:col-start-7" delay={0.15}>
          <div className="space-y-4 text-[0.95rem] leading-relaxed text-muted-foreground md:text-base">
            <p className="font-medium text-foreground">
              {aboutContent.foundation[0]}
            </p>
            <p>
              {aboutContent.foundation[1]}
            </p>
            <p>
              {aboutContent.foundation[2]}
            </p>
            <p>
              {aboutContent.foundation[3]}
            </p>
            <p>
              {aboutContent.foundation[4]}
            </p>
          </div>

          {/* Structured 2x2 Snapshot Grid filling the lower space */}
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-6 border-t border-foreground/10 pt-8 sm:grid-cols-2">
            {quickFacts.map((fact) => (
              <div key={fact.label}>
                <span className="label-caps block text-[0.6rem] tracking-[0.18em] text-muted-foreground">
                  {fact.label}
                </span>
                <p className="mt-1.5 font-display text-base font-medium text-foreground">
                  {fact.value}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {fact.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t pt-6">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1.5 font-display text-lg"
            >
              GitHub
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1.5 font-display text-lg"
            >
              LinkedIn
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a href="#contact" className="font-display text-lg text-muted-foreground hover:text-foreground">
              Let&apos;s chat
            </a>
          </div>
        </Reveal>
      </div>

      {/* stack marquee */}
      <div className="relative mt-20 overflow-hidden border-y py-5 md:mt-28" aria-label="Technologies I work with">
        <div className="marquee-track flex w-max gap-12">
          {[...stackMarquee, ...stackMarquee].map((t, i) => (
            <span
              key={i}
              aria-hidden={i >= stackMarquee.length}
              className="flex items-center gap-12 font-display text-lg tracking-tight text-muted-foreground"
            >
              {t}
              <span className="text-border">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}