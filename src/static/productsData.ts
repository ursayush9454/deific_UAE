import receptionistImg from "../assets/medcare.webp";
import propAiImg from "../assets/propai.webp";
import salesAgentImg from "../assets/salesagent.webp";
import supportImg from "../assets/customer.webp";

export type Product = {
  slug: string;
  name: string;
  tag: string;
  navLine: string;
  image: string;
  headline: string;
  description: string;
  problem: string;
  madeFor: string[];
  steps: string[];
  features: string[];
  cta: string;
  /** internal route or external URL for the main button */
  ctaTo: string;
};

export const products: Product[] = [
  {
    slug: "ai-receptionist",
    name: "AI Receptionist",
    tag: "Healthcare",
    navLine: "For clinics, polyclinics and hospitals",
    image: receptionistImg,
    headline: "A front desk that books appointments on WhatsApp.",
    description: "Patients message on WhatsApp and the agent books the appointment. No queues, no busy phone lines.",
    problem: "Front desk staff spend the day noting down names and slots.",
    madeFor: ["Clinics", "Polyclinics", "Hospitals"],
    steps: ["Patient messages on WhatsApp", "Agent asks about the problem", "Shows available doctors and free OPD slots", "Books the appointment", "Doctor sees the full slip and past history"],
    features: ["Books appointments 24/7", "Live doctor and OPD slots", "Complete patient slip", "Previous visit history"],
    cta: "Get AI Receptionist",
    ctaTo: "https://medibuddy-dashboard.onrender.com/",
  },
  {
    slug: "prop-ai",
    name: "Prop AI",
    tag: "Real estate",
    navLine: "Complete Site Booking System",
    image: propAiImg,
    headline: "Every lead gets a reply in seconds, and a temperature.",
    description: "A WhatsApp chatbot that talks to every lead and shows you who is actually serious.",
    problem: "Leads go cold and nobody knows who to call first.",
    madeFor: ["Builders", "Property dealers", "Real estate agencies"],
    steps: ["Messages every new or uploaded lead", "Asks property type and budget", "Shares matching property details", "Books the site visit", "Marks each lead hot, warm or cold"],
    features: ["Auto-messages every lead", "Matching property details", "Site visit booking", "Hot, warm, cold dashboard"],
    cta: "Open Prop AI",
    ctaTo: "/propai",
  },
  {
    slug: "ai-sales-agent",
    name: "AI Sales Agent",
    tag: "Sales",
    navLine: "For sales teams and growing businesses",
    image: salesAgentImg,
    headline: "It finds the leads and hands you only the hot ones.",
    description: "Finding and chasing leads is slow work. The agent does it and delivers leads that are ready to close.",
    problem: "Your team spends more time searching than selling.",
    madeFor: ["Sales teams", "Agencies", "Founders who sell"],
    steps: ["Finds leads for your business", "Talks to each lead", "Measures how interested they are", "Delivers the hot leads"],
    features: ["Finds leads for you", "Talks to every lead", "Scores how hot each lead is", "Saves hours of manual work"],
    cta: "Get AI Sales Agent",
    ctaTo: "/contact",
  },
  {
    slug: "ai-customer-support",
    name: "AI Customer Support",
    tag: "Support",
    navLine: "For any business with customer queries",
    image: supportImg,
    headline: "Customer questions answered instantly.",
    description: "The agent solves repeat queries right away, so your team can focus on the cases that need a human.",
    problem: "Your team answers the same questions all day.",
    madeFor: ["Ecommerce", "Service businesses", "Any support team"],
    steps: ["Customer asks a question", "Agent answers right away", "Complex cases go to your team"],
    features: ["Instant replies, 24/7", "Solves common queries", "Less load on your team", "Faster resolutions"],
    cta: "Get AI Customer Support",
    ctaTo: "/contact",
  },
];

export const companyLinks = [
  { to: "/about", label: "About Us", desc: "Who we are and how we work" },
  { to: "/team", label: "Our Team", desc: "The people building your product" },
  { to: "/portfolio", label: "Portfolio", desc: "Projects we have delivered" },
  { to: "/technologies", label: "Technologies", desc: "The stack we build with" },
  { to: "/careers", label: "Careers", desc: "Open roles at Deific Digital" },
  { to: "/blog", label: "Blog", desc: "Guides and company news" },
];
