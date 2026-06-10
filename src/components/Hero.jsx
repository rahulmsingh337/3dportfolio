import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { gsap } from "gsap";
import { Mail, Phone, Download, MapPin, ExternalLink } from "lucide-react";
import { asset } from "../utils/assetPath";

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
        <stop offset="5%" stopColor="#fdf497"/>
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


const ROLES = ["SAP ABAP Lead", "S/4HANA Expert", "ABAP Cloud Dev", "Migration Lead"];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const containerRef = useRef(null);
  const nameRef  = useRef(null);
  const blurRefs = useRef([]);

  // scroll-driven opacity for initial section
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start","end end"] });
  const initialOpacity = useTransform(scrollYProgress, [0, 0.35, 0.45], [1, 1, 0]);

  useEffect(() => {
    const tl = gsap.timeline({ ease:"power3.out", delay:0.1 });
    tl.fromTo(nameRef.current, { opacity:0, y:60 }, { opacity:1, y:0, duration:1.3 });
    tl.fromTo(blurRefs.current,
      { opacity:0, filter:"blur(14px)", y:24 },
      { opacity:1, filter:"blur(0px)", y:0, duration:1, stagger:0.1 }, "-=0.9");
  }, []);

  useEffect(() => {
    const t = setInterval(() => setRoleIdx(i => (i + 1) % ROLES.length), 2500);
    return () => clearInterval(t);
  }, []);

  const addBlur = el => { if (el && !blurRefs.current.includes(el)) blurRefs.current.push(el); };

  return (
    <section ref={containerRef} id="hero" style={{ position:"relative", minHeight:"100vh" }}>
      {/* sticky wrapper */}
      <div style={{ position:"sticky", top:0, height:"100vh", overflow:"hidden",
        display:"flex", alignItems:"center", justifyContent:"center" }}>

        <motion.div style={{ opacity: initialOpacity, width:"100%", maxWidth:1280,
          padding:"80px 40px 0", display:"grid", gridTemplateColumns:"1fr 1fr",
          gap:72, alignItems:"center" }} className="hero-grid">

          {/* ── LEFT ── */}
          <div>
            {/* Available pill */}
            <div ref={addBlur} style={{ display:"inline-flex",alignItems:"center",gap:10,
              fontSize:11,letterSpacing:"0.35em",textTransform:"uppercase",
              color:"rgba(255,255,255,0.35)",marginBottom:28 }}>
              <span className="animate-pulse-dot" style={{
                width:7,height:7,borderRadius:"50%",
                background:"#3dd68c",boxShadow:"0 0 10px #3dd68c",display:"inline-block"
              }}/>
              Available for opportunities
            </div>

            {/* Name */}
            <h1 ref={nameRef} style={{
              fontFamily:"'Outfit',sans-serif",
              fontSize:"clamp(52px,7.5vw,96px)",
              lineHeight:0.93,letterSpacing:"-3px",color:"#fff",
              marginBottom:16,opacity:0,
            }}>
              Rahul<br/>Singh
            </h1>

            {/* Role line */}
            <p ref={addBlur} style={{ fontSize:"clamp(14px,1.8vw,18px)",
              color:"rgba(255,255,255,0.35)",marginBottom:10 }}>
              <span key={roleIdx} className="animate-role-fade-in"
                style={{ color:"#6366F1",fontFamily:"'Fraunces',serif",fontStyle:"italic",
                  display:"inline-block" }}>
                {ROLES[roleIdx]}
              </span>
              {" "}· Accenture · Noida
            </p>

            {/* Location */}
            <div ref={addBlur} style={{ display:"inline-flex",alignItems:"center",gap:6,
              background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",
              borderRadius:100,padding:"6px 14px",marginBottom:28 }}>
              <MapPin size={11} color="#6366F1"/>
              <span style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:10,
                letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(255,255,255,0.3)" }}>
                Noida, Uttar Pradesh, India
              </span>
            </div>

            {/* Description */}
            <p ref={addBlur} style={{ fontSize:15,lineHeight:1.75,
              color:"rgba(255,255,255,0.4)",maxWidth:440,marginBottom:36 }}>
              5+ years engineering enterprise SAP systems at Accenture & Infosys.
              S/4HANA migration · HANA remediation · CDS Views · RAP · OData · ABAP Cloud.
            </p>

            {/* CTAs */}
            <div ref={addBlur} style={{ display:"flex",gap:12,flexWrap:"wrap",marginBottom:36 }}>
              <a href="#projects" data-hover style={btnSolid}
                onMouseEnter={e=>Object.assign(e.currentTarget.style,btnSolidHov)}
                onMouseLeave={e=>Object.assign(e.currentTarget.style,btnSolid)}>
                View Projects ↓
              </a>
              <a href={asset("/resume.pdf")} download data-hover style={btnOutline}
                onMouseEnter={e=>Object.assign(e.currentTarget.style,btnOutlineHov)}
                onMouseLeave={e=>Object.assign(e.currentTarget.style,btnOutline)}>
                <Download size={13}/> Resume
              </a>
            </div>

            {/* Socials */}
            <div ref={addBlur} style={{ display:"flex",gap:20,alignItems:"center" }}>
              {[
                { href:"https://www.linkedin.com/in/rahul-singh-sap-abap/", icon:<SvgLinkedIn/>, label:"LinkedIn" },
                { href:"https://github.com/rahulmsingh337",            icon:<SvgGitHub/>,   label:"GitHub"   },
                { href:"mailto:rs58598@gmail.com",                     icon:<Mail size={18}/>,     label:"Email"    },
                { href:"https://wa.me/918989805836",                   icon:<Phone size={18}/>,    label:"WhatsApp" },
              ].map(s=>(
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" data-hover
                  title={s.label}
                  style={{ color:"rgba(255,255,255,0.25)",transition:"color 0.2s",cursor:"none" }}
                  onMouseEnter={e=>e.currentTarget.style.color="#6366F1"}
                  onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.25)"}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── RIGHT — Photo ── */}
          <div style={{ display:"flex",justifyContent:"center" }} className="hero-photo-col">
            <div className="animate-float" style={{ position:"relative",width:360,height:460 }}>
              {/* outer rings */}
              <div style={{ position:"absolute",inset:-24,
                border:"1px solid rgba(99,102,241,0.15)",
                borderRadius:"200px 200px 160px 160px" }}/>
              <div style={{ position:"absolute",inset:-48,
                border:"1px solid rgba(99,102,241,0.06)",
                borderRadius:"220px 220px 180px 180px" }}/>
              {/* photo */}
              <img src={asset("/rahul.jpg")} alt="Rahul Singh"
                className="photo-glow"
                style={{ width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",
                  borderRadius:"180px 180px 140px 140px",
                  filter:"grayscale(10%) contrast(1.05) brightness(0.95)" }}
                onError={e=>{ e.target.style.display="none";
                  e.target.parentElement.style.background="#0F172A";
                  e.target.parentElement.style.borderRadius="180px 180px 140px 140px"; }}
              />



            </div>
          </div>
        </motion.div>

        {/* scroll indicator */}
        <div style={{ position:"absolute",bottom:36,left:"50%",transform:"translateX(-50%)",
          display:"flex",flexDirection:"column",alignItems:"center",gap:8 }}>
          <span style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:10,
            letterSpacing:"0.25em",color:"rgba(255,255,255,0.2)",textTransform:"uppercase" }}>
            Scroll
          </span>
          <div style={{ width:1,height:40,background:"rgba(255,255,255,0.08)",position:"relative",overflow:"hidden" }}>
            <div className="animate-scroll-down"
              style={{ position:"absolute",inset:0,
                background:"linear-gradient(to bottom,transparent,#6366F1)" }}/>
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

const base = { display:"inline-flex",alignItems:"center",gap:8,fontFamily:"'Inter',sans-serif",
  fontSize:13,fontWeight:700,padding:"13px 26px",borderRadius:100,
  textDecoration:"none",cursor:"none",transition:"all 0.3s",letterSpacing:"0.02em" };
const btnSolid    = { ...base, background:"#fff",color:"#020617",border:"1px solid transparent" };
const btnSolidHov = { ...btnSolid, background:"#6366F1",color:"#fff",transform:"scale(1.04)" };
const btnOutline  = { ...base, background:"transparent",color:"rgba(255,255,255,0.7)",border:"1px solid rgba(255,255,255,0.12)" };
const btnOutlineHov={ ...btnOutline, borderColor:"#6366F1",color:"#6366F1",transform:"scale(1.04)" };
