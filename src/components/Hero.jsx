import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { gsap } from "gsap";
import { Mail, Phone, Download, MapPin, ExternalLink } from "lucide-react";
import { asset } from "../utils/assetPath";

const SvgLinkedIn = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const SvgGitHub = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
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
          padding:"0 40px", display:"grid", gridTemplateColumns:"1fr 1fr",
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
                { href:"https://www.linkedin.com/in/rahulmsingh337/", icon:<SvgLinkedIn/>, label:"LinkedIn" },
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
              {/* cert badge */}
              <div style={{ position:"absolute",bottom:20,left:-28,
                background:"rgba(15,23,42,0.94)",border:"1px solid rgba(255,255,255,0.08)",
                borderRadius:16,padding:"14px 18px",display:"flex",alignItems:"center",gap:12,
                backdropFilter:"blur(16px)" }}>
                <div style={{ width:38,height:38,borderRadius:10,flexShrink:0,overflow:"hidden" }}>
                  <img src={asset("/cert-sap-tech.png")} alt="cert"
                    style={{ width:"100%",height:"100%",objectFit:"cover" }}/>
                </div>
                <div>
                  <div style={{ fontSize:12,fontWeight:700,color:"#fff" }}>SAP Certified</div>
                  <div style={{ fontSize:11,color:"rgba(255,255,255,0.35)",marginTop:2 }}>ABAP Cloud Developer</div>
                </div>
              </div>
              {/* role tag */}
              <div style={{ position:"absolute",top:28,right:-24,
                background:"rgba(15,23,42,0.94)",border:"1px solid rgba(99,102,241,0.3)",
                borderRadius:100,padding:"8px 16px",
                fontFamily:"'JetBrains Mono',monospace",fontSize:11,fontWeight:700,
                color:"#6366F1",backdropFilter:"blur(12px)",letterSpacing:"0.04em" }}>
                Accenture · Lead
              </div>
              {/* github banner floating bottom-right */}
              <div style={{ position:"absolute",bottom:-24,right:-28,
                width:160,borderRadius:12,overflow:"hidden",
                border:"1px solid rgba(255,255,255,0.07)",
                boxShadow:"0 8px 32px rgba(0,0,0,0.5)" }}>
                <img src={asset("/github-banner.png")} alt="github banner"
                  style={{ width:"100%",display:"block" }}
                  onError={e=>e.target.style.display="none"}/>
              </div>
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
          .hero-grid{grid-template-columns:1fr!important;gap:48px!important;padding-top:100px!important;}
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
