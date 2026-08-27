"use client"

import { useEffect, useState } from "react"

import { useFleet } from "@/components/fleet-provider"
import { StatusDot } from "@/components/status"

const NAV = [
  { href: "#fleet", label: "Fleet" },
  { href: "#case-studies", label: "Case studies" },
  { href: "#operations", label: "Operations" },
  { href: "#contact", label: "Contact" },
]

const PRESENCE_MAX_AGE_MS = 24 * 60 * 60 * 1000

/**
 * The line-counting agent on my machine reports whether I am at the keyboard.
 * It is only shown while the report is fresh — a stale heartbeat asserting
 * "coding now" would be the page telling its first lie.
 */
function useAtKeyboard(): boolean {
  const [atKeyboard, setAtKeyboard] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function read() {
      try {
        const response = await fetch("/api/stats", { cache: "no-store" })
        if (!response.ok) return
        const stats = await response.json()
        const lastUpdate = stats?.presence?.lastUpdate
        const fresh =
          typeof lastUpdate === "string" &&
          Date.now() - new Date(lastUpdate).getTime() < PRESENCE_MAX_AGE_MS
        if (!cancelled) setAtKeyboard(Boolean(fresh && stats.presence.ideRunning))
      } catch {
        // Absence of the signal is the correct default.
      }
    }

    read()
    const timer = setInterval(read, 60_000)
    return () => {
      cancelled = true
      clearInterval(timer)
    }
  }, [])

  return atKeyboard
}

export function Masthead() {
  const { up, probed } = useFleet()
  const atKeyboard = useAtKeyboard()
  const allUp = up === probed

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/92 backdrop-blur-[2px]">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-6 px-6 sm:px-10 lg:px-14">
        <a
          href="#top"
          className="label !text-ink shrink-0 !tracking-[0.16em] transition-opacity hover:opacity-60"
        >
          Felipe Rohnelt
        </a>

        <nav className="hidden gap-7 md:flex" aria-label="Sections">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="label transition-colors hover:!text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {atKeyboard && (
            <span className="label hidden lg:inline">at the keyboard &nbsp;/&nbsp;</span>
          )}
          <StatusDot kind={allUp ? "live" : "down"} />
          <span
            className="font-mono text-[11px] tracking-[0.09em] tabular-nums"
            style={{ color: allUp ? "var(--color-live)" : "var(--color-down)" }}
          >
            {up}/{probed}
            <span className="hidden sm:inline"> RESPONDING</span>
          </span>
        </div>
      </div>
    </header>
  )
}
