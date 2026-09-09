import { asset } from "./assetPath";

let audio = null;
let lastPlayed = 0;
const DEBOUNCE = 300; // ms between plays to avoid spam

export function playHoverSound() {
  const now = Date.now();
  if (now - lastPlayed < DEBOUNCE) return;
  lastPlayed = now;
  try {
    if (!audio) {
      audio = new Audio(asset("/hover.mp3"));
      audio.volume = 0.35;
      audio.preload = "auto";
    }
    audio.currentTime = 0;
    audio.play().catch(() => {});
  } catch(e) {}
}
