             


// import { Link, NavLink, useLocation } from "react-router-dom";
// import { useEffect, useRef, useState } from "react";
// import { Menu, X, Phone, ChevronDown, MessageCircle } from "lucide-react";
// import logo from "../../assets/dd.webp";
// import { servicesMenu } from "../../static/servicesData";
// import { products, companyLinks } from "../../static/productsData";
// import { ProductsMegaMenu } from "./ProductsMegaMenu";
// import { SITE, waLink } from "../../static/siteConfig";

// type MenuKey = "products" | "services" | "company";
// type NavItem = { to: string; label: string; menu?: MenuKey };

// function buildNav(home: string, ar: boolean): NavItem[] {
//   // Main India site: proper routed pages (no hash links)
//   if (home === "/") {
//     return [
//       { to: "/products", label: "Products", menu: "products" },
//       // { to: "/products", label: "Demo" },
//       { to: "/services/ai-integration-service", label: "Services", menu: "services" },
//       { to: "/services/automation", label: "Automation" },
//       { to: "/industries", label: "Industries" },
//       { to: "/about", label: "Company", menu: "company" },
//       { to: "/contact", label: "Contact" },
//     ];
//   }
//   // UAE landing pages keep their on-page sections
//   return [
//     { to: "/ai-agents", label: ar ? "وكلاء الذكاء الاصطناعي" : "AI Agents" },
//     { to: `${home}#automation`, label: ar ? "الأتمتة" : "Automation" },
//     { to: `${home}#industries`, label: ar ? "القطاعات" : "Industries" },
//     { to: `${home}#pricing`, label: ar ? "الأسعار" : "Pricing" },
//     { to: "/portfolio", label: ar ? "أعمالنا" : "Work" },
//     { to: "/contact", label: ar ? "تواصل معنا" : "Contact" },
//   ];
// }

// const linkCls = "text-[15px] font-medium text-dd-ink/75 transition-colors hover:text-dd-ink";

// export function Header() {
//   const [open, setOpen] = useState(false);
//   const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
//   const headerRef = useRef<HTMLElement>(null);
//   const location = useLocation();
//   const path = location.pathname.replace(/\/+$/, "") || "/";
//   const isUAE = path === "/uae" || path.startsWith("/uae/");
//   const isAR = path === "/uae/ar";
//   const home = isAR ? "/uae/ar" : isUAE ? "/uae" : "/";
//   const nav = buildNav(home, isAR);
//   const auditHref = home === "/" ? "/contact" : `${home}#audit`;
//   const auditLabel = isAR ? "تقييم أتمتة مجاني" : "Free automation audit";
//   const region = isUAE ? "AE" : "IN";
//   const tel = isUAE ? SITE.telAE : SITE.telIN;
//   const phone = isUAE ? SITE.phoneAE : SITE.phoneIN;
//   const waMsg = isAR ? "مرحبًا Deific Digital، أريد معرفة المزيد عن الأتمتة بالذكاء الاصطناعي." : "Hi Deific Digital, I want to know more about AI automation.";

//   useEffect(() => {
//     setOpen(false);
//     setOpenMenu(null);
//   }, [location.pathname, location.hash]);

//   // close mega menus on outside click / Escape
//   useEffect(() => {
//     const onDown = (e: MouseEvent) => {
//       if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpenMenu(null);
//     };
//     const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenMenu(null);
//     document.addEventListener("mousedown", onDown);
//     document.addEventListener("keydown", onKey);
//     return () => {
//       document.removeEventListener("mousedown", onDown);
//       document.removeEventListener("keydown", onKey);
//     };
//   }, []);

//   return (
//     <>
//       <header ref={headerRef} className="sticky top-0 z-50 w-full border-b border-dd-line/80 bg-white/90 backdrop-blur-xl">
//         <div className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
//           <Link to={home} className="flex shrink-0 items-center gap-2.5" aria-label="Deific Digital home" dir="ltr">
//             <img src={logo} alt="" width={34} height={34} className="h-[34px] w-[34px] rounded-lg" />
//             <span className="font-brand text-[21px] font-semibold text-dd-ink">
//               Deific <span className="text-dd-red">Digital</span>
//             </span>
//           </Link>

//           {/* desktop nav */}
//           <nav aria-label="Main" className="items-center hidden gap-6 xl:flex">
//             {nav.map((n) => {
//               if (n.menu) {
//                 const isOpen = openMenu === n.menu;
//                 const showCls = isOpen
//                   ? "visible opacity-100"
//                   : "invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100";
//                 return (
//                   <div key={n.label} className={`group flex h-[68px] items-center ${n.menu === "company" ? "relative" : ""}`}>
//                     <button
//                       type="button"
//                       className={`${linkCls} flex items-center gap-1`}
//                       aria-haspopup="true"
//                       aria-expanded={isOpen}
//                       onClick={() => setOpenMenu(isOpen ? null : n.menu!)}
//                     >
//                       {n.label}
//                       <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
//                     </button>

//                     {n.menu === "company" ? (
//                       <div className={`absolute left-0 top-full z-50 w-72 rounded-b-2xl border border-dd-line bg-white p-2 shadow-[0_24px_60px_-30px_rgba(11,31,77,0.35)] transition-opacity duration-150 ${showCls}`}>
//                         {companyLinks.map((c) => (
//                           <Link key={c.to} to={c.to} className="block rounded-xl px-4 py-2.5 hover:bg-dd-paper">
//                             <span className="block text-[14px] font-semibold text-dd-ink">{c.label}</span>
//                             <span className="block text-[12.5px] text-dd-slate">{c.desc}</span>
//                           </Link>
//                         ))}
//                       </div>
//                     ) : (
//                       <div className={`fixed left-0 right-0 top-[68px] z-50 border-b border-dd-line bg-white shadow-[0_24px_60px_-30px_rgba(11,31,77,0.35)] transition-opacity duration-150 ${showCls}`}>
//                         {n.menu === "products" ? (
//                           <ProductsMegaMenu />
//                         ) : (
//                           <div className="mx-auto grid max-w-[1200px] grid-cols-5 gap-8 px-8 py-10">
//                             {servicesMenu.map((col) => (
//                               <div key={col.title}>
//                                 <p className="mb-3 text-[14px] font-semibold text-dd-ink">{col.title}</p>
//                                 <ul className="space-y-2.5">
//                                   {col.items?.map((item) => (
//                                     <li key={item.label}>
//                                       <Link to={item.to} className="text-[14px] text-dd-slate hover:text-dd-red">{item.label}</Link>
//                                     </li>
//                                   ))}
//                                 </ul>
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 );
//               }
//               return n.to.includes("#") ? (
//                 <Link key={n.label} to={n.to} className={linkCls}>{n.label}</Link>
//               ) : (
//                 <NavLink key={n.label} to={n.to} className={({ isActive }) => `${linkCls} ${isActive ? "!text-dd-red" : ""}`}>{n.label}</NavLink>
//               );
//             })}
//           </nav>

//           <div className="flex items-center gap-2">
//             <div className="hidden items-center rounded-full bg-dd-paper p-1 text-[13px] font-semibold ring-1 ring-dd-line lg:flex" aria-label="Region" dir="ltr">
//               <Link to="/" hrefLang="en-IN" className={`rounded-full px-2.5 py-1 ${!isUAE ? "bg-white text-dd-ink shadow-sm" : "text-dd-slate"}`}>
//                 India
//               </Link>
//               <Link to="/uae" hrefLang="en-AE" className={`rounded-full px-2.5 py-1 ${isUAE ? "bg-white text-dd-ink shadow-sm" : "text-dd-slate"}`}>
//                 UAE
//               </Link>
//             </div>
//             {isUAE ? (
//               <div className="flex items-center rounded-full bg-dd-paper p-1 text-[13px] font-semibold ring-1 ring-dd-line" aria-label="Language" dir="ltr">
//                 <Link to="/uae" hrefLang="en-AE" lang="en" className={`rounded-full px-2.5 py-1 ${!isAR ? "bg-white text-dd-ink shadow-sm" : "text-dd-slate"}`}>
//                   EN
//                 </Link>
//                 <Link to="/uae/ar" hrefLang="ar-AE" lang="ar" className={`rounded-full px-2.5 py-1 ${isAR ? "bg-white text-dd-ink shadow-sm" : "text-dd-slate"}`}>
//                   عربي
//                 </Link>
//               </div>
//             ) : null}
//             <a
//               href={waLink(waMsg, region)}
//               target="_blank"
//               rel="noopener"
//               aria-label="Chat on WhatsApp"
//               className="hidden w-10 h-10 transition rounded-full place-items-center text-dd-go ring-1 ring-dd-line hover:bg-dd-paper md:grid"
//             >
//               <MessageCircle className="h-[18px] w-[18px]" />
//             </a>
//             <Link
//               to={auditHref}
//               className="hidden rounded-xl bg-dd-red px-4 py-2.5 text-[14px] font-semibold text-white transition hover:bg-dd-redink sm:inline-flex"
//             >
//               {auditLabel}
//             </Link>
//             <button
//               onClick={() => setOpen((o) => !o)}
//               className="inline-flex items-center justify-center w-10 h-10 rounded-xl ring-1 ring-dd-line xl:hidden"
//               aria-label={open ? "Close menu" : "Open menu"}
//               aria-expanded={open}
//             >
//               {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//             </button>
//           </div>
//         </div>

//         {/* mobile nav */}
//         {open && (
//           <div className="max-h-[calc(100vh-68px)] overflow-y-auto border-t border-dd-line bg-white xl:hidden">
//             <nav aria-label="Mobile" className="mx-auto grid max-w-[1200px] gap-1 px-4 py-4">
//               {nav.map((n) => {
//                 if (!n.menu) {
//                   return <Link key={n.label} to={n.to} className="rounded-lg px-3 py-3 text-[16px] font-medium text-dd-ink hover:bg-dd-paper">{n.label}</Link>;
//                 }
//                 const isOpen = openMenu === n.menu;
//                 return (
//                   <div key={n.label}>
//                     <button
//                       onClick={() => setOpenMenu(isOpen ? null : n.menu!)}
//                       aria-expanded={isOpen}
//                       className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-[16px] font-medium text-dd-ink hover:bg-dd-paper"
//                     >
//                       {n.label}
//                       <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
//                     </button>
//                     {isOpen && n.menu === "products" && (
//                       <div className="grid gap-2 py-2 pl-4 mb-2 ml-3 border-l border-dd-line">
//                         {products.map((p) => (
//                           <Link key={p.slug} to={`/products/${p.slug}`} className="flex items-center gap-3 rounded-lg p-1.5 hover:bg-dd-paper">
//                             <img src={p.image} alt="" loading="lazy" className="object-cover w-16 h-12 rounded-md" />
//                             <span><span className="block text-[15px] font-semibold text-dd-ink">{p.name}</span><span className="block text-[12.5px] text-dd-slate">{p.navLine}</span></span>
//                           </Link>
//                         ))}
//                         <Link to="/products" className="px-1.5 py-1 text-[14px] font-semibold text-dd-red">All products</Link>
//                       </div>
//                     )}
//                     {isOpen && n.menu === "company" && (
//                       <div className="grid py-2 pl-4 mb-2 ml-3 border-l border-dd-line">
//                         {companyLinks.map((c) => <Link key={c.to} to={c.to} className="block rounded-md py-1.5 text-[15px] text-dd-ink hover:text-dd-red">{c.label}</Link>)}
//                       </div>
//                     )}
//                     {isOpen && n.menu === "services" && (
//                       <div className="grid gap-4 py-2 pl-4 mb-2 ml-3 border-l border-dd-line">
//                         {servicesMenu.map((col) => (
//                           <div key={col.title}>
//                             <p className="py-1 text-[13px] font-semibold text-dd-slate">{col.title}</p>
//                             <ul className="grid">
//                               {col.items?.map((item) => (
//                                 <li key={item.label}><Link to={item.to} className="block rounded-md py-1.5 text-[15px] text-dd-ink hover:text-dd-red">{item.label}</Link></li>
//                               ))}
//                             </ul>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//               <div className="mt-2 flex flex-wrap gap-2 px-3 text-[14px] font-semibold" dir="ltr">
//                 <Link to="/" className={`rounded-full px-3 py-1.5 ring-1 ring-dd-line ${!isUAE ? "bg-dd-navy text-white" : "text-dd-ink"}`}>India</Link>
//                 <Link to="/uae" className={`rounded-full px-3 py-1.5 ring-1 ring-dd-line ${isUAE && !isAR ? "bg-dd-navy text-white" : "text-dd-ink"}`}>UAE English</Link>
//                 <Link to="/uae/ar" className={`rounded-full px-3 py-1.5 ring-1 ring-dd-line ${isAR ? "bg-dd-navy text-white" : "text-dd-ink"}`}>UAE عربي</Link>
//               </div>
//               {tel ? (
//                 <a href={`tel:${tel}`} className="mt-2 flex items-center gap-2 rounded-lg px-3 py-3 text-[16px] font-semibold text-dd-ink">
//                   <Phone className="w-4 h-4 text-dd-red" /> <bdi>{phone}</bdi>
//                 </a>
//               ) : null}
//               <Link to={auditHref} className="mt-1 inline-flex items-center justify-center rounded-xl bg-dd-red px-4 py-3 text-[16px] font-semibold text-white">
//                 {auditLabel}
//               </Link>
//             </nav>
//           </div>
//         )}
//       </header>

//       {/* mobile sticky action bar — the always-visible lead capture on phones */}
//       <div className={`fixed inset-x-0 bottom-0 z-40 grid ${tel ? "grid-cols-3" : "grid-cols-2"} border-t border-dd-line bg-white/95 backdrop-blur md:hidden`}>
//         {tel ? (
//           <a href={`tel:${tel}`} className="flex flex-col items-center gap-0.5 py-2.5 text-[12px] font-semibold text-dd-ink">
//             <Phone className="h-[18px] w-[18px] text-dd-red" /> {isAR ? "اتصال" : "Call"}
//           </a>
//         ) : null}
//         <a
//           href={waLink(waMsg, region)}
//           target="_blank"
//           rel="noopener"
//           className="flex flex-col items-center gap-0.5 py-2.5 text-[12px] font-semibold text-dd-ink"
//         >
//           <MessageCircle className="h-[18px] w-[18px] text-dd-go" /> {isAR ? "واتساب" : "WhatsApp"}
//         </a>
//         <Link to={auditHref} className="flex flex-col items-center justify-center bg-dd-red py-2.5 text-[13px] font-semibold leading-tight text-white">
//           {isAR ? "تقييم مجاني" : "Free audit"}
//         </Link>
//       </div>
//     </>
//   );
// }



import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone, ChevronDown, MessageCircle } from "lucide-react";
import logo from "../../assets/dd.webp";
import { servicesMenu } from "../../static/servicesData";
import { products, companyLinks } from "../../static/productsData";
import { ProductsMegaMenu } from "./ProductsMegaMenu";
import { SITE, waLink } from "../../static/siteConfig";

type MenuKey = "products" | "services" | "company";
type NavItem = { to: string; label: string; menu?: MenuKey };

function buildNav(home: string, ar: boolean): NavItem[] {
  // Main India site: proper routed pages (no hash links)
  if (home === "/") {
    return [
      { to: "/", label: "Home" },
      { to: "/about", label: "About" },
      { to: "/services/ai-integration-service", label: "Services", menu: "services" },
      { to: "/portfolio", label: "Portfolio" },
      { to: "/products", label: "Products", menu: "products" },
      { to: "/contact", label: "Contact" },
      { to: "/team", label: "Company", menu: "company" },
    ];
  }
  // UAE landing pages keep their on-page sections
  return [
    { to: "/ai-agents", label: ar ? "وكلاء الذكاء الاصطناعي" : "AI Agents" },
    { to: `${home}#automation`, label: ar ? "الأتمتة" : "Automation" },
    { to: `${home}#industries`, label: ar ? "القطاعات" : "Industries" },
    { to: `${home}#pricing`, label: ar ? "الأسعار" : "Pricing" },
    { to: "/portfolio", label: ar ? "أعمالنا" : "Work" },
    { to: "/contact", label: ar ? "تواصل معنا" : "Contact" },
  ];
}

const linkCls = "text-[15px] font-medium text-dd-ink/75 transition-colors hover:text-dd-ink";

// About and Portfolio are top-level links, so keep them out of Company dropdown.
const companyDropdownLinks = companyLinks.filter(
  (item) => !/about|portfolio/i.test(item.label),
);

export function Header() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const path = location.pathname.replace(/\/+$/, "") || "/";
  const isUAE = path === "/uae" || path.startsWith("/uae/");
  const isAR = path === "/uae/ar";
  const home = isAR ? "/uae/ar" : isUAE ? "/uae" : "/";
  const nav = buildNav(home, isAR);
  const auditHref = home === "/" ? "/contact" : `${home}#audit`;
  const auditLabel = isAR ? "تقييم أتمتة مجاني" : "Free automation audit";
  const region = isUAE ? "AE" : "IN";
  const tel = isUAE ? SITE.telAE : SITE.telIN;
  const phone = isUAE ? SITE.phoneAE : SITE.phoneIN;
  const waMsg = isAR ? "مرحبًا Deific Digital، أريد معرفة المزيد عن الأتمتة بالذكاء الاصطناعي." : "Hi Deific Digital, I want to know more about AI automation.";

  useEffect(() => {
    setOpen(false);
    setOpenMenu(null);
  }, [location.pathname, location.hash]);

  // close mega menus on outside click / Escape
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenMenu(null);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <>
      <header ref={headerRef} className="sticky top-0 z-50 w-full border-b border-dd-line/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <Link to={home} className="flex shrink-0 items-center gap-2.5" aria-label="Deific Digital home" dir="ltr">
            <img src={logo} alt="" width={34} height={34} className="h-[34px] w-[34px] rounded-lg" />
            <span className="font-brand text-[21px] font-semibold text-dd-ink">
              Deific <span className="text-dd-red">Digital</span>
            </span>
          </Link>

          {/* desktop nav */}
          <nav aria-label="Main" className="items-center hidden gap-6 xl:flex">
            {nav.map((n) => {
              if (n.menu) {
                const isOpen = openMenu === n.menu;
                const showCls = isOpen
                  ? "visible opacity-100"
                  : "invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100";
                return (
                  <div key={n.label} className={`group flex h-[68px] items-center ${n.menu === "company" ? "relative" : ""}`}>
                    <button
                      type="button"
                      className={`${linkCls} flex items-center gap-1`}
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                      onClick={() => setOpenMenu(isOpen ? null : n.menu!)}
                    >
                      {n.label}
                      <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                    </button>

                    {n.menu === "company" ? (
                      <div className={`absolute left-0 top-full z-50 w-72 rounded-b-2xl border border-dd-line bg-white p-2 shadow-[0_24px_60px_-30px_rgba(11,31,77,0.35)] transition-opacity duration-150 ${showCls}`}>
                        {companyDropdownLinks.map((c) => (
                          <Link key={c.to} to={c.to} className="block rounded-xl px-4 py-2.5 hover:bg-dd-paper">
                            <span className="block text-[14px] font-semibold text-dd-ink">{c.label}</span>
                            <span className="block text-[12.5px] text-dd-slate">{c.desc}</span>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className={`fixed left-0 right-0 top-[68px] z-50 border-b border-dd-line bg-white shadow-[0_24px_60px_-30px_rgba(11,31,77,0.35)] transition-opacity duration-150 ${showCls}`}>
                        {n.menu === "products" ? (
                          <ProductsMegaMenu />
                        ) : (
                          <div className="mx-auto grid max-w-[1200px] grid-cols-5 gap-8 px-8 py-10">
                            {servicesMenu.map((col) => (
                              <div key={col.title}>
                                <p className="mb-3 text-[14px] font-semibold text-dd-ink">{col.title}</p>
                                <ul className="space-y-2.5">
                                  {col.items?.map((item) => (
                                    <li key={item.label}>
                                      <Link to={item.to} className="text-[14px] text-dd-slate hover:text-dd-red">{item.label}</Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              }
              return n.to.includes("#") ? (
                <Link key={n.label} to={n.to} className={linkCls}>{n.label}</Link>
              ) : (
                <NavLink key={n.label} to={n.to} className={({ isActive }) => `${linkCls} ${isActive ? "!text-dd-red" : ""}`}>{n.label}</NavLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden items-center rounded-full bg-dd-paper p-1 text-[13px] font-semibold ring-1 ring-dd-line lg:flex" aria-label="Region" dir="ltr">
              <Link to="/" hrefLang="en-IN" className={`rounded-full px-2.5 py-1 ${!isUAE ? "bg-white text-dd-ink shadow-sm" : "text-dd-slate"}`}>
                India
              </Link>
              <Link to="/uae" hrefLang="en-AE" className={`rounded-full px-2.5 py-1 ${isUAE ? "bg-white text-dd-ink shadow-sm" : "text-dd-slate"}`}>
                UAE
              </Link>
            </div>
            {isUAE ? (
              <div className="flex items-center rounded-full bg-dd-paper p-1 text-[13px] font-semibold ring-1 ring-dd-line" aria-label="Language" dir="ltr">
                <Link to="/uae" hrefLang="en-AE" lang="en" className={`rounded-full px-2.5 py-1 ${!isAR ? "bg-white text-dd-ink shadow-sm" : "text-dd-slate"}`}>
                  EN
                </Link>
                <Link to="/uae/ar" hrefLang="ar-AE" lang="ar" className={`rounded-full px-2.5 py-1 ${isAR ? "bg-white text-dd-ink shadow-sm" : "text-dd-slate"}`}>
                  عربي
                </Link>
              </div>
            ) : null}
            <a
              href={waLink(waMsg, region)}
              target="_blank"
              rel="noopener"
              aria-label="Chat on WhatsApp"
              className="hidden w-10 h-10 transition rounded-full place-items-center text-dd-go ring-1 ring-dd-line hover:bg-dd-paper md:grid"
            >
              <MessageCircle className="h-[18px] w-[18px]" />
            </a>
            <Link
              to={auditHref}
              className="hidden rounded-xl bg-dd-red px-4 py-2.5 text-[14px] font-semibold text-white transition hover:bg-dd-redink sm:inline-flex"
            >
              {auditLabel}
            </Link>
            <button
              onClick={() => setOpen((o) => !o)}
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl ring-1 ring-dd-line xl:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* mobile nav */}
        {open && (
          <div className="max-h-[calc(100vh-68px)] overflow-y-auto border-t border-dd-line bg-white xl:hidden">
            <nav aria-label="Mobile" className="mx-auto grid max-w-[1200px] gap-1 px-4 py-4">
              {nav.map((n) => {
                if (!n.menu) {
                  return <Link key={n.label} to={n.to} className="rounded-lg px-3 py-3 text-[16px] font-medium text-dd-ink hover:bg-dd-paper">{n.label}</Link>;
                }
                const isOpen = openMenu === n.menu;
                return (
                  <div key={n.label}>
                    <button
                      onClick={() => setOpenMenu(isOpen ? null : n.menu!)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-[16px] font-medium text-dd-ink hover:bg-dd-paper"
                    >
                      {n.label}
                      <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isOpen && n.menu === "products" && (
                      <div className="grid gap-2 py-2 pl-4 mb-2 ml-3 border-l border-dd-line">
                        {products.map((p) => (
                          <Link key={p.slug} to={`/products/${p.slug}`} className="flex items-center gap-3 rounded-lg p-1.5 hover:bg-dd-paper">
                            <img src={p.image} alt="" loading="lazy" className="object-cover w-16 h-12 rounded-md" />
                            <span><span className="block text-[15px] font-semibold text-dd-ink">{p.name}</span><span className="block text-[12.5px] text-dd-slate">{p.navLine}</span></span>
                          </Link>
                        ))}
                        <Link to="/products" className="px-1.5 py-1 text-[14px] font-semibold text-dd-red">All products</Link>
                      </div>
                    )}
                    {isOpen && n.menu === "company" && (
                      <div className="grid py-2 pl-4 mb-2 ml-3 border-l border-dd-line">
                        {companyDropdownLinks.map((c) => <Link key={c.to} to={c.to} className="block rounded-md py-1.5 text-[15px] text-dd-ink hover:text-dd-red">{c.label}</Link>)}
                      </div>
                    )}
                    {isOpen && n.menu === "services" && (
                      <div className="grid gap-4 py-2 pl-4 mb-2 ml-3 border-l border-dd-line">
                        {servicesMenu.map((col) => (
                          <div key={col.title}>
                            <p className="py-1 text-[13px] font-semibold text-dd-slate">{col.title}</p>
                            <ul className="grid">
                              {col.items?.map((item) => (
                                <li key={item.label}><Link to={item.to} className="block rounded-md py-1.5 text-[15px] text-dd-ink hover:text-dd-red">{item.label}</Link></li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="mt-2 flex flex-wrap gap-2 px-3 text-[14px] font-semibold" dir="ltr">
                <Link to="/" className={`rounded-full px-3 py-1.5 ring-1 ring-dd-line ${!isUAE ? "bg-dd-navy text-white" : "text-dd-ink"}`}>India</Link>
                <Link to="/uae" className={`rounded-full px-3 py-1.5 ring-1 ring-dd-line ${isUAE && !isAR ? "bg-dd-navy text-white" : "text-dd-ink"}`}>UAE English</Link>
                <Link to="/uae/ar" className={`rounded-full px-3 py-1.5 ring-1 ring-dd-line ${isAR ? "bg-dd-navy text-white" : "text-dd-ink"}`}>UAE عربي</Link>
              </div>
              {tel ? (
                <a href={`tel:${tel}`} className="mt-2 flex items-center gap-2 rounded-lg px-3 py-3 text-[16px] font-semibold text-dd-ink">
                  <Phone className="w-4 h-4 text-dd-red" /> <bdi>{phone}</bdi>
                </a>
              ) : null}
              <Link to={auditHref} className="mt-1 inline-flex items-center justify-center rounded-xl bg-dd-red px-4 py-3 text-[16px] font-semibold text-white">
                {auditLabel}
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* mobile sticky action bar — the always-visible lead capture on phones */}
      <div className={`fixed inset-x-0 bottom-0 z-40 grid ${tel ? "grid-cols-3" : "grid-cols-2"} border-t border-dd-line bg-white/95 backdrop-blur md:hidden`}>
        {tel ? (
          <a href={`tel:${tel}`} className="flex flex-col items-center gap-0.5 py-2.5 text-[12px] font-semibold text-dd-ink">
            <Phone className="h-[18px] w-[18px] text-dd-red" /> {isAR ? "اتصال" : "Call"}
          </a>
        ) : null}
        <a
          href={waLink(waMsg, region)}
          target="_blank"
          rel="noopener"
          className="flex flex-col items-center gap-0.5 py-2.5 text-[12px] font-semibold text-dd-ink"
        >
          <MessageCircle className="h-[18px] w-[18px] text-dd-go" /> {isAR ? "واتساب" : "WhatsApp"}
        </a>
        <Link to={auditHref} className="flex flex-col items-center justify-center bg-dd-red py-2.5 text-[13px] font-semibold leading-tight text-white">
          {isAR ? "تقييم مجاني" : "Free audit"}
        </Link>
      </div>
    </>
  );
}

