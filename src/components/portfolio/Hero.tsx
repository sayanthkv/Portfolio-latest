"use client";

import { useRef } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/portfolio";
import { LineReveal } from "./motion";
import LightTunnel from "./LightTunnel";

const ease = [0.22, 1, 0.36, 1] as const;

const identityVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease },
  },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex min-h-screen w-full flex-col overflow-hidden bg-ink text-on-image"
    >
      {/* Interactive WebGL Light Tunnel background (Full Screen) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
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

      {/* Legibility Gradients */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/35" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />

      {/* Foreground Content */}
      <div className="pointer-events-none relative z-20 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-between px-6 pb-8 pt-28 sm:px-10 sm:pb-12 md:px-14 md:pt-32">
        {/* Top Metadata Row */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.15 }}
          className="pointer-events-auto flex flex-wrap items-center justify-between gap-4 text-on-image/70"
        >
          <span className="label-caps text-[0.625rem] tracking-[0.16em]">
            Based in {profile.location}
          </span>
          <span className="label-caps text-[0.625rem] tracking-[0.16em]">
            Full-Stack MERN Development
          </span>
        </motion.div>

        {/* Centered Bold Name & Role */}
        <motion.div
          variants={identityVariants}
          initial={reduce ? "visible" : "hidden"}
          animate="visible"
          className="pointer-events-auto mx-auto my-auto flex flex-col items-center py-8 text-center"
        >
          <motion.h2
            variants={fadeUpVariants}
            className="font-display text-5xl font-bold tracking-[-0.035em] text-on-image sm:text-7xl md:text-[5.25rem] md:leading-none"
          >
            {profile.name}
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="label-caps mt-4 text-xs tracking-[0.22em] text-on-image/75 sm:text-[0.75rem]"
          >
            {profile.role}
          </motion.p>
        </motion.div>

        {/* Bottom Row: Statement Headline + Bio/CTA Card */}
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="pointer-events-auto lg:col-span-8">
            <LineReveal
              as="h1"
              animateOnMount
              baseDelay={0.35}
              className="font-display text-[2.5rem] font-medium leading-[0.95] tracking-[-0.035em] sm:text-6xl md:text-7xl lg:text-[4.6rem] xl:text-[5.2rem]"
              lines={[
                <>I don&apos;t just write code.</>,
                <>
                  I build <span className="serif-em text-[1.08em]">digital experiences.</span>
                </>,
              ]}
            />
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.5 }}
            className="pointer-events-auto lg:col-span-4 lg:justify-self-end"
          >
            <div className="max-w-sm rounded-2xl border border-on-image/15 bg-ink/50 p-5 backdrop-blur-[6px]">
              <p className="text-sm leading-relaxed text-on-image/90">
                BCA graduate &amp; MERN Stack Developer building full-stack web applications with
                clean interfaces, reliable backend systems, and database integrity.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <a
                  href="#projects"
                  className="label-caps group inline-flex items-center gap-2 rounded-full bg-on-image px-4 py-2.5 text-[0.625rem] text-ink transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Explore my work
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:rotate-45" />
                </a>
                <a
                  href="#contact"
                  className="label-caps inline-flex items-center rounded-full border border-on-image/30 px-4 py-2.5 text-[0.625rem] text-on-image transition-colors duration-300 hover:bg-on-image/10"
                >
                  Get in touch
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}