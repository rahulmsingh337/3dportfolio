import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { gsap } from "gsap";
import { Mail, Phone, Download, MapPin } from "lucide-react";
import { asset } from "../utils/assetPath";

const ROLES = ["SAP ABAP Lead", "S/4HANA Expert", "Clean Core Dev", "Migration Lead"];

const SvgLinkedIn = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#0A66C2"/>
    <path d="M7 9.5H5v9h2v-9zM6 8.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5zM19 13.2c0-2.1-1.1-3.7-3-3.7-1 0-1.7.5-2 1.2V9.5h-2v9h2v-4.8c0-1.1.6-1.9 1.6-1.9 1 0 1.4.8 1.4 1.9v4.8h2V13.2z" fill="white"/>
  </svg>
);
const SvgGitHub = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#24292e"/>
    <path d="M12 3C7 3 3 7.1 3 12.3c0 4.1 2.6 7.6 6.2 8.8.5.1.6-.2.6-.4v-1.5c-2.6.6-3.1-1.2-3.1-1.2-.4-1.1-1-1.4-1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.8.8.1-.6.3-1.1.6-1.3-2.1-.2-4.3-1-4.3-4.6 0-1 .4-1.9 1-2.6-.1-.2-.4-1.2.1-2.5 0 0 .8-.3 2.7 1 .8-.2 1.6-.3 2.4-.3.8 0 1.6.1 2.4.3 1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.5.6.7 1 1.6 1 2.6 0 3.6-2.2 4.4-4.3 4.6.3.3.6.8.6 1.7v2.5c0 .2.1.5.6.4C18.4 19.9 21 16.4 21 12.3 21 7.1 17 3 12 3z" fill="white"/>
  </svg>
);
const SvgInstagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <defs>
      <radialGradient id="ig1" cx="30%" cy="107%" r="150%">
        <stop offset="0%" stopColor="#fdf497"/>
        <stop offset="45%" stopColor="#fd5949"/>
        <stop offset="60%" stopColor="#d6249f"/>
        <stop offset="90%" stopColor="#285AEB"/>
      </radialGradient>
    </defs>
    <rect width="24" height="24" rx="6" fill="url(#ig1)"/>
    <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.5" fill="none"/>
    <circle cx="17.5" cy="6.5" r="1.25" fill="white"/>
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="white" strokeWidth="1.5" fill="none"/>
  </svg>
);

// Orbiting tech tags around photo
const TAGS = [
  { label:"S/4HANA",  angle:0,   r:200, dur:18 },
  { label:"RAP",      angle:72,  r:220, dur:22 },
  { label:"CDS",      angle:144, r:195, dur:16 },
  { label:"OData",    angle:216, r:215, dur:20 },
  { label:"BTP",      angle:288, r:205, dur:24 },
];

// Split text into chars for animation
function SplitText({ text, delay = 0, style = {} }) {
  return (
    <span style={{ display: "inline-block", overflow: "hidden", ...style }}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0, skewY: 8 }}
          animate={{ y: "0%", opacity: 1, skewY: 0 }}
          transition={{ duration: 0.6, delay: delay + i * 0.04, ease: [0.22,1,0.36,1] }}
          style={{ display: "inline-block" }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const containerRef = useRef(null);
  const photoRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start","end end"] });
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.5], [1, 1, 0]);
  const y       = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  useEffect(() => {
    const t = setInterval(() => setRoleIdx(i => (i+1) % ROLES.length), 2500);
    return () => clearInterval(t);
  }, []);

  // 3D photo tilt on mouse move
  useEffect(() => {
    const el = photoRef.current;
    if (!el) return;
    const onMove = e => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width/2;
      const cy = rect.top  + rect.height/2;
      const rx = ((e.clientY - cy) / rect.height) * 18;
      const ry = ((e.clientX - cx) / rect.width ) * -18;
      el.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.04)`;
    };
    const onLeave = () => {
      el.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove",onMove); el.removeEventListener("mouseleave",onLeave); };
  }, []);

  return (
    <section ref={containerRef} id="hero" style={{ position:"relative", minHeight:"100vh" }}>
      <div style={{
        position:"sticky", top:0, height:"100vh", overflow:"hidden",
        display:"flex", alignItems:"center", justifyContent:"center",
      }}>
        <motion.div style={{ opacity, y, width:"100%", maxWidth:1280,
          padding:"80px 40px 0", display:"grid",
          gridTemplateColumns:"1fr 1fr", gap:72, alignItems:"center" }}
          className="hero-grid">

          {/* ── LEFT ── */}
          <div>
            {/* Available pill */}
            <motion.div
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
              transition={{ delay:0.2 }}
              style={{ display:"inline-flex", alignItems:"center", gap:10,
                fontSize:11, letterSpacing:"0.35em", textTransform:"uppercase",
                color:"rgba(255,255,255,0.4)", marginBottom:28,
                padding:"8px 16px", borderRadius:100,
                background:"rgba(99,102,241,0.08)",
                border:"1px solid rgba(99,102,241,0.2)",
              }}>
              <span className="animate-pulse-dot" style={{
                width:7, height:7, borderRadius:"50%",
                background:"#3dd68c", boxShadow:"0 0 10px #3dd68c", display:"inline-block",
              }}/>
              Available for opportunities
            </motion.div>

            {/* Name — split char animation */}
            <h1 style={{
              fontFamily:"'Outfit',sans-serif",
              fontSize:"clamp(52px,7.5vw,96px)",
              lineHeight:0.93, letterSpacing:"-3px", color:"#fff",
              marginBottom:16, overflow:"hidden",
            }}>
              <div style={{ display:"block" }}>
                <SplitText text="Rahul" delay={0.3}/>
              </div>
              <div style={{ display:"block" }}>
                <SplitText text="Singh" delay={0.55}/>
              </div>
            </h1>

            {/* Role */}
            <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1 }}
              style={{ fontSize:"clamp(14px,1.8vw,18px)", color:"rgba(255,255,255,0.35)", marginBottom:10 }}>
              <span key={roleIdx} className="animate-role-fade-in"
                style={{ color:"#6366F1", fontFamily:"'Fraunces',serif",
                  fontStyle:"italic", display:"inline-block" }}>
                {ROLES[roleIdx]}
              </span>
              {" "}· Accenture · Noida
            </motion.p>

            {/* Location badge */}
            <motion.div initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }}
              transition={{ delay:1.1 }}
              style={{ display:"inline-flex", alignItems:"center", gap:6,
                background:"rgba(255,255,255,0.04)",
                border:"1px solid rgba(255,255,255,0.07)",
                borderRadius:100, padding:"6px 14px", marginBottom:28 }}>
              <MapPin size={11} color="#6366F1"/>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10,
                letterSpacing:"0.2em", textTransform:"uppercase",
                color:"rgba(255,255,255,0.3)" }}>
                Noida, Uttar Pradesh, India
              </span>
            </motion.div>

            {/* Description */}
            <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
              transition={{ delay:1.2 }}
              style={{ fontSize:15, lineHeight:1.75, color:"rgba(255,255,255,0.4)",
                maxWidth:440, marginBottom:36 }}>
              5+ years engineering enterprise SAP systems at Accenture & Infosys.
              S/4HANA migration · HANA remediation · Clean Core · RAP · OData · ABAP Cloud.
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
              transition={{ delay:1.3 }}
              style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:36 }}>
              <a href="#projects" data-hover className="mag-glow" style={btnSolid}
                onMouseEnter={e=>Object.assign(e.currentTarget.style,btnSolidH)}
                onMouseLeave={e=>Object.assign(e.currentTarget.style,btnSolid)}>
                View Projects ↓
              </a>
              <a href={asset("/resume.pdf")} download data-hover className="mag-glow" style={btnOutline}
                onMouseEnter={e=>Object.assign(e.currentTarget.style,btnOutlineH)}
                onMouseLeave={e=>Object.assign(e.currentTarget.style,btnOutline)}>
                <Download size={13}/> Resume
              </a>
            </motion.div>

            {/* Socials */}
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
              transition={{ delay:1.5 }}
              style={{ display:"flex", gap:16, alignItems:"center" }}>
              {[
                { href:"https://www.linkedin.com/in/rahul-singh-sap-abap/", icon:<SvgLinkedIn/>, label:"LinkedIn" },
                { href:"https://github.com/rahulmsingh337",                  icon:<SvgGitHub/>,   label:"GitHub"   },
                { href:"https://www.instagram.com/squatile3375/",            icon:<SvgInstagram/>,label:"Instagram" },
                { href:"mailto:rs58598@gmail.com",                           icon:<Mail size={18}/>, label:"Email" },
              ].map(s=>(
                <motion.a key={s.label} href={s.href}
                  target={s.label!=="Email"?"_blank":undefined}
                  rel="noreferrer" data-hover title={s.label}
                  whileHover={{ scale:1.25, rotate: 5 }}
                  whileTap={{ scale:0.9 }}
                  style={{ color:"rgba(255,255,255,0.25)", transition:"color 0.2s", cursor:"none" }}
                  onMouseEnter={e=>e.currentTarget.style.color="#6366F1"}
                  onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.25)"}>
                  {s.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT — 3D Photo ── */}
          <div style={{ display:"flex", justifyContent:"center" }} className="hero-photo-col">
            <div style={{ position:"relative", width:380, height:480 }}>
              {/* Orbiting tags */}
              {TAGS.map((tag,i) => (
                <div key={tag.label} style={{
                  position:"absolute",
                  top:"50%", left:"50%",
                  width:0, height:0,
                  zIndex:10,
                  animation:`orbit ${tag.dur}s linear infinite`,
                  "--start-angle": `${tag.angle}deg`,
                  "--radius": `${tag.r * 0.45}px`,
                }}>
                  <div style={{
                    position:"absolute",
                    transform:"translate(-50%,-50%)",
                    fontFamily:"'JetBrains Mono',monospace",
                    fontSize:10, fontWeight:700,
                    padding:"4px 10px", borderRadius:100,
                    background:"rgba(2,6,23,0.9)",
                    border:`1px solid rgba(99,102,241,${0.3 + i*0.1})`,
                    color:`hsl(${230+i*15},70%,70%)`,
                    letterSpacing:"0.08em",
                    whiteSpace:"nowrap",
                    backdropFilter:"blur(8px)",
                    boxShadow:`0 0 12px rgba(99,102,241,0.3)`,
                  }}>
                    {tag.label}
                  </div>
                </div>
              ))}

              {/* Photo with 3D tilt */}
              <div ref={photoRef} style={{
                width:"100%", height:"100%",
                borderRadius:24, overflow:"hidden",
                transition:"transform 0.15s ease",
                willChange:"transform",
              }}>
                {/* glow border */}
                <div style={{
                  position:"absolute", inset:-2, borderRadius:26, zIndex:-1,
                  background:"linear-gradient(135deg,#6366F1,#22D3EE,#D8B4FE,#6366F1)",
                  backgroundSize:"300% 300%",
                  animation:"gradient-shift 4s ease infinite",
                }}/>
                <img src={asset("/rahul.jpg")} alt="Rahul Singh"
                  style={{ width:"100%", height:"100%",
                    objectFit:"cover", objectPosition:"center 15%",
                    borderRadius:24, display:"block" }}
                />
                {/* holographic shimmer overlay */}
                <div style={{
                  position:"absolute", inset:0, borderRadius:24,
                  background:"linear-gradient(135deg,rgba(99,102,241,0.15),transparent 40%,rgba(34,211,238,0.1) 60%,transparent)",
                  pointerEvents:"none",
                }}/>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <div style={{
          position:"absolute", bottom:36, left:"50%",
          transform:"translateX(-50%)",
          display:"flex", flexDirection:"column", alignItems:"center", gap:8,
        }}>
          <motion.span
            animate={{ opacity:[0.3,0.7,0.3] }}
            transition={{ duration:2, repeat:Infinity }}
            style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10,
              letterSpacing:"0.25em", color:"rgba(255,255,255,0.3)",
              textTransform:"uppercase" }}>
            Scroll
          </motion.span>
          <div style={{ width:1, height:40,
            background:"rgba(255,255,255,0.08)",
            position:"relative", overflow:"hidden" }}>
            <div className="animate-scroll-down" style={{
              position:"absolute", inset:0,
              background:"linear-gradient(to bottom,transparent,#6366F1)",
            }}/>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          .hero-grid{grid-template-columns:1fr!important;gap:48px!important;padding-top:80px!important;}
          .hero-photo-col{order:-1;}
        }
      `}</style>
    </section>
  );
}

const base={display:"inline-flex",alignItems:"center",gap:8,fontFamily:"'Inter',sans-serif",
  fontSize:13,fontWeight:700,padding:"13px 26px",borderRadius:100,textDecoration:"none",
  cursor:"none",transition:"all 0.3s",letterSpacing:"0.02em"};
const btnSolid   ={...base,background:"#fff",color:"#020617",border:"1px solid transparent"};
const btnSolidH  ={...btnSolid,background:"linear-gradient(135deg,#6366F1,#22D3EE)",color:"#fff",transform:"scale(1.05)"};
const btnOutline ={...base,background:"transparent",color:"rgba(255,255,255,0.7)",border:"1px solid rgba(255,255,255,0.12)"};
const btnOutlineH={...btnOutline,borderColor:"#6366F1",color:"#6366F1",transform:"scale(1.05)"};
