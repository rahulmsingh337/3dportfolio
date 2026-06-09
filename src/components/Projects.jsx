import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Zap, BarChart3, Mail, Terminal, Database, Layers, X, ExternalLink } from "lucide-react";

const PROJECTS = [
  { id:"rap",    icon:<Layers size={26}/>,    title:"ABAP Cloud RAP Reference",
    desc:"Open-source reference RAP model on SAP BTP — BO definition, OData V4 service, Fiori Elements UI. A practical starting point for RAP adoption.",
    tags:["RAP","OData V4","SAP BTP","Fiori Elements"],
    outcome:"Reference architecture for teams adopting ABAP Cloud.",
    link:"https://github.com/rahulmsingh337/abap-cloud-rap-reference-project" },
  { id:"s4",     icon:<Zap size={26}/>,       title:"S/4HANA Migration Cookbook",
    desc:"Open-source reference for ECC to S/4HANA code migration patterns — HANA remediation, deprecated API replacements, code push-down techniques.",
    tags:["S/4HANA","HANA","ABAP","Migration"],
    outcome:"Real-world migration patterns from enterprise projects.",
    link:"https://github.com/rahulmsingh337/s4hana_migration-code-cookbook" },
  { id:"smart",  icon:<Zap size={26}/>,       title:"SmartShift Automation Tool",
    desc:"Collaborated with Accenture's SmartShift team to build automation tooling that reduces manual ABAP remediation effort across large legacy codebases.",
    tags:["SmartShift","S/4HANA","Automation","ABAP"],
    outcome:"Reduced manual ABAP remediation time across migration workstream." },
  { id:"trace",  icon:<BarChart3 size={26}/>, title:"Traceability Report Suite",
    desc:"Custom ALV-based reporting suite providing end-to-end order and delivery visibility — consolidated from multiple SAP modules into a single summary view.",
    tags:["ALV Reports","Analytics","SAP ABAP","SAP SD"],
    outcome:"Eliminated cross-system manual lookups for operations team." },
  { id:"bol",    icon:<Mail size={26}/>,      title:"US Email Automation — BOL & Packing Slip",
    desc:"Email automation for Bill of Lading and packing slip outputs with consolidation logic for multiple POs/DNs into a single document per delivery stop.",
    tags:["Email Automation","SmartForms","SAP SD","BOL"],
    outcome:"Consolidated multi-PO/DN flows into single document dispatch." },
  { id:"copa",   icon:<Database size={26}/>,  title:"COPA Report Reconciliation",
    desc:"Reconciliation program to fetch frozen index data and calculate FI, COPA, and Statistical values after background job posting — eliminating manual cycles.",
    tags:["FI/CO","COPA","Background Jobs","Financial Reporting"],
    outcome:"100% financial accuracy — eliminated manual reconciliation cycles." },
];

function Modal({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      onClick={onClose}
      style={{ position:"fixed",inset:0,zIndex:200,display:"flex",
        alignItems:"center",justifyContent:"center",padding:24,
        background:"rgba(0,0,0,0.7)",backdropFilter:"blur(8px)" }}>
      <motion.div
        initial={{ scale:0.9,opacity:0 }} animate={{ scale:1,opacity:1 }}
        exit={{ scale:0.9,opacity:0 }}
        onClick={e=>e.stopPropagation()}
        style={{ width:"100%",maxWidth:600,background:"#0F172A",
          border:"1px solid rgba(255,255,255,0.1)",borderRadius:40,
          padding:48,position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",inset:"0 0 auto 0",height:1,
          background:"linear-gradient(90deg,transparent,#6366F1,transparent)" }}/>
        <button data-hover onClick={onClose}
          style={{ position:"absolute",top:20,right:20,padding:8,borderRadius:"50%",
            background:"rgba(255,255,255,0.06)",border:"none",color:"#fff",cursor:"none" }}>
          <X size={18}/>
        </button>
        <div style={{ marginBottom:24,padding:16,borderRadius:16,display:"inline-block",
          background:"rgba(99,102,241,0.1)",border:"1px solid rgba(99,102,241,0.2)",color:"#6366F1" }}>
          {project.icon}
        </div>
        <h3 style={{ fontFamily:"'Outfit',sans-serif",fontSize:30,fontWeight:700,
          color:"#fff",letterSpacing:"-1px",marginBottom:16 }}>{project.title}</h3>
        <p style={{ fontFamily:"'Inter',sans-serif",fontSize:15,lineHeight:1.75,
          color:"rgba(255,255,255,0.5)",marginBottom:28 }}>{project.desc}</p>
        <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:28 }}>
          {project.tags.map(t=>(
            <span key={t} style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:10,
              padding:"5px 12px",borderRadius:100,
              background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",
              color:"rgba(255,255,255,0.5)",letterSpacing:"0.08em",textTransform:"uppercase" }}>{t}</span>
          ))}
        </div>
        {project.outcome && (
          <div style={{ padding:20,borderRadius:16,
            background:"rgba(99,102,241,0.08)",border:"1px solid rgba(99,102,241,0.2)" }}>
            <div style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:10,
              letterSpacing:"0.2em",textTransform:"uppercase",color:"#6366F1",marginBottom:8 }}>
              Outcome
            </div>
            <p style={{ fontFamily:"'Inter',sans-serif",fontSize:15,color:"#fff" }}>
              {project.outcome}
            </p>
          </div>
        )}
        {project.link && (
          <a href={project.link} target="_blank" rel="noreferrer" data-hover
            style={{ display:"inline-flex",alignItems:"center",gap:8,marginTop:24,
              fontFamily:"'JetBrains Mono',monospace",fontSize:11,fontWeight:700,
              color:"#22D3EE",textDecoration:"none",letterSpacing:"0.1em",
              textTransform:"uppercase",cursor:"none" }}>
            <ExternalLink size={14}/> View on GitHub
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <AnimatePresence>{selected && <Modal project={selected} onClose={()=>setSelected(null)}/>}</AnimatePresence>

      <section id="projects" style={{ padding:"100px 40px",maxWidth:1280,margin:"0 auto" }}>
        <motion.div initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }}
          viewport={{ once:true }} style={{ marginBottom:80 }}>
          <p style={lbl}>Core Initiatives</p>
          <h2 style={hdg}>Impact & <em style={{ fontStyle:"normal",color:"rgba(255,255,255,0.3)" }}>Innovation</em></h2>
        </motion.div>

        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))",gap:20 }}>
          {PROJECTS.map((p,i)=>(
            <motion.div key={p.id}
              initial={{ opacity:0,y:40 }} whileInView={{ opacity:1,y:0 }}
              viewport={{ once:true }} transition={{ delay:i*0.08,duration:0.7 }}
              whileHover={{ scale:1.015,borderColor:"rgba(99,102,241,0.4)" }}
              onClick={()=>setSelected(p)} data-hover
              style={{ position:"relative",borderRadius:40,border:"1px solid rgba(255,255,255,0.07)",
                background:"rgba(15,23,42,0.5)",padding:40,cursor:"none",
                backdropFilter:"blur(8px)",overflow:"hidden",transition:"border-color 0.3s" }}>
              {/* top line */}
              <div style={{ position:"absolute",top:0,left:0,right:0,height:1,
                background:"linear-gradient(90deg,transparent,rgba(99,102,241,0.6),transparent)",
                opacity:0,transition:"opacity 0.3s" }} className="card-topline"/>
              <div style={{ padding:18,borderRadius:20,display:"inline-block",
                background:"rgba(2,6,23,0.6)",border:"1px solid rgba(255,255,255,0.08)",
                color:"rgba(255,255,255,0.4)",marginBottom:24,transition:"all 0.3s" }}>
                {p.icon}
              </div>
              <h4 style={{ fontFamily:"'Outfit',sans-serif",fontSize:22,fontWeight:700,
                color:"#fff",letterSpacing:"-0.5px",marginBottom:12,lineHeight:1.2 }}>{p.title}</h4>
              <p style={{ fontFamily:"'Inter',sans-serif",fontSize:13,lineHeight:1.7,
                color:"rgba(255,255,255,0.4)",marginBottom:24 }}>{p.desc}</p>
              <div style={{ display:"flex",flexWrap:"wrap",gap:6 }}>
                {p.tags.map(t=>(
                  <span key={t} style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:10,
                    padding:"4px 10px",borderRadius:100,
                    background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",
                    color:"rgba(255,255,255,0.35)",letterSpacing:"0.08em",textTransform:"uppercase" }}>{t}</span>
                ))}
              </div>
              {p.outcome && (
                <div style={{ marginTop:24,paddingTop:20,borderTop:"1px solid rgba(255,255,255,0.05)",
                  display:"flex",alignItems:"center",gap:8 }}>
                  <div style={{ width:6,height:6,borderRadius:"50%",flexShrink:0,
                    background:"#22D3EE",boxShadow:"0 0 10px rgba(34,211,238,0.8)" }}/>
                  <span style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:10,
                    fontWeight:700,color:"rgba(255,255,255,0.6)",
                    letterSpacing:"0.06em",textTransform:"uppercase" }}>{p.outcome}</span>
                </div>
              )}
              <div style={{ position:"absolute",top:0,right:0,width:80,height:80,
                background:"rgba(99,102,241,0.05)",filter:"blur(24px)",borderRadius:"50%",
                transform:"translate(30%,-30%)" }}/>
            </motion.div>
          ))}
        </div>
        <style>{`.card-topline{opacity:0!important;}[data-hover]:hover .card-topline{opacity:1!important;}`}</style>
      </section>
    </>
  );
}
const lbl={fontFamily:"'JetBrains Mono',monospace",fontSize:11,letterSpacing:"0.4em",textTransform:"uppercase",color:"#6366F1",marginBottom:16};
const hdg={fontFamily:"'Outfit',sans-serif",fontSize:"clamp(36px,5vw,64px)",fontWeight:700,color:"#fff",letterSpacing:"-2px",lineHeight:1.05};
