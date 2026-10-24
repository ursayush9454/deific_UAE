import { Link } from "react-router-dom";
import { ArrowUpRight, Check, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { Seo, breadcrumbLd } from "@/components/site/Seo";
import { CITIES, CITY_BY_SLUG, INDIA_HUB_PATH, cityPath, type City } from "@/static/cities";
import { SITE, waLink } from "@/static/siteConfig";

const SERVICES: { label: string; text: string; to: string }[] = [
  { label: "Custom software development", text: "Web applications, portals, ERP and CRM built around how your team really works.", to: "/services/mvp-development" },
  { label: "Android app development", text: "Native Android apps for customers, field staff and delivery teams.", to: "/services/android-app-development" },
  { label: "iOS app development", text: "Polished iPhone and iPad apps, published on the App Store.", to: "/services/ios-app-development" },
  { label: "Cross-platform apps", text: "One codebase for Android and iOS to launch faster at lower cost.", to: "/services/cross-platform-app-development" },
  { label: "AI agents & WhatsApp automation", text: "AI receptionist, sales and customer-care agents that answer in seconds.", to: "/ai-agents" },
  { label: "Business automation", text: "Reminders, follow-ups, reports and data entry that run without your team.", to: "/services/automation" },
];

function faqsFor(c: City) {
  const industries = c.industries.map(([n]) => n.toLowerCase()).join(", ");
  return [
    {
      q: `How do I choose a software company in ${c.name}?`,
      a: `Check four things: relevant past work, a written scope and estimate, security practices, and how quickly the team replies. Deific Digital is ISO 9001 and ISO/IEC 27001 certified, gives a written estimate after a free discovery call, and replies on WhatsApp the same working day.`,
    },
    {
      q: `Do you have an office in ${c.name}?`,
      a: c.office
        ? `Yes. Our ${c.office.label.toLowerCase()} is at ${c.office.address}. You can also reach us on ${SITE.phoneIN} or WhatsApp.`
        : `Our offices are in Kanpur (registered office) and Noida (branch office). We work with ${c.name} clients through video calls, WhatsApp and on-site visits when a project needs them, so you get the same quality as a local team.`,
    },
    {
      q: `How much does custom software development cost in ${c.name}?`,
      a: `The cost depends on the number of users, features and integrations. A simple business website or app MVP costs far less than a full ERP. After a free discovery call we send a written estimate in INR, so you know the price before work starts.`,
    },
    {
      q: `Which industries do you build software for in ${c.name}?`,
      a: `Common projects in ${c.name} are in ${industries}. We also build for clinics, real estate, accounting firms, car dealers and startups.`,
    },
    {
      q: `Can you build AI agents and WhatsApp automation for ${c.name} businesses?`,
      a: `Yes. We build AI receptionists, sales agents and customer-care agents that answer calls and WhatsApp messages, book appointments, send reminders and update your CRM. We plan and support in Hindi and English.`,
    },
  ];
}

export function buildCitySchemas(c: City) {
  const path = cityPath(c.slug);
  const url = `${SITE.url}${path}`;
  const faqs = faqsFor(c);

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: `Software development in ${c.name}`,
    serviceType: "Custom software, mobile app and AI automation development",
    provider: { "@id": `${SITE.url}/#organization` },
    areaServed: {
      "@type": "City",
      name: c.name,
      containedInPlace: { "@type": "AdministrativeArea", name: c.state },
      geo: { "@type": "GeoCoordinates", latitude: c.lat, longitude: c.lng },
    },
    url,
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const crumbs = breadcrumbLd([
    ["Home", "/"],
    ["Software company in India", INDIA_HUB_PATH],
    [`Software company in ${c.name}`, path],
  ]);

  return { service, faq, crumbs, faqs, url, path };
}

export default function CityPage({ slug }: { slug: string }) {
  const c = CITY_BY_SLUG[slug];
  if (!c) return null;
  const { service, faq, crumbs, faqs, path } = buildCitySchemas(c);

  const title = c.featured
    ? `Top Software Company in ${c.name} | Deific Digital`
    : `Software Company in ${c.name} | Web, App & AI | Deific Digital`;
  // Prefer the city-specific intro (unique per page); fall back to a template if it is too long for a snippet.
  const description = c.featured
    ? `Looking for the best software company in ${c.name}? Deific Digital builds custom software, apps and AI agents. ISO 9001 & 27001 certified. Free consultation.`
    : c.intro.length <= 158
      ? c.intro
      : `Software company serving ${c.name}, ${c.state}: custom software, mobile apps, AI agents and automation. ISO 9001 & 27001 certified. Free consultation.`;
  const nearby = c.nearby.map((s) => CITY_BY_SLUG[s]).filter(Boolean);
  const msg = `Hi Deific Digital, I run a business in ${c.name} and need a software / app / AI automation quote.`;

  return (
    <>
      <Seo title={title} description={description} path={path} jsonLd={[service, faq, crumbs]} alternates={[{ hrefLang: "en-IN", path }]} />

      {/* HERO */}
      <section className="bg-dd-paper">
        <div className="mx-auto max-w-[1100px] px-4 pb-14 pt-12 sm:px-6 md:pt-16 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-5 text-[13px] text-dd-slate">
            <Link to="/" className="hover:text-dd-red">Home</Link>
            <span className="mx-2">/</span>
            <Link to={INDIA_HUB_PATH} className="hover:text-dd-red">Software company in India</Link>
            <span className="mx-2">/</span>
            <span aria-current="page">{c.name}</span>
          </nav>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[13px] text-dd-slate ring-1 ring-dd-line">
            <MapPin className="h-3.5 w-3.5 text-dd-red" /> {c.name}, {c.state}
          </p>
          <h1 className="font-display text-[clamp(30px,4.4vw,56px)] font-semibold leading-[1.05] text-dd-ink">
            {c.featured ? "Top Software Company in " : "Software Company in "}{c.name}
          </h1>
          <p className="mt-5 max-w-3xl text-[17px] leading-relaxed text-dd-slate">{c.intro}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={waLink(msg)} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-xl bg-dd-red px-5 py-3 text-[15px] font-semibold text-white hover:bg-dd-redink">
              <MessageCircle className="h-4 w-4" /> WhatsApp us
            </a>
            <a href={`tel:${SITE.telIN}`} className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-[15px] font-semibold text-dd-ink ring-1 ring-dd-line hover:ring-dd-red">
              <Phone className="h-4 w-4" /> {SITE.phoneIN}
            </a>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-[15px] font-semibold text-dd-ink ring-1 ring-dd-line hover:ring-dd-red">
              Free consultation <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-dd-slate">
            {SITE.certifications.map((x) => (
              <li key={x.name} className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-dd-go" /> {x.name} certified
              </li>
            ))}
            <li className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-dd-go" /> Plans in Hindi and English</li>
          </ul>
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="font-display text-[clamp(24px,3vw,36px)] font-semibold text-dd-ink">
          Software and app development services for {c.name} businesses
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Link key={s.to + s.label} to={s.to} className="group rounded-2xl bg-white p-5 ring-1 ring-dd-line transition hover:ring-dd-red">
              <h3 className="text-[17px] font-semibold text-dd-ink">{s.label}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-dd-slate">{s.text}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-[14px] font-semibold text-dd-red">
                Learn more <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {c.featured && (
        <section className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="font-display text-[clamp(24px,3vw,36px)] font-semibold text-dd-ink">
            How to choose the best software company in {c.name}
          </h2>
          <p className="mt-3 max-w-3xl text-[15.5px] leading-relaxed text-dd-slate">
            There are many software and IT companies in {c.name}. Use this checklist to compare them, including us:
          </p>
          <ul className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              "Live projects you can open and verify, not only screenshots",
              "In-house developers, designers and testers, not fully outsourced work",
              "Security and quality certification (we hold ISO 9001 and ISO/IEC 27001)",
              "A written scope, timeline and price before work starts",
              "Support after launch, in a language your team is comfortable with",
              "Experience with AI agents and WhatsApp automation, not only websites",
            ].map((t) => (
              <li key={t} className="flex gap-2.5 rounded-xl bg-white p-4 text-[14.5px] text-dd-ink ring-1 ring-dd-line">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-dd-go" /> {t}
              </li>
            ))}
          </ul>
          {c.proof && (
            <div className="mt-8">
              <h3 className="text-[18px] font-semibold text-dd-ink">Work delivered in {c.name}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {c.proof.map((x) => (
                  <li key={x} className="rounded-full bg-dd-paper px-3.5 py-1.5 text-[14px] text-dd-ink ring-1 ring-dd-line">{x}</li>
                ))}
              </ul>
              <p className="mt-3 text-[14px]"><Link to="/portfolio" className="font-semibold text-dd-red">See our portfolio</Link></p>
            </div>
          )}
          <p className="mt-6 text-[14px] text-dd-slate">
            Also read: <Link to="/blog/top-10-it-companies-in-india" className="font-semibold text-dd-red">Top IT companies in India (2026)</Link>
          </p>
        </section>
      )}

      {/* INDUSTRIES */}
      <section className="bg-dd-paper">
        <div className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="font-display text-[clamp(24px,3vw,36px)] font-semibold text-dd-ink">
            Industries we build for in {c.name}
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {c.industries.map(([name, text]) => (
              <div key={name} className="rounded-2xl bg-white p-5 ring-1 ring-dd-line">
                <h3 className="text-[17px] font-semibold text-dd-ink">{name}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-dd-slate">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AREAS + OFFICE */}
      <section className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="font-display text-[clamp(24px,3vw,36px)] font-semibold text-dd-ink">Areas we serve in {c.name}</h2>
        <p className="mt-3 max-w-3xl text-[15.5px] leading-relaxed text-dd-slate">
          {c.office
            ? `Visit us at our ${c.office.label.toLowerCase()}, ${c.office.address}. We also work with businesses across ${c.name}, including:`
            : `Our offices are in Kanpur and Noida. We work with ${c.name} clients over video calls and WhatsApp, and visit on site when a project needs it. Businesses we support are spread across:`}
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {c.areas.map((a) => (
            <li key={a} className="rounded-full bg-dd-paper px-3.5 py-1.5 text-[14px] text-dd-ink ring-1 ring-dd-line">{a}</li>
          ))}
        </ul>
      </section>

      {/* PROCESS */}
      <section className="bg-dd-paper">
        <div className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="font-display text-[clamp(24px,3vw,36px)] font-semibold text-dd-ink">How a project with us works</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-4">
            {[
              ["1. Discovery call", "We listen to your process and goals. Free, no obligation."],
              ["2. Written estimate", "Scope, timeline and price in INR before any work starts."],
              ["3. Build and review", "Regular demos so you see progress and change course early."],
              ["4. Launch and support", "Go-live, training and ongoing support in Hindi or English."],
            ].map(([t, d]) => (
              <li key={t} className="rounded-2xl bg-white p-5 ring-1 ring-dd-line">
                <h3 className="text-[16px] font-semibold text-dd-ink">{t}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-dd-slate">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-[900px] px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="font-display text-[clamp(24px,3vw,36px)] font-semibold text-dd-ink">Frequently asked questions</h2>
        <div className="mt-6 divide-y divide-dd-line rounded-2xl bg-white ring-1 ring-dd-line">
          {faqs.map((f) => (
            <details key={f.q} className="group p-5">
              <summary className="cursor-pointer list-none text-[16px] font-semibold text-dd-ink">{f.q}</summary>
              <p className="mt-3 text-[15px] leading-relaxed text-dd-slate">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* NEARBY + HUB */}
      <section className="bg-dd-paper">
        <div className="mx-auto max-w-[1100px] px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="font-display text-[22px] font-semibold text-dd-ink">We also build software near {c.name}</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {nearby.map((n) => (
              <li key={n.slug}>
                <Link to={cityPath(n.slug)} className="inline-block rounded-full bg-white px-4 py-2 text-[14px] font-medium text-dd-ink ring-1 ring-dd-line hover:ring-dd-red">
                  Software company in {n.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to={INDIA_HUB_PATH} className="inline-block rounded-full bg-dd-navy px-4 py-2 text-[14px] font-medium text-white">
                All {CITIES.length} cities we serve
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
