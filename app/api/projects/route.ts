import { NextResponse } from "next/server";
import { readSnapshot } from "@/lib/live-storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const snap = await readSnapshot();
  return NextResponse.json(
    { projects: snap.projects, lastSync: snap.lastSync },
    { headers: { "cache-control": "public, max-age=30, s-maxage=30" } }
  );
}
