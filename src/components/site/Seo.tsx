import { Helmet } from "react-helmet-async";
import { SITE } from "@/static/siteConfig";

type SeoProps = {
  title: string;
  description: string;
  /** Path starting with "/", e.g. "/about". Used for canonical + og:url. */
  path: string;
  /** Absolute or site-relative image. Defaults to the shared OG image (JPG on purpose, see README note). */
  image?: string;
  type?: "website" | "article";
  locale?: string;
  noindex?: boolean;
  /** One or more JSON-LD objects. */
  jsonLd?: object | object[];
  /** Optional hreflang alternates: [{ hrefLang, path }] */
  alternates?: { hrefLang: string; path: string }[];
};

/**
 * One place for every page's <head>. Works with the prerender script
 * (title + meta + link + script are all picked up), so crawlers see
 * a unique title, description and canonical on every route.
 */
export function Seo({
  title,
  description,
  path,
  image = "/og-image.jpg",
  type = "website",
  locale = "en_IN",
  noindex,
  jsonLd,
  alternates,
}: SeoProps) {
  const url = `${SITE.url}${path === "/" ? "/" : path}`;
  const img = image.startsWith("http") ? image : `${SITE.url}${image}`;
  const ld = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1"} />
      <link rel="canonical" href={url} />
      {alternates?.map((a) => (
        <link key={a.hrefLang} rel="alternate" hrefLang={a.hrefLang} href={`${SITE.url}${a.path}`} />
      ))}
      <meta property="og:locale" content={locale} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      {ld.map((o, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(o)}
        </script>
      ))}
    </Helmet>
  );
}

/** BreadcrumbList helper. items = [["Home","/"],["Services","/services/x"], ...] */
export function breadcrumbLd(items: [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${SITE.url}${path}`,
    })),
  };
}
