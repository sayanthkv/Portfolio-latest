import { useState } from "react";
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

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      <div className={isLoading ? "opacity-0 h-screen overflow-hidden" : "opacity-100 transition-opacity duration-700"}>
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
