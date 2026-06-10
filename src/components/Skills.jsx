import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Terminal, Layers, Cpu, Database, Layout, Shield } from "lucide-react";

const SKILLS = [
  { name:"ABAP / ABAP 7.5",      pct:92, icon:<Terminal size={22}/> },
  { name:"CDS Views",             pct:88, icon:<Layers size={22}/>   },
  { name:"RAP / ABAP Cloud",      pct:86, icon:<Cpu size={22}/>      },
  { name:"OData V2/V4",           pct:85, icon:<Database size={22}/> },
  { name:"Clean Core / BTP",      pct:82, icon:<Shield size={22}/>   },
  { name:"SAP Fiori / UI5",       pct:80, icon:<Layout size={22}/>   },
];

function Counter({ value }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = null;
    const duration = 1800;
    const step = ts => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setDisplay(Math.round(p * value));
      if (p < 1) requestAnimationFrame(step);
    };
    const t = setTimeout(() => requestAnimationFrame(step), 400);
    return () => clearTimeout(t);
  }, [value]);
  return <>{display}</>;
}

export default function Skills() {
  return (
    <section id="skills" style={{ padding:"100px 40px",maxWidth:1280,margin:"0 auto" }}>
      <motion.div initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }}
        viewport={{ once:true }} style={{ marginBottom:80 }}>
        <p style={label}>Technical Arsenal</p>
        <h2 style={heading}>Core <em style={{ fontStyle:"normal",color:"rgba(255,255,255,0.3)" }}>Competencies</em></h2>
      </motion.div>

      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:24 }}>
        {SKILLS.map((sk,i) => (
          <motion.div key={sk.name}
            initial={{ opacity:0,y:30 }}
            whileInView={{ opacity:1,y:0 }}
            viewport={{ once:true,margin:"-80px" }}
            transition={{ delay:i*0.1,duration:0.7,ease:"easeOut" }}
            whileHover={{ y:-8,borderColor:"rgba(99,102,241,0.4)" }}
            style={{ borderRadius:40,border:"1px solid rgba(255,255,255,0.05)",
              background:"rgba(255,255,255,0.018)",padding:36,
              transition:"border-color 0.3s",overflow:"hidden",position:"relative" }}>
            {/* icon + pct */}
            <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:32 }}>
              <div style={{ padding:18,borderRadius:20,
                background:"rgba(15,23,42,0.6)",border:"1px solid rgba(255,255,255,0.08)",
                color:"rgba(255,255,255,0.4)" }}>
                {sk.icon}
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:10,
                  letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(255,255,255,0.25)",marginBottom:4 }}>
                  Proficiency
                </div>
                <div style={{ fontFamily:"'Outfit',sans-serif",fontSize:36,fontWeight:700,
                  color:"#fff",lineHeight:1,letterSpacing:"-1px" }}>
                  <Counter value={sk.pct}/>%
                </div>
              </div>
            </div>

            <h4 style={{ fontFamily:"'Outfit',sans-serif",fontSize:22,fontWeight:700,
              color:"#fff",marginBottom:24,letterSpacing:"-0.5px" }}>{sk.name}</h4>

            {/* bar */}
            <div style={{ height:3,background:"rgba(255,255,255,0.05)",borderRadius:2,overflow:"hidden" }}>
              <motion.div
                initial={{ width:0 }}
                whileInView={{ width:`${sk.pct}%` }}
                viewport={{ once:true }}
                transition={{ duration:2, delay:0.3, ease:[0.34,1.56,0.64,1] }}
                style={{ height:"100%",
                  background:"linear-gradient(90deg,#6366F1,#D8B4FE,#22D3EE)",
                  boxShadow:"0 0 20px rgba(99,102,241,0.5)",borderRadius:2,
                  position:"relative",overflow:"hidden" }}>
                <motion.div animate={{ x:["-100%","200%"], opacity:[0.3,0.6,0.3] }}
                  transition={{ duration:2.5,repeat:Infinity,ease:"easeInOut" }}
                  style={{ position:"absolute",inset:0,
                    background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)" }}/>
              </motion.div>
            </div>

            {/* corner glow */}
            <div style={{ position:"absolute",bottom:-16,right:-16,width:80,height:80,
              background:"rgba(99,102,241,0.06)",filter:"blur(20px)",borderRadius:"50%" }}/>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const label = { fontFamily:"'JetBrains Mono',monospace",fontSize:11,
  letterSpacing:"0.4em",textTransform:"uppercase",color:"#22D3EE",marginBottom:16 };
const heading = { fontFamily:"'Outfit',sans-serif",fontSize:"clamp(36px,5vw,64px)",
  fontWeight:700,color:"#fff",letterSpacing:"-2px",lineHeight:1.05 };
