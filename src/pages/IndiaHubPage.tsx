import { Link } from "react-router-dom";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Seo, breadcrumbLd } from "@/components/site/Seo";
import { CITIES, INDIA_HUB_PATH, cityPath, type City } from "@/static/cities";
import { SITE, waLink } from "@/static/siteConfig";

const REGIONS: City["region"][] = ["North", "West", "South", "Central", "East", "North-East"];

const FAQS = [
  {
    q: "Which cities in India does Deific Digital serve?",
    a: `We serve businesses across India. Our offices are in Kanpur and Noida, and we work with clients in ${CITIES.length} cities including Delhi, Mumbai, Bengaluru, Hyderabad, Pune, Chennai, Kolkata, Ahmedabad, Jaipur and Lucknow through video calls, WhatsApp and on-site visits.`,
  },
  {
    q: "What does a software development company in India like Deific Digital build?",
    a: "Custom web applications, Android and iOS apps, ERP and CRM systems, AI agents (receptionist, sales, customer care), WhatsApp automation and business automation flows.",
  },
  {
    q: "How do I choose among software companies in India?",
    a: "Compare live projects, in-house team strength, security certification, written pricing and post-launch support. Read our guide to the top IT companies in India for a city-wise comparison.",
  },
  {
    q: "Is Deific Digital certified?",
    a: "Yes. Deific Digital is ISO 9001 (quality management) and ISO/IEC 27001 (information security) certified.",
  },
  {
    q: "How can I get a quote?",
    a: `Call ${SITE.phoneIN}, message us on WhatsApp or use the contact form. After a free discovery call we send a written estimate in INR.`,
  },
];

export default function IndiaHubPage() {
  const url = `${SITE.url}${INDIA_HUB_PATH}`;
  const title = "Software Companies in India | Top Software Development Company 2026";
  const description =
    "Looking for software companies in India? Deific Digital is an ISO-certified software development company in Kanpur and Noida serving Delhi, Mumbai, Bengaluru and 30+ cities.";

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Cities in India served by Deific Digital",
    itemListElement: CITIES.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `Software company in ${c.name}`,
      url: `${SITE.url}${cityPath(c.slug)}`,
    })),
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url,
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const crumbs = breadcrumbLd([
    ["Home", "/"],
    ["Software company in India", INDIA_HUB_PATH],
  ]);

  return (
    <>
      <Seo title={title} description={description} path={INDIA_HUB_PATH} jsonLd={[itemList, faq, crumbs]} alternates={[{ hrefLang: "en-IN", path: INDIA_HUB_PATH }]} />

      <section className="bg-dd-paper">
        <div className="mx-auto max-w-[1100px] px-4 pb-14 pt-12 sm:px-6 md:pt-16 lg:px-8">
          <h1 className="font-display text-[clamp(30px,4.4vw,56px)] font-semibold leading-[1.05] text-dd-ink">
            Software Companies in India: Top Software Development Company
          </h1>
          <p className="mt-5 max-w-3xl text-[17px] leading-relaxed text-dd-slate">
            Deific Digital builds custom software, mobile apps, AI agents and automation for businesses across India. Our offices are in Kanpur and Noida, and we work with clients in {CITIES.length} cities through video calls, WhatsApp and on-site visits. ISO 9001 and ISO/IEC 27001 certified.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={waLink("Hi Deific Digital, I need a software / app quote.")} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-xl bg-dd-red px-5 py-3 text-[15px] font-semibold text-white hover:bg-dd-redink">
              <MessageCircle className="h-4 w-4" /> WhatsApp us
            </a>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-[15px] font-semibold text-dd-ink ring-1 ring-dd-line hover:ring-dd-red">
              Free consultation <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="font-display text-[clamp(24px,3vw,36px)] font-semibold text-dd-ink">Find a software company in your city</h2>
        {REGIONS.map((r) => {
          const list = CITIES.filter((c) => c.region === r);
          if (!list.length) return null;
          return (
            <div key={r} className="mt-8">
              <h3 className="text-[15px] font-semibold uppercase tracking-wider text-dd-slate">{r} India</h3>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((c) => (
                  <li key={c.slug}>
                    <Link to={cityPath(c.slug)} className="block rounded-2xl bg-white p-4 ring-1 ring-dd-line transition hover:ring-dd-red">
                      <span className="block text-[16px] font-semibold text-dd-ink">Software company in {c.name}</span>
                      <span className="mt-1 block text-[13.5px] text-dd-slate">{c.state}{c.office ? ` · ${c.office.label}` : ""}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>

      <section className="mx-auto max-w-[1100px] px-4 pb-4 sm:px-6 lg:px-8">
        <p className="text-[15px] text-dd-slate">
          Comparing options? Read{" "}
          <Link to="/blog/top-10-it-companies-in-india" className="font-semibold text-dd-red">Top IT companies in India (2026)</Link>{" "}
          or jump to our most-searched pages:{" "}
          <Link to={cityPath("kanpur")} className="font-semibold text-dd-red">software company in Kanpur</Link> and{" "}
          <Link to={cityPath("delhi")} className="font-semibold text-dd-red">software company in Delhi</Link>.
        </p>
      </section>

      <section className="bg-dd-paper">
        <div className="mx-auto max-w-[900px] px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="font-display text-[clamp(24px,3vw,36px)] font-semibold text-dd-ink">Frequently asked questions</h2>
          <div className="mt-6 divide-y divide-dd-line rounded-2xl bg-white ring-1 ring-dd-line">
            {FAQS.map((f) => (
              <details key={f.q} className="p-5">
                <summary className="cursor-pointer list-none text-[16px] font-semibold text-dd-ink">{f.q}</summary>
                <p className="mt-3 text-[15px] leading-relaxed text-dd-slate">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
