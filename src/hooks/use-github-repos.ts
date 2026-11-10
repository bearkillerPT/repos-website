import { useEffect, useState } from "react";

export interface RepoStats {
  stars: number;
  pushedAt: string;
}

/** Keyed by lower-cased "owner/name" */
export type RepoStatsMap = Record<string, RepoStats>;

const OWNERS = ["bearkillerPT"];
const CACHE_KEY = "github-repos-v1";
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
export function useGitHubRepos(): RepoStatsMap {
  const [repos, setRepos] = useState<RepoStatsMap>(() => readCache() ?? {});

  useEffect(() => {
    if (readCache()) return;
    const controller = new AbortController();

    Promise.all(
      OWNERS.map((owner) =>
        fetch(`https://api.github.com/users/${owner}/repos?per_page=100&type=owner`, {
          signal: controller.signal,
          headers: { Accept: "application/vnd.github+json" },
        }).then((res) => (res.ok ? (res.json() as Promise<GitHubRepo[]>) : [])),
      ),
    )
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
  }, []);

  return repos;
}
