export const toast = (message: string) => window.dispatchEvent(new CustomEvent<string>("rs-toast", { detail: message }));
export const openPalette = () => window.dispatchEvent(new Event("rs-open-palette"));
export const openMenu = () => window.dispatchEvent(new Event("rs-open-menu"));
