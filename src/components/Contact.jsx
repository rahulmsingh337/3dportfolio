import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { Mail, Phone, ExternalLink } from "lucide-react";

const SvgLinkedIn = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const SvgGitHub = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);
const SvgGlobe = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);


const SOCIALS = [
  { label:"LinkedIn", href:"https://www.linkedin.com/in/rahulmsingh337/", icon:<SvgLinkedIn/> },
  { label:"GitHub",   href:"https://github.com/rahulmsingh337",           icon:<SvgGitHub/>   },
  { label:"Website",  href:"https://rahulmsingh337.github.io/",           icon:<SvgGlobe/>    },
  { label:"WhatsApp", href:"https://wa.me/918989805836",                  icon:<Phone size={17}/> },
];

export default function Contact() {
  const marqueeRef = useRef(null);

  useEffect(() => {
    gsap.to(marqueeRef.current, { xPercent:-50, duration:40, ease:"none", repeat:-1 });
  }, []);

  return (
    <section id="contact" style={{ borderTop:"1px solid rgba(255,255,255,0.05)",
      position:"relative",overflow:"hidden" }}>

      {/* Marquee */}
      <div style={{ overflow:"hidden",padding:"18px 0",
        borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
        <div ref={marqueeRef} style={{ display:"flex",width:"max-content" }}>
          {Array(16).fill(null).map((_,i)=>(
            <span key={i} style={{ fontFamily:"'Fraunces',serif",fontStyle:"italic",
              fontSize:"clamp(32px,5vw,60px)",fontWeight:300,color:"#fff",opacity:0.04,
              padding:"0 40px",whiteSpace:"nowrap" }}>
              BUILDING THE FUTURE <span style={{ color:"#6366F1",opacity:0.6 }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* bg glow */}
      <div style={{ position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",
        width:"70%",height:"55%",pointerEvents:"none",
        background:"radial-gradient(ellipse at 50% 100%,rgba(99,102,241,0.08) 0%,transparent 70%)" }}/>

      <div style={{ position:"relative",zIndex:1,maxWidth:1280,margin:"0 auto",
        padding:"100px 40px 64px",textAlign:"center" }}>

        <motion.div initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }}
          viewport={{ once:true }}>
          <p style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:11,
            letterSpacing:"0.35em",textTransform:"uppercase",
            color:"rgba(255,255,255,0.25)",marginBottom:32 }}>Let's Connect</p>

          <h2 style={{ fontFamily:"'Outfit',sans-serif",
            fontSize:"clamp(48px,9vw,110px)",fontWeight:800,
            lineHeight:0.93,letterSpacing:"-4px",color:"#fff",marginBottom:52 }}>
            Let's build<br/>something.
          </h2>
        </motion.div>

        {/* CTA buttons */}
        <motion.div initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }}
          viewport={{ once:true }} transition={{ delay:0.15 }}
          style={{ display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap",marginBottom:64 }}>
          <a href="mailto:rs58598@gmail.com" data-hover style={btnPrimary}
            onMouseEnter={e=>{e.currentTarget.style.background="#6366F1";e.currentTarget.style.color="#fff";}}
            onMouseLeave={e=>{e.currentTarget.style.background="#fff";e.currentTarget.style.color="#020617";}}>
            <Mail size={14}/> Email me ↗
          </a>
          {SOCIALS.map(s=>(
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" data-hover
              style={btnGhost}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="#6366F1";e.currentTarget.style.color="#6366F1";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.08)";e.currentTarget.style.color="rgba(255,255,255,0.4)";}}>
              {s.icon}{s.label}
            </a>
          ))}
        </motion.div>

        {/* Footer bar */}
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",
          paddingTop:32,borderTop:"1px solid rgba(255,255,255,0.05)",
          fontSize:12,color:"rgba(255,255,255,0.25)",flexWrap:"wrap",gap:16,
          fontFamily:"'JetBrains Mono',monospace",letterSpacing:"0.08em" }}>
          <div>Rahul Singh — SAP ABAP Lead · Noida, India</div>
          <div style={{ display:"flex",alignItems:"center",gap:8 }}>
            <span className="animate-pulse-dot" style={{ width:7,height:7,borderRadius:"50%",
              background:"#3dd68c",boxShadow:"0 0 8px #3dd68c",display:"inline-block" }}/>
            Available for opportunities
          </div>
          <div>+91-8989805836</div>
        </div>
      </div>
    </section>
  );
}

const base2 = { display:"inline-flex",alignItems:"center",gap:8,fontFamily:"'Inter',sans-serif",
  fontSize:12,fontWeight:700,padding:"13px 24px",borderRadius:100,
  textDecoration:"none",cursor:"none",transition:"all 0.3s",
  letterSpacing:"0.05em",textTransform:"uppercase" };
const btnPrimary = { ...base2, background:"#fff",color:"#020617",border:"1px solid transparent" };
const btnGhost   = { ...base2, background:"transparent",color:"rgba(255,255,255,0.4)",
  border:"1px solid rgba(255,255,255,0.08)" };
