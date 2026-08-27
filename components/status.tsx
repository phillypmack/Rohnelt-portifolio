import type { Runtime } from "@/lib/systems"

export type StatusKind = "live" | "internal" | "down"

const tone: Record<StatusKind, { color: string; word: string; title: string }> = {
  live: {
    color: "var(--color-live)",
    word: "NO AR",
    title: "Respondeu à última verificação",
  },
  internal: {
    color: "var(--color-internal)",
    word: "INTERNO",
    title: "Roda dentro da rede de um cliente e não pode ser verificado daqui",
  },
  down: {
    color: "var(--color-down)",
    word: "FORA",
    title: "Não respondeu à última verificação",
  },
}

export function statusOf(runtime: Runtime, up: boolean | undefined): StatusKind {
  if (runtime === "on-prem") return "internal"
  return up ? "live" : "down"
}

/**
 * O ponto é o único lugar onde aparece cor nesta página, e ele sempre significa
 * a mesma coisa: em que estado uma máquina está agora.
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
