import { useSyncExternalStore } from "react";

// One shared pair of media-query listeners for the whole app (instead of two per component).
const hasWin = typeof window !== "undefined";
const mqWide = hasWin ? window.matchMedia("(min-width: 900px)") : null;
const mqReduce = hasWin ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
const calc = () => !!(mqWide && mqReduce && mqWide.matches && !mqReduce.matches);
let state = calc();
const subs = new Set();
const onChange = () => { const next = calc(); if (next !== state) { state = next; subs.forEach((f) => f()); } };
if (hasWin) { mqWide.addEventListener("change", onChange); mqReduce.addEventListener("change", onChange); }
const subscribe = (f) => { subs.add(f); return () => subs.delete(f); };

/** True when scroll-linked (scrubbed) animation should run: desktop width and no reduced-motion preference. */
export function useScrub() {
  return useSyncExternalStore(subscribe, () => state, () => false);
}
