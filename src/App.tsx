import { useState, useEffect } from "react";
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

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Keep scroll pinned to the top on load/refresh so the dark hero is always under the loader
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      <div className={isLoading ? "h-screen overflow-hidden" : ""}>
        <Nav />
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
