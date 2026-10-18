import { Globe2, Smartphone, Gamepad2, Landmark, PhoneCall, Headset, TrendingUp, MessageCircle, type LucideIcon } from "lucide-react";
import { agents as agentsEN, buildServices as buildEN, process as processEN, type Agent } from "./homeContent";

// ─────────────────────────────────────────────────────────────
// All interface text for the homepage, in English and Arabic.
// Region-specific content (feed, industries, FAQ, prices) lives in regions.ts.
// ─────────────────────────────────────────────────────────────

export type Lang = "en" | "ar";

export type Copy = {
  lang: Lang;
  dir: "ltr" | "rtl";
  hero: {
    line1: string;
    on: string;
    autoMode: string;
    switchLabel: string;
    whatsapp: string;
    seePrices: string;
    captionAuto: string;
    captionManual: string;
  };
  console: {
    title: string;
    autoOn: string;
    manual: string;
    handled: string;
    waiting: string;
    missed: string;
    notDone: string;
    waitingFor: (t: string) => string;
    ariaAuto: string;
    ariaManual: string;
  };
  forms: {
    quickLabel: string;
    quickButton: string;
    quickHint: string;
    quickError: string;
    quickDone: string;
    name: string;
    phone: string;
    email: string;
    optional: string;
    business: string;
    choose: string;
    businessTypes: string[];
    need: string;
    needPlaceholder: string;
    submit: string;
    privacy: string;
    doneTitle: string;
    doneText: (first: string) => string;
    errName: string;
    errPhone: string;
    errEmail: string;
    countryCode: string;
  };
  calc: {
    yourNumbers: string;
    currency: string;
    inr: string;
    aed: string;
    people: string;
    salary: string;
    repetitive: string;
    how: string;
    freeUp: string;
    to: string;
    and: string;
    hours: string;
    hoursTail: string;
    planLabel: string;
    planPlaceholder: string;
    planButton: string;
    planError: string;
    planDone: string;
  };
  trust: { before: string; strong: string; after: string; certLine: string; certAria: string; certDetail: Record<string, string> };
  agents: {
    title: string;
    text: string;
    demo: string;
    worksOn: string;
    hire: (n: string) => string;
    list: Agent[];
  };
  flow: {
    title: string;
    text: string;
    steps: { title: string; text: string }[];
    hot: string;
    hotText: string;
    warm: string;
    warmText: string;
    saved: string;
    areas: [string, string][];
  };
  industries: { title: string; text: string; aria: string; demo: (n: string) => string; runs: string; srSuffix: string };
  savings: { title: string; text: string };
  pricing: { title: string; text: string; from: string; quote: string };
  build: {
    title: string;
    text: string;
    learn: string;
    list: { icon: LucideIcon; name: string; text: string; to: string }[];
    product: string;
    propaiText: string;
    seePropai: string;
    ninjaText: string;
    visitNinja: string;
  };
  process: { title: string; steps: { title: string; text: string }[] };
  faqTitle: string;
  cta: { title: string; text: string };
  wa: {
    general: string;
    agent: (n: string) => string;
    industry: (n: string) => string;
    quote: (g: string) => string;
  };
};

// ── English ─────────────────────────────────────────────────
export const COPY_EN: Copy = {
  lang: "en",
  dir: "ltr",
  hero: {
    line1: "Put your business",
    on: "on",
    autoMode: "auto mode.",
    switchLabel: "Auto mode",
    whatsapp: "Chat on WhatsApp",
    seePrices: "See prices in AED",
    captionAuto: "Example of a day on auto mode. Flip the switch to see it without.",
    captionManual: "This is a normal day. Flip the switch in the headline.",
  },
  console: {
    title: "Your business today",
    autoOn: "Auto mode on",
    manual: "Manual mode",
    handled: "Handled by AI this month",
    waiting: "Waiting for your team",
    missed: "Missed call, nobody picked up",
    notDone: "Not done yet",
    waitingFor: (t) => `Waiting for ${t}`,
    ariaAuto: "Example: AI agents handling business tasks automatically",
    ariaManual: "Example: tasks waiting for your team",
  },
  forms: {
    quickLabel: "Your WhatsApp number",
    quickButton: "Get my free audit",
    quickHint: "30-minute call. We show you exactly what can run on auto mode. No cost.",
    quickError: "Enter a valid phone number so we can reach you on WhatsApp.",
    quickDone: "Audit request received. We'll message you on WhatsApp to fix a time.",
    name: "Full name",
    phone: "WhatsApp number",
    email: "Email",
    optional: "(optional)",
    business: "Your business",
    choose: "Choose one",
    businessTypes: [
      "Real estate",
      "Hospital or clinic",
      "CA or accounting firm",
      "Car dealer or rental",
      "Government or smart city",
      "Retail, restaurant or services",
      "Startup or software product",
      "Other",
    ],
    need: "What would you like to automate or build?",
    needPlaceholder: "For example: reply to all property leads on WhatsApp and book site visits",
    submit: "Request my free audit",
    privacy: "We reply on WhatsApp during working hours. Your details stay with us.",
    doneTitle: "Audit request received",
    doneText: (first) => `Thanks, ${first}. We'll message you on WhatsApp to fix a 30-minute call.`,
    errName: "Enter your name.",
    errPhone: "Enter a valid phone number.",
    errEmail: "Enter a valid email or leave it empty.",
    countryCode: "Country code",
  },
  calc: {
    yourNumbers: "Your numbers",
    currency: "Currency",
    inr: "India ₹",
    aed: "UAE AED",
    people: "People doing routine work",
    salary: "Average monthly cost per person",
    repetitive: "Share of their time on repetitive tasks",
    how: "How we calculate: people × cost × repetitive share × 60–80% automated. Hours use 176 working hours a month. This is an estimate; the free audit gives you real numbers.",
    freeUp: "You could free up every month",
    to: "to",
    and: "and",
    hours: "hours",
    hoursTail: "of your team's time for work that grows the business.",
    planLabel: "Get a plan for these numbers on WhatsApp",
    planPlaceholder: "WhatsApp number with country code",
    planButton: "Send my plan",
    planError: "Enter a valid number so we can send the plan.",
    planDone: "We'll send your automation plan on WhatsApp.",
  },
  trust: {
    before: "Trusted by",
    strong: "550+ businesses",
    after: ", hospitals and government bodies.",
    certLine: "Your customer data stays secure and every project follows a certified process.",
    certAria: "Certifications",
    certDetail: { "ISO 9001": "Certified quality management", "ISO/IEC 27001": "Certified information security" },
  },
  agents: {
    title: "AI agents you can hire today",
    text: "Each agent is trained on your business: your services, prices, timings and tone. They work 24 hours a day, never miss a call or message, and hand over to your team the moment a human is needed.",
    demo: "Talk to a live demo agent",
    worksOn: "Works on",
    hire: (n) => `Hire the ${n}`,
    list: agentsEN,
  },
  flow: {
    title: "Automation flows that take 60–80% of the routine off your team",
    text: "A flow connects your WhatsApp, phone, website, ads, CRM, Google Sheets and accounting software, so work moves from one step to the next without anyone pushing it. Here is a typical lead flow we set up.",
    steps: [
      { title: "Lead comes in", text: "WhatsApp, call, website form, Meta or Google ads, property portals" },
      { title: "AI agent replies", text: "Within seconds, any time of day, in the customer's language" },
      { title: "Lead is qualified", text: "Budget, need and timeline captured; scored hot, warm or cold" },
    ],
    hot: "Hot lead",
    hotText: "Meeting booked on your calendar, sales person alerted on WhatsApp",
    warm: "Warm or cold lead",
    warmText: "Follow-up messages run on a schedule until the lead replies",
    saved: "Every step is saved to your CRM or Google Sheet, and the owner gets one summary report at the end of the day.",
    areas: [
      ["Sales", "Lead replies, follow-ups, quotations, meeting booking"],
      ["Customer care", "FAQs, order status, complaints, feedback and reviews"],
      ["Operations", "Reminders, document collection, scheduling, dispatch updates"],
      ["Accounts and HR", "Invoices, payment follow-ups, onboarding, daily MIS reports"],
    ],
  },
  industries: {
    title: "Ready-made automation for your industry",
    text: "We've already built these systems. You get a proven setup, customised to your business, instead of starting from zero.",
    aria: "Industries",
    demo: (n) => `Get a demo for ${n.toLowerCase()}`,
    runs: "What runs on auto mode",
    srSuffix: "automation:",
  },
  savings: {
    title: "How much is manual work costing you?",
    text: "Move the sliders to match your team. You'll see what auto mode could free up every month, and you can get a plan for these exact numbers on WhatsApp.",
  },
  pricing: {
    title: "Prices in AED",
    text: "Clear starting prices for UAE businesses. Tell us what you need and we send a fixed quote in AED after the free audit.",
    from: "from",
    quote: "Get a quote in AED",
  },
  build: {
    title: "We also build the software around it",
    text: "The same team designs and develops web applications, mobile apps, games and city-scale systems, so your automation and your software work as one.",
    learn: "Learn more",
    list: buildEN,
    product: "Our product",
    propaiText:
      "WhatsApp AI and CRM for real estate. Replies to every lead, scores it, and books the site visit, for builders and brokers in India and Dubai.",
    seePropai: "See PropAI",
    ninjaText: "Helps businesses collect genuine customer reviews and rank higher on Google Business Profile.",
    visitNinja: "Visit Review Ninja Pro",
  },
  process: { title: "From first call to auto mode in four steps", steps: processEN },
  faqTitle: "Questions business owners ask us",
  cta: {
    title: "Find out what your business can run on auto mode",
    text: "Book a free 30-minute automation audit. We look at how your team works today and send you a written plan of what to automate first.",
  },
  wa: {
    general: "Hi Deific Digital, I want to automate my business.",
    agent: (n) => `Hi Deific Digital, I'm interested in the ${n} for my business.`,
    industry: (n) => `Hi Deific Digital, I want ${n.toLowerCase()} automation.`,
    quote: (g) => `Hi Deific Digital, please send me a quote in AED for ${g.toLowerCase()}.`,
  },
};

// ── Arabic (UAE) ────────────────────────────────────────────
const agentsAR: Agent[] = [
  {
    icon: PhoneCall,
    name: "موظف استقبال ذكي",
    line: "يرد على كل مكالمة ليلًا ونهارًا ويحجز الموعد.",
    does: ["يرد على المكالمات على مدار الساعة دون أي مكالمة فائتة", "يحجز المواعيد ويعيد جدولتها ويؤكدها", "يحوّل المكالمات العاجلة إلى الشخص المناسب"],
    channels: "الهاتف وواتساب",
  },
  {
    icon: Headset,
    name: "خدمة عملاء ذكية",
    line: "يحل الاستفسارات المتكررة فورًا ويحوّل الباقي لفريقك.",
    does: ["يجيب عن الأسئلة الشائعة من قاعدة معرفتك", "يتابع الطلبات ويفتح التذاكر ويغلقها", "يحوّل المحادثة لفريقك مع كامل التفاصيل"],
    channels: "واتساب ودردشة الموقع والبريد",
  },
  {
    icon: TrendingUp,
    name: "وكيل مبيعات ذكي",
    line: "يرد على العملاء المحتملين خلال ثوانٍ ويحجز الاجتماع.",
    does: ["يصنّف العملاء إلى ساخن ودافئ وبارد", "يتابع العميل حتى يرد", "يحجز الاجتماعات في تقويم فريقك"],
    channels: "واتساب والمكالمات والموقع",
  },
  {
    icon: MessageCircle,
    name: "وكيل واتساب ذكي",
    line: "نشاطك على واتساب يبيع ويخدم العملاء تلقائيًا.",
    does: ["إعداد واجهة WhatsApp Business الرسمية", "كتالوج وروابط دفع ورسائل جماعية", "يتحدث العربية والإنجليزية ولغات أخرى"],
    channels: "واتساب",
  },
];

export const COPY_AR: Copy = {
  lang: "ar",
  dir: "rtl",
  hero: {
    line1: "اجعل أعمالك تعمل",
    on: "على",
    autoMode: "الوضع التلقائي.",
    switchLabel: "الوضع التلقائي",
    whatsapp: "تواصل عبر واتساب",
    seePrices: "الأسعار بالدرهم",
    captionAuto: "مثال على يوم عمل بالوضع التلقائي. أطفئ المفتاح لترى الفرق.",
    captionManual: "هذا يوم عمل عادي. شغّل المفتاح في العنوان.",
  },
  console: {
    title: "أعمالك اليوم",
    autoOn: "الوضع التلقائي يعمل",
    manual: "الوضع اليدوي",
    handled: "مهام أنجزها الذكاء الاصطناعي هذا الشهر",
    waiting: "بانتظار فريقك",
    missed: "مكالمة فائتة، لم يرد أحد",
    notDone: "لم يُنجز بعد",
    waitingFor: (t) => `بانتظار الرد منذ ${t}`,
    ariaAuto: "مثال: وكلاء ذكاء اصطناعي ينجزون مهام العمل تلقائيًا",
    ariaManual: "مثال: مهام بانتظار فريقك",
  },
  forms: {
    quickLabel: "رقم واتساب",
    quickButton: "احصل على تقييم مجاني",
    quickHint: "مكالمة مدتها 30 دقيقة نوضح فيها ما يمكن أتمتته في أعمالك. مجانًا.",
    quickError: "أدخل رقم هاتف صحيحًا لنتواصل معك عبر واتساب.",
    quickDone: "تم استلام طلبك. سنراسلك عبر واتساب لتحديد الموعد.",
    name: "الاسم الكامل",
    phone: "رقم واتساب",
    email: "البريد الإلكتروني",
    optional: "(اختياري)",
    business: "نوع نشاطك",
    choose: "اختر",
    businessTypes: [
      "العقارات",
      "مستشفى أو عيادة",
      "محاسبة وخدمات الشركات",
      "تأجير أو بيع السيارات",
      "جهة حكومية أو مدينة ذكية",
      "تجزئة أو مطاعم أو خدمات",
      "شركة ناشئة أو منتج برمجي",
      "أخرى",
    ],
    need: "ما الذي تريد أتمتته أو بناءه؟",
    needPlaceholder: "مثال: الرد على جميع عملاء العقارات عبر واتساب وحجز المعاينات",
    submit: "اطلب التقييم المجاني",
    privacy: "نرد عبر واتساب خلال ساعات العمل. بياناتك تبقى لدينا.",
    doneTitle: "تم استلام طلبك",
    doneText: (first) => `شكرًا ${first}. سنراسلك عبر واتساب لتحديد مكالمة مدتها 30 دقيقة.`,
    errName: "أدخل اسمك.",
    errPhone: "أدخل رقم هاتف صحيحًا.",
    errEmail: "أدخل بريدًا إلكترونيًا صحيحًا أو اتركه فارغًا.",
    countryCode: "رمز الدولة",
  },
  calc: {
    yourNumbers: "أرقامك",
    currency: "العملة",
    inr: "الهند ₹",
    aed: "الإمارات درهم",
    people: "عدد الموظفين في الأعمال الروتينية",
    salary: "متوسط التكلفة الشهرية للموظف",
    repetitive: "نسبة وقتهم في المهام المتكررة",
    how: "طريقة الحساب: عدد الموظفين × التكلفة × نسبة المهام المتكررة × أتمتة 60–80%. الساعات على أساس 176 ساعة عمل شهريًا. هذا تقدير، والتقييم المجاني يعطيك الأرقام الفعلية.",
    freeUp: "يمكنك توفير ما يصل شهريًا إلى",
    to: "إلى",
    and: "و",
    hours: "ساعة",
    hoursTail: "من وقت فريقك لأعمال تنمّي نشاطك.",
    planLabel: "احصل على خطة لهذه الأرقام عبر واتساب",
    planPlaceholder: "رقم واتساب مع رمز الدولة",
    planButton: "أرسل خطتي",
    planError: "أدخل رقمًا صحيحًا لنرسل لك الخطة.",
    planDone: "سنرسل لك خطة الأتمتة عبر واتساب.",
  },
  trust: {
    before: "يثق بنا",
    strong: "أكثر من 550 نشاطًا تجاريًا",
    after: " ومستشفيات وجهات حكومية.",
    certLine: "بيانات عملائك آمنة، وكل مشروع يتبع إجراءات معتمدة.",
    certAria: "الشهادات",
    certDetail: { "ISO 9001": "شهادة إدارة الجودة", "ISO/IEC 27001": "شهادة أمن المعلومات" },
  },
  agents: {
    title: "وكلاء ذكاء اصطناعي جاهزون للعمل",
    text: "يتدرب كل وكيل على نشاطك: خدماتك وأسعارك ومواعيدك وأسلوبك. يعمل على مدار الساعة، ولا تفوته مكالمة أو رسالة، ويحوّل المحادثة لفريقك عندما تحتاج إلى شخص.",
    demo: "جرّب وكيلًا تجريبيًا مباشرًا",
    worksOn: "يعمل عبر",
    hire: (n) => `اطلب ${n}`,
    list: agentsAR,
  },
  flow: {
    title: "مسارات أتمتة تُنجز 60–80% من الأعمال الروتينية بدلًا من فريقك",
    text: "يربط المسار واتساب والهاتف والموقع والإعلانات ونظام CRM وجداول Google وبرنامج المحاسبة، فينتقل العمل من خطوة إلى أخرى دون تدخل أحد. هذا مثال على مسار عملاء نعدّه عادةً.",
    steps: [
      { title: "وصول عميل جديد", text: "واتساب أو مكالمة أو نموذج الموقع أو إعلانات Meta وGoogle أو بوابات العقارات" },
      { title: "رد الوكيل الذكي", text: "خلال ثوانٍ، في أي وقت، وبلغة العميل" },
      { title: "تقييم العميل", text: "تسجيل الميزانية والاحتياج والتوقيت وتصنيفه ساخنًا أو دافئًا أو باردًا" },
    ],
    hot: "عميل ساخن",
    hotText: "حجز الاجتماع في تقويمك وتنبيه مسؤول المبيعات عبر واتساب",
    warm: "عميل دافئ أو بارد",
    warmText: "رسائل متابعة مجدولة حتى يرد العميل",
    saved: "تُحفظ كل خطوة في نظام CRM أو جدول Google، ويصل للمالك تقرير واحد في نهاية اليوم.",
    areas: [
      ["المبيعات", "الرد على العملاء والمتابعة وعروض الأسعار وحجز الاجتماعات"],
      ["خدمة العملاء", "الأسئلة الشائعة وحالة الطلبات والشكاوى والتقييمات"],
      ["العمليات", "التذكيرات وجمع المستندات والجدولة وتحديثات الشحن"],
      ["الحسابات والموارد البشرية", "الفواتير ومتابعة الدفعات وتعيين الموظفين والتقارير اليومية"],
    ],
  },
  industries: {
    title: "أتمتة جاهزة لقطاعك",
    text: "بنينا هذه الأنظمة من قبل. تحصل على حل مجرّب ومخصص لنشاطك بدلًا من البدء من الصفر.",
    aria: "القطاعات",
    demo: (n) => `اطلب عرضًا لقطاع ${n}`,
    runs: "ما يعمل تلقائيًا",
    srSuffix: "أتمتة:",
  },
  savings: {
    title: "كم يكلّفك العمل اليدوي؟",
    text: "حرّك المؤشرات لتطابق فريقك، وسترى ما يمكن أن يوفره الوضع التلقائي كل شهر، ويمكنك طلب خطة لهذه الأرقام عبر واتساب.",
  },
  pricing: {
    title: "الأسعار بالدرهم الإماراتي",
    text: "أسعار بداية واضحة للشركات في الإمارات. أخبرنا باحتياجك ونرسل لك عرض سعر ثابتًا بالدرهم بعد التقييم المجاني.",
    from: "ابتداءً من",
    quote: "اطلب عرض سعر بالدرهم",
  },
  build: {
    title: "ونبني أيضًا البرمجيات من حولها",
    text: "الفريق نفسه يصمم ويطور تطبيقات الويب وتطبيقات الجوال والألعاب وأنظمة المدن، لتعمل الأتمتة والبرمجيات معًا.",
    learn: "اعرف المزيد",
    list: [
      { icon: Globe2, name: "تطوير تطبيقات الويب", text: "بوابات ولوحات تحكم وأنظمة CRM ومنتجات SaaS مبنية بـ React وNext.js وNode وقابلة للتوسع.", to: "/services/mvp-development" },
      { icon: Smartphone, name: "تطوير تطبيقات الجوال", text: "تطبيقات Android وiOS ومتعددة المنصات للعملاء والموظفين والفرق الميدانية.", to: "/services/android-app-development" },
      { icon: Gamepad2, name: "تطوير الألعاب", text: "ألعاب ترفيهية وتعليمية وجماعية للجوال والويب، من الفكرة حتى الإطلاق.", to: "/contact" },
      { icon: Landmark, name: "حلول المدن الذكية", text: "كاميرات المراقبة الأمنية وأنظمة الضرائب العقارية وخدمات المواطنين للجهات الحكومية.", to: "/contact" },
    ],
    product: "منتجنا",
    propaiText: "ذكاء اصطناعي عبر واتساب ونظام CRM للعقارات. يرد على كل عميل ويقيّمه ويحجز المعاينة، للمطورين والوسطاء في الإمارات والهند.",
    seePropai: "تعرّف على PropAI",
    ninjaText: "يساعد الشركات على جمع تقييمات حقيقية من العملاء والظهور أعلى في ملف Google التجاري.",
    visitNinja: "زيارة Review Ninja Pro",
  },
  process: {
    title: "من أول مكالمة إلى الوضع التلقائي في أربع خطوات",
    steps: [
      { title: "تقييم أتمتة مجاني", text: "مكالمة مدتها 30 دقيقة نحدد فيها الأعمال التي يكررها فريقك يوميًا." },
      { title: "خطة الأتمتة", text: "خطة مكتوبة: أي المهام للوكلاء الأذكياء، وأي المسارات نبنيها، وكم تكلف." },
      { title: "البناء والربط", text: "نُعد الوكلاء والمسارات على واتساب وخط الهاتف ونظام CRM والجداول وبرامجك." },
      { title: "التشغيل والتحسين", text: "ندرّب فريقك ونتابع النتائج ونحسّن المسارات كل شهر." },
    ],
  },
  faqTitle: "أسئلة يطرحها أصحاب الأعمال",
  cta: {
    title: "اكتشف ما يمكن لأعمالك إنجازه بالوضع التلقائي",
    text: "احجز تقييم أتمتة مجانيًا مدته 30 دقيقة. ندرس طريقة عمل فريقك اليوم ونرسل لك خطة مكتوبة بما يجب أتمتته أولًا.",
  },
  wa: {
    general: "مرحبًا Deific Digital، أريد أتمتة أعمالي.",
    agent: (n) => `مرحبًا Deific Digital، أنا مهتم بخدمة ${n} لنشاطي.`,
    industry: (n) => `مرحبًا Deific Digital، أريد أتمتة لقطاع ${n}.`,
    quote: (g) => `مرحبًا Deific Digital، أرجو إرسال عرض سعر بالدرهم لـ ${g}.`,
  },
};
