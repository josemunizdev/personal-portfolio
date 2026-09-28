import { profile } from "@/data/profile";

// Hand-drawn sticker art in a 48x48 viewBox. Deliberately generic shapes, no
// third-party logos or trademarked designs.
const ART: Record<string, React.ReactNode> = {
  jacaranda: (
    <g>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="24" cy="13" rx="7" ry="10" fill="#8e6cc7" transform={`rotate(${a} 24 24)`} />
      ))}
      <circle cx="24" cy="24" r="5" fill="#f4d35e" />
    </g>
  ),
  mexico: (
    <g>
      <rect x="6" y="12" width="12" height="24" fill="#006847" />
      <rect x="18" y="12" width="12" height="24" fill="#ffffff" />
      <rect x="30" y="12" width="12" height="24" fill="#ce1126" />
      <circle cx="24" cy="24" r="3.5" fill="#8b5a2b" />
      <rect x="6" y="12" width="36" height="24" fill="none" stroke="#00000022" />
    </g>
  ),
  firstgen: (
    <g>
      <path d="M4 20 24 11l20 9-20 9z" fill="#1d1a22" />
      <path d="M13 24v8c0 3 5 6 11 6s11-3 11-6v-8l-11 5z" fill="#2f2a36" />
      <path d="M40 22v10" stroke="#f4d35e" strokeWidth="2" />
      <circle cx="40" cy="33" r="2" fill="#f4d35e" />
    </g>
  ),
  pride: (
    <g>
      {["#e40303", "#ff8c00", "#ffed00", "#008026", "#004dff", "#750787"].map((c, i) => (
        <rect key={c} x="6" y={11 + i * 4.4} width="36" height="4.5" fill={c} />
      ))}
    </g>
  ),
  pc: (
    <g>
      <rect x="13" y="6" width="22" height="36" rx="3" fill="#2f2a36" />
      <rect x="16" y="10" width="16" height="3" rx="1" fill="#8e6cc7" />
      <circle cx="24" cy="26" r="7" fill="none" stroke="#85aaeb" strokeWidth="2" />
      <path d="M24 19v14M17 26h14" stroke="#85aaeb" strokeWidth="1.5" />
      <circle cx="30" cy="38" r="1.5" fill="#6fcf97" />
    </g>
  ),
  cable: (
    <g>
      <path d="M8 40c0-10 8-10 12-16s0-14 10-14" fill="none" stroke="#6d4aa8" strokeWidth="4" strokeLinecap="round" />
      <rect x="28" y="4" width="14" height="12" rx="2" fill="#2f2a36" />
      <path d="M32 4V0M38 4V0" stroke="#9a93a3" strokeWidth="2" />
    </g>
  ),
  printer: (
    <g>
      <path d="M8 8h32v34H8z" fill="none" stroke="#2f2a36" strokeWidth="3" />
      <rect x="18" y="12" width="12" height="6" rx="1" fill="#1f4e9c" />
      <path d="M24 18v6" stroke="#1f4e9c" strokeWidth="2" />
      <path d="M17 38l7-10 7 10z" fill="#e0763c" />
      <path d="M8 38h32" stroke="#2f2a36" strokeWidth="3" />
    </g>
  ),
  nas: (
    <g>
      <rect x="9" y="8" width="30" height="32" rx="3" fill="#2f2a36" />
      <rect x="13" y="13" width="22" height="6" rx="1" fill="#4a4353" />
      <rect x="13" y="22" width="22" height="6" rx="1" fill="#4a4353" />
      <circle cx="16" cy="34" r="1.8" fill="#6fcf97" />
      <circle cx="21" cy="34" r="1.8" fill="#85aaeb" />
    </g>
  ),
  card: (
    <g transform="rotate(-8 24 24)">
      <rect x="11" y="5" width="26" height="38" rx="3" fill="#3a2f22" />
      <rect x="14" y="8" width="20" height="4" rx="1" fill="#e9dcc0" />
      <rect x="14" y="14" width="20" height="13" rx="1" fill="#8e6cc7" />
      <rect x="14" y="29" width="20" height="10" rx="1" fill="#e9dcc0" />
    </g>
  ),
  dog: (
    <g>
      <ellipse cx="12" cy="20" rx="6" ry="11" fill="#8b5a2b" />
      <ellipse cx="36" cy="20" rx="6" ry="11" fill="#8b5a2b" />
      <circle cx="24" cy="25" r="13" fill="#c68a4e" />
      <circle cx="19" cy="22" r="2" fill="#1d1a22" />
      <circle cx="29" cy="22" r="2" fill="#1d1a22" />
      <ellipse cx="24" cy="30" rx="4" ry="3" fill="#1d1a22" />
    </g>
  ),
  cat: (
    <g>
      <path d="M10 22 12 6l10 9zM38 22 36 6l-10 9z" fill="#4a4353" />
      <circle cx="24" cy="26" r="14" fill="#4a4353" />
      <ellipse cx="18" cy="24" rx="2.2" ry="3" fill="#f4d35e" />
      <ellipse cx="30" cy="24" rx="2.2" ry="3" fill="#f4d35e" />
      <path d="M22 31h4l-2 2z" fill="#f0a6b8" />
      <path d="M10 30h8M10 33h8M30 30h8M30 33h8" stroke="#9a93a3" strokeWidth="1" />
    </g>
  ),
  headphones: (
    <g>
      <path d="M9 28v-4a15 15 0 0 1 30 0v4" fill="none" stroke="#2f2a36" strokeWidth="4" />
      <rect x="6" y="26" width="9" height="14" rx="3" fill="#6d4aa8" />
      <rect x="33" y="26" width="9" height="14" rx="3" fill="#6d4aa8" />
    </g>
  ),
  taco: (
    <g>
      <path d="M6 34a18 18 0 0 1 36 0z" fill="#f4c150" />
      <path d="M10 28c3-3 6 0 9-3s6 0 9-3 6 0 9 3" fill="none" stroke="#5aa845" strokeWidth="3" strokeLinecap="round" />
      <circle cx="17" cy="27" r="2" fill="#ce1126" />
      <circle cx="30" cy="26" r="2" fill="#ce1126" />
      <path d="M6 34h36" stroke="#d9a53a" strokeWidth="2" />
    </g>
  ),
  mulesoft: (
    <g>
      <path d="M24 24 10 10M24 24l14-14M24 24 10 38M24 24l14 14" stroke="#1f4e9c" strokeWidth="2.5" />
      <circle cx="24" cy="24" r="8" fill="#6d4aa8" />
      {[
        [10, 10],
        [38, 10],
        [10, 38],
        [38, 38],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="5" fill="#85aaeb" />
      ))}
    </g>
  ),
};

// Card ids that reuse a sticker's art.
ART.homelab = ART.nas;
ART.magic = ART.card;

export function StickerArt({ id, className = "size-full" }: { id: string; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      {ART[id]}
    </svg>
  );
}

function Wheel({ cx }: { cx: number }) {
  return (
    <g className="animate-spin-wheel">
      <circle cx={cx} cy="0" r="6" fill="#2f2a36" />
      <circle cx={cx} cy="0" r="2" fill="#9a93a3" />
      <path d={`M${cx - 5} 0h10`} stroke="#9a93a3" strokeWidth="1.2" />
    </g>
  );
}

// A flatcar carrying one sticker. The sticker rocks on its own clock; the car
// jostles slightly so the whole train reads as rolling.
function Car({ id, label, index }: { id: string; label: string; index: number }) {
  return (
    <li className="relative flex w-20 shrink-0 flex-col items-center sm:w-24" title={label}>
      <span
        className="animate-rock relative z-10 mb-1 block size-11 rounded-xl border-4 border-white bg-white p-0.5 shadow-md ring-1 ring-black/5 sm:size-12"
        style={{ animationDelay: `${-index * 0.27}s` }}
      >
        <StickerArt id={id} />
      </span>
      <svg viewBox="0 0 96 26" className="animate-jostle w-full" aria-hidden="true" style={{ animationDelay: `${-index * 0.13}s` }}>
        <rect x="4" y="2" width="88" height="10" rx="3" fill="var(--accent)" />
        <rect x="4" y="2" width="88" height="3" rx="1.5" fill="#ffffff" opacity="0.25" />
        <g transform="translate(0 18)">
          <Wheel cx={22} />
          <Wheel cx={74} />
        </g>
      </svg>
      {/* Coupler to the next car. */}
      <span className="absolute right-[-6px] bottom-[14px] h-1 w-3 rounded-full bg-faint" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </li>
  );
}

// A puffy cloud built from overlapping circles, centered on (0, 0).
function Cloud() {
  return (
    <g fill="var(--steam)" stroke="var(--steam-edge)" strokeWidth="1.2">
      <circle cx="-6" cy="2" r="6" />
      <circle cx="6" cy="2" r="6" />
      <circle cx="0" cy="-3" r="7" />
      <ellipse cx="0" cy="4" rx="10" ry="4" stroke="none" />
    </g>
  );
}

function Locomotive() {
  return (
    <li className="w-28 shrink-0 sm:w-32" aria-hidden="true">
      <svg viewBox="0 0 128 80" className="animate-jostle w-full overflow-visible">
        {/* Steam clouds leave the stack and drift back and up, staggered so
            there is always one forming, one rising, and one fading. */}
        {[0, -0.7, -1.4].map((delay) => (
          <g key={delay} transform="translate(96 12)">
            <g className="animate-puff" style={{ animationDelay: `${delay}s` }}>
              <Cloud />
            </g>
          </g>
        ))}
        {/* Smokestack and boiler */}
        <rect x="89" y="14" width="14" height="4" rx="1" fill="#2f2a36" />
        <rect x="91" y="16" width="10" height="18" rx="2" fill="#2f2a36" />
        <rect x="44" y="30" width="72" height="26" rx="10" fill="var(--accent)" />
        <rect x="60" y="30" width="4" height="26" fill="#2f2a36" opacity="0.25" />
        <rect x="84" y="30" width="4" height="26" fill="#2f2a36" opacity="0.25" />
        <circle cx="116" cy="43" r="5" fill="#f4d35e" />
        {/* Cab */}
        <rect x="8" y="14" width="42" height="42" rx="4" fill="var(--talavera)" />
        <rect x="4" y="10" width="50" height="6" rx="2" fill="#2f2a36" />
        <rect x="16" y="22" width="26" height="16" rx="3" fill="#dbe7fb" />
        <path d="M29 22v16" stroke="var(--talavera)" strokeWidth="2" />
        {/* Frame, cowcatcher, wheels */}
        <rect x="4" y="56" width="116" height="6" rx="2" fill="#2f2a36" />
        <path d="M120 56 L128 66 L114 66 Z" fill="#2f2a36" />
        <g transform="translate(0 68)">
          <Wheel cx={24} />
          <Wheel cx={62} />
          <Wheel cx={96} />
        </g>
      </svg>
    </li>
  );
}

// Footer banner: a little integration express. The locomotive leads a train
// of flatcars left to right across the page, and every car carries one
// sticker, the way an integration carries payloads between systems. Hovering
// or focusing the strip pauses the train; reduced motion parks it in view.
export function StickerBanner() {
  return (
    <div className="train-strip overflow-hidden pt-16 [container-type:inline-size]">
      <div className="animate-train w-max">
        <ul className="flex items-end" aria-label="A few things about me">
          {profile.stickers.map((s, i) => (
            <Car key={s.id} id={s.id} label={s.label} index={i} />
          ))}
          <Locomotive />
        </ul>
      </div>
      {/* Rails and ties, full width. */}
      <div
        className="h-2 border-t-2 border-faint"
        style={{
          backgroundImage: "repeating-linear-gradient(90deg, var(--faint) 0 3px, transparent 3px 14px)",
          backgroundSize: "14px 6px",
          backgroundRepeat: "repeat-x",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
