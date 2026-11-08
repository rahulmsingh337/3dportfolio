"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type Target = string | number | HTMLElement;
type ScrollApi = {
  scrollTo: (target: Target, opts?: { offset?: number; duration?: number }) => void;
  lock: (locked: boolean) => void;
};

const Ctx = createContext<ScrollApi>({ scrollTo: () => {}, lock: () => {} });
export const useSmoothScroll = () => useContext(Ctx);

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

/** Lenis smooth scrolling, driven by the GSAP ticker so ScrollTrigger and scroll position stay in lock-step. */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Late fonts/images shift every trigger: re-measure once things settle.
    const refresh = () => ScrollTrigger.refresh();
    void document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback<ScrollApi["scrollTo"]>((target, opts) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { offset: opts?.offset ?? 0, duration: opts?.duration ?? 1.6, easing: easeOutQuart });
      return;
    }
    if (typeof target === "number") window.scrollTo({ top: target, behavior: "smooth" });
    else {
      const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const lock = useCallback((locked: boolean) => {
    if (locked) lenisRef.current?.stop();
    else lenisRef.current?.start();
    document.documentElement.style.overflow = locked && !lenisRef.current ? "hidden" : "";
  }, []);

  const api = useMemo(() => ({ scrollTo, lock }), [scrollTo, lock]);
  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}
