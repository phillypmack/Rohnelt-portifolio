import { promises as fs } from "fs";
import path from "path";
import YAML from "yaml";
import { countProjectLines } from "./counter.js";

async function exists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function readReadme(projectPath) {
  const candidates = ["README.md", "README.MD", "Readme.md", "readme.md"];
  for (const name of candidates) {
    const full = path.join(projectPath, name);
    if (await exists(full)) {
      try {
        const content = await fs.readFile(full, "utf-8");
        return parseReadme(content);
      } catch { /* ignore */ }
    }
  }
  return { tagline: undefined, description: undefined };
}

function parseReadme(content) {
  const lines = content.split("\n");
  let tagline;
  let description;
  let foundHeading = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!foundHeading && line.startsWith("# ")) {
      foundHeading = true;
      continue;
    }
    if (foundHeading && line && !line.startsWith("#") && !line.startsWith("![") && !line.startsWith("<")) {
      if (!tagline) {
        tagline = line.length > 200 ? line.slice(0, 197) + "..." : line;
      } else if (!description) {
        description = line.length > 600 ? line.slice(0, 597) + "..." : line;
        break;
      }
    }
  }
  return { tagline, description };
}

async function readPortfolioMeta(projectPath) {
  const candidates = [".portfolio.yml", ".portfolio.yaml", "portfolio.yml"];
  for (const name of candidates) {
    const full = path.join(projectPath, name);
    if (await exists(full)) {
      try {
        const content = await fs.readFile(full, "utf-8");
        const parsed = YAML.parse(content);
        return parsed && typeof parsed === "object" ? parsed : {};
      } catch { /* ignore */ }
    }
  }
  return {};
}

async function isGitRepo(projectPath) {
  return exists(path.join(projectPath, ".git"));
}

async function detectStack(projectPath) {
  const stack = new Set();
  const checks = [
    ["package.json", "Node.js"],
    ["next.config.js", "Next.js"],
    ["next.config.mjs", "Next.js"],
    ["next.config.ts", "Next.js"],
    ["nuxt.config.js", "Nuxt"],
    ["vite.config.js", "Vite"],
    ["vite.config.ts", "Vite"],
    ["tsconfig.json", "TypeScript"],
    ["requirements.txt", "Python"],
    ["pyproject.toml", "Python"],
    ["Pipfile", "Python"],
    ["go.mod", "Go"],
    ["Cargo.toml", "Rust"],
    ["pom.xml", "Java"],
    ["build.gradle", "Java"],
    ["Gemfile", "Ruby"],
    ["composer.json", "PHP"],
    ["Dockerfile", "Docker"],
    ["docker-compose.yml", "Docker"],
    ["docker-compose.yaml", "Docker"],
  ];
  for (const [file, label] of checks) {
    if (await exists(path.join(projectPath, file))) stack.add(label);
  }
  return Array.from(stack);
}

export async function scanProject(projectPath) {
  const slug = path.basename(projectPath);
  if (!(await isGitRepo(projectPath))) return null;

  const [readme, meta, count, stack] = await Promise.all([
    readReadme(projectPath),
    readPortfolioMeta(projectPath),
    countProjectLines(projectPath),
    detectStack(projectPath),
  ]);

  return {
    slug: meta.slug || slug,
    name: meta.name || slug,
    tagline: meta.tagline || readme.tagline,
    description: meta.description || readme.description,
    stack: meta.stack || stack,
    status: meta.status || "active",
    companies: typeof meta.companies === "number" ? meta.companies : 0,
    deploy: meta.deploy || meta.url,
    github: meta.github,
    lines: count.lines,
    fileCount: count.fileCount,
    lastModified: count.lastModified,
  };
}

const MAX_LINES_PER_PROJECT = 500_000;
const NESTED_ACTIVE_WINDOW_MS = 90 * 24 * 60 * 60 * 1000; // 90 days

export async function scanAllProjects(rootDir) {
  let entries;
  try {
    entries = await fs.readdir(rootDir, { withFileTypes: true });
  } catch (err) {
    console.error(`[scanner] cannot read ${rootDir}:`, err.message);
    return [];
  }

  const slugIndex = new Map(); // slug → { project, path, arrayIndex }
  const projects = [];
  const addProject = (project, projectPath, { requireRecent = false } = {}) => {
    if (project.lines > MAX_LINES_PER_PROJECT) {
      console.warn(`[scanner] skipping ${projectPath}: ${project.lines} lines exceeds ${MAX_LINES_PER_PROJECT} (likely contains dependencies)`);
      return;
    }
    if (requireRecent) {
      const ageMs = Date.now() - new Date(project.lastModified).getTime();
      if (ageMs > NESTED_ACTIVE_WINDOW_MS) return;
    }
    const existing = slugIndex.get(project.slug);
    if (existing) {
      // Prefer the copy modified more recently (the one the user actually works on)
      const newTs = new Date(project.lastModified).getTime();
      const oldTs = new Date(existing.project.lastModified).getTime();
      if (newTs > oldTs) {
        console.warn(`[scanner] slug "${project.slug}": replacing ${existing.path} with more recent ${projectPath}`);
        projects[existing.arrayIndex] = project;
        slugIndex.set(project.slug, { project, path: projectPath, arrayIndex: existing.arrayIndex });
      } else {
        console.warn(`[scanner] slug "${project.slug}": keeping ${existing.path}, skipping older ${projectPath}`);
      }
      return;
    }
    const arrayIndex = projects.push(project) - 1;
    slugIndex.set(project.slug, { project, path: projectPath, arrayIndex });
  };
  // Pass 1 — top-level git repos (authoritative; they win slug collisions)
  const nestedCandidates = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith(".")) continue;
    const projectPath = path.join(rootDir, entry.name);
    try {
      const project = await scanProject(projectPath);
      if (project) {
        addProject(project, projectPath);
      } else {
        nestedCandidates.push({ entry, projectPath });
      }
    } catch (err) {
      console.error(`[scanner] error scanning ${entry.name}:`, err.message);
    }
  }

  // Pass 2 — look one level deeper inside non-git folders.
  // Only include nested repos that have been modified in the last 90 days,
  // so old archived experiments don't pollute the portfolio.
  for (const { entry, projectPath } of nestedCandidates) {
    let children;
    try {
      children = await fs.readdir(projectPath, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const child of children) {
      if (!child.isDirectory()) continue;
      if (child.name.startsWith(".")) continue;
      const childPath = path.join(projectPath, child.name);
      try {
        const nested = await scanProject(childPath);
        if (nested) addProject(nested, childPath, { requireRecent: true });
      } catch (err) {
        console.error(`[scanner] error scanning ${entry.name}/${child.name}:`, err.message);
      }
    }
  }

  return projects;
}
