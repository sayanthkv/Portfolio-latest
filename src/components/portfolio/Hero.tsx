import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { profile } from "@/data/portfolio";
import { LineReveal } from "./motion";
import LightTunnel from "./LightTunnel";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  return (
    <section id="top" ref={ref} className="relative px-3 pt-20 sm:pt-24 md:px-5 md:pt-24">
      {/* Hero container placed cleanly below the navbar */}
      <div className="relative isolate min-h-[580px] md:h-[calc(100vh-7.5rem)] md:min-h-[620px] overflow-hidden rounded-[22px] bg-ink text-on-image md:rounded-[28px]">
        {/* Interactive WebGL Light Tunnel background */}
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <LightTunnel
            cableColor="#ffffff"
            pulseColor="#ffffff"
            cableCount={56}
            pulseDensity={0.5}
            flowDirection="inward"
            mouseInteraction
            clickSurge
            tunnelColor="#ffffff"
            tunnelOpacity={0}
            speed={0.1}
            pulseSpeed={2}
            pulseLength={0.28}
            pulseBlend={0.6}
            pulseWidth={1}
            thickness={0.35}
            rimWidth={0.15}
            waviness={0.3}
            sway={0.5}
            bend={0.4}
            glow={1}
            size={1}
            fadeNear={0.5}
            fadeFar={2}
            brightness={1}
            colorVariance
            grain={false}
            mouseStrength={0.1}
            intro
            lightMode={false}
          />
        </div>

        {/* Subtle legibility gradients */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/10" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-ink/75 via-ink/30 to-transparent" />

        {/* subtle crosshair marks */}
        {["left-[18%] top-[30%]", "left-[46%] top-[34%]", "right-[22%] top-[30%]", "left-[8%] bottom-[38%]"].map(
          (pos) => (
            <Plus
              key={pos}
              aria-hidden
              strokeWidth={1}
              className={`absolute hidden size-4 text-on-image/60 md:block ${pos} pointer-events-none`}
            />
          ),
        )}

        {/* Foreground Content: text, badges, and buttons */}
        <div className="relative flex h-full flex-col justify-between p-6 sm:p-8 md:p-12 pointer-events-none">
          {/* Top row inside the container */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
            className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between pointer-events-auto"
          >
            <div>
              <p className="font-display text-3xl font-medium leading-none tracking-tight md:text-5xl">
                {profile.name}
              </p>
              <p className="label-caps mt-3 text-on-image/70">{profile.role}</p>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 label-caps text-[0.625rem] text-on-image/75">
              <li>Based in {profile.location}</li>
              <li className="hidden sm:block">Full-Stack MERN Development</li>
              <li className="flex items-center gap-2">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-on-image/70" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-on-image" />
                </span>
                Open to Opportunities
              </li>
            </ul>
          </motion.div>

          {/* Bottom row: Headline and Explore/Contact buttons */}
          <div className="grid items-end gap-8 lg:grid-cols-12 mt-12 sm:mt-0">
            <div className="lg:col-span-8 pointer-events-auto">
              <LineReveal
                as="h1"
                animateOnMount
                baseDelay={1}
                className="font-display text-[2.6rem] font-medium leading-[0.95] tracking-[-0.035em] sm:text-6xl md:text-7xl lg:text-[4.6rem] xl:text-[5.2rem]"
                lines={[
                  <>I don't just write code.</>,
                  <>
                    I build <span className="serif-em text-[1.08em]">digital experiences.</span>
                  </>,
                ]}
              />
            </div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.5 }}
              className="lg:col-span-4 lg:justify-self-end pointer-events-auto"
            >
              <div className="max-w-sm rounded-2xl border border-on-image/15 bg-ink/50 p-5 backdrop-blur-[4px]">
                <p className="text-sm leading-relaxed text-on-image/90">
                  BCA graduate & MERN Stack Developer building full-stack web applications with
                  clean interfaces, reliable backend systems, and database integrity.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <a
                    href="#projects"
                    className="group inline-flex items-center gap-2 rounded-full bg-on-image px-4 py-2.5 label-caps text-[0.625rem] text-ink transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    Explore my work
                    <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:rotate-45" />
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center rounded-full border border-on-image/30 px-4 py-2.5 label-caps text-[0.625rem] text-on-image transition-colors duration-300 hover:bg-on-image/10"
                  >
                    Get in touch
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
