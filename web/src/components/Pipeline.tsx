"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Mirrors the real MuleSoft pipeline: every build is tested before it is
// promoted through each environment.
const STAGES = ["Commit", "Build", "MUnit tests", "Deploy UAT", "Deploy Prod"];
const STEP_MS = 450;

export function Pipeline() {
  const [done, setDone] = useState(0);
  const [running, setRunning] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const hasRun = useRef(false);

  const run = useCallback(() => {
    timers.current.forEach(window.clearTimeout);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDone(STAGES.length);
      return;
    }
    setDone(0);
    setRunning(true);
    timers.current = STAGES.map((_, i) =>
      window.setTimeout(() => {
        setDone(i + 1);
        if (i === STAGES.length - 1) setRunning(false);
      }, STEP_MS * (i + 1)),
    );
  }, []);

  // Run once, the first time the strip scrolls into view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          run();
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    const pending = timers.current;
    return () => {
      observer.disconnect();
      pending.forEach(window.clearTimeout);
    };
  }, [run]);

  const finished = done === STAGES.length;
  return (
    <div ref={ref} className="mb-10 rounded-xl border border-line bg-surface p-4">
      <ol className="flex flex-wrap items-center gap-x-1 gap-y-2 font-mono text-xs" aria-label="Deployment pipeline">
        {STAGES.map((stage, i) => {
          const state = i < done ? "done" : i === done && running ? "active" : "idle";
          return (
            <li key={stage} className="flex items-center gap-1">
              <span
                className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 transition-colors duration-300 ${
                  state === "done"
                    ? "border-good/40 bg-good/10 text-good"
                    : state === "active"
                      ? "border-accent bg-accent-soft text-accent"
                      : "border-line text-faint"
                }`}
              >
                <span
                  className={`size-1.5 rounded-full ${
                    state === "done" ? "bg-good" : state === "active" ? "animate-pulse bg-accent" : "bg-faint"
                  }`}
                  aria-hidden="true"
                />
                {stage}
              </span>
              {i < STAGES.length - 1 ? (
                <span className={i < done - 1 ? "text-good" : "text-faint"} aria-hidden="true">
                  →
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
      <div className="mt-3 flex items-center justify-between gap-3 text-xs">
        <p className="font-mono text-muted" aria-live="polite">
          {finished ? "44 APIs promoted this way. Nobody got paged." : running ? "Running..." : "Waiting for a commit."}
        </p>
        <button
          type="button"
          onClick={run}
          disabled={running}
          className="shrink-0 rounded-md border border-line px-2 py-1 font-mono text-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
        >
          Run pipeline
        </button>
      </div>
    </div>
  );
}
