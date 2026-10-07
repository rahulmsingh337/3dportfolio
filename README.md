<div align="center">

# Rahul Singh — Portfolio

### SAP ABAP Lead · S/4HANA Transformation · Clean Core · RAP · OData V4 · ABAP Cloud

![Deploy](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![WebGL](https://img.shields.io/badge/WebGL-GLSL%20Shader-990000?style=for-the-badge&logo=webgl&logoColor=white)

[Live site](https://rahulsinghsap.vercel.app) · [LinkedIn](https://www.linkedin.com/in/rahul-singh-sap-abap/) · [GitHub](https://github.com/rahulmsingh337)

</div>

---

## About

Personal portfolio of Rahul Singh, SAP ABAP Lead at Accenture (Noida, India). It covers ECC-to-S/4HANA transformation work, ABAP Cloud and Clean Core development, certifications, and open-source SAP references.

## Features

**Visual and motion**
- WebGL GLSL shader background: cursor-reactive glow over domain-warped fractal noise
- Custom dual cursor (dot and lagging ring), desktop only
- Split-character name animation and 3D photo tilt that follows the mouse
- Orbiting tech tags around the profile photo

**Interactions**
- 3D flip cards in the Skills section
- Animated number counters that run on scroll into view
- Project cards with modal expand
- Awards lightbox carousel with keyboard navigation
- GSAP marquee in the Contact section

**Performance and accessibility**
- Intro loader capped at 1.5 s, with a Skip button; skipped automatically under `prefers-reduced-motion`
- No audio or speech on load
- Below-the-fold sections are lazy-loaded; certificate and award images are WebP and lazy-loaded
- Motion is reduced on mobile (framer-motion transitions disabled via CSS and a mobile class)

## SEO

- Valid JSON-LD in `index.html`: `Person` (with credential verification links), `WebSite`, `ProfilePage`, and an `ItemList` of projects
- Static fallback content inside `#root` (experience, skills, certifications, projects, contact) plus real `<h1>`/`<h2>` structure, so crawlers, link previews and no-JS visitors get content before JavaScript runs. React replaces it on mount, so keep it in sync with the visible sections.
- Semantic landmarks (`<nav>`, `<main>`), skip link, descriptive section headings, and a single `<h1>`
- 1200×630 social card (`public/og-image.jpg`), consistent title / Open Graph / Twitter tags, and canonical URL
- `robots.txt`, `sitemap.xml`, `llms.txt`, web manifest, and favicon / touch icons in `public/`
- Real 404: unknown URLs return HTTP 404 with `public/404.html` (noindex). There is no catch-all rewrite, so no soft-404s.
- Fonts load without blocking render; image dimensions are declared to avoid layout shift
- Security and cache headers set in `vercel.json`
- This is still a client-rendered SPA. For full prerendering, move to `vite-react-ssg`, Astro, or Next.js.

## Tech stack

| Area | Choice |
|------|--------|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) plus custom CSS |
| Animation | Motion (`motion/react`) + GSAP |
| Background | Custom WebGL (GLSL fragment shader), no 3D library |
| Icons | Lucide React |
| Fonts | Outfit, Inter, JetBrains Mono, Fraunces |
| Hosting | Vercel (auto-deploy on push to `main`) |

## Project structure

```
3dportfolio/
├── public/
│   ├── rahul.jpg                  # Profile photo
│   ├── og-image.jpg               # 1200×630 social preview card
│   ├── resume.pdf                 # Downloadable CV
│   ├── award-*.webp               # INSTA award certificates
│   ├── cert-*.webp                # SAP certification images
│   ├── ach-*.webp                 # Achievement images
│   ├── favicon.svg / .ico         # Favicons
│   ├── apple-touch-icon.png       # iOS icon
│   ├── icon-192.png / icon-512.png# Manifest icons
│   ├── site.webmanifest
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── AnimatedBackground.jsx # WebGL GLSL shader
│   │   ├── Cursor.jsx             # Dual cursor
│   │   ├── LoadingScreen.jsx      # 1.5 s loader with Skip
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── ImpactStrip.jsx        # Animated stats
│   │   ├── Skills.jsx             # 6 flip cards
│   │   ├── Experience.jsx         # Accenture + Infosys timeline
│   │   ├── Projects.jsx           # 9 project cards
│   │   ├── SelectedWorks.jsx
│   │   ├── Journal.jsx
│   │   ├── Awards.jsx             # Certificates, awards, lightbox
│   │   └── Contact.jsx
│   ├── utils/                     # asset path, motion and sound helpers
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── responsive.css
├── index.html                     # Meta tags, JSON-LD, static fallback
├── vercel.json                    # Build config + SPA rewrite
└── vite.config.js
```

## Getting started

Requires Node 18+ and npm 9+.

```bash
git clone https://github.com/rahulmsingh337/3dportfolio.git
cd 3dportfolio
npm install
npm run dev        # http://localhost:5173
```

```bash
npm run build      # production build to dist/
npm run preview    # serve the production build locally
npm run lint
```

## Deployment

Hosted on Vercel. Every push to `main` triggers a build (`npm run build`, output `dist/`). `vercel.json` rewrites all routes to `index.html` for the single-page app.

## Sections

| # | Section | Content |
|---|---------|---------|
| 1 | Hero | Name, role, photo, orbiting tags, links |
| 2 | Impact | 5+ years SAP ABAP · 60+ objects remediated · €50K+ cost avoided · 16× INSTA awards · 40% workflow time cut · 30% custom footprint reduced |
| 3 | Skills | Transformation and EAM, ABAP Cloud and Clean Core, SAP AI, Integration, Performance, Forms |
| 4 | Experience | Accenture (Lead) and Infosys (Consultant) |
| 5 | Projects | 9 projects, including the RAP reference, S/4HANA cookbook, and Prompify |
| 6 | Selected Works | Key SAP initiatives |
| 7 | Journal | Technical notes |
| 8 | Awards | Certifications, RISE and INSTA awards |
| 9 | Contact | Email, LinkedIn, GitHub, WhatsApp, Instagram |

## Certifications shown on the site

- SAP Certified Back-End Developer, ABAP Cloud (C_ABAPD_2601)
- SAP Certified, SAP Generative AI Developer
- SAP Certified, SAP S/4HANA Conversion and SAP System Upgrade
- SAP Certified, Positioning SAP Business AI Platform
- SAP Certified, Positioning the Autonomous Enterprise
- SAP S/4HANA Functional and Technical Professional (Infosys)

## Related

- [ABAP Cloud RAP Reference Project](https://github.com/rahulmsingh337/abap-cloud-rap-reference-project)
- [S/4HANA Migration Code Cookbook](https://github.com/rahulmsingh337/s4hana_migration-code-cookbook)
- [Prompify](https://prompifytech.vercel.app)

---

<div align="center">

© 2026 Rahul Singh. All rights reserved.

</div>
