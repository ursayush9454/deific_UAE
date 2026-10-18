# Deific Digital website — 2026 redesign

## What changed
- New homepage: "auto mode" hero with live AI console, AI agents for hire, automation flows,
  industry automation (real estate, hospital, CA firm, car dealers, others), savings calculator,
  development services, PropAI + Review Ninja Pro, 4-step process, FAQ, free-audit form.
- New header (India / UAE switch, WhatsApp, "Free automation audit") and footer.
- Mobile sticky bar: Call · WhatsApp · Free audit.
- Lead capture on 5 places (hero, agents, industries, calculator, audit form).
- SEO: every page is prerendered to real HTML at build time, new title/description, Open Graph image,
  Organization + FAQ schema, hreflang (en-IN / ar-AE), fixed canonical on service pages,
  robots.txt and sitemap.xml now actually served from /public.

## Build
    npm install
    npm run build        # builds + prerenders all pages into dist/
Upload the whole `dist/` folder to the server.

## Server (nginx)
    location / {
        try_files $uri $uri/index.html $uri/ /index.html;
    }

## Leads
Set in `.env` before building (optional — without it, forms open WhatsApp with details filled in):
    VITE_LEAD_ENDPOINT=https://your-n8n-domain/webhook/website-lead
Forms also push a `generate_lead` event for GA4 / GTM.

## Things to update
- `src/static/siteConfig.ts` — add your +971 UAE number when it is live (phoneAE / whatsappAE).
- `index.html` — paste your GA4 / Google Tag Manager snippet.

## UAE site (added)
- deificdigital.com/uae      → UAE in English (AED prices, +971 default, Dubai content)
- deificdigital.com/uae/ar   → UAE in Arabic (same content, right-to-left)
- Header shows an EN / عربي switch on UAE pages, plus India / UAE switch.
- UAE text and prices: `src/static/regions.ts` (English) and `src/static/regionAr.ts` (Arabic).
- Interface text in both languages: `src/static/copy.ts`.
- AED prices are suggested starting prices based on Dubai market rates — confirm before going live.
- Add the +971 number in `src/static/siteConfig.ts` (phoneAE, telAE, whatsappAE). Until then UAE WhatsApp goes
  to the India number and the Call button is hidden on UAE pages.
