"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { playHover, playLink } from "@/lib/sound";

type Props = {
  href?: string; onClick?: () => void; variant?: "primary" | "ghost"; external?: boolean; strength?: number;
  className?: string; children: ReactNode; ariaLabel?: string;
};

/** Button/link that leans toward the pointer when it gets close (fine pointers only). */
export default function MagneticButton({ href, onClick, variant = "primary", external, strength = 0.32, className = "", children, ariaLabel }: Props) {
  const wrap = useRef<HTMLSpanElement>(null);
  const aRef = useRef<HTMLAnchorElement>(null);
  const bRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const w = wrap.current;
    const el = aRef.current ?? bRef.current;
    if (!w || !el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.7, ease: "elastic.out(1, 0.55)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.7, ease: "elastic.out(1, 0.55)" });
    const move = (e: PointerEvent) => {
      const r = w.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => { xTo(0); yTo(0); };
    w.addEventListener("pointermove", move);
    w.addEventListener("pointerleave", leave);
    return () => { w.removeEventListener("pointermove", move); w.removeEventListener("pointerleave", leave); };
  }, [strength]);

  const cls = `btn ${variant === "primary" ? "btn-primary" : "btn-ghost"} ${className}`;
  const fire = () => { playLink(); onClick?.(); };
  return (
    <span ref={wrap} className="magnet">
      {href ? (
        <a ref={aRef} href={href} className={cls} aria-label={ariaLabel} onPointerEnter={playHover} onClick={fire} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>{children}</a>
      ) : (
        <button ref={bRef} type="button" className={cls} aria-label={ariaLabel} onPointerEnter={playHover} onClick={fire}>{children}</button>
      )}
    </span>
  );
}
