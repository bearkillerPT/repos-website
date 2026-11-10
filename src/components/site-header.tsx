import { FileDown, Menu, Moon, Sun } from "lucide-react";
import { useRef, useState, type MouseEvent } from "react";

import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { profile } from "@/data/profile";
import { useTheme } from "@/hooks/use-theme";

// Same order and numbers as the sections themselves
const sections = [
  { id: "work", number: "01", label: "Work" },
  { id: "experience", number: "02", label: "Experience" },
  { id: "projects", number: "03", label: "Projects" },
  { id: "open-source", number: "04", label: "Open source" },
  { id: "about", number: "05", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b-2 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center gap-1.5 px-3 py-3 min-[400px]:gap-2 min-[400px]:px-4 sm:gap-4 sm:px-8">
        <a href="#top" className="mr-auto rounded-sm text-base font-extrabold tracking-tight whitespace-nowrap min-[400px]:text-lg sm:text-xl">
          {profile.name}
        </a>
        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="flex gap-1">
            {sections.map((section) => (
              <li key={section.id}>
                <Button asChild variant="ghost" size="sm" className="text-base">
                  <a href={`#${section.id}`}>{section.label}</a>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        <ThemeToggle />
        <Button asChild variant="highlight" size="sm" className="text-base">
          <a href={profile.cv}>
            <FileDown aria-hidden="true" />
            CV<span className="sr-only"> (PDF)</span>
          </a>
        </Button>
        <SectionsMenu />
      </div>
    </header>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const next = theme === "dark" ? "light" : "dark";
  const Icon = next === "dark" ? Moon : Sun;
  const label = next === "dark" ? "Dark theme" : "Light theme";

  return (
    <Button
      variant="outline"
      size="sm"
      className="text-base"
      aria-label={`Switch to ${label.toLowerCase()}`}
      onClick={() => setTheme(next)}
    >
      <Icon aria-hidden="true" />
      <span className="hidden sm:inline">{label}</span>
    </Button>
  );
}

/** Below 1024px the section links don't fit in the header, so they live in a side panel */
function SectionsMenu() {
  const [open, setOpen] = useState(false);
  const target = useRef<string | null>(null);

  const choose = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    // Let ctrl/cmd/shift-click still open a new tab or window
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    target.current = id;
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="text-base lg:hidden">
          <Menu aria-hidden="true" />
          <span className="sr-only sm:not-sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        aria-describedby={undefined}
        className="w-[min(24rem,88vw)] gap-0 border-l-2 p-0 sm:max-w-none"
        // Once the panel has closed, go to the chosen section and put keyboard focus on its
        // heading, instead of back on the Menu button
        onCloseAutoFocus={(event) => {
          const id = target.current;
          if (!id) return;
          event.preventDefault();
          target.current = null;
          requestAnimationFrame(() => {
            document.getElementById(id)?.scrollIntoView();
            history.pushState(null, "", `#${id}`);
            document.getElementById(`${id}-heading`)?.focus({ preventScroll: true });
          });
        }}
      >
        <SheetHeader className="min-h-17 justify-center border-b-2 px-6 py-3">
          <SheetTitle className="text-2xl font-extrabold tracking-tight">Sections</SheetTitle>
        </SheetHeader>
        <nav aria-label="Sections" className="flex-1 overflow-y-auto">
          <ul>
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={(event) => choose(event, section.id)}
                  className="flex items-baseline gap-4 border-b-2 px-6 py-5 text-3xl font-extrabold tracking-tight transition-colors outline-offset-[-4px] hover:bg-accent"
                >
                  <span className="font-mono text-base font-normal text-muted-foreground" aria-hidden="true">
                    {section.number}
                  </span>
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="flex flex-wrap gap-3 border-t-2 px-6 py-5">
          <li>
            <Button asChild variant="outline">
              <a href={profile.github}>
                <GitHubIcon className="size-5" />
                GitHub
              </a>
            </Button>
          </li>
          <li>
            <Button asChild variant="outline">
              <a href={profile.linkedin}>
                <LinkedInIcon className="size-5" />
                LinkedIn
              </a>
            </Button>
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
}
