import { ProjectLinks } from "@/components/project-links";
import { ProjectMedia } from "@/components/project-media";
import { ProjectMeta, TechList } from "@/components/project-meta";
import { Section } from "@/components/section";
import { projects, type Project } from "@/data/projects";
import type { RepoStatsMap } from "@/hooks/use-github-repos";

const featured = projects.filter((project) => project.featured);

export function FeaturedProjects({ repos }: { repos: RepoStatsMap }) {
  return (
    <Section id="work" number="01" title="Selected work">
      <ul className="grid gap-8 md:grid-cols-2 lg:gap-10">
        {featured.map((project) => (
          <li key={project.slug} className="flex">
            <ProjectCard project={project} repos={repos} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

function ProjectCard({ project, repos }: { project: Project; repos: RepoStatsMap }) {
  const headingId = `featured-${project.slug}`;
  return (
    <article
      aria-labelledby={headingId}
      className="flex w-full flex-col overflow-hidden rounded-xl border-2 border-foreground/15 bg-card text-card-foreground"
    >
      {project.media && <ProjectMedia media={project.media} className="border-b-2 border-foreground/15" />}
      <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
        <ProjectMeta project={project} repos={repos} />
        <h3 id={headingId} className="text-3xl font-bold tracking-tight text-balance">
          {project.title}
        </h3>
        <p className="text-lg leading-relaxed">{project.summary}</p>
        <TechList tech={project.tech} />
        <ProjectLinks project={project} className="mt-auto pt-4" />
      </div>
    </article>
  );
}
