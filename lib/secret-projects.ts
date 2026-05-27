export type SecretProject = {
  slug: string;
  name: string;
  tagline: string;
  description?: string;
  stack?: string[];
  status?: "wip" | "active" | "production" | "archived";
  url?: string;
};

// Adicione suas criações secretas aqui.
// Não fica no MENU, não fica no sitemap, não fica indexado.
export const secretProjects: SecretProject[] = [
  // Exemplo (apague quando adicionar os reais):
  // {
  //   slug: "exemplo",
  //   name: "Projeto X",
  //   tagline: "Algo que ainda não mostro pra ninguém.",
  //   description: "Detalhes longos aqui.",
  //   stack: ["Python", "FastAPI"],
  //   status: "wip",
  // },
];
