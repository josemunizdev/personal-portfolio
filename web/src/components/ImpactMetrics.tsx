"use client";

import { useEffect, useRef, useState } from "react";

import { profile } from "@/data/profile";

const FROM = 1810;
const TO = 27;

function Hammer({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m15 12-8.5 8.5a2.12 2.12 0 0 1-3-3L12 9" />
      <path d="M17.64 15 22 10.64" />
      <path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25V7.86c0-.55-.45-1-1-1h-.34c-.85 0-1.65-.33-2.25-.93L13.9 4.69a2 2 0 0 0-2.83 0L10 5.76" />
    </svg>
  );
}

// The Clearinghouse card starts "broken" (crooked, red error count). The
// hammer fixes it and counts the errors down to the real result. All the
// facts are in the text either way; the interaction is a bonus.
function FixableMetric() {
  const m = profile.metrics[0];
  const [fixed, setFixed] = useState(false);
  const [swinging, setSwinging] = useState(false);
  const [count, setCount] = useState(FROM);
  const frame = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  function fix() {
    if (fixed) {
      setFixed(false);
      setCount(FROM);
      return;
    }
    setSwinging(true);
    window.setTimeout(() => setSwinging(false), 500);
    setFixed(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setCount(TO);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1100);
      const eased = 1 - (1 - t) ** 3;
      setCount(Math.round(FROM - (FROM - TO) * eased));
      if (t < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  }

  return (
    <li
      className={`relative bg-surface p-5 transition-transform duration-500 ${
        fixed ? "" : "z-10 -rotate-2 rounded-lg shadow-md sm:-rotate-1"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <p
          className={`font-mono text-2xl font-semibold tracking-tight tabular-nums ${
            fixed ? "text-good" : "text-bad"
          }`}
          aria-live="polite"
        >
          {count.toLocaleString("en-US")}
          <span className="ml-1 text-sm font-normal">errors</span>
        </p>
        <button
          type="button"
          onClick={fix}
          aria-pressed={fixed}
          title={fixed ? "Break it again" : "Fix it"}
          className="-m-1 rounded-md p-1.5 text-muted transition-colors hover:bg-accent-soft hover:text-accent"
        >
          <Hammer className={`size-5 ${swinging ? "animate-swing" : ""}`} />
          <span className="sr-only">{fixed ? "Reset the demo" : "Fix the Clearinghouse report"}</span>
        </button>
      </div>
      <p className="mt-1 text-sm font-medium">{m.label}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {m.value}. {m.detail}
      </p>
      <p className="mt-3 font-mono text-[0.7rem] text-faint">
        {fixed ? "Fixed. Took seven months in real life." : "Broken. Try the hammer."}
      </p>
    </li>
  );
}

export function ImpactMetrics() {
  return (
    <ul className="grid gap-px overflow-visible rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      <FixableMetric />
      {profile.metrics.slice(1).map((m) => (
        <li key={m.label} className="bg-surface p-5">
          <p className="font-mono text-2xl font-semibold tracking-tight text-accent">{m.value}</p>
          <p className="mt-1 text-sm font-medium">{m.label}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{m.detail}</p>
        </li>
      ))}
    </ul>
  );
}
