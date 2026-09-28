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

// Footer banner: die-cut stickers marching left to right, each hopping with
// a 45deg tilt right, then left. Two copies of the row make the loop seamless;
// the second copy is hidden from screen readers. Hovering pauses the march.
function StickerRow({ copy }: { copy: number }) {
  return (
    <ul
      className="flex shrink-0 gap-5 pr-5"
      aria-label={copy === 0 ? "A few things about me" : undefined}
      aria-hidden={copy === 0 ? undefined : true}
    >
      {profile.stickers.map((s, i) => (
        <li
          key={s.id}
          title={s.label}
          className="animate-hop"
          // Staggered start so the row ripples instead of jumping in unison.
          style={{ animationDelay: `${-i * 0.23}s` }}
        >
          <span className="block size-12 rounded-2xl border-4 border-white bg-white p-1 shadow-md ring-1 ring-black/5 transition-transform hover:scale-110 sm:size-14">
            <StickerArt id={s.id} />
          </span>
          <span className="sr-only">{s.label}</span>
        </li>
      ))}
    </ul>
  );
}

export function StickerBanner() {
  return (
    <div className="overflow-hidden py-8 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <div className="animate-march flex w-max">
        <StickerRow copy={0} />
        <StickerRow copy={1} />
      </div>
    </div>
  );
}
