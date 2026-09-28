"use client";

import { useState } from "react";

// Placeholder until the real Memoji images arrive. To swap in a real one,
// drop the PNG in src/assets/, import it, and render it where <Placeholder />
// is: `import wave from "@/assets/memoji-wave.png"` then
// `<img src={wave.src} alt="" ... />`. Static imports keep the base path right.
function Placeholder() {
  return (
    <svg viewBox="0 0 120 120" className="size-full" aria-hidden="true">
      <circle cx="60" cy="60" r="58" fill="var(--accent-soft)" />
      <path d="M22 108c6-22 22-32 38-32s32 10 38 32" fill="var(--accent)" opacity="0.85" />
      <circle cx="60" cy="50" r="24" fill="var(--surface)" stroke="var(--accent)" strokeWidth="3" />
      <circle cx="51" cy="48" r="3" fill="var(--ink)" />
      <circle cx="69" cy="48" r="3" fill="var(--ink)" />
      <path d="M51 59c5 5 13 5 18 0" stroke="var(--ink)" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// Clicking the avatar a few times earns a hello. Small, optional, harmless.
export function Memoji() {
  const [clicks, setClicks] = useState(0);
  const greeting = clicks >= 3;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setClicks((c) => c + 1)}
        aria-label="José's Memoji. Click to say hi."
        className={`block size-28 rounded-full sm:size-32 ${clicks > 0 && !greeting ? "animate-shake" : ""}`}
        key={clicks}
      >
        <Placeholder />
      </button>
      {greeting ? (
        <p
          role="status"
          className="animate-pop absolute -top-3 left-24 rounded-xl rounded-bl-none border border-line bg-surface px-3 py-1.5 text-sm font-medium whitespace-nowrap shadow-sm sm:left-28"
        >
          ¡Hola! Thanks for stopping by.
        </p>
      ) : null}
    </div>
  );
}
