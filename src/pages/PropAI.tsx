import { Seo, breadcrumbLd } from "@/components/site/Seo";
import { useState } from "react";
import type { ComponentType } from "react";
import {
  ArrowRight,
  Sparkles,
  Star,
  Plus,
  Check,
  Quote,
  Building2,
  MessageCircle,
  ChartNoAxesColumn,
  CalendarDays,
  ChartLine,
  Users,
  ChartColumn,
} from "lucide-react";
import type { LucideProps } from "lucide-react";

/* ---------- Edit these details ---------- */
const APP_NAME = "PropAI";
const COMPANY = {
  name: "Deific Digital",
  address:
    "8th Floor A1/4 UPSIDA Building, Lakhanpur, Khyora, Kanpur, Uttar Pradesh 208024, India",
  email: "deific.solution@hotmail.com",
  phone: "+91 87502 00899",
};
const PATHS = {
  privacy: "/propai/privacy-policy",
  terms: "/propai/terms",
  dataDeletion: "/propai/data-deletion",
};
const LOGIN_URL = "https://prop-ai-whatsapp-chatbot-lat0.onrender.com/login"; // <- put your real CRM login URL here

/* ---------- Styles (fonts + scoped css), no separate css file needed ---------- */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');

/* Everything is scoped to .propai so your main site styles are untouched. */
.propai {
  font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
  color: #12224a;
  background: #fff;
  -webkit-font-smoothing: antialiased;
}
.propai h1, .propai h2, .propai h3, .propai .font-display {
  font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
}
.propai section[id] { scroll-margin-top: 80px; }
html:has(.propai) { scroll-behavior: smooth; }

@keyframes propai-blink { 0%, 80%, 100% { opacity: .25 } 40% { opacity: 1 } }
.propai .dot { animation: propai-blink 1.2s infinite; }
.propai .dot:nth-child(2) { animation-delay: .2s; }
.propai .dot:nth-child(3) { animation-delay: .4s; }

@media (prefers-reduced-motion: reduce) {
  html:has(.propai) { scroll-behavior: auto; }
  .propai * { animation: none !important; transition: none !important; }
}
`;

/* ------------------------------------------------------------------
   PropAI landing page — single drop-in component.
   Self-contained: only needs react + lucide-react + Tailwind.
   Mount it at /propai:  <Route path="/propai" element={<PropAILanding />} />
   All copy (features, pricing, FAQ) is in the data block right below.
------------------------------------------------------------------- */

type NavLink = { label: string; href: string };
const navLinks: NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const clients: string[] = [
  "Nirvana Realty",
  "Urban Nest",
  "Skyline Homes",
  "Vista Properties",
  "Casa Grande",
];

type Feature = { icon: string; title: string; text: string };
const features: Feature[] = [
  {
    icon: "MessageCircle",
    title: "Instant WhatsApp replies",
    text: "Every enquiry gets a first response in under 10 seconds, day or night, in the buyer's own language.",
  },
  {
    icon: "ChartNoAxesColumn",
    title: "Automatic lead scoring",
    text: "Budget, location and timeline are pulled straight from the conversation and ranked, so hot leads surface first.",
  },
  {
    icon: "CalendarDays",
    title: "Site-visit scheduling",
    text: "Buyers pick a slot straight from chat; your agents' calendars stay in sync without a single back-and-forth call.",
  },
  {
    icon: "ChartLine",
    title: "Pipeline in one view",
    text: "See every listing, lead and follow-up in a single board built for how brokerages actually sell.",
  },
  {
    icon: "Users",
    title: "Team-wide handoff",
    text: "Qualified conversations route to the right agent automatically, with full chat history attached.",
  },
  {
    icon: "ChartColumn",
    title: "Simple performance reports",
    text: "Response times, conversion rate and agent activity, laid out clearly enough to check between site visits.",
  },
];

type Step = { n: string; title: string; text: string };
const steps: Step[] = [
  {
    n: "01",
    title: "Buyer messages you",
    text: "On WhatsApp, your website, or a portal like 99acres — it all lands in one inbox.",
  },
  {
    n: "02",
    title: "PropAI qualifies them",
    text: "Budget, location and timeline are captured through natural conversation, not a form.",
  },
  {
    n: "03",
    title: "A visit gets booked",
    text: "Matching listings are shared and a site visit is scheduled without an agent lifting a finger.",
  },
  {
    n: "04",
    title: "Your team closes it",
    text: "The agent walks in already knowing the buyer's budget, preferences and questions.",
  },
];

type Stat = { value: string; suffix: string; label: string };
const stats: Stat[] = [
  { value: "8", suffix: "s", label: "average first-response time" },
  { value: "3.4", suffix: "x", label: "more site visits booked per agent" },
  { value: "62", suffix: "%", label: "fewer leads going cold" },
  { value: "400", suffix: "+", label: "brokerages on PropAI" },
];

type Plan = {
  name: string;
  price: string;
  period: string;
  setup?: string;
  desc: string;
  items: string[];
  cta: string;
  popular?: boolean;
};
const plans: Plan[] = [
  {
    name: "Starter",
    price: "₹4,500",
    period: "/month",
    setup: "₹15,000 one-time setup",
    desc: "For a single office finding its footing with automation.",
    items: [
      "Up to 500 leads/month",
      "WhatsApp auto-replies",
      "Shared pipeline view",
    ],
    cta: "Get started",
  },
  {
    name: "Growth",
    price: "₹6,000",
    period: "/month",
    setup: "₹20,000 one-time setup",
    desc: "For teams actively scaling across multiple projects.",
    items: [
      "Up to 3,000 leads/month",
      "Automatic lead scoring",
      "Site-visit scheduling",
      "Performance reports",
    ],
    cta: "Get started",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For brokerages with multiple branches and CRMs to connect.",
    items: [
      "Unlimited leads",
      "Custom integrations",
      "Dedicated success manager",
    ],
    cta: "Talk to sales",
  },
];

type FaqItem = { q: string; a: string };
const faqs: FaqItem[] = [
  {
    q: "Does it work with our existing WhatsApp Business number?",
    a: "Yes. PropAI connects to your existing WhatsApp Business number through the official API — no new number needed, and your chat history carries over.",
  },
  {
    q: "What happens when the AI can't answer something?",
    a: "The conversation is handed to the right agent straight away, with the full chat history attached, so the buyer never hits a dead end.",
  },
  {
    q: "Can it handle enquiries in Hindi and regional languages?",
    a: "Yes. PropAI replies in the buyer's own language, including Hindi and other regional languages.",
  },
  {
    q: "Is there a setup fee or long-term contract?",
    a: "There is a one-time setup fee (₹15,000 on Starter, ₹20,000 on Growth) plus a monthly charge. After setup, plans are billed month to month.",
  },
];

export function Logo({ href = "#top" }: { href?: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-lg border border-[#e3e8f2] bg-white px-2.5 py-1.5"
    >
      <span className="grid h-6 w-6 place-items-center rounded-md bg-[#2563eb] text-white">
        <Building2 size={14} strokeWidth={2.2} />
      </span>
      <span className="font-display text-[15px] font-bold tracking-tight text-[#12224a]">
        PropAI CRM
      </span>
    </a>
  );
}

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#e3e8f2]/70 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-[68px] max-w-[1000px] items-center justify-between px-6">
        <Logo />
        <nav className="hidden items-center gap-9 md:flex" aria-label="Main">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] text-[#6b7694] transition hover:text-[#12224a]"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="https://prop-ai-whatsapp-chatbot-lat0.onrender.com/login"
          className="rounded-full bg-[#0f1f4d] px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#0a1840]"
        >
          Get started
        </a>
      </div>
    </header>
  );
}

function PhoneMockup() {
  return (
    <div className="mx-auto w-[318px] rounded-[34px] border-[7px] border-[#0f1f4d] bg-[#0f1f4d] shadow-[0_30px_60px_-25px_rgba(15,31,77,.45)]">
      <div className="overflow-hidden rounded-[26px] bg-[#dbe6fb]">
        <div className="flex items-center gap-3 bg-white px-4 py-3">
          <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-[#2563eb] to-[#0f1f4d]" />
          <div className="leading-tight">
            <p className="text-[13px] font-semibold text-[#12224a]">
              Ananya · Buyer enquiry
            </p>
            <p className="text-[11px] text-emerald-600">Replied in 8 seconds</p>
          </div>
        </div>

        <div className="space-y-2.5 px-3.5 pb-5 pt-5">
          <div className="max-w-[78%] rounded-xl rounded-tl-sm bg-white px-3 py-2 text-[12px] leading-snug text-[#12224a]">
            Hi, is the 3BHK in Sector 12 still available?
          </div>

          <div className="ml-auto max-w-[78%] rounded-xl rounded-tr-sm bg-[#c3d4fb] px-3 py-2 text-[12px] leading-snug text-[#12224a]">
            Yes, it's available! Here are the details 👇
          </div>

          <div className="ml-auto w-[78%] rounded-xl rounded-tr-sm bg-[#c3d4fb] p-1.5 pb-2">
            <div className="h-[52px] rounded-lg bg-gradient-to-br from-[#b9ccff] via-[#7ea1f5] to-[#4f7be8]" />
            <p className="mt-1.5 px-1 text-[11px] font-semibold text-[#12224a]">
              Sector 12 · 3BHK, 1450 sq.ft
            </p>
            <p className="px-1 text-[10px] text-[#6b7694]">
              ₹1.15 Cr · Ready to move
            </p>
          </div>

          <div className="max-w-[78%] rounded-xl rounded-tl-sm bg-white px-3 py-2 text-[12px] leading-snug text-[#12224a]">
            Can we schedule a site visit this weekend?
          </div>

          <div
            className="inline-flex gap-1 rounded-xl rounded-tl-sm bg-white px-3 py-2.5"
            aria-label="Typing"
          >
            <span className="dot h-1.5 w-1.5 rounded-full bg-[#6b7694]" />
            <span className="dot h-1.5 w-1.5 rounded-full bg-[#6b7694]" />
            <span className="dot h-1.5 w-1.5 rounded-full bg-[#6b7694]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[radial-gradient(ellipse_at_90%_0%,#eaf0ff_0%,#ffffff_55%)]"
    >
      <div className="mx-auto grid max-w-[1000px] items-center gap-12 px-6 py-16 md:grid-cols-[1.15fr_1fr] md:py-20">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eaf0ff] px-3 py-1 text-[11px] font-semibold text-[#2563eb]">
            <Sparkles size={12} /> Built for real estate teams
          </span>
          <h1 className="mt-6 text-[40px] font-bold leading-[1.08] tracking-tight text-[#12224a] sm:text-[52px]">
            Every lead answered,{" "}
            <span className="text-[#2563eb]">even while you’re on-site.</span>
          </h1>
          <p className="mt-6 max-w-[430px] text-[15px] leading-relaxed text-[#6b7694]">
            PropAI replies to buyer enquiries on WhatsApp within seconds,
            qualifies them against your listings, and hands your team only the
            conversations worth a phone call.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={LOGIN_URL}
              className="inline-flex items-center gap-2 rounded-full bg-[#0f1f4d] px-6 py-3 text-[13px] font-semibold text-white transition hover:bg-[#0a1840]"
            >
              Log in to your CRM <ArrowRight size={14} />
            </a>
            <a
              href="#how-it-works"
              className="rounded-full border border-[#e3e8f2] bg-white px-6 py-3 text-[13px] font-semibold text-[#12224a] transition hover:border-[#12224a]/30"
            >
              See how it works
            </a>
          </div>
          <p className="mt-7 flex items-center gap-2 text-[11px] text-[#6b7694]">
            <span className="flex text-[#2563eb]" aria-label="5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={10} fill="currentColor" strokeWidth={0} />
              ))}
            </span>
            Trusted by 400+ brokerages managing 60,000+ leads a month
          </p>
        </div>
        <PhoneMockup />
      </div>
    </section>
  );
}

function LogoStrip() {
  return (
    <div className="border-y border-[#e3e8f2]">
      <div className="mx-auto flex max-w-[1000px] flex-col gap-4 px-6 py-7 md:flex-row md:items-center md:justify-between">
        <p className="text-[11px] text-[#6b7694]">Used daily by teams at</p>
        <ul className="flex flex-wrap gap-x-8 gap-y-2">
          {clients.map((c) => (
            <li
              key={c}
              className="font-display text-[13px] font-semibold text-[#b4bdd3]"
            >
              {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

type SectionHeadProps = {
  label: string;
  title: string;
  text?: string;
  center?: boolean;
  light?: boolean;
};

function SectionHead({
  label,
  title,
  text,
  center = false,
  light = false,
}: SectionHeadProps) {
  return (
    <div className={center ? "text-center" : ""}>
      <p
        className={`text-[12px] font-medium ${light ? "text-[#6c93f5]" : "text-[#2563eb]"}`}
      >
        {label}
      </p>
      <h2
        className={`mt-3 text-[30px] font-medium leading-[1.15] tracking-tight sm:text-[34px] ${light ? "text-white" : "text-[#12224a]"} ${center ? "" : "max-w-[440px]"}`}
      >
        {title}
      </h2>
      {text && (
        <p
          className={`mt-4 max-w-[480px] text-[13px] leading-relaxed ${center ? "mx-auto" : ""} ${light ? "text-[#a9b8de]" : "text-[#6b7694]"}`}
        >
          {text}
        </p>
      )}
    </div>
  );
}

function Skyline() {
  const win = (x: number, y: number, c = "#2f63e6") => (
    <rect key={`${x}-${y}`} x={x} y={y} width="9" height="9" rx="1" fill={c} />
  );
  const grid = (
    x0: number,
    y0: number,
    cols: number,
    rows: number,
    gap: number,
    c?: string,
  ) =>
    Array.from({ length: rows }).flatMap((_, r) =>
      Array.from({ length: cols }).map((_, k) =>
        win(x0 + k * gap, y0 + r * gap, c),
      ),
    );
  return (
    <svg
      viewBox="0 0 620 200"
      className="mx-auto my-20 w-full max-w-[600px]"
      role="img"
      aria-label="Illustration of residential towers"
    >
      <line
        x1="0"
        y1="168"
        x2="620"
        y2="168"
        stroke="#dfe6f4"
        strokeWidth="1.5"
      />
      {/* faint outer buildings */}
      <rect x="60" y="110" width="52" height="58" rx="3" fill="#eef2fb" />
      {grid(70, 122, 2, 3, 18, "#dbe3f6")}
      <rect x="500" y="125" width="44" height="43" rx="3" fill="#eef2fb" />
      {grid(510, 135, 2, 2, 17, "#dbe3f6")}
      {/* left white tower */}
      <rect
        x="138"
        y="82"
        width="62"
        height="86"
        rx="3"
        fill="#fff"
        stroke="#c9d4ec"
        strokeWidth="1.5"
      />
      {grid(150, 96, 3, 4, 17, "#7f9fe9")}
      {/* centre tall navy tower */}
      <line
        x1="262"
        y1="22"
        x2="262"
        y2="40"
        stroke="#0f1f4d"
        strokeWidth="2"
      />
      <circle cx="262" cy="20" r="3" fill="#2563eb" />
      <rect x="226" y="40" width="72" height="128" rx="3" fill="#0f1f4d" />
      {grid(238, 54, 3, 6, 21, "#2f63e6")}
      {/* right white tower */}
      <rect
        x="318"
        y="72"
        width="62"
        height="96"
        rx="3"
        fill="#fff"
        stroke="#c9d4ec"
        strokeWidth="1.5"
      />
      {grid(330, 86, 3, 4, 17, "#7f9fe9")}
      {/* house */}
      <rect
        x="396"
        y="136"
        width="40"
        height="32"
        rx="2"
        fill="#fff"
        stroke="#c9d4ec"
        strokeWidth="1.5"
      />
      <path d="M390 138 L416 118 L442 138 Z" fill="#2563eb" />
      <rect x="410" y="150" width="12" height="18" rx="1" fill="#0f1f4d" />
    </svg>
  );
}

const Icons: Record<string, ComponentType<LucideProps>> = {
  MessageCircle,
  ChartNoAxesColumn,
  CalendarDays,
  ChartLine,
  Users,
  ChartColumn,
};

function Features() {
  return (
    <section id="features" className="mx-auto max-w-[1000px] px-6 pt-20">
      <SectionHead
        label="Features"
        title="The parts of your day PropAI takes off your plate."
        text="From the first WhatsApp message to a signed booking, every step is tracked and half of it is automated."
      />
      <div className="mt-12 grid overflow-hidden rounded-xl border border-[#e3e8f2] sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => {
          const Icon = Icons[f.icon];
          return (
            <div
              key={f.title}
              className={`p-6 ${i % 3 !== 2 ? "lg:border-r" : ""} ${i < 3 ? "lg:border-b" : ""} border-[#e3e8f2] max-lg:border-b`}
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#eaf0ff] text-[#2563eb]">
                <Icon size={15} />
              </span>
              <h3 className="mt-6 text-[13px] font-semibold text-[#12224a]">
                {f.title}
              </h3>
              <p className="mt-2 text-[11.5px] leading-relaxed text-[#6b7694]">
                {f.text}
              </p>
            </div>
          );
        })}
      </div>
      <Skyline />
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-[1000px] px-6">
      <div className="rounded-2xl bg-[#0f1f4d] px-8 py-12 sm:px-12">
        <SectionHead
          light
          label="How it works"
          title="From a WhatsApp ”hi” to a closed deal."
          text="Four steps, running in the background of every enquiry you get."
        />
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n} className="border-t border-white/15 pt-4">
              <span className="text-[11px] font-medium text-[#4f86f7]">
                {s.n}
              </span>
              <h3 className="mt-3 text-[13px] font-semibold text-white">
                {s.title}
              </h3>
              <p className="mt-2 text-[11.5px] leading-relaxed text-[#a9b8de]">
                {s.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="mx-auto max-w-[1000px] px-6 pt-28">
      <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <dt className="font-display text-[40px] font-medium leading-none tracking-tight text-[#12224a]">
              {s.value}
              <span className="text-[#2563eb]">{s.suffix}</span>
            </dt>
            <dd className="mt-3 text-[12px] text-[#6b7694]">{s.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Testimonial() {
  return (
    <section className="mx-auto max-w-[1000px] px-6 pt-28">
      <figure className="flex gap-6 rounded-xl bg-[#eaf0ff] px-8 py-9 sm:px-10">
        <Quote
          size={22}
          className="mt-2 shrink-0 text-[#2563eb]"
          fill="currentColor"
          strokeWidth={0}
        />
        <div>
          <blockquote className="text-[16px] font-medium leading-relaxed text-[#12224a]">
            We used to lose buyers overnight because nobody replied fast enough.
            Now our slowest response is under a minute, even at 11pm.
          </blockquote>
          <figcaption className="mt-5 text-[11px] text-[#6b7694]">
            <span className="font-semibold text-[#12224a]">Rohit Malhotra</span>{" "}
            — Director, Skyline Homes, Gurugram
          </figcaption>
        </div>
      </figure>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-[1000px] px-6 pt-32">
      <SectionHead
        label="Pricing"
        title="Plans that scale with your listings."
        text="Every plan includes WhatsApp automation and unlimited agent seats."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`relative flex flex-col rounded-2xl border bg-white p-6 ${p.popular ? "border-[#2563eb] shadow-[0_0_0_3px_#eaf0ff]" : "border-[#e3e8f2]"}`}
          >
            {p.popular && (
              <span className="absolute -top-3 left-5 rounded-full bg-[#2563eb] px-2.5 py-0.5 text-[10px] font-semibold text-white">
                Most popular
              </span>
            )}
            <h3 className="text-[13px] font-semibold text-[#12224a]">
              {p.name}
            </h3>
            <p className="mt-4 font-display text-[32px] font-bold leading-none tracking-tight text-[#12224a]">
              {p.price}
              <span className="text-[12px] font-normal text-[#6b7694]">
                {p.period}
              </span>
            </p>
            {p.setup && (
              <p className="mt-2 text-[11px] font-semibold text-[#2563eb]">
                + {p.setup}
              </p>
            )}
            <p className="mt-3 min-h-[34px] text-[11px] leading-relaxed text-[#6b7694]">
              {p.desc}
            </p>
            <ul className="mt-5 flex-1 space-y-3">
              {p.items.map((it) => (
                <li
                  key={it}
                  className="flex items-center gap-2 text-[11.5px] text-[#12224a]"
                >
                  <Check size={13} className="shrink-0 text-[#2563eb]" /> {it}
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${COMPANY.email}?subject=${encodeURIComponent(APP_NAME + " - " + p.name + " plan enquiry")}`}
              className={`mt-8 block rounded-full py-3 text-center text-[12px] font-semibold transition ${p.popular ? "bg-[#0f1f4d] text-white hover:bg-[#0a1840]" : "border border-[#e3e8f2] text-[#12224a] hover:border-[#12224a]/30"}`}
            >
              {p.cta}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number>(0);
  return (
    <section id="faq" className="mx-auto max-w-[1000px] px-6 pt-32">
      <SectionHead center label="FAQ" title="Questions, answered." />
      <div className="mx-auto mt-12 max-w-[640px]">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="border-b border-[#e3e8f2]">
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left font-sans text-[12.5px] font-semibold text-[#12224a]"
                >
                  {f.q}
                  <Plus
                    size={14}
                    className={`shrink-0 text-[#2563eb] transition-transform ${isOpen ? "rotate-45" : ""}`}
                  />
                </button>
              </h3>
              {isOpen && (
                <p
                  id={`faq-${i}`}
                  className="-mt-1 pb-5 pr-8 text-[11.5px] leading-relaxed text-[#6b7694]"
                >
                  {f.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="mx-auto max-w-[1000px] px-6 pt-32">
      <div className="rounded-2xl bg-gradient-to-br from-[#0a1840] to-[#173a8a] px-6 py-16 text-center">
        <h2 className="text-[30px] font-medium tracking-tight text-white sm:text-[34px]">
          Stop losing leads to slow replies.
        </h2>
        <p className="mt-4 text-[13px] text-[#a9b8de]">
          Log in and connect your WhatsApp number in under 10 minutes.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="https://prop-ai-whatsapp-chatbot-lat0.onrender.com/login"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-[#0f1f4d] px-6 py-3 text-[12px] font-semibold text-white transition hover:bg-[#0a1840]"
          >
            Log in to PropAI CRM <ArrowRight size={13} />
          </a>
          <a
            href="#features"
            className="rounded-full border border-white/25 px-6 py-3 text-[12px] font-semibold text-white transition hover:bg-white/10"
          >
            Explore features
          </a>
        </div>
      </div>
    </section>
  );
}

const cols = [
  {
    title: "Product",
    links: [
      ["Features", "#features"],
      ["How it works", "#how-it-works"],
      ["Pricing", "#pricing"],
    ],
  },
  {
    title: "Account",
    links: [
      ["Log in", LOGIN_URL],
      ["FAQ", "#faq"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy Policy", PATHS.privacy],
      ["Terms of Service", PATHS.terms],
      ["Data Deletion", PATHS.dataDeletion],
    ],
  },
];

function Footer() {
  return (
    <footer className="mx-auto mt-28 max-w-[1000px] px-6 pb-8">
      <div className="flex flex-col justify-between gap-10 sm:flex-row">
        <div className="max-w-[270px]">
          <Logo />
          <p className="mt-3 text-[11px] leading-relaxed text-[#6b7694]">
            AI-powered CRM and WhatsApp automation, built for real estate teams
            that don’t want to lose a lead to a slow reply.
          </p>
          <p className="mt-3 text-[10.5px] leading-relaxed text-[#6b7694]">
            {COMPANY.name}, {COMPANY.address}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-14 gap-y-8">
          {cols.map((c) => (
            <div key={c.title}>
              <p className="text-[11px] font-semibold text-[#12224a]">
                {c.title}
              </p>
              <ul className="mt-3 space-y-2">
                {c.links.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-[11px] text-[#6b7694] hover:text-[#12224a]"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12 flex flex-col justify-between gap-2 border-t border-[#e3e8f2] pt-5 text-[10.5px] text-[#6b7694] sm:flex-row">
        <p>
          © 2026 {APP_NAME} CRM, a product of {COMPANY.name}. All rights
          reserved.
        </p>
        <p>
          {COMPANY.email} · {COMPANY.phone}
        </p>
      </div>
    </footer>
  );
}

export default function PropAILanding() {

  return (
    <div className="propai">
      <Seo
        title={`${APP_NAME} CRM for Real Estate | Every Lead Answered | Deific Digital`}
        description="PropAI is a real estate CRM with an AI sales agent that replies to every lead on WhatsApp in seconds, books site visits and follows up automatically."
        path="/propai"
        jsonLd={breadcrumbLd([["Home", "/"], ["PropAI", "/propai"]])}
      />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <Navbar />
      <main>
        <Hero />
        <LogoStrip />
        <Features />
        <HowItWorks />
        <Stats />
        <Testimonial />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
