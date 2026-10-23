import { Link, Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Check, PlayCircle } from "lucide-react";
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

      <section className="px-6 py-16 text-white bg-dd-navy md:px-12 md:py-24">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-2">
          <div>
            <nav className="mb-5 text-[14px] text-white/60"><Link to="/products" className="hover:text-white">Products</Link> / {p.name}</nav>
            <h1 className="text-4xl font-semibold leading-tight font-brand md:text-5xl">{p.headline}</h1>
            <p className="max-w-xl mt-5 text-lg text-white/70">{p.description}</p>
            <div className="flex flex-wrap gap-3 mt-8">
              {external ? <a href={p.ctaTo} target="_blank" rel="noopener" className={btn}>{p.cta}<ArrowRight className="w-4 h-4" /></a> : <Link to={p.ctaTo} className={btn}>{p.cta}<ArrowRight className="w-4 h-4" /></Link>}
              <Link
                to={`/products?demo=${encodeURIComponent(p.slug)}#live-demo`}
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 font-semibold text-white transition hover:border-white/60 hover:bg-white/10"
              >
                <PlayCircle className="w-4 h-4" /> Live Demo
              </Link>
              <Link to="/contact" className="rounded-xl px-6 py-3.5 font-semibold ring-1 ring-white/30 hover:bg-white/10">Talk to us</Link>
            </div>
          </div>
          <img src={p.image} alt={p.name} className="object-cover w-full h-72 rounded-2xl ring-1 ring-white/15 md:h-96" />
        </div>
      </section>

      <section className="px-6 py-16 bg-white md:px-12">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-dd-ink">The problem</h2>
            <p className="mt-3 text-lg text-dd-slate">{p.problem}</p>
            <h2 className="mt-10 text-2xl font-semibold text-dd-ink">Who needs it</h2>
            <div className="flex flex-wrap gap-2 mt-4">{p.madeFor.map((w) => <span key={w} className="rounded-full border border-dd-line px-4 py-2 text-[14px] font-medium text-dd-ink">{w}</span>)}</div>
            <h2 className="mt-10 text-2xl font-semibold text-dd-ink">What you get</h2>
            <ul className="grid gap-3 mt-4">{p.features.map((f) => <li key={f} className="flex items-center gap-3 text-dd-ink"><Check className="w-5 h-5 text-dd-red" />{f}</li>)}</ul>
          </div>
          <div className="p-8 rounded-2xl bg-dd-paper">
            <h2 className="text-2xl font-semibold text-dd-ink">How it works</h2>
            <ol className="grid gap-5 mt-6">
              {p.steps.map((s, i) => (
                <li key={s} className="flex items-start gap-4"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-dd-ink text-[14px] font-semibold text-white">{i + 1}</span><span className="pt-1 text-dd-ink">{s}</span></li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="px-6 border-t border-dd-line bg-dd-paper py-14 md:px-12">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="text-xl font-semibold text-dd-ink">More AI products</h2>
          <div className="grid gap-4 mt-5 md:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} to={`/products/${o.slug}`} className="flex items-center gap-4 p-3 bg-white border rounded-xl border-dd-line hover:border-dd-red/40">
                <img src={o.image} alt="" loading="lazy" className="object-contain w-20 h-16 rounded-lg" />
                <div><p className="font-semibold text-dd-ink">{o.name}</p><p className="text-[13px] text-dd-slate">{o.tag}</p></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
