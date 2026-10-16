export const toast = (message) => window.dispatchEvent(new CustomEvent("rs-toast", { detail: message }));
export const openPalette = () => window.dispatchEvent(new Event("rs-open-palette"));
