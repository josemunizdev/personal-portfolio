import { ThemeToggle } from "@/components/ThemeToggle";
import { profile } from "@/data/profile";

// "wide" links drop out below the sm breakpoint so the bar fits a phone.
const nav: { href: string; label: string; wide?: boolean }[] = [
  { href: "#about", label: "About", wide: true },
  { href: "#experience", label: "Experience", wide: true },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills", wide: true },
  { href: "#off-the-clock", label: "Off the clock", wide: true },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-4 sm:px-6">
        <a href="#top" className="font-semibold tracking-tight whitespace-nowrap">
          {profile.shortName}
        </a>
        <div className="flex items-center gap-2">
          <nav aria-label="Sections">
            <ul className="flex gap-0.5 text-sm text-muted">
              {nav.map((item) => (
                <li key={item.href} className={item.wide ? "hidden md:block" : undefined}>
                  <a
                    href={item.href}
                    className="block rounded-md px-2 py-1 whitespace-nowrap transition-colors hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
