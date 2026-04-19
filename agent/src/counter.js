import { promises as fs } from "fs";
import path from "path";

const CODE_EXTENSIONS = new Set([
  ".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs",
  ".py", ".pyw",
  ".go",
  ".rs",
  ".java", ".kt", ".scala",
  ".c", ".h", ".cpp", ".hpp", ".cc", ".cxx",
  ".cs",
  ".rb",
  ".php",
  ".swift",
  ".m", ".mm",
  ".sh", ".bash", ".zsh", ".fish",
  ".sql",
  ".html", ".htm",
  ".css", ".scss", ".sass", ".less",
  ".vue", ".svelte", ".astro",
  ".lua",
  ".r", ".R",
  ".dart",
  ".ex", ".exs",
  ".elm",
  ".clj", ".cljs",
  ".hs",
  ".ml",
  ".pl",
  ".groovy",
  ".dockerfile", ".tf",
  ".yaml", ".yml", ".toml",
  ".xml",
  ".json",
  ".md",
]);

const SKIP_DIRS = new Set([
  "node_modules", ".git", ".next", ".nuxt", "dist", "build", "out",
  "target", "vendor", "__pycache__", ".venv", "venv", "env",
  ".pytest_cache", ".mypy_cache", ".ruff_cache", ".turbo",
  "coverage", ".cache", ".parcel-cache", ".svelte-kit",
  ".gradle", ".idea", ".vscode", "bin", "obj",
  "Pods", ".cargo", ".terraform",
]);

const SKIP_FILE_PATTERNS = [
  /\.min\.(js|css)$/i,
  /\.bundle\.(js|css)$/i,
  /-lock\.(json|yaml|yml)$/i,
  /pnpm-lock\.yaml$/i,
  /yarn\.lock$/i,
  /package-lock\.json$/i,
  /poetry\.lock$/i,
  /Cargo\.lock$/i,
  /go\.sum$/i,
];

const MAX_FILE_BYTES = 2 * 1024 * 1024;

function shouldSkipFile(name) {
  return SKIP_FILE_PATTERNS.some((re) => re.test(name));
}

async function countLinesInFile(filePath) {
  try {
    const stat = await fs.stat(filePath);
    if (stat.size > MAX_FILE_BYTES) return 0;
    const content = await fs.readFile(filePath, "utf-8");
    if (content.length === 0) return 0;
    let count = 1;
    for (let i = 0; i < content.length; i++) {
      if (content.charCodeAt(i) === 10) count++;
    }
    if (content.charCodeAt(content.length - 1) === 10) count--;
    return count;
  } catch {
    return 0;
  }
}

export async function countProjectLines(projectPath) {
  let totalLines = 0;
  let fileCount = 0;
  let lastModified = 0;

  async function walk(dir) {
    let entries;
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (entry.name.startsWith(".") && entry.name !== ".portfolio.yml") {
        if (entry.name !== ".github" && entry.name !== ".env.example") continue;
      }
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (SKIP_DIRS.has(entry.name)) continue;
        await walk(full);
      } else if (entry.isFile()) {
        if (shouldSkipFile(entry.name)) continue;
        const ext = path.extname(entry.name).toLowerCase();
        if (!CODE_EXTENSIONS.has(ext)) continue;
        const lines = await countLinesInFile(full);
        totalLines += lines;
        fileCount++;
        try {
          const st = await fs.stat(full);
          if (st.mtimeMs > lastModified) lastModified = st.mtimeMs;
        } catch { /* ignore */ }
      }
    }
  }

  await walk(projectPath);
  return {
    lines: totalLines,
    fileCount,
    lastModified: lastModified > 0 ? new Date(lastModified).toISOString() : new Date().toISOString(),
  };
}
