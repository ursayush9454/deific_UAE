
import { useState } from "react";
import { Helmet } from 'react-helmet-async';
import { CTABanner } from "@/components/site/CTABanner";
import vaishnavi from "@/assets/vasihnavi.webp";
import school from "@/assets/school.webp";
import darshan from "@/assets/darshan.webp";
import city from "@/assets/city-app.webp";
import vaishnaviHost from "../assets/vaishnavi.webp";
import knn from "../assets/knn.webp";
import celebration from "../assets/celebration.webp";
import perch from "../assets/perch.webp";
import sundra from "../assets/image.webp";
import smartCity from "../assets/smart-city.webp";

// -------------------------------
// FULL CLIENTS LIST (25)
// -------------------------------
const clients = [
  {
    name: "Kanpur Nagar Nigam",
    industry: "Government",
    img: knn,
  },
  {
    name: "Uttar Pradesh Tourism Department",
    industry: "Tourism",
    img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=100&h=100&fit=crop&crop=center&fm=webp",
  },
  {
    name: "Kanpur Smart City",
    industry: "Civic Tech",
    img: smartCity,
  },
  {
    name: "Nagar Nigam Bareilly",
    industry: "Government",
    img: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=100&h=100&fit=crop&crop=center&fm=webp",
  },
  {
    name: "Nagar Panchayat Pukhrayan",
    industry: "Government",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=100&h=100&fit=crop&crop=center&fm=webp",
  },
  {
    name: "UPMRC Kanpur",
    industry: "Transport",
    img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=100&h=100&fit=crop&crop=center&fm=webp",
  },
  {
    name: "UPDESCO",
    industry: "Electronics",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop&crop=center&fm=webp",
  },
  {
    name: "UPSIDC",
    industry: "Industrial",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=center&fm=webp",
  },
  {
    name: "AGRAWAL HOMES Pvt Ltd",
    industry: "Real Estate",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=100&h=100&fit=crop&crop=center&fm=webp",
  },
  {
    name: "Sandbox Pvt Ltd",
    industry: "Technology",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100&h=100&fit=crop&crop=center&fm=webp",
  },
  {
    name: "T&T GROUP",
    industry: "Real Estate",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=100&h=100&fit=crop&crop=center&fm=webp",
  },
  {
    name: "BHUTANI GROUP",
    industry: "Real Estate",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=100&h=100&fit=crop&crop=center&fm=webp",
  },
  {
    name: "The Perch Multicusin Restaurant",
    industry: "Hospitality",
    img: perch,
  },
  {
    name: "VAISHNAVI HOSPITAL",
    industry: "Healthcare",
    img: vaishnaviHost,
  },
  {
    name: "SUNDRA GROUP",
    industry: "Real Estate",
    img: sundra,
  },
  {
    name: "CA PRAVEEN JINDAL",
    industry: "Finance",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=100&fit=crop&crop=center&fm=webp",
  },
  {
    name: "AMARPRABHA SAMAJIK SANSTHAN",
    industry: "Non-Profit",
    img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=100&h=100&fit=crop&crop=center&fm=webp",
  },
  // {
  //   name: "DROOM",
  //   industry: "Drone Tech",
  //   img: "https://images.unsplash.com/photo-1508614589041-895b88991b3e?w=100&h=100&fit=crop&crop=center&fm=webp",
  // },
  {
    name: "A4 CELEBRATION",
    industry: "Events",
    img: celebration,
  },
  // {
  //   name: "SARVAJAN INSTITUTE OF EDUCATION & EMPLOYMENT",
  //   industry: "Education",
  //   img: "https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=100&h=100&fit=crop&crop=center&fm=webp",
  // },
  {
    name: "COMPARE BRICKS",
    industry: "Construction",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=100&h=100&fit=crop&crop=center&fm=webp",
  },
  {
    name: "VAIDIC PARAMPARA",
    industry: "Wellness",
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&h=100&fit=crop&crop=center&fm=webp",
  },
  {
    name: "Smart Dukaan",
    industry: "E-commerce",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop&crop=center&fm=webp",
  },
  {
    name: "IIPR",
    industry: "Legal/IP",
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=100&h=100&fit=crop&crop=center&fm=webp",
  },
  {
    name: "HBTU",
    industry: "Education",
    img: "https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop&crop=center&fm=webp",
  },
];

// -------------------------------
// FULL PROJECTS LIST (25)
// -------------------------------
const projects = [
  {
    title: "Kanpur Nagar Nigam",
    category: "Government",
    tech: "React, Node.js, MongoDB",
    desc: "Digital governance platform for Kanpur – property tax, grievance redressal, and citizen services.",
    color: "from-red-500 to-rose-700",
    img: knn,
    tag: "Government",
  },
  {
    title: "Uttar Pradesh Tourism Department",
    category: "Tourism",
    tech: "React, Node.js, Google Maps",
    desc: "Heritage tourism portal showcasing Uttar Pradesh's attractions, events, and travel guides.",
    color: "from-orange-500 to-amber-600",
    img: darshan,
    tag: "Tourism",
  },
  {
    title: "Kanpur Smart City",
    category: "Civic Tech",
    tech: "React Native, Node.js",
    desc: "Integrated citizen facilitation app – complaints, utility payments, and real‑time civic updates.",
    color: "from-blue-500 to-indigo-700",
    img: city,
    tag: "Civic",
  },
  // {
  //   title: "Nagar Nigam Bareilly",
  //   category: "Government",
  //   tech: "React, Django, PostgreSQL",
  //   desc: "Municipal management system for Bareilly – taxation, licenses, and public works.",
  //   color: "from-indigo-500 to-purple-700",
  //   img: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=600&h=400&fit=crop&crop=center&fm=webp",
  //   tag: "Government",
  // },
  // {
  //   title: "Nagar Panchayat Pukhrayan",
  //   category: "Government",
  //   tech: "React, Firebase",
  //   desc: "Rural governance platform – panchayat records, schemes, and citizen engagement.",
  //   color: "from-teal-500 to-emerald-600",
  //   img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop&crop=center&fm=webp",
  //   tag: "Government",
  // },
  // {
  //   title: "UPMRC Kanpur",
  //   category: "Transport",
  //   tech: "Flutter, Firebase, Maps API",
  //   desc: "Metro rail management system – ticketing, scheduling, and passenger analytics.",
  //   color: "from-cyan-500 to-blue-600",
  //   img: rickshaw,
  //   tag: "Transport",
  // },
  // {
  //   title: "UPDESCO",
  //   category: "Electronics",
  //   tech: "React, Node.js, AWS",
  //   desc: "Electronics development portal – e‑governance, tenders, and industry collaboration.",
  //   color: "from-purple-500 to-violet-700",
  //   img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&crop=center&fm=webp",
  //   tag: "Government",
  // },
  // {
  //   title: "UPSIDC",
  //   category: "Industrial",
  //   tech: "Next.js, PostgreSQL, Mapbox",
  //   desc: "Industrial infrastructure management – land allocation, utilities, and investor dashboard.",
  //   color: "from-yellow-500 to-orange-600",
  //   img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop&crop=center&fm=webp",
  //   tag: "Government",
  // },
  // {
  //   title: "AGRAWAL HOMES Pvt Ltd",
  //   category: "Real Estate",
  //   tech: "React, CMS, Stripe",
  //   desc: "Luxury property listing platform – project showcases, virtual tours, and online booking.",
  //   color: "from-green-500 to-emerald-700",
  //   img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop&crop=center&fm=webp",
  //   tag: "Real Estate",
  // },
  // {
  //   title: "Sandbox Pvt Ltd",
  //   category: "Technology",
  //   tech: "React, Django, Docker",
  //   desc: "Innovation sandbox for startups – collaboration tools, resource sharing, and mentorship.",
  //   color: "from-gray-500 to-slate-700",
  //   img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop&crop=center&fm=webp",
  //   tag: "EdTech",
  // },
  // {
  //   title: "T&T GROUP",
  //   category: "Real Estate",
  //   tech: "Next.js, GraphQL, MongoDB",
  //   desc: "End‑to‑end real estate CRM – property inventory, client management, and analytics.",
  //   color: "from-amber-500 to-yellow-600",
  //   img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop&crop=center&fm=webp",
  //   tag: "Real Estate",
  // },
  // {
  //   title: "BHUTANI GROUP",
  //   category: "Real Estate",
  //   tech: "React, Node.js, PostgreSQL",
  //   desc: "Construction project management – budgeting, scheduling, and contractor coordination.",
  //   color: "from-lime-500 to-green-600",
  //   img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop&crop=center&fm=webp",
  //   tag: "Real Estate",
  // },
  // {
  //   title: "The Perch Multicusin Restaurant",
  //   category: "Hospitality",
  //   tech: "React, Node.js, Stripe",
  //   desc: "Online ordering, table reservations, and loyalty system for a premium multicuisine restaurant.",
  //   color: "from-pink-500 to-rose-600",
  //   img: perch,
  //   tag: "Events",
  // },
  {
    title: "VAISHNAVI HOSPITAL",
    category: "Healthcare",
    tech: "React, Node.js, Firebase",
    desc: "Complete hospital management – OPD, patient records, billing, and lab integration.",
    color: "from-green-400 to-teal-600",
    img: vaishnavi,
    tag: "Healthcare",
  },
  {
    title: "SUNDRA GROUP",
    category: "Real Estate",
    tech: "Next.js, CMS, MongoDB",
    desc: "Corporate website and property listing platform with dynamic project showcases.",
    color: "from-sky-500 to-blue-700",
    img: sundra,
    tag: "Real Estate",
  },
  // {
  //   title: "CA PRAVEEN JINDAL",
  //   category: "Finance",
  //   tech: "React, Django, PostgreSQL",
  //   desc: "Financial advisory portal – tax planning, investment tracking, and client dashboards.",
  //   color: "from-emerald-500 to-teal-600",
  //   img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop&crop=center&fm=webp",
  //   tag: "EdTech",
  // },
  // {
  //   title: "AMARPRABHA SAMAJIK SANSTHAN",
  //   category: "Non-Profit",
  //   tech: "React, Firebase, Maps",
  //   desc: "Social impact platform – donor management, project tracking, and volunteer coordination.",
  //   color: "from-violet-500 to-purple-600",
  //   img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop&crop=center&fm=webp",
  //   tag: "Government",
  // },
  // {
  //   title: "DROOM",
  //   category: "Drone Tech",
  //   tech: "React, Node.js, WebRTC",
  //   desc: "Drone fleet management – real‑time telemetry, mission planning, and analytics.",
  //   color: "from-sky-500 to-cyan-600",
  //   img: "https://images.unsplash.com/photo-1508614589041-895b88991b3e?w=600&h=400&fit=crop&crop=center&fm=webp",
  //   tag: "Transport",
  // },
  {
    title: "A4 CELEBRATION",
    category: "Events",
    tech: "React, Stripe, Node.js",
    desc: "Complete event management – venue booking, catering, invites, and payment processing.",
    color: "from-pink-500 to-fuchsia-700",
    img: celebration,
    tag: "Events",
  },
  {
    title: "SARVAJAN INSTITUTE OF EDUCATION & EMPLOYMENT",
    category: "Education",
    tech: "React, Node.js, PostgreSQL",
    desc: "Institute ERP – admissions, attendance, exams, and placement management.",
    color: "from-fuchsia-500 to-pink-600",
    img: school,
    tag: "EdTech",
  },
  {
    title: "COMPARE BRICKS",
    category: "Construction",
    tech: "React, Django, PostgreSQL",
    desc: "Construction material comparison platform – pricing, quality, and supplier ratings.",
    color: "from-stone-500 to-gray-700",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop&crop=center&fm=webp",
    tag: "Real Estate",
  },
  {
    title: "VAIDIC PARAMPARA",
    category: "Wellness",
    tech: "React, Node.js, MongoDB",
    desc: "Ayurvedic wellness platform – consultation booking, product sales, and health records.",
    color: "from-rose-500 to-red-600",
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop&crop=center&fm=webp",
    tag: "Healthcare",
  },
  {
    title: "Smart Dukaan",
    category: "E-commerce",
    tech: "Next.js, Stripe, Firebase",
    desc: "Multi‑vendor e‑commerce platform – inventory, order management, and payment gateway.",
    color: "from-orange-500 to-red-600",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center&fm=webp",
    tag: "Events",
  },
  // {
  //   title: "IIPR",
  //   category: "Legal/IP",
  //   tech: "React, Django, PostgreSQL",
  //   desc: "Intellectual property management – patent filing, trademark tracking, and legal analytics.",
  //   color: "from-blue-500 to-indigo-600",
  //   img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop&crop=center&fm=webp",
  //   tag: "Government",
  // },
  // {
  //   title: "HBTU",
  //   category: "Education",
  //   tech: "React Native, Node.js, MongoDB",
  //   desc: "University campus app – academic calendar, attendance, results, and student services.",
  //   color: "from-indigo-500 to-blue-700",
  //   img: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop&crop=center&fm=webp",
  //   tag: "EdTech",
  // },
];

// -------------------------------
// CATEGORIES
// -------------------------------
const categories = ["All", "Government", "Civic", "EdTech", "Transport", "Tourism", "Healthcare", "Events", "Real Estate"];

// -------------------------------
// MAIN COMPONENT
// -------------------------------
export default function PortfolioPage() {
  const [active, setActive] = useState("All");
  const doubled = [...clients, ...clients];

  const filtered = active === "All"
    ? projects
    : projects.filter((p) => p.tag === active);

  return (

    <>
             <Helmet>
             <title>Portfolio | Deific Digital</title>
             <link rel="canonical" href="https://deificdigital.com/portfolio" />
            </Helmet>


    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-red-50/30 py-20 text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-72 h-72 bg-red-50 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-100 rounded-full blur-3xl opacity-40" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4">
          <span className="inline-block rounded-full border border-red-200 bg-red-50 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-red-700 mb-4">
            Portfolio
          </span>
          <h1 className="text-4xl font-extrabold sm:text-5xl text-gray-900">
            Our <span className="text-red-600">Work & Clients</span>
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Transforming ideas into impactful digital products across
            industries.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                active === cat
                  ? "bg-red-600 text-white shadow-md shadow-red-200"
                  : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <div
              key={p.title}
              className="group rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div
                className={`h-48 bg-gradient-to-br ${p.color} flex items-center justify-center relative overflow-hidden`}
              >
                <img src={p.img} className="w-full h-full object-cover" alt={p.title} />
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
                <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/10" />
                <span className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30">
                  {p.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-red-600 transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                  {p.desc}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-medium">
                    {p.tech}
                  </span>
                </div>
              </div>
              <div
                className={`h-0.5 bg-gradient-to-r ${p.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ─── CLIENT MARQUEE (UPDATED - better spacing & image fit) ─── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 40s linear infinite;
          gap: 32px; /* ✅ Brands ke beech zyada gap */
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        .client-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          cursor: default;
          width: 128px; /* ✅ Fixed width for consistency */
        }
        .client-card:hover {
          transform: translateY(-5px);
        }
        .client-logo {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 2px solid #fecaca;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          overflow: hidden;
          flex-shrink: 0;
        }
        .client-logo img {
          width: 100%;
          height: 100%;
          object-fit: cover; /* ✅ Circle ke andar perfectly fit */
          object-position: center;
        }
        .client-name-pill {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 4px 8px;
          text-align: center;
          width: 100%;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }
        .client-name-pill p {
          font-size: 11px;
          font-weight: 700;
          color: #374151;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      ` }} />

      <section className="py-16 bg-gray-50 overflow-hidden">
        <div className="text-center mb-12 px-4">
          <span className="inline-block border border-red-200 text-red-500 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full bg-red-50 mb-4">
            Our Clients
          </span>
          <h2 className="text-4xl font-bold text-gray-900">
            Brands That <span className="text-red-600">Trust Us</span>
          </h2>
          <p className="text-gray-500 mt-3 text-base max-w-md mx-auto">
            25+ happy clients — from startups to government bodies.
          </p>
        </div>

        <div className="overflow-hidden relative">
          <div
            className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, #f9fafb, transparent)" }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #f9fafb, transparent)" }}
          />
          <div className="marquee-track py-4">
            {doubled.map((client, i) => (
              <div key={`client-${i}`} className="client-card flex-shrink-0 flex flex-col items-center gap-2">
                {/* Round logo - ✅ object-fit: cover for perfect circle fit */}
                <div className="client-logo">
                  <img src={client.img} alt={client.name} />
                </div>
                {/* Name pill - ✅ ab max-width nahi hai, full width */}
                <div className="client-name-pill">
                  <p>{client.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-12 mt-14 px-4 flex-wrap">
          {[
            { number: "25+", label: "Happy Clients" },
            { number: "50+", label: "Projects Delivered" },
            { number: "4+", label: "Years Experience" },
            { number: "5★", label: "Avg. Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-red-600">{stat.number}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <CTABanner />
    </div>

    </>
  );
}