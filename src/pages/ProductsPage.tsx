import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Check } from "lucide-react";
import { products } from "../static/productsData";

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title>AI Automation Products | Deific Digital</title>
        <meta name="description" content="AI Receptionist, Prop AI, AI Sales Agent and AI Customer Support: ready-made WhatsApp AI agents by Deific Digital." />
        <link rel="canonical" href="https://deificdigital.com/products" />
      </Helmet>
      <section className="bg-dd-navy px-6 py-20 text-white md:px-12">
        <div className="mx-auto max-w-[1200px]">
          <h1 className="max-w-3xl font-brand text-4xl font-semibold leading-tight md:text-5xl">AI automation products for your business</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/70">Ready-made agents that reply, book and qualify on WhatsApp. Choose one and we configure it for you.</p>
        </div>
      </section>
      <section className="bg-white px-6 py-16 md:px-12">
        <div className="mx-auto grid max-w-[1200px] gap-6 md:grid-cols-2">
          {products.map((p) => (
            <Link key={p.slug} to={`/products/${p.slug}`} className="group overflow-hidden rounded-2xl border border-dd-line transition hover:border-dd-red/40 hover:shadow-xl">
              <div className="h-48 overflow-hidden bg-dd-paper">
                <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <span className="text-[13px] font-semibold text-dd-red">{p.tag}</span>
                <h2 className="mt-1 text-2xl font-semibold text-dd-ink">{p.name}</h2>
                <p className="mt-2 text-dd-slate">{p.description}</p>
                <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-[14px] text-dd-ink/80"><Check className="h-4 w-4 text-dd-red" />{f}</li>
                  ))}
                </ul>
                <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-dd-ink group-hover:text-dd-red">View details <ArrowRight className="h-4 w-4" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
