export type Category =
  | "all"
  | "sankhya"
  | "producao"
  | "wms"
  | "ia"
  | "produto"
  | "ar"
  | "iot"
  | "games"
  | "edu";

export type ProjectStatus =
  | "production"
  | "active"
  | "private"
  | "public"
  | "wip";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features?: string[];
  images?: string[];
  stack: string[];
  categories: Category[];
  status: ProjectStatus;
  badges: string[];
  github?: string;
  deploy?: string;
  featured: boolean;
  icon: string;
};

export const categories: { id: Category; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "sankhya", label: "Sankhya / ERP" },
  { id: "producao", label: "Produção / PCP" },
  { id: "wms", label: "WMS / Logística" },
  { id: "ia", label: "IA / LLM" },
  { id: "produto", label: "Produto / SaaS" },
  { id: "ar", label: "AR / 3D" },
  { id: "iot", label: "IoT / Mobile" },
  { id: "games", label: "Games" },
  { id: "edu", label: "Educação" },
];

export const projects: Project[] = [
  // --- COM PREVIEW (deploy) ---
  {
    slug: "warzil",
    name: "WARZIL",
    tagline:
      "Jogo multiplayer de conquista de território em tempo real sobre o mapa real dos municípios do Brasil.",
    description:
      "Jogo web (PWA) estilo WAR/Risk jogado sobre o grafo de adjacência real dos municípios do IBGE, com simulação contínua server-authoritative (sem tick). Motor determinístico de regras puras — renda por segundo, marcha por aresta, atrito, suprimento e respawn — validado por invariantes e harness headless. Escala horizontal com pool de workers de simulação (lease de escritor único + failover) e eleição de líder na API. Inclui port desktop para Windows/Steam via Electron + Steamworks.",
    features: [
      "Simulação contínua em tempo real server-authoritative, sem tick, com motor determinístico validado por invariantes",
      "Mapa real dos municípios do Brasil (grafo de adjacência do IBGE) renderizado com MapLibre GL",
      "Forças especializadas e ataques à distância: tanques, aviões, caças, morteiros, mísseis, ogivas nucleares e antiaérea",
      "Matchmaking FIFO com degradação suave, bots de treino solo, temporadas com rating Glicko-2 e leaderboards",
      "Estado vivo em Redis (ZSET, pub/sub, leases) e persistência PostgreSQL + PostGIS via Drizzle",
      "Port desktop Windows/Steam (Electron + Steamworks): overlay, rich presence, conquistas e Steam Cloud",
    ],
    stack: [
      "TypeScript",
      "React",
      "MapLibre GL",
      "Fastify",
      "PostgreSQL",
      "PostGIS",
      "Redis",
      "SSE",
      "Electron",
      "Steamworks",
    ],
    categories: ["games", "produto"],
    status: "active",
    badges: ["Live demo", "Multiplayer"],
    github: "https://github.com/phillypmack/WARZIL",
    deploy: "https://warzil.com",
    featured: true,
    icon: "swords",
  },
  {
    slug: "chaveirogo",
    name: "ChaveiroGO",
    tagline:
      "Marketplace estilo Uber que conecta clientes a chaveiros próximos em tempo real.",
    description:
      "Plataforma multi-app composta por uma webapp Next.js para clientes e uma PWA dedicada para o profissional chaveiro. Backend em Fastify com Prisma + PostgreSQL, cache em Redis e comunicação em tempo real via Socket.io. Monorepo organizado com Turborepo.",
    stack: [
      "Turborepo",
      "Fastify",
      "Next.js 14",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Redis",
      "Socket.io",
    ],
    categories: ["produto"],
    status: "wip",
    badges: ["Em desenvolvimento", "Privado"],
    github: "https://github.com/phillypmack/chaveirogo",
    deploy: "https://www.chaveirogo.com.br/",
    featured: true,
    icon: "key",
  },
  {
    slug: "cargo-optimizer",
    name: "Cargo Optimizer",
    tagline: "App de otimização de carga e empacotamento com IA (Gemini).",
    description:
      "Aplicação web que recebe dimensões e pesos de itens e calcula o melhor empacotamento para um caminhão/contêiner. Usa Google Gemini para a lógica de packing inteligente.",
    stack: ["TypeScript", "Node.js", "Express", "Gemini API"],
    categories: ["wms", "ia"],
    status: "public",
    badges: ["Live demo", "IA Powered"],
    github: "https://github.com/phillypmack/cargo-optimizer",
    deploy: "https://pakgo.com.br/",
    featured: true,
    icon: "package",
  },
  {
    slug: "colaai",
    name: "HardSkills DTF Generator",
    tagline: "Gerador web de adesivos DTF UV em alto relevo com logos de tecnologias.",
    description:
      "HardSkills gera SVGs profissionais em três camadas (CMYK, branco e verniz UV) prontos para impressão de adesivos DTF UV em alto relevo, com a logo da tecnologia/linguagem de programação escolhida pelo usuário.",
    stack: ["JavaScript", "HTML", "CSS", "SVG"],
    categories: ["produto"],
    status: "public",
    badges: ["Público"],
    github: "https://github.com/phillypmack/hardskills-dtf-generator",
    deploy: "https://hardskills.rohnelt.dev/",
    featured: false,
    icon: "sticker",
  },
  {
    slug: "pagina-rastreio",
    name: "Order Tracking Portal",
    tagline:
      "Portal de rastreamento de pedidos para clientes do InPLANTA, autenticação por CPF/CNPJ.",
    description:
      "Sistema standalone de rastreamento, dockerizado, com backend e frontend separados. Autenticação por CPF/CNPJ e consulta de status de pedidos integrada ao Sankhya.",
    stack: ["Python", "TypeScript", "Docker"],
    categories: ["sankhya", "produto"],
    status: "private",
    badges: ["Privado"],
    github: "https://github.com/phillypmack/order-tracking-portal",
    deploy: "https://rastreio.vasap.com.br/",
    featured: false,
    icon: "map-pin",
  },
  {
    slug: "vasap-ar",
    name: "VASAP AR",
    tagline: "Visualizador 3D/AR multiplataforma para produtos, sem backend.",
    description:
      "Visualizador de produtos em 3D e Realidade Aumentada que roda 100% no frontend. Recebe os produtos via parâmetros de URL ou JS externo e suporta WebXR (Android), Scene Viewer (Android) e Quick Look (iOS).",
    stack: ["HTML", "JavaScript", "WebXR"],
    categories: ["ar"],
    status: "public",
    badges: ["Live demo"],
    github: "https://github.com/phillypmack/vasap",
    deploy: "https://vasap.vercel.app",
    featured: false,
    icon: "box",
  },
  {
    slug: "vasap-contempo",
    name: "VASAP Contempo",
    tagline: "Visualizador 3D interativo de uma coleção de vasos com A-Frame e AR no iOS.",
    description:
      'Visualizador 3D da coleção "Vasap Contempo" feito com A-Frame (WebXR), animações, iluminação dinâmica e suporte a AR Quick Look no iOS.',
    stack: ["HTML", "A-Frame", "WebXR", "JavaScript"],
    categories: ["ar"],
    status: "public",
    badges: ["Live demo"],
    github: "https://github.com/phillypmack/vasap-contempo",
    deploy: "https://vasap-lancamento.vercel.app",
    featured: false,
    icon: "cube",
  },
  // --- COM IMAGENS E FEATURES ---
  {
    slug: "producao",
    name: "Production Intelligence Suite",
    tagline:
      "Plataforma de inteligência de planejamento e programação de produção integrada ao Sankhya.",
    description:
      "Suíte completa de PCP que centraliza planejamento, programação e análise de produção num único webapp. Integrada ao Oracle do Sankhya, gerencia desde a previsão de pedidos até a ocupação de moldes, com assistente de IA para análises avançadas. Utilizada diariamente por equipes de planejamento para gerar planos, monitorar pendências e otimizar a produção industrial.",
    features: [
      "Dashboard com KPIs de produção: total de pedidos, taxa de ocupação, atrasos e análise de atrasos por programação",
      "Criação de planejamentos com upload de arquivos (pedidos, planilha de itens, cadastro de moldes) e geração automática",
      "Planejamento automático com configuração de braços, rodadas e ações em lote (gerar, enviar ao Sankhya, criar OPs)",
      "Previsão de pedidos com tabela detalhada: status por cor, prazos, datas de produção e rastreamento por pedido",
      "Painel de pendências com 442+ pedidos monitorados, valor total (R$ 2.2M+) e filtros por status",
      "Mosaico de pedidos com visualização heatmap: verde (OK), vermelho (atrasado), filtros por valor, data e status",
      "Análise histórica de programações com download de relatórios e exclusão de registros",
      "Análises gráficas: evolução de quantidade programada por data, itens planejados e evolução por tipo",
      "Gráficos Gantt com ocupação de moldes por braço em rodadas e linha de tempo de produção por pedido",
      "Projeção de finalização: quantidade de pedidos finalizados/dia e itens planejados com curvas de tendência",
      "Análise de moldes com status de instalação, demanda total, quantidade planejada e dados de eficiência",
      "Ocupação de moldes com métricas: dias instalados, demanda, pendência, braços ocupados e barras de progresso",
      "Pontos de atenção: pedidos com necessidade não atendida, moldes ociosos e sugestões de otimização com IA",
      "Relatórios: produção detalhada exportável em CSV e análise de tendências com gráficos interativos",
      "Assistente PCP com IA: chat integrado para análise de alocação, estoque mínimo, projeção de entregas e diagnósticos",
    ],
    images: [
      "/projects/production-intelligence-suite/visao-geral.png",
      "/projects/production-intelligence-suite/novo-planejamento.png",
      "/projects/production-intelligence-suite/planejamento-automatico.png",
      "/projects/production-intelligence-suite/previsao-pedidos.png",
      "/projects/production-intelligence-suite/painel-pendencias.png",
      "/projects/production-intelligence-suite/mosaico-pedidos.png",
      "/projects/production-intelligence-suite/analise-historica.png",
      "/projects/production-intelligence-suite/analises-graficas.png",
      "/projects/production-intelligence-suite/graficos-gantt.png",
      "/projects/production-intelligence-suite/projecao-finalizacao.png",
      "/projects/production-intelligence-suite/analise-moldes.png",
      "/projects/production-intelligence-suite/ocupacao-moldes.png",
      "/projects/production-intelligence-suite/ocupacao-moldes-2.png",
      "/projects/production-intelligence-suite/pontos-atencao.png",
      "/projects/production-intelligence-suite/pontos-atencao-2.png",
      "/projects/production-intelligence-suite/relatorios.png",
      "/projects/production-intelligence-suite/assistente-ia.png",
    ],
    stack: ["Python", "Flask", "JavaScript", "Oracle", "Docker"],
    categories: ["producao", "sankhya"],
    status: "production",
    badges: ["Em produção", "Privado", "IA Powered"],
    github: "https://github.com/phillypmack/production-intelligence-suite",
    featured: true,
    icon: "factory",
  },
  {
    slug: "wms-project",
    name: "WMS Project",
    tagline:
      "Sistema WMS completo para alocação e realocação de produtos entre endereços de estoque, integrado ao Oracle do Sankhya.",
    description:
      "Webapp responsivo (mobile-first) para operadores de almoxarifado gerenciarem o posicionamento físico de produtos. Lê e escreve diretamente no Oracle do Sankhya, mantém um cache local em SQLite e oferece interface React + shadcn/ui otimizada para coletores e tablets. Gerencia 1.400+ produtos e 500+ endereços com rastreabilidade completa de movimentações.",
    features: [
      "Dashboard com KPIs em tempo real: produtos Sankhya, unidades em estoque, endereços cadastrados e movimentações recentes",
      "Catálogo de produtos com busca por descrição, referência ou código, filtro por grupo e visualização em grid ou lista",
      "Gestão de endereços de estoque com mapeamento físico (ex: A-1-3), quantidade alocada e controle de ocupação",
      "Movimentações com 3 operações: Alocar (entrada inicial), Realocar (mover entre endereços) e Remover (saída/baixa)",
      "Histórico completo de movimentações com filtros por produto, endereço e tipo, além de exportação CSV e opção de desfazer",
      "Consulta inteligente de estoque com comparativo WMS vs Sankhya e histórico de transferências do último mês",
      "Módulo de inventário com suporte a 3 contagens, busca por código EAN/referência e leitura via câmera do dispositivo",
      "Controle de acesso com autenticação por usuário e perfis de administrador",
    ],
    images: [
      "/projects/wms-project/dashboard.png",
      "/projects/wms-project/produtos.png",
      "/projects/wms-project/enderecos.png",
      "/projects/wms-project/movimentacoes.png",
      "/projects/wms-project/historico.png",
      "/projects/wms-project/consulta.png",
      "/projects/wms-project/inventario.png",
    ],
    stack: ["Flask", "React", "Vite", "Tailwind", "shadcn/ui", "Oracle", "SQLite"],
    categories: ["wms", "sankhya"],
    status: "active",
    badges: ["Privado", "Ativo"],
    github: "https://github.com/phillypmack/wms_project",
    featured: false,
    icon: "warehouse",
  },
  {
    slug: "programador",
    name: "Sankhya OP Scheduler",
    tagline:
      "Webapp para criar e gerenciar Ordens de Produção e Rodadas de lote no Sankhya.",
    description:
      "Sistema de programação fina de produção. Permite criar OPs em massa, gerenciar Rodadas (agrupamento de lotes do sistema Vasap) e expõe API REST para que módulos externos em Java possam duplicar rodadas e sincronizar dados.",
    stack: ["FastAPI", "Python", "Vanilla JS", "Nginx", "Docker"],
    categories: ["producao", "sankhya"],
    status: "production",
    badges: ["Em produção", "Privado"],
    github: "https://github.com/phillypmack/sankhya-op-scheduler",
    featured: false,
    icon: "calendar-clock",
  },
  {
    slug: "oracle-monitor",
    name: "Oracle Database Monitor",
    tagline:
      "Painel inteligente de monitoramento em tempo real de bancos Oracle com assistente de IA integrado.",
    description:
      "Plataforma completa de monitoramento que coleta métricas de performance, sessões, tablespaces, locks, redo logs e system stats de bancos Oracle, apresentando tudo em dashboards interativos com gráficos históricos via Recharts e atualização em tempo real via WebSocket. Inclui assistente de IA (Claude) para análise de métricas e recomendações. Opera em modo somente leitura com connection pool limitado para zero impacto no banco monitorado.",
    features: [
      "Dashboard principal com indicadores-chave: sessões ativas, CPU, memória SGA/PGA, tablespaces críticos e alertas recentes",
      "Monitoramento de sessões: ativas, inativas e em espera, com identificação de consumo de recursos e SQL em execução",
      "Performance SQL: top queries por tempo de execução, buffer gets e disk reads com texto SQL completo",
      "Tablespaces: uso de espaço por tablespace com gráficos de pizza/barras e alertas automáticos por threshold",
      "Detecção de locks e deadlocks em tempo real com árvore de dependência bloqueador/bloqueado",
      "Redo Logs: monitoramento de log switches, frequência de arquivamento e uso da FRA",
      "System Stats: wait events, I/O por datafile e hit ratios de cache (buffer, library, dictionary)",
      "Sistema de alertas com 4 níveis (Info, Atenção, Crítico, Catástrofe), histórico e integração webhook",
      "Assistente de IA com Claude: análise de métricas, sugestões corretivas, explicação de wait events e recomendações de tuning",
      "Atualização em tempo real via WebSocket e gráficos históricos com Recharts",
    ],
    stack: ["React", "TypeScript", "Tailwind", "Recharts", "Node.js", "Express", "Oracle", "Claude API", "Docker"],
    categories: ["sankhya", "ia"],
    status: "production",
    badges: ["Em produção", "Privado", "IA Powered"],
    images: [
      "/projects/oracle-monitor/dashboard.png",
      "/projects/oracle-monitor/redo-logs.png",
      "/projects/oracle-monitor/redo-logs-2.png",
      "/projects/oracle-monitor/sessoes-locks.png",
      "/projects/oracle-monitor/deadlocks.png",
      "/projects/oracle-monitor/performance-sql.png",
      "/projects/oracle-monitor/segmentos.png",
      "/projects/oracle-monitor/memoria.png",
      "/projects/oracle-monitor/jobs.png",
      "/projects/oracle-monitor/usuarios.png",
      "/projects/oracle-monitor/alertas-ia.png",
    ],
    github: "https://github.com/phillypmack/oracle-monitor",
    featured: true,
    icon: "activity",
  },
  // --- SEM PREVIEW NEM IMAGENS ---
  {
    slug: "oraculo",
    name: "Oráculo Sankhya",
    tagline:
      "Chatbot BI que converte perguntas em português em SQL contra o Oracle do Sankhya, usando Claude (Anthropic).",
    description:
      '"Oráculo Sankhya" é uma plataforma conversacional de Business Intelligence. O usuário faz uma pergunta em linguagem natural ("quanto vendi de cada produto este mês?") e o sistema usa o Claude (Anthropic) para gerar a query SQL apropriada contra o banco Oracle do Sankhya 4.35, executa, e devolve a resposta interpretada em texto natural. Permite que usuários de negócio explorem dados sem saber SQL.',
    stack: ["Next.js 14", "TypeScript", "Oracle", "Claude API", "Docker"],
    categories: ["ia", "sankhya"],
    status: "production",
    badges: ["Em produção", "Privado", "IA Powered"],
    github: "https://github.com/phillypmack/oraculo-sankhya",
    featured: true,
    icon: "brain",
  },
  {
    slug: "iaprod",
    name: "Production BI Dashboard",
    tagline:
      "Dashboard analítico de produção em Streamlit conectado ao Oracle Sankhya.",
    description:
      "Painel de BI feito em Streamlit, com módulos de análise (analysis.py), carregamento de dados (data_loader.py) e conexão Oracle (db_connector.py). Apresenta indicadores de produção, perdas, eficiência e tendências para o time de PCP.",
    stack: ["Python", "Streamlit", "Pandas", "Plotly", "Oracle", "Docker"],
    categories: ["producao", "ia", "sankhya"],
    status: "active",
    badges: ["Privado", "Ativo", "IA Powered"],
    github: "https://github.com/phillypmack/production-bi-dashboard",
    featured: false,
    icon: "bar-chart-3",
  },
  {
    slug: "inplanta",
    name: "InPlanta Sales",
    tagline:
      "Força de vendas mobile-first para implantar pedidos diretamente no Sankhya.",
    description:
      "Webapp mobile-first para vendedores externos. Catálogo de produtos, carrinho, criação e envio de pedidos com sincronização ao Sankhya. UI moderna com shadcn/ui e estado gerenciado via Zustand.",
    stack: ["Node.js", "Express", "React 18", "Vite", "Tailwind", "shadcn/ui", "Zustand"],
    categories: ["sankhya", "produto"],
    status: "private",
    badges: ["Privado"],
    github: "https://github.com/phillypmack/inplanta-sales",
    featured: true,
    icon: "shopping-cart",
  },
  {
    slug: "leadera",
    name: "LeadEra",
    tagline:
      "Prospecção automatizada com agentes de IA multi-provider que conversam com leads via WhatsApp.",
    description:
      "LeadEra extrai leads do Google Maps, permite criar agentes de IA com personas configuráveis usando múltiplos provedores (Gemini, OpenAI, Anthropic, DeepSeek e Mistral) e dispara conversas via WhatsApp para qualificar MQLs e SQLs automaticamente.",
    stack: ["Node.js", "Express", "MongoDB", "Socket.IO", "whatsapp-web.js", "Tailwind"],
    categories: ["ia", "produto"],
    status: "private",
    badges: ["Privado", "IA Powered"],
    github: "https://github.com/phillypmack/leadera",
    featured: true,
    icon: "bot",
  },
  {
    slug: "onlyinvest",
    name: "OnlyInvest",
    tagline:
      "Plataforma fintech full-stack com cotações em tempo real, análise técnica e fundamentalista.",
    description:
      "Plataforma web de gestão de investimentos com cotações em tempo real via WebSocket (Binance, Finnhub), indicadores técnicos (RSI, MACD, Médias Móveis), métricas fundamentalistas (P/L, P/VP, DY, ROE), alertas inteligentes e suporte a ações BR/US, criptomoedas, FIIs e renda fixa.",
    stack: ["Next.js", "TypeScript", "Tailwind", "SQLite", "WebSockets", "Recharts"],
    categories: ["produto"],
    status: "private",
    badges: ["Privado"],
    github: "https://github.com/phillypmack/OnlyInvest",
    featured: false,
    icon: "trending-up",
  },
  {
    slug: "plante",
    name: "Plante IoT",
    tagline:
      "App mobile que monitora plantas via sensores Bluetooth (umidade, temperatura, luminosidade).",
    description:
      "Aplicativo React Native + módulo nativo Kotlin para conectar a sensores Bluetooth 4.1 que medem umidade, temperatura, luminosidade e condutividade do solo. Histórico, alertas e sincronização cloud com backend Node.js + Sequelize.",
    stack: ["React Native", "TypeScript", "Redux", "Kotlin", "Node.js", "Express", "Sequelize"],
    categories: ["iot"],
    status: "private",
    badges: ["Privado"],
    github: "https://github.com/phillypmack/plante-iot",
    featured: false,
    icon: "leaf",
  },
  {
    slug: "vasap-garden",
    name: "VASAP Garden",
    tagline: "Assistente de cuidados com plantas com identificação por IA via PlantNet.",
    description:
      "Webapp para identificar plantas por foto (PlantNet API), diagnosticar doenças, configurar lembretes de rega/adubação e consultar guia de cuidados.",
    stack: ["JavaScript", "HTML", "CSS", "PlantNet API"],
    categories: ["ia", "produto"],
    status: "private",
    badges: ["Privado", "IA Powered"],
    github: "https://github.com/phillypmack/vasap-garden",
    featured: false,
    icon: "flower-2",
  },
  {
    slug: "down-notify",
    name: "Sankhya Uptime Monitor",
    tagline: "Monitor de disponibilidade do ERP Sankhya com alertas via WhatsApp.",
    description:
      "Plataforma de monitoramento que verifica a saúde do Sankhya em três camadas: aplicação on-premise (HTTP check), login Cloud API e banco Oracle. Dispara alertas instantâneos via WhatsApp para grupos configuráveis com sistema de reacionamento escalonado e mensagens customizáveis por tipo de evento.",
    features: [
      "Dashboard com status em tempo real de 3 serviços: Aplicação Sankhya, Login Cloud e Banco de Dados Oracle com tempo de resposta",
      "Histórico de eventos com log completo de verificações, status (online/offline) e latência por serviço",
      "Configuração de conexão WhatsApp via QR Code com status de conexão visível",
      "Monitoramento configurável: intervalo de verificação em minutos, tentativas antes de alertar e URLs dos endpoints",
      "Configuração de Sankhya Cloud API (login), Oracle Database (host, porta, service name) e HTTP check com timeout",
      "Gestão de grupos WhatsApp com toggle por grupo para receber ou não alertas",
      "Reacionamento escalonado: ativação, intervalo entre reenvios e número máximo de tentativas com mensagens de escalação",
      "Mensagens de alerta personalizáveis: templates diferentes para queda, restauração, manutenção e reacionamento",
    ],
    images: [
      "/projects/sankhya-uptime-monitor/dashboard.png",
      "/projects/sankhya-uptime-monitor/configuracoes.png",
      "/projects/sankhya-uptime-monitor/conexoes.png",
      "/projects/sankhya-uptime-monitor/grupos-reacionamento.png",
      "/projects/sankhya-uptime-monitor/alertas.png",
    ],
    stack: ["Node.js", "Express", "Oracle", "Evolution API", "Docker"],
    categories: ["sankhya"],
    status: "wip",
    badges: ["Em desenvolvimento", "Privado"],
    github: "https://github.com/phillypmack/sankhya-uptime-monitor",
    featured: false,
    icon: "bell-ring",
  },
  {
    slug: "auto-programacao",
    name: "Sankhya OP Automator",
    tagline:
      "Robô que cria Ordens de Produção em lote no Sankhya a partir de planejamentos no Oracle.",
    description:
      "Lê a tabela AD_PLAN do Oracle, processa cada linha como uma OP a ser criada e dispara as APIs do Sankhya para criação em lote, com logs e relatórios detalhados.",
    stack: ["Python", "Flask", "Oracle", "Docker"],
    categories: ["producao", "sankhya"],
    status: "private",
    badges: ["Privado"],
    github: "https://github.com/phillypmack/sankhya-op-automator",
    featured: false,
    icon: "cog",
  },
  {
    slug: "pulsar",
    name: "Pulsar (Clareza)",
    tagline:
      'Plataforma de gestão de trabalho inspirada no Asana, com modelagem em "grafo de trabalho".',
    description:
      "Clone conceitual do Asana com workspaces, projetos, tarefas, autenticação JWT e modelagem das relações como um grafo. Backend em Flask + SQLAlchemy, frontend React + TypeScript.",
    stack: ["Flask", "SQLAlchemy", "React", "TypeScript", "Go", "Python"],
    categories: ["produto"],
    status: "public",
    badges: ["Público"],
    github: "https://github.com/phillypmack/pulsar",
    featured: false,
    icon: "layout-dashboard",
  },
  {
    slug: "migrar-dados",
    name: "Windows Profile Migrator",
    tagline:
      "Utilitário desktop com GUI Tkinter para migrar dados entre perfis de usuário do Windows.",
    description:
      "Ferramenta desktop em Python com interface Tkinter que migra arquivos entre perfis de usuário do Windows com segurança — ignora arquivos críticos e impede execução no usuário logado.",
    stack: ["Python", "Tkinter"],
    categories: ["produto"],
    status: "public",
    badges: ["Público"],
    github: "https://github.com/phillypmack/windows-profile-migrator",
    featured: false,
    icon: "folder-sync",
  },
  // --- LOGÍSTICA / TMS ---
  {
    slug: "transporta",
    name: "Transporta",
    tagline:
      "TMS de gestão e auditoria de fretes integrado ao Sankhya: cota transportadoras, grava a escolha no pedido e concilia cotado × cobrado via CT-e.",
    description:
      "Sistema de gestão de transporte (TMS) que faz cotação paralela em múltiplas transportadoras (APIs Jamef e Rodonaves + tabelas de frete genéricas), congela a escolhida em snapshot, grava transportadora e valor do frete de volta no pedido do Sankhya (CODPARCTRANSP + VLRFRETE) e audita o CT-e cobrado contra o cotado, com badges de divergência e export CSV. Telas de Pedidos, Cotação, Auditoria, Tabelas de Frete (faixas CEP × peso, GRIS, pedágio, cubagem) e dashboard de KPIs, com credenciais de transportadoras criptografadas.",
    stack: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "React", "Vite", "Docker"],
    categories: ["sankhya", "wms"],
    status: "wip",
    badges: ["Em desenvolvimento", "Privado"],
    github: "https://github.com/phillypmack/transporta",
    featured: true,
    icon: "truck",
  },
  {
    slug: "container-loader",
    name: "Container Loader 3D",
    tagline:
      "SaaS de planejamento de carga com visualização 3D do contêiner e algoritmo de packing em worker.",
    description:
      "Aplicação SaaS que calcula e exibe o carregamento de contêineres em 3D (three.js / react-three-fiber), com algoritmo de bin-packing executado em worker, autenticação, assinaturas via Stripe e exportação do plano de carga em PDF.",
    stack: ["Next.js 16", "React 19", "three.js", "Prisma", "PostgreSQL", "Stripe", "Redis"],
    categories: ["wms", "ar", "produto"],
    status: "wip",
    badges: ["Em desenvolvimento", "Privado"],
    featured: false,
    icon: "container",
  },
  {
    slug: "cargo-optimizer-v2",
    name: "Cargo Optimizer Engine v2",
    tagline:
      "Solver determinístico de bin-packing 3D que posiciona caixas e cilindros respeitando gravidade, fragilidade e empilhamento.",
    description:
      "Motor de empacotamento 3D em TypeScript puro, sem dependências de runtime: algoritmo extreme-point greedy com scoring multi-rotação e poda espacial por índice ordenado, modo multi-pass com N ordenações de prioridade e determinismo total (sem RNG). Validador independente checa 9 restrições físicas (gravidade, fragilidade, empilhamento, peso, rotações), com CLI, suíte de benchmarks e testes de regressão. Sucessor determinístico do Cargo Optimizer original baseado em IA.",
    stack: ["TypeScript", "Node.js"],
    categories: ["wms"],
    status: "wip",
    badges: ["Em desenvolvimento"],
    featured: false,
    icon: "package-check",
  },
  // --- SANKHYA / VASAP ---
  {
    slug: "vasap-vision",
    name: "Vasap Vision",
    tagline:
      "Visão computacional industrial: OEE de rotomoldagem por câmeras IP e auditoria de transferências em esteira com YOLO/ONNX.",
    description:
      "Plataforma de visão computacional com dois subsistemas: monitoramento OEE de máquinas de rotomoldagem em tempo real via câmeras IP (captura RTSP multi-thread, inferência ONNX, smoothing temporal por state machine) e esteira de transferências integrada ao sistema de apontamento — captura por bipagem, revisão humana OK/divergente e montagem de dataset rotulado para futura detecção automática de divergências. Integração com Oracle/Sankhya com fila offline SQLite, editor de ROI no frontend, alertas via WhatsApp (Evolution API) e deploy com systemd/nginx.",
    stack: ["Python", "FastAPI", "ONNX Runtime", "YOLO", "OpenCV", "React", "TypeScript", "Oracle", "SQLite"],
    categories: ["ia", "producao"],
    status: "wip",
    badges: ["Em desenvolvimento", "Privado", "IA Powered"],
    github: "https://github.com/phillypmack/vasap-vision",
    featured: true,
    icon: "scan-eye",
  },
  {
    slug: "hub-ml",
    name: "HUB ML",
    tagline:
      "Hub de integração bidirecional entre o Mercado Livre e o ERP Sankhya: pedidos entram, faturamento e despacho voltam.",
    description:
      "Middleware que recebe webhooks orders_v2 do Mercado Livre, enfileira o processamento em BullMQ e cria o pedido no Sankhya via CACSP.incluirNota com controle de idempotência e mapeamento SKU → CODPROD. No sentido inverso, um polling detecta a NF-e emitida (CHAVENFE na TGFCAB) e notifica o despacho de volta ao Mercado Livre. Trata cancelamentos e mantém tabelas de controle no Oracle.",
    stack: ["Node.js", "TypeScript", "Express", "BullMQ", "Redis", "Oracle"],
    categories: ["sankhya", "produto"],
    status: "wip",
    badges: ["Em desenvolvimento", "Privado"],
    featured: false,
    icon: "store",
  },
  {
    slug: "confere",
    name: "Confere",
    tagline:
      "App WMS mobile com os 5 fluxos de expedição: separação, conferência, embalagem, packing e expedição.",
    description:
      "Webapp mobile que implementa os cinco fluxos de expedição de um WMS — separação, conferência, embalagem, packing e expedição/ordens de carga — com scanner de código de barras via câmera (ZXing), autenticação via Sankhya MobileLoginSP e backend FastAPI. Reutiliza o design system industrial dos sistemas Vasap.",
    stack: ["Python", "FastAPI", "JavaScript", "ZXing", "Docker", "Nginx"],
    categories: ["wms", "sankhya"],
    status: "wip",
    badges: ["Em desenvolvimento", "Privado"],
    github: "https://github.com/phillypmack/confere",
    featured: false,
    icon: "scan-barcode",
  },
  {
    slug: "conselho-vasap",
    name: "Conselho Vasap",
    tagline:
      "Conselho multi-agente de LLMs com personas de objetivos conflitantes que debatem diagnósticos do processo produtivo.",
    description:
      "Ferramenta que coleta snapshots read-only do processo produtivo (Oracle via gateway, SQLite, Postgres) e orquestra um \"conselho\" de personas de IA definidas em YAML — cada uma com objetivos conflitantes — num debate multi-rodada serializável, produzindo diagnóstico acionável e baseado em evidência sobre atrasos na liberação de pedidos, com relatório final em Markdown/JSON e citações à base de conhecimento.",
    stack: ["Python", "Anthropic SDK", "Ollama", "Typer", "Streamlit", "PostgreSQL"],
    categories: ["ia", "producao"],
    status: "active",
    badges: ["Privado", "IA Powered"],
    featured: false,
    icon: "users",
  },
  {
    slug: "vasap-bi-dashboards",
    name: "Vasap BI Dashboards",
    tagline:
      "Suíte de geradores Python de dashboards HTML5 auto-contidos para o Construtor de Painéis do Sankhya.",
    description:
      "Cerca de 10 geradores que consultam o Oracle do Sankhya e produzem dashboards HTML/Chart.js auto-contidos, empacotados em .zip prontos para upload no Construtor de Painéis: representatividade do faturamento (pivot produto × mês com curva ABC/Pareto, heatmap, Top-N e export CSV), carteira, custo, custo produzido, balanço de estoque, resultado contábil, produção por grupo, rastreabilidade e transferências. Modo dual: snapshot local no navegador ou consulta ao vivo via DbExplorerSP dentro do próprio Sankhya.",
    stack: ["Python", "Oracle", "Chart.js", "HTML5"],
    categories: ["sankhya"],
    status: "production",
    badges: ["Em produção", "Privado"],
    featured: false,
    icon: "pie-chart",
  },
  {
    slug: "sankhya-log-forensics",
    name: "Sankhya Log Forensics",
    tagline:
      "Kit de análise forense que transforma gigabytes de server.log do Sankhya em diagnósticos acionáveis.",
    description:
      "Metodologia em 7 fases — reconhecimento, triagem por severidade, top N de exceções e erros ORA-, distribuição temporal, agrupamento por procedure, detecção de retry storms e separação sinal × ruído — automatizada em Python para analisar logs de múltiplos gigabytes do JBoss/WildFly do Sankhya. Descarta ruído conhecido do ERP e gera relatórios diários e de tendência em Markdown, HTML e PDF, com histórico de diagnósticos versionado por data.",
    stack: ["Python", "Oracle", "JBoss/WildFly"],
    categories: ["sankhya"],
    status: "active",
    badges: ["Privado", "Ativo"],
    featured: false,
    icon: "file-search",
  },
  {
    slug: "vasap-ai-mailguard",
    name: "Vasap AI MailGuard",
    tagline:
      "Camada de IA sobre o IMAP corporativo que detecta phishing, BEC e fraudes brasileiras com LLM.",
    description:
      "Serviço que monitora caixas de e-mail via IMAP e classifica mensagens com LLM em português, focado em fraudes brasileiras: boleto adulterado, falsa cobrança fiscal e impersonação de diretoria (BEC). Poller com prefiltro, execução de ações (mover/marcar), emissão de IOCs, alertas em tempo real via WhatsApp (Evolution API), loop de feedback/aprendizado e dashboard web de triagem multi-caixa. Opera em modo shadow por padrão, complementando o antispam existente.",
    stack: ["Node.js", "IMAP", "OpenAI API", "MySQL", "Express", "Evolution API"],
    categories: ["ia"],
    status: "wip",
    badges: ["Em desenvolvimento", "Privado", "IA Powered"],
    featured: false,
    icon: "mail-warning",
  },
  // --- PRODUTO / SAAS ---
  {
    slug: "sintese-fintech",
    name: "Síntese Fintech",
    tagline:
      "Plataforma B2B de contas a pagar com máquina de estados de pagamentos, filas e conciliação automática.",
    description:
      "Aplicação web B2B de contas a pagar operando em modo sandbox/simulação: máquina de estados declarativa de pagamentos com auditoria imutável na mesma transação e idempotência, filas BullMQ encadeadas (envio → retorno → conciliação/baixa) e arquitetura de portas/adaptadores para plugar ERPs e provedores de pagamento. Inclui base de conhecimento RAG da Central de Ajuda Sankhya consultável por CLI com baixo consumo de tokens.",
    stack: ["Node.js", "Express", "TypeScript", "Prisma", "PostgreSQL", "BullMQ", "Redis", "React 19", "Vite"],
    categories: ["produto", "sankhya"],
    status: "wip",
    badges: ["Em desenvolvimento", "Privado"],
    github: "https://github.com/phillypmack/sintese-fintech",
    featured: true,
    icon: "banknote",
  },
  {
    slug: "devstickers",
    name: "DevStickers",
    tagline:
      "Loja de adesivos DTF-UV para devs com automação de produção por gang sheet contínuo.",
    description:
      "E-commerce de adesivos DTF-UV em que o cliente escolhe entre 800+ ícones de tecnologias ou envia a própria arte, vê o adesivo em tamanho real sobre um notebook de 16\" e, ao pagar (Mercado Pago/PIX), o pedido entra num bin-packing automático de folhas A4/A3 — quando a folha enche, ela é fechada e enviada à gráfica com QR e número do pedido ao lado de cada grupo. O motor dtf-engine (cores, sanitização SVG, packing e render da gang sheet) é compartilhado entre o preview do cliente e a geração do arquivo de impressão, com testes golden-file. Evolução comercial do HardSkills DTF Generator.",
    stack: ["Node.js", "Express", "Prisma", "PostgreSQL", "React", "Vite", "Tailwind", "Mercado Pago"],
    categories: ["produto"],
    status: "wip",
    badges: ["Em desenvolvimento"],
    featured: false,
    icon: "shopping-bag",
  },
  {
    slug: "dona-lia-estoque",
    name: "Dona Lia Estoque",
    tagline:
      "Controle de estoque para indústria de alimentos: produtos, contagens por endereço, entradas e saídas.",
    description:
      "Sistema web de controle de estoque desenvolvido para a Dona Lia Salgados: cadastro de produtos, categorias, unidades e equivalências, fornecedores, endereços de armazenagem, fluxo de contagens por endereço e movimentações de entrada/saída, com autenticação NextAuth/JWT e deploy dockerizado.",
    stack: ["Next.js 14", "TypeScript", "Prisma", "NextAuth", "Tailwind", "Zod", "Docker"],
    categories: ["wms", "produto"],
    status: "private",
    badges: ["Privado"],
    github: "https://github.com/phillypmack/dona-lia-estoque",
    featured: false,
    icon: "clipboard-list",
  },
  {
    slug: "baseline-tennis",
    name: "Baseline",
    tagline:
      "Analytics de tênis ATP/WTA com ~361 mil partidas desde 1968: Elo por superfície, head-to-head e rankings.",
    description:
      "Plataforma full-stack de análise de tênis sobre os datasets históricos de Jeff Sackmann (1968→2026): dashboard do arquivo, leaderboard de Elo por superfície, perfis de jogador com trajetória de Elo, histórico de ranking e radar de superfície, head-to-head de carreira e módulo live via WebSocket com probabilidade de vitória por Elo. Pipeline de ingestão em Python/pandas com ~5,5 milhões de linhas de ranking e migrações Alembic.",
    stack: ["Next.js 14", "React", "Recharts", "FastAPI", "PostgreSQL", "Python", "Docker"],
    categories: ["produto"],
    status: "private",
    badges: ["Privado"],
    github: "https://github.com/phillypmack/baseline-tennis",
    featured: false,
    icon: "trophy",
  },
  {
    slug: "price-monitor",
    name: "Monitor de Preços",
    tagline:
      "PWA que monitora todos os produtos de uma loja e avisa por push quando há desconto real contra o histórico.",
    description:
      "Monitora o catálogo inteiro de uma loja (descoberta via sitemap/robots.txt confirmada por schema.org/Product), extrai preços em cascata (JSON-LD → microdata → OpenGraph → CSS) sem navegador headless, mantém histórico próprio e dispara Web Push quando o preço cai de verdade — comparando com mediana, média e mínimo histórico, e não com o preço \"riscado\" da loja. Agendamento educado com rate-limit por domínio, ETag/If-Modified-Since, jitter e backoff exponencial.",
    stack: ["Python", "FastAPI", "SQLAlchemy", "APScheduler", "Web Push", "SQLite", "Docker"],
    categories: ["produto"],
    status: "wip",
    badges: ["Em desenvolvimento"],
    featured: false,
    icon: "tag",
  },
  {
    slug: "tether",
    name: "Tether",
    tagline:
      "Controle sessões tmux pelo celular: PWA com terminal xterm.js publicada por túnel Cloudflare efêmero.",
    description:
      "CLI/daemon que expõe uma sessão tmux numa PWA mobile protegida por senha, publicada via Cloudflare Tunnel efêmero com TTL configurável. Captura todos os panes via tmux pipe-pane, WebSocket multiplexado por pane com replay buffer, autenticação em três camadas (token de URL + senha bcrypt + cookie JWT httpOnly), teclas especiais no mobile e audit log JSONL. Ideal para acompanhar agentes de IA rodando no desktop a partir do celular.",
    stack: ["Node.js", "Express", "WebSocket", "xterm.js", "tmux", "Cloudflare Tunnel"],
    categories: ["produto"],
    status: "wip",
    badges: ["Em desenvolvimento"],
    featured: false,
    icon: "terminal",
  },
  {
    slug: "robowash-3d",
    name: "RoboWash 3D",
    tagline:
      "Simulador de braço robótico industrial de 5 eixos para lavagem veicular autônoma, com cinemática inversa em Three.js.",
    description:
      "Simulação física de um lava-jato 100% robotizado: braço de 5 eixos com cinemática inversa analítica e motores simulados (perfil NEMA 34 closed-loop), perfil de superfície extraído da malha real do veículo (funciona com qualquer GLTF), ciclo automático em 4 fases (pré-lavagem, espuma, enxágue, secagem) com mesa giratória de 360°, sensor ultrassônico por raycasting, anticolisão que trava motores e parada de emergência.",
    stack: ["JavaScript", "Three.js", "three-mesh-bvh", "Vite", "glTF"],
    categories: ["ar"],
    status: "wip",
    badges: ["Em desenvolvimento", "P&D"],
    featured: false,
    icon: "car",
  },
  // --- EDUCAÇÃO ---
  {
    slug: "autodidata",
    name: "Autodidata",
    tagline:
      "App de ensino de Java do zero ao avançado com maestria por conceito, revisão espaçada SM-2 e editor CodeMirror.",
    description:
      "Aplicação web de aprendizado de Java baseada em metodologias comprovadas — worked examples, retrieval practice, mastery learning e revisão espaçada (algoritmo SM-2). Conteúdo pedagógico tipado com 13 módulos, 38 lições e 58 conceitos, editor CodeMirror com validação estrutural de exercícios (sem JVM no browser), sistema de XP/streak/desbloqueio e camada de domínio pura separada da UI, coberta por 85 testes.",
    stack: ["React 19", "TypeScript", "Vite", "Tailwind 4", "Zustand", "CodeMirror", "Vitest"],
    categories: ["edu"],
    status: "wip",
    badges: ["Em desenvolvimento"],
    featured: false,
    icon: "graduation-cap",
  },
  {
    slug: "game-learn",
    name: "Game Learn",
    tagline:
      "Aprenda Java construindo um platformer 2D: o código que você escreve desbloqueia as mecânicas do jogo.",
    description:
      "MVP de plataforma educacional em que o aluno escreve código Java num editor ao lado de um action platformer 2D em pixel art gótico — cada lição concluída (validada por testes estilo JUnit) desbloqueia mecânicas e avança a fase. Jogo em Canvas 2D puro, sem dependências externas, com personagem de estados animados e inimigos patrulheiros.",
    stack: ["JavaScript", "Canvas 2D", "Node.js"],
    categories: ["edu", "games"],
    status: "wip",
    badges: ["Em desenvolvimento", "MVP"],
    featured: false,
    icon: "gamepad-2",
  },
  {
    slug: "mentor-senai",
    name: "Mentor SENAI",
    tagline:
      "PWA de estudo contínuo para Engenharia de Software: trilhas, lições e modo foco, instalável e offline.",
    description:
      "PWA mobile-first de aprendizado contínuo para o curso de Engenharia de Software do SENAI: trilhas por disciplina, lições estruturadas com conceito, exemplo e diagramas (ex.: transações ACID), modo foco com timer e progresso persistido localmente. Instalável como app com service worker para uso offline.",
    stack: ["JavaScript", "PWA", "Service Worker", "HTML", "CSS"],
    categories: ["edu"],
    status: "wip",
    badges: ["Em desenvolvimento"],
    featured: false,
    icon: "book-open",
  },
];

export const experiments = [
  "excel-to-mongo-etl",
  "JAVAPOO",
  "java-poo-frontend",
  "pdvpostocombustivel",
  "pdv_posto_de_combustiveis",
  "felipe-senai-fatesg-eng-105",
  "tipos_primitivos",
  "Workflows-09-10",
  "Controle_De_Frotas_GynLog",
  "MODELAGEM_01",
];
