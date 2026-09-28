"use client";

import { useEffect, useRef, useState } from "react";

import { profile } from "@/data/profile";

// Cable panel geometry, in a 400x150 viewBox. One cable per skill group runs
// from a patch panel on the left to a labeled port on the right.
const N = profile.skills.length;
const Y0 = 22;
const GAP = 21;
const portY = (i: number) => Y0 + GAP * i;
const COLORS = [
  "var(--accent)",
  "var(--talavera)",
  "var(--good)",
  "oklch(0.72 0.15 60)",
  "oklch(0.66 0.19 350)",
  "var(--muted)",
];
const SHORT = ["Integration", "Enterprise", "CI/CD", "Languages", "ML", "Practice"];

// Messy: each cable wanders to its port through loops and crossings.
function messy(i: number) {
  const y1 = portY(i);
  const y2 = portY(i);
  const wobble = (k: number) => Y0 + ((i * 37 + k * 53) % (GAP * (N - 1)));
  return `M 40 ${y1} C 120 ${wobble(1)}, 90 ${wobble(2) + 30}, 170 ${wobble(3)} S 260 ${wobble(4) - 20}, 230 ${wobble(5)} S 330 ${wobble(6)}, 300 ${y2}`;
}

// Tidy: fan into a bundle, run parallel, fan back out. Right angles with
// rounded corners, the way cables are supposed to look.
function tidy(i: number) {
  const y = portY(i);
  const by = 64 + i * 4;
  const r = 6;
  const down = by > y ? 1 : -1;
  const up = y > by ? 1 : -1;
  if (Math.abs(by - y) < r * 2) return `M 40 ${y} L 300 ${y}`;
  return [
    `M 40 ${y}`,
    `L ${90 - r} ${y}`,
    `Q 90 ${y} 90 ${y + down * r}`,
    `L 90 ${by - down * r}`,
    `Q 90 ${by} ${90 + r} ${by}`,
    `L ${250 - r} ${by}`,
    `Q 250 ${by} 250 ${by + up * r}`,
    `L 250 ${y - up * r}`,
    `Q 250 ${y} ${250 + r} ${y}`,
    `L 300 ${y}`,
  ].join(" ");
}

function CablePanel({ neat, onToggle }: { neat: boolean; onToggle: () => void }) {
  return (
    <div className="mb-8 rounded-xl border border-line bg-surface p-4">
      <svg viewBox="0 0 400 150" className="w-full" aria-hidden="true">
        <rect x="18" y="8" width="22" height={GAP * N + 4} rx="4" fill="var(--line)" />
        {profile.skills.map((_, i) => (
          <g key={i}>
            <path
              d={messy(i)}
              fill="none"
              stroke={COLORS[i]}
              strokeWidth="3"
              strokeLinecap="round"
              className="transition-opacity duration-500"
              opacity={neat ? 0 : 0.9}
            />
            <path
              d={tidy(i)}
              fill="none"
              stroke={COLORS[i]}
              strokeWidth="3"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset={neat ? 0 : 1}
              style={{ transition: `stroke-dashoffset 0.7s ease ${i * 70}ms` }}
            />
            <circle cx="29" cy={portY(i)} r="4" fill={COLORS[i]} />
            <rect x="300" y={portY(i) - 6} width="12" height="12" rx="2" fill="var(--surface)" stroke={COLORS[i]} strokeWidth="2" />
            <text x="318" y={portY(i) + 4} className="fill-muted font-mono text-[10px]">
              {SHORT[i]}
            </text>
          </g>
        ))}
      </svg>
      <div className="mt-2 flex items-center justify-between gap-3 text-xs">
        <p className="font-mono text-muted">
          {neat ? "Much better. Everything labeled, everything routed." : "Every stack starts like this."}
        </p>
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={neat}
          className="shrink-0 rounded-md border border-line px-2 py-1 font-mono text-muted transition-colors hover:border-accent hover:text-accent"
        >
          {neat ? "Make a mess" : "Tidy the cables"}
        </button>
      </div>
    </div>
  );
}

export function Skills() {
  const [neat, setNeat] = useState(false);
  const [explain, setExplain] = useState(false);
  const glossary: Record<string, string> = profile.glossary;

  const panel = useRef<HTMLDivElement>(null);

  // Show the mess briefly, then tidy up once the panel is on screen, so the
  // finished state is what most visitors end up looking at.
  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    let timer: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = window.setTimeout(() => setNeat(true), 1200);
          observer.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div ref={panel}>
        <CablePanel neat={neat} onToggle={() => setNeat((n) => !n)} />
      </div>

      <label className="mb-6 inline-flex cursor-pointer items-center gap-2 text-sm text-muted">
        <input
          type="checkbox"
          checked={explain}
          onChange={(e) => setExplain(e.target.checked)}
          className="peer sr-only"
        />
        <span
          className="relative h-5 w-9 rounded-full bg-line transition-colors peer-checked:bg-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent after:absolute after:top-0.5 after:left-0.5 after:size-4 after:rounded-full after:bg-surface after:transition-transform peer-checked:after:translate-x-4"
          aria-hidden="true"
        />
        Explain it like I&apos;m new here
      </label>

      <dl className="grid gap-8 sm:grid-cols-2">
        {profile.skills.map((g, i) => {
          const notes = g.items.filter((s) => glossary[s]);
          return (
            <div key={g.name}>
              <dt className="flex items-center gap-2 text-sm font-medium">
                <span className="size-2.5 rounded-sm" style={{ background: COLORS[i] }} aria-hidden="true" />
                {g.name}
              </dt>
              <dd className="mt-3">
                <ul className="flex flex-wrap gap-1.5">
                  {g.items.map((s) => (
                    <li
                      key={s}
                      className={`rounded-md border bg-surface px-2 py-0.5 font-mono text-xs transition-colors ${
                        explain && glossary[s] ? "border-accent/50 text-accent" : "border-line text-muted"
                      }`}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
                {explain && notes.length ? (
                  <ul className="animate-pop mt-3 space-y-1.5 border-l-2 border-accent-soft pl-3 text-sm">
                    {notes.map((s) => (
                      <li key={s}>
                        <span className="font-medium">{s}:</span>{" "}
                        <span className="text-muted">{glossary[s]}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </dd>
            </div>
          );
        })}
      </dl>
    </>
  );
}
