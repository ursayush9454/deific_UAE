import {
  PhoneCall,
  Headset,
  TrendingUp,
  MessageCircle,
  Building2,
  Stethoscope,
  Calculator,
  Car,
  Store,
  Globe2,
  Smartphone,
  Gamepad2,
  Landmark,
  type LucideIcon,
} from "lucide-react";

// ── Live console feed (hero) ────────────────────────────────
export type FeedItem = {
  task: string;
  where: string;
  agent: string;
  result: string;
  waiting: string; // how long it would sit in manual mode
};

export const feed: FeedItem[] = [
  { task: "New WhatsApp lead: 3BHK enquiry", where: "Real estate", agent: "Sales agent", result: "Replied in 8 sec, site visit booked for Sat 11 am", waiting: "47 min" },
  { task: "Patient call at 9:42 pm", where: "Hospital", agent: "AI receptionist", result: "OPD slot booked, confirmation sent on WhatsApp", waiting: "Missed" },
  { task: "GST documents pending from 14 clients", where: "CA firm", agent: "Automation flow", result: "Reminders sent, 9 clients uploaded already", waiting: "3 days" },
  { task: "Test-drive enquiry from Instagram", where: "Car dealer", agent: "WhatsApp agent", result: "Slot fixed, showroom executive alerted", waiting: "2 hr" },
  { task: "Invoice overdue by 12 days", where: "Accounts", agent: "Automation flow", result: "Payment link sent, follow-up set for Monday", waiting: "12 days" },
  { task: "Order complaint from a customer", where: "Customer care", agent: "Care agent", result: "Resolved from knowledge base, ticket closed", waiting: "5 hr" },
  { task: "Price request on website chat", where: "Website", agent: "Sales agent", result: "Brochure shared, lead scored hot, sent to CRM", waiting: "1 day" },
  { task: "End-of-day business report", where: "Owner", agent: "Automation flow", result: "Leads, calls and payments summary sent at 8 pm", waiting: "Not done" },
];

// ── AI agents for sale ──────────────────────────────────────
export type Agent = {
  icon: LucideIcon;
  name: string;
  line: string;
  does: string[];
  channels: string;
};

export const agents: Agent[] = [
  {
    icon: PhoneCall,
    name: "AI Receptionist",
    line: "Answers every call, day or night, and books the appointment.",
    does: ["Picks up calls 24/7, no missed calls", "Books, reschedules and confirms appointments", "Transfers urgent calls to the right person"],
    channels: "Phone, WhatsApp",
  },
  {
    icon: Headset,
    name: "AI Customer Care",
    line: "Solves routine questions instantly and hands over the rest.",
    does: ["Answers FAQs from your own knowledge base", "Tracks orders, raises and closes tickets", "Escalates to your team with full context"],
    channels: "WhatsApp, website chat, email",
  },
  {
    icon: TrendingUp,
    name: "AI Sales Agent",
    line: "Replies to new leads in seconds and books the meeting.",
    does: ["Qualifies leads as hot, warm or cold", "Follows up until the lead replies", "Books meetings on your team's calendar"],
    channels: "WhatsApp, calls, website",
  },
  {
    icon: MessageCircle,
    name: "WhatsApp AI Agent",
    line: "Your business on WhatsApp, selling and supporting on autopilot.",
    does: ["Official WhatsApp Business API setup", "Catalogue, payment links and broadcasts", "Talks in Arabic, English, Hindi and more"],
    channels: "WhatsApp",
  },
];

// ── Industries ──────────────────────────────────────────────
export type Industry = {
  id: string;
  icon: LucideIcon;
  name: string;
  headline: string;
  automates: string[];
  link?: { to: string; label: string };
};

export const industries: Industry[] = [
  {
    id: "real-estate",
    icon: Building2,
    name: "Real estate",
    headline: "Every property lead answered, scored and booked for a site visit.",
    automates: [
      "Instant WhatsApp reply to leads from 99acres, MagicBricks, Bayut, Meta ads",
      "Hot, warm, cold lead scoring from the conversation",
      "Site-visit booking and reminders for buyer and broker",
      "Follow-ups that run until the lead replies",
      "CRM updates and daily pipeline report to the owner",
    ],
    link: { to: "/propai", label: "See PropAI, our real estate CRM" },
  },
  {
    id: "hospital",
    icon: Stethoscope,
    name: "Hospitals & clinics",
    headline: "Patients book, get reminders and receive reports without calling the desk.",
    automates: [
      "AI voice receptionist for OPD bookings and enquiries",
      "WhatsApp appointment booking with doctor-wise slots",
      "Appointment, medicine and follow-up reminders",
      "Lab reports and bills delivered on WhatsApp",
      "Feedback collection and Google review requests",
    ],
  },
  {
    id: "ca-firm",
    icon: Calculator,
    name: "CA & accounting firms",
    headline: "Documents collected, deadlines tracked and clients updated on their own.",
    automates: [
      "Document collection over WhatsApp, saved to client folders",
      "GST, TDS and ITR due-date reminders to every client",
      "New client onboarding forms and checklists",
      "Invoice and fee follow-ups with payment links",
      "Status updates so clients stop calling to ask",
    ],
  },
  {
    id: "car-dealers",
    icon: Car,
    name: "Car dealers",
    headline: "Enquiries turn into test drives, and service customers keep coming back.",
    automates: [
      "Instant reply to enquiries from ads, website and portals",
      "Test-drive booking and showroom executive alerts",
      "Service due, insurance and PUC renewal reminders",
      "Finance and exchange offer follow-ups",
      "Post-delivery feedback and referral requests",
    ],
  },
  {
    id: "others",
    icon: Store,
    name: "Other businesses",
    headline: "If your team repeats it every day, it can most likely run on its own.",
    automates: [
      "Schools and coaching: admissions enquiries, fee reminders",
      "Restaurants and retail: orders, offers, reviews",
      "Manufacturing and trading: dealer orders, dispatch updates",
      "Service businesses: bookings, quotations, invoices",
      "Any business: HR onboarding, daily MIS reports",
    ],
  },
];

// ── Build services ──────────────────────────────────────────
export const buildServices = [
  {
    icon: Globe2,
    name: "Web application development",
    text: "Portals, dashboards, CRMs and SaaS products built on React, Next.js and Node, ready to scale.",
    to: "/services/mvp-development",
  },
  {
    icon: Smartphone,
    name: "Mobile app development",
    text: "Android, iOS and cross-platform apps for customers, staff and field teams.",
    to: "/services/android-app-development",
  },
  {
    icon: Gamepad2,
    name: "Game development",
    text: "Casual, educational and multiplayer games for mobile and web, from concept to launch.",
    to: "/contact",
  },
  {
    icon: Landmark,
    name: "Smart city solutions",
    text: "Safe City CCTV, property tax and citizen service systems for urban local bodies.",
    to: "/contact",
  },
];

// ── Process (a real sequence) ───────────────────────────────
export const process = [
  { title: "Free automation audit", text: "A 30-minute call where we map the work your team repeats every day." },
  { title: "Automation blueprint", text: "A written plan: which tasks go to AI agents, which flows we build, and what it costs." },
  { title: "Build and connect", text: "We set up agents and flows on your WhatsApp, phone line, CRM, Sheets or software." },
  { title: "Go live and improve", text: "We train your team, watch the results and keep improving the flows every month." },
];

// ── FAQ (also used for FAQPage schema) ──────────────────────
export const faqs = [
  {
    q: "What is AI automation for business?",
    a: "AI automation means software agents and workflows do the repetitive work your team does every day, like replying to leads, answering calls, sending reminders, collecting documents and updating records. Your team only handles what really needs a person.",
  },
  {
    q: "How much of my work can be automated?",
    a: "Typically 60–80% of repetitive tasks such as follow-ups, bookings, reminders, data entry and reports can run automatically. The exact share depends on your processes, which is why we start with a free audit.",
  },
  {
    q: "Do I need to change my current software?",
    a: "No. We connect to what you already use: WhatsApp, phone lines, Google Sheets, Tally, your CRM or hospital software. If you have nothing yet, we set up a simple system for you.",
  },
  {
    q: "Can the AI agents speak Hindi and other languages?",
    a: "Yes. Our voice and WhatsApp agents can talk in Hindi, English and other Indian languages, and in Arabic for UAE businesses.",
  },
  {
    q: "Is my business and customer data safe?",
    a: "Yes. Deific Digital is ISO/IEC 27001 certified for information security and ISO 9001 certified for quality management. Your data is handled under these certified security processes.",
  },
  {
    q: "Do you work with businesses in Dubai and the UAE?",
    a: "Yes. We build AI agents, WhatsApp automation, real estate CRMs, web and mobile apps for businesses in Dubai and across the UAE, as well as in India.",
  },
  {
    q: "How long does it take to go live?",
    a: "A single agent or flow is usually live in one to two weeks. A full automation setup across sales, support and operations takes a few weeks, depending on the scope agreed in the blueprint.",
  },
];
