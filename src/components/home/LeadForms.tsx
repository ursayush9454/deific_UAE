import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { submitLead } from "@/lib/leads";
import { COPY_EN, type Copy } from "@/static/copy";

const inputCls =
  "w-full min-w-0 rounded-xl border border-dd-line bg-white px-4 py-3 text-[15px] text-dd-ink placeholder:text-dd-slate/60 outline-none transition focus:border-dd-navy focus:ring-4 focus:ring-dd-navy/10";

function CountryCode({ value, onChange, label = "Country code" }: { value: string; onChange: (v: string) => void; label?: string }) {
  return (
    <select
      aria-label={label}
      dir="ltr"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="shrink-0 rounded-xl border border-dd-line bg-white px-2.5 py-3 text-[15px] text-dd-ink outline-none focus:border-dd-navy"
    >
      <option value="+91">🇮🇳 +91</option>
      <option value="+971">🇦🇪 +971</option>
      <option value="+1">🇺🇸 +1</option>
      <option value="+44">🇬🇧 +44</option>
    </select>
  );
}

function validPhone(p: string) {
  return p.replace(/\D/g, "").length >= 7;
}

/** One-field hero capture: WhatsApp number → free audit. */
type RegionProps = { defaultCc?: string; region?: "IN" | "AE"; ui?: Copy["forms"] };

export function QuickAudit({ defaultCc = "+91", region = "IN", ui = COPY_EN.forms }: RegionProps = {}) {
  const [cc, setCc] = useState(defaultCc);
  const [phone, setPhone] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validPhone(phone)) {
      setState("error");
      return;
    }
    setState("sending");
    await submitLead({ source: `Hero quick audit (${region})`, phone: `${cc} ${phone}` }, { region });
    setState("done");
  }

  if (state === "done") {
    return (
      <p className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3.5 text-[15px] text-dd-ink ring-1 ring-dd-line">
        <CheckCircle2 className="h-5 w-5 text-dd-go" />
        {ui.quickDone}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-[520px]">
      <label htmlFor="hero-phone" className="mb-2 block text-[14px] font-medium text-dd-ink">
        {ui.quickLabel}
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex flex-1 gap-2">
          <CountryCode value={cc} onChange={setCc} label={ui.countryCode} />
          <input
            id="hero-phone"
            dir="ltr"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder="98765 43210"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (state === "error") setState("idle");
            }}
            aria-invalid={state === "error"}
            aria-describedby="hero-phone-hint"
            className={inputCls}
          />
        </div>
        <button
          type="submit"
          disabled={state === "sending"}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-dd-red px-5 py-3 text-[15px] font-semibold text-white transition hover:bg-dd-redink disabled:opacity-70"
        >
          {state === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {ui.quickButton}
        </button>
      </div>
      <p id="hero-phone-hint" className={`mt-2 text-[13px] ${state === "error" ? "text-dd-redink" : "text-dd-slate"}`}>
        {state === "error"
          ? ui.quickError
          : ui.quickHint}
      </p>
    </form>
  );
}

/** Full audit form (bottom of page). */
export function AuditForm({ source = "Audit form", defaultCc = "+91", region = "IN", ui = COPY_EN.forms }: { source?: string } & RegionProps) {
  const [cc, setCc] = useState(defaultCc);
  const [f, setF] = useState({ name: "", phone: "", email: "", business: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((s) => ({ ...s, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!f.name.trim()) err.name = ui.errName;
    if (!validPhone(f.phone)) err.phone = ui.errPhone;
    if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) err.email = ui.errEmail;
    setErrors(err);
    if (Object.keys(err).length) return;
    setState("sending");
    await submitLead({ source, ...f, phone: `${cc} ${f.phone}` }, { region });
    setState("done");
  }

  if (state === "done") {
    return (
      <div className="rounded-2xl bg-white p-8 text-dd-ink ring-1 ring-dd-line">
        <CheckCircle2 className="h-8 w-8 text-dd-go" />
        <p className="mt-4 font-display text-2xl">{ui.doneTitle}</p>
        <p className="mt-2 text-dd-slate">
          {ui.doneText(f.name.split(" ")[0])}
        </p>
      </div>
    );
  }

  const err = (k: string) =>
    errors[k] ? (
      <p id={`${source}-${k}-err`} className="mt-1.5 text-[13px] text-dd-redink">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 rounded-2xl bg-white p-6 ring-1 ring-dd-line sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[14px] font-medium" htmlFor="af-name">{ui.name}</label>
          <input id="af-name" autoComplete="name" className={inputCls} value={f.name} onChange={set("name")} aria-invalid={!!errors.name} />
          {err("name")}
        </div>
        <div>
          <label className="mb-1.5 block text-[14px] font-medium" htmlFor="af-phone">{ui.phone}</label>
          <div className="flex gap-2">
            <CountryCode value={cc} onChange={setCc} label={ui.countryCode} />
            <input dir="ltr" id="af-phone" type="tel" inputMode="tel" autoComplete="tel-national" className={inputCls} value={f.phone} onChange={set("phone")} aria-invalid={!!errors.phone} />
          </div>
          {err("phone")}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[14px] font-medium" htmlFor="af-email">
            {ui.email} <span className="font-normal text-dd-slate">{ui.optional}</span>
          </label>
          <input dir="ltr" id="af-email" type="email" autoComplete="email" className={inputCls} value={f.email} onChange={set("email")} aria-invalid={!!errors.email} />
          {err("email")}
        </div>
        <div>
          <label className="mb-1.5 block text-[14px] font-medium" htmlFor="af-business">{ui.business}</label>
          <select id="af-business" className={inputCls} value={f.business} onChange={set("business")}>
            <option value="">{ui.choose}</option>
            {ui.businessTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-[14px] font-medium" htmlFor="af-msg">
          {ui.need}
        </label>
        <textarea
          id="af-msg"
          rows={3}
          className={inputCls}
          placeholder={ui.needPlaceholder}
          value={f.message}
          onChange={set("message")}
        />
      </div>
      <button
        type="submit"
        disabled={state === "sending"}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-dd-red px-6 py-3.5 text-[16px] font-semibold text-white transition hover:bg-dd-redink disabled:opacity-70"
      >
        {state === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {ui.submit}
      </button>
      <p className="text-[13px] text-dd-slate">{ui.privacy}</p>
    </form>
  );
}
