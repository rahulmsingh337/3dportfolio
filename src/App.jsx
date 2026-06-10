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
import SEO from "./components/SEO";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Cursor/>
      {loading
        ? <LoadingScreen onComplete={() => setLoading(false)}/>
        : (
          <>
            <SEO/>
            {/* Hidden semantic content for search crawlers */}
            <div style={{ position:"absolute", left:"-9999px", top:0,
              width:1, height:1, overflow:"hidden", opacity:0, pointerEvents:"none" }}
              aria-hidden="true">
              <h1>Rahul Singh - SAP ABAP Lead Consultant</h1>
              <h2>S/4HANA Migration Expert | Clean Core | RAP | CDS Views | OData V4 | SAP BTP | Noida India</h2>
              <p>SAP ABAP Lead Consultant at Accenture with 5+ years of enterprise delivery. Specializing in ECC-to-S/4HANA migration, HANA remediation, Clean Core extensibility, CDS Views, RESTful ABAP Programming (RAP), OData V2/V4 Services, and SAP BTP ABAP Environment. Previously at Infosys as SAP ABAP Consultant and Infosys Certified SAP Fiori Consultant.</p>
              <p>Certifications: SAP Certified Back-End Developer ABAP Cloud, SAP ALE IDocs Certification, Advanced Programming in ABAP, Data Management and ABAP Services for SAP Cloud Platform.</p>
              <p>Awards: 16 consecutive INSTA Rewards, 5 Unit Rise Awards, Unit Rise Award Rookie of the Quarter, ACE COE Performer Award, Best Performer EAS SAP Unit, Client Appreciation Letter for LT03 solution saving EUR 50000.</p>
              <p>Projects: ABAP Cloud RAP Reference Project on GitHub, S/4HANA Migration Code Cookbook on GitHub, Prompify AI prompt engineering app, SAP Workflow approval automation, US Email Automation for Bill of Lading.</p>
              <p>Contact: rs58598@gmail.com | +91-8989805836 | Noida Uttar Pradesh India | LinkedIn: rahul-singh-sap-abap | GitHub: rahulmsingh337</p>
            </div>
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
