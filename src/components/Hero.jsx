import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const ROLES = ["SAP ABAP Lead", "S/4HANA Expert", "ABAP Cloud Dev", "Migration Lead"];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const nameRef = useRef(null);
  const blurRefs = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({ ease: "power3.out" });
    tl.fromTo(nameRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
    );
    tl.fromTo(blurRefs.current,
      { opacity: 0, filter: "blur(12px)", y: 20 },
      { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, stagger: 0.12 },
      "-=0.8"
    );
  }, []);

  useEffect(() => {
    const t = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 2500);
    return () => clearInterval(t);
  }, []);

  const addBlur = (el) => { if (el && !blurRefs.current.includes(el)) blurRefs.current.push(el); };

  return (
    <section id="hero" style={{
      minHeight: "100vh",
      display: "flex", alignItems: "center",
      padding: "120px 40px 80px",
      position: "relative", overflow: "hidden",
    }}>
      {/* bg gradients */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: `
          radial-gradient(ellipse at 15% 55%, rgba(78,155,255,0.07) 0%, transparent 55%),
          radial-gradient(ellipse at 85% 25%, rgba(137,170,204,0.04) 0%, transparent 50%)
        `,
      }} />
      {/* grid */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, opacity: 0.025,
        backgroundImage: "linear-gradient(var(--text) 1px,transparent 1px),linear-gradient(90deg,var(--text) 1px,transparent 1px)",
        backgroundSize: "64px 64px",
      }} />

      <div style={{
        position: "relative", zIndex: 1,
        maxWidth: 1200, margin: "0 auto", width: "100%",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: 80, alignItems: "center",
      }} className="hero-grid-resp">

        {/* LEFT */}
        <div>
          <div ref={addBlur} style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase",
            color: "var(--muted)", marginBottom: 32,
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%",
              background: "var(--green)",
              boxShadow: "0 0 10px var(--green)",
              display: "inline-block",
            }} className="animate-pulse-dot" />
            Available for opportunities
          </div>

          <h1 ref={nameRef} style={{
            fontFamily: "'Fraunces', serif",
            fontStyle: "italic",
            fontSize: "clamp(52px, 7.5vw, 100px)",
            lineHeight: 0.93,
            letterSpacing: "-2px",
            color: "var(--text)",
            marginBottom: 16,
            opacity: 0,
          }}>
            Rahul<br />Singh
          </h1>

          <p ref={addBlur} style={{
            fontSize: "clamp(14px,1.8vw,18px)",
            color: "var(--muted)",
            marginBottom: 28,
          }}>
            <span key={roleIdx} style={{
              color: "var(--accent)",
              fontFamily: "'Fraunces', serif",
              fontStyle: "italic",
              display: "inline-block",
            }} className="animate-role-fade-in">
              {ROLES[roleIdx]}
            </span>
            {" "}· Accenture · Noida
          </p>

          <p ref={addBlur} style={{
            fontSize: 15, lineHeight: 1.75,
            color: "var(--muted)",
            maxWidth: 440, marginBottom: 44,
          }}>
            5+ years engineering enterprise SAP systems at Accenture and Infosys.
            Specializing in S/4HANA migration, HANA remediation, CDS Views, RAP,
            and OData services for global clients.
          </p>

          <div ref={addBlur} style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48 }}>
            <a href="#projects" data-hover style={btnPrimary}
              onMouseEnter={e => Object.assign(e.currentTarget.style, btnPrimaryHover)}
              onMouseLeave={e => Object.assign(e.currentTarget.style, btnPrimary)}>
              View Projects ↓
            </a>
            <a href="mailto:rs58598@gmail.com" data-hover style={btnOutline}
              onMouseEnter={e => Object.assign(e.currentTarget.style, btnOutlineHover)}
              onMouseLeave={e => Object.assign(e.currentTarget.style, btnOutline)}>
              rs58598@gmail.com ↗
            </a>
          </div>

          {/* stats */}
          <div ref={addBlur} style={{
            display: "flex", gap: 40, paddingTop: 36,
            borderTop: "1px solid var(--stroke)",
          }}>
            {[
              { num: "5+", label: "Years Experience" },
              { num: "16×", label: "INSTA Awards" },
              { num: "2", label: "Open Source Repos" },
            ].map((s) => (
              <div key={s.num}>
                <div style={{
                  fontFamily: "'Fraunces', serif", fontStyle: "italic",
                  fontSize: 38, fontWeight: 300, color: "var(--text)", lineHeight: 1,
                }}>{s.num}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 6, letterSpacing: "0.04em" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — photo */}
        <div style={{ display: "flex", justifyContent: "center" }} className="hero-photo-resp">
          <div style={{ position: "relative", width: 360, height: 460 }} className="animate-float">
            <div style={{
              position: "absolute", inset: -22,
              border: "1px solid rgba(78,155,255,0.14)",
              borderRadius: "200px 200px 160px 160px",
            }} />
            <div style={{
              position: "absolute", inset: -44,
              border: "1px solid rgba(78,155,255,0.06)",
              borderRadius: "220px 220px 180px 180px",
            }} />
            <img
              src="/rahul.jpg"
              alt="Rahul Singh"
              style={{
                width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "center top",
                borderRadius: "180px 180px 140px 140px",
                filter: "grayscale(15%) contrast(1.05)",
              }}
              onError={e => {
                e.target.style.display = "none";
                e.target.parentElement.style.background = "var(--surface2)";
                e.target.parentElement.style.borderRadius = "180px 180px 140px 140px";
              }}
            />
            {/* Badge */}
            <div style={{
              position: "absolute", bottom: 20, left: -24,
              background: "rgba(17,17,17,0.92)",
              border: "1px solid var(--stroke)",
              borderRadius: 16, padding: "14px 18px",
              display: "flex", alignItems: "center", gap: 12,
              backdropFilter: "blur(12px)",
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: "linear-gradient(135deg,#89AACC,#4E9BFF)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18,
              }}>🔷</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text)" }}>SAP Certified</div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>ABAP Cloud Developer</div>
              </div>
            </div>
            {/* Tag */}
            <div style={{
              position: "absolute", top: 28, right: -20,
              background: "rgba(17,17,17,0.92)",
              border: "1px solid var(--stroke)",
              borderRadius: 100, padding: "8px 16px",
              fontSize: 12, fontWeight: 700,
              color: "var(--accent)", backdropFilter: "blur(12px)",
            }}>
              Accenture · Lead
            </div>
          </div>
        </div>
      </div>

      {/* scroll indicator */}
      <div style={{
        position: "absolute", bottom: 40, left: "50%",
        transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
      }}>
        <span style={{ fontSize: 10, letterSpacing: "0.25em", color: "var(--muted)", textTransform: "uppercase" }}>
          Scroll
        </span>
        <div style={{ width: 1, height: 40, background: "var(--stroke)", position: "relative", overflow: "hidden" }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom,transparent,var(--accent))",
          }} className="animate-scroll-down" />
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          .hero-grid-resp{grid-template-columns:1fr!important;gap:48px!important;}
          .hero-photo-resp{order:-1;}
        }
      `}</style>
    </section>
  );
}

const btnBase = {
  display: "inline-flex", alignItems: "center", gap: 8,
  fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 700,
  padding: "14px 28px", borderRadius: 100,
  textDecoration: "none", cursor: "none",
  transition: "all 0.3s", letterSpacing: "0.02em",
};
const btnPrimary = { ...btnBase, background: "var(--text)", color: "var(--bg)", border: "1px solid transparent" };
const btnPrimaryHover = { ...btnPrimary, background: "var(--accent)", color: "#fff", transform: "scale(1.04)" };
const btnOutline = { ...btnBase, background: "transparent", color: "var(--text)", border: "1px solid var(--stroke)" };
const btnOutlineHover = { ...btnOutline, borderColor: "var(--accent)", color: "var(--accent)", transform: "scale(1.04)" };
