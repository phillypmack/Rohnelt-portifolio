import { counts, formatSince, systems } from "@/lib/systems"

/** O mês mais recente em que algo subiu, e quanto subiu nele. */
function latestBurst() {
  const latest = systems.reduce((a, s) => (s.since > a ? s.since : a), "")
  return {
    month: formatSince(latest),
    count: systems.filter((s) => s.since === latest).length,
  }
}

export function Thesis() {
  const burst = latestBurst()

  const figures = [
    { value: String(counts.total), label: "sistemas em produção" },
    { value: String(counts.vps), label: "endpoints públicos" },
    { value: String(counts.onPrem), label: "na rede de clientes" },
    { value: String(burst.count), label: `subiram em ${burst.month}` },
  ]

  /** Entrada escalonada da página, feita só com CSS. */
  const rise = (delay: number) => ({
    className: "reveal",
    style: { animationDelay: `${delay}s` },
  })

  return (
    <section id="topo" className="mx-auto max-w-[1440px] px-6 pt-16 pb-4 sm:px-10 sm:pt-24 lg:px-14">
      <div className="grid grid-cols-1 gap-x-8 gap-y-14 lg:grid-cols-12">
        <div className="flex flex-col gap-7 lg:col-span-7">
          <p {...rise(0)} className="label reveal">
            Engenheiro de Software &nbsp;/&nbsp; Goiás, Brasil
          </p>

          <h1
            {...rise(0.08)}
            className="reveal text-[clamp(2.5rem,6.2vw,4.1rem)] leading-[0.99]"
          >
            Softwares, Soluções e Automações.
          </h1>

          <p {...rise(0.16)} className="prose-lead reveal">
            Agregando valor ao seu negócio através de tecnologia, seja em nuvem ou em ambiente local.
            São 23 sistemas em produção, sendo 14 na internet e 9 em redes internas TMS, MPS, WMS, MRP,
            modelos desenvolvidos, testados e validados em produção, integrações com ERPs desenvolvidas
            para necessidades específicas, automações de processos, consultoria em tecnologia e sistemas.
          </p>

          <p {...rise(0.22)} className="prose-lead reveal">
            Os sistemas mostrados abaixo estão online e rodando, os status são ao vivo
          </p>

          <div {...rise(0.28)} className="reveal mt-1 flex flex-wrap gap-3">
            <a
              href="#frota"
              className="bg-ink px-6 py-3.5 font-mono text-xs tracking-[0.08em] text-paper transition-opacity hover:opacity-85"
            >
              SISTEMAS EM PRODUÇÃO
            </a>
            <a
              href="#contato"
              className="border border-ink px-6 py-3.5 font-mono text-xs tracking-[0.08em] text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              FALAR COMIGO
            </a>
          </div>
        </div>

        <div {...rise(0.34)} className="reveal lg:col-span-4 lg:col-start-9">
          <p className="label pb-3.5">Em números</p>
          <dl className="flex flex-col">
            {figures.map((figure, index) => (
              <div
                key={figure.label}
                className={`flex items-baseline justify-between gap-4 border-t border-rule py-4 ${index === figures.length - 1 ? "border-b" : ""
                  }`}
              >
                <dt className="figure order-1">{figure.value}</dt>
                <dd className="meta order-2 max-w-[26ch] text-right">{figure.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
