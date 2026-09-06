// On mobile, replace motion components with plain divs
// This eliminates the entire framer-motion JS overhead on mobile

export const IS_MOBILE = typeof window !== "undefined" &&
  (window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

// Lightweight motion wrapper — no-op on mobile
export function motionProps(initial, animate, transition, viewport) {
  if (IS_MOBILE) return {}; // no animation props on mobile
  return { initial, animate, whileInView: animate, transition, viewport };
}
