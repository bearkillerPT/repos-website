import { useEffect, useState } from "react";

export interface RepoStats {
  stars: number;
  pushedAt: string;
}

/** Keyed by lower-cased "owner/name" */
export type RepoStatsMap = Record<string, RepoStats>;

const OWNERS = ["bearkillerPT"];
const CACHE_KEY = "github-repos-v2";
const CACHE_MS = 60 * 60 * 1000;

interface GitHubRepo {
  full_name: string;
  stargazers_count: number;
  pushed_at: string;
}

/** "https://github.com/owner/name/tree/…" → "owner/name" */
export function repoKey(url: string): string | null {
  const match = /github\.com\/([^/]+\/[^/#?]+)/.exec(url);
  return match ? match[1].toLowerCase() : null;
}

function readCache(): RepoStatsMap | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { at, data } = JSON.parse(raw) as { at: number; data: RepoStatsMap };
    return Date.now() - at < CACHE_MS ? data : null;
  } catch {
    return null;
  }
}

function writeCache(data: RepoStatsMap) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
  } catch {
    // Not worth failing over
  }
}

/**
 * Stars and last push for the public repos, straight from the GitHub API (unauthenticated,
 * 60 requests an hour per visitor, so the answer is kept for the session). The page
 * works the same without it; the numbers just don't show.
 */
export function useGitHubRepos(otherRepos: string[] = []): RepoStatsMap {
  // Empty until the page has loaded, as in the prerendered HTML, so the two agree
  const [repos, setRepos] = useState<RepoStatsMap>({});
  const others = otherRepos.join(" ");

  useEffect(() => {
    const cached = readCache();
    if (cached) {
      setRepos(cached);
      return;
    }
    const controller = new AbortController();
    const get = <T,>(url: string, fallback: T) =>
      fetch(url, { signal: controller.signal, headers: { Accept: "application/vnd.github+json" } }).then(
        (res) => (res.ok ? (res.json() as Promise<T>) : fallback),
      );

    // Other people's repos (the ones I've sent pull requests to) all come back from one search
    const search = others
      ? get<{ items: GitHubRepo[] }>(
          `https://api.github.com/search/repositories?per_page=100&q=${encodeURIComponent(
            others.split(" ").map((name) => `repo:${name}`).join(" "),
          )}`,
          { items: [] },
        ).then((result) => result.items)
      : Promise.resolve([]);

    Promise.all([
      ...OWNERS.map((owner) =>
        get<GitHubRepo[]>(`https://api.github.com/users/${owner}/repos?per_page=100&type=owner`, []),
      ),
      search,
    ])
      .then((lists) => {
        const data: RepoStatsMap = {};
        for (const repo of lists.flat()) {
          data[repo.full_name.toLowerCase()] = {
            stars: repo.stargazers_count,
            pushedAt: repo.pushed_at,
          };
        }
        writeCache(data);
        setRepos(data);
      })
      .catch(() => {
        // Offline, rate-limited or blocked: show the page without the numbers
      });

    return () => controller.abort();
  }, [others]);

  return repos;
}
