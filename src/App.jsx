import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import LoadingScreen from "./components/LoadingScreen";
import "./index.css";

const IS_MOBILE = typeof window !== "undefined" &&
  (window.innerWidth < 900 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

// Tag root with a mobile class immediately (responsive.css uses it)
if (IS_MOBILE && typeof document !== "undefined") {
  document.documentElement.classList.add("is-mobile");
}

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Contact from "./components/Contact";
import Toast from "./components/Toast";
import ScrollUI from "./components/ScrollUI";
import CommandPalette from "./components/CommandPalette";
import { initFx } from "./utils/fx";

const AnimatedBackground = lazy(() => import("./components/AnimatedBackground"));
const ImpactStrip = lazy(() => import("./components/ImpactStrip"));
const Skills      = lazy(() => import("./components/Skills"));
const Experience  = lazy(() => import("./components/Experience"));
const Projects    = lazy(() => import("./components/Projects"));
const Journal     = lazy(() => import("./components/Journal"));
const Awards      = lazy(() => import("./components/Awards"));

const Fallback = () => <div style={{ minHeight: 80 }} />;
const seen = () => { try { return sessionStorage.getItem("rs_intro") === "1"; } catch { return false; } };
const markSeen = () => { try { sessionStorage.setItem("rs_intro", "1"); } catch { /* ignore */ } };

export default function App() {
  // Intro plays once per browser session; returning navigations skip straight to content.
  const [loading, setLoading] = useState(() => !seen());
  const done = useCallback(() => { markSeen(); setLoading(false); }, []);
  useEffect(() => { if (loading) return; return initFx(); }, [loading]);

  return (
    <>
      {loading && <LoadingScreen onComplete={done} />}
      <Suspense fallback={null}><AnimatedBackground /></Suspense>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[10000] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black">Skip to content</a>
      <Navbar />
      <ScrollUI />
      <Toast />
      <CommandPalette />
      <main id="main">
        <Hero />
        <Suspense fallback={<Fallback />}>
          <ImpactStrip />
          <Skills />
          <Experience />
          <Projects />
          <Journal />
          <Awards />
        </Suspense>
        <Contact />
      </main>
    </>
  );
}
