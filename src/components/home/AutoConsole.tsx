import { useEffect, useRef, useState } from "react";
import { Check, Clock3, Bot } from "lucide-react";
import { feed as defaultFeed, type FeedItem } from "@/static/homeContent";
import { COPY_EN, type Copy } from "@/static/copy";

/**
 * The hero "business console".
 * Manual mode: tasks pile up, waiting for your team.
 * Auto mode: AI agents pick tasks off one by one, live.
 */
export function AutoConsole({
  auto,
  feed = defaultFeed,
  ui = COPY_EN.console,
}: {
  auto: boolean;
  feed?: FeedItem[];
  ui?: Copy["console"];
}) {
  const [done, setDone] = useState(3); // rows handled so far (auto mode)
  const [handled, setHandled] = useState(1284);
  const ref = useRef<HTMLDivElement>(null);
  const visible = useRef(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDone(feed.length);
      return;
    }
    const id = window.setInterval(() => {
      if (!visible.current) return;
      setDone((d) => (d >= feed.length ? 1 : d + 1));
      setHandled((h) => h + 1);
    }, 2100);
    return () => window.clearInterval(id);
  }, [auto, feed.length]);

  // In auto mode the newest handled task sits on top.
  const rows = auto ? feed.slice(0, done).slice().reverse() : feed;
  const waitingCount = auto ? Math.max(0, 2 - (done % 3)) : 37;

  return (
    <div
      ref={ref}
      className="relative rounded-[22px] bg-dd-navy text-white shadow-[0_30px_80px_-30px_rgba(11,31,77,0.55)] ring-1 ring-white/10 overflow-hidden"
      aria-label={auto ? ui.ariaAuto : ui.ariaManual}
      role="img"
    >
      {/* top bar */}
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="flex gap-1.5" aria-hidden>
            <i className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <i className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <i className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </span>
          <span className="text-[13px] font-medium text-white/70">{ui.title}</span>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold transition-colors ${
            auto ? "bg-dd-go/20 text-[#5BE3A1]" : "bg-dd-red/20 text-[#FF8A8F]"
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${auto ? "bg-[#5BE3A1]" : "bg-[#FF8A8F]"}`} />
          {auto ? ui.autoOn : ui.manual}
        </span>
      </div>

      {/* counters */}
      <div className="grid grid-cols-2 border-b border-white/10">
        <div className="px-5 py-4 border-e border-white/10">
          <p className="text-[12px] text-white/55">{ui.handled}</p>
          <p className="font-display text-[30px] leading-none mt-1.5 tabular-nums">
            {auto ? handled.toLocaleString("en-IN") : "0"}
          </p>
        </div>
        <div className="px-5 py-4">
          <p className="text-[12px] text-white/55">{ui.waiting}</p>
          <p
            className={`font-display text-[30px] leading-none mt-1.5 tabular-nums ${
              auto ? "text-white" : "text-[#FF8A8F]"
            }`}
          >
            {waitingCount}
          </p>
        </div>
      </div>

      {/* task rows */}
      <ul className="h-[338px] overflow-hidden px-3 py-3 space-y-2" aria-hidden>
        {rows.map((r, i) => (
          <li
            key={auto ? `${r.task}-${done}` : r.task}
            className={`rounded-xl px-3.5 py-3 ${auto && i === 0 ? "dd-row-in bg-white/[0.09]" : "bg-white/[0.045]"}`}
          >
            <div className="flex items-start gap-3">
              <span
                className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full ${
                  auto ? "bg-dd-go text-white" : "bg-white/10 text-[#FF8A8F]"
                }`}
              >
                {auto ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : <Clock3 className="h-3.5 w-3.5" />}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="truncate text-[14px] font-medium">{r.task}</p>
                  <span className="shrink-0 text-[11px] text-white/45">{r.where}</span>
                </div>
                {auto ? (
                  <p className="mt-1 text-[12.5px] leading-snug text-white/65">
                    <span className="inline-flex items-center gap-1 text-[#5BE3A1]">
                      <Bot className="h-3 w-3" />
                      {r.agent}:
                    </span>{" "}
                    {r.result}
                  </p>
                ) : (
                  <p className="mt-1 text-[12.5px] text-[#FF8A8F]/90">
                    {r.waiting === "Missed"
                      ? ui.missed
                      : r.waiting === "Not done"
                        ? ui.notDone
                        : ui.waitingFor(r.waiting)}
                  </p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-dd-navy to-transparent" />
    </div>
  );
}
