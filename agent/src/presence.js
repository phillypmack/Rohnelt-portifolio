import { promises as fs } from "fs";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);
const IS_WINDOWS = process.platform === "win32";

// PRESENCE_PROCESS accepts a comma-separated list, e.g. "Code,antigravity".
// Matching is case-insensitive and ".exe" is optional on Windows.
function parseTargets(targetName) {
  return targetName
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);
}

async function runningNamesWindows() {
  const { stdout } = await execFileAsync("tasklist", ["/FO", "CSV", "/NH"], {
    windowsHide: true,
    maxBuffer: 8 * 1024 * 1024,
  });
  const names = new Set();
  for (const line of stdout.split("\n")) {
    const match = line.match(/^"([^"]+)"/);
    if (match) names.add(match[1].toLowerCase());
  }
  return names;
}

async function runningNamesLinux() {
  const procDir = process.env.PROC_DIR || "/host/proc";
  const names = new Set();
  let entries;
  try {
    entries = await fs.readdir(procDir);
  } catch (err) {
    console.error(`[presence] cannot read ${procDir}:`, err.message);
    return names;
  }
  for (const entry of entries) {
    if (!/^\d+$/.test(entry)) continue;
    try {
      const comm = await fs.readFile(path.join(procDir, entry, "comm"), "utf-8");
      names.add(comm.trim().toLowerCase());
    } catch {
      // process exited or no permission
    }
  }
  return names;
}

export async function isProcessRunning(targetName) {
  const targets = parseTargets(targetName);
  let running;
  try {
    running = IS_WINDOWS ? await runningNamesWindows() : await runningNamesLinux();
  } catch (err) {
    console.error("[presence] check failed:", err.message);
    return false;
  }
  return targets.some((t) => running.has(t) || running.has(`${t}.exe`));
}
