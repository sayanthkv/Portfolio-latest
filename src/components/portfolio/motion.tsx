import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/** Fades and lifts content into view once. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li";
}) {
  const reduce = useReducedMotion();
  const Comp = as === "li" ? motion.li : motion.div;
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </Comp>
  );
}

const lineVariants: Variants = {
  hidden: { y: "110%" },
  show: (i: number) => ({ y: "0%", transition: { duration: 1, ease, delay: i * 0.09 } }),
};

/** Reveals each line of a headline from behind a mask. */
export function LineReveal({
  lines,
  className,
  lineClassName,
  as = "h2",
  animateOnMount = false,
  baseDelay = 0,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  as?: "h1" | "h2" | "h3" | "p";
  animateOnMount?: boolean;
  baseDelay?: number;
}) {
  const reduce = useReducedMotion();
  const Tag = motionTags[as];
  // The trigger lives on the (unclipped) heading; masked lines inherit the variant.
  const trigger = animateOnMount
    ? { animate: "show" }
    : { whileInView: "show", viewport: { once: true, margin: "-60px" } };
  return (
    <Tag className={className} initial={reduce ? false : "hidden"} {...trigger}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span className={cn("block", lineClassName)} variants={lineVariants} custom={i + baseDelay}>
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

const motionTags = { h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p };

/** Image that unveils with a clip-path wipe and slight zoom-out. */
export function ImageReveal({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial={reduce ? false : { clipPath: "inset(18% 0% 18% 0%)", opacity: 0.4 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.2, ease }}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("label-caps flex items-center gap-2 text-muted-foreground", className)}>
      <span className="inline-block size-2 rounded-full border border-current" aria-hidden />
      {children}
    </p>
  );
}
