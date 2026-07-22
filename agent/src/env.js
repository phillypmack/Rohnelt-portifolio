// Loads ../.env (next to package.json) into process.env.
// Real environment variables always win — keeps Docker/compose behavior intact.
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const envPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", ".env");
try {
  for (const line of readFileSync(envPath, "utf-8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    if (key.startsWith("#") || key in process.env) continue;
    process.env[key] = rawValue.replace(/^(['"])(.*)\1$/, "$2");
  }
  console.log(`[env] loaded ${envPath}`);
} catch {
  // no .env file — rely on real environment
}
