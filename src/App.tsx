import { About } from "@/components/about";
import { contributionRepos, Contributions } from "@/components/contributions";
import { Experience } from "@/components/experience";
import { FeaturedProjects } from "@/components/featured-projects";
import { Hero } from "@/components/hero";
import { ProjectIndex } from "@/components/project-index";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { useGitHubRepos } from "@/hooks/use-github-repos";

export default function App() {
  const repos = useGitHubRepos(contributionRepos);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-highlight px-5 py-3 text-lg font-bold text-highlight-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <FeaturedProjects repos={repos} />
        <Experience />
        <ProjectIndex repos={repos} />
        <Contributions repos={repos} />
        <About />
      </main>
      <SiteFooter />
    </>
  );
}
