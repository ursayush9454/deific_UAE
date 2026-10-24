
import { Link } from "react-router-dom";
import { ArrowRight, PlayCircle } from "lucide-react";
import { products } from "../../static/productsData";

/** Product cards with details and live demo links. */
export function ProductsMegaMenu() {
  return (
    <div className="mx-auto grid max-w-[1200px] gap-8 px-8 py-8 lg:grid-cols-[1fr_240px]">
      <div className="grid grid-cols-4 gap-5">
        {products.map((p) => (
          <div
            key={p.slug}
            className="group/card flex flex-col overflow-hidden rounded-2xl border border-dd-line bg-white transition hover:-translate-y-0.5 hover:border-dd-red/40 hover:shadow-lg"
          >
            <Link
              to={`/products/${p.slug}`}
              className="block overflow-hidden h-28 bg-dd-paper"
              aria-label={`View ${p.name} details`}
            >
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                decoding="async"
                className="object-cover w-full h-full transition duration-300 group-hover/card:scale-105"
              />
            </Link>

            <div className="flex flex-col flex-1 p-4">
              <span className="text-[12px] font-semibold text-dd-red">
                {p.tag}
              </span>

              <p className="mt-0.5 text-[15px] font-semibold text-dd-ink">
                {p.name}
              </p>

              <p className="mt-1 text-[13px] leading-5 text-dd-slate">
                {p.navLine}
              </p>

              <ul className="mt-3 space-y-1 text-[12.5px] text-dd-ink/80">
                {p.features.slice(0, 2).map((f) => (
                  <li key={f} className="flex gap-1.5">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-dd-red" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-2 pt-4 mt-auto">
                <Link
                  to={`/products/${p.slug}`}
                  className="inline-flex items-center gap-1 text-[13px] font-semibold text-dd-ink transition hover:text-dd-red"
                >
                  View details
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                <Link
                  to={`/products#live-demo`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-dd-red/30 bg-red-50 px-3 py-2.5 text-[13px] font-semibold text-dd-red transition hover:border-dd-red hover:bg-dd-red hover:text-white"
                >
                  <PlayCircle className="w-4 h-4" />
                  Live Demo
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <aside className="p-6 text-white rounded-2xl bg-dd-navy">
        <p className="text-[16px] font-semibold">
          AI agents that work on WhatsApp
        </p>

        <p className="mt-2 text-[13px] leading-5 text-white/70">
          Pick a ready-made agent and we set it up for your business.
        </p>

        <div className="mt-5 grid gap-2 text-[14px] font-semibold">
          <Link
            to="/products"
            className="rounded-lg bg-white px-3 py-2.5 text-center text-dd-ink hover:bg-white/90"
          >
            All products
          </Link>

          <Link
            to="/ai-agents"
            className="rounded-lg px-3 py-2.5 text-center ring-1 ring-white/30 hover:bg-white/10"
          >
            Compare AI agents
          </Link>

          <Link
            to="/contact"
            className="rounded-lg bg-dd-red px-3 py-2.5 text-center hover:bg-dd-redink"
          >
            Book a demo
          </Link>
        </div>
      </aside>
    </div>
  );
}
