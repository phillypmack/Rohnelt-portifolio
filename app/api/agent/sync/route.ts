import { NextRequest, NextResponse } from "next/server";
import { writeSnapshot, type LiveProject } from "@/lib/live-storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authorized(req: NextRequest): boolean {
  const expected = process.env.AGENT_TOKEN;
  if (!expected) return false;
  const header = req.headers.get("authorization") || "";
  const token = header.replace(/^Bearer\s+/i, "");
  return token === expected;
}

export async function POST(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const projects = (body as { projects?: LiveProject[] })?.projects;
  if (!Array.isArray(projects)) {
    return NextResponse.json({ error: "projects[] required" }, { status: 400 });
  }

  const sanitized = projects
    .filter((p) => p && typeof p.slug === "string" && p.slug.length > 0)
    .map((p) => ({
      slug: p.slug,
      name: typeof p.name === "string" ? p.name : p.slug,
      tagline: p.tagline,
      description: p.description,
      stack: Array.isArray(p.stack) ? p.stack : undefined,
      status: p.status,
      companies: typeof p.companies === "number" ? p.companies : undefined,
      deploy: p.deploy,
      github: p.github,
      lines: typeof p.lines === "number" ? p.lines : 0,
      lastModified: p.lastModified || new Date().toISOString(),
      fileCount: typeof p.fileCount === "number" ? p.fileCount : 0,
    }));

  const snapshot = await writeSnapshot(sanitized);
  return NextResponse.json({
    ok: true,
    received: sanitized.length,
    totalLines: snapshot.totalLines,
    lastSync: snapshot.lastSync,
  });
}
