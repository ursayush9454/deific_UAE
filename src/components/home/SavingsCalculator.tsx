import { useMemo, useState } from "react";
import { submitLead } from "@/lib/leads";
import { CheckCircle2, Loader2 } from "lucide-react";
import { COPY_EN, type Copy } from "@/static/copy";

type Currency = "INR" | "AED";

const DEFAULT_SALARY: Record<Currency, number> = { INR: 25000, AED: 6000 };
const HOURS_PER_MONTH = 176; // 22 working days × 8 hours

function money(n: number, c: Currency) {
  const v = Math.round(n);
  return c === "INR"
    ? "₹" + v.toLocaleString("en-IN")
    : "AED " + v.toLocaleString("en-AE");
}

function Range({
  id,
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
  display: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[15px] font-medium text-dd-ink">
          {label}
        </label>
        <output htmlFor={id} className="font-display text-[22px] tabular-nums text-dd-navy">
          <bdi>{display}</bdi>
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-[#D7141C]"
      />
    </div>
  );
}

export function SavingsCalculator({
  defaultCurrency = "INR",
  region = "IN",
  ui = COPY_EN.calc,
}: { defaultCurrency?: Currency; region?: "IN" | "AE"; ui?: Copy["calc"] } = {}) {
  const [currency, setCurrency] = useState<Currency>(defaultCurrency);
  const [people, setPeople] = useState(8);
  const [salary, setSalary] = useState(DEFAULT_SALARY[defaultCurrency]);
  const [repetitive, setRepetitive] = useState(40);
  const [phone, setPhone] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const r = useMemo(() => {
    const share = repetitive / 100;
    const low = 0.6, high = 0.8; // automation takes 60–80% of repetitive work
    return {
      hoursLow: people * HOURS_PER_MONTH * share * low,
      hoursHigh: people * HOURS_PER_MONTH * share * high,
      moneyLow: people * salary * share * low,
      moneyHigh: people * salary * share * high,
    };
  }, [people, salary, repetitive]);

  function switchCurrency(c: Currency) {
    setCurrency(c);
    setSalary(DEFAULT_SALARY[c]);
  }

  async function sendPlan(e: React.FormEvent) {
    e.preventDefault();
    if (phone.replace(/\D/g, "").length < 7) {
      setState("error");
      return;
    }
    setState("sending");
    await submitLead({
      source: `Savings calculator (${region})`,
      phone,
      message: `Team: ${people} people, avg cost ${money(salary, currency)}/month, ${repetitive}% repetitive work. Estimated saving ${money(r.moneyLow, currency)}–${money(r.moneyHigh, currency)}/month.`,
    }, { region });
    setState("done");
  }

  const salaryMax = currency === "INR" ? 150000 : 30000;
  const salaryStep = currency === "INR" ? 1000 : 250;

  return (
    <div className="grid overflow-hidden rounded-[22px] ring-1 ring-dd-line lg:grid-cols-[1.1fr_1fr]">
      <div className="space-y-7 bg-white p-6 sm:p-9">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[15px] text-dd-slate">{ui.yourNumbers}</p>
          <div role="group" aria-label={ui.currency} className="inline-flex rounded-full bg-dd-paper p-1 ring-1 ring-dd-line">
            {(["INR", "AED"] as Currency[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => switchCurrency(c)}
                aria-pressed={currency === c}
                className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition ${
                  currency === c ? "bg-dd-navy text-white" : "text-dd-slate hover:text-dd-ink"
                }`}
              >
                {c === "INR" ? ui.inr : ui.aed}
              </button>
            ))}
          </div>
        </div>
        <Range id="calc-people" label={ui.people} value={people} min={1} max={100} step={1} onChange={setPeople} display={`${people}`} />
        <Range
          id="calc-salary"
          label={ui.salary}
          value={salary}
          min={currency === "INR" ? 8000 : 2000}
          max={salaryMax}
          step={salaryStep}
          onChange={setSalary}
          display={money(salary, currency)}
        />
        <Range
          id="calc-rep"
          label={ui.repetitive}
          value={repetitive}
          min={10}
          max={80}
          step={5}
          onChange={setRepetitive}
          display={`${repetitive}%`}
        />
        <p className="text-[13px] leading-relaxed text-dd-slate">
          {ui.how}
        </p>
      </div>

      <div className="flex flex-col justify-between gap-8 bg-dd-navy p-6 text-white sm:p-9">
        <div>
          <p className="text-[15px] text-white/65">{ui.freeUp}</p>
          <p className="mt-3 font-display text-[clamp(34px,5vw,52px)] leading-[1.02] tabular-nums">
            <bdi>{money(r.moneyLow, currency)}</bdi>
            <span className="text-white/50"> {ui.to} </span>
            <bdi>{money(r.moneyHigh, currency)}</bdi>
          </p>
          <p className="mt-4 text-[17px] text-white/80">
            {ui.and}{" "}
            <strong className="font-semibold text-white tabular-nums">
              <bdi>{Math.round(r.hoursLow).toLocaleString("en-IN")}–{Math.round(r.hoursHigh).toLocaleString("en-IN")}</bdi> {ui.hours}
            </strong>{" "}
            {ui.hoursTail}
          </p>
        </div>

        {state === "done" ? (
          <p className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3.5 text-[15px]">
            <CheckCircle2 className="h-5 w-5 text-[#5BE3A1]" /> {ui.planDone}
          </p>
        ) : (
          <form onSubmit={sendPlan} noValidate>
            <label htmlFor="calc-phone" className="mb-2 block text-[14px] text-white/80">
              {ui.planLabel}
            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                id="calc-phone"
                type="tel"
                inputMode="tel"
                placeholder={ui.planPlaceholder}
                dir="ltr"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (state === "error") setState("idle");
                }}
                aria-invalid={state === "error"}
                className="w-full rounded-xl bg-white px-4 py-3 text-[15px] text-dd-ink outline-none placeholder:text-dd-slate/60 focus:ring-4 focus:ring-white/25"
              />
              <button
                type="submit"
                disabled={state === "sending"}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-dd-red px-5 py-3 text-[15px] font-semibold text-white transition hover:bg-dd-redink disabled:opacity-70"
              >
                {state === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {ui.planButton}
              </button>
            </div>
            {state === "error" ? (
              <p className="mt-2 text-[13px] text-[#FF8A8F]">{ui.planError}</p>
            ) : null}
          </form>
        )}
      </div>
    </div>
  );
}
