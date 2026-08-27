const GROUPS: { title: string; note: string; items: string[] }[] = [
  {
    title: "Edge",
    note: "One host terminates everything.",
    items: [
      "nginx, 19 virtual hosts",
      "Let's Encrypt, renewed on a timer",
      "HTTP redirected to HTTPS throughout",
      "Unknown Host headers dropped, not served",
      "UFW: 22, 80, 443 and the media ports only",
    ],
  },
  {
    title: "Runtime",
    note: "Whatever suits the service, not one dogma.",
    items: [
      "Docker Compose for the multi-container apps",
      "systemd units for the single binaries",
      "pm2 where a Node process wants a supervisor",
      "Isolated JDK containers for untrusted student code",
    ],
  },
  {
    title: "Data",
    note: "Eight database instances, each owned by one service.",
    items: [
      "PostgreSQL, one instance per application",
      "pgvector for embedding search",
      "Redis for queues and ephemeral state",
      "Oracle, on the client side of the fence",
      "SQLite where a file is genuinely enough",
    ],
  },
  {
    title: "Real time",
    note: "The parts that cannot be polled.",
    items: [
      "LiveKit for consultation video and audio",
      "WebSockets for play and dispatch",
      "Whisper for on-host transcription",
      "Server-authoritative simulation, not client trust",
    ],
  },
  {
    title: "Languages",
    note: "Chosen per problem.",
    items: [
      "TypeScript and Next.js for most product surfaces",
      "Python with FastAPI and Flask against Oracle",
      "Java and Spring Boot",
      "SQL that is written, not generated blindly",
    ],
  },
  {
    title: "Practice",
    note: "What keeps it up when I am asleep.",
    items: [
      "Deploy scripts per service, not manual steps",
      "Scheduled backups with restores actually tested",
      "Host hardening scripts kept in version control",
      "Alerting that escalates until a human reads it",
    ],
  },
]

export function Operations() {
  return (
    <section
      id="operations"
      className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 sm:py-28 lg:px-14"
    >
      <div className="flex flex-col gap-3 border-b border-ink pb-7">
        <p className="label">Section 03</p>
        <h2 className="text-[clamp(1.9rem,3.6vw,2.75rem)]">Operations</h2>
        <p className="prose-body">
          Most portfolios stop at the interface. This is the other half of the job: what
          the fourteen public services actually run on, and what keeps them answering
          between deploys.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-11 pt-10 md:grid-cols-2 lg:grid-cols-3">
        {GROUPS.map((group) => (
          <div key={group.title} className="flex flex-col gap-3.5">
            <div className="flex flex-col gap-1.5">
              <h3 className="font-display text-lg font-semibold tracking-[-0.01em]">
                {group.title}
              </h3>
              <p className="meta">{group.note}</p>
            </div>
            <ul className="flex flex-col">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="prose-row border-t border-rule py-2.5 last:border-b"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
