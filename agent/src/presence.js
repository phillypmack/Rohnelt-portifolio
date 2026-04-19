import { promises as fs } from "fs";
import path from "path";

const PROC_DIR = process.env.PROC_DIR || "/host/proc";

export async function isProcessRunning(targetName) {
  const target = targetName.toLowerCase();
  let entries;
  try {
    entries = await fs.readdir(PROC_DIR);
  } catch (err) {
    console.error(`[presence] cannot read ${PROC_DIR}:`, err.message);
    return false;
  }

  for (const entry of entries) {
    if (!/^\d+$/.test(entry)) continue;
    try {
      const comm = await fs.readFile(path.join(PROC_DIR, entry, "comm"), "utf-8");
      if (comm.trim().toLowerCase() === target) return true;
    } catch {
      // process exited or no permission
    }
  }
  return false;
}
