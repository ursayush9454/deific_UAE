import { CTABanner } from "@/components/site/CTABanner";
import { Helmet } from 'react-helmet-async';
import { Link } from "react-router-dom";

const posts = [
  {
    title: "How to Choose the Right Digital Agency in 2026: Software Development, UX, SEO, PPC & Web Design",
    cat: "Agency Guide",
    date: "Aug 21, 2026",
    read: "9 min",
    excerpt:
      "Software dev, UX, SEO, PPC or full-service? Here's how to pick the right digital partner for your business, wherever you're based.",
    slug: "how-to-choose-the-right-digital-agency",
  },
   {
    title: "Top IT Companies & Digital Marketing Agencies in India: A City-Wise Guide (2026)",
    cat: "Software Development",
    date: "Aug 21, 2026",
    read: "8 min",
    excerpt:
      "Discover the top IT companies and digital marketing agencies in India, with a city-wise guide to leading software development, SEO, web development, PPC, and digital marketing companies.",
    slug: "top-10-it-companies-in-india",
  },
];

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title>About Us | Deific Digital</title>
        <link rel="canonical" href="https://deificdigital.com/blog/how-to-choose-the-right-digital-agency" />
      </Helmet>

      <div>
        <section className="bg-gradient-to-br from-gray-50 to-white py-16 text-center">
          <div className="mx-auto max-w-3xl px-4">
            <span className="inline-block rounded-full border border-red-200 bg-red-50 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-red-700 mb-4">
              Blog
            </span>
            <h1 className="text-4xl font-extrabold sm:text-5xl">
              Insights & <span className="text-red-700">Tech Stories</span>
            </h1>
            <p className="mt-4 text-lg text-gray-500">
              Expert articles, case studies, and technology insights from our team.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-wrap justify-center gap-6">
            {posts.map((p) => (
              <Link
                key={p.title}
                to={`/blog/${p.slug}`}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <article className="group rounded-2xl border border-border bg-white overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer h-full">
                  <div className="h-40 bg-red-50 flex items-center justify-center">
                    <span className="text-6xl">📝</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="rounded-full bg-red-50 text-red-700 text-xs font-semibold px-3 py-1">
                        {p.cat}
                      </span>
                      <span className="text-xs text-muted-foreground">{p.date}</span>
                      <span className="text-xs text-muted-foreground">· {p.read} read</span>
                    </div>
                    <h3 className="font-bold group-hover:text-red-700 transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {p.excerpt}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        <CTABanner />
      </div>
    </>
  );
}