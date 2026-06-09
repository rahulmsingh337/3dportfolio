import { useState } from "react";
import Cursor           from "./components/Cursor";
import LoadingScreen    from "./components/LoadingScreen";
import AnimatedBackground from "./components/AnimatedBackground";
import Navbar           from "./components/Navbar";
import Hero             from "./components/Hero";
import ImpactStrip      from "./components/ImpactStrip";
import Skills           from "./components/Skills";
import Experience       from "./components/Experience";
import Projects         from "./components/Projects";
import SelectedWorks    from "./components/SelectedWorks";
import Journal          from "./components/Journal";
import Awards           from "./components/Awards";
import Contact          from "./components/Contact";
import "./index.css";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Cursor/>
      {loading
        ? <LoadingScreen onComplete={() => setLoading(false)}/>
        : (
          <>
            <AnimatedBackground/>
            <Navbar/>
            <Hero/>
            <ImpactStrip/>
            <Skills/>
            <Experience/>
            <Projects/>
            <SelectedWorks/>
            <Journal/>
            <Awards/>
            <Contact/>
          </>
        )
      }
    </>
  );
}
