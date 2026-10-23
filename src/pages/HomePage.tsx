import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowUpRight,
  MessageCircle,
  Phone,
  Check,
  Plus,
  Zap,
  Inbox,
  Filter,
  CalendarCheck,
  Repeat,
  Database,
  Star,
  ShieldCheck,
} from "lucide-react";
import { AutoConsole } from "@/components/home/AutoConsole";
import { QuickAudit, AuditForm } from "@/components/home/LeadForms";
import { SavingsCalculator } from "@/components/home/SavingsCalculator";
import { REGIONS, HOME_ALTERNATES, type VariantId, type Region } from "@/static/regions";
import { SITE, waLink } from "@/static/siteConfig";

import knn from "@/assets/knn.webp";
import green from "@/assets/green-park.webp";
import vaishnavi from "@/assets/vaishnavi.webp";
import sundra from "@/assets/sundra-logo.webp";
import celebration from "@/assets/celebration.webp";
import perch from "@/assets/perch.webp";

const clients = [
  { name: "Kanpur Nagar Nigam", img: knn },
  { name: "Green Park Stadium, Kanpur", img: green },
  { name: "Vaishnavi Hospital", img: vaishnavi },
  { name: "Sundra Group", img: sundra },
  { name: "A4 Celebration", img: celebration },
  { name: "The Perch", img: perch },
];

// ── SEO ─────────────────────────────────────────────────────
function buildSchemas(R: Region) {
  const pageUrl = `${SITE.url}${R.path === "/" ? "/" : R.path}`;
  const org = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: "Deific Enterprises",
    url: SITE.url,
    logo: `${SITE.url}/logo.webp`,
    image: `${SITE.url}/og-image.jpg`,
    description: R.seo.description,
    telephone: R.code === "AE" && SITE.telAE ? SITE.telAE : SITE.telIN,
    email: SITE.email,
    priceRange: R.code === "AE" ? "AED 899+" : "₹₹",
    currenciesAccepted: R.code === "AE" ? "AED, USD" : "INR",
    areaServed:
      R.code === "AE"
        ? [
            { "@type": "City", name: "Dubai" },
            { "@type": "City", name: "Abu Dhabi" },
            { "@type": "City", name: "Sharjah" },
            { "@type": "Country", name: "United Arab Emirates" },
          ]
        : [
            { "@type": "Country", name: "India" },
            { "@type": "Country", name: "United Arab Emirates" },
          ],
    availableLanguage: R.code === "AE" ? ["English", "Arabic"] : ["English", "Hindi"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "8th Floor, STPI, A1/4 UPSIDA Building, Lakhanpur",
      addressLocality: "Kanpur",
      addressRegion: "Uttar Pradesh",
      postalCode: "208024",
      addressCountry: "IN",
    },
    hasCertification: SITE.certifications.map((c) => ({
      "@type": "Certification",
      name: `${c.standard} certified`,
      certificationIdentification: c.standard,
    })),
    sameAs: [SITE.social.facebook, SITE.social.linkedin, SITE.social.instagram, "https://clutch.co/profile/deific-digital"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI automation and development services",
      itemListElement: R.pricing
        ? R.pricing.groups.flatMap((g) =>
            g.plans.map((p) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: p.name },
              priceSpecification: {
                "@type": "PriceSpecification",
                minPrice: Number(p.price.replace(/[^0-9]/g, "")),
                priceCurrency: "AED",
              },
            })),
          )
        : [
            "AI Receptionist",
            "AI Customer Care Agent",
            "AI Sales Agent",
            "WhatsApp AI Agent",
            "Business Automation Flows",
            "Real Estate Sales Automation",
            "Hospital Management AI Automation",
            "CA Firm Automation",
            "Car Dealer Automation",
            "Web Application Development",
            "Mobile App Development",
            "Game Development",
            "Smart City Solutions",
          ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
    },
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: R.hrefLang,
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: pageUrl,
    mainEntity: R.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return { org, website, faq, pageUrl };
}

// ── Small pieces ────────────────────────────────────────────
function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-20 ${className}`}>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

function H2({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`font-display text-balance text-[clamp(30px,4.2vw,50px)] font-semibold leading-[1.04] text-dd-ink ${className}`}>
      {children}
    </h2>
  );
}

/** The auto-mode switch that lives inside the headline. */
function ModeSwitch({ on, onToggle, nudge, label }: { on: boolean; onToggle: () => void; nudge: boolean; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      dir="ltr"
      onClick={onToggle}
      className={`relative mx-[0.12em] inline-flex h-[0.86em] w-[1.6em] translate-y-[0.08em] items-center rounded-full align-baseline transition-colors duration-300 ${
        on ? "bg-dd-go" : "bg-dd-line"
      } ${nudge && !on ? "dd-nudge" : ""}`}
    >
      <span
        className={`absolute top-[0.08em] h-[0.7em] w-[0.7em] rounded-full bg-white shadow-md transition-[left] duration-300 ease-out ${
          on ? "left-[0.82em]" : "left-[0.08em]"
        }`}
      />
    </button>
  );
}

// ── Page ────────────────────────────────────────────────────
export default function HomePage({ variant = "IN" }: { variant?: VariantId }) {
  const R = REGIONS[variant];
  const region = R.code;
  const c = R.copy;
  const { industries, faqs } = R;
  const isAE = region === "AE";
  const schemas = buildSchemas(R);
  const TITLE = R.seo.title;
  const DESC = R.seo.description;
  const phoneShown = isAE ? SITE.phoneAE : SITE.phoneIN;
  const telShown = isAE ? SITE.telAE : SITE.telIN;
  const wa = (msg: string) => waLink(msg, region);
  const Arrow = () => <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />;
  const [auto, setAuto] = useState(false);
  const touched = useRef(false);
  const [tab, setTab] = useState(industries[0].id);
  const flowIcons = [Inbox, Zap, Filter];
  const cTrust = c.trust.certDetail;

  // The one orchestrated moment: after the page settles, the business flips to auto mode
  // (unless the visitor already flipped it themselves).
  useEffect(() => {
    const t = window.setTimeout(() => {
      if (!touched.current) setAuto(true);
    }, 2600);
    return () => window.clearTimeout(t);
  }, []);

  const toggle = () => {
    touched.current = true;
    setAuto((a) => !a);
  };

  return (
    <>
      <Helmet>
        <html lang={c.lang === "ar" ? "ar-AE" : isAE ? "en-AE" : "en-IN"} dir={c.dir} />
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href={schemas.pageUrl} />
        {HOME_ALTERNATES.map((a) => (
          <link key={a.hrefLang} rel="alternate" hrefLang={a.hrefLang} href={`${SITE.url}${a.path}`} />
        ))}
        <meta property="og:locale" content={c.lang === "ar" ? "ar_AE" : isAE ? "en_AE" : "en_IN"} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE.name} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:url" content={schemas.pageUrl} />
        <meta property="og:image" content={`${SITE.url}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <meta name="twitter:image" content={`${SITE.url}/og-image.jpg`} />
        <script type="application/ld+json">{JSON.stringify(schemas.org)}</script>
        <script type="application/ld+json">{JSON.stringify(schemas.website)}</script>
        <script type="application/ld+json">{JSON.stringify(schemas.faq)}</script>
      </Helmet>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-dd-paper">
        <div className="dd-grid pointer-events-none absolute inset-y-0 end-0 hidden w-[52%] lg:block" aria-hidden />
        <div className="relative mx-auto grid max-w-[1200px] grid-cols-[minmax(0,1fr)] items-center gap-12 px-4 pb-16 pt-12 sm:px-6 md:pt-16 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] lg:gap-14 lg:px-8 lg:pb-24 lg:pt-20">
          <div>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[13px] text-dd-slate ring-1 ring-dd-line">
              <Zap className="h-3.5 w-3.5 text-dd-red" />
              {R.kicker}
            </p>
            <h1 className={`font-display font-semibold leading-[0.98] text-dd-ink ${c.lang === "ar" ? "text-[clamp(36px,4.6vw,60px)]" : "text-[clamp(32px,4.4vw,62px)]"}`}>
              {c.hero.line1} <br className="hidden lg:block" />
              <span className={c.lang === "ar" ? "" : "whitespace-nowrap"}>
                {c.hero.on} <ModeSwitch on={auto} onToggle={toggle} nudge={!touched.current} label={c.hero.switchLabel} />{" "}
                {c.hero.autoMode}
              </span>
            </h1>
            <p className="mt-6 max-w-[34em] text-pretty text-[18px] leading-[1.6] text-dd-slate">
              {R.heroBody}
            </p>

            <div className="mt-8">
              <QuickAudit defaultCc={R.countryCode} region={region} ui={c.forms} />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-[15px]">
              <a
                href={wa(c.wa.general)}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 font-semibold text-dd-ink underline-offset-4 hover:underline"
              >
                <MessageCircle className="h-4 w-4 text-dd-go" />
                {c.hero.whatsapp}
              </a>
              {telShown ? (
                <a href={`tel:${telShown}`} className="inline-flex items-center gap-2 font-semibold text-dd-ink underline-offset-4 hover:underline">
                  <Phone className="h-4 w-4 text-dd-red" />
                  {phoneShown}
                </a>
              ) : null}
              {isAE ? (
                <a href="#pricing" className="inline-flex items-center gap-2 font-semibold text-dd-ink underline-offset-4 hover:underline">
                  {c.hero.seePrices}
                </a>
              ) : null}
            </div>
          </div>

          <div className="relative">
            <AutoConsole auto={auto} feed={R.feed} ui={c.console} />
            <p className="mt-3 text-center text-[13px] text-dd-slate">
              {auto ? c.hero.captionAuto : c.hero.captionManual}
            </p>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ──────────────────────────────────── */}
      <section className="border-y border-dd-line bg-white">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p className="max-w-[22em] text-[15px] leading-snug text-dd-slate">
            {c.trust.before} <strong className="font-semibold text-dd-ink">{c.trust.strong}</strong>
            {c.trust.after}
          </p>
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-4">
            {clients.map((c) => (
              <li key={c.name} className="flex items-center gap-2.5">
                <img src={c.img} alt={c.name} loading="lazy" width={36} height={36} className="h-9 w-9 rounded-md object-contain" />
                <span className="text-[13px] font-medium text-dd-ink">{c.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-dd-line bg-dd-paper">
          <ul className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-x-10 gap-y-3 px-4 py-4 sm:px-6 lg:px-8" aria-label={c.trust.certAria}>
            {SITE.certifications.map((c) => (
              <li key={c.name} className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 shrink-0 text-dd-navy" />
                <span className="text-[14px] leading-tight text-dd-slate">
                  <strong className="block text-[15px] font-semibold text-dd-ink">{c.name}</strong>
                  {cTrust[c.name] ?? c.detail}
                </span>
              </li>
            ))}
            <li className="text-[14px] text-dd-slate sm:ms-auto">{c.trust.certLine}</li>
          </ul>
        </div>
      </section>

      {/* ── AI AGENTS ────────────────────────────────────── */}
      <Section id="ai-agents" className="bg-white py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <H2>{c.agents.title}</H2>
            <p className="mt-5 max-w-[30em] text-[17px] leading-[1.65] text-dd-slate">
              {c.agents.text}
            </p>
            <Link
              to="/ai-agents"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-dd-navy px-5 py-3 text-[15px] font-semibold text-white transition hover:bg-dd-ink"
            >
              {c.agents.demo}
            </Link>
          </div>

          <ul className="divide-y divide-dd-line border-y border-dd-line">
            {c.agents.list.map((a) => (
              <li key={a.name} className="grid gap-5 py-8 sm:grid-cols-[auto_1fr]">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-dd-paper text-dd-red ring-1 ring-dd-line">
                  <a.icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="font-display text-[26px] font-semibold leading-tight text-dd-ink">{a.name}</h3>
                    <span className="text-[13px] text-dd-slate">{c.agents.worksOn} {a.channels}</span>
                  </div>
                  <p className="mt-2 text-[17px] text-dd-ink/85">{a.line}</p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                    {a.does.map((d) => (
                      <li key={d} className="flex gap-2 text-[14px] leading-snug text-dd-slate">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-dd-go" />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={wa(c.wa.agent(a.name))}
                    target="_blank"
                    rel="noopener"
                    className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-dd-red underline-offset-4 hover:underline"
                  >
                    {c.agents.hire(a.name)}
                    <Arrow />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ── AUTOMATION FLOWS ─────────────────────────────── */}
      <Section id="automation" className="bg-dd-navy py-20 text-white lg:py-28">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <h2 className="font-display text-balance text-[clamp(30px,4.2vw,50px)] font-semibold leading-[1.04]">
            {c.flow.title}
          </h2>
          <p className="max-w-[32em] text-[17px] leading-[1.65] text-white/75">
            {c.flow.text}
          </p>
        </div>

        {/* flow diagram */}
        <div className="mt-14 grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1.25fr] lg:items-stretch">
          {c.flow.steps.map((st, i) => ({ ...st, icon: flowIcons[i] })).map((s, i) => (
            <FlowStep key={s.title} {...s} last={i === 2} />
          ))}
          <div className="grid gap-3">
            <div className="rounded-2xl bg-white/[0.07] p-5 ring-1 ring-white/10">
              <p className="flex items-center gap-2 text-[13px] font-semibold text-[#5BE3A1]">
                <CalendarCheck className="h-4 w-4" /> {c.flow.hot}
              </p>
              <p className="mt-2 text-[15px] leading-snug">{c.flow.hotText}</p>
            </div>
            <div className="rounded-2xl bg-white/[0.07] p-5 ring-1 ring-white/10">
              <p className="flex items-center gap-2 text-[13px] font-semibold text-dd-gold">
                <Repeat className="h-4 w-4" /> {c.flow.warm}
              </p>
              <p className="mt-2 text-[15px] leading-snug">{c.flow.warmText}</p>
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-3 rounded-2xl bg-white/[0.04] px-5 py-4 ring-1 ring-white/10">
          <Database className="h-5 w-5 shrink-0 text-white/60" />
          <p className="text-[15px] text-white/80">
            {c.flow.saved}
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {c.flow.areas.map(([t, d]) => (
            <div key={t} className="bg-dd-navy p-6">
              <p className="font-display text-[22px] font-semibold">{t}</p>
              <p className="mt-2 text-[14px] leading-relaxed text-white/65">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── INDUSTRIES ───────────────────────────────────── */}
      <Section id="industries" className="bg-dd-paper py-20 lg:py-28">
        <H2 className="max-w-[16em]">{c.industries.title}</H2>
        <p className="mt-5 max-w-[36em] text-[17px] leading-[1.65] text-dd-slate">
          {c.industries.text}
        </p>

        <div role="tablist" aria-label={c.industries.aria} className="mt-10 flex gap-2 overflow-x-auto pb-1">
          {industries.map((ind) => (
            <button
              key={ind.id}
              role="tab"
              id={`tab-${ind.id}`}
              aria-selected={tab === ind.id}
              aria-controls={`panel-${ind.id}`}
              onClick={() => setTab(ind.id)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-[15px] font-medium transition ${
                tab === ind.id ? "bg-dd-navy text-white" : "bg-white text-dd-ink ring-1 ring-dd-line hover:ring-dd-navy/40"
              }`}
            >
              <ind.icon className="h-4 w-4" />
              {ind.name}
            </button>
          ))}
        </div>

        {industries.map((ind) => (
          <div
            key={ind.id}
            role="tabpanel"
            id={`panel-${ind.id}`}
            aria-labelledby={`tab-${ind.id}`}
            hidden={tab !== ind.id}
            className="mt-6 grid gap-8 rounded-[22px] bg-white p-6 ring-1 ring-dd-line sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14 [&[hidden]]:hidden"
          >
            <div>
              <h3 className="font-display text-balance text-[clamp(26px,3vw,36px)] font-semibold leading-[1.1] text-dd-ink">
                <span className="sr-only">{ind.name} {c.industries.srSuffix} </span>
                {ind.headline}
              </h3>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={wa(c.wa.industry(ind.name))}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 rounded-xl bg-dd-red px-5 py-3 text-[15px] font-semibold text-white transition hover:bg-dd-redink"
                >
                  {c.industries.demo(ind.name)}
                </a>
                {ind.link ? (
                  <Link
                    to={ind.link.to}
                    className="inline-flex items-center gap-1.5 rounded-xl px-4 py-3 text-[15px] font-semibold text-dd-navy ring-1 ring-dd-line transition hover:ring-dd-navy"
                  >
                    {ind.link.label}
                  </Link>
                ) : null}
              </div>
            </div>
            <div>
              <p className="text-[14px] font-medium text-dd-slate">{c.industries.runs}</p>
              <ul className="mt-4 divide-y divide-dd-line">
                {ind.automates.map((t) => (
                  <li key={t} className="flex gap-3 py-3.5 text-[16px] text-dd-ink">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-dd-go" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </Section>

      {/* ── CALCULATOR (lead magnet) ─────────────────────── */}
      <Section id="savings" className="bg-white py-20 lg:py-28">
        <div className="mb-10 grid gap-6 lg:grid-cols-2 lg:items-end">
          <H2>{c.savings.title}</H2>
          <p className="max-w-[32em] text-[17px] leading-[1.65] text-dd-slate">
            {c.savings.text}
          </p>
        </div>
        <SavingsCalculator defaultCurrency={R.currency} region={region} ui={c.calc} />
      </Section>

      {R.pricing ? (
        <Section id="pricing" className="border-t border-dd-line bg-dd-paper py-20 lg:py-28">
          <div className="mb-10 grid gap-6 lg:grid-cols-2 lg:items-end">
            <H2>{c.pricing.title}</H2>
            <p className="max-w-[32em] text-[17px] leading-[1.65] text-dd-slate">
              {c.pricing.text}
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {R.pricing.groups.map((g) => (
              <div key={g.title} className="flex flex-col rounded-[22px] bg-white p-7 ring-1 ring-dd-line">
                <h3 className="font-display text-[26px] font-semibold text-dd-ink">{g.title}</h3>
                <p className="mt-1.5 text-[15px] text-dd-slate">{g.text}</p>
                <ul className="mt-6 flex-1 divide-y divide-dd-line border-t border-dd-line">
                  {g.plans.map((p) => (
                    <li key={p.name} className="flex items-baseline justify-between gap-4 py-3.5">
                      <span className="text-[15px] font-medium text-dd-ink">{p.name}</span>
                      <span className="shrink-0 text-end text-[15px] text-dd-slate">
                        {c.pricing.from} <strong className="font-display text-[19px] font-semibold text-dd-navy">{p.price}</strong>
                        {p.unit ? <span className="ms-1 text-[13px]">{p.unit}</span> : null}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href={wa(c.wa.quote(g.title))}
                  target="_blank"
                  rel="noopener"
                  className="mt-6 inline-flex items-center justify-center rounded-xl bg-dd-navy px-5 py-3 text-[15px] font-semibold text-white transition hover:bg-dd-ink"
                >
                  {c.pricing.quote}
                </a>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-[60em] text-[13px] leading-relaxed text-dd-slate">{R.pricing.footnote}</p>
        </Section>
      ) : null}

      {/* ── BUILD ─────────────────────────────────────────── */}
      <Section id="development" className="border-t border-dd-line bg-white py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <H2>{c.build.title}</H2>
            <p className="mt-5 max-w-[30em] text-[17px] leading-[1.65] text-dd-slate">
              {c.build.text}
            </p>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-[22px] bg-dd-line ring-1 ring-dd-line sm:grid-cols-2">
            {c.build.list.map((s) => (
              <li key={s.name} className="bg-white">
                <Link to={s.to} className="group block h-full p-7 transition hover:bg-dd-paper">
                  <s.icon className="h-6 w-6 text-dd-red" />
                  <h3 className="mt-5 font-display text-[23px] font-semibold leading-tight text-dd-ink">{s.name}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-dd-slate">{s.text}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold text-dd-navy group-hover:underline underline-offset-4">
                    {c.build.learn} <Arrow />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* own products */}
        <div className="mt-16 grid gap-4 md:grid-cols-2">
          <Link
            to="/propai"
            className="group flex flex-col justify-between gap-8 rounded-[22px] bg-dd-paper p-7 ring-1 ring-dd-line transition hover:ring-dd-navy/40"
          >
            <div>
              <p className="text-[13px] font-medium text-dd-slate">{c.build.product}</p>
              <h3 className="mt-2 font-display text-[30px] font-semibold text-dd-ink">PropAI</h3>
              <p className="mt-2 max-w-[28em] text-[16px] leading-relaxed text-dd-slate">
                {c.build.propaiText}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-[15px] font-semibold text-dd-red">
              {c.build.seePropai} <Arrow />
            </span>
          </Link>
          <a
            href="https://reviewninjapro.com"
            target="_blank"
            rel="noopener"
            className="group flex flex-col justify-between gap-8 rounded-[22px] bg-dd-paper p-7 ring-1 ring-dd-line transition hover:ring-dd-navy/40"
          >
            <div>
              <p className="text-[13px] font-medium text-dd-slate">{c.build.product}</p>
              <h3 className="mt-2 flex items-center gap-2 font-display text-[30px] font-semibold text-dd-ink">
                AI Review Ninja Pro <Star className="h-5 w-5 fill-dd-gold text-dd-gold" />
              </h3>
              <p className="mt-2 max-w-[28em] text-[16px] leading-relaxed text-dd-slate">
                {c.build.ninjaText}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-[15px] font-semibold text-dd-red">
              {c.build.visitNinja} <Arrow />
            </span>
          </a>
        </div>
      </Section>

      {/* ── PROCESS ──────────────────────────────────────── */}
      <Section id="process" className="bg-dd-paper py-20 lg:py-28">
        <H2 className="max-w-[14em]">{c.process.title}</H2>
        <ol className="mt-12 grid gap-px overflow-hidden rounded-[22px] bg-dd-line ring-1 ring-dd-line md:grid-cols-2 lg:grid-cols-4">
          {c.process.steps.map((p, i) => (
            <li key={p.title} className="bg-white p-7">
              <span className="font-display text-[44px] font-semibold leading-none text-dd-red">{i + 1}</span>
              <h3 className="mt-6 text-[19px] font-semibold text-dd-ink">{p.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-dd-slate">{p.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <Section id="faq" className="bg-white py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <H2>{c.faqTitle}</H2>
          <div className="divide-y divide-dd-line border-y border-dd-line">
            {faqs.map((f, i) => (
              <details key={f.q} className="group py-5" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[18px] font-semibold text-dd-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <Plus className="h-5 w-5 shrink-0 text-dd-slate transition-transform group-open:rotate-45" />
                </summary>
                <p className="mt-3 max-w-[40em] text-[16px] leading-[1.65] text-dd-slate">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* ── FINAL CTA ────────────────────────────────────── */}
      <Section id="audit" className="bg-dd-navy py-20 text-white lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <h2 className="font-display text-balance text-[clamp(32px,4.6vw,56px)] font-semibold leading-[1.02]">
              {c.cta.title}
            </h2>
            <p className="mt-5 max-w-[30em] text-[17px] leading-[1.65] text-white/75">
              {c.cta.text}
            </p>
            <ul className="mt-8 space-y-3 text-[16px] text-white/85">
              {R.ctaPoints.map(
                (t) => (
                  <li key={t} className="flex gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#5BE3A1]" />
                    {t}
                  </li>
                ),
              )}
            </ul>
          </div>
          <div className="text-dd-ink">
            <AuditForm source={`Homepage audit form (${variant})`} defaultCc={R.countryCode} region={region} ui={c.forms} />
          </div>
        </div>
      </Section>
    </>
  );
}

function FlowStep({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  text: string;
  last?: boolean;
}) {
  return (
    <>
      <div className="rounded-2xl bg-white/[0.07] p-5 ring-1 ring-white/10">
        <Icon className="h-5 w-5 text-white/70" />
        <p className="mt-4 font-display text-[21px] font-semibold">{title}</p>
        <p className="mt-1.5 text-[14px] leading-snug text-white/65">{text}</p>
      </div>
      <div className="flex items-center justify-center text-white/35" aria-hidden>
        <svg viewBox="0 0 24 24" className="h-6 w-6 rotate-90 lg:rotate-0 lg:rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </div>
    </>
  );
}
