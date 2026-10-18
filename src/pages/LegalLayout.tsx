import { useEffect } from "react";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/pages/PropAI";
import { APP_NAME, COMPANY, PATHS, LAST_UPDATED } from "./propaiConfig";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');

/* Everything is scoped to .propai so your main site styles are untouched. */
.propai {
  font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
  color: #12224a;
  background: #fff;
  -webkit-font-smoothing: antialiased;
}
.propai h1, .propai h2, .propai h3, .propai .font-display {
  font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
}
.propai section[id] { scroll-margin-top: 80px; }
html:has(.propai) { scroll-behavior: smooth; }

@keyframes propai-blink { 0%, 80%, 100% { opacity: .25 } 40% { opacity: 1 } }
.propai .dot { animation: propai-blink 1.2s infinite; }
.propai .dot:nth-child(2) { animation-delay: .2s; }
.propai .dot:nth-child(3) { animation-delay: .4s; }

@media (prefers-reduced-motion: reduce) {
  html:has(.propai) { scroll-behavior: auto; }
  .propai * { animation: none !important; transition: none !important; }
}
`;

const legalLinks = [
  ["Privacy Policy", PATHS.privacy],
  ["Terms of Service", PATHS.terms],
  ["Data Deletion", PATHS.dataDeletion],
];

type LegalLayoutProps = { title: string; intro?: string; children: ReactNode };

export default function LegalLayout({
  title,
  intro,
  children,
}: LegalLayoutProps) {
  useEffect(() => {
    const prev = document.title;
    document.title = `${title} – ${APP_NAME}`;
    window.scrollTo(0, 0);
    return () => {
      document.title = prev;
    };
  }, [title]);

  return (
    <div className="propai min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <header className="sticky top-0 z-50 border-b border-[#e3e8f2]/70 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-[68px] max-w-[1000px] items-center justify-between px-6">
          <Logo href={PATHS.home} />
          <a
            href={PATHS.home}
            className="inline-flex items-center gap-1.5 text-[13px] text-[#6b7694] transition hover:text-[#12224a]"
          >
            <ArrowLeft size={14} /> Back to {APP_NAME}
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-[760px] px-6 py-14">
        <nav aria-label="Legal pages" className="mb-8 flex flex-wrap gap-2">
          {legalLinks.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="rounded-full border border-[#e3e8f2] px-4 py-1.5 text-[12px] font-medium text-[#12224a] transition hover:border-[#12224a]/30"
            >
              {label}
            </a>
          ))}
        </nav>
        <h1 className="text-[34px] font-bold leading-tight tracking-tight text-[#12224a] sm:text-[40px]">
          {title}
        </h1>
        <p className="mt-3 text-[12px] text-[#6b7694]">
          Last updated: {LAST_UPDATED}
        </p>
        {intro && (
          <p className="mt-6 text-[14px] leading-relaxed text-[#6b7694]">
            {intro}
          </p>
        )}
        <div className="mt-10 space-y-10">{children}</div>
      </main>

      <footer className="mx-auto max-w-[1000px] px-6 pb-8">
        <div className="flex flex-col justify-between gap-2 border-t border-[#e3e8f2] pt-5 text-[10.5px] text-[#6b7694] sm:flex-row">
          <p>
            © 2026 {APP_NAME}, a product of {COMPANY.name}. All rights reserved.
          </p>
          <p>
            {COMPANY.email} · {COMPANY.phone}
          </p>
        </div>
      </footer>
    </div>
  );
}

/* Small building blocks so the policy text stays easy to edit */
export function Section({
  n,
  title,
  children,
}: {
  n: number;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="text-[20px] font-semibold tracking-tight text-[#12224a]">
        {n}. {title}
      </h2>
      <div className="mt-3 space-y-3 text-[14px] leading-relaxed text-[#3d4a6b]">
        {children}
      </div>
    </section>
  );
}

export function UL({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );
}

export const B = ({ children }: { children: ReactNode }) => (
  <strong className="font-semibold text-[#12224a]">{children}</strong>
);
