import { ArrowUpRight } from "lucide-react";

import { GitHubIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";
import { cn } from "cn";

export function ProjectLinks({ project, className }: { project: Project; className?: string }) {
  const { repo, links = [] } = project;
  if (!repo && links.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap gap-2", className)} aria-label={`${project.title} links`}>
      {links.map((link, index) => (
        <li key={link.href}>
          <Button asChild size="sm" variant={index === 0 ? "default" : "outline"}>
            <a href={link.href}>
              {link.label}
              <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        </li>
      ))}
      {repo && (
        <li>
          <Button asChild size="sm" variant="outline">
            <a href={repo}>
              <GitHubIcon className="size-4" />
              Code
            </a>
          </Button>
        </li>
      )}
    </ul>
  );
}
