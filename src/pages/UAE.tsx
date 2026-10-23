import React, { useEffect, useRef } from "react";

export default function UAELandingPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef} dir="rtl" lang="ar" className="uae-page">
      <style dangerouslySetInnerHTML={{ __html: `

        .uae-page{
          --red:#C8102E;
          --red-deep:#5C0A16;
          --red-mid:#7A0E1F;
          --white:#FFFFFF;
          --offwhite:#FFF6F6;
          --ink:#1B0F12;
          --muted:rgba(27,15,18,.62);
          --line:rgba(200,16,46,.18);
          --radius:18px;
          --font-display:'Plus Jakarta Sans','IBM Plex Sans Arabic',system-ui,sans-serif;
          --font-body:'Plus Jakarta Sans','IBM Plex Sans Arabic',system-ui,sans-serif;
          --font-utility:'Plus Jakarta Sans','IBM Plex Sans Arabic',system-ui,sans-serif;

          font-family:var(--font-body);
          background:var(--offwhite);
          color:var(--ink);
          line-height:1.7;
          overflow-x:hidden;
        }
        .uae-page *{ box-sizing:border-box; }
        .uae-page img, .uae-page svg{ display:block; max-width:100%; }
        .uae-page .wrap{ max-width:1180px; margin:0 auto; padding:0 28px; }
        .uae-page .eyebrow{
          font-family:var(--font-utility); font-size:13px; letter-spacing:.5px;
          color:var(--red); display:inline-flex; align-items:center; gap:10px;
          font-weight:600; margin-bottom:18px;
        }
        .uae-page .eyebrow::before{ content:''; width:26px; height:2px; background:var(--red); display:inline-block; }
        .uae-page h1, .uae-page h2, .uae-page h3{ font-family:var(--font-display); font-weight:700; line-height:1.25; margin:0; }
        .uae-page p{ margin:0; }
        .uae-page .btn{
          display:inline-flex; align-items:center; gap:10px;
          font-family:var(--font-utility); font-weight:600; font-size:15.5px;
          padding:15px 30px; border-radius:100px; border:1px solid transparent;
          cursor:pointer; text-decoration:none;
          transition:transform .25s ease, box-shadow .25s ease, background .25s ease, color .25s ease;
        }
        .uae-page .btn-solid{ background:var(--red); color:var(--white); box-shadow:0 10px 30px -10px rgba(200,16,46,.55); }
        .uae-page .btn-solid:hover{ transform:translateY(-2px); box-shadow:0 16px 34px -10px rgba(200,16,46,.7); }
        .uae-page .btn-ghost{ background:transparent; border-color:rgba(255,255,255,.4); color:var(--white); }
        .uae-page .btn-ghost:hover{ background:rgba(255,255,255,.1); transform:translateY(-2px); }

        .uae-page .hero{
          position:relative;
          background:radial-gradient(120% 140% at 85% -10%, var(--red-mid) 0%, var(--red-deep) 55%), var(--red-deep);
          color:var(--white); padding:120px 0 0; overflow:hidden;
        }
        .uae-page .hero-pattern{ position:absolute; inset:0; opacity:.14; pointer-events:none; }
        .uae-page .hero-pattern svg{ width:100%; height:100%; }
        .uae-page .node{ animation:uaePulse 3.6s ease-in-out infinite; }
        .uae-page .node:nth-child(2n){ animation-delay:.9s; }
        .uae-page .node:nth-child(3n){ animation-delay:1.6s; }
        @keyframes uaePulse{ 0%,100%{ opacity:.35; r:2.4; } 50%{ opacity:1; r:4; } }

        .uae-page .hero-inner{ position:relative; z-index:2; padding-bottom:70px; }
        .uae-page .hero-grid{ display:grid; grid-template-columns:1.15fr .85fr; gap:60px; align-items:center; }
        .uae-page .hero h1{ font-size:clamp(34px, 5vw, 58px); margin-bottom:22px; color:var(--white); }
        .uae-page .hero p.lead{ font-size:18px; color:rgba(255,255,255,.78); max-width:520px; margin-bottom:36px; font-weight:300; }
        .uae-page .hero-actions{ display:flex; flex-wrap:wrap; gap:16px; }
        .uae-page .hero-badge-card{
          background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.18);
          backdrop-filter:blur(6px); border-radius:var(--radius); padding:26px;
        }
        .uae-page .hero-badge-card .row{
          display:flex; justify-content:space-between; padding:12px 0;
          border-bottom:1px solid rgba(255,255,255,.14); font-family:var(--font-utility); font-size:14.5px;
        }
        .uae-page .hero-badge-card .row:last-child{ border-bottom:none; }
        .uae-page .hero-badge-card .row b{ color:var(--white); font-weight:600; }

        .uae-page .stats-band{
          position:relative; z-index:2; background:var(--white); border-radius:22px 22px 0 0;
          margin:0 22px; transform:translateY(46px); box-shadow:0 -20px 60px -20px rgba(0,0,0,.3);
          padding:38px 10px; display:grid; grid-template-columns:repeat(4,1fr);
        }
        .uae-page .stats-band .stat{ text-align:center; padding:12px 8px; border-left:1px solid var(--line); }
        .uae-page .stats-band .stat:last-child{ border-left:none; }
        .uae-page .stats-band .stat b{ display:block; font-family:var(--font-display); font-size:clamp(26px,3vw,36px); color:var(--red); }
        .uae-page .stats-band .stat span{ font-family:var(--font-utility); font-size:13.5px; color:var(--muted); }

        .uae-page section{ padding:150px 0 90px; }
        .uae-page .section-head{ max-width:640px; margin-bottom:56px; }
        .uae-page .section-head h2{ font-size:clamp(28px,3.4vw,40px); color:var(--red-deep); }
        .uae-page .section-head p{ color:var(--muted); font-size:16.5px; margin-top:14px; }

        .uae-page .services-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:22px; }
        .uae-page .service-card{
          background:var(--white); border:1px solid var(--line); border-radius:var(--radius);
          padding:32px 28px; position:relative; overflow:hidden;
          transition:transform .3s ease, box-shadow .3s ease, border-color .3s ease;
        }
        .uae-page .service-card::before{
          content:''; position:absolute; inset-inline-start:0; top:0; bottom:0; width:4px;
          background:var(--red); transform:scaleY(0); transform-origin:top; transition:transform .35s ease;
        }
        .uae-page .service-card:hover{ transform:translateY(-6px); box-shadow:0 24px 50px -24px rgba(92,10,22,.25); border-color:transparent; }
        .uae-page .service-card:hover::before{ transform:scaleY(1); }
        .uae-page .service-num{ font-family:var(--font-utility); font-size:13px; color:var(--red); font-weight:600; margin-bottom:18px; display:block; }
        .uae-page .service-card h3{ font-size:21px; color:var(--red-deep); margin-bottom:12px; }
        .uae-page .service-card p{ color:var(--muted); font-size:15px; }

        .uae-page .process-dark{ background:var(--red-deep); color:var(--white); }
        .uae-page .process-dark .section-head h2{ color:var(--white); }
        .uae-page .process-dark .section-head p{ color:rgba(255,255,255,.72); }
        .uae-page .process-list{ display:grid; grid-template-columns:repeat(4,1fr); gap:0; position:relative; }
        .uae-page .process-list::before{ content:''; position:absolute; top:26px; right:6%; left:6%; height:1px; background:rgba(255,255,255,.18); }
        .uae-page .process-item{ position:relative; padding-inline-end:20px; }
        .uae-page .process-item .pnum{
          width:52px; height:52px; border-radius:50%; background:var(--red-deep);
          border:1px solid var(--white); color:var(--white); font-family:var(--font-utility);
          font-weight:600; display:flex; align-items:center; justify-content:center;
          margin-bottom:24px; position:relative; z-index:1;
        }
        .uae-page .process-item h3{ font-size:18.5px; margin-bottom:10px; color:var(--white); }
        .uae-page .process-item p{ font-size:14.5px; color:rgba(255,255,255,.7); }

        .uae-page .why-grid{ display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
        .uae-page .why-list{ display:flex; flex-direction:column; gap:26px; }
        .uae-page .why-item{ display:flex; gap:18px; align-items:flex-start; }
        .uae-page .why-icon{
          flex:none; width:46px; height:46px; border-radius:12px; background:var(--red);
          display:flex; align-items:center; justify-content:center;
        }
        .uae-page .why-item h3{ font-size:18px; color:var(--red-deep); margin-bottom:6px; }
        .uae-page .why-item p{ font-size:14.5px; color:var(--muted); }
        .uae-page .why-visual{ background:var(--red-deep); border-radius:24px; padding:44px; color:var(--white); position:relative; overflow:hidden; }
        .uae-page .why-visual::after{ content:''; position:absolute; inset:0; background:radial-gradient(60% 60% at 100% 0%, rgba(255,255,255,.12), transparent 60%); }
        .uae-page .why-visual blockquote{ font-family:var(--font-display); font-size:22px; position:relative; z-index:1; line-height:1.6; margin:0; }
        .uae-page .why-visual .cite{ margin-top:22px; font-family:var(--font-utility); font-size:13.5px; color:rgba(255,255,255,.75); position:relative; z-index:1; }

        .uae-page .industries-wrap{ background:var(--white); }
        .uae-page .industries-pills{ display:flex; flex-wrap:wrap; gap:14px; }
        .uae-page .pill{
          font-family:var(--font-utility); font-size:14.5px; font-weight:500;
          padding:14px 24px; border-radius:100px; border:1px solid var(--line); color:var(--ink);
          transition:all .25s ease;
        }
        .uae-page .pill:hover{ background:var(--red-deep); color:var(--white); border-color:var(--red-deep); }

        .uae-page .cta{
          background:var(--red-deep); color:var(--white); border-radius:28px;
          margin:0 22px 90px; padding:70px 50px; text-align:center; position:relative; overflow:hidden;
        }
        .uae-page .cta h2{ font-size:clamp(28px,4vw,44px); margin-bottom:18px; }
        .uae-page .cta p{ color:rgba(255,255,255,.78); font-size:17px; max-width:520px; margin:0 auto 36px; }
        .uae-page .cta-actions{ display:flex; justify-content:center; gap:16px; flex-wrap:wrap; }

        .uae-page [data-reveal]{ opacity:0; transform:translateY(24px); transition:opacity .7s ease, transform .7s ease; }
        .uae-page [data-reveal].in{ opacity:1; transform:translateY(0); }

        @media (max-width: 940px){
          .uae-page .hero-grid{ grid-template-columns:1fr; gap:36px; }
          .uae-page .stats-band{ grid-template-columns:repeat(2,1fr); }
          .uae-page .stats-band .stat:nth-child(2){ border-left:none; }
          .uae-page .services-grid{ grid-template-columns:1fr 1fr; }
          .uae-page .process-list{ grid-template-columns:1fr 1fr; row-gap:40px; }
          .uae-page .process-list::before{ display:none; }
          .uae-page .why-grid{ grid-template-columns:1fr; }
          .uae-page section{ padding:100px 0 60px; }
        }
        @media (max-width: 600px){
          .uae-page .services-grid{ grid-template-columns:1fr; }
          .uae-page .process-list{ grid-template-columns:1fr; }
          .uae-page .stats-band{ grid-template-columns:1fr 1fr; }
          .uae-page .cta{ padding:50px 26px; margin:0 12px 60px; }
        }
        @media (prefers-reduced-motion: reduce){
          .uae-page *{ animation:none !important; transition:none !important; }
        }
      ` }} />

      {/* HERO */}
      <section className="hero">
        <div className="hero-pattern" aria-hidden="true">
          <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern
                id="star8"
                width="120"
                height="120"
                patternUnits="userSpaceOnUse"
              >
                <g stroke="#FFFFFF" strokeWidth={1} fill="none">
                  <path d="M60 10 L80 40 L110 30 L90 60 L110 90 L80 80 L60 110 L40 80 L10 90 L30 60 L10 30 L40 40 Z" />
                </g>
              </pattern>
            </defs>
            <rect width="1200" height="800" fill="url(#star8)" />
            <g stroke="#FFFFFF" strokeWidth={1.2} opacity={0.6}>
              <line x1={120} y1={640} x2={300} y2={520} />
              <line x1={300} y1={520} x2={480} y2={600} />
              <line x1={480} y1={600} x2={640} y2={470} />
              <line x1={640} y1={470} x2={860} y2={540} />
              <line x1={860} y1={540} x2={1040} y2={420} />
              <line x1={1040} y1={420} x2={1150} y2={500} />
            </g>
            <g fill="#FFFFFF">
              <circle className="node" cx={120} cy={640} r={3} />
              <circle className="node" cx={300} cy={520} r={3} />
              <circle className="node" cx={480} cy={600} r={3} />
              <circle className="node" cx={640} cy={470} r={3} />
              <circle className="node" cx={860} cy={540} r={3} />
              <circle className="node" cx={1040} cy={420} r={3} />
              <circle className="node" cx={1150} cy={500} r={3} />
            </g>
          </svg>
        </div>

        <div className="wrap hero-inner">
          <div className="hero-grid">
            <div>
              <div className="eyebrow">
                شريككم الرقمي في دولة الإمارات العربية المتحدة
              </div>
              <h1>
                نحوّل طموحكم الرقمي
                <br />
                إلى نتائج ملموسة
              </h1>
              <p className="lead">
                نصمّم مواقع إلكترونية وتطبيقات وحملات تسويق رقمي مبنية خصيصًا
                لسوق الإمارات، من دبي إلى أبوظبي، بخبرة تقنية وفهم عميق للسوق
                المحلي.
              </p>
              <div className="hero-actions">
                <a href="https://www.deificdigital.com/contact" className="btn btn-solid">
                  احجزوا استشارة مجانية
                </a>
                <a href="https://www.deificdigital.com/portfolio" className="btn btn-ghost">
                  تعرفوا على خدماتنا
                </a>
              </div>
            </div>
            <div className="hero-badge-card" data-reveal>
              <div className="row">
                <span>مدة تسليم أول نسخة تجريبية</span>
                <b>10 أيام</b>
              </div>
              <div className="row">
                <span>فرق عمل متخصصة</span>
                <b>تطوير · تصميم · تسويق</b>
              </div>
              <div className="row">
                <span>نطاق الخدمة</span>
                <b>دبي · أبوظبي · الشارقة</b>
              </div>
              <div className="row">
                <span>لغات الواجهة</span>
                <b>عربي · إنجليزي</b>
              </div>
            </div>
          </div>
        </div>

        <div className="wrap">
          <div className="stats-band" data-reveal>
            <div className="stat">
              <b>+150</b>
              <span>مشروع منجز</span>
            </div>
            <div className="stat">
              <b>+8</b>
              <span>سنوات خبرة</span>
            </div>
            <div className="stat">
              <b>98%</b>
              <span>رضا العملاء</span>
            </div>
            <div className="stat">
              <b>24/7</b>
              <span>دعم فني</span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="eyebrow">خدماتنا</div>
            <h2>كل ما تحتاجه أعمالكم لتنمو رقميًا، تحت سقف واحد</h2>
            <p>
              من الفكرة إلى الإطلاق، نغطي جميع جوانب حضوركم الرقمي بفريق متكامل
              من المطورين والمصممين وخبراء التسويق.
            </p>
          </div>

          <div className="services-grid">
            {[
              {
                n: "01",
                t: "تطوير المواقع الإلكترونية",
                d: "مواقع سريعة ومتجاوبة وقابلة للتوسع، مبنية بأحدث التقنيات ومحسّنة لمحركات البحث منذ اليوم الأول.",
              },
              {
                n: "02",
                t: "تطوير التطبيقات",
                d: "تطبيقات iOS وAndroid بتجربة استخدام سلسة، مصممة لتعزيز ولاء العملاء وتسهيل الوصول إلى خدماتكم.",
              },
              {
                n: "03",
                t: "التسويق الرقمي",
                d: "تحسين محركات البحث، إعلانات مدفوعة، وإدارة منصات التواصل الاجتماعي بأسلوب مبني على البيانات.",
              },
              {
                n: "04",
                t: "الحلول البرمجية المخصصة",
                d: "أنظمة وبرمجيات مصممة خصيصًا لتلبية احتياجات أعمالكم وتبسيط عملياتكم الداخلية.",
              },
              {
                n: "05",
                t: "الاستشارات التقنية",
                d: "نرافقكم في اتخاذ القرارات التقنية الصحيحة، من اختيار المنصة إلى تخطيط البنية التحتية الرقمية.",
              },
              {
                n: "06",
                t: "التوسع بفرق تقنية خارجية",
                d: "فريق تقني متكامل يعمل كامتداد طبيعي لفريقكم، بمرونة كاملة في الحجم والتخصص.",
              },
            ].map((s) => (
              <div className="service-card" data-reveal key={s.n}>
                <span className="service-num">{s.n}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="process-dark">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="eyebrow">طريقة العمل</div>
            <h2>أربع خطوات واضحة من الفكرة إلى النتيجة</h2>
            <p>
              نعمل بمنهجية مدروسة تضمن الشفافية والسرعة في كل مرحلة من مراحل
              المشروع.
            </p>
          </div>
          <div className="process-list">
            {[
              {
                n: "01",
                t: "الاكتشاف",
                d: "نفهم أهدافكم وجمهوركم المستهدف والسوق الذي تعملون فيه.",
              },
              {
                n: "02",
                t: "التخطيط",
                d: "نضع استراتيجية واضحة وخارطة طريق زمنية قبل بدء التنفيذ.",
              },
              {
                n: "03",
                t: "التنفيذ",
                d: "نصمم وننفذ بدقة، مع تحديثات دورية وشفافية كاملة معكم.",
              },
              {
                n: "04",
                t: "النمو",
                d: "نقيس الأداء ونحسّن باستمرار لضمان نتائج مستدامة.",
              },
            ].map((s) => (
              <div className="process-item" data-reveal key={s.n}>
                <div className="pnum">{s.n}</div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why">
        <div className="wrap why-grid">
          <div>
            <div
              className="section-head"
              data-reveal
              style={{ marginBottom: 34 }}
            >
              <div className="eyebrow">لماذا تختاروننا</div>
              <h2>خبرة تقنية عالمية، بفهم محلي حقيقي للسوق الإماراتي</h2>
            </div>
            <div className="why-list">
              <div className="why-item" data-reveal>
                <div className="why-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2L3 7v6c0 5 4 8.5 9 9 5-.5 9-4 9-9V7l-9-5z"
                      stroke="#fff"
                      strokeWidth={1.6}
                    />
                  </svg>
                </div>
                <div>
                  <h3>خبرة محلية بمعايير عالمية</h3>
                  <p>
                    نفهم خصوصية السوق الإماراتي ونطبق أفضل الممارسات العالمية في
                    التنفيذ.
                  </p>
                </div>
              </div>
              <div className="why-item" data-reveal>
                <div className="why-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 20V10M12 20V4M20 20v-7"
                      stroke="#fff"
                      strokeWidth={1.6}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3>نتائج قابلة للقياس</h3>
                  <p>كل مشروع مبني على مؤشرات أداء واضحة، لا وعود مبهمة.</p>
                </div>
              </div>
              <div className="why-item" data-reveal>
                <div className="why-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="8"
                      r="3.2"
                      stroke="#fff"
                      strokeWidth={1.6}
                    />
                    <path
                      d="M5 20c1.5-4 4.5-6 7-6s5.5 2 7 6"
                      stroke="#fff"
                      strokeWidth={1.6}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3>فريق متعدد التخصصات</h3>
                  <p>
                    مطورون ومصممون وخبراء تسويق يعملون معًا تحت سقف واحد
                    لمشروعكم.
                  </p>
                </div>
              </div>
              <div className="why-item" data-reveal>
                <div className="why-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 21s-7-4.5-9.5-9C.5 7.5 3 3.5 7 4c2 .2 3.6 1.6 5 3.5C13.4 5.6 15 4.2 17 4c4-.5 6.5 3.5 4.5 8-2.5 4.5-9.5 9-9.5 9z"
                      stroke="#fff"
                      strokeWidth={1.6}
                    />
                  </svg>
                </div>
                <div>
                  <h3>شراكة طويلة الأمد</h3>
                  <p>
                    لا نسلّم المشروع وننسحب، بل نبقى شركاء في نموكم على المدى
                    الطويل.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="why-visual" data-reveal>
            <blockquote>
              «الشركات التي تنجح رقميًا في الإمارات ليست بالضرورة الأسرع، بل
              الأكثر التزامًا بفهم عملائها.»
            </blockquote>
            <div className="cite">— فلسفة عملنا في التعامل مع كل مشروع</div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="industries-wrap">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="eyebrow">القطاعات التي نخدمها</div>
            <h2>نعمل مع مختلف القطاعات في السوق الإماراتي</h2>
          </div>
          <div className="industries-pills" data-reveal>
            {[
              "العقارات",
              "التجارة الإلكترونية",
              "الضيافة والسياحة",
              "الرعاية الصحية",
              "التعليم",
              "الخدمات المالية",
              "اللوجستيات",
              "القطاع الحكومي وشبه الحكومي",
            ].map((p) => (
              <span className="pill" key={p}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="contact" style={{ paddingTop: 20 }}>
        <div className="wrap">
          <div className="cta" data-reveal>
            <h2>جاهزون لتطوير أعمالكم رقميًا؟</h2>
            <p>
              تواصلوا معنا اليوم للحصول على استشارة مجانية وخطة عمل مبدئية خلال
              48 ساعة.
            </p>
            <div className="cta-actions">
              <a href="https://www.deificdigital.com/contact" className="btn btn-solid">
                اطلبوا عرض سعر
              </a>
              <a href="https://www.deificdigital.com/portfolio" className="btn btn-ghost">
                تحدثوا مع فريقنا
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
