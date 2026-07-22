import "./env.js";
import chokidar from "chokidar";
import path from "path";
import { scanAllProjects } from "./scanner.js";
import { isProcessRunning } from "./presence.js";

const ROOT = process.env.PROJECTS_DIR || "/projects";
const API_URL = process.env.API_URL;
const AGENT_TOKEN = process.env.AGENT_TOKEN;
const DEBOUNCE_MS = parseInt(process.env.DEBOUNCE_MS || "5000", 10);
const FULL_RESCAN_MS = parseInt(process.env.FULL_RESCAN_MS || "3600000", 10);
const PRESENCE_CHECK_MS = parseInt(process.env.PRESENCE_CHECK_MS || "5000", 10);
const PRESENCE_PROCESS = process.env.PRESENCE_PROCESS || "antigravity";
const PRESENCE_HEARTBEAT_MS = parseInt(process.env.PRESENCE_HEARTBEAT_MS || "30000", 10);

if (!API_URL || !AGENT_TOKEN) {
  console.error("[agent] API_URL and AGENT_TOKEN are required");
  process.exit(1);
}

let syncTimer = null;
let syncing = false;
let pendingSync = false;

async function sync() {
  if (syncing) {
    pendingSync = true;
    return;
  }
  syncing = true;
  pendingSync = false;
  try {
    const startedAt = Date.now();
    console.log(`[agent] scanning ${ROOT}...`);
    const projects = await scanAllProjects(ROOT);
    const totalLines = projects.reduce((s, p) => s + p.lines, 0);
    console.log(`[agent] found ${projects.length} projects, ${totalLines} lines (scan took ${Date.now() - startedAt}ms)`);

    const res = await fetch(`${API_URL}/api/agent/sync`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${AGENT_TOKEN}`,
      },
      body: JSON.stringify({ projects }),
    });

    if (!res.ok) {
      console.error(`[agent] sync failed: ${res.status} ${await res.text()}`);
    } else {
      const body = await res.json();
      console.log(`[agent] sync ok:`, body);
    }
  } catch (err) {
    console.error("[agent] sync error:", err.message);
  } finally {
    syncing = false;
    if (pendingSync) {
      setTimeout(sync, 1000);
    }
  }
}

function scheduleSync(reason) {
  if (syncTimer) clearTimeout(syncTimer);
  console.log(`[agent] sync scheduled in ${DEBOUNCE_MS}ms (reason: ${reason})`);
  syncTimer = setTimeout(() => {
    syncTimer = null;
    sync();
  }, DEBOUNCE_MS);
}

let lastPresenceState = null;
let lastPresenceSentAt = 0;

async function sendPresence(ideRunning) {
  try {
    const res = await fetch(`${API_URL}/api/agent/presence`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${AGENT_TOKEN}`,
      },
      body: JSON.stringify({ ideRunning, ide: ideRunning ? PRESENCE_PROCESS : null }),
    });
    if (!res.ok) {
      console.error(`[presence] post failed: ${res.status}`);
    }
  } catch (err) {
    console.error("[presence] post error:", err.message);
  }
}

async function checkPresence() {
  const coding = await isProcessRunning(PRESENCE_PROCESS);
  const now = Date.now();
  const stateChanged = coding !== lastPresenceState;
  const heartbeatDue = now - lastPresenceSentAt >= PRESENCE_HEARTBEAT_MS;

  if (stateChanged || heartbeatDue) {
    if (stateChanged) {
      console.log(`[presence] ${PRESENCE_PROCESS}: ${coding ? "CODING" : "idle"}`);
    }
    await sendPresence(coding);
    lastPresenceState = coding;
    lastPresenceSentAt = now;
  }
}

async function main() {
  console.log(`[agent] starting`);
  console.log(`[agent] watching: ${ROOT}`);
  console.log(`[agent] api: ${API_URL}`);
  console.log(`[agent] debounce: ${DEBOUNCE_MS}ms / full rescan: ${FULL_RESCAN_MS}ms`);

  await sync();

  const watcher = chokidar.watch(ROOT, {
    ignored: (filePath) => {
      const base = path.basename(filePath);
      // logs (inclusive os do próprio agent) não são código — mudança neles não justifica rescan
      if (base.endsWith(".log")) return true;
      return (
        base === "node_modules" ||
        base === ".git" ||
        base === ".next" ||
        base === "dist" ||
        base === "build" ||
        base === "__pycache__" ||
        base === ".venv" ||
        base === "venv" ||
        base === "target" ||
        base === ".turbo" ||
        base === "coverage" ||
        // Windows: junctions de sistema dentro de Documents negam listagem (EPERM)
        base === "Meus Vídeos" ||
        base === "Minhas Imagens" ||
        base === "Minhas Músicas" ||
        base === "My Videos" ||
        base === "My Pictures" ||
        base === "My Music"
      );
    },
    ignoreInitial: true,
    persistent: true,
    depth: 6,
    awaitWriteFinish: { stabilityThreshold: 500, pollInterval: 200 },
  });

  watcher.on("add", (p) => scheduleSync(`add ${p}`));
  watcher.on("change", (p) => scheduleSync(`change ${p}`));
  watcher.on("unlink", (p) => scheduleSync(`unlink ${p}`));
  watcher.on("addDir", (p) => scheduleSync(`addDir ${p}`));
  watcher.on("unlinkDir", (p) => scheduleSync(`unlinkDir ${p}`));
  watcher.on("error", (err) => console.error("[agent] watcher error:", err));

  setInterval(() => {
    console.log(`[agent] periodic full rescan triggered`);
    sync();
  }, FULL_RESCAN_MS);

  console.log(`[presence] watching for "${PRESENCE_PROCESS}" every ${PRESENCE_CHECK_MS}ms`);
  await checkPresence();
  setInterval(checkPresence, PRESENCE_CHECK_MS);

  process.on("SIGINT", () => {
    console.log("[agent] SIGINT, exiting");
    watcher.close().then(() => process.exit(0));
  });
  process.on("SIGTERM", () => {
    console.log("[agent] SIGTERM, exiting");
    watcher.close().then(() => process.exit(0));
  });
}

main().catch((err) => {
  console.error("[agent] fatal:", err);
  process.exit(1);
});
