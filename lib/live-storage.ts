import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = process.env.LIVE_DATA_DIR || "/data";
const DATA_FILE = path.join(DATA_DIR, "portfolio.json");

export type LiveProject = {
  slug: string;
  name: string;
  tagline?: string;
  description?: string;
  stack?: string[];
  status?: "production" | "active" | "wip" | "private" | "public";
  companies?: number;
  deploy?: string;
  github?: string;
  lines: number;
  lastModified: string;
  fileCount: number;
};

export type LiveSnapshot = {
  projects: LiveProject[];
  totalLines: number;
  totalProjects: number;
  productionCount: number;
  companiesServed: number;
  lastSync: string;
};

const EMPTY: LiveSnapshot = {
  projects: [],
  totalLines: 0,
  totalProjects: 0,
  productionCount: 0,
  companiesServed: 0,
  lastSync: new Date(0).toISOString(),
};

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export async function readSnapshot(): Promise<LiveSnapshot> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as LiveSnapshot;
  } catch {
    return EMPTY;
  }
}

export async function writeSnapshot(projects: LiveProject[]): Promise<LiveSnapshot> {
  await ensureDir();
  const totalLines = projects.reduce((sum, p) => sum + (p.lines || 0), 0);
  const productionCount = projects.filter((p) => p.status === "production").length;
  const companiesServed = projects
    .filter((p) => p.status === "production")
    .reduce((sum, p) => sum + (p.companies || 0), 0);

  const snapshot: LiveSnapshot = {
    projects,
    totalLines,
    totalProjects: projects.length,
    productionCount,
    companiesServed,
    lastSync: new Date().toISOString(),
  };

  const tmp = DATA_FILE + ".tmp";
  await fs.writeFile(tmp, JSON.stringify(snapshot, null, 2), "utf-8");
  await fs.rename(tmp, DATA_FILE);
  return snapshot;
}
