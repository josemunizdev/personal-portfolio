import { ConsoleHello } from "@/components/ConsoleHello";
import { Header } from "@/components/Header";
import { ImpactMetrics } from "@/components/ImpactMetrics";
import { Memoji } from "@/components/Memoji";
import { OffTheClock } from "@/components/OffTheClock";
import { Pipeline } from "@/components/Pipeline";
import { Section } from "@/components/Section";
import { Skills } from "@/components/Skills";
import { StickerBanner } from "@/components/Stickers";
import { SystemsDiagram } from "@/components/SystemsDiagram";
import { ArrowUpRightIcon, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";
import { profile } from "@/data/profile";

const linkClass =
  "inline-flex items-center gap-2 rounded-md border border-line bg-surface px-3.5 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent";

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <li className="rounded-md border border-line bg-surface px-2 py-0.5 font-mono text-xs text-muted">
      {children}
    </li>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main id="top" className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Hero */}
        <section className="grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Memoji />
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-muted">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
              {profile.badge}
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
              {profile.name}
            </h1>
            <p className="mt-3 text-xl text-muted sm:text-2xl">{profile.headline}</p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty">{profile.subhead}</p>
            <p className="mt-4 font-mono text-sm text-faint">{profile.location}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={profile.links.github.href} className={linkClass}>
                <GitHubIcon /> GitHub
              </a>
              <a href={profile.links.linkedin.href} className={linkClass}>
                <LinkedInIcon /> LinkedIn
              </a>
              <a href={`mailto:${profile.email}`} className={linkClass}>
                <MailIcon /> {profile.email}
              </a>
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-surface/70 p-4 shadow-sm backdrop-blur-sm">
            <SystemsDiagram />
          </div>
        </section>

        {/* Impact */}
        <section aria-label="Selected impact" className="pb-16 sm:pb-20">
          <ImpactMetrics />
        </section>

        <Section id="about" title="About">
          <div className="max-w-2xl space-y-4 leading-relaxed">
            {profile.about.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
        </Section>

        <Section id="experience" title="Experience">
          <Pipeline />
          <ol className="space-y-12">
            {profile.experience.map((role) => (
              <li key={`${role.org}-${role.title}`}>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                  <h3 className="font-semibold">
                    {role.title} <span className="font-normal text-muted">· {role.org}</span>
                  </h3>
                  <p className="shrink-0 font-mono text-xs text-faint">
                    {role.start} to {role.end}
                  </p>
                </div>
                <p className="text-sm text-faint">{role.location}</p>
                {role.groups.map((g, i) => (
                  <div key={g.heading ?? i} className="mt-4">
                    {g.heading ? <h4 className="text-sm font-medium text-muted">{g.heading}</h4> : null}
                    <ul className="mt-2 space-y-2">
                      {g.points.map((pt) => (
                        <li key={pt.slice(0, 40)} className="relative pl-4 text-sm leading-relaxed">
                          <span className="absolute top-2.5 left-0 h-px w-2 bg-faint" aria-hidden="true" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </li>
            ))}
          </ol>
        </Section>

        <Section id="projects" title="Projects">
          <ul className="grid gap-4 sm:grid-cols-2">
            {profile.projects.map((p) => {
              const body = (
                <>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold group-hover:text-accent">{p.name}</h3>
                    {p.repo ? (
                      <ArrowUpRightIcon className="mt-1 size-4 shrink-0 text-faint group-hover:text-accent" />
                    ) : null}
                  </div>
                  <p className="mt-1 font-mono text-xs text-faint">
                    {p.context} · {p.year}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{p.summary}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tech stack">
                    {p.stack.map((s) => (
                      <Chip key={s}>{s}</Chip>
                    ))}
                  </ul>
                  {p.note ? <p className="mt-3 text-xs text-faint italic">{p.note}</p> : null}
                </>
              );
              const card = "group flex h-full flex-col rounded-xl border border-line bg-surface p-5";
              return (
                <li key={p.name}>
                  {p.repo ? (
                    <a
                      href={p.repo}
                      className={`${card} transition-colors hover:border-accent`}
                      aria-label={`${p.name} on GitHub`}
                    >
                      {body}
                    </a>
                  ) : (
                    <div className={card}>{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
          <a
            href={`${profile.links.github.href}?tab=repositories`}
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
          >
            All repositories on GitHub <ArrowUpRightIcon />
          </a>
        </Section>

        <Section id="skills" title="Tech stack">
          <Skills />
        </Section>

        <Section id="off-the-clock" title="Off the clock">
          <OffTheClock />
        </Section>

        <Section id="credentials" title="Credentials">
          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium">Certifications</h3>
              <ul className="mt-3 space-y-3">
                {profile.certifications.map((c) => (
                  <li key={c.name} className="text-sm leading-snug">
                    {c.name}
                    {c.status !== "Earned" ? (
                      <span className="ml-2 rounded bg-accent-soft px-1.5 py-0.5 font-mono text-[0.7rem] text-ink">
                        {c.status}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium">Education</h3>
              <ul className="mt-3 space-y-4">
                {profile.education.map((e) => (
                  <li key={e.degree} className="text-sm leading-snug">
                    <p>{e.degree}</p>
                    <p className="mt-0.5 text-muted">
                      {e.school} · {e.year}
                    </p>
                  </li>
                ))}
              </ul>
              <h3 className="mt-8 text-sm font-medium">Languages</h3>
              <p className="mt-2 text-sm text-muted">{profile.languages.join(" · ")}</p>
            </div>
          </div>
        </Section>

        <Section id="contact" title="Contact">
          <p className="max-w-xl text-2xl font-semibold tracking-tight text-balance">
            Working on an integration problem, or hiring for one? I&apos;d like to hear about it.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className={linkClass}>
              <MailIcon /> {profile.email}
            </a>
            <a href={profile.links.linkedin.href} className={linkClass}>
              <LinkedInIcon /> LinkedIn
            </a>
            <a href={profile.links.github.href} className={linkClass}>
              <GitHubIcon /> GitHub
            </a>
          </div>
        </Section>
      </main>
      <footer className="border-t border-line">
        <div className="pt-4">
          <StickerBanner />
        </div>
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 font-mono text-xs text-faint sm:flex-row sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p>
            Built with Next.js, TypeScript, and Tailwind CSS.{" "}
            <a href="https://github.com/josemunizdev/personal-portfolio" className="underline hover:text-accent">
              Source
            </a>
          </p>
        </div>
      </footer>
      <ConsoleHello />
    </>
  );
}
