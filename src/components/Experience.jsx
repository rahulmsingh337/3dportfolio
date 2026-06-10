import { motion } from "motion/react";
import { Briefcase, MapPin, Calendar, CheckCircle2 } from "lucide-react";

const JOBS = [
  {
    company:"Accenture", role:"Software Development Lead",
    period:"Dec 2025 – Present", location:"Noida, UP", current:true,
    points:[
      "Lead end-to-end ECC-to-S/4HANA migration workstreams — HANA remediation of 60+ custom ABAP objects, eliminating ATC critical findings for Clean Core compliance.",
      "Develop CDS Views, OData V4 Services, and RAP-based Fiori apps on SAP BTP, reducing custom footprint ~30% via Released API adoption and side-by-side extensibility.",
      "Redesign legacy ABAP using code push-down and AMDP — achieving 40–60% query-level performance improvements on large HANA datasets.",
      "Collaborate with SmartShift product team on ABAP automation tooling — reducing manual migration assessment effort by ~35% per sprint.",
      "Conduct structured code reviews across 6+ ABAP developers, enforcing ATC, Clean Core, and TDD (ABAP Unit Testing) standards.",
      "Partner with FICO, MM, SD functional architects to deliver scalable Clean Core technical solutions.",
    ],
    tech:["ABAP Cloud","S/4HANA","Clean Core","RAP","CDS Views","OData V4","SAP BTP","SmartShift","AMDP","Fiori Elements","ATC","TDD"],
  },
  {
    company:"Infosys Private Limited", role:"SAP ABAP & Fiori Consultant",
    period:"May 2021 – Dec 2025", location:"Noida, UP", current:false,
    points:[
      "Progressed from ABAP Developer to AMS Track Lead within 18 months — led technical delivery for 3 concurrent application management projects for global manufacturing and logistics clients.",
      "Developed 20+ Reports (Classical, Interactive, ALV/SALV) and interface programs (Proxies, RFC, IDocs, Web Dynpro) across SAP FICO, MM, and SD.",
      "Architected SAP Workflow for multi-level approval automation — reduced manual processing time by ~40% across a 500+ user business unit.",
      "Applied ABAP 7.5 modernisation techniques across legacy codebase — cutting average program runtime by 25–35%.",
      "LT03 custom transaction avoided a €50K+ third-party tool cost; received formal client appreciation letter.",
      "16 consecutive INSTA Rewards · 5× Unit Rise Awards · Best Performer · ACE COE Performer Award.",
    ],
    tech:["SAP Fiori","Web Dynpro","ALE/IDocs","Adobe Forms","ABAP 7.5","BAPIs","SAP Workflow","BRF Plus","CO-PA","OOABAP"],
  },
];

export default function Experience() {
  return (
    <section id="experience" style={{ padding:"100px 40px",maxWidth:1280,margin:"0 auto" }}>
      <motion.div initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }}
        viewport={{ once:true }} style={{ marginBottom:80 }}>
        <p style={label}>Professional Path</p>
        <h2 style={heading}>The <em style={{ fontStyle:"normal",color:"rgba(255,255,255,0.3)" }}>Journey</em></h2>
      </motion.div>

      <div style={{ position:"relative" }}>
        {/* vertical line */}
        <div style={{ position:"absolute",left:17,top:8,bottom:0,width:1,
          background:"rgba(255,255,255,0.05)" }}/>

        {JOBS.map((job,i) => (
          <motion.div key={job.company}
            initial={{ opacity:0, x:-24 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }}
            transition={{ delay:i*0.1,duration:0.8,ease:"easeOut" }}
            style={{ position:"relative",paddingLeft:56,paddingBottom:72 }}>

            {/* dot */}
            <div style={{ position:"absolute",left:0,top:2,width:36,height:36,
              borderRadius:"50%",border:"4px solid #020617",
              background:"#0F172A",display:"flex",alignItems:"center",justifyContent:"center",
              ...(job.current ? { boxShadow:"0 0 0 2px #22D3EE,0 0 20px rgba(34,211,238,0.3)" } : {}) }}>
              <Briefcase size={13} color={job.current ? "#22D3EE" : "rgba(255,255,255,0.3)"}/>
            </div>

            <div style={{ display:"flex",flexWrap:"wrap",alignItems:"flex-start",
              justifyContent:"space-between",gap:16,marginBottom:24 }}>
              <div>
                <h3 style={{ fontFamily:"'Outfit',sans-serif",fontSize:26,fontWeight:700,
                  color:"#fff",letterSpacing:"-0.5px",marginBottom:4 }}>{job.role}</h3>
                <p style={{ fontFamily:"'Inter',sans-serif",fontSize:16,fontWeight:600,
                  color:"#D8B4FE" }}>{job.company}</p>
              </div>
              <div style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:10,
                letterSpacing:"0.2em",textTransform:"uppercase",
                color:"rgba(255,255,255,0.25)",textAlign:"right" }}>
                <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:4,justifyContent:"flex-end" }}>
                  <Calendar size={11} color="#6366F1"/>{job.period}
                </div>
                <div style={{ display:"flex",alignItems:"center",gap:6,justifyContent:"flex-end" }}>
                  <MapPin size={11}/>{job.location}
                </div>
              </div>
            </div>

            <ul style={{ listStyle:"none",marginBottom:24 }}>
              {job.points.map((pt,j) => (
                <li key={j} style={{ display:"flex",gap:14,padding:"7px 0",
                  borderBottom:"1px solid rgba(255,255,255,0.04)",
                  ...(j === job.points.length-1 ? { borderBottom:"none" } : {}) }}>
                  <CheckCircle2 size={15} style={{ marginTop:2,flexShrink:0,
                    color:"rgba(255,255,255,0.08)" }}/>
                  <span style={{ fontFamily:"'Inter',sans-serif",fontSize:14,lineHeight:1.65,
                    color:"rgba(255,255,255,0.45)" }}>{pt}</span>
                </li>
              ))}
            </ul>

            <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
              {job.tech.map(t=>(
                <span key={t} style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:10,
                  fontWeight:500,padding:"5px 12px",borderRadius:8,
                  background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.06)",
                  color:"rgba(255,255,255,0.4)",letterSpacing:"0.05em",textTransform:"uppercase",
                  transition:"all 0.2s",cursor:"default" }}
                  onMouseEnter={e=>{ e.currentTarget.style.borderColor="rgba(99,102,241,0.4)";
                    e.currentTarget.style.color="#fff"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(255,255,255,0.06)";
                    e.currentTarget.style.color="rgba(255,255,255,0.4)"; }}>
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const label = { fontFamily:"'JetBrains Mono',monospace",fontSize:11,
  letterSpacing:"0.4em",textTransform:"uppercase",color:"#6366F1",marginBottom:16 };
const heading = { fontFamily:"'Outfit',sans-serif",fontSize:"clamp(36px,5vw,64px)",
  fontWeight:700,color:"#fff",letterSpacing:"-2px",lineHeight:1.05 };
