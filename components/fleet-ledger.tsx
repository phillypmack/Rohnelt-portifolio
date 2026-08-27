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

/* O único lugar onde a geometria das colunas é definida. */
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
                ABRIR {system.url.replace(/^https?:\/\//, "")}
              </a>
            )}
            {system.repo && (
              <a
                href={system.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-rule px-4 py-2.5 font-mono text-[11px] tracking-[0.08em] text-muted transition-colors hover:border-ink hover:text-ink"
              >
                CÓDIGO
              </a>
            )}
            {system.caseStudy && (
              <a
                href={`#case-${system.slug}`}
                className="border border-rule px-4 py-2.5 font-mono text-[11px] tracking-[0.08em] text-muted transition-colors hover:border-ink hover:text-ink"
              >
                ESTUDO DE CASO
              </a>
            )}
            {system.runtime === "on-prem" && !system.url && (
              <span className="px-1 py-2.5 font-mono text-[11px] text-muted">
                Sem link público — este roda dentro da rede do cliente.
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

  const checkedLabel = new Date(checkedAt).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Sao_Paulo",
  })

  return (
    <section id="frota" className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 sm:py-28 lg:px-14">
      <div className="flex flex-col gap-3 pb-7">
        <p className="label">Seção 01</p>
        <h2 className="text-[clamp(1.9rem,3.6vw,2.75rem)]">A frota</h2>
        <p className="prose-body">
          Todo sistema que tenho em produção, na ordem em que entrou no ar. Os
          públicos são verificados a partir desta página; os que rodam dentro da rede
          de um cliente estão marcados e não podem ser linkados.
        </p>
      </div>

      {/* Os filtros ganham uma faixa própria para nunca espremerem o título. */}
      <div className="flex flex-col gap-4 border-t border-rule py-5 lg:flex-row lg:items-start lg:gap-12">
        <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:gap-4">
          <span className="label !text-[10px] lg:w-14">Onde</span>
          <div className="flex flex-wrap gap-2">
            <Chip active={runtime === "all"} onClick={() => setRuntime("all")}>
              TODOS {ledger.length}
            </Chip>
            <Chip active={runtime === "vps"} onClick={() => setRuntime("vps")}>
              MEU SERVIDOR {ledger.filter((s) => s.runtime === "vps").length}
            </Chip>
            <Chip active={runtime === "on-prem"} onClick={() => setRuntime("on-prem")}>
              REDE DO CLIENTE {ledger.filter((s) => s.runtime === "on-prem").length}
            </Chip>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 lg:flex-1 lg:flex-row lg:items-center lg:gap-4">
          <span className="label !text-[10px] lg:w-14">Área</span>
          <div className="flex flex-wrap gap-2">
            <Chip active={field === "all"} onClick={() => setField("all")}>
              TODAS
            </Chip>
            {fields.map((f) => (
              <Chip key={f} active={field === f} onClick={() => setField(f)}>
                {fieldLabels[f].toUpperCase()}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      {/* Cabeçalhos — só no desktop; no celular cada linha se rotula sozinha. */}
      <div className={`${GRID} hidden border-t border-ink pb-2.5 pt-3 lg:grid`}>
        <span className="label !text-[10px] !tracking-[0.14em]">Desde</span>
        <span className="label !text-[10px] !tracking-[0.14em]">Sistema</span>
        <span className="label !text-[10px] !tracking-[0.14em]">O que faz</span>
        <span className="label !text-[10px] !tracking-[0.14em]">Onde roda</span>
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
                  {system.runtime === "vps" ? "meu servidor" : "rede cliente"}
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
            ? "Verificado a cada 60 segundos a partir desta página."
            : `Mostrando ${rows.length} de ${ledger.length}.`}
        </p>
        <p className="meta">Última verificação {checkedLabel}</p>
      </div>
    </section>
  )
}
