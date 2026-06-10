import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Award, Shield, Briefcase, TrendingUp } from "lucide-react";

function AnimatedNumber({ value, suffix = "", prefix = "" }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const num = parseFloat(value);
        const dur = 1800;
        const start = performance.now();
        const tick = now => {
          const p = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 4);
          setDisplay(+(num * ease).toFixed(num % 1 ? 1 : 0));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.unobserve(ref.current);
      }
    }, { threshold: 0.5 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
}

const STATS = [
  { value:"5",  suffix:"+", prefix:"",   label:"Years Enterprise SAP",    icon:<Briefcase size={22}/>, color:"#6366F1" },
  { value:"60", suffix:"+", prefix:"",   label:"ABAP Objects Remediated", icon:<Shield size={22}/>,    color:"#22D3EE" },
  { value:"50", suffix:"K+",prefix:"€",  label:"Client Cost Avoided",     icon:<TrendingUp size={22}/>,color:"#D8B4FE" },
  { value:"16", suffix:"×", prefix:"",   label:"Consecutive INSTA Awards",icon:<Award size={22}/>,     color:"#3dd68c" },
];

export default function ImpactStrip() {
  return (
    <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 40px 100px" }} className="section-pad">
      <div style={{
        position:"relative", overflow:"hidden",
        borderRadius:32, padding:"60px 40px",
        background:"rgba(255,255,255,0.015)",
        border:"1px solid rgba(255,255,255,0.06)",
        backdropFilter:"blur(24px)",
      }}>
        {/* Animated gradient border top */}
        <div style={{
          position:"absolute", top:0, left:0, right:0, height:1,
          background:"linear-gradient(90deg,transparent,#6366F1,#22D3EE,#D8B4FE,transparent)",
          backgroundSize:"200% 100%",
          animation:"border-flow 3s linear infinite",
        }}/>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:32 }} className="impact-grid">
          {STATS.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity:0, y:30 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ delay:i*0.12, duration:0.7 }}
              whileHover={{ scale:1.05 }}
              style={{ display:"flex", flexDirection:"column", alignItems:"center",
                textAlign:"center", gap:0, cursor:"default" }}>
              <motion.div
                whileHover={{ rotate:360 }}
                transition={{ duration:0.6 }}
                style={{ marginBottom:20, padding:20, borderRadius:28,
                  background:"rgba(2,6,23,0.6)",
                  border:`1px solid ${s.color}30`,
                  color:s.color,
                  boxShadow:`0 0 20px ${s.color}20`,
                }}>
                {s.icon}
              </motion.div>
              <div style={{ fontFamily:"'Outfit',sans-serif",
                fontSize:"clamp(32px,4vw,48px)", fontWeight:800,
                letterSpacing:"-2px", lineHeight:1,
                background:`linear-gradient(135deg,${s.color},#fff)`,
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                <AnimatedNumber value={s.value} suffix={s.suffix} prefix={s.prefix}/>
              </div>
              <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10,
                letterSpacing:"0.3em", textTransform:"uppercase",
                color:"rgba(255,255,255,0.3)", marginTop:10 }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Corner glows */}
        <div style={{ position:"absolute", top:-40, right:-40, width:200, height:200,
          background:"rgba(99,102,241,0.06)", filter:"blur(40px)", borderRadius:"50%", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:-40, left:-40, width:200, height:200,
          background:"rgba(34,211,238,0.05)", filter:"blur(40px)", borderRadius:"50%", pointerEvents:"none" }}/>
      </div>
    </div>
  );
}
