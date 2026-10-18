import { Link } from "react-router-dom";
import { Facebook, Linkedin, Instagram, Mail, Phone, MessageCircle } from "lucide-react";
import logo from "../../assets/dd.webp";
import { SITE, waLink } from "../../static/siteConfig";

const columns = [
  {
    title: "AI & Automation",
    links: [
      ["/ai-agents", "AI Agents"],
      ["/services/automation", "Automation Flows"],
      ["/services/chatbots-virtual-assistants", "WhatsApp AI Agent"],
      ["/propai", "Real Estate Automation"],
      ["/#industries", "Hospital, CA & Car Dealer Automation"],
    ],
  },
  {
    title: "Development",
    links: [
      ["/services/mvp-development", "Web Applications"],
      ["/services/android-app-development", "Android Apps"],
      ["/services/ios-app-development", "iOS Apps"],
      ["/contact", "Game Development"],
      ["/contact", "Smart City Solutions"],
    ],
  },
  {
    title: "Company",
    links: [
      ["/about", "About Us"],
      ["/portfolio", "Work & Clients"],
      ["/careers", "Careers"],
      ["/blog", "Blog"],
      ["/contact", "Contact"],
    ],
  },
  {
    title: "Regions",
    links: [
      ["/", "India"],
      ["/uae", "UAE (English)"],
      ["/uae/ar", "UAE (العربية)"],
      ["/usa", "USA"],
    ],
  },
] as const;

export function Footer() {
  const social = [
    { icon: Facebook, href: SITE.social.facebook, label: "Facebook" },
    { icon: Linkedin, href: SITE.social.linkedin, label: "LinkedIn" },
    { icon: Instagram, href: SITE.social.instagram, label: "Instagram" },
  ];

  return (
    <footer className="bg-[#081633] pb-16 text-white md:pb-0">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link to="/" className="flex items-center gap-2.5" dir="ltr">
              <img src={logo} alt="" width={34} height={34} className="h-[34px] w-[34px] rounded-lg" />
              <span className="font-brand text-[21px] font-semibold">
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

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((c) => (
              <div key={c.title}>
                <p className="text-[14px] font-semibold text-white">{c.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map(([to, label]) => (
                    <li key={label}>
                      <Link to={to} className="text-[14px] text-white/60 hover:text-white">
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
