import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./sections.css";
import { jsonLd } from "@/lib/seo";
import { SITE } from "@/lib/data/site";
import { SmoothScrollProvider } from "@/components/providers/SmoothScroll";
import Backdrop from "@/components/layout/Backdrop";
import Nav from "@/components/layout/Nav";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Toast from "@/components/layout/Toast";
import CommandPalette from "@/components/layout/CommandPalette";

const fraunces = localFont({
  src: [
    { path: "./fonts/fraunces-latin-opsz-normal.woff2", style: "normal", weight: "100 900" },
    { path: "./fonts/fraunces-latin-opsz-italic.woff2", style: "italic", weight: "100 900" },
  ],
  variable: "--font-fraunces", display: "swap",
});
const inter = localFont({ src: [{ path: "./fonts/inter-latin-wght-normal.woff2", style: "normal", weight: "100 900" }], variable: "--font-inter", display: "swap" });
const jbm = localFont({
  src: [
    { path: "./fonts/jetbrains-mono-latin-400-normal.woff2", style: "normal", weight: "400" },
    { path: "./fonts/jetbrains-mono-latin-500-normal.woff2", style: "normal", weight: "500" },
  ],
  variable: "--font-jbm", display: "swap", preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "Rahul Singh | SAP ABAP Lead | S/4HANA & ABAP Cloud",
  description: "Rahul Singh, SAP ABAP Lead at Accenture. SAP Certified ABAP Cloud Developer. S/4HANA transformation, Clean Core, RAP, CDS, OData V4. Noida, India.",
  authors: [{ name: "Rahul Singh" }],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  openGraph: {
    type: "profile", url: SITE.url, siteName: "Rahul Singh",
    title: "Rahul Singh | SAP ABAP Lead | S/4HANA & ABAP Cloud",
    description: "SAP ABAP Lead at Accenture. S/4HANA transformation, ABAP Cloud, Clean Core, RAP, CDS Views, OData V4.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Rahul Singh, SAP ABAP Lead" }], locale: "en_IN",
  },
  twitter: { card: "summary_large_image", images: ["/og-image.jpg"] },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon.ico" }], apple: "/apple-touch-icon.png" },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = { themeColor: "#05060b", colorScheme: "dark" };

const noJsGuard = `document.documentElement.classList.add('js');setTimeout(function(){document.documentElement.classList.add('js-fail')},6000);`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${fraunces.variable} ${inter.variable} ${jbm.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noJsGuard }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <SmoothScrollProvider>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1000] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-black">Skip to content</a>
          <Backdrop />
          <Nav />
          <ScrollProgress />
          <main id="main">{children}</main>
          <Toast />
          <CommandPalette />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
