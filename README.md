<div align="center">

<br/>

```
██████╗  █████╗ ██╗  ██╗██╗   ██╗██╗
██╔══██╗██╔══██╗██║  ██║██║   ██║██║
██████╔╝███████║███████║██║   ██║██║
██╔══██╗██╔══██║██╔══██║██║   ██║██║
██║  ██║██║  ██║██║  ██║╚██████╔╝███████╗
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝
```

### **SAP ABAP Lead Consultant · S/4HANA · Clean Core · RAP · OData · ABAP Cloud**

<br/>

![Deploy](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![WebGL](https://img.shields.io/badge/WebGL-GLSL%20Shader-990000?style=for-the-badge&logo=webgl&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-Animations-88CE02?style=for-the-badge&logo=greensock&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-6366F1?style=for-the-badge)

<br/>

> *A high-performance, motion-reactive dark portfolio built to showcase 5+ years of enterprise SAP engineering.*

<br/>

[🌐 Live Site](https://rahulmsingh337.github.io/3dportfolio) · [💼 LinkedIn](https://www.linkedin.com/in/rahul-singh-sap-abap/) · [🐙 GitHub](https://github.com/rahulmsingh337) · [📸 Instagram](https://www.instagram.com/squatile3375/)

<br/>

---

</div>

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎨 Visual & Motion
- **WebGL GLSL Shader** background — cursor-reactive glow with FBM fluid noise, aurora streaks & ripple ring
- **Custom dual cursor** — dot + lagging ring, morphs to rounded square on hover, shrinks on click
- **Split-character name animation** — each letter flies in with skewY easing
- **3D photo tilt** — perspective tracking follows mouse (18° max)
- **Orbiting tech tags** — 5 tags (S/4HANA, RAP, CDS, OData, BTP) orbit the photo continuously
- **Holographic shimmer** overlay on profile photo
- **Film grain + scanline** CRT texture overlay

</td>
<td width="50%">

### ⚡ Interactions
- **3D flip cards** — Skills section cards flip on click to reveal impact metrics
- **Animated number counters** — count up from 0 on scroll into view
- **Glitch heading effect** — chromatic aberration split on hover
- **Magnetic cursor glow** — halo appears behind buttons on hover
- **GSAP marquee** — infinite scrolling text in Contact section
- **Spring-animated navbar pill** — slides between active links
- **Award lightbox** — carousel with keyboard navigation

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

```
Frontend        React 18 + Vite 8
Styling         Tailwind CSS v4 (@tailwindcss/vite)
Animation       Framer Motion (motion/react) + GSAP
3D / Shader     Custom WebGL GLSL — no Three.js, pure GPU
Icons           Lucide React
Fonts           Outfit · Inter · JetBrains Mono · Fraunces
Deploy          Vercel (auto-deploy on push to main)
```

---

## 🏗️ Project Structure

```
3dportfolio/
├── public/
│   ├── rahul.jpg                  # Profile photo
│   ├── resume.pdf                 # Downloadable CV
│   ├── award-*.png                # INSTA award certificates
│   ├── cert-*.png                 # SAP certification images
│   └── ach-*.png                  # Achievement images
│
├── src/
│   ├── components/
│   │   ├── AnimatedBackground.jsx # ← WebGL GLSL shader (cursor glow)
│   │   ├── Cursor.jsx             # Dual cursor (dot + ring)
│   │   ├── LoadingScreen.jsx      # Animated loader with word cycling
│   │   ├── Navbar.jsx             # Floating pill nav, spring indicator
│   │   ├── Hero.jsx               # Split text, orbit tags, 3D tilt
│   │   ├── ImpactStrip.jsx        # Animated counting stats
│   │   ├── Skills.jsx             # 3D flip cards
│   │   ├── Experience.jsx         # Timeline (Accenture + Infosys)
│   │   ├── Projects.jsx           # Cards with modal expand
│   │   ├── SelectedWorks.jsx      # Bento grid
│   │   ├── Journal.jsx            # SAP insight pills
│   │   ├── Awards.jsx             # Lightbox carousel
│   │   └── Contact.jsx            # GSAP marquee + socials
│   ├── utils/
│   │   └── assetPath.js           # Base URL helper for assets
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                  # Global styles + all keyframes
│
├── vercel.json                    # Vercel deploy config + SPA redirect
├── netlify.toml                   # Netlify fallback config
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites
```bash
node >= 18
npm >= 9
```

### Run locally
```bash
# Clone
git clone https://github.com/rahulmsingh337/3dportfolio.git
cd 3dportfolio

# Install
npm install

# Dev server
npm run dev
# → http://localhost:5173
```

### Build for production
```bash
npm run build
# Output: dist/
```

---

## 🎮 WebGL Shader — How it works

The background is a **custom GLSL fragment shader** running at 60fps on the GPU — zero external 3D library needed.

```glsl
// 6-octave Fractal Brownian Motion for organic fluid motion
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 6; i++) {
    v += a * noise(p);
    p  = p * 2.0 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}
```

| Effect | Implementation |
|--------|---------------|
| Cursor glow | `exp(-dist² × 2.8)` — soft bloom |
| Bright core | `exp(-dist² × 14.0)` — tight spike |
| Ripple ring | `exp(-(dist - 0.18)² × 80)` |
| Fluid field | 6-octave FBM with warped domain |
| Aurora | Vertical FBM streaks + palette |
| Smooth lag | LERP 0.055 per frame |

---

## 📋 Sections

| # | Section | Description |
|---|---------|-------------|
| 1 | **Hero** | Name, role, 3D photo, orbiting tags, CTAs |
| 2 | **Impact** | 5+ Years · 60+ Objects · €50K Saved · 16× Awards |
| 3 | **Skills** | 6 flip cards — Core ABAP, Clean Core, AI, Integration, Performance, Forms |
| 4 | **Experience** | Accenture (Lead) + Infosys (Consultant) timeline |
| 5 | **Projects** | 7 projects — RAP Reference, S/4HANA Cookbook, Prompify + more |
| 6 | **Selected Works** | Bento grid of key SAP initiatives |
| 7 | **Journal** | SAP technical insights + articles |
| 8 | **Awards** | 16× INSTA · 5× Unit Rise · COE ACE · Client Letter |
| 9 | **Contact** | Email · LinkedIn · GitHub · Instagram |

---

## 🏆 About Rahul

```
┌─────────────────────────────────────────────────────────────┐
│  SAP ABAP Lead Consultant @ Accenture                       │
│  5+ years · ECC-to-S/4HANA · Clean Core · RAP · OData      │
│                                                             │
│  📍 Noida, Uttar Pradesh, India                             │
│  📧 rs58598@gmail.com                                       │
│  📱 +91-8989805836                                          │
│                                                             │
│  Certifications:                                            │
│  ✓ SAP Certified Back-End Developer — ABAP Cloud            │
│  ✓ SAP ALE IDocs Certification                              │
│  ✓ Advanced Programming in ABAP                             │
│  ✓ Data Management & ABAP Services for SAP Cloud Platform   │
│                                                             │
│  Key achievements:                                          │
│  → 60+ ABAP objects remediated (S/4HANA migration)          │
│  → 40–60% query performance improvement via AMDP            │
│  → €50K+ client cost avoided (LT03 custom solution)         │
│  → 16 consecutive INSTA Rewards @ Infosys                   │
│  → 5× Unit Rise Awards                                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| `xs` | `< 480px` | Single column, minimal padding |
| `sm` | `< 640px` | Single column, orbit tags hidden |
| `md` | `< 768px` | Single column, journal pills stack |
| `lg` | `< 1024px` | Tablet — hero goes single column |
| `xl` | `≥ 1280px` | Full desktop layout |

---

## 🔗 Links

<div align="center">

| Platform | Link |
|----------|------|
| 🌐 Portfolio | [rahulmsingh337.github.io/3dportfolio](https://rahulmsingh337.github.io/3dportfolio) |
| 💼 LinkedIn | [linkedin.com/in/rahul-singh-sap-abap](https://www.linkedin.com/in/rahul-singh-sap-abap/) |
| 🐙 GitHub | [github.com/rahulmsingh337](https://github.com/rahulmsingh337) |
| 📸 Instagram | [instagram.com/squatile3375](https://www.instagram.com/squatile3375/) |
| 🤖 Prompify | [prompifytech.vercel.app](https://prompifytech.vercel.app) |
| 📄 Previous Portfolio | [rahulsinghsap.netlify.app](https://rahulsinghsap.netlify.app) |

</div>

---

<div align="center">

**Built with ❤️ and a lot of ABAP**

*© 2026 Rahul Singh. All rights reserved.*

</div>
