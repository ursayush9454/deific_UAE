import { useEffect, type FormEvent, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowDownRight,
  ArrowRight,
  Bot,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Clock3,
  Headphones,
  MessageCircle,
  Search,
  Send,
  Settings2,
  Sparkles,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import { products, type Product } from "../static/productsData";
import { waLink } from "../static/siteConfig";

type ChatMessage = { from: "visitor" | "agent"; text: string };
type QuoteForm = {
  name: string;
  business: string;
  phone: string;
  email: string;
  product: string;
  channel: string;
  needs: string;
};

const categories = ["All products", "Healthcare", "Real estate", "Sales", "Support"];
const channels = ["Website chat", "WhatsApp", "Instagram / Facebook", "CRM integration"];

const demoIntro: Record<string, string> = {
  "ai-receptionist": "Hello! 👋 Welcome to City Care Clinic's sample assistant. I can help with appointments, clinic FAQs and patient enquiries. What can I help you with today?",
  "prop-ai": "Hi! 👋 I'm the Prop AI sample assistant. Tell me what kind of property you're looking for and your approximate budget, and I'll show you how a property lead conversation can work.",
  "ai-sales-agent": "Hey there! 👋 I'm a sample AI Sales Agent. I can qualify enquiries, understand what a prospect needs and help your team focus on the most promising leads.",
  "ai-customer-support": "Hi! 👋 Welcome to the Deific sample support bot. Ask me about delivery, returns, services or support handover to see a sample customer conversation.",
};

function getDemoReply(message: string, product: Product) {
  const text = message.toLowerCase();
  if (/price|pricing|cost|quote|plan|charge|aed|₹|budget/.test(text)) {
    return "Good question. The right setup depends on your conversation volume, channels and integrations. Deific can scope a plan around your needs—use “Get a tailored quote” to send the details to our team.";
  }
  if (/appointment|book|slot|doctor|clinic|schedule/.test(text)) {
    return product.slug === "ai-receptionist"
      ? "In a configured setup, I can collect the patient's preferred date and time, connect to the clinic's approved availability source and pass the request to the front desk. This playground uses sample data only; it doesn't book a real appointment."
      : "A configured agent can collect a preferred date and time, then route the request to your team or connected booking system. This is a sample conversation and doesn't create a real booking.";
  }
  if (/property|house|flat|villa|real estate|site visit|bhk/.test(text)) {
    return "A property agent can ask for the preferred area, property type, budget and timeline, then share relevant listings and help arrange a site visit. Your actual catalogue and booking rules would be connected during setup.";
  }
  if (/lead|sales|customer|qualif|follow.?up/.test(text)) {
    return "The agent can ask a few qualifying questions, capture consented contact details and pass a concise summary to your sales team or CRM. Your team decides the follow-up; integrations depend on the final setup.";
  }
  if (/return|refund|delivery|order|support|help/.test(text)) {
    return "A support bot can answer common questions from your approved help content, guide customers through basic steps and hand complex cases to a human. Your real policies and order system would be connected before launch.";
  }
  if (/feature|what can|how do|how does|integration|whatsapp|website/.test(text)) {
    return `${product.name} is designed for ${product.navLine.toLowerCase()}. Example capabilities include ${product.features.slice(0, 3).join(", ").toLowerCase()}. Available channels and integrations are confirmed during scoping.`;
  }
  return `Thanks for sharing that. A ${product.name} can be configured around this kind of enquiry. Try asking about pricing, features, appointments, leads or support—or send your use case to our team for a tailored recommendation.`;
}

function ProductIcon({ slug, className = "w-5 h-5" }: { slug: string; className?: string }) {
  if (slug === "ai-receptionist") return <Headphones className={className} />;
  if (slug === "prop-ai") return <Building2 className={className} />;
  if (slug === "ai-sales-agent") return <TrendingUp className={className} />;
  return <MessageCircle className={className} />;
}

function QuoteButton({ productName }: { productName: string }) {
  return (
    <a
      href={waLink(`Hi Deific Digital, I'm interested in ${productName}. Please share the setup options, inclusions and a tailored quote.`)}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white transition rounded-xl bg-dd-red hover:bg-dd-redink"
    >
      Get a tailored quote <ArrowRight className="w-4 h-4" />
    </a>
  );
}

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const requestedDemo = searchParams.get("demo");
  const initialDemo = products.some((product) => product.slug === requestedDemo)
    ? requestedDemo!
    : products[3]?.slug ?? products[0].slug;
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All products");
  const [activeDemo, setActiveDemo] = useState(initialDemo);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { from: "agent", text: demoIntro[initialDemo] ?? demoIntro[products[0].slug] },
  ]);
  const [dailyChats, setDailyChats] = useState(60);
  const [minutesEach, setMinutesEach] = useState(4);
  const [automationShare, setAutomationShare] = useState(60);
  const [quote, setQuote] = useState<QuoteForm>({
    name: "",
    business: "",
    phone: "",
    email: "",
    product: "",
    channel: "WhatsApp",
    needs: "",
  });

  const visibleProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    return products.filter((product) => {
      const categoryMatch = category === "All products" || product.tag.toLowerCase() === category.toLowerCase();
      const searchMatch = !term || [product.name, product.tag, product.description, ...product.features, ...product.madeFor]
        .join(" ")
        .toLowerCase()
        .includes(term);
      return categoryMatch && searchMatch;
    });
  }, [search, category]);

  const selectedDemo = products.find((product) => product.slug === activeDemo) ?? products[0];
  const monthlyHours = Math.round((dailyChats * minutesEach * 26 * (automationShare / 100)) / 60);

  useEffect(() => {
    if (!requestedDemo || !products.some((product) => product.slug === requestedDemo)) return;
    const product = products.find((item) => item.slug === requestedDemo)!;
    setActiveDemo(product.slug);
    setChatMessages([{ from: "agent", text: demoIntro[product.slug] ?? `Hi! I'm the ${product.name} sample assistant. Ask me how it works.` }]);
    requestAnimationFrame(() => {
      document.getElementById("live-demo")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [requestedDemo]);

  const changeDemo = (slug: string) => {
    setActiveDemo(slug);
    const product = products.find((item) => item.slug === slug) ?? products[0];
    setChatMessages([{ from: "agent", text: demoIntro[product.slug] }]);
    setChatInput("");
  };

  const sendMessage = (value = chatInput) => {
    const cleaned = value.trim();
    if (!cleaned) return;
    const reply = getDemoReply(cleaned, selectedDemo);
    setChatMessages((current) => [...current, { from: "visitor", text: cleaned }, { from: "agent", text: reply }]);
    setChatInput("");
  };

  const submitQuote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = [
      "Hi Deific Digital, I'd like a chatbot quote.",
      `Name: ${quote.name}`,
      `Business: ${quote.business}`,
      `Phone / WhatsApp: ${quote.phone}`,
      quote.email ? `Email: ${quote.email}` : "",
      `Product: ${quote.product || "Please recommend the best fit"}`,
      `Preferred channel: ${quote.channel}`,
      quote.needs ? `Requirements: ${quote.needs}` : "",
      "Please share the recommended setup, inclusions and pricing.",
    ].filter(Boolean).join("\n");
    window.open(waLink(message), "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Helmet>
        <title>AI Chatbot Store & Live Demos | Deific Digital</title>
        <meta name="description" content="Explore Deific Digital's AI chatbot products, test interactive sample conversations, estimate potential time savings and request a tailored setup quote." />
        <link rel="canonical" href="https://deificdigital.com/products" />
      </Helmet>

      {/* Hero */}
      <section className="relative px-6 py-16 overflow-hidden text-white isolate bg-dd-navy md:px-12 md:py-24">
        <div aria-hidden="true" className="absolute rounded-full pointer-events-none -right-20 -top-24 h-80 w-80 bg-dd-red/20 blur-3xl" />
        <div aria-hidden="true" className="absolute bottom-0 w-64 h-64 rounded-full pointer-events-none left-1/3 bg-blue-500/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[1.12fr_.88fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-2 text-xs font-semibold uppercase tracking-[.16em] text-white/75">
              <Sparkles className="w-4 h-4 text-red-300" /> Deific AI product studio
            </div>
            <h1 className="mt-6 max-w-3xl font-brand text-4xl font-semibold leading-[1.08] md:text-6xl">
              Your next AI employee is <span className="text-red-300">one demo away.</span>
            </h1>
            <p className="max-w-2xl mt-5 text-lg leading-8 text-white/70">
              Explore ready-to-configure AI agents for sales, support, property and appointments. Test a sample conversation, then get a setup tailored to your business.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a href="#live-demo" className="inline-flex items-center gap-2 rounded-xl bg-dd-red px-5 py-3.5 font-semibold text-white transition hover:bg-dd-redink">
                Try the live playground <ArrowDownRight className="w-4 h-4" />
              </a>
              <a href="#configure" className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3.5 font-semibold text-white transition hover:bg-white/10">
                Configure my chatbot <Settings2 className="w-4 h-4" />
              </a>
            </div>
            <div className="flex flex-wrap mt-8 text-sm gap-x-6 gap-y-3 text-white/60">
              {["Business-specific workflows", "WhatsApp & website options", "Custom integrations"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-red-300" />{item}</span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[490px]">
            <div className="absolute inset-6 rounded-[2rem] bg-red-500/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[1.8rem] border border-white/15 bg-[#101a32]/90 p-5 shadow-2xl backdrop-blur md:p-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="grid text-red-200 h-11 w-11 place-items-center rounded-2xl bg-red-500/15"><Bot className="w-6 h-6" /></div>
                  <div><p className="font-semibold">Deific AI assistant</p><p className="mt-0.5 text-xs text-white/45">Product preview</p></div>
                </div>
                <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-200">Interactive</span>
              </div>
              <div className="mt-5 space-y-3">
                <div className="max-w-[88%] rounded-2xl rounded-tl-sm border border-white/10 bg-white/[0.06] p-3.5 text-sm leading-6 text-white/80">Hey! I can help you find the right AI assistant for your business. What would you like to automate?</div>
                <div className="ml-auto max-w-[82%] rounded-2xl rounded-tr-sm bg-red-600 p-3.5 text-sm leading-6 text-white">I want to reply to every lead faster.</div>
                <div className="max-w-[91%] rounded-2xl rounded-tl-sm border border-white/10 bg-white/[0.06] p-3.5 text-sm leading-6 text-white/80">A sales agent could qualify enquiries and route promising leads to your team. Try a demo below to explore a sample conversation.</div>
              </div>
              <a href="#live-demo" className="mt-5 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] p-3.5 text-sm text-white/70 transition hover:border-red-300/40 hover:text-white">
                Open the playground <ArrowRight className="w-4 h-4" />
              </a>
              <p className="mt-3 text-[11px] leading-5 text-white/40">Preview conversation only. Production AI and system integrations are scoped separately.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product catalog */}
      <section className="px-6 py-16 bg-white md:px-12 md:py-20" id="catalogue">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.18em] text-dd-red">Choose your AI teammate</p>
              <h2 className="mt-3 text-3xl font-semibold font-brand text-dd-ink md:text-4xl">Find the right bot for your business</h2>
              <p className="max-w-2xl mt-3 text-dd-slate">Start with a ready-made use case. We’ll scope channels, integrations and custom behaviour with you.</p>
            </div>
            <div className="relative w-full md:max-w-[300px]">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-dd-slate/70" />
              <input aria-label="Search chatbot products" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products or use cases" className="w-full py-3 pl-10 pr-4 text-sm transition bg-white border outline-none rounded-xl border-dd-line text-dd-ink focus:border-dd-red" />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-7" role="group" aria-label="Filter products by category">
            {categories.map((item) => (
              <button key={item} type="button" onClick={() => setCategory(item)} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${category === item ? "bg-dd-ink text-white" : "border border-dd-line bg-white text-dd-slate hover:border-dd-ink/30 hover:text-dd-ink"}`}>
                {item}
              </button>
            ))}
          </div>

          {visibleProducts.length ? (
            <div className="grid gap-5 mt-8 md:grid-cols-2 xl:grid-cols-4">
              {visibleProducts.map((product) => (
                <article key={product.slug} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-dd-line bg-white transition duration-300 hover:-translate-y-1 hover:border-dd-red/40 hover:shadow-[0_20px_50px_rgba(17,26,51,.10)]">
                  <Link to={`/products/${product.slug}`} className="relative block overflow-hidden h-44 bg-dd-paper">
                    <img src={product.image} alt={product.name} loading="lazy" className="object-contain w-full h-full transition duration-500 group-hover:scale-105" />
                    <span className="absolute left-3 top-3 rounded-full border border-white/60 bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-dd-ink backdrop-blur">{product.tag}</span>
                  </Link>
                  <div className="flex flex-col flex-1 p-5">
                    <div className="flex items-start gap-3">
                      <span className="grid w-10 h-10 shrink-0 place-items-center rounded-xl bg-red-50 text-dd-red"><ProductIcon slug={product.slug} /></span>
                      <div><h3 className="text-xl font-semibold font-brand text-dd-ink">{product.name}</h3><p className="mt-1 text-xs leading-5 text-dd-slate">{product.navLine}</p></div>
                    </div>
                    <p className="flex-1 mt-4 text-sm leading-6 text-dd-slate">{product.description}</p>
                    <ul className="mt-4 space-y-2">
                      {product.features.slice(0, 3).map((feature) => <li key={feature} className="flex items-start gap-2 text-xs leading-5 text-dd-ink/80"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-dd-red" />{feature}</li>)}
                    </ul>
                    <div className="grid gap-2 mt-5">
                      <button type="button" onClick={() => { changeDemo(product.slug); document.getElementById("live-demo")?.scrollIntoView({ behavior: "smooth" }); }} className="inline-flex items-center justify-center gap-2 rounded-xl border border-dd-line px-3 py-2.5 text-sm font-semibold text-dd-ink transition hover:border-dd-ink/30 hover:bg-dd-paper">
                        <MessageCircle className="w-4 h-4" /> Try sample demo
                      </button>
                      <QuoteButton productName={product.name} />
                    </div>
                    <Link to={`/products/${product.slug}`} className="inline-flex items-center justify-center gap-1 mt-4 text-xs font-semibold text-dd-slate hover:text-dd-red">Product details <ArrowRight className="h-3.5 w-3.5" /></Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="px-5 py-12 mt-8 text-center border border-dashed rounded-2xl border-dd-line"><CircleHelp className="w-8 h-8 mx-auto text-dd-slate/50" /><p className="mt-3 font-semibold text-dd-ink">No matching products found</p><p className="mt-1 text-sm text-dd-slate">Try a different search or clear the category filter.</p><button type="button" onClick={() => { setSearch(""); setCategory("All products"); }} className="mt-4 text-sm font-semibold text-dd-red">Clear filters</button></div>
          )}
        </div>
      </section>

      {/* Interactive demo */}
      <section id="live-demo" className="px-6 py-16 scroll-mt-20 bg-dd-paper md:px-12 md:py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-dd-red">Test drive</p>
            <h2 className="mt-3 text-3xl font-semibold font-brand text-dd-ink md:text-4xl">Try a chatbot before you buy</h2>
            <p className="mt-3 text-dd-slate">Switch between product examples and ask a question. This interactive playground uses sample responses to demonstrate the flow; it is not connected to a production AI model or customer data.</p>
          </div>

          <div className="mt-9 grid overflow-hidden rounded-3xl border border-dd-line bg-white shadow-[0_24px_70px_rgba(17,26,51,.09)] lg:grid-cols-[.78fr_1.22fr]">
            <aside className="border-b border-dd-line bg-[#fafafa] p-5 md:p-7 lg:border-b-0 lg:border-r">
              <div className="flex items-center gap-2 text-sm font-semibold text-dd-ink"><Settings2 className="w-4 h-4 text-dd-red" /> Select a demo</div>
              <div className="mt-4 space-y-2">
                {products.map((product) => (
                  <button key={product.slug} type="button" onClick={() => changeDemo(product.slug)} className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${activeDemo === product.slug ? "border-dd-red/50 bg-white shadow-sm" : "border-transparent bg-transparent hover:border-dd-line hover:bg-white"}`}>
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${activeDemo === product.slug ? "bg-red-50 text-dd-red" : "bg-white text-dd-slate"}`}><ProductIcon slug={product.slug} /></span>
                    <span className="flex-1 min-w-0"><span className="block text-sm font-semibold text-dd-ink">{product.name}</span><span className="mt-0.5 block truncate text-xs text-dd-slate">{product.tag}</span></span>
                    {activeDemo === product.slug && <span className="w-2 h-2 rounded-full bg-dd-red" />}
                  </button>
                ))}
              </div>
              <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-xs leading-5 text-amber-900"><strong>Sample mode:</strong> replies are pre-written examples. Real integrations, data access and automated actions are set up after project scoping.</div>
              <div className="mt-5"><QuoteButton productName={selectedDemo.name} /></div>
            </aside>

            <div className="flex min-h-[510px] flex-col">
              <div className="flex items-center justify-between px-5 py-4 border-b border-dd-line md:px-6">
                <div className="flex items-center gap-3"><div className="grid w-10 h-10 text-white place-items-center rounded-xl bg-dd-navy"><Bot className="w-5 h-5" /></div><div><h3 className="font-semibold text-dd-ink">{selectedDemo.name}</h3><p className="mt-0.5 text-xs text-dd-slate">Interactive sample conversation</p></div></div>
                <button type="button" onClick={() => changeDemo(activeDemo)} className="p-2 transition rounded-lg text-dd-slate hover:bg-dd-paper hover:text-dd-ink" aria-label="Reset sample conversation"><X className="w-4 h-4" /></button>
              </div>
              <div className="flex-1 space-y-4 overflow-y-auto bg-[#f8f9fb] p-4 md:p-6" aria-live="polite">
                <div className="mb-2 text-center text-[10px] font-semibold uppercase tracking-[.16em] text-dd-slate/60">Sample conversation · no real actions</div>
                {chatMessages.map((message, index) => (
                  <div key={`${index}-${message.from}`} className={`flex ${message.from === "visitor" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[88%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-6 ${message.from === "visitor" ? "rounded-br-sm bg-dd-navy text-white" : "rounded-bl-sm border border-dd-line bg-white text-dd-ink shadow-sm"}`}>{message.text}</div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-white border-t border-dd-line md:p-5">
                <p className="mb-2 text-xs font-medium text-dd-slate">Try asking</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {["What can you do?", "How does pricing work?", "Can you qualify leads?"].map((prompt) => <button key={prompt} type="button" onClick={() => sendMessage(prompt)} className="rounded-full border border-dd-line px-3 py-1.5 text-xs text-dd-slate transition hover:border-dd-red/40 hover:text-dd-red">{prompt}</button>)}
                </div>
                <form onSubmit={(event) => { event.preventDefault(); sendMessage(); }} className="flex gap-2">
                  <input value={chatInput} onChange={(event) => setChatInput(event.target.value)} aria-label="Message the sample chatbot" placeholder="Type your question..." className="flex-1 min-w-0 px-4 py-3 text-sm transition border outline-none rounded-xl border-dd-line text-dd-ink focus:border-dd-red" />
                  <button type="submit" aria-label="Send message" className="grid text-white transition h-11 w-11 shrink-0 place-items-center rounded-xl bg-dd-red hover:bg-dd-redink"><Send className="w-4 h-4" /></button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI calculator */}
      <section className="px-6 py-16 bg-white md:px-12 md:py-20">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-dd-red">Value estimator</p>
            <h2 className="mt-3 text-3xl font-semibold font-brand text-dd-ink md:text-4xl">Estimate the time your team could get back</h2>
            <p className="mt-4 leading-7 text-dd-slate">Adjust the numbers to model a typical month. This is an illustrative estimate based on your inputs—not a guaranteed saving or a promise that every query can be automated.</p>
            <div className="flex items-start gap-3 p-4 mt-6 rounded-xl bg-dd-paper"><Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-dd-red" /><p className="text-sm leading-6 text-dd-slate">Use your own chat volume and handling time. During a consultation, we can identify which conversations should be automated and which should go to a person.</p></div>
          </div>
          <div className="rounded-3xl border border-dd-line bg-white p-5 shadow-[0_18px_55px_rgba(17,26,51,.08)] md:p-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block"><span className="flex items-center justify-between text-sm font-semibold text-dd-ink">Customer chats per day <span className="text-dd-red">{dailyChats}</span></span><input type="range" min="10" max="500" step="10" value={dailyChats} onChange={(event) => setDailyChats(Number(event.target.value))} className="w-full mt-4 accent-red-600" /><span className="mt-1 flex justify-between text-[11px] text-dd-slate/70"><span>10</span><span>500</span></span></label>
              <label className="block"><span className="flex items-center justify-between text-sm font-semibold text-dd-ink">Minutes per chat <span className="text-dd-red">{minutesEach} min</span></span><input type="range" min="1" max="15" value={minutesEach} onChange={(event) => setMinutesEach(Number(event.target.value))} className="w-full mt-4 accent-red-600" /><span className="mt-1 flex justify-between text-[11px] text-dd-slate/70"><span>1 min</span><span>15 min</span></span></label>
              <label className="block sm:col-span-2"><span className="flex items-center justify-between text-sm font-semibold text-dd-ink">Chats you expect automation to handle <span className="text-dd-red">{automationShare}%</span></span><input type="range" min="10" max="90" step="5" value={automationShare} onChange={(event) => setAutomationShare(Number(event.target.value))} className="w-full mt-4 accent-red-600" /><span className="mt-1 flex justify-between text-[11px] text-dd-slate/70"><span>10%</span><span>90%</span></span></label>
            </div>
            <div className="p-5 text-white mt-7 rounded-2xl bg-dd-navy md:p-6">
              <div className="flex items-start justify-between gap-4"><div><p className="text-sm text-white/60">Illustrative monthly time capacity</p><p className="mt-2 text-4xl font-semibold font-brand md:text-5xl">{monthlyHours.toLocaleString()} <span className="text-xl text-white/70">hours</span></p><p className="mt-2 text-xs text-white/55">Based on 26 working days and your automation assumption</p></div><div className="grid w-12 h-12 text-red-200 shrink-0 place-items-center rounded-2xl bg-white/10"><Zap className="w-6 h-6" /></div></div>
              <div className="pt-4 mt-5 border-t border-white/15"><QuoteButton productName="an AI chatbot solution based on my time-saving estimate" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* Configurator and lead handoff */}
      <section id="configure" className="px-6 py-16 scroll-mt-20 bg-dd-paper md:px-12 md:py-20">
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div className="pt-1">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-dd-red">Your use case</p>
            <h2 className="mt-3 text-3xl font-semibold font-brand text-dd-ink md:text-4xl">Tell us what you want your chatbot to do</h2>
            <p className="mt-4 leading-7 text-dd-slate">Share a few details and the team can recommend a suitable product, channel and next step. No fixed price is shown here because scope and integrations vary by business.</p>
            <div className="space-y-4 mt-7">
              {[{ title: "1. Tell us about the business", desc: "Industry, daily enquiries and customer journey." }, { title: "2. Choose the main channel", desc: "Website chat, WhatsApp or a connected workflow." }, { title: "3. Get a tailored follow-up", desc: "Your form opens WhatsApp with the details pre-filled." }].map((item) => <div key={item.title} className="flex gap-3"><span className="grid bg-white border h-9 w-9 shrink-0 place-items-center rounded-xl border-dd-line text-dd-red"><Check className="w-4 h-4" /></span><div><p className="font-semibold text-dd-ink">{item.title}</p><p className="mt-1 text-sm leading-6 text-dd-slate">{item.desc}</p></div></div>)}
            </div>
            <div className="flex items-center gap-3 text-sm mt-7 text-dd-slate"><MessageCircle className="w-5 h-5 text-dd-red" /> Prefer a direct conversation? <a className="font-semibold text-dd-red hover:underline" href={waLink("Hi Deific Digital, I'd like help choosing an AI chatbot for my business.")} target="_blank" rel="noreferrer">Chat on WhatsApp</a></div>
          </div>

          <form onSubmit={submitQuote} className="rounded-3xl border border-dd-line bg-white p-5 shadow-[0_20px_60px_rgba(17,26,51,.08)] md:p-8">
            <div className="flex items-center justify-between gap-4 pb-5 mb-6 border-b border-dd-line"><div><h3 className="text-2xl font-semibold font-brand text-dd-ink">Build my chatbot brief</h3><p className="mt-1 text-sm text-dd-slate">Required fields are marked *</p></div><div className="grid w-12 h-12 place-items-center rounded-2xl bg-red-50 text-dd-red"><Settings2 className="w-6 h-6" /></div></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block"><span className="mb-1.5 block text-sm font-semibold text-dd-ink">Your name *</span><input required value={quote.name} onChange={(event) => setQuote({ ...quote, name: event.target.value })} placeholder="e.g. Alex Khan" className="w-full rounded-xl border border-dd-line px-3.5 py-3 text-sm outline-none focus:border-dd-red" /></label>
              <label className="block"><span className="mb-1.5 block text-sm font-semibold text-dd-ink">Business name *</span><input required value={quote.business} onChange={(event) => setQuote({ ...quote, business: event.target.value })} placeholder="Company or brand" className="w-full rounded-xl border border-dd-line px-3.5 py-3 text-sm outline-none focus:border-dd-red" /></label>
              <label className="block"><span className="mb-1.5 block text-sm font-semibold text-dd-ink">Phone / WhatsApp *</span><input required type="tel" value={quote.phone} onChange={(event) => setQuote({ ...quote, phone: event.target.value })} placeholder="Country code + number" className="w-full rounded-xl border border-dd-line px-3.5 py-3 text-sm outline-none focus:border-dd-red" /></label>
              <label className="block"><span className="mb-1.5 block text-sm font-semibold text-dd-ink">Work email</span><input type="email" value={quote.email} onChange={(event) => setQuote({ ...quote, email: event.target.value })} placeholder="you@company.com" className="w-full rounded-xl border border-dd-line px-3.5 py-3 text-sm outline-none focus:border-dd-red" /></label>
              <label className="block"><span className="mb-1.5 block text-sm font-semibold text-dd-ink">Chatbot product *</span><span className="relative block"><select required value={quote.product} onChange={(event) => setQuote({ ...quote, product: event.target.value })} className="w-full appearance-none rounded-xl border border-dd-line bg-white px-3.5 py-3 pr-9 text-sm outline-none focus:border-dd-red"><option value="">Help me choose</option>{products.map((product) => <option key={product.slug} value={product.name}>{product.name}</option>)}<option value="Custom AI chatbot">Custom AI chatbot</option></select><ChevronDown className="absolute w-4 h-4 -translate-y-1/2 pointer-events-none right-3 top-1/2 text-dd-slate" /></span></label>
              <label className="block"><span className="mb-1.5 block text-sm font-semibold text-dd-ink">Preferred channel *</span><span className="relative block"><select required value={quote.channel} onChange={(event) => setQuote({ ...quote, channel: event.target.value })} className="w-full appearance-none rounded-xl border border-dd-line bg-white px-3.5 py-3 pr-9 text-sm outline-none focus:border-dd-red">{channels.map((channel) => <option key={channel}>{channel}</option>)}</select><ChevronDown className="absolute w-4 h-4 -translate-y-1/2 pointer-events-none right-3 top-1/2 text-dd-slate" /></span></label>
              <label className="block sm:col-span-2"><span className="mb-1.5 block text-sm font-semibold text-dd-ink">What should the chatbot handle?</span><textarea rows={4} value={quote.needs} onChange={(event) => setQuote({ ...quote, needs: event.target.value })} placeholder="E.g. answer FAQs, qualify leads, book appointments, connect to my CRM..." className="w-full resize-y rounded-xl border border-dd-line px-3.5 py-3 text-sm leading-6 outline-none focus:border-dd-red" /></label>
            </div>
            <button type="submit" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-dd-red px-5 py-3.5 font-semibold text-white transition hover:bg-dd-redink sm:w-auto">Send my brief on WhatsApp <ArrowRight className="w-4 h-4" /></button>
            <p className="mt-3 text-xs leading-5 text-dd-slate/75">Submitting opens WhatsApp with your message pre-filled. It does not save the details to a website database or send them automatically until you press Send in WhatsApp.</p>
          </form>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-6 text-white bg-dd-navy py-14 md:px-12 md:py-16">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div><p className="text-xs font-bold uppercase tracking-[.18em] text-red-300">Ready when you are</p><h2 className="mt-2 text-3xl font-semibold font-brand md:text-4xl">Turn repetitive chats into a better customer experience.</h2><p className="max-w-2xl mt-3 text-white/65">Talk through your workflow with Deific and find a practical starting point.</p></div>
          <div className="flex flex-wrap gap-3 shrink-0"><a href={waLink("Hi Deific Digital, I'd like to discuss buying an AI chatbot for my business.")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-dd-red px-5 py-3.5 font-semibold text-white hover:bg-dd-redink">Talk to the team <MessageCircle className="w-4 h-4" /></a><Link to="/contact" className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3.5 font-semibold text-white hover:bg-white/10">Contact page <ArrowRight className="w-4 h-4" /></Link></div>
        </div>
      </section>
    </>
  );
}
