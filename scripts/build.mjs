// Builds the site and prerenders it: the browser bundle as usual, then a server bundle of the same
// app, whose HTML goes into dist/index.html so the page shows before any JavaScript runs.
// Run by `bun run build`; plain JavaScript so Node runs it as is.
import { readFile, rm, writeFile } from "node:fs/promises";
import { build } from "vite";

// One build time for both bundles, so the prerendered HTML and the browser's first render agree
process.env.BUILD_TIME ??= new Date().toISOString();

await build();
await build({ logLevel: "warn", build: { ssr: "src/entry-server.tsx", outDir: "dist-ssr" } });

const { render } = await import(new URL("../dist-ssr/entry-server.js", import.meta.url).href);
const template = await readFile("dist/index.html", "utf8");
const page = template.replace('<div id="root"></div>', () => `<div id="root">${render()}</div>`);
if (page === template) throw new Error('dist/index.html has no <div id="root"></div> to fill');
await writeFile("dist/index.html", page);
await rm("dist-ssr", { recursive: true });
console.log(`prerendered dist/index.html (${Math.round(page.length / 1024)} kB)`);
