// Generates public/sitemap.xml (static pages + every city page from src/static/cities.ts).
// Runs automatically before `npm run build`. Run manually: node scripts/generate-sitemap.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://deificdigital.com";
const today = new Date().toISOString().slice(0, 10);

const cities = [...fs.readFileSync(path.join(root, "src/static/cities.ts"), "utf8").matchAll(/^\s*slug:\s*"([a-z-]+)"/gm)].map((m) => m[1]);

const homeAlt = `
    <xhtml:link rel="alternate" hreflang="en-IN" href="${SITE}/"/>
    <xhtml:link rel="alternate" hreflang="en-AE" href="${SITE}/uae"/>
    <xhtml:link rel="alternate" hreflang="ar-AE" href="${SITE}/uae/ar"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/"/>`;

// [path, changefreq, priority, extra]
const pages = [
  ["/", "weekly", "1.0", homeAlt],
  ["/software-company-in-india", "weekly", "0.9"],
  ["/ai-agents", "monthly", "0.9"],
  ["/uae", "monthly", "0.9", homeAlt],
  ["/uae/ar", "monthly", "0.9", homeAlt],
  ["/propai", "monthly", "0.9"],
  ["/services/automation", "monthly", "0.9"],
  ["/services/chatbots-virtual-assistants", "monthly", "0.9"],
  ["/services/ai-integration-service", "monthly", "0.8"],
  ["/services/generative-ai-solution", "monthly", "0.8"],
  ["/services/mvp-development", "monthly", "0.8"],
  ["/services/android-app-development", "monthly", "0.8"],
  ["/services/ios-app-development", "monthly", "0.8"],
  ["/services/hybrid-app-development", "monthly", "0.7"],
  ["/services/cross-platform-app-development", "monthly", "0.7"],
  ["/services/search-engine-optimization", "monthly", "0.7"],
  ["/services/social-media-marketing", "monthly", "0.7"],
  ["/services/meta-ads", "monthly", "0.7"],
  ["/services/google-my-business-optimization", "monthly", "0.7"],
  ["/services/startup-idea-validation", "monthly", "0.6"],
  ["/about", "monthly", "0.7"],
  ["/portfolio", "monthly", "0.7"],
  ["/contact", "monthly", "0.7"],
  ["/team", "monthly", "0.5"],
  ["/technologies", "monthly", "0.5"],
  ["/industries", "monthly", "0.6"],
  ["/blog", "weekly", "0.7"],
  ["/blog/how-to-choose-the-right-digital-agency", "yearly", "0.6"],
  ["/blog/top-10-it-companies-in-india", "yearly", "0.6"],
  ["/careers", "weekly", "0.5"],
  ["/usa", "monthly", "0.6"],
  ["/products", "monthly", "0.7"],
  ["/products/ai-receptionist", "monthly", "0.7"],
  ["/products/prop-ai", "monthly", "0.7"],
  ["/products/ai-sales-agent", "monthly", "0.7"],
  ["/products/ai-customer-support", "monthly", "0.7"],
  ...cities.map((s) => [`/software-company-in-${s}`, "monthly", "0.8"]),
  ["/privacy-policy", "yearly", "0.3"],
  ["/terms-and-condition", "yearly", "0.3"],
];

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
  pages
    .map(([p, cf, pr, extra = ""]) => `  <url>\n    <loc>${SITE}${p === "/" ? "/" : p}</loc>${extra}\n    <lastmod>${today}</lastmod>\n    <changefreq>${cf}</changefreq>\n    <priority>${pr}</priority>\n  </url>`)
    .join("\n") +
  `\n</urlset>\n`;

fs.writeFileSync(path.join(root, "public", "sitemap.xml"), xml);
console.log(`sitemap.xml written: ${pages.length} URLs (${cities.length} city pages)`);
