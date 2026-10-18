// Prerender every public route into dist/<route>/index.html.
// Run after:  vite build  &&  vite build --ssr src/entry-server.tsx --outDir dist-ssr
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const { render } = await import(pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href);

// Routes come from the sitemap, plus a few that are not in it.
const sitemap = fs.readFileSync(path.join(root, "public", "sitemap.xml"), "utf8");
const routes = new Set(["/"]);
for (const m of sitemap.matchAll(/<loc>https?:\/\/[^/<]+([^<]*)<\/loc>/g)) routes.add(m[1] || "/");
["/ai-agents", "/uae", "/usa", "/propai", "/products", "/products/ai-receptionist", "/products/prop-ai", "/products/ai-sales-agent", "/products/ai-customer-support"].forEach((r) => routes.add(r));

let ok = 0;
for (const route of routes) {
  try {
    const { html, head, htmlAttrs } = await render(route);
    let page = template.replace("<!--app-html-->", html);
    if (htmlAttrs.trim()) page = page.replace(/<html[^>]*>/, `<html ${htmlAttrs}>`);
    if (head.includes("<title")) {
      page = page.replace(/<!--seo-start-->[\s\S]*?<!--seo-end-->/, head);
    }
    const out = route === "/" ? path.join(dist, "index.html") : path.join(dist, route.replace(/^\//, ""), "index.html");
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, page);
    ok++;
    console.log("  prerendered", route);
  } catch (e) {
    console.warn("  skipped    ", route, "-", e?.message ?? e);
  }
}
console.log(`Prerendered ${ok}/${routes.size} routes.`);
