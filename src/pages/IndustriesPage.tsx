import { CTABanner } from "@/components/site/CTABanner";
import { SectionHeading } from "@/components/site/SectionHeading";

const industries = [
  { icon: "🏥", title: "Healthcare", desc: "Telemedicine, EHR systems, appointment booking, and health monitoring apps." },
  { icon: "💰", title: "FinTech", desc: "Payment gateways, banking apps, investment platforms, and fraud detection." },
  { icon: "🛒", title: "E-Commerce", desc: "Online stores, marketplaces, inventory management, and order tracking." },
  { icon: "📚", title: "EdTech", desc: "LMS platforms, e-learning apps, virtual classrooms, and assessment tools." },
  { icon: "🏭", title: "Manufacturing", desc: "ERP systems, supply chain management, and IoT-powered production tracking." },
  { icon: "🏨", title: "Hospitality", desc: "Hotel booking, restaurant management, and customer loyalty platforms." },
  { icon: "🚚", title: "Logistics", desc: "Fleet tracking, route optimization, warehouse management, and last-mile delivery." },
  { icon: "🏗️", title: "Real Estate", desc: "Property listing platforms, virtual tours, and CRM for agents." },
];

export default function IndustriesPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-gray-50 to-white py-16 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <span className="inline-block rounded-full border border-red-200 bg-red-50 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-red-700 mb-4">
            Industries
          </span>
          <h1 className="text-4xl font-extrabold sm:text-5xl">
            Industries We <span className="text-red-700">Serve</span>
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Deep domain expertise across diverse verticals to deliver solutions that truly work.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind) => (
            <div
              key={ind.title}
              className="group rounded-2xl border border-border bg-white p-6 shadow-sm hover:shadow-md hover:border-red-200 hover:-translate-y-1 transition-all text-center"
            >
              <div className="text-5xl mb-4">{ind.icon}</div>
              <h3 className="font-bold group-hover:text-red-700 transition-colors mb-2">{ind.title}</h3>
              <p className="text-sm text-muted-foreground">{ind.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
