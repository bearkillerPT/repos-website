import { GitMerge, GitPullRequestArrow } from "lucide-react";

import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { contributions } from "@/data/contributions";

const merged = contributions.filter((contribution) => contribution.status === "merged").length;

export function Contributions() {
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
        {contributions.map((contribution) => (
          <li
            key={contribution.href}
            className="grid gap-x-8 gap-y-2 border-b-2 py-6 md:grid-cols-[7rem_minmax(0,1fr)_auto]"
          >
            <p className="font-mono text-base text-muted-foreground md:pt-1">{contribution.year}</p>
            <div className="flex flex-col gap-1">
              <p className="font-mono text-base text-muted-foreground">{contribution.repo}</p>
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
        ))}
      </ul>
    </Section>
  );
}
