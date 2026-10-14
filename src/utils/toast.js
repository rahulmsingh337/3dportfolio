export const toast = (message) => window.dispatchEvent(new CustomEvent("rs-toast", { detail: message }));
export const openPalette = () => window.dispatchEvent(new Event("rs-open-palette"));
export async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch { /* fall back */ }
  try {
    const t = document.createElement("textarea");
    t.value = text; t.style.position = "fixed"; t.style.opacity = "0";
    document.body.appendChild(t); t.select();
    const ok = document.execCommand("copy"); document.body.removeChild(t); return ok;
  } catch { return false; }
}
