import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";
import { profile } from "@/data/portfolio";

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [status, setStatus] = useState<"Loading" | "Ready">("Loading");

  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const progress = useMotionValue(0);

  useEffect(() => {
    let holdTimer: ReturnType<typeof setTimeout>;
    let lastValue = -1;

    // Single synchronized clock driving both digits and progress bar at native 60/120Hz
    const controls = animate(progress, 100, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1], // Ultra-silky expo/quintic deceleration
      onUpdate: (latest) => {
        const rounded = Math.round(latest);
        if (rounded !== lastValue && countRef.current) {
          countRef.current.textContent = String(rounded).padStart(2, "0");
          lastValue = rounded;
        }
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${latest / 100})`;
        }
      },
      onComplete: () => {
        setStatus("Ready");
        holdTimer = setTimeout(() => {
          setIsExiting(true);
        }, 180);
      },
    });

    return () => {
      controls.stop();
      clearTimeout(holdTimer);
    };
  }, [progress]);

  return (
    <AnimatePresence onExitComplete={() => onCompleteRef.current()}>
      {!isExiting && (
        <motion.div
          key="seamless-dark-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.65,
              delay: 0.15, // Let the counter fade out first, then melt the black veil
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          className="fixed inset-0 z-[999] flex flex-col justify-between bg-ink px-6 py-6 text-ink-foreground select-none pointer-events-none md:px-12 md:py-8"
        >
          {/* Minimal top bar */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-between text-xs text-ink-muted"
          >
            <span className="font-display font-semibold uppercase tracking-[0.16em] text-ink-foreground">
              {profile.wordmark}
            </span>
            <span className="label-caps text-[0.625rem]">MERN Stack Developer</span>
          </motion.div>

          {/* Centered minimal counter */}
          <motion.div
            exit={{
              opacity: 0,
              scale: 0.96,
              filter: "blur(6px)",
              transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
            }}
            className="mx-auto flex flex-col items-center justify-center text-center will-change-transform"
          >
            <div className="flex items-baseline gap-1">
              <span
                ref={countRef}
                className="font-display text-7xl font-light tracking-tighter tabular-nums text-ink-foreground sm:text-8xl md:text-9xl"
              >
                00
              </span>
              <span className="serif-em text-3xl font-normal text-ink-muted sm:text-4xl">
                %
              </span>
            </div>

            {/* Frame-locked GPU progress line */}
            <div className="mt-6 h-[1.5px] w-36 overflow-hidden rounded-full bg-ink-border sm:w-48">
              <div
                ref={barRef}
                style={{ transform: "scaleX(0)" }}
                className="h-full w-full origin-left bg-ink-foreground will-change-transform"
              />
            </div>

            <p className="mt-4 label-caps text-[0.55rem] tracking-[0.25em] text-ink-muted transition-opacity duration-300">
              {status}
            </p>
          </motion.div>

          {/* Minimal bottom bar */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-between label-caps text-[0.625rem] text-ink-muted"
          >
            <span>Portfolio 2026</span>
            <span>Kannur, Kerala</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}