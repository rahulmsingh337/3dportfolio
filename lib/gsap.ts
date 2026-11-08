import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/** Register GSAP plugins once, client-side only. Safe to call from any component module. */
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

registerGsap();

export { gsap, ScrollTrigger };

/** Media conditions shared by every section so the desktop / tablet / mobile branches stay consistent. */
export const MQ = {
  desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  tablet: "(min-width: 768px) and (max-width: 1023px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
  pinned: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
} as const;
