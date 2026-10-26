# Deific Digital — site-wide UAE Arabic mode

## What changed

- UAE English/Arabic is now a global setting that persists while navigating to About, Services, Products, Portfolio, Contact, Blog, Careers, Legal pages, product details, city pages, and the PropAI pages.
- The Header's language switch stays available on UAE-region pages and regular content routes after opening the Arabic version.
- The page language and document direction switch between `en-AE`/LTR and `ar-AE`/RTL globally.
- The Arabic translation layer also watches dynamically rendered/lazy-loaded components, translates visible text and common UI attributes (such as placeholders and accessible labels), and caches translations in local storage for faster repeat visits.
- Brand names, user-entered form contents, and live chat transcripts are excluded from automatic translation.
- The existing `/uae/ar` homepage retains its authored Arabic copy. Other page content is translated at runtime through Google's browser-accessible translation endpoint; the small built-in dictionary is only a fallback for common controls if that endpoint is unavailable.

## Run locally

```bash
npm install
npm run dev
```

For the production/SEO prerender build:

```bash
npm run build
```

## Production note

Runtime translation needs internet access from the visitor's browser and uses a public Google Translate endpoint that is not a guaranteed, versioned translation API. For guaranteed availability, privacy control, and fully reviewed Arabic wording in search-engine-rendered HTML, replace this runtime endpoint with a configured translation API/proxy or author Arabic locale files for each page.
