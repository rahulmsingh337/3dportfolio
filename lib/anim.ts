import { gsap } from "@/lib/gsap";

export const EASE = { out: "power4.out", inOut: "power3.inOut", expo: "expo.out" } as const;

/** Rise every `.mask-in` inside `root` out of its mask. Returns the tween so callers can place it on a timeline. */
export function revealMasks(root: Element | null, vars: gsap.TweenVars = {}) {
  if (!root) return null;
  const items = root.querySelectorAll(".mask-in");
  if (!items.length) return null;
  return gsap.to(items, { yPercent: 0, y: 0, duration: 1.15, ease: EASE.expo, stagger: 0.07, ...vars });
}

/** Scroll-triggered masked reveal that plays once when `root` reaches the lower part of the viewport. */
export function revealMasksOnScroll(root: Element | null, start = "top 82%") {
  if (!root) return null;
  return revealMasks(root, { scrollTrigger: { trigger: root, start, once: true } });
}

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const smoothstep = (t: number) => t * t * (3 - 2 * t);
