"use client";

import { useEffect, useState } from "react";

export type LiveStats = {
  totalLines: number;
  totalProjects: number;
  productionCount: number;
  companiesServed: number;
  lastSync: string;
};

export function useLiveStats(fallback: LiveStats, intervalMs = 5000) {
  const [stats, setStats] = useState<LiveStats>(fallback);

  useEffect(() => {
    let cancelled = false;

    async function fetchStats() {
      try {
        const res = await fetch("/api/stats", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as LiveStats;
        if (cancelled) return;
        if (data.totalProjects > 0) setStats(data);
      } catch {
        // ignore — keep fallback
      }
    }

    fetchStats();
    const id = setInterval(fetchStats, intervalMs);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [intervalMs]);

  return stats;
}
