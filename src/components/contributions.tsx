import { GitMerge, GitPullRequestArrow, Star } from "lucide-react";

import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { contributions, type Contribution } from "@/data/contributions";
import type { RepoStatsMap } from "@/hooks/use-github-repos";

const merged = contributions.filter((contribution) => contribution.status === "merged").length;

/** For the hook: every repository I've sent a pull request to */
export const contributionRepos = [...new Set(contributions.map((contribution) => contribution.repo))];

const compact = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });

export function Contributions({ repos }: { repos: RepoStatsMap }) {
  const starsOf = (contribution: Contribution) =>
    repos[contribution.repo.toLowerCase()]?.stars ?? contribution.stars;

  // The most-starred projects first; between equals, the newest
  const sorted = [...contributions].sort(
    (a, b) => starsOf(b) - starsOf(a) || b.year - a.year,
  );

  return (
    <Section
      id="open-source"
      number="04"
      title="Open source"
      intro={
        <p>
          Pull requests to other people's projects: {merged} merged so far, including the Android
          light sensor in Expo.
        </p>
      }
    >
      <ul className="border-t-2 border-foreground">
        {sorted.map((contribution) => {
          const stars = starsOf(contribution);
          return (
            <li
              key={contribution.href}
              className="grid gap-x-8 gap-y-2 border-b-2 py-6 md:grid-cols-[7rem_minmax(0,1fr)_auto]"
            >
              <p className="font-mono text-base text-muted-foreground md:pt-1">{contribution.year}</p>
              <div className="flex flex-col gap-1">
                <p className="flex flex-wrap items-center gap-x-3 font-mono text-base text-muted-foreground">
                  {contribution.repo}
                  <span className="inline-flex items-center gap-1 whitespace-nowrap">
                    <Star className="size-4 fill-current" aria-hidden="true" />
                    {compact.format(stars)}
                    <span className="sr-only"> stars on GitHub</span>
                  </span>
                </p>
                <h3 className="text-2xl font-bold tracking-tight">
                  <a
                    href={contribution.href}
                    className="rounded-sm underline decoration-2 underline-offset-4 hover:decoration-highlight-frame"
                  >
                    {contribution.title}
                  </a>
                </h3>
                {contribution.note && <p className="text-lg leading-relaxed">{contribution.note}</p>}
              </div>
              <div className="md:pt-1">
                {contribution.status === "merged" ? (
                  <Badge variant="highlight">
                    <GitMerge aria-hidden="true" />
                    Merged
                  </Badge>
                ) : (
                  <Badge variant="outline">
                    <GitPullRequestArrow aria-hidden="true" />
                    Open
                  </Badge>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
