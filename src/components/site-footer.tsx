import { profile } from "@/data/profile";

const linkClass = "rounded-sm underline decoration-2 underline-offset-4 hover:decoration-highlight-frame";

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-12 text-lg sm:px-8 md:flex-row md:items-end md:justify-between">
        <p className="max-w-2xl leading-relaxed text-muted-foreground">
          Built with React, Tailwind CSS and shadcn/ui, bundled by Bun and Vite, and served by
          nginx from a Raspberry Pi 4b running NixOS.{" "}
          <a href={profile.source} className={`${linkClass} text-foreground`}>
            Source
          </a>{" "}
          <span aria-hidden="true">·</span>{" "}
          <a href={profile.server} className={`${linkClass} text-foreground`}>
            Server config
          </a>
        </p>
        <p className="font-mono text-base">© {new Date().getFullYear()} {profile.name}</p>
      </div>
    </footer>
  );
}
