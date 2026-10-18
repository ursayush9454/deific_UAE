
export type ServiceItem = {
  label: string;
  to: string;
};
 
export type ServiceColumn = {
  title: string;
  items?: ServiceItem[];       // list wale column ke liye
  description?: string;        // description wale column ke liye
  to?: string;                 // description wale column ka link
};
 
export const servicesMenu: ServiceColumn[] = [
  {
    title: "AI Agents & Automation",
    items: [
      { label: "AI Agents (Receptionist, Care, Sales)", to: "/ai-agents" },
      { label: "Business Automation Flows", to: "/services/automation" },
      { label: "WhatsApp AI Agent", to: "/services/chatbots-virtual-assistants" },
      { label: "AI Integration Services", to: "/services/ai-integration-service" },
      { label: "Generative AI Solutions", to: "/services/generative-ai-solution" },
    ],
  },
  {
    title: "Industry Automation",
    items: [
      { label: "Real Estate Sales Automation", to: "/propai" },
      { label: "Hospital Management AI", to: "/#industries" },
      { label: "CA Firm Automation", to: "/#industries" },
      { label: "Car Dealer Automation", to: "/#industries" },
      { label: "Smart City Solutions", to: "/contact" },
    ],
  },
  {
    title: "Development",
    items: [
      { label: "Web Application Development", to: "/services/mvp-development" },
      { label: "Android App Development", to: "/services/android-app-development" },
      { label: "iOS App Development", to: "/services/ios-app-development" },
      { label: "Cross Platform Apps", to: "/services/cross-platform-app-development" },
      { label: "Game Development", to: "/contact" },
    ],
  },
  {
    title: "Digital Marketing",
    items: [
      { label: "SEO (Search Engine Optimization)", to: "/services/search-engine-optimization" },
      { label: "Social Media Marketing", to: "/services/social-media-marketing" },
      { label: "Meta Ads", to: "/services/meta-ads" },
      { label: "GMB Optimization", to: "/services/google-my-business-optimization" },
    ],
  },
  {
    title: "Startups",
    items: [
      { label: "MVP Development", to: "/services/mvp-development" },
      { label: "Startup Idea Validation", to: "/services/startup-idea-validation" },
      { label: "Hybrid App Development", to: "/services/hybrid-app-development" },
    ],
  },
];
