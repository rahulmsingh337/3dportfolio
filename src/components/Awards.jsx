import { asset } from "../utils/assetPath";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trophy, Medal, Star, X, ChevronLeft, ChevronRight } from "lucide-react";

const SKILL_TAGS = [
  { id:"func", title:"SAP S/4HANA Functional Professional",        issuer:"Infosys", image:asset("/cert-sap-func.png") },
  { id:"tech", title:"SAP S/4HANA Technical Professional",         issuer:"Infosys", image:asset("/cert-sap-tech.png") },
];

const RISE = [
  { id:"coe",    title:"COE ACE",           category:"Individual",  period:"H1-FY26", image:asset("/cert-coe-ace.png")  },
  { id:"eureka", title:"Eureka",            category:"Individual",  period:"H1-FY26", image:asset("/cert-eureka.png")   },
  { id:"rookie", title:"Rookie of the Qtr", category:"RISE Awards", period:"H1-FY26", image:asset("/cert-rookie.png")   },
  { id:"rise2",  title:"Rookie of the Qtr", category:"RISE Awards", period:"FY25 Q2", image:asset("/ach-unit-rise.png") },
  { id:"rise3",  title:"Rookie of the Qtr",            category:"RISE Awards", period:"FY24 Q2", image:asset("/cert-rookie.png")   },
  { id:"client", title:"Client Appreciation Letter",   category:"Global Logistics Client", period:"Jan 2024", image:asset("/award-1.png")       },
];

const INSTA = [
  { id:"ia1", title:"Onboarding Star",              note:"Delivered all requirements on time; helped manage team workload",         date:"Nov 2021", image:asset("/award-1.png") },
  { id:"ia2", title:"Front-end API Dev",            note:"Helped create API in front-end web development",                        date:"Nov 2022", image:asset("/award-2.png") },
  { id:"ia3", title:"Debugging & RCA",              note:"Helped in debugging and understanding root cause analysis",             date:"Sep 2022", image:asset("/award-3.png") },
  { id:"ia4", title:"Project Skill Enhancement",   note:"Helped the team understand the project and enhance skills",             date:"Feb 2023", image:asset("/award-4.png") },
  { id:"ia5", title:"Firebase Auth App",            note:"Helped build Firebase authentication application",                      date:"Apr 2023", image:asset("/award-5.png") },
  { id:"ia6", title:"SAP Fiori App Builder",        note:"Recognised for building SAP Fiori application",                        date:"May 2023", image:asset("/award-6.png") },
  { id:"ia7", title:"Peer Support — HTML/CSS",      note:"Supportive in solving doubts; helped teammates with HTML/CSS",          date:"Aug 2023", image:asset("/award-7.png") },
  { id:"ia8", title:"Technical Documentation Lead", note:"Prepared artifacts and recordings on Kongara Project",                  date:"Nov 2023", image:asset("/award-8.png") },
  { id:"ia9", title:"Quick Learner & Excellence",   note:"Recognised as a quick learner and excellent team member",              date:"Nov 2023", image:asset("/award-9.png") },
];

function Lightbox({ images, startIndex, onClose }) {
  const [cur, setCur] = useState(startIndex);
  const prev = () => setCur(c => (c - 1 + images.length) % images.length);
  const next = () => setCur(c => (c + 1) % images.length);

  return (
    <motion.div
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      onClick={onClose}
      style={{ position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,0.96)",
        backdropFilter:"blur(12px)",display:"grid",placeItems:"center",padding:16 }}>
      <button data-hover onClick={onClose}
        style={{ position:"absolute",top:20,right:20,padding:10,borderRadius:"50%",
          background:"rgba(255,255,255,0.1)",border:"none",color:"#fff",cursor:"none",zIndex:10 }}>
        <X size={20}/>
      </button>
      {images.length > 1 && <>
        <button data-hover onClick={e=>{e.stopPropagation();prev();}}
          style={{ position:"absolute",left:16,top:"50%",transform:"translateY(-50%)",
            padding:12,borderRadius:"50%",background:"rgba(255,255,255,0.08)",
            border:"none",color:"#fff",cursor:"none",zIndex:10 }}>
          <ChevronLeft size={22}/>
        </button>
        <button data-hover onClick={e=>{e.stopPropagation();next();}}
          style={{ position:"absolute",right:16,top:"50%",transform:"translateY(-50%)",
            padding:12,borderRadius:"50%",background:"rgba(255,255,255,0.08)",
            border:"none",color:"#fff",cursor:"none",zIndex:10 }}>
          <ChevronRight size={22}/>
        </button>
      </>}
      <motion.img key={cur}
        initial={{ opacity:0,scale:0.93 }} animate={{ opacity:1,scale:1 }}
        transition={{ duration:0.2 }}
        src={images[cur]} alt="Certificate"
        onClick={e=>e.stopPropagation()}
        style={{ maxHeight:"90vh",maxWidth:"min(92vw,960px)",
          objectFit:"contain",borderRadius:12,boxShadow:"0 32px 80px rgba(0,0,0,0.8)" }}/>
      {images.length > 1 && (
        <div style={{ position:"absolute",bottom:20,display:"flex",gap:8 }}>
          {images.map((_,i)=>(
            <button key={i} onClick={e=>{e.stopPropagation();setCur(i);}}
              style={{ height:6,width:i===cur?24:6,borderRadius:3,border:"none",cursor:"none",
                background:i===cur?"#6366F1":"rgba(255,255,255,0.25)",transition:"all 0.2s" }}/>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function Awards() {
  const [lb, setLb] = useState(null);

  return (
    <>
      <AnimatePresence>{lb && <Lightbox images={lb.images} startIndex={lb.i} onClose={()=>setLb(null)}/>}</AnimatePresence>

      <section id="awards" style={{ padding:"100px 40px",maxWidth:1280,margin:"0 auto" }} className="section-pad">
        <motion.div initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }}
          viewport={{ once:true }} style={{ marginBottom:80 }}>
          <p style={lbl}>Recognition & Achievements</p>
          <h2 style={hdg}>Awards & <em style={{ fontStyle:"normal",color:"rgba(255,255,255,0.3)" }}>Skill Tags</em></h2>
          <p style={{ fontFamily:"'Inter',sans-serif",fontSize:15,color:"rgba(255,255,255,0.35)",
            maxWidth:520,lineHeight:1.7,marginTop:16 }}>
            Recognitions from Infosys EAS SAP spanning skill certifications, peer nominations, and quarterly RISE awards.
          </p>
        </motion.div>

        {/* ── Skill Tags ── */}
        <SectionHeader icon={<Medal size={16}/>} color="#6366F1" label="Infosys Skill Tags"/>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",
          gap:16,marginBottom:72 }} className="awards-grid">
          {SKILL_TAGS.map((t,i)=>(
            <motion.div key={t.id}
              initial={{ opacity:0,y:24 }} whileInView={{ opacity:1,y:0 }}
              viewport={{ once:true,margin:"-40px" }} transition={{ delay:i*0.15,duration:0.7 }}
              onClick={()=>setLb({ images:[t.image],i:0 })} data-hover
              style={{ position:"relative",borderRadius:20,border:"1px solid rgba(255,255,255,0.06)",
                background:"rgba(255,255,255,0.02)",padding:20,cursor:"none",overflow:"hidden",
                transition:"all 0.3s" }}
              whileHover={{ background:"rgba(255,255,255,0.04)",borderColor:"rgba(99,102,241,0.3)" }}>
              <div style={{ position:"absolute",top:0,left:0,right:0,height:1,
                background:"linear-gradient(90deg,#6366F1,#22D3EE)" }}/>
              <div style={{ display:"flex",alignItems:"center",gap:16 }}>
                <div style={{ width:72,height:52,borderRadius:10,overflow:"hidden",
                  border:"1px solid rgba(255,255,255,0.1)",flexShrink:0 }}>
                  <img src={t.image} alt={t.title}
                    style={{ width:"100%",height:"100%",objectFit:"cover" }}/>
                </div>
                <div>
                  <div style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:10,
                    letterSpacing:"0.2em",textTransform:"uppercase",color:"#6366F1",marginBottom:6 }}>
                    {t.issuer}
                  </div>
                  <h4 style={{ fontFamily:"'Outfit',sans-serif",fontSize:14,fontWeight:600,
                    color:"rgba(255,255,255,0.85)",lineHeight:1.35 }}>{t.title}</h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── RISE Awards ── */}
        <SectionHeader icon={<Trophy size={16}/>} color="#D8B4FE" label="EASSAP RISE Awards"/>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",
          gap:16,marginBottom:72 }} className="rise-grid">
          {RISE.map((a,i)=>(
            <motion.div key={a.id}
              initial={{ opacity:0,y:24 }} whileInView={{ opacity:1,y:0 }}
              viewport={{ once:true,margin:"-40px" }} transition={{ delay:i*0.1,duration:0.7 }}
              onClick={()=>setLb({ images:[a.image],i:0 })} data-hover
              style={{ borderRadius:20,border:"1px solid rgba(255,255,255,0.06)",
                background:"rgba(255,255,255,0.02)",overflow:"hidden",cursor:"none",
                transition:"all 0.3s" }}
              whileHover={{ borderColor:"rgba(212,180,254,0.3)" }}>
              <div style={{ height:120,overflow:"hidden" }}>
                <img src={a.image} alt={a.title}
                  style={{ width:"100%",height:"100%",objectFit:"cover",objectPosition:"top",
                    transition:"transform 0.5s" }}
                  onMouseEnter={e=>e.target.style.transform="scale(1.06)"}
                  onMouseLeave={e=>e.target.style.transform="scale(1)"}/>
              </div>
              <div style={{ padding:16 }}>
                <div style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:10,
                  color:"rgba(255,255,255,0.25)",letterSpacing:"0.15em",marginBottom:4 }}>{a.period}</div>
                <h4 style={{ fontFamily:"'Outfit',sans-serif",fontSize:15,fontWeight:700,
                  color:"rgba(255,255,255,0.85)",marginBottom:2 }}>{a.title}</h4>
                <p style={{ fontFamily:"'Inter',sans-serif",fontSize:12,
                  color:"rgba(255,255,255,0.3)" }}>{a.category}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── INSTA Awards ── */}
        <SectionHeader icon={<Star size={16}/>} color="#22D3EE" label="Insta Awards — Peer Recognition (16 Consecutive)"/>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12 }} className="insta-grid">
          {INSTA.map((a,i)=>(
            <motion.div key={a.id}
              initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }}
              viewport={{ once:true,margin:"-20px" }} transition={{ delay:i*0.06,duration:0.6 }}
              onClick={()=>setLb({ images:INSTA.map(x=>x.image),i })} data-hover
              style={{ display:"flex",gap:14,borderRadius:16,border:"1px solid rgba(255,255,255,0.05)",
                background:"rgba(255,255,255,0.02)",padding:16,cursor:"none",transition:"all 0.3s" }}
              whileHover={{ background:"rgba(255,255,255,0.04)",borderColor:"rgba(34,211,238,0.25)" }}>
              <div style={{ width:60,height:44,borderRadius:8,overflow:"hidden",
                border:"1px solid rgba(255,255,255,0.08)",flexShrink:0 }}>
                <img src={a.image} alt={a.title}
                  style={{ width:"100%",height:"100%",objectFit:"cover",objectPosition:"top" }}/>
              </div>
              <div style={{ minWidth:0 }}>
                <div style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:10,
                  color:"rgba(34,211,238,0.6)",letterSpacing:"0.15em",marginBottom:4 }}>{a.date}</div>
                <h5 style={{ fontFamily:"'Outfit',sans-serif",fontSize:14,fontWeight:700,
                  color:"rgba(255,255,255,0.8)",marginBottom:4,lineHeight:1.2 }}>{a.title}</h5>
                <p style={{ fontFamily:"'Inter',sans-serif",fontSize:12,lineHeight:1.5,
                  color:"rgba(255,255,255,0.3)",
                  overflow:"hidden",display:"-webkit-box",
                  WebkitLineClamp:2,WebkitBoxOrient:"vertical" }}>{a.note}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}

function SectionHeader({ icon, color, label }) {
  return (
    <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:24 }}>
      <div style={{ padding:8,borderRadius:12,background:`${color}18`,color,display:"flex" }}>{icon}</div>
      <span style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:10,
        letterSpacing:"0.3em",textTransform:"uppercase",color:"rgba(255,255,255,0.35)" }}>{label}</span>
      <div style={{ flex:1,height:1,background:"rgba(255,255,255,0.05)" }}/>
    </div>
  );
}

const lbl={fontFamily:"'JetBrains Mono',monospace",fontSize:11,letterSpacing:"0.4em",textTransform:"uppercase",color:"#6366F1",marginBottom:16};
const hdg={fontFamily:"'Outfit',sans-serif",fontSize:"clamp(36px,5vw,64px)",fontWeight:700,color:"#fff",letterSpacing:"-2px",lineHeight:1.05};
