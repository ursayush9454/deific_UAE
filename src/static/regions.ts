import { Building2, Stethoscope, Calculator, Car, Store } from "lucide-react";
import { COPY_EN, type Copy } from "./copy";
import { feed as feedIN, industries as industriesIN, faqs as faqsIN, type FeedItem, type Industry } from "./homeContent";

// ─────────────────────────────────────────────────────────────
// Region content. "/" uses IN, "/uae" uses AE (English),
// "/uae/ar" is the Arabic UAE page.
// ─────────────────────────────────────────────────────────────

export type RegionCode = "IN" | "AE";
export type VariantId = "IN" | "AE" | "AE_AR";

export type PricePlan = {
  name: string;
  price: string; // shown as "from <price>"
  unit?: string; // "/month", "one-time", ...
  note?: string;
};

export type PriceGroup = { title: string; text: string; plans: PricePlan[] };

export type Region = {
  id: VariantId;
  code: RegionCode;
  copy: Copy;
  path: string; // base path of the region homepage
  hrefLang: string;
  currency: "INR" | "AED";
  countryCode: string; // default phone code in forms
  seo: { title: string; description: string };
  kicker: string;
  heroBody: string;
  feed: FeedItem[];
  industries: Industry[];
  faqs: { q: string; a: string }[];
  ctaPoints: string[];
  pricing?: { groups: PriceGroup[]; footnote: string };
};

// ── India ───────────────────────────────────────────────────
const IN: Region = {
  id: "IN",
  code: "IN",
  copy: COPY_EN,
  path: "/",
  hrefLang: "en-IN",
  currency: "INR",
  countryCode: "+91",
  seo: {
    title: "AI Automation & AI Agents for Businesses in India & UAE | Deific Digital",
    description:
      "Custom AI agents (receptionist, customer care, sales), WhatsApp AI agents and automation flows that run 60–80% of daily tasks. Plus web, mobile app, game and smart city development.",
  },
  kicker: "Custom AI automation for businesses in India and the UAE",
  heroBody:
    "We build AI agents and automation flows around the way you already work. Calls get answered, leads get a reply in seconds, follow-ups and reminders go out on time, and 60–80% of your daily routine runs without your team.",
  feed: feedIN,
  industries: industriesIN,
  faqs: faqsIN,
  ctaPoints: [
    "No cost and no obligation",
    "ISO 9001 and ISO/IEC 27001 certified company",
    "Plan in your language: Hindi, English or Arabic",
    "For businesses in India, Dubai and the rest of the UAE",
  ],
};

// ── UAE (English) ───────────────────────────────────────────
const feedAE: FeedItem[] = [
  { task: "Property Finder lead: 2BR in JVC", where: "Real estate", agent: "Sales agent", result: "Replied in 8 sec, viewing booked for Sat 11 am", waiting: "47 min" },
  { task: "Patient call at 9:42 pm", where: "Clinic", agent: "AI receptionist", result: "Appointment booked, confirmation sent on WhatsApp", waiting: "Missed" },
  { task: "VAT return documents pending from 14 clients", where: "Accounting", agent: "Automation flow", result: "Reminders sent, 9 clients uploaded already", waiting: "3 days" },
  { task: "Car rental enquiry from Instagram", where: "Car rental", agent: "WhatsApp agent", result: "Car and dates confirmed, deposit link sent", waiting: "2 hr" },
  { task: "Invoice overdue by 12 days", where: "Accounts", agent: "Automation flow", result: "Payment link sent in AED, follow-up set for Monday", waiting: "12 days" },
  { task: "Arabic enquiry on website chat", where: "Website", agent: "Sales agent", result: "Answered in Arabic, brochure shared, lead scored hot", waiting: "1 day" },
  { task: "Order complaint from a customer", where: "Customer care", agent: "Care agent", result: "Resolved from knowledge base, ticket closed", waiting: "5 hr" },
  { task: "End-of-day business report", where: "Owner", agent: "Automation flow", result: "Leads, calls and payments summary sent at 8 pm", waiting: "Not done" },
];

const industriesAE: Industry[] = [
  {
    id: "real-estate",
    icon: Building2,
    name: "Real estate",
    headline: "Every Bayut, Property Finder and Dubizzle lead answered and booked for a viewing.",
    automates: [
      "Instant WhatsApp reply to leads from Bayut, Property Finder, Dubizzle and Meta ads",
      "Hot, warm, cold lead scoring from the conversation",
      "Viewing booking and reminders for buyer, tenant and agent",
      "Off-plan launch broadcasts and follow-ups until the lead replies",
      "CRM updates and daily pipeline report to the broker or developer",
    ],
    link: { to: "/propai", label: "See PropAI, our real estate CRM" },
  },
  {
    id: "clinics",
    icon: Stethoscope,
    name: "Clinics & healthcare",
    headline: "Patients book in Arabic or English, get reminders and receive reports without calling.",
    automates: [
      "AI voice receptionist for bookings and enquiries, day and night",
      "WhatsApp appointment booking with doctor-wise slots",
      "Appointment, follow-up and treatment reminders",
      "Reports, invoices and insurance documents sent on WhatsApp",
      "Feedback collection and Google review requests",
    ],
  },
  {
    id: "accounting",
    icon: Calculator,
    name: "Accounting & corporate services",
    headline: "VAT, corporate tax and company setup paperwork collected and tracked on its own.",
    automates: [
      "Document collection over WhatsApp for VAT and corporate tax filings",
      "Filing deadline reminders to every client",
      "Company setup and visa onboarding forms and checklists",
      "Invoice and fee follow-ups with AED payment links",
      "Status updates so clients stop calling to ask",
    ],
  },
  {
    id: "car-rental",
    icon: Car,
    name: "Car rental & dealers",
    headline: "Enquiries become bookings, and customers come back for service and renewals.",
    automates: [
      "Instant reply to enquiries from ads, website and Dubizzle",
      "Booking confirmation with deposit and payment links",
      "Test-drive scheduling and showroom alerts",
      "Service, registration and insurance renewal reminders",
      "Post-rental feedback and repeat-booking offers",
    ],
  },
  {
    id: "others",
    icon: Store,
    name: "Other businesses",
    headline: "If your team repeats it every day, it can most likely run on its own.",
    automates: [
      "Restaurants and hospitality: reservations, offers, reviews",
      "Retail and e-commerce: orders, delivery updates, abandoned carts",
      "Trading and distribution: dealer orders, quotations, dispatch",
      "Education and training: admissions enquiries, fee reminders",
      "Any business: HR onboarding, daily MIS reports",
    ],
  },
];

const faqsAE = [
  faqsIN[0],
  {
    q: "How much does an AI agent cost in the UAE?",
    a: "Our AI agents start from AED 899 a month, with a one-time setup from AED 1,999. WhatsApp and telephony charges are billed at actual cost. After the free audit you get a fixed quote in AED.",
  },
  {
    q: "Do your AI agents speak Arabic?",
    a: "Yes. Our voice and WhatsApp agents talk with your customers in Arabic and English, and can also handle Hindi and Urdu.",
  },
  {
    q: "Do you work with businesses across the UAE?",
    a: "Yes. We work with businesses in Dubai, Abu Dhabi, Sharjah and the rest of the UAE. Our delivery team is in India, so we meet on video call and WhatsApp and are available during UAE business hours.",
  },
  {
    q: "Do you use the official WhatsApp Business API?",
    a: "Yes. We set up your number on the official WhatsApp Business Platform, so you get a verified business profile, templates, broadcasts and no risk of a banned number.",
  },
  faqsIN.find((f) => f.q.startsWith("Is my business"))!,
  faqsIN.find((f) => f.q.startsWith("How long"))!,
].filter(Boolean);

const AE: Region = {
  id: "AE",
  code: "AE",
  copy: COPY_EN,
  path: "/uae",
  hrefLang: "en-AE",
  currency: "AED",
  countryCode: "+971",
  seo: {
    title: "AI Agents & WhatsApp Automation in Dubai & UAE | Deific Digital",
    description:
      "AI receptionist, customer care and sales agents, WhatsApp AI and automation flows for UAE businesses. Arabic and English. Prices in AED. Plus web, app and game development.",
  },
  kicker: "AI automation for businesses in Dubai and across the UAE",
  heroBody:
    "We build AI agents and automation flows around the way your team already works. Calls get answered in Arabic or English, leads from Bayut, Property Finder and Meta get a reply in seconds, and 60–80% of the daily routine runs on its own.",
  feed: feedAE,
  industries: industriesAE,
  faqs: faqsAE,
  ctaPoints: [
    "No cost and no obligation",
    "ISO 9001 and ISO/IEC 27001 certified company",
    "In Arabic or English, on video call or WhatsApp",
    "A fixed quote in AED",
  ],
  pricing: {
    groups: [
      {
        title: "AI agents",
        text: "Monthly plans. One-time setup from AED 1,999.",
        plans: [
          { name: "WhatsApp AI Agent", price: "AED 899", unit: "/month" },
          { name: "AI Customer Care", price: "AED 999", unit: "/month" },
          { name: "AI Sales Agent", price: "AED 1,199", unit: "/month" },
          { name: "AI Receptionist (voice)", price: "AED 1,499", unit: "/month" },
        ],
      },
      {
        title: "Automation and products",
        text: "Flows are built once and run for you every day.",
        plans: [
          { name: "Automation flow", price: "AED 3,500", unit: "per flow" },
          { name: "PropAI real estate CRM", price: "AED 999", unit: "/month" },
          { name: "Full business automation", price: "AED 12,000", unit: "one-time" },
        ],
      },
      {
        title: "Development",
        text: "Fixed-price projects, quoted after scoping.",
        plans: [
          { name: "Business website", price: "AED 4,999", unit: "one-time" },
          { name: "Web application", price: "AED 25,000", unit: "one-time" },
          { name: "Mobile app", price: "AED 18,000", unit: "one-time" },
          { name: "Game development", price: "AED 20,000", unit: "one-time" },
        ],
      },
    ],
    footnote:
      "Starting prices. You get a fixed quote in AED after the free audit. Prices exclude VAT where applicable and third-party charges such as WhatsApp, telephony and app store fees.",
  },
};

import { AE_AR } from "./regionAr";

export const REGIONS: Record<VariantId, Region> = { IN, AE, AE_AR };

/** All language/region versions of the homepage, for hreflang tags. */
export const HOME_ALTERNATES = [
  { hrefLang: "en-IN", path: "/" },
  { hrefLang: "en-AE", path: "/uae" },
  { hrefLang: "ar-AE", path: "/uae/ar" },
  { hrefLang: "x-default", path: "/" },
];
