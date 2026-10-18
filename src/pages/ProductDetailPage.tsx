import { Link, Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Check } from "lucide-react";
import { products } from "../static/productsData";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const p = products.find((x) => x.slug === slug);
  if (!p) return <Navigate to="/products" replace />;
  const external = p.ctaTo.startsWith("http");
  const btn = "inline-flex items-center gap-2 rounded-xl bg-dd-red px-6 py-3.5 font-semibold text-white transition hover:bg-dd-redink";
  const others = products.filter((x) => x.slug !== p.slug);

  return (
    <>
      <Helmet>
        <title>{`${p.name} | Deific Digital`}</title>
        <meta name="description" content={p.description} />
        <link rel="canonical" href={`https://deificdigital.com/products/${p.slug}`} />
      </Helmet>

      <section className="bg-dd-navy px-6 py-16 text-white md:px-12 md:py-24">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-2">
          <div>
            <nav className="mb-5 text-[14px] text-white/60"><Link to="/products" className="hover:text-white">Products</Link> / {p.name}</nav>
            <h1 className="font-brand text-4xl font-semibold leading-tight md:text-5xl">{p.headline}</h1>
            <p className="mt-5 max-w-xl text-lg text-white/70">{p.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {external ? <a href={p.ctaTo} target="_blank" rel="noopener" className={btn}>{p.cta}<ArrowRight className="h-4 w-4" /></a> : <Link to={p.ctaTo} className={btn}>{p.cta}<ArrowRight className="h-4 w-4" /></Link>}
              <Link to="/contact" className="rounded-xl px-6 py-3.5 font-semibold ring-1 ring-white/30 hover:bg-white/10">Talk to us</Link>
            </div>
          </div>
          <img src={p.image} alt={p.name} className="h-72 w-full rounded-2xl object-cover ring-1 ring-white/15 md:h-96" />
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:px-12">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-dd-ink">The problem</h2>
            <p className="mt-3 text-lg text-dd-slate">{p.problem}</p>
            <h2 className="mt-10 text-2xl font-semibold text-dd-ink">Who needs it</h2>
            <div className="mt-4 flex flex-wrap gap-2">{p.madeFor.map((w) => <span key={w} className="rounded-full border border-dd-line px-4 py-2 text-[14px] font-medium text-dd-ink">{w}</span>)}</div>
            <h2 className="mt-10 text-2xl font-semibold text-dd-ink">What you get</h2>
            <ul className="mt-4 grid gap-3">{p.features.map((f) => <li key={f} className="flex items-center gap-3 text-dd-ink"><Check className="h-5 w-5 text-dd-red" />{f}</li>)}</ul>
          </div>
          <div className="rounded-2xl bg-dd-paper p-8">
            <h2 className="text-2xl font-semibold text-dd-ink">How it works</h2>
            <ol className="mt-6 grid gap-5">
              {p.steps.map((s, i) => (
                <li key={s} className="flex items-start gap-4"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-dd-ink text-[14px] font-semibold text-white">{i + 1}</span><span className="pt-1 text-dd-ink">{s}</span></li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-t border-dd-line bg-dd-paper px-6 py-14 md:px-12">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="text-xl font-semibold text-dd-ink">More AI products</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} to={`/products/${o.slug}`} className="flex items-center gap-4 rounded-xl border border-dd-line bg-white p-3 hover:border-dd-red/40">
                <img src={o.image} alt="" loading="lazy" className="h-16 w-20 rounded-lg object-cover" />
                <div><p className="font-semibold text-dd-ink">{o.name}</p><p className="text-[13px] text-dd-slate">{o.tag}</p></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
