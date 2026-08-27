const GROUPS: { title: string; note: string; items: string[] }[] = [
  {
    title: "Borda",
    note: "Um único host termina tudo.",
    items: [
      "nginx, 19 virtual hosts",
      "Let's Encrypt, renovado por timer",
      "HTTP redirecionado para HTTPS em tudo",
      "Host desconhecido é descartado, não servido",
      "UFW: só 22, 80, 443 e as portas de mídia",
    ],
  },
  {
    title: "Execução",
    note: "O que servir ao serviço, não um dogma só.",
    items: [
      "Docker Compose para as aplicações multi-contêiner",
      "Unidades systemd para os binários únicos",
      "pm2 onde um processo Node quer supervisor",
      "Contêiner JDK isolado para código de aluno",
    ],
  },
  {
    title: "Dados",
    note: "Oito instâncias de banco, cada uma de um serviço só.",
    items: [
      "PostgreSQL, uma instância por aplicação",
      "pgvector para busca por embedding",
      "Redis para fila e estado efêmero",
      "Oracle, do lado do cliente da cerca",
      "SQLite onde um arquivo realmente basta",
    ],
  },
  {
    title: "Tempo real",
    note: "As partes que não dá para resolver com polling.",
    items: [
      "LiveKit para o vídeo e o áudio da consulta",
      "WebSocket para partida e despacho",
      "Whisper transcrevendo no próprio host",
      "Simulação autoritativa no servidor, sem confiar no cliente",
    ],
  },
  {
    title: "Linguagens",
    note: "Escolhidas por problema.",
    items: [
      "TypeScript e Next.js na maioria das interfaces",
      "Python com FastAPI e Flask contra o Oracle",
      "Java e Spring Boot",
      "SQL escrito, não gerado às cegas",
    ],
  },
  {
    title: "Prática",
    note: "O que mantém tudo de pé enquanto eu durmo.",
    items: [
      "Script de deploy por serviço, não passo manual",
      "Backup agendado com restauração testada de verdade",
      "Scripts de hardening do host versionados",
      "Alerta que escala até um humano ler",
    ],
  },
]

export function Operations() {
  return (
    <section
      id="operacao"
      className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 sm:py-28 lg:px-14"
    >
      <div className="flex flex-col gap-3 border-b border-ink pb-7">
        <p className="label">Seção 03</p>
        <h2 className="text-[clamp(1.9rem,3.6vw,2.75rem)]">Operação</h2>
        <p className="prose-body">
          A maioria dos portfólios para na interface. Esta é a outra metade do
          trabalho: sobre o que os catorze serviços públicos de fato rodam, e o que os
          mantém respondendo entre um deploy e outro.
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
