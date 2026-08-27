"use client"

import { useMemo, useState } from "react"
import { useFleet } from "@/components/fleet-provider"
import { Status, statusOf } from "@/components/status"
import {
  fieldLabels,
  formatSince,
  ledger,
  type Field,
  type Runtime,
  type System,
} from "@/lib/systems"

/* The one place the column geometry is defined. */
const GRID =
  "grid grid-cols-[84px_minmax(0,1fr)] gap-x-5 gap-y-2 lg:grid-cols-[84px_200px_minmax(0,1fr)_108px_220px_112px] lg:gap-y-0"

type RuntimeFilter = Runtime | "all"
type FieldFilter = Field | "all"

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`font-mono text-[11px] tracking-[0.08em] whitespace-nowrap transition-colors ${
        active
          ? "bg-ink text-paper px-3.5 py-2"
          : "border border-rule text-muted hover:border-ink hover:text-ink px-3.5 py-2"
      }`}
    >
      {children}
    </button>
  )
}

function Detail({ system }: { system: System }) {
  return (
    <div className="border-t border-rule bg-surface px-4 py-6 sm:px-6 lg:pl-[104px]">
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
        <div className="flex flex-col gap-4 lg:max-w-[62ch] lg:flex-1">
          <p className="prose-body">{system.detail}</p>
          <div className="flex flex-wrap gap-2.5">
            {system.url && (
              <a
                href={system.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ink px-4 py-2.5 font-mono text-[11px] tracking-[0.08em] text-paper transition-opacity hover:opacity-85"
              >
                OPEN {system.url.replace(/^https?:\/\//, "")}
              </a>
            )}
            {system.repo && (
              <a
                href={system.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-rule px-4 py-2.5 font-mono text-[11px] tracking-[0.08em] text-muted transition-colors hover:border-ink hover:text-ink"
              >
                SOURCE
              </a>
            )}
            {system.caseStudy && (
              <a
                href={`#case-${system.slug}`}
                className="border border-rule px-4 py-2.5 font-mono text-[11px] tracking-[0.08em] text-muted transition-colors hover:border-ink hover:text-ink"
              >
                CASE STUDY
              </a>
            )}
            {system.runtime === "on-prem" && !system.url && (
              <span className="px-1 py-2.5 font-mono text-[11px] text-muted">
                No public link — this one runs inside a client network.
              </span>
            )}
          </div>
        </div>

        {system.facts && (
          <dl className="flex shrink-0 flex-col gap-2.5 lg:w-[340px]">
            {system.facts.map((fact) => (
              <div
                key={fact.label}
                className="flex items-baseline justify-between gap-6 border-b border-rule pb-2"
              >
                <dt className="meta">{fact.label}</dt>
                <dd className="font-mono text-xs text-ink tabular-nums">{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>
  )
}

export function FleetLedger() {
  const { health, checkedAt } = useFleet()
  const [runtime, setRuntime] = useState<RuntimeFilter>("all")
  const [field, setField] = useState<FieldFilter>("all")
  const [open, setOpen] = useState<string | null>(null)

  const fields = useMemo(() => {
    const present = new Set<Field>()
    ledger.forEach((s) => s.fields.forEach((f) => present.add(f)))
    return (Object.keys(fieldLabels) as Field[]).filter((f) => present.has(f))
  }, [])

  const rows = useMemo(
    () =>
      ledger.filter(
        (s) =>
          (runtime === "all" || s.runtime === runtime) &&
          (field === "all" || s.fields.includes(field)),
      ),
    [runtime, field],
  )

  const checkedLabel = new Date(checkedAt).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  })

  return (
    <section id="fleet" className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 sm:py-28 lg:px-14">
      <div className="flex flex-col gap-3 pb-7">
        <p className="label">Section 01</p>
        <h2 className="text-[clamp(1.9rem,3.6vw,2.75rem)]">The fleet</h2>
        <p className="prose-body">
          Every system I have in production, ordered by the month it went into service.
          Public ones are probed from this page; the ones inside a client network are
          marked and cannot be linked.
        </p>
      </div>

      {/* Filters get their own band so they never crowd the heading. */}
      <div className="flex flex-col gap-4 border-t border-rule py-5 lg:flex-row lg:items-start lg:gap-12">
        <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:gap-4">
          <span className="label !text-[10px] lg:w-14">Where</span>
          <div className="flex flex-wrap gap-2">
            <Chip active={runtime === "all"} onClick={() => setRuntime("all")}>
              ALL {ledger.length}
            </Chip>
            <Chip active={runtime === "vps"} onClick={() => setRuntime("vps")}>
              MY SERVER {ledger.filter((s) => s.runtime === "vps").length}
            </Chip>
            <Chip active={runtime === "on-prem"} onClick={() => setRuntime("on-prem")}>
              CLIENT NETWORK {ledger.filter((s) => s.runtime === "on-prem").length}
            </Chip>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 lg:flex-1 lg:flex-row lg:items-center lg:gap-4">
          <span className="label !text-[10px] lg:w-14">Field</span>
          <div className="flex flex-wrap gap-2">
            <Chip active={field === "all"} onClick={() => setField("all")}>
              ANY
            </Chip>
            {fields.map((f) => (
              <Chip key={f} active={field === f} onClick={() => setField(f)}>
                {fieldLabels[f].toUpperCase()}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      {/* Column heads — desktop only; on small screens each row labels itself. */}
      <div className={`${GRID} hidden border-t border-ink pb-2.5 pt-3 lg:grid`}>
        <span className="label !text-[10px] !tracking-[0.14em]">Since</span>
        <span className="label !text-[10px] !tracking-[0.14em]">System</span>
        <span className="label !text-[10px] !tracking-[0.14em]">What it does</span>
        <span className="label !text-[10px] !tracking-[0.14em]">Runs on</span>
        <span className="label !text-[10px] !tracking-[0.14em]">Stack</span>
        <span className="label !text-[10px] !tracking-[0.14em] text-right">Status</span>
      </div>

      <ul className="border-b border-rule lg:border-t-0">
        {rows.map((system) => {
          const kind = statusOf(system.runtime, health.get(system.slug)?.up)
          const expanded = open === system.slug
          return (
            <li
              key={system.slug}
              className="border-t border-rule first:border-t-ink lg:first:border-t-rule"
            >
              <button
                type="button"
                onClick={() => setOpen(expanded ? null : system.slug)}
                aria-expanded={expanded}
                className={`${GRID} w-full items-baseline px-4 py-3.5 text-left transition-colors hover:bg-surface sm:px-6 lg:px-0 ${
                  expanded ? "bg-surface" : ""
                }`}
              >
                <span className="meta lg:!text-xs">{formatSince(system.since)}</span>
                <span className="font-display text-[15px] font-semibold tracking-[-0.005em] text-ink">
                  {system.name}
                </span>
                <span className="prose-row col-span-2 lg:col-span-1">{system.summary}</span>
                <span className="meta hidden lg:block">
                  {system.runtime === "vps" ? "my server" : "client net"}
                </span>
                <span className="meta hidden truncate lg:block" title={system.stack.join(" · ")}>
                  {system.stack.join(" · ")}
                </span>
                <span className="col-start-1 lg:col-start-auto lg:justify-self-end">
                  <Status kind={kind} />
                </span>
              </button>
              {expanded && <Detail system={system} />}
            </li>
          )
        })}
      </ul>

      <div className="flex flex-col gap-1 pt-4 sm:flex-row sm:justify-between">
        <p className="meta">
          {rows.length === ledger.length
            ? "Probed every 60 seconds from the page you are reading."
            : `Showing ${rows.length} of ${ledger.length}.`}
        </p>
        <p className="meta">Last check {checkedLabel} UTC</p>
      </div>
    </section>
  )
}
