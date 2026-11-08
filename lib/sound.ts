"use client";
import { useSyncExternalStore } from "react";

const KEY = "rs_mute";
let muted = false;
try { muted = typeof localStorage !== "undefined" && localStorage.getItem(KEY) === "1"; } catch { /* storage unavailable */ }
const subs = new Set<() => void>();

export const isMuted = () => muted;
export function setMuted(v: boolean) {
  muted = v;
  try { localStorage.setItem(KEY, v ? "1" : "0"); } catch { /* storage unavailable */ }
  subs.forEach((f) => f());
}
const subscribe = (f: () => void) => { subs.add(f); return () => { subs.delete(f); }; };
export const useMuted = () => useSyncExternalStore(subscribe, () => muted, () => false);

const cache = new Map<string, HTMLAudioElement>();
const last = new Map<string, number>();

function play(src: string, volume: number, debounce = 0) {
  if (muted || typeof window === "undefined") return;
  const now = Date.now();
  if (now - (last.get(src) ?? 0) < debounce) return;
  last.set(src, now);
  try {
    let a = cache.get(src);
    if (!a) { a = new Audio(src); a.volume = volume; a.preload = "auto"; cache.set(src, a); }
    a.currentTime = 0;
    void a.play().catch(() => { /* blocked until the first user interaction */ });
  } catch { /* audio unavailable */ }
}

export const playHover = () => play("/hover.mp3", 0.35, 300);
export const playFlip = () => play("/flip.mp3", 0.45);
export const playLink = () => play("/link.mp3", 0.4, 200);
