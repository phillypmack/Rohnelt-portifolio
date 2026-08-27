/**
 * A frota.
 *
 * Toda entrada aqui é software em produção. `vps` quer dizer que roda no
 * servidor 187.77.8.195 e você consegue abrir; `on-prem` quer dizer que roda
 * dentro da rede de um cliente e não pode ser linkado da internet pública.
 *
 * `since` é o mês em que o sistema entrou em produção e é a chave de ordenação
 * do ledger — a ordem carrega a cronologia real da frota.
 *
 * `repo` só é preenchido para repositórios genuinamente públicos. Linkar um
 * repo privado entregaria um 404 para quem visita.
 */

export type Runtime = "vps" | "on-prem"

export type Field =
  | "erp"
  | "industria"
  | "logistica"
  | "ia"
  | "produto"
  | "educacao"

export const fieldLabels: Record<Field, string> = {
  erp: "Integração ERP",
  industria: "Indústria",
  logistica: "Logística",
  ia: "IA",
  produto: "Produto",
  educacao: "Educação",
}

export type Fact = { label: string; value: string }

export type Screenshot = { src: string; caption: string }

export type System = {
  slug: string
  name: string
  /** Uma linha. Aparece na linha do ledger. */
  summary: string
  /** Um parágrafo. Aparece quando a linha é expandida. */
  detail: string
  runtime: Runtime
  /** Onde roda de verdade, em palavras simples. */
  host: string
  /** URL pública. Só existe quando o visitante consegue mesmo abrir. */
  url?: string
  /** Caminho que a sonda requisita. Padrão "/". */
  healthPath?: string
  /** AAAA-MM. */
  since: string
  stack: string[]
  fields: Field[]
  repo?: string
  facts?: Fact[]
  screenshots?: Screenshot[]
  /** Ganha um texto longo mais abaixo na página. */
  caseStudy?: boolean
}

/** Todos os screenshots foram capturados neste tamanho. */
export const PLATE_WIDTH = 1920
export const PLATE_HEIGHT = 1080

export const systems: System[] = [
  // ---------------------------------------------------------------- on-prem
  {
    slug: "wms",
    name: "WMS",
    summary:
      "Gestão de armazém sobre o estoque do ERP: endereçamento, movimentações, inventário",
    detail:
      "O ERP sabia quanto estoque existia, mas não onde. Isto acrescenta a camada que faltava: cada posição do armazém é um endereço, cada entrada e saída é registrada contra um deles, e o inventário pode ser feito e conciliado sem parar a operação. Lê produtos e saldos do Sankhya e mantém sua própria visão de localização.",
    runtime: "on-prem",
    host: "rede do cliente",
    since: "2025-09",
    stack: ["Flask", "Oracle", "Sankhya"],
    fields: ["logistica", "erp"],
    caseStudy: true,
    facts: [
      { label: "Produtos controlados", value: "1.432" },
      { label: "Endereços cadastrados", value: "502" },
      { label: "Unidades em estoque", value: "75.884" },
    ],
    screenshots: [
      { src: "/projects/wms-project/dashboard.png", caption: "O estoque de relance, conciliado contra o saldo do ERP a cada carregamento." },
      { src: "/projects/wms-project/enderecos.png", caption: "O esquema de endereçamento — a camada que o ERP não tinha." },
      { src: "/projects/wms-project/movimentacoes.png", caption: "Cada movimentação de entrada e saída, com autor e horário." },
      { src: "/projects/wms-project/inventario.png", caption: "Contagem sem parar a operação." },
    ],
  },
  {
    slug: "inplanta-sales",
    name: "InPlanta Sales",
    summary: "Venda em campo para a indústria, gravando o pedido direto no ERP",
    detail:
      "Os representantes anotavam pedidos no papel e passavam por telefone, o que significava redigitação, erro de transcrição e atraso até a produção saber de alguma coisa. Isto coloca catálogo, preço e estoque na mão do representante e grava o pedido no Sankhya no momento da venda.",
    runtime: "on-prem",
    host: "rede do cliente",
    since: "2025-10",
    stack: ["Next.js", "Oracle", "Sankhya"],
    fields: ["erp", "produto"],
  },
  {
    slug: "order-tracking",
    name: "Rastreio de Pedidos",
    summary: "Portal do cliente para status do pedido, alimentado por produção e expedição",
    detail:
      "Cliente ligando para perguntar onde está o pedido é custo de suporte e problema de confiança. Isto expõe o mesmo status que o PCP enxerga — produzido, embalado, expedido — numa página que o próprio cliente abre.",
    runtime: "on-prem",
    host: "rede do cliente",
    since: "2025-10",
    stack: ["Next.js", "Oracle", "Sankhya"],
    fields: ["erp", "logistica"],
  },
  {
    slug: "op-scheduler",
    name: "Programador de OPs",
    summary: "Transforma o plano de produção em ordens no ERP sem digitação manual",
    detail:
      "Fechado o plano, alguém tinha que abrir o ERP e digitar cada ordem de produção na mão — centenas delas, cada uma uma chance de errar quantidade ou molde. Isto lê o plano aprovado, cria as ordens direto no ERP e depois concilia o que criou com o que foi pedido.",
    runtime: "on-prem",
    host: "rede do cliente",
    since: "2026-03",
    stack: ["FastAPI", "Python", "Oracle", "Sankhya"],
    fields: ["industria", "erp"],
  },
  {
    slug: "production-intelligence",
    name: "Production Intelligence",
    summary:
      "Planejamento MRP/PCP: Gantt, ocupação de moldes, diagnóstico de atraso e um assistente que lê o plano ativo",
    detail:
      "Uma indústria de plásticos programava a injeção na mão, em planilhas refeitas toda semana a partir de um export do ERP. Isto planeja contra as restrições reais — disponibilidade de molde, capacidade de máquina, tempo de setup entre produtos, data prometida ao cliente —, desenha o resultado como Gantt e guarda histórico, para que um atraso seja explicado em vez de adivinhado.",
    runtime: "on-prem",
    host: "rede do cliente",
    since: "2026-03",
    stack: ["Next.js", "FastAPI", "Oracle", "Claude", "Gemini"],
    fields: ["industria", "erp", "ia"],
    caseStudy: true,
    facts: [
      { label: "Pedidos programados", value: "534" },
      { label: "Itens planejados", value: "18.686" },
      { label: "Taxa de ocupação", value: "97,0%" },
      { label: "Moldes ociosos", value: "1" },
      { label: "SKUs não planejados", value: "6.285" },
    ],
    screenshots: [
      { src: "/projects/production-intelligence-suite/graficos-gantt.png", caption: "A programação como Gantt. Cada pedido aparece duas vezes, rodada anterior contra a atual, para que uma data que andou fique visível sem precisar ler relatório." },
      { src: "/projects/production-intelligence-suite/ocupacao-moldes.png", caption: "Ocupação de moldes por máquina. O molde é o recurso escasso, então é esta a tela que decide o que dá para prometer." },
      { src: "/projects/production-intelligence-suite/assistente-ia.png", caption: "O assistente responde sobre o plano ativo e cita os pedidos por trás de cada recomendação." },
      { src: "/projects/production-intelligence-suite/pontos-atencao.png", caption: "Onde o plano vai doer: demanda não atendida, moldes ociosos, pedidos em risco." },
      { src: "/projects/production-intelligence-suite/visao-geral.png", caption: "A tela que o time de planejamento abre primeiro todo dia." },
    ],
  },
  {
    slug: "oracle-monitor",
    name: "Oracle Monitor",
    summary: "Saúde do banco ao vivo — waits, locks, deadlocks, redo, segmentos, sessões",
    detail:
      "Quando o ERP ficava lento, ninguém sabia dizer por quê, e a resposta quase sempre estava no banco que ninguém observava. Isto lê continuamente as views de performance do Oracle e coloca isso na frente de uma pessoa: o que está esperando, em quê e há quanto tempo. Deadlock e cadeia de lock viram alerta em vez de reclamação vinda do chão de fábrica.",
    runtime: "on-prem",
    host: "rede do cliente",
    since: "2026-04",
    stack: ["Flask", "Python", "Oracle"],
    fields: ["erp", "ia"],
    caseStudy: true,
    facts: [
      { label: "Waits de leitura sequencial", value: "162.555.016" },
      { label: "Contenção de lock por linha", value: "29.004" },
      { label: "Pior espera média", value: "7,86 s" },
      { label: "Log file sync médio", value: "21,1 ms" },
    ],
    screenshots: [
      { src: "/projects/oracle-monitor/dashboard.png", caption: "Sessões ativas ao longo de duas horas, com os eventos de espera por trás delas ranqueados logo abaixo." },
      { src: "/projects/oracle-monitor/sessoes-locks.png", caption: "Sessões e cadeias de lock — quem está travando quem, agora." },
      { src: "/projects/oracle-monitor/deadlocks.png", caption: "Deadlocks capturados e guardados, em vez de perdidos num trace." },
      { src: "/projects/oracle-monitor/performance-sql.png", caption: "As instruções que realmente custam tempo." },
      { src: "/projects/oracle-monitor/redo-logs.png", caption: "Vazão de redo e frequência de troca de log." },
    ],
  },
  {
    slug: "uptime-monitor",
    name: "Monitor de Uptime",
    summary:
      "Vigia os serviços internos e escala para o técnico de plantão até alguém ler",
    detail:
      "Alerta que ninguém lê não é alerta. Isto checa os serviços internos em intervalo fixo e, quando um para de responder, chama o técnico de plantão — e chama de novo, periodicamente, até a mensagem ser efetivamente visualizada. Para quem só precisa saber que o sistema caiu e que alguém já está nele, manda um aviso diferente, em outra linguagem.",
    runtime: "on-prem",
    host: "rede do cliente",
    since: "2026-04",
    stack: ["Node.js", "SQLite", "WhatsApp API"],
    fields: ["erp"],
    caseStudy: true,
    facts: [
      { label: "Intervalo de reenvio", value: "5 minutos" },
      { label: "Tentativas de escalação", value: "3, depois para" },
      { label: "Públicos", value: "Técnico e usuário, com textos distintos" },
    ],
    screenshots: [
      { src: "/projects/sankhya-uptime-monitor/dashboard.png", caption: "O que está de pé, o que não está, e há quanto tempo." },
      { src: "/projects/sankhya-uptime-monitor/alertas.png", caption: "Modelos de mensagem por público — o técnico recebe a causa, o usuário recebe a garantia de que já tem alguém cuidando." },
      { src: "/projects/sankhya-uptime-monitor/grupos-reacionamento.png", caption: "Grupos de escalação: quem é avisado, e em que ordem." },
    ],
  },
  {
    slug: "vasap-vision",
    name: "Vasap Vision",
    summary: "Inspeção visual na linha de produção",
    detail:
      "Detecta e classifica o produto que sai da linha a partir do vídeo de uma câmera, para que o defeito seja pego na máquina e não na expedição.",
    runtime: "on-prem",
    host: "rede do cliente",
    since: "2026-05",
    stack: ["Python", "YOLO", "ONNX Runtime", "OpenCV"],
    fields: ["industria", "ia"],
  },
  {
    slug: "transporta",
    name: "Transporta",
    summary: "Planejamento de frete e roteirização de entrega a partir da expedição",
    detail:
      "Pega o que a expedição já assumiu e transforma em cargas e rotas — quais pedidos viajam juntos, em qual veículo, em que ordem de entrega.",
    runtime: "on-prem",
    host: "rede do cliente",
    since: "2026-06",
    stack: ["Next.js", "PostgreSQL", "Sankhya"],
    fields: ["logistica", "erp"],
  },

  // -------------------------------------------------------------------- vps
  {
    slug: "hardskills-dtf",
    name: "HardSkills DTF",
    summary: "Encaixa artes em folhas prontas para impressão DTF e adesivo UV",
    detail:
      "Impressão de adesivo desperdiça filme sempre que a arte é distribuída no olho. Isto encaixa as artes enviadas dentro da folha automaticamente, respeitando sangria e margem de corte, e devolve um arquivo que a impressora roda direto.",
    runtime: "vps",
    host: "187.77.8.195",
    url: "https://hardskills.rohnelt.dev",
    since: "2025-11",
    stack: ["Vanilla JS", "Tailwind", "nginx"],
    fields: ["produto", "industria"],
    repo: "https://github.com/phillypmack/hardskills-dtf-generator",
  },
  {
    slug: "chaveirogo",
    name: "ChaveiroGO",
    summary: "Plataforma de despacho para chaveiros — posição ao vivo, oferta de chamado, app de campo",
    detail:
      "Quem ficou trancado para fora do carro ou de casa precisa do chaveiro mais próximo que esteja disponível, não de uma lista telefônica. Isto mantém a posição dos chaveiros no PostGIS, oferece o chamado aos mais próximos por socket e acompanha o atendimento aceito até o pagamento. São três frentes: o site do cliente, o app do chaveiro e o console do operador.",
    runtime: "vps",
    host: "187.77.8.195",
    url: "https://www.chaveirogo.com.br",
    since: "2025-12",
    stack: ["Fastify", "Next.js", "PostGIS", "Redis", "Socket.IO", "Turborepo"],
    fields: ["produto", "logistica"],
  },
  {
    slug: "pakgo",
    name: "Pakgo",
    summary: "Carregamento 3D de contêiner — encaixa a lista de pedidos e exporta o plano",
    detail:
      "Decidir o que cabe num contêiner é feito mal por intuição e bem por um algoritmo de empacotamento. Isto recebe a lista de itens e dimensões, empacota, mostra o resultado em 3D para uma pessoa conferir, e exporta um plano de carregamento que o armazém consegue seguir.",
    runtime: "vps",
    host: "187.77.8.195",
    url: "https://pakgo.com.br",
    since: "2026-02",
    stack: ["Next.js", "Prisma", "PostgreSQL", "three.js", "Stripe"],
    fields: ["logistica", "produto"],
  },
  {
    slug: "warzil",
    name: "WARZIL",
    summary: "Conquista de território em tempo real sobre o mapa real dos municípios brasileiros",
    detail:
      "Um jogo de conquista cujo tabuleiro é o país de verdade: cada município brasileiro é um território e as fronteiras oficiais do IBGE formam o grafo de adjacência. A simulação é contínua e autoritativa no servidor, não por turnos — uma partida dura horas ou dias, e quem decide o que aconteceu é o servidor, não o cliente.",
    runtime: "vps",
    host: "187.77.8.195",
    url: "https://warzil.com",
    since: "2026-06",
    stack: ["Turborepo", "Fastify", "PostGIS", "Redis", "MapLibre GL"],
    fields: ["produto"],
  },
  {
    slug: "quantical",
    name: "Quantical",
    summary:
      "Computação quântica em português, com um simulador de vetor de estado que roda no navegador",
    detail:
      "Material de computação quântica em português é escasso, e o que existe ou é aceno de mão ou é artigo de pesquisa. Isto ensina o assunto direito e deixa o leitor rodar os circuitos enquanto lê: o simulador está compilado dentro da página, então não há fila de backend nem nada para instalar. Sem conta e sem cadastro — o aluno é um identificador anônimo gerado no próprio aparelho.",
    runtime: "vps",
    host: "187.77.8.195",
    url: "https://quantical.com.br",
    since: "2026-07",
    stack: ["Next.js", "TypeScript", "export estático"],
    fields: ["educacao"],
    repo: "https://github.com/phillypmack/Quantical",
  },
  {
    slug: "chess2",
    name: "Chess2",
    summary: "Xadrez 2D e 3D com partida online, contas, Elo e loja de cosméticos",
    detail:
      "Jogue contra o computador, contra alguém na mesma sala ou online. O servidor cuida de pareamento, contas, ranking e loja; o tabuleiro renderiza em 2D ou 3D a partir do mesmo estado de jogo, e dá para alternar sem interromper a partida. Em português e inglês.",
    runtime: "vps",
    host: "187.77.8.195",
    url: "https://xadrez.pro",
    since: "2026-07",
    stack: ["Node.js", "WebSocket", "PostgreSQL", "three.js"],
    fields: ["produto"],
  },
  {
    slug: "xsafe",
    name: "XSafe",
    summary:
      "Puxa da SEFAZ todo documento fiscal emitido contra a empresa e guarda os cinco anos que a lei exige",
    detail:
      "Empresa brasileira precisa guardar documento fiscal por cinco anos, e a maioria descobre que falta um durante a fiscalização. O XSafe se autentica na SEFAZ com o certificado A1 da própria empresa, percorre o serviço oficial de distribuição em intervalo fixo e guarda cada documento cifrado sob uma chave envelopada. Foi validado de ponta a ponta contra um certificado ICP-Brasil e um CNPJ reais antes de entrar no ar.",
    runtime: "vps",
    host: "187.77.8.195",
    url: "https://xsafe.rohnelt.dev",
    since: "2026-08",
    stack: ["Next.js", "Drizzle", "PostgreSQL", "SOAP/mTLS", "Auth.js"],
    fields: ["produto", "erp"],
    facts: [
      { label: "Preço", value: "R$ 24,90 – R$ 99 / mês" },
      { label: "Cifragem", value: "AES-256-GCM envelopada" },
      { label: "Retenção", value: "5 anos" },
    ],
  },
  {
    slug: "veritas",
    name: "Veritas",
    summary:
      "Precifica, vende, cobra no cartão, persegue a cobrança que falhou e diagnostica os próprios defeitos, sozinho",
    detail:
      "Um experimento sobre quanto de um negócio de software dá para automatizar: ele precifica, vende, cobra no cartão, emite, tenta de novo quando a cobrança falha, roda os próprios canais de aquisição, checa a própria saúde e faz o próprio backup. É escrito só com a biblioteca padrão do Python — nenhum pacote de terceiros — e a suíte de testes roda inteiramente offline.",
    runtime: "vps",
    host: "187.77.8.195",
    url: "https://veritas.rohnelt.dev",
    since: "2026-08",
    stack: ["Python", "SQLite", "systemd"],
    fields: ["produto"],
    facts: [
      { label: "Pacotes de terceiros", value: "Nenhum" },
      { label: "Testes offline", value: "388" },
    ],
  },
  {
    slug: "aura",
    name: "Aura",
    summary: "Caixa de entrada e webhook permanentes para agentes de IA que morrem entre execuções",
    detail:
      "Um agente que encerra perde tudo: o endereço, a correspondência pendente, o que estava fazendo. O Aura dá a ele um e-mail e uma URL de webhook permanentes, que sobrevivem ao processo, mais memória durável onde estacionar o estado e retomar depois. Não tem conta nem cadastro — é pago por chamada em stablecoin, de máquina para máquina.",
    runtime: "vps",
    host: "187.77.8.195",
    url: "https://aura.rohnelt.dev",
    since: "2026-08",
    stack: ["TypeScript", "PostgreSQL", "pgvector", "MCP", "x402"],
    fields: ["ia", "produto"],
  },
  {
    slug: "kortex",
    name: "Kortex",
    summary:
      "Ranqueia serviços pagáveis por máquina pelo uptime medido e por pagamentos liquidados, não pelo que dizem de si",
    detail:
      "Os diretórios de serviços pagáveis por máquina listam o que cada um alega fazer. O Kortex responde a pergunta que importa: dos serviços que alegam fazer isto, quais de fato respondem, cobram corretamente e já foram pagos por carteiras que não são a deles próprios. Ele vende uma resposta, não um catálogo.",
    runtime: "vps",
    host: "187.77.8.195",
    url: "https://kortex.rohnelt.dev",
    since: "2026-08",
    stack: ["TypeScript", "PostgreSQL", "MCP", "x402"],
    fields: ["ia", "produto"],
    facts: [
      { label: "Liquidações medidas em 30 dias", value: "481.899" },
      { label: "Liquidação mediana", value: "US$ 0,002" },
      { label: "Serviços listados", value: "~13.500" },
    ],
  },
  {
    slug: "vortex",
    name: "Vortex",
    summary: "Responde se a loja consegue mesmo entregar naquele endereço, e quanto custa posto lá",
    detail:
      "Um agente comprando por alguém lê o preço, mas não consegue saber se aquilo chega até o comprador, nem quanto vai custar de verdade depois de frete, imposto e manuseio. O Vortex responde as duas coisas, por loja e por destino.",
    runtime: "vps",
    host: "187.77.8.195",
    url: "https://vortex.rohnelt.dev",
    since: "2026-08",
    stack: ["TypeScript", "PostgreSQL", "MCP", "x402"],
    fields: ["ia", "logistica"],
  },
  {
    slug: "precex",
    name: "Precex",
    summary:
      "Índice de preços de referência para compras públicas, com o relatório que a instrução normativa pede",
    detail:
      "Órgão público precisa justificar o preço que orça, contra fontes e pelo método que a norma determina. O Precex indexa preços unitários homologados a partir dos dados abertos de compras federais e gera o relatório no formato exigido. É construído estático primeiro: um worker escreve cada página de preço em disco e o nginx serve, então o caso comum não toca nem a aplicação nem o banco.",
    runtime: "vps",
    host: "187.77.8.195",
    url: "https://precex.com.br",
    since: "2026-08",
    stack: ["TypeScript", "PostgreSQL", "Redis", "Asaas", "nginx"],
    fields: ["produto"],
  },
  {
    slug: "sinal",
    name: "Sinal",
    summary:
      "Telemedicina para clínicas do interior: horário marcado, vídeo na própria plataforma, resumo que o médico assina",
    detail:
      "Feito para clínicas onde a alternativa é o paciente viajar horas. A agenda é de horário fixo, não fila; a consulta acontece dentro da plataforma em vez de num aplicativo de vídeo comum; e a transcrição vira um resumo que o médico revisa e assina — assim como a receita, com assinatura digital. O banco recusa consultas sobrepostas e não deixa nem o próprio log de auditoria ser editado.",
    runtime: "vps",
    host: "187.77.8.195",
    url: "https://sinal.rohnelt.dev",
    since: "2026-08",
    stack: ["Next.js", "LiveKit", "Whisper", "Drizzle", "PostgreSQL", "Anthropic"],
    fields: ["produto", "ia"],
    facts: [
      { label: "Log de auditoria", value: "Update e delete recusados no banco" },
      { label: "Consulta sobreposta", value: "Impedida por constraint, não por código" },
    ],
  },
  {
    slug: "java-trilha",
    name: "Java Trilha",
    summary:
      "Java do zero ao Spring Boot; cada exercício compila no próprio contêiner descartável",
    detail:
      "Uma trilha guiada, não uma videoteca: dezesseis unidades, 180 exercícios e prática que é conferida compilando e rodando de verdade. Cada envio ganha um contêiner JDK próprio, sem rede e com limite de CPU, memória e disco, então o código do aluno nunca roda dentro da API. O editor exige que o aluno digite em vez de aceitar um colar. A instância linkada aqui é o ambiente de homologação.",
    runtime: "vps",
    host: "187.77.8.195",
    url: "https://lab.rohnelt.dev",
    since: "2026-08",
    stack: ["React", "Spring Boot", "Docker", "CodeMirror"],
    fields: ["educacao"],
  },
]

/** Ordem do ledger: o mês em que cada sistema entrou em produção. */
export const ledger = [...systems].sort((a, b) => a.since.localeCompare(b.since))

export const caseStudies = ledger.filter((s) => s.caseStudy)

export const counts = {
  total: systems.length,
  vps: systems.filter((s) => s.runtime === "vps").length,
  onPrem: systems.filter((s) => s.runtime === "on-prem").length,
  probeable: systems.filter((s) => s.url).length,
}

const MONTHS_PT = [
  "jan", "fev", "mar", "abr", "mai", "jun",
  "jul", "ago", "set", "out", "nov", "dez",
]

export function formatSince(since: string): string {
  const [year, month] = since.split("-")
  return `${MONTHS_PT[Number(month) - 1]} ${year}`
}
