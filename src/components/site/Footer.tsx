import { Link } from "react-router-dom";
import { Facebook, Linkedin, Instagram, Mail, Phone, MessageCircle } from "lucide-react";
import logo from "../../assets/dd.webp";
import { SITE, waLink } from "../../static/siteConfig";
import { servicesMenu } from "../../static/servicesData";
import { products, companyLinks } from "../../static/productsData";
import { useSiteLanguage } from "@/i18n/LanguageContext";

type FooterLink = readonly [string, string];
type FooterColumn = { title: string; links: FooterLink[] };

// Header ke saare links footer mein bhi hain. Services / Products / Company data se auto-aate hain,
// isliye header mein kuch add karo to footer mein khud aa jayega.
const serviceColumns: FooterColumn[] = servicesMenu.map((col) => ({
  title: col.title,
  links: col.items
    ? col.items.map((i) => [i.to, i.label] as const)
    : col.to
      ? [[col.to, col.title] as const]
      : [],
}));

const productLinks: FooterLink[] = [
  ["/products", "All Products"],
  ...products.map((p) => [`/products/${p.slug}`, p.name] as const),
];

const companyColumnLinks: FooterLink[] = [
  ...companyLinks.map((c) => [c.to, c.label] as const),
  ["/industries", "Industries"],
  ["/ai-agents", "AI Agents"],
  ["/contact", "Contact"],
];

const columns: FooterColumn[] = [
  { title: "Products", links: productLinks },
  ...serviceColumns,
  { title: "Company", links: companyColumnLinks },
  {
    title: "Regions",
    links: [
      ["/", "India"],
      ["/uae", "UAE (English)"],
      ["/uae/ar", "UAE (العربية)"],
      ["/usa", "USA"],
    ],
  },
];

export function Footer() {
  const { language, region } = useSiteLanguage();
  const home = region === "AE" ? (language === "ar" ? "/uae/ar" : "/uae") : region === "US" ? "/usa" : "/";
  const social = [
    { icon: Facebook, href: SITE.social.facebook, label: "Facebook" },
    { icon: Linkedin, href: SITE.social.linkedin, label: "LinkedIn" },
    { icon: Instagram, href: SITE.social.instagram, label: "Instagram" },
  ];

  return (
    <footer className="bg-[#081633] pb-16 text-white md:pb-0">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_2.6fr]">
          <div>
            <Link to={home} className="flex items-center gap-2.5" dir="ltr">
              <img src={logo} alt="Deific Digital logo" data-no-translate loading="lazy" width={34} height={34} className="h-[34px] w-[34px] rounded-lg" />
              <span data-brand-name className="font-brand text-[21px] font-semibold">
                Deific <span className="text-[#FF5A60]">Digital</span>
              </span>
            </Link>
            <p className="mt-4 max-w-[26em] text-[15px] leading-relaxed text-white/65">
              Custom AI agents, automation flows and software for businesses in India and the UAE. A brand of Deific
              Enterprises.
            </p>
            <p className="mt-4 inline-flex flex-wrap items-center gap-2 text-[13px] text-white/75">
              {SITE.certifications.map((c) => (
                <span key={c.name} className="rounded-full px-3 py-1 ring-1 ring-white/20">
                  {c.name} certified
                </span>
              ))}
            </p>
            <ul className="mt-6 space-y-2.5 text-[15px]">
              <li>
                <a href={`tel:${SITE.telIN}`} className="inline-flex items-center gap-2.5 text-white/85 hover:text-white">
                  <Phone className="h-4 w-4 text-[#FF5A60]" /> <bdi dir="ltr">{SITE.phoneIN}</bdi>
                </a>
              </li>
              <li>
                <a href={waLink("Hi Deific Digital")} target="_blank" rel="noopener" className="inline-flex items-center gap-2.5 text-white/85 hover:text-white">
                  <MessageCircle className="h-4 w-4 text-[#5BE3A1]" /> WhatsApp us
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2.5 break-all text-white/85 hover:text-white">
                  <Mail className="h-4 w-4 text-white/60" /> {SITE.email}
                </a>
              </li>
            </ul>
            <div className="mt-6 flex gap-2">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-white/20 transition hover:bg-white hover:text-dd-navy"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
            {columns.map((c) => (
              <div key={c.title}>
                <p className="text-[14px] font-semibold text-white">{c.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map(([to, label]) => (
                    <li key={`${to}-${label}`}>
                      <Link to={to} className="text-[14px] leading-snug text-white/60 transition-colors hover:text-white">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-2">
          {SITE.offices.map((o) => (
            <address key={o.city} className="not-italic">
              <p className="text-[13px] text-white/50">{o.label}, {o.city}</p>
              <p className="mt-1 text-[14px] leading-relaxed text-white/75">{o.address}</p>
            </address>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-[13px] text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Deific Digital. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/terms-and-condition" className="hover:text-white">Terms & Conditions</Link>
            <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
