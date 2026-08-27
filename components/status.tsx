import type { Runtime } from "@/lib/systems"

export type StatusKind = "live" | "internal" | "down"

const tone: Record<StatusKind, { color: string; word: string; title: string }> = {
  live: {
    color: "var(--color-live)",
    word: "LIVE",
    title: "Answered the last probe",
  },
  internal: {
    color: "var(--color-internal)",
    word: "INTERNAL",
    title: "Runs inside a client network and cannot be probed from here",
  },
  down: {
    color: "var(--color-down)",
    word: "DOWN",
    title: "Did not answer the last probe",
  },
}

export function statusOf(runtime: Runtime, up: boolean | undefined): StatusKind {
  if (runtime === "on-prem") return "internal"
  return up ? "live" : "down"
}

/**
 * The dot is the only place colour appears on this page, and it always means
 * the same thing: what state a machine is in right now.
 */
export function StatusDot({ kind }: { kind: StatusKind }) {
  return (
    <span
      aria-hidden="true"
      className="inline-block size-[7px] shrink-0 rounded-full"
      style={{ backgroundColor: tone[kind].color }}
    />
  )
}

export function Status({ kind }: { kind: StatusKind }) {
  const { color, word, title } = tone[kind]
  return (
    <span
      className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.09em] whitespace-nowrap"
      style={{ color }}
      title={title}
    >
      <StatusDot kind={kind} />
      {word}
    </span>
  )
}
