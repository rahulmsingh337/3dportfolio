<div align="center">

# Rahul Singh — Portfolio

### SAP ABAP Lead · S/4HANA Transformation · Clean Core · RAP · OData V4 · ABAP Cloud

![Deploy](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![UI](https://img.shields.io/badge/Design-Ink%20%C2%B7%20Gold%20%C2%B7%20Glass-D9C49C?style=for-the-badge)

[Live site](https://rahulsinghsap.vercel.app) · [LinkedIn](https://www.linkedin.com/in/rahul-singh-sap-abap/) · [GitHub](https://github.com/rahulmsingh337)

</div>

---

## About

Personal portfolio of Rahul Singh, SAP ABAP Lead at Accenture (Noida, India). It covers ECC-to-S/4HANA transformation work, ABAP Cloud and Clean Core development, certifications, and open-source SAP references.

## Design system

An editorial, restrained look intended for senior and enterprise audiences.

- **Palette:** near-black ink (`#05070d`), warm white headings, one champagne-gold accent (`#d9c49c`) for labels, numerals and hairlines. No rainbow accents.
- **Type:** Fraunces (light display serif, italic gold accent word) for headings, Inter for UI and body, JetBrains Mono for small labels. All fonts are self-hosted via Fontsource (no Google Fonts request).
- **Surfaces:** frosted glass (`.card`) with a gold hairline on hover; one shared set of tokens and components in `src/index.css`.
- **Layout:** one numbered section header pattern (`SectionHeader`), consistent 1200px grid and vertical rhythm, readable line lengths (experience bullets capped near 66 characters).
- **Background:** cursor-reactive spatial scene (pointer light with fast core and slow halo, grid that lights up near the pointer, parallax colour orbs, floor plane that tilts), with no WebGL and nothing bright behind text.
- **Interaction:** capability cards flip to show delivered impact; the hero photo flips to the award photo on hover or tap. Subtle hover / flip / link sound effects play after the first interaction (browsers block audio before that).
- **Restraint:** no custom cursor, no emoji icons, no fake skill percentages. Motion respects `prefers-reduced-motion` (the intro is skipped).

## Features

- Sticky navigation with section links and active-section highlighting; mobile menu
- **Command palette** (Ctrl/⌘ + K, or `/`): jump to any section, download the résumé, copy the email, open profiles, toggle sound. Fully keyboard-driven (↑ ↓ Enter Esc) with ARIA combobox semantics.
- **Project filters** (S/4HANA & EAM, Custom development, Open source & AI) with animated reflow
- **Card spotlight** (a soft gold light follows the pointer inside cards) and **magnetic buttons**; both fine-pointer only and off under reduced motion
- Reading-progress line, back-to-top button, copy-email with confirmation toast
- **Sound toggle** in the nav (remembered across visits); masked word-by-word headline reveals
- Animated impact stats (count-up on scroll)
- Orbiting tech chips (BTP, OData, GenAI, CDS, RAP, S/4HANA) circle the hero photo, passing behind and in front of it
- Flip cards: each capability states the delivered outcome on the back; hero photo flips to the award photo
- Experience in a two-column editorial layout with the key numbers emphasised
- Project cards with a detail modal (Esc to close)
- Credentials: verifiable SAP certifications and recognition, with an image lightbox
- Intro plays once per browser session and is skipped for reduced-motion users

## SEO

- Valid JSON-LD in `index.html`: `Person` (with credential verification links), `WebSite`, `ProfilePage`, and an `ItemList` of projects
- Static fallback content inside `#root` plus real heading structure, so crawlers, link previews and no-JS visitors get content before JavaScript runs. React replaces it on mount, so keep it in sync with the visible sections.
- Semantic landmarks (`<nav>`, `<main>`), skip link, descriptive section headings, and a single `<h1>`
- 1200×630 social card (`public/og-image.jpg`), consistent title / Open Graph / Twitter tags, and canonical URL
- `robots.txt`, `sitemap.xml`, `llms.txt`, web manifest, and favicon / touch icons in `public/`
- Real 404: unknown URLs return HTTP 404 with `public/404.html` (noindex); no catch-all rewrite, so no soft-404s
- Self-hosted fonts and declared image dimensions; security and cache headers in `vercel.json`
- Still a client-rendered SPA. For full prerendering, move to `vite-react-ssg`, Astro, or Next.js.

## Tech stack

| Area | Choice |
|------|--------|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) plus a custom design-system stylesheet |
| Animation | Motion (`motion/react`) and CSS |
| Fonts | Fraunces, Inter, JetBrains Mono (Fontsource, self-hosted) |
| Icons | Lucide React plus monochrome brand icons |
| Hosting | Vercel (auto-deploy on push to `main`) |

## Project structure

```
3dportfolio/
├── public/                  # photo, og-image, icons, certificates (WebP), resume.pdf, robots/sitemap/llms.txt, 404.html
├── src/
│   ├── components/
│   │   ├── AnimatedBackground.jsx   # cursor-reactive spatial background
│   │   ├── LoadingScreen.jsx        # minimal monogram intro (once per session)
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── ImpactStrip.jsx
│   │   ├── SectionHeader.jsx        # shared numbered section heading
│   │   ├── Skills.jsx               # capabilities with evidence
│   │   ├── Experience.jsx
│   │   ├── Projects.jsx             # 9 projects + modal
│   │   ├── Journal.jsx              # insights list
│   │   ├── Awards.jsx               # certifications, awards, lightbox
│   │   ├── Contact.jsx
│   │   └── Icons.jsx
│   ├── utils/                       # asset path, motion flags
│   ├── App.jsx
│   ├── main.jsx                     # font imports
│   └── index.css                    # tokens + components
├── index.html                       # meta, JSON-LD, static fallback
├── vercel.json                      # build, headers, redirects (no SPA rewrite)
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

Hosted on Vercel. Every push to `main` triggers a build (`npm run build`, output `dist/`). Unknown URLs return a real 404 (`public/404.html`).

## Sections

| # | Section | Content |
|---|---------|---------|
| – | Hero | Name, role, portrait, credentials, links |
| – | Impact | Headline numbers (years, objects remediated, cost avoided, awards, time and footprint reductions) |
| 01 | Capabilities | Six disciplines, each with delivered evidence |
| 02 | Experience | Accenture (current) and Infosys |
| 03 | Work | 9 projects, including EAM Fiori, mass-printing, FSCM, RAP reference, migration cookbook, Prompify |
| 04 | Insights | Credentials, open-source notes and topics |
| 05 | Credentials | SAP certifications, recognition, INSTA awards |
| 06 | Contact | Email, LinkedIn, GitHub, Prompify, WhatsApp |

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
