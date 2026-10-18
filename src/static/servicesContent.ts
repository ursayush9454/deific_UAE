
import {
  Globe,
  Briefcase,
  Users,
  type LucideIcon,
} from "lucide-react";

import android from "../assets/android.webp";
import ios from "../assets/ios-development.webp";
import hybrid from "../assets/hybrid.webp";
import automation from "../assets/automation.webp"
import chatbot from "../assets/chatbot.webp";
import genAi from "../assets/gen-ai.webp";
import gmb from "../assets/gmb.webp";
import meta from "../assets/meta-ads.webp";
import socialMedia from "../assets/social-media.webp";
import startup from "../assets/startup-idea.webp";
import cross from "../assets/cross-development.webp";
import mvp from "../assets/mvp.webp";


// ─── Types ─────────────────────────────────────────────────────────────

export interface StatItem {
  icon: LucideIcon;
  value: string;
  label: string;
}

export interface ProcessStep {
  icon: string;
  title: string;
  desc: string;
}

export interface ProjectItem {
  title: string;
  img: string;
  desc: string;
}

export interface ServiceContent {
  // Hero section
  badge: string;
  title: string;
  highlight: string; // gradient highlighted part of the heading
  tagline: string;
  description: string;
  heroImage: string;

  // Stats
  stats: StatItem[];

  // Overview section
  overviewTitle: string;
  overviewParagraphs: string[];
  overviewBadges: string[];

  // Why choose us
  whyChooseTitle: string;
  whyChooseDesc: string;
  whyChooseTags: string[];

  // Process steps ("How we develop")
  processHeading: string;
  processSteps: ProcessStep[];

  // Services list
  servicesHeading: string;
  servicesIntro: string;
  servicesList: string[];

  // Process phases
  processPhases: string[];

  // Projects
  projects: ProjectItem[];
}

// ─── Content per slug ────────────────────────────────────────────────

export const servicesContent: Record<string, ServiceContent> = {
  "android-app-development": {
    badge: "Android App Development",
    title: "Ranked among top 10 best",
    highlight: "Android App Development Company",
    tagline: "Build powerful, scalable Android apps",
    description:
      "For individuals, startups, enterprises and leading organizations. We offer android app development services for smart phones, tablets, wearables.",
    heroImage: android,

    stats: [
      { icon: Globe, value: "10+", label: "Industries" },
      { icon: Briefcase, value: "450", label: "Products Built" },
      { icon: Users, value: "70+", label: "Strong Team" },
    ],

    overviewTitle: "Deific Digital",
    overviewParagraphs: [
      "\u201CEvery success is built on the ability to do better than good enough\u201D \u2013 these words hold true in the world of Android app development. As a leading Android app development company, Deific Digital has consistently delivered high-quality, innovative mobile applications that stand out in the competitive market.",
      "With a team of proficient developers and designers, we have built over 400 apps that are not only technically robust but also visually appealing. Our apps are listed on Google Play and have been widely appreciated by users and clients alike. We cater to startups, medium and large enterprises, offering end-to-end Android development services.",
    ],
    overviewBadges: [
      "Google Play Certified",
      "7+ Years Experience",
      "400+ Apps Delivered",
    ],

    whyChooseTitle: "Why Choose Us?",
    whyChooseDesc:
      "We are a leader among the Android App development companies for more than 7 years and have built over 400 apps following a test driven approach. \u201COur work is done when it serves your purpose\u201D so we dedicate full heartedly to deliver our best when it comes to android app development services. Our standardized tools hand held by our expert android app developers satisfies the client by developing the best android apps.",
    whyChooseTags: [
      "Hybrid app development",
      "Ionic app development",
      "Native app development",
      "On demand app development",
      "Cross platform app development",
    ],

    processHeading: "Develop?",
    processSteps: [
      {
        icon: "\uD83D\uDCA1",
        title: "Understanding what you want",
        desc: "\u2018Customer is the King\u2019 and to satisfy the king is our ultimate goal. Hence, we listen, understand and analyze your professional need, purpose and accomplishments from an Android app.",
      },
      {
        icon: "\uD83C\uDFA8",
        title: "Design Your App",
        desc: "With an in-depth primer of the best techniques and creative app design, we provide a proposal to the client that best ensembles their professional goals.",
      },
      {
        icon: "\uD83D\uDCF1",
        title: "Prototype the App",
        desc: "With an unremitting vision to grow, we prototype our own Apps and upgrade the same for an even better result. We account functionality on board after client\u2019s feedback prior the final production.",
      },
      {
        icon: "\uD83D\uDCBB",
        title: "Developing code",
        desc: "We rely on best Android coding practices in the industry that stupefies over other Android app development companies in the same. Some of our successful applications include Angular Js, Node Js, Django and React, etc.",
      },
      {
        icon: "\uD83E\uDDEA",
        title: "Testing the App",
        desc: "In the course of developing apps for Android, we follow a systematic App testing life cycle. We endure all the steps which include user requirement analysis, test planning, test analysis, test design, test execution and bug reporting, etc.",
      },
      {
        icon: "\uD83D\uDE80",
        title: "Ready to launch",
        desc: "After performing all the development procedures, we launch our App legitimately in the market. Being a committed Android App development firm, we also provide support, maintenance and after sale services as per the market demand.",
      },
    ],

    servicesHeading: "Android Mobile App Development",
    servicesIntro:
      "Your search of leading the Android App Development Company may get a halt at Deific Digital. Demand of mobile application is raging in almost all the businesses today and so we do, to design extensively innovative and gratifying applications. Our Android application development services encompass:",
    servicesList: [
      "Native android App development",
      "Mobile game development",
      "Wearables",
      "Cross platform",
      "Android Specific UX/UI Design",
      "Android app test automation",
      "App support, maintenance and optimization and much more",
    ],

    processPhases: [
      "Mobile App Strategy",
      "Mobile App design",
      "Mobile App prototype",
      "Mobile App Architecture",
      "Mobile App development",
      "Mobile App testing",
      "Mobile App delivery and launch",
      "Mobile App support and maintenance",
      "Mobile App performance and monitoring",
    ],

    projects: [
      {
        title: "MySwaasth: Personal Health Partner",
        img: "https://picsum.photos/seed/health/400/250",
        desc: "Health & Wellness",
      },
      {
        title: "Pelotea: Football Made Social",
        img: "https://picsum.photos/seed/football/400/250",
        desc: "Sports Social Network",
      },
      {
        title: "Agro: Dignifying Agriculture",
        img: "https://picsum.photos/seed/agriculture/400/250",
        desc: "Agri-Tech",
      },
    ],
  },

 
"ios-app-development": {
    badge: "iOS App Development",
    title: "Ranked among top 10 best",
    highlight: "iOS App Development Company",
    tagline: "Native iOS apps that deliver premium user experiences",
    description:
      "We build high-performance, native iOS applications using Swift and UIKit/SwiftUI — designed to leverage the full power of Apple's ecosystem, from iPhones to iPads and Apple Watch.",
    heroImage: ios,

    stats: [
      { icon: Globe, value: "10+", label: "Industries" },
      { icon: Briefcase, value: "120", label: "iOS Apps Built" },
      { icon: Users, value: "70+", label: "Strong Team" },
    ],

    overviewTitle: "Deific Digital",
    overviewParagraphs: [
      "“Every success is built on the ability to do better than good enough” – these words hold true in the world of iOS app development. As a leading iOS app development company, Deific Digital has consistently delivered high-quality, native iOS applications that stand out in the competitive App Store market.",
      "With a team of proficient Swift developers and UI/UX designers, we have built apps that are not only technically robust but also provide seamless, intuitive user experiences. Our solutions are optimized for Apple's latest technologies and have been widely appreciated by users and clients alike across industries.",
    ],
    overviewBadges: [
      "Swift & UIKit Experts",
      "6+ Years Experience",
      "120+ Apps Delivered",
    ],

    whyChooseTitle: "Why Choose Us?",
    whyChooseDesc:
      "We are a leader among iOS app development companies and have built dozens of apps following a performance-first, Apple-HIG compliant approach. “Our work is done when it serves your purpose” so we dedicate full heartedly to deliver our best when it comes to iOS development services.",
    whyChooseTags: [
      "Swift / SwiftUI",
      "UIKit & Core Data",
      "Push notifications & CloudKit",
      "App Store optimization (ASO)",
      "Apple Watch & iPad apps",
    ],

    processHeading: "Develop iOS Apps?",
    processSteps: [
      {
        icon: "💡",
        title: "Understanding your idea",
        desc: "We listen, understand and analyze your app concept, target audience, and Apple platform requirements.",
      },
      {
        icon: "🎨",
        title: "Designing the experience",
        desc: "We design pixel-perfect, Apple HIG-compliant interfaces that feel right at home on iOS devices.",
      },
      {
        icon: "📱",
        title: "Prototype the app",
        desc: "We build a clickable prototype so you can visualize the flow and interactions before coding begins.",
      },
      {
        icon: "💻",
        title: "Developing the native app",
        desc: "We rely on best practices in Swift, UIKit, and SwiftUI to build fast, maintainable, and scalable apps.",
      },
      {
        icon: "🧪",
        title: "Testing on real devices",
        desc: "We rigorously test on multiple iOS devices and versions to ensure consistent performance and compatibility.",
      },
      {
        icon: "🚀",
        title: "Ready to launch",
        desc: "After performing all the development procedures, we submit to the App Store and provide ongoing support.",
      },
    ],

    servicesHeading: "iOS App Development Services",
    servicesIntro:
      "Your search for a leading iOS app development company may get a halt at Deific Digital. Demand for premium, high-performance iOS apps is rising across every industry, and so we design extensively creative and reliable iOS solutions. Our iOS app development services encompass:",
    servicesList: [
      "Native iOS app development (Swift/UIKit)",
      "SwiftUI app development",
      "iPad & Apple Watch apps",
      "App Store submission & ASO",
      "Push notifications & real-time updates",
      "Performance optimization & crash-free sessions",
      "iOS app maintenance, updates, and support and much more",
    ],

    processPhases: [
      "iOS Strategy",
      "UI/UX Design",
      "iOS Prototype",
      "iOS Architecture",
      "Native Development",
      "iOS Testing",
      "App Store deployment & launch",
      "iOS app support and maintenance",
      "iOS app performance and monitoring",
    ],

    projects: [
      {
        title: "MySwaasth: iOS Health App",
        img: "https://picsum.photos/seed/ioshealth/400/250",
        desc: "Health & Wellness iOS",
      },
      {
        title: "Pelotea: iOS Sports App",
        img: "https://picsum.photos/seed/iossports/400/250",
        desc: "Sports & Fitness iOS",
      },
      {
        title: "Agro: iOS Agri App",
        img: "https://picsum.photos/seed/iosagri/400/250",
        desc: "Agri-Tech iOS",
      },
    ],
  },



"hybrid-app-development": {
    badge: "Hybrid App Development",
    title: "Ranked among top 10 best",
    highlight: "Hybrid App Development Company",
    tagline: "One codebase, multiple platforms — faster and cost-effective",
    description:
      "We build high-performance hybrid mobile apps using modern frameworks like Ionic, Capacitor, and Cordova — delivering native-like experiences across iOS and Android with a single codebase.",
    heroImage: hybrid,

    stats: [
      { icon: Globe, value: "10+", label: "Industries" },
      { icon: Briefcase, value: "150", label: "Apps Built" },
      { icon: Users, value: "70+", label: "Strong Team" },
    ],

    overviewTitle: "Deific Digital",
    overviewParagraphs: [
      "“Every success is built on the ability to do better than good enough” – these words hold true in the world of hybrid app development. As a leading hybrid app development company, Deific Digital has consistently delivered high-quality, cross-platform mobile solutions that stand out in the competitive market.",
      "With a team of proficient hybrid app developers, we have built apps that are not only technically robust but also provide seamless user experiences across devices. Our solutions have been widely appreciated by users and clients alike across industries.",
    ],
    overviewBadges: [
      "Ionic & Capacitor Experts",
      "5+ Years Experience",
      "150+ Apps Delivered",
    ],

    whyChooseTitle: "Why Choose Us?",
    whyChooseDesc:
      "We are a leader among hybrid app development companies and have built dozens of apps following a performance-first approach. “Our work is done when it serves your purpose” so we dedicate full heartedly to deliver our best when it comes to hybrid app development services.",
    whyChooseTags: [
      "Ionic Framework",
      "Capacitor / Cordova",
      "Native device plugins",
      "Cross-platform UI/UX",
      "App Store & Play Store deployment",
    ],

    processHeading: "Develop Hybrid Apps?",
    processSteps: [
      {
        icon: "💡",
        title: "Understanding your idea",
        desc: "We listen, understand and analyze your app requirements, target audience, and platform needs.",
      },
      {
        icon: "🎨",
        title: "Designing the experience",
        desc: "We design pixel-perfect, responsive UIs that work seamlessly on both iOS and Android.",
      },
      {
        icon: "📱",
        title: "Prototype the app",
        desc: "We build a clickable prototype so you can visualize the flow before development begins.",
      },
      {
        icon: "💻",
        title: "Developing the hybrid app",
        desc: "We rely on best practices in hybrid development to build fast, maintainable, and scalable apps.",
      },
      {
        icon: "🧪",
        title: "Testing across devices",
        desc: "We rigorously test on real devices and emulators to ensure consistent performance and compatibility.",
      },
      {
        icon: "🚀",
        title: "Ready to launch",
        desc: "After performing all the development procedures, we deploy to app stores and provide ongoing support.",
      },
    ],

    servicesHeading: "Hybrid App Development Services",
    servicesIntro:
      "Your search for a leading hybrid app development company may get a halt at Deific Digital. Demand for cost-effective cross-platform apps is rising across every business, and so we design extensively creative hybrid solutions. Our hybrid app development services encompass:",
    servicesList: [
      "Ionic & Capacitor app development",
      "Cordova plugin integration",
      "Cross-platform UI/UX design",
      "Native device feature integration",
      "App Store & Play Store deployment",
      "Performance optimization",
      "App maintenance, updates, and support and much more",
    ],

    processPhases: [
      "App Strategy",
      "UI/UX Design",
      "App Prototype",
      "App Architecture",
      "Hybrid Development",
      "App Testing",
      "App deployment and launch",
      "App support and maintenance",
      "App performance and monitoring",
    ],

    projects: [
      {
        title: "MySwaasth: Health Hybrid App",
        img: "https://picsum.photos/seed/healthhybrid/400/250",
        desc: "Health App",
      },
      {
        title: "Pelotea: Sports Hybrid App",
        img: "https://picsum.photos/seed/sportshybrid/400/250",
        desc: "Sports App",
      },
      {
        title: "Agro: Agri Hybrid App",
        img: "https://picsum.photos/seed/agrihybrid/400/250",
        desc: "Agri App",
      },
    ],
  },

  "cross-platform-app-development": {
  badge: "Cross-Platform App Development",
  title: "Cross-Platform",
  highlight: "App Development",
  tagline: "One codebase, multiple platforms – faster, cheaper, better",
  description:
    "We build high-performance cross-platform apps using React Native, Flutter, and other modern frameworks – delivering native-like experiences on iOS, Android, and beyond from a single codebase.",
  heroImage: cross,

  stats: [
    { icon: Globe, value: "100+", label: "Apps Built" },
    { icon: Briefcase, value: "40+", label: "Clients Served" },
    { icon: Users, value: "25+", label: "Experts" },
  ],

  overviewTitle: "Cross-Platform Development",
  overviewParagraphs: [
    "Cross-platform app development allows you to reach users across multiple devices with a single, shared codebase. This approach significantly reduces development time, cost, and maintenance overhead while ensuring consistency in user experience.",
    "At Deific Digital, we specialize in building robust cross-platform applications using industry-leading frameworks like React Native, Flutter, and Xamarin. Our team delivers apps that are not only visually stunning but also perform seamlessly on every platform.",
  ],
  overviewBadges: [
    "React Native Experts",
    "Flutter Specialists",
    "5+ Years Experience",
  ],

  whyChooseTitle: "Why Choose Us?",
  whyChooseDesc:
    "We combine deep expertise in cross-platform frameworks with a user-centric design approach to deliver apps that feel native on every device. Our agile development process ensures rapid delivery without compromising on quality or performance.",
  whyChooseTags: [
    "React Native",
    "Flutter",
    "Xamarin",
    "Performance optimization",
    "Native-like UI/UX",
  ],

  processHeading: "Build Apps",
  processSteps: [
    {
      icon: "📱",
      title: "Requirement Analysis",
      desc: "We understand your business goals, target audience, and platform requirements to define a clear roadmap.",
    },
    {
      icon: "🎨",
      title: "UI/UX Design",
      desc: "Our designers create intuitive, platform-adaptive interfaces that provide a native feel on every device.",
    },
    {
      icon: "⚙️",
      title: "Development",
      desc: "Using the best-suited cross-platform framework, we build a maintainable, high-performance codebase.",
    },
    {
      icon: "🧪",
      title: "Testing & QA",
      desc: "We rigorously test on real devices and emulators to ensure compatibility, performance, and bug-free releases.",
    },
    {
      icon: "🚀",
      title: "Deployment",
      desc: "We handle the entire app store submission process for iOS, Android, and other platforms.",
    },
    {
      icon: "🔄",
      title: "Maintenance & Updates",
      desc: "We provide ongoing support, feature updates, and performance monitoring to keep your app ahead.",
    },
  ],

  servicesHeading: "Cross-Platform Development Services",
  servicesIntro:
    "Our cross-platform services are designed to maximize your reach while minimizing costs. We specialize in:",
  servicesList: [
    "React Native App Development",
    "Flutter App Development",
    "Xamarin App Development",
    "Cross-Platform UI/UX Design",
    "Platform-specific feature integration (Camera, GPS, Push Notifications)",
    "App Store & Play Store Deployment",
    "Maintenance, Updates, and Optimization",
  ],

  processPhases: [
    "Requirement Gathering",
    "UI/UX Design",
    "Framework Selection",
    "Development",
    "Testing",
    "Deployment",
    "Maintenance",
  ],

  projects: [
    {
      title: "Habit Tracker App",
      img: "https://picsum.photos/seed/habit/400/250",
      desc: "Cross-Platform (React Native)",
    },
    {
      title: "Delivery Management App",
      img: "https://picsum.photos/seed/delivery/400/250",
      desc: "Cross-Platform (Flutter)",
    },
    {
      title: "Finance Dashboard App",
      img: "https://picsum.photos/seed/finance/400/250",
      desc: "Cross-Platform (Xamarin)",
    },
  ],
},


"ai-integration-service": {
  badge: "AI Integration Services",
  title: "AI Integration",
  highlight: "Services",
  tagline: "Seamlessly integrate AI into your existing workflows",
  description:
    "We help businesses integrate AI capabilities – such as machine learning models, natural language processing, computer vision, and predictive analytics – into their existing software systems, enabling intelligent automation and data-driven insights.",
  heroImage: genAi,

  stats: [
    { icon: Globe, value: "50+", label: "Integrations" },
    { icon: Briefcase, value: "30+", label: "Clients Served" },
    { icon: Users, value: "20+", label: "AI Experts" },
  ],

  overviewTitle: "AI Integration Solutions",
  overviewParagraphs: [
    "AI integration is the process of embedding artificial intelligence capabilities into existing business applications, databases, and workflows. This allows organizations to automate decision-making, extract insights from unstructured data, and enhance customer experiences without rebuilding their entire tech stack.",
    "At Deific Digital, we specialize in integrating AI into both legacy and modern systems. Whether it's adding a recommendation engine to your e-commerce platform, embedding a chatbot into your CRM, or deploying computer vision for quality control – we make AI work for you.",
  ],
  overviewBadges: [
    "ML Integration",
    "NLP & Chatbots",
    "Computer Vision",
    "Predictive Analytics",
  ],

  whyChooseTitle: "Why Choose Us?",
  whyChooseDesc:
    "We combine deep AI expertise with a practical, integration-first approach. Our team works closely with your developers to ensure smooth adoption, minimal disruption, and measurable ROI. We don't just build AI – we make it part of your business.",
  whyChooseTags: [
    "Custom API development",
    "Seamless data pipeline integration",
    "Pre-trained & custom models",
    "Scalable cloud deployment",
    "Ongoing monitoring & retraining",
  ],

  processHeading: "Integrate AI",
  processSteps: [
    {
      icon: "🔍",
      title: "Discovery & Assessment",
      desc: "We analyze your existing systems, data sources, and business goals to identify high-impact AI opportunities.",
    },
    {
      icon: "📊",
      title: "Data Preparation",
      desc: "We clean, label, and structure your data to ensure it's ready for training or fine-tuning AI models.",
    },
    {
      icon: "🧠",
      title: "Model Selection & Tuning",
      desc: "We choose the right pre-trained models or build custom ones, optimizing for accuracy and performance.",
    },
    {
      icon: "🔌",
      title: "API & System Integration",
      desc: "We develop robust APIs and connectors to embed AI functionalities into your existing applications seamlessly.",
    },
    {
      icon: "🧪",
      title: "Testing & Validation",
      desc: "We rigorously test the integrated AI system with real-world scenarios to ensure reliability and accuracy.",
    },
    {
      icon: "🚀",
      title: "Deployment & Monitoring",
      desc: "We deploy the integrated solution, set up monitoring dashboards, and provide ongoing retraining as needed.",
    },
  ],

  servicesHeading: "AI Integration Services",
  servicesIntro:
    "Our AI integration services are tailored to your specific tech environment and business needs. We specialize in:",
  servicesList: [
    "Machine Learning model integration",
    "Natural Language Processing (NLP) integration",
    "Computer Vision API integration",
    "Predictive analytics integration",
    "Recommendation engine integration",
    "Chatbot & virtual assistant integration",
    "AI performance monitoring & continuous improvement",
  ],

  processPhases: [
    "Discovery",
    "Data Prep",
    "Model Selection",
    "API Development",
    "System Integration",
    "Testing",
    "Deployment",
    "Monitoring",
  ],

  projects: [
    {
      title: "E-Commerce Personalization",
      img: "https://picsum.photos/seed/ecommerceai/400/250",
      desc: "AI integration for product recommendations",
    },
    {
      title: "Healthcare Analytics Platform",
      img: "https://picsum.photos/seed/healthai/400/250",
      desc: "ML integration for patient risk prediction",
    },
    {
      title: "Manufacturing Quality Control",
      img: "https://picsum.photos/seed/manufacturingai/400/250",
      desc: "Computer vision integration for defect detection",
    },
  ],
},


"chatbots-virtual-assistants": {
  badge: "Chatbots & Virtual Assistants",
  title: "Chatbots &",
  highlight: "Virtual Assistants",
  tagline: "Automate conversations, delight your customers 24/7",
  description:
    "We build intelligent conversational AI agents – from customer support chatbots to enterprise virtual assistants – that understand context, respond naturally, and reduce response time across all your communication channels.",
  heroImage: chatbot,

  stats: [
    { icon: Globe, value: "15+", label: "Industries" },
    { icon: Briefcase, value: "250+", label: "Bots Deployed" },
    { icon: Users, value: "50+", label: "Strong Team" },
  ],

  overviewTitle: "Conversational AI Solutions",
  overviewParagraphs: [
    "Chatbots and virtual assistants are transforming how businesses interact with customers. These AI-powered agents can handle everything from simple FAQs to complex multi-step transactions, providing instant responses, reducing wait times, and significantly cutting operational costs.",
    "At Deific Digital, we specialize in building intelligent, context-aware conversational AI solutions tailored to your specific business needs. Whether it's a WhatsApp bot for customer support, a voice assistant for hands-free operations, or an enterprise virtual assistant for internal workflows – we create bots that understand, learn, and deliver.",
  ],
  overviewBadges: [
    "NLP Experts",
    "WhatsApp & Web Bots",
    "Voice Assistants",
    "Enterprise Ready",
  ],

  whyChooseTitle: "Why Choose Us?",
  whyChooseDesc:
    "We are a leader among chatbot and virtual assistant development companies and have built hundreds of bots following a conversation-first, user-centric approach. “Our work is done when it serves your purpose” so we dedicate full heartedly to deliver our best when it comes to conversational AI services.",
  whyChooseTags: [
    "Customer support bots",
    "WhatsApp Business bots",
    "Voice-enabled assistants",
    "Multilingual chatbots",
    "Enterprise virtual assistants",
    "Live agent handoff",
  ],

  processHeading: "Build Chatbots",
  processSteps: [
    {
      icon: "💡",
      title: "Discovery & Use Case Analysis",
      desc: "We listen, understand and analyze your support workflows, customer pain points, and business goals before designing any conversation.",
    },
    {
      icon: "🗣️",
      title: "Conversation Design",
      desc: "We map out intents, entities, and dialogue flows that feel natural, handle variations, and guide users toward resolution quickly.",
    },
    {
      icon: "🤖",
      title: "Prototype the Bot",
      desc: "We build a working prototype so you can test the tone, personality, and flow before full-scale development begins.",
    },
    {
      icon: "🧠",
      title: "NLP Model Training",
      desc: "We rely on best-in-class NLP frameworks to train models that understand context, intent, and sentiment accurately.",
    },
    {
      icon: "🔌",
      title: "Integration & Deployment",
      desc: "We integrate the bot with your existing systems (CRM, ticketing, databases) and deploy across web, WhatsApp, or in-app channels.",
    },
    {
      icon: "📊",
      title: "Testing & Optimization",
      desc: "We run the bot through real conversation scenarios, edge cases, and load testing, then continuously improve based on feedback.",
    },
    {
      icon: "🚀",
      title: "Launch & Support",
      desc: "After performing all the development procedures, we deploy the bot and provide ongoing tuning, retraining, and support.",
    },
  ],

  servicesHeading: "Chatbot & Virtual Assistant Services",
  servicesIntro:
    "Your search for a leading conversational AI company may get a halt at Deific Digital. Demand for automated, intelligent support is rising across every industry, and so we design extensively innovative and helpful assistants. Our chatbot development services encompass:",
  servicesList: [
    "Customer support chatbots",
    "WhatsApp & Messenger bots",
    "Voice-enabled virtual assistants",
    "Multilingual conversational AI",
    "Bot analytics & performance dashboards",
    "Live agent handoff integration",
    "Bot support, maintenance, optimization and much more",
  ],

  processPhases: [
    "Conversation Strategy",
    "Dialogue Design",
    "Bot Prototype",
    "NLP Architecture",
    "Bot Development",
    "Conversation Testing",
    "Integration & Deployment",
    "Bot Launch",
    "Bot Support & Monitoring",
  ],

  projects: [
    {
      title: "MySwaasth: AI Health Assistant",
      img: "https://picsum.photos/seed/healthbot/400/250",
      desc: "Healthcare Chatbot",
    },
    {
      title: "Pelotea: Fan Engagement Bot",
      img: "https://picsum.photos/seed/sportsbot/400/250",
      desc: "Sports Engagement Assistant",
    },
    {
      title: "Agro: Farmer Support Assistant",
      img: "https://picsum.photos/seed/agribot/400/250",
      desc: "Agri-Tech Virtual Assistant",
    },
  ],
},

"automation": {
  badge: "Business Automation",
  title: "Business",
  highlight: "Automation",
  tagline: "Let machines handle the repetitive, focus on what matters",
  description:
    "We design intelligent automation workflows that eliminate manual, repetitive tasks – from document processing to data entry – freeing up your team to focus on higher-value work.",
  heroImage: automation,

  stats: [
    { icon: Globe, value: "12+", label: "Industries" },
    { icon: Briefcase, value: "350+", label: "Workflows Automated" },
    { icon: Users, value: "50+", label: "Strong Team" },
  ],

  overviewTitle: "Intelligent Business Automation",
  overviewParagraphs: [
    "Business automation leverages technology to streamline operations, reduce errors, and accelerate processes. From robotic process automation (RPA) to intelligent document processing and workflow orchestration, automation enables organizations to scale without adding headcount.",
    "At Deific Digital, we partner with you to identify repetitive, rule-based tasks and transform them into efficient, reliable automated workflows. Our solutions integrate with your existing systems, ensuring minimal disruption and maximum ROI. We've helped businesses across industries automate everything from invoice processing to customer onboarding.",
  ],
  overviewBadges: [
    "RPA Experts",
    "Document Processing",
    "Workflow Orchestration",
    "Integration Specialists",
  ],

  whyChooseTitle: "Why Choose Us?",
  whyChooseDesc:
    "We are a leader among automation companies and have built hundreds of workflows following a process-first, people-centric approach. “Our work is done when it serves your purpose” so we dedicate full heartedly to deliver our best when it comes to automation services. We ensure your teams are empowered, not replaced.",
  whyChooseTags: [
    "Document & invoice processing",
    "Data entry & migration",
    "Workflow orchestration",
    "RPA bot development",
    "System integrations",
    "Monitoring & analytics",
  ],

  processHeading: "Automate Workflows",
  processSteps: [
    {
      icon: "🔍",
      title: "Process Discovery",
      desc: "We analyze your current manual processes, map out steps, and identify the best candidates for automation based on effort and impact.",
    },
    {
      icon: "📋",
      title: "Workflow Design",
      desc: "We design the automated workflow, defining triggers, actions, exceptions, and decision points to handle real-world scenarios.",
    },
    {
      icon: "⚙️",
      title: "Prototype & Testing",
      desc: "We build a working prototype and test it with real data to validate logic, accuracy, and performance before full deployment.",
    },
    {
      icon: "🔌",
      title: "Integration & Development",
      desc: "We develop the full automation solution, integrating with your existing systems (ERP, CRM, databases) using APIs or RPA tools.",
    },
    {
      icon: "🧪",
      title: "Rigorous Testing",
      desc: "We run the automation through extensive test cases, edge cases, and load scenarios to ensure stability and error handling.",
    },
    {
      icon: "🚀",
      title: "Deployment & Training",
      desc: "We deploy the automation, train your team on oversight and exception handling, and provide documentation for ongoing management.",
    },
    {
      icon: "📊",
      title: "Monitoring & Continuous Improvement",
      desc: "We set up dashboards to monitor performance, track ROI, and continuously optimize the workflow based on data insights.",
    },
  ],

  servicesHeading: "Business Automation Services",
  servicesIntro:
    "Your search for a leading automation company may get a halt at Deific Digital. Demand for efficient, error-free operations is rising across every business, and so we design extensively reliable and scalable automation. Our automation services encompass:",
  servicesList: [
    "Robotic Process Automation (RPA)",
    "Document & invoice processing automation",
    "Data entry & migration automation",
    "Workflow orchestration & approval automation",
    "Integration with third-party systems (APIs, middleware)",
    "Custom automation dashboard & reporting",
    "Automation support, maintenance, and optimization",
  ],

  processPhases: [
    "Discovery & Assessment",
    "Workflow Design",
    "Prototype & Validation",
    "Integration & Development",
    "Testing & QA",
    "Deployment & Training",
    "Monitoring & Continuous Improvement",
  ],

  projects: [
    {
      title: "Healthcare Claims Processing",
      img: "https://picsum.photos/seed/healthauto/400/250",
      desc: "Automated claims verification & approval",
    },
    {
      title: "Retail Inventory Management",
      img: "https://picsum.photos/seed/retailauto/400/250",
      desc: "Automated stock level monitoring & reorder",
    },
    {
      title: "Financial Invoice Processing",
      img: "https://picsum.photos/seed/financeauto/400/250",
      desc: "AI-powered invoice extraction & approval",
    },
  ],
},

"generative-ai-solution": {
  badge: "Generative AI Solutions",
  title: "Generative AI",
  highlight: "Solutions",
  tagline: "Create content, code, and ideas at scale with AI",
  description:
    "We build custom generative AI tools for content creation, code generation, image synthesis, and more – tailored to fit your brand voice and business workflows.",
  heroImage: genAi,

  stats: [
    { icon: Globe, value: "10+", label: "Industries" },
    { icon: Briefcase, value: "180", label: "AI Tools Built" },
    { icon: Users, value: "70+", label: "Strong Team" },
  ],

  overviewTitle: "Generative AI Solutions",
  overviewParagraphs: [
    "Every success is built on the ability to do better than good enough – these words hold true in the world of generative AI. As a leading generative AI company, Deific Digital has consistently delivered high-quality, innovative AI tools that stand out in the competitive market.",
    "With a team of proficient AI engineers and designers, we have built generative tools that are not only technically robust but also tailored to brand voice. Our solutions have been widely appreciated by users and clients alike across industries.",
  ],
  overviewBadges: [
    "AI Certified Team",
    "4+ Years Experience",
    "180+ AI Tools Delivered",
  ],

  whyChooseTitle: "Why Choose Us?",
  whyChooseDesc:
    "We are a leader among generative AI companies and have built dozens of tools following a research-driven approach. “Our work is done when it serves your purpose” so we dedicate full heartedly to deliver our best when it comes to generative AI services.",
  whyChooseTags: [
    "Content generation tools",
    "Code generation assistants",
    "Image synthesis tools",
    "Custom fine-tuned models",
    "Brand-voice AI tools",
  ],

  processHeading: "Build Generative AI",
  processSteps: [
    {
      icon: "💡",
      title: "Understanding your goals",
      desc: "We listen, understand and analyze the kind of content, code, or media you want the AI to generate.",
    },
    {
      icon: "🎨",
      title: "Designing the AI experience",
      desc: "We design prompts, pipelines and interfaces that fit naturally into your existing workflow.",
    },
    {
      icon: "📱",
      title: "Prototype the tool",
      desc: "We build a working prototype so you can test output quality before full-scale development.",
    },
    {
      icon: "💻",
      title: "Developing the model pipeline",
      desc: "We rely on best practices in prompt engineering and fine-tuning to build reliable generative pipelines.",
    },
    {
      icon: "🧪",
      title: "Testing the outputs",
      desc: "We evaluate outputs for quality, safety, and consistency across many real-world scenarios before launch.",
    },
    {
      icon: "🚀",
      title: "Ready to launch",
      desc: "After performing all the development procedures, we deploy the tool and provide ongoing tuning and support.",
    },
  ],

  servicesHeading: "Generative AI Tool Development",
  servicesIntro:
    "Your search for a leading generative AI company may get a halt at Deific Digital. Demand for AI-generated content and code is rising across every business, and so we design extensively creative AI tools. Our generative AI services encompass:",
  servicesList: [
    "AI content generation tools",
    "Code generation assistants",
    "Image & design synthesis",
    "Custom fine-tuned models",
    "Prompt engineering & optimization",
    "Brand-voice tuned AI tools",
    "AI tool support, maintenance and optimization and much more",
  ],

  processPhases: [
    "AI Strategy",
    "AI Experience Design",
    "AI Prototype",
    "AI Architecture",
    "AI Development",
    "AI Testing",
    "AI Delivery & Launch",
    "AI Support & Maintenance",
    "AI Performance & Monitoring",
  ],

  projects: [
    {
      title: "MySwaasth: AI Health Content",
      img: "https://picsum.photos/seed/healthgenai/400/250",
      desc: "Health Content Generation",
    },
    {
      title: "Pelotea: AI Match Highlights",
      img: "https://picsum.photos/seed/sportsgenai/400/250",
      desc: "Sports Content AI",
    },
    {
      title: "Agro: AI Crop Reports",
      img: "https://picsum.photos/seed/agrigenai/400/250",
      desc: "Agri Content AI",
    },
  ],
},


"search-engine-optimization":{
  badge: "Search Engine Optimization",
  title: "Search Engine",
  highlight: "Optimization",
  tagline: "Rank higher, get found faster, grow organically",
  description:
    "We build data-driven SEO strategies that improve your search rankings, drive qualified organic traffic, and deliver measurable business growth across all major search engines.",
  heroImage: socialMedia,
  stats: [
    { icon: Globe, value: "12+", label: "Industries" },
    { icon: Briefcase, value: "500+", label: "Keywords Ranked" },
    { icon: Users, value: "50+", label: "Strong Team" },
  ],

  overviewTitle: "Strategic SEO Solutions",
  overviewParagraphs: [
    `SEO Services is the base for sustainable growth online. At Deific Digital, we offer outcome-oriented SEO Services in Kanpur and enable business growth through our SEO strategy customized for your needs. Being the best SEO Company in Kanpur, SEO Company in Mumbai, and SEO Company in Bangalore, we take care of all aspects including Technical SEO, Content Optimization, Link Building, and more.`,
    // "At Deific Digital, we craft comprehensive SEO strategies tailored to your industry, audience, and business goals. From technical audits to content optimization and link building, we handle everything. Our approach combines proven techniques with the latest algorithm insights to deliver lasting rankings and measurable ROI.",
  ],
  overviewBadges: [
    "Technical SEO",
    "On-Page Optimization",
    "Link Building",
    "Analytics & Reporting",
  ],

  whyChooseTitle: "Why Choose Us?",
  whyChooseDesc:
    "We are here to ensure that your brands convert their visibility into business growth through effective SEO strategies based on your objectives which include increased rankings, traffic, and ROI. Using our expertise on how algorithms change and the latest developments in your industries, we will make sure that you maintain a competitive edge.",
  whyChooseTags: [
    "Technical SEO audit & fixes",
    "On-page & off-page optimization",
    "Content strategy & creation",
    "Local SEO & Google Business Profile",
    "Link building & outreach",
    "Performance tracking & reporting",
  ],

  processHeading: "How We Rank Your Business",
  processSteps: [
    {
      icon: "🔍",
      title: "SEO Audit & Research",
      desc: "We conduct a thorough audit of your website, analyze competitors, and identify high-value keyword opportunities aligned with your business goals.",
    },
    {
      icon: "🛠️",
      title: "Technical SEO",
      desc: "We fix crawl errors, improve site speed, optimize mobile experience, and ensure your website is fully indexable by search engines.",
    },
    {
      icon: "✍️",
      title: "On-Page Optimization",
      desc: "We optimize meta tags, headings, content structure, internal linking, and schema markup to maximize relevance for target keywords.",
    },
    {
      icon: "📝",
      title: "Content Strategy",
      desc: "We create SEO-optimized, high-quality content that answers your audience's questions, builds authority, and drives organic traffic.",
    },
    {
      icon: "🔗",
      title: "Link Building",
      desc: "We execute white-hat link building campaigns to earn high-authority backlinks that boost your domain strength and search rankings.",
    },
    {
      icon: "📊",
      title: "Monitoring & Optimization",
      desc: "We track keyword rankings, traffic, and conversions — continuously refining our strategy to improve results month over month.",
    },
  ],

  servicesHeading: "SEO Services We Offer",
  servicesIntro:
    "Your hunt for a results-oriented SEO company comes to an end with Deific Digital. We craft result-oriented SEO campaigns based on research that help increase organic visibility, traffic, and conversions. The SEO services we offer are as follows:",
  servicesList: [
    "Technical SEO Audit & Implementation",
    "Keyword research & competitive analysis",
    "On-page SEO optimization",
    "Link building & digital PR",
    "Local SEO & Google Business Profile management",
    "E-commerce SEO & Product Optimization",
    "SEO Analytics, Reporting & Optimization",
  ],

  processPhases: [
    "SEO Audit",
    "Keyword Research",
    "Technical Fixes",
    "On-Page Optimization",
    "Content Creation",
    "Link Building",
    "Local SEO",
    "Performance Tracking",
    "Continuous Optimization",
  ],

  projects: [
    {
      title: "E-Commerce Store Rankings",
      img: "https://picsum.photos/seed/seoecom/400/250",
      desc: "Page 1 rankings for 200+ product keywords",
    },
    {
      title: "Local Business Visibility",
      img: "https://picsum.photos/seed/seolocal/400/250",
      desc: "3x increase in local search traffic in 90 days",
    },
    {
      title: "B2B SaaS Organic Growth",
      img: "https://picsum.photos/seed/seosaas/400/250",
      desc: "400% organic traffic growth in 6 months",
    },
  ],
},



 
"social-media-marketing": {
  badge: "Social Media Marketing",
  title: "Social Media",
  highlight: "Marketing",
  tagline: "Build your brand, engage your audience, drive results",
  description:
    "We create data-driven social media strategies that build brand awareness, foster community engagement, and generate measurable business growth across all major platforms.",
  heroImage: socialMedia,

  stats: [
    { icon: Globe, value: "12+", label: "Industries" },
    { icon: Briefcase, value: "200+", label: "Campaigns Managed" },
    { icon: Users, value: "50+", label: "Strong Team" },
  ],

  overviewTitle: "Strategic Social Media Solutions",
  overviewParagraphs: [
    "Social media marketing is critical in helping create a strong brand image, customer interaction, and revenue generation. Deific Digital is a leading digital marketing company, which develops data-based strategies to help you transform your customer engagement into business growth.",
    "At Deific Digital, our social media management service includes all the tasks including content creation and management, advertisements, influencer marketing, and data analysis. We are one of the best digital marketing agencies in Bangalore, and our team helps achieve maximum return on investment.",
  ],
  overviewBadges: [
    "Organic & Paid Strategy",
    "Content Creation",
    "Community Management",
    "Analytics & Reporting",
  ],

  whyChooseTitle: "Why Choose Us?",
  whyChooseDesc:
    "We are a reliable social media marketing agency that helps brands build a strong online identity through their online presence. At Deific Digital, we always keep an eye out for trends and changes in order to formulate an effective social media strategy. We are a digital marketing agency in Kanpur and all our efforts go towards creating meaningful engagement and growth for our clients.",
  whyChooseTags: [
    "Organic social media strategy",
    "Paid social advertising (Meta, LinkedIn, etc.)",
    "Content creation & curation",
    "Community engagement & management",
    "Influencer collaboration",
    "Performance analytics & optimization",
  ],

  processHeading: "Market on Social Media",
  processSteps: [
    {
      icon: "🔍",
      title: "Audit & Strategy",
      desc: "We analyze your current social presence, competitors, and audience to create a tailored social media strategy aligned with your goals.",
    },
    {
      icon: "🎨",
      title: "Content Creation",
      desc: "We design engaging visuals, videos, and copy that resonate with your target audience and reflect your brand identity.",
    },
    {
      icon: "📅",
      title: "Content Calendar & Scheduling",
      desc: "We plan and schedule posts across platforms to ensure consistent, timely, and strategic content delivery.",
    },
    {
      icon: "📣",
      title: "Paid Advertising",
      desc: "We run targeted ad campaigns on Meta, LinkedIn, Twitter, and other platforms to amplify reach and drive conversions.",
    },
    {
      icon: "💬",
      title: "Community Engagement",
      desc: "We actively manage comments, messages, and conversations to build trust, loyalty, and a vibrant community around your brand.",
    },
    {
      icon: "📊",
      title: "Monitoring & Optimization",
      desc: "We track performance metrics, analyze data, and continuously optimize your strategy to improve engagement, reach, and ROI.",
    },
  ],

  servicesHeading: "Social Media Marketing Services",
  servicesIntro:
    "Your search for a leading social media marketing agency ends at Deific Digital. As a best digital marketing agency in Kanpur, we create creative, engaging, and result-driven campaigns designed to strengthen your online presence. Our social media services encompass:",
  servicesList: [
    "Organic social media strategy & management",
    "Paid social advertising (Meta, LinkedIn, Instagram, etc.)",
    "Content creation (graphics, video, copywriting)",
    "Community management & customer engagement",
    "Influencer marketing & partnerships",
    "Social media analytics & reporting",
    "Competitor analysis & trend monitoring",
    "Social media support, optimization, and growth",
  ],

  processPhases: [
    "Social Media Audit",
    "Strategy Development",
    "Content Planning",
    "Content Creation",
    "Scheduling & Publishing",
    "Paid Campaign Setup",
    "Community Management",
    "Monitoring & Reporting",
    "Continuous Optimization",
  ],

  projects: [
    {
      title: "E-Commerce Brand Growth",
      img: "https://picsum.photos/seed/smmecom/400/250",
      desc: "300% increase in organic engagement",
    },
    {
      title: "B2B Lead Generation Campaign",
      img: "https://picsum.photos/seed/smmb2b/400/250",
      desc: "150+ qualified leads via LinkedIn ads",
    },
    {
      title: "Fashion Brand Influencer Campaign",
      img: "https://picsum.photos/seed/smmfashion/400/250",
      desc: "Reached 1M+ users with influencer collaboration",
    },
  ],
},


"meta-ads": {
  badge: "Meta Ads",
  title: "Meta",
  highlight: "Ads",
  tagline: "Reach your ideal customers on Facebook & Instagram",
  description:
    "We create high-performing Meta advertising campaigns that drive conversions, build brand awareness, and maximize ROI through precise targeting and creative excellence on Facebook and Instagram.",
  heroImage: meta,

  stats: [
    { icon: Globe, value: "15+", label: "Industries" },
    { icon: Briefcase, value: "500+", label: "Campaigns Launched" },
    { icon: Users, value: "45+", label: "Ads Experts" },
  ],

  overviewTitle: "Strategic Meta Advertising Solutions",
  overviewParagraphs: [
    "Meta Ads (formerly Facebook Ads) is one of the most powerful advertising platforms available today. With over 3 billion monthly active users across Facebook, Instagram, and WhatsApp, Meta offers unparalleled reach, targeting precision, and diverse ad formats to help businesses achieve their marketing objectives.",
    "At Deific Digital, we specialize in creating high-performing Meta advertising campaigns that deliver measurable results. From audience research and creative development to campaign setup, optimization, and detailed reporting – we manage the entire lifecycle. Our data-driven approach ensures every ad dollar is spent efficiently, maximizing your ROI.",
  ],
  overviewBadges: [
    "Facebook Ads",
    "Instagram Ads",
    "Advanced Targeting",
    "ROI Optimization",
  ],

  whyChooseTitle: "Why Choose Us?",
  whyChooseDesc:
    "We are a leader among Meta advertising agencies and have managed hundreds of successful campaigns. “Our work is done when it serves your purpose” so we dedicate full heartedly to deliver our best when it comes to Meta Ads services. We stay updated with platform changes to keep your campaigns ahead of the competition.",
  whyChooseTags: [
    "Facebook & Instagram advertising",
    "Advanced audience targeting",
    "Creative ad design & copywriting",
    "Retargeting & lookalike audiences",
    "A/B testing & optimization",
    "Performance analytics & reporting",
  ],

  processHeading: "Run Meta Ads",
  processSteps: [
    {
      icon: "🎯",
      title: "Audience Research & Strategy",
      desc: "We analyze your target audience, competitors, and business goals to develop a tailored Meta advertising strategy.",
    },
    {
      icon: "🎨",
      title: "Creative Development",
      desc: "We design eye-catching visuals, videos, and compelling copy that stop the scroll and drive action on Facebook and Instagram.",
    },
    {
      icon: "⚙️",
      title: "Campaign Setup",
      desc: "We set up your campaigns with precise targeting, budget allocation, and bidding strategies to maximize efficiency.",
    },
    {
      icon: "📊",
      title: "A/B Testing",
      desc: "We continuously test different creatives, audiences, and ad formats to identify what performs best for your business.",
    },
    {
      icon: "📈",
      title: "Optimization & Scaling",
      desc: "We monitor performance daily, optimize underperforming ads, and scale winning campaigns to achieve your goals.",
    },
    {
      icon: "📋",
      title: "Reporting & Analysis",
      desc: "We provide detailed reports on key metrics – impressions, clicks, conversions, ROAS – and actionable insights for improvement.",
    },
  ],

  servicesHeading: "Meta Ads Services",
  servicesIntro:
    "Your search for a leading Meta Ads agency may get a halt at Deific Digital. Demand for effective paid social advertising is rising across every industry, and so we design extensively targeted and optimized campaigns. Our Meta Ads services encompass:",
  servicesList: [
    "Facebook Ads management",
    "Instagram Ads management",
    "Advanced audience targeting (demographics, interests, behaviors)",
    "Retargeting & lookalike audience campaigns",
    "Creative development (images, videos, carousel, stories)",
    "A/B testing & campaign optimization",
    "Conversion tracking & pixel setup",
    "Detailed performance reporting & analysis",
    "Campaign scaling & budget optimization",
  ],

  processPhases: [
    "Audience Research",
    "Strategy Development",
    "Creative Production",
    "Campaign Setup",
    "A/B Testing",
    "Optimization",
    "Scaling",
    "Reporting & Analysis",
  ],

  projects: [
    {
      title: "E-Commerce Holiday Campaign",
      img: "https://picsum.photos/seed/metaecom/400/250",
      desc: "4.5X ROAS achieved during peak season",
    },
    {
      title: "Lead Generation for SaaS",
      img: "https://picsum.photos/seed/metasaas/400/250",
      desc: "200+ qualified leads from targeted Meta campaigns",
    },
    {
      title: "App Install Campaign",
      img: "https://picsum.photos/seed/metaapp/400/250",
      desc: "50K+ app installs via Instagram & Facebook ads",
    },
  ],
},



"google-my-business-optimization": {
  badge: "Google My Business Optimization",
  title: "Google My Business",
  highlight: "Optimization",
  tagline: "Get found locally, attract more customers",
  description:
    "We optimize your Google My Business profile to improve local search visibility, attract more customers, and drive foot traffic through enhanced listings, reviews, and local engagement.",
  heroImage: gmb,

  stats: [
    { icon: Globe, value: "20+", label: "Industries" },
    { icon: Briefcase, value: "350+", label: "Listings Optimized" },
    { icon: Users, value: "40+", label: "Local SEO Experts" },
  ],

  overviewTitle: "Strategic Google My Business Solutions",
  overviewParagraphs: [
    "Google My Business (GMB) is a free tool that allows businesses to manage their online presence across Google Search and Google Maps. With over 40% of all mobile searches having local intent, a fully optimized GMB profile is essential for attracting nearby customers and driving foot traffic.",
    "At Deific Digital, we specialize in comprehensive GMB optimization services. From verification and complete profile setup to content optimization, review management, and local SEO integration – we ensure your business stands out in local search results. Our strategies help you build trust, credibility, and visibility in your local market.",
  ],
  overviewBadges: [
    "Local SEO",
    "Profile Optimization",
    "Review Management",
    "Google Maps Visibility",
  ],

  whyChooseTitle: "Why Choose Us?",
  whyChooseDesc:
    "We are a leader among Google My Business optimization agencies and have helped hundreds of businesses improve their local search visibility. “Our work is done when it serves your purpose” so we dedicate full heartedly to deliver our best when it comes to GMB services. We stay updated with Google's algorithm changes to keep your listing ahead of competitors.",
  whyChooseTags: [
    "GMB profile verification & setup",
    "Complete listing optimization",
    "Local keyword optimization",
    "Review generation & management",
    "Photo & video enhancement",
    "Local SEO integration",
  ],

  processHeading: "Optimize GMB",
  processSteps: [
    {
      icon: "📍",
      title: "Audit & Verification",
      desc: "We audit your current GMB profile, verify ownership, and identify gaps in your listing that need improvement.",
    },
    {
      icon: "📝",
      title: "Profile Optimization",
      desc: "We complete your profile with accurate business information, compelling descriptions, and relevant categories to match local search intent.",
    },
    {
      icon: "📸",
      title: "Visual Content Enhancement",
      desc: "We add high-quality photos and videos that showcase your products, services, and location to attract and engage customers.",
    },
    {
      icon: "⭐",
      title: "Review Management",
      desc: "We implement strategies to generate positive reviews and manage negative feedback professionally to build trust and credibility.",
    },
    {
      icon: "🔍",
      title: "Local SEO Integration",
      desc: "We integrate your GMB profile with local SEO strategies to improve rankings in Google's Local Pack and organic search results.",
    },
    {
      icon: "📊",
      title: "Monitoring & Optimization",
      desc: "We track your GMB performance, monitor customer interactions, and continuously optimize your listing based on insights and analytics.",
    },
  ],

  servicesHeading: "Google My Business Optimization Services",
  servicesIntro:
    "Your search for a leading GMB optimization agency may get a halt at Deific Digital. Demand for local search visibility is rising across every industry, and so we design extensively effective and sustainable GMB strategies. Our Google My Business optimization services encompass:",
  servicesList: [
    "GMB profile verification & claim",
    "Complete profile optimization (name, address, phone, categories)",
    "Local keyword research & integration",
    "Photo & video upload management",
    "Review generation & response management",
    "Google Posts creation & publishing",
    "Q&A management & customer interaction",
    "GMB insights analysis & reporting",
    "Local SEO integration & optimization",
  ],

  processPhases: [
    "Audit & Verification",
    "Profile Setup",
    "Content Optimization",
    "Review Management",
    "Local SEO Integration",
    "Monitoring & Analytics",
    "Continuous Improvement",
  ],

  projects: [
    {
      title: "Local Restaurant Chain",
      img: "https://picsum.photos/seed/gmbrestaurant/400/250",
      desc: "300% increase in local search visibility",
    },
    {
      title: "Medical Clinic Growth",
      img: "https://picsum.photos/seed/gmbclinic/400/250",
      desc: "50+ positive reviews & 4.9 star rating achieved",
    },
    {
      title: "Retail Store Foot Traffic",
      img: "https://picsum.photos/seed/gmbretail/400/250",
      desc: "75% increase in store visits via Google Maps",
    },
  ],
},



"mvp-development": {
  badge: "MVP Development",
  title: "MVP",
  highlight: "Development",
  tagline: "Validate your idea fast, launch smarter",
  description:
    "We build Minimum Viable Products (MVPs) that help you test your business ideas quickly, gather real user feedback, and iterate based on data – all while minimizing cost and time to market.",
  heroImage: mvp,

  stats: [
    { icon: Globe, value: "18+", label: "Industries" },
    { icon: Briefcase, value: "120+", label: "MVPs Built" },
    { icon: Users, value: "60+", label: "Strong Team" },
  ],

  overviewTitle: "Strategic MVP Development Solutions",
  overviewParagraphs: [
    "A Minimum Viable Product (MVP) is the most essential version of your product that allows you to launch quickly, test assumptions, and validate your business idea with real users. It's not about building less – it's about building exactly what's needed to learn and grow.",
    "Innotica's Minimum Viable Product (MVP) development services are designed to cater to a diverse range of businesses, offering customized solutions to meet your specific requirements. At Deific Digital, we specialize in transforming your vision into a functional MVP that attracts early adopters, impresses investors, and sets the foundation for a scalable product. We focus on core features that solve your users' primary pain points.",
  ],
  overviewBadges: [
    "Rapid Prototyping",
    "Lean Methodology",
    "Market Validation",
    "Investor-Ready",
  ],

  whyChooseTitle: "Why Choose Us?",
  whyChooseDesc:
    "We are a leader among MVP development companies and have built over 120 successful MVPs across industries. “Our work is done when it serves your purpose” so we dedicate full heartedly to deliver our best when it comes to MVP development services. We help you turn your vision into a tangible product with minimal investment, enabling you to test assumptions and gather real user feedback early.",
  whyChooseTags: [
    "Rapid prototyping & wireframing",
    "Lean development approach",
    "User-centric feature prioritization",
    "Agile development methodology",
    "Investor-ready demo creation",
    "Post-launch iteration & scaling",
  ],

  processHeading: "Build MVPs",
  processSteps: [
    {
      icon: "💡",
      title: "Idea Validation & Research",
      desc: "We validate your concept, analyze the market, and define core value propositions that will resonate with early adopters.",
    },
    {
      icon: "📋",
      title: "Feature Prioritization",
      desc: "We identify and prioritize must-have features for the initial launch, focusing on what solves your users' primary pain points.",
    },
    {
      icon: "🎨",
      title: "Prototyping & Design",
      desc: "We create wireframes and interactive prototypes that bring your vision to life and allow early user testing.",
    },
    {
      icon: "⚡",
      title: "Rapid Development",
      desc: "We build a functional, polished MVP using agile methods – delivering value quickly while maintaining quality.",
    },
    {
      icon: "🧪",
      title: "User Testing & Feedback",
      desc: "We release to early users, gather feedback, and analyze usage data to validate assumptions and identify improvements.",
    },
    {
      icon: "🚀",
      title: "Launch & Iterate",
      desc: "After refining based on feedback, we launch the MVP and continue iterating to build a full-scale product.",
    },
  ],

  servicesHeading: "MVP Development Services",
  servicesIntro:
    "Your search for a leading MVP development company may get a halt at Deific Digital. Demand for fast, validated product launches is rising across every industry, and so we design extensively efficient and scalable MVP solutions. Our MVP development services encompass:",
  servicesList: [
    "Custom MVP development",
    "Prototype & wireframing",
    "Feature prioritization & scope definition",
    "Agile development methodology",
    "User testing & feedback integration",
    "Investor-ready demo & pitch deck creation",
    "Post-launch iteration & scaling support",
    "MVP maintenance & optimization",
  ],

  processPhases: [
    "Idea Validation",
    "Market Research",
    "Feature Prioritization",
    "Prototyping",
    "Agile Development",
    "User Testing",
    "Launch & Iteration",
    "Scaling",
  ],

  projects: [
    {
      title: "HealthTech Startup MVP",
      img: "https://picsum.photos/seed/mvphealth/400/250",
      desc: "Launched patient management platform in 6 weeks",
    },
    {
      title: "Food Delivery App MVP",
      img: "https://picsum.photos/seed/mvpdelivery/400/250",
      desc: "Secured $500K funding after successful MVP launch",
    },
    {
      title: "FinTech MVP Development",
      img: "https://picsum.photos/seed/mvpfintech/400/250",
      desc: "Acquired 1000+ users within first month of launch",
    },
  ],
},


"startup-idea-validation": {
  badge: "Startup Idea Validation",
  title: "Startup Idea",
  highlight: "Validation",
  tagline: "Validate your idea, attract investors, build with confidence",
  description:
    "We help entrepreneurs validate their startup ideas through comprehensive market research, financial modeling, and competitive analysis – ensuring your business has a solid foundation before you invest time and money.",
  heroImage: startup,

  stats: [
    { icon: Globe, value: "12+", label: "Industries" },
    { icon: Briefcase, value: "80+", label: "Startups Validated" },
    { icon: Users, value: "35+", label: "Validation Experts" },
  ],

  overviewTitle: "Strategic Startup Validation Solutions",
  overviewParagraphs: [
    "Startup idea validation is the process of determining the worth and viability of a startup company. This is typically done in order to help the company raise capital, secure financing, or attract investment. Proper validation reduces the risk of failure by ensuring there's genuine market demand, a viable business model, and a clear path to profitability.",
    "At Deific Digital, we provide in-depth analysis of your business model, market opportunity, competitive landscape, and financial projections to help you make informed decisions and present a compelling case to investors. We combine data-driven research with industry expertise to give you the clarity and confidence needed to move forward – or pivot – before committing significant resources.",
  ],
  overviewBadges: [
    "Market Research",
    "Financial Modeling",
    "Investor Pitch",
    "Risk Assessment",
  ],

  whyChooseTitle: "Why Choose Us?",
  whyChooseDesc:
    "With years of experience in startup ecosystems, we provide actionable insights that help you refine your business model, mitigate risks, and maximize your chances of success. “Our work is done when it serves your purpose” so we dedicate full heartedly to deliver our best when it comes to startup validation services. We help you build a solid foundation for long-term growth.",
  whyChooseTags: [
    "Market opportunity analysis",
    "Competitive landscape mapping",
    "Financial projections & valuation",
    "Investor pitch deck creation",
    "Risk assessment & mitigation",
    "Go-to-market strategy",
  ],

  processHeading: "Validate Startups",
  processSteps: [
    {
      icon: "🔍",
      title: "Discovery & Market Research",
      desc: "We analyze your idea, target market, customer needs, and market size to determine if there's genuine demand.",
    },
    {
      icon: "📊",
      title: "Competitive Analysis",
      desc: "We map the competitive landscape, identify gaps, and find your unique value proposition that sets you apart.",
    },
    {
      icon: "📈",
      title: "Financial Modeling & Valuation",
      desc: "We build robust financial projections and valuation models that demonstrate potential returns to investors.",
    },
    {
      icon: "📝",
      title: "Business Model Refinement",
      desc: "We validate your business model, revenue streams, and pricing strategy to ensure long-term sustainability.",
    },
    {
      icon: "🎯",
      title: "Investor Pitch Development",
      desc: "We create a compelling narrative and pitch deck that tells your story and attracts investors.",
    },
    {
      icon: "🚀",
      title: "Go-to-Market Strategy",
      desc: "We develop a clear launch strategy that outlines your acquisition channels, milestones, and growth roadmap.",
    },
  ],

  servicesHeading: "Startup Validation Services",
  servicesIntro:
    "Your search for a leading startup validation company may get a halt at Deific Digital. Demand for thorough, data-driven validation is rising across every industry, and so we design extensively comprehensive and actionable validation frameworks. Our startup validation services encompass:",
  servicesList: [
    "Startup valuation & financial modeling",
    "Market opportunity & TAM analysis",
    "Competitive landscape & differentiation mapping",
    "Investor pitch deck creation & refinement",
    "Customer discovery & validation interviews",
    "Risk assessment & mitigation planning",
    "Go-to-market strategy & launch planning",
    "Business model validation & refinement",
  ],

  processPhases: [
    "Discovery & Market Research",
    "Competitive Analysis",
    "Financial Modeling & Valuation",
    "Business Model Refinement",
    "Investor Pitch Development",
    "Customer Validation",
    "Risk Assessment",
    "Go-to-Market Strategy",
  ],

  projects: [
    {
      title: "HealthTech Startup Validation",
      img: "https://picsum.photos/seed/startuphealth/400/250",
      desc: "Secured $2M funding after validation & pitch",
    },
    {
      title: "FinTech Idea Assessment",
      img: "https://picsum.photos/seed/startupfintech/400/250",
      desc: "Identified $50M market opportunity & pivot recommendation",
    },
    {
      title: "Consumer App Validation",
      img: "https://picsum.photos/seed/startupapp/400/250",
      desc: "Validated product-market fit with 100+ customer interviews",
    },
  ],
},










};




