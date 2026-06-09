import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { Mail, Phone, ExternalLink } from "lucide-react";

const SvgLinkedIn = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#0A66C2"/>
    <path d="M7 9.5H5v9h2v-9zM6 8.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5zM19 13.2c0-2.1-1.1-3.7-3-3.7-1 0-1.7.5-2 1.2V9.5h-2v9h2v-4.8c0-1.1.6-1.9 1.6-1.9 1 0 1.4.8 1.4 1.9v4.8h2V13.2z" fill="white"/>
  </svg>
);
const SvgGitHub = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#24292e"/>
    <path d="M12 3C7 3 3 7.1 3 12.3c0 4.1 2.6 7.6 6.2 8.8.5.1.6-.2.6-.4v-1.5c-2.6.6-3.1-1.2-3.1-1.2-.4-1.1-1-1.4-1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.8.8.1-.6.3-1.1.6-1.3-2.1-.2-4.3-1-4.3-4.6 0-1 .4-1.9 1-2.6-.1-.2-.4-1.2.1-2.5 0 0 .8-.3 2.7 1 .8-.2 1.6-.3 2.4-.3.8 0 1.6.1 2.4.3 1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.5.6.7 1 1.6 1 2.6 0 3.6-2.2 4.4-4.3 4.6.3.3.6.8.6 1.7v2.5c0 .2.1.5.6.4C18.4 19.9 21 16.4 21 12.3 21 7.1 17 3 12 3z" fill="white"/>
  </svg>
);
const SvgInstagram = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <defs>
      <radialGradient id="ig2" cx="30%" cy="107%" r="150%">
        <stop offset="0%" stopColor="#fdf497"/>
        <stop offset="5%" stopColor="#fdf497"/>
        <stop offset="45%" stopColor="#fd5949"/>
        <stop offset="60%" stopColor="#d6249f"/>
        <stop offset="90%" stopColor="#285AEB"/>
      </radialGradient>
    </defs>
    <rect width="24" height="24" rx="6" fill="url(#ig2)"/>
    <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.5" fill="none"/>
    <circle cx="17.5" cy="6.5" r="1.25" fill="white"/>
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="white" strokeWidth="1.5" fill="none"/>
  </svg>
);


const SOCIALS = [
  { label:"LinkedIn", href:"https://www.linkedin.com/in/rahul-singh-sap-abap/", icon:<SvgLinkedIn/> },
  { label:"GitHub",   href:"https://github.com/rahulmsingh337",           icon:<SvgGitHub/>   },
  { label:"Instagram", href:"https://www.instagram.com/squatile3375/",    icon:<SvgInstagram/> },
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
