import { ArrowUpRight } from "lucide-react";
import SectionHeader from "./SectionHeader";

const ENTRIES = [
  { title: "SAP Certified – Positioning the Autonomous Enterprise: Strategy, architecture and value proposition", category: "Credential", date: "Oct 2026", href: "https://www.credly.com/badges/13bb62a4-9d1a-478f-8b73-830b1a6c942d" },
  { title: "SAP Certified – Positioning SAP Business AI Platform: BTP core capabilities and intelligent technologies", category: "Credential", date: "Sep 2026", href: "https://www.credly.com/badges/d1912d28-7b2a-437f-b88f-b9a67b841a61" },
  { title: "SAP Certified – S/4HANA Conversion & System Upgrade: Technical skills for enterprise migration", category: "Credential", date: "Sep 2026", href: "https://www.credly.com/badges/1b8a388a-5611-4175-9e26-c9916ed5b442" },
  { title: "SAP Certified – Generative AI Developer: What it covers and how I prepared", category: "Credential", date: "Sep 2026", href: "https://www.credly.com/badges/cab1bb32-9291-400d-82d3-e8fd8327b0c0" },
  { title: "SAP EAM on S/4HANA: F2173 & F2175 Fiori enhancements — Maintenance Order Management", category: "SAP EAM", date: "Jun 2026", href: "https://www.linkedin.com/in/rahul-singh-sap-abap/" },
  { title: "ECC to S/4HANA: What nobody tells you about HANA remediation", category: "Migration", date: "Mar 2026", href: "https://github.com/rahulmsingh337/s4hana_migration-code-cookbook" },
  { title: "Building your first RAP model on SAP BTP ABAP Environment", category: "ABAP Cloud", date: "Feb 2026", href: "https://github.com/rahulmsingh337/abap-cloud-rap-reference-project" },
  { title: "SAP EAM on S/4HANA: Enhancing F2173 & F2175 Fiori apps with RAP and Clean Core", category: "SAP EAM", date: "Jan 2026", href: "https://www.linkedin.com/in/rahul-singh-sap-abap/" },
  { title: "ABAP Cloud Certification (C_ABAPD_2601): What it covers and how to prepare", category: "ABAP Cloud", date: "Dec 2025", href: "https://www.linkedin.com/in/rahul-singh-sap-abap/" },
];

export default function Journal() {
  return (
    <section id="journal" className="sec wrap">
      <SectionHeader n="04" eyebrow="Insights" title="SAP" em="insights"
        lede="Notes on migration patterns, ABAP Cloud and certification, from five-plus years of SAP delivery." />
      <div className="rows">
        {ENTRIES.map((e) => (
          <a key={e.title} className="card row" href={e.href} target="_blank" rel="noreferrer">
            <span className="row-t">{e.title}</span>
            <span className="row-m">
              <span className="tag">{e.category}</span>
              <span className="row-d">{e.date}</span>
              <ArrowUpRight className="row-a" size={18} strokeWidth={1.6} />
            </span>
          </a>
        ))}
      </div>
      <div style={{ marginTop: 36 }}>
        <a className="btn btn-ghost" href="https://www.linkedin.com/in/rahul-singh-sap-abap/" target="_blank" rel="noreferrer">
          Follow on LinkedIn <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}
