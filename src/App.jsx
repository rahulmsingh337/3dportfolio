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
import SEO              from "./components/SEO";
import "./index.css";

// Detect mobile once at startup
const IS_MOBILE = typeof window !== "undefined" &&
  (window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Custom cursor only on desktop */}
      {!IS_MOBILE && <Cursor />}

      {loading
        ? <LoadingScreen onComplete={() => setLoading(false)} />
        : (
          <>
            <SEO />
            {/* Hidden semantic content for search crawlers */}
            <div style={{ position:"absolute", left:"-9999px", top:0,
              width:1, height:1, overflow:"hidden", opacity:0, pointerEvents:"none" }}
              aria-hidden="true">
              <h1>Rahul Singh - SAP ABAP Lead Consultant</h1>
              <h2>S/4HANA Transformation | ABAP Cloud Certified | SAP EAM | RAP | CDS Views | OData V4 | SAP BTP | Noida India</h2>
              <p>SAP ABAP Lead at Accenture. 5+ years ECC-to-S/4HANA transformation, HANA remediation, Clean Core, SAP EAM, RAP, CDS Views, OData V4, ABAP Cloud. SAP Certified Back-End Developer ABAP Cloud C_ABAPD_2601.</p>
              <p>Contact: rs58598@gmail.com | +91-8989805836 | Noida UP India</p>
            </div>
            <AnimatedBackground />
            <Navbar />
            <Hero />
            <ImpactStrip />
            <Skills />
            <Experience />
            <Projects />
            <SelectedWorks />
            <Journal />
            <Awards />
            <Contact />
          </>
        )
      }
    </>
  );
}
