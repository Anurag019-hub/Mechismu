# Mechismu Racing -- Official Website

## Overview

Mechismu Racing is the official website for Team Mechismu, the Formula Student electric vehicle racing team of IIT (ISM) Dhanbad. The site serves as the team's digital presence, showcasing their race cars, engineering projects, competition history, team members, and sponsorship opportunities.

The website is a single-page application built with React 19 and Vite, featuring GSAP and Framer Motion animations, lazy-loaded routes, and a responsive design optimized for both desktop and mobile. It is deployed on Vercel and accessible at [mechismu.nvcti.in](https://mechismu.nvcti.in/).

## Features

- **Car Showcase**: Interactive car selector displaying 4 vehicles with specs, domain breakdowns, image galleries, and development timelines. Data is cleaned at render time to handle incomplete entries gracefully.
- **Team Directory**: Filterable and searchable roster supporting multi-year team data (2024, 2025, 2026). Members are organized by 8 department sections with role-based sorting (leads and heads appear first).
- **Competition History**: Year-filterable wins archive spanning 7 competition years (2010--2025), with highlight strips and result breakdowns per event.
- **Projects Portfolio**: Displays 6 engineering projects (BMS, Motor Controller, VCU, H-CBM Vehicle, Passive Aero, MREX-03 Insights), each with structured sections covering purpose, architecture, testing, and strategic value.
- **Sponsor Management**: Sponsor directory with status-based (current/past) and year-based (2022--2025) filtering, tier-sorted display, deduplication logic, and NVCTI pinning. Includes tier benefits, partnership rationale, and support methods sections.
- **Contact Form**: EmailJS-integrated contact form with subject protocol selection (Sponsorship, Technical, Media, General) and real-time validation.
- **SEO Implementation**: Per-page meta tags via react-helmet-async, structured data (JSON-LD), Open Graph and Twitter Card tags, canonical URLs, sitemap generation, and Google Search Console verification.
- **Performance Optimizations**: Route-level code splitting with React.lazy, GSAP and Motion-driven scroll-triggered animations, font preloading with non-blocking loading strategy, and manual Rollup chunk splitting for vendor, router, GSAP, Motion, and icon bundles.
- **Responsive Navigation**: Glassmorphism-styled navbar with hamburger toggle and full-screen mobile overlay menu.
- **Page Transitions**: AnimatePresence-powered route transitions with Suspense fallback to a custom PageLoader component.

## Tech Stack

### Frontend

| Technology       | Purpose                                      |
|------------------|----------------------------------------------|
| React 19         | UI component library                         |
| React Router 7   | Client-side routing with lazy-loaded routes  |
| GSAP 3           | Scroll-triggered and entrance animations     |
| Framer Motion    | Page transition animations (AnimatePresence) |
| Tailwind CSS 4   | Utility-first styling (via Vite plugin)      |
| Lucide React     | Icon system                                  |
| React Helmet     | Per-page SEO meta tag management             |

### Backend

This project does not include a custom backend. Form submissions are handled client-side via EmailJS.

### Database

No database is used. All data (cars, sponsors, wins, team members, projects) is stored as static JSON and JavaScript modules within the `src/data/` and `src/features/*/data/` directories.

### Authentication

No authentication is implemented.

### Deployment

| Tool                  | Purpose                                      |
|-----------------------|----------------------------------------------|
| Vercel                | Hosting and continuous deployment            |
| Vercel Analytics      | Usage analytics                              |
| vite-plugin-sitemap   | Automated sitemap generation at build time   |

### Other Tools

| Tool         | Purpose                            |
|--------------|------------------------------------|
| EmailJS      | Client-side contact form emails    |
| ESLint       | Code linting and style enforcement |
| Vite 7       | Build tool and development server  |

## Architecture

The application follows a feature-based architecture with shared components:

```
Browser Request
    |
    v
index.html (entry point, SEO meta, structured data, font preloading)
    |
    v
main.jsx (React root, HelmetProvider, StrictMode)
    |
    v
App.jsx (BrowserRouter, ScrollToTop, AnimatedRoutes)
    |
    v
Layout.jsx (Navbar + main content area + Footer)
    |
    v
React.lazy() loaded pages (Home, About, Cars, Team, Wins, Projects, Sponsors, Contact)
    |
    v
Feature-specific components (e.g., CarSelector, TeamCard, SponsorFilters)
    |
    v
Static data modules (src/data/, src/features/*/data/)
```

**Key architectural decisions:**

- **Feature modules** (`src/features/`) encapsulate cars, team, wins, projects, sponsors, and contact as self-contained units with their own components, pages, data, hooks, and styles.
- **Shared components** (`src/components/`) house globally reused elements like Navbar, Footer, and homepage section previews.
- **Data layer** uses static JavaScript/JSON files rather than API calls, with data aggregated through index barrel files.
- **Animation** is split between GSAP (scroll-triggered reveals, staggered grid animations) and Framer Motion (route transitions via AnimatePresence).
- **Memoization** is applied extensively via `React.memo` and `useCallback`/`useMemo` to minimize unnecessary re-renders on filter and search operations.

## Installation

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/Anurag019-hub/Mechismu.git
   cd Mechismu
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root with the required environment variables (see section below).

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Build for production:

   ```bash
   npm run build
   ```

6. Preview the production build locally:

   ```bash
   npm run preview
   ```

## Environment Variables

| Variable                    | Description                        | Required |
|-----------------------------|------------------------------------|----------|
| `VITE_EMAILJS_SERVICE_ID`  | EmailJS service identifier         | Yes      |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS email template identifier  | Yes      |
| `VITE_EMAILJS_PUBLIC_KEY`  | EmailJS public API key             | Yes      |

## API Endpoints

This project does not expose or consume REST API endpoints. All data is sourced from static files bundled at build time. The only external service integration is EmailJS, which is invoked client-side through its browser SDK.

## Usage

1. **Home**: Landing page with preview sections for About, Cars, Team, Achievements, and Sponsors. Each preview section links to its full page.
2. **About** (`/about`): Team introduction, engineering philosophy, organizational timeline, technical domain descriptions, achievements, and funding information.
3. **Cars** (`/cars`): Select from 4 cars (MREX02, CAR01, MRX02, MRX01) to view hero images, performance stats, domain-specific details, full specifications, image galleries, and development timelines.
4. **Team** (`/team`): Browse team members by year (2024/2025/2026), filter by department (Leadership, Structures, LV, VD, HV, Ops, etc.), or search by name/role.
5. **Wins** (`/wins`): Browse competition results across 7 years. Each year shows highlights, milestones, and individual competition breakdowns.
6. **Projects** (`/projects`): View 6 featured engineering projects with category tags, status indicators, and multi-section technical descriptions.
7. **Sponsors** (`/sponsors`): Browse sponsors filtered by status (current/past) and year (2022--2025). View sponsorship tier benefits, reasons to partner, and support methods.
8. **Contact** (`/contact`): Submit inquiries through a form with subject protocol selection. Messages are delivered via EmailJS.

## Project Structure

```
mechismu/
├── index.html                    # Entry HTML with SEO, structured data, fonts
├── package.json                  # Dependencies and scripts
├── vite.config.js                # Vite config with plugins and chunk splitting
├── vercel.json                   # Vercel rewrites and cache headers
├── .env                          # EmailJS credentials (not committed)
├── public/
│   ├── favicon/                  # Favicons and web manifest
│   └── images/                   # Static images (cars, sponsors, projects)
└── src/
    ├── main.jsx                  # React entry point
    ├── App.jsx                   # Router setup, lazy routes, AnimatePresence
    ├── ScrollToTop.jsx           # Scroll restoration on navigation
    ├── index.css                 # Global CSS resets
    ├── App.css                   # Application-level styles
    ├── assets/
    │   ├── images/               # Bundled images (logo)
    │   └── icons/                # SVG icon components (SocialIcons)
    ├── config/
    │   └── links.js              # Centralized route and social media URLs
    ├── layout/
    │   ├── Layout.jsx            # Navbar + content + Footer wrapper
    │   └── Layout.css
    ├── pages/                    # Route-level page components (thin wrappers)
    │   ├── Home.jsx
    │   ├── about/About.jsx
    │   ├── Cars.jsx
    │   ├── Contact.jsx
    │   ├── Projects.jsx
    │   ├── Sponsors.jsx
    │   └── Wins.jsx
    ├── components/               # Shared/reusable components
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── home/                 # Homepage section components
    │   ├── intro/
    │   ├── philosophy/
    │   ├── timeline/
    │   ├── domains/
    │   ├── achievements/
    │   ├── funding/
    │   ├── contact/
    │   ├── sponsors/
    │   └── ui/                   # Generic UI components (PageLoader)
    ├── features/                 # Feature modules (self-contained)
    │   ├── cars/
    │   │   ├── components/       # CarHero, CarSelector, CarSpecs, etc.
    │   │   └── pages/            # CarsPage
    │   ├── team/
    │   │   ├── components/       # FilterBar, TeamCard, TeamSection, YearSelector
    │   │   ├── data/             # Team member JSON (by year)
    │   │   ├── hooks/            # useTeamFilter custom hook
    │   │   └── pages/            # TeamPage
    │   ├── wins/
    │   │   ├── components/       # CompetitionCard, HighlightStrip, YearFilter, YearSection
    │   │   └── pages/            # WinsPage
    │   ├── projects/
    │   │   └── pages/            # ProjectsPage
    │   ├── sponsors/
    │   │   ├── components/       # SponsorCard, SponsorFilters, SponsorTiers
    │   │   └── pages/            # SponsorsPage
    │   └── contact/
    │       ├── components/       # ContactForm
    │       └── pages/            # ContactPage
    ├── data/                     # Static data modules
    │   ├── cars/                 # Car data (MREX02, CAR01, MRX01, MRX02)
    │   ├── sponsors/             # Sponsor data (present, past, tiers, benefits)
    │   ├── wins/                 # Win data by year (2010--2025)
    │   └── projects.json         # Projects data (6 projects)
    └── styles/
        └── base.css              # Base typography and resets
```

### Key Directories

- **`src/features/`**: Each feature (cars, team, wins, etc.) is isolated with its own components, pages, data, and hooks. This separation enables independent development and lazy loading.
- **`src/components/`**: Houses shared UI elements used across multiple pages. The `home/` subdirectory contains homepage-specific preview components.
- **`src/data/`**: Centralized static data. Car specs, sponsor lists, and competition results are maintained as JavaScript modules and JSON files for easy updates without code changes.
- **`public/images/`**: Static assets served directly by Vercel. Includes car photos, sponsor logos, and project images.

## Challenges and Solutions

### Multi-Year Team Data with Role-Based Sorting

**Challenge**: Team members may belong to different departments and hold different roles across years. Displaying the correct information for the selected year while maintaining a lead-first sorting order required careful data modeling.

**Solution**: Team member data uses a `history` array with per-year entries containing departments and roles. The `useTeamFilter` hook filters members by the selected year, then applies a priority-based sort that surfaces Captains, Vice Captains, Heads, and Leads above general members within each department section.

### Sponsor Deduplication and Pinning

**Challenge**: The same sponsor (e.g., NVCTI) can appear in both the `present` and `past` data arrays, leading to duplicate cards when no filters are applied.

**Solution**: The sponsor filtering logic applies case-insensitive deduplication after status and year filters, then pins the NVCTI entry to the top of the list regardless of tier. This ensures a clean display without modifying the underlying data structure.

### Incomplete Car Data Handling

**Challenge**: Not all cars have complete data for every field (stats, specs, domains, galleries, timelines). Rendering null or empty values would break the UI.

**Solution**: The `CarsPage` component runs a `getCleanedData` function that strips null, undefined, and empty-string values from stats, specs, domains, and gallery arrays before rendering. Sections with no valid data are conditionally omitted entirely.

### Performance with GSAP Scroll Animations

**Challenge**: Multiple scroll-triggered GSAP animations across different pages can cause memory leaks and conflicting ScrollTrigger instances if not properly managed.

**Solution**: All GSAP animations are wrapped in `gsap.context()` scoped to component refs, with cleanup via `ctx.revert()` in `useEffect` return functions. This ensures all ScrollTrigger instances and tweens are properly disposed when components unmount.

## Performance Considerations

- **Route-level code splitting**: All 8 page components are loaded via `React.lazy()`, ensuring only the active page's code is downloaded.
- **Manual chunk splitting**: Vite's Rollup config creates separate chunks for `react`/`react-dom`, `react-router-dom`, `gsap`, `motion`, and `lucide-react`, enabling parallel downloads and long-term caching.
- **Font loading strategy**: Critical fonts (Space Grotesk 700/900) are preloaded; non-critical fonts (Inter, Oxanium, Poppins) are loaded asynchronously with `onload` pattern to prevent render blocking.
- **Image optimization**: Car and sponsor images use `.webp` and `.avif` formats. Gallery images use `loading="lazy"` and `decoding="async"` attributes.
- **Component memoization**: High-frequency components (Navbar, SponsorCard, SponsorFilters, FilterBar, TeamCard, ContactForm) use `React.memo` with stable callbacks via `useCallback` to prevent unnecessary re-renders.
- **Vercel cache headers**: Static assets under `/assets/` are cached for 1 year with `immutable` directive. Images under `/images/` are cached for 30 days with `stale-while-revalidate`.
- **CSS code splitting**: Enabled in Vite build config (`cssCodeSplit: true`) so each lazy-loaded route only loads its own styles.

## Future Improvements

- Migrate team member data to a CMS or API to simplify updates without code deployments.
- Add image optimization pipeline (responsive srcset, automated WebP/AVIF conversion).
- Implement a blog or news section for team updates and event reports.
- Add dark/light theme toggle with persisted user preference.
- Integrate Vercel Web Analytics dashboard for tracking page engagement.
- Add automated end-to-end tests for critical user flows (car selection, team filtering, contact form submission).
- Implement service worker and PWA capabilities for offline access to static content.
- Add internationalization support if the team targets an international audience.


## Contributing

1. Fork the repository.
2. Create a feature branch from `main`:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Follow the existing project structure. Place new feature modules under `src/features/` and shared components under `src/components/`.
4. Use component-scoped CSS files co-located with their components.
5. Memoize components that receive stable props or are rendered within lists.
6. Run the linter before committing:

   ```bash
   npm run lint
   ```

7. Commit with clear, descriptive messages.
8. Open a pull request against `main` with a description of the changes.



