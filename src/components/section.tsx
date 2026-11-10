import type { ReactNode } from "react";

import { cn } from "cn";

interface SectionProps {
  id: string;
  number: string;
  title: string;
  intro?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function Section({ id, number, title, intro, className, children }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={cn("border-t-2", className)}>
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-8 md:py-28">
        <header className="mb-12 max-w-3xl md:mb-16">
          <p className="font-mono text-base text-muted-foreground" aria-hidden="true">
            {number}
          </p>
          <h2
            id={headingId}
            // Focusable from script only, so links into a section can move keyboard focus here
            tabIndex={-1}
            className="mt-2 rounded-sm text-4xl font-extrabold tracking-tight text-balance md:text-6xl"
          >
            {title}
          </h2>
          {intro && <div className="mt-5 text-xl leading-relaxed text-muted-foreground">{intro}</div>}
        </header>
        {children}
      </div>
    </section>
  );
}
