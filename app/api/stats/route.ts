import { NextResponse } from "next/server";
import { readSnapshot } from "@/lib/live-storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const snap = await readSnapshot();
  return NextResponse.json(
    {
      totalLines: snap.totalLines,
      totalProjects: snap.totalProjects,
      productionCount: snap.productionCount,
      companiesServed: snap.companiesServed,
      lastSync: snap.lastSync,
    },
    { headers: { "cache-control": "no-store" } }
  );
}
