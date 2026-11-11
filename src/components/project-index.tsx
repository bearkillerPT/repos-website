import { Check, ChevronDown, Search, X } from "lucide-react";
import { useDeferredValue, useEffect, useId, useMemo, useState } from "react";
import { flushSync } from "react-dom";

import { ProjectLinks } from "@/components/project-links";
import { ProjectMedia } from "@/components/project-media";
import { ProjectMeta, TechList } from "@/components/project-meta";
import { Section } from "@/components/section";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  categoryLabels,
  filterAnchors,
  filterLabels,
  matchesFilter,
  projects,
  type Project,
  type ProjectFilter,
} from "@/data/projects";
import type { RepoStatsMap } from "@/hooks/use-github-repos";
import { cn } from "cn";

const sorted = [...projects].sort((a, b) => b.sortYear - a.sortYear);

const countOf = (filter: ProjectFilter) =>
  projects.filter((project) => matchesFilter(project, filter)).length;

// "Web & mobile apps" first, then the rest in the order of how many projects they hold
const filters = (Object.keys(filterLabels) as ProjectFilter[])
  .map((filter) => ({ filter, count: countOf(filter) }))
  .filter(({ count }) => count > 0)
  .sort((a, b) => Number(b.filter === "app") - Number(a.filter === "app") || b.count - a.count);

/** Unfiltered, the list starts with the newest few, so the next sections aren't miles away */
const INITIAL_ROWS = 8;

/** "#bots" → "bot", for links that open the list already filtered */
function filterFromHash(hash: string): ProjectFilter | undefined {
  const entry = Object.entries(filterAnchors).find(([, anchor]) => `#${anchor}` === hash);
  return entry?.[0] as ProjectFilter | undefined;
}

const normalise = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\u2011/g, "-");

function matches(project: Project, query: string) {
  if (!query) return true;
  const haystack = normalise(
    [
      project.title,
      project.summary,
      project.details,
      project.years,
      categoryLabels[project.category],
      project.app ? categoryLabels.app : "",
      ...project.tech,
    ].join(" "),
  );
  return normalise(query)
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}

export function ProjectIndex({ repos }: { repos: RepoStatsMap }) {
  const [query, setQuery] = useState("");
  // A #bots-style address is applied once the page has loaded (below), like the prerendered HTML
  const [filter, setFilterState] = useState<ProjectFilter | "all">("all");
  const [showAll, setShowAll] = useState(false);
  const deferredQuery = useDeferredValue(query.trim());
  const searchId = useId();

  // Links like the intro's "bots" point at #bots: filter the list, then bring it into view.
  // Focus moves to the section heading so keyboard users continue from the list, not the link.
  useEffect(() => {
    const open = () => {
      const fromHash = filterFromHash(window.location.hash);
      if (!fromHash) return;
      setQuery("");
      setFilterState(fromHash);
      document.getElementById("projects")?.scrollIntoView();
      document.getElementById("projects-heading")?.focus({ preventScroll: true });
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);

  // Picking another filter by hand makes a #bots-style address stale, so drop it
  const setFilter = (next: ProjectFilter | "all") => {
    setFilterState(next);
    if (filterFromHash(window.location.hash)) history.replaceState(null, "", "#projects");
  };

  const visible = useMemo(
    () =>
      sorted.filter(
        (project) =>
          (filter === "all" || matchesFilter(project, filter)) && matches(project, deferredQuery),
      ),
    [filter, deferredQuery],
  );

  const filtered = filter !== "all" || deferredQuery !== "";
  const clear = () => {
    setQuery("");
    setFilter("all");
  };

  // Filtering or searching always shows every match. Collapsed rows stay in the HTML (search
  // engines and pages without JavaScript get them all); CSS hides them only when JavaScript runs.
  const collapsed = !filtered && !showAll && visible.length > INITIAL_ROWS;

  // The button disappears, so focus moves to the first project it revealed (rendered right
  // away with flushSync, so it exists to be focused)
  const revealAll = () => {
    const next = visible[INITIAL_ROWS];
    flushSync(() => setShowAll(true));
    // Its More button if it has one, else its heading (focusable from script)
    const row = document.querySelector(`[data-row="${next?.slug}"]`);
    (
      row?.querySelector<HTMLElement>('[data-slot="accordion-trigger"]') ??
      row?.querySelector<HTMLElement>("h3")
    )?.focus();
  };

  return (
    <Section
      id="projects"
      number="03"
      title="All projects"
      intro={
        <p>
          Everything worth showing since 2020: web and mobile apps, bots, browser extensions,
          freelance work and university projects.
        </p>
      }
    >
      <div className="flex flex-col gap-6">
        <div className="max-w-xl">
          <label htmlFor={searchId} className="mb-2 block text-lg font-semibold">
            Search projects
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id={searchId}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try ESP32 or React"
              className="pl-12"
              autoComplete="off"
            />
          </div>
        </div>

        <div role="group" aria-labelledby={`${searchId}-categories`}>
          <p id={`${searchId}-categories`} className="mb-2 text-lg font-semibold">
            Category
          </p>
          <ToggleGroup
            type="single"
            variant="outline"
            value={filter}
            onValueChange={(value) => setFilter((value as ProjectFilter | "all") || "all")}
          >
            <CategoryItem value="all" label="All" count={projects.length} selected={filter === "all"} />
            {filters.map(({ filter: value, count }) => (
              <CategoryItem
                key={value}
                value={value}
                label={filterLabels[value]}
                count={count}
                selected={filter === value}
              />
            ))}
          </ToggleGroup>
        </div>
      </div>

      <div className="mt-10 flex min-h-11 flex-wrap items-center justify-between gap-4 border-b-2 border-foreground pb-4">
        <p className="font-mono text-base" role="status">
          {filtered
            ? `${visible.length} of ${projects.length} projects`
            : `${projects.length} projects, newest first`}
        </p>
        {filtered && (
          <Button variant="ghost" size="sm" onClick={clear}>
            <X aria-hidden="true" />
            Clear filters
          </Button>
        )}
      </div>

      {visible.length === 0 ? (
        <div className="py-16 text-xl">
          <p>
            Nothing matches{deferredQuery ? <> “{deferredQuery}”</> : null}
            {filter !== "all" ? <> in {filterLabels[filter]}</> : null}.
          </p>
        </div>
      ) : (
        <>
          <Accordion type="multiple">
            {visible.map((project, index) => (
              <ProjectRow
                key={project.slug}
                project={project}
                repos={repos}
                className={collapsed && index >= INITIAL_ROWS ? "js:hidden" : undefined}
              />
            ))}
          </Accordion>
          {collapsed && (
            <div className="hidden pt-8 js:block">
              <Button variant="outline" size="lg" onClick={revealAll}>
                <ChevronDown aria-hidden="true" />
                Show all {visible.length} projects
              </Button>
            </div>
          )}
        </>
      )}
    </Section>
  );
}

function CategoryItem({
  value,
  label,
  count,
  selected,
}: {
  value: string;
  label: string;
  count: number;
  selected: boolean;
}) {
  return (
    <ToggleGroupItem value={value} size="sm" aria-label={`${label}, ${count} projects`}>
      {selected && <Check aria-hidden="true" />}
      {label}
      <span className="font-mono text-sm opacity-80" aria-hidden="true">
        {count}
      </span>
    </ToggleGroupItem>
  );
}

// Links sit beside the text from lg up; below that they go under it, or the summary gets squeezed
const rowGrid =
  "grid gap-x-8 gap-y-3 md:grid-cols-[7rem_minmax(0,1fr)] lg:grid-cols-[7rem_minmax(0,1fr)_auto]";

function ProjectRow({
  project,
  repos,
  className,
}: {
  project: Project;
  repos: RepoStatsMap;
  className?: string;
}) {
  const expandable = Boolean(project.media || project.details);
  const years = (
    <p className="font-mono text-base text-muted-foreground md:pt-1">{project.years}</p>
  );
  const body = (
    <>
      <p className="text-lg leading-relaxed">{project.summary}</p>
      <ProjectMeta project={project} repos={repos} showYears={false} />
      <TechList tech={project.tech} className="mt-1" />
    </>
  );
  const links = (
    <ProjectLinks
      project={project}
      className="content-start self-start md:col-start-2 lg:col-start-auto lg:max-w-72 lg:justify-end"
    />
  );

  if (!expandable) {
    return (
      <div data-row={project.slug} className={cn(rowGrid, "border-b-2 py-6", className)}>
        {years}
        <div className="flex flex-col gap-2">
          <h3 tabIndex={-1} className="rounded-sm text-2xl font-bold tracking-tight">
            {project.title}
          </h3>
          {body}
        </div>
        {links}
      </div>
    );
  }

  return (
    <AccordionItem value={project.slug} data-row={project.slug} className={cn("py-6", className)}>
      <div className={rowGrid}>
        {years}
        <div className="flex flex-col gap-2">
          <AccordionHeader>
            <AccordionTrigger className="group/trigger -mx-2 flex-wrap items-center justify-start gap-x-4 gap-y-2 px-2 py-1 text-2xl font-bold tracking-tight hover:underline hover:decoration-highlight-frame">
              {project.title}
              {/* The button's name is the title; aria-expanded already says open or closed */}
              <span
                aria-hidden="true"
                className="inline-flex shrink-0 items-center gap-1 rounded-full border-2 border-input px-3 py-1 font-mono text-sm font-normal group-data-[state=open]/trigger:border-foreground"
              >
                <span className="group-data-[state=open]/trigger:hidden">More</span>
                <span className="hidden group-data-[state=open]/trigger:inline">Less</span>
                <ChevronDown className="size-4 transition-transform group-data-[state=open]/trigger:rotate-180" />
              </span>
            </AccordionTrigger>
          </AccordionHeader>
          {body}
        </div>
        {links}
      </div>
      <AccordionContent className="pt-6">
        <div className="grid gap-x-8 md:grid-cols-[7rem_minmax(0,1fr)]">
          <div aria-hidden="true" />
          <div className="flex max-w-3xl flex-col gap-6">
            {project.details && <p className="text-lg leading-relaxed">{project.details}</p>}
            {project.media && (
              <ProjectMedia media={project.media} className="rounded-lg border-2 border-foreground/15" />
            )}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
