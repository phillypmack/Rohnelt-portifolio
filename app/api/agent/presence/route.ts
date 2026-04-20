import { NextRequest, NextResponse } from "next/server";
import { writePresence } from "@/lib/live-storage";

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

  let body: { ideRunning?: boolean; coding?: boolean; ide?: string | null };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  // Accept `ideRunning` (new) or `coding` (legacy) from the agent payload
  const ideRunning = !!(body.ideRunning ?? body.coding);
  const ide = typeof body.ide === "string" ? body.ide : null;
  const presence = await writePresence(ideRunning, ide, null);
  return NextResponse.json({ ok: true, presence });
}
