import { ArrowUpRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import ScrubIn from "./ScrubIn";

const ENTRIES = [
  { title: "The Autonomous Enterprise, certified: SAP’s strategy, architecture and value case", category: "Credential", date: "Oct 2026", href: "https://www.credly.com/badges/13bb62a4-9d1a-478f-8b73-830b1a6c942d" },
  { title: "SAP Business AI Platform, positioned: BTP core capabilities and intelligent technologies", category: "Credential", date: "Sep 2026", href: "https://www.credly.com/badges/d1912d28-7b2a-437f-b88f-b9a67b841a61" },
  { title: "S/4HANA Conversion & System Upgrade, certified: the technical skills behind enterprise migration", category: "Credential", date: "Sep 2026", href: "https://www.credly.com/badges/1b8a388a-5611-4175-9e26-c9916ed5b442" },
  { title: "SAP Generative AI Developer, certified", category: "Credential", date: "Sep 2026", href: "https://www.credly.com/badges/cab1bb32-9291-400d-82d3-e8fd8327b0c0" },
  { title: "F2173 & F2175: giving SAP EAM Fiori apps a better day job", category: "SAP EAM", date: "Jun 2026", href: "https://www.linkedin.com/in/rahul-singh-sap-abap/" },
  { title: "ECC to S/4HANA: what nobody tells you about HANA remediation", category: "Migration", date: "Mar 2026", href: "https://github.com/rahulmsingh337/s4hana_migration-code-cookbook" },
  { title: "Your first RAP model on the SAP BTP ABAP Environment", category: "ABAP Cloud", date: "Feb 2026", href: "https://github.com/rahulmsingh337/abap-cloud-rap-reference-project" },
  { title: "EAM on S/4HANA, the Clean Core way: F2173 & F2175 with RAP", category: "SAP EAM", date: "Jan 2026", href: "https://www.linkedin.com/in/rahul-singh-sap-abap/" },
  { title: "ABAP Cloud certification (C_ABAPD_2601): what it covers and how to prepare", category: "ABAP Cloud", date: "Dec 2025", href: "https://www.linkedin.com/in/rahul-singh-sap-abap/" },
];

export default function Journal() {
  return (
    <section id="journal" className="sec wrap">
      <SectionHeader n="04" eyebrow="Insights" title="Field" em="notes"
        lede="Notes on migrations, Clean Core and certification, written down so the next cutover goes a little smoother." />
      <div className="rows">
        {ENTRIES.map((e, i) => (
          <ScrubIn key={e.title} from={{ x: i % 2 ? 56 : -56, y: 0, opacity: 0.78 }} range={["start 96%", "start 70%"]}>
          <a className="card row" href={e.href} target="_blank" rel="noreferrer">
            <span className="row-t">{e.title}</span>
            <span className="row-m">
              <span className="tag">{e.category}</span>
              <span className="row-d">{e.date}</span>
              <ArrowUpRight className="row-a" size={18} strokeWidth={1.6} />
            </span>
          </a>
          </ScrubIn>
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
