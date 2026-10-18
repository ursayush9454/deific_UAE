import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import callgirl from "../../assets/3d-girl.webp"

export function CTABanner() {
  return (

    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      {/*
        Outer wrapper — extra padding-top taaki girl ka top part
        banner ke upar visible ho sake
      */}
      <div className="relative pt-8">
        {/* ── Girl sticker — top-right, floats above banner ── */}
        <div
          className="absolute right-[12px] top-[-67px] z-20 select-none pointer-events-none "
          style={{ width: "100px", height: "110px" }}
          aria-hidden="true"
        >
          
          <span
            style={{
              fontSize: "80px",
              lineHeight: 1,
              display: "block",
              textAlign: "center",
            }}
          >
            <img src={callgirl} alt="" />
          </span>
        </div>

        
        <div
          className="relative overflow-hidden rounded-3xl px-8 py-10 text-white pr-28"
          style={{
            background: "var(--gradient-primary)",
            boxShadow: "var(--shadow-glow)",
            
          }}
        >
          {/* Subtle radial overlay */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, white, transparent 45%), radial-gradient(circle at 60% 80%, #ff6b00, transparent 50%)",
            }}
          />

          {/* Content grid */}
          <div className="relative grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-center">
            <div>
              <h3 className="text-3xl font-bold sm:text-4xl">
                Ready to start your digital transformation?
              </h3>
              <p className="mt-3 text-white/90 max-w-xl">
                Let's discuss your project. Get a free consultation from our
                experts and a no-obligation proposal.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-red-700 shadow-lg transition-transform hover:scale-105"
              >
                Get Free Consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+918750200899"
                className="inline-flex items-center rounded-md border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                Call +91 87502 00899
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
 