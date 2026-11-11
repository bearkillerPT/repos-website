# bearkillerpt.xyz

My portfolio and CV: the projects I've built, where I've worked, my open-source contributions and
a bit about me. It's served by nginx from my Raspberry Pi 4b, running NixOS
([raspberryConfs](https://github.com/bearkillerPT/raspberryConfs)).

Built with React, Tailwind CSS and [shadcn/ui](https://ui.shadcn.com), bundled by Vite, with
[Bun](https://bun.sh) as the package manager. Text is set in Atkinson Hyperlegible, made by the
Braille Institute for low-vision readers, and every colour pair meets WCAG AAA contrast.

## Developing

```bash
nix develop        # the Bun, Node and Typst the Pi builds with
bun install
bun run dev        # http://localhost:5173
bun run cv         # the CV, into public/cv.pdf
bun run build      # type-checks, builds to dist/ and prerenders index.html
bun run preview    # serves dist/
```

`bun run build` prerenders the page (`scripts/build.mjs` renders `src/entry-server.tsx` into
`dist/index.html`), so it shows before any JavaScript runs and the browser then takes it over. That
means components must render the same on the server as in the browser's first render: anything
that reads the browser (`window`, `localStorage`, the URL, the current date) goes in a `useEffect`,
never at module level or in a `useState` initialiser. `useNow()` gives a date that's safe to render.
React reports a "hydration" error in the console when a component breaks this.

## Changing the content

| What | Where |
|---|---|
| Projects (the four featured ones have `featured: true`) | `src/data/projects.ts` |
| Pull requests to other projects | `src/data/contributions.ts` |
| Experience, education, music videos and links | `src/data/profile.ts` |
| What only the CV has: summary, skills, languages, publications, which projects to list | `src/data/cv.ts` |
| The CV's layout | `cv/cv.typ` (and the photo, `cv/photo.jpg`) |
| The hero and the About text | `src/components/hero.tsx`, `src/components/about.tsx` |
| Images and videos | `public/media/` |

Images go in as WebP, about 1200px wide, for example
`magick shot.png -resize '1200x>' -quality 80 public/media/name.webp`. A video needs a poster
frame (`ffmpeg -ss 5 -i demo.mp4 -frames:v 1 poster.png`, then the same conversion). Videos never
autoplay, and only download when someone presses play.

The stars and "updated" dates come from the GitHub API, in the visitor's browser. If the API
is unreachable or rate-limited, they're simply not shown.

## The CV

`/cv.pdf` is built from the same data as the site: `scripts/cv-data.ts` writes
`cv/build/data.json` from `src/data/`, and Typst renders it with the
[brilliant-cv](https://typst.app/universe/package/brilliant-cv) template. Typst, the template and
its fonts come from nixpkgs (`nix/package.nix`), and the build checks it against PDF/UA-1, so a
change that makes it less accessible (an image without alt text, a skipped heading level) fails the
build. The template's hidden keyword and "AI prompt" injection is deliberately left off.

## Deploying

The flake builds the site, CV included: `nix build` leaves it in `./result`. nginx serves
`404.html` for unknown addresses and redirects the old `/Curriculo.pdf` to `/cv.pdf`. The Pi takes this repository as a
flake input (`services/portfolio.nix` in raspberryConfs), so after pushing here:

```bash
cd ~/raspberryConfs
nix flake update repos-website
sudo nixos-rebuild switch --flake .#pi
```

**After changing dependencies**, the hash of `node_modules` in `nix/package.nix` changes: set
`outputHash` to `lib.fakeHash`, run `nix build`, and paste the hash from the error. The hash
covers every platform's native binaries, so the same one works on the Pi and on x86_64.

Write `bun.lock` with the Pi's Bun (`nix develop -c bun install`), since newer Bun versions may
write a lockfile format the Pi's can't read with `--frozen-lockfile`.

## Adding shadcn/ui components

`bunx shadcn@latest add <component>`. Components import `cn` from shadcn's
[`cn`](https://github.com/shadcn-ui/cn) package, which `src/lib/utils.ts` re-exports for the
`@/lib/utils` alias. The ones already in `src/components/ui` are adjusted for size and focus: they
drop shadcn's `outline-none`, so the site-wide focus outline in `src/index.css` shows on every
control. Do the same with new ones.
