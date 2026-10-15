# ABL Travels — Storefront & B2B Partner Portal

A modern, high-performance web application built with **React 19**, **Vite**, and **Tailwind CSS v4**, delivering both a customer-facing travel storefront and an enterprise B2B partner dashboard.

---

## 🌟 Key Features

### 1. 🏢 B2B Partner Portal (`/b2b` & `/profile`)
- **Panoramic Hero Banner**: Santorini sunset airplane background, partner avatar ring with camera badge, `B2B Partner` pill badge, and script slogan.
- **Floating 5-Tab Navigation**: Seamless switching between:
  - **My Profile**: Agency info, contact person, trade license, address, and password/security settings.
  - **My Applications**: Live status tracking for active and historical visa applications.
  - **Passport Pickup**: Ready-for-collection passport list, delivery tracking, and logistics updates.
  - **Invoices & Commission**: Financial summaries, commission calculation, and invoice management.
  - **Support**: Direct partner helpdesk, dedicated account manager, and inquiry ticketing.
- **Interactive Invoice Details Modal**:
  - Double-halo green `Paid` status badge.
  - Two-row metadata (`INV-2025-0187`, `12 Oct 2025`, `01 Sep 2025 – 30 Sep 2025`).
  - Key financial metrics: Total Passports, Gross Commission, Processing Fee, and Net Payable.
  - Searchable 28-passport itemized breakdown table with pagination.
- **Official Printable A4 Commission Voucher**:
  - Exact A4 paper dimensions (`210mm × 297mm`) with dedicated `@media print` stylesheet.
  - Folded origami logo with dual-curved gold and blue header wave swooshes.
  - Itemized table with calculation summary box ($280.00 payable).
  - Terms & notes, authorized signature line, and authentic circular ABL Travels rubber stamp (`ABL TRAVELS • Dhaka, Bangladesh`).

### 2. 🌍 Trusted Worldwide (Visa Success Section)
- **Silky-Smooth Scrollable Carousel**:
  - Horizontal scroll track with smooth snapping (`snap-x snap-mandatory`), touch swipe support, and drag-to-scroll.
  - Responsive cards with subtle edge gradient masks on overflowing boundaries.
  - Circular navigation arrows with hover-scaling and boundary auto-dimming.
  - Dynamic 5-dot pagination that updates in real time and supports direct click-to-scroll navigation.
- **Precision Arc Gauge**:
  - Open-arc progress ring (260°) with the percentage mathematically and visually centered inside the circle.
  - Embedded circular vector flags (China, Thailand, Singapore, Malaysia, UAE, Turkey, India, Schengen, UK, USA, Japan, Saudi Arabia).
  - Visas issued count and high-contrast statistics.

### 3. 🎯 Unified Global Header
- **Single Header Architecture**: Same storefront header shared seamlessly across public pages and B2B views.
- **Context-Aware Controls**: Dynamically renders "Partner Dashboard" CTA, notifications, profile shortcuts, and logout actions.

### 4. 🔐 Interactive B2B Login (`/login`)
- **Dynamic Multi-Banner Carousel**: High-resolution travel photography with auto-rotation (5s timer) and interactive thumbnail tabs.
- **Partner Authentication Form**: Email/password inputs, remember me, password recovery, and instant login redirect into `/b2b`.

---

## 📁 Architecture & Directory Structure

```text
storefront/
├── public/                               # Static assets served as-is
│   ├── favicon.svg
│   └── images/                           # High-res travel & hero banners
│       ├── santorini-plane-banner.jpg    # B2B hero panorama
│       ├── invoice-plane-header.jpg      # Official invoice header graphic
│       ├── login-banners/                # Multi-slide login carousel banners
│       └── login-thumbs/                 # Login banner thumbnail previews
├── src/
│   ├── assets/                           # Bundled vector assets & SVGs
│   ├── b2b/                              # B2B Partner Portal module
│   │   ├── B2BDashboard.jsx              # Main B2B dashboard container
│   │   ├── components/
│   │   │   ├── HeroBanner.jsx            # Panoramic partner banner
│   │   │   ├── DashboardTabs.jsx         # 5-tab floating pill bar
│   │   │   ├── InvoicesCommission/
│   │   │   │   ├── InvoicesCommissionView.jsx   # Invoices & metrics view
│   │   │   │   ├── CommissionDetailModal.jsx    # Interactive invoice modal
│   │   │   │   └── CommissionVoucherDocument.jsx # Printable official A4 voucher
│   │   │   └── Profile/
│   │   │       └── ProfileView.jsx       # Agency profile & security form
│   │   └── data/
│   │       ├── partnerData.js            # Partner profile & mock stats
│   │       └── commissionData.js         # Invoice list & passport items
│   ├── components/
│   │   ├── common/                       # Reusable micro-components
│   │   ├── layout/                       # Global layout elements
│   │   │   ├── Header/
│   │   │   │   └── Header.jsx            # Unified storefront & B2B header
│   │   │   └── Footer/
│   │   │       └── Footer.jsx            # Master footer
│   │   └── sections/                     # Homepage storefront sections
│   │       ├── Hero/                     # Dynamic storefront hero & search
│   │       ├── Features/                 # Value propositions & trust strip
│   │       ├── Visa/
│   │       │   ├── TrustedWorldwide.jsx  # Scrollable Visa Success carousel
│   │       │   └── VisaSection.jsx       # China Visa highlight section
│   │       ├── TourPackages/             # Package showcase
│   │       └── Services/                 # Full services catalog
│   ├── pages/                            # Top-level view routes
│   │   ├── HomePage.jsx                  # Storefront landing page
│   │   └── LoginPage.jsx                 # B2B partner login page
│   ├── App.jsx                           # Route controller & layout wrapper
│   ├── index.css                         # Design tokens, utilities & print styles
│   └── main.jsx                          # App entry point
├── jsconfig.json                         # Import alias configuration (@/* -> src/*)
├── package.json
└── vite.config.js                        # Vite build configuration
```

---

## ⚡ Path Aliases

The `@` alias points directly to `src/` for clean imports across the application:

```javascript
import { Header, Footer } from '@/components/layout'
import { TrustedWorldwide } from '@/components/sections/Visa'
import { CommissionVoucherDocument } from '@/b2b/components/InvoicesCommission/CommissionVoucherDocument'
```

---

## 🖨 Print Architecture for Official Vouchers

The official commission invoice voucher is optimized for physical printing and PDF export via `@media print`:
- Sets standard `size: A4 portrait; margin: 0;`
- Strips browser headers, footers, scrollbars, and modal chrome.
- Forces high-fidelity color printing with `-webkit-print-color-adjust: exact`.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
The app runs by default at `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
```

### 4. Run Linter
```bash
npm run lint
```

---

## 🛠 Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons**: Lucide React
- **Linter**: Oxlint
- **Version Control**: Git (Branch: `feat/dashboard-ui`)
