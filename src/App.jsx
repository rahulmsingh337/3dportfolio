import { useState, lazy, Suspense } from "react";
import LoadingScreen from "./components/LoadingScreen";
import "./index.css";

const IS_MOBILE = typeof window !== "undefined" &&
  (window.innerWidth < 900 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

// Tag body with mobile class immediately — CSS kills all framer-motion transitions
if (IS_MOBILE && typeof document !== "undefined") {
  document.documentElement.classList.add("is-mobile");
}

// Static imports — always needed
import Navbar  from "./components/Navbar";
import Hero    from "./components/Hero";
import Contact from "./components/Contact";

// Lazy — load after paint
const AnimatedBackground = lazy(() => import("./components/AnimatedBackground"));
const Cursor       = lazy(() => import("./components/Cursor"));
const ImpactStrip  = lazy(() => import("./components/ImpactStrip"));
const Skills       = lazy(() => import("./components/Skills"));
const Experience   = lazy(() => import("./components/Experience"));
const Projects     = lazy(() => import("./components/Projects"));
const SelectedWorks= lazy(() => import("./components/SelectedWorks"));
const Journal      = lazy(() => import("./components/Journal"));
const Awards       = lazy(() => import("./components/Awards"));

// On mobile: stub out framer-motion entirely so it never downloads
if (IS_MOBILE) {
  // Override dynamic chunk resolution — motion stays unloaded
  window.__MOTION_DISABLED__ = true;
}

const Fallback = () => <div style={{ minHeight: 80 }} />;

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading
        ? <LoadingScreen onComplete={() => setLoading(false)} />
        : <>
            <Suspense fallback={null}>
              <AnimatedBackground />
              {!IS_MOBILE && <Cursor />}
            </Suspense>

            <Navbar />
            <Hero />

            <Suspense fallback={<Fallback />}>
              <ImpactStrip />
              <Skills />
              <Experience />
              <Projects />
              <SelectedWorks />
              <Journal />
              <Awards />
            </Suspense>

            <Contact />
          </>
      }
    </>
  );
}
