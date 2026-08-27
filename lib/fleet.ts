import { systems } from "@/lib/systems"

export type Health = {
  slug: string
  /** The server answered at all. */
  up: boolean
  /** HTTP status, or null when nothing answered. */
  status: number | null
}

export type FleetReport = {
  checkedAt: string
  results: Health[]
}

const PROBE_TIMEOUT_MS = 5_000
const CACHE_TTL_MS = 60_000

/**
 * One in-memory cache per container. Without it, a burst of visitors would turn
 * this page into a load generator against the very fleet it is reporting on.
 */
let cached: { report: FleetReport; expires: number } | null = null
let inFlight: Promise<FleetReport> | null = null

const probeable = systems.filter((s) => s.url)

async function probe(url: string): Promise<Omit<Health, "slug">> {
  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(PROBE_TIMEOUT_MS),
      headers: { "user-agent": "rohnelt.dev fleet probe" },
    })
    // Anything short of a server error means the service answered. A 404 at an
    // API root or a 401 behind auth is a running service, not an outage.
    return { up: response.status < 500, status: response.status }
  } catch {
    return { up: false, status: null }
  }
}

async function collect(): Promise<FleetReport> {
  const settled = await Promise.allSettled(
    probeable.map(async (system) => ({
      slug: system.slug,
      ...(await probe(system.url + (system.healthPath ?? ""))),
    })),
  )

  const results: Health[] = settled.map((outcome, index) =>
    outcome.status === "fulfilled"
      ? outcome.value
      : { slug: probeable[index].slug, up: false, status: null },
  )

  return { checkedAt: new Date().toISOString(), results }
}

export async function getFleetReport(): Promise<FleetReport> {
  if (cached && cached.expires > Date.now()) return cached.report

  // Collapse concurrent misses into a single round of probes.
  inFlight ??= collect()
    .then((report) => {
      cached = { report, expires: Date.now() + CACHE_TTL_MS }
      return report
    })
    .finally(() => {
      inFlight = null
    })

  try {
    return await inFlight
  } catch {
    // Never let a probe failure take the page down: report everything unknown.
    return {
      checkedAt: new Date().toISOString(),
      results: probeable.map((s) => ({ slug: s.slug, up: false, status: null })),
    }
  }
}
