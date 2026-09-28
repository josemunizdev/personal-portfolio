"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

function currentTheme(): Theme {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// Theme lives on <html data-theme> plus the OS setting; subscribe to both so
// the button label stays accurate if either changes.
function subscribe(onChange: () => void) {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", onChange);
  window.addEventListener("themechange", onChange);
  return () => {
    mq.removeEventListener("change", onChange);
    window.removeEventListener("themechange", onChange);
  };
}

// "2 a.m. mode" is dark mode, named after the hour production incidents
// prefer. The choice persists per browser; storage failures are non-fatal.
export function ThemeToggle() {
  const theme = useSyncExternalStore<Theme | null>(subscribe, currentTheme, () => null);

  function toggle() {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private browsing or blocked storage: the toggle still works for this visit.
    }
    window.dispatchEvent(new Event("themechange"));
  }

  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      title={isDark ? "Back to business hours" : "Switch to 2 a.m. mode"}
      className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-2 py-1 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent"
    >
      <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        {/* A pager: the traditional bearer of 2 a.m. news. */}
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <rect x="6" y="9" width="9" height="4" rx="0.5" />
        <path d="M18 10v2" />
      </svg>
      <span className="hidden sm:inline">{isDark ? "2 a.m. mode" : "9 to 5 mode"}</span>
      <span className="sr-only sm:hidden">{isDark ? "2 a.m. mode on" : "2 a.m. mode off"}</span>
    </button>
  );
}
