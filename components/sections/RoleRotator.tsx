"use client";

import { useEffect, useState } from "react";

const ROLES = ["SAP ABAP Lead", "Clean Core, by design", "From ECC to S/4HANA", "ABAP Cloud certified", "Generative AI certified"];

/** Isolated so the 3-second rotation never re-renders the rest of the hero. */
export default function RoleRotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % ROLES.length), 3200);
    return () => clearInterval(t);
  }, []);
  return <p className="hero-role" aria-live="polite"><span key={i} className={i === 0 ? undefined : "role-in"}>{ROLES[i]}</span></p>;
}
