// Sound on/off preference, persisted. Default: on.
const KEY = "rs_mute";
let muted = false;
try { muted = localStorage.getItem(KEY) === "1"; } catch { /* storage unavailable */ }
const subs = new Set();
export const isMuted = () => muted;
export function setMuted(v) {
  muted = !!v;
  try { localStorage.setItem(KEY, muted ? "1" : "0"); } catch { /* storage unavailable */ }
  subs.forEach((f) => f(muted));
}
export const onMuteChange = (f) => { subs.add(f); return () => subs.delete(f); };
