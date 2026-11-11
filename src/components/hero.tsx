import { ArrowDown, Mail } from "lucide-react";
import type { ReactNode } from "react";

import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { filterAnchors, type ProjectFilter } from "@/data/projects";

function WorkLink({ filter, children }: { filter: ProjectFilter; children: ReactNode }) {
  return (
    <a
      href={`#${filterAnchors[filter]}`}
      // Yellow on the cream light theme would barely show, so the underline is orange there
      className="rounded-sm underline decoration-highlight-frame decoration-[0.12em] underline-offset-[0.14em] transition-colors hover:decoration-foreground dark:decoration-highlight"
    >
      {children}
    </a>
  );
}

/** "A-to-Be" would otherwise break at its hyphens on narrow screens */
const AtoBe = () => <span className="whitespace-nowrap">A-to-Be</span>;

/** One sentence per line, on every screen size, so no word dangles at a line's end */
const Line = ({ children }: { children: ReactNode }) => <span className="block">{children}</span>;

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="mx-auto max-w-6xl px-4 pt-14 pb-20 sm:px-8 md:pt-24 md:pb-28"
    >
      <div className="flex flex-wrap items-center gap-6 md:gap-10">
        <img
          src="/media/gil.webp"
          // The name is right next to it, so the photo adds nothing for a screen reader
          alt=""
          width={720}
          height={960}
          fetchPriority="high"
          className="size-28 shrink-0 rounded-full border-4 border-highlight object-cover object-top md:size-44"
        />
        <h1
          id="hero-heading"
          className="text-[clamp(2.75rem,13vw,4rem)] leading-[1.02] font-extrabold tracking-tight text-balance md:text-7xl lg:text-8xl"
        >
          Hi, I'm Gil Teixeira.
        </h1>
      </div>

      {/* "automate things" opens All projects filtered to bots (see project-index.tsx) */}
      <p className="mt-10 max-w-4xl text-3xl leading-snug font-bold tracking-tight text-balance md:text-5xl md:leading-tight">
        <Line>I'm a full-stack developer: React up front, Python or Node.js behind it.</Line>
        <Line>
          On the side, I <WorkLink filter="bot">automate things</WorkLink>.
        </Line>
      </p>
      <p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground md:text-2xl md:leading-relaxed">
        Software engineer at <AtoBe /> and Morphotech, based in Portugal.
      </p>

      <ul className="mt-10 flex flex-wrap gap-3">
        <li>
          <Button asChild size="lg">
            <a href="#work">
              See my work
              <ArrowDown aria-hidden="true" />
            </a>
          </Button>
        </li>
        <li>
          <Button asChild size="lg" variant="outline">
            <a href={`mailto:${profile.email}`}>
              <Mail aria-hidden="true" />
              Email me
            </a>
          </Button>
        </li>
        <li>
          <Button asChild size="lg" variant="outline">
            <a href={profile.github}>
              <GitHubIcon className="size-5" />
              GitHub
            </a>
          </Button>
        </li>
        <li>
          <Button asChild size="lg" variant="outline">
            <a href={profile.linkedin}>
              <LinkedInIcon className="size-5" />
              LinkedIn
            </a>
          </Button>
        </li>
      </ul>
    </section>
  );
}
