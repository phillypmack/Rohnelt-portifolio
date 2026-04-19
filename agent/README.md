# Rohnelt Code Hub Agent

Daemon que escaneia uma pasta com seus projetos, conta linhas de código,
lê metadados (`.portfolio.yml`, `README.md`) e envia para a API do site
[rohnelt.dev](https://rohnelt.dev).

## Como funciona

1. Faz uma varredura inicial assim que sobe.
2. Observa a pasta com `chokidar` — qualquer mudança agenda um sync (debounce de 30s).
3. Faz um rescan completo a cada 1h por garantia.

## Setup

```bash
cp .env.example .env
# edite o .env com seu AGENT_TOKEN (deve ser igual ao do portfolio)
docker compose up -d --build
```

O `restart: unless-stopped` garante que ele reinicia junto com a máquina
(desde que o Docker daemon esteja habilitado para iniciar no boot).

Para habilitar o Docker no boot do sistema:

```bash
sudo systemctl enable docker
```

## Metadata por projeto (`.portfolio.yml`)

Crie esse arquivo na raiz de cada projeto que quer destacar:

```yaml
name: ChaveiroGO              # nome amigável (default: nome da pasta)
slug: chaveirogo              # identificador único (default: nome da pasta)
tagline: Marketplace estilo Uber para chaveiros
description: Plataforma multi-app...
status: production            # production | active | wip | private | public
companies: 1                  # quantas empresas usam (só conta se status=production)
deploy: https://chaveirogo.com.br
github: https://github.com/phillypmack/chaveirogo
stack:
  - Next.js
  - Fastify
  - PostgreSQL
```

Sem `.portfolio.yml`, o agent infere o que dá:
- Nome/slug = nome da pasta
- Tagline/descrição = primeiras linhas do `README.md`
- Stack = detecção por arquivos (`package.json`, `Cargo.toml`, etc)
- Status = `active` (não conta em "produção")

## Logs

```bash
docker compose logs -f agent
```
