import { asset } from "./assetPath";

let audio = null;

export function playFlipSound() {
  try {
    if (!audio) {
      audio = new Audio(asset("/flip.mp3"));
      audio.volume = 0.45;
      audio.preload = "auto";
    }
    audio.currentTime = 0;
    audio.play().catch(() => {});
  } catch(e) {}
}
