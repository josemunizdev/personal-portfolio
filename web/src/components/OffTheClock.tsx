"use client";

import { useState } from "react";

import { StickerArt } from "@/components/Stickers";
import { profile } from "@/data/profile";

// Trading-card style hobby cards. Click (or Enter/Space) flips a card to its
// back. Both faces stay in the DOM, so screen readers get the full text.
export function OffTheClock() {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  return (
    <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      {profile.offClock.map((c) => {
        const isFlipped = !!flipped[c.id];
        return (
          <li key={c.id} className="flip" data-flipped={isFlipped}>
            <button
              type="button"
              onClick={() => setFlipped((f) => ({ ...f, [c.id]: !f[c.id] }))}
              aria-pressed={isFlipped}
              className="flip-inner relative grid h-full w-full text-left [&>*]:[grid-area:1/1]"
            >
              <span className="flip-face flex flex-col rounded-xl border-2 border-accent/30 bg-surface p-3 shadow-sm">
                <span className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-semibold">{c.title}</span>
                </span>
                <span className="my-2 flex aspect-[4/3] items-center justify-center rounded-lg bg-accent-soft p-3">
                  <StickerArt id={c.id} className="h-full max-h-20 w-auto" />
                </span>
                <span className="font-mono text-[0.65rem] tracking-wider text-accent uppercase">{c.kicker}</span>
                <span className="mt-1 text-sm leading-snug text-muted">{c.front}</span>
              </span>
              <span className="flip-face flip-back flex flex-col justify-between rounded-xl border-2 border-talavera/40 bg-talavera-soft p-4">
                <span className="text-sm leading-relaxed">{c.back}</span>
                <span className="mt-3 font-mono text-[0.65rem] text-faint">Tap to flip back</span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
