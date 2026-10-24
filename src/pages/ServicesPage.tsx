
import { Link, useParams } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

import {
  ArrowRight,
  CheckCircle,
  Mail,
  Smartphone,
  Users,
  Sparkles,
  Trophy,
  Layers,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { servicesContent } from "../static/servicesContent";

// ─── Animation helper ──────────────────────────────────────────────

const useStaggeredAnimation = (key: string) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisible(false);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { ref, visible };
};

// ─── Main Page ──────────────────────────────────────────────────────

function ServicesPage() {
  const { slug } = useParams<{ slug: string }>();
  const content = slug ? servicesContent[slug] : undefined;

  const { ref: processRef, visible: processVisible } = useStaggeredAnimation(
    `${slug}-process`
  );
  const { ref: servicesRef, visible: servicesVisible } = useStaggeredAnimation(
    `${slug}-services`
  );

  if (!content) {
    return (



      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Service not found</h1>
        <p className="mt-2 text-gray-500">
          We couldn&apos;t find the service you&apos;re looking for.
        </p>
        <Link
          to="/services"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-200 transition-all hover:scale-105"
        >
          Browse Services
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (

     <>
             <Helmet>
             <title>{`${content ? `${content.title} ${content.highlight}`.trim() : "Services"} | Deific Digital`}</title>
             {content ? <meta name="description" content={content.description.slice(0, 158)} /> : null}
             <link rel="canonical" href={`https://deificdigital.com/services/${slug ?? ""}`} />
            </Helmet>


    <div className="min-h-screen bg-white">

      {/* ===== HERO (smaller, half screen height) ===== */}
      <section
        className="relative overflow-hidden flex items-center min-h-[50vh] py-4 md:py-6"
        style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #7c2d12 100%)" }}
      >
        <div className="relative w-full mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm border border-white/20 mb-2">
                <Smartphone className="h-3.5 w-3.5 text-yellow-400" />
                <span>{content.badge}</span>
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl text-white">
                {content.title}
                <span className="block mt-1 text-orange-400">
                  {content.highlight}
                </span>
              </h1>
              <p className="mx-auto mt-2 max-w-xl text-sm text-white/70 md:text-base md:mx-0">
                {content.description}
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-red-500/25 transition-all hover:scale-105 hover:shadow-red-500/40"
                >
                  Get Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            
            <div className="flex-1 flex justify-center">
  <img
    src={content.heroImage}
    alt={`${content.title} ${content.highlight}`.trim()}
    width={384}
    height={176}
    decoding="async"
    className="w-64 md:w-80 lg:w-96 h-44 rounded-2xl shadow-2xl object-cover border-2 border-white/20"
  />
</div>



          </div>
        </div>
      </section>

      {/* ===== OVERVIEW ===== */}
      <section className="pt-4 pb-10 md:pb-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-700 mb-4">
                Overview
              </span>
              <h2 className="text-3xl font-bold text-gray-900">
                {content.overviewTitle}
              </h2>
              {content.overviewParagraphs.map((para, idx) => (
                <p key={idx} className="mt-4 text-sm text-gray-500 leading-relaxed">
                  {para}
                </p>
              ))}
              <div className="mt-6 flex flex-wrap gap-2">
                {content.overviewBadges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700"
                  >
                    <Sparkles className="h-3 w-3" />
                    {badge}
                  </span>
                ))}
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-red-200">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-red-600" />
                  {content.whyChooseTitle}
                </h3>
                <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                  {content.whyChooseDesc}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {content.whyChooseTags.map((item) => (
                    <span
                      key={item}
                      className="inline-block rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700 border border-red-100"
                    >
                      # {item}
                    </span>
                  ))}
                </div>
                <div className="mt-5">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-200 transition-all hover:scale-105 hover:shadow-red-300"
                  >
                    Request A Quote
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-center py-2">
        <div className="w-3/4 h-px bg-gray-200" />
      </div>

      {/* ===== HOW WE DEVELOP ===== */}
      <section className="bg-gray-50/50 py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-700 mb-3">
              Process
            </span>
            <h2 className="text-3xl font-bold text-gray-900">
              How We <span className="text-red-600">{content.processHeading}</span>
            </h2>
            <p className="mt-2 text-gray-500 max-w-2xl mx-auto">
              We, being a pioneering company in this space, chart our operations stepwise:
            </p>
          </div>
          <div ref={processRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.processSteps.map((step, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:border-red-200 transition-all duration-300 hover:-translate-y-1 ${
                  processVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-50 to-orange-50 text-2xl shadow-sm">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{step.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HIRE DEDICATED DEVELOPER ===== */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div
            className="rounded-3xl border border-red-200 p-8 md:p-12 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.01] relative overflow-hidden"
            style={{
              backgroundImage: "url('https://picsum.photos/seed/developer/800/300.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/80 to-orange-900/80" />
            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-white/20 backdrop-blur-sm p-3">
                  <Users className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white">
                Hire a Dedicated Developer
              </h3>
              <p className="mt-2 text-white/80 max-w-md mx-auto">
                Get a skilled developer for your project, working exclusively for you.
              </p>
              <Link
                to="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/30 transition-all hover:scale-105 hover:shadow-red-500/50"
              >
                Hire Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES WE PROVIDE ===== */}
      <section className="bg-gray-50/50 py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-700 mb-3">
              Services
            </span>
            <h2 className="text-3xl font-bold text-gray-900">
              Services We <span className="text-red-600">Provide</span>
            </h2>
            <p className="mt-2 text-gray-500 max-w-2xl mx-auto">
              Our design process follows a proven approach. We begin with a deep
              understanding of your needs and create a planning template.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div ref={servicesRef} className="space-y-3">
              <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-red-600" />
                {content.servicesHeading}
              </h3>
              <p className="text-sm text-gray-500">{content.servicesIntro}</p>
              <ul className="space-y-2 mt-4">
                {content.servicesList.map((item, index) => (
                  <li
                    key={index}
                    className={`flex items-start gap-2 text-sm text-gray-600 ${
                      servicesVisible ? "animate-fade-in-up" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    <CheckCircle className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                <Layers className="h-5 w-5 text-red-600" />
                Our Process Phases
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {content.processPhases.map((phase, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 rounded-lg bg-white border border-gray-100 px-3 py-2 text-xs font-medium text-gray-700 shadow-sm transition-all duration-300 hover:border-red-200 hover:shadow-md hover:-translate-y-0.5 ${
                      servicesVisible ? "animate-fade-in-up" : "opacity-0"
                    }`}
                    style={{
                      animationDelay: `${(index + content.servicesList.length) * 60}ms`,
                    }}
                  >
                    <CheckCircle className="h-3 w-3 text-red-500" />
                    <span>{phase}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="bg-gray-50/50 py-16 border-t border-gray-100">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-red-100 p-3">
              <Mail className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            Get New Insights Weekly
          </h3>
          <p className="mt-2 text-gray-500">
            Welcome to Deific Digital. If you would like more information, please subscribe.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              dir="ltr"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="Your Email Address"
              className="w-full min-w-0 sm:flex-1 rounded-full border border-gray-200 px-5 py-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
            />
            <button
              type="submit"
              className="w-full sm:w-auto rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-red-200 transition-all hover:scale-105 hover:shadow-red-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      ` }} />
    </div>


    </>
  );
}

export default ServicesPage;