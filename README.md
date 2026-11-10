# bearkillerpt.xyz

My portfolio: the projects I've built, my open-source contributions and a bit about me. It's
served by nginx from my Raspberry Pi 4b, running NixOS ([raspberryConfs](https://github.com/bearkillerPT/raspberryConfs)).

Built with React, Tailwind CSS and [shadcn/ui](https://ui.shadcn.com), bundled by Vite, with
[Bun](https://bun.sh) as the package manager. Text is set in Atkinson Hyperlegible, made by the
Braille Institute for low-vision readers, and every colour pair meets WCAG AAA contrast.

## Developing

```bash
bun install
bun run dev        # http://localhost:5173
bun run build      # type-checks, then builds to dist/
bun run preview    # serves dist/
```

`nix develop` gives the same Bun the Pi builds with.

## Changing the content

| What | Where |
|---|---|
| Projects (the four featured ones have `featured: true`) | `src/data/projects.ts` |
| Pull requests to other projects | `src/data/contributions.ts` |
| Experience, education, music videos, links and CV | `src/data/profile.ts` |
| The hero and the About text | `src/components/hero.tsx`, `src/components/about.tsx` |
| Images and videos | `public/media/` |

Images go in as WebP, about 1200px wide, for example
`magick shot.png -resize '1200x>' -quality 80 public/media/name.webp`. A video needs a poster
frame (`ffmpeg -ss 5 -i demo.mp4 -frames:v 1 poster.png`, then the same conversion). Videos never
autoplay, and only download when someone presses play.

The stars and "updated" dates come from the GitHub API, in the visitor's browser. If the API
is unreachable or rate-limited, they're simply not shown.

## Deploying

The flake builds the site: `nix build` leaves it in `./result`. The Pi takes this repository as a
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
