import { NextResponse } from "next/server"

import { getFleetReport } from "@/lib/fleet"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
  const report = await getFleetReport()
  return NextResponse.json(report, {
    headers: { "cache-control": "public, max-age=30, s-maxage=30" },
  })
}
