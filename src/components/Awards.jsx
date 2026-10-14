import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { asset } from "../utils/assetPath";
import SectionHeader from "./SectionHeader";
import { playHoverSound } from "../utils/hoverSound";

const CERTS = [
  { title: "SAP Certified Back-End Developer – ABAP Cloud (C_ABAPD_2601)", issuer: "SAP SE · Apr 2026", image: asset("/cert-abap-cloud.webp") },
  { title: "SAP Certified – SAP Generative AI Developer", issuer: "SAP SE · Sep 2026", image: asset("/cert-genai.webp") },
  { title: "SAP Certified – SAP S/4HANA Conversion and SAP System Upgrade", issuer: "SAP SE · Sep 2026", image: asset("/cert-s4hana-upgrade.webp") },
  { title: "SAP Certified – Positioning SAP Business AI Platform", issuer: "SAP SE · Sep 2026", image: asset("/cert-btp-ai.webp") },
  { title: "SAP Certified – Positioning the Autonomous Enterprise", issuer: "SAP SE · Oct 2026", image: asset("/cert-autonomous.webp") },
  { title: "SAP S/4HANA Functional Professional", issuer: "Infosys", image: asset("/cert-sap-func.webp") },
  { title: "SAP S/4HANA Technical Professional", issuer: "Infosys", image: asset("/cert-sap-tech.webp") },
];
const RISE = [
  { title: "COE ACE", issuer: "Individual · H1-FY26", image: asset("/cert-coe-ace.webp") },
  { title: "Eureka", issuer: "Individual · H1-FY26", image: asset("/cert-eureka.webp") },
  { title: "Rookie of the Quarter", issuer: "RISE Awards · H1-FY26", image: asset("/cert-rookie.webp") },
  { title: "Rookie of the Quarter", issuer: "RISE Awards · FY25 Q2", image: asset("/ach-unit-rise.webp") },
  { title: "Rookie of the Quarter", issuer: "RISE Awards · FY24 Q2", image: asset("/cert-rookie.webp") },
  { title: "Client Appreciation Letter", issuer: "Global Logistics Client · Jan 2024", image: asset("/award-1.webp") },
];
const INSTA = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => asset(`/award-${n}.webp`));

function Lightbox({ images, start, onClose }) {
  const [cur, setCur] = useState(start);
  const prev = () => setCur((c) => (c - 1 + images.length) % images.length);
  const next = () => setCur((c) => (c + 1) % images.length);
  const btn = { position: "absolute", width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,.18)", background: "rgba(255,255,255,.06)", color: "#fff", display: "grid", placeItems: "center", cursor: "pointer", zIndex: 10 };
  return (
    <motion.div role="dialog" aria-modal="true" aria-label="Image viewer" onClick={onClose}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: "fixed", inset: 0, zIndex: 800, background: "rgba(3,5,10,.94)", backdropFilter: "blur(14px)", display: "grid", placeItems: "center", padding: 16 }}>
      <button style={{ ...btn, top: 20, right: 20 }} onClick={onClose} aria-label="Close"><X size={18} /></button>
      {images.length > 1 && <>
        <button style={{ ...btn, left: 16, top: "50%", transform: "translateY(-50%)" }} onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous"><ChevronLeft size={20} /></button>
        <button style={{ ...btn, right: 16, top: "50%", transform: "translateY(-50%)" }} onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next"><ChevronRight size={20} /></button>
      </>}
      <motion.img key={cur} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.25 }}
        src={images[cur]} alt={`Certificate or award, ${cur + 1} of ${images.length}`} onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: "88vh", maxWidth: "min(92vw,960px)", objectFit: "contain", borderRadius: 12, boxShadow: "0 40px 100px rgba(0,0,0,.8)" }} />
      {images.length > 1 && (
        <div style={{ position: "absolute", bottom: 22, display: "flex", gap: 8 }}>
          {images.map((_, i) => (
            <button key={i} aria-label={`Go to image ${i + 1}`} onClick={(e) => { e.stopPropagation(); setCur(i); }}
              style={{ height: 5, width: i === cur ? 26 : 6, borderRadius: 3, border: 0, cursor: "pointer", background: i === cur ? "#d9c49c" : "rgba(255,255,255,.28)", transition: "all .3s" }} />
          ))}
        </div>
      )}
    </motion.div>
  );
}

function Tile({ t, onClick }) {
  return (
    <button className="card tile" onClick={onClick} onMouseEnter={playHoverSound}>
      <img src={t.image} alt="" loading="lazy" />
      <div><small>{t.issuer}</small><h3>{t.title}</h3></div>
    </button>
  );
}

export default function Awards() {
  const [lb, setLb] = useState(null);
  return (
    <section id="awards" className="sec wrap">
      <AnimatePresence>{lb && <Lightbox images={lb.images} start={lb.i} onClose={() => setLb(null)} />}</AnimatePresence>
      <SectionHeader n="05" eyebrow="Credentials & recognition" srLabel="SAP Certifications" title="Certifications &" em="awards"
        lede="Recognitions from Infosys EAS SAP spanning skill certifications, peer nominations, and quarterly RISE awards." />

      <div className="subhead">Certifications</div>
      <div className="tiles">
        {CERTS.map((c, i) => <Tile key={c.title} t={c} onClick={() => setLb({ images: CERTS.map((x) => x.image), i })} />)}
      </div>

      <div className="subhead">Awards &amp; client recognition</div>
      <div className="tiles">
        {RISE.map((c, i) => <Tile key={c.title + c.issuer} t={c} onClick={() => setLb({ images: RISE.map((x) => x.image), i })} />)}
      </div>

      <div className="card insta">
        <div>
          <div className="stat-n" style={{ fontSize: "clamp(40px,4.4vw,60px)" }}>16<sup>×</sup></div>
          <div className="stat-l">Consecutive INSTA rewards · Infosys</div>
        </div>
        <button className="btn btn-ghost" onClick={() => setLb({ images: INSTA, i: 0 })}>View recognition ({INSTA.length})</button>
      </div>
    </section>
  );
}
