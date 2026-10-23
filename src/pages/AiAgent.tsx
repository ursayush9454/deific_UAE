import React from "react";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarCheck,
  Check,
  CheckCheck,
  Flame,
  History,
  LifeBuoy,
  MapPin,
  Radar,
  Snowflake,
  Sparkles,
  Stethoscope,
  Sun,
  Zap,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Small shared pieces                                                       */
/* -------------------------------------------------------------------------- */

function Bubble({
  from,
  children,
}: {
  from: "user" | "bot";
  children: React.ReactNode;
}) {
  const isUser = from === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-6 ${
          isUser
            ? "rounded-br-sm bg-black text-white"
            : "rounded-bl-sm border border-gray-200 bg-white text-gray-800"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function LivePill({ dark }: { dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
        dark ? "bg-white/10 text-white" : "bg-white text-gray-700 shadow-sm"
      }`}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600" />
      </span>
      Live now
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Product mockups                                                           */
/* -------------------------------------------------------------------------- */

function ReceptionistMockup() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute -inset-4 rounded-[40px] bg-red-600/10 blur-3xl" />

      {/* WhatsApp-style conversation */}
      <div className="relative overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-2xl">
        <div className="flex items-center gap-3 bg-black px-5 py-4 text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600">
            <Stethoscope size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold">City Care Clinic</p>
            <p className="text-xs text-white/50">AI Receptionist · online</p>
          </div>
        </div>

        <div className="space-y-3 bg-[#f7f7f5] p-5">
          <Bubble from="user">Hi, I want to book an appointment.</Bubble>
          <Bubble from="bot">Sure. What problem are you facing?</Bubble>
          <Bubble from="user">Fever and body pain for 3 days.</Bubble>
          <Bubble from="bot">
            <p>
              Dr. Anjali Sharma (General Physician) is available today. Free OPD
              slots:
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["4:00 PM", "4:30 PM", "5:00 PM"].map((slot, i) => (
                <span
                  key={slot}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                    i === 1
                      ? "border-red-600 bg-red-600 text-white"
                      : "border-red-200 text-red-600"
                  }`}
                >
                  {slot}
                </span>
              ))}
            </div>
          </Bubble>
          <Bubble from="user">4:30 PM</Bubble>
          <Bubble from="bot">
            <span className="flex items-center gap-2 font-semibold text-gray-900">
              <CalendarCheck size={16} className="text-red-600" />
              Appointment confirmed
            </span>
            <span className="mt-1 block text-gray-500">
              Today, 4:30 PM with Dr. Sharma.
            </span>
          </Bubble>
        </div>
      </div>

      {/* Doctor's side */}
      <div className="relative -mt-6 ml-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-xl sm:ml-14">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-400">
            What the doctor sees
          </p>
          <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
            Today, 4:30 PM
          </span>
        </div>

        <p className="mt-3 font-semibold">Rahul Mishra, 34 · Male</p>
        <p className="mt-1 text-sm text-gray-500">
          Complaint: Fever and body pain, 3 days
        </p>

        <div className="mt-4 flex items-start gap-3 rounded-xl bg-gray-50 p-3">
          <History size={16} className="mt-0.5 shrink-0 text-red-600" />
          <p className="text-xs leading-5 text-gray-600">
            2 previous visits. Last visit: viral fever, prescription and notes
            available.
          </p>
        </div>
      </div>
    </div>
  );
}

function PropAiMockup() {
  const leads = [
    {
      name: "Rohit Verma",
      need: "3 BHK · ₹85L – ₹1 Cr",
      status: "Hot",
      note: "Site visit booked, Sat 11 AM",
    },
    {
      name: "Neha Singh",
      need: "2 BHK · ₹45 – 55L",
      status: "Warm",
      note: "Asked for more photos",
    },
    {
      name: "Amit Gupta",
      need: "Plot · ₹30L",
      status: "Cold",
      note: "Replied once, no follow-up",
    },
    {
      name: "Priya Mishra",
      need: "4 BHK · ₹1.5 Cr",
      status: "Hot",
      note: "Asked for a call today",
    },
  ];

  const badge: Record<string, string> = {
    Hot: "bg-red-600 text-white",
    Warm: "bg-orange-100 text-orange-700",
    Cold: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div className="absolute -inset-4 rounded-[40px] bg-red-600/10 blur-3xl" />

      <div className="relative overflow-hidden rounded-[28px] border border-gray-200 bg-white p-5 shadow-2xl md:p-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <p className="text-xs font-semibold text-gray-400">Dashboard</p>
            <h4 className="mt-1 text-lg font-semibold">Your leads</h4>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <Building2 size={20} />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            {
              label: "Hot",
              value: "24",
              icon: Flame,
              cls: "bg-red-600 text-white",
            },
            {
              label: "Warm",
              value: "41",
              icon: Sun,
              cls: "bg-orange-50 text-orange-700",
            },
            {
              label: "Cold",
              value: "63",
              icon: Snowflake,
              cls: "bg-gray-50 text-gray-600",
            },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <div key={t.label} className={`rounded-2xl p-4 ${t.cls}`}>
                <Icon size={16} />
                <p className="mt-3 text-2xl font-semibold">{t.value}</p>
                <p className="text-xs opacity-80">{t.label} leads</p>
              </div>
            );
          })}
        </div>

        <div className="mt-5 divide-y divide-gray-100">
          {leads.map((lead) => (
            <div key={lead.name} className="flex items-center gap-4 py-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                {lead.name[0]}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{lead.name}</p>
                <p className="truncate text-xs text-gray-500">{lead.need}</p>
                <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-gray-400">
                  <MapPin size={11} className="shrink-0" />
                  {lead.note}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${badge[lead.status]}`}
              >
                {lead.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SalesMockup() {
  const funnel = [
    { label: "Leads found", value: "480", width: "100%" },
    { label: "Conversations started", value: "312", width: "68%" },
    { label: "Showed interest", value: "96", width: "34%" },
    { label: "Hot leads for you", value: "27", width: "16%" },
  ];

  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div className="absolute -inset-4 rounded-[40px] bg-red-600/20 blur-3xl" />

      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#161616] p-6 text-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <p className="text-xs font-semibold text-white/40">This week</p>
            <h4 className="mt-1 text-lg font-semibold">
              From search to hot lead
            </h4>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600">
            <Radar size={20} />
          </div>
        </div>

        <div className="mt-6 space-y-5">
          {funnel.map((row, i) => (
            <div key={row.label}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-white/70">{row.label}</span>
                <span className="font-semibold">{row.value}</span>
              </div>
              <div className="h-3 rounded-full bg-white/10">
                <div
                  className={`h-3 rounded-full ${
                    i === funnel.length - 1 ? "bg-red-500" : "bg-white/40"
                  }`}
                  style={{ width: row.width }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-7 rounded-2xl border border-red-500/40 bg-red-600/10 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Hot lead: Sharma Traders</p>
            <span className="flex items-center gap-1 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold">
              <Flame size={12} />
              Hot
            </span>
          </div>
          <p className="mt-2 text-xs leading-5 text-white/60">
            Asked for pricing and wants a call this week. Ready for your team to
            close.
          </p>
        </div>
      </div>
    </div>
  );
}

function SupportMockup() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute -inset-4 rounded-[40px] bg-red-600/10 blur-3xl" />

      <div className="relative overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between bg-black px-5 py-4 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600">
              <LifeBuoy size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold">Support</p>
              <p className="text-xs text-white/50">Replies in seconds</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 bg-[#f7f7f5] p-5">
          <Bubble from="user">What are your working hours?</Bubble>
          <Bubble from="bot">
            We are open Monday to Saturday, 10 AM to 7 PM. Anything else I can
            help with?
          </Bubble>
          <Bubble from="user">How can I change my registered number?</Bubble>
          <Bubble from="bot">
            Go to Profile, then Edit details, and update your number. You will
            get an OTP to confirm.
          </Bubble>
          <div className="flex items-center justify-center gap-2 pt-1 text-xs font-semibold text-red-600">
            <CheckCheck size={14} />
            Query resolved
          </div>
        </div>

        <div className="border-t border-gray-100 bg-white px-5 py-4 text-xs text-gray-500">
          Tricky question? It gets passed to your team with the full chat.
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Content                                                                   */
/* -------------------------------------------------------------------------- */

type Agent = {
  id: string;
  name: string;
  navLine: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  headline: string;
  description: string;
  problem: string;
  madeFor: string[];
  steps: { title: string; text?: string }[];
  features: string[];
  cta: string;
  theme: "soft" | "white" | "dark";
  Mockup: React.ComponentType;
};

const agents: Agent[] = [
  {
    id: "ai-receptionist",
    name: "AI Receptionist",
    navLine: "For clinics, polyclinics and hospitals",
    icon: Stethoscope,
    headline: "A front desk that books appointments on WhatsApp.",
    description:
      "Patients message on WhatsApp and the agent books the appointment. No queues, no busy phone lines.",
    problem: "Front desk staff spend the day noting down names and slots.",
    madeFor: ["Clinics", "Polyclinics", "Hospitals"],
    steps: [
      { title: "Patient messages on WhatsApp" },
      { title: "Agent asks about the problem" },
      { title: "Shows available doctors and free OPD slots" },
      { title: "Books the appointment" },
      { title: "Doctor sees the full slip and past history" },
    ],
    features: [
      "Books appointments 24/7",
      "Live doctor and OPD slots",
      "Complete patient slip",
      "Previous visit history",
    ],
    cta: "Get AI Receptionist",
    link: "https://medibuddy-dashboard.onrender.com/",
    theme: "soft",
    Mockup: ReceptionistMockup,
  },
  {
    id: "prop-ai",
    name: "Prop AI",
    navLine: "WhatsApp chatbot for real estate",
    icon: Building2,
    headline: "Every lead gets a reply in seconds, and a temperature.",
    description:
      "A WhatsApp chatbot that talks to every lead and shows you who is actually serious.",
    problem: "Leads go cold and nobody knows who to call first.",
    madeFor: ["Builders", "Property dealers", "Real estate agencies"],
    steps: [
      { title: "Messages every new or uploaded lead" },
      { title: "Asks property type and budget" },
      { title: "Shares matching property details" },
      { title: "Books the site visit" },
      { title: "Marks each lead hot, warm or cold" },
    ],
    features: [
      "Auto-messages every lead",
      "Matching property details",
      "Site visit booking",
      "Hot, warm, cold dashboard",
    ],
    cta: "Get Prop AI",
    link: "/propai",
    theme: "white",
    Mockup: PropAiMockup,
  },
  {
    id: "ai-sales-agent",
    name: "AI Sales Agent",
    navLine: "For sales teams and growing businesses",
    icon: Radar,
    headline: "It finds the leads and hands you only the hot ones.",
    description:
      "Finding and chasing leads is slow work. The agent does it and delivers leads that are ready to close.",
    problem: "Your team spends more time searching than selling.",
    madeFor: ["Sales teams", "Agencies", "Founders who sell"],
    steps: [
      { title: "Finds leads for your business" },
      { title: "Talks to each lead" },
      { title: "Measures how interested they are" },
      { title: "Delivers the hot leads" },
    ],
    features: [
      "Finds leads for you",
      "Talks to every lead",
      "Scores how hot each lead is",
      "Saves hours of manual work",
    ],
    cta: "Get AI Sales Agent",
    theme: "dark",
    Mockup: SalesMockup,
  },
  {
    id: "ai-customer-support",
    name: "AI Customer Support",
    navLine: "For any business with customer queries",
    icon: LifeBuoy,
    headline: "Customer questions answered instantly.",
    description:
      "The agent solves repeat queries right away, so your team can focus on the cases that need a human.",
    problem: "Your team answers the same questions all day.",
    madeFor: ["Ecommerce", "Service businesses", "Any support team"],
    steps: [
      { title: "Customer asks a question" },
      { title: "Agent answers right away" },
      { title: "Complex cases go to your team" },
    ],
    features: [
      "Instant replies, 24/7",
      "Solves common queries",
      "Less load on your team",
      "Faster resolutions",
    ],
    cta: "Get AI Customer Support",
    theme: "soft",
    Mockup: SupportMockup,
  },
];

/* -------------------------------------------------------------------------- */
/*  Agent section                                                             */
/* -------------------------------------------------------------------------- */

function AgentSection({ agent, index }: { agent: Agent; index: number }) {
  const Icon = agent.icon;
  const dark = agent.theme === "dark";
  const flip = index % 2 === 1;

  const bg =
    agent.theme === "dark"
      ? "bg-[#090909] text-white"
      : agent.theme === "soft"
        ? "bg-[#f7f7f5] text-[#111111]"
        : "bg-white text-[#111111]";

  const muted = dark ? "text-white/60" : "text-gray-500";
  const line = dark ? "bg-white/15" : "bg-gray-200";
  const chip = dark
    ? "border-white/15 bg-white/5 text-white/80"
    : "border-gray-200 bg-white text-gray-700";

  return (
    <section
      id={agent.id}
      className={`scroll-mt-20 px-6 py-20 md:px-12 md:py-28 ${bg}`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start lg:gap-20">
          {/* Text */}
          <div className={flip ? "lg:order-2" : ""}>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-white shadow-xl shadow-red-600/20">
                <Icon size={28} strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-xl font-semibold">{agent.name}</p>
                <div className="mt-1">
                  <LivePill dark={dark} />
                </div>
              </div>
            </div>

            <h2 className="mt-8 max-w-xl text-3xl font-semibold leading-[1.1] tracking-[-0.03em] md:text-5xl">
              {agent.headline}
            </h2>

            <p
              className={`mt-6 max-w-xl text-base leading-7 md:text-lg md:leading-8 ${muted}`}
            >
              {agent.description}
            </p>

            {/* Made for + problem */}
            <div className="mt-8">
              <p className="text-sm font-semibold">Who needs it</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {agent.madeFor.map((who) => (
                  <span
                    key={who}
                    className={`rounded-full border px-4 py-2 text-xs font-semibold ${chip}`}
                  >
                    {who}
                  </span>
                ))}
              </div>
              <p className={`mt-4 max-w-xl text-sm leading-6 ${muted}`}>
                <span
                  className={
                    dark
                      ? "font-semibold text-white"
                      : "font-semibold text-black"
                  }
                >
                  The problem:
                </span>{" "}
                {agent.problem}
              </p>
            </div>

            {/* Steps */}
            <div className="mt-10">
              <p className="text-sm font-semibold">How it works</p>
              <ol className="mt-5">
                {agent.steps.map((step, i) => (
                  <li
                    key={step.title}
                    className="relative flex gap-4 pb-5 last:pb-0"
                  >
                    {i < agent.steps.length - 1 && (
                      <span
                        className={`absolute left-4 top-9 bottom-1 w-px -translate-x-1/2 ${line}`}
                      />
                    )}
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-semibold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold leading-8">{step.title}</p>
                      {step.text && (
                        <p className={`text-sm leading-6 ${muted}`}>
                          {step.text}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Features */}
            <div className="mt-10 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {agent.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <Check size={18} className="mt-0.5 shrink-0 text-red-500" />
                  <span
                    className={`text-sm leading-6 ${dark ? "text-white/80" : "text-gray-700"}`}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <a
              href={agent?.link}
              className={`mt-10 inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-semibold transition ${
                dark
                  ? "bg-red-600 text-white hover:bg-white hover:text-black"
                  : "bg-black text-white hover:bg-red-600"
              }`}
            >
              {agent.cta}
              <ArrowUpRight size={18} />
            </a>
          </div>

          {/* Mockup */}
          <div className={`lg:sticky lg:top-28 ${flip ? "lg:order-1" : ""}`}>
            <agent.Mockup />
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function AiAgents() {
  return (
    <>
      <Helmet>
        <title>
          AI Agents for Business | Receptionist, Real Estate, Sales, Support
        </title>
        <meta
          name="description"
          content="Live AI agents for your business: an AI Receptionist for clinics and hospitals, Prop AI WhatsApp chatbot for real estate, an AI Sales Agent that finds hot leads, and AI Customer Support."
        />
      </Helmet>

      <main className="overflow-hidden bg-white text-[#111111]">
        {/* HERO */}
        <section className="bg-white px-6 pb-16 pt-28 md:px-12 md:pb-24 md:pt-40">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-end gap-10 lg:grid-cols-[1.3fr_0.7fr]">
              <div>
                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-xs font-semibold text-red-600">
                  <Sparkles size={14} />
                  AI agents
                </div>

                <h1 className="max-w-5xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                  AI agents that
                  <br />
                  <span className="text-red-600">do the work</span>
                  <br />
                  your team can't.
                </h1>
              </div>

              <p className="max-w-md text-base leading-7 text-gray-500 md:text-lg lg:pb-3">
                Four agents, already live and working for real businesses. They
                book appointments, chase leads, and answer customers, on
                WhatsApp and beyond.
              </p>
            </div>

            {/* Jump cards */}
            <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {agents.map((agent) => {
                const Icon = agent.icon;
                return (
                  <a
                    key={agent.id}
                    href={`#${agent.id}`}
                    className="group flex flex-col justify-between rounded-3xl border border-gray-200 bg-white p-6 transition hover:border-red-600"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 transition group-hover:bg-red-600 group-hover:text-white">
                        <Icon size={22} />
                      </div>
                      <ArrowRight
                        size={18}
                        className="text-gray-300 transition group-hover:translate-x-1 group-hover:text-red-600"
                      />
                    </div>
                    <div className="mt-8">
                      <p className="text-lg font-semibold">{agent.name}</p>
                      <p className="mt-1 text-sm text-gray-500">
                        {agent.navLine}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* AGENTS */}
        {agents.map((agent, index) => (
          <AgentSection key={agent.id} agent={agent} index={index} />
        ))}

        {/* FINAL CTA */}
        <section className="bg-white px-6 py-24 md:px-12 md:py-36">
          <div className="mx-auto max-w-5xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-xs font-semibold text-red-600">
              <Zap size={14} />
              Not sure which agent fits?
            </span>

            <h2 className="mt-8 text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl md:text-6xl lg:text-7xl">
              Tell us about your business.
              <br />
              <span className="text-red-600">
                We'll suggest the right agent.
              </span>
            </h2>

            <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-gray-500">
              A quick conversation is enough to find out where AI can save you
              the most time.
            </p>

            <a
              href="/contact"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-black px-8 py-5 text-sm font-semibold text-white transition hover:bg-red-600"
            >
              Talk to our team
              <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
