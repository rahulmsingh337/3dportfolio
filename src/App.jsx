import { useState, lazy, Suspense } from "react";
import LoadingScreen from "./components/LoadingScreen";
import SEO          from "./components/SEO";
import "./index.css";

const IS_MOBILE = typeof window !== "undefined" &&
  (window.innerWidth < 900 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

// Always loaded (lightweight, no deps)
import Navbar     from "./components/Navbar";
import Hero       from "./components/Hero";
import Contact    from "./components/Contact";

// Lazy-loaded sections — load after paint
const AnimatedBackground = lazy(() => import("./components/AnimatedBackground"));
const ImpactStrip  = lazy(() => import("./components/ImpactStrip"));
const Skills       = lazy(() => import("./components/Skills"));
const Experience   = lazy(() => import("./components/Experience"));
const Projects     = lazy(() => import("./components/Projects"));
const SelectedWorks= lazy(() => import("./components/SelectedWorks"));
const Journal      = lazy(() => import("./components/Journal"));
const Awards       = lazy(() => import("./components/Awards"));
const Cursor       = lazy(() => import("./components/Cursor"));

const SectionFallback = () => <div style={{ minHeight: 100 }} />;

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading
        ? <LoadingScreen onComplete={() => setLoading(false)} />
        : (
          <>
            <SEO />
            <div aria-hidden="true" style={{ position:"absolute",left:"-9999px",top:0,width:1,height:1,overflow:"hidden",opacity:0,pointerEvents:"none" }}>
              <h1>Rahul Singh - SAP ABAP Lead</h1>
              <p>S/4HANA Transformation · ABAP Cloud · Clean Core · SAP EAM · RAP · CDS · OData V4 · Noida India · rs58598@gmail.com</p>
            </div>

            <Suspense fallback={null}>
              <AnimatedBackground />
              {!IS_MOBILE && <Cursor />}
            </Suspense>

            <Navbar />
            <Hero />

            <Suspense fallback={<SectionFallback />}>
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
        )
      }
    </>
  );
}
