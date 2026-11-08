"use client";

import { useEffect } from "react";
import { revealMasksOnScroll } from "@/lib/anim";

/** Plays the masked reveal on the work heading (the heading itself stays a server component). */
export default function WorkHeaderFx() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = revealMasksOnScroll(document.querySelector(".work-h"), "top 82%");
    return () => { t?.kill(); };
  }, []);
  return null;
}
