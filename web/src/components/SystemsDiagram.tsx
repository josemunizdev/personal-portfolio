"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Systems on either side of the MuleSoft hub. Coordinates are in the SVG's
// 360x240 viewBox, so the diagram scales with its container.
const HUB = { x: 180, y: 120 };
const LEFT = [
  { id: "ps", label: "PeopleSoft", x: 52, y: 48 },
  { id: "hcm", label: "Oracle HCM", x: 52, y: 120 },
  { id: "saas", label: "SaaS", x: 52, y: 192 },
];
const RIGHT = [
  { id: "sf", label: "Salesforce", x: 308, y: 72 },
  { id: "web", label: "Website", x: 308, y: 168 },
];

type Node = (typeof LEFT)[number];

function spoke(n: Node) {
  const midX = (n.x + HUB.x) / 2;
  return n.x < HUB.x
    ? `M ${n.x} ${n.y} C ${midX} ${n.y}, ${midX} ${HUB.y}, ${HUB.x} ${HUB.y}`
    : `M ${HUB.x} ${HUB.y} C ${midX} ${HUB.y}, ${midX} ${n.y}, ${n.x} ${n.y}`;
}

// A full route runs source -> hub -> destination as one path, so a packet can
// be placed with a single getPointAtLength call per frame.
function route(from: Node, to: Node) {
  const [a, b] = from.x < to.x ? [from, to] : [to, from];
  const m1 = (a.x + HUB.x) / 2;
  const m2 = (b.x + HUB.x) / 2;
  return `M ${a.x} ${a.y} C ${m1} ${a.y}, ${m1} ${HUB.y}, ${HUB.x} ${HUB.y} C ${m2} ${HUB.y}, ${m2} ${b.y}, ${b.x} ${b.y}`;
}

type Packet = { id: number; d: string; reverse: boolean; start: number; color: string };
const DURATION = 1600;
const pick = <T,>(xs: readonly T[]) => xs[Math.floor(Math.random() * xs.length)];

export function SystemsDiagram() {
  const [packets, setPackets] = useState<Packet[]>([]);
  const [positions, setPositions] = useState<Record<number, { x: number; y: number }>>({});
  const [hubPulse, setHubPulse] = useState(0);
  const pathRefs = useRef<Record<number, SVGPathElement | null>>({});
  const nextId = useRef(0);
  const svgRef = useRef<SVGSVGElement>(null);

  const send = useCallback((from?: Node) => {
    const src = from ?? pick([...LEFT, ...RIGHT]);
    const dst = src.x < HUB.x ? pick(RIGHT) : pick(LEFT);
    const reverse = src.x > HUB.x;
    const id = nextId.current++;
    setPackets((ps) => [
      ...ps,
      {
        id,
        d: route(src, dst),
        reverse,
        start: performance.now(),
        color: reverse ? "var(--talavera)" : "var(--accent)",
      },
    ]);
  }, []);

  // Animation loop: runs only while packets are in flight.
  useEffect(() => {
    if (packets.length === 0) return;
    let frame = 0;
    const tick = (now: number) => {
      const next: Record<number, { x: number; y: number }> = {};
      const done: number[] = [];
      for (const p of packets) {
        const el = pathRefs.current[p.id];
        const t = (now - p.start) / DURATION;
        if (t >= 1) {
          done.push(p.id);
          continue;
        }
        if (!el) continue;
        const len = el.getTotalLength();
        const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
        const pt = el.getPointAtLength((p.reverse ? 1 - eased : eased) * len);
        next[p.id] = { x: pt.x, y: pt.y };
      }
      setPositions(next);
      if (done.length) {
        for (const id of done) delete pathRefs.current[id];
        setPackets((ps) => ps.filter((p) => !done.includes(p.id)));
        setHubPulse((n) => n + done.length);
      } else {
        frame = requestAnimationFrame(tick);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [packets]);

  // Ambient traffic while the diagram is on screen, unless the visitor has
  // asked for reduced motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const svg = svgRef.current;
    if (!svg) return;
    let timer: number | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      window.clearInterval(timer);
      if (entry.isIntersecting) timer = window.setInterval(() => send(), 1400);
    });
    observer.observe(svg);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, [send]);

  const nodes = [...LEFT, ...RIGHT];
  return (
    <figure className="relative">
      <svg
        ref={svgRef}
        viewBox="0 0 360 240"
        className="w-full"
        role="group"
        aria-label="Integration diagram: PeopleSoft, Oracle HCM, and SaaS apps connect through MuleSoft to Salesforce and the university website"
      >
        {nodes.map((n) => (
          <path
            key={`spoke-${n.id}`}
            d={spoke(n)}
            fill="none"
            stroke="var(--line)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
        ))}

        {packets.map((p) => (
          <path
            key={`route-${p.id}`}
            ref={(el) => {
              pathRefs.current[p.id] = el;
            }}
            d={p.d}
            fill="none"
            stroke="none"
          />
        ))}
        {packets.map((p) =>
          positions[p.id] ? (
            <circle
              key={`pkt-${p.id}`}
              cx={positions[p.id].x}
              cy={positions[p.id].y}
              r="4"
              fill={p.color}
            />
          ) : null,
        )}

        {/* MuleSoft hub. The key changes on each arrival to replay the pulse. */}
        <g>
          <circle
            key={hubPulse}
            cx={HUB.x}
            cy={HUB.y}
            r="30"
            fill="var(--accent-soft)"
            className={hubPulse ? "animate-pop" : undefined}
            style={{ transformOrigin: `${HUB.x}px ${HUB.y}px`, transformBox: "view-box" }}
          />
          <circle cx={HUB.x} cy={HUB.y} r="30" fill="none" stroke="var(--accent)" strokeWidth="2" />
          <text
            x={HUB.x}
            y={HUB.y + 4}
            textAnchor="middle"
            className="fill-accent font-mono text-[11px] font-semibold"
          >
            MuleSoft
          </text>
        </g>

        {nodes.map((n) => (
          <g
            key={n.id}
            role="button"
            tabIndex={0}
            aria-label={`Send data from ${n.label}`}
            className="cursor-pointer outline-none [&:focus-visible>rect]:stroke-accent [&:hover>rect]:stroke-accent"
            onClick={() => send(n)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                send(n);
              }
            }}
          >
            <rect
              x={n.x - 46}
              y={n.y - 15}
              width="92"
              height="30"
              rx="8"
              fill="var(--surface)"
              stroke="var(--line)"
              strokeWidth="2"
              className="transition-colors"
            />
            <text x={n.x} y={n.y + 4} textAnchor="middle" className="fill-ink font-mono text-[11px]">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="mt-2 text-center font-mono text-xs text-faint">
        Click a system to send it some data.
      </figcaption>
    </figure>
  );
}
