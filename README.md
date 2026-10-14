# ABL Travels - Storefront Frontend

A modern, high-performance web storefront built with **React 19**, **Vite**, and **Tailwind CSS v4**.

---

## 📁 Professional Architecture & File Structure

The project has been refactored into a scalable, domain-driven structure adhering to modern React and enterprise standards:

```text
Frontend/
├── public/                     # Static assets served as-is (images, favicon)
│   ├── favicon.svg
│   └── images/                 # Optimized webp/png background & hero assets
├── src/
│   ├── assets/                 # SVGs and bundled local assets
│   ├── components/
│   │   ├── common/             # Reusable, standalone UI elements & SVGs
│   │   │   ├── PagodaIllustration.jsx
│   │   │   └── index.js
│   │   ├── layout/             # Global layout containers and chrome
│   │   │   ├── Header/         # Responsive navigation & mobile menu
│   │   │   │   ├── Header.jsx
│   │   │   │   └── index.js
│   │   │   ├── Footer/         # Complete footer with brand, links & accreditation
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── NewsletterBanner.jsx
│   │   │   │   ├── PartnersBar.jsx
│   │   │   │   └── index.js
│   │   │   └── index.js
│   │   ├── sections/           # Dedicated, modular landing page sections
│   │   │   ├── Hero/           # Dynamic carousel hero & search bar
│   │   │   │   ├── Hero.jsx
│   │   │   │   ├── SearchWidget.jsx
│   │   │   │   └── index.js
│   │   │   ├── Features/       # Trust points and key features strip
│   │   │   │   ├── FeaturesBar.jsx
│   │   │   │   └── index.js
│   │   │   ├── Visa/           # China visa highlight section
│   │   │   │   ├── VisaSection.jsx
│   │   │   │   └── index.js
│   │   │   ├── TourPackages/   # Interactive tour carousel cards
│   │   │   │   ├── TourPackages.jsx
│   │   │   │   └── index.js
│   │   │   ├── Services/       # All services & Bangladesh highlight
│   │   │   │   ├── ServicesSection.jsx
│   │   │   │   └── index.js
│   │   │   ├── Bangladesh/     # Standalone showcase section
│   │   │   │   ├── BangladeshSection.jsx
│   │   │   │   └── index.js
│   │   │   └── index.js
│   │   └── index.js            # Master barrel export for components
│   ├── constants/              # Centralized domain data, navigation & copy
│   │   ├── destinations.js     # Top destinations & slide definitions
│   │   ├── navigation.js       # Header links, footer links, social links
│   │   ├── services.js         # Service catalog, badges, stats & features
│   │   └── index.js
│   ├── hooks/                  # Custom reusable React hooks
│   │   ├── useCarousel.js      # Carousel state & autoplay engine
│   │   └── index.js
│   ├── pages/                  # Routed views / Page layer
│   │   ├── HomePage.jsx        # Landing page composition
│   │   └── index.js
│   ├── utils/                  # Helper utilities (cn, slugify)
│   │   └── index.js
│   ├── App.jsx                 # Application root orchestrator
│   ├── index.css               # Design tokens, theme variables & Tailwind
│   └── main.jsx                # DOM mount entry point
├── jsconfig.json               # Absolute import resolution (@/* -> src/*)
├── package.json
└── vite.config.js              # Vite configuration with path aliases
```

---

## ⚡ Path Aliases

Path alias `@` is configured to resolve directly to `src/`.

Instead of relative chains like `../../data/site`:
```javascript
// Clean & maintainable
import { Header, Footer } from '@/components/layout'
import { DESTINATIONS } from '@/constants'
import { useCarousel } from '@/hooks'
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Run Static Code Analysis (Oxlint)
```bash
npm run lint
```

### 4. Build for Production
```bash
npm run build
```

---

## 🛠 Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons**: Lucide React
- **Linter**: Oxlint
