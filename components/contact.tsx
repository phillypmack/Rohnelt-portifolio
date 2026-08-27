const ROUTES = [
  {
    label: "Email",
    value: "feliperohneltrds@gmail.com",
    href: "mailto:feliperohneltrds@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "felipe-rohnelt",
    href: "https://www.linkedin.com/in/felipe-rohnelt-78b240197",
  },
  {
    label: "GitHub",
    value: "phillypmack",
    href: "https://github.com/phillypmack",
  },
]

export function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 sm:py-28 lg:px-14"
    >
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-6">
          <p className="label">Section 04</p>
          <h2 className="text-[clamp(1.9rem,3.6vw,2.75rem)]">
            If you need one of these built, or kept running.
          </h2>
          <p className="prose-body">
            I take on ERP and manufacturing integration work, and I build and operate
            products end to end. Tell me what the system has to do and where it has to
            run, and I will tell you what it takes.
          </p>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <dl className="flex flex-col">
            {ROUTES.map((route) => (
              <div key={route.label} className="border-t border-rule last:border-b">
                <a
                  href={route.href}
                  target={route.href.startsWith("http") ? "_blank" : undefined}
                  rel={route.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-baseline justify-between gap-6 py-4 transition-colors hover:bg-surface"
                >
                  <dt className="label">{route.label}</dt>
                  <dd className="font-mono text-sm text-ink group-hover:underline group-hover:underline-offset-4">
                    {route.value}
                  </dd>
                </a>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-6 py-8 sm:flex-row sm:justify-between sm:px-10 lg:px-14">
        <p className="meta">Felipe Rohnelt — Goiás, Brazil</p>
        <p className="meta">
          Built and operated by the person it describes. Running on the server it
          documents.
        </p>
      </div>
    </footer>
  )
}
