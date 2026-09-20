# Thurayilkunnu Sree Subramanya Swami Temple
### തുറയിൽകുന്ന് ശ്രീ സുബ്രഹ്മണ്യസ്വാമി ക്ഷേത്രം

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![PWA](https://img.shields.io/badge/PWA-Ready-orange?style=flat-square&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![i18n](https://img.shields.io/badge/i18n-English%20%7C%20Malayalam-success?style=flat-square)](https://react.i18next.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](./LICENSE)

The official web portal and devotee progressive web application (PWA) for **Thurayilkunnu Sree Subramanya Swami Temple**, an ancient sanctuary of Lord Subramanya (Murugan) situated on the sacred hillock of Thurayilkunnu, Karunagappally, Kollam District, Kerala.

**Live Portal:** [thurayilkunnutemple.technobyteinnovations.in](https://thurayilkunnutemple.technobyteinnovations.in/)

---

## Table of Contents

- [About the Temple](#about-the-temple)
- [Sanctum & Deities](#sanctum--deities)
- [Darshan & Pooja Timings](#darshan--pooja-timings)
- [Key Features of the Portal](#key-features-of-the-portal)
- [Annual Festivals](#annual-festivals)
- [Vazhipadu & Offerings](#vazhipadu--offerings)
- [Donations & E-Hundi](#donations--e-hundi)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development Server](#development-server)
  - [Production Build](#production-build)
- [Contact & Location](#contact--location)

---

## About the Temple

Established and consecrated in **1952**, the Thurayilkunnu Sree Subramanya Swami Temple carries over 70 years of spiritual heritage, adhering strictly to authentic Kerala tantric rituals. Nestled atop the peaceful hillock in Karunagappally, the temple serves as a beacon of serenity, drawing thousands of devotees seeking the blessings, strength, and divine protection of Lord Velayudha (Subramanya).

- **Presiding Deity:** Lord Subramanya Swami (Murugan / Balamurugan / Devasenapati)
- **Consecration Year:** 1952
- **Tradition:** Kerala Tantric Pooja Vidhi
- **Location:** Thurayilkunnu, Maru: South, Alumkadavu P.O., Karunagappally, Kollam, Kerala - 690573

---

## Sanctum & Deities

The temple complex houses the presiding sanctum along with revered Upadevathas (subsidiary shrines):

1. **Lord Subramanya Swami (ശ്രീ സുബ്രഹ്മണ്യസ്വാമി):** Presiding Deity holding the divine Vel, seated on the peacock vahana; dispeller of karmic hindrances and fear.
2. **Lord Mahaganapathy (ശ്രീ മഹാഗണപതി):** The Lord of Beginnings, invoked through daily Ganapathy Homam to clear all obstacles.
3. **Goddess Durga / Bhagavathy (ദുർഗ്ഗാ ഭഗവതി):** The Supreme Mother and protector, worshipped for health, prosperity, and fearlessness.
4. **Lord Shiva (ശ്രീ മഹാദേവൻ):** The Supreme Yogi and Mrityunjaya, granting peace and longevity.
5. **Nagaraja & Nagayakshi (നാഗരാജാവ് സർപ്പക്കാവ്):** Sacred serpent grove for Sarpa Dosha Nivarana, fertility, and ancestral blessings.

---

## Darshan & Pooja Timings

The sanctum doors are opened twice daily according to traditional temple routines:

| Session | Timings | Details |
| :--- | :--- | :--- |
| **Morning (പ്രഭാതം)** | `05:00 AM – 10:30 AM` | Nirmalyam, Abhishekam, Usha Pooja, Ganapathy Homam, Pantheeradi Pooja, Ucha Pooja |
| **Evening (സന്ധ്യ)** | `05:30 PM – 08:00 PM` | Deeparadhana, Athazha Pooja, Chuttuvilakku, Harivarasanam / Nada Adakkal |

*Note: On festival days, Sashti, Vishu, and Thaipusam, the temple remains open for extended hours.*

---

## Key Features of the Portal

- **Bilingual Experience (English & മലയാളം):** Fully localized bilingual application with automatic browser language detection and seamless toggle.
- **Live Darshan Indicator:** Real-time Indian Standard Time (IST) engine calculating whether the sanctum is presently open, with countdown to the next opening.
- **Astronomical Daily Panchangam:** Kerala Panchangam calculator powered by `panchang-ts`, calibrated to Karunagappally's exact coordinates (`9.0281° N, 76.5365° E`), showing Tithi, Nakshatra, Yoga, Karana, Sunrise/Sunset, and Rahu Kalam.
- **Nakshatra Pooja Recommender:** Devotees can select their Janma Nakshatra (birth star among 27 stars) to receive tailored vazhipadu recommendations and spiritual advice.
- **Digital Vazhipadu Booking & Receipts:** Devotees can select offerings, enter their star and gotram, and generate printable digital booking receipts or book instantly via WhatsApp.
- **E-Hundi & Seva Contribution:** Direct bank transfer and UPI QR integration for causes like *Annadanam Samarpanam*, *Temple Renovation Fund*, *Nithya Pooja Nidhi*, and *Chuttuvilakku Seva*.
- **Ambient Bhakti Soundscape:** Built-in, low-latency audio synthesizer built on the Web Audio API that generates sacred temple bell harmonics and meditative drones without external media assets.
- **Upcoming Festival Countdown:** Dynamic countdown timer tracking the next major temple festival in real time.
- **Progressive Web App (PWA):** Devotees can install the website directly to their home screen on Android, iOS, or desktop for quick access and offline caching.
- **Interactive Shrines & Pilgrimage Guide:** Comprehensive guide to the temple premises and neighboring shrines (Ochira Parabrahma, Amritapuri, Sasthamkotta, Panmana, and Pullanthara Mahaganapathy).
- **Photo Gallery:** Categorized photo showcase with full-screen lightbox viewing.
- **Search Engine Optimization (SEO):** OpenGraph tags, Twitter Cards, canonical links, and Schema.org `HinduTemple` JSON-LD structured data.

---

## Annual Festivals

- **Uthrattathi Mahotsavam (ഉത്രട്ടാതി മഹോത്സവം):** The premier annual temple festival celebrated with Parayeduppu, traditional Panchavadyam, and temple melams.
- **Thaipusam Kavadi Mahotsavam (തൈപ്പൂയം കാവടിയാട്ടം):** Grand annual festival featuring vibrant Kavadi processions, Palabhishekam, and community Annadanam.
- **Skanda Sashti & Soorasamharam (സ്കന്ദ ഷഷ്ഠി):** 6 sacred days of fasting, Soorasamharam re-enactment, and special Subramanya poojas.
- **Skanda Purana Yajnam (സ്കന്ദ പുരാണ യജ്ഞം):** Multi-day sacred Purana Parayanam, homams, and spiritual discourses.
- **Thrikarthika Deepotsavam (തൃക്കാർത്തിക ദീപോത്സവം):** Festival of lights where the entire temple is illuminated with thousands of oil lamps (Chuttuvilakku).
- **Vishu Kani Darshan (വിഷുക്കണി ദർശനം):** Auspicious dawn darshan welcoming the Malayalam New Year with Vishukkaineettam.

---

## Vazhipadu & Offerings

Devotees can book sacred poojas and vazhipadus directly:

- **Archana & Pushpanjali:** Daily floral offerings for peace and health.
- **Muttarukkal:** Astrological coconut-breaking ritual for obstacle removal.
- **Ganapathy Homam:** Sacred morning fire ritual invoking Lord Ganesha.
- **Palabhishekam & Bhasmabhishekam:** Milk and sacred ash showers upon the deity.
- **Panchamrutham & Payasa Prasadam:** Sweet nectars prepared in sanctum tradition.
- **Shatrusamhara Pushpanjali:** Protection against negative energy and fear.
- **Thulabharam:** Sacred weighing vow offering in fulfillment of prayers.
- **Chuttuvilakku:** Lighting rows of brass deepams around the temple walls.
- **Annadanam:** Sponsoring sacred feast for pilgrims visiting the temple.

---

## Donations & E-Hundi

Devotees wishing to contribute to temple maintenance and charity may use direct trust bank transfers or UPI:

- **UPI ID:** `thurayilkunnutemple@sbi`
- **Account Name:** Thurayilkunnu Sree Subramanya Swami Temple Trust
- **Bank:** State Bank of India (SBI)
- **Branch:** Karunagappally
- **IFSC:** `SBIN0070054`
- **Account Type:** Current Account

---

## Technology Stack

| Category | Technologies |
| :--- | :--- |
| **Framework & Core** | [React 19](https://react.dev/), [Vite 7](https://vite.dev/) |
| **Routing** | [React Router DOM v7](https://reactrouter.com/) |
| **Animation** | [Framer Motion v12](https://www.framer.com/motion/) |
| **Localization (i18n)** | [i18next](https://www.i18next.com/), [react-i18next](https://react.i18next.com/), Browser Language Detector |
| **Astrology & Panchangam** | [panchang-ts](https://github.com/mrvignesh/panchang-ts) (Astronomical calculations) |
| **Audio Synthesis** | HTML5 Web Audio API (real-time harmonic tone synthesis) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **SEO & Metadata** | [react-helmet-async](https://github.com/staylor/react-helmet-async), Schema.org JSON-LD |
| **Styling** | Custom Vanilla CSS (Design system, responsive layouts, luxury gold/maroon spiritual theme) |
| **PWA & Offline** | Web App Manifest, Service Worker (`sw.js`) |

---

## Project Structure

```text
thurayilkunnu-temple/
├── public/
│   ├── images/               # Banners, deities, festivals, offerings & gallery
│   ├── favicon.svg           # Temple crest icon
│   ├── manifest.webmanifest  # PWA configuration
│   ├── og-image.jpg          # Social media preview card
│   ├── robots.txt            # Search engine crawler directives
│   ├── sitemap.xml           # XML sitemap for SEO
│   └── sw.js                 # Service worker for offline asset caching
├── src/
│   ├── components/           # Reusable UI widgets
│   │   ├── Banner.jsx              # Hero banner with slide animations
│   │   ├── BhaktiAudioPlayer.jsx   # Ambient temple soundscape engine
│   │   ├── Footer.jsx              # Universal site footer & quick links
│   │   ├── InstallPwaBanner.jsx    # Add-to-homescreen prompt
│   │   ├── NakshatraRecommender.jsx# Birth star pooja recommendation tool
│   │   ├── Navbar.jsx              # Responsive header navigation
│   │   ├── NoticeBanner.jsx        # Announcement ticker
│   │   ├── NoticeModal.jsx         # Urgent temple festival notices
│   │   ├── PageHero.jsx            # Standardized inner page header
│   │   ├── PanchangamWidget.jsx    # Real-time Kerala Panchangam
│   │   ├── SEO.jsx                 # Dynamic meta tags & head management
│   │   └── TopBar.jsx              # Contact & quick timings bar
│   ├── pages/                # Route views
│   │   ├── Home.jsx          # Landing page with stats, countdown & intro
│   │   ├── About.jsx         # Temple history, architecture & nearby shrines
│   │   ├── Deities.jsx       # Sanctum and Upadevatha shrine profiles
│   │   ├── Festivals.jsx     # Major annual celebrations & dates
│   │   ├── Offerings.jsx     # Vazhipadu catalogue, calculator & booking
│   │   ├── Donations.jsx     # E-Hundi, bank details & receipt requests
│   │   ├── Gallery.jsx       # Filterable photo gallery with lightbox
│   │   ├── Contact.jsx       # Address, maps, timings & enquiry form
│   │   └── NotFound.jsx      # Custom 404 page
│   ├── styles/               # Component and page stylesheets
│   ├── utils/
│   │   ├── darshanStatus.js  # Live IST temple door open/closed tracker
│   │   └── nakshatras.js     # 27 Janma Nakshatra astrological metadata
│   ├── App.jsx               # Application root layout & route definitions
│   ├── i18n.js               # English and Malayalam dictionary definitions
│   ├── index.css             # Base reset and typography tokens
│   └── main.jsx              # Application mount point
├── index.html                # Main HTML entry with OpenGraph & Schema.org
├── package.json              # Project dependencies and npm scripts
└── vite.config.js            # Vite build configuration
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.0 or higher recommended)
- [npm](https://www.npmjs.com/) (bundled with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aneeshaji/thurayilkunnu-temple.git
   cd thurayilkunnu-temple
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server

Start the local Vite development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

### Production Build

Create an optimized, minified production build:

```bash
npm run build
```

The output will be created inside the `dist/` directory, ready for deployment to any static hosting service (Netlify, Vercel, Azure Static Web Apps, cPanel, or Apache).

To preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint to check for code quality and syntax standards:

```bash
npm run lint
```

---

## Contact & Location

- **Address:** Thurayilkunnu Sree Subramanya Swami Temple, Thurayilkunnu, Maru: South, Alumkadavu P.O., Karunagappally, Kollam District, Kerala - 690573, India
- **Phone:** [+91 79943 42205](tel:+917994342205) / [+91 90727 22205](tel:+919072722205)
- **Email:** info@subramanyatemple.com
- **Coordinates:** `9.1258969° N, 76.5064915° E`
- **Google Maps:** [Location Link](https://maps.google.com/?q=9.1258969,76.5064915)

---

*Om Saravanabhavaya Namaha ॐ | ശാന്തി, ഐശ്വര്യം, സംരക്ഷണം*
