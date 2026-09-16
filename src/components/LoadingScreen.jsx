import { useEffect, useRef, useState } from "react";

const SEQUENCE = [
  { word: "ANALYSE",   sub: "Custom Code · 60+ Objects",     color: "#6366F1" },
  { word: "REMEDIATE", sub: "HANA · ATC · Clean Core",       color: "#22D3EE" },
  { word: "MIGRATE",   sub: "ECC → S/4HANA · Zero Defects",  color: "#D8B4FE" },
  { word: "BUILD",     sub: "RAP · CDS · OData V4 · BTP",    color: "#6366F1" },
  { word: "DEPLOY",    sub: "Cutover · Hypercare · Go-Live",  color: "#22D3EE" },
  { word: "INNOVATE",  sub: "ABAP Cloud · GenAI · Fiori",    color: "#F59E0B" },
];

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress]   = useState(0);
  const [seqIdx, setSeqIdx]       = useState(0);
  const [visible, setVisible]     = useState(true);
  const [glitch, setGlitch]       = useState(false);
  const t0 = useRef(performance.now());
  const DURATION = 3200;

  // Progress counter
  useEffect(() => {
    let raf;
    const tick = now => {
      const pct = Math.min(100, Math.floor(((now - t0.current) / DURATION) * 100));
      setProgress(pct);
      if (pct < 100) raf = requestAnimationFrame(tick);
      else setTimeout(onComplete, 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Word cycling with glitch transition
  useEffect(() => {
    const interval = DURATION / SEQUENCE.length;
    let i = 0;
    const cycle = () => {
      setGlitch(true);
      setTimeout(() => {
        setSeqIdx(prev => (prev + 1) % SEQUENCE.length);
        setGlitch(false);
      }, 120);
    };
    const t = setInterval(cycle, interval);
    return () => clearInterval(t);
  }, []);

  const current = SEQUENCE[seqIdx];

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "#020617",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      overflow: "hidden",
    }}>

      {/* Animated grid background */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(99,102,241,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.06) 1px,transparent 1px)",
        backgroundSize: "60px 60px",
        animation: "grid-drift 8s linear infinite",
      }}/>

      {/* Corner glow */}
      <div style={{
        position: "absolute", top: -100, left: -100,
        width: 400, height: 400,
        background: `radial-gradient(circle, ${current.color}22 0%, transparent 70%)`,
        transition: "background 0.4s",
        filter: "blur(40px)",
      }}/>
      <div style={{
        position: "absolute", bottom: -100, right: -100,
        width: 400, height: 400,
        background: `radial-gradient(circle, ${current.color}18 0%, transparent 70%)`,
        transition: "background 0.4s",
        filter: "blur(40px)",
      }}/>

      {/* Top-left label */}
      <div style={{
        position: "absolute", top: 32, left: 40,
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          background: "linear-gradient(135deg,#6366F1,#22D3EE)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Fraunces',serif", fontStyle: "italic",
          fontSize: 12, color: "#fff",
        }}>RS</div>
        <span style={{
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: 10, letterSpacing: "0.3em",
          color: "rgba(255,255,255,0.2)", textTransform: "uppercase",
        }}>Portfolio · 2026</span>
      </div>

      {/* Top-right — SAP expertise tags */}
      <div style={{
        position: "absolute", top: 32, right: 40,
        display: "flex", gap: 8,
      }}>
        {["S/4HANA", "ABAP Cloud", "GenAI"].map((tag, i) => (
          <div key={tag} style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: 9, letterSpacing: "0.15em",
            padding: "4px 10px", borderRadius: 100,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.3)",
            animation: `fade-tag 0.5s ease ${i * 0.15}s both`,
          }}>{tag}</div>
        ))}
      </div>

      {/* Main word */}
      <div style={{
        position: "relative", textAlign: "center", zIndex: 1,
      }}>
        {/* Glitch layers */}
        {glitch && (
          <>
            <div style={{
              position: "absolute", inset: 0,
              fontFamily: "'Outfit',sans-serif",
              fontSize: "clamp(64px,12vw,140px)",
              fontWeight: 800, letterSpacing: "-4px",
              color: "#22D3EE", opacity: 0.6,
              transform: "translate(-3px, 1px)",
              clipPath: "polygon(0 0,100% 0,100% 40%,0 40%)",
            }}>{current.word}</div>
            <div style={{
              position: "absolute", inset: 0,
              fontFamily: "'Outfit',sans-serif",
              fontSize: "clamp(64px,12vw,140px)",
              fontWeight: 800, letterSpacing: "-4px",
              color: "#D8B4FE", opacity: 0.5,
              transform: "translate(3px, -1px)",
              clipPath: "polygon(0 60%,100% 60%,100% 100%,0 100%)",
            }}>{current.word}</div>
          </>
        )}

        {/* Main text */}
        <div style={{
          fontFamily: "'Outfit',sans-serif",
          fontSize: "clamp(64px,12vw,140px)",
          fontWeight: 800, letterSpacing: "-4px",
          color: "#fff", lineHeight: 1,
          transition: glitch ? "none" : "color 0.3s",
          textShadow: `0 0 60px ${current.color}40`,
          position: "relative",
        }}>
          {current.word}
        </div>

        {/* Sub-label */}
        <div style={{
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: "clamp(11px,1.5vw,14px)",
          letterSpacing: "0.25em", textTransform: "uppercase",
          color: current.color,
          marginTop: 16,
          transition: "color 0.3s",
          opacity: glitch ? 0 : 1,
          transition: "opacity 0.15s, color 0.3s",
        }}>{current.sub}</div>

        {/* Accent line under word */}
        <div style={{
          height: 2, marginTop: 20,
          background: `linear-gradient(90deg, transparent, ${current.color}, transparent)`,
          transition: "background 0.4s",
          width: "100%",
          boxShadow: `0 0 12px ${current.color}80`,
        }}/>
      </div>

      {/* Bottom counter — large ghost number */}
      <div style={{
        position: "absolute", bottom: 40, right: 48,
        fontFamily: "'Outfit',sans-serif",
        fontSize: "clamp(80px,12vw,140px)",
        fontWeight: 800, letterSpacing: "-6px",
        color: "#fff", opacity: 0.04, lineHeight: 1,
        userSelect: "none",
      }}>{String(progress).padStart(3, "0")}</div>

      {/* Bottom left — status line */}
      <div style={{
        position: "absolute", bottom: 44, left: 40,
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: 11, color: "rgba(255,255,255,0.2)",
        letterSpacing: "0.2em",
      }}>
        ACCENTURE · SAP ABAP LEAD · NOIDA
      </div>

      {/* Progress bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: 2, background: "rgba(255,255,255,0.05)",
      }}>
        <div style={{
          height: "100%", width: `${progress}%`,
          background: `linear-gradient(90deg, #6366F1, ${current.color})`,
          boxShadow: `0 0 16px ${current.color}`,
          transition: "width 0.04s linear, background 0.4s",
        }}/>
      </div>

      {/* Dot row — sequence indicators */}
      <div style={{
        position: "absolute", bottom: 16,
        display: "flex", gap: 8, alignItems: "center",
      }}>
        {SEQUENCE.map((s, i) => (
          <div key={i} style={{
            width: i === seqIdx ? 24 : 6,
            height: 6, borderRadius: 3,
            background: i === seqIdx ? current.color : "rgba(255,255,255,0.1)",
            transition: "all 0.3s ease",
            boxShadow: i === seqIdx ? `0 0 8px ${current.color}` : "none",
          }}/>
        ))}
      </div>

      <style>{`
        @keyframes grid-drift {
          from { background-position: 0 0, 0 0; }
          to   { background-position: 60px 60px, 60px 60px; }
        }
        @keyframes fade-tag {
          from { opacity:0; transform:translateY(-8px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </div>
  );
}
