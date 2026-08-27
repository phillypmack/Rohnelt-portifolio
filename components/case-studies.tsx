import Image from "next/image"

import {
  caseStudies,
  formatSince,
  PLATE_HEIGHT,
  PLATE_WIDTH,
  type Screenshot,
  type System,
} from "@/lib/systems"

function Plate({
  shot,
  index,
  sizes,
  priority,
}: {
  shot: Screenshot
  index: number
  sizes: string
  priority?: boolean
}) {
  return (
    <figure className="flex flex-col gap-3">
      <div className="border border-rule bg-surface">
        <Image
          src={shot.src}
          alt={shot.caption}
          width={PLATE_WIDTH}
          height={PLATE_HEIGHT}
          sizes={sizes}
          priority={priority}
          className="block h-auto w-full"
        />
      </div>
      <figcaption className="meta max-w-[68ch]">
        <span className="text-ink">Fig. {String(index + 1).padStart(2, "0")}</span>
        {"  —  "}
        {shot.caption}
      </figcaption>
    </figure>
  )
}

function Study({ system, ordinal }: { system: System; ordinal: number }) {
  const [lead, ...rest] = system.screenshots ?? []

  return (
    <article id={`case-${system.slug}`} className="scroll-mt-20 pt-16 first:pt-0">
      <div className="flex flex-col gap-5 border-b border-ink pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-3">
          <p className="label">
            Estudo de caso {String(ordinal).padStart(2, "0")}
          </p>
          <h3 className="text-[clamp(1.7rem,3.2vw,2.4rem)] leading-none">{system.name}</h3>
        </div>
        <dl className="flex flex-wrap gap-x-9 gap-y-3">
          <div className="flex flex-col gap-1.5">
            <dt className="label !text-[10px]">Onde roda</dt>
            <dd
              className="font-mono text-[13px]"
              style={{
                color:
                  system.runtime === "on-prem"
                    ? "var(--color-internal)"
                    : "var(--color-live)",
              }}
            >
              {system.host}
            </dd>
          </div>
          <div className="flex flex-col gap-1.5">
            <dt className="label !text-[10px]">Desde</dt>
            <dd className="font-mono text-[13px] text-ink">{formatSince(system.since)}</dd>
          </div>
          <div className="flex flex-col gap-1.5">
            <dt className="label !text-[10px]">Stack</dt>
            <dd className="font-mono text-[13px] text-ink">{system.stack.join(" · ")}</dd>
          </div>
        </dl>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 pt-9 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-7">
          <p className="label">Para que serve</p>
          <p className="prose-body">{system.detail}</p>
        </div>

        {system.facts && (
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="label pb-3.5">Leituras do sistema rodando</p>
            <dl className="flex flex-col">
              {system.facts.map((fact, index) => (
                <div
                  key={fact.label}
                  className={`flex items-baseline justify-between gap-5 border-t border-rule py-3.5 ${
                    index === system.facts!.length - 1 ? "border-b" : ""
                  }`}
                >
                  <dt className="figure !text-[1.75rem]">{fact.value}</dt>
                  <dd className="meta max-w-[22ch] text-right">{fact.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>

      {lead && (
        <div className="pt-11">
          <Plate shot={lead} index={0} sizes="(min-width: 1024px) 1328px, 100vw" priority={ordinal === 1} />
        </div>
      )}

      {rest.length > 0 && (
        <div className="grid grid-cols-1 gap-8 pt-8 md:grid-cols-2">
          {rest.map((shot, index) => (
            <Plate
              key={shot.src}
              shot={shot}
              index={index + 1}
              sizes="(min-width: 768px) 648px, 100vw"
            />
          ))}
        </div>
      )}
    </article>
  )
}

export function CaseStudies() {
  return (
    <section
      id="estudos"
      className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 sm:py-28 lg:px-14"
    >
      <div className="flex flex-col gap-3 pb-4">
        <p className="label">Seção 02</p>
        <h2 className="text-[clamp(1.9rem,3.6vw,2.75rem)]">Quatro deles, de perto</h2>
        <p className="prose-body">
          Estes quatro rodam dentro da rede de uma indústria, então não há link para
          te dar. As telas são a evidência no lugar dele, e cada número ao lado é uma
          leitura tirada da própria tela mostrada.
        </p>
      </div>

      <div className="flex flex-col divide-y divide-rule">
        {caseStudies.map((system, index) => (
          <Study key={system.slug} system={system} ordinal={index + 1} />
        ))}
      </div>
    </section>
  )
}
