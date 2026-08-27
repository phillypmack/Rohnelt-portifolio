"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"

import type { FleetReport, Health } from "@/lib/fleet"

const POLL_MS = 60_000

type FleetValue = {
  checkedAt: string
  health: Map<string, Health>
  /** Systems that answered, out of those we can probe at all. */
  up: number
  probed: number
}

const FleetContext = createContext<FleetValue | null>(null)

export function FleetProvider({
  initial,
  children,
}: {
  initial: FleetReport
  children: React.ReactNode
}) {
  const [report, setReport] = useState(initial)

  useEffect(() => {
    let cancelled = false

    async function refresh() {
      try {
        const response = await fetch("/api/fleet", { cache: "no-store" })
        if (!response.ok) return
        const next = (await response.json()) as FleetReport
        if (!cancelled) setReport(next)
      } catch {
        // Keep showing the last known state rather than blanking the ledger.
      }
    }

    const timer = setInterval(refresh, POLL_MS)
    return () => {
      cancelled = true
      clearInterval(timer)
    }
  }, [])

  const value = useMemo<FleetValue>(() => {
    const health = new Map(report.results.map((r) => [r.slug, r]))
    return {
      checkedAt: report.checkedAt,
      health,
      up: report.results.filter((r) => r.up).length,
      probed: report.results.length,
    }
  }, [report])

  return <FleetContext.Provider value={value}>{children}</FleetContext.Provider>
}

export function useFleet(): FleetValue {
  const value = useContext(FleetContext)
  if (!value) throw new Error("useFleet must be used inside FleetProvider")
  return value
}
