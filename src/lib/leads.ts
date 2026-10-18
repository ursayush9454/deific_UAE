import { waLink } from "@/static/siteConfig";

// ─────────────────────────────────────────────────────────────
// Lead capture
//
// 1. If VITE_LEAD_ENDPOINT is set (e.g. your n8n webhook or
//    backend /api/inquiries), the lead is POSTed there as JSON.
// 2. WhatsApp always opens with the lead details pre-filled, so
//    no lead is lost even if the endpoint is down or not set.
//
// .env example:
//   VITE_LEAD_ENDPOINT=https://n8n.yourdomain.com/webhook/website-lead
// ─────────────────────────────────────────────────────────────

export type Lead = {
  source: string; // which form on the site
  name?: string;
  phone?: string;
  email?: string;
  business?: string;
  message?: string;
  [key: string]: string | number | undefined;
};

const ENDPOINT: string | undefined = (import.meta as any)?.env?.VITE_LEAD_ENDPOINT;

export function leadToText(lead: Lead) {
  const lines = [`Hi Deific Digital, I'd like a free automation audit.`];
  const label: Record<string, string> = {
    name: "Name",
    phone: "Phone",
    email: "Email",
    business: "Business",
    message: "Need",
  };
  for (const [k, v] of Object.entries(lead)) {
    if (k === "source" || v === undefined || v === "") continue;
    lines.push(`${label[k] ?? k}: ${v}`);
  }
  lines.push(`(via website: ${lead.source})`);
  return lines.join("\n");
}

export async function submitLead(lead: Lead, opts: { openWhatsApp?: boolean; region?: "IN" | "AE" } = {}) {
  const payload = {
    ...lead,
    region: opts.region ?? "IN",
    page: typeof window !== "undefined" ? window.location.href : "",
    submittedAt: new Date().toISOString(),
  };

  let saved = false;
  if (ENDPOINT) {
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      saved = res.ok;
    } catch {
      saved = false;
    }
  }

  // GA4 / GTM conversion event (no-op if not installed)
  try {
    (window as any).dataLayer?.push({ event: "generate_lead", lead_source: lead.source });
    (window as any).gtag?.("event", "generate_lead", { lead_source: lead.source });
  } catch {
    /* ignore */
  }

  if (opts.openWhatsApp !== false && (!saved || opts.openWhatsApp)) {
    window.open(waLink(leadToText(lead), opts.region ?? "IN"), "_blank", "noopener");
  }
  return { saved };
}
