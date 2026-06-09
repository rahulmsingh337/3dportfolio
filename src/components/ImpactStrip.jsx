import { motion } from "motion/react";
import { Award, Shield, Briefcase } from "lucide-react";

const STATS = [
  { value:"16 Consecutive", label:"INSTA Peer Awards", icon:<Award size={22} color="#6366F1"/> },
  { value:"5×",             label:"Unit Rise Awards",  icon:<Award size={22} color="#22D3EE"/> },
  { value:"ABAP Cloud",     label:"SAP Certified",     icon:<Shield size={22} color="#6366F1"/> },
  { value:"5+ Years",       label:"SAP Consulting",    icon:<Briefcase size={22} color="#D8B4FE"/> },
];

export default function ImpactStrip() {
  return (
    <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 40px 80px" }}>
      <div style={{ position:"relative",overflow:"hidden",
        borderRadius:48,border:"1px solid rgba(255,255,255,0.05)",
        background:"rgba(255,255,255,0.01)",padding:"60px 40px",
        backdropFilter:"blur(24px)" }}>
        <div style={{ position:"absolute",inset:0,
          background:"linear-gradient(135deg,rgba(99,102,241,0.05),transparent)",
          pointerEvents:"none" }}/>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:32 }}>
          {STATS.map((s,i)=>(
            <motion.div key={s.label}
              initial={{ opacity:0, y:30 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ delay:i*0.15 }}
              style={{ display:"flex",flexDirection:"column",alignItems:"center",
                textAlign:"center",gap:0 }}>
              <div style={{ marginBottom:20,padding:20,borderRadius:28,
                background:"rgba(2,6,23,0.5)",border:"1px solid rgba(255,255,255,0.08)" }}>
                {s.icon}
              </div>
              <div style={{ fontFamily:"'Outfit',sans-serif",fontSize:"clamp(26px,3.5vw,40px)",
                fontWeight:700,color:"#fff",letterSpacing:"-1px",lineHeight:1 }}>
                {s.value}
              </div>
              <div style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:10,
                letterSpacing:"0.35em",textTransform:"uppercase",
                color:"rgba(255,255,255,0.3)",marginTop:10 }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
