// Writes cv/build/data.json for the Typst CV: the site's own data plus src/data/cv.ts.
// Run with Bun (it imports the TypeScript data directly): bun scripts/cv-data.ts
import { mkdir, writeFile } from "node:fs/promises";

import { contributions } from "../src/data/contributions.ts";
import { cv } from "../src/data/cv.ts";
import { education, experience, profile } from "../src/data/profile.ts";
import { projects } from "../src/data/projects.ts";

const monthYear = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" });
const formatMonth = (month: string) => {
  const [year, index] = month.split("-").map(Number);
  return monthYear.format(new Date(year, index - 1));
};
const plain = (text: string) => text.replace(/\u2011/g, "-");

const byId = (slug: string) => {
  const project = projects.find((candidate) => candidate.slug === slug);
  if (!project) throw new Error(`cv.ts lists "${slug}", which isn't in projects.ts`);
  return project;
};

const data = {
  name: profile.name,
  headline: cv.headline,
  summary: cv.summary,
  location: cv.location,
  email: profile.email,
  site: cv.site,
  github: profile.handle,
  linkedin: profile.linkedin.replace(/\/$/, "").split("/").pop(),

  experience: experience.map((job) => ({
    role: job.role,
    company: job.company,
    url: job.href,
    dates: `${formatMonth(job.start)} – ${job.end ? formatMonth(job.end) : "Present"}`,
    from: formatMonth(job.start),
    to: job.end ? formatMonth(job.end) : "Present",
    summary: job.summary ?? "",
    tech: cv.jobTech[job.company] ?? [],
  })),

  education: education.map((entry) => ({ ...entry, note: entry.note ?? "" })),

  projects: cv.projects.map(byId).map((project) => ({
    name: plain(project.title),
    years: project.years.replace("now", "Present"),
    summary: project.summary,
    tech: project.tech,
    url: project.links?.[0]?.href ?? project.repo ?? "",
    repo: project.repo ?? "",
  })),

  contributions: cv.contributions.map((repo) => {
    const contribution = contributions.find((candidate) => candidate.repo === repo);
    if (!contribution) throw new Error(`cv.ts lists "${repo}", which isn't in contributions.ts`);
    return { ...contribution, note: contribution.note ?? "" };
  }),

  publications: cv.publications,
  skills: cv.skills,
  languages: cv.languages,
};

await mkdir(new URL("../cv/build/", import.meta.url), { recursive: true });
await writeFile(new URL("../cv/build/data.json", import.meta.url), JSON.stringify(data, null, 2));
console.log("wrote cv/build/data.json");
