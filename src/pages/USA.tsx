import { Seo, breadcrumbLd } from "@/components/site/Seo";
import { useEffect, useRef } from "react";

/**
 * Deific Digital — US landing page
 * Drop this component into your React app, e.g.:
 *   import USALandingPage from "./USALandingPage";
 *   <USALandingPage />
 *
 * Self-contained: styles are scoped under .deific-landing so they
 * won't leak into the rest of your app. Uses the site's existing
 * Plus Jakarta Sans font (loaded globally in index.html).
 */

const TERMINAL_LINES = [
  { t: "$ deific deploy --client=your-site", c: "" },
  { t: "✓ discovery complete", c: "ok" },
  { t: "✓ design system generated", c: "ok" },
  { t: "→ building components...", c: "" },
  { t: "✓ build passing (0 errors)", c: "ok" },
  { t: '✓ deployed to <span class="path">production</span>', c: "ok" },
  { t: "$ status: growth engine live", c: "" },
];

export default function USALandingPage() {
  const termRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const body = termRef.current;
    if (!body) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    body.innerHTML = "";
    TERMINAL_LINES.forEach((l, i) => {
      const div = document.createElement("div");
      div.className = "line" + (l.c ? " " + l.c : "");
      div.innerHTML = l.t;
      if (!reduce) div.style.animationDelay = i * 0.45 + "s";
      body.appendChild(div);
    });
    const cur = document.createElement("span");
    cur.className = "cursor";
    const last = body.lastElementChild;
    if (last) {
      last.appendChild(document.createTextNode(" "));
      last.appendChild(cur);
    }
  }, []);

  return (
    <div className="deific-landing">
      <Seo
        title="Web Development & Digital Marketing for US Businesses | Deific Digital"
        description="Deific Digital builds websites, apps and growth marketing for US businesses with an India-based engineering team. ISO 9001 and ISO/IEC 27001 certified."
        path="/usa"
        locale="en_US"
        jsonLd={breadcrumbLd([["Home", "/"], ["USA", "/usa"]])}
      />
      <style dangerouslySetInnerHTML={{ __html: `
        .deific-landing {
          --bg:#FFFFFF;
          --bg-2:#FFF5F5;
          --panel:#FBEAEA;
          --line:#EAD3D3;
          --red:#D6222E;
          --red-dark:#A5121C;
          --ink-dark:#151417;
          --hi:#17151A;
          --lo:#6E6870;
          --lo-2:#9A939A;

          --display: var(--font-sans);
          --body: var(--font-sans);
          --mono: var(--font-sans);

          background: var(--bg);
          color: var(--hi);
          font-family: var(--body);
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        .deific-landing *{box-sizing:border-box;}
        .deific-landing img, .deific-landing svg{display:block; max-width:100%;}
        .deific-landing a{color:inherit; text-decoration:none;}
        .deific-landing ul{list-style:none; margin:0; padding:0;}
        .deific-landing :focus-visible{outline:2px solid var(--red); outline-offset:3px;}

        .deific-landing .wrap{max-width:1180px; margin:0 auto; padding:0 32px;}
        @media(max-width:640px){.deific-landing .wrap{padding:0 20px;}}

        .deific-landing .eyebrow{
          font-family:var(--mono); font-size:12px; letter-spacing:0.14em;
          text-transform:uppercase; color:var(--red);
          display:flex; align-items:center; gap:10px;
        }
        .deific-landing .eyebrow::before{
          content:""; width:6px; height:6px; background:var(--red); border-radius:50%;
          box-shadow:0 0 0 3px rgba(214,34,46,0.15);
        }

        .deific-landing h1, .deific-landing h2, .deific-landing h3{
          font-family:var(--display); font-weight:600; letter-spacing:-0.01em; color:var(--hi); margin:0;
        }

        .deific-landing .hero{ padding:88px 0 96px; position:relative; }
        .deific-landing .hero-grid{ display:grid; grid-template-columns:1.1fr 0.9fr; gap:64px; align-items:center; }
        @media(max-width:900px){.deific-landing .hero-grid{grid-template-columns:1fr; gap:48px;}}

        .deific-landing .hero h1{ font-size:clamp(36px,5vw,58px); line-height:1.05; margin:20px 0 24px; }
        .deific-landing .hero h1 em{ font-style:normal; color:var(--red); }
        .deific-landing .hero p.lede{ font-size:17px; color:var(--lo); max-width:480px; margin-bottom:32px; }
        .deific-landing .cta-row{ display:flex; gap:14px; flex-wrap:wrap; margin-bottom:36px; }
        .deific-landing .btn{
          font-family:var(--mono); font-size:13.5px; padding:14px 24px; border-radius:2px;
          display:inline-flex; align-items:center; gap:10px;
          transition:transform .15s ease, box-shadow .15s ease, background .15s ease, color .15s ease, border-color .15s ease;
          cursor:pointer; border:1px solid transparent;
        }
        .deific-landing .btn-primary{ background:var(--red); color:#FFFFFF; font-weight:500; }
        .deific-landing .btn-primary:hover{ transform:translateY(-1px); box-shadow:0 6px 20px rgba(214,34,46,0.28); background:var(--red-dark); }
        .deific-landing .btn-ghost{ border-color:var(--line); color:var(--hi); }
        .deific-landing .btn-ghost:hover{ border-color:var(--red); color:var(--red); }

        .deific-landing .hero-meta{ display:flex; gap:28px; font-family:var(--mono); font-size:12px; color:var(--lo-2); flex-wrap:wrap; }
        .deific-landing .hero-meta b{ color:var(--hi); font-weight:500; }

        .deific-landing .terminal{
          background:var(--ink-dark); border:1px solid var(--ink-dark); border-radius:6px; overflow:hidden;
          box-shadow:0 30px 80px -20px rgba(214,34,46,0.18);
        }
        .deific-landing .terminal-bar{
          display:flex; align-items:center; gap:8px; padding:12px 16px;
          border-bottom:1px solid #2A2830; background:#1D1B21;
        }
        .deific-landing .dot{ width:9px; height:9px; border-radius:50%; }
        .deific-landing .dot.r{ background:#FF5F57; }
        .deific-landing .dot.y{ background:#FEBC2E; }
        .deific-landing .dot.g{ background:#28C840; }
        .deific-landing .terminal-title{ font-family:var(--mono); font-size:11px; color:#8F8996; margin-left:8px; }
        .deific-landing .terminal-body{
          padding:22px 20px 26px; font-family:var(--mono); font-size:13px; min-height:260px; color:#D8D3DA;
        }
        .deific-landing .terminal-body .line{ margin-bottom:10px; opacity:0; animation:deific-reveal .4s forwards; }
        .deific-landing .terminal-body .ok{ color:#FF6B75; }
        .deific-landing .terminal-body .path{ color:#FFFFFF; font-weight:500; }
        .deific-landing .cursor{
          display:inline-block; width:7px; height:14px; background:var(--red);
          vertical-align:middle; animation:deific-blink 1s steps(1) infinite;
        }
        @keyframes deific-reveal{ to{ opacity:1; } }
        @keyframes deific-blink{ 50%{ opacity:0; } }
        @media (prefers-reduced-motion: reduce){
          .deific-landing .terminal-body .line{ animation:none; opacity:1; }
          .deific-landing .cursor{ animation:none; }
        }

        .deific-landing .strip{ border-top:1px solid var(--line); border-bottom:1px solid var(--line); padding:22px 0; background:var(--bg-2); }
        .deific-landing .strip .wrap{
          display:flex; justify-content:space-between; flex-wrap:wrap; gap:18px;
          font-family:var(--mono); font-size:12.5px; color:var(--lo); letter-spacing:0.03em;
        }
        .deific-landing .strip strong{ color:var(--hi); font-weight:500; }

        .deific-landing section{ padding:96px 0; }
        .deific-landing .sec-head{ max-width:640px; margin-bottom:56px; }
        .deific-landing .sec-head h2{ font-size:clamp(28px,3.4vw,38px); margin-top:16px; }
        .deific-landing .sec-head p{ color:var(--lo); margin-top:14px; font-size:15.5px; }

        .deific-landing .services-grid{
          display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:var(--line); border:1px solid var(--line);
        }
        @media(max-width:900px){.deific-landing .services-grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:600px){.deific-landing .services-grid{grid-template-columns:1fr;}}
        .deific-landing .service-card{ background:var(--bg); padding:34px 28px; transition:background .2s; }
        .deific-landing .service-card:hover{ background:var(--bg-2); }
        .deific-landing .service-card .tag{
          font-family:var(--mono); font-size:11px; color:var(--red); text-transform:uppercase; letter-spacing:0.1em;
        }
        .deific-landing .service-card h3{ font-size:19px; margin:14px 0 10px; }
        .deific-landing .service-card p{ color:var(--lo); font-size:14px; margin:0; }

        .deific-landing .process{ background:var(--bg-2); border-top:1px solid var(--line); border-bottom:1px solid var(--line); }
        .deific-landing .process-list{ display:flex; flex-direction:column; }
        .deific-landing .process-item{ display:grid; grid-template-columns:80px 1fr; gap:24px; padding:28px 0; border-top:1px solid var(--line); }
        .deific-landing .process-item:last-child{ border-bottom:1px solid var(--line); }
        .deific-landing .process-num{ font-family:var(--mono); color:var(--red); font-size:14px; padding-top:3px; }
        .deific-landing .process-item h3{ font-size:19px; margin-bottom:8px; }
        .deific-landing .process-item p{ color:var(--lo); font-size:14.5px; max-width:560px; margin:0; }
        .deific-landing .process-time{ font-family:var(--mono); font-size:12px; color:var(--lo-2); margin-top:8px; display:block; }

        .deific-landing .metrics-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:32px; }
        @media(max-width:760px){.deific-landing .metrics-grid{grid-template-columns:repeat(2,1fr); gap:36px 24px;}}
        .deific-landing .metric b{ font-family:var(--display); font-size:clamp(30px,3.4vw,44px); color:var(--red); display:block; }
        .deific-landing .metric span{ font-family:var(--mono); font-size:12px; color:var(--lo); text-transform:uppercase; letter-spacing:0.06em; }

        .deific-landing .testi-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        @media(max-width:900px){.deific-landing .testi-grid{grid-template-columns:1fr; max-width:520px;}}
        .deific-landing .testi-card{
          background:var(--bg); border:1px solid var(--line); border-radius:6px; padding:28px;
          display:flex; flex-direction:column; justify-content:space-between; height:100%;
        }
        .deific-landing .testi-card p{ font-size:15px; color:var(--hi); margin:0 0 22px; }
        .deific-landing .testi-who{ font-family:var(--mono); font-size:12px; color:var(--lo); }
        .deific-landing .testi-who b{ color:var(--red); font-weight:500; }

        .deific-landing .cta-band{ background:var(--ink-dark); padding:96px 0; text-align:center; }
        .deific-landing .cta-band .eyebrow{ color:#FF6B75; }
        .deific-landing .cta-band .eyebrow::before{ background:#FF6B75; box-shadow:0 0 0 3px rgba(255,107,117,0.18); }
        .deific-landing .cta-band h2{ font-size:clamp(28px,4vw,44px); max-width:680px; margin:18px auto 30px; color:#FFFFFF; }
        .deific-landing .cta-band .cta-row{ justify-content:center; }
        .deific-landing .cta-band .btn-ghost{ border-color:#3A3640; color:#FFFFFF; }
        .deific-landing .cta-band .btn-ghost:hover{ border-color:var(--red); color:#FF6B75; }
      ` }} />

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <span className="eyebrow">Now onboarding US clients</span>
              <h1>
                Web development &amp; digital marketing,{" "}
                <em>shipped like software.</em>
              </h1>
              <p className="lede">
                Deific Digital builds and grows revenue-generating websites,
                apps, and campaigns for US businesses — with the process
                discipline of an engineering team, not a freelance shop.
              </p>
              <div className="cta-row">
                <a href="https://www.deificdigital.com/contact" className="btn btn-primary">
                  Start a project →
                </a>
                <a href="https://www.deificdigital.com/portfolio" className="btn btn-ghost">
                  See what we build
                </a>
              </div>
              <div className="hero-meta">
                <span>
                  <b>10+ yrs</b> in production
                </span>
                <span>
                  <b>EST–PST</b> overlap hours
                </span>
                <span>
                  <b>120+</b> launches shipped
                </span>
              </div>
            </div>

            <div
              className="terminal"
              role="img"
              aria-label="Terminal showing a project build log from discovery to launch"
            >
              <div className="terminal-bar">
                <span className="dot r"></span>
                <span className="dot y"></span>
                <span className="dot g"></span>
                <span className="terminal-title">
                  deific-digital · build.log
                </span>
              </div>
              <div className="terminal-body" ref={termRef}></div>
            </div>
          </div>
        </section>

        {/* STRIP */}
        <div className="strip">
          <div className="wrap">
            <span>
              <strong>Industries</strong> — SaaS · Healthcare · Real Estate ·
              E-commerce · Professional Services
            </span>
            <span>
              <strong>Stack</strong> — React · Next.js · Shopify · WordPress ·
              HubSpot
            </span>
          </div>
        </div>

        {/* SERVICES */}
        <section id="services">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">What we build</span>
              <h2>
                One team for the site, the stack, and the growth engine behind
                it.
              </h2>
              <p>
                No handoffs between agencies. The people who design your site
                are the people who make it convert.
              </p>
            </div>

            <div className="services-grid">
              {[
                {
                  tag: "Web",
                  title: "Website Development",
                  copy: "Fast, accessible, SEO-ready sites on React/Next.js, WordPress, or Shopify — built to convert, not just look good.",
                },
                {
                  tag: "Product",
                  title: "App & Software Development",
                  copy: "Custom web apps, internal tools, and MVPs built with a real engineering process — specs, sprints, code review.",
                },
                {
                  tag: "Growth",
                  title: "Digital Marketing & SEO",
                  copy: "Technical SEO, content, and paid campaigns tied directly to pipeline — reported in numbers you can take to your CFO.",
                },
                {
                  tag: "Commerce",
                  title: "E-commerce Builds",
                  copy: "Shopify and headless commerce storefronts with checkout flows tuned for conversion, not just launch-day demos.",
                },
                {
                  tag: "Identity",
                  title: "Branding & Design Systems",
                  copy: "A visual identity and component library your team can actually reuse across landing pages, decks, and product.",
                },
                {
                  tag: "Ops",
                  title: "CRM & Automation",
                  copy: "HubSpot/CRM setup, lead routing, and reporting dashboards so marketing spend has a clean line to revenue.",
                },
              ].map((s) => (
                <div className="service-card" key={s.title}>
                  <span className="tag">{s.tag}</span>
                  <h3>{s.title}</h3>
                  <p>{s.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="process">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">How a project runs</span>
              <h2>Five stages. Fixed scope. No surprise invoices.</h2>
            </div>

            <div className="process-list">
              {[
                {
                  n: "01",
                  title: "Discover",
                  copy: "We audit your current site, funnel, and competitors, and agree on the three metrics this project needs to move.",
                  time: "Week 1",
                },
                {
                  n: "02",
                  title: "Design",
                  copy: "Wireframes, then high-fidelity design in Figma. You review and sign off before a single line of code is written.",
                  time: "Week 2–3",
                },
                {
                  n: "03",
                  title: "Build",
                  copy: "Development in weekly sprints with a staging link you can click through at any time — no black-box waiting.",
                  time: "Week 3–6",
                },
                {
                  n: "04",
                  title: "Launch",
                  copy: "QA across devices, performance and SEO checks, then a monitored go-live with a same-day rollback plan.",
                  time: "Week 7",
                },
                {
                  n: "05",
                  title: "Grow",
                  copy: "Post-launch, we hand you a monthly report tied to the metrics from step one — and keep optimizing from there.",
                  time: "Ongoing",
                },
              ].map((p) => (
                <div className="process-item" key={p.n}>
                  <span className="process-num">{p.n}</span>
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.copy}</p>
                    <span className="process-time">{p.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* METRICS */}
        <section id="results">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Track record</span>
              <h2>
                Numbers our clients ask us to repeat on their next project.
              </h2>
            </div>
            <div className="metrics-grid">
              {[
                { v: "120+", l: "Sites & apps launched" },
                { v: "2.4×", l: "Avg. lead increase" },
                { v: "98%", l: "Projects on schedule" },
                { v: "4.9/5", l: "Average client rating" },
              ].map((m) => (
                <div className="metric" key={m.l}>
                  <b>{m.v}</b>
                  <span>{m.l}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Client feedback</span>
              <h2>What US teams say after launch.</h2>
            </div>
            <div className="testi-grid">
              {[
                {
                  quote:
                    "They rebuilt our site in six weeks and our demo requests doubled the following month. Reporting was honest, even when a channel underperformed.",
                  who: "Operations Director",
                  where: "SaaS, Austin TX",
                },
                {
                  quote:
                    "First agency that gave us a staging link on day one instead of a slide deck. We always knew exactly what we were paying for.",
                  who: "Founder",
                  where: "D2C Retail, Chicago IL",
                },
                {
                  quote:
                    "Our SEO traffic was flat for two years. Six months in with Deific it's up 3x, and it's still climbing.",
                  who: "Marketing Lead",
                  where: "Healthcare, Tampa FL",
                },
              ].map((t) => (
                <div className="testi-card" key={t.who}>
                  <p>&ldquo;{t.quote}&rdquo;</p>
                  <div className="testi-who">
                    <b>{t.who}</b> — {t.where}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA BAND */}
        <section className="cta-band" id="contact">
          <div className="wrap">
            <span className="eyebrow" style={{ justifyContent: "center" }}>
              Let&rsquo;s talk
            </span>
            <h2>
              Tell us where the site or funnel is stuck. We&rsquo;ll tell you
              exactly how we&rsquo;d fix it — free, in 30 minutes.
            </h2>
            <div className="cta-row">
              <a
                href="https://www.deificdigital.com/contact"
                className="btn btn-primary"
              >
                Book a free strategy call →
              </a>
              <a
                href="mailto:deific.solution@hotmail.com"
                className="btn btn-ghost"
              >
                deific.solution@hotmail.com
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
