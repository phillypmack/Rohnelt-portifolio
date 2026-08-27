import { counts, formatSince, systems } from "@/lib/systems"

/** The most recent month anything shipped, and how much shipped in it. */
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
    { value: String(counts.total), label: "systems in production" },
    { value: String(counts.vps), label: "public endpoints" },
    { value: String(counts.onPrem), label: "inside client networks" },
    { value: String(burst.count), label: `shipped in ${burst.month}` },
  ]

  /** Staggered page-load reveal, driven entirely by CSS. */
  const rise = (delay: number) => ({
    className: "reveal",
    style: { animationDelay: `${delay}s` },
  })

  return (
    <section id="top" className="mx-auto max-w-[1440px] px-6 pt-16 pb-4 sm:px-10 sm:pt-24 lg:px-14">
      <div className="grid grid-cols-1 gap-x-8 gap-y-14 lg:grid-cols-12">
        <div className="flex flex-col gap-7 lg:col-span-7">
          <p {...rise(0)} className="label reveal">
            Systems engineer &nbsp;/&nbsp; Goiás, Brazil
          </p>

          <h1
            {...rise(0.08)}
            className="reveal text-[clamp(2.5rem,6.2vw,4.1rem)] leading-[0.99]"
          >
            Software in production, operated by the person who wrote it.
          </h1>

          <p {...rise(0.16)} className="prose-lead reveal">
            Twenty-three systems are in production as you read this. Fourteen answer on
            the public internet from a single server I administer end to end. Nine run
            inside a manufacturer&rsquo;s network, where they schedule injection-moulding
            production, watch an Oracle instance and move stock through a warehouse.
          </p>

          <p {...rise(0.22)} className="prose-lead reveal">
            The status column below is a probe run from this page, not a screenshot. If
            something is down when you visit, it will say so.
          </p>

          <div {...rise(0.28)} className="reveal mt-1 flex flex-wrap gap-3">
            <a
              href="#fleet"
              className="bg-ink px-6 py-3.5 font-mono text-xs tracking-[0.08em] text-paper transition-opacity hover:opacity-85"
            >
              READ THE FLEET
            </a>
            <a
              href="#contact"
              className="border border-ink px-6 py-3.5 font-mono text-xs tracking-[0.08em] text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              GET IN TOUCH
            </a>
          </div>
        </div>

        <div {...rise(0.34)} className="reveal lg:col-span-4 lg:col-start-9">
          <p className="label pb-3.5">At a glance</p>
          <dl className="flex flex-col">
            {figures.map((figure, index) => (
              <div
                key={figure.label}
                className={`flex items-baseline justify-between gap-4 border-t border-rule py-4 ${
                  index === figures.length - 1 ? "border-b" : ""
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
