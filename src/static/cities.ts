// ─────────────────────────────────────────────────────────────
// India city data for /software-company-in-<slug> pages.
// To add a city: add one object below, then re-run the sitemap
// generator (node scripts/generate-sitemap.mjs) and build.
//
// Keep every field specific to the city. Do NOT copy-paste the same
// text across cities, Google treats that as thin / doorway content.
// `office` is only set where Deific really has an office.
// ─────────────────────────────────────────────────────────────

export type City = {
  slug: string;
  name: string;
  state: string;
  region: "North" | "South" | "West" | "East" | "Central" | "North-East";
  lat: number;
  lng: number;
  /** One city-specific sentence used in the hero and the meta description. */
  intro: string;
  /** Real localities / tech parks, used in copy + schema. */
  areas: string[];
  /** [industry, what software / AI does for it in this city] */
  industries: [string, string][];
  /** Slugs of nearby cities for internal linking. */
  nearby: string[];
  office?: { label: string; address: string };
  /** Pages we push hardest for "top / best software company in <city>". */
  featured?: boolean;
  /** Real, verifiable work for this city (E-E-A-T). Only add what is true. */
  proof?: string[];
};

export const CITIES: City[] = [
  // ── Delhi NCR ──────────────────────────────────────────────
  {
    slug: "delhi", name: "Delhi", state: "Delhi", region: "North", lat: 28.6139, lng: 77.209,
    intro: "Custom software, mobile apps and AI automation for Delhi businesses, from Nehru Place and Okhla to Connaught Place and Dwarka.",
    areas: ["Nehru Place", "Connaught Place", "Okhla", "Saket", "Dwarka", "Karol Bagh"],
    industries: [
      ["Wholesale & trading", "Inventory, GST billing and WhatsApp order-taking for markets like Karol Bagh and Sadar Bazar."],
      ["Coaching & education", "Admission CRM, fee reminders and parent apps for coaching hubs such as Mukherjee Nagar."],
      ["Startups & agencies", "MVPs and internal tools built fast so a Delhi startup can launch in weeks, not quarters."],
    ],
    nearby: ["noida", "gurugram", "ghaziabad", "meerut"],
    featured: true,
  },
  {
    slug: "noida", name: "Noida", state: "Uttar Pradesh", region: "North", lat: 28.5355, lng: 77.391,
    intro: "Our branch office is in Sector 63, Noida. Meet our team in person for software development, mobile apps and AI agents.",
    areas: ["Sector 62", "Sector 63", "Sector 126", "Sector 135", "Greater Noida", "Noida Expressway"],
    industries: [
      ["IT & ITeS", "Dedicated dev teams, product engineering and QA for companies on the Noida Expressway and Sector 62."],
      ["Electronics & manufacturing", "ERP, production tracking and dealer portals for units in Greater Noida and Sector 80."],
      ["Real estate", "Lead capture, WhatsApp follow-up and site-visit booking for Noida and Greater Noida projects."],
    ],
    nearby: ["delhi", "ghaziabad", "gurugram", "meerut"],
    office: { label: "Branch office", address: "C-270, Sector 63, Noida, Uttar Pradesh 201301, India" },
  },
  {
    slug: "gurugram", name: "Gurugram", state: "Haryana", region: "North", lat: 28.4595, lng: 77.0266,
    intro: "Software development and AI automation for Gurugram companies in Cyber City, Udyog Vihar and Golf Course Road.",
    areas: ["Cyber City", "Udyog Vihar", "Golf Course Road", "Sohna Road", "MG Road", "Sector 44"],
    industries: [
      ["Corporate services & BPO", "Workflow automation, dashboards and AI voice agents that cut manual follow-up in service teams."],
      ["Fintech & insurance", "Secure customer portals, KYC flows and policy-renewal reminders on WhatsApp."],
      ["Real estate", "Instant lead reply and viewing booking for Gurugram's residential and commercial projects."],
    ],
    nearby: ["delhi", "noida", "ghaziabad", "chandigarh"],
  },
  {
    slug: "ghaziabad", name: "Ghaziabad", state: "Uttar Pradesh", region: "North", lat: 28.6692, lng: 77.4538,
    intro: "Software, app and automation development for Ghaziabad businesses in Indirapuram, Vaishali and the Sahibabad industrial area.",
    areas: ["Indirapuram", "Vaishali", "Raj Nagar Extension", "Sahibabad", "Kaushambi", "Crossings Republik"],
    industries: [
      ["Manufacturing", "Production, dispatch and dealer-order software for units around Sahibabad and Loni."],
      ["Real estate", "CRM and WhatsApp automation for the many Raj Nagar Extension and Indirapuram projects."],
      ["Education", "School apps, fee collection and attendance tools for private schools and colleges."],
    ],
    nearby: ["noida", "delhi", "meerut", "gurugram"],
  },
  {
    slug: "meerut", name: "Meerut", state: "Uttar Pradesh", region: "North", lat: 28.9845, lng: 77.7064,
    intro: "Custom software and mobile apps for Meerut's sports-goods makers, traders and schools, built and supported remotely.",
    areas: ["Shastri Nagar", "Delhi Road", "Abu Lane", "Begum Bridge", "Garh Road", "Modipuram"],
    industries: [
      ["Sports goods", "B2B catalogue apps, export order tracking and WhatsApp quotations for sports-goods manufacturers."],
      ["Wholesale & trading", "Billing, stock and credit-ledger software for Meerut's large trading community."],
      ["Education", "Admission and fee management for colleges and coaching institutes."],
    ],
    nearby: ["ghaziabad", "delhi", "noida", "dehradun"],
  },

  // ── Uttar Pradesh ──────────────────────────────────────────
  {
    slug: "kanpur", name: "Kanpur", state: "Uttar Pradesh", region: "North", lat: 26.4499, lng: 80.3319,
    intro: "Deific Digital is headquartered in Kanpur at the STPI building in Lakhanpur. We build software, apps and AI agents for Kanpur's industry, healthcare and government.",
    areas: ["Lakhanpur", "Swaroop Nagar", "Civil Lines", "Kakadeo", "Kidwai Nagar", "Govind Nagar"],
    industries: [
      ["Leather, textile & manufacturing", "ERP, dispatch tracking and dealer apps for Kanpur's long-standing industrial units."],
      ["Hospitals & clinics", "AI receptionist, appointment booking and reminders, as built for Vaishnavi Hospital."],
      ["Government & smart city", "Citizen apps and dashboards, as delivered for Kanpur Nagar Nigam."],
    ],
    nearby: ["lucknow", "prayagraj", "agra", "varanasi"],
    featured: true,
    proof: ["Kanpur Nagar Nigam (municipal corporation)", "Vaishnavi Hospital", "Green Park Stadium, Kanpur", "Sundra Group, A4 Celebration and The Perch"],
    office: { label: "Registered office", address: "8th Floor, STPI, A1/4 UPSIDA Building, Lakhanpur, Kanpur, Uttar Pradesh 208024, India" },
  },
  {
    slug: "lucknow", name: "Lucknow", state: "Uttar Pradesh", region: "North", lat: 26.8467, lng: 80.9462,
    intro: "Software development and AI automation for Lucknow businesses in Gomti Nagar, Hazratganj and Aliganj, one hour from our Kanpur headquarters.",
    areas: ["Gomti Nagar", "Hazratganj", "Aliganj", "Vibhuti Khand", "Indira Nagar", "Chinhat"],
    industries: [
      ["Government & public sector", "Portals, e-governance dashboards and citizen service apps for departments and contractors."],
      ["Healthcare & education", "Hospital management, appointment booking and student apps for Lucknow's many institutes."],
      ["Real estate", "Lead follow-up automation for Gomti Nagar Extension and Sultanpur Road projects."],
    ],
    nearby: ["kanpur", "prayagraj", "varanasi", "agra"],
  },
  {
    slug: "agra", name: "Agra", state: "Uttar Pradesh", region: "North", lat: 27.1767, lng: 78.0081,
    intro: "Booking systems, apps and AI agents for Agra's hotels, tour operators and footwear exporters.",
    areas: ["Sanjay Place", "Fatehabad Road", "Sikandra", "Taj Ganj", "Kamla Nagar", "Sadar Bazar"],
    industries: [
      ["Tourism & hotels", "Direct booking engines, WhatsApp enquiry agents and multilingual guest support near the Taj Mahal circuit."],
      ["Leather & footwear", "Export order tracking, catalogue apps and buyer portals for Agra's footwear cluster."],
      ["Marble & handicrafts", "Online catalogues and WhatsApp-based quotation flows for artisans and exporters."],
    ],
    nearby: ["kanpur", "meerut", "delhi", "lucknow"],
  },
  {
    slug: "varanasi", name: "Varanasi", state: "Uttar Pradesh", region: "North", lat: 25.3176, lng: 82.9739,
    intro: "Apps, websites and automation for Varanasi's hospitality, silk and education businesses.",
    areas: ["Lanka", "Sigra", "Bhelupur", "Cantonment", "Godowlia", "Rathyatra"],
    industries: [
      ["Hospitality & pilgrim tourism", "Booking, itinerary and WhatsApp support for hotels, guest houses and tour operators."],
      ["Silk & handloom", "Online catalogues, B2B ordering and export documentation tools for weavers and showrooms."],
      ["Education", "Admission, fee and parent communication apps for colleges and coaching centres."],
    ],
    nearby: ["prayagraj", "lucknow", "kanpur", "patna"],
  },
  {
    slug: "prayagraj", name: "Prayagraj", state: "Uttar Pradesh", region: "North", lat: 25.4358, lng: 81.8463,
    intro: "Software and automation for Prayagraj's coaching institutes, clinics and local businesses, delivered remotely with on-site visits when needed.",
    areas: ["Civil Lines", "Naini", "Allenganj", "Teliarganj", "Katra", "Jhunsi"],
    industries: [
      ["Coaching & competitive exams", "Student CRM, test-series apps and automatic fee reminders for exam-prep institutes."],
      ["Healthcare", "Appointment booking, reminders and report delivery on WhatsApp for clinics and nursing homes."],
      ["Government contractors & trade", "Billing, project tracking and document management for local firms."],
    ],
    nearby: ["varanasi", "kanpur", "lucknow", "patna"],
  },

  // ── West ───────────────────────────────────────────────────
  {
    slug: "mumbai", name: "Mumbai", state: "Maharashtra", region: "West", lat: 19.076, lng: 72.8777,
    intro: "Custom software, mobile apps and AI agents for Mumbai companies in BKC, Andheri, Powai and Navi Mumbai.",
    areas: ["Bandra Kurla Complex", "Andheri", "Powai", "Lower Parel", "Navi Mumbai", "Thane"],
    industries: [
      ["Finance & trading", "Client portals, reporting dashboards and compliance reminders for broking and advisory firms."],
      ["Media & entertainment", "Content workflow tools, asset trackers and audience apps."],
      ["Logistics & import-export", "Shipment tracking, documentation automation and customer update bots around the Mumbai ports."],
    ],
    nearby: ["pune", "surat", "ahmedabad", "nagpur"],
  },
  {
    slug: "pune", name: "Pune", state: "Maharashtra", region: "West", lat: 18.5204, lng: 73.8567,
    intro: "Product engineering, mobile apps and automation for Pune companies in Hinjewadi, Kharadi, Baner and Magarpatta.",
    areas: ["Hinjewadi", "Kharadi", "Baner", "Magarpatta", "Viman Nagar", "Pimpri-Chinchwad"],
    industries: [
      ["IT & product companies", "Extra engineering capacity, QA and MVP builds for Pune's software ecosystem."],
      ["Automotive & manufacturing", "Shop-floor tracking, vendor portals and maintenance software for Pimpri-Chinchwad and Chakan units."],
      ["Education & training", "Learning platforms, admission CRM and student apps."],
    ],
    nearby: ["mumbai", "nagpur", "hyderabad", "bengaluru"],
  },
  {
    slug: "ahmedabad", name: "Ahmedabad", state: "Gujarat", region: "West", lat: 23.0225, lng: 72.5714,
    intro: "Software development and automation for Ahmedabad businesses on SG Highway, Prahlad Nagar and in GIFT City.",
    areas: ["SG Highway", "Prahlad Nagar", "Navrangpura", "Satellite", "Bopal", "GIFT City"],
    industries: [
      ["Textile & trading", "Order, stock and payment-reminder automation for Ahmedabad's trading houses."],
      ["Pharma & chemicals", "Batch tracking, dealer ordering and compliance document tools."],
      ["Fintech & services", "Customer portals, KYC flows and WhatsApp support for finance firms."],
    ],
    nearby: ["vadodara", "surat", "mumbai", "indore"],
  },
  {
    slug: "surat", name: "Surat", state: "Gujarat", region: "West", lat: 21.1702, lng: 72.8311,
    intro: "Apps, ERP and WhatsApp automation for Surat's textile, diamond and trading businesses.",
    areas: ["Ring Road", "Adajan", "Vesu", "Varachha", "Udhna", "Pal"],
    industries: [
      ["Textile & embroidery", "Fabric stock, agent ordering and payment follow-up tools for the Ring Road textile markets."],
      ["Diamond & jewellery", "Inventory, certificate tracking and buyer portals for polishing units and traders."],
      ["Retail & trading", "Billing, GST and WhatsApp catalogue ordering."],
    ],
    nearby: ["ahmedabad", "vadodara", "mumbai", "indore"],
  },
  {
    slug: "vadodara", name: "Vadodara", state: "Gujarat", region: "West", lat: 22.3072, lng: 73.1812,
    intro: "Software and automation for Vadodara's engineering, chemical and services companies.",
    areas: ["Alkapuri", "Gotri", "Makarpura GIDC", "Manjalpur", "Karelibaug", "Vasna"],
    industries: [
      ["Engineering & chemicals", "Plant maintenance, vendor and dispatch software for GIDC units."],
      ["Education & healthcare", "Admission tools, appointment systems and parent or patient apps."],
      ["Services & trading", "CRM, billing and automated follow-up for growing local firms."],
    ],
    nearby: ["ahmedabad", "surat", "indore", "mumbai"],
  },
  {
    slug: "nagpur", name: "Nagpur", state: "Maharashtra", region: "Central", lat: 21.1458, lng: 79.0882,
    intro: "Custom software and apps for Nagpur's logistics, healthcare and trading businesses, including the MIHAN area.",
    areas: ["Sitabuldi", "Dharampeth", "Sadar", "Manish Nagar", "MIHAN", "Wardha Road"],
    industries: [
      ["Logistics & warehousing", "Fleet, consignment tracking and customer update automation for central-India freight."],
      ["Healthcare", "Hospital management, booking and reminder bots for Nagpur's medical sector."],
      ["Trade & agri business", "Mandi-rate apps, billing and dealer ordering."],
    ],
    nearby: ["pune", "indore", "raipur", "bhopal"],
  },

  // ── South ──────────────────────────────────────────────────
  {
    slug: "bengaluru", name: "Bengaluru", state: "Karnataka", region: "South", lat: 12.9716, lng: 77.5946,
    intro: "Engineering support, MVPs and AI agents for Bengaluru startups and product teams in Whitefield, Koramangala and HSR Layout.",
    areas: ["Whitefield", "Electronic City", "Koramangala", "HSR Layout", "Indiranagar", "Manyata Tech Park"],
    industries: [
      ["SaaS & product startups", "Fast MVP builds, mobile apps and extended dev teams at India-based cost."],
      ["E-commerce & D2C", "WhatsApp commerce, support automation and order-update bots."],
      ["Healthtech & fintech", "Secure apps, appointment flows and customer-support AI agents."],
    ],
    nearby: ["chennai", "hyderabad", "coimbatore", "kochi"],
  },
  {
    slug: "hyderabad", name: "Hyderabad", state: "Telangana", region: "South", lat: 17.385, lng: 78.4867,
    intro: "Software, mobile app and automation development for Hyderabad companies in HITEC City, Gachibowli and Madhapur.",
    areas: ["HITEC City", "Gachibowli", "Madhapur", "Kondapur", "Banjara Hills", "Secunderabad"],
    industries: [
      ["IT services & product", "Additional engineering capacity, QA and rapid prototypes for HITEC City teams."],
      ["Pharma & life sciences", "Document workflow, batch records and dealer-order software."],
      ["Real estate", "Lead response automation and site-visit scheduling for Hyderabad's fast-growing projects."],
    ],
    nearby: ["bengaluru", "visakhapatnam", "pune", "nagpur"],
  },
  {
    slug: "chennai", name: "Chennai", state: "Tamil Nadu", region: "South", lat: 13.0827, lng: 80.2707,
    intro: "Software development and AI automation for Chennai businesses along OMR, in Guindy and across Ambattur.",
    areas: ["OMR", "Guindy", "Tidel Park", "Ambattur", "Anna Nagar", "T. Nagar"],
    industries: [
      ["Automotive & manufacturing", "Supplier portals, production tracking and maintenance software for Chennai's auto cluster."],
      ["Healthcare", "Multi-branch appointment systems, reminders and report delivery."],
      ["IT & services", "MVPs, mobile apps and support automation for growing teams."],
    ],
    nearby: ["bengaluru", "coimbatore", "hyderabad", "kochi"],
  },
  {
    slug: "coimbatore", name: "Coimbatore", state: "Tamil Nadu", region: "South", lat: 11.0168, lng: 76.9558,
    intro: "Software and apps for Coimbatore's textile, pump-manufacturing and engineering MSMEs.",
    areas: ["Peelamedu", "Saravanampatti", "RS Puram", "Race Course", "Singanallur", "Avinashi Road"],
    industries: [
      ["Textile & spinning", "Order, yarn-stock and payment tracking for mills and traders."],
      ["Engineering & pumps", "Dealer ordering, service tickets and spare-part portals."],
      ["Education", "College and school management, admission CRM and parent apps."],
    ],
    nearby: ["chennai", "kochi", "bengaluru", "hyderabad"],
  },
  {
    slug: "kochi", name: "Kochi", state: "Kerala", region: "South", lat: 9.9312, lng: 76.2673,
    intro: "Apps, websites and automation for Kochi businesses around Infopark, Kakkanad and the port area.",
    areas: ["Infopark", "Kakkanad", "Edappally", "Marine Drive", "Vyttila", "Fort Kochi"],
    industries: [
      ["Tourism & hospitality", "Booking engines, WhatsApp enquiry agents and review automation for hotels and houseboats."],
      ["Shipping & exports", "Shipment status automation and documentation tools."],
      ["Healthcare", "Appointment booking, reminders and patient communication."],
    ],
    nearby: ["coimbatore", "bengaluru", "chennai", "hyderabad"],
  },
  {
    slug: "visakhapatnam", name: "Visakhapatnam", state: "Andhra Pradesh", region: "South", lat: 17.6868, lng: 83.2185,
    intro: "Software and automation for Visakhapatnam's port, logistics, IT and pharma companies.",
    areas: ["MVP Colony", "Rushikonda", "Gajuwaka", "Dwaraka Nagar", "Madhurawada", "Siripuram"],
    industries: [
      ["Port & logistics", "Consignment tracking, driver apps and customer update bots."],
      ["Pharma & manufacturing", "Batch, dealer and compliance-document workflows."],
      ["IT & startups", "MVP development and mobile apps for Vizag's growing startup base."],
    ],
    nearby: ["hyderabad", "bhubaneswar", "chennai", "bengaluru"],
  },

  // ── Central / North ────────────────────────────────────────
  {
    slug: "jaipur", name: "Jaipur", state: "Rajasthan", region: "North", lat: 26.9124, lng: 75.7873,
    intro: "Software, apps and automation for Jaipur's jewellery, handicraft, tourism and education businesses.",
    areas: ["Malviya Nagar", "Vaishali Nagar", "Mansarovar", "C-Scheme", "Sitapura", "Jagatpura"],
    industries: [
      ["Gems & jewellery", "Inventory, certificate tracking and B2B buyer portals for Johari Bazaar traders and exporters."],
      ["Textile & handicrafts", "Catalogue apps, export orders and WhatsApp quotations."],
      ["Tourism & hospitality", "Direct bookings and multilingual guest support for heritage hotels."],
    ],
    nearby: ["delhi", "agra", "chandigarh", "indore"],
  },
  {
    slug: "indore", name: "Indore", state: "Madhya Pradesh", region: "Central", lat: 22.7196, lng: 75.8577,
    intro: "Software development and automation for Indore companies in Vijay Nagar, Palasia and the Super Corridor.",
    areas: ["Vijay Nagar", "Palasia", "AB Road", "Super Corridor", "Rau", "Bhawarkuan"],
    industries: [
      ["Trading & food manufacturing", "Distributor ordering, billing and route-wise dispatch software."],
      ["IT & startups", "MVP builds and extended dev teams for Indore's growing tech scene."],
      ["Pharma & healthcare", "Dealer portals, batch records and appointment workflows."],
    ],
    nearby: ["bhopal", "ahmedabad", "vadodara", "nagpur"],
  },
  {
    slug: "bhopal", name: "Bhopal", state: "Madhya Pradesh", region: "Central", lat: 23.2599, lng: 77.4126,
    intro: "Apps, portals and automation for Bhopal's government vendors, hospitals and educational institutions.",
    areas: ["MP Nagar", "Arera Colony", "Kolar Road", "Shahpura", "Hoshangabad Road", "Bittan Market"],
    industries: [
      ["Government & e-governance", "Departmental portals, citizen apps and reporting dashboards for state-level work."],
      ["Healthcare", "Hospital and clinic management, booking and reminders."],
      ["Education", "Admission, fee and exam-result apps for institutes."],
    ],
    nearby: ["indore", "nagpur", "raipur", "lucknow"],
  },
  {
    slug: "raipur", name: "Raipur", state: "Chhattisgarh", region: "Central", lat: 21.2514, lng: 81.6296,
    intro: "Software and automation for Raipur and Naya Raipur businesses in steel, trading and services.",
    areas: ["Shankar Nagar", "Naya Raipur", "Pandri", "Telibandha", "Tatibandh", "Devendra Nagar"],
    industries: [
      ["Steel & mining supply chain", "Vendor, dispatch and weighbridge-integrated software."],
      ["Government & contractors", "Tender tracking, billing and project dashboards."],
      ["Healthcare & education", "Appointment, fee and student communication systems."],
    ],
    nearby: ["nagpur", "bhopal", "ranchi", "bhubaneswar"],
  },
  {
    slug: "chandigarh", name: "Chandigarh", state: "Chandigarh", region: "North", lat: 30.7333, lng: 76.7794,
    intro: "Software and AI agents for Chandigarh, Mohali and Panchkula businesses, from the IT Park to Sector 17.",
    areas: ["Chandigarh IT Park", "Sector 17", "Mohali Phase 8", "Panchkula", "Zirakpur", "Sector 34"],
    industries: [
      ["IT & startups", "MVPs, mobile apps and dev teams for the Tricity startup ecosystem."],
      ["Education & immigration consultancy", "Lead CRM, document collection and WhatsApp follow-up for study-abroad and visa consultants."],
      ["Healthcare", "Clinic booking, reminders and teleconsult apps."],
    ],
    nearby: ["delhi", "gurugram", "dehradun", "jaipur"],
  },
  {
    slug: "dehradun", name: "Dehradun", state: "Uttarakhand", region: "North", lat: 30.3165, lng: 78.0322,
    intro: "Apps, websites and automation for Dehradun's education, tourism and healthcare businesses.",
    areas: ["Rajpur Road", "Sahastradhara Road", "Race Course", "IT Park", "Clement Town", "Ballupur"],
    industries: [
      ["Education", "Admission CRM, parent apps and fee automation for schools and colleges."],
      ["Tourism & hospitality", "Booking engines and WhatsApp enquiry agents for hotels, resorts and travel agents."],
      ["Healthcare", "Appointment booking and patient reminder automation."],
    ],
    nearby: ["chandigarh", "meerut", "delhi", "ghaziabad"],
  },

  // ── East / North-East ──────────────────────────────────────
  {
    slug: "kolkata", name: "Kolkata", state: "West Bengal", region: "East", lat: 22.5726, lng: 88.3639,
    intro: "Software, mobile apps and automation for Kolkata companies in Salt Lake Sector V, New Town and Park Street.",
    areas: ["Salt Lake Sector V", "New Town", "Park Street", "Ballygunge", "Howrah", "Rajarhat"],
    industries: [
      ["IT & ITeS", "Dedicated developers and QA for Sector V and New Town teams."],
      ["Trading & retail", "Billing, inventory and WhatsApp catalogue ordering for Burrabazar-style wholesalers."],
      ["Healthcare & education", "Appointment systems, student apps and fee automation."],
    ],
    nearby: ["bhubaneswar", "ranchi", "patna", "guwahati"],
  },
  {
    slug: "patna", name: "Patna", state: "Bihar", region: "East", lat: 25.5941, lng: 85.1376,
    intro: "Apps and automation for Patna's coaching institutes, clinics and trading businesses.",
    areas: ["Boring Road", "Kankarbagh", "Patliputra Colony", "Rajendra Nagar", "Danapur", "Bailey Road"],
    industries: [
      ["Coaching & education", "Student CRM, test apps and automatic fee reminders for exam-prep institutes."],
      ["Healthcare", "Clinic and hospital booking, reminders and report delivery."],
      ["Trading & government vendors", "Billing, tender tracking and stock software."],
    ],
    nearby: ["varanasi", "ranchi", "lucknow", "kolkata"],
  },
  {
    slug: "ranchi", name: "Ranchi", state: "Jharkhand", region: "East", lat: 23.3441, lng: 85.3096,
    intro: "Software and automation for Ranchi's steel-linked businesses, hospitals and institutes.",
    areas: ["Lalpur", "Kanke Road", "Main Road", "Harmu", "Morabadi", "Bariatu"],
    industries: [
      ["Steel & mining ancillaries", "Vendor management, dispatch and billing software."],
      ["Healthcare", "Hospital management, booking and reminder automation."],
      ["Education", "Admission, fee and parent apps for schools and colleges."],
    ],
    nearby: ["patna", "kolkata", "bhubaneswar", "raipur"],
  },
  {
    slug: "bhubaneswar", name: "Bhubaneswar", state: "Odisha", region: "East", lat: 20.2961, lng: 85.8245,
    intro: "Software, apps and AI automation for Bhubaneswar companies around Infocity, Chandrasekharpur and Saheed Nagar.",
    areas: ["Infocity", "Chandrasekharpur", "Saheed Nagar", "Patia", "Jaydev Vihar", "Nayapalli"],
    industries: [
      ["IT & startups", "MVPs and dev teams for Odisha's growing startup ecosystem."],
      ["Education", "Student platforms, admission CRM and fee automation."],
      ["Government & public sector", "Portals and dashboards for departments and vendors."],
    ],
    nearby: ["kolkata", "visakhapatnam", "ranchi", "raipur"],
  },
  {
    slug: "guwahati", name: "Guwahati", state: "Assam", region: "North-East", lat: 26.1445, lng: 91.7362,
    intro: "Apps and automation for Guwahati businesses serving the whole North-East, from GS Road to Beltola.",
    areas: ["GS Road", "Beltola", "Dispur", "Paltan Bazaar", "Six Mile", "Zoo Road"],
    industries: [
      ["Regional trade & distribution", "Billing, dealer ordering and logistics tracking for North-East distributors."],
      ["Healthcare", "Appointment booking and patient communication for hospitals and diagnostic centres."],
      ["Education & tourism", "Admission tools and booking systems for institutes and tour operators."],
    ],
    nearby: ["kolkata", "patna", "ranchi", "bhubaneswar"],
  },
];

export const CITY_BY_SLUG: Record<string, City> = Object.fromEntries(CITIES.map((c) => [c.slug, c]));

export const cityPath = (slug: string) => `/software-company-in-${slug}`;
export const INDIA_HUB_PATH = "/software-company-in-india";
