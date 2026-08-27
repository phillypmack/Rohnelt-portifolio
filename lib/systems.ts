/**
 * The fleet.
 *
 * Every entry here is software that is in production. `vps` means it runs on
 * the server at 187.77.8.195 and you can open it; `on-prem` means it runs
 * inside a client network and cannot be linked from the public internet.
 *
 * `since` is the month the system went into production and is the sort key for
 * the ledger — the ordering carries the fleet's real chronology.
 *
 * `repo` is set only for repositories that are genuinely public. Linking a
 * private repo would hand a visitor a 404.
 */

export type Runtime = "vps" | "on-prem"

export type Field =
  | "erp"
  | "manufacturing"
  | "logistics"
  | "ai"
  | "product"
  | "education"

export const fieldLabels: Record<Field, string> = {
  erp: "ERP integration",
  manufacturing: "Manufacturing",
  logistics: "Logistics",
  ai: "AI",
  product: "Product",
  education: "Education",
}

export type Fact = { label: string; value: string }

export type Screenshot = { src: string; caption: string }

export type System = {
  slug: string
  name: string
  /** One line. Shown in the ledger row. */
  summary: string
  /** One paragraph. Shown when the row is expanded. */
  detail: string
  runtime: Runtime
  /** Where it physically runs, in plain words. */
  host: string
  /** Public URL. Present only when a visitor can actually open it. */
  url?: string
  /** Path the health probe requests. Defaults to "/". */
  healthPath?: string
  /** YYYY-MM. */
  since: string
  stack: string[]
  fields: Field[]
  repo?: string
  facts?: Fact[]
  screenshots?: Screenshot[]
  /** Gets a full write-up further down the page. */
  caseStudy?: boolean
}

/** Screenshots are all captured at this size. */
export const PLATE_WIDTH = 1920
export const PLATE_HEIGHT = 1080

export const systems: System[] = [
  // ---------------------------------------------------------------- on-prem
  {
    slug: "wms",
    name: "WMS",
    summary:
      "Warehouse management layered on ERP stock: addressing, movements, inventory counts",
    detail:
      "The ERP knew how much stock existed but not where any of it was. This adds the missing layer: every position in the warehouse is an address, every movement in and out is recorded against one, and a count can be run and reconciled without stopping the operation. It reads product and balance data from Sankhya and keeps its own view of location.",
    runtime: "on-prem",
    host: "client network",
    since: "2025-09",
    stack: ["Flask", "Oracle", "Sankhya"],
    fields: ["logistics", "erp"],
    caseStudy: true,
    facts: [
      { label: "Products tracked", value: "1,432" },
      { label: "Warehouse addresses", value: "502" },
      { label: "Units under management", value: "75,884" },
    ],
    screenshots: [
      { src: "/projects/wms-project/dashboard.png", caption: "Stock at a glance, reconciled against the ERP balance on every load." },
      { src: "/projects/wms-project/enderecos.png", caption: "The addressing scheme — the layer the ERP did not have." },
      { src: "/projects/wms-project/movimentacoes.png", caption: "Every movement in and out, attributed and timestamped." },
      { src: "/projects/wms-project/inventario.png", caption: "Counting without stopping the operation." },
    ],
  },
  {
    slug: "inplanta-sales",
    name: "InPlanta Sales",
    summary: "Field sales for a manufacturer, writing orders straight into the ERP",
    detail:
      "Sales reps were taking orders on paper and phoning them in, which meant re-typing, transcription errors and a lag before anything reached production. This puts the catalogue, prices and stock in the rep's hands and writes the order into Sankhya at the point of sale.",
    runtime: "on-prem",
    host: "client network",
    since: "2025-10",
    stack: ["Next.js", "Oracle", "Sankhya"],
    fields: ["erp", "product"],
  },
  {
    slug: "order-tracking",
    name: "Order Tracking",
    summary: "Customer-facing portal for order status, fed from production and dispatch",
    detail:
      "Customers phoning to ask where an order was is a support cost and a trust problem. This exposes the same status the planning floor sees — produced, packed, dispatched — on a page the customer can open themselves.",
    runtime: "on-prem",
    host: "client network",
    since: "2025-10",
    stack: ["Next.js", "Oracle", "Sankhya"],
    fields: ["erp", "logistics"],
  },
  {
    slug: "op-scheduler",
    name: "OP Scheduler",
    summary: "Turns a production plan into ERP production orders without manual typing",
    detail:
      "Once a plan is agreed, someone had to open the ERP and key in every production order by hand — hundreds of them, each an opportunity for a wrong quantity or a wrong mould. This reads the approved plan and creates the orders directly through the ERP, then reconciles what it created against what was asked for.",
    runtime: "on-prem",
    host: "client network",
    since: "2026-03",
    stack: ["FastAPI", "Python", "Oracle", "Sankhya"],
    fields: ["manufacturing", "erp"],
  },
  {
    slug: "production-intelligence",
    name: "Production Intelligence",
    summary:
      "MRP/PCP planning: Gantt scheduling, mould occupancy, delay diagnosis, an assistant that reads live plan data",
    detail:
      "A plastics manufacturer scheduled injection moulding by hand, in spreadsheets rebuilt every week from an ERP export. This plans against the real constraints — mould availability, machine capacity, setup time between products, committed customer dates — renders the result as a Gantt, and keeps history so a late order can be explained rather than guessed at.",
    runtime: "on-prem",
    host: "client network",
    since: "2026-03",
    stack: ["Next.js", "FastAPI", "Oracle", "Claude", "Gemini"],
    fields: ["manufacturing", "erp", "ai"],
    caseStudy: true,
    facts: [
      { label: "Orders scheduled", value: "534" },
      { label: "Line items planned", value: "18,686" },
      { label: "Mould occupancy", value: "97.0%" },
      { label: "Moulds left idle", value: "1" },
      { label: "SKUs flagged unplanned", value: "6,285" },
    ],
    screenshots: [
      { src: "/projects/production-intelligence-suite/graficos-gantt.png", caption: "The schedule as a Gantt. Each order appears twice, previous run against current, so a date that moved is visible without reading a report." },
      { src: "/projects/production-intelligence-suite/ocupacao-moldes.png", caption: "Mould occupancy per machine. Moulds are the scarce resource, so this is the view that decides what can be promised." },
      { src: "/projects/production-intelligence-suite/assistente-ia.png", caption: "The assistant answers against the active plan and cites the orders behind each recommendation." },
      { src: "/projects/production-intelligence-suite/pontos-atencao.png", caption: "Where the plan is about to hurt: unmet demand, idle moulds, orders at risk." },
      { src: "/projects/production-intelligence-suite/visao-geral.png", caption: "The daily view the planning team opens first." },
    ],
  },
  {
    slug: "oracle-monitor",
    name: "Oracle Monitor",
    summary: "Live database health — wait events, locks, deadlocks, redo, segments, sessions",
    detail:
      "When the ERP slowed down, nobody could say why, and the answer was usually somewhere in the database nobody was watching. This reads the Oracle dynamic performance views continuously and puts them in front of a person: what is waiting, on what, and for how long. Deadlocks and lock chains surface as alerts rather than as a complaint from the shop floor.",
    runtime: "on-prem",
    host: "client network",
    since: "2026-04",
    stack: ["Flask", "Python", "Oracle"],
    fields: ["erp", "ai"],
    caseStudy: true,
    facts: [
      { label: "Sequential read waits observed", value: "162,555,016" },
      { label: "Row lock contention events", value: "29,004" },
      { label: "Worst average wait", value: "7.86 s" },
      { label: "Log file sync average", value: "21.1 ms" },
    ],
    screenshots: [
      { src: "/projects/oracle-monitor/dashboard.png", caption: "Active sessions over two hours, with the wait events behind them ranked underneath." },
      { src: "/projects/oracle-monitor/sessoes-locks.png", caption: "Sessions and lock chains — who is blocking whom, right now." },
      { src: "/projects/oracle-monitor/deadlocks.png", caption: "Deadlocks captured and kept, rather than lost in a trace file." },
      { src: "/projects/oracle-monitor/performance-sql.png", caption: "The statements actually costing time." },
      { src: "/projects/oracle-monitor/redo-logs.png", caption: "Redo throughput and switch frequency." },
    ],
  },
  {
    slug: "uptime-monitor",
    name: "Uptime Monitor",
    summary:
      "Watches internal services and escalates to the on-call technician until someone reads it",
    detail:
      "An alert nobody reads is not an alert. This checks the internal services on a schedule and, when one stops answering, messages the on-call technician — then messages again, on an interval, until the message is actually read. It sends a different, plainer notice to the people who only need to know the system is down and that someone is on it.",
    runtime: "on-prem",
    host: "client network",
    since: "2026-04",
    stack: ["Node.js", "SQLite", "WhatsApp API"],
    fields: ["erp"],
    caseStudy: true,
    facts: [
      { label: "Re-alert interval", value: "5 minutes" },
      { label: "Escalation attempts", value: "3, then stop" },
      { label: "Audiences", value: "Technician and end user, worded differently" },
    ],
    screenshots: [
      { src: "/projects/sankhya-uptime-monitor/dashboard.png", caption: "What is up, what is not, and for how long." },
      { src: "/projects/sankhya-uptime-monitor/alertas.png", caption: "Message templates per audience — the technician gets the cause, the user gets the reassurance." },
      { src: "/projects/sankhya-uptime-monitor/grupos-reacionamento.png", caption: "Escalation groups: who gets told, in what order." },
    ],
  },
  {
    slug: "vasap-vision",
    name: "Vasap Vision",
    summary: "Vision inspection on the production line",
    detail:
      "Detects and classifies product coming off the line from a camera feed, so a defect is caught at the machine rather than at dispatch.",
    runtime: "on-prem",
    host: "client network",
    since: "2026-05",
    stack: ["Python", "YOLO", "ONNX Runtime", "OpenCV"],
    fields: ["manufacturing", "ai"],
  },
  {
    slug: "transporta",
    name: "Transporta",
    summary: "Freight planning and delivery routing off the back of dispatch",
    detail:
      "Takes what dispatch has committed to and turns it into loads and routes — which orders travel together, on which vehicle, in what order of delivery.",
    runtime: "on-prem",
    host: "client network",
    since: "2026-06",
    stack: ["Next.js", "PostgreSQL", "Sankhya"],
    fields: ["logistics", "erp"],
  },

  // -------------------------------------------------------------------- vps
  {
    slug: "hardskills-dtf",
    name: "HardSkills DTF",
    summary: "Nests artwork into printable sheets for DTF and UV sticker production",
    detail:
      "Sticker printing wastes film whenever artwork is laid out by eye. This packs submitted artwork into the sheet automatically, respecting bleed and cut margins, and outputs a file the printer can run directly.",
    runtime: "vps",
    host: "187.77.8.195",
    url: "https://hardskills.rohnelt.dev",
    since: "2025-11",
    stack: ["Vanilla JS", "Tailwind", "nginx"],
    fields: ["product", "manufacturing"],
    repo: "https://github.com/phillypmack/hardskills-dtf-generator",
  },
  {
    slug: "chaveirogo",
    name: "ChaveiroGO",
    summary: "Dispatch platform for locksmiths — live positions, job offers, a courier-style app",
    detail:
      "A customer locked out of a car or a house needs the nearest available locksmith, not a phone directory. This holds the locksmiths' live positions in PostGIS, offers a job to the closest ones over a socket, and tracks the accepted call through to payment. There are three surfaces: the customer site, the locksmith's app and the operator's console.",
    runtime: "vps",
    host: "187.77.8.195",
    url: "https://www.chaveirogo.com.br",
    since: "2025-12",
    stack: ["Fastify", "Next.js", "PostGIS", "Redis", "Socket.IO", "Turborepo"],
    fields: ["product", "logistics"],
  },
  {
    slug: "pakgo",
    name: "Pakgo",
    summary: "3D container loading — packs an order list into containers and exports the plan",
    detail:
      "Deciding what fits in a container is done badly by intuition and well by a packing algorithm. This takes a list of items and dimensions, packs them, shows the result in 3D so a human can sanity-check it, and exports a loading plan the warehouse can follow.",
    runtime: "vps",
    host: "187.77.8.195",
    url: "https://pakgo.com.br",
    since: "2026-02",
    stack: ["Next.js", "Prisma", "PostgreSQL", "three.js", "Stripe"],
    fields: ["logistics", "product"],
  },
  {
    slug: "warzil",
    name: "WARZIL",
    summary: "Real-time territory conquest played on the actual map of Brazilian municipalities",
    detail:
      "A conquest game whose board is the real country: every Brazilian municipality is a territory and the official borders form the adjacency graph. The simulation is continuous and server-authoritative rather than turn-based, so a session runs for hours or days and the server, not the client, decides what happened.",
    runtime: "vps",
    host: "187.77.8.195",
    url: "https://warzil.com",
    since: "2026-06",
    stack: ["Turborepo", "Fastify", "PostgreSQL", "Redis", "MapLibre GL"],
    fields: ["product"],
  },
  {
    slug: "quantical",
    name: "Quantical",
    summary:
      "Quantum computing taught in Portuguese, with a statevector simulator that runs in the browser",
    detail:
      "Quantum computing material in Portuguese is thin, and most of it is either hand-waving or a research paper. This teaches the subject properly and lets the reader run the circuits as they read: the statevector simulator is compiled into the page, so there is no backend to queue behind and nothing to install.",
    runtime: "vps",
    host: "187.77.8.195",
    url: "https://quantical.com.br",
    since: "2026-07",
    stack: ["Next.js", "TypeScript", "static export"],
    fields: ["education"],
    repo: "https://github.com/phillypmack/Quantical",
  },
  {
    slug: "chess2",
    name: "Chess2",
    summary: "2D and 3D chess with online play, accounts, Elo and a cosmetics economy",
    detail:
      "Play against the engine, against someone in the room, or online. The server handles matchmaking, accounts, rating and the shop; the board renders in either 2D or 3D from the same game state. Portuguese and English.",
    runtime: "vps",
    host: "187.77.8.195",
    url: "https://xadrez.pro",
    since: "2026-07",
    stack: ["Node.js", "WebSocket", "PostgreSQL", "three.js"],
    fields: ["product"],
  },
  {
    slug: "xsafe",
    name: "XSafe",
    summary:
      "Pulls every fiscal document issued against a company straight from the tax authority and keeps the five-year archive the law requires",
    detail:
      "Brazilian companies must keep fiscal documents for five years, and most discover one is missing during an audit. XSafe authenticates to SEFAZ with the company's own A1 certificate, walks the official distribution endpoint on a schedule, and stores each document encrypted under an envelope key. It was verified end to end against a real ICP-Brasil certificate and a real CNPJ before launch.",
    runtime: "vps",
    host: "187.77.8.195",
    url: "https://xsafe.rohnelt.dev",
    since: "2026-08",
    stack: ["Next.js", "Drizzle", "PostgreSQL", "SOAP/mTLS", "Auth.js"],
    fields: ["product", "erp"],
    facts: [
      { label: "Pricing", value: "R$ 24.90 – R$ 99 / month" },
      { label: "Encryption", value: "AES-256-GCM envelope" },
      { label: "Retention", value: "5 years" },
    ],
  },
  {
    slug: "veritas",
    name: "Veritas",
    summary:
      "Prices, sells, charges the card, retries the failed charge and reports its own faults, unattended",
    detail:
      "An experiment in how much of a software business can be automated: it prices, sells, takes card payments, invoices, retries failed charges, runs its own acquisition channels, checks its own health and backs itself up. It is written against the Python standard library alone — no third-party packages — and its test suite runs entirely offline.",
    runtime: "vps",
    host: "187.77.8.195",
    url: "https://veritas.rohnelt.dev",
    since: "2026-08",
    stack: ["Python", "SQLite", "systemd"],
    fields: ["product"],
    facts: [
      { label: "Third-party packages", value: "None" },
      { label: "Offline tests", value: "388" },
    ],
  },
  {
    slug: "aura",
    name: "Aura",
    summary: "A permanent inbox and webhook for AI agents that die between runs, paid per call",
    detail:
      "An agent that exits loses everything: its address, its pending mail, what it was doing. Aura gives it a permanent email address and webhook URL that outlive the process, plus durable memory it can park state in and pick up later. There is no account and no signup — it is paid per call in stablecoin, machine to machine.",
    runtime: "vps",
    host: "187.77.8.195",
    url: "https://aura.rohnelt.dev",
    since: "2026-08",
    stack: ["TypeScript", "PostgreSQL", "pgvector", "MCP", "x402"],
    fields: ["ai", "product"],
  },
  {
    slug: "kortex",
    name: "Kortex",
    summary:
      "Ranks machine-payable services by measured uptime and settled on-chain payments, not by self-description",
    detail:
      "Directories of machine-payable services list what each one claims to do. Kortex answers the question that matters instead: of the services claiming to do this, which actually respond, price correctly, and have been paid by wallets other than their own. It sells one answer rather than a catalogue.",
    runtime: "vps",
    host: "187.77.8.195",
    url: "https://kortex.rohnelt.dev",
    since: "2026-08",
    stack: ["TypeScript", "PostgreSQL", "MCP", "x402"],
    fields: ["ai", "product"],
    facts: [
      { label: "Settlements measured in 30 days", value: "481,899" },
      { label: "Median settlement", value: "US$ 0.002" },
      { label: "Services listed", value: "~13,500" },
    ],
  },
  {
    slug: "vortex",
    name: "Vortex",
    summary: "Answers whether a store can actually deliver to an address, and what it costs landed",
    detail:
      "An agent buying on someone's behalf can read a price but not whether the thing can reach the buyer, or what it will really cost once freight, duty and handling are counted. Vortex answers both, per store and per destination.",
    runtime: "vps",
    host: "187.77.8.195",
    url: "https://vortex.rohnelt.dev",
    since: "2026-08",
    stack: ["TypeScript", "PostgreSQL", "MCP", "x402"],
    fields: ["ai", "logistics"],
  },
  {
    slug: "precex",
    name: "Precex",
    summary:
      "Reference-price index for Brazilian public procurement, with the reports the regulation asks for",
    detail:
      "Public bodies must justify the prices they budget for, against sources and by the method the regulation specifies. Precex indexes homologated unit prices from federal procurement open data and generates the report in the required form. It is built static-first: a worker writes each price page to disk and nginx serves it, so the common case touches neither the application nor the database.",
    runtime: "vps",
    host: "187.77.8.195",
    url: "https://precex.com.br",
    since: "2026-08",
    stack: ["TypeScript", "PostgreSQL", "Redis", "Asaas", "nginx"],
    fields: ["product"],
  },
  {
    slug: "sinal",
    name: "Sinal",
    summary:
      "Telemedicine for small-town clinics: booked slots, video in the platform, a summary the doctor signs",
    detail:
      "Built for clinics where the alternative is a patient travelling for hours. The agenda is fixed-slot rather than a queue, the consultation happens in the platform instead of on a consumer video app, and the transcription is turned into a summary the doctor reviews and signs — as is the prescription, digitally. The database refuses overlapping appointments and will not let its own audit log be edited.",
    runtime: "vps",
    host: "187.77.8.195",
    url: "https://sinal.rohnelt.dev",
    since: "2026-08",
    stack: ["Next.js", "LiveKit", "Whisper", "Drizzle", "PostgreSQL", "Anthropic"],
    fields: ["product", "ai"],
    facts: [
      { label: "Audit log", value: "Update and delete refused at the database" },
      { label: "Overlapping appointments", value: "Prevented by constraint, not by code" },
    ],
  },
  {
    slug: "java-trilha",
    name: "Java Trilha",
    summary:
      "Java from fundamentals to Spring Boot; every submission compiles in its own throwaway container",
    detail:
      "A guided path rather than a video library: sixteen units, 180 exercises, and practice that is checked by actually compiling and running it. Each submission gets its own network-less JDK container with CPU, memory and filesystem limits, so student code never runs inside the API. The editor enforces typing integrity rather than accepting a paste. The instance linked here is the staging environment.",
    runtime: "vps",
    host: "187.77.8.195",
    url: "https://lab.rohnelt.dev",
    since: "2026-08",
    stack: ["React", "Spring Boot", "Docker", "CodeMirror"],
    fields: ["education"],
  },
]

/** Ledger order: the month each system went into production. */
export const ledger = [...systems].sort((a, b) => a.since.localeCompare(b.since))

export const caseStudies = ledger.filter((s) => s.caseStudy)

export const counts = {
  total: systems.length,
  vps: systems.filter((s) => s.runtime === "vps").length,
  onPrem: systems.filter((s) => s.runtime === "on-prem").length,
  probeable: systems.filter((s) => s.url).length,
}

export function formatSince(since: string): string {
  const [year, month] = since.split("-")
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return `${months[Number(month) - 1]} ${year}`
}
