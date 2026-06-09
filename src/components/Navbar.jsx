import { useState, useEffect } from "react";

const LINKS = [
  { label:"Home",       href:"#hero"       },
  { label:"Skills",     href:"#skills"     },
  { label:"Experience", href:"#experience" },
  { label:"Projects",   href:"#projects"   },
  { label:"Awards",     href:"#awards"     },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState("hero");

  useEffect(() => {
    const ids = ["hero","skills","experience","projects","awards","contact"];
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && window.scrollY >= el.offsetTop - 200) { setActive(ids[i]); break; }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:500,
      display:"flex",justifyContent:"center",padding:"20px 16px" }}>
      <div style={{
        display:"inline-flex",alignItems:"center",gap:4,
        background:"rgba(2,6,23,0.88)",backdropFilter:"blur(24px)",
        border:"1px solid rgba(255,255,255,0.07)",borderRadius:100,
        padding:"6px 8px",
        boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.6),0 0 0 1px rgba(99,102,241,0.15)" : "none",
        transition:"box-shadow 0.3s",
      }}>
        {/* Logo */}
        <div data-hover style={{
          width:36,height:36,borderRadius:"50%",background:"#0F172A",
          display:"flex",alignItems:"center",justifyContent:"center",
          fontFamily:"'Fraunces',serif",fontStyle:"italic",fontSize:13,
          color:"#fff",cursor:"none",position:"relative",flexShrink:0,
        }}>
          <div style={{ position:"absolute",inset:-1.5,
            background:"linear-gradient(135deg,#6366F1,#22D3EE)",
            borderRadius:"50%",zIndex:-1 }} />
          RS
        </div>

        <div style={{ width:1,height:20,background:"rgba(255,255,255,0.08)",margin:"0 4px" }} />

        {LINKS.map(l => (
          <a key={l.href} href={l.href} data-hover
            style={{
              fontSize:12,fontWeight:500,fontFamily:"'Inter',sans-serif",
              color: active === l.href.slice(1) ? "#fff" : "rgba(255,255,255,0.4)",
              textDecoration:"none",padding:"6px 14px",borderRadius:100,
              background: active === l.href.slice(1) ? "rgba(99,102,241,0.18)" : "transparent",
              transition:"all 0.2s",cursor:"none",display:"none",
            }}
            className="nav-lnk"
          >{l.label}</a>
        ))}

        <div style={{ width:1,height:20,background:"rgba(255,255,255,0.08)",margin:"0 4px" }} />

        <a href="mailto:rs58598@gmail.com" data-hover
          style={{
            fontSize:12,fontWeight:700,fontFamily:"'Inter',sans-serif",
            color:"#020617",background:"#fff",
            padding:"6px 16px",borderRadius:100,textDecoration:"none",cursor:"none",
            transition:"all 0.2s",letterSpacing:"0.02em",
          }}
          onMouseEnter={e=>{e.currentTarget.style.background="#6366F1";e.currentTarget.style.color="#fff";}}
          onMouseLeave={e=>{e.currentTarget.style.background="#fff";e.currentTarget.style.color="#020617";}}
        >Say hi ↗</a>
      </div>
      <style>{`@media(min-width:640px){.nav-lnk{display:inline-flex!important;align-items:center;}}`}</style>
    </nav>
  );
}
