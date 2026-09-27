export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line py-16 sm:py-20">
      <div className="grid gap-8 md:grid-cols-[12rem_1fr] md:gap-12">
        <h2
          id={`${id}-title`}
          className="font-mono text-xs font-medium tracking-widest text-accent uppercase md:sticky md:top-24 md:self-start"
        >
          {title}
        </h2>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
