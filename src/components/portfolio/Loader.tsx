import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/data/portfolio";

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Smooth progress counter from 0 to 100% over ~1.3s
    const duration = 1300;
    const startTime = performance.now();

    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);

      // Smooth ease-out curve
      const eased = Math.floor((1 - Math.pow(1 - rawProgress, 2.5)) * 100);
      const current = Math.min(100, Math.max(0, eased));
      setProgress(current);

      if (rawProgress < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onComplete();
          }, 500);
        }, 200);
      }
    };

    const animId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="simple-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[999] flex flex-col justify-between bg-ink px-6 py-6 text-ink-foreground select-none md:px-12 md:py-8"
        >
          {/* Minimal top bar */}
          <div className="flex items-center justify-between text-xs text-ink-muted">
            <span className="font-display tracking-[0.16em] uppercase text-ink-foreground font-semibold">
              {profile.wordmark}
            </span>
            <span className="label-caps text-[0.625rem]">MERN Stack Developer</span>
          </div>

          {/* Simple, centered minimal counter */}
          <div className="mx-auto flex flex-col items-center justify-center text-center">
            <div className="flex items-baseline gap-1">
              <span className="font-display text-7xl sm:text-8xl md:text-9xl font-light tracking-tighter tabular-nums text-ink-foreground">
                {String(progress).padStart(2, "0")}
              </span>
              <span className="serif-em text-3xl sm:text-4xl text-ink-muted font-normal">
                %
              </span>
            </div>

            {/* Minimal ultra-thin progress line */}
            <div className="mt-6 h-[1.5px] w-36 sm:w-48 overflow-hidden rounded-full bg-ink-border">
              <div
                className="h-full bg-ink-foreground transition-all duration-75 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mt-4 label-caps text-[0.55rem] text-ink-muted tracking-[0.25em]">
              {progress < 100 ? "Loading" : "Ready"}
            </p>
          </div>

          {/* Minimal bottom bar */}
          <div className="flex items-center justify-between text-[0.625rem] text-ink-muted label-caps">
            <span>Portfolio 2026</span>
            <span>Kannur, Kerala</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
