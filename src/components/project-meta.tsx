import { Star } from "lucide-react";
import type { ReactNode } from "react";

import { categoryLabels, type Project } from "@/data/projects";
import { repoKey, type RepoStatsMap } from "@/hooks/use-github-repos";
import { cn } from "cn";

const monthYear = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric" });

export function useRepoStats(project: Project, repos: RepoStatsMap) {
  const key = project.repo ? repoKey(project.repo) : null;
  return key ? repos[key] : undefined;
}

/** "2023 – now · Browser extensions · ★ 6 · updated Oct 2026" */
export function ProjectMeta({
  project,
  repos,
  showYears = true,
  className,
}: {
  project: Project;
  repos: RepoStatsMap;
  showYears?: boolean;
  className?: string;
}) {
  const stats = useRepoStats(project, repos);
  const parts: ReactNode[] = [];

  if (showYears) parts.push(<span key="years">{project.years}</span>);
  parts.push(<span key="category">{categoryLabels[project.category]}</span>);
  if (stats && stats.stars > 0) {
    parts.push(
      <span key="stars" className="inline-flex items-center gap-1">
        <Star className="size-4 fill-current" aria-hidden="true" />
        {stats.stars}
        <span className="sr-only">{stats.stars === 1 ? "star" : "stars"} on GitHub</span>
      </span>,
    );
  }
  if (stats) {
    parts.push(
      <span key="updated">
        updated <time dateTime={stats.pushedAt}>{monthYear.format(new Date(stats.pushedAt))}</time>
      </span>,
    );
  }

  return (
    <p className={cn("flex flex-wrap items-center gap-x-2 font-mono text-sm text-muted-foreground", className)}>
      {parts.map((part, index) => (
        <span key={index} className="inline-flex items-center gap-2">
          {index > 0 && <span aria-hidden="true">·</span>}
          {part}
        </span>
      ))}
    </p>
  );
}

export function TechList({ tech, className }: { tech: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="Technologies">
      {tech.map((name) => (
        <li
          key={name}
          className="rounded-md border border-input px-2 py-0.5 font-mono text-sm text-foreground"
        >
          {name}
        </li>
      ))}
    </ul>
  );
}
