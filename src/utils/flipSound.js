import { asset } from "./assetPath";
import { isMuted } from "./soundPrefs";

let audio = null;

export function playFlipSound() {
  if (isMuted()) return;
  try {
    if (!audio) {
      audio = new Audio(asset("/flip.mp3"));
      audio.volume = 0.45;
      audio.preload = "auto";
    }
    audio.currentTime = 0;
    audio.play().catch(() => { /* autoplay policy */ });
  } catch { /* playback blocked until first user interaction */ }
}
