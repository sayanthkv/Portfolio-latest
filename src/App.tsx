import { useState, useEffect, useCallback } from "react";
import { Hand, Pencil, Sparkles, Tornado, X } from "lucide-react";
import { Loader } from "./components/portfolio/Loader";
import { Nav } from "./components/portfolio/Nav";
import { Hero } from "./components/portfolio/Hero";
import { About } from "./components/portfolio/About";
import { Projects } from "./components/portfolio/Projects";
import { Engineering } from "./components/portfolio/Engineering";
import { Skills } from "./components/portfolio/Skills";
import { Experience } from "./components/portfolio/Experience";
import { Philosophy } from "./components/portfolio/Philosophy";
import { Contact } from "./components/portfolio/Contact";
import { usePhysicsPlayground } from "./hooks/usePhysicsPlayground";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [playMode, setPlayMode] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [blackout, setBlackout] = useState(false);

  // Start zero-G physics once user clicks "Start Playing" inside the instruction modal
  usePhysicsPlayground(playMode && !showInstructions);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

 useEffect(() => {
    if (isLoading || playMode) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isLoading, playMode]);

  const handleTogglePlayMode = useCallback(() => {
    if (playMode) {
      setPlayMode(false);
      setShowInstructions(false);
      return;
    }

    if (window.scrollY < 40) {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      setPlayMode(true);
      setShowInstructions(true);
      return;
    }

    // Scrolled down -> fade to black, jump to top LightTunnel, fade in with instruction modal
    setBlackout(true);
    window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      setPlayMode(true);
      setShowInstructions(true);
      window.requestAnimationFrame(() => {
        setBlackout(false);
      });
    }, 420);
  }, [playMode]);

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      {/* Blackout curtain when transitioning from lower sections back to top LightTunnel */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-[70] bg-ink transition-opacity duration-400 ease-out ${
          blackout ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Play Mode Instruction Modal */}
      {playMode && showInstructions && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="playmode-modal-title"
          className="fixed inset-0 z-[65] flex items-center justify-center bg-ink/70 px-4 backdrop-blur-md"
        >
          <div className="relative w-full max-w-md rounded-3xl border border-white/15 bg-[#080808]/95 p-6 text-ink-foreground shadow-[0_24px_64px_rgba(0,0,0,0.85)] sm:p-7">
            <button
              type="button"
              aria-label="Close instructions"
              onClick={() => setShowInstructions(false)}
              className="absolute right-4 top-4 grid size-8 place-items-center rounded-full border border-white/15 text-ink-muted transition-colors hover:bg-white/10 hover:text-ink-foreground"
            >
              <X className="size-4" />
            </button>

            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[0.625rem] font-medium uppercase tracking-[0.18em] text-emerald-400">
              <Sparkles className="size-3" />
              Zero-G Playground
            </div>

            <h2
              id="playmode-modal-title"
              className="mt-4 font-display text-2xl font-semibold tracking-tight text-on-image"
            >
              Break gravity in the Light Tunnel
            </h2>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
              Welcome to the interactive sandbox. Everything on screen is about to lose gravity.
            </p>

            <ul className="mt-5 space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-on-image">
                  <Hand className="size-3.5" />
                </span>
                <div>
                  <p className="font-medium text-on-image">Grab &amp; Fling</p>
                  <p className="text-xs text-ink-muted">
                    Click or touch any floating word or button to drag and bounce it around.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-on-image">
                  <Tornado className="size-3.5" />
                </span>
                <div>
                  <p className="font-medium text-on-image">20s Idle Vortex</p>
                  <p className="text-xs text-ink-muted">
                    Leave the screen untouched for 20 seconds and a vortex will pull every element into the center.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-on-image">
                  <Pencil className="size-3.5" />
                </span>
                <div>
                  <p className="font-medium text-on-image">One-Touch Float Sketch</p>
                  <p className="text-xs text-ink-muted">
                    After the vortex clears the screen, draw in one continuous stroke—release your finger and your drawing floats away!
                  </p>
                </div>
              </li>
            </ul>

            <div className="mt-6 flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setShowInstructions(false)}
                className="label-caps flex-1 rounded-full bg-on-image py-3 text-[0.65rem] font-semibold text-ink transition-transform duration-200 hover:scale-[1.02]"
              >
                Start Playing
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowInstructions(false);
                  setPlayMode(false);
                }}
                className="label-caps rounded-full border border-white/20 px-4 py-3 text-[0.65rem] text-ink-muted transition-colors hover:bg-white/10 hover:text-on-image"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={isLoading ? "h-screen overflow-hidden" : ""}>
        <Nav playMode={playMode} onTogglePlayMode={handleTogglePlayMode} />
        <main>
          <Hero />
          <About />
          <Projects />
          <Engineering />
          <Skills />
          <Experience />
          <Philosophy />
        </main>
        <Contact />
      </div>
    </>
  );
}