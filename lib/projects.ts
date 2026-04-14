export type Category =
  | "all"
  | "sankhya"
  | "producao"
  | "wms"
  | "ia"
  | "produto"
  | "ar"
  | "iot";

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
  github: string;
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
];

export const projects: Project[] = [
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
    slug: "producao",
    name: "Production Intelligence Suite",
    tagline:
      "Plataforma de inteligência de planejamento e programação de produção integrada ao Sankhya.",
    description:
      "Suíte que agrupa os módulos de planejamento (planejamento5) e programação (programacao) num único webapp. É a ferramenta-central usada no dia a dia para gerar planos de produção a partir de demanda e disponibilidade.",
    stack: ["Python", "Flask", "JavaScript", "Docker"],
    categories: ["producao", "sankhya"],
    status: "production",
    badges: ["Em produção", "Privado"],
    github: "https://github.com/phillypmack/production-intelligence-suite",
    featured: false,
    icon: "factory",
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
    featured: true,
    icon: "key",
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
    featured: false,
    icon: "sticker",
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
    deploy: "https://cargo-optimizer-app.vercel.app",
    featured: true,
    icon: "package",
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
  {
    slug: "down-notify",
    name: "Sankhya Uptime Monitor",
    tagline: "Monitor de disponibilidade do ERP Sankhya com alertas via WhatsApp.",
    description:
      "Serviço Node.js que monitora a saúde do Sankhya em intervalos regulares e dispara alertas via WhatsApp (Evolution API + whatsapp-web.js) sempre que detecta indisponibilidade ou degradação.",
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
    featured: false,
    icon: "map-pin",
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
];

export const experiments = [
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
