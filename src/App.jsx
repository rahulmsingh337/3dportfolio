import { useState } from "react";
import Cursor from "./components/Cursor";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Awards from "./components/Awards";
import Contact from "./components/Contact";
import "./index.css";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Cursor />
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      {!loading && (
        <>
          <Navbar />
          <Hero />
          <Marquee />
          <Skills />
          <Experience />
          <Projects />
          <Awards />
          <Contact />
        </>
      )}
    </>
  );
}
