import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Terminal, Layers, Cpu, Database, Layout, Shield, Bot } from "lucide-react";

const SKILL_CARDS = [
  {
    icon:<Terminal size={28}/>, title:"Core ABAP & S/4HANA", color:"#6366F1",
    desc:"ABAP 7.5, OO-ABAP, ECC-to-S/4HANA migration, HANA remediation, code push-down, AMDP. Led remediation of 60+ custom objects.",
    tags:["ABAP 7.5","OO-ABAP","AMDP","S/4HANA","ECC Migration","Code Push-Down","Module Pool"],
    back:"60+ custom ABAP objects remediated. 40–60% query performance improvement via AMDP & code push-down.",
    pct:92,
  },
  {
    icon:<Layers size={28}/>, title:"Modern SAP / Clean Core", color:"#22D3EE",
    desc:"CDS Views, RAP model, OData V2/V4, SAP BTP ABAP Environment, Clean Core extensibility, Released APIs, Steampunk.",
    tags:["CDS Views","RAP","OData V4","SAP BTP","Clean Core","Steampunk","Fiori Elements"],
    back:"~30% custom footprint reduction via Released API adoption and side-by-side extensibility patterns.",
    pct:88,
  },
  {
    icon:<Bot size={28}/>, title:"SAP AI & Emerging Tech", color:"#D8B4FE",
    desc:"Integrating AI capabilities into SAP workflows. Built Prompify — Gemini API-powered prompt optimisation app.",
    tags:["Gemini API","Firebase","AI/ML in SAP","React","TypeScript"],
    back:"Full-stack AI app: prompifytech.vercel.app. Firebase Auth + Gemini API + Express backend.",
    pct:75,
  },
  {
    icon:<Database size={28}/>, title:"Integration & Interfaces", color:"#3dd68c",
    desc:"ALE/IDoc, RFC, BAPIs, Proxies, external API integration, BRF+, SAP Integration Suite, SAP Workflow automation.",
    tags:["ALE/IDoc","RFC","BAPIs","Proxies","BRF+","SAP Workflow","BDC"],
    back:"End-to-end ALE/IDoc integration across 3 client landscapes. ~40% workflow processing time reduction.",
    pct:86,
  },
  {
    icon:<Shield size={28}/>, title:"Performance & Quality", color:"#F59E0B",
    desc:"SQL Trace, ABAP Runtime Analysis, ATC, ABAP Memory Analysis, SmartShift, system dump analysis.",
    tags:["SQL Trace","ATC","Eclipse ADT","SmartShift","TDD","ABAP Unit Testing"],
    back:"35% migration effort reduction with SmartShift tooling. Code reviews across 6+ developer team.",
    pct:84,
  },
  {
    icon:<Layout size={28}/>, title:"Forms, Output & Modules", color:"#EC4899",
    desc:"SmartForms, Adobe Forms, SAPscript, Output Management across SAP FICO, MM, SD, CO-PA.",
    tags:["SmartForms","Adobe Forms","SAPscript","ALV/SALV","CO-PA","Solution Manager"],
    back:"~200 duplicate email triggers/month eliminated. 30% output processing time reduction.",
    pct:82,
  },
];

function SkillCard({ sk, index }) {
  const [flipped, setFlipped] = useState(false);
  const ref = useRef(null);

  // tilt on mouse
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = e => {
      const r = el.getBoundingClientRect();
      const rx = ((e.clientY - r.top  - r.height/2) / r.height) * 12;
      const ry = ((e.clientX - r.left - r.width /2) / r.width ) * -12;
      el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    };
    const leave = () => { el.style.transform = "perspective(800px) rotateX(0) rotateY(0)"; };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => { el.removeEventListener("mousemove",move); el.removeEventListener("mouseleave",leave); };
  }, []);

  return (
    <motion.div
      initial={{ opacity:0, y:50 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:"-60px" }}
      transition={{ delay:index*0.1, duration:0.7, ease:[0.22,1,0.36,1] }}
      style={{ height:280, perspective:800, cursor:"default" }} className="skill-card-h"
      onClick={() => setFlipped(f => !f)}
      data-hover
    >
      <div ref={ref} style={{
        width:"100%", height:"100%",
        transformStyle:"preserve-3d",
        transition:"transform 0.7s cubic-bezier(0.34,1.56,0.64,1)",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
      }}>
        {/* FRONT */}
        <div style={{
          position:"absolute", inset:0,
          backfaceVisibility:"hidden", WebkitBackfaceVisibility:"hidden",
          borderRadius:28, padding:32,
          background:"rgba(15,23,42,0.6)",
          border:`1px solid ${sk.color}25`,
          backdropFilter:"blur(12px)",
          overflow:"hidden",
        }}>
          {/* Glow blob */}
          <div style={{
            position:"absolute", top:-20, right:-20, width:100, height:100,
            background:sk.color, opacity:0.08, filter:"blur(30px)", borderRadius:"50%",
          }}/>
          <div style={{ color:sk.color, marginBottom:20,
            padding:14, borderRadius:16, display:"inline-block",
            background:`${sk.color}12`, border:`1px solid ${sk.color}25` }}>
            {sk.icon}
          </div>
          <h4 style={{ fontFamily:"'Outfit',sans-serif", fontSize:19, fontWeight:700,
            color:"#fff", marginBottom:10, letterSpacing:"-0.3px" }}>{sk.title}</h4>
          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:12.5, lineHeight:1.65,
            color:"rgba(255,255,255,0.4)", marginBottom:16 }}>{sk.desc}</p>
          {/* Progress bar */}
          <div style={{ height:2, background:"rgba(255,255,255,0.06)", borderRadius:2 }}>
            <motion.div
              initial={{ width:0 }}
              whileInView={{ width:`${sk.pct}%` }}
              viewport={{ once:true }}
              transition={{ duration:1.8, delay:0.3, ease:[0.34,1.56,0.64,1] }}
              style={{ height:"100%", borderRadius:2,
                background:`linear-gradient(90deg,${sk.color},#fff)`,
                boxShadow:`0 0 10px ${sk.color}80` }}
            />
          </div>
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10,
            color:"rgba(255,255,255,0.2)", marginTop:6, textAlign:"right" }}>
            {sk.pct}% · tap to flip
          </div>
        </div>

        {/* BACK */}
        <div style={{
          position:"absolute", inset:0,
          backfaceVisibility:"hidden", WebkitBackfaceVisibility:"hidden",
          transform:"rotateY(180deg)",
          borderRadius:28, padding:32,
          background:`linear-gradient(135deg,${sk.color}18,rgba(2,6,23,0.95))`,
          border:`1px solid ${sk.color}40`,
          backdropFilter:"blur(12px)",
          display:"flex", flexDirection:"column", justifyContent:"center",
        }}>
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10,
            letterSpacing:"0.3em", textTransform:"uppercase",
            color:sk.color, marginBottom:16 }}>Impact</div>
          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:17, fontWeight:600,
            color:"#fff", lineHeight:1.5, marginBottom:24 }}>{sk.back}</p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
            {sk.tags.map(t=>(
              <span key={t} style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10,
                padding:"4px 10px", borderRadius:100,
                background:`${sk.color}15`, border:`1px solid ${sk.color}30`,
                color:sk.color, letterSpacing:"0.06em", textTransform:"uppercase" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" style={{ padding:"100px 40px", maxWidth:1280, margin:"0 auto" }} className="section-pad">
      <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }} style={{ marginBottom:72 }}>
        <p style={lbl}>Technical Arsenal</p>
        <h2 style={hdg} className="glitch" data-text="Core Competencies">
          Core <em style={{ fontStyle:"normal", color:"rgba(255,255,255,0.25)" }}>Competencies</em>
        </h2>
        <p style={{ fontFamily:"'Inter',sans-serif", fontSize:14,
          color:"rgba(255,255,255,0.3)", marginTop:12 }}>
          Tap any card to reveal impact metrics →
        </p>
      </motion.div>

      <div style={{ display:"grid",
        gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))", gap:20 }} className="skills-grid">
        {SKILL_CARDS.map((sk,i) => <SkillCard key={sk.title} sk={sk} index={i}/>)}
      </div>
    </section>
  );
}

const lbl={fontFamily:"'JetBrains Mono',monospace",fontSize:11,letterSpacing:"0.4em",textTransform:"uppercase",color:"#6366F1",marginBottom:16};
const hdg={fontFamily:"'Outfit',sans-serif",fontSize:"clamp(36px,5vw,64px)",fontWeight:700,color:"#fff",letterSpacing:"-2px",lineHeight:1.05};
