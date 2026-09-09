import { asset } from "./assetPath";

let audio = null;
let lastPlayed = 0;
const DEBOUNCE = 400;

export function playLinkSound() {
  const now = Date.now();
  if (now - lastPlayed < DEBOUNCE) return;
  lastPlayed = now;
  try {
    if (!audio) {
      audio = new Audio(asset("/link.mp3"));
      audio.volume = 0.4;
      audio.preload = "auto";
    }
    audio.currentTime = 0;
    audio.play().catch(() => {});
  } catch(e) {}
}
